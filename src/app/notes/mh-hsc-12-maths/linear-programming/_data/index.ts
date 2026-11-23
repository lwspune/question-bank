import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_LR_INEQUATIONS_NOTE } from "./inequations";
import { HSC_MA_LR_FORMULATION_NOTE } from "./formulation";
import { HSC_MA_LR_GRAPHICAL_NOTE } from "./graphical";

export { HSC_MA_LR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/linear-programming/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-lr-` here and `hscmlr-` on concept slugs.
 *
 * 3 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_LR_NOTES: Record<string, SubtopicNote> = {
  "hscm-lr-inequations": HSC_MA_LR_INEQUATIONS_NOTE,
  "hscm-lr-formulation": HSC_MA_LR_FORMULATION_NOTE,
  "hscm-lr-graphical": HSC_MA_LR_GRAPHICAL_NOTE,
};

export const HSC_MA_LR_SLUGS = Object.keys(HSC_MA_LR_NOTES);
