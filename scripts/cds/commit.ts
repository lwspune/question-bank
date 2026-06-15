/**
 * Commit one CDS English paper into the bank — PRIVATE, question_kind='pyq' —
 * via the existing commitStaged pipeline (dedup / taxonomy reuse / content_hash)
 * + an upload_jobs row. Answers are LLM-derived (no official key); committed
 * PRIVATE pending human spot-check.
 *
 *   npx tsx scripts/cds/commit.ts <paperId>          # dry-run (validate only)
 *   npx tsx scripts/cds/commit.ts <paperId> --apply  # write
 *
 * Reads data/<paperId>.{sections,questions,underlines}.json (produced by the
 * agent passes in README.md), assembles rows via lib.buildRecords, validates,
 * then commitStaged + flips visibility to PRIVATE. Idempotent on (org_id, content_hash).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { validateRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { buildRecords, normalizeQuestions, validateRows, type Section, type Underlines } from "./lib";
import { ORG_ID, CREATED_BY, EXAM_ID, requirePaper, dataPath } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const paperId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const paper = requirePaper(paperId);
  loadEnv();

  const sections: Section[] = JSON.parse(readFileSync(dataPath(paper.id, "sections"), "utf8"));
  const questions = normalizeQuestions(JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8")));
  const ulPath = dataPath(paper.id, "underlines");
  const underlines: Underlines = existsSync(ulPath) ? JSON.parse(readFileSync(ulPath, "utf8")) : {};

  const { rows: built, flags } = buildRecords(sections, questions, underlines);
  // normalize long-form text at the write boundary (mirrors the upload parser)
  for (const r of built) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
  }

  const errs = validateRows(built, 1, 120);
  const parsed = [];
  for (const r of built) {
    const v = validateRow(r);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }

  // report
  const bySec = new Map<string, number>();
  for (const s of sections) bySec.set(`${s.setLabel} ${s.type}`, s.qTo - s.qFrom + 1);
  console.log(`\n${paper.id}: ${sections.length} sections, ${questions.length} questions`);
  for (const [k, n] of bySec) console.log(`  ${k.padEnd(34)} ${n}`);
  const med = questions.filter((q) => q.confidence.toUpperCase() !== "HIGH").map((q) => q.number);
  console.log(`\nLLM-derived answers needing review (confidence != HIGH): ${med.length}`);
  if (med.length) console.log("  " + med.join(", "));
  if (flags.length) { console.log(`\nbuild flags (${flags.length}):`); for (const f of flags) console.log(`  Q${f.number}: ${f.reason}`); }
  if (errs.length) { console.log(`\nVALIDATION ERRORS (${errs.length}):`); for (const e of errs) console.log("  " + e); }
  console.log(`\n${parsed.length}/${questions.length} rows valid.`);

  if (!apply) { console.log("\n[dry-run] pass --apply to write. Nothing inserted."); return; }
  if (errs.length) throw new Error("refusing to commit with validation errors — fix the transcription first.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: existingJob } = await client.from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", paper.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client.from("upload_jobs").insert({ org_id: ORG_ID, filename: paper.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: parsed.length }).select("id").single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  const result = await commitStaged(client, { orgId: ORG_ID, examId: EXAM_ID, filename: paper.sourceFile, createdBy: CREATED_BY, rows: parsed, uploadJobId: jobId, pyqYear: paper.pyqYear, pyqNote: paper.pyqNote });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // Default visibility is PUBLIC (migration 0022) — force PRIVATE pending review.
  const { error: uErr, count } = await client.from("questions").update({ visibility: "PRIVATE" }, { count: "exact" }).eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(`visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE.`);

  const { count: linked } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile);
  await client.from("upload_jobs").update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() }).eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
