/**
 * Commit one MH-SSC-10 board paper into the bank — PRIVATE, question_kind='pyq',
 * pyq_year/pyq_month set — via the existing commitStaged pipeline (dedup /
 * taxonomy auto-create / content_hash / set_id) + an upload_jobs row.
 *
 *   npx tsx scripts/mh-ssc-10/commit.ts <paperId>          # dry-run
 *   npx tsx scripts/mh-ssc-10/commit.ts <paperId> --apply  # write
 *
 * Input: data/<id>.questions.json — a PaperQuestion[] (see lib.ts). Mixed MCQ +
 * subjective; MCQ answers are DERIVED, subjective answers AUTHORED, every one
 * REVIEW-flagged in the JSON. Everything commits PRIVATE; flip-public.ts flips
 * the answered subset (per the "derive + REVIEW-flag → publish" decision).
 *
 * Re-commit hazard (same as foundation/stateboard): editing a stem/option/answer
 * changes content_hash → re-commit INSERTS + orphans the old row. Delete the
 * paper's rows first (`delete from questions where source_file='<sourceFile>'`),
 * then re-commit. Editing only `solution` text is safe.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { buildPaperRecords, latexImbalances, type PaperQuestion } from "./lib";
import { ORG_ID, EXAM_ID, CREATED_BY, requirePaper, requireCatalog, questionsJsonPath } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const paper = requirePaper(id);
  const catalog = requireCatalog(paper.subjectName);
  loadEnv();

  const questions: PaperQuestion[] = JSON.parse(readFileSync(questionsJsonPath(id), "utf8"));
  const { rows, flags } = buildPaperRecords(catalog, questions);

  console.log(`\nBuilt ${rows.length} PYQ rows for ${paper.subjectName} ${paper.year} (${id}).`);
  const byChap = new Map<string, number>();
  for (const r of rows) byChap.set(r.chapterName, (byChap.get(r.chapterName) ?? 0) + 1);
  console.log("by chapter:");
  for (const [k, n] of [...byChap].sort()) console.log(`  ${k.padEnd(38)} ${n}`);
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
    .from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", paper.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: paper.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id").single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  const result = await commitStaged(client, {
    orgId: ORG_ID, examId: EXAM_ID, filename: paper.sourceFile, createdBy: CREATED_BY,
    rows, uploadJobId: jobId, pyqYear: paper.year, pyqMonth: paper.month, pyqNote: paper.note,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE", question_kind: "pyq" }, { count: "exact" })
    .eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='pyq'.`);

  const { count: linked } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile);
  await client.from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
