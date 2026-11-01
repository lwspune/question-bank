import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_FHT_HEAT_NOTE } from "./heat";

export { SSC_HEAT_THERMODYNAMICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-physics/heat-thermodynamics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-fht-` here and `sscfht-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/heat-thermodynamics.ts). Order matches `subtopicOrder`.
 */
export const SSC_HEAT_THERMODYNAMICS_NOTES: Record<string, SubtopicNote> = {
  "ssc-fht-heat": SSC_FHT_HEAT_NOTE,
};

export const SSC_HEAT_THERMODYNAMICS_SLUGS = Object.keys(SSC_HEAT_THERMODYNAMICS_NOTES);
