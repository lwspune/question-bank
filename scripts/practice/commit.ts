/**
 * Commit one practice topic into the bank — PRIVATE, question_kind='practice' —
 * via the existing commitStaged pipeline (dedup / taxonomy reuse / content_hash)
 * + an upload_jobs row.
 *
 *   npx tsx scripts/practice/commit.ts <topicId>          # dry-run
 *   npx tsx scripts/practice/commit.ts <topicId> --apply  # write
 *
 * Reads the committed transcription (data/<topicId>.questions.json +
 * .solutions.json + optional .overrides.json) and parses the source answer-key
 * PDF (text layer) for the answer letters. Idempotent: re-running upserts on
 * (org_id, content_hash); the post-commit UPDATE re-stamps kind+visibility.
 */
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { buildRecords, parseAnswerKey, missingNumbers, findLatexImbalance, type TranscribedQuestion } from "./lib";
import {
  ORG_ID,
  EXAM_ID,
  CREATED_BY,
  requireTopic,
  questionsJsonPath,
  solutionsJsonPath,
  DATA,
} from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** Dump the answer-key PDF's text layer via PyMuPDF (the letters extract clean). */
function answerKeyText(pdf: string): string {
  const py = `
import fitz, sys, io
out = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
d = fitz.open(sys.argv[1])
out.write("\\n".join(d[p].get_text() for p in range(len(d))))
out.flush()
`;
  const res = spawnSync("python", ["-c", py, pdf], { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`answer-key extract failed: ${res.stderr}`);
  return res.stdout;
}

async function main() {
  const topicId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const topic = requireTopic(topicId);
  loadEnv();

  const questions: TranscribedQuestion[] = JSON.parse(readFileSync(questionsJsonPath(topicId), "utf8"));
  const solutionList: { number: number; solution: string }[] = JSON.parse(readFileSync(solutionsJsonPath(topicId), "utf8"));
  const solutions = new Map(solutionList.map((s) => [s.number, s.solution]));

  const overridesPath = join(DATA, `${topicId}.overrides.json`);
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

  // A topic with no printed answer key (e.g. an LWS test PDF) supplies every
  // answer via overrides.json; skip the PDF parse entirely.
  const answers = topic.answerKey
    ? parseAnswerKey(answerKeyText(topic.answerKey.pdf), topic.qFrom, topic.qTo)
    : new Map<number, string[]>();

  const gaps = missingNumbers(questions, topic.qFrom, topic.qTo);
  if (gaps.length) console.log(`coverage gaps (not transcribed): ${gaps.join(", ")}`);

  const { rows, flags } = buildRecords(topic, questions, answers, solutions, answerOverrides);

  console.log(`\nBuilt ${rows.length} practice rows for ${topic.chapterName} (Q${topic.qFrom}-${topic.qTo}).`);
  const bySub = new Map<string, number>();
  for (const r of rows) bySub.set(r.subtopicName!, (bySub.get(r.subtopicName!) ?? 0) + 1);
  console.log("\nby subtopic:");
  for (const [k, n] of [...bySub].sort()) console.log(`  ${k.padEnd(45)} ${n}`);

  if (overrideNotes.length) {
    console.log(`\nanswer overrides applied (${overrideNotes.length}) — source key blank/wrong, verified vs solution:`);
    for (const o of overrideNotes.sort((a, b) => a.number - b.number)) console.log(`  Q${o.number} -> ${o.answer}: ${o.reason}`);
  }

  if (flags.length) {
    console.log(`\nflags (${flags.length}) — review before flipping PUBLIC:`);
    for (const f of flags.sort((a, b) => a.number - b.number)) console.log(`  Q${f.number}: ${f.reason}`);
  }

  // LaTeX delimiter sanity over every field — a transcription typo here renders
  // broken in KaTeX/Word. Hard-stop on apply.
  const latexErrors: string[] = [];
  for (const r of rows) {
    const fields: [string, string | undefined][] = [["stem", r.text], ["solution", r.solution], ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string])];
    for (const [name, val] of fields) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) latexErrors.push(`Q${r.questionNumber} ${name}: ${bad}`);
    }
  }
  if (latexErrors.length) {
    console.log(`\nLaTeX imbalances (${latexErrors.length}):`);
    for (const e of latexErrors) console.log(`  ${e}`);
  } else {
    console.log("\nLaTeX delimiters balanced across all stems/options/solutions.");
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (latexErrors.length) throw new Error("refusing to commit with LaTeX imbalances — fix the transcription first.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const sourceFile = topic.sourceFile;

  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", sourceFile)
    .limit(1)
    .maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: null,
    pyqNote: topic.note ?? "NDA Maths practice — Algebra / Sequence & Series",
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // Re-stamp kind + visibility for every row of this source (idempotent). Practice
  // questions are PRIVATE pending review; question_kind keeps them off PYQ surfaces.
  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE", question_kind: "practice" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='practice'.`);

  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
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
