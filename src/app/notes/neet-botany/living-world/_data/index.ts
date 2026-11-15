import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_LW_NAMING_NOTE } from "./naming";
import { NEET_BO_LW_CATEGORIES_NOTE } from "./categories";

export { NEET_BO_LW_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/living-world/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-lw-` here and `nbolw-` on concept slugs.
 *
 * NCERT XI ch.1: naming rules, reductionist biology, biologists, the taxonomic ladder.
 */
export const NEET_BO_LW_NOTES: Record<string, SubtopicNote> = {
  "nbo-lw-naming": NEET_BO_LW_NAMING_NOTE,
  "nbo-lw-categories": NEET_BO_LW_CATEGORIES_NOTE,
};

export const NEET_BO_LW_SLUGS = Object.keys(NEET_BO_LW_NOTES);
