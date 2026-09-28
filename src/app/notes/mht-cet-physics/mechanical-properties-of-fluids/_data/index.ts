import type { SubtopicNote } from "@/app/notes/_types";
import { PRESSURE_NOTE } from "./cetp-fl-pressure";
import { SURFACE_TENSION_NOTE } from "./cetp-fl-surface-tension";
import { EXCESS_PRESSURE_NOTE } from "./cetp-fl-excess-pressure";
import { VISCOSITY_NOTE } from "./cetp-fl-viscosity";
import { FLOW_NOTE } from "./cetp-fl-flow";

export { MHTCET_FLUIDS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/mechanical-properties-of-fluids/[subtopicSlug].
 * `cetp-fl-` prefix: concept-tag keys are global, and `cetp-` alone is shared by every CET Physics chapter.
 */
export const MHTCET_FLUIDS_NOTES: Record<string, SubtopicNote> = {
  "cetp-fl-pressure": PRESSURE_NOTE,
  "cetp-fl-surface-tension": SURFACE_TENSION_NOTE,
  "cetp-fl-excess-pressure": EXCESS_PRESSURE_NOTE,
  "cetp-fl-viscosity": VISCOSITY_NOTE,
  "cetp-fl-flow": FLOW_NOTE,
};

export const MHTCET_FLUIDS_SLUGS = Object.keys(MHTCET_FLUIDS_NOTES);
