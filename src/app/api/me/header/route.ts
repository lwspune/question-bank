/**
 * GET /api/me/header — the viewer's header identity.
 *
 * Exists so AppHeader can stop resolving the session during server render. That
 * render is what forced every page on the site to be per-request and uncached;
 * fetching the identity from the browser instead lets pages be built once and
 * shared, with the personal part filled in client-side.
 *
 * Only signed-in browsers call this (the client skips it when no Supabase
 * cookie is present), so anon traffic — the bulk of it — pays nothing.
 *
 * `no-store` is essential: this response is per-user and must never be held by
 * a CDN or a shared cache. The whole point of the change is that user data
 * lives HERE, in an uncacheable per-request response, and not in the cached
 * page HTML.
 *
 * THE SECOND CHANCE FOR A NEW ACCOUNT'S CHANNEL AND COUNTRY (2026-11-16). The
 * browser asks this straight after every sign-in (lib/viewer/useViewerSession),
 * so for an account made in the last 30 minutes whose country is still missing
 * it runs the same write-once save as POST /api/profile/acquisition. A write on
 * a GET is deliberate: it is per-user, uncached, and repeating it changes
 * nothing. The decision uses only what the identity read already returned.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getHeaderIdentity } from "@/lib/auth";
import { saveSignupFacts, shouldSaveSignupFacts } from "@/lib/profile/signupFacts";
import { REF_COOKIE } from "@/lib/referrals/referral";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" };

export async function GET(request: NextRequest) {
  try {
    const identity = await getHeaderIdentity();
    if (
      identity &&
      shouldSaveSignupFacts({
        createdAt: identity.user.created_at,
        lastSignInAt: identity.user.last_sign_in_at,
        signupCountry: identity.signupCountry,
        now: new Date(),
      })
    ) {
      try {
        await saveSignupFacts(identity.db, identity.user, {
          acqCookie: request.cookies.get("qb_acq")?.value,
          refCookie: request.cookies.get(REF_COOKIE)?.value,
          headers: request.headers,
        });
      } catch (e) {
        // Best effort: the header must render whatever happens to the save.
        console.error("signup facts save from header", e instanceof Error ? e.message : e);
      }
    }
    return NextResponse.json({ session: identity?.session ?? null }, { headers: NO_STORE });
  } catch {
    // The header must render even if identity lookup fails — degrade to signed-out
    // chrome rather than throwing on every page of the site.
    return NextResponse.json({ session: null }, { headers: NO_STORE });
  }
}
