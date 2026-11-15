import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_BC_KINGDOMS_NOTE } from "./kingdoms";
import { NEET_BO_BC_FUNGI_NOTE } from "./fungi";
import { NEET_BO_BC_VIRUSES_NOTE } from "./viruses";

export { NEET_BO_BC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/biological-classification/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-bc-` here and `nbobc-` on concept slugs.
 *
 * NCERT XI ch.2: the five kingdoms, Monera, Protista, Fungi, viruses, lichens.
 */
export const NEET_BO_BC_NOTES: Record<string, SubtopicNote> = {
  "nbo-bc-kingdoms": NEET_BO_BC_KINGDOMS_NOTE,
  "nbo-bc-fungi": NEET_BO_BC_FUNGI_NOTE,
  "nbo-bc-viruses": NEET_BO_BC_VIRUSES_NOTE,
};

export const NEET_BO_BC_SLUGS = Object.keys(NEET_BO_BC_NOTES);
