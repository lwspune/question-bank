/**
 * Render check for every long-form field of Probability (Class 10 Algebra Ch.5),
 * across all three committed source files — questions, authored solutions and
 * MCQ verifications. Runs the PROJECT'S OWN math extraction (parseLatex) plus
 * KaTeX with throwOnError, so a zone that passes here renders on /browse; and
 * scans for the control characters, U+FFFD and literal two-char `\n` this
 * pipeline has shipped before.
 *
 *   npx tsx scripts/mh-ssc-10-text/data/alg-probability-10.rendercheck.ts
 *
 * NOTE the segment discriminator is "inline" | "block" | "text" — NOT "math".
 * A first version of this probe filtered on `type === "math"`, found ZERO zones
 * and printed PASS: a false green that would have covered any broken zone in the
 * chapter. Proven to go red by injecting an unclosed group.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { parseLatex } from "../../../src/components/math/parseLatex";

const CTRL = new RegExp(
  "[" +
    String.fromCharCode(1) + "-" + String.fromCharCode(8) +
    String.fromCharCode(11) + String.fromCharCode(12) +
    String.fromCharCode(14) + "-" + String.fromCharCode(31) +
  "]",
);

let zones = 0;
const problems: string[] = [];

function check(where: string, text: string | undefined | null) {
  if (!text) return;
  if (CTRL.test(text)) problems.push(`${where}: CONTROL CHARACTER`);
  if (text.includes("�")) problems.push(`${where}: U+FFFD`);
  const segs = parseLatex(text);
  if (segs.filter((s) => s.type === "text").some((s) => s.content.includes("\\n")))
    problems.push(`${where}: LITERAL \\n outside a math zone (kills GFM tables)`);
  for (const seg of segs) {
    if (seg.type === "text") continue;
    zones++;
    try {
      katex.renderToString(seg.content, {
        throwOnError: true,
        displayMode: seg.type === "block",
      });
    } catch (e) {
      problems.push(`${where}: KATEX "${seg.content}" — ${(e as Error).message}`);
    }
  }
}

const read = (f: string) => JSON.parse(readFileSync(join(__dirname, f), "utf8"));

type Q = {
  ref: string;
  stem: string;
  context?: string;
  solution?: string;
  note?: string;
  options?: { label: string; text: string }[];
};
const questions: Q[] = read("alg-probability-10.questions.json");
for (const q of questions) {
  check(`Q ${q.ref} stem`, q.stem);
  check(`Q ${q.ref} context`, q.context);
  check(`Q ${q.ref} solution`, q.solution);
  check(`Q ${q.ref} note`, q.note);
  for (const o of q.options ?? []) check(`Q ${q.ref} opt ${o.label}`, o.text);
}

for (const f of ["alg-probability-10.solutions.json", "alg-probability-10.mcq-verify.json"]) {
  const rows: { ref: string; solution: string }[] = read(f);
  for (const r of rows) check(`${f} ${r.ref}`, r.solution);
  console.log(`${f}: ${rows.length} rows`);
}
console.log(`alg-probability-10.questions.json: ${questions.length} rows`);
console.log(`mathZones=${zones} problems=${problems.length}`);
for (const p of problems) console.log("  " + p);
if (problems.length) process.exit(1);
console.log("render check PASS");
