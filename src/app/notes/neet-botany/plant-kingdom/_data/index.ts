import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_PK_ALGAE_NOTE } from "./algae";
import { NEET_BO_PK_BRYOPHYTES_NOTE } from "./bryophytes";
import { NEET_BO_PK_PTERIDOPHYTES_NOTE } from "./pteridophytes";
import { NEET_BO_PK_GYMNOSPERMS_NOTE } from "./gymnosperms";

export { NEET_BO_PK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/plant-kingdom/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-pk-` here and `nbopk-` on concept slugs.
 *
 * NCERT XI ch.3: algae, bryophytes, pteridophytes, gymnosperms.
 */
export const NEET_BO_PK_NOTES: Record<string, SubtopicNote> = {
  "nbo-pk-algae": NEET_BO_PK_ALGAE_NOTE,
  "nbo-pk-bryophytes": NEET_BO_PK_BRYOPHYTES_NOTE,
  "nbo-pk-pteridophytes": NEET_BO_PK_PTERIDOPHYTES_NOTE,
  "nbo-pk-gymnosperms": NEET_BO_PK_GYMNOSPERMS_NOTE,
};

export const NEET_BO_PK_SLUGS = Object.keys(NEET_BO_PK_NOTES);
