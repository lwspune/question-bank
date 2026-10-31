import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_PCO_MAKING_NOTE } from "./making";
import { SSC_PCO_AMENDMENTS_NOTE } from "./amendments";
import { SSC_PCO_RELATIONS_NOTE } from "./relations";
import { SSC_PCO_FINANCE_NOTE } from "./finance";
import { SSC_PCO_EMERGENCY_NOTE } from "./emergency";

export { SSC_CONSTITUTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-polity/constitution/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-pco-` here and `sscpco-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/constitution.ts). Order matches `subtopicOrder`.
 */
export const SSC_CONSTITUTION_NOTES: Record<string, SubtopicNote> = {
  "ssc-pco-making": SSC_PCO_MAKING_NOTE,
  "ssc-pco-amendments": SSC_PCO_AMENDMENTS_NOTE,
  "ssc-pco-relations": SSC_PCO_RELATIONS_NOTE,
  "ssc-pco-finance": SSC_PCO_FINANCE_NOTE,
  "ssc-pco-emergency": SSC_PCO_EMERGENCY_NOTE,
};

export const SSC_CONSTITUTION_SLUGS = Object.keys(SSC_CONSTITUTION_NOTES);
