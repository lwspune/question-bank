import type { SubtopicNote } from "@/app/notes/_types";
import { AF_ST_DATA_NOTE } from "./data";
import { AF_ST_MEAN_NOTE } from "./mean";
import { AF_ST_MEDIAN_NOTE } from "./median";
import { AF_ST_GRAPHS_NOTE } from "./graphs";

export { AF_ST_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/statistics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-st-` here and `afst-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afst-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_ST_NOTES: Record<string, SubtopicNote> = {
  "af-st-data": AF_ST_DATA_NOTE,
  "af-st-mean": AF_ST_MEAN_NOTE,
  "af-st-median": AF_ST_MEDIAN_NOTE,
  "af-st-graphs": AF_ST_GRAPHS_NOTE,
};

export const AF_ST_SLUGS = Object.keys(AF_ST_NOTES);
