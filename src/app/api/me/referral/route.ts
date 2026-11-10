/**
 * /api/me/referral: the signed-in student's invite card (referrals, 0249).
 *
 * GET: their code (null until they ask for one), link, share message and
 * counts line. POST: make the code, on the first tap of "Get my invite link".
 * Made on the tap, never on page view, so "links made" in the readout counts
 * students who asked (the practise-together codes were made on view and
 * counted 820 "invites" for 18 real sends).
 *
 * Service-role reads: both tables have no student grant. A failed read is
 * 503 and the card stays hidden. Rupee passes only, so not on the intl site.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getOrCreateReferralCode, readReferralCode, readReferralStats } from "@/lib/referrals/service";
import { referralLink, referralShareText, referralStatusLine } from "@/lib/referrals/referral";
import { isIntlHost } from "@/lib/sites/intl";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store" };

async function sessionUser() {
  try {
    return await getSessionUser();
  } catch {
    return null;
  }
}

function linkFields(code: string | null) {
  return { code, link: code ? referralLink(code) : null, shareText: code ? referralShareText(code) : null };
}

export async function GET(request: NextRequest) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (isIntlHost(request.headers.get("host"))) return NextResponse.json({ eligible: false });
  try {
    const admin = createSupabaseAdminClient();
    const [code, stats] = await Promise.all([readReferralCode(admin, user.id), readReferralStats(admin, user.id)]);
    return NextResponse.json(
      { eligible: true, ...linkFields(code), line: referralStatusLine(stats), stats },
      { headers: NO_STORE }
    );
  } catch (e) {
    console.error("referral card read failed", e);
    return NextResponse.json({ error: "Could not read your invites." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (isIntlHost(request.headers.get("host"))) return NextResponse.json({ error: "Not available here." }, { status: 404 });
  const user = await sessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  try {
    const code = await getOrCreateReferralCode(createSupabaseAdminClient(), user.id);
    return NextResponse.json(linkFields(code), { headers: NO_STORE });
  } catch (e) {
    console.error("referral code create failed", e);
    return NextResponse.json({ error: "Could not make your link. Try again." }, { status: 503 });
  }
}
