/**
 * The numbering skeleton of a paper, for the agent reading its MARATHI print.
 *
 *   npx tsx scripts/mh-ssc-10/mr-skeleton.ts <paperId>
 *
 * Prints one line per question: ref, format, set label, whether the English row
 * carries a shared passage, how many table lines its stem holds and how many
 * maths zones (so the reader mirrors an activity table or formula the English
 * row put in the stem). Deliberately NO English wording: the reader
 * must read the Marathi print, and a reader holding the English text drifts
 * into translating it (see MARATHI_BRIEF.md).
 */
import { readFileSync } from "node:fs";
import type { PaperQuestion } from "./lib";
import { MARATHI_CODES, questionsJsonPath, requirePaper } from "./config";

const paper = requirePaper(process.argv[2]);
const code = MARATHI_CODES[paper.id];
if (!code) throw new Error(`${paper.id}: the board posts no Marathi print of this paper`);
const qs = JSON.parse(readFileSync(questionsJsonPath(paper.id), "utf8")) as PaperQuestion[];

console.log(`# ${paper.id} · Marathi print ${code} · ${qs.length} questions`);
console.log("ref\tformat\tset\tpassage\ttableLines\tmathZones\tfigure");
for (const q of qs) {
  const tableLines = q.stem.split("\n").filter((l) => l.trim().startsWith("|")).length;
  const mathZones = q.stem.match(/\\\(/g)?.length ?? 0;
  console.log(
    [q.ref, q.format, q.setLabel ?? "-", q.context?.trim() ? "yes" : "no", tableLines, mathZones, q.hasFigure ? "yes" : "no"].join("\t"),
  );
}
