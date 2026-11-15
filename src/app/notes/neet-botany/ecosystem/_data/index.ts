import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_EC_PRODUCTIVITY_NOTE } from "./productivity";
import { NEET_BO_EC_ENERGY_NOTE } from "./energy";

export { NEET_BO_EC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/ecosystem/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-ec-` here and `nboec-` on concept slugs.
 *
 * NCERT XII ch.12: productivity, decomposition, energy flow, pyramids.
 */
export const NEET_BO_EC_NOTES: Record<string, SubtopicNote> = {
  "nbo-ec-productivity": NEET_BO_EC_PRODUCTIVITY_NOTE,
  "nbo-ec-energy": NEET_BO_EC_ENERGY_NOTE,
};

export const NEET_BO_EC_SLUGS = Object.keys(NEET_BO_EC_NOTES);
