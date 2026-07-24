/**
 * Dump the Maths questions of an extracted paper for the classification /
 * key-verification pass. Reads out/<paperId>.records.json, writes
 * out/<paperId>_maths.txt — one block per Maths question with its stem,
 * options (marking the extracted key), and NAT answer.
 *
 *   npx tsx scripts/jee/dump-maths.ts <paperId>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { recordsPath, requirePaperId } from "./config";

type Rec = {
  questionNumber: number;
  subject: string;
  status: string;
  stem: string;
  numericAnswer?: number | null;
  options: { label: string; text: string; isCorrect: boolean }[] | null;
};

function main() {
  const paperId = requirePaperId(process.argv, 2, "dump-maths.ts <paperId>");
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
  const maths = records.filter((r) => r.subject === "Maths").sort((a, b) => a.questionNumber - b.questionNumber);
  const out: string[] = [];
  for (const r of maths) {
    out.push(`=== Q${r.questionNumber} [${r.status}] ===`);
    out.push(r.stem.trim());
    if (r.status === "numeric") {
      out.push(`  NAT answer: ${r.numericAnswer ?? "(none)"}`);
    } else if (r.options) {
      for (const o of r.options) {
        out.push(`  (${o.label}) ${o.text}${o.isCorrect ? "  <==srcKEY" : ""}`);
      }
    }
    out.push("");
  }
  const path = join("scripts/jee/out", `${paperId}_maths.txt`);
  writeFileSync(path, out.join("\n"), "utf8");
  console.log(`wrote ${maths.length} Maths questions -> ${path}`);
}

main();
