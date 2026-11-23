import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_ML_CONNECTIVES_NOTE } from "./connectives";
import { HSC_MA_ML_TABLES_NOTE } from "./tables";
import { HSC_MA_ML_TAUTOLOGY_NOTE } from "./tautology";
import { HSC_MA_ML_NEGATION_NOTE } from "./negation";
import { HSC_MA_ML_CONVERSE_NOTE } from "./converse";
import { HSC_MA_ML_ALGEBRA_NOTE } from "./algebra";
import { HSC_MA_ML_SWITCHING_NOTE } from "./switching";

export { HSC_MA_ML_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/mathematical-logic/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-ml-` here and `hscmml-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_ML_NOTES: Record<string, SubtopicNote> = {
  "hscm-ml-connectives": HSC_MA_ML_CONNECTIVES_NOTE,
  "hscm-ml-tables": HSC_MA_ML_TABLES_NOTE,
  "hscm-ml-tautology": HSC_MA_ML_TAUTOLOGY_NOTE,
  "hscm-ml-negation": HSC_MA_ML_NEGATION_NOTE,
  "hscm-ml-converse": HSC_MA_ML_CONVERSE_NOTE,
  "hscm-ml-algebra": HSC_MA_ML_ALGEBRA_NOTE,
  "hscm-ml-switching": HSC_MA_ML_SWITCHING_NOTE,
};

export const HSC_MA_ML_SLUGS = Object.keys(HSC_MA_ML_NOTES);
