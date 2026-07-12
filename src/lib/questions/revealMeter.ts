/**
 * Pure decision for the client-side answer-reveal meter (/browse + /board).
 * Anon viewers get `limit` free answer reveals (tracked as a set of question ids
 * in localStorage, shared across both surfaces); after that, revealing prompts a
 * free sign-in. Signed-in viewers are unlimited. Re-revealing a question already
 * counted is free (no double-charge). Soft nudge over PUBLIC content — the
 * answer is in the payload — so a client meter is the right tool.
 */
export const FREE_REVEAL_LIMIT = 3;

export type RevealDecision = {
  allow: boolean;
  /** The revealed-id set to persist (unchanged when denied or already counted). */
  nextIds: string[];
  /** Free reveals left after this decision (Infinity when signed in). */
  remaining: number;
};

export function revealDecision(input: {
  signedIn: boolean;
  revealedIds: readonly string[];
  questionId: string;
  limit?: number;
}): RevealDecision {
  const { signedIn, revealedIds, questionId } = input;
  const limit = input.limit ?? FREE_REVEAL_LIMIT;

  if (signedIn) {
    return { allow: true, nextIds: [...revealedIds], remaining: Infinity };
  }
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
  return { allow: false, nextIds: [...revealedIds], remaining: 0 };
}
