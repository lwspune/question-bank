/**
 * How a per-exam question count is SAID, everywhere it is shown.
 *
 * WHY (UX_REVIEW_TRIAGE.md A1, 2026-10-02). The homepage counted every PUBLIC
 * question (NDA 14,024) while /nda and /browse counted past-year questions only
 * (NDA 5,130). Both were true; side by side they read as a contradiction, and
 * /exams/<slug> went further, labelling the every-kind total "past-year
 * questions". Now every per-exam figure names its kind, and the past-year
 * figure is the one the exam's /browse view opens on.
 *
 * The words are the bank's own: /browse's toggle says PYQ / Practice, so the
 * non-PYQ kind is "practice" here too — including a board exam's textbook
 * exercises, which /browse also files under Practice.
 *
 * Pure. Spec: tests/question-counts.test.ts.
 */

export type KindCounts = { pyq: number; practice: number };

const fmt = (n: number) => n.toLocaleString("en-IN");

/** The number an exam's default /browse view opens on (same rule as /browse). */
export function defaultViewCount(c: KindCounts, practiceOnly: boolean): number {
  return practiceOnly ? c.practice : c.pyq;
}

/** "5,130 past-year · 8,894 practice questions", or null when there is none. */
export function countSummary(c: KindCounts): string | null {
  const parts: string[] = [];
  if (c.pyq > 0) parts.push(`${fmt(c.pyq)} past-year`);
  if (c.practice > 0) parts.push(`${fmt(c.practice)} practice`);
  return parts.length > 0 ? `${parts.join(" · ")} questions` : null;
}

/** What a "filter the bank" button may claim: only the kind the bank opens on. */
export function defaultViewLabel(c: KindCounts, practiceOnly: boolean): string {
  const n = defaultViewCount(c, practiceOnly);
  return `${fmt(n)} ${practiceOnly ? "practice" : "past-year"} questions`;
}
