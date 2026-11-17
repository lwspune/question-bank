/**
 * Commit one State Board textbook chapter into the bank — PRIVATE,
 * question_kind='practice' — via the existing commitStaged pipeline
 * (dedup / taxonomy reuse / content_hash / set_id) + an upload_jobs row.
 *
 *   npx tsx scripts/stateboard/commit.ts <chapterId>          # dry-run
 *   npx tsx scripts/stateboard/commit.ts <chapterId> --apply  # write
 *
 * Input: data/<id>.questions.json — an SBQuestion[] (see lib.ts). Mixed MCQ +
 * subjective; solved examples carry the book's solution, exercises don't (yet).
 * Everything commits PRIVATE; flip-public.ts flips the solved examples.
 *
 * Re-commit hazard (same as foundation/practice): editing a stem/option/answer
 * changes content_hash → re-commit INSERTS + orphans the old row. Delete the
 * source's rows first (`delete from questions where source_file='<sourceFile>'`),
 * then re-commit. Editing only `solution` text is safe.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { buildRecords, latexImbalances, type SBQuestion } from "./lib";
import { ORG_ID, EXAM_ID, CREATED_BY, requireChapter, questionsJsonPath } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  const questions: SBQuestion[] = JSON.parse(readFileSync(questionsJsonPath(id), "utf8"));
  const { rows, flags } = buildRecords(
    { chapterName: ch.chapterName, subjectName: ch.subjectName, subtopics: ch.subtopics },
    questions
  );

  console.log(`\nBuilt ${rows.length} practice rows for ${ch.subjectName} / ${ch.chapterName}.`);
  const byBucket = new Map<string, number>();
  for (const q of questions) byBucket.set(q.bucket, (byBucket.get(q.bucket) ?? 0) + 1);
  console.log("by bucket:");
  for (const [k, n] of [...byBucket].sort()) console.log(`  ${k.padEnd(22)} ${n}`);
  const bySub = new Map<string, number>();
  for (const r of rows) bySub.set(r.subtopicName!, (bySub.get(r.subtopicName!) ?? 0) + 1);
  console.log("by subtopic:");
  for (const [k, n] of [...bySub].sort()) console.log(`  ${k.padEnd(52)} ${n}`);
  const fmt = new Map<string, number>();
  for (const r of rows) fmt.set(r.questionFormat ?? "mcq", (fmt.get(r.questionFormat ?? "mcq") ?? 0) + 1);
  console.log(`format: ${[...fmt].map(([k, n]) => `${k}=${n}`).join("  ")}`);

  if (flags.length) {
    console.log(`\nflags (${flags.length}):`);
    for (const f of flags) console.log(`  ${f.ref}: ${f.reason}`);
  }

  const latexErrors = latexImbalances(rows);
  console.log(latexErrors.length ? `\nLaTeX imbalances (${latexErrors.length}):\n  ${latexErrors.join("\n  ")}` : "\nLaTeX delimiters balanced.");

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (latexErrors.length) throw new Error("refusing to commit with LaTeX imbalances — fix the transcription first.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: existingJob } = await client
    .from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", ch.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: ch.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id").single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  // Rows already in the bank for this chapter (a re-commit after adding rows to a
  // shipped chapter): they keep their visibility. A chapter is far under 1000 rows.
  const { data: before, error: bErr } = await client
    .from("questions").select("id").eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile);
  if (bErr) throw new Error(`existing-row read failed: ${bErr.message}`);
  const existing = new Set((before ?? []).map((r) => r.id as string));

  const result = await commitStaged(client, {
    orgId: ORG_ID, examId: EXAM_ID, filename: ch.sourceFile, createdBy: CREATED_BY,
    rows, uploadJobId: jobId, pyqYear: null, pyqNote: ch.note,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // PRIVATE only for the rows THIS run inserted. Until 2026-11-17 this stamped
  // every row of the source file, so adding five rows to a shipped chapter (Ch.10
  // Magnetic Fields) hid its 33 live questions until flip-public ran again.
  const { error: kErr } = await client
    .from("questions")
    .update({ question_kind: "practice" })
    .eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile);
  if (kErr) throw new Error(`kind update failed: ${kErr.message}`);
  const { data: after, error: aErr } = await client
    .from("questions").select("id").eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile);
  if (aErr) throw new Error(`row read failed: ${aErr.message}`);
  const inserted = (after ?? []).map((r) => r.id as string).filter((id) => !existing.has(id));
  let count = 0;
  if (inserted.length) {
    const { error: uErr, count: c } = await client
      .from("questions").update({ visibility: "PRIVATE" }, { count: "exact" }).in("id", inserted);
    if (uErr) throw new Error(`visibility update failed: ${uErr.message}`);
    count = c ?? 0;
  }
  console.log(`set ${count} newly inserted row(s) to PRIVATE; ${existing.size} existing row(s) keep their visibility.`);

  const { count: linked } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile);
  await client.from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
