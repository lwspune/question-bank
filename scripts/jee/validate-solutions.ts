/** KaTeX-validate the extracted SOLUTION math, the same way the app splits it. */
import { readFileSync } from "node:fs";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { recordsPath, requirePaperId } from "./config";

const paperId = requirePaperId(process.argv, 2, "validate-solutions.ts <paperId>");
type Rec = { questionNumber: number; status: string; solution: string | null };
const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
const mcq = records.filter((r) => r.status === "ok" || r.status === "image_options");
const withSol = mcq.filter((r) => r.solution && r.solution.trim());

const bad: { q: number; math: string; err: string }[] = [];
for (const r of mcq) {
  if (!r.solution) continue;
  for (const seg of parseLatex(r.solution)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch (e) {
      bad.push({ q: r.questionNumber, math: seg.content.slice(0, 55), err: String((e as Error).message).replace(/\s+/g, " ").slice(0, 60) });
    }
  }
}
console.log(`MCQ: ${mcq.length} | with solution: ${withSol.length} | broken segments: ${bad.length} | affected Qs: ${new Set(bad.map((b) => b.q)).size}`);
for (const b of bad) console.log(`Q${b.q} | ${JSON.stringify(b.math)} => ${b.err}`);
