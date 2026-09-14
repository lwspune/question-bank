/**
 * Commit one NDA GAT paper into the bank — PRIVATE, question_kind='pyq' — via
 * commitStaged (dedup / taxonomy / content_hash) plus an upload_jobs row.
 *
 *   npx tsx scripts/nda-gat/commit.ts <paperId>          # dry-run (validate only)
 *   npx tsx scripts/nda-gat/commit.ts <paperId> --apply  # write
 *
 * Reads data/<paperId>.questions.json (from merge.ts) + data/<paperId>.answers.json
 * (the blind derivation pass — see DERIVATION_BRIEF.md).
 *
 * ALWAYS PRIVATE, AND THAT IS LOAD-BEARING HERE. No UPSC booklet prints a key,
 * so every answer in this corpus is DERIVED. A single blind pass measures ~94%
 * on the GENERAL KNOWLEDGE half in this repo — about six wrong in a hundred —
 * and these rows feed the /mock runner, which grades real students against a
 * FROZEN score. So publishing waits for the external key to be reconciled
 * (reconcile-key.ts) and is a separate, deliberate act, never a side effect of
 * committing.
 *
 * AN EXTERNAL KEY IS NEVER READ HERE, deliberately. The committed answer is
 * always the derived one. reconcile-key.ts reads the key AFTER the derivation
 * exists and emits a work list rather than applying anything — a pipeline that
 * quietly substituted a source key would destroy the blind pass's independence.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { validateRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import {
  buildRecords,
  normalizeQuestions,
  validateCatalog,
  validateRows,
  validateSections,
  validateSets,
  ENGLISH_SUBJECT,
  type Derivation,
  type GatTQ,
} from "./lib";
import {
  CREATED_BY,
  EXAM_ID,
  ORG_ID,
  QUESTIONS_PER_PAPER,
  SOURCE_ROW_OFFSET,
  catalog,
  dataPath,
  requirePaper,
} from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Answers = { reconciled?: number[]; derivations: Derivation[] };

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  loadEnv();

  const qPath = dataPath(paper.id, "questions");
  const aPath = dataPath(paper.id, "answers");
  if (!existsSync(qPath)) throw new Error(`missing ${qPath} — run merge.ts first`);
  if (!existsSync(aPath)) throw new Error(`missing ${aPath} — run the derivation pass first`);

  const questions = normalizeQuestions(JSON.parse(readFileSync(qPath, "utf8"))) as GatTQ[];
  const answers: Answers = JSON.parse(readFileSync(aPath, "utf8"));
  const reconciled = new Set(answers.reconciled ?? []);

  const { errors: catErrors, warnings: catWarnings } = validateCatalog(questions, catalog(), {
    strictSubtopics: true,
  });
  const sectionErrors = validateSections(questions);
  const setErrors = validateSets(questions);

  const built = buildRecords(questions, answers.derivations, {
    reconciled,
    keyed: Boolean(paper.answerKey),
    sourceRowOffset: SOURCE_ROW_OFFSET,
  });
  // Normalise long-form text at the write boundary, mirroring the upload parser.
  // CONTEXT is included: it is long-form authored text like the others, and a
  // Directions block is the field most likely to carry a hand-typed newline.
  for (const r of built) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
  }

  // A row whose derivation answered null is dropped by buildRecords on purpose:
  // no printed option is correct, so committing it would mean inventing one.
  // Tell the coverage gate which those are, so it still catches a REAL hole.
  const noCorrectOption = new Set(
    answers.derivations.filter((d) => d.answer == null).map((d) => d.number)
  );
  if (noCorrectOption.size) {
    console.log(
      `\nDROPPED (no printed option is correct, per the derivation): ` +
        [...noCorrectOption].map((n) => `Q${n}`).join(", ")
    );
  }

  const errs = [
    ...catErrors,
    ...sectionErrors,
    ...setErrors,
    ...validateRows(built, 1, QUESTIONS_PER_PAPER, noCorrectOption),
  ];
  const parsed = [];
  for (const r of built) {
    const v = validateRow(r);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }

  // Report the split the way /mock will reconstruct it, so a mis-filed subject
  // is visible here rather than as an opaque count error at mock-build time.
  const english = questions.filter((q) => q.subject === ENGLISH_SUBJECT).length;
  console.log(
    `\n${paper.id} — ${questions.length} questions, ${answers.derivations.length} derivations` +
      `\n  sections: English ${english} (want 50) · General Knowledge ${questions.length - english} (want 100)`
  );

  const bySubject = new Map<string, number>();
  for (const q of questions) bySubject.set(q.subject, (bySubject.get(q.subject) ?? 0) + 1);
  console.log(`\nsubject mix:`);
  for (const [s, n] of [...bySubject.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${s.padEnd(18)} ${String(n).padStart(3)}`);
  }

  const byConf = new Map<string, number>();
  for (const d of answers.derivations) {
    const k = (d.confidence ?? "").toUpperCase();
    byConf.set(k, (byConf.get(k) ?? 0) + 1);
  }
  console.log(
    `\nderived-answer confidence: ${[...byConf.entries()].map(([k, v]) => `${k} ${v}`).join(" · ")}`
  );
  // The confidence split matters MORE on the GK half, where an answer is recall
  // rather than derivation and there is nothing on the page to check it against.
  const gkConf = new Map<string, number>();
  for (const d of answers.derivations) {
    if (d.number <= 50) continue;
    const k = (d.confidence ?? "").toUpperCase();
    gkConf.set(k, (gkConf.get(k) ?? 0) + 1);
  }
  console.log(
    `  General Knowledge only:  ${[...gkConf.entries()].map(([k, v]) => `${k} ${v}`).join(" · ")}`
  );
  if (reconciled.size) {
    console.log(`hand-reconciled: ${[...reconciled].sort((a, b) => a - b).join(", ")}`);
  }

  const figures = questions.filter((q) => q.hasFigure);
  if (figures.length) {
    console.log(`\n${figures.length} question(s) need a figure attached AFTER this commit:`);
    console.log(`  ${figures.map((q) => `Q${q.number}`).join(", ")}`);
  }

  if (catWarnings.length) console.log(`\nsubtopic warnings (${catWarnings.length}, soft)`);
  if (errs.length) {
    console.log(`\nVALIDATION ERRORS (${errs.length}):`);
    for (const e of errs) console.log(`  ${e}`);
  }
  console.log(`\n${parsed.length}/${QUESTIONS_PER_PAPER} rows valid.`);

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

  // Count PUBLIC rows BEFORE inserting anything — taken here this means what it
  // says ("was this paper already live before this run?"). Taken afterwards it
  // would be unusable on a first commit, because new rows default to PUBLIC
  // (migration 0022) and the guard would see the rows it just created.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0 && !process.argv.includes("--allow-unpublish")) {
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
    pyqMonth: paper.pyqMonth,
    pyqNote: paper.pyqNote,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // A skip on a PYQ ingest is not routine: content_hash matched an existing row,
  // i.e. this question is already in the bank under this exam. Name it rather
  // than letting a silent count stand for a question that was never on the
  // paper. UPSC is known to reuse English items between NDA and CDS, but
  // content_hash is per-(org, exam) — so a skip here means an NDA-internal
  // repeat or an earlier commit of this same paper.
  if (result.skipped > 0) {
    console.log(
      `\nNOTE: ${result.skipped} row(s) deduped against existing questions. On a PYQ ingest ` +
        `that is a finding — check whether UPSC reused the item across NDA sittings, or ` +
        `whether an earlier commit of this paper is still present.`
    );
  }

  // Default visibility is PUBLIC (migration 0022) — force PRIVATE. The guard for
  // this UPDATE is above, taken before the insert; see the comment there.
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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
