import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_MI_USES_NOTE } from "./uses";

export { NEET_BO_MI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/microbes/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-mi-` here and `nbomi-` on concept slugs.
 *
 * NCERT XII ch.8: microbes in household products, beverages and industry.
 */
export const NEET_BO_MI_NOTES: Record<string, SubtopicNote> = {
  "nbo-mi-uses": NEET_BO_MI_USES_NOTE,
};

export const NEET_BO_MI_SLUGS = Object.keys(NEET_BO_MI_NOTES);
