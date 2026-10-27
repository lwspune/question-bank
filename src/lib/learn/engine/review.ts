// Copied from Concept Ladder (src/engine/review.ts, afca8bf); the schedule itself is learn_record_attempt (migration 0190).
const DAY_MS = 24 * 60 * 60 * 1000;

/** A mastered concept is due for review once its scheduled time has arrived (rule set in record_attempt). */
export function isReviewDue(state: string, nextReviewAt: string | null, now: number): boolean {
  return state === "mastered" && nextReviewAt !== null && Date.parse(nextReviewAt) <= now;
}

/** Whole days until `iso`: at least 1 for any future time, 0 once it has passed. */
export function daysUntil(iso: string, now: number): number {
  const ms = Date.parse(iso) - now;
  if (ms <= 0) return 0;
  return Math.max(1, Math.round(ms / DAY_MS));
}
