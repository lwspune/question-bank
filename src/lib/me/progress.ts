/**
 * The Progress tab (2026-11-08, step 3 of the Home · Review · Progress
 * redesign): Papers (/performance) and Chapters (/me/map) under one tab.
 *
 * Pure. Spec: tests/progress-tab.test.ts.
 */

/** Where the tab opens: Papers for a student with a marked paper (the
 *  projected score first), else Chapters, which counts practice too. */
export function progressDestination(hasMarkedPaper: boolean): "/performance" | "/me/map" {
  return hasMarkedPaper ? "/performance" : "/me/map";
}

/**
 * Which exam Chapters opens on. A link naming an exam wins, as on Papers; else
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
