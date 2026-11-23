import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_WO_HUYGENS_NOTE } from "./huygens";
import { HSC_PH_WO_REFLECTION_NOTE } from "./reflection";
import { HSC_PH_WO_POLARIZATION_NOTE } from "./polarization";
import { HSC_PH_WO_INTERFERENCE_NOTE } from "./interference";
import { HSC_PH_WO_DIFFRACTION_NOTE } from "./diffraction";
import { HSC_PH_WO_RESOLVING_NOTE } from "./resolving";

export { HSC_PH_WO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/wave-optics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-wo-` here and `hscpwo-` on concept slugs.
 *
 * 6 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_WO_NOTES: Record<string, SubtopicNote> = {
  "hscp-wo-huygens": HSC_PH_WO_HUYGENS_NOTE,
  "hscp-wo-reflection": HSC_PH_WO_REFLECTION_NOTE,
  "hscp-wo-polarization": HSC_PH_WO_POLARIZATION_NOTE,
  "hscp-wo-interference": HSC_PH_WO_INTERFERENCE_NOTE,
  "hscp-wo-diffraction": HSC_PH_WO_DIFFRACTION_NOTE,
  "hscp-wo-resolving": HSC_PH_WO_RESOLVING_NOTE,
};

export const HSC_PH_WO_SLUGS = Object.keys(HSC_PH_WO_NOTES);
