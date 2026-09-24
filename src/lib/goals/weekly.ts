/**
 * The weekly sittings goal — pure core.
 *
 * WHY A WEEK AND NOT A DAY. The engagement gate prefers deadline/goal-progress
 * over daily streaks for this cohort, and the measured cadence (2026-09-18) is
 * `mixed`: median inter-visit gap 2.0 days, 205 of 419 gaps next-day. A daily
 * streak shows a zero to half of these students on every visit — the sibling
 * AI Tutor measured that as the one thing worse than no streak. A weekly
 * target fits both the daily and the burst student.
 *
 * WHAT COUNTS AS A SITTING. Finished things only: a graded mock, a completed
 * drill, a notes checkpoint, a public quiz. Never a start, never a reveal —
 * those are cheap to fire and would let the goal be met by opening tabs.
 *
 * THE GOAL IS THEIRS. `weekly_goal` on student_profiles (migration 0113) is
 * nullable; null means "not chosen", the UI shows DEFAULT_WEEKLY_GOAL as a
 * suggestion and says so. A goal the product imposes is a quota; one they set
 * is a plan.
 *
 * No I/O. Spec: tests/goals-weekly.test.ts.
 */
import type { ActivityKind } from "@/lib/activity/events";

export const DEFAULT_WEEKLY_GOAL = 3;

/** The choices the picker offers. All must sanitize to themselves. */
export const WEEKLY_GOAL_CHOICES = [2, 3, 5, 7] as const;

export const MIN_WEEKLY_GOAL = 1;
export const MAX_WEEKLY_GOAL = 14;

export const WEEK_SITTING_KINDS: readonly ActivityKind[] = [
  "mock_submitted",
  "drill_completed",
  "note_checkpoint",
  "quiz_taken",
] as const;

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 86_400_000;

/**
 * Monday 00:00 IST of the week containing `now`, as a UTC instant.
 *
 * Computed by shifting into IST, flooring to the day, walking back to Monday,
 * and shifting out again — so it is correct regardless of the host timezone,
 * which is what a Vercel function in iad1 and a laptop in Pune both need.
 */
export function weekStartIst(now: Date): Date {
  const shifted = now.getTime() + IST_OFFSET_MS;
  const dayStart = Math.floor(shifted / DAY_MS) * DAY_MS;
  // getUTCDay on the shifted instant is the IST weekday: 0 = Sunday.
  const weekday = new Date(dayStart).getUTCDay();
  const sinceMonday = (weekday + 6) % 7;
  return new Date(dayStart - sinceMonday * DAY_MS - IST_OFFSET_MS);
}

export type WeeklyProgress = {
  done: number;
  goal: number;
  /** False when the student has not picked a goal and the default is shown. */
  chosen: boolean;
  remaining: number;
  /** Whole percent, capped at 100. */
  pct: number;
  met: boolean;
};

export function weeklyProgress(done: number, goal: number | null): WeeklyProgress {
  const chosen = goal !== null;
  const g = goal ?? DEFAULT_WEEKLY_GOAL;
  const remaining = Math.max(0, g - done);
  const pct = Math.min(100, Math.round((done / g) * 100));
  return { done, goal: g, chosen, remaining, pct, met: done >= g };
}

/**
 * Growth-framed, per the gate: names what moved and what is next, never a
 * bare number, and a met goal is allowed to simply be met.
 */
export function weeklyGoalSentence(p: WeeklyProgress): string {
  if (p.met) return "That's this week's goal done. Anything from here is a bonus.";
  if (p.done === 0) return `A ${p.goal}-sitting week starts with one. A five-question drill counts.`;
  if (p.remaining === 1) return "One more sitting and this week's goal is met.";
  return `${p.done} down, ${p.remaining} to go this week.`;
}

/** An integer in [MIN_WEEKLY_GOAL, MAX_WEEKLY_GOAL], else null. Accepts a
 *  numeric string because the value arrives from a <select>. */
export function sanitizeWeeklyGoal(raw: unknown): number | null {
  const n = typeof raw === "string" ? Number(raw) : raw;
  if (typeof n !== "number" || !Number.isInteger(n)) return null;
  if (n < MIN_WEEKLY_GOAL || n > MAX_WEEKLY_GOAL) return null;
  return n;
}
