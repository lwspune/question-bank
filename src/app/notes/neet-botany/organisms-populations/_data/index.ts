import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_OP_GROWTH_NOTE } from "./growth";
import { NEET_BO_OP_INTERACTIONS_NOTE } from "./interactions";

export { NEET_BO_OP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/organisms-populations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-op-` here and `nboop-` on concept slugs.
 *
 * NCERT XII ch.11: population attributes, growth and interactions.
 */
export const NEET_BO_OP_NOTES: Record<string, SubtopicNote> = {
  "nbo-op-growth": NEET_BO_OP_GROWTH_NOTE,
  "nbo-op-interactions": NEET_BO_OP_INTERACTIONS_NOTE,
};

export const NEET_BO_OP_SLUGS = Object.keys(NEET_BO_OP_NOTES);
