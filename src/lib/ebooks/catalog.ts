/**
 * What each ebook prints (2026-10-20). Three kinds, sold separately (owner):
 *
 * - **Formula Book** (Rs 49): every notes chapter's formulas with their symbol
 *   legends, reference tables and traps with explanations.
 * - **Notes Book** (Rs 49): every notes chapter taught in full: idea,
 *   definition, formula, worked example, try-it, traps.
 * - **PYQ Book** (Rs 149): every past question of a compiled `/books`
 *   definition, chapter by chapter, with full solutions.
 *
 * The store copy and the price live in `public.ebooks` (migrations 0172/0173)
 * and change without a deploy; what is here is structural and pinned by
 * tests/ebook-catalog.test.ts. Formula and Notes books take their chapters
 * from the notes registry in textbook order (lib/notes/bookOrder), so a new
 * notes chapter joins them on the next build; the PYQ book pins its order,
 * since its chapters come from a book definition, not from notes.
 */
import { getBookBySlug, type BookChapter } from "@/lib/books/registry";
import { getNotesChapterBySlug, getNotesChaptersForSubject, type NotesChapterRegistration } from "@/lib/notes/chapters";
import { BOOK_POSITION } from "@/lib/notes/bookOrder";
import { formulaPageCounts } from "@/lib/formula/chapterPages";
import {
  CHAPTERWISE_EBOOKS,
  HOMI_BHABHA_9_ORDER,
  PAPERS_EBOOKS,
  REPEATS_EBOOKS,
  TEXTBOOK_EBOOKS,
  type ChapterwiseEbook,
  type PapersEbook,
  type RepeatsEbook,
  type TextbookEbook,
} from "./paperBooks";

export {
  CHAPTERWISE_EBOOKS,
  PAPERS_EBOOKS,
  REPEATS_EBOOKS,
  TEXTBOOK_EBOOKS,
  type ChapterwiseEbook,
  type PapersEbook,
  type RepeatsEbook,
  type TextbookEbook,
};

export type EbookKind = "formula" | "notes" | "pyq" | "papers" | "repeats" | "chapterwise" | "textbook";

type Common = {
  slug: string;
  /** Printed on the cover: "MHT-CET Mathematics". */
  title: string;
  /** The cover's one line about what is inside. */
  subtitle: string;
  /** The chapter the free sample carries. */
  sampleChapter: string;
};

/** One notes subject of a book that reads several (Homi Bhabha): its route, the label its chapters carry, and their order by name. */
export type NotesPart = { route: string; label: string; order: readonly string[] };
export type NotesEbook = Common & {
  kind: "formula" | "notes";
  /** The cover's two lines; the CET books' default is "MHT-CET" over the title's subject. */
  cover?: { over: string; main: string };
} & (
    | { notesRoute: string; parts?: undefined }
    /** Several notes subjects in turn (Homi Bhabha Class 9, 2026-11-21), each chapter labelled with its subject. */
    | { notesRoute?: undefined; parts: readonly NotesPart[] }
  );
export type PyqEbook = Common & {
  kind: "pyq";
  bookSlug: string;
  /** The /notes subject whose class labels (XI/XII) the chapters borrow. */
  notesRoute: string | null;
  /** Printed on the cover, e.g. "2021-2026". */
  years: string;
  chapterOrder: readonly string[];
};
/** A Solved Papers book (lib/ebooks/paperBooks): its chapters are papers, read at build time. */
export type EbookDefinition = NotesEbook | PyqEbook | PapersEbook | RepeatsEbook | ChapterwiseEbook | TextbookEbook;
/** The board books: their chapters come from the database at build time, not from this catalog. */
export type BoardEbook = PapersEbook | RepeatsEbook | ChapterwiseEbook | TextbookEbook;

/** A board book (type guard): papers, repeats, chapter-wise or textbook. */
export function isBoardEbook(e: EbookDefinition): e is BoardEbook {
  return e.kind === "papers" || e.kind === "repeats" || e.kind === "chapterwise" || e.kind === "textbook";
}

const CET_SUBJECTS = [
  { route: "mht-cet-maths", title: "MHT-CET Mathematics", sample: "circle" },
  { route: "mht-cet-physics", title: "MHT-CET Physics", sample: "current-electricity" },
  { route: "mht-cet-chemistry", title: "MHT-CET Chemistry", sample: "chemical-kinetics" },
] as const;

