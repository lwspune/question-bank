import type { SupabaseClient } from "@supabase/supabase-js";
import {
  hasActiveScope,
  SCOPE_ALL,
  type Entitlement,
  type EntitlementSource,
  type EntitlementStatus,
} from "./access";

type EntitlementRow = {
  id: string;
  user_id: string;
  scope: string;
  source: string;
  status: string;
  granted_at: string;
  expires_at: string | null;
  provider_ref: string | null;
  note: string | null;
  granted_by: string | null;
};

function mapRow(r: EntitlementRow): Entitlement {
  return {
    id: r.id,
    userId: r.user_id,
    scope: r.scope,
    source: r.source as EntitlementSource,
    status: r.status as EntitlementStatus,
    grantedAt: r.granted_at,
    expiresAt: r.expires_at,
    providerRef: r.provider_ref,
    note: r.note,
    grantedBy: r.granted_by,
  };
}

/**
 * Loads a user's entitlement rows. Must be called with a user-bound client so
 * RLS scopes to their own rows (`entitlements_select_own`). Returns [] on error
 * or no rows — absence of access is the safe default.
 */
export async function loadEntitlements(
  client: SupabaseClient,
  userId: string
): Promise<Entitlement[]> {
  const { data, error } = await client
    .from("entitlements")
    .select(
      "id, user_id, scope, source, status, granted_at, expires_at, provider_ref, note, granted_by"
    )
    .eq("user_id", userId);
  if (error || !data) return [];
  return (data as EntitlementRow[]).map(mapRow);
}

/**
 * True if the user currently has active access to `scope` (default the
 * full-premium flag). One round-trip + pure evaluation. Fail-closed.
 */
export async function userHasAccess(
  client: SupabaseClient,
  userId: string,
  scope: string = SCOPE_ALL,
  nowMs: number = Date.now()
): Promise<boolean> {
  const rows = await loadEntitlements(client, userId);
  return hasActiveScope(rows, scope, nowMs);
}
