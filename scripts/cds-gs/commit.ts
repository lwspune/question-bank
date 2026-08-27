/**
 * Commit one CDS General Knowledge paper into the bank — PRIVATE,
 * question_kind='pyq' — via commitStaged (dedup / taxonomy / content_hash) plus
 * an upload_jobs row.
 *
 *   npx tsx scripts/cds-gs/commit.ts <paperId>          # dry-run (validate only)
 *   npx tsx scripts/cds-gs/commit.ts <paperId> --apply  # write
 *
 * Reads data/<paperId>.questions.json (from merge.ts) + data/<paperId>.answers.json
 * (the adjudicated output of the dual-blind derivation — see README.md).
 *
 * ALWAYS PRIVATE. This corpus has no printed key and no external anchor, so
 * publishing is a separate, deliberate decision taken after a human has looked
 * at the numbers — never a side effect of committing.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { validateRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { buildRecords, normalizeQuestions, validateCatalog, validateRows, type Derivation, type TQ } from "./lib";
import { CREATED_BY, EXAM_ID, ORG_ID, QUESTIONS_PER_PAPER, catalog, dataPath, requirePaper } from "./config";

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
  if (!existsSync(aPath)) throw new Error(`missing ${aPath} — run the derivation passes first`);

  const questions: TQ[] = normalizeQuestions(JSON.parse(readFileSync(qPath, "utf8")));
  const answers: Answers = JSON.parse(readFileSync(aPath, "utf8"));
  const reconciled = new Set(answers.reconciled ?? []);

  const { errors: catErrors, warnings: catWarnings } = validateCatalog(questions, catalog());

  const built = buildRecords(questions, answers.derivations, { reconciled });
  // Normalise long-form text at the write boundary, mirroring the upload parser.
  for (const r of built) {
    r.question = normalizeNewlines(r.question);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
  }

  const errs = [...catErrors, ...validateRows(built, 1, QUESTIONS_PER_PAPER)];
  const parsed = [];
  for (const r of built) {
    const v = validateRow(r);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }

  const mix = new Map<string, number>();
  for (const q of questions) mix.set(q.subject, (mix.get(q.subject) ?? 0) + 1);
  console.log(`\n${paper.id} — ${questions.length} questions, ${answers.derivations.length} derivations`);
  for (const [s, n] of [...mix.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${s.padEnd(18)} ${String(n).padStart(3)}`);
  }

  const byConf = new Map<string, number>();
  for (const d of answers.derivations) byConf.set(d.confidence.toUpperCase(), (byConf.get(d.confidence.toUpperCase()) ?? 0) + 1);
  console.log(`\nderived-answer confidence: ${[...byConf.entries()].map(([k, v]) => `${k} ${v}`).join(" · ")}`);
  if (reconciled.size) console.log(`hand-reconciled after a blind disagreement: ${[...reconciled].sort((a, b) => a - b).join(", ")}`);
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

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

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
      .insert({ org_id: ORG_ID, filename: paper.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: parsed.length })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  // Count PUBLIC rows BEFORE inserting anything.
  //
  // The sibling CDS English pipeline takes this count AFTER commitStaged, which
  // makes it unusable on a first commit: new rows default to PUBLIC (migration
  // 0022), so the guard sees the 120 rows it just created and refuses a paper
  // that was never published at all. Taken here, it means what it says — "was
  // this paper already live before this run?" — and only a genuine re-commit of
  // a published paper can trip it.
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
    pyqNote: paper.pyqNote,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

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
