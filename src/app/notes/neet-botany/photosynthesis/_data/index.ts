import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_PS_LIGHT_NOTE } from "./light";
import { NEET_BO_PS_CALVIN_NOTE } from "./calvin";
import { NEET_BO_PS_C4_NOTE } from "./c4";

export { NEET_BO_PS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/photosynthesis/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-ps-` here and `nbops-` on concept slugs.
 *
 * NCERT XI ch.13: pigments, light reaction, Calvin cycle, C4, photorespiration.
 */
export const NEET_BO_PS_NOTES: Record<string, SubtopicNote> = {
  "nbo-ps-light": NEET_BO_PS_LIGHT_NOTE,
  "nbo-ps-calvin": NEET_BO_PS_CALVIN_NOTE,
  "nbo-ps-c4": NEET_BO_PS_C4_NOTE,
};

export const NEET_BO_PS_SLUGS = Object.keys(NEET_BO_PS_NOTES);
