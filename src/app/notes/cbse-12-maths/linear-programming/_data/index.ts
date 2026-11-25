import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_LP_GRAPHICAL_NOTE } from "./graphical";

export { CB_MA_LP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/linear-programming/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-lp-` here and `cbmlp-` on concept slugs.
 *
 * 1 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_LP_NOTES: Record<string, SubtopicNote> = {
  "cbm-lp-graphical": CB_MA_LP_GRAPHICAL_NOTE,
};

export const CB_MA_LP_SLUGS = Object.keys(CB_MA_LP_NOTES);
