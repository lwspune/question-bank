import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_AI_UNDER_NOTE } from "./under";
import { CB_MA_AI_BOUNDED_NOTE } from "./bounded";

export { CB_MA_AI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/application-of-integrals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-ai-` here and `cbmai-` on concept slugs.
 *
 * 2 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_AI_NOTES: Record<string, SubtopicNote> = {
  "cbm-ai-under": CB_MA_AI_UNDER_NOTE,
  "cbm-ai-bounded": CB_MA_AI_BOUNDED_NOTE,
};

export const CB_MA_AI_SLUGS = Object.keys(CB_MA_AI_NOTES);
