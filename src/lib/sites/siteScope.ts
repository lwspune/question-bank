/**
 * Which of a student's own progress belongs on the site they are on
 * (2026-11-06). Pure.
 *
 * intl.pyqvault.com shows no Indian exam (owner's rule, 2026-10-30), so its
 * mastery map and drill hold the international exams alone; www holds every
 * exam but those, as every other www list does (nicheExams.examsForSite).
 * A student who studies on both sees each half on its own site.
 */
import type { ExamSlug } from "@/lib/exam/examContext";
import { primaryExam, sanitizeTargetExams } from "@/lib/profile/onboarding";
import { INTL_EXAMS } from "./intl";
import { isNicheExam } from "./nicheExams";

/**
 * Does an exam (by name) belong on this site? An item whose exam is unknown
 * stays on www, where it always appeared, and is left off intl, which must
 * never show what it cannot place.
 */
export function onSite(examName: string | null | undefined, intl: boolean): boolean {
  if (!examName) return !intl;
  return intl ? isNicheExam(examName) : !isNicheExam(examName);
}

export function forSite<T>(items: readonly T[], examOf: (item: T) => string | null | undefined, intl: boolean): T[] {
  return items.filter((item) => onSite(examOf(item), intl));
}

/**
 * The exam the drill tops a short set up from. On intl: the student's
 * international exam, else the first one (an intl student who never picked
 * still came for it). On www: their first exam that is not international,
 * which is what the drill used before, minus the intl exams.
 */
export function siteFillExam(targetExams: readonly string[], intl: boolean): ExamSlug | null {
  const picked = sanitizeTargetExams([...targetExams]);
  const intlSlugs = new Set<string>(INTL_EXAMS.map((e) => e.slug));
  if (intl) return picked.find((s) => intlSlugs.has(s)) ?? INTL_EXAMS[0]?.slug ?? null;
  return primaryExam(picked.filter((s) => !intlSlugs.has(s)));
}
