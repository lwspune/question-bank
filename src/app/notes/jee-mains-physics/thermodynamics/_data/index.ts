import type { SubtopicNote } from "@/app/notes/_types";
import { FIRST_LAW_TD_NOTE } from "./first-law";
import { HEAT_CAPACITY_TD_NOTE } from "./heat-capacity";
import { PROCESSES_TD_NOTE } from "./processes";
import { ADIABATIC_TD_NOTE } from "./adiabatic";
import { CYCLES_TD_NOTE } from "./cycles";
import { ENGINES_TD_NOTE } from "./engines";

export { JEE_PH_THERMO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/thermodynamics/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-thermo-` here and `jpthermo-`
 * on concept slugs (JEE Chemistry's Thermodynamics uses `jch-thermo-` / `jcthermo-`).
 */
export const JEE_PH_THERMO_NOTES: Record<string, SubtopicNote> = {
  "jph-thermo-first-law": FIRST_LAW_TD_NOTE,
  "jph-thermo-heat-capacity": HEAT_CAPACITY_TD_NOTE,
  "jph-thermo-processes": PROCESSES_TD_NOTE,
  "jph-thermo-adiabatic": ADIABATIC_TD_NOTE,
  "jph-thermo-cycles": CYCLES_TD_NOTE,
  "jph-thermo-engines": ENGINES_TD_NOTE,
};

export const JEE_PH_THERMO_SLUGS = Object.keys(JEE_PH_THERMO_NOTES);
