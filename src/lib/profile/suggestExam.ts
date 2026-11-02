import { getExamBySlug, isExamSlug } from "@/lib/exam/examContext";

/**
 * A guess at the exam of a student who never chose one, for /me to offer as
 * "Studying for MHT-CET? Yes". 930 of 2,167 accounts had none on 2026-11-02;
 * 330 had practised mostly one exam and 646 had first landed on a page for one.
 *
 * Practice first: the exam behind at least 80% of 3+ practised questions.
 * Else the exam named by the page they first landed on (acq_landing). Else
 * nothing: a wrong guess costs more than no guess, and the student confirms
 * either way. Never an exam from the international site.
 *
 * Pure. Spec: tests/personalise-helpers.test.ts.
 */
export type SuggestInput = {
  /** Practised questions per exam slug. */
  practice: Record<string, number>;
  /** First page they landed on, e.g. "/questions/jee-mains/physics/optics". */
  landing: string | null;
};

const MIN_PRACTISED = 3;
const MIN_SHARE = 0.8;
/** Routes whose second segment is an exam slug. */
const EXAM_SEGMENT_ROUTES = new Set(["questions", "exams", "board", "question-papers", "guide", "notes"]);

function onSite(slug: string | null | undefined): string | null {
  if (!slug || !isExamSlug(slug)) return null;
  return getExamBySlug(slug)?.site === "intl" ? null : slug;
}

export function suggestTargetExam(
  input: SuggestInput,
  examOfNotesRoute: (subjectRoute: string) => string | null
): string | null {
  const counts = Object.entries(input.practice).filter(([s]) => onSite(s));
  const total = counts.reduce((n, [, c]) => n + c, 0);
  if (total >= MIN_PRACTISED) {
    const [top, n] = counts.reduce((a, b) => (b[1] > a[1] ? b : a));
    if (n / total >= MIN_SHARE) return top;
  }

  const seg = (input.landing ?? "").split(/[?#]/)[0].split("/").filter(Boolean);
  if (seg.length < 2) return null;
  if (seg[0] === "mock" && seg[1] === "exam") return onSite(seg[2]);
  if (!EXAM_SEGMENT_ROUTES.has(seg[0])) return null;
  const direct = onSite(seg[1]);
  if (direct) return direct;
  return seg[0] === "notes" ? onSite(examOfNotesRoute(seg[1])) : null;
}
