/**
 * Re-measure the claims the exam split rests on.
 *
 *   npx tsx scripts/vocab/audit-sections.ts
 *
 * The registry states three numbers as fact — the section sizes, and the rate
 * at which a word the corpus has seen twice was asked by BOTH exams. That last
 * one is the whole argument for "priority order, never a skip list", and it
 * MOVES with every new sitting. A number in a comment that nobody can re-derive
 * is a number that rots, and this project has already shipped one weightage
 * figure that did not reproduce.
 *
 * TRIAGE, NOT A GATE. Drift here is the expected state between ingests: new
 * papers move words from an "only" section into `both`. It exits 0 and prints
 * what changed, so a human decides whether the registry needs re-cutting.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CADET_VOCAB, examSectionOf, VOCAB_SECTIONS } from "../../src/lib/vocab/registry";
import type { BankWord } from "./extract-bank";

const D = join(__dirname, "data");
const bank = JSON.parse(readFileSync(join(D, "bank-words.json"), "utf8")) as BankWord[];
const opts = JSON.parse(readFileSync(join(D, "option-words.json"), "utf8")) as {
  word: string;
  exams: string[];
  pyqExams: string[];
  kinds: string[];
  uses: number;
}[];

/** The FINAL corpus the registry's bands were cut against: targets + options. */
const merged = new Map<string, { exams: Set<string>; uses: number; pyq: boolean }>();
for (const w of bank) {
  const p = w.appearances.filter((a) => a.kind === "pyq");
  merged.set(w.word, { exams: new Set(p.map((a) => a.exam)), uses: p.length, pyq: p.length > 0 });
}
for (const o of opts) {
  // PYQ membership is now decided by pyqExams, not by the kind list.
  const cur = merged.get(o.word);
  if (cur) {
    // pyqExams ONLY: a mock sighting must not put a word in an exam section.
    for (const e of o.pyqExams) cur.exams.add(e);
    cur.uses += o.uses;
  } else {
    merged.set(o.word, { exams: new Set(o.pyqExams), uses: o.uses, pyq: o.pyqExams.length > 0 });
  }
}
const pyq = [...merged.values()].filter((r) => r.pyq);

console.log(`Part 2 final corpus: ${pyq.length} words\n`);

let drift = 0;
for (const sec of VOCAB_SECTIONS) {
  const n = pyq.filter((r) => examSectionOf(r.exams) === sec.key).length;
  const declared = CADET_VOCAB.chapters
    .filter((c) => c.section === sec.key)
    .reduce((a, c) => a + c.expected, 0);
  const delta = n - declared;
  if (delta !== 0) drift++;
  console.log(
    `  ${sec.key.padEnd(5)} measured ${String(n).padStart(5)}   registry ${String(declared).padStart(5)}` +
      `   ${delta === 0 ? "ok" : `DRIFT ${delta > 0 ? "+" : ""}${delta}`}`
  );
}

/**
 * THE CLAIM THAT MATTERS. Exclusivity is only falsifiable on a word seen more
 * than once; on a single sighting "NDA only" records our sampling, not the
 * exam. Separate vocabularies predict ~0% crossing; one shared pool predicts
 * roughly the smaller section's share of the two.
 */
const multi = pyq.filter((r) => r.uses > 1);
const crossed = multi.filter((r) => r.exams.size > 1).length;
console.log(
  `\n  seen >1x: ${multi.length}   asked by BOTH exams: ${crossed}` +
    `   => ${((crossed / multi.length) * 100).toFixed(1)}%`
);
console.log(
  "  (the registry cites this as the reason a section is a PRIORITY ORDER and\n" +
    "   never a skip list — if it ever approaches 0%, that reasoning changes)"
);

for (const c of CADET_VOCAB.chapters) {
  if (c.expected > 200) console.log(`\n  ! ${c.slug} is declared over the 200 cap (${c.expected})`);
}
if (drift) console.log(`\n  ${drift} section(s) drifted — re-run plan-sections.ts and diff.`);
