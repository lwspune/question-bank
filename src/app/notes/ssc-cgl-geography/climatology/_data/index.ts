import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_GCL_ATMOSPHERE_NOTE } from "./atmosphere";
import { SSC_GCL_WINDS_NOTE } from "./winds";
import { SSC_GCL_CLIMATES_NOTE } from "./climates";

export { SSC_CLIMATOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-geography/climatology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-gcl-` here and `sscgcl-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/climatology.ts). Order matches `subtopicOrder`.
 */
export const SSC_CLIMATOLOGY_NOTES: Record<string, SubtopicNote> = {
  "ssc-gcl-atmosphere": SSC_GCL_ATMOSPHERE_NOTE,
  "ssc-gcl-winds": SSC_GCL_WINDS_NOTE,
  "ssc-gcl-climates": SSC_GCL_CLIMATES_NOTE,
};

export const SSC_CLIMATOLOGY_SLUGS = Object.keys(SSC_CLIMATOLOGY_NOTES);
