import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_MO_ORGANS_NOTE } from "./organs";
import { NEET_BO_MO_FLOWER_NOTE } from "./flower";
import { NEET_BO_MO_GYNOECIUM_NOTE } from "./gynoecium";
import { NEET_BO_MO_FAMILIES_NOTE } from "./families";

export { NEET_BO_MO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/morphology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-mo-` here and `nbomo-` on concept slugs.
 *
 * NCERT XI ch.5: plant organs, the flower, fruit and seed, floral formulas and families.
 */
export const NEET_BO_MO_NOTES: Record<string, SubtopicNote> = {
  "nbo-mo-organs": NEET_BO_MO_ORGANS_NOTE,
  "nbo-mo-flower": NEET_BO_MO_FLOWER_NOTE,
  "nbo-mo-gynoecium": NEET_BO_MO_GYNOECIUM_NOTE,
  "nbo-mo-families": NEET_BO_MO_FAMILIES_NOTE,
};

export const NEET_BO_MO_SLUGS = Object.keys(NEET_BO_MO_NOTES);
