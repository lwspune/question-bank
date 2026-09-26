import type { SubtopicNote } from "@/app/notes/_types";
import { CIRCULAR_KINEMATICS_NOTE } from "./cetp-circular-kinematics";
import { CIRCULAR_DYNAMICS_NOTE } from "./cetp-circular-dynamics";
import { MOMENT_OF_INERTIA_NOTE } from "./cetp-moment-of-inertia";
import { AXIS_THEOREMS_NOTE } from "./cetp-axis-theorems";
import { ANGULAR_MOMENTUM_NOTE } from "./cetp-angular-momentum";
import { ROLLING_NOTE } from "./cetp-rolling";

export { MHTCET_ROTATIONAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/rotational-dynamics/[subtopicSlug].
 * `cetp-` prefix: concept-tag keys are global.
 */
export const MHTCET_ROTATIONAL_NOTES: Record<string, SubtopicNote> = {
  "cetp-circular-kinematics": CIRCULAR_KINEMATICS_NOTE,
  "cetp-circular-dynamics": CIRCULAR_DYNAMICS_NOTE,
  "cetp-moment-of-inertia": MOMENT_OF_INERTIA_NOTE,
  "cetp-axis-theorems": AXIS_THEOREMS_NOTE,
  "cetp-angular-momentum": ANGULAR_MOMENTUM_NOTE,
  "cetp-rolling": ROLLING_NOTE,
};

export const MHTCET_ROTATIONAL_SLUGS = Object.keys(MHTCET_ROTATIONAL_NOTES);
