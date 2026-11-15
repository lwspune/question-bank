import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_LE_SYSTEMS_NOTE } from "./systems";
import { SSC2_LE_WORDS_NOTE } from "./words";

export { SSC2_LINEAR_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/linear-equations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-le-` here and `ssc2le-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/linear-equations.ts). Order matches `subtopicOrder`.
 */
export const SSC2_LINEAR_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-le-systems": SSC2_LE_SYSTEMS_NOTE,
  "ssc2-le-words": SSC2_LE_WORDS_NOTE,
};

export const SSC2_LINEAR_EQUATIONS_SLUGS = Object.keys(SSC2_LINEAR_EQUATIONS_NOTES);
