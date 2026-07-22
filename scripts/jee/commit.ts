/**
 * Commit one JEE paper into the bank — PRIVATE — via the existing commitStaged
 * pipeline (dedup / taxonomy auto-create / content_hash) + an upload_jobs row.
 *
 *   npx tsx scripts/jee/commit.ts <paperId>          # dry-run
 *   npx tsx scripts/jee/commit.ts <paperId> --apply  # write
 *
 * Reads out/<paperId>.records.json (from extract) + papers/<paperId>.json
 * (authored classification). Idempotent: re-running upserts on content_hash.
 * Images + solutions are separate passes (attach-images.ts, attach-solutions.ts).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { contentHash, numericContentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { keepForSubject, parseSubjectArg } from "./lib";
import { ORG_ID, EXAM_ID, CREATED_BY, loadPaper, recordsPath, requirePaperId, isCommittable, type PaperData } from "./config";

type Rec = {
  questionNumber: number;
  subject: string;
  status: string;
  stem: string;
  numericAnswer?: number | null;
  options: { label: "A" | "B" | "C" | "D"; text: string; isCorrect: boolean }[] | null;
};

function loadEnv() {
  const dotenv = require("dotenv");
  dotenv.config({ path: join(process.cwd(), ".env.local"), override: true });
}

function buildRows(paperId: string, paper: PaperData, subject?: string, numericOnly = false): ParsedRowPayload[] {
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
  const eligible = records
    .filter((r) => isCommittable(r.status, r.questionNumber, paper))
    // Maths-first single-subject pass: keep only the target subject's rows.
    // Phy/Chem rows are excluded BEFORE the classification requirement below,
    // so a Maths-only paper file needs no Phy/Chem classification.
    .filter((r) => keepForSubject(subject, r.subject, paper.classification[String(r.questionNumber)]?.subject))
    // Section-B backfill: commit ONLY the numeric (NAT) rows, leaving already-
    // committed+cleaned MCQ untouched (re-committing them would recompute the
    // content_hash from the raw extract, miss the dedup, and duplicate rows).
    // A numericOverride recovers a Section-B row whose answer token didn't parse.
    .filter((r) => !numericOnly || r.status === "numeric" || paper.numericOverrides?.[String(r.questionNumber)] !== undefined);

  return eligible.map((r) => {
    const key = String(r.questionNumber);
    const cls = paper.classification[key];
    if (!cls) throw new Error(`no classification for Q${r.questionNumber} in ${paperId}`);

    const text = normalizeNewlines(paper.stemOverrides?.[key] ?? r.stem);
    if (!text.trim()) throw new Error(`Q${r.questionNumber}: empty stem — add a stemOverride in papers/${paperId}.json`);

    // Section-B NAT: no options, exact numeric answer (override wins over parsed).
    if (r.status === "numeric" || paper.numericOverrides?.[key] !== undefined) {
      const numericAnswer = paper.numericOverrides?.[key] ?? r.numericAnswer;
      if (numericAnswer === null || numericAnswer === undefined) {
        throw new Error(`Q${r.questionNumber}: no numeric answer — add a numericOverride in papers/${paperId}.json`);
      }
      return {
        sourceRow: r.questionNumber,
        questionNumber: key,
        subjectName: cls.subject ?? r.subject,
        chapterName: cls.chapter,
        subtopicName: cls.subtopic,
        text,
        difficulty: "MODERATE" as const,
        solution: undefined,
        questionFormat: "numeric" as const,
        numericAnswer,
        options: [],
        contentHash: numericContentHash(text, null),
      };
    }

    // Answer: an explicit override (corrects a mis-keyed soln) wins over the extracted key.
    const answer = paper.answerOverrides?.[key] ?? r.options?.find((o) => o.isCorrect)?.label;
    if (!answer) throw new Error(`Q${r.questionNumber}: no answer — add an answerOverride in papers/${paperId}.json`);

    const optOverrides = paper.optionOverrides?.[key] ?? {};
    const LABELS = ["A", "B", "C", "D"] as const;
    // A needs_review row whose options didn't parse (r.options null/empty) can be
    // fully supplied via optionOverrides — if all four labels are present, synthesize
    // the base set from them; otherwise patch the parsed options as usual.
    let base = r.options ?? [];
    if (base.length === 0 && LABELS.every((l) => optOverrides[l])) {
      base = LABELS.map((l) => ({ label: l, text: optOverrides[l] as string, isCorrect: false }));
    }
    const options = base.map((o) => ({
      label: o.label,
      text: normalizeNewlines(optOverrides[o.label] ?? o.text),
      isCorrect: o.label === answer,
    }));
    if (options.length !== 4) throw new Error(`Q${r.questionNumber}: expected 4 options, got ${options.length}`);

    return {
      sourceRow: r.questionNumber,
      questionNumber: key,
      // Content-based subject (cls.subject) wins over the position-derived one
      // (r.subject) — required for non-standard compilations; see PaperData.
      subjectName: cls.subject ?? r.subject,
      chapterName: cls.chapter,
      subtopicName: cls.subtopic,
      text,
      difficulty: "MODERATE" as const,
      solution: undefined, // solutions attached in a later pass to keep this commit lean
      options,
      contentHash: contentHash(text, options.map((o) => o.text), answer),
    };
  });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const subject = parseSubjectArg(process.argv);
  const numericOnly = process.argv.includes("--numeric-only");
  const paperId = requirePaperId(process.argv, 2, "commit.ts <paperId> [--subject=Maths] [--numeric-only] [--apply]");
  loadEnv();
  const paper = loadPaper(paperId);
  const { sourceFile, pyqYear, pyqNote } = paper;
  const rows = buildRows(paperId, paper, subject, numericOnly);

  console.log(`Built ${rows.length} rows for JEE Mains ${paperId} (${sourceFile})${subject ? ` [subject=${subject}]` : ""}${numericOnly ? " [numeric-only]" : ""}.`);
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
  console.log(`upload job: ${jobId}`);

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: pyqYear,
    pyqNote: pyqNote,
  });
  console.log(`\ncommit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // Backfill upload_job_id on any existing rows for this paper that predate the job
  // (e.g. a prior no-job commit) so the /uploads page lists every question.
  await client
    .from("questions")
    .update({ upload_job_id: jobId })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile)
    .is("upload_job_id", null);

  // Freshly-committed rows stay PRIVATE until verified in /browse. On a
  // --numeric-only backfill scope this to the numeric rows so already-PUBLIC
  // MCQ for the same paper aren't taken offline.
  let flip = client
    .from("questions")
    .update({ visibility: "PRIVATE" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
  if (numericOnly) flip = flip.eq("question_format", "numeric");
  const { error: vErr, count } = await flip;
  if (vErr) throw new Error(`visibility flip failed: ${vErr.message}`);
  console.log(`set ${count} JEE rows to PRIVATE.`);

  // Finalize the job with accurate, run-count-independent totals.
  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
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
