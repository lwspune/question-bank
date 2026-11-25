import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_MM_BARMAGNET_NOTE } from "./barmagnet";
import { CB_PH_MM_GAUSS_NOTE } from "./gauss";
import { CB_PH_MM_MAGNETISATION_NOTE } from "./magnetisation";
import { CB_PH_MM_MATERIALS_NOTE } from "./materials";

export { CB_PH_MM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/magnetism-and-matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-mm-` here and `cbpmm-` on concept slugs.
 *
 * 4 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_MM_NOTES: Record<string, SubtopicNote> = {
  "cbp-mm-barmagnet": CB_PH_MM_BARMAGNET_NOTE,
  "cbp-mm-gauss": CB_PH_MM_GAUSS_NOTE,
  "cbp-mm-magnetisation": CB_PH_MM_MAGNETISATION_NOTE,
  "cbp-mm-materials": CB_PH_MM_MATERIALS_NOTE,
};

export const CB_PH_MM_SLUGS = Object.keys(CB_PH_MM_NOTES);
