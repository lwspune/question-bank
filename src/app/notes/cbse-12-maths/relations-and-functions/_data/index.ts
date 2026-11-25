import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_RF_RELATIONS_NOTE } from "./relations";
import { CB_MA_RF_EQUIVALENCE_NOTE } from "./equivalence";
import { CB_MA_RF_FUNCTIONS_NOTE } from "./functions";
import { CB_MA_RF_COMPOSITION_NOTE } from "./composition";

export { CB_MA_RF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/relations-and-functions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-rf-` here and `cbmrf-` on concept slugs.
 *
 * 4 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_RF_NOTES: Record<string, SubtopicNote> = {
  "cbm-rf-relations": CB_MA_RF_RELATIONS_NOTE,
  "cbm-rf-equivalence": CB_MA_RF_EQUIVALENCE_NOTE,
  "cbm-rf-functions": CB_MA_RF_FUNCTIONS_NOTE,
  "cbm-rf-composition": CB_MA_RF_COMPOSITION_NOTE,
};

export const CB_MA_RF_SLUGS = Object.keys(CB_MA_RF_NOTES);
