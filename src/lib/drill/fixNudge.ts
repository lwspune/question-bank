/**
 * The bank's "5 wrong today" line (2026-10-05): the pure core.
 *
 * WHY. Since 2026-10-02 a wrong tap in the bank enters the drill, and the card
 * never said so: in the first three days 30 students made 347 wrong taps there
 * and 6 of them ever opened /drill. The bank is where most practice happens, so
 * it is where the drill has to be named.
 *
 * EVERY FIFTH, NOT EVERY ONE (the owner's call): a line on every miss would
 * turn practice into a sales pitch. On the 5th, 10th, 15th… wrong answer of
 * the IST day the card says the misses are saved, and links there. The count
 * is the server's `answer_wrong` rows for the bank, which are deduped per
 * question per day, so a refresh cannot reset it and a re-tap cannot add to it.
 *
 * Pure. Spec: tests/fix-nudge.test.ts.
 */

export const FIX_NUDGE_EVERY = 5;

/** True when today's wrong count moved past a multiple of FIX_NUDGE_EVERY. */
export function fixNudgeCrossed(before: number, after: number, every = FIX_NUDGE_EVERY): boolean {
  if (!Number.isFinite(before) || !Number.isFinite(after) || before < 0 || after <= before) return false;
  return Math.floor(after / every) > Math.floor(before / every);
}

export type FixNudge = { questionId: string; wrongToday: number };

/**
 * Which card shows the line. A flush can carry several picks; the line goes on
 * the last wrong one, the answer the student has just made.
 */
export function pickFixNudge(input: {
  before: number;
  after: number;
  wrongIds: readonly string[];
}): FixNudge | null {
  const { before, after, wrongIds } = input;
  if (wrongIds.length === 0 || !fixNudgeCrossed(before, after)) return null;
  return { questionId: wrongIds[wrongIds.length - 1], wrongToday: after };
}

export function fixNudgeLine(wrongToday: number): string {
  return `${wrongToday} wrong today. Each one is saved in Fix your mistakes and comes back until you get it right.`;
}

/** The link. Never "Fix 0": an unknown or empty count names the page instead. */
export function fixNudgeLinkText(due: number | null): string {
  if (due === null || !Number.isFinite(due) || due <= 0) return "Fix your mistakes";
  return `Fix ${due} ${due === 1 ? "mistake" : "mistakes"}`;
}
