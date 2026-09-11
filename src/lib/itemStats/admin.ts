import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { buildItemStatOverview, type ItemStatOverview } from "./overview";

export type { ItemStatOverview, ItemStatCoverage, LeadRow } from "./overview";

/**
 * The /dashboard/item-stats loader.
 *
 * SERVICE-ROLE, and superadmin-gated at the page. Two reasons, the second the
 * stronger: the numbers pool across every org by construction, so this is
 * cross-tenant data with no org filter (the platform-wide dashboard precedent);
 * and acting on a lead means editing question content, which is superadmin-only
 * since migration 0056.
 *
 * `server-only` lives HERE rather than on the logic, so the logic stays
 * drivable by a probe while the service-role client can never reach a bundle.
 */
export async function loadItemStatOverview(minRatio: number): Promise<ItemStatOverview> {
  return buildItemStatOverview(createSupabaseAdminClient(), minRatio);
}
