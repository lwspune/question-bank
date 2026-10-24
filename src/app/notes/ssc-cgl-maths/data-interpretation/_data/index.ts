import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_DI_READING_NOTE } from "./reading";
import { SSC_DI_AVERAGES_NOTE } from "./averages";
import { SSC_DI_RATIOS_NOTE } from "./ratios";
import { SSC_DI_PERCENT_NOTE } from "./percent";
import { SSC_DI_CHANGE_NOTE } from "./change";
import { SSC_DI_SHARES_NOTE } from "./shares";
import { SSC_DI_TWOSTEP_NOTE } from "./twostep";

export { SSC_DATA_INTERPRETATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/data-interpretation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-di-` here and `sscdi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/data-interpretation.ts). Order matches `subtopicOrder`.
 */
export const SSC_DATA_INTERPRETATION_NOTES: Record<string, SubtopicNote> = {
  "ssc-di-reading": SSC_DI_READING_NOTE,
  "ssc-di-averages": SSC_DI_AVERAGES_NOTE,
  "ssc-di-ratios": SSC_DI_RATIOS_NOTE,
  "ssc-di-percent": SSC_DI_PERCENT_NOTE,
  "ssc-di-change": SSC_DI_CHANGE_NOTE,
  "ssc-di-shares": SSC_DI_SHARES_NOTE,
  "ssc-di-twostep": SSC_DI_TWOSTEP_NOTE,
};

export const SSC_DATA_INTERPRETATION_SLUGS = Object.keys(SSC_DATA_INTERPRETATION_NOTES);
