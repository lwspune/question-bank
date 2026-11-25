import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_DE_ORDER_NOTE } from "./order";
import { CB_MA_DE_SOLUTIONS_NOTE } from "./solutions";
import { CB_MA_DE_SEPARABLE_NOTE } from "./separable";
import { CB_MA_DE_HOMOGENEOUS_NOTE } from "./homogeneous";
import { CB_MA_DE_LINEAR_NOTE } from "./linear";

export { CB_MA_DE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/differential-equations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-de-` here and `cbmde-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_DE_NOTES: Record<string, SubtopicNote> = {
  "cbm-de-order": CB_MA_DE_ORDER_NOTE,
  "cbm-de-solutions": CB_MA_DE_SOLUTIONS_NOTE,
  "cbm-de-separable": CB_MA_DE_SEPARABLE_NOTE,
  "cbm-de-homogeneous": CB_MA_DE_HOMOGENEOUS_NOTE,
  "cbm-de-linear": CB_MA_DE_LINEAR_NOTE,
};

export const CB_MA_DE_SLUGS = Object.keys(CB_MA_DE_NOTES);
