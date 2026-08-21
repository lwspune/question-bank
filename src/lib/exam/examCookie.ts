import { type ExamSlug } from "@/lib/exam/examContext";

/**
 * Persist the active exam to the `qb_exam` cookie (client-only — uses
 * document.cookie). 1-year, root path, lax.
 *
 * Since the header's exam pill was removed (2026-08-21) this is the ONLY way
 * the cookie is ever written, and both callers (/welcome onboarding and
 * /account) sit behind sign-in. That is what makes "no cookie" mean "anonymous,
 * never told us an exam" rather than "hasn't clicked the pill yet", and why the
 * nav resolves a missing cookie to the neutral indexes — see examNav.ts.
 */
export function setExamCookie(slug: ExamSlug) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `qb_exam=${encodeURIComponent(slug)}; path=/; max-age=${maxAge}; samesite=lax`;
}
