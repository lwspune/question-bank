/**
 * The Solved Papers books (2026-10-26), one per board subject with stored
 * papers. Kept apart from lib/ebooks/catalog, which loads the whole notes
 * library, so the store page can name a book's shelf and subject without it;
 * the catalog re-exports these. Pinned by tests/ebook-catalog.test.ts.
 */
import type { BookPaperRule } from "./boardPapers";

/**
 * A Solved Papers book: stored board papers (migration 0146), each as it was
 * set and then solved. Its chapters are PAPERS, read from the database at
 * build time (lib/ebooks/boardPapers picks them), so it has no fixed chapter
 * list; its sample is the newest paper.
 */
export type PapersEbook = {
  kind: "papers";
  slug: string;
  /** Printed on the cover: "Maharashtra HSC Class 12 Physics". */
  title: string;
  subtitle: string;
  /** EXAM_REGISTRY slug. */
  examSlug: string;
  /** subjects.name, exactly as stored. */
  subject: string;
  rule: BookPaperRule;
  /** The cover's two lines: "Maharashtra HSC Class 12" over "Physics". */
  board: string;
  subjectTitle: string;
};

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

/**
 * A Repeated PYQs book (2026-10-26): from a subject's homework plan, every
 * question the board asked again and every type it keeps asking, chapter by
 * chapter (lib/ebooks/repeats). One per subject with a plan; the plan is found
 * by exam + subject at build time.
 */
export type RepeatsEbook = Omit<PapersEbook, "kind" | "rule"> & { kind: "repeats" };

/** Every board subject with a homework plan (CBSE 12 Biology has none yet). */
const PLAN_SUBJECTS: { examSlug: string; board: string; subjects: string[] }[] = [
  { examSlug: "mh-hsc-12", board: "Maharashtra HSC Class 12", subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Geography"] },
  {
    examSlug: "mh-ssc-10",
    board: "Maharashtra SSC Class 10",
    subjects: ["Algebra", "Geometry", "Science and Technology I", "Science and Technology II", "History", "Political Science", "Geography"],
  },
  { examSlug: "cbse-12", board: "CBSE Class 12", subjects: ["Physics", "Chemistry", "Mathematics"] },
  { examSlug: "cbse-10", board: "CBSE Class 10", subjects: ["Mathematics", "Science"] },
];

export const REPEATS_EBOOKS: readonly RepeatsEbook[] = PLAN_SUBJECTS.flatMap((b) =>
  b.subjects.map((subject) => ({
    kind: "repeats" as const,
    slug: `${b.examSlug}-${slugPart(subject)}-repeated-pyqs`,
    examSlug: b.examSlug,
    subject,
    board: b.board,
    subjectTitle: subject,
    title: `${b.board} ${subject}`,
    subtitle: "Every question the board asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.",
  }))
);

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
