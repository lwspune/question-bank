import type { SubtopicNote } from "@/app/notes/_types";
import { COULOMB_FIELD_NOTE } from "./cetp-coulomb-field";
import { GAUSS_NOTE } from "./cetp-gauss";
import { DIPOLE_NOTE } from "./cetp-dipole";
import { POTENTIAL_NOTE } from "./cetp-potential";
import { CAPACITANCE_NOTE } from "./cetp-capacitance";
import { DIELECTRICS_NOTE } from "./cetp-dielectrics";
import { CAPACITOR_ENERGY_NOTE } from "./cetp-capacitor-energy";

export { MHTCET_ELECTROSTATICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/electrostatics/[subtopicSlug].
 * `cetp-` prefix: concept-tag keys are global, and NDA Physics has notes of its own.
 */
export const MHTCET_ELECTROSTATICS_NOTES: Record<string, SubtopicNote> = {
  "cetp-coulomb-field": COULOMB_FIELD_NOTE,
  "cetp-gauss": GAUSS_NOTE,
  "cetp-dipole": DIPOLE_NOTE,
  "cetp-potential": POTENTIAL_NOTE,
  "cetp-capacitance": CAPACITANCE_NOTE,
  "cetp-dielectrics": DIELECTRICS_NOTE,
  "cetp-capacitor-energy": CAPACITOR_ENERGY_NOTE,
};

export const MHTCET_ELECTROSTATICS_SLUGS = Object.keys(MHTCET_ELECTROSTATICS_NOTES);
