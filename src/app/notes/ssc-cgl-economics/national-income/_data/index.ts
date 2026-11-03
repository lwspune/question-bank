import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_XNI_INCOME_NOTE } from "./income";
import { SSC_XNI_POVERTY_NOTE } from "./poverty";
import { SSC_XNI_INDUSTRY_NOTE } from "./industry";
import { SSC_XNI_INDICES_NOTE } from "./indices";

export { SSC_NATIONAL_INCOME_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-economics/national-income/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-xni-` here and `sscxni-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/national-income.ts). Order matches `subtopicOrder`.
 */
export const SSC_NATIONAL_INCOME_NOTES: Record<string, SubtopicNote> = {
  "ssc-xni-income": SSC_XNI_INCOME_NOTE,
  "ssc-xni-poverty": SSC_XNI_POVERTY_NOTE,
  "ssc-xni-industry": SSC_XNI_INDUSTRY_NOTE,
  "ssc-xni-indices": SSC_XNI_INDICES_NOTE,
};

export const SSC_NATIONAL_INCOME_SLUGS = Object.keys(SSC_NATIONAL_INCOME_NOTES);
