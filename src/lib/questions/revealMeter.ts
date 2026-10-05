/**
 * Pure decision for the client-side answer-reveal meter (/browse + /board).
 * Anon viewers get `limit` free answer reveals (tracked as a set of question ids
 * in localStorage, shared across both surfaces); after that, revealing prompts a
 * free sign-in. Signed-in viewers are unlimited unless the daily limit is on
 * and they have no pass (`DailyReveals`, 2026-10-05). Re-revealing a question
 * already counted is free (no double-charge). Soft nudge over PUBLIC content — the
 * answer is in the payload — so a client meter is the right tool.
 *
 * 10, not 3, since 2026-10-01: Clarity recordings showed anon visitors (most of
 * them arriving from ChatGPT on a /questions chapter page) spending all 3 on the
 * landing page, tapping the 4th card repeatedly, and leaving without signing in.
 */
export const FREE_REVEAL_LIMIT = 10;

/**
 * A signed-in student's free answers today (2026-10-05, owner: 50 a day, on the
 * bank, the board reader and guides). Null when the limit is off, when the
 * student holds a pass, and while the count is still loading: in all three a
 * signed-in student is never walled. `todayIds` is every question they revealed
 * since midnight IST, so re-opening one of them is free.
 */
export type DailyReveals = { limit: number; todayIds: readonly string[] };

/** Which wall a refused reveal met: the signed-out one, or today's limit. */
export type RevealWall = "signin" | "daily";

export type RevealDecision = {
  allow: boolean;
  /** The id set to persist: the device's list signed out, today's list signed
   *  in under a daily limit (unchanged when denied or already counted). */
  nextIds: string[];
  /** Free reveals left after this decision (Infinity when unlimited). */
  remaining: number;
  /** Set only when refused. */
  wall?: RevealWall;
};

export function revealDecision(input: {
  signedIn: boolean;
  revealedIds: readonly string[];
  questionId: string;
  limit?: number;
  daily?: DailyReveals | null;
}): RevealDecision {
  const { signedIn, revealedIds, questionId } = input;
  const limit = input.limit ?? FREE_REVEAL_LIMIT;

  if (signedIn) {
    const daily = input.daily;
    if (!daily) return { allow: true, nextIds: [...revealedIds], remaining: Infinity };
    return spend(daily.todayIds, questionId, daily.limit, "daily");
  }
  return spend(revealedIds, questionId, limit, "signin");
}

/** One budget rule for both walls: a counted id is free, a new one spends. */
function spend(revealedIds: readonly string[], questionId: string, limit: number, wall: RevealWall): RevealDecision {
  // Already counted → free re-reveal.
  if (revealedIds.includes(questionId)) {
    return {
      allow: true,
      nextIds: [...revealedIds],
      remaining: Math.max(0, limit - revealedIds.length),
    };
  }
  // New question, still under the budget → consume one.
  if (revealedIds.length < limit) {
    const nextIds = [...revealedIds, questionId];
    return { allow: true, nextIds, remaining: Math.max(0, limit - nextIds.length) };
  }
  // Budget spent.
  return { allow: false, nextIds: [...revealedIds], remaining: 0, wall };
}

/**
 * Should this card render LOCKED before the viewer taps it? Same rule as
 * `revealDecision` (a locked card is exactly one whose reveal would be denied),
 * so the lock a viewer sees and the wall they would hit can never disagree.
 *
 * Exists because the wall used to be invisible until a tap was refused: the
 * refused tap changed nothing on screen, so visitors read it as a broken button
 * and tapped again (Clarity dead + rage clicks, 2026-10-01). Never locks while
 * auth is loading, matching `attemptReveal`'s "never wall a signed-in user".
 */
export function isRevealLocked(input: {
  signedIn: boolean;
  loading: boolean;
  revealedIds: readonly string[];
  questionId: string;
  limit?: number;
  daily?: DailyReveals | null;
}): boolean {
  if (input.loading) return false;
  return !revealDecision(input).allow;
}
