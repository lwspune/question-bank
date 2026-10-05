/**
 * GET /api/me/reveals — the signed-in student's daily answer limit and the
 * questions they revealed today (migration 0134, 2026-10-05).
 *
 * WHY A REQUEST AND NOT THE PAGE: /questions, /board and the notes are cached
 * and carry nothing about the viewer, so the reveal meter asks once per page
 * load and keeps the list itself afterwards (components/reveal/useRevealMeter).
 *
 * `limit: null` means no limit: switched off, or the student holds a pass. The
 * day's list is read only when there is a limit to count against.
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPremiumLimits } from "@/lib/billing/premiumLimits";
import { loadRevealedToday } from "@/lib/questions/revealQuota";
import { istDayStartIso } from "@/lib/email/dueNudge";

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
    const todayIds = await loadRevealedToday(db, user.id, istDayStartIso(new Date()));
    return NextResponse.json({ limit: limits.revealsPerDay, todayIds }, { headers: NO_STORE });
  } catch (e) {
    // No limit is the safe direction: a student is never walled by our error.
    console.error("reveal quota read failed", e);
    return NextResponse.json({ limit: null, todayIds: [] }, { headers: NO_STORE });
  }
}
