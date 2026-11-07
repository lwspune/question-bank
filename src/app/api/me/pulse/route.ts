/**
 * GET /api/me/pulse — the two numbers the header badge and /me show a
 * signed-in student: questions due in the drill, and this week's sittings
 * against their goal. See ENGAGEMENT_SPEC.md §A2–A3.
 *
 * WHY A SEPARATE ENDPOINT FROM /api/me/header. That one resolves identity and
 * is called on every page load by every signed-in visitor; this one runs the
 * drill's whole read (every answer event plus a taxonomy lookup over the due
 * pool) and is fetched once per page load and then held client-side for ten
 * minutes (lib/pulse/cache.ts). Folding it into the header call would make
 * every page pay for it.
 *
 * `due` IS THE DRILL'S OWN NUMBER — `getOwnLadder` folds the read /drill serves
 * from — not a cheaper count that could overstate. A number a student is shown
 * should be one we would serve.
 *
 * `totals` (2026-10-04) is Answered · Right · Fixed. Answered and Right come
 * from one SQL aggregate (get_own_answer_totals); Fixed from the SAME fold as
 * `due`, so the two ladder numbers cannot disagree. A failed totals read
 * leaves `totals` null — the strip hides the line — rather than failing the
 * due badge with it.
 *
 * `no-store` is essential: per-user, never held by a CDN.
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getOwnAnswerTotals } from "@/lib/celebrate/service";
import { getOwnWeekly } from "@/lib/goals/service";
import { buildPulse } from "@/lib/pulse/build";

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

  try {
    const db = createSupabaseServerClient();
    const now = new Date();
    // The heartbeat: the header fetches this on every signed-in page, so one
    // row a day here is "this student was on the site today" — the count the
    // engagement read lacked (51 of 265 sign-ins in a month left no row).
    await logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "site", now));
    // The pulse itself is built in lib/pulse/build.ts, shared with the staff
    // view of a student's /me; here the two "caller" counts are the student's own.
    const pulse = await buildPulse(db, user.id, now, {
      week: getOwnWeekly(db, user.id, now),
      answers: getOwnAnswerTotals(db),
    });
    return NextResponse.json(pulse, { headers: NO_STORE });
  } catch (e) {
    // A wrong number is worse than no badge: fail and let the client render
    // nothing rather than a zero that reads as "nothing to fix".
    console.error("pulse failed", e);
    return NextResponse.json({ error: "Unavailable." }, { status: 500, headers: NO_STORE });
  }
}
