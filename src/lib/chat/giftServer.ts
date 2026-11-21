/**
 * The gift a student has earned now (lib/chat/gift), read for the pulse.
 * Three small reads with the caller's client: their passes, today's 7-day
 * pass offer (practice_trial_offers, written only by claim_reveal), and,
 * only when neither settles it, a count of their Vault Points by
 * readFixPoints' own window (30 days, restarted by a purchase).
 *
 * THROWS on a failed read: a pass the read missed must never become a gift
 * (a pass holder told "20% off your pass"), so the pulse catches it as no gift.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { istDayKey } from "@/lib/email/dueNudge";
import { isEntitlementActive, scopeCovers, SCOPE_MOCKS, type Entitlement } from "@/lib/entitlements/access";
import { fixPointsWindowStart } from "@/lib/billing/fixPoints";
import { earnedGift, type VGift } from "./gift";

type PassRow = { scope: string; source: string; status: string; expires_at: string | null; created_at: string };

export async function readEarnedGift(db: SupabaseClient, userId: string, now: Date): Promise<VGift | null> {
  const [passes, offer] = await Promise.all([
    db.from("entitlements").select("scope, source, status, expires_at, created_at").eq("user_id", userId),
    db
      .from("practice_trial_offers")
      .select("ist_day")
      .eq("user_id", userId)
      .eq("ist_day", istDayKey(now))
      .maybeSingle(),
  ]);
  if (passes.error) throw new Error(`gift passes: ${passes.error.message}`);
  if (offer.error) throw new Error(`gift trial offer: ${offer.error.message}`);
  const rows = (passes.data ?? []) as PassRow[];
  // A www pass: Premium (mocks) or Practice, which covers the mocks request.
  const hasPass = rows.some(
    (r) => isEntitlementActive({ status: r.status as Entitlement["status"], expiresAt: r.expires_at }, now.getTime()) && scopeCovers(r.scope, SCOPE_MOCKS)
  );
  const base = { hasPass, everHadPass: rows.length > 0, trialOfferToday: offer.data !== null };
  // Settled without the points: a pass (nothing), or today's 7-day pass.
  const early = earnedGift({ ...base, points: 0 });
  if (hasPass || early) return early;

  // The points window, as readFixPoints draws it: a purchase starts it again.
  const bought = rows
    .filter((r) => r.source === "razorpay")
    .map((r) => new Date(r.created_at))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  const since = fixPointsWindowStart(now, bought ?? null);
  const counted = await db
    .from("fix_points")
    .select("question_id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("earned_at", since.toISOString());
  if (counted.error) throw new Error(`gift points: ${counted.error.message}`);
  return earnedGift({ ...base, points: counted.count ?? 0 });
}
