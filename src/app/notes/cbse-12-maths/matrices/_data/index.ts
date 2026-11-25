import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_MT_ORDER_NOTE } from "./order";
import { CB_MA_MT_EQUALITY_NOTE } from "./equality";
import { CB_MA_MT_ADDITION_NOTE } from "./addition";
import { CB_MA_MT_MULTIPLICATION_NOTE } from "./multiplication";
import { CB_MA_MT_TRANSPOSE_NOTE } from "./transpose";
import { CB_MA_MT_SYMMETRIC_NOTE } from "./symmetric";
import { CB_MA_MT_INVERSE_NOTE } from "./inverse";

export { CB_MA_MT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/matrices/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-mt-` here and `cbmmt-` on concept slugs.
 *
 * 7 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_MT_NOTES: Record<string, SubtopicNote> = {
  "cbm-mt-order": CB_MA_MT_ORDER_NOTE,
  "cbm-mt-equality": CB_MA_MT_EQUALITY_NOTE,
  "cbm-mt-addition": CB_MA_MT_ADDITION_NOTE,
  "cbm-mt-multiplication": CB_MA_MT_MULTIPLICATION_NOTE,
  "cbm-mt-transpose": CB_MA_MT_TRANSPOSE_NOTE,
  "cbm-mt-symmetric": CB_MA_MT_SYMMETRIC_NOTE,
  "cbm-mt-inverse": CB_MA_MT_INVERSE_NOTE,
};

export const CB_MA_MT_SLUGS = Object.keys(CB_MA_MT_NOTES);
