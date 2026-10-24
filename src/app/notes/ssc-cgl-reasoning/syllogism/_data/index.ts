import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RSY_TWO_NOTE } from "./two";
import { SSC_RSY_THREE_NOTE } from "./three";

export { SSC_SYLLOGISM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/syllogism/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rsy-` here and `sscrsy-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/syllogism.ts). Order matches `subtopicOrder`.
 */
export const SSC_SYLLOGISM_NOTES: Record<string, SubtopicNote> = {
  "ssc-rsy-two": SSC_RSY_TWO_NOTE,
  "ssc-rsy-three": SSC_RSY_THREE_NOTE,
};

export const SSC_SYLLOGISM_SLUGS = Object.keys(SSC_SYLLOGISM_NOTES);
