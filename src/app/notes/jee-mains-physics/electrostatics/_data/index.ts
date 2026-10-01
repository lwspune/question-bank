import type { SubtopicNote } from "@/app/notes/_types";
import { COULOMB_ES_NOTE } from "./coulomb";
import { FIELD_ES_NOTE } from "./field";
import { GAUSS_ES_NOTE } from "./gauss";
import { POTENTIAL_ES_NOTE } from "./potential";
import { DIPOLE_ES_NOTE } from "./dipole";
import { MOTION_ES_NOTE } from "./motion";
import { CAPACITANCE_ES_NOTE } from "./capacitance";
import { SLABS_ES_NOTE } from "./slabs";
import { ENERGY_ES_NOTE } from "./energy";

export { JEE_PH_ES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/electrostatics/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-es-` here and `jpes-` on
 * concept slugs.
 */
export const JEE_PH_ES_NOTES: Record<string, SubtopicNote> = {
  "jph-es-coulomb": COULOMB_ES_NOTE,
  "jph-es-field": FIELD_ES_NOTE,
  "jph-es-gauss": GAUSS_ES_NOTE,
  "jph-es-potential": POTENTIAL_ES_NOTE,
  "jph-es-dipole": DIPOLE_ES_NOTE,
  "jph-es-motion": MOTION_ES_NOTE,
  "jph-es-capacitance": CAPACITANCE_ES_NOTE,
  "jph-es-slabs": SLABS_ES_NOTE,
  "jph-es-energy": ENERGY_ES_NOTE,
};

export const JEE_PH_ES_SLUGS = Object.keys(JEE_PH_ES_NOTES);
