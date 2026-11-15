import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_ST_UNGROUPED_NOTE } from "./ungrouped";
import { SSC2_ST_GROUPED_NOTE } from "./grouped";

export { SSC2_STATISTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/statistics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-st-` here and `ssc2st-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/statistics.ts). Order matches `subtopicOrder`.
 */
export const SSC2_STATISTICS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-st-ungrouped": SSC2_ST_UNGROUPED_NOTE,
  "ssc2-st-grouped": SSC2_ST_GROUPED_NOTE,
};

export const SSC2_STATISTICS_SLUGS = Object.keys(SSC2_STATISTICS_NOTES);
