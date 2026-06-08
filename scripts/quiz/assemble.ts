/**
 * Assemble daily quizzes from READY atoms (status auto|verified) in quiz_atoms,
 * record them (quizzes + quiz_atoms_map = the coverage ledger), and push each to
 * nda-tracker as a DRAFT.
 *
 * Run:  npm run quiz:assemble nda-maths probability          # all full quizzes
 *       npm run quiz:assemble nda-maths probability 2 15     # max 2 quizzes of 15
 *
 * Atoms already used in a prior quiz (in quiz_atoms_map) are excluded, so re-runs
 * keep building NEW quizzes from unused atoms — no repeats across days. Each quiz
 * lands as a draft; a teacher sets batch + close time and publishes by hand.
 */
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { orderForVariety, chunkFull } from "./atoms";
import { defineDailyQuiz, fromAtom, type QuestionSpec } from "./daily";
import { buildImportPayload, slugToUuid } from "./quizPayload";

function loadEnvLocal() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("dotenv").config({ path: local, override: true });
  }
}

const SUBJECT_DISPLAY: Record<string, string> = {
  "nda-maths": "Maths",
  "nda-physics": "Physics",
  "nda-biology": "Biology",
  "mht-cet-maths": "Maths",
};
const titleCase = (slug: string) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

type ReadyAtom = {
  id: string;
  atom_key: string;
  exam: string;
  subject_route: string;
  concept_slug: string;
  subtopic_slug: string;
  source_kind: string;
  stem: string;
  correct: string;
  options: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
};

async function readReady(db: SupabaseClient, route: string, chapter: string): Promise<ReadyAtom[]> {
  const out: ReadyAtom[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("quiz_atoms")
      .select("id, atom_key, exam, subject_route, concept_slug, subtopic_slug, source_kind, stem, correct, options, answer")
      .eq("subject_route", route)
      .eq("chapter_slug", chapter)
      .in("status", ["auto", "verified"])
      .not("options", "is", null)
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`read ready atoms failed: ${error.message}`);
    out.push(...((data ?? []) as ReadyAtom[]));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

async function readUsedAtomIds(db: SupabaseClient): Promise<Set<string>> {
  const used = new Set<string>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db.from("quiz_atoms_map").select("atom_id").range(from, from + PAGE - 1);
    if (error) throw new Error(`read quiz_atoms_map failed: ${error.message}`);
    for (const r of data ?? []) used.add(r.atom_id as string);
    if (!data || data.length < PAGE) break;
  }
  return used;
}

async function pushDraft(url: string, secret: string, payload: unknown): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`push failed (HTTP ${res.status}): ${text}`);
  return text;
}

async function main() {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const importUrl = process.env.NDA_TRACKER_IMPORT_URL;
  const secret = process.env.QUIZ_IMPORT_SECRET;
  if (!url || !serviceRole) throw new Error("Supabase env missing in .env.local");
  if (!importUrl || !secret) throw new Error("NDA_TRACKER_IMPORT_URL / QUIZ_IMPORT_SECRET missing in .env.local");

  const route = process.argv[2] ?? "nda-maths";
  const chapter = process.argv[3] ?? "probability";
  const maxQuizzes = process.argv[4] ? parseInt(process.argv[4], 10) : Infinity;
  const size = process.argv[5] ? parseInt(process.argv[5], 10) : 15;
  const db = createClient(url, serviceRole, { auth: { persistSession: false } });

  const [ready, used] = await Promise.all([readReady(db, route, chapter), readUsedAtomIds(db)]);
  const fresh = ready.filter((a) => !used.has(a.id));
  const ordered = orderForVariety(fresh, (a) => a.source_kind);
  let quizzes = chunkFull(ordered, size);
  if (quizzes.length > maxQuizzes) quizzes = quizzes.slice(0, maxQuizzes);

  console.log(
    `→ ${route}/${chapter}: ${ready.length} ready (${fresh.length} unused) → ${quizzes.length} quiz(zes) of ${size}`
  );
  if (quizzes.length === 0) {
    console.log("  nothing to assemble (need ≥1 full quiz of unused atoms).");
    return;
  }

  // Existing quiz count for this chapter → continue numbering across runs.
  const { count: priorCount } = await db
    .from("quizzes")
    .select("id", { count: "exact", head: true })
    .like("slug", `${route}-${chapter}-daily-%`);
  const subject = SUBJECT_DISPLAY[route] ?? titleCase(route);
  const chapterDisplay = titleCase(chapter);
  const now = new Date().toISOString();

  for (let i = 0; i < quizzes.length; i++) {
    const n = (priorCount ?? 0) + i + 1;
    const slug = `${route}-${chapter}-daily-${n}`;
    const id = slugToUuid(slug);
    const atoms = quizzes[i];
    const specs: QuestionSpec[] = atoms.map((a) =>
      fromAtom({
        conceptSlug: a.concept_slug,
        subtopicSlug: a.subtopic_slug,
        stem: a.stem,
        correct: a.correct,
        options: a.options,
        answer: a.answer,
      })
    );
    const draft = defineDailyQuiz({
      slug,
      exam: atoms[0].exam,
      subject,
      title: `NDA ${chapterDisplay} — Daily ${n}`,
      chapter: chapterDisplay,
      questions: specs,
    });

    // Record (quizzes + quiz_atoms_map) BEFORE push, so the ledger is the source.
    const { error: qErr } = await db.from("quizzes").upsert(
      { id, slug, exam: atoms[0].exam, subject, title: draft.title, chapter: chapterDisplay, status: "draft" },
      { onConflict: "id" }
    );
    if (qErr) throw new Error(`write quizzes(${slug}) failed: ${qErr.message}`);
    await db.from("quiz_atoms_map").delete().eq("quiz_id", id);
    const { error: mErr } = await db
      .from("quiz_atoms_map")
      .insert(atoms.map((a, pos) => ({ quiz_id: id, atom_id: a.id, position: pos + 1 })));
    if (mErr) throw new Error(`write quiz_atoms_map(${slug}) failed: ${mErr.message}`);

    const resp = await pushDraft(importUrl, secret, buildImportPayload(draft));
    await db.from("quizzes").update({ status: "pushed", pushed_at: now }).eq("id", id);
    console.log(`✓ ${slug} (${atoms.length} Q) → draft in nda-tracker  ${resp}`);
  }

  console.log(`\nDone. Open nda-tracker → Daily Quiz to set batch + close time and publish.`);
}

main().catch((e) => {
  console.error("✗", e instanceof Error ? e.message : e);
  process.exit(1);
});
