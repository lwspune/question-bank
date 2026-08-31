/**
 * The book registry — what a "book" IS, declared as data.
 *
 * A book here is a DERIVED VIEW over questions that already exist in the bank.
 * It stores no content and duplicates nothing: it names a subject, the exams to
 * draw from, and the chapters to draw them into, in order. Phase 3 will layer
 * curation (exclude / move / reorder) on top; until then a chapter's contents
 * are entirely a function of the bank plus `src/lib/books/order.ts`.
 *
 * CHAPTER NAMES MUST MATCH THE DB EXACTLY. They are matched by name against
 * `chapters.name`, and a near-miss — a stray space, "&" for "and" — does not
 * error, it silently yields an empty chapter. `tests/books-registry.test.ts`
 * is the standing guard: it resolves every name against the live bank in BOTH
 * exams and fails if one stops matching.
 */
import type { BookExam } from "./order";

export type BookChapter = {
  /** URL segment. Stable — it is the shareable link to a chapter of the book. */
  slug: string;
  /** Must equal `chapters.name` in the bank, character for character. */
  name: string;
};

export type BookDefinition = {
  slug: string;
  title: string;
  /** One line under the title, describing what the book is. */
  subtitle: string;
  /** Matched against `subjects.name`. */
  subject: string;
  /**
   * The halves of every chapter, in render order. Each becomes a titled
   * section — "NDA PYQ", then "CDS PYQ" — via order.ts.
   */
  exams: BookExam[];
  chapters: BookChapter[];
};

/**
 * Chapter order is EDITORIAL, not derived.
 *
 * It runs heaviest-first by combined NDA+CDS question count, which is how the
 * `/guide` subjects tier their chapters — a student meets the highest-yield
 * material first. It is deliberately a hand-written list rather than a
 * `count desc` sort, because a derived order would silently reshuffle the book
 * every time the bank grows, and a book's chapter order should change only
 * when someone decides it should.
 */
export const NDA_CDS_ENGLISH: BookDefinition = {
  slug: "nda-cds-english",
  title: "NDA / CDS English PYQ Master",
  subtitle:
    "Every English past-year question from both exams, chapter by chapter — NDA first, then CDS, oldest to newest.",
  subject: "English",
  exams: ["NDA", "CDS"],
  chapters: [
    { slug: "vocabulary", name: "Vocabulary" },
    { slug: "grammar", name: "Grammar" },
    { slug: "sentence-rearrangement", name: "Sentence Rearrangement" },
    { slug: "spotting-errors", name: "Spotting Errors" },
    { slug: "reading-comprehension", name: "Reading Comprehension" },
    { slug: "idioms-and-phrases", name: "Idioms and Phrases" },
    { slug: "cloze-test", name: "Cloze Test" },
    { slug: "fill-in-the-blanks", name: "Fill in the Blanks" },
  ],
};

export const BOOKS: BookDefinition[] = [NDA_CDS_ENGLISH];

export function getBookBySlug(slug: string): BookDefinition | null {
  return BOOKS.find((b) => b.slug === slug) ?? null;
}

export function getBookChapter(
  book: BookDefinition,
  chapterSlug: string
): BookChapter | null {
  return book.chapters.find((c) => c.slug === chapterSlug) ?? null;
}
