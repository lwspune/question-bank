/**
 * Check a transcription before it goes anywhere.
 *
 *   npx tsx scripts/iat/validate.ts 2025 Biology
 *
 * Runs the same checks the dump and commit steps refuse on, and prints a
 * one-line summary per chapter, so a transcriber can fix their own file.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { paperIssues, type IatPaper } from "./lib";
import { dataDir, parsePaperArgs } from "./config";

const { stem } = parsePaperArgs(process.argv.slice(2), "validate.ts <year> <subject>");
const paper = JSON.parse(readFileSync(join(dataDir(), `${stem}.questions.json`), "utf8")) as IatPaper;
const issues = paperIssues(paper);
const figs = paper.rows.filter((r) => r.figure).length;
const optFigs = paper.rows.filter((r) => r.optionFigures).length;
const flags = paper.rows.filter((r) => r._flag).map((r) => r.ref);
console.log(`${stem}: ${paper.rows.length} rows | stem figures ${figs} | picture options ${optFigs} | flagged ${flags.join(", ") || "none"}`);
if (issues.length) {
  console.log(`${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
  process.exit(1);
}
console.log("OK");
