import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_TG_COSINES_NOTE } from "./cosines";
import { CB_MA_TG_LINE_NOTE } from "./line";
import { CB_MA_TG_ANGLE_NOTE } from "./angle";
import { CB_MA_TG_DISTANCE_NOTE } from "./distance";
import { CB_MA_TG_PLANE_NOTE } from "./plane";

export { CB_MA_TG_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/three-dimensional-geometry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-tg-` here and `cbmtg-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_TG_NOTES: Record<string, SubtopicNote> = {
  "cbm-tg-cosines": CB_MA_TG_COSINES_NOTE,
  "cbm-tg-line": CB_MA_TG_LINE_NOTE,
  "cbm-tg-angle": CB_MA_TG_ANGLE_NOTE,
  "cbm-tg-distance": CB_MA_TG_DISTANCE_NOTE,
  "cbm-tg-plane": CB_MA_TG_PLANE_NOTE,
};

export const CB_MA_TG_SLUGS = Object.keys(CB_MA_TG_NOTES);
