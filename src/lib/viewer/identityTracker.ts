/**
 * Decides when the header must ask the server "who is this?" again: only when
 * the signed-in user changes (signed out → in, in → out, or one account → another).
 *
 * Supabase also reports SIGNED_IN when a tab regains focus and TOKEN_REFRESHED
 * every hour, for the same user. Asking again on those would cost a request each
 * time for an answer that cannot have changed, so the event name is not used:
 * only the user id is compared.
 *
 * The first observation is the starting point (Supabase's INITIAL_SESSION) and
 * never asks again: the page's first fetch already answered for it.
 */
export function createIdentityTracker(): { observe(userId: string | null): boolean } {
  let started = false;
  let current: string | null = null;
  return {
    observe(userId) {
      if (!started) {
        started = true;
        current = userId;
        return false;
      }
      const changed = userId !== current;
      current = userId;
      return changed;
    },
  };
}
