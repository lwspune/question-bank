import type { SubtopicNote } from "@/app/notes/_types";
import { LIGANDS_NOTE } from "./cetcc-ligands";
import { COMPLEX_TYPES_NOTE } from "./cetcc-complex-types";
import { NOMENCLATURE_NOTE } from "./cetcc-nomenclature";
import { ISOMERISM_NOTE } from "./cetcc-isomerism";
import { BONDING_AND_STABILITY_NOTE } from "./cetcc-bonding-and-stability";

export { MHTCET_COORDINATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/coordination-compounds/[subtopicSlug].
 * `cetcc-` prefix: concept-tag keys are global.
 */
export const MHTCET_COORDINATION_NOTES: Record<string, SubtopicNote> = {
  "cetcc-ligands": LIGANDS_NOTE,
  "cetcc-complex-types": COMPLEX_TYPES_NOTE,
  "cetcc-nomenclature": NOMENCLATURE_NOTE,
  "cetcc-isomerism": ISOMERISM_NOTE,
  "cetcc-bonding-and-stability": BONDING_AND_STABILITY_NOTE,
};

export const MHTCET_COORDINATION_SLUGS = Object.keys(MHTCET_COORDINATION_NOTES);
