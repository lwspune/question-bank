import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_NS_TYPES_NOTE } from "./types";
import { SSC_NS_DIVISION_NOTE } from "./division";
import { SSC_NS_TESTS_NOTE } from "./tests";
import { SSC_NS_DIGITS_NOTE } from "./digits";
import { SSC_NS_FACTORS_NOTE } from "./factors";
import { SSC_NS_REMAINDERS_NOTE } from "./remainders";

export { SSC_NUMBER_SYSTEM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/number-system/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ns-` here and `sscns-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/number-system.ts). Order matches `subtopicOrder`.
 */
export const SSC_NUMBER_SYSTEM_NOTES: Record<string, SubtopicNote> = {
  "ssc-ns-types": SSC_NS_TYPES_NOTE,
  "ssc-ns-division": SSC_NS_DIVISION_NOTE,
  "ssc-ns-tests": SSC_NS_TESTS_NOTE,
  "ssc-ns-digits": SSC_NS_DIGITS_NOTE,
  "ssc-ns-factors": SSC_NS_FACTORS_NOTE,
  "ssc-ns-remainders": SSC_NS_REMAINDERS_NOTE,
};

export const SSC_NUMBER_SYSTEM_SLUGS = Object.keys(SSC_NUMBER_SYSTEM_NOTES);
