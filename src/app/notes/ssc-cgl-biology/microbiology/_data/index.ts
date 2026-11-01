import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_BMD_DISEASES_NOTE } from "./diseases";

export { SSC_MICROBIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-biology/microbiology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-bmd-` here and `sscbmd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/microbiology.ts). Order matches `subtopicOrder`.
 */
export const SSC_MICROBIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "ssc-bmd-diseases": SSC_BMD_DISEASES_NOTE,
};

export const SSC_MICROBIOLOGY_SLUGS = Object.keys(SSC_MICROBIOLOGY_NOTES);
