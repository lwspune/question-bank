import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Sign a student in from an email link, without sending anything: the admin
 * client mints a magic link for the send's user and the caller's auth client
 * verifies its token in the same call, so the browser behind `auth` (the SSR
 * client in the route, with its cookie adapter) ends up holding a session.
 *
 * The user is looked up by id FIRST, and by id rather than by the send's
 * `to_email`: `generateLink({ type: "magiclink" })` CREATES a user for an
 * unknown email, so an address that has since changed or been deleted must
 * never reach it. The lookup is the guard.
 *
 * Returns false on every failure and throws nothing — the redirect must
 * still happen, and the click is still recorded with `signIn: "failed"`.
 */
export async function signInFromSend(
  admin: SupabaseClient,
  auth: SupabaseClient,
  userId: string
): Promise<boolean> {
  try {
    const { data: found, error: findErr } = await admin.auth.admin.getUserById(userId);
    const email = found?.user?.email;
    if (findErr || !email) return false;

    const { data: link, error: linkErr } = await admin.auth.admin.generateLink({ type: "magiclink", email });
    const tokenHash = link?.properties?.hashed_token;
    if (linkErr || !tokenHash) return false;

    const { data, error } = await auth.auth.verifyOtp({ token_hash: tokenHash, type: "magiclink" });
    return !error && !!data.session;
  } catch (e) {
    console.error("signInFromSend failed", e);
    return false;
  }
}
