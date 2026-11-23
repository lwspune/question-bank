import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_VE_TYPES_NOTE } from "./types";
import { HSC_MA_VE_SECTION_NOTE } from "./section";
import { HSC_MA_VE_DOT_NOTE } from "./dot";
import { HSC_MA_VE_CROSS_NOTE } from "./cross";
import { HSC_MA_VE_TRIPLE_NOTE } from "./triple";

export { HSC_MA_VE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/vectors/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-ve-` here and `hscmve-` on concept slugs.
 *
 * 5 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_VE_NOTES: Record<string, SubtopicNote> = {
  "hscm-ve-types": HSC_MA_VE_TYPES_NOTE,
  "hscm-ve-section": HSC_MA_VE_SECTION_NOTE,
  "hscm-ve-dot": HSC_MA_VE_DOT_NOTE,
  "hscm-ve-cross": HSC_MA_VE_CROSS_NOTE,
  "hscm-ve-triple": HSC_MA_VE_TRIPLE_NOTE,
};

export const HSC_MA_VE_SLUGS = Object.keys(HSC_MA_VE_NOTES);
