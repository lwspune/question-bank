/**
 * Commit one State Board textbook chapter into the bank — PRIVATE,
 * question_kind='practice' — via the existing commitStaged pipeline
 * (dedup / taxonomy reuse / content_hash / set_id) + an upload_jobs row.
 *
 *   npx tsx scripts/ncert/commit.ts <chapterId>          # dry-run
 *   npx tsx scripts/ncert/commit.ts <chapterId> --apply  # write
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
import { ORG_ID, CREATED_BY, requireChapter, questionsJsonPath } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  const questions: SBQuestion[] = JSON.parse(readFileSync(questionsJsonPath(id), "utf8"));

  // CONTROL-CHARACTER GUARD on the transcription itself.
  //
  // apply-solutions.ts already refuses control characters in an AUTHORED solution,
  // but nothing checked the transcription's own stem/context — so a band file, or a
  // hand-patched `context`, could carry the corruption straight into the bank.
  //
  // The signature: \t \b \f \v are all valid LaTeX command starts (\text, \beta,
  // \frac, \vec). When a shell layer eats one backslash level the escape resolves to
  // the CONTROL CHARACTER instead, so "\text{cm}" becomes TAB + "ext{cm}" and renders
  // as garbage while every other check passes — the delimiters still balance, the JSON
  // still parses, and a control-character scan that whitelists TAB as "benign
  // whitespace" cannot see it. That whitelist is exactly how this reached a `context`
  // field on 2026-09-07, and the typechecker (not the probe) is what caught it.
  //
  // TAB is therefore NOT exempt here. Newline IS, because prose legitimately contains
  // one and normalizeNewlines depends on it.
  const CTRL = /[\t\f\v\b\0]/;
  const corrupt = questions.flatMap((q) =>
    (["stem", "context", "solution"] as const)
      .filter((f) => typeof q[f] === "string" && CTRL.test(q[f] as string))
      .map((f) => `${q.ref}: control character in ${f} (heredoc corruption — author it with the Write tool)`)
  );
  if (corrupt.length) {
    throw new Error(`refusing to commit ${corrupt.length} corrupt field(s):\n  ${corrupt.join("\n  ")}`);
  }
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

  const result = await commitStaged(client, {
    orgId: ORG_ID, examId: ch.examId, filename: ch.sourceFile, createdBy: CREATED_BY,
    rows, uploadJobId: jobId, pyqYear: null, pyqNote: ch.note,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE", question_kind: "practice" }, { count: "exact" })
    .eq("exam_id", ch.examId).eq("source_file", ch.sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='practice'.`);

  const { count: linked } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", ch.examId).eq("source_file", ch.sourceFile);
  await client.from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
