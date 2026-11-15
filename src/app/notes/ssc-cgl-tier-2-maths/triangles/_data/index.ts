import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_TR_ANGLES_NOTE } from "./angles";
import { SSC2_TR_SIDES_NOTE } from "./sides";
import { SSC2_TR_SIMILARITY_NOTE } from "./similarity";
import { SSC2_TR_CENTRES_NOTE } from "./centres";

export { SSC2_TRIANGLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/triangles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-tr-` here and `ssc2tr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/triangles.ts). Order matches `subtopicOrder`.
 */
export const SSC2_TRIANGLES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-tr-angles": SSC2_TR_ANGLES_NOTE,
  "ssc2-tr-sides": SSC2_TR_SIDES_NOTE,
  "ssc2-tr-similarity": SSC2_TR_SIMILARITY_NOTE,
  "ssc2-tr-centres": SSC2_TR_CENTRES_NOTE,
};

export const SSC2_TRIANGLES_SLUGS = Object.keys(SSC2_TRIANGLES_NOTES);
