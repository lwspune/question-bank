import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_FUN_UNITS_NOTE } from "./units";

export { SSC_UNITS_MEASUREMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-physics/units-measurement/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-fun-` here and `sscfun-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/units-measurement.ts). Order matches `subtopicOrder`.
 */
export const SSC_UNITS_MEASUREMENT_NOTES: Record<string, SubtopicNote> = {
  "ssc-fun-units": SSC_FUN_UNITS_NOTE,
};

export const SSC_UNITS_MEASUREMENT_SLUGS = Object.keys(SSC_UNITS_MEASUREMENT_NOTES);
