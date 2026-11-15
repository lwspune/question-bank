import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RSE_SERIES_NOTE } from "./series";

export { SSC2_SERIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/series/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-rse-` here and `ssc2rse-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/series.ts). Order matches `subtopicOrder`.
 */
export const SSC2_SERIES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-rse-series": SSC2_RSE_SERIES_NOTE,
};

export const SSC2_SERIES_SLUGS = Object.keys(SSC2_SERIES_NOTES);
