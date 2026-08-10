/**
 * Exam-context registry + pure URL/route resolvers used by the primary nav.
 *
 * The cookie-backed exam picker stores a stable slug (e.g. `"nda"`). UUIDs are
 * resolved at render time against the `exams` table by `loadActiveExam` so the
 * Bank tab can emit `/browse?examId=<uuid>` without hard-coding ids in TS.
 *
 * Exams that don't have a `/guide` subtree yet fall back to the `/guide`
 * index. Notes route to a per-exam hub (`/notes/<slug>`) that lists every
 * notes subject for that exam (or an honest "coming soon" when none have
 * shipped) — derived from NOTES_CHAPTERS, so a new exam needs no new page.
 */

export type ExamSlug =
  | "nda"
  | "mht-cet"
  | "jee-mains"
  | "cds"
  | "foundation-course"
  | "neet"
  | "mh-hsc-12"
  | "cbse-12"
  | "mh-sb-9"
  | "mh-sb-11"
  | "mh-ssc-10"
  | "worksheets-11-12";

/**
 * School boards the bank carries content for. NOT every exam has one — a
 * coaching/entrance exam (NDA, NEET, the Foundation Course) has no board.
 */
export type Board = "Maharashtra State Board" | "CBSE";

/** School class. */
export type Std = 9 | 10 | 11 | 12;

export type ExamEntry = {
  /** URL-safe slug; the value stored in the `qb:exam` cookie. */
  slug: ExamSlug;
  /** Short label shown in the picker pill. */
  displayName: string;
  /** Canonical name in the `exams` DB table — used to resolve the UUID. */
  examName: string;
  /** `/guide/<slug>` subtree if shipped; null falls back to `/guide`. */
  guidesPath: string | null;
  /** Per-exam notes hub `/notes/<slug>`; null falls back to the `/notes` index. */
  notesPath: string | null;
  /**
   * Exam has NO past-year corpus — its bank is entirely `question_kind='practice'`
   * (e.g. the Foundation Course worksheets). `/browse` defaults the kind filter to
   * "practice" for it, so the default view isn't an empty PYQ list.
   */
  practiceOnly?: boolean;
  /**
   * A school-board exam (Maharashtra State Board, later CBSE, …) whose corpus is
   * a textbook laid out in book sections (Solved Examples → Exercise → …). These
   * get the `/board` reader — a book-faithful, exercise-by-exercise view keyed on
   * the section_* columns (migration 0043) — and the "Board" nav tab.
   */
  boardExam?: boolean;
  /**
   * Exam has published mock tests (real PYQ papers served as timed, auto-graded
   * online tests at `/mock`). Drives the gated "Mocks" primary-nav tab — shown
   * only when the active exam actually has mocks, like Papers is member-gated.
   */
  hasMocks?: boolean;
  /**
   * The board+class this exam IS. The `exams` table conflates the two into one
   * row ("Maharashtra State Board Class 10"), so this registry is the ONLY place
   * they can be separated — which is what lets the written-paper builder offer
   * independent Board and Std dropdowns.
   *
   * Declare both or neither (asserted in tests). Omit for coaching/entrance
   * exams: NDA and NEET aren't board exams at all, and the Foundation Course
   * spans Class 9 AND 10, so it is a course, not a (board, std) pair.
   */
  board?: Board;
  std?: Std;
};

