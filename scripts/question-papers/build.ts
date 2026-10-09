/**
 * Build /question-papers from the board pipelines' transcriptions (2026-10-09).
 *
 *   npm run papers:build                      # DRY RUN: what would be written, what is refused
 *   npm run papers:build -- --apply           # write the papers, unpublished
 *   npm run papers:build -- --apply --publish # write and publish
 *   npm run papers:build -- --only=2025-55-1  # one CBSE group (or one paper slug)
 *
 * Phase 1 is CBSE Class 12: every transcription in scripts/cbse-12-pyq/data.
 * Each paper becomes one board_papers row and its printed items (migration
 * 0146), each naming its bank question by the fingerprint the CBSE commit used
 * (src/lib/questionPapers/manifest.ts). A paper is REFUSED, never written short,
 * when its marks do not add up to its printed total or any of its questions is
 * not a PUBLIC question of its exam and subject.
 *
 * Idempotent: board_paper_replace upserts the paper and replaces its items in
 * one transaction, so a re-run after a question repair re-points the paper.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cbseManifest, type PaperManifest, type SourcePaper } from "../../src/lib/questionPapers/manifest";

const CBSE_DIR = join(process.cwd(), "scripts/cbse-12-pyq/data");
const CBSE_EXAM = "CBSE Class 12";
/** CBSE's paper-code prefix → the bank's subject name (scripts/cbse-12-pyq/config.ts). */
const CBSE_SUBJECTS: Record<string, string> = { "55": "Physics", "56": "Chemistry", "57": "Biology", "65": "Mathematics" };

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const PUBLISH = args.includes("--publish");
const ONLY = args.find((a) => a.startsWith("--only="))?.slice("--only=".length) ?? null;

type Built = { manifest: PaperManifest; subjectName: string; questionIds: string[] };

async function idsByHash(admin: SupabaseClient, examId: string, hashes: string[]): Promise<Map<string, { id: string; subjectId: string }>> {
  const out = new Map<string, { id: string; subjectId: string }>();
  const unique = [...new Set(hashes)];
  // .in() puts the list in the URL: chunk at ~150, whatever the result size.
  for (let i = 0; i < unique.length; i += 150) {
    const { data, error } = await admin
      .from("questions")
      .select("id, content_hash, subject_id")
      .eq("exam_id", examId)
      .eq("visibility", "PUBLIC")
      .in("content_hash", unique.slice(i, i + 150));
    if (error) throw new Error(`question lookup: ${error.message}`);
    for (const r of data ?? []) out.set(r.content_hash as string, { id: r.id as string, subjectId: r.subject_id as string });
  }
  return out;
}

async function main() {
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam, error: examErr } = await admin.from("exams").select("id").eq("name", CBSE_EXAM).single();
  if (examErr || !exam) throw new Error(`exam "${CBSE_EXAM}" not found`);
  const { data: subjects, error: subjErr } = await admin.from("subjects").select("id, name").eq("exam_id", exam.id);
  if (subjErr) throw new Error(`subjects: ${subjErr.message}`);
  const subjectId = new Map((subjects ?? []).map((s) => [s.name as string, s.id as string]));

  const refused: string[] = [];
  const manifests: { manifest: PaperManifest; subjectName: string }[] = [];
  for (const file of readdirSync(CBSE_DIR).filter((f) => /^\d{4}-\d+-\d+-\d+\.questions\.json$/.test(f)).sort()) {
    const src = JSON.parse(readFileSync(join(CBSE_DIR, file), "utf8")) as SourcePaper;
    const subjectName = CBSE_SUBJECTS[src.paper.split("/")[0]];
    if (!subjectName || !subjectId.has(subjectName)) {
      refused.push(`${file}: no subject for paper code ${src.paper}`);
      continue;
    }
    const r = cbseManifest(src, { subjectName });
    if (!r.ok) {
      refused.push(r.reason);
      continue;
    }
    if (ONLY && r.manifest.slug !== ONLY && r.manifest.groupSlug !== ONLY) continue;
    manifests.push({ manifest: r.manifest, subjectName });
  }

  const found = await idsByHash(
    admin,
    exam.id as string,
    manifests.flatMap((m) => m.manifest.items.map((i) => i.contentHash))
  );
  const built: Built[] = [];
  for (const { manifest, subjectName } of manifests) {
    const want = subjectId.get(subjectName)!;
    const missing = manifest.items.filter((i) => found.get(i.contentHash)?.subjectId !== want);
    if (missing.length) {
      refused.push(`${manifest.slug}: ${missing.length} question(s) not PUBLIC in ${subjectName} (${missing.map((m) => m.printedNumber).join(", ")})`);
      continue;
    }
    built.push({ manifest, subjectName, questionIds: manifest.items.map((i) => found.get(i.contentHash)!.id) });
  }

  const groups = new Set(built.map((b) => b.manifest.groupSlug));
  const bySubject = new Map<string, number>();
  for (const b of built) bySubject.set(b.subjectName, (bySubject.get(b.subjectName) ?? 0) + 1);
  console.log(`${CBSE_EXAM}: ${built.length} paper(s) in ${groups.size} group(s) ready`);
  for (const [s, n] of [...bySubject].sort()) console.log(`  ${s}: ${n}`);
  if (refused.length) {
    console.log(`\nrefused ${refused.length}:`);
    for (const r of refused) console.log(`  ${r}`);
  }

  if (!APPLY) {
    console.log(`\nDRY RUN: nothing written. Add --apply to write${PUBLISH ? "" : " (unpublished; --publish to publish)"}.`);
    return;
  }
  let items = 0;
  for (const b of built) {
    const m = b.manifest;
    const { data, error } = await admin.rpc("board_paper_replace", {
      p_paper: {
        examId: exam.id,
        subjectId: subjectId.get(b.subjectName),
        slug: m.slug,
        groupSlug: m.groupSlug,
        setNumber: m.setNumber,
        year: m.year,
        sitting: null,
        paperCode: m.paperCode,
        title: m.title,
        totalMarks: m.totalMarks,
        durationMinutes: m.durationMinutes,
        sections: m.sections,
        published: PUBLISH,
      },
      p_items: m.items.map((it, i) => ({
        position: it.position,
        printedNumber: it.printedNumber,
        section: it.section,
        marks: it.marks,
        alternativeTo: it.alternativeTo,
        caseKey: it.caseKey,
        questionId: b.questionIds[i],
      })),
    });
    if (error) throw new Error(`${m.slug}: ${error.message}`);
    items += data as number;
  }
  console.log(`\nwrote ${built.length} paper(s), ${items} item(s), ${PUBLISH ? "PUBLISHED" : "unpublished"}.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
