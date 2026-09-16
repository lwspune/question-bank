/**
 * Admin read for the PMF readout (/dashboard/pmf). Wraps fetchPmfSnapshot with
 * the SERVICE-ROLE client — get_pmf_snapshot (migration 0103) is SECURITY
 * DEFINER, granted to service_role only, and the page is superadmin-gated.
 *
 * The query itself lives in ./query.ts (no `server-only`) so `npm run pmf:smoke`
 * can drive the same loader against live data.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchPmfSnapshot, type PmfSnapshot } from "./query";

export type { PmfSnapshot, MaturePool } from "./query";

export async function getPmfSnapshot(weeks = 12): Promise<PmfSnapshot> {
  return fetchPmfSnapshot(createSupabaseAdminClient(), weeks);
}
