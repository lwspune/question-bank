/**
 * V's reply shown a line at a time (owner, 2026-10-23: "one block is heavy on
 * cognition; one line after another helps in digesting"). The reply still
 * arrives whole; the chat window grows its bubble one step at a time, so the
 * student ends with the same single bubble.
 *
 * A step is one line with its line break. A blank line goes with the line
 * after it (a gap never appears alone), and maths that runs over a line break
 * stays in one step, so a formula is never drawn half-written.
 *
 * Pure. Spec: tests/chat-reveal.test.ts. Used by components/chat/VRevealReply.
 */

/** The shortest and longest pause after a line. */
export const REVEAL_MIN_MS = 400;
export const REVEAL_MAX_MS = 1100;
/** Roughly the time to read a character, so a long line waits longer. */
const MS_PER_CHAR = 22;

/** Open maths: more \( than \), or more \[ than \]. */
function mathOpen(s: string): boolean {
  const count = (re: RegExp) => (s.match(re) ?? []).length;
  return count(/\\\(/g) > count(/\\\)/g) || count(/\\\[/g) > count(/\\\]/g);
}

/** The reply in steps; put together, they are the reply exactly. */
export function revealSteps(text: string): string[] {
  const lines = text.match(/[^\n]*\n|[^\n]+$/g) ?? [];
  const steps: string[] = [];
  let pending = "";
  for (const line of lines) {
    pending += line;
    // A blank line waits for the line after it; open maths waits for its close.
    if (pending.trim() === "" || mathOpen(pending)) continue;
    steps.push(pending);
    pending = "";
  }
  if (pending) {
    if (steps.length > 0 && pending.trim() === "") steps[steps.length - 1] += pending;
    else steps.push(pending);
  }
  return steps;
}

/** The pause after a step before the next shows: long enough to read it. */
export function stepDelayMs(step: string): number {
  return Math.min(REVEAL_MAX_MS, Math.max(REVEAL_MIN_MS, Math.round(step.trim().length * MS_PER_CHAR)));
}
