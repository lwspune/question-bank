/**
 * What each ebook prints (2026-10-20). The store copy and the price live in
 * `public.ebooks` (migration 0172) and can change without a deploy; what is
 * here is structural and checked by tests/ebook-catalog.test.ts:
 *
 * - `bookSlug`: the compiled PYQ book (lib/books/registry) whose chapters,
 *   subtopic grouping and sitting order the ebook reuses. The ebook reads the
 *   BANK through that definition at build time, not the stored `/books`
 *   curation, which lags the bank between syncs.
 * - `chapterOrder`: the textbook's order (Class XI, then XII), the order the
 *   CET notes already use (lib/notes/bookOrder). Every chapter of the book
 *   appears exactly once: a missing one would vanish from a book someone paid
 *   for, with no error.
 * - `notesRoute`: the /notes subject whose chapters supply the formulas.
 */
import { getBookBySlug, type BookChapter, type BookDefinition } from "@/lib/books/registry";
import { getNotesChapterBySlug, type NotesChapterRegistration } from "@/lib/notes/chapters";

export type EbookDefinition = {
  slug: string;
  bookSlug: string;
  notesRoute: string | null;
  /** The book's printed title and cover line. The store copy is the `ebooks` row's. */
  title: string;
  subtitle: string;
  /** Printed on the cover, e.g. "2021-2026". */
  years: string;
  chapterOrder: readonly string[];
  /** The chapter the free sample carries. */
  sampleChapter: string;
};

export const EBOOKS: readonly EbookDefinition[] = [
  {
    slug: "mht-cet-maths",
    bookSlug: "mht-cet-maths",
    notesRoute: "mht-cet-maths",
    title: "MHT-CET Mathematics",
    subtitle: "Formula Book + Chapter-wise Past Questions with Full Solutions",
    years: "2021-2026",
    chapterOrder: [
      // Class XI (Balbharati chapter numbers in lib/notes/bookOrder). Quadratic
      // Equations sits after Complex Numbers, where the book teaches it, and
      // Sequences and Series is XI chapter 11; neither has notes.
      "trigonometry-ii",
      "determinants-and-matrices",
      "straight-line",
      "circle",
      "conic-sections",
      "measures-of-dispersion",
      "complex-numbers",
      "quadratic-equations",
      "sequences-and-series",
      "permutations-and-combinations",
      "sets-relations-and-functions",
      "limits",
      // Class XII
      "mathematical-logic",
      "trigonometric-functions",
      "pair-of-straight-lines",
      "vectors",
      "line-and-plane",
      "linear-programming",
      "differentiation",
      "applications-of-derivative",
      "indefinite-integration",
      "definite-integration",
      "applications-of-definite-integral",
      "differential-equations",
      "probability-distribution",
      "binomial-distribution",
    ],
    sampleChapter: "circle",
  },
];

export function getEbook(slug: string): EbookDefinition | null {
  return EBOOKS.find((e) => e.slug === slug) ?? null;
}

export type EbookChapter = {
  number: number;
  chapter: BookChapter;
  formulas: NotesChapterRegistration | null;
};

/** The ebook's chapters in print order, each with its notes chapter where one exists. */
export function ebookChapters(ebook: EbookDefinition): EbookChapter[] {
  const book: BookDefinition | null = getBookBySlug(ebook.bookSlug);
  if (!book) throw new Error(`ebook ${ebook.slug}: no book "${ebook.bookSlug}"`);
  return ebook.chapterOrder.map((slug, i) => {
    const chapter = book.chapters.find((c) => c.slug === slug);
    if (!chapter) throw new Error(`ebook ${ebook.slug}: book has no chapter "${slug}"`);
    return {
      number: i + 1,
      chapter,
      formulas: ebook.notesRoute ? getNotesChapterBySlug(ebook.notesRoute, slug) : null,
    };
  });
}
