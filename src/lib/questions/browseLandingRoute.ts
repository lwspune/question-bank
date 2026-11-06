import { hasSupabaseAuthCookie } from "@/lib/auth-identity";
import { getExamBySlug, isExamSlug } from "@/lib/exam/examContext";

/**
 * Which cached copy of the bare /browse landing a request may be served
 * (2026-11-07), or null for the live page. Pure; the middleware applies it.
 *
 * The landing is the same for every signed-out visitor in India except for the
 * chosen exam (qb_exam) shown first, so /browse-start/<all|slug> holds one
 * cached copy per choice. Everything that makes the live page differ stays live:
 *
 * - a query string: a filtered view, never the landing;
 * - a sign-in cookie: the dialog and the pass offer depend on the account;
 * - a practice-only exam cookie: the page scopes itself to that exam;
 * - a country other than India, or none: the pass price is per country, and
 *   the cached copy is built with India's;
 * - the intl host: it opens its own exam instead of the landing.
 */
export function browseLandingRewrite(req: {
  search: string;
  cookieNames: readonly string[];
  qbExam: string | undefined;
  country: string | null;
  intlHost: boolean;
}): string | null {
  if (req.search !== "" || req.intlHost || req.country !== "IN") return null;
  if (hasSupabaseAuthCookie(req.cookieNames)) return null;
  if (!isExamSlug(req.qbExam)) return "/browse-start/all";
  if (getExamBySlug(req.qbExam)?.practiceOnly) return null;
  return `/browse-start/${req.qbExam}`;
}

/** The fixed request the cached copies are built for. */
export const LANDING_COUNTRY = "IN";
export const LANDING_HOST = "www.pyqvault.com";
