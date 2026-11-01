import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_GOC_OCEANS_NOTE } from "./oceans";

export { SSC_OCEANOGRAPHY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-geography/oceanography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-goc-` here and `sscgoc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/oceanography.ts). Order matches `subtopicOrder`.
 */
export const SSC_OCEANOGRAPHY_NOTES: Record<string, SubtopicNote> = {
  "ssc-goc-oceans": SSC_GOC_OCEANS_NOTE,
};

export const SSC_OCEANOGRAPHY_SLUGS = Object.keys(SSC_OCEANOGRAPHY_NOTES);
