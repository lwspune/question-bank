/**
 * Commit the Paper 1 pilot (60 MCQ) into the bank — PRIVATE — via the existing
 * commitStaged pipeline (dedup / taxonomy auto-create / content_hash).
 *
 *   npx tsx scripts/jee/commit.ts          # dry-run (prints what it would insert)
 *   npx tsx scripts/jee/commit.ts --apply  # actually write
 *
 * Idempotent: re-running upserts on content_hash, so dupes are skipped.
 * Images are NOT handled here — see attach-images.ts (Phase 3b).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { CLASSIFICATION, OPTION_OVERRIDES } from "./classification";

const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune
const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679"; // JEE Mains
const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f"; // admin
const SOURCE_FILE = "JEE_2021_Paper1.docx";
const PYQ_YEAR = 2021;
const PYQ_NOTE = "Paper 1"; // disambiguator only; year is carried separately (avoids "2021 Paper 1 · 2021")

type Rec = {
  questionNumber: number;
  subject: string;
  status: string;
  stem: string;
  options: { label: "A" | "B" | "C" | "D"; text: string; isCorrect: boolean }[] | null;
};

function loadEnv() {
  const dotenv = require("dotenv");
  dotenv.config({ path: join(process.cwd(), ".env.local"), override: true });
}

function buildRows(): ParsedRowPayload[] {
  const records: Rec[] = JSON.parse(readFileSync(join(__dirname, "out", "paper1.records.json"), "utf8"));
  const mcq = records.filter((r) => r.status === "ok" || r.status === "image_options");

  return mcq.map((r) => {
    const cls = CLASSIFICATION[r.questionNumber];
    if (!cls) throw new Error(`no classification for Q${r.questionNumber}`);
    const overrides = OPTION_OVERRIDES[r.questionNumber] ?? {};
    const text = normalizeNewlines(r.stem);
    const options = (r.options ?? []).map((o) => ({
      label: o.label,
      text: normalizeNewlines(overrides[o.label] ?? o.text),
      isCorrect: o.isCorrect,
    }));
    return {
      sourceRow: r.questionNumber,
      questionNumber: String(r.questionNumber),
      subjectName: r.subject,
      chapterName: cls.chapter,
      subtopicName: cls.subtopic,
      text,
      difficulty: "MODERATE" as const,
      solution: undefined, // solutions attached in a later pass to keep this commit lean
      options,
      contentHash: contentHash(
        text,
        options.map((o) => o.text),
        options.find((o) => o.isCorrect)?.label ?? ""
      ),
    };
  });
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const rows = buildRows();

  console.log(`Built ${rows.length} MCQ rows for JEE Mains Paper 1 (2021).`);
  const byChapter = new Map<string, number>();
  for (const r of rows) byChapter.set(`${r.subjectName} · ${r.chapterName}`, (byChapter.get(`${r.subjectName} · ${r.chapterName}`) ?? 0) + 1);
  console.log("\nchapters that will auto-create:");
  for (const [k, n] of [...byChapter].sort()) console.log(`  ${k.padEnd(60)} ${n}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const client = createClient(url, key, { auth: { persistSession: false } });

  // Find-or-create the upload_jobs row so this paper is a first-class, manageable
  // upload (dashboard "Recent uploads" + /uploads/[id] delete/metadata/edit).
  // Idempotent on (org_id, filename) — re-running reuses the same job + backfills.
  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", SOURCE_FILE)
    .limit(1)
    .maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: SOURCE_FILE, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`upload job: ${jobId}`);

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: SOURCE_FILE,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: PYQ_YEAR,
    pyqNote: PYQ_NOTE,
  });
  console.log(`\ncommit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // Backfill upload_job_id on any existing rows for this paper that predate the job
  // (e.g. a prior no-job commit) so the /uploads page lists every question.
  await client
    .from("questions")
    .update({ upload_job_id: jobId })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", SOURCE_FILE)
    .is("upload_job_id", null);

  // Pilot stays PRIVATE until verified in /browse.
  const { error: vErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", SOURCE_FILE);
  if (vErr) throw new Error(`visibility flip failed: ${vErr.message}`);
  console.log(`set ${count} JEE Paper-1 rows to PRIVATE.`);

  // Finalize the job with accurate, run-count-independent totals.
  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", SOURCE_FILE);
  const total = linked ?? 0;
  const { error: fErr } = await client
    .from("upload_jobs")
    .update({
      status: "COMPLETED",
      total_rows: rows.length,
      inserted: total,
      skipped: Math.max(0, rows.length - total),
      errors_json: result.errors.length ? result.errors : null,
      finished_at: new Date().toISOString(),
    })
    .eq("id", jobId);
  if (fErr) throw new Error(`upload_jobs finalize failed: ${fErr.message}`);
  console.log(`finalized upload job (${total} questions linked).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
