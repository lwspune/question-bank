/**
 * The board plan's pinned row in V (owner, 2026-11-22). The plan left every
 * page and lives in V alone: tapping "My plan for today" pins a one-line
 * "Today's plan" row at the top of V's chat for the rest of that India day,
 * remembered on this device. Pure, so the day rule is tested without a browser.
 */
import type { PathView } from "@/lib/path/view";

/** India is UTC+5:30, no daylight saving. */
const IST_OFFSET_MS = 330 * 60_000;

/** YYYY-MM-DD in India time (lib/chat/dayCard's rule; kept here so V's bundle does not load that module). */
function istDay(d: Date): string {
  return new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** localStorage key holding the India day the plan was pinned. */
export const PLAN_PIN_KEY = "v-plan-pinned";

/** The value stored when the plan is pinned now. */
export function pinFor(now: Date): string {
  return istDay(now);
}

/** True while the stored pin is today's (India time); it lapses at midnight IST. */
export function isPinnedToday(stored: string | null, now: Date): boolean {
  return stored !== null && stored === istDay(now);
}

/** The closed row's short line: "1 of 3 done", or "Every chapter done". */
export function planSummary(view: Pick<PathView, "tasks">): string {
  if (view.tasks.length === 0) return "Every chapter done";
  const done = view.tasks.filter((t) => t.done).length;
  return `${done} of ${view.tasks.length} done`;
}
