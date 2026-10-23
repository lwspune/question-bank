import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RVD_LOGICAL_NOTE } from "./logical";
import { SSC_RVD_COUNTING_NOTE } from "./counting";

export { SSC_VENN_DIAGRAMS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/venn-diagrams/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rvd-` here and `sscrvd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/venn-diagrams.ts). Order matches `subtopicOrder`.
 */
export const SSC_VENN_DIAGRAMS_NOTES: Record<string, SubtopicNote> = {
  "ssc-rvd-logical": SSC_RVD_LOGICAL_NOTE,
  "ssc-rvd-counting": SSC_RVD_COUNTING_NOTE,
};

export const SSC_VENN_DIAGRAMS_SLUGS = Object.keys(SSC_VENN_DIAGRAMS_NOTES);
