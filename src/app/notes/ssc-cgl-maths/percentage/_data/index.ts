import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_PP_BASICS_NOTE } from "./basics";
import { SSC_PP_SUCCESSIVE_NOTE } from "./successive";
import { SSC_PP_PROBLEMS_NOTE } from "./problems";
import { SSC_PP_PROFIT_NOTE } from "./profit";
import { SSC_PP_DISCOUNT_NOTE } from "./discount";
import { SSC_PP_OFFERS_NOTE } from "./offers";
import { SSC_PP_WEIGHTS_NOTE } from "./weights";

export { SSC_PERCENTAGE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/percentage/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-pp-` here and `sscpp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/percentage.ts). Order matches `subtopicOrder`.
 */
export const SSC_PERCENTAGE_NOTES: Record<string, SubtopicNote> = {
  "ssc-pp-basics": SSC_PP_BASICS_NOTE,
  "ssc-pp-successive": SSC_PP_SUCCESSIVE_NOTE,
  "ssc-pp-problems": SSC_PP_PROBLEMS_NOTE,
  "ssc-pp-profit": SSC_PP_PROFIT_NOTE,
  "ssc-pp-discount": SSC_PP_DISCOUNT_NOTE,
  "ssc-pp-offers": SSC_PP_OFFERS_NOTE,
  "ssc-pp-weights": SSC_PP_WEIGHTS_NOTE,
};

export const SSC_PERCENTAGE_SLUGS = Object.keys(SSC_PERCENTAGE_NOTES);
