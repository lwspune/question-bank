/**
 * Commit one IMAT paper into the bank, PRIVATE, then attach its figures.
 *
 *   npx tsx scripts/imat/commit.ts 2024          # dry run: check, write nothing
 *   npx tsx scripts/imat/commit.ts 2024 --apply
 *
 * Reads data/<year>.questions.json (the reviewed transcription) and, for a
 * question with a `figure`, C:\Vilas\LWS_Pune\IMAT\figures\<year>_q<n>.png.
 *
 * PRIVATE AT INSERT. commitStaged writes `visibility` with the row, so an IMAT
 * question is never public, not even for a moment, until the niche site and
 * the copyright question (NICHE_SITES_SPEC.md D1) are both settled.
 *
 * A Cambridge-set paper (2011-2022) is also written with `publish_blocked`
 * (config.ts publishBlockFor), so the database refuses ever to publish it.
 *
 * Refuses to write while any question lacks a chapter, any figure file is
 * missing, or the paper fails check.ts. Rollback is by source_file: every row
 * carries the paper's filename.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { uploadImage } from "../../src/lib/storage/images";
import { CREATED_BY, EXAM_NAME, ORG_ID, VISIBILITY, figurePath, publishBlockFor } from "./config";
import { buildRow, validatePaper } from "./lib";
import { YEARS, loadPaper, mathErrors } from "./check";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const year = Number(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  if (!YEARS.includes(year)) throw new Error(`year must be one of ${YEARS.join(", ")}`);

  const { sourceFile, questions } = loadPaper(year);
  const errors = validatePaper(year, questions);
  const rows = [];
  for (const q of questions) {
    errors.push(...mathErrors(q));
    if (!q.chapter?.trim()) errors.push(`Q${q.n}: no chapter`);
    if (q.figure && !existsSync(figurePath(year, q.n))) errors.push(`Q${q.n}: figure file missing (${figurePath(year, q.n)})`);
    try {
      rows.push(buildRow(year, q));
    } catch (e) {
      errors.push((e as Error).message);
    }
  }
  const figures = questions.filter((q) => q.figure).map((q) => q.n);

  console.log(`IMAT ${year}  ${sourceFile}  ${questions.length} questions, ${figures.length} figure(s)`);
  if (errors.length) {
    console.log(`CHECK: ${errors.length} problem(s)`);
    for (const e of errors.slice(0, 40)) console.log(`  - ${e}`);
    if (errors.length > 40) console.log(`  ... and ${errors.length - 40} more`);
  } else {
    console.log(`CHECK: ok`);
  }
  if (!apply) {
    console.log("\n[dry run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (errors.length) throw new Error("refusing to commit with problems; fix the transcription first.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" not found; run scripts/imat/seed.ts --apply first`);
  const examId = exam.id as string;

  // A paper already live must not be silently re-written PRIVATE.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", sourceFile)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0) {
    throw new Error(`${publicBefore} row(s) of ${sourceFile} are PUBLIC already; this script only writes PRIVATE.`);
  }

  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", sourceFile)
    .limit(1)
    .maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id")
      .single();
    if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
    jobId = job.id;
  }

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId,
    filename: sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: year,
    visibility: VISIBILITY,
    publishBlocked: publishBlockFor(year),
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);
  if (result.skipped > 0) {
    console.log(`!! ${result.skipped} row(s) SKIPPED as duplicates (a re-run, or two questions hashing alike). Check before trusting.`);
  }

  for (const n of figures) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", examId)
      .eq("source_file", sourceFile)
      .eq("question_number", String(n))
      .maybeSingle();
    if (error) throw new Error(`Q${n} lookup: ${error.message}`);
    if (!q) {
      console.log(`  Q${n}: no committed row, figure not attached`);
      continue;
    }
    if (q.image_url) {
      console.log(`  Q${n}: figure already attached`);
      continue;
    }
    const path = await uploadImage(client, ORG_ID, readFileSync(figurePath(year, n)), "image/png");
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`Q${n} set image_url: ${uErr.message}`);
    console.log(`  Q${n}: figure attached ${path}`);
  }

  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", sourceFile);
  const { count: privateCount } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", sourceFile)
    .eq("visibility", "PRIVATE");
  await client
    .from("upload_jobs")
    .update({
      status: "COMPLETED",
      total_rows: linked ?? 0,
      inserted: result.inserted,
      skipped: result.skipped,
      finished_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  console.log(`done: ${linked} row(s) for ${sourceFile}, ${privateCount} PRIVATE.`);
  if (linked !== questions.length) console.log(`!! expected ${questions.length} rows, found ${linked}.`);
  if (privateCount !== linked) console.log(`!! ${(linked ?? 0) - (privateCount ?? 0)} row(s) are not PRIVATE.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
