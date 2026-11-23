/**
 * The Map tab (/me/map; from 2026-11-08 "Chapters" under Progress, its own
 * tab since 2026-11-23).
 *
 * Pure. Spec: tests/progress-tab.test.ts.
 */

/**
 * Which exam the map opens on. A link naming an exam wins, as on Papers; else
 * the header's focus exam when the student has answered anything in it (the
 * header's chips then stand in for the map's exam row); else the map's own
 * default (the exam of their latest evidence), with the row.
 */
export function mapExamFor(input: {
  laneExams: readonly string[];
  focusExamName: string | null;
  urlExam: string | undefined;
}): { exam: string | undefined; showExamRow: boolean } {
  if (input.urlExam) return { exam: input.urlExam, showExamRow: true };
  if (input.focusExamName && input.laneExams.includes(input.focusExamName)) {
    return { exam: input.focusExamName, showExamRow: false };
  }
  return { exam: undefined, showExamRow: true };
}
