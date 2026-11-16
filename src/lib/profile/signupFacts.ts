import type { SupabaseClient, User } from "@supabase/supabase-js";
import { isNewAccount } from "@/lib/auth/oneTap";
import { readCountry } from "@/lib/acquisition/country";
import { attachReferralAtSignIn } from "@/lib/referrals/service";
import { saveFirstTouch, saveSignupCountry } from "@/lib/profile/service";

/**
 * What a new account learns about itself at sign-in: the first-touch channel
 * (`qb_acq` cookie, migration 0106), the inviter (referral cookie, 0249) and the
 * country (0142). One place, used by both callers:
 *
 *  - POST /api/profile/acquisition, which the browser sends at sign-in;
 *  - GET /api/me/header, the second chance (2026-11-16). In the ten days to
 *    16 Nov, 22 of ~615 accounts never got the first one, so their channel and
 *    country were lost. The header asks the server who the viewer is straight
 *    after every sign-in, so it saves what is still missing.
 *
 * Every write is write-once in its query, so running it twice is harmless.
 * Throws only when the channel save fails; the referral never throws, and a
 * failed country save is logged and left (never worth a failed sign-in).
 */
export async function saveSignupFacts(
  db: SupabaseClient,
  user: User,
  input: { acqCookie: string | undefined; refCookie: string | undefined; headers: Pick<Headers, "get"> }
): Promise<void> {
  await saveFirstTouch(db, user, input.acqCookie);
  await attachReferralAtSignIn(user, input.refCookie);
  try {
    await saveSignupCountry(db, user, readCountry(input.headers));
  } catch (e) {
    console.error("signup country save at sign-in", e instanceof Error ? e.message : e);
  }
}

/** How long after an account is made the header still tries the save. */
export const SIGNUP_FACTS_WINDOW_MS = 30 * 60 * 1000;

/**
 * Should /api/me/header try the save? It runs on every page load of a signed-in
 * person, so it decides from what it already holds, with no extra read: an
 * account made at its last sign-in (isNewAccount), less than 30 minutes ago,
 * whose country is still missing. The window matters because isNewAccount stays
 * true for every account that never signs in a second time.
 */
export function shouldSaveSignupFacts(input: {
  createdAt: string | null | undefined;
  lastSignInAt: string | null | undefined;
  signupCountry: string | null | undefined;
  now: Date;
}): boolean {
  if (input.signupCountry) return false;
  if (!isNewAccount(input.createdAt, input.lastSignInAt)) return false;
  const age = input.now.getTime() - Date.parse(input.createdAt as string);
  return Number.isFinite(age) && age >= 0 && age < SIGNUP_FACTS_WINDOW_MS;
}
