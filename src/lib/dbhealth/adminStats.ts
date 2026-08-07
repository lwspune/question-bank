/**
 * Admin read for /dashboard/health.
 *
 * `db_health_snapshots` is service-role only (RLS on, no policies), so this
 * uses the SERVICE-ROLE client and the page is superadmin-gated. Nothing is
 * computed here that the CLI does not also compute — the page and
 * `npm run db:health` share `rowToSnapshot`, `computeDelta` and
 * `evaluateFlags`, so the two surfaces cannot disagree.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { computeDelta } from "./delta";
import { evaluateFlags, type Flag } from "./flags";
import { buildHistory, rowToSnapshot, type HistoryRow } from "./rows";
import type { HealthDelta } from "./types";

export type HealthPageData = {
  /** null when no snapshot has ever been stored. */
  delta: HealthDelta | null;
  flags: Flag[];
  history: HistoryRow[];
  totalSnapshots: number;
};

export async function getHealthPageData(limit = 30): Promise<HealthPageData> {
  const db = createSupabaseAdminClient();

  const { data, error, count } = await db
    .from("db_health_snapshots")
    .select("*", { count: "exact" })
    .order("captured_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`getHealthPageData: ${error.message}`);

  const rows = data ?? [];
  if (rows.length === 0) {
    return { delta: null, flags: [], history: [], totalSnapshots: count ?? 0 };
  }

  // Newest-first, so [0] is current and [1] is the other half of the window.
  const current = rowToSnapshot(rows[0]);
  const previous = rows.length > 1 ? rowToSnapshot(rows[1]) : null;
  const delta = computeDelta(previous, current);

  return {
    delta,
    flags: evaluateFlags(delta),
    history: buildHistory(rows),
    totalSnapshots: count ?? rows.length,
  };
}
