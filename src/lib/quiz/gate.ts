/**
 * Pure decision helpers for the public-quiz lead gate. No I/O; unit-tested in
 * tests/quiz-gate.test.ts.
 *
 * When a visitor taps "See my score", the gate resolves to one of three modes:
 *   - "skip"     — a SIGNED-IN student: already a known account, so grade with
 *                  NO lead capture and NO sheet at all (the submit endpoint's
 *                  authenticated grade-only path).
 *   - "continue" — an anon RETURNER (a stored localStorage identity): the
 *                  one-tap "Continue as <name> · <mobile>" confirmation.
 *   - "form"     — an anon FIRST-TIMER: the full name + mobile + consent form.
 *
 * Kept pure (no React, no storage access) so the branch logic is testable in
 * isolation from the QuizTaker component that consumes it.
 */

/** The identity we persist to localStorage after a successful anon submit.
 *  `consentedAt` is stamped when the person affirmatively consented, so a same
 *  number returner doesn't have to re-tick (sticky consent). */
export type StoredIdentity = { name: string; mobile: string; consentedAt?: string };

export type QuizGateMode = "skip" | "continue" | "form";

/** Resolve which gate a visitor sees. Signed-in always skips; a complete stored
 *  identity gets the one-tap continue; everyone else gets the full form. */
export function resolveQuizGate(input: {
  signedIn: boolean;
  stored: StoredIdentity | null;
}): QuizGateMode {
  if (input.signedIn) return "skip";
  if (input.stored && input.stored.name.trim() && input.stored.mobile.trim()) return "continue";
  return "form";
}

/**
 * In the "continue" branch, whether a prior affirmative consent carries forward
 * so the reveal is a single tap (no consent checkbox). True only when the stored
 * identity records a consent timestamp — a first-timer or an edited number
 * (which drops back to the form) always re-consents.
 */
export function priorConsentValid(stored: StoredIdentity | null): boolean {
  return Boolean(stored?.consentedAt);
}
