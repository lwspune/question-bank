import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_IT_BRANCHES_NOTE } from "./branches";
import { CB_MA_IT_EVALUATE_NOTE } from "./evaluate";
import { CB_MA_IT_PROPERTIES_NOTE } from "./properties";

export { CB_MA_IT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/inverse-trigonometric-functions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-it-` here and `cbmit-` on concept slugs.
 *
 * 3 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_IT_NOTES: Record<string, SubtopicNote> = {
  "cbm-it-branches": CB_MA_IT_BRANCHES_NOTE,
  "cbm-it-evaluate": CB_MA_IT_EVALUATE_NOTE,
  "cbm-it-properties": CB_MA_IT_PROPERTIES_NOTE,
};

export const CB_MA_IT_SLUGS = Object.keys(CB_MA_IT_NOTES);
