import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_HD_ONE_NOTE } from "./one";
import { SSC2_HD_TWO_NOTE } from "./two";

export { SSC2_HEIGHTS_DISTANCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/heights-distances/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-hd-` here and `ssc2hd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/heights-distances.ts). Order matches `subtopicOrder`.
 */
export const SSC2_HEIGHTS_DISTANCES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-hd-one": SSC2_HD_ONE_NOTE,
  "ssc2-hd-two": SSC2_HD_TWO_NOTE,
};

export const SSC2_HEIGHTS_DISTANCES_SLUGS = Object.keys(SSC2_HEIGHTS_DISTANCES_NOTES);
