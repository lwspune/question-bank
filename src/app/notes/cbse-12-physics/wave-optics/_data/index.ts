import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_WO_HUYGENS_NOTE } from "./huygens";
import { CB_PH_WO_REFRACTION_NOTE } from "./refraction";
import { CB_PH_WO_INTERFERENCE_NOTE } from "./interference";
import { CB_PH_WO_DIFFRACTION_NOTE } from "./diffraction";
import { CB_PH_WO_POLARISATION_NOTE } from "./polarisation";

export { CB_PH_WO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/wave-optics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-wo-` here and `cbpwo-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_WO_NOTES: Record<string, SubtopicNote> = {
  "cbp-wo-huygens": CB_PH_WO_HUYGENS_NOTE,
  "cbp-wo-refraction": CB_PH_WO_REFRACTION_NOTE,
  "cbp-wo-interference": CB_PH_WO_INTERFERENCE_NOTE,
  "cbp-wo-diffraction": CB_PH_WO_DIFFRACTION_NOTE,
  "cbp-wo-polarisation": CB_PH_WO_POLARISATION_NOTE,
};

export const CB_PH_WO_SLUGS = Object.keys(CB_PH_WO_NOTES);
