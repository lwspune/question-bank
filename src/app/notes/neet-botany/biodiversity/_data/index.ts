import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_BD_PATTERNS_NOTE } from "./patterns";
import { NEET_BO_BD_LOSS_NOTE } from "./loss";
import { NEET_BO_BD_CONSERVATION_NOTE } from "./conservation";

export { NEET_BO_BD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/biodiversity/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-bd-` here and `nbobd-` on concept slugs.
 *
 * NCERT XII ch.13: patterns of biodiversity, its loss, and conservation.
 */
export const NEET_BO_BD_NOTES: Record<string, SubtopicNote> = {
  "nbo-bd-patterns": NEET_BO_BD_PATTERNS_NOTE,
  "nbo-bd-loss": NEET_BO_BD_LOSS_NOTE,
  "nbo-bd-conservation": NEET_BO_BD_CONSERVATION_NOTE,
};

export const NEET_BO_BD_SLUGS = Object.keys(NEET_BO_BD_NOTES);
