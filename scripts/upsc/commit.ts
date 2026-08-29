/**
 * Commit one UPSC CSE (Prelims) paper into the bank — PRIVATE, question_kind='pyq'
 * — via commitStaged (dedup / taxonomy / content_hash) plus an upload_jobs row.
 *
 *   npx tsx scripts/upsc/commit.ts 2025-p1          # dry-run: validate, write nothing
 *   npx tsx scripts/upsc/commit.ts 2025-p1 --apply
 *
 * Reads  data/<paperId>.merged.json    the transcription
 *        data/<paperId>.answers.json   the reconciled dual-blind derivation
 *
 * ALWAYS PRIVATE, and that is the pipeline's central safety property. This corpus
 * has NO printed key and NO external anchor: every answer is derived. Two blind
 * passes agreeing bounds disagreement risk but says nothing about CORRELATED
 * error — both passes can be confidently wrong the same way on a fact-recall
 * item. Publishing is a separate, deliberate decision that should rest on the
 * measured agreement rate, not on this script having run.
 *
 * Rollback is by `source_file`: every row this writes carries the booklet's
 * filename, so one DELETE removes exactly this paper and nothing else.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { validateRow } from "../../src/lib/upload/validate";
import { CREATED_BY, EXAM_ID, ORG_ID, PROVISIONAL_KEYS, dataPath, pattern, requirePaper, type Paper } from "./config";
import { buildRecords, validateRows, type Derivation, type TQ } from "./lib";

/**
 * The `pyq_note` stamped on every row of a paper.
 *
 * For a paper whose key is PROVISIONAL, the note SAYS SO. Every other answer in
 * this corpus is verified against a final, post-cycle UPSC key; 2026's rests on
 * a key published three days after the exam, before its objection window had
 * even closed. That is weaker evidence, and a row that does not announce it
 * reads exactly like one that does not need to — the same failure the CDS-GK
 * corpus has to guard against with its derived-answer clause.
 *
 * Deliberately part of the ROW, not just a comment in config: `fetch-keys.ts`
 * and this file can both be read by a maintainer, but neither travels with a
 * question into a paper, an export, or a later audit.
 */
export function pyqNoteFor(paper: Paper): string {
  if (!PROVISIONAL_KEYS.has(paper.id)) return paper.pyqNote;
  return (
    `${paper.pyqNote}. Answer verified against UPSC's PROVISIONAL answer key ` +
    `(released 2026-05-27, objection window closed 2026-05-31), NOT the final ` +
    `post-cycle key used for every other year in this corpus. Supersede when ` +
    `the final key is published.`
  );
}

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);

  const mergedFile = dataPath(paper.id, "merged");
  const answersFile = dataPath(paper.id, "answers");
  for (const f of [mergedFile, answersFile]) {
    if (!existsSync(f)) throw new Error(`${f} not found — run merge.ts / crosstab.ts --apply first.`);
  }

  const questions: TQ[] = JSON.parse(readFileSync(mergedFile, "utf8")).questions;
  const answersRaw = JSON.parse(readFileSync(answersFile, "utf8"));
  const answers: Derivation[] = answersRaw.answers;
  const reconciled = new Set<number>(answersRaw.reconciled ?? []);
  // Questions UPSC WITHDREW. They carry no correct answer, so they are absent
  // from the rows on purpose and must not read as a coverage failure.
  const dropped: number[] = answersRaw.dropped ?? [];

  const built = buildRecords(questions, answers, { reconciled });
  // Normalise long-form text at the write boundary, mirroring the upload parser.
  // `commitStaged` REJECTS a literal "\n" rather than repairing it, because
  // content_hash is computed by the caller from the pre-normalisation text.
  for (const r of built) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
  }

  console.log(`${paper.id}  Paper ${paper.paper}  "${pyqNoteFor(paper)}"`);
  if (PROVISIONAL_KEYS.has(paper.id)) {
    console.log(
      `!! PROVISIONAL KEY. Every row will carry that fact in its pyq_note.\n` +
        `   Re-run keycheck against the FINAL key when UPSC publishes it, and treat\n` +
        `   any answer that moves as a correction rather than a re-derivation.`
    );
  }
  console.log(`source_file: ${paper.sourceFile}`);
  console.log(`${questions.length} transcribed, ${answers.length} derived, ${built.length} rows assembled`);
  console.log(`${reconciled.size} answer(s) reconciled by hand, ${answers.length - reconciled.size} agreed blind\n`);

  // Run each row through the SAME validator the Excel upload path uses, so this
  // pipeline cannot write a row shape the normal ingest would have rejected.
  const errs = validateRows(built, 1, pat.questions, { exclude: dropped });
  const parsed = [];
  for (const r of built) {
    const v = validateRow(r);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }

  if (errs.length) {
    console.log(`VALIDATION: ${errs.length} error(s)`);
    for (const e of errs.slice(0, 40)) console.log(`  - ${e}`);
    if (errs.length > 40) console.log(`  ... and ${errs.length - 40} more`);
  } else {
    console.log(`VALIDATION: ok (${parsed.length} rows, coverage 1..${pat.questions})`);
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (errs.length) throw new Error("refusing to commit with validation errors — fix the source first.");

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", paper.sourceFile)
    .limit(1)
    .maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({
        org_id: ORG_ID,
        filename: paper.sourceFile,
        created_by: CREATED_BY,
        status: "PROCESSING",
        total_rows: parsed.length,
      })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  // Count PUBLIC rows BEFORE inserting anything.
  //
  // Taken after commitStaged this guard is unusable on a first commit: new rows
  // default to PUBLIC (migration 0022), so it would see the rows it just created
  // and refuse a paper that was never published at all. Taken here it means what
  // it says — "was this paper already live before this run?" — so only a genuine
  // re-commit of a published paper trips it.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0 && !args.includes("--allow-unpublish")) {
    throw new Error(
      `${publicBefore} row(s) of ${paper.sourceFile} are already PUBLIC, and this run would ` +
        `set the whole paper PRIVATE. Re-run with --allow-unpublish if that is what you intend, ` +
        `then re-publish deliberately.`
    );
  }

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: paper.sourceFile,
    createdBy: CREATED_BY,
    rows: parsed,
    uploadJobId: jobId,
    pyqYear: paper.pyqYear,
    pyqNote: pyqNoteFor(paper),
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // A skip is content_hash dedup absorbing a row into an existing one. On a PYQ
  // ingest that is almost never benign — it means two items of one paper hashed
  // the same — so name them rather than printing a count.
  if (result.skipped > 0) {
    console.log(
      `\n!! ${result.skipped} row(s) were SKIPPED as duplicates. On a 1..${pat.questions} ` +
        `paper that means two items collided on content_hash — investigate before trusting this commit.`
    );
  }

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(`visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE.`);

  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
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

  console.log(`done. ${linked} rows linked to job ${jobId}.`);
  // A paper with questions UPSC withdrew commits FEWER rows than the paper has
  // items, by design — they carry no correct answer. Comparing against the raw
  // item count would flag every such paper as short.
  const expected = pat.questions - dropped.length;
  if ((linked ?? 0) !== expected) {
    console.log(
      `\n!! expected ${expected} row(s) for this paper` +
        (dropped.length ? ` (${pat.questions} items minus ${dropped.length} dropped)` : "") +
        `, found ${linked}.`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
