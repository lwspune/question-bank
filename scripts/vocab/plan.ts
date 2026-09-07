/**
 * The book's shape, derived from the two extracts rather than declared.
 *
 *   npx tsx scripts/vocab/plan.ts
 *
 * TWO PARTS, and the exam half is NOT split by exam.
 *
 * A question belongs to exactly one paper, so the existing NDA/CDS English PYQ
 * book can put "NDA PYQ" and "CDS PYQ" in separate sections. A WORD cannot:
 * hundreds are asked by both exams, and separate NDA and CDS parts would print
 * every one of them twice. So Part 2 holds one entry per word, tagged with the
 * exam(s) that asked it.
 *
 * A word in BOTH sources sits in Part 2, where the real exam sentence and the
 * option cluster make the better entry; Part 1 is what the school list adds on
 * top. The index at the back is what makes either findable.
 *
 * CHAPTERS ARE ALPHABETICAL LETTER BANDS. The docx's class labels cannot order
 * the book — Class 7 and Class 9 share 165 of 200 words — and ordering by exam
 * yield would make the book unusable as a reference, which is what a vocabulary
 * book is for. Yield belongs ON the entry, not in the sequence.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { BankWord } from "./extract-bank";
import type { SchoolWord } from "./extract-docx";

const DATA = join(__dirname, "data");
const read = <T,>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8")) as T;

/**
 * Aim for chapters of roughly this size; the last band absorbs the remainder.
 *
 * THIS FUNCTION SIZES THE BOOK, IT MUST NOT DEFINE ITS CHAPTERS. Part 2 holds
 * 655 words today and ~2,900 once the option words land, so a band computed
 * from the current corpus would be recut on the next ingest and every chapter
 * URL would move. The shipped chapter list has to be DECLARED — the same call
 * `src/lib/books/registry.ts` makes about chapter order, for the same reason:
 * "a derived order would silently reshuffle the book on every ingest".
 *
 * Use this to CHOOSE that list once, against the final corpus, then freeze it.
 */
const TARGET_BAND = 300;

export type Band = { label: string; letters: string[]; count: number };

/** Group A-Z into contiguous bands of ~`target` entries. */
export function letterBands(words: string[], target: number): Band[] {
  const per = new Map<string, number>();
  for (const w of words) {
    const c = (w[0] ?? "?").toUpperCase();
    per.set(c, (per.get(c) ?? 0) + 1);
  }
  const bands: Band[] = [];
  let cur: string[] = [];
  let run = 0;
  for (const c of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    const n = per.get(c) ?? 0;
    cur.push(c);
    run += n;
    if (run >= target) {
      bands.push({ label: cur.length > 1 ? `${cur[0]}-${cur[cur.length - 1]}` : cur[0], letters: [...cur], count: run });
      cur = [];
      run = 0;
    }
  }
  if (cur.length) {
    // Never leave a stub chapter — fold a small tail into the previous band.
    if (bands.length && run < target / 3) {
      const last = bands[bands.length - 1];
      last.letters.push(...cur);
      last.count += run;
      last.label = `${last.letters[0]}-${last.letters[last.letters.length - 1]}`;
    } else {
      bands.push({ label: cur.length > 1 ? `${cur[0]}-${cur[cur.length - 1]}` : cur[0], letters: [...cur], count: run });
    }
  }
  return bands;
}

function main() {
  const bank = read<BankWord[]>("bank-words.json");
  const school = read<SchoolWord[]>("school-words.json");

  const bankSet = new Set(bank.map((w) => w.word));
  const schoolOnly = school.filter((w) => !bankSet.has(w.word));
  const inBoth = school.filter((w) => bankSet.has(w.word));

  console.log("PART 2 — NDA & CDS Vocabulary (exam-tested)");
  console.log(`  words                    : ${bank.length}`);
  console.log(`  with a usable sentence   : ${bank.filter((w) => w.appearances.some((a) => !a.bareStem)).length}`);
  console.log(`  asked by both exams      : ${bank.filter((w) => new Set(w.appearances.map((a) => a.exam)).size > 1).length}`);
  console.log(`  asked more than once     : ${bank.filter((w) => w.timesAsked > 1).length}`);
  for (const b of letterBands(bank.map((w) => w.word), TARGET_BAND)) {
    console.log(`    ${b.label.padEnd(6)} ${b.count}`);
  }

  console.log("\nPART 1 — School Vocabulary (Class 5-12, not exam-tested)");
  console.log(`  words                    : ${schoolOnly.length}`);
  console.log(`  (also in Part 2, so not repeated here: ${inBoth.length})`);
  for (const b of letterBands(schoolOnly.map((w) => w.word), TARGET_BAND)) {
    console.log(`    ${b.label.padEnd(6)} ${b.count}`);
  }

  console.log("\nTOTAL");
  console.log(`  entries in phase 1+2     : ${bank.length + schoolOnly.length}`);
  console.log(`  index rows (all words)   : ${new Set([...bankSet, ...school.map((w) => w.word)]).size}`);

  const noEvidence = bank.filter((w) => !w.appearances.some((a) => a.key));
  if (noEvidence.length) console.log(`\nWARNING: ${noEvidence.length} bank word(s) with no keyed option`);
}

if (require.main === module) main();
