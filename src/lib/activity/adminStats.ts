/**
 * Admin read for the A3 usage-shape readout (/dashboard/activity). Calls the
 * get_activity_shape aggregate RPC (migration 0053) via the SERVICE-ROLE client
 * — the function is SECURITY DEFINER + granted to service_role only, and the
 * page is admin-gated. Aggregation happens in Postgres (cap-safe); this layer
 * just validates + shapes the JSON into the typed ActivityShape.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { emptyShape, type ActivityShape } from "./shape";

export async function getActivityShape(days = 90): Promise<ActivityShape> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.rpc("get_activity_shape", { p_days: days });
  if (error) throw new Error(`getActivityShape: ${error.message}`);
  if (!data || typeof data !== "object") return emptyShape(days);

  // The RPC returns a fully-formed object; merge over an empty shape so a future
  // field the DB hasn't started emitting can't crash the render.
  const raw = data as Partial<ActivityShape>;
  const base = emptyShape(days);
  return {
    ...base,
    ...raw,
    sessions: { ...base.sessions, ...(raw.sessions ?? {}) },
    recency: { ...base.recency, ...(raw.recency ?? {}) },
    byKind: raw.byKind ?? [],
    dailyActive: raw.dailyActive ?? [],
  };
}
