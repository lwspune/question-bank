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

/** The Premium Pass: unlimited mocks past the free limit, and Word paper + key downloads (DOWNLOAD_PASS_SCOPE). */
export const SCOPE_MOCKS = "mocks";

/** The retired ₹499 Teacher Pass (2026-09-26 to 2026-10-01). Still a valid scope: it covers SCOPE_MOCKS, and so downloads. */
export const SCOPE_TEACHER = "teacher";

/**
 * Scopes a grant carries beyond its own name. The teacher pass includes mocks;
 * the mock pass includes nothing else. Mirrored in SQL by
 * private.user_has_mock_access (migration 0120) — change both together.
 */
const SCOPE_IMPLIES: Record<string, readonly string[]> = {
  [SCOPE_TEACHER]: [SCOPE_MOCKS],
};

/** True if a grant of `granted` satisfies a request for `requested`. */
export function scopeCovers(granted: string, requested: string): boolean {
  return (
    granted === SCOPE_ALL ||
    granted === requested ||
    (SCOPE_IMPLIES[granted] ?? []).includes(requested)
  );
}

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
 * must equal the requested one or imply it (see SCOPE_IMPLIES).
 */
export function hasActiveScope(
  rows: Entitlement[],
  requestedScope: string,
  nowMs: number
): boolean {
  return rows.some(
    (r) => isEntitlementActive(r, nowMs) && scopeCovers(r.scope, requestedScope)
  );
}
