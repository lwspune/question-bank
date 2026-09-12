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
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { BankWord, OptionWord } from "./extract-bank";
import type { SchoolWord } from "./extract-docx";

/** One line of the fill roster: the word, and the rung it was commissioned for. */
export type FillWord = { word: string; class: number };

/**
 * One line of the coaching roster: a word a third-party coaching deck teaches.
 *
 * SEPARATE FROM `option-words.json` BECAUSE THE EVIDENCE IS WEAKER, and the
 * book's parts are built on exactly that distinction. An option word was
 * PRINTED BY A REAL PAPER among the four choices; a coaching word has only ever
 * been set by a commercial prep deck. Both file into Part 3 when no paper has
 * tested them, but merging the two files would make "printed by a paper"
 * unrecoverable — and that is the fact `pyqExams` and Part 2 rest on.
 *
 * `exams` is the DECK'S OWN SCOPE, never a per-word claim. A deck sold for
 * NDA/CDS/AFCAT tags no word individually, so every word it contributes carries
 * the same list; `pyqExams` stays empty, which is what files it into Part 3.
 */
export type CoachingWord = {
  word: string;
  exams: string[];
  /**
   * WHICH source taught it. Added when the second deck landed and `page` stopped
   * identifying anything on its own -- page 35 means a different word in each.
   * A word both decks carry reads "trishul+homonyms".
   */
  deck?: string;
  page?: number;
  /** Question numbers in the homonyms set, where the source is that paper. */
  homonymSets?: number[];
};

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
  /**
   * The rung a school word sits on, and where that grading came from.
   *
   * DERIVED FROM A DECLARED SOURCE FILE, never authored on the entry — the same
   * rule `part` and `section` follow, and for the same reason: a class heading
   * is a claim about a word's level, and letting whoever types the entry pick
   * its rung would put that claim in their hands.
   *
   *   'cbse'     — the class that FIRST introduces it in the printed CBSE
   *                lists. `school-words.json`, min of its `classes`.
   *   'authored' — written to fill a rung the printed lists leave thin, at the
   *                level of that class. `school-fill-words.json`, which is a
   *                roster: the word and the rung it was commissioned for.
   */
  schoolClass?: number;
  schoolSource?: "cbse" | "authored";
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
  /**
   * TRUE for a word only a third-party coaching deck teaches.
   *
   * Needed because an option word and a coaching word are otherwise
   * INDISTINGUISHABLE here — both are `source: "exam"`, `tested: false`,
   * `pyqExams: []` — and they are not the same claim. An option word was
   * printed by a real paper among the four choices; a coaching word has only
   * ever been sold in a prep deck. Without this flag the worksheet told an
   * author that a paper had offered the word among its choices, which is false
   * for all 417 of them and is exactly the kind of default that quietly becomes
   * an assertion.
   */
  coaching?: true;
  /**
   * The OTHER members of every homonym set this word belongs to.
   *
   * Carried because a homonym is defined by its partner: `imitated` and
   * `intimated`, `loath` and `loathe`, `judicial` and `judicious`. A meaning
   * written without the contrast in view is a correct definition that fails at
   * the one job the set exists to do, and the author cannot see the partner --
   * it is a different word, usually in a different chapter, sometimes already
   * in Part 2. So the worksheet names it.
   *
   * A partner may therefore be a word this book already holds; that is the
   * common case and not a collision.
   */
  homonymPartners?: string[];
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
      // LOWEST class wins: the source reprints a word in every list that
      // revises it, so the class that first introduces it is the rung at which
      // a student should already have it. See plan-school-classes.ts.
      schoolClass: Math.min(...w.classes),
      schoolSource: "cbse",
      appearances: [],
      tested: false,
      pyqExams: [],
      allExams: [],
    });
    seen.add(w.word);
  }

  /**
   * THE FILL ROSTER. Optional: absent until the upper rungs are commissioned.
   *
   * Every word here is REFUSED if anything else already claims it, in either
   * direction. A collision with the exam corpus means the word belongs to Part
   * 2 or 3 (the registry calls part membership frozen), and a collision with
   * the CBSE list means a publisher already graded it — so in both cases
   * accepting the fill entry would silently overrule a stronger claim.
   */
  const fillPath = join(DATA, "school-fill-words.json");
  if (existsSync(fillPath)) {
    const fill = JSON.parse(readFileSync(fillPath, "utf8")) as FillWord[];
    for (const f of fill) {
      const word = f.word.toLowerCase();
      if (seen.has(word)) {
        throw new Error(
          `${word}: commissioned as a Class ${f.class} fill word but the corpus already ` +
            `has it — REFUSING (it belongs where it already is)`
        );
      }
      out.push({
        word,
        source: "school",
        schoolClass: f.class,
        schoolSource: "authored",
        appearances: [],
        tested: false,
        pyqExams: [],
        allExams: [],
      });
      seen.add(word);
    }
  }

  /**
   * THE COACHING ROSTER. Optional, like the fill roster above.
   *
   * REFUSED ON ANY COLLISION, in either direction. A word the exam corpus
   * already holds belongs to Part 2 or Part 3 on that stronger evidence, and a
   * word the CBSE list holds was graded by a publisher — so accepting a
   * coaching entry over either would overrule the better claim with the worse
   * one. Part membership is frozen (see the registry), so this is the same
   * refusal `school-fill-words.json` makes and for the same reason.
   */
  const coachPath = join(DATA, "coaching-words.json");
  if (existsSync(coachPath)) {
    const coach = JSON.parse(readFileSync(coachPath, "utf8")) as CoachingWord[];
    /**
     * word -> the other members of its homonym sets. STRUCTURE ONLY: it records
     * which words a paper asks a student to tell apart, and carries none of the
     * source's own definitions or sentences.
     */
    const hPath = join(DATA, "homonym-sets.json");
    const partners: Record<string, string[]> = existsSync(hPath)
      ? JSON.parse(readFileSync(hPath, "utf8"))
      : {};
    for (const c of coach) {
      const word = c.word.toLowerCase();
      if (seen.has(word)) {
        throw new Error(
          `${word}: listed in the coaching roster but the corpus already has it — ` +
            `REFUSING (it belongs where it already is)`
        );
      }
      if (!c.exams.length) {
        throw new Error(`${word}: a coaching word with no exam — REFUSING`);
      }
      out.push({
        word,
        source: "exam",
        appearances: [],
        tested: false,
        // EMPTY BY CONSTRUCTION, and it is what files the word into Part 3: no
        // paper has printed it, so it cannot claim Part 2.
        pyqExams: [],
        allExams: c.exams,
        coaching: true,
        ...(partners[word]?.length ? { homonymPartners: partners[word] } : {}),
      });
      seen.add(word);
    }
  }

  return out.sort((a, b) => a.word.localeCompare(b.word));
}
