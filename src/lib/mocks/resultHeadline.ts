/**
 * The mock result HEADLINE — the first thing a student reads after a sitting.
 *
 * WHY THIS IS A PURE HELPER AND NOT THREE LINES OF JSX. Measured 2026-09-24:
 * the median attempt answered 27% of a 150-question paper and finished at 11%
 * of marks, while accuracy on what WAS attempted was 70%. The old headline
 * printed `score / maxScore` and `11%`, and 45% of students who sat one mock
 * never sat a second. A headline that reads as a verdict on the student when
 * it is mostly a verdict on the clock is the single most expensive line of
 * copy in the product, so its rules live here where a test can hold them.
 *
 * RULES:
 * - Lead with accuracy on ATTEMPTED (correct / (correct + wrong)). Never a
 *   share of max marks — negative marking makes that number read as failure.
 * - Name the unanswered count as its own fact ("120 left unanswered"), because
 *   that is the number the student can act on next time.
 * - The primary action follows the data: something to fix → the drill; nothing
 *   wrong → another mock; nothing attempted → try again.
 *
 * No I/O. Spec: tests/mock-result-headline.test.ts.
 */

export type ResultHeadlineInput = {
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
};

export type PrimaryAction = "fix" | "another" | "retake";

export type ResultHeadline = {
  attempted: number;
  /** Whole percent, or null when nothing was attempted. */
  accuracyPct: number | null;
  unanswered: number;
  /** The one-line headline. */
  lead: string;
  /** The unanswered line, or null when every question was answered. */
  detail: string | null;
  primaryAction: PrimaryAction;
};

export function buildResultHeadline(s: ResultHeadlineInput): ResultHeadline {
  const attempted = s.correct + s.wrong;
  const unanswered = Math.max(0, s.skipped);
  const accuracyPct = attempted > 0 ? Math.round((s.correct / attempted) * 100) : null;

  const detail =
    unanswered > 0
      ? `${unanswered} left unanswered — that's the clock, not the syllabus.`
      : null;

  if (attempted === 0) {
    return {
      attempted,
      accuracyPct,
      unanswered,
      lead: "You didn't attempt any question this time. The paper is still here when you're ready.",
      detail: null,
      primaryAction: "retake",
    };
  }

  const lead = `${s.correct} of the ${attempted} you attempted were right.`;
  const primaryAction: PrimaryAction = s.wrong > 0 ? "fix" : "another";

  return { attempted, accuracyPct, unanswered, lead, detail, primaryAction };
}
