/**
 * Learn tab addresses. A course page and its chapter maps live under the course; a lesson has
 * ONE address per concept (decision B, 2026-10-27: a concept two courses share is one page, not
 * two near-copies), with the course the student came from as `?course=` and a refresher's
 * source concept as `?from=`.
 */
export const LEARN_HUB = "/learn";

export const courseHref = (course: string) => `${LEARN_HUB}/${course}`;

export const chapterHref = (course: string, chapter: string) => `${LEARN_HUB}/${course}/${chapter}`;

export function lessonHref(chapter: string, concept: string, opts: { course?: string | null; from?: string | null } = {}): string {
  const q = new URLSearchParams();
  if (opts.course) q.set("course", opts.course);
  if (opts.from) q.set("from", opts.from);
  const query = q.toString();
  return `${LEARN_HUB}/lesson/${chapter}/${concept}${query ? `?${query}` : ""}`;
}

/** The database's mastery and review rules (learn_mastery_needed / learn_review_needed, migration 0192), for a guest's page-only progress. */
export const MASTERY_NEEDED = 3;
export const REVIEW_NEEDED = 2;
