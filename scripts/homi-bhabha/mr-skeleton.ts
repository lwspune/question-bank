/**
 * The numbering skeleton of a paper, for the agent reading its MARATHI booklet.
 *
 *   npx tsx scripts/homi-bhabha/mr-skeleton.ts <paperId>
 *
 * One line per question: number, whether the English row carries a shared
 * passage, how many table lines and maths zones its stem holds, and whether it
 * has a figure (so the reader mirrors them). Deliberately NO English wording:
 * a reader holding the English text drifts into translating it
 * (MARATHI_BRIEF.md). Needs data/<id>.merged.json.
 */
import { readFileSync } from "node:fs";
import type { TQ } from "../upsc/lib";
import { questionsJsonPath, requirePaper } from "./config";

const paper = requirePaper(process.argv[2]);
if (!paper.marathi) throw new Error(`${paper.id}: MSTA posts no Marathi booklet of this paper`);
const qs = (JSON.parse(readFileSync(questionsJsonPath(paper.id), "utf8")).questions as (TQ & { figure?: unknown })[]).sort(
  (a, b) => a.number - b.number,
);

console.log(`# ${paper.id} · Marathi booklet ${paper.marathi.pdf} · ${qs.length} questions`);
console.log("ref\tpassage\ttableLines\tmathZones\tfigure");
for (const q of qs) {
  const tableLines = q.stem.split("\n").filter((l: string) => l.trim().startsWith("|")).length;
  const mathZones = q.stem.match(/\\\(/g)?.length ?? 0;
  console.log([q.number, q.context?.trim() ? "yes" : "no", tableLines, mathZones, q.figure ? "yes" : "no"].join("\t"));
}
