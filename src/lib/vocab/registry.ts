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

export type VocabPartKey = "exam" | "school";

export type VocabPart = {
  key: VocabPartKey;
  title: string;
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
      key: "exam",
      title: "Part 2 — NDA & CDS Vocabulary",
      blurb:
        "Words the exams have asked. Where a paper supplied the sentence, it is the real one, cited.",
    },
    {
      key: "school",
      title: "Part 1 — School Vocabulary",
      blurb:
        "From the CBSE Class 5-12 lists. Not yet asked in an NDA or CDS paper — learn these after Part 2.",
    },
  ],
  // Counts are the measured final distribution (2,922 exam + 671 school).
  chapters: [
    { slug: "exam-a-c", label: "A-C", part: "exam", letters: band("A", "C"), expected: 655 },
    { slug: "exam-d-e", label: "D-E", part: "exam", letters: band("D", "E"), expected: 461 },
    { slug: "exam-f-i", label: "F-I", part: "exam", letters: band("F", "I"), expected: 479 },
    { slug: "exam-j-p", label: "J-P", part: "exam", letters: band("J", "P"), expected: 538 },
    { slug: "exam-q-s", label: "Q-S", part: "exam", letters: band("Q", "S"), expected: 484 },
    { slug: "exam-t-z", label: "T-Z", part: "exam", letters: band("T", "Z"), expected: 305 },
    { slug: "school-a-d", label: "A-D", part: "school", letters: band("A", "D"), expected: 331 },
    { slug: "school-e-z", label: "E-Z", part: "school", letters: band("E", "Z"), expected: 340 },
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
