/**
 * Pure core for Google One Tap at the answer-reveal wall.
 *
 * WHY: the wall's "Sign in" link opened the full /login page, and Clarity
 * (2026-10-01) showed 3 of 4 ChatGPT visitors who got there leaving within two
 * seconds. One Tap signs a visitor in over the page they are reading, through
 * the same Supabase Google provider (`signInWithIdToken`), so the session is
 * identical to the "Continue with Google" button's.
 *
 * Pure (no DOM, no Google script, no Supabase) so it is unit-tested; the client
 * hook lives in components/auth/useGoogleOneTap.ts.
 */
import { needsOnboarding, type OnboardingState } from "@/lib/profile/onboarding";
import { safeNextPath } from "@/lib/auth/redirect";

/** Stamped on user_metadata.signup_source for a first-time One Tap account. */
export const ONE_TAP_SIGNUP_SOURCE = "onetap";

/** Stamped for a first-time account made with the Google button in the download box. */
export const DOWNLOAD_BOX_SIGNUP_SOURCE = "download_box";

const CLIENT_ID_RE = /^[0-9]+-[a-z0-9]+\.apps\.googleusercontent\.com$/;

/**
 * The build-time NEXT_PUBLIC_GOOGLE_CLIENT_ID, or null. Anything that is not
 * shaped like a Google web client id switches One Tap OFF: the first value
 * pasted into Vercel was the Supabase dashboard URL, and that should leave the
 * plain sign-in link working rather than load Google with a broken client.
 */
export function resolveGoogleClientId(raw: string | null | undefined): string | null {
  const id = (raw ?? "").trim();
  return CLIENT_ID_RE.test(id) ? id : null;
}

/**
 * Was this account created by the sign-in that just happened? Supabase stamps
 * `created_at` and `last_sign_in_at` together on a first sign-in, so they agree
 * to within a moment; a returning account's `created_at` is far older.
 *
 * Needed because the OAuth callback stamps a source onto ANY account that lacks
 * one, and most existing accounts lack one: doing that here would credit One Tap
 * with every older account that ever used it to sign back in.
 */
const NEW_ACCOUNT_WINDOW_MS = 60_000;

export function isNewAccount(
  createdAt: string | null | undefined,
  lastSignInAt: string | null | undefined
): boolean {
  if (!createdAt || !lastSignInAt) return false;
  const gap = Date.parse(lastSignInAt) - Date.parse(createdAt);
  return Number.isFinite(gap) && Math.abs(gap) < NEW_ACCOUNT_WINDOW_MS;
}

/** May the One Tap prompt be shown now? At most once per page. */
export function shouldOfferOneTap(input: {
  clientId: string | null;
  signedIn: boolean;
  loading: boolean;
  alreadyOffered: boolean;
}): boolean {
  return Boolean(input.clientId) && !input.loading && !input.signedIn && !input.alreadyOffered;
}

/**
 * A fresh nonce pair. Google embeds `hashed` in the ID token; Supabase is handed
 * `raw`, hashes it and must find a match, so a token lifted from elsewhere
 * cannot be replayed. Web Crypto, so it runs in the browser and in tests alike.
 */
export async function makeNonce(): Promise<{ raw: string; hashed: string }> {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const raw = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const hashed = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  return { raw, hashed };
}

/**
 * Where to go after a One Tap sign-in. A new account goes through /welcome
 * (the one-time intent capture the OAuth callback also routes through) and back
 * to this page; an onboarded one stays put (null) — the lock lifts in place.
 */
export function oneTapDestination(state: OnboardingState, currentPath: string): string | null {
  if (!needsOnboarding(state)) return null;
  return `/welcome?next=${encodeURIComponent(safeNextPath(currentPath))}`;
}
