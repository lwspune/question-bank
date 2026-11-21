import type { SubtopicNote } from "@/app/notes/_types";
import { MS7_AN_PAIRS_NOTE } from "./pairs";
import { MS7_AN_FIGURES_NOTE } from "./figures";

export { MS7_ANALOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-7-intelligence/analogy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms7-an-` here and `ms7an-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/7an.ts). Order matches `subtopicOrder`.
 */
export const MS7_ANALOGY_NOTES: Record<string, SubtopicNote> = {
  "ms7-an-pairs": MS7_AN_PAIRS_NOTE,
  "ms7-an-figures": MS7_AN_FIGURES_NOTE,
};

export const MS7_ANALOGY_SLUGS = Object.keys(MS7_ANALOGY_NOTES);
