import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_SI_BODMAS_NOTE } from "./bodmas";
import { SSC_SI_FRACTIONS_NOTE } from "./fractions";
import { SSC_SI_MISSING_NOTE } from "./missing";
import { SSC_SI_INDICES_NOTE } from "./indices";
import { SSC_SI_SHORTCUTS_NOTE } from "./shortcuts";
import { SSC_SI_SURDS_NOTE } from "./surds";
import { SSC_SI_ROOTS_NOTE } from "./roots";

export { SSC_SURDS_INDICES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/surds-indices/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-si-` here and `sscsi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/surds-indices.ts). Order matches `subtopicOrder`.
 */
export const SSC_SURDS_INDICES_NOTES: Record<string, SubtopicNote> = {
  "ssc-si-bodmas": SSC_SI_BODMAS_NOTE,
  "ssc-si-fractions": SSC_SI_FRACTIONS_NOTE,
  "ssc-si-missing": SSC_SI_MISSING_NOTE,
  "ssc-si-indices": SSC_SI_INDICES_NOTE,
  "ssc-si-shortcuts": SSC_SI_SHORTCUTS_NOTE,
  "ssc-si-surds": SSC_SI_SURDS_NOTE,
  "ssc-si-roots": SSC_SI_ROOTS_NOTE,
};

export const SSC_SURDS_INDICES_SLUGS = Object.keys(SSC_SURDS_INDICES_NOTES);
