import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_II_ELEMENTARY_NOTE } from "./elementary";
import { HSC_MA_II_SUBSTITUTION_NOTE } from "./substitution";
import { HSC_MA_II_TRIGONOMETRIC_NOTE } from "./trigonometric";
import { HSC_MA_II_SPECIAL_NOTE } from "./special";
import { HSC_MA_II_NUMERATOR_NOTE } from "./numerator";
import { HSC_MA_II_PARTS_NOTE } from "./parts";
import { HSC_MA_II_FRACTIONS_NOTE } from "./fractions";

export { HSC_MA_II_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/indefinite-integration/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-ii-` here and `hscmii-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_II_NOTES: Record<string, SubtopicNote> = {
  "hscm-ii-elementary": HSC_MA_II_ELEMENTARY_NOTE,
  "hscm-ii-substitution": HSC_MA_II_SUBSTITUTION_NOTE,
  "hscm-ii-trigonometric": HSC_MA_II_TRIGONOMETRIC_NOTE,
  "hscm-ii-special": HSC_MA_II_SPECIAL_NOTE,
  "hscm-ii-numerator": HSC_MA_II_NUMERATOR_NOTE,
  "hscm-ii-parts": HSC_MA_II_PARTS_NOTE,
  "hscm-ii-fractions": HSC_MA_II_FRACTIONS_NOTE,
};

export const HSC_MA_II_SLUGS = Object.keys(HSC_MA_II_NOTES);
