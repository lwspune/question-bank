import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RMO_OPS_NOTE } from "./ops";

export { SSC2_MATHEMATICAL_OPERATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/mathematical-operations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-rmo-` here and `ssc2rmo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/mathematical-operations.ts). Order matches `subtopicOrder`.
 */
export const SSC2_MATHEMATICAL_OPERATIONS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-rmo-ops": SSC2_RMO_OPS_NOTE,
};

export const SSC2_MATHEMATICAL_OPERATIONS_SLUGS = Object.keys(SSC2_MATHEMATICAL_OPERATIONS_NOTES);
