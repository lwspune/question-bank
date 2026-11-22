import "server-only";
import { homesOf, neighbours, scopeUpTo, type Outline } from "./lessonState";
import { getAllOutlines, getLesson } from "./query";

/**
 * One lesson's data as its page draws it (2026-11-22): the /learn lesson page and the lesson
 * played full screen in V (GET /api/learn/lesson) read it here, so the two cannot drift.
 * Everyone's copy is the same (slides and questions, no keys); progress loads after, per viewer.
 */
export async function loadLessonProps(chapter: string, concept: string) {
  const [lesson, outlines] = await Promise.all([getLesson(chapter, concept), getAllOutlines()]);
  const pool = outlines.find((o) => o.pools[chapter])?.pools[chapter];
  if (!lesson || !pool) return null;
  const courseOf = (slug: string) => outlines.find((o) => o.slug === slug) as Outline;
  const homes = homesOf(outlines, chapter, lesson.concept.code).map((h) => ({
    ...h,
    place: neighbours(courseOf(h.course), h.chapter, chapter, lesson.concept.code),
    // Gated only on what the course teaches in this chapter or before it.
    scope: [...scopeUpTo(courseOf(h.course), h.chapter, chapter)],
  }));
  return { lesson, pool, homes, outlines };
}

export type LessonProps = NonNullable<Awaited<ReturnType<typeof loadLessonProps>>>;
