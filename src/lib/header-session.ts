/**
 * The one session shape AppHeader needs, plus the pure branching that hangs off
 * it. Kept free of `next/headers` so the logic is unit-testable without a
 * request scope (same split as auth-identity.ts).
 */
import type { ExamSlug } from "@/lib/exam/examContext";
import { isStage, sanitizeTargetExams, type Stage } from "@/lib/profile/onboarding";
import { hasActiveScope, type Entitlement } from "@/lib/entitlements/access";
import { SELLABLE_SCOPES } from "@/lib/billing/plans";

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
  /** Holds an active Premium Pass. Drives the diamond beside the logo. */
  hasPass: boolean;
  /** Self-reported stage — drives the exam feed (EXAM_TIER_SPEC.md §3.5). */
  stage: Stage | null;
  /** Target exams in stored order, sanitised. */
  targetExams: ExamSlug[];
};

/**
 * The two profile fields the header carries, from a raw `student_profiles` row.
 * A missing or malformed row yields `null` / `[]`, never an error — the header
 * renders on every page and must not fail on a profile read.
 */
export function profileFieldsFromRow(
  row: { stage?: unknown; target_exams?: unknown } | null | undefined
): { stage: Stage | null; targetExams: ExamSlug[] } {
  const stage = row?.stage;
  return {
    stage: isStage(stage) ? stage : null,
    targetExams: sanitizeTargetExams(row?.target_exams),
  };
}

/**
 * Whether the header shows the Premium Pass diamond. The same rule the paywall
 * applies (an active grant covering the mocks scope, any source), so the mark
 * can never claim a pass the paywall would refuse. Staff are not marked: they
 * download through their institute, not a pass, and already carry the org chip.
 */
export function hasPassFromEntitlements(rows: Entitlement[], nowMs: number): boolean {
  // Any pass (2026-10-30): the IMAT pass earns the diamond as the www pass does.
  return SELLABLE_SCOPES.some((scope) => hasActiveScope(rows, scope, nowMs));
}

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
