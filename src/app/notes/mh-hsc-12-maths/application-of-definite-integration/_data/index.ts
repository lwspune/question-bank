import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_AI_UNDER_NOTE } from "./under";
import { HSC_MA_AI_BETWEEN_NOTE } from "./between";

export { HSC_MA_AI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/application-of-definite-integration/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-ai-` here and `hscmai-` on concept slugs.
 *
 * 2 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_AI_NOTES: Record<string, SubtopicNote> = {
  "hscm-ai-under": HSC_MA_AI_UNDER_NOTE,
  "hscm-ai-between": HSC_MA_AI_BETWEEN_NOTE,
};

export const HSC_MA_AI_SLUGS = Object.keys(HSC_MA_AI_NOTES);
