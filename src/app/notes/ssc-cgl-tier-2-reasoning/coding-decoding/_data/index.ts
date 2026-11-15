import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RCD_CODES_NOTE } from "./codes";

export { SSC2_CODING_DECODING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/coding-decoding/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-rcd-` here and `ssc2rcd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/coding-decoding.ts). Order matches `subtopicOrder`.
 */
export const SSC2_CODING_DECODING_NOTES: Record<string, SubtopicNote> = {
  "ssc2-rcd-codes": SSC2_RCD_CODES_NOTE,
};

export const SSC2_CODING_DECODING_SLUGS = Object.keys(SSC2_CODING_DECODING_NOTES);
