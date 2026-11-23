import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_DF_COMPOSITE_NOTE } from "./composite";
import { HSC_MA_DF_INVERSE_NOTE } from "./inverse";
import { HSC_MA_DF_INVTRIG_NOTE } from "./invtrig";
import { HSC_MA_DF_LOGARITHMIC_NOTE } from "./logarithmic";
import { HSC_MA_DF_IMPLICIT_NOTE } from "./implicit";
import { HSC_MA_DF_PARAMETRIC_NOTE } from "./parametric";
import { HSC_MA_DF_WRT_NOTE } from "./wrt";
import { HSC_MA_DF_HIGHER_NOTE } from "./higher";

export { HSC_MA_DF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/differentiation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-df-` here and `hscmdf-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_DF_NOTES: Record<string, SubtopicNote> = {
  "hscm-df-composite": HSC_MA_DF_COMPOSITE_NOTE,
  "hscm-df-inverse": HSC_MA_DF_INVERSE_NOTE,
  "hscm-df-invtrig": HSC_MA_DF_INVTRIG_NOTE,
  "hscm-df-logarithmic": HSC_MA_DF_LOGARITHMIC_NOTE,
  "hscm-df-implicit": HSC_MA_DF_IMPLICIT_NOTE,
  "hscm-df-parametric": HSC_MA_DF_PARAMETRIC_NOTE,
  "hscm-df-wrt": HSC_MA_DF_WRT_NOTE,
  "hscm-df-higher": HSC_MA_DF_HIGHER_NOTE,
};

export const HSC_MA_DF_SLUGS = Object.keys(HSC_MA_DF_NOTES);
