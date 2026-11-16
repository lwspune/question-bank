/**
 * POST /api/profile/acquisition — sent by the browser straight after an
 * in-page Google sign-in: One Tap, the download box and the /login + /signup
 * button. Those never pass through the OAuth callback, and the download box
 * skips /welcome, so this is where a new account's channel, inviter and country
 * are saved (lib/profile/signupFacts; /api/me/header is the second chance).
 *
 * It is also the SESSION CHECK (2026-11-16): /login and /signup wait for its
 * answer before moving on, because a 401 here means the server cannot see the
 * new session, and /welcome would send the person back to /login. Any other
 * answer means it can.
 *
 * Cookies are read HERE, server-side, by the same untrusted-input readers the
 * onboarding route uses. "Is this a new account?" is decided from the session's
 * own user, never from anything the client sends. Writes the student's OWN row
 * through their JWT (RLS own-row insert/update, 0045).
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveSignupFacts } from "@/lib/profile/signupFacts";
import { REF_COOKIE } from "@/lib/referrals/referral";

export async function POST(request: NextRequest) {
  const db = createSupabaseServerClient();
  const { data } = await db.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  try {
    await saveSignupFacts(db, data.user, {
      acqCookie: request.cookies.get("qb_acq")?.value,
      refCookie: request.cookies.get(REF_COOKIE)?.value,
      headers: request.headers,
    });
  } catch (e) {
    console.error("acquisition save at sign-in", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
