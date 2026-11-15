import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_EID_IDIOMS_NOTE } from "./idioms";

export { SSC2_IDIOMS_AND_PHRASES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-english/idioms-and-phrases/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-eid-` here and `ssc2eid-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/idioms-and-phrases.ts). Order matches `subtopicOrder`.
 */
export const SSC2_IDIOMS_AND_PHRASES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-eid-idioms": SSC2_EID_IDIOMS_NOTE,
};

export const SSC2_IDIOMS_AND_PHRASES_SLUGS = Object.keys(SSC2_IDIOMS_AND_PHRASES_NOTES);
