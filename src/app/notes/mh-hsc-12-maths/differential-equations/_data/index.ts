import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_DE_ORDER_NOTE } from "./order";
import { HSC_MA_DE_FORMATION_NOTE } from "./formation";
import { HSC_MA_DE_SOLUTION_NOTE } from "./solution";
import { HSC_MA_DE_APPLICATIONS_NOTE } from "./applications";

export { HSC_MA_DE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/differential-equations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-de-` here and `hscmde-` on concept slugs.
 *
 * 4 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_DE_NOTES: Record<string, SubtopicNote> = {
  "hscm-de-order": HSC_MA_DE_ORDER_NOTE,
  "hscm-de-formation": HSC_MA_DE_FORMATION_NOTE,
  "hscm-de-solution": HSC_MA_DE_SOLUTION_NOTE,
  "hscm-de-applications": HSC_MA_DE_APPLICATIONS_NOTE,
};

export const HSC_MA_DE_SLUGS = Object.keys(HSC_MA_DE_NOTES);
