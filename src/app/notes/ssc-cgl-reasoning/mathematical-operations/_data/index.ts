import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RMO_SUBSTITUTION_NOTE } from "./substitution";
import { SSC_RMO_PAIRS_NOTE } from "./pairs";
import { SSC_RMO_BALANCE_NOTE } from "./balance";
import { SSC_RMO_TWO_SIGNS_NOTE } from "./two-signs";
import { SSC_RMO_NUMBERS_NOTE } from "./numbers";
import { SSC_RMO_HIDDEN_NOTE } from "./hidden";

export { SSC_MATHEMATICAL_OPERATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/mathematical-operations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rmo-` here and `sscrmo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/mathematical-operations.ts). Order matches `subtopicOrder`.
 */
export const SSC_MATHEMATICAL_OPERATIONS_NOTES: Record<string, SubtopicNote> = {
  "ssc-rmo-substitution": SSC_RMO_SUBSTITUTION_NOTE,
  "ssc-rmo-pairs": SSC_RMO_PAIRS_NOTE,
  "ssc-rmo-balance": SSC_RMO_BALANCE_NOTE,
  "ssc-rmo-two-signs": SSC_RMO_TWO_SIGNS_NOTE,
  "ssc-rmo-numbers": SSC_RMO_NUMBERS_NOTE,
  "ssc-rmo-hidden": SSC_RMO_HIDDEN_NOTE,
};

export const SSC_MATHEMATICAL_OPERATIONS_SLUGS = Object.keys(SSC_MATHEMATICAL_OPERATIONS_NOTES);
