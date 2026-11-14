import { getExamBySlug, isExamSlug } from "@/lib/exam/examContext";
import { examFromPath } from "@/lib/exam/examFromPath";

/**
 * A guess at the exam of a student who never chose one, offered on Home as
 * "Your exam: MHT-CET (our guess)" and stored by the daily guess job
 * (scripts/profile/infer-exams.ts, migration 0254). 930 of 2,167 accounts had
 * no exam on 2026-11-02; on 2026-11-14 the rule was tested against students
 * who DID choose: practice named their exam 94% of the time, the first page
 * 92%.
 *
 * Practice first: the exam behind at least 80% of 3+ practised questions.
 * Else the exam named by the page they first landed on (acq_landing), read by
 * examFromPath, the welcome screen's own rule, so the two never disagree about
 * a page. Else nothing: a wrong guess costs more than no guess, and the
 * student confirms either way. Never an exam from the international site.
 *
 * Pure. Spec: tests/suggest-exam.test.ts.
 */
export type SuggestInput = {
  /** Practised questions per exam slug. */
  practice: Record<string, number>;
  /** First page they landed on, e.g. "/questions/jee-mains/physics/optics". */
  landing: string | null;
};

export type GuessSource = "practice" | "landing";
export type InferredExam = { slug: string; source: GuessSource };

const MIN_PRACTISED = 3;
const MIN_SHARE = 0.8;

/** A www exam slug, or null (unknown, or an exam of the international site). */
export function onSiteExam(slug: string | null | undefined): string | null {
  if (!slug || !isExamSlug(slug)) return null;
  return getExamBySlug(slug)?.site === "intl" ? null : slug;
}

export function inferStudentExam(input: SuggestInput): InferredExam | null {
  const counts = Object.entries(input.practice).filter(([s]) => onSiteExam(s));
  const total = counts.reduce((n, [, c]) => n + c, 0);
  if (total >= MIN_PRACTISED) {
    const [top, n] = counts.reduce((a, b) => (b[1] > a[1] ? b : a));
    if (n / total >= MIN_SHARE) return { slug: top, source: "practice" };
  }
  const landed = onSiteExam(examFromPath(input.landing));
  return landed ? { slug: landed, source: "landing" } : null;
}
