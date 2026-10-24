import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RSE_POSITIONS_NOTE } from "./positions";
import { SSC_RSE_CLUSTERS_NOTE } from "./clusters";
import { SSC_RSE_BLANKS_NOTE } from "./blanks";
import { SSC_RSE_DIFFERENCES_NOTE } from "./differences";
import { SSC_RSE_MULTIPLY_NOTE } from "./multiply";
import { SSC_RSE_POWERS_NOTE } from "./powers";
import { SSC_RSE_ALPHANUMERIC_NOTE } from "./alphanumeric";
import { SSC_RSE_WRONG_NOTE } from "./wrong";

export { SSC_SERIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/series/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rse-` here and `sscrse-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/series.ts). Order matches `subtopicOrder`.
 */
export const SSC_SERIES_NOTES: Record<string, SubtopicNote> = {
  "ssc-rse-positions": SSC_RSE_POSITIONS_NOTE,
  "ssc-rse-clusters": SSC_RSE_CLUSTERS_NOTE,
  "ssc-rse-blanks": SSC_RSE_BLANKS_NOTE,
  "ssc-rse-differences": SSC_RSE_DIFFERENCES_NOTE,
  "ssc-rse-multiply": SSC_RSE_MULTIPLY_NOTE,
  "ssc-rse-powers": SSC_RSE_POWERS_NOTE,
  "ssc-rse-alphanumeric": SSC_RSE_ALPHANUMERIC_NOTE,
  "ssc-rse-wrong": SSC_RSE_WRONG_NOTE,
};

export const SSC_SERIES_SLUGS = Object.keys(SSC_SERIES_NOTES);
