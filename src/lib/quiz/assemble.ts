/**
 * Shared "assemble one daily quiz" core — used by BOTH the CLI (scripts/quiz/
 * assemble.ts) and the dashboard server action (app/dashboard/quizzes/actions.ts),
 * so the logic lives in one place. NOT marked "server-only" precisely so the tsx
 * script can import it; both callers pass in their own service-role supabase
 * client (the script reads .env.local, the action uses createSupabaseAdminClient).
 *
 * Picks the next chunk of READY (auto|verified), UNUSED (not in quiz_atoms_map)
 * atoms for a chapter, interleaves question kinds for variety, records the quiz in
 * quizzes + quiz_atoms_map (the coverage ledger), and pushes to nda-tracker as a
 * draft IF push credentials are supplied (otherwise records only).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { orderForVariety, chunkFull } from "../../../scripts/quiz/atoms";
import { defineDailyQuiz, fromAtom, type QuestionSpec } from "../../../scripts/quiz/daily";
import { buildImportPayload, slugToUuid } from "../../../scripts/quiz/quizPayload";

const SUBJECT_DISPLAY: Record<string, string> = {
  "nda-maths": "Maths",
  "nda-physics": "Physics",
  "nda-biology": "Biology",
  "mht-cet-maths": "Maths",
};
const titleCase = (slug: string) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

export type QuizTheme = "formula" | "property" | "computation" | "fact" | "trap";

const THEME_LABEL: Record<QuizTheme, string> = {
  formula: "Formulas",
  property: "Properties",
  computation: "Practice",
  fact: "Key Facts",
  trap: "Common Traps",
};

export type ReadyAtom = {
  id: string;
  exam: string;
  concept_slug: string;
  subtopic_slug: string;
  source_kind: string;
  theme: string | null;
  stem: string;
  correct: string;
  options: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
};

export type AssembleResult =
  | {
      ok: true;
      slug: string;
      title: string;
      questionCount: number;
      pushed: boolean;
      /** Human-readable reason the push did/didn't happen — for diagnosing the
       *  deployed button (env missing vs HTTP failure vs network error). */
      pushDetail: string;
      remaining: number;
    }
  | { ok: false; error: string };

export async function readReadyAtoms(
  db: SupabaseClient,
  route: string,
  chapter: string,
  theme?: QuizTheme
): Promise<ReadyAtom[]> {
  const out: ReadyAtom[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let query = db
      .from("quiz_atoms")
      .select("id, exam, concept_slug, subtopic_slug, source_kind, theme, stem, correct, options, answer")
      .eq("subject_route", route)
      .eq("chapter_slug", chapter)
      .in("status", ["auto", "verified"])
      .not("options", "is", null);
    if (theme) query = query.eq("theme", theme);
    const { data, error } = await query.range(from, from + PAGE - 1);
    if (error) throw new Error(`read ready atoms failed: ${error.message}`);
    out.push(...((data ?? []) as ReadyAtom[]));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

export async function readUsedAtomIds(db: SupabaseClient): Promise<Set<string>> {
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

export async function assembleNextQuiz(
  db: SupabaseClient,
  opts: { route: string; chapter: string; size?: number; theme?: QuizTheme; push?: { url: string; secret: string } | null }
): Promise<AssembleResult> {
  const size = opts.size ?? 15;
  const [ready, used] = await Promise.all([
    readReadyAtoms(db, opts.route, opts.chapter, opts.theme),
    readUsedAtomIds(db),
  ]);
  const fresh = ready.filter((a) => !used.has(a.id));
  const chunks = chunkFull(orderForVariety(fresh, (a) => a.source_kind), size);
  if (chunks.length === 0) {
    const themeNote = opts.theme ? ` ${THEME_LABEL[opts.theme].toLowerCase()}` : "";
    return {
      ok: false,
      error: `Only ${fresh.length} ready, unused${themeNote} question(s) in ${opts.route}/${opts.chapter} — need ${size} for a full quiz. Approve more first.`,
    };
  }
  const atoms = chunks[0];

  // Themed quizzes number/slug per (chapter, theme); mixed keeps the -daily- slug.
  const slugBase = opts.theme ? `${opts.route}-${opts.chapter}-${opts.theme}` : `${opts.route}-${opts.chapter}-daily`;
  const { count: prior } = await db
    .from("quizzes")
    .select("id", { count: "exact", head: true })
    .like("slug", `${slugBase}-%`);
  const n = (prior ?? 0) + 1;
  const slug = `${slugBase}-${n}`;
  const id = slugToUuid(slug);
  const subject = SUBJECT_DISPLAY[opts.route] ?? titleCase(opts.route);
  const chapterDisplay = titleCase(opts.chapter);
  const themeLabel = opts.theme ? THEME_LABEL[opts.theme] : "Daily";

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
    title: `NDA ${chapterDisplay} — ${themeLabel} ${n}`,
    chapter: chapterDisplay,
    theme: opts.theme ?? "mixed",
    questions: specs,
  });

  // Record FIRST (ledger is the source of truth), then attempt push.
  const { error: qErr } = await db.from("quizzes").upsert(
    { id, slug, exam: atoms[0].exam, subject, title: draft.title, chapter: chapterDisplay, status: "draft" },
    { onConflict: "id" }
  );
  if (qErr) return { ok: false, error: `record quiz failed: ${qErr.message}` };
  await db.from("quiz_atoms_map").delete().eq("quiz_id", id);
  const { error: mErr } = await db
    .from("quiz_atoms_map")
    .insert(atoms.map((a, i) => ({ quiz_id: id, atom_id: a.id, position: i + 1 })));
  if (mErr) return { ok: false, error: `record questions failed: ${mErr.message}` };

  let pushed = false;
  let pushDetail: string;
  if (!opts.push) {
    pushDetail = "not pushed — NDA_TRACKER_IMPORT_URL / QUIZ_IMPORT_SECRET not set in the server env";
  } else {
    try {
      const res = await fetch(opts.push.url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${opts.push.secret}` },
        body: JSON.stringify(buildImportPayload(draft)),
      });
      if (res.ok) {
        pushed = true;
        pushDetail = "pushed to nda-tracker";
        await db.from("quizzes").update({ status: "pushed", pushed_at: new Date().toISOString() }).eq("id", id);
      } else {
        pushDetail = `push failed: HTTP ${res.status} ${(await res.text()).slice(0, 140)}`;
      }
    } catch (e) {
      pushDetail = `push error: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  return { ok: true, slug, title: draft.title, questionCount: atoms.length, pushed, pushDetail, remaining: fresh.length - atoms.length };
}
