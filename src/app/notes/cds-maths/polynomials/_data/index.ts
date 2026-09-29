import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PO_DEGREE_NOTE } from "./degree";
import { CDS_PO_REMAINDER_NOTE } from "./remainder";
import { CDS_PO_FACTOR_THEOREM_NOTE } from "./factor-theorem";
import { CDS_PO_FACTORISATION_NOTE } from "./factorisation";
import { CDS_PO_HCF_LCM_NOTE } from "./hcf-lcm";

export { CDS_POLYNOMIALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/polynomials/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-po-` here and `cdspo-` on concept slugs.
 *
 * The five pages were cut by reading all 79 solutions (scripts/cds-maths/reshape/polynomials.ts):
 * the remainder and factor theorems are split, and the small degree/zeros buckets are merged.
 * Order matches `subtopicOrder`.
 */
export const CDS_POLYNOMIALS_NOTES: Record<string, SubtopicNote> = {
  "cds-po-degree": CDS_PO_DEGREE_NOTE,
  "cds-po-remainder": CDS_PO_REMAINDER_NOTE,
  "cds-po-factor-theorem": CDS_PO_FACTOR_THEOREM_NOTE,
  "cds-po-factorisation": CDS_PO_FACTORISATION_NOTE,
  "cds-po-hcf-lcm": CDS_PO_HCF_LCM_NOTE,
};

export const CDS_POLYNOMIALS_SLUGS = Object.keys(CDS_POLYNOMIALS_NOTES);
