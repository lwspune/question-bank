import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_PO_VALUES_NOTE } from "./values";

export { SSC_POLYNOMIALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/polynomials/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-po-` here and `sscpo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/polynomials.ts). Order matches `subtopicOrder`.
 */
export const SSC_POLYNOMIALS_NOTES: Record<string, SubtopicNote> = {
  "ssc-po-values": SSC_PO_VALUES_NOTE,
};

export const SSC_POLYNOMIALS_SLUGS = Object.keys(SSC_POLYNOMIALS_NOTES);
