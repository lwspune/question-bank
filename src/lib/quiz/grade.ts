/**
 * Pure server-side quiz grader for the PUBLIC quiz funnel.
 *
 * Ported verbatim (in behaviour) from nda-tracker's gradeQuizAttempt
 * (src/lib/quiz.js) so a public-quiz score matches what the student app would
 * compute. No I/O — unit-tested in tests/quiz-grade.test.ts. Grading runs
 * SERVER-SIDE only (the answer key never reaches the browser before submit).
 */

export const DEFAULT_MARKING = { correct: 1, wrong: 0 } as const;

export type Marking = { correct: number; wrong: number };

/** The answer key for one question: its number + correct letter. */
export type GradedQuestion = { q: number; answer: string };

export type Verdict = 1 | -1 | 0; // correct / incorrect / not-attempted

export type GradeResult = {
  correct: number;
  incorrect: number;
  notAttempted: number;
  score: number;
  /** Per-question verdict keyed by question number (same encoding as
   *  nda-tracker exam_results.responses): 1 right, -1 wrong, 0 blank. */
  responses: Record<string, Verdict>;
};

/**
 * Grade chosen letters against the key. `answers` maps a question number (as a
 * string) to the chosen letter; a missing/empty entry is "not attempted".
 * Case-insensitive on both the key and the chosen letter.
 */
export function gradeQuiz(
  questions: GradedQuestion[],
  answers: Record<string, string | undefined>,
  marking: Marking = DEFAULT_MARKING
): GradeResult {
  const correctMark = marking?.correct ?? DEFAULT_MARKING.correct;
  const wrongMark = marking?.wrong ?? DEFAULT_MARKING.wrong;

  let correct = 0;
  let incorrect = 0;
  let notAttempted = 0;
  const responses: Record<string, Verdict> = {};

  for (const q of questions ?? []) {
    const key = String(q.q);
    const chosen = String(answers?.[key] ?? "").trim().toUpperCase();
    const right = String(q.answer ?? "").trim().toUpperCase();
    if (!chosen) {
      notAttempted++;
      responses[key] = 0;
    } else if (chosen === right) {
      correct++;
      responses[key] = 1;
    } else {
      incorrect++;
      responses[key] = -1;
    }
  }

  const score = correct * correctMark + incorrect * wrongMark;
  return { correct, incorrect, notAttempted, score, responses };
}

/** Remove the answer key from quiz questions before they reach an anon client.
 *  Mirrors nda-tracker's stripAnswerKey — pure, so the page + endpoint share it. */
export function stripAnswerKey<T extends { answer?: unknown; correct?: unknown }>(
  questions: T[]
): Omit<T, "answer" | "correct">[] {
  return (questions ?? []).map(({ answer: _a, correct: _c, ...rest }) => rest);
}
