/**
 * Reads of the pass catalogue through an RLS-bound client (anon or the
 * viewer's). The read policy on public.plans exposes ACTIVE rows to everyone,
 * so a cached public page (/terms, /refunds) can use the anon client.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { siteForCurrency, type Plan, type PlanCurrency } from "./plans";
import { PERK_PLACEHOLDERS, fillPerks, type FreeLimits } from "./perkLimits";

export type PlanRow = {
  id: string;
  label: string;
  blurb: string;
  perks: string[] | null;
  url_key: string;
  amount_paise: number;
  currency: string;
  site: string;
  duration_days: number | null;
  scope: string;
  active: boolean;
  sort_order: number;
};

export const PLAN_COLUMNS =
  "id, label, blurb, perks, url_key, amount_paise, currency, site, duration_days, scope, active, sort_order";

export function rowToPlan(r: PlanRow): Plan {
  // 0203's CHECK pairs USD with intl and INR with www, so the site follows the currency.
  const currency: PlanCurrency = r.currency === "USD" ? "USD" : "INR";
  return {
    id: r.id,
    label: r.label,
    blurb: r.blurb,
    perks: r.perks ?? [],
    urlKey: r.url_key,
    amountPaise: r.amount_paise,
    currency,
    site: siteForCurrency(currency),
    durationDays: r.duration_days,
    scope: r.scope,
    active: r.active,
    sortOrder: r.sort_order,
  };
}

/**
 * Active plans in display order, perks filled from the live free limits
 * (lib/billing/perkLimits). Empty on error (a page shows no passes rather than
 * 500ing). The admin editor reads raw rows through listAllPlans instead.
 */
export async function listActivePlans(client: SupabaseClient): Promise<Plan[]> {
  const [{ data, error }, limits] = await Promise.all([
    client.from("plans").select(PLAN_COLUMNS).eq("active", true).order("sort_order", { ascending: true }),
    readFreeLimits(client),
  ]);
  if (error) {
    console.error("listActivePlans:", error.message);
    return [];
  }
  return ((data ?? []) as PlanRow[]).map((r) => withLiveLimits(rowToPlan(r), limits));
}

function withLiveLimits(plan: Plan, limits: FreeLimits | null): Plan {
  return { ...plan, perks: fillPerks(plan.perks, limits) };
}

/** The numbers a perk's placeholders stand for (migration 0152); null if unreadable. */
export async function readFreeLimits(client: SupabaseClient): Promise<FreeLimits | null> {
  const { data, error } = await client.rpc("free_limits");
  if (error || !data || typeof data !== "object") {
    if (error) console.error("free_limits:", error.message);
    return null;
  }
  const row = data as Record<string, unknown>;
  const limits = {} as FreeLimits;
  for (const name of PERK_PLACEHOLDERS) {
    const v = row[name];
    limits[name] = typeof v === "number" ? v : null;
  }
  return limits;
}

/** Cleared by /api/admin/plans on every price OR limit save, so a change shows at once. */
export const PLANS_CACHE_TAG = "plans";

/**
 * The active passes, remembered for /browse instead of read on every visit
 * (3,695 reads a day, measured 2026-10-06). Read SIGNED OUT: the read policy
 * shows active rows to everyone alike, so one copy fits every viewer. A save
 * clears it through PLANS_CACHE_TAG; the day-long expiry is only a backstop
 * for a price changed outside the pricing page. A failed read throws inside
 * the cache so it is never remembered, and degrades to "no passes" like
 * listActivePlans. CHECKOUT NEVER READS THIS: /api/billing/order prices the
 * order through getActivePlan, live.
 */
const listActivePlansRemembered = unstable_cache(
  async (): Promise<Plan[]> => {
    const anon = createSupabaseAnonClient();
    const [{ data, error }, limits] = await Promise.all([
      anon.from("plans").select(PLAN_COLUMNS).eq("active", true).order("sort_order", { ascending: true }),
      readFreeLimits(anon),
    ]);
    if (error) throw new Error(error.message);
    // Unreadable limits would hide every perk quoting one; do not remember that.
    if (!limits) throw new Error("free_limits unreadable");
    return ((data ?? []) as PlanRow[]).map((r) => withLiveLimits(rowToPlan(r), limits));
  },
  ["active-plans-v3"],
  { revalidate: 86400, tags: [PLANS_CACHE_TAG] }
);

export async function listActivePlansCached(): Promise<Plan[]> {
  try {
    return await listActivePlansRemembered();
  } catch (e) {
    console.error("listActivePlansCached:", (e as Error).message);
    return [];
  }
}

/** One active plan by id, for /api/billing/order. Null if missing or inactive. */
export async function getActivePlan(client: SupabaseClient, id: string): Promise<Plan | null> {
  const { data, error } = await client
    .from("plans")
    .select(PLAN_COLUMNS)
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();
  if (error || !data) return null;
  return rowToPlan(data as PlanRow);
}

/** The free-mock number for public copy; null = the limit is off. */
export async function readFreeMockLimit(client: SupabaseClient): Promise<number | null> {
  const { data, error } = await client.rpc("free_mock_limit");
  if (error) {
    console.error("free_mock_limit:", error.message);
    return null;
  }
  return typeof data === "number" ? data : null;
}
