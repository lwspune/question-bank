/**
 * One typed question for a signed-out visitor (owner, 2026-10-16): after it,
 * V asks them to sign in. The browser is marked with a cookie, not the
 * connection: Indian mobile networks put many people behind one address, so a
 * block by address would stop strangers. Clearing cookies buys one more
 * question, which is fine for a sign-up nudge; the hourly limit and the site's
 * daily AI cap still guard the cost.
 *
 * Readable by the page on purpose (not httpOnly): it is a flag, not a secret,
 * and the chat window reads it to show the sign-in button before a second
 * question is typed.
 *
 * Pure. Spec: tests/chat-anon-limit.test.ts.
 */

export const ANON_ASKED_COOKIE = "qb_v_asked";
export const ANON_ASKED_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

export const SIGN_IN_TO_ASK_REPLY =
  "To keep chatting with me, please sign in. It's free and takes a few seconds.";

export function anonMustSignIn(who: { userId: string | null; askedBefore: boolean }): boolean {
  return who.userId === null && who.askedBefore;
}

/** Whether a Cookie header (or document.cookie) carries the mark. */
export function anonAskedFromCookieHeader(header: string | null | undefined): boolean {
  if (!header) return false;
  return header.split(";").some((part) => part.trim().split("=")[0] === ANON_ASKED_COOKIE);
}
