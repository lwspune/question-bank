/**
 * Reads of the pass catalogue through an RLS-bound client (anon or the
 * viewer's). The read policy on public.plans exposes ACTIVE rows to everyone,
 * so a cached public page (/terms, /refunds) can use the anon client.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Plan } from "./plans";

export type PlanRow = {
  id: string;
  label: string;
  blurb: string;
  perks: string[] | null;
  url_key: string;
  amount_paise: number;
  currency: string;
  duration_days: number | null;
  scope: string;
  active: boolean;
  sort_order: number;
};

export const PLAN_COLUMNS =
  "id, label, blurb, perks, url_key, amount_paise, currency, duration_days, scope, active, sort_order";

export function rowToPlan(r: PlanRow): Plan {
  return {
    id: r.id,
    label: r.label,
    blurb: r.blurb,
    perks: r.perks ?? [],
    urlKey: r.url_key,
    amountPaise: r.amount_paise,
    currency: "INR",
    durationDays: r.duration_days,
    scope: r.scope,
    active: r.active,
    sortOrder: r.sort_order,
  };
}

/** Active plans in display order. Empty on error (a page shows no passes rather than 500ing). */
export async function listActivePlans(client: SupabaseClient): Promise<Plan[]> {
  const { data, error } = await client
    .from("plans")
    .select(PLAN_COLUMNS)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("listActivePlans:", error.message);
    return [];
  }
  return ((data ?? []) as PlanRow[]).map(rowToPlan);
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
