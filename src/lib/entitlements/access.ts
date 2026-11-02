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

/**
 * The Premium Pass: every online limit lifted, plus PDF downloads. As a REQUEST,
 * `mocks` is what every online check on a www exam asks for (answers, drill,
 * saves, mocks, V), so the Practice Pass covers it too; downloads ask for
 * SCOPE_DOWNLOADS, which only this pass and the Teacher pass cover.
 */
export const SCOPE_MOCKS = "mocks";

/**
 * The Practice Pass (2026-11-03, migration 0212): every online limit lifted,
 * no downloads. Mirrored in SQL by private.user_has_pass and
 * private.user_has_mock_access.
 */
export const SCOPE_PRACTICE = "practice";

/**
 * Not a pass: what a download asks for (DOWNLOAD_PASS_SCOPE). Nothing sells or
 * grants it; the Premium and Teacher passes cover it.
 */
export const SCOPE_DOWNLOADS = "downloads";

/** The retired ₹499 Teacher Pass (2026-09-26 to 2026-10-01). Still a valid scope: it covers SCOPE_MOCKS, and so downloads. */
export const SCOPE_TEACHER = "teacher";

/**
 * Passes for international exams (2026-10-30, migration 0204): each covers its
 * own exam only, so the www pass (SCOPE_MOCKS) never unlocks them and they
 * never unlock the Indian exams. Which exam asks for which: the registry's
 * `passScope` (lib/billing/passScope).
 */
export const SCOPE_IMAT = "imat";
export const SCOPE_MCAT = "mcat";

/**
 * Not a pass: the pass name of an exam that needs none (2026-11-02, migration
 * 0210, the Class 9-10 exams). Every user holds it, nothing sells it, and an
 * entitlement may not carry it (a DB CHECK).
 */
export const SCOPE_FREE = "free";

/**
 * Scopes a grant carries beyond its own name. Not transitive: Practice covers
 * the online request (`mocks`) and stops there, so it never reaches
 * downloads. Mirrored in SQL by private.user_has_pass and
 * private.user_has_mock_access (migration 0212): change both together.
 */
const SCOPE_IMPLIES: Record<string, readonly string[]> = {
  [SCOPE_TEACHER]: [SCOPE_MOCKS, SCOPE_PRACTICE, SCOPE_DOWNLOADS],
  [SCOPE_MOCKS]: [SCOPE_PRACTICE, SCOPE_DOWNLOADS],
  [SCOPE_PRACTICE]: [SCOPE_MOCKS],
};

/**
 * True when `granted` gives everything a pass of scope `planScope` gives: the
 * scope itself and all it implies. What /pricing marks as already yours: a
 * Practice holder covers the `mocks` request but does not own the Premium
 * Pass, which adds downloads.
 */
export function scopeIncludes(granted: string, planScope: string): boolean {
  return [planScope, ...(SCOPE_IMPLIES[planScope] ?? [])].every((s) => scopeCovers(granted, s));
}

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
