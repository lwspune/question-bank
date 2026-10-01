/**
 * Admin read for /dashboard/growth. Wraps fetchGrowthSnapshot with the
 * SERVICE-ROLE client: get_growth_snapshot (migration 0129) is SECURITY
 * DEFINER, granted to service_role only, and the page is superadmin-gated.
 * The query itself lives in ./query.ts so `npm run growth:smoke` can drive it.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchGrowthSnapshot, type GrowthSnapshotRaw } from "./query";

export type { GrowthSnapshotRaw } from "./query";

export async function getGrowthSnapshot(): Promise<GrowthSnapshotRaw> {
  return fetchGrowthSnapshot(createSupabaseAdminClient());
}
