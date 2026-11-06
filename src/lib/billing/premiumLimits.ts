/**
 * The signed-in student's free limits (my_premium_limits, migration 0134): the
 * drill, daily answers, saves and the projected-score trial, plus their pass.
 * Reads with the caller's JWT; null when signed out or the read failed, and
 * every caller treats null as "no limit" (the database triggers still guard
 * what they guard).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { SCOPE_MOCKS } from "@/lib/entitlements/access";
import { offerForNeed, passCta, type PassCta, type PlanSite } from "./plans";
import { sitePassScopes } from "./passScope";
import { listActivePlans } from "./plansQuery";

export type PremiumLimits = {
  /** Holds the www pass (or is staff). India-only features read this. */
  hasPass: boolean;
  /** Every pass held, 'all' for staff (migration 0206; absent on an older database). */
  passScopes?: string[];
  drillPerDay: number | null;
  revealsPerDay: number | null;
  saveLimit: number | null;
  saves: number;
  projectionTrialDays: number | null;
  projectionStartedAt: string | null;
};

export async function getPremiumLimits(db: SupabaseClient): Promise<PremiumLimits | null> {
  const { data, error } = await db.rpc("my_premium_limits");
  if (error) {
    console.error("my_premium_limits failed", error.message);
    return null;
  }
  return (data as PremiumLimits | null) ?? null;
}

/** The pass a limit card offers (null = none on sale; the card links to /pricing). */
export async function premiumPassCta(site: PlanSite = "pyqvault", country: string | null = null): Promise<PassCta | null> {
  // intl offers its exam's pass at the visitor's country price (2026-11-06).
  const need = site === "intl" ? (sitePassScopes("intl")[0] ?? SCOPE_MOCKS) : SCOPE_MOCKS;
  return passCta(offerForNeed(await listActivePlans(createSupabaseAnonClient()), need, site, country));
}
