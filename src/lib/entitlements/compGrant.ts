/**
 * Pure helpers for the one-click comp grant on a student's profile page
 * (/dashboard/students/[id]). No I/O. Unit-tested in tests/entitlements-comp-grant.test.ts.
 *
 * The write path is the existing /api/admin/entitlements route; this module only
 * shapes what the dialog offers and what the profile page shows.
 */
import {
  SCOPE_ALL,
  SCOPE_MOCKS,
  SCOPE_TEACHER,
  isEntitlementActive,
  type EntitlementStatus,
} from "./access";

/** Scopes a comp grant can carry — only ones something in code enforces. */
export const COMP_SCOPE_OPTIONS: readonly { value: string; label: string; help: string }[] = [
  { value: SCOPE_ALL, label: "Full premium", help: "Everything below, and any future premium." },
  { value: SCOPE_MOCKS, label: "Premium Pass", help: "Unlimited mock tests past the free limit, plus question paper + answer key PDF downloads." },
  {
    value: SCOPE_TEACHER,
    label: "Teacher pass",
    help: "Retired ₹499 pass. Covers the same as the Premium Pass.",
  },
];

/** A yyyy-mm-dd date → end of that day in UTC, so the grant covers the chosen day. Blank/malformed → null. */
export function compExpiryIso(date: string): string | null {
  const d = date.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
  const t = Date.parse(`${d}T23:59:59Z`);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

export type ActiveGrant = {
  id: string;
  scope: string;
  source: string;
  expiresAt: string | null;
};

type GrantRow = {
  id: unknown;
  scope: unknown;
  source: unknown;
  status: unknown;
  expires_at: unknown;
};

/** The student's grants that are live at `nowMs`: open-ended first, then soonest expiry. */
export function activeGrants(rows: readonly GrantRow[], nowMs: number): ActiveGrant[] {
  return rows
    .map((r) => ({
      id: r.id as string,
      scope: r.scope as string,
      source: r.source as string,
      status: r.status as EntitlementStatus,
      expiresAt: (r.expires_at as string | null) ?? null,
    }))
    .filter((g) => isEntitlementActive(g, nowMs))
    .sort((a, b) => {
      if (a.expiresAt === b.expiresAt) return 0;
      if (a.expiresAt === null) return -1;
      if (b.expiresAt === null) return 1;
      return Date.parse(a.expiresAt) - Date.parse(b.expiresAt);
    })
    .map(({ id, scope, source, expiresAt }) => ({ id, scope, source, expiresAt }));
}

/** A paid pass ends through a refund, never a profile-page button. */
export function canRevokeFromProfile(grant: Pick<ActiveGrant, "source">): boolean {
  return grant.source !== "razorpay";
}
