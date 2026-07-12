/**
 * Pure decision helpers for the soft mobile-capture prompt (signed-in students
 * missing a contact mobile). No I/O — unit-tested in tests/mobile-prompt.test.ts.
 *
 * The prompt is a nudge, not a wall: it never blocks a value action, it's asked
 * of signed-in students only (an anon viewer has no contact identity and /browse
 * is an SEO surface), it stops permanently once a mobile is on file (server
 * truth), and a dismissal starts a client-side cooldown so it never nags.
 *
 * Ask-once mechanism (deliberately no migration): `hasMobile` is the durable
 * hard stop; `dismissedUntil` is a localStorage cooldown, mirroring the
 * qb_revealed reveal-meter precedent. Trade-off: a dismisser on a second device
 * may see it again — acceptable for a soft prompt.
 */

/** Days a dismissal suppresses the prompt before it may re-appear. */
export const MOBILE_PROMPT_COOLDOWN_DAYS = 14;

/** Distinct answer reveals (by a signed-in student) that trigger the prompt. */
export const MOBILE_PROMPT_REVEAL_THRESHOLD = 5;

export type MobilePromptState = {
  signedIn: boolean;
  /** Whether a mobile is already stored. `null` = not yet checked (not a
   *  disqualifier — the provider resolves it before actually opening). */
  hasMobile: boolean | null;
  /** Epoch ms until which a prior dismissal suppresses the prompt, or null. */
  dismissedUntil: number | null;
  now: number;
};

/**
 * Static gate: is this viewer eligible for the prompt right now? Only a
 * confirmed mobile-on-file or an active cooldown disqualifies; `hasMobile:null`
 * (unknown) passes so the provider can lazily fetch the real value.
 */
export function shouldShowMobilePrompt(s: MobilePromptState): boolean {
  if (!s.signedIn) return false;
  if (s.hasMobile === true) return false;
  if (s.dismissedUntil !== null && s.now < s.dismissedUntil) return false;
  return true;
}

/** The cooldown expiry (epoch ms) to persist when a student dismisses. */
export function cooldownUntil(now: number): number {
  return now + MOBILE_PROMPT_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
}

/**
 * True only on the increment that first lands on the threshold, so a per-reveal
 * caller fires the prompt exactly once (strictly-greater counts are inert).
 */
export function reachedRevealThreshold(count: number): boolean {
  return count === MOBILE_PROMPT_REVEAL_THRESHOLD;
}
