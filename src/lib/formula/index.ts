import type { FormulaChapter, FormulaTopic } from "./types";
import { MATRICES_DETERMINANTS } from "./matrices-determinants";

export type { FormulaChapter, FormulaTopic, FormulaKind } from "./types";

/**
 * Every chapter whose solutions have been classified by identity.
 *
 * One chapter so far. Adding another is a data job, not a code one: read that
 * chapter's solutions, tag them, generate its module, append here.
 */
export const FORMULA_CHAPTERS: readonly FormulaChapter[] = [
  {
    chapterSlug: "matrices-determinants",
    chapterName: "Matrices & Determinants",
    examName: "NDA",
    subjectDisplay: "Maths",
    notesHref: "/notes/nda-maths/matrices-determinants",
    topics: MATRICES_DETERMINANTS,
  },
];

const BY_SLUG = new Map<string, { topic: FormulaTopic; chapter: FormulaChapter }>();
for (const chapter of FORMULA_CHAPTERS) {
  for (const topic of chapter.topics) BY_SLUG.set(topic.slug, { topic, chapter });
}

export function formulaBySlug(
  slug: string
): { topic: FormulaTopic; chapter: FormulaChapter } | null {
  return BY_SLUG.get(slug) ?? null;
}

export function allFormulaSlugs(): string[] {
  return [...BY_SLUG.keys()];
}

/** Topics of a chapter, densest first — the order the index page lists them. */
export function topicsByWeight(chapter: FormulaChapter): FormulaTopic[] {
  return [...chapter.topics].sort(
    (a, b) => b.questionIds.length - a.questionIds.length
  );
}

/**
 * Other topics that share questions with this one, most overlap first. This is
 * a real signal rather than a "related" guess: two identities that repeatedly
 * appear in the same solution are genuinely used together.
 */
export function relatedTopics(
  slug: string,
  limit = 6
): { topic: FormulaTopic; shared: number }[] {
  const entry = BY_SLUG.get(slug);
  if (!entry) return [];
  const mine = new Set(entry.topic.questionIds);
  return entry.chapter.topics
    .filter((t) => t.slug !== slug)
    .map((topic) => ({
      topic,
      shared: topic.questionIds.reduce((n, id) => n + (mine.has(id) ? 1 : 0), 0),
    }))
    .filter((r) => r.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit);
}
