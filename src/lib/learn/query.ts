import "server-only";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { type Lesson, lessonFromRaw, type RawLesson } from "./lessonFromRaw";
import type { Outline } from "./lessonState";

export type { Lesson, LessonItem } from "./lessonFromRaw";

/**
 * The Learn pages' reads (migration 0192/0193), through the anon client: the pages are cached
 * and the same for everyone. Content comes only from the learn_* functions, which never return
 * a key. Math is rendered here, so the browser gets HTML and never loads KaTeX for a lesson.
 * A failed read throws, so a cached page is never an empty one.
 */

export type CourseRow = { slug: string; title: string; exam: string; subject: string; standard: number };

async function rpc<T>(fn: string, args: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await createSupabaseAnonClient().rpc(fn, args);
  if (error) {
    console.error(`learn: ${fn} failed`, error.message);
    throw new Error(`${fn}: ${error.message}`);
  }
  return data as T;
}

export function listCourses(): Promise<CourseRow[]> {
  return rpc<CourseRow[]>("learn_course_list");
}

export function getOutline(course: string): Promise<Outline | null> {
  return rpc<Outline | null>("learn_course_outline", { p_course: course });
}

export async function getAllOutlines(): Promise<Outline[]> {
  const courses = await listCourses();
  const outlines = await Promise.all(courses.map((c) => getOutline(c.slug)));
  return outlines.filter((o): o is Outline => o !== null);
}

export async function getLesson(chapter: string, concept: string): Promise<Lesson | null> {
  const raw = await rpc<RawLesson | null>("learn_concept", { p_chapter: chapter, p_concept: concept });
  return raw ? lessonFromRaw(raw) : null;
}
