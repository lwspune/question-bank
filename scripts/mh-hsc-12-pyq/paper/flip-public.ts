/**
 * Flip a committed board paper's rows from PRIVATE to PUBLIC.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/flip-public.ts <paperId>           # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/paper/flip-public.ts <paperId> --apply
 *
 * The rows land PRIVATE from commit.ts. This is the separate, deliberate step
 * that makes them student-visible, and it re-checks the properties that matter
 * ON THE ROWS AS STORED rather than on the JSON they came from — a row can only
 * be wrong in the bank, and the bank is what students read.
 *
 * Refuses to publish when:
 *  - an MCQ has no correct option, or more than one (an unanswerable question)
 *  - a question has no solution (the reveal would show an empty answer)
 *  - the row count does not match the paper's printed 44
 *
 * NOTE ON WHAT PUBLISHING MEANS HERE. Every answer on this paper is DERIVED —
 * the board publishes no key, for this sitting or any other. The corpus
 * precedent is derive, publish, then human spot-check (the CDS-English route),
 * and all 317 existing HSC PYQ rows are PUBLIC on exactly that basis. Each row
 * is REVIEW-flagged in the committed data JSON, which is the durable record;
 * there is no DB column for it.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, PAPERS, requirePaper, questionsJsonPath } from "./config";
import { grammarFor } from "./lib";
import type { PaperQuestion } from "../../mh-ssc-10/lib";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!id) {
    console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/flip-public.ts <paperId> [--apply]`);
    console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
    process.exit(1);
  }
  const paper = requirePaper(id);
  const path = questionsJsonPath(id);
  if (!existsSync(path)) throw new Error(`${id}: no transcription at ${path}`);
  const authored = JSON.parse(readFileSync(path, "utf8")) as PaperQuestion[];

  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, question_format, visibility, solution, options(is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(error.message);

  const problems: string[] = [];
  // A row can legitimately be missing: the exam-scoped content_hash absorbs a
  // question the bank already held. Those are enumerated in the manifest, so
  // the expected count adjusts by exactly them and the check still bites on
  // every other cause of a shortfall.
  const absorbed = paper.absorbedRefs ?? [];
  // printed ITEMS is not the row count. A paper that carries a two-part item as
  // two rows has more rows than items, and one whose question the board reused
  // verbatim has fewer: the exam-scoped content_hash folds the repeat into the
  // row that already existed. Both terms are DECLARED in the manifest rather
  // than inferred, so a shortfall from any other cause still fails this check.
  /**
   * `--only-missing` matches the partial reconciliation in commit.ts: only the
   * refs a census named were committed under this `source_file`, and the rest
   * of the sitting lives under the compilation's own source file and is not
   * being touched. Expecting the whole paper here would refuse a run that did
   * exactly what it was asked to.
   *
   * The expected count still comes from declared numbers, not from whatever
   * happens to be in the bank, so it fails on any shortfall it was not told
   * about.
   */
  const onlyMissing = process.argv.includes("--only-missing");
  const printed = grammarFor(paper.subject).expectedRefs.length;
  const expected = onlyMissing
    ? (paper.knownMissingRefs ?? []).length - absorbed.length
    : printed + (paper.splitRows ?? 0) - absorbed.length;
  if (onlyMissing && !(paper.knownMissingRefs ?? []).length) {
    throw new Error(`${paper.id}: --only-missing needs a knownMissingRefs census in config.ts.`);
  }
  if ((rows ?? []).length !== expected) {
    problems.push(
      `${(rows ?? []).length} rows in the bank, expected ${expected}` +
        (absorbed.length ? ` (the printed ${printed} less ${absorbed.length} absorbed)` : ``),
    );
  }
  for (const a of absorbed) {
    console.log(`  absorbed ${a.ref} -> ${a.into}`);
  }
  for (const r of rows ?? []) {
    const ref = String(r.question_number);
    if (!r.solution?.toString().trim()) problems.push(`${ref}: no solution stored`);
    if (r.question_format === "mcq") {
      const correct = ((r.options ?? []) as { is_correct: boolean }[]).filter((o) => o.is_correct).length;
      if (correct !== 1) problems.push(`${ref}: ${correct} correct option(s), expected exactly 1`);
    }
  }

  const alreadyPublic = (rows ?? []).filter((r) => r.visibility === "PUBLIC").length;
  console.log(`${paper.id}  ${paper.month} ${paper.year}`);
  console.log(`  ${(rows ?? []).length} row(s) in the bank · ${alreadyPublic} already PUBLIC`);
  console.log(`  ${authored.filter((q) => q.reviewFlag).length}/${authored.length} REVIEW-flagged (derived answers)`);
  for (const p of problems) console.log(`   ✗ ${p}`);
  if (problems.length) throw new Error(`${problems.length} problem(s) — refusing to publish.`);

  if (!apply) {
    console.log(`\n[dry-run] would publish ${(rows ?? []).length - alreadyPublic} row(s). Pass --apply.`);
    return;
  }

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(uErr.message);
  console.log(`\npublished ${count} row(s).`);
  console.log(`  rollback: update questions set visibility='PRIVATE' where source_file='${paper.sourceFile}';`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
