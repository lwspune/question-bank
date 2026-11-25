import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_VA_TYPES_NOTE } from "./types";
import { CB_MA_VA_ADDITION_NOTE } from "./addition";
import { CB_MA_VA_COMPONENTS_NOTE } from "./components";
import { CB_MA_VA_SECTION_NOTE } from "./section";
import { CB_MA_VA_DOT_NOTE } from "./dot";
import { CB_MA_VA_CROSS_NOTE } from "./cross";

export { CB_MA_VA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/vector-algebra/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-va-` here and `cbmva-` on concept slugs.
 *
 * 6 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_VA_NOTES: Record<string, SubtopicNote> = {
  "cbm-va-types": CB_MA_VA_TYPES_NOTE,
  "cbm-va-addition": CB_MA_VA_ADDITION_NOTE,
  "cbm-va-components": CB_MA_VA_COMPONENTS_NOTE,
  "cbm-va-section": CB_MA_VA_SECTION_NOTE,
  "cbm-va-dot": CB_MA_VA_DOT_NOTE,
  "cbm-va-cross": CB_MA_VA_CROSS_NOTE,
};

export const CB_MA_VA_SLUGS = Object.keys(CB_MA_VA_NOTES);
