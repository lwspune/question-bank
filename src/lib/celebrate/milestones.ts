/**
 * "N questions answered" — the pure core (2026-10-04).
 *
 * ANSWERED, NOT OPENED. The user first asked for milestones on questions
 * opened; that was changed to answered because celebrating an open rewards
 * tapping "Show answer", which is the behaviour the 2026-10-16 bank wrong-rate
 * check exists to catch. "Answered" = a graded pick on the bank, the board or
 * the question of the day, a graded drill answer, or an answered question in a
 * finished mock (JEE numeric answers included — they are graded too). The
 * count itself is computed in SQL (get_own_answer_totals, migration 0132).
 *
 * THE AWARD IS THE SERVER'S AND HAPPENS ONCE. Each milestone is one
 * `milestone_reached` row under a per-student dedupe key, so a reload, a second
 * tab or a replayed request cannot show it twice (the engagement gate's
 * "awards are server-side + idempotent"). When a mock jumps the total past
 * several milestones only the highest is awarded and shown; the lower ones are
 * never written, which is why "highest at or below" is the whole rule.
 *
 * Ladder: 10, 20, 50, then every 50 (the user's, 2026-10-04).
 *
 * Spec: tests/celebrate-milestones.test.ts.
 */
import type { ActivityEvent } from "@/lib/activity/events";

export function isAnswerMilestone(n: number): boolean {
  return n === 10 || n === 20 || (n >= 50 && n % 50 === 0);
}

export function highestMilestone(answered: number): number | null {
  if (!Number.isFinite(answered) || answered < 10) return null;
  if (answered < 20) return 10;
  if (answered < 50) return 20;
  return Math.floor(answered / 50) * 50;
}

export function milestoneDedupeKey(userId: string, milestone: number): string {
  return `milestone:answered:${userId}:${milestone}`;
}

export function milestoneEvent(userId: string, milestone: number): ActivityEvent {
  return {
    kind: "milestone_reached",
    metadata: { answered: milestone },
    dedupeKey: milestoneDedupeKey(userId, milestone),
  };
}

export function milestoneMessage(milestone: number): string {
  return `${milestone.toLocaleString("en-IN")} questions answered.`;
}
