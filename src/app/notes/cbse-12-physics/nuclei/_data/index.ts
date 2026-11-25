import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_NU_COMPOSITION_NOTE } from "./composition";
import { CB_PH_NU_SIZE_NOTE } from "./size";
import { CB_PH_NU_BINDING_NOTE } from "./binding";
import { CB_PH_NU_FORCE_NOTE } from "./force";
import { CB_PH_NU_ENERGY_NOTE } from "./energy";

export { CB_PH_NU_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/nuclei/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-nu-` here and `cbpnu-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_NU_NOTES: Record<string, SubtopicNote> = {
  "cbp-nu-composition": CB_PH_NU_COMPOSITION_NOTE,
  "cbp-nu-size": CB_PH_NU_SIZE_NOTE,
  "cbp-nu-binding": CB_PH_NU_BINDING_NOTE,
  "cbp-nu-force": CB_PH_NU_FORCE_NOTE,
  "cbp-nu-energy": CB_PH_NU_ENERGY_NOTE,
};

export const CB_PH_NU_SLUGS = Object.keys(CB_PH_NU_NOTES);
