import type { SubtopicNote } from "@/app/notes/_types";
import { MS4_FR_READING_NOTE } from "./reading";
import { MS4_FR_PROBLEMS_NOTE } from "./problems";

export { MS4_FRACTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-4-maths/fractions-decimals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms4-fr-` here and `ms4fr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/4fr.ts). Order matches `subtopicOrder`.
 */
export const MS4_FRACTIONS_NOTES: Record<string, SubtopicNote> = {
  "ms4-fr-reading": MS4_FR_READING_NOTE,
  "ms4-fr-problems": MS4_FR_PROBLEMS_NOTE,
};

export const MS4_FRACTIONS_SLUGS = Object.keys(MS4_FRACTIONS_NOTES);
