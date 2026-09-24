import type { SubtopicNote } from "@/app/notes/_types";
import { TYPES_SOLUBILITY_HENRY_NOTE } from "./cetsol-types-solubility-henry";
import { VAPOUR_PRESSURE_RAOULT_NOTE } from "./cetsol-vapour-pressure-raoult";
import { BOILING_POINT_ELEVATION_NOTE } from "./cetsol-boiling-point-elevation";
import { FREEZING_POINT_DEPRESSION_NOTE } from "./cetsol-freezing-point-depression";
import { OSMOTIC_PRESSURE_NOTE } from "./cetsol-osmotic-pressure";
import { VANT_HOFF_FACTOR_NOTE } from "./cetsol-vant-hoff-factor";

export { MHTCET_SOLUTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/solutions/[subtopicSlug].
 * `cetsol-` prefix: concept-tag keys are global.
 */
export const MHTCET_SOLUTIONS_NOTES: Record<string, SubtopicNote> = {
  "cetsol-types-solubility-henry": TYPES_SOLUBILITY_HENRY_NOTE,
  "cetsol-vapour-pressure-raoult": VAPOUR_PRESSURE_RAOULT_NOTE,
  "cetsol-boiling-point-elevation": BOILING_POINT_ELEVATION_NOTE,
  "cetsol-freezing-point-depression": FREEZING_POINT_DEPRESSION_NOTE,
  "cetsol-osmotic-pressure": OSMOTIC_PRESSURE_NOTE,
  "cetsol-vant-hoff-factor": VANT_HOFF_FACTOR_NOTE,
};

export const MHTCET_SOLUTIONS_SLUGS = Object.keys(MHTCET_SOLUTIONS_NOTES);
