/**
 * Commit one JEE practice chapter into the bank — PRIVATE, question_kind='practice'
 * — via the existing commitStaged pipeline (dedup / taxonomy reuse / content_hash /
 * set_id) + an upload_jobs row.
 *
 *   npx tsx scripts/jee-practice/commit.ts <chapterId>          # dry-run
 *   npx tsx scripts/jee-practice/commit.ts <chapterId> --apply  # write
 *
 * Input: data/<id>.merged.json = { questions: JQ[], keyBlocks: {level: block} }
 * (produced by merge.ts). MCQ answers are resolved from the per-level KEY blocks;
 * Worked Examples become subjective rows with the booklet's solution. Everything
 * commits PRIVATE; flip-public.ts flips after review.
 *
 * Re-commit hazard (same as stateboard/practice): editing a stem/option/answer
 * changes content_hash → re-commit INSERTS + orphans the old row. Delete the
 * source's rows first (`delete from questions where source_file='<sourceFile>'`),
 * then re-commit. Editing only `solution` text is safe.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { assembleRows, keyCoverageWarnings, latexImbalances, type JQ } from "./lib";
import { ORG_ID, EXAM_ID, CREATED_BY, SUBJECT_NAME, requireChapter, mergedJsonPath } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  const { questions, keyBlocks } = JSON.parse(readFileSync(mergedJsonPath(id), "utf8")) as {
    questions: JQ[];
    keyBlocks: Record<string, string>;
  };

  const { rows, flags } = assembleRows(
    { chapterName: ch.chapterName, subjectName: SUBJECT_NAME, subtopics: ch.subtopics },
    questions,
    keyBlocks
  );

  console.log(`\nBuilt ${rows.length} practice rows for ${SUBJECT_NAME} / ${ch.chapterName}.`);
  const byKind = new Map<string, number>();
  for (const q of questions) byKind.set(q.kind, (byKind.get(q.kind) ?? 0) + 1);
  console.log(`by kind: ${[...byKind].map(([k, n]) => `${k}=${n}`).join("  ")}`);
  const bySub = new Map<string, number>();
  for (const r of rows) bySub.set(r.subtopicName!, (bySub.get(r.subtopicName!) ?? 0) + 1);
  console.log("by subtopic:");
  for (const [k, n] of [...bySub].sort()) console.log(`  ${k.padEnd(40)} ${n}`);
  const fmt = new Map<string, number>();
  for (const r of rows) fmt.set(r.questionFormat ?? "mcq", (fmt.get(r.questionFormat ?? "mcq") ?? 0) + 1);
  console.log(`format: ${[...fmt].map(([k, n]) => `${k}=${n}`).join("  ")}`);

  const covWarns = keyCoverageWarnings(questions, keyBlocks);
  if (covWarns.length) {
    console.log(`\nkey-coverage warnings (${covWarns.length}):`);
    for (const w of covWarns) console.log(`  ${w}`);
  }
  if (flags.length) {
    console.log(`\nflags (${flags.length}):`);
    for (const f of flags) console.log(`  ${f.ref}: ${f.reason}`);
  }

  const latexErrors = latexImbalances(rows);
  console.log(
    latexErrors.length ? `\nLaTeX imbalances (${latexErrors.length}):\n  ${latexErrors.join("\n  ")}` : "\nLaTeX delimiters balanced."
  );

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (latexErrors.length) throw new Error("refusing to commit with LaTeX imbalances — fix the transcription first.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", ch.sourceFile)
    .limit(1)
    .maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: ch.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: ch.sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: null,
    pyqNote: ch.note,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE", question_kind: "practice" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='practice'.`);

  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile);
  await client
    .from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
