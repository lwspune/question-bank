import type { SubtopicNote } from "@/app/notes/_types";
import { MS4_UN_TIME_NOTE } from "./time";
import { MS4_UN_MONEY_NOTE } from "./money";

export { MS4_UNITS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-4-maths/units-of-measurement/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms4-un-` here and `ms4un-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/4un.ts). Order matches `subtopicOrder`.
 */
export const MS4_UNITS_NOTES: Record<string, SubtopicNote> = {
  "ms4-un-time": MS4_UN_TIME_NOTE,
  "ms4-un-money": MS4_UN_MONEY_NOTE,
};

export const MS4_UNITS_SLUGS = Object.keys(MS4_UNITS_NOTES);
