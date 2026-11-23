import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_ES_GAUSS_NOTE } from "./gauss";
import { HSC_PH_ES_POTENTIAL_NOTE } from "./potential";
import { HSC_PH_ES_EQUIPOTENTIAL_NOTE } from "./equipotential";
import { HSC_PH_ES_DIPOLES_NOTE } from "./dipoles";
import { HSC_PH_ES_CONDUCTORS_NOTE } from "./conductors";
import { HSC_PH_ES_CAPACITORS_NOTE } from "./capacitors";
import { HSC_PH_ES_DIELECTRIC_NOTE } from "./dielectric";
import { HSC_PH_ES_ENERGY_NOTE } from "./energy";

export { HSC_PH_ES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/electrostatics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-es-` here and `hscpes-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_ES_NOTES: Record<string, SubtopicNote> = {
  "hscp-es-gauss": HSC_PH_ES_GAUSS_NOTE,
  "hscp-es-potential": HSC_PH_ES_POTENTIAL_NOTE,
  "hscp-es-equipotential": HSC_PH_ES_EQUIPOTENTIAL_NOTE,
  "hscp-es-dipoles": HSC_PH_ES_DIPOLES_NOTE,
  "hscp-es-conductors": HSC_PH_ES_CONDUCTORS_NOTE,
  "hscp-es-capacitors": HSC_PH_ES_CAPACITORS_NOTE,
  "hscp-es-dielectric": HSC_PH_ES_DIELECTRIC_NOTE,
  "hscp-es-energy": HSC_PH_ES_ENERGY_NOTE,
};

export const HSC_PH_ES_SLUGS = Object.keys(HSC_PH_ES_NOTES);
