import type { SubtopicNote } from "@/app/notes/_types";
import { EXPANSION_NOTE } from "./cetp-th-expansion";
import { CALORIMETRY_NOTE } from "./cetp-th-calorimetry";
import { CONDUCTION_NOTE } from "./cetp-th-conduction";
import { RADIATION_NOTE } from "./cetp-th-radiation";

export { MHTCET_THERMAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/thermal-properties-of-matter/[subtopicSlug].
 * `cetp-th-` prefix: concept-tag keys are global.
 */
export const MHTCET_THERMAL_NOTES: Record<string, SubtopicNote> = {
  "cetp-th-expansion": EXPANSION_NOTE,
  "cetp-th-calorimetry": CALORIMETRY_NOTE,
  "cetp-th-conduction": CONDUCTION_NOTE,
  "cetp-th-radiation": RADIATION_NOTE,
};

export const MHTCET_THERMAL_SLUGS = Object.keys(MHTCET_THERMAL_NOTES);
