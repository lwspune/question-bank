import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_GIP_RIVERS_NOTE } from "./rivers";
import { SSC_GIP_RELIEF_NOTE } from "./relief";
import { SSC_GIP_CLIMATE_NOTE } from "./climate";

export { SSC_INDIAN_PHYSICAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-geography/indian-physical/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-gip-` here and `sscgip-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/indian-physical.ts). Order matches `subtopicOrder`.
 */
export const SSC_INDIAN_PHYSICAL_NOTES: Record<string, SubtopicNote> = {
  "ssc-gip-rivers": SSC_GIP_RIVERS_NOTE,
  "ssc-gip-relief": SSC_GIP_RELIEF_NOTE,
  "ssc-gip-climate": SSC_GIP_CLIMATE_NOTE,
};

export const SSC_INDIAN_PHYSICAL_SLUGS = Object.keys(SSC_INDIAN_PHYSICAL_NOTES);
