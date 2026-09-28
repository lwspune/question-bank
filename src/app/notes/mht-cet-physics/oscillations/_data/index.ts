import type { SubtopicNote } from "@/app/notes/_types";
import { KINEMATICS_NOTE } from "./cetp-osc-kinematics";
import { SPRINGS_NOTE } from "./cetp-osc-springs";
import { ENERGY_NOTE } from "./cetp-osc-energy";
import { PENDULUM_NOTE } from "./cetp-osc-pendulum";

export { MHTCET_OSCILLATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/oscillations/[subtopicSlug].
 * `cetp-osc-` prefix: concept-tag keys are global.
 */
export const MHTCET_OSCILLATIONS_NOTES: Record<string, SubtopicNote> = {
  "cetp-osc-kinematics": KINEMATICS_NOTE,
  "cetp-osc-springs": SPRINGS_NOTE,
  "cetp-osc-energy": ENERGY_NOTE,
  "cetp-osc-pendulum": PENDULUM_NOTE,
};

export const MHTCET_OSCILLATIONS_SLUGS = Object.keys(MHTCET_OSCILLATIONS_NOTES);
