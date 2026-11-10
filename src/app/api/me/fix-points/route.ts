/**
 * GET /api/me/fix-points: the signed-in student's Fix Points (migration 0245),
 * what they are worth, and the new price of each pass they lower. DISPLAY ONLY:
 * the order route reads the points again when the order is made, so a stale
 * copy here can never change what a student pays.
 *
 * A failed read is 503, never "0 points" (the lesson of the answer-limit leak,
 * 2026-11-08): the card then shows the plain price. A referred friend's
 * discount (0249) lowers the prices too; a failed read of it counts as none,
 * so the points price still shows (the order route reads it again anyway).
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listActivePlans } from "@/lib/billing/plansQuery";
import { userHasAnyAccess } from "@/lib/entitlements/query";
import { sitePassScopes } from "@/lib/billing/passScope";
import { readFixPoints } from "@/lib/billing/fixPointsService";
import { readReferralDiscount } from "@/lib/referrals/service";
import { fixPointsView } from "@/lib/billing/fixPoints";
import { isIntlHost } from "@/lib/sites/intl";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  // Points lower only the rupee passes sold on www.
  if (isIntlHost(request.headers.get("host"))) return NextResponse.json({ eligible: false });

  try {
    const db = createSupabaseServerClient();
    const now = new Date();
    const admin = createSupabaseAdminClient();
    const [balance, plans, hasPass, referralPct] = await Promise.all([
      readFixPoints(admin, user.id, now),
      listActivePlans(db),
      userHasAnyAccess(db, user.id, sitePassScopes("pyqvault"), now.getTime()),
      readReferralDiscount(admin, user.id).catch((e: unknown) => {
        console.error("referral read failed", e);
        return 0;
      }),
    ]);
    return NextResponse.json(
      { eligible: true, ...fixPointsView({ points: balance.points, plans, hasPass, oldestAt: balance.oldestAt, referralPct }) },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (e) {
    console.error("fix points read failed", e);
    return NextResponse.json({ error: "Could not read your points." }, { status: 503 });
  }
}
