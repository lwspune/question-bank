/**
 * The readout of "the plan follows the class" (MENTOR_SPEC.md §18,
 * 2026-11-15), printed by `npm run path:readout`.
 *
 *   - the checklist ("What has your class covered?") seen, saved, skipped
 *     ("Start from chapter 1" saves nothing ticked), and how many it ticks;
 *   - "Switch chapter" taps;
 *   - today's-task completion for the students ALREADY on the plan, in the 7
 *     days before the change against the 7 days after. The same students on
 *     both sides, so keener newcomers cannot flatter the after.
 *
 * The change day is the first student save of the checklist (`followDay`),
 * read from the data: nothing to type in after the push, and a push that
 * slips moves it on its own.
 *
 * Pure. Spec: tests/path-follow-readout.test.ts.
 */
import { addDays } from "./pace";

export const WINDOW_DAYS = 7;

/** The IST day of the first checklist save by a student, or null before any. */
export function followDay(saves: readonly { user: string; day: string }[]): string | null {
  let first: string | null = null;
  for (const s of saves) if (first === null || s.day < first) first = s.day;
  return first;
}

export type FollowSummary = {
  seen: number;
  /** Students who saved the checklist, ticked or not; `skipped` saved it with nothing ticked. */
  answered: number;
  skipped: number;
  medianTicked: number;
  switches: number;
  switchers: number;
};

/** A student's LATEST save stands for them. */
export function summarizeFollow(input: {
  coverViews: readonly { user: string }[];
  covered: readonly { user: string; ticked: number }[];
  switched: readonly { user: string }[];
}): FollowSummary {
  const latest = new Map<string, number>();
  for (const c of input.covered) latest.set(c.user, c.ticked);
  const ticks = [...latest.values()].filter((n) => n > 0).sort((a, b) => a - b);
  return {
    seen: new Set(input.coverViews.map((v) => v.user)).size,
    answered: latest.size,
    skipped: [...latest.values()].filter((n) => n === 0).length,
    medianTicked: ticks.length === 0 ? 0 : ticks[Math.floor(ticks.length / 2)],
    switches: input.switched.length,
    switchers: new Set(input.switched.map((s) => s.user)).size,
  };
}

type Side = { shown: number; done: number; studentDays: number };

/**
 * Tasks shown and done by the end of their day, for students whose plan began
 * before `change`: the WINDOW_DAYS before it against the WINDOW_DAYS from it.
 */
export function beforeAfter(
  days: readonly { user: string; day: string; shown: number; done: number }[],
  startDay: ReadonlyMap<string, string>,
  change: string
): { cohort: number; before: Side; after: Side } {
  const from = addDays(change, -WINDOW_DAYS);
  const to = addDays(change, WINDOW_DAYS);
  const cohort = new Set([...startDay].filter(([, d]) => d < change).map(([u]) => u));
  const before: Side = { shown: 0, done: 0, studentDays: 0 };
  const after: Side = { shown: 0, done: 0, studentDays: 0 };
  for (const d of days) {
    if (!cohort.has(d.user) || d.day < from || d.day >= to) continue;
    const side = d.day < change ? before : after;
    side.shown += d.shown;
    side.done += d.done;
    side.studentDays++;
  }
  return { cohort: cohort.size, before, after };
}
