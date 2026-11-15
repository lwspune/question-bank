import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_DI_GRAPHS_NOTE } from "./graphs";
import { SSC2_DI_PIES_NOTE } from "./pies";

export { SSC2_DATA_INTERPRETATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/data-interpretation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-di-` here and `ssc2di-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/data-interpretation.ts). Order matches `subtopicOrder`.
 */
export const SSC2_DATA_INTERPRETATION_NOTES: Record<string, SubtopicNote> = {
  "ssc2-di-graphs": SSC2_DI_GRAPHS_NOTE,
  "ssc2-di-pies": SSC2_DI_PIES_NOTE,
};

export const SSC2_DATA_INTERPRETATION_SLUGS = Object.keys(SSC2_DATA_INTERPRETATION_NOTES);
