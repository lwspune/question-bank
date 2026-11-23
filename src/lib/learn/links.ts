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

/** A lesson to open: its chapter and concept, and the course the student came from. */
export type LessonTarget = { chapter: string; concept: string; course: string | null };

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * A lesson's address read back (2026-11-22): V's map rows and the lesson's own links open the
 * lesson inside V rather than leaving for its page. Null for anything that is not a lesson.
 */
export function parseLessonHref(href: string): LessonTarget | null {
  let url: URL;
  try {
    url = new URL(href, "https://x.invalid");
  } catch {
    return null;
  }
  const m = /^\/learn\/lesson\/([^/]+)\/([^/]+)$/.exec(url.pathname);
  if (!m || !SLUG.test(m[1]) || !SLUG.test(m[2])) return null;
  const course = url.searchParams.get("course");
  return { chapter: m[1], concept: m[2], course: course && SLUG.test(course) ? course : null };
}

/** The database's mastery and review rules (learn_mastery_needed / learn_review_needed, migration 0192), for a guest's page-only progress. */
export const MASTERY_NEEDED = 3;
export const REVIEW_NEEDED = 2;
