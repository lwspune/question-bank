/**
 * Commit one Pariksha (Vidhya Vikashni) test into the bank — PRIVATE,
 * question_kind='practice' — under the NEET exam via the existing commitStaged pipeline
 * (dedup / taxonomy reuse / content_hash) + an upload_jobs row.
 *
 *   npx tsx scripts/pariksha/commit.ts <testId>          # dry-run (validate only)
 *   npx tsx scripts/pariksha/commit.ts <testId> --apply  # write
 *
 * Reads the transcription shards data/<testId>.*.json (excluding .keys/.figures/.figure-verify),
 * merges + orders by question number, then — for a KEYED test — overlays the authoritative
 * answer key from data/<testId>.keys.json (extract-keys.ts) over each question's answer.
 * A keyless test keeps the transcription agent's DERIVED answer (already REVIEW-flagged via
 * confidence != HIGH). Assembles rows via lib.buildRecords, validates, commitStaged, then
 * forces visibility=PRIVATE + question_kind='practice'. Idempotent on (org_id, exam_id, content_hash).
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { validateRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { buildRecords, normalizeQuestions, validateRows } from "./lib";
import { ORG_ID, CREATED_BY, EXAM_ID, DATA, dataPath, requireTest } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const RESERVED = /\.(keys|figures.*|figure-verify)\.json$/;

async function main() {
  const testId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const test = requireTest(testId);
  loadEnv();

  // merge transcription shards for this test (each record carries its own subject).
  const raw: unknown[] = [];
  const present: string[] = [];
  const files = readdirSync(DATA)
    .filter((f) => f.startsWith(`${test.id}.`) && f.endsWith(".json") && !RESERVED.test(f))
    .sort();
  for (const f of files) {
    const arr = JSON.parse(readFileSync(join(DATA, f), "utf8")) as unknown[];
    raw.push(...arr);
    present.push(`${f.replace(`${test.id}.`, "").replace(".json", "")}:${arr.length}`);
  }
  if (!raw.length) throw new Error(`no transcription files found for test "${test.id}" under scripts/pariksha/data/`);

  const questions = normalizeQuestions(raw).sort((a, b) => a.number - b.number);

  // Overlay the authoritative answer key (keyed tests only).
  const keysFile = dataPath(test.id, "keys");
  let keyed = 0;
  if (existsSync(keysFile)) {
    const keys = JSON.parse(readFileSync(keysFile, "utf8")) as Record<string, string>;
    for (const q of questions) {
      const k = keys[String(q.number)];
      if (k) { q.answer = k.toUpperCase(); keyed++; }
    }
  }

  const { rows: built0, flags } = buildRecords(questions);
  for (const r of built0) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
  }

  // Drop exact-duplicate rows within the test (same normalized stem + sorted options +
  // answer) — coaching tests sometimes repeat a question verbatim. The DB upsert dedups
  // on content_hash anyway; removing them here keeps the in-memory validator honest and
  // the reported count aligned with what actually lands. Conflicting-key near-dups are
  // NOT touched (different answer → different key → kept).
  const contentKey = (r: (typeof built0)[number]) =>
    [r.question.replace(/\s+/g, " ").trim(),
     ...[r.optionA, r.optionB, r.optionC, r.optionD].map((o) => (o || "").replace(/\s+/g, " ").trim()).sort(),
     (r.answer || "").toUpperCase()].join("\n");
  const seenKey = new Set<string>();
  const built = [];
  const dropped: string[] = [];
  for (const r of built0) {
    const k = contentKey(r);
    if (seenKey.has(k)) { dropped.push(String(r.questionNumber ?? r.sourceRow)); continue; }
    seenKey.add(k); built.push(r);
  }
  if (dropped.length) console.log(`dropped ${dropped.length} exact-duplicate row(s): Q${dropped.join(", Q")}`);

  // structural validation; enforce full 1..N coverage only once every number is present.
  const nums = new Set(questions.map((q) => q.number));
  const full = Array.from({ length: test.questionCount }, (_, i) => i + 1).every((n) => nums.has(n));
  // Coverage is checked against the ORIGINAL numbers (pre-dedup) — a number removed as an
  // exact duplicate isn't a real gap, so drop its spurious "missing Q<n>" error.
  const droppedSet = new Set(dropped);
  const errs = validateRows(built, 1, full ? test.questionCount : 0).filter((e) => {
    const m = e.match(/^missing Q(\d+)$/);
    return !(m && droppedSet.has(m[1]));
  });
  const parsed = [];
  for (const r of built) {
    const v = validateRow(r);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }

  // report
  console.log(`\n${test.id}: ${questions.length}/${test.questionCount} questions [${present.join(", ")}]`);
  console.log(`answer keys: ${test.hasKey ? `${keyed} overlaid from ${test.id}.keys.json (authoritative)` : "DERIVED by agent (keyless test — stays PRIVATE)"}`);
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
  const { data: existingJob } = await client.from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", test.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client.from("upload_jobs").insert({ org_id: ORG_ID, filename: test.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: parsed.length }).select("id").single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  const result = await commitStaged(client, { orgId: ORG_ID, examId: EXAM_ID, filename: test.sourceFile, createdBy: CREATED_BY, rows: parsed, uploadJobId: jobId, pyqYear: null, pyqNote: test.note });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // Practice questions: PRIVATE pending review + question_kind='practice' (keeps them off PYQ surfaces).
  const { error: uErr, count } = await client.from("questions").update({ visibility: "PRIVATE", question_kind: "practice" }, { count: "exact" }).eq("exam_id", EXAM_ID).eq("source_file", test.sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='practice'.`);

  const { count: linked } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", EXAM_ID).eq("source_file", test.sourceFile);
  await client.from("upload_jobs").update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() }).eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
