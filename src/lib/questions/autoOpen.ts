/**
 * Open the solution after a wrong pick on a bank card (UX_ACTION_PLAN.md A12,
 * built 2026-10-05). The student who has just got it wrong most needs the
 * explanation, so it opens without another tap (the immediate-feedback
 * principle). A right pick keeps the "Show solution" button, as the board
 * reader's first tap already shows its answer. No extra reveal is charged: the
 * pick has already spent it.
 *
 * Pure. Spec: tests/auto-open-solution.test.ts.
 */
export function shouldAutoOpenSolution(input: {
  /** The pick was accepted (not refused by the reveal wall). */
  picked: boolean;
  /** The page's reading of the key; null when it cannot be graded. */
  isCorrect: boolean | null;
  hasSolution: boolean;
  cancelled: boolean;
}): boolean {
  return input.picked && input.isCorrect === false && input.hasSolution && !input.cancelled;
}