export const EXAM_REGISTRY: readonly ExamEntry[] = [
  {
    slug: "nda",
    displayName: "NDA",
    examName: "NDA",
    guidesPath: "/guide/nda",
    notesPath: "/notes/nda", // exam hub: lists Maths + Physics + Biology notes
    hasMocks: true, // 18 NDA Maths Paper I mocks published at /mock
  },
  {
    slug: "mht-cet",
    displayName: "MHT-CET",
    examName: "MHT-CET",
    guidesPath: null,
    notesPath: "/notes/mht-cet", // exam hub: MHT-CET Maths notes
  },
  {
    slug: "jee-mains",
    displayName: "JEE Mains",
    examName: "JEE Mains", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/jee-mains", // exam hub: "coming soon" until JEE notes ship
  },
  {
    slug: "cds",
    displayName: "CDS",
    examName: "CDS", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/cds", // exam hub: "coming soon" until CDS notes ship
  },
  {
    slug: "foundation-course",
    displayName: "Foundation",
    examName: "Foundation Course", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree — falls back to the index
    notesPath: "/notes/foundation-course", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // worksheet-only corpus → /browse defaults to the Practice view
  },
  {
    slug: "neet",
    displayName: "NEET",
    examName: "NEET", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/neet", // exam hub: "coming soon" until NEET notes ship
    hasMocks: true, // 8 NEET (UG) mocks (2021-2026 + 2 Re-NEET) published at /mock
  },
  {
    slug: "mh-hsc-12",
    displayName: "MH HSC 12",
    examName: "Maharashtra HSC Class 12", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-hsc-12", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // textbook exercises/solved-examples corpus (board PYQs come later) → /browse defaults to Practice
    boardExam: true, // gets the /board reader + the "Board" nav tab
    board: "Maharashtra State Board",
    std: 12,
  },
  {
    slug: "cbse-12",
    displayName: "CBSE Class 12",
    examName: "CBSE Class 12", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/cbse-12", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // NCERT textbook exercises/solved-examples corpus (CBSE PYQs later) → /browse defaults to Practice
    boardExam: true, // NCERT is textbook content → gets the /board reader + the "Board" nav tab
    board: "CBSE",
    std: 12,
  },
  {
    slug: "mh-sb-9",
    displayName: "MH State Board 9",
    examName: "Maharashtra State Board Class 9", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-sb-9", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // Balbharati textbook exercises/solved-examples corpus (9th is not a board year → no PYQs) → /browse defaults to Practice
    boardExam: true, // textbook content → gets the /board reader + the "Board" nav tab
    board: "Maharashtra State Board",
    std: 9,
  },
  {
    slug: "mh-sb-11",
    displayName: "MH State Board 11",
    examName: "Maharashtra State Board Class 11", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-sb-11", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // Balbharati textbook exercises/solved-examples corpus (11th is not a board year → no PYQs) → /browse defaults to Practice
    boardExam: true, // textbook content → gets the /board reader + the "Board" nav tab
    board: "Maharashtra State Board",
    std: 11,
  },
  {
    slug: "mh-ssc-10",
    displayName: "MH SSC 10",
    examName: "Maharashtra State Board Class 10", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-ssc-10", // exam hub: "coming soon" until notes ship
    // NOT practiceOnly: Class 10 IS a board year → these are real past-year board
    // papers (question_kind='pyq'), so /browse defaults to the PYQ view.
    // NOT boardExam: PYQ papers aren't textbook-structured, so they live on /browse
    // (and /mock later), not the book-faithful /board reader.
    board: "Maharashtra State Board",
    std: 10,
  },
  {
    slug: "worksheets-11-12",
    displayName: "Worksheets 11+12",
    examName: "Worksheets - 11th+12th", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree — falls back to the index
    notesPath: "/notes/worksheets-11-12", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // Cadetprep concept-practice worksheets → /browse defaults to Practice
    // NOT boardExam: worksheet content isn't textbook-sectioned, so no /board reader.
  },
] as const;

export const DEFAULT_EXAM_SLUG: ExamSlug = "nda";

const SLUG_SET = new Set<string>(EXAM_REGISTRY.map((e) => e.slug));

export function isExamSlug(value: unknown): value is ExamSlug {
  return typeof value === "string" && SLUG_SET.has(value);
}

export function getExamBySlug(slug: string | null | undefined): ExamEntry | null {
  if (!slug) return null;
  return EXAM_REGISTRY.find((e) => e.slug === slug) ?? null;
}

/** True when an exam (by its DB name) has a practice-only corpus and should
 *  default the `/browse` kind filter to "practice" rather than "pyq". */
export function isPracticeOnlyExam(examName: string | null | undefined): boolean {
  if (!examName) return false;
  return EXAM_REGISTRY.some((e) => e.examName === examName && e.practiceOnly === true);
}

/**
 * Bank tab href. When the user has picked an exam, the link applies the
 * `examId` filter directly. Without an exam UUID, links to the bare bank.
 */
