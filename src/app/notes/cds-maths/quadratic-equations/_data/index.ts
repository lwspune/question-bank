import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_QE_FORMING_NOTE } from "./forming";
import { CDS_QE_SYMMETRIC_NOTE } from "./symmetric";
import { CDS_QE_RELATION_NOTE } from "./relation";
import { CDS_QE_NATURE_NOTE } from "./nature";
import { CDS_QE_SIGNS_NOTE } from "./signs";
import { CDS_QE_COMMON_NOTE } from "./common";
import { CDS_QE_MAX_MIN_NOTE } from "./max-min";
import { CDS_QE_REDUCIBLE_NOTE } from "./reducible";
import { CDS_QE_WORD_NOTE } from "./word";

export { CDS_QUADRATIC_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/quadratic-equations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-qe-` here and `cdsqe-` on concept slugs.
 *
 * The nine pages were cut by reading all 89 solutions (scripts/cds-maths/reshape/quadratic-equations.ts):
 * the 45-q "Vieta's Relations" bucket held three techniques, each now on its own page.
 * Order matches `subtopicOrder`.
 */
export const CDS_QUADRATIC_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "cds-qe-forming": CDS_QE_FORMING_NOTE,
  "cds-qe-symmetric": CDS_QE_SYMMETRIC_NOTE,
  "cds-qe-relation": CDS_QE_RELATION_NOTE,
  "cds-qe-nature": CDS_QE_NATURE_NOTE,
  "cds-qe-signs": CDS_QE_SIGNS_NOTE,
  "cds-qe-common": CDS_QE_COMMON_NOTE,
  "cds-qe-max-min": CDS_QE_MAX_MIN_NOTE,
  "cds-qe-reducible": CDS_QE_REDUCIBLE_NOTE,
  "cds-qe-word": CDS_QE_WORD_NOTE,
};

export const CDS_QUADRATIC_EQUATIONS_SLUGS = Object.keys(CDS_QUADRATIC_EQUATIONS_NOTES);
