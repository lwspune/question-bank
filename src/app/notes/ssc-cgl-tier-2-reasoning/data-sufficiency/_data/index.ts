import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RDS_DS_NOTE } from "./ds";

export { SSC2_DATA_SUFFICIENCY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/data-sufficiency/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-rds-` here and `ssc2rds-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/data-sufficiency.ts). Order matches `subtopicOrder`.
 */
export const SSC2_DATA_SUFFICIENCY_NOTES: Record<string, SubtopicNote> = {
  "ssc2-rds-ds": SSC2_RDS_DS_NOTE,
};

export const SSC2_DATA_SUFFICIENCY_SLUGS = Object.keys(SSC2_DATA_SUFFICIENCY_NOTES);
