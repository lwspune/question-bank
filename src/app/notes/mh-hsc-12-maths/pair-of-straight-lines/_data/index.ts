import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_PS_COMBINED_NOTE } from "./combined";
import { HSC_MA_PS_ANGLE_NOTE } from "./angle";
import { HSC_MA_PS_GENERAL_NOTE } from "./general";
import { HSC_MA_PS_BISECTORS_NOTE } from "./bisectors";

export { HSC_MA_PS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/pair-of-straight-lines/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-ps-` here and `hscmps-` on concept slugs.
 *
 * 4 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_PS_NOTES: Record<string, SubtopicNote> = {
  "hscm-ps-combined": HSC_MA_PS_COMBINED_NOTE,
  "hscm-ps-angle": HSC_MA_PS_ANGLE_NOTE,
  "hscm-ps-general": HSC_MA_PS_GENERAL_NOTE,
  "hscm-ps-bisectors": HSC_MA_PS_BISECTORS_NOTE,
};

export const HSC_MA_PS_SLUGS = Object.keys(HSC_MA_PS_NOTES);
