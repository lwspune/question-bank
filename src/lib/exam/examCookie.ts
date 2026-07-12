import { type ExamSlug } from "@/lib/exam/examContext";

/**
 * Persist the active exam to the `qb_exam` cookie (client-only — uses
 * document.cookie). 1-year, root path, lax — matches ExamPill so the profile
 * surfaces and the header pill stay in sync. Setting this makes /browse, notes
 * and mocks default to the student's primary exam on the next server render.
 */
export function setExamCookie(slug: ExamSlug) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `qb_exam=${encodeURIComponent(slug)}; path=/; max-age=${maxAge}; samesite=lax`;
}
