/**
 * Pure entitlement access logic. No DB, no client — safe to import anywhere.
 *
 * An entitlement grants access to a `scope`. The special scope `"all"` is the
 * full-premium flag and satisfies any requested scope; a specific scope (e.g.
 * a notes-chapter key) satisfies only itself. A row counts only while its
 * status is "active" and it hasn't passed `expiresAt` (null = no expiry).
 */

export type EntitlementSource = "razorpay" | "comp" | "manual";
export type EntitlementStatus = "active" | "expired" | "revoked" | "cancelled";

/** The full-premium scope. A grant with this scope unlocks everything. */
export const SCOPE_ALL = "all";

export type Entitlement = {
  id: string;
  userId: string;
  scope: string;
  source: EntitlementSource;
  status: EntitlementStatus;
  grantedAt: string;
  expiresAt: string | null;
  providerRef: string | null;
  note: string | null;
  grantedBy: string | null;
};

/** True if the row is active and not past its expiry at `nowMs`. */
export function isEntitlementActive(
  row: Pick<Entitlement, "status" | "expiresAt">,
  nowMs: number
): boolean {
  if (row.status !== "active") return false;
  if (row.expiresAt == null) return true;
  return new Date(row.expiresAt).getTime() > nowMs;
}

/**
 * True if any row grants active access to `requestedScope` at `nowMs`.
 * An active `"all"` grant satisfies every scope; otherwise the row's scope
 * must equal the requested one.
 */
export function hasActiveScope(
  rows: Entitlement[],
  requestedScope: string,
  nowMs: number
): boolean {
  return rows.some(
    (r) =>
      isEntitlementActive(r, nowMs) &&
      (r.scope === SCOPE_ALL || r.scope === requestedScope)
  );
}
