import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_IN_SIMPLE_NOTE } from "./simple";
import { SSC2_IN_COMPOUND_NOTE } from "./compound";

export { SSC2_INTEREST_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/interest/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-in-` here and `ssc2in-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/interest.ts). Order matches `subtopicOrder`.
 */
export const SSC2_INTEREST_NOTES: Record<string, SubtopicNote> = {
  "ssc2-in-simple": SSC2_IN_SIMPLE_NOTE,
  "ssc2-in-compound": SSC2_IN_COMPOUND_NOTE,
};

export const SSC2_INTEREST_SLUGS = Object.keys(SSC2_INTEREST_NOTES);
