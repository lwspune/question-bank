import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_IQ_SOLVE_NOTE } from "./solve";
import { CDS_IQ_SIGNS_NOTE } from "./signs";

export { CDS_INEQUALITIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/inequalities/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-iq-` here and `cdsiq-` on concept slugs.
 *
 * Two pages, cut by reading all 13 solutions (scripts/cds-maths/reshape/inequalities.ts):
 * solving inequalities, and reasoning with signs.
 * Order matches `subtopicOrder`.
 */
export const CDS_INEQUALITIES_NOTES: Record<string, SubtopicNote> = {
  "cds-iq-solve": CDS_IQ_SOLVE_NOTE,
  "cds-iq-signs": CDS_IQ_SIGNS_NOTE,
};

export const CDS_INEQUALITIES_SLUGS = Object.keys(CDS_INEQUALITIES_NOTES);
