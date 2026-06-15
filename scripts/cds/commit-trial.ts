/**
 * TRIAL ingestion: one CDS English PYQ paper into the bank — PRIVATE, question_kind='pyq' —
 * via the existing commitStaged pipeline (dedup / taxonomy reuse / content_hash) + an upload_jobs row.
 *
 *   npx tsx scripts/cds/commit-trial.ts           # dry-run (validate only)
 *   npx tsx scripts/cds/commit-trial.ts --apply    # write
 *
 * Source: scripts/cds/final.json — the vision-transcribed + LLM-derived-answer
 * questions for Eng_CDS_2026_1 (CDS-I 2026). CDS booklets carry NO answer key,
 * so each answer is LLM-derived; the per-question `solution` records the
 * derivation + a confidence flag. Committed PRIVATE pending human spot-check
 * before flipping PUBLIC. Idempotent: re-running upserts on (org_id, content_hash).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { validateRow, type RawRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";

// LWS Pune org + admin (same as the practice/JEE pipelines).
const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
const EXAM_ID = "07700c16-a2e3-4101-9f25-4c7956dd4882"; // CDS (seeded this session)
const SOURCE_FILE = "Eng_CDS_2026_1.pdf";
const PYQ_YEAR = 2026;
const PYQ_NOTE = "CDS (I) 2026 — English";

type Q = {
  number: number;
  chapter: string;
  subtopic: string;
  difficulty: string;
  context?: string | null;
  text: string;
  options: { label: string; text: string }[];
  answer: string;
  confidence: string;
  setLabel?: string;
  solution: string;
};

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function toRawRow(q: Q): RawRow {
  const opt = (l: string) => q.options.find((o) => o.label === l)?.text ?? "";
  return {
    sourceRow: q.number,
    questionNumber: String(q.number),
    setLabel: q.setLabel,
    subject: "English",
    chapter: q.chapter,
    subtopic: q.subtopic,
    context: q.context ? normalizeNewlines(q.context) : undefined,
    question: normalizeNewlines(q.text),
    optionA: normalizeNewlines(opt("A")),
    optionB: normalizeNewlines(opt("B")),
    optionC: normalizeNewlines(opt("C")),
    optionD: normalizeNewlines(opt("D")),
    answer: q.answer,
    difficulty: q.difficulty,
    solution: normalizeNewlines(q.solution),
  };
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();

  const questions: Q[] = JSON.parse(readFileSync(join(__dirname, "final.json"), "utf8"));
  console.log(`Loaded ${questions.length} questions from final.json`);

  const rows = [];
  const errors: string[] = [];
  for (const q of questions) {
    const v = validateRow(toRawRow(q));
    if (v.errors.length) errors.push(`Q${q.number}: ${v.errors.join("; ")}`);
    else rows.push(v.parsed!);
  }
  if (errors.length) {
    console.log(`\nVALIDATION ERRORS (${errors.length}):`);
    for (const e of errors) console.log("  " + e);
  }
  console.log(`\n${rows.length}/${questions.length} rows valid.`);

  // distribution + confidence report
  const byChap = new Map<string, number>();
  for (const q of questions) byChap.set(q.chapter, (byChap.get(q.chapter) ?? 0) + 1);
  console.log("\nby chapter:");
  for (const [k, n] of [...byChap].sort()) console.log(`  ${k.padEnd(24)} ${n}`);
  const med = questions.filter((q) => q.confidence !== "HIGH").map((q) => q.number);
  console.log(`\nLLM-derived answers needing review (confidence != HIGH): ${med.length}`);
  console.log("  " + med.join(", "));

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (errors.length) throw new Error("refusing to commit with validation errors.");

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

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
  console.log(`\nupload job: ${jobId}`);

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
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // Default visibility is PUBLIC (migration 0022) — force PRIVATE pending review.
  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", SOURCE_FILE);
  if (uErr) throw new Error(`visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE.`);

  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", SOURCE_FILE);
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
