import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_SI_BODMAS_NOTE } from "./bodmas";
import { SSC2_SI_FRACTIONS_NOTE } from "./fractions";
import { SSC2_SI_INDICES_NOTE } from "./indices";
import { SSC2_SI_SURDS_NOTE } from "./surds";

export { SSC2_SURDS_INDICES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/surds-indices/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-si-` here and `ssc2si-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/surds-indices.ts). Order matches `subtopicOrder`.
 */
export const SSC2_SURDS_INDICES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-si-bodmas": SSC2_SI_BODMAS_NOTE,
  "ssc2-si-fractions": SSC2_SI_FRACTIONS_NOTE,
  "ssc2-si-indices": SSC2_SI_INDICES_NOTE,
  "ssc2-si-surds": SSC2_SI_SURDS_NOTE,
};

export const SSC2_SURDS_INDICES_SLUGS = Object.keys(SSC2_SURDS_INDICES_NOTES);
