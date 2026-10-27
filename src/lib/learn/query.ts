import "server-only";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { buildDeck } from "./lesson/deck";
import { type RenderedSlide, renderDeck } from "./lesson/renderDeck";
import type { Outline } from "./lessonState";
import type { RenderedBlock, RenderedInline } from "./renderedText";
import { renderInlineText, renderRichText } from "./richText";
import type { Figure, LessonBody } from "./types";

/**
 * The Learn pages' reads (migration 0190/0191), through the anon client: the pages are cached
 * and the same for everyone. Content comes only from the learn_* functions, which never return
 * a key. Math is rendered here, so the browser gets HTML and never loads KaTeX for a lesson.
 * A failed read throws, so a cached page is never an empty one.
 */

export type CourseRow = { slug: string; title: string; exam: string; subject: string; standard: number };

export type LessonItem = {
  id: string;
  code: string;
  stem: RenderedBlock[];
  figure: Figure | null;
  /** Stored keys in key order; the page shuffles them per learner (engine/optionOrder). */
  options: { key: string; text: RenderedInline[] }[];
};

export type Lesson = {
  chapter: { slug: string; title: string };
  concept: { code: string; slug: string; title: string; oneLiner: string; group: string };
  slides: RenderedSlide[];
  items: LessonItem[];
};

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

type RawLesson = {
  chapter: { slug: string; title: string };
  concept: { code: string; slug: string; title: string; one_liner: string; grp: string; body: LessonBody };
  items: { id: string; code: string; stem: string; figure: Figure | null; options: { key: string; text: string }[] }[];
};

export async function getLesson(chapter: string, concept: string): Promise<Lesson | null> {
  const raw = await rpc<RawLesson | null>("learn_concept", { p_chapter: chapter, p_concept: concept });
  if (!raw) return null;
  return {
    chapter: raw.chapter,
    concept: { code: raw.concept.code, slug: raw.concept.slug, title: raw.concept.title, oneLiner: raw.concept.one_liner, group: raw.concept.grp },
    slides: renderDeck(buildDeck(raw.concept.body)),
    items: raw.items.map((i) => ({
      id: i.id,
      code: i.code,
      stem: renderRichText(i.stem),
      figure: i.figure,
      options: i.options.map((o) => ({ key: o.key, text: renderInlineText(o.text) })),
    })),
  };
}
