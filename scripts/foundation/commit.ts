/**
 * Commit one Foundation worksheet into the bank — PRIVATE, question_kind='practice'
 * — via the existing commitStaged pipeline (dedup / taxonomy reuse / content_hash)
 * + an upload_jobs row. Pure merge/validation helpers reused from scripts/practice/lib.ts.
 *
 *   npx tsx scripts/foundation/commit.ts <worksheetId>          # dry-run
 *   npx tsx scripts/foundation/commit.ts <worksheetId> --apply  # write
 *
 * No printed answer key: every answer comes from data/<id>.overrides.json
 * ({number: {answer, reason}}). Solutions optional (data/<id>.solutions.json).
 * Idempotent: upserts on (org, exam, content_hash) + re-stamps kind/visibility.
 *
 * Re-commit hazard (same as scripts/practice): editing a stem/option/answer
 * changes content_hash → re-commit INSERTS + orphans the old row. Delete the
 * source's rows first (`delete from questions where source_file='<sourceFile>'`),
 * then re-commit. Editing only `solution` text is safe.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { buildRecords, missingNumbers, findLatexImbalance, type TranscribedQuestion } from "../practice/lib";
import { ORG_ID, EXAM_ID, CREATED_BY, requireWorksheet, questionsJsonPath, DATA } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ws = requireWorksheet(id);
  loadEnv();

  const questions: TranscribedQuestion[] = JSON.parse(readFileSync(questionsJsonPath(id), "utf8"));

  const solPath = join(DATA, `${id}.solutions.json`);
  const solutions = new Map<number, string>(
    existsSync(solPath)
      ? (JSON.parse(readFileSync(solPath, "utf8")) as { number: number; solution: string }[]).map((s) => [s.number, s.solution])
      : []
  );

  const overridesPath = join(DATA, `${id}.overrides.json`);
  const answerOverrides: Record<number, string[]> = {};
  const overrideNotes: { number: number; answer: string; reason: string }[] = [];
  if (existsSync(overridesPath)) {
    const raw = JSON.parse(readFileSync(overridesPath, "utf8")) as Record<string, { answer: string; reason: string }>;
    for (const [num, o] of Object.entries(raw)) {
      if (num.startsWith("_")) continue;
      answerOverrides[Number(num)] = [o.answer];
      overrideNotes.push({ number: Number(num), answer: o.answer, reason: o.reason });
    }
  }

  const nums = questions.map((q) => q.number);
  const qFrom = Math.min(...nums), qTo = Math.max(...nums);
  const gaps = missingNumbers(questions, qFrom, qTo);
  if (gaps.length) console.log(`coverage gaps (excluded/not transcribed): ${gaps.join(", ")}`);

  // No printed answer key → answers map empty; everything via answerOverrides.
  const { rows, flags } = buildRecords(
    { chapterName: ws.chapterName, qFrom, qTo, subtopics: ws.subtopics, subjectName: ws.subjectName },
    questions,
    new Map<number, string[]>(),
    solutions,
    answerOverrides
  );

  console.log(`\nBuilt ${rows.length} practice rows for ${ws.subjectName} / ${ws.chapterName} (Q${qFrom}-${qTo}).`);
  const bySub = new Map<string, number>();
  for (const r of rows) bySub.set(r.subtopicName!, (bySub.get(r.subtopicName!) ?? 0) + 1);
  console.log("\nby subtopic:");
  for (const [k, n] of [...bySub].sort()) console.log(`  ${k.padEnd(48)} ${n}`);

  const reviewNotes = overrideNotes.filter((o) => /REVIEW/i.test(o.reason));
  console.log(`\nderived answers: ${overrideNotes.length} (all from overrides — no printed key). REVIEW-flagged: ${reviewNotes.length}`);
  for (const o of reviewNotes.sort((a, b) => a.number - b.number)) console.log(`  Q${o.number} -> ${o.answer}: ${o.reason}`);

  if (flags.length) {
    console.log(`\nflags (${flags.length}):`);
    for (const f of flags.sort((a, b) => a.number - b.number)) console.log(`  Q${f.number}: ${f.reason}`);
  }

  const latexErrors: string[] = [];
  for (const r of rows) {
    const fields: [string, string | undefined][] = [["stem", r.text], ["solution", r.solution], ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string])];
    for (const [name, val] of fields) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) latexErrors.push(`Q${r.sourceRow} ${name}: ${bad}`);
    }
  }
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
    .from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", ws.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: ws.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id").single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  const result = await commitStaged(client, {
    orgId: ORG_ID, examId: EXAM_ID, filename: ws.sourceFile, createdBy: CREATED_BY,
    rows, uploadJobId: jobId, pyqYear: null, pyqNote: ws.note,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE", question_kind: "practice" }, { count: "exact" })
    .eq("exam_id", EXAM_ID).eq("source_file", ws.sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='practice'.`);

  const { count: linked } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).eq("source_file", ws.sourceFile);
  await client.from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
