import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_AV_SUM_NOTE } from "./sum";
import { SSC2_AV_COMBINED_NOTE } from "./combined";

export { SSC2_AVERAGES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/averages/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-av-` here and `ssc2av-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/averages.ts). Order matches `subtopicOrder`.
 */
export const SSC2_AVERAGES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-av-sum": SSC2_AV_SUM_NOTE,
  "ssc2-av-combined": SSC2_AV_COMBINED_NOTE,
};

export const SSC2_AVERAGES_SLUGS = Object.keys(SSC2_AVERAGES_NOTES);
