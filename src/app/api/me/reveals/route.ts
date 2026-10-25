/**
 * GET /api/me/reveals — the signed-in student's daily answer limit and the
 * questions they revealed today (migration 0134, 2026-10-05).
 *
 * WHY A REQUEST AND NOT THE PAGE: /questions, /board and the notes are cached
 * and carry nothing about the viewer, so the reveal meter asks once per page
 * load and keeps the list itself afterwards (components/reveal/useRevealMeter).
 *
 * `limit: null` means no limit: switched off, or the student holds a pass. The
 * day's list is read only when there is a limit to count against, and so is
 * `pass`, the pass on sale, which the wall sells in place (2026-10-25); null
 * when none is on sale or the read failed, and the wall then links to /pricing.
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPremiumLimits } from "@/lib/billing/premiumLimits";
import { passCta, passForScope, type PassCta } from "@/lib/billing/plans";
import { listActivePlansCached } from "@/lib/billing/plansQuery";
import { DOWNLOAD_PASS_SCOPE } from "@/lib/export/access";
import { loadRevealedToday } from "@/lib/questions/revealQuota";
import { istDayStartIso } from "@/lib/email/dueNudge";

async function passOnSale(): Promise<PassCta | null> {
  try {
    return passCta(passForScope(await listActivePlansCached(), DOWNLOAD_PASS_SCOPE));
  } catch (e) {
    console.error("reveal wall: plans read failed", e);
    return null;
  }
}

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;

export async function GET() {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401, headers: NO_STORE });

  const db = createSupabaseServerClient();
  const limits = await getPremiumLimits(db);
  if (!limits || limits.hasPass || limits.revealsPerDay === null) {
    return NextResponse.json({ limit: null, todayIds: [] }, { headers: NO_STORE });
  }
  try {
    const [todayIds, pass] = await Promise.all([
      loadRevealedToday(db, user.id, istDayStartIso(new Date())),
      passOnSale(),
    ]);
    return NextResponse.json({ limit: limits.revealsPerDay, todayIds, pass }, { headers: NO_STORE });
  } catch (e) {
    // No limit is the safe direction: a student is never walled by our error.
    console.error("reveal quota read failed", e);
    return NextResponse.json({ limit: null, todayIds: [] }, { headers: NO_STORE });
  }
}
