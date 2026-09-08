/**
 * The Cadet Vocab Book, declared as data.
 *
 * Unlike `src/lib/books/registry.ts`, this book is not a view over the bank —
 * most of its content is authored — so its chapters are letter bands rather
 * than bank chapters, and its unit is a WORD.
 *
 * TWO PARTS, and the exam part is NOT split by exam. A question belongs to one
 * paper; a word does not. 58 words are already asked by both NDA and CDS, so
 * separate NDA and CDS parts would print each of them twice. The exam(s) are an
 * attribute of the entry.
 *
 * ═══ THE BANDS ARE SIZED AGAINST THE FINAL CORPUS, NOT TODAY'S ═══
 *
 * Part 2 holds 655 authored words today and 2,922 once the option words land
 * (phase 3). Bands computed from 655 would be recut then and EVERY chapter URL
 * would move — so they are declared here, from the measured final distribution,
 * and frozen. Same call `books/registry.ts` makes about chapter order: "a
 * derived order would silently reshuffle the book on every ingest".
 *
 * PART MEMBERSHIP IS FROZEN THE SAME WAY, and this is the subtler half. A word
 * belongs to Part 2 if the exams ask it AT ALL — as the question's target OR as
 * an option — which is knowable now even though only the targets are authored
 * yet. Deciding membership from the CURRENT corpus instead would put 166 school
 * words in Part 1 today and move them to Part 2 in phase 3, changing their URL
 * and their meaning to a reader.
 */

/**
 * THREE PARTS, split on ONE yes/no fact: has a real UPSC paper asked this word?
 *
 * `pyq` and `practice` were one part until it was measured: 609 of the exam
 * words appear ONLY in coaching material (Oswaal books, weekly mocks) and never
 * in a paper. Merging them makes the book's headline claim — "the words the
 * papers have actually asked" — false for 22% of it.
 *
 * Unlike the NDA/CDS question, this split is CLEAN and costs no duplication: a
 * word either appears in a paper or it does not, and the 51 that appear in both
 * a paper and a mock simply belong to `pyq`. That is why it is a part and the
 * exam is only a tag.
 */
export type VocabPartKey = "pyq" | "practice" | "school";

export type VocabPart = {
  key: VocabPartKey;
  /** "Part 1" — a book has parts, and the running head needs one. */
  ordinal: string;
  title: string;
  /**
   * What the INDEX prints. A name, never a number: an index entry reading
   * "Part 2 · A-C" makes the reader decode an ordinal AND a band that is
   * already implied by the word's own first letter.
   */
  indexTag: string;
  /** One line under the part heading, saying what earns a word its place here. */
  blurb: string;
};

export type VocabChapter = {
  slug: string;
  /** "A-C". Printed as the chapter heading. */
  label: string;
  part: VocabPartKey;
  /** Inclusive first letters this chapter covers. */
  letters: string[];
  /** Measured against the FINAL corpus — a target, not a promise. */
  expected: number;
};

export type VocabBookDefinition = {
  slug: string;
  title: string;
  subtitle: string;
  parts: VocabPart[];
  chapters: VocabChapter[];
};

const band = (from: string, to: string): string[] => {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return A.slice(A.indexOf(from), A.indexOf(to) + 1).split("");
};

export const CADET_VOCAB: VocabBookDefinition = {
  slug: "cadet-vocab",
  title: "Cadet Vocabulary",
  subtitle:
    "Every word the NDA and CDS papers have actually asked, with the sentence it was asked in — followed by the Class 5-12 school list.",
  parts: [
    {
      key: "pyq",
      ordinal: "Part 1",
      title: "Asked in the Papers",
      indexTag: "Papers",
      blurb:
        "Every word an NDA or CDS paper has actually asked, with the sentence it was asked in.",
    },
    {
      key: "practice",
      ordinal: "Part 2",
      title: "Practice Material",
      indexTag: "Practice",
      blurb:
        "Set only in mocks and coaching books, never yet in a paper. Worth learning — but not a past question.",
    },
    {
      key: "school",
      ordinal: "Part 3",
      title: "School List (Class 5-12)",
      indexTag: "School",
      blurb:
        "From the CBSE class lists, and not yet seen in either exam. Learn these last.",
    },
  ],
  // Measured against the FINAL corpus: 2,122 pyq + 609 practice + 676 school.
  chapters: [
    { slug: "papers-a-c", label: "A-C", part: "pyq", letters: band("A", "C"), expected: 470 },
    { slug: "papers-d-f", label: "D-F", part: "pyq", letters: band("D", "F"), expected: 430 },
    { slug: "papers-g-m", label: "G-M", part: "pyq", letters: band("G", "M"), expected: 414 },
    { slug: "papers-n-r", label: "N-R", part: "pyq", letters: band("N", "R"), expected: 375 },
    { slug: "papers-s-z", label: "S-Z", part: "pyq", letters: band("S", "Z"), expected: 433 },
    { slug: "practice-a-l", label: "A-L", part: "practice", letters: band("A", "L"), expected: 355 },
    { slug: "practice-m-z", label: "M-Z", part: "practice", letters: band("M", "Z"), expected: 254 },
    { slug: "school-a-d", label: "A-D", part: "school", letters: band("A", "D"), expected: 333 },
    { slug: "school-e-z", label: "E-Z", part: "school", letters: band("E", "Z"), expected: 343 },
  ],
};

export const VOCAB_BOOKS: VocabBookDefinition[] = [CADET_VOCAB];

export function vocabBook(slug: string): VocabBookDefinition | undefined {
  return VOCAB_BOOKS.find((b) => b.slug === slug);
}

/**
 * Which chapter a word belongs to. Pure, and the ONLY place the letter -> chapter
 * rule lives — the commit script and the reader must not each have their own.
 */
export function chapterFor(
  book: VocabBookDefinition,
  part: VocabPartKey,
  word: string
): VocabChapter | undefined {
  const first = (word.trim()[0] ?? "").toUpperCase();
  return book.chapters.find((c) => c.part === part && c.letters.includes(first));
}
