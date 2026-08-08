/**
 * Render-validate an extracted paper before it reaches the bank.
 *
 *   npx tsx scripts/nda-mock/validate.ts m1
 *
 * Runs every math zone of every stem / context / option / solution through the
 * REAL KaTeX parser, using the same zone splitter the site renders with
 * (parseLatex). A green build proves nothing about content, and a delimiter
 * balance check only proves the delimiters pair up — this proves the math
 * actually renders, which is what a student sees.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { requirePaper, DATA } from "./config";
import type { ExtractedQuestion } from "./extract";

type Bad = { number: number; field: string; zone: string; message: string };

export function validateText(text: string): { zone: string; message: string }[] {
  const bad: { zone: string; message: string }[] = [];
  for (const seg of parseLatex(text)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, {
        displayMode: seg.type === "block",
        throwOnError: true,
        strict: false,
      });
    } catch (e) {
      bad.push({ zone: seg.content.slice(0, 90), message: (e as Error).message.slice(0, 140) });
    }
  }
  return bad;
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const qs: ExtractedQuestion[] = JSON.parse(readFileSync(join(DATA, `${paper.id}.extract.json`), "utf8"));

  const bad: Bad[] = [];
  let zones = 0;
  for (const q of qs) {
    const fields: [string, string | undefined | null][] = [
      ["stem", q.stem],
      ["context", q.context],
      ["solution", q.solution],
      ...q.options.map((o) => [`opt ${o.label}`, o.text] as [string, string]),
    ];
    for (const [name, val] of fields) {
      if (!val) continue;
      zones += parseLatex(val).filter((s) => s.type !== "text").length;
      for (const b of validateText(val)) bad.push({ number: q.number, field: name, ...b });
    }
  }

  console.log(`\n=== ${paper.label} — KaTeX validation ===`);
  console.log(`questions: ${qs.length}   math zones: ${zones}   broken: ${bad.length}`);
  for (const b of bad) {
    console.log(`\n  Q${b.number} ${b.field}`);
    console.log(`    zone: ${b.zone}`);
    console.log(`    err : ${b.message}`);
  }
  if (bad.length) process.exitCode = 1;
}

if (require.main === module) main();
