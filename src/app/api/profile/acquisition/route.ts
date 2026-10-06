/**
 * POST /api/profile/acquisition — save the first-touch channel (the `qb_acq`
 * cookie) for an account created by an in-page Google sign-in: One Tap, the
 * download box and the /login + /signup button. Those never pass through the
 * OAuth callback, and the download box skips /welcome, so without this the
 * channel was never saved for them.
 *
 * The cookie is read HERE, server-side, and parsed by the same untrusted-input
 * reader the onboarding route uses. "Is this a new account?" is decided from
 * the session's own user, never from anything the client sends. Writes the
 * student's OWN row through their JWT (RLS own-row insert/update, 0045).
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveFirstTouch } from "@/lib/profile/service";

export async function POST(request: NextRequest) {
  const db = createSupabaseServerClient();
  const { data } = await db.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  try {
    await saveFirstTouch(db, data.user, request.cookies.get("qb_acq")?.value);
  } catch (e) {
    console.error("acquisition save at sign-in", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
