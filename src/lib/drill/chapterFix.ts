/**
 * "Fix N mistakes in this chapter" (2026-11-07): the line a signed-in student
 * sees above a chapter's questions on /questions, /board and a one-chapter
 * /browse, when that chapter holds mistakes waiting in their drill. The button
 * opens the drill narrowed to the chapter (/drill?chapter=).
 *
 * Why it exists: students come back to the bank but rarely to the drill (30
 * days to 2026-11-07: 534 of 947 students with a miss returned on 2+ days,
 * 41 drilled on 2+ days). So the drill goes to the page they already chose.
 * Baseline for the growth experiment `chapter-fix`: on 529 chapter-days with
 * older waiting mistakes, 30% fixed one that day unprompted.
 *
 * The count is the pulse's (lib/pulse/cache `chapterDue`), built from the
 * drill's own due pool, so the number shown is the number served.
 *
 * Pure. Spec: tests/drill-chapter-fix.test.ts.
 */
import type { Pulse } from "@/lib/pulse/cache";

/** Mistakes waiting in this chapter, 0 before the pulse arrives or when none. */
export function chapterFixCount(pulse: Pulse | null, chapterId: string): number {
  return pulse?.chapterDue?.[chapterId] ?? 0;
}

const n = (count: number) => count.toLocaleString("en-IN");
const mistakes = (count: number) => (count === 1 ? "mistake" : "mistakes");

/** The line's text. Owner-approved wording, 2026-11-07. */
export function chapterFixLine(count: number): string {
  return `Fix ${n(count)} ${mistakes(count)} in this chapter`;
}

/** The button's accessible name: its visible text is just "Fix them". */
export function chapterFixLabel(count: number): string {
  return `Fix the ${n(count)} ${mistakes(count)} waiting in this chapter`;
}
