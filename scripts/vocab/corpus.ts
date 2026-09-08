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

const DATA = join(__dirname, "data");

export type CorpusWord = {
  word: string;
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
      appearances: [],
      tested: false,
      pyqExams: o.pyqExams,
      allExams: o.exams,
    });
  }
  return out.sort((a, b) => a.word.localeCompare(b.word));
}