export function resolveBankHref(examUuid: string | null | undefined): string {
  if (!examUuid) return "/browse";
  const sp = new URLSearchParams();
  sp.set("examId", examUuid);
  return `/browse?${sp.toString()}`;
}

/** Guides tab href. Falls back to `/guide` when the exam has no subtree. */
export function resolveGuidesHref(slug: string | null | undefined): string {
  const exam = getExamBySlug(slug ?? null);
  return exam?.guidesPath ?? "/guide";
}

/** Notes tab href. Falls back to `/notes` when the exam has no subtree. */
export function resolveNotesHref(slug: string | null | undefined): string {
  const exam = getExamBySlug(slug ?? null);
  return exam?.notesPath ?? "/notes";
}

/** True when the active exam is a school board (gets the `/board` reader + tab). */
export function isBoardExam(slug: string | null | undefined): boolean {
  return getExamBySlug(slug ?? null)?.boardExam === true;
}

/** True when the active exam has published mock tests (gates the "Mocks" tab). */
export function examHasMocks(slug: string | null | undefined): boolean {
  return getExamBySlug(slug ?? null)?.hasMocks === true;
}

/** The board exams, in registry order (drives the `/board` index). */
export const BOARD_EXAMS: readonly ExamEntry[] = EXAM_REGISTRY.filter(
  (e) => e.boardExam === true
);

/**
 * Distinct boards, in registry order — the written-paper builder's first
 * dropdown. Derived, so registering a new board exam surfaces it automatically.
 */
export const BOARDS: readonly Board[] = Array.from(
  new Set(EXAM_REGISTRY.map((e) => e.board).filter((b): b is Board => Boolean(b)))
);

/**
 * The classes a board actually has content for, ascending. Deliberately derived
 * from the registry rather than hard-coded 9..12, so the Std dropdown can only
 * ever offer a class the bank can fill — Maharashtra returns [9, 10, 12] because
 * there is no Class 11 corpus, and offering 11 would produce an empty paper.
 */
export function stdsForBoard(board: string | null | undefined): Std[] {
  if (!board) return [];
  return EXAM_REGISTRY.filter((e) => e.board === board)
    .map((e) => e.std!)
    .sort((a, b) => a - b);
}

/**
 * Resolve a (board, std) pair to its exam — the inverse of the conflation in the
 * `exams` table. Null when the pair has no corpus (Class 11 anywhere, CBSE 9/10).
 */
export function getExamForBoardStd(
  board: string | null | undefined,
  std: number | null | undefined
): ExamEntry | null {
  if (!board || !std) return null;
  return EXAM_REGISTRY.find((e) => e.board === board && e.std === std) ?? null;
}

/** Board tab href — the exam's board hub when it's a board exam, else the index. */
export function resolveBoardHref(slug: string | null | undefined): string {
  const exam = getExamBySlug(slug ?? null);
  return exam?.boardExam ? `/board/${exam.slug}` : "/board";
}

export type ActiveTab = "bank" | "guides" | "notes" | "board" | "papers" | "mock";

/**
 * Maps a pathname to the primary-nav tab that owns it. Returns null for
 * routes outside the primary surfaces (bare dashboard, login, edit pages).
 *
 * Match is on path segments — `/browser-other` is not a `/browse` match.
 * `/dashboard/papers` is the collaborative paper builder (the Papers tab,
 * org-members only); bare `/dashboard` is admin tooling and owns no tab.
 */
export function getActiveTab(pathname: string): ActiveTab | null {
  const path = pathname.split("?")[0].split("#")[0];
  if (matchesSegment(path, "/browse")) return "bank";
  if (matchesSegment(path, "/guide")) return "guides";
  if (matchesSegment(path, "/notes")) return "notes";
  if (matchesSegment(path, "/board")) return "board";
  if (matchesSegment(path, "/mock")) return "mock";
  if (matchesSegment(path, "/dashboard/papers")) return "papers";
  return null;
}

function matchesSegment(path: string, prefix: string): boolean {
  if (path === prefix) return true;
  if (path.startsWith(`${prefix}/`)) return true;
  return false;
}
