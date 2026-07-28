/**
 * The one session shape AppHeader needs, plus the pure branching that hangs off
 * it. Kept free of `next/headers` so the logic is unit-testable without a
 * request scope (same split as auth-identity.ts).
 */

/** Everything the header renders about the viewer, resolved in one pass. */
export type HeaderSession = {
  email: string;
  /** Org role, or null for a self-serve student with no org_members row. */
  role: "ADMIN" | "TEACHER" | null;
  /** Tenant org name — staff-only chrome, never shown to students or anon. */
  orgName: string | null;
  /** Holds an org_members row. Drives the Papers tab and the org chip. */
  isStaff: boolean;
  /** Platform superadmin (`platform_admins`, migration 0056). */
  isSuperadmin: boolean;
};

/**
 * Where the brand mark links.
 *
 * ADMINs get /dashboard (reports, members, branches). Self-serve students get
 * /me. TEACHERs and anon get /browse — teachers work in the bank, and most of
 * the dashboard is org-management they cannot use.
 */
export function resolveHomeHref(session: HeaderSession | null): string {
  if (!session) return "/browse";
  if (session.role === "ADMIN") return "/dashboard";
  if (!session.isStaff) return "/me";
  return "/browse";
}
