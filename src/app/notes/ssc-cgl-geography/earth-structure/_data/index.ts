import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_GES_INTERIOR_NOTE } from "./interior";
import { SSC_GES_LANDFORMS_NOTE } from "./landforms";

export { SSC_EARTH_STRUCTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-geography/earth-structure/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ges-` here and `sscges-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/earth-structure.ts). Order matches `subtopicOrder`.
 */
export const SSC_EARTH_STRUCTURE_NOTES: Record<string, SubtopicNote> = {
  "ssc-ges-interior": SSC_GES_INTERIOR_NOTE,
  "ssc-ges-landforms": SSC_GES_LANDFORMS_NOTE,
};

export const SSC_EARTH_STRUCTURE_SLUGS = Object.keys(SSC_EARTH_STRUCTURE_NOTES);
