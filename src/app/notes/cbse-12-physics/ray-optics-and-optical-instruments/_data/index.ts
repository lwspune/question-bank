import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_RO_MIRRORS_NOTE } from "./mirrors";
import { CB_PH_RO_REFRACTION_NOTE } from "./refraction";
import { CB_PH_RO_LENSES_NOTE } from "./lenses";
import { CB_PH_RO_PRISM_NOTE } from "./prism";
import { CB_PH_RO_INSTRUMENTS_NOTE } from "./instruments";

export { CB_PH_RO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/ray-optics-and-optical-instruments/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-ro-` here and `cbpro-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_RO_NOTES: Record<string, SubtopicNote> = {
  "cbp-ro-mirrors": CB_PH_RO_MIRRORS_NOTE,
  "cbp-ro-refraction": CB_PH_RO_REFRACTION_NOTE,
  "cbp-ro-lenses": CB_PH_RO_LENSES_NOTE,
  "cbp-ro-prism": CB_PH_RO_PRISM_NOTE,
  "cbp-ro-instruments": CB_PH_RO_INSTRUMENTS_NOTE,
};

export const CB_PH_RO_SLUGS = Object.keys(CB_PH_RO_NOTES);
