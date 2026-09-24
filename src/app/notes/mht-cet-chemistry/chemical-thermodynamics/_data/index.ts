import type { SubtopicNote } from "@/app/notes/_types";
import { SYSTEMS_AND_PROCESSES_NOTE } from "./cetth-systems-and-processes";
import { FIRST_LAW_NOTE } from "./cetth-first-law";
import { ENTHALPY_NOTE } from "./cetth-enthalpy";
import { THERMOCHEMISTRY_NOTE } from "./cetth-thermochemistry";
import { ENTROPY_NOTE } from "./cetth-entropy";
import { GIBBS_ENERGY_NOTE } from "./cetth-gibbs-energy";

export { MHTCET_THERMODYNAMICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/chemical-thermodynamics/[subtopicSlug].
 * `cetth-` prefix: concept-tag keys are global.
 */
export const MHTCET_THERMODYNAMICS_NOTES: Record<string, SubtopicNote> = {
  "cetth-systems-and-processes": SYSTEMS_AND_PROCESSES_NOTE,
  "cetth-first-law": FIRST_LAW_NOTE,
  "cetth-enthalpy": ENTHALPY_NOTE,
  "cetth-thermochemistry": THERMOCHEMISTRY_NOTE,
  "cetth-entropy": ENTROPY_NOTE,
  "cetth-gibbs-energy": GIBBS_ENERGY_NOTE,
};

export const MHTCET_THERMODYNAMICS_SLUGS = Object.keys(MHTCET_THERMODYNAMICS_NOTES);
