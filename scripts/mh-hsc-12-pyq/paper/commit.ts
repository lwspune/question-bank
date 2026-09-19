/**
 * Commit a transcribed board paper to the bank, PRIVATE, question_kind='pyq'.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/commit.ts <paperId>           # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/paper/commit.ts <paperId> --apply
 *
 * ONE PAPER = ONE SITTING = ONE `commitStaged` CALL. `pyq_year` and `pyq_month`
 * are per-call, and they come from the PRINTED COVER via config.ts, never from
 * the filename — two of the six source files are misnamed.
 *
 * ## The silent-loss problem this script exists to prevent
 *
 * `content_hash` is unique on `(org_id, exam_id, content_hash)` — per EXAM. This
 * corpus files board PYQs into chapters that already hold the Balbharati
 * textbook exercises AND ten years of earlier board papers, and boards reuse
 * questions heavily: the "homogeneous equation of degree two represents a pair
 * of lines" bookwork has now been set in 2016, 2018, 2020, 2025 AND 2026 — five
 * sittings, five different phrasings of one theorem.
 *
 * (An earlier version of this comment also claimed the chain-rule proof recurred
 * four times. It does not. That count came from an ILIKE on "differentiable
 * function of", which matches THREE different theorems — the chain rule, the
 * derivative of an inverse function, and the parametric-form derivative. A
 * shared phrase is not a shared question.)
 *
 * So an exact-text repeat does not insert. It is ABSORBED into the existing row:
 * no new question, no 2026 provenance, and the only signal is `skipped=N`. In a
 * WHOLE-PAPER ingest that is indistinguishable from a question that was never on
 * the paper — which is the one thing a complete-sitting ingest must never be
 * confused about. This script therefore NAMES every absorbed row and what
 * absorbed it, reusing the sibling pipeline's approach.
 *
 * ## Refusals
 *
 * - a transcription that does not reconcile against the printed 44 refs
 * - an MCQ with no derived answer (it would ship with no correct option)
 * - a question with no authored solution
 * - a `reconcile` paper, unless `--allow-reconcile` is passed: those two
 *   sittings already have 42 and 44 rows in the bank from the compilation, so
 *   committing them is a MERGE into shipped content, not an ingest. That is
 *   gated on a 360 analysis — see ./README.md.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { ORG_ID, CREATED_BY, EXAM_ID, PAPERS, requirePaper, questionsJsonPath } from "./config";
import { HSC_MATHS_CATALOG } from "./catalog";
import { reconcileRefs } from "./lib";
import { buildPaperRecords, type PaperQuestion } from "../../mh-ssc-10/lib";
import { commitStaged } from "../../../src/lib/upload/commit";
import { contentHash, subjectiveContentHash } from "../../../src/lib/upload/hash";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const allowReconcile = process.argv.includes("--allow-reconcile");
  if (!id) {
    console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/commit.ts <paperId> [--apply] [--allow-reconcile]`);
    console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
    process.exit(1);
  }
  const paper = requirePaper(id);

  if (paper.bankStatus === "reconcile" && !allowReconcile) {
    throw new Error(
      `${id} is a RECONCILE paper: ${paper.bankRows} of its 44 questions are already PUBLIC in the bank,\n` +
        `  committed from the LWS compilation. Committing it is a merge into shipped content, not an\n` +
        `  ingest, and content_hash covers the stem so corrections are delete + re-commit.\n` +
        `  That needs a 360 analysis and sign-off first — see scripts/mh-hsc-12-pyq/paper/README.md.\n` +
        `  Pass --allow-reconcile only once that has happened.`,
    );
  }

  const path = questionsJsonPath(id);
  if (!existsSync(path)) throw new Error(`${id}: no transcription at ${path}`);
  const questions = JSON.parse(readFileSync(path, "utf8")) as PaperQuestion[];

  // Completeness, both ways, before anything is written.
  const rec = reconcileRefs(questions.map((q) => q.ref));
  const blockers: string[] = [
    ...rec.missing.map((r) => `${r}: missing from the transcription`),
    ...rec.unexpected.map((r) => `${r}: not a ref on this paper`),
    ...rec.duplicates.map((r) => `${r}: transcribed twice`),
    ...questions.filter((q) => q.format === "mcq" && !q.answer).map((q) => `${q.ref}: MCQ with no derived answer`),
    ...questions.filter((q) => !q.solution?.trim()).map((q) => `${q.ref}: no authored solution`),
  ];
  if (blockers.length) {
    for (const b of blockers) console.error(`  ✗ ${b}`);
    throw new Error(`${blockers.length} blocker(s) — refusing to commit.`);
  }

  const { rows, flags } = buildPaperRecords(HSC_MATHS_CATALOG, questions);
  console.log(`${paper.id}  ${paper.month} ${paper.year}  ${paper.paperCode}`);
  console.log(`  ${rows.length} rows (${rows.filter((r) => r.questionFormat === "mcq").length} mcq)`);
  console.log(`  source_file: ${paper.sourceFile}`);
  for (const f of flags) console.log(`  flag ${f.ref}: ${f.reason}`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to commit.`);
    return;
  }

  loadEnv();
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
    const { data: job, error } = await client
      .from("upload_jobs")
      .insert({
        org_id: ORG_ID,
        filename: paper.sourceFile,
        created_by: CREATED_BY,
        status: "PROCESSING",
        total_rows: rows.length,
      })
      .select("id")
      .single();
    if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
    jobId = job.id;
  }

  const r = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: paper.sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: paper.year,
    pyqMonth: paper.month,
    pyqNote: paper.note,
  });
  console.log(`\ncommit: inserted=${r.inserted} skipped=${r.skipped} failed=${r.failed}`);
  for (const e of r.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE", question_kind: "pyq" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} row(s) PRIVATE + question_kind='pyq'.`);

  // Name what the exam-scoped content_hash absorbed. See the header.
  if (r.skipped) {
    const norm = (t: string) => t.trim().replace(/\s+/g, " ");
    const { data: landed } = await client
      .from("questions")
      .select("text")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile);
    const have = new Set((landed ?? []).map((x) => norm(x.text as string)));
    const absorbed = questions.filter((q) => !have.has(norm(q.stem)));

    console.log(`\n${absorbed.length} row(s) ABSORBED by an existing question (exam-scoped content_hash):`);
    for (const q of absorbed) {
      // The SAME helper the build used, or the lookup silently misses: a
      // subjective row is hashed in its own namespace, so an MCQ-shaped lookup
      // finds nothing and the twin reads as "unidentified".
      const hash =
        q.format === "subjective"
          ? subjectiveContentHash(q.stem, q.context ?? null)
          : contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? "");
      const { data: twin } = await client
        .from("questions")
        .select("question_kind,source_file,pyq_year,pyq_month,chapters(name)")
        .eq("exam_id", EXAM_ID)
        .eq("content_hash", hash)
        .maybeSingle();
      const where = twin
        ? `${(twin as { chapters?: { name?: string } }).chapters?.name ?? "?"} · ${twin.question_kind}` +
          (twin.pyq_year ? ` ${twin.pyq_month ?? ""} ${twin.pyq_year}` : ` (${twin.source_file})`)
        : "UNIDENTIFIED — the hash matched nothing, so this row's disappearance is unexplained";
      console.log(`  ${q.ref.padEnd(13)} -> ${where}`);
      console.log(`      ${q.stem.slice(0, 96).replace(/\s+/g, " ")}`);
    }
    console.log(
      `\n  These ${absorbed.length} question(s) WERE on the ${paper.month} ${paper.year} paper but carry an\n` +
        `  earlier sitting's provenance. That is the board reusing questions, not a defect —\n` +
        `  but the ${paper.year} paper's reconstruction is incomplete by exactly this many.`,
    );
  }

  await client
    .from("upload_jobs")
    .update({
      status: "COMPLETED",
      total_rows: rows.length,
      inserted: r.inserted,
      skipped: r.skipped,
      finished_at: new Date().toISOString(),
    })
    .eq("id", jobId);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
