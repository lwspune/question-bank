/**
 * GET /api/me/fix-points: the signed-in student's Fix Points (migration 0245),
 * what they are worth, and the new price of each pass they lower. DISPLAY ONLY:
 * the order route reads the points again when the order is made, so a stale
 * copy here can never change what a student pays.
 *
 * A failed read is 503, never "0 points" (the lesson of the answer-limit leak,
 * 2026-11-08): the card then shows the plain price.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listActivePlans } from "@/lib/billing/plansQuery";
import { userHasAnyAccess } from "@/lib/entitlements/query";
import { sitePassScopes } from "@/lib/billing/passScope";
import { readFixPoints } from "@/lib/billing/fixPointsService";
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
    const [balance, plans, hasPass] = await Promise.all([
      readFixPoints(createSupabaseAdminClient(), user.id, now),
      listActivePlans(db),
      userHasAnyAccess(db, user.id, sitePassScopes("pyqvault"), now.getTime()),
    ]);
    return NextResponse.json(
      { eligible: true, ...fixPointsView({ points: balance.points, plans, hasPass }) },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (e) {
    console.error("fix points read failed", e);
    return NextResponse.json({ error: "Could not read your points." }, { status: 503 });
  }
}
