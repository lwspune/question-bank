import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_CC_CYCLE_NOTE } from "./cycle";
import { NEET_BO_CC_MEIOSIS_NOTE } from "./meiosis";

export { NEET_BO_CC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/cell-cycle/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-cc-` here and `nbocc-` on concept slugs.
 *
 * NCERT XI ch.10: the cell cycle, mitosis and meiosis.
 */
export const NEET_BO_CC_NOTES: Record<string, SubtopicNote> = {
  "nbo-cc-cycle": NEET_BO_CC_CYCLE_NOTE,
  "nbo-cc-meiosis": NEET_BO_CC_MEIOSIS_NOTE,
};

export const NEET_BO_CC_SLUGS = Object.keys(NEET_BO_CC_NOTES);
