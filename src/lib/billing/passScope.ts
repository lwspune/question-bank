/**
 * Which pass covers which exam (2026-10-30). Pure.
 *
 * Every pass check asks for the pass of the exam it guards: IMAT for IMAT, the
 * www Premium Pass (`mocks`) for every Indian exam. Before this all passes
 * shared `mocks`, so the Rs 499 www pass unlocked IMAT, and no international
 * price could be higher than it. The database mirrors the registry in
 * `exams.pass_scope` (migration 0204), which its limit triggers read.
 *
 * A check with no exam in hand (the reveal meter on a cached page that did not
 * say its exam) asks for any pass its SITE sells: `sitePassScopes`.
 */
import { SCOPE_MOCKS, scopeCovers } from "@/lib/entitlements/access";
import { EXAM_REGISTRY, getExamBySlug } from "@/lib/exam/examContext";
import type { PlanSite } from "./plans";

/** The pass that covers an exam; the www pass for an Indian, unknown or missing exam. */
export function passScopeForExam(slug: string | null | undefined): string {
  return getExamBySlug(slug)?.passScope ?? SCOPE_MOCKS;
}

/** The passes a site sells: www the Premium Pass, intl one per international exam. */
export function sitePassScopes(site: PlanSite): string[] {
  if (site === "pyqvault") return [SCOPE_MOCKS];
  return [...new Set(EXAM_REGISTRY.filter((e) => e.site === "intl").map((e) => passScopeForExam(e.slug)))];
}

/** True when any held scope covers any wanted one (`all` covers everything; teacher covers mocks). */
export function coversAny(held: readonly string[], wanted: readonly string[]): boolean {
  return held.some((h) => wanted.some((w) => scopeCovers(h, w)));
}

/** The pass part of my_mock_quota / my_premium_limits. `passScopes` arrived with migration 0206. */
export type PassSummary = { hasPass: boolean; passScopes?: readonly string[] | null };

/**
 * True when the student's quota summary shows a pass covering any of `scopes`. Without
 * `passScopes` (a database before 0206) `hasPass` meant the www pass only, so
 * it answers for `mocks` and nothing else.
 */
export function holdsPassFor(summary: PassSummary, scopes: string | readonly string[]): boolean {
  const wanted = typeof scopes === "string" ? [scopes] : scopes;
  if (summary.passScopes) return coversAny(summary.passScopes, wanted);
  return summary.hasPass && wanted.includes(SCOPE_MOCKS);
}

/**
 * The passes a check asks for: the exam's own when the check knows its exam,
 * else any pass its site sells (www: the Premium Pass; intl: its exams' passes).
 */
export function passScopesFor(site: PlanSite, examSlug?: string | null): string[] {
  return examSlug && getExamBySlug(examSlug) ? [passScopeForExam(examSlug)] : sitePassScopes(site);
}
