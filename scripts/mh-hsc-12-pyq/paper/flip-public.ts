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
import { EXPECTED_REFS } from "./lib";
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
  if ((rows ?? []).length !== EXPECTED_REFS.length) {
    problems.push(`${(rows ?? []).length} rows in the bank, the printed paper has ${EXPECTED_REFS.length}`);
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
