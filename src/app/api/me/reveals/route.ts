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
 *
 * `exemptIds` (2026-11-07, migration 0225): today's board-path questions, from
 * the server's own pick of the student's tasks. They are left out of
 * `todayIds` and the meter never walls them (MENTOR_SPEC.md §6).
 *
 * DISPLAY ONLY since 2026-11-08 (migration 0228): the server decides each new
 * answer itself (claim_reveal); this reply only tells a page which cards to
 * draw locked. It reads the same rows the server enforces against
 * (daily_reveals), and any read that fails is a 503, never "no limit": the
 * meter can then tell a failure from a pass.
 */
import { NextResponse, type NextRequest } from "next/server";
import { planSiteForHost } from "@/lib/sites/intl";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPremiumLimits } from "@/lib/billing/premiumLimits";
import { passOnSale } from "@/lib/billing/passOnSale";
import { loadCountedRevealsToday } from "@/lib/questions/revealQuota";
import { istDayKey } from "@/lib/email/dueNudge";
import { holdsPassFor, passScopesFor } from "@/lib/billing/passScope";
import { readCountry } from "@/lib/acquisition/country";
import { readTodayExemptions, revealCountWithout } from "@/lib/path/exemptions";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;

export async function GET(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch (e) {
    // The sign-in check itself failed: an error, not "signed out".
    console.error("reveal quota: session read failed", e);
    return unavailable();
  }
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401, headers: NO_STORE });

  const db = createSupabaseServerClient();
  const limits = await getPremiumLimits(db);
  // getPremiumLimits logs its own failure; null here is a failed read.
  if (!limits) return unavailable();
  // The pass that lifts the limit (0206): the page's exam's, when the meter
  // says it (?exam=), else any pass this site sells.
  const site = planSiteForHost(request.headers.get("host"));
  const scopes = passScopesFor(site, request.nextUrl.searchParams.get("exam"));
  if (holdsPassFor(limits, scopes) || limits.revealsPerDay === null) {
    return NextResponse.json({ limit: null, todayIds: [] }, { headers: NO_STORE });
  }
  try {
    const [counted, pass, exempt] = await Promise.all([
      // The rows claim_reveal counts (0228): a free exam's answers never count.
      loadCountedRevealsToday(db, user.id, istDayKey(new Date())),
      passOnSale(site, { scope: scopes[0], country: readCountry(request.headers) }),
      // Today's board-path questions (0225): read from the server's own pick,
      // neither counted nor walled. Fails to "none", never to a wall.
      readTodayExemptions(db, user.id),
    ]);
    const todayIds = revealCountWithout(counted, exempt.revealIds);
    return NextResponse.json(
      { limit: limits.revealsPerDay, todayIds, exemptIds: exempt.revealIds, pass },
      { headers: NO_STORE }
    );
  } catch (e) {
    // An error, never "no limit": the meter asks once more, then fails open
    // itself (lib/questions/dailyQuotaFetch). Answering "no limit" here left a
    // page unlimited until reload whenever the count timed out (2026-11-07).
    console.error("reveal quota read failed", e);
    return unavailable();
  }
}

function unavailable() {
  return NextResponse.json({ error: "Could not read today's answers." }, { status: 503, headers: NO_STORE });
}
