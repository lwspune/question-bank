/**
 * The line under a notes subject hub's heading (/notes/cds-maths). Says how to
 * use the notes; the /notes hub says what they are and the exam hub what is
 * covered. One short line since 2026-11-10 (owner): it ran six lines on a
 * phone. A one-chapter subject gets no "each", which reads wrong for one.
 * Spec: tests/short-intros.test.ts.
 */
export function subjectNotesIntro(chapterCount: number, subjectDisplay: string): string {
  if (chapterCount === 1) return `One chapter of ${subjectDisplay}.`;
  return `${chapterCount} chapters of ${subjectDisplay}. Each stands alone, so start where you are weakest.`;
}
