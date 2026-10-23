import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_HD_ONE_NOTE } from "./one";
import { SSC_HD_TWO_NOTE } from "./two";

export { SSC_HEIGHTS_DISTANCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/heights-distances/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-hd-` here and `sschd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/heights-distances.ts). Order matches `subtopicOrder`.
 */
export const SSC_HEIGHTS_DISTANCES_NOTES: Record<string, SubtopicNote> = {
  "ssc-hd-one": SSC_HD_ONE_NOTE,
  "ssc-hd-two": SSC_HD_TWO_NOTE,
};

export const SSC_HEIGHTS_DISTANCES_SLUGS = Object.keys(SSC_HEIGHTS_DISTANCES_NOTES);
