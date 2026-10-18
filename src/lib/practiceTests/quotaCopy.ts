/**
 * What V's practice-test builder says about the free practice tests a day
 * (migration 0156). Pure. The number comes from the student's MockStartState,
 * which reads paywall_settings.free_practice_tests_per_day, so the copy follows
 * /dashboard/pricing without a deploy. The database trigger is the real gate.
 *
 * Read in three places: the note under V's first question (before building,
 * 2026-10-17: a student who had used the day's test built five more and found
 * out only on each built card), the built-test card, and the refused Start.
 */
import type { MockStartState } from "@/lib/mocks/quota";

/** "You've used ..." once today's free tests are gone. */
export function practiceUsedUpLine(limit: number): string {
  if (limit <= 0) return "Practice tests need the Premium Pass today.";
  if (limit === 1) return "You've used today's free practice test.";
  return `You've used your ${limit} free practice tests for today.`;
}

/** The line on the built-test card, or null when starting costs nothing. */
export function practiceCardLine(state: MockStartState | null): string | null {
  if (!state || state.kind === "open") return null;
  if (state.kind === "locked") return practiceUsedUpLine(state.limit);
  if (state.limit === 1) return "Starting it uses today's free practice test.";
  if (state.left === 1) return "This is your last free practice test today.";
  return `You have ${state.left} free practice tests left today. Starting this one uses 1.`;
}

export type PracticeBuilderNote = { kind: "count" | "usedUp"; text: string };

/** The note under V's first question, before any step is answered. */
export function practiceBuilderNote(state: MockStartState | null): PracticeBuilderNote | null {
  if (!state || state.kind === "open") return null;
  if (state.kind === "locked") {
    // A zero limit has no "tomorrow" to promise.
    const next = state.limit > 0 ? " More tomorrow, or get the Premium Pass for unlimited tests." : "";
    return {
      kind: "usedUp",
      text: `${practiceUsedUpLine(state.limit)}${next} You can still build one to send to a friend.`,
    };
  }
  const noun = state.limit === 1 ? "practice test" : "practice tests";
  return { kind: "count", text: `${state.left} of ${state.limit} free ${noun} left today.` };
}
