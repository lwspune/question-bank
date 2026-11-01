import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_FLO_LIGHT_NOTE } from "./light";

export { SSC_LIGHT_OPTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-physics/light-optics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-flo-` here and `sscflo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/light-optics.ts). Order matches `subtopicOrder`.
 */
export const SSC_LIGHT_OPTICS_NOTES: Record<string, SubtopicNote> = {
  "ssc-flo-light": SSC_FLO_LIGHT_NOTE,
};

export const SSC_LIGHT_OPTICS_SLUGS = Object.keys(SSC_LIGHT_OPTICS_NOTES);
