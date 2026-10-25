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
import type { BookPaperRule } from "./boardPapers";

export type EbookKind = "formula" | "notes" | "pyq" | "papers";

type Common = {
  slug: string;
  /** Printed on the cover: "MHT-CET Mathematics". */
  title: string;
  /** The cover's one line about what is inside. */
  subtitle: string;
  /** The chapter the free sample carries. */
  sampleChapter: string;
};

export type NotesEbook = Common & { kind: "formula" | "notes"; notesRoute: string };
export type PyqEbook = Common & {
  kind: "pyq";
  bookSlug: string;
  /** The /notes subject whose class labels (XI/XII) the chapters borrow. */
  notesRoute: string | null;
  /** Printed on the cover, e.g. "2021-2026". */
  years: string;
  chapterOrder: readonly string[];
};
/**
 * A Solved Papers book (2026-10-26): stored board papers (migration 0146), each
 * as it was set and then solved. Its chapters are PAPERS, read from the
 * database at build time (lib/ebooks/boardPapers picks them), so it has no
 * fixed chapter list here; its sample is the newest paper.
 */
export type PapersEbook = Omit<Common, "sampleChapter"> & {
  kind: "papers";
  /** EXAM_REGISTRY slug. */
  examSlug: string;
  /** subjects.name, exactly as stored. */
  subject: string;
  rule: BookPaperRule;
  /** The cover's two lines: "Maharashtra HSC Class 12" over "Physics". */
  board: string;
  subjectTitle: string;
};
export type EbookDefinition = NotesEbook | PyqEbook | PapersEbook;

const CET_SUBJECTS = [
  { route: "mht-cet-maths", title: "MHT-CET Mathematics", sample: "circle" },
  { route: "mht-cet-physics", title: "MHT-CET Physics", sample: "current-electricity" },
  { route: "mht-cet-chemistry", title: "MHT-CET Chemistry", sample: "chemical-kinetics" },
] as const;

/** Every board subject with stored papers, and how many of its papers a book carries. */
const BOARD_PAPER_SUBJECTS: { examSlug: string; board: string; subject: string; title?: string; rule: BookPaperRule }[] = [
  ...["Physics", "Chemistry", "Mathematics", "Biology", "Geography"].map((subject) => ({
    examSlug: "mh-hsc-12",
    board: "Maharashtra HSC Class 12",
    subject,
    rule: "every" as const,
  })),
  ...["Algebra", "Geometry", "Science and Technology I", "Science and Technology II", "History", "Geography"].map((subject) => ({
    examSlug: "mh-ssc-10",
    board: "Maharashtra SSC Class 10",
    subject,
    // The SSC History paper carries Political Science as its second part.
    title: subject === "History" ? "History and Political Science" : undefined,
    rule: "every" as const,
  })),
  ...["Mathematics", "Science"].map((subject) => ({ examSlug: "cbse-10", board: "CBSE Class 10", subject, rule: "first-set-per-year" as const })),
  ...["Physics", "Chemistry", "Mathematics", "Biology"].map((subject) => ({
    examSlug: "cbse-12",
    board: "CBSE Class 12",
    subject,
    rule: "first-set-per-year" as const,
  })),
];

const slugPart = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const PAPERS_EBOOKS: readonly PapersEbook[] = BOARD_PAPER_SUBJECTS.map((b) => ({
  kind: "papers",
  slug: `${b.examSlug}-${slugPart(b.subject)}-solved-papers`,
  examSlug: b.examSlug,
  subject: b.subject,
  rule: b.rule,
  board: b.board,
  subjectTitle: b.title ?? b.subject,
  title: `${b.board} ${b.title ?? b.subject}`,
  subtitle:
    b.rule === "every"
      ? "Every board paper, as it was set, with a worked solution to every question."
      : "One board paper from each year, as it was set, with a worked solution to every question.",
}));

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
export function ebookChapters(ebook: Exclude<EbookDefinition, PapersEbook>): EbookChapter[] {
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
  const chapters = getNotesChaptersForSubject(ebook.notesRoute).filter((c) => ebook.kind === "notes" || hasFormulaContent(c));
  return chapters.map((c, i) => ({
    number: i + 1,
    slug: c.chapterSlug,
    name: c.chapter.chapterName,
    classLabel: chapterClassLabel(ebook.notesRoute, c.chapterSlug),
    notes: c,
    bookChapter: null,
  }));
}
