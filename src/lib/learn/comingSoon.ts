/**
 * The /learn hub's "coming soon" line (2026-10-28). Every visitor has a Learn tab, and for an
 * exam without a course it lands on the hub, so the hub names that exam and says its lessons
 * are coming. Null when there is nothing to say: no exam chosen, an unknown slug, or an exam
 * whose course is ready (its tab goes straight to the course).
 */
import { getExamBySlug } from "@/lib/exam/examContext";

export function learnComingSoonFor(slug: string | null | undefined): string | null {
  const exam = getExamBySlug(slug);
  if (!exam || exam.learnPath) return null;
  return exam.displayName;
}
