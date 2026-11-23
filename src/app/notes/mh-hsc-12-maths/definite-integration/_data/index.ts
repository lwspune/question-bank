import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_DI_LIMIT_NOTE } from "./limit";
import { HSC_MA_DI_FUNDAMENTAL_NOTE } from "./fundamental";
import { HSC_MA_DI_METHODS_NOTE } from "./methods";
import { HSC_MA_DI_PROPERTIES_NOTE } from "./properties";

export { HSC_MA_DI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/definite-integration/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-di-` here and `hscmdi-` on concept slugs.
 *
 * 4 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_DI_NOTES: Record<string, SubtopicNote> = {
  "hscm-di-limit": HSC_MA_DI_LIMIT_NOTE,
  "hscm-di-fundamental": HSC_MA_DI_FUNDAMENTAL_NOTE,
  "hscm-di-methods": HSC_MA_DI_METHODS_NOTE,
  "hscm-di-properties": HSC_MA_DI_PROPERTIES_NOTE,
};

export const HSC_MA_DI_SLUGS = Object.keys(HSC_MA_DI_NOTES);
