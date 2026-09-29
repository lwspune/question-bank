import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PP_PERCENT_NOTE } from "./percent";
import { CDS_PP_SUCCESSIVE_NOTE } from "./successive";
import { CDS_PP_PROFIT_NOTE } from "./profit";
import { CDS_PP_DISCOUNT_NOTE } from "./discount";

export { CDS_PERCENTAGE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/percentage/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-pp-` here and `cdspp-` on concept slugs.
 *
 * The four pages were cut by reading all 50 solutions (scripts/cds-maths/reshape/percentage.ts):
 * "Percentage" (26) split into percentages of a quantity and successive change.
 * Order matches `subtopicOrder`.
 */
export const CDS_PERCENTAGE_NOTES: Record<string, SubtopicNote> = {
  "cds-pp-percent": CDS_PP_PERCENT_NOTE,
  "cds-pp-successive": CDS_PP_SUCCESSIVE_NOTE,
  "cds-pp-profit": CDS_PP_PROFIT_NOTE,
  "cds-pp-discount": CDS_PP_DISCOUNT_NOTE,
};

export const CDS_PERCENTAGE_SLUGS = Object.keys(CDS_PERCENTAGE_NOTES);
