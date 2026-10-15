/**
 * A subject's question pool for practice tests: which rows a test may use, and
 * the per-chapter summary V shows when the student picks chapters.
 *
 * A row is usable on the chapter tests' terms (scripts/mocks/build-sectional.ts
 * candidateOf, ../mocks/sectional.ts isSectionalEligible): the grader can mark
 * it (four options with exactly one correct, or a numeric answer and no
 * options), it is rated (or the exam counts unrated as moderate), and it stands
 * alone (no set, no shared passage; a board's instruction-only context is
 * allowed). The loader is ./poolQuery.ts. Pure. Spec:
 * tests/practice-tests-pool.test.ts.
 */
import { isInstructionOnlyContext } from "@/lib/mocks/instructionContext";
import type { PracticeExam } from "./config";
import type { PracticeCandidate, PracticeLevel } from "./pick";

/** One bank row, flattened by the loader. */
export type PoolRow = {
  id: string;
  chapterId: string;
  kind: string;
  format: string;
  hasNumericAnswer: boolean;
  difficulty: PracticeLevel | null;
  setId: string | null;
  context: string | null;
  pyqYear: number | null;
  subtopic: string | null;
  optionCount: number;
  correctCount: number;
};

export type PoolItem = PracticeCandidate & { kind: string };

export type PoolChapter = {
  id: string;
  name: string;
  /** Questions a test can use. */
  available: number;
  /** Past-year questions asked in the last five years, usable or not. */
  recentPyq: number;
  items: PoolItem[];
};

export type SubjectPool = { chapters: PoolChapter[] };

/** How many years count as "recent" for Most-asked chapters. */
export const RECENT_YEARS = 5;

export function toCandidate(r: PoolRow, exam: PracticeExam): PoolItem | null {
  let format: "mcq" | "numeric";
  if (r.format === "mcq") {
    if (r.optionCount !== 4 || r.correctCount !== 1) return null;
    format = "mcq";
  } else if (r.format === "numeric") {
    if (!r.hasNumericAnswer || r.optionCount !== 0) return null;
    format = "numeric";
  } else {
    return null;
  }
  const shared = r.setId !== null || (r.context ?? "").trim() !== "";
  if (shared && !(exam.looseInstructions && isInstructionOnlyContext(r.context))) {
    return null;
  }
  const difficulty = r.difficulty ?? (exam.unratedAsModerate ? "MODERATE" : null);
  if (!difficulty) return null;
  return { id: r.id, chapterId: r.chapterId, subtopic: r.subtopic, difficulty, format, kind: r.kind };
}

/**
 * The pool, chapter by chapter: textbook order for a board, most-asked first
 * for a competitive exam (PracticeExam.bookOrder). A chapter with nothing
 * usable is left out, so V never offers a chapter it cannot build from.
 */
export function buildPool(
  chapters: readonly { id: string; name: string; orderIndex: number }[],
  rows: readonly PoolRow[],
  exam: PracticeExam,
  currentYear: number
): SubjectPool {
  const fromYear = currentYear - RECENT_YEARS + 1;
  const byChapter = new Map<string, { items: PoolItem[]; recentPyq: number }>();
  for (const r of rows) {
    const c = byChapter.get(r.chapterId) ?? { items: [], recentPyq: 0 };
    if (r.kind === "pyq" && r.pyqYear !== null && r.pyqYear >= fromYear) c.recentPyq += 1;
    const item = toCandidate(r, exam);
    if (item) c.items.push(item);
    byChapter.set(r.chapterId, c);
  }
  const out: (PoolChapter & { orderIndex: number })[] = chapters.flatMap((ch) => {
    const c = byChapter.get(ch.id);
    if (!c || c.items.length === 0) return [];
    return [
      { id: ch.id, name: ch.name, available: c.items.length, recentPyq: c.recentPyq, items: c.items, orderIndex: ch.orderIndex },
    ];
  });
  out.sort((a, b) =>
    exam.bookOrder
      ? a.orderIndex - b.orderIndex || a.name.localeCompare(b.name)
      : b.recentPyq - a.recentPyq || a.name.localeCompare(b.name)
  );
  return { chapters: out.map(({ orderIndex: _order, ...c }) => c) };
}
