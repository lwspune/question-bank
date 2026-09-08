/**
 * One view over both halves of the exam corpus.
 *
 * The bank yields two kinds of word and the book prints both:
 *
 *   TARGET   the question was ABOUT this word — 655 of them, each carrying the
 *            sentence it was asked in and the paper's own keyed answer.
 *   OPTION   the word only ever appeared among the four choices — 2,076, with
 *            no sentence, no key, and nothing for the cluster gate to check.
 *
 * THE DISTINCTION IS KEPT, NOT FLATTENED. An option word was PRINTED by the
 * paper; it was never TESTED by it. `tested` carries that, `times_asked` stays
 * 0 for an option word so no recurrence marker claims the exam asked it, and
 * Part 2's blurb says which is which. Merging them would make the book's
 * headline claim — "the words the papers have actually asked" — false for three
 * quarters of its entries.
 *
 * Exists so `dump-authoring` and `commit-entries` read ONE corpus. They already
 * shared `placementOf` for the same reason: two readers of the same data drift,
 * and the drift is silent — a worksheet offering a word the commit then refuses.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { BankWord, OptionWord } from "./extract-bank";
import type { SchoolWord } from "./extract-docx";

const DATA = join(__dirname, "data");

export type CorpusWord = {
  word: string;
  /**
   * Which half of the book this word came from. `school` words are NOT in the
   * exam corpus at all — they come from the Class 5-12 docx — so they carry no
   * exam and must file into Part 1. The DB enforces that: a school row with a
   * non-empty `exams` violates `vocab_entries_exams_match_part`.
   */
  source: "exam" | "school";
  /**
   * The docx's own gloss, for a school word. ALL 924 school words already carry
   * one, so Part 1 is not a definition-writing job — it is a sentence and
   * synonym/antonym job, with this as the starting point rather than a blank.
   */
  schoolMeaning?: string;
  /** Empty for an option-only word. */
  appearances: BankWord["appearances"];
  /** True when a question was ABOUT this word, not merely offering it. */
  tested: boolean;
  /**
   * Exams that printed the word in a REAL PAPER — never merged with mock
   * sightings. Filing on the merged list put 153 words in the `both` section
   * whose second exam had only ever seen them in coaching material, which is
   * a claim that two PAPERS asked the word. See `OptionWord.pyqExams`.
   */
  pyqExams: string[];
  /** Every exam that printed it in any material. Non-empty by construction. */
  allExams: string[];
};

export function loadCorpus(): CorpusWord[] {
  const bank = JSON.parse(readFileSync(join(DATA, "bank-words.json"), "utf8")) as BankWord[];
  const opts = JSON.parse(readFileSync(join(DATA, "option-words.json"), "utf8")) as OptionWord[];

  const out: CorpusWord[] = bank.map((w) => ({
    word: w.word,
    source: "exam" as const,
    appearances: w.appearances,
    tested: true,
    pyqExams: [...new Set(w.appearances.filter((a) => a.kind === "pyq").map((a) => a.exam))].sort(),
    allExams: [...new Set(w.appearances.map((a) => a.exam))].sort(),
  }));

  const seen = new Set(out.map((w) => w.word));
  for (const o of opts) {
    // The extractor already excludes any option that is also a target, so an
    // overlap here would mean the two files disagree about what a target is.
    // REFUSE rather than pick one: silently preferring the bank row would drop
    // the option evidence, and preferring the option row would drop the
    // sentence and the key.
    if (seen.has(o.word)) {
      throw new Error(`${o.word}: present as BOTH a target and an option word — REFUSING`);
    }
    out.push({
      word: o.word,
      source: "exam",
      appearances: [],
      tested: false,
      pyqExams: o.pyqExams,
      allExams: o.exams,
    });
    seen.add(o.word);
  }

  /**
   * PART 1, and the exclusion is the point: a school word that an exam has ALSO
   * printed belongs to Part 2 or 3, not here. 248 of the 924 are in that
   * position. The registry's own note calls part membership frozen — a word is
   * in Part 2 if the exams touch it AT ALL — so filing one here would move it
   * later and change both its URL and what it claims to a reader.
   */
  const school = JSON.parse(readFileSync(join(DATA, "school-words.json"), "utf8")) as SchoolWord[];
  for (const w of school) {
    if (seen.has(w.word)) continue;
    out.push({
      word: w.word,
      source: "school",
      schoolMeaning: w.meaning,
      appearances: [],
      tested: false,
      pyqExams: [],
      allExams: [],
    });
    seen.add(w.word);
  }

  return out.sort((a, b) => a.word.localeCompare(b.word));
}
