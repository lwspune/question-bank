import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_SI_FRACTIONS_NOTE } from "./fractions";
import { CDS_SI_INDICES_NOTE } from "./indices";
import { CDS_SI_EXPONENTIAL_NOTE } from "./exponential";
import { CDS_SI_ROOTS_NOTE } from "./roots";
import { CDS_SI_RATIONALISATION_NOTE } from "./rationalisation";
import { CDS_SI_SURD_EQUATIONS_NOTE } from "./surd-equations";
import { CDS_SI_SIMPLIFICATION_NOTE } from "./simplification";
import { CDS_SI_NESTED_NOTE } from "./nested";

export { CDS_SURDS_INDICES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/surds-indices/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-si-` here and `cdssi-` on concept slugs.
 *
 * The eight pages were cut by reading all 82 solutions (scripts/cds-maths/reshape/surds-indices.ts):
 * "Surds and Rationalisation" (31) and "Laws of Indices" (21) each held several techniques.
 * Order matches `subtopicOrder`.
 */
export const CDS_SURDS_INDICES_NOTES: Record<string, SubtopicNote> = {
  "cds-si-fractions": CDS_SI_FRACTIONS_NOTE,
  "cds-si-indices": CDS_SI_INDICES_NOTE,
  "cds-si-exponential": CDS_SI_EXPONENTIAL_NOTE,
  "cds-si-roots": CDS_SI_ROOTS_NOTE,
  "cds-si-rationalisation": CDS_SI_RATIONALISATION_NOTE,
  "cds-si-surd-equations": CDS_SI_SURD_EQUATIONS_NOTE,
  "cds-si-simplification": CDS_SI_SIMPLIFICATION_NOTE,
  "cds-si-nested": CDS_SI_NESTED_NOTE,
};

export const CDS_SURDS_INDICES_SLUGS = Object.keys(CDS_SURDS_INDICES_NOTES);
