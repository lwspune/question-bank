/**
 * A `learn_concept` reply (migration 0190) as the lesson page shows it: the slides built and every
 * piece of maths rendered. No server-only guard, so `npm run learn:smoke` checks exactly what the
 * page renders; pages reach it through query.ts (server-only).
 */
import { buildDeck } from "./lesson/deck";
import { type RenderedSlide, renderDeck } from "./lesson/renderDeckCore";
import type { RenderedBlock, RenderedInline } from "./renderedText";
import { renderInlineText, renderRichText } from "./richText";
import type { Figure, LessonBody } from "./types";

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

export type RawLesson = {
  chapter: { slug: string; title: string };
  concept: { code: string; slug: string; title: string; one_liner: string; grp: string; body: LessonBody };
  items: { id: string; code: string; stem: string; figure: Figure | null; options: { key: string; text: string }[] }[];
};

export function lessonFromRaw(raw: RawLesson): Lesson {
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
