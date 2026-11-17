/**
 * Check one UP Board paper's JSON. Read-only; exits 1 on any hard error.
 *
 *   npx tsx scripts/up-board/validate.ts 2025-822-BW                  # transcribed stage
 *   npx tsx scripts/up-board/validate.ts 2025-822-BW --stage=solved   # before commit
 *
 * Hard errors come from lib.paperIssues. Hindi/English NUMBER differences are
 * printed as warnings (lib.parityWarnings): each is a misread digit in one
 * language until a look at the page says otherwise; a real print difference is
 * recorded in that question's `_flag`.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, SUBJECTS, subtopicCatalog } from "./config";
import { paperIssues, parityWarnings, type Stage, type UpPaper } from "./lib";

/** MCQs a paper must carry, where the pattern fixes it. Class 10: Section A, 20 MCQs. */
const EXPECT_MCQ: Partial<Record<string, number>> = { maths10: 20, science10: 20 };

function main() {
  const id = process.argv[2];
  if (!id || id.startsWith("--")) throw new Error("usage: validate.ts <paperId> [--stage=transcribed|solved]");
  const stage = (process.argv.find((a) => a.startsWith("--stage="))?.split("=")[1] ?? "transcribed") as Stage;
  const file = join(DATA, `${id}.questions.json`);
  if (!existsSync(file)) throw new Error(`${file} not found`);
  const paper = JSON.parse(readFileSync(file, "utf8")) as UpPaper;
  if (`${paper.year}-${paper.paper}` !== id) throw new Error(`file says ${paper.year}-${paper.paper}, expected ${id}`);
  const subject = SUBJECTS[paper.subject];
  if (!subject) throw new Error(`unknown subject "${paper.subject}"`);

  const issues = paperIssues(paper, subtopicCatalog(subject), stage, { expectMcq: EXPECT_MCQ[subject.key] });
  const warnings = paper.questions.flatMap(parityWarnings);
  const mcq = paper.questions.filter((q) => q.format === "mcq").length;
  const alts = paper.questions.filter((q) => q.alternativeTo).length;
  console.log(`${id} (${subject.key}, ${stage}): ${paper.questions.length} rows, ${mcq} mcq, ${paper.questions.length - mcq} written, ${alts} OR alternative(s)`);
  if (warnings.length) {
    console.log(`parity warnings (${warnings.length}):`);
    for (const w of warnings) console.log(`  ~ ${w}`);
  }
  if (issues.length) {
    console.log(`ERRORS (${issues.length}):`);
    for (const e of issues.slice(0, 60)) console.log(`  - ${e}`);
    process.exit(1);
  }
  console.log("ok");
}

main();
