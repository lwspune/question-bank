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

/**
 * A reply that only asks back costs no question (2026-10-18): one visitor's
 * question went on "Hii", and V was told to guess rather than ask. Counted in a
 * second cookie so a visitor cannot chat on for ever without signing in.
 */
export const ANON_FREE_COOKIE = "qb_v_free";
export const ANON_FREE_REPLIES_MAX = 3;

/** A reply asks back when it carries a question mark, in any of V's languages. */
function asksBack(reply: string): boolean {
  return /[?？]/.test(reply);
}

export function anonReplyUsesQuestion(r: {
  source: "ai" | "ai_failed" | "fallback";
  reply: string;
  /** The paths the window makes tappable (lib/chat/replyLinks.ts). */
  links: readonly string[];
  freeSoFar: number;
}): boolean {
  if (r.source !== "ai") return true;
  if (r.links.length > 0 || !asksBack(r.reply)) return true;
  return r.freeSoFar >= ANON_FREE_REPLIES_MAX;
}

/** Free replies so far, from a Cookie header; anything odd reads as 0, a planted big count as the most. */
export function anonFreeRepliesFromCookieHeader(header: string | null | undefined): number {
  if (!header) return 0;
  for (const part of header.split(";")) {
    const [name, value] = part.trim().split("=");
    if (name !== ANON_FREE_COOKIE) continue;
    if (!/^\d+$/.test(value ?? "")) return 0;
    return Math.min(Number(value), ANON_FREE_REPLIES_MAX);
  }
  return 0;
}
