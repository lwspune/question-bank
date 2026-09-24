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
 * `due` IS THE DRILL'S OWN NUMBER — `getOwnDuePool` is the read /drill serves
 * from — not a cheaper count that could overstate. A number a student is shown
 * should be one we would serve.
 *
 * `no-store` is essential: per-user, never held by a CDN.
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOwnDuePool } from "@/lib/drill/service";
import { getOwnWeekly } from "@/lib/goals/service";

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
    const [pool, week] = await Promise.all([
      getOwnDuePool(db, user.id, now),
      getOwnWeekly(db, user.id, now),
    ]);
    return NextResponse.json({ due: pool.length, week }, { headers: NO_STORE });
  } catch (e) {
    // A wrong number is worse than no badge: fail and let the client render
    // nothing rather than a zero that reads as "nothing to fix".
    console.error("pulse failed", e);
    return NextResponse.json({ error: "Unavailable." }, { status: 500, headers: NO_STORE });
  }
}
