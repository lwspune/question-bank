/**
 * Commit one NEET paper into the bank — PRIVATE, question_kind='pyq' — via the
 * existing commitStaged pipeline (dedup / taxonomy reuse / content_hash) + an
 * upload_jobs row. Answers are the booklet's OFFICIAL keys (transcribed verbatim,
 * options mapped positionally (1)-(4) → A-D); committed PRIVATE pending a human
 * spot-check before flipping PUBLIC.
 *
 *   npx tsx scripts/neet/commit.ts <paperId>          # dry-run (validate only)
 *   npx tsx scripts/neet/commit.ts <paperId> --apply  # write
 *
 * Reads the 4 per-subject transcription files data/<paperId>.{physics,chemistry,
 * botany,zoology}.json, merges + orders by question number, assembles rows via
 * lib.buildRecords, validates, then commitStaged + forces visibility PRIVATE.
 * Idempotent on (org_id, exam_id, content_hash).
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { validateRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { buildRecords, normalizeQuestions, validateRows } from "./lib";
import { ORG_ID, CREATED_BY, EXAM_ID, DATA, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const paperId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const paper = requirePaper(paperId);
  loadEnv();

  // merge all transcription part-files for this paper: data/<paperId>.<part>.json
  // (each record carries its own subject, so the filename/part is just a shard label).
  const raw: unknown[] = [];
  const present: string[] = [];
  const files = readdirSync(DATA).filter((f) => f.startsWith(`${paper.id}.`) && f.endsWith(".json")).sort();
  for (const f of files) {
    const arr = JSON.parse(readFileSync(join(DATA, f), "utf8")) as unknown[];
    raw.push(...arr);
    present.push(`${f.replace(`${paper.id}.`, "").replace(".json", "")}:${arr.length}`);
  }
  if (!raw.length) throw new Error(`no transcription files found for paper "${paper.id}" under scripts/neet/data/`);

  const questions = normalizeQuestions(raw).sort((a, b) => a.number - b.number);
  const { rows: built, flags } = buildRecords(questions);
  for (const r of built) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
  }

  // structural validation. Only enforce full 1..180 coverage once every number is present.
  const nums = new Set(questions.map((q) => q.number));
  const full = Array.from({ length: 180 }, (_, i) => i + 1).every((n) => nums.has(n));
  const errs = validateRows(built, 1, full ? 180 : 0);
  const parsed = [];
  for (const r of built) {
    const v = validateRow(r);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }

  // report
  console.log(`\n${paper.id}: ${questions.length} questions [${present.join(", ")}]`);
  const review = questions.filter((q) => (q.confidence || "").toUpperCase() !== "HIGH").map((q) => q.number);
  console.log(`answers needing review (confidence != HIGH): ${review.length}${review.length ? " -> " + review.join(", ") : ""}`);
  const figs = questions.filter((q) => q.hasFigure).map((q) => q.number);
  console.log(`stem figures to attach later: ${figs.length}${figs.length ? " -> " + figs.join(", ") : ""}`);
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
