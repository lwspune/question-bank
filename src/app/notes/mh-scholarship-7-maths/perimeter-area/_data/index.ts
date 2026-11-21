import type { SubtopicNote } from "@/app/notes/_types";
import { MS7_PA_SQUARES_NOTE } from "./squares";
import { MS7_PA_PATHS_NOTE } from "./paths";

export { MS7_AREA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-7-maths/perimeter-area/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms7-pa-` here and `ms7pa-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/7pa.ts). Order matches `subtopicOrder`.
 */
export const MS7_AREA_NOTES: Record<string, SubtopicNote> = {
  "ms7-pa-squares": MS7_PA_SQUARES_NOTE,
  "ms7-pa-paths": MS7_PA_PATHS_NOTE,
};

export const MS7_AREA_SLUGS = Object.keys(MS7_AREA_NOTES);
