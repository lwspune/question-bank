import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_CE_PROKARYOTIC_NOTE } from "./prokaryotic";
import { NEET_BO_CE_ENDOMEMBRANE_NOTE } from "./endomembrane";
import { NEET_BO_CE_ORGANELLES_NOTE } from "./organelles";
import { NEET_BO_CE_NUCLEUS_NOTE } from "./nucleus";

export { NEET_BO_CE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/cell-unit-of-life/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-ce-` here and `nboce-` on concept slugs.
 *
 * NCERT XI ch.8: cell theory, prokaryotic cell, membranes, organelles, nucleus.
 */
export const NEET_BO_CE_NOTES: Record<string, SubtopicNote> = {
  "nbo-ce-prokaryotic": NEET_BO_CE_PROKARYOTIC_NOTE,
  "nbo-ce-endomembrane": NEET_BO_CE_ENDOMEMBRANE_NOTE,
  "nbo-ce-organelles": NEET_BO_CE_ORGANELLES_NOTE,
  "nbo-ce-nucleus": NEET_BO_CE_NUCLEUS_NOTE,
};

export const NEET_BO_CE_SLUGS = Object.keys(NEET_BO_CE_NOTES);