export const EBOOKS: readonly EbookDefinition[] = [
  ...CET_SUBJECTS.flatMap((s): NotesEbook[] => [
    {
      kind: "formula",
      slug: `${s.route}-formulas`,
      notesRoute: s.route,
      title: s.title,
      subtitle: "Every formula, table and common trap, chapter by chapter, with what each symbol means.",
      sampleChapter: s.sample,
    },
    {
      kind: "notes",
      slug: `${s.route}-notes`,
      notesRoute: s.route,
      title: s.title,
      subtitle: "Every chapter taught from the start: the idea, the definition, the formula, a worked example and the traps.",
      sampleChapter: s.sample,
    },
  ]),
  {
    kind: "notes",
    slug: "homi-bhabha-9-notes",
    title: "Homi Bhabha Class 9 Science",
    subtitle: "Every chapter taught from the start, Physics to General Science: the idea, the definition, a worked example and the traps.",
    sampleChapter: "current-electricity",
    cover: { over: "Homi Bhabha Class 9", main: "Science" },
    parts: (["Physics", "Chemistry", "Biology", "General Science"] as const).map((label) => ({
      route: `homi-bhabha-9-${label.toLowerCase().replace(/\s+/g, "-")}`,
      label,
      order: HOMI_BHABHA_9_ORDER[label],
    })),
  },
  {
    kind: "pyq",
    slug: "mht-cet-maths-pyq",
    bookSlug: "mht-cet-maths",
    notesRoute: "mht-cet-maths",
    title: "MHT-CET Mathematics",
    subtitle: "Every past question 2021-2026, chapter by chapter, with a worked solution to each.",
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
  ...PAPERS_EBOOKS,
  ...REPEATS_EBOOKS,
  ...CHAPTERWISE_EBOOKS,
  ...TEXTBOOK_EBOOKS,
];

/** PYQ chapters with no notes, so no BOOK_POSITION entry: their class, by hand. */
const EXTRA_CLASS: Record<string, Record<string, 11 | 12>> = {
  "mht-cet-maths": { "quadratic-equations": 11, "sequences-and-series": 11 },
};

/** "Class XI" / "Class XII" for a chapter, or null when the book position is unknown. */
export function chapterClassLabel(notesRoute: string, chapterSlug: string): string | null {
  const cls = BOOK_POSITION[notesRoute]?.[chapterSlug]?.cls ?? EXTRA_CLASS[notesRoute]?.[chapterSlug];
  return cls === 11 ? "Class XI" : cls === 12 ? "Class XII" : null;
}

export function getEbook(slug: string): EbookDefinition | null {
  return EBOOKS.find((e) => e.slug === slug) ?? null;
}

export type EbookChapter = {
  number: number;
  slug: string;
  name: string;
  /** "Class XI" etc., for the chapter opener. */
  classLabel: string | null;
  /** The /notes chapter, when there is one. */
  notes: NotesChapterRegistration | null;
  /** The compiled book's chapter (PYQ books only). */
  bookChapter: BookChapter | null;
};

function hasFormulaContent(c: NotesChapterRegistration): boolean {
  const n = formulaPageCounts(c);
  return n.formulas + n.tables + n.traps > 0;
}

/** The ebook's chapters in print order. A Solved Papers book's come from the database (scripts/ebooks/build). */
export function ebookChapters(ebook: Exclude<EbookDefinition, BoardEbook>): EbookChapter[] {
  if (ebook.kind === "pyq") {
    const book = getBookBySlug(ebook.bookSlug);
    if (!book) throw new Error(`ebook ${ebook.slug}: no book "${ebook.bookSlug}"`);
    return ebook.chapterOrder.map((slug, i) => {
      const chapter = book.chapters.find((c) => c.slug === slug);
      if (!chapter) throw new Error(`ebook ${ebook.slug}: book has no chapter "${slug}"`);
      return {
        number: i + 1,
        slug,
        name: chapter.name,
        classLabel: ebook.notesRoute ? chapterClassLabel(ebook.notesRoute, slug) : null,
        notes: ebook.notesRoute ? getNotesChapterBySlug(ebook.notesRoute, slug) : null,
        bookChapter: chapter,
      };
    });
  }
  const keep = (c: NotesChapterRegistration) => ebook.kind === "notes" || hasFormulaContent(c);
  if (ebook.parts) {
    // Each subject in turn, its chapters in the pinned order; a chapter the order does not name stops the build.
    const chapters = ebook.parts.flatMap((p) =>
      getNotesChaptersForSubject(p.route)
        .filter(keep)
        .map((c) => {
          const at = p.order.indexOf(c.chapter.chapterName);
          if (at < 0) throw new Error(`ebook ${ebook.slug}: notes chapter "${c.chapter.chapterName}" is missing from the ${p.label} order`);
          return { c, at, label: p.label };
        })
        .sort((a, b) => a.at - b.at)
    );
    return chapters.map(({ c, label }, i) => ({
      number: i + 1,
      slug: c.chapterSlug,
      name: c.chapter.chapterName,
      classLabel: label,
      notes: c,
      bookChapter: null,
    }));
  }
  const route = ebook.notesRoute;
  return getNotesChaptersForSubject(route)
    .filter(keep)
    .map((c, i) => ({
      number: i + 1,
      slug: c.chapterSlug,
      name: c.chapter.chapterName,
      classLabel: chapterClassLabel(route, c.chapterSlug),
      notes: c,
      bookChapter: null,
    }));
}
