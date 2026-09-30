/**
 * Signed email links (2026-09-30). The click redirect (/api/e/<token>) signs
 * the student in when the link is fresh, because a phone's in-app browser
 * holds no session: the due nudge's one button landed on /drill → /login for
 * every such tap, and 0 of 260 nudges produced a drill with nothing to say
 * whether the CHANNEL or the WALL was the cause.
 *
 * This is the decision only, kept pure. The sign-in itself is in
 * signedLinkService.ts; the token's lookup is the route's.
 *
 * A link in an inbox is a credential to whoever holds the mail, so it is
 * bounded two ways: it goes stale after SIGNED_LINK_DAYS, and it NEVER
 * replaces a live session — not even to switch accounts on a shared phone,
 * where a silent switch would be the more confusing outcome.
 */
export const SIGNED_LINK_DAYS = 7;

const DAY_MS = 86_400_000;

export type SignInDecision = "sign-in" | "expired" | "session-present";

export function decideSignIn(input: {
  /** email_sends.created_at — the send's own stamp, never the click's. */
  sentAt: string | null | undefined;
  /** The user already signed in to this browser, if any. */
  sessionUserId: string | null;
  now?: Date;
}): SignInDecision {
  if (input.sessionUserId) return "session-present";
  const sent = input.sentAt ? Date.parse(input.sentAt) : NaN;
  if (Number.isNaN(sent)) return "expired";
  const age = (input.now ?? new Date()).getTime() - sent;
  return age <= SIGNED_LINK_DAYS * DAY_MS ? "sign-in" : "expired";
}
