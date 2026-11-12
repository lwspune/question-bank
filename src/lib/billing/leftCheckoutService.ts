/**
 * The pass a student left at checkout on an earlier day, as the pulse carries
 * it to the "Your checkout didn't complete" bar (2026-11-12). Rules are pure in
 * ./leftCheckout; this file only reads.
 *
 * One indexed read of the student's last 7 days of paywall_event rows
 * (user_activity_user_kind_time_idx). Only when that names a checkout does it
 * read their passes (and the plans, from cache). Any failure means no bar.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadEntitlements } from "@/lib/entitlements/query";
import { listActivePlansCached } from "@/lib/billing/plansQuery";
import { passCta, type PassCta } from "@/lib/billing/plans";
import { LEFT_CHECKOUT_WINDOW_DAYS, leftCheckoutCandidate, stillUnpaid, type PaywallRow } from "./leftCheckout";

export async function readLeftCheckout(db: SupabaseClient, userId: string, now: Date): Promise<PassCta | null> {
  const since = new Date(now.getTime() - LEFT_CHECKOUT_WINDOW_DAYS * 86_400_000).toISOString();
  const { data, error } = await db
    .from("user_activity")
    .select("created_at, metadata, ref_id")
    .eq("user_id", userId)
    .eq("kind", "paywall_event")
    .gte("created_at", since);
  if (error) {
    console.error("left checkout read failed", error.message);
    return null;
  }
  const rows: PaywallRow[] = (data ?? []).map((r) => {
    const m = (r.metadata ?? {}) as { step?: unknown; gate?: unknown };
    return {
      at: new Date(r.created_at as string),
      step: typeof m.step === "string" ? m.step : "",
      gate: typeof m.gate === "string" ? m.gate : "",
      planId: typeof r.ref_id === "string" ? r.ref_id : null,
    };
  });
  const candidate = leftCheckoutCandidate(rows, now);
  if (!candidate) return null;
  const [grants, plans] = await Promise.all([loadEntitlements(db, userId), listActivePlansCached()]);
  // The www header shows the bar, so only a www pass.
  const plan = plans.find((p) => p.id === candidate.planId && p.active && p.site === "pyqvault");
  if (!plan) return null;
  return stillUnpaid(candidate, grants, plan.scope, now) ? passCta(plan) : null;
}
