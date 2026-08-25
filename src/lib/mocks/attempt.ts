/**
 * Pure attempt + grading helpers for mock tests. No I/O — unit-tested in
 * tests/mock-attempt.test.ts. The service layer (service.ts) and the API routes
 * wrap these with DB reads/writes; the runner UI derives its timer + palette
 * from remainingSecs / paletteState so display and grading agree.
 */

/** Whole seconds left until `expiresAt`, clamped at zero (refresh-resistant:
 *  the client re-derives this from the server timestamp, never a local count). */
export function remainingSecs(expiresAt: string, nowMs: number): number {
  const left = Math.floor((Date.parse(expiresAt) - nowMs) / 1000);
  return left > 0 ? left : 0;
}

export type PaletteState =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "flagged";

/** The palette colour for one question, from its saved answer row (if any).
 *  Flag is an overlay that wins over answered/not-answered (CBT convention). */
export function paletteState(
  row: { selectedLabel: string | null; isFlagged: boolean } | undefined
): PaletteState {
  if (!row) return "not_visited";
  if (row.isFlagged) return "flagged";
  return row.selectedLabel ? "answered" : "not_answered";
}

export type MockGradeQuestion = {
  questionId: string;
  sectionKey: string;
  marks: number;
  negMarks: number;
  /** The correct option label (the answer key). */
  answer: "A" | "B" | "C" | "D";
  /**
   * Officially dropped / bonus question: award full marks to EVERY attempt,
   * never penalize, regardless of the chosen option (NTA grace-marks reality).
   * Counted as correct in the tally.
   */
  grace?: boolean;
};

export type SectionScore = {
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
};

export type MockGradeResult = {
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  /** Per-question verdict keyed by questionId: 1 right, -1 wrong, 0 blank. */
  verdicts: Record<string, 1 | -1 | 0>;
  sectionScores: Record<string, SectionScore>;
};

const emptySection = (): SectionScore => ({
  correct: 0,
  wrong: 0,
  skipped: 0,
  score: 0,
  maxScore: 0,
});

/**
 * Grade a set of chosen letters against the key. `answers` maps questionId to
 * the chosen letter (missing / null / empty = skipped). Case-insensitive.
 * Applies per-question +marks / negMarks, and rolls totals up per section.
 */
export function gradeMock(
  questions: MockGradeQuestion[],
  answers: Record<string, string | null | undefined>
): MockGradeResult {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  let score = 0;
  let maxScore = 0;
  const verdicts: Record<string, 1 | -1 | 0> = {};
  const sectionScores: Record<string, SectionScore> = {};

  for (const q of questions) {
    const sec = (sectionScores[q.sectionKey] ??= emptySection());
    maxScore += q.marks;
    sec.maxScore += q.marks;

    // Grace (officially dropped / bonus): everyone gets full marks, no penalty,
    // regardless of what — or whether — they answered.
    if (q.grace) {
      correct++;
      sec.correct++;
      score += q.marks;
      sec.score += q.marks;
      verdicts[q.questionId] = 1;
      continue;
    }

    const chosen = String(answers?.[q.questionId] ?? "").trim().toUpperCase();
    const key = String(q.answer).trim().toUpperCase();

    if (!chosen) {
      skipped++;
      sec.skipped++;
      verdicts[q.questionId] = 0;
    } else if (chosen === key) {
      correct++;
      sec.correct++;
      score += q.marks;
      sec.score += q.marks;
      verdicts[q.questionId] = 1;
    } else {
      wrong++;
      sec.wrong++;
      score += q.negMarks;
      sec.score += q.negMarks;
      verdicts[q.questionId] = -1;
    }
  }

  // Round to 2dp to kill float drift (−0.83 sums), then coerce −0 to 0.
  // maxScore needs it too, not just score: CDS marks are fractional (0.8333),
  // so a 120-question paper accumulates to 99.99599999999981 and the results
  // page would read "/ 99.996" instead of "/ 100".
  const round2 = (n: number) => Math.round(n * 100) / 100 || 0;
  score = round2(score);
  maxScore = round2(maxScore);
  for (const sec of Object.values(sectionScores)) {
    sec.score = round2(sec.score);
    sec.maxScore = round2(sec.maxScore);
  }

  return { correct, wrong, skipped, score, maxScore, verdicts, sectionScores };
}
