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
export function buildBreadcrumb(
  q: BreadcrumbInput,
  opts: { includeExam: boolean }
): string {
  const parts: string[] = [];
  if (opts.includeExam) parts.push(q.exam.name);
  parts.push(q.subject.name);
  parts.push(q.chapter.name);
  if (q.subtopic) parts.push(q.subtopic.name);
  return parts.join(" → ");
}
