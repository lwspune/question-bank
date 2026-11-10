/**
 * GET /r/<code>: a student's invite link (referrals, migration 0249).
 *
 * Parks the invite in an httpOnly `qb_ref` cookie (the code and when it was
 * opened) and sends a signed-out visitor to /signup, tagged
 * utm_source=referral so the first-touch channel records it. The sign-in
 * paths read the cookie and tie a NEW account to the inviter
 * (lib/referrals/service attachReferral), which is also where the code is
 * checked against the database: nothing is read here, so a link costs one
 * session check and no query.
 *
 * A signed-in visitor already has an account, which a referral cannot be
 * for, so they go to their home and nothing is parked.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { REF_COOKIE, REF_COOKIE_DAYS, normaliseReferralCode, refCookieValue } from "@/lib/referrals/referral";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, props: { params: Promise<{ code: string }> }) {
  const { code: raw } = await props.params;
  const code = normaliseReferralCode(raw);
  const origin = new URL(request.url).origin;
  if (!code) return NextResponse.redirect(new URL("/", origin));

  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (user) return NextResponse.redirect(new URL("/me", origin));

  const to = new URL("/signup", origin);
  to.searchParams.set("utm_source", "referral");
  to.searchParams.set("utm_medium", "referral");
  to.searchParams.set("utm_campaign", "invite");
  const res = NextResponse.redirect(to);
  res.cookies.set(REF_COOKIE, refCookieValue(code, new Date()), {
    httpOnly: true,
    sameSite: "lax",
    secure: origin.startsWith("https:"),
    path: "/",
    maxAge: REF_COOKIE_DAYS * 24 * 60 * 60,
  });
  return res;
}
