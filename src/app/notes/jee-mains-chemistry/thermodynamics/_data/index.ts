import type { SubtopicNote } from "@/app/notes/_types";
import { FIRST_LAW_CHTHERMO_NOTE } from "./first-law";
import { WORK_CHTHERMO_NOTE } from "./work";
import { CALORIMETRY_CHTHERMO_NOTE } from "./calorimetry";
import { HESS_CHTHERMO_NOTE } from "./hess";
import { PHASE_CHTHERMO_NOTE } from "./phase";
import { BOND_CHTHERMO_NOTE } from "./bond";
import { SPONTANEITY_CHTHERMO_NOTE } from "./spontaneity";
import { EQUILIBRIUM_CHTHERMO_NOTE } from "./equilibrium";

export { JEE_CH_THERMO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/thermodynamics/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-thermo-` here and `jcthermo-`
 * on concept slugs.
 */
export const JEE_CH_THERMO_NOTES: Record<string, SubtopicNote> = {
  "jch-thermo-first-law": FIRST_LAW_CHTHERMO_NOTE,
  "jch-thermo-work": WORK_CHTHERMO_NOTE,
  "jch-thermo-calorimetry": CALORIMETRY_CHTHERMO_NOTE,
  "jch-thermo-hess": HESS_CHTHERMO_NOTE,
  "jch-thermo-phase": PHASE_CHTHERMO_NOTE,
  "jch-thermo-bond": BOND_CHTHERMO_NOTE,
  "jch-thermo-spontaneity": SPONTANEITY_CHTHERMO_NOTE,
  "jch-thermo-equilibrium": EQUILIBRIUM_CHTHERMO_NOTE,
};

export const JEE_CH_THERMO_SLUGS = Object.keys(JEE_CH_THERMO_NOTES);
