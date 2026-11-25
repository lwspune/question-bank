import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_CD_CONTINUITY_NOTE } from "./continuity";
import { CB_MA_CD_CHAIN_NOTE } from "./chain";
import { CB_MA_CD_IMPLICIT_NOTE } from "./implicit";
import { CB_MA_CD_EXPONENTIAL_NOTE } from "./exponential";
import { CB_MA_CD_LOGARITHMIC_NOTE } from "./logarithmic";
import { CB_MA_CD_PARAMETRIC_NOTE } from "./parametric";
import { CB_MA_CD_SECOND_NOTE } from "./second";

export { CB_MA_CD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/continuity-and-differentiability/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-cd-` here and `cbmcd-` on concept slugs.
 *
 * 7 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_CD_NOTES: Record<string, SubtopicNote> = {
  "cbm-cd-continuity": CB_MA_CD_CONTINUITY_NOTE,
  "cbm-cd-chain": CB_MA_CD_CHAIN_NOTE,
  "cbm-cd-implicit": CB_MA_CD_IMPLICIT_NOTE,
  "cbm-cd-exponential": CB_MA_CD_EXPONENTIAL_NOTE,
  "cbm-cd-logarithmic": CB_MA_CD_LOGARITHMIC_NOTE,
  "cbm-cd-parametric": CB_MA_CD_PARAMETRIC_NOTE,
  "cbm-cd-second": CB_MA_CD_SECOND_NOTE,
};

export const CB_MA_CD_SLUGS = Object.keys(CB_MA_CD_NOTES);
