import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RDC_OPPOSITE_NOTE } from "./opposite";
import { SSC_RDC_TURNING_NOTE } from "./turning";

export { SSC_DICE_CUBES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/dice-cubes/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rdc-` here and `sscrdc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/dice-cubes.ts). Order matches `subtopicOrder`.
 */
export const SSC_DICE_CUBES_NOTES: Record<string, SubtopicNote> = {
  "ssc-rdc-opposite": SSC_RDC_OPPOSITE_NOTE,
  "ssc-rdc-turning": SSC_RDC_TURNING_NOTE,
};

export const SSC_DICE_CUBES_SLUGS = Object.keys(SSC_DICE_CUBES_NOTES);
