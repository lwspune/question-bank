export type BreadcrumbInput = {
  exam: { name: string };
  subject: { name: string };
  chapter: { name: string };
  subtopic: { name: string } | null;
};

/**
 * Composes the question card breadcrumb. When no exam filter is active in
 * the URL, callers pass includeExam=true so teachers don't lose the exam
 * context. Visual truncation is handled by CSS (`truncate` on the parent),
 * not here — this helper just emits the full canonical string.
 */
/** Levels the page or its filters already fix, so a card need not repeat them. */
export type BreadcrumbFixed = { subject?: boolean; chapter?: boolean; subtopic?: boolean };

export function buildBreadcrumb(
  q: BreadcrumbInput,
  opts: { includeExam: boolean; fixed?: BreadcrumbFixed }
): string {
  const fixed = opts.fixed ?? {};
  const parts: string[] = [];
  if (opts.includeExam) parts.push(q.exam.name);
  if (!fixed.subject) parts.push(q.subject.name);
  if (!fixed.chapter) parts.push(q.chapter.name);
  if (q.subtopic && !fixed.subtopic) parts.push(q.subtopic.name);
  return parts.join(" → ");
}
