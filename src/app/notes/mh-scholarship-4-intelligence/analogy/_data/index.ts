import type { SubtopicNote } from "@/app/notes/_types";
import { MS4_AN_PAIRS_NOTE } from "./pairs";
import { MS4_AN_FIGURES_NOTE } from "./figures";

export { MS4_ANALOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-4-intelligence/analogy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms4-an-` here and `ms4an-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/4an.ts). Order matches `subtopicOrder`.
 */
export const MS4_ANALOGY_NOTES: Record<string, SubtopicNote> = {
  "ms4-an-pairs": MS4_AN_PAIRS_NOTE,
  "ms4-an-figures": MS4_AN_FIGURES_NOTE,
};

export const MS4_ANALOGY_SLUGS = Object.keys(MS4_ANALOGY_NOTES);
