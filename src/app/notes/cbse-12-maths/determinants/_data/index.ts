import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_DT_EXPAND_NOTE } from "./expand";
import { CB_MA_DT_AREA_NOTE } from "./area";
import { CB_MA_DT_COFACTORS_NOTE } from "./cofactors";
import { CB_MA_DT_INVERSE_NOTE } from "./inverse";
import { CB_MA_DT_SYSTEM_NOTE } from "./system";

export { CB_MA_DT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/determinants/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-dt-` here and `cbmdt-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_DT_NOTES: Record<string, SubtopicNote> = {
  "cbm-dt-expand": CB_MA_DT_EXPAND_NOTE,
  "cbm-dt-area": CB_MA_DT_AREA_NOTE,
  "cbm-dt-cofactors": CB_MA_DT_COFACTORS_NOTE,
  "cbm-dt-inverse": CB_MA_DT_INVERSE_NOTE,
  "cbm-dt-system": CB_MA_DT_SYSTEM_NOTE,
};

export const CB_MA_DT_SLUGS = Object.keys(CB_MA_DT_NOTES);
