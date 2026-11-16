import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_PP_BASICS_NOTE } from "./basics";
import { SSC2_PP_SUCCESSIVE_NOTE } from "./successive";
import { SSC2_PP_PROBLEMS_NOTE } from "./problems";
import { SSC2_PP_PROFIT_NOTE } from "./profit";
import { SSC2_PP_DISCOUNT_NOTE } from "./discount";

export { SSC2_PERCENTAGE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/percentage/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-pp-` here and `ssc2pp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/percentage.ts). Order matches `subtopicOrder`.
 */
export const SSC2_PERCENTAGE_NOTES: Record<string, SubtopicNote> = {
  "ssc2-pp-basics": SSC2_PP_BASICS_NOTE,
  "ssc2-pp-successive": SSC2_PP_SUCCESSIVE_NOTE,
  "ssc2-pp-problems": SSC2_PP_PROBLEMS_NOTE,
  "ssc2-pp-profit": SSC2_PP_PROFIT_NOTE,
  "ssc2-pp-discount": SSC2_PP_DISCOUNT_NOTE,
};

export const SSC2_PERCENTAGE_SLUGS = Object.keys(SSC2_PERCENTAGE_NOTES);
