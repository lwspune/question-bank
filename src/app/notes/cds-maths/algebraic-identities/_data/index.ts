import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_AI_BINOMIAL_NOTE } from "./binomial";
import { CDS_AI_RECIPROCAL_NOTE } from "./reciprocal";
import { CDS_AI_THREE_VARIABLES_NOTE } from "./three-variables";
import { CDS_AI_CUBE_IDENTITY_NOTE } from "./cube-identity";
import { CDS_AI_SQUARES_NOTE } from "./squares";
import { CDS_AI_CONDITIONAL_NOTE } from "./conditional";
import { CDS_AI_RATIONAL_NOTE } from "./rational";
import { CDS_AI_CYCLIC_NOTE } from "./cyclic";

export { CDS_ALGEBRAIC_IDENTITIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/algebraic-identities/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-ai-` here and `cdsai-` on concept slugs.
 *
 * The eight pages were cut by reading all 98 solutions (scripts/cds-maths/reshape/algebraic-identities.ts):
 * the 44-q "Conditional Identities" catch-all held four techniques, each now on the page that teaches it.
 * Order matches `subtopicOrder`.
 */
export const CDS_ALGEBRAIC_IDENTITIES_NOTES: Record<string, SubtopicNote> = {
  "cds-ai-binomial": CDS_AI_BINOMIAL_NOTE,
  "cds-ai-reciprocal": CDS_AI_RECIPROCAL_NOTE,
  "cds-ai-three-variables": CDS_AI_THREE_VARIABLES_NOTE,
  "cds-ai-cube-identity": CDS_AI_CUBE_IDENTITY_NOTE,
  "cds-ai-squares": CDS_AI_SQUARES_NOTE,
  "cds-ai-conditional": CDS_AI_CONDITIONAL_NOTE,
  "cds-ai-rational": CDS_AI_RATIONAL_NOTE,
  "cds-ai-cyclic": CDS_AI_CYCLIC_NOTE,
};

export const CDS_ALGEBRAIC_IDENTITIES_SLUGS = Object.keys(CDS_ALGEBRAIC_IDENTITIES_NOTES);
