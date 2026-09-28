import type { SubtopicNote } from "@/app/notes/_types";
import { VECTORS_NOTE } from "./cetp-mp-vectors";
import { KINEMATICS_NOTE } from "./cetp-mp-kinematics";
import { RELATIVE_MOTION_NOTE } from "./cetp-mp-relative-motion";
import { PROJECTILE_NOTE } from "./cetp-mp-projectile";
import { CIRCULAR_MOTION_NOTE } from "./cetp-mp-circular-motion";

export { MHTCET_PLANE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/motion-in-a-plane/[subtopicSlug].
 * `cetp-mp-` prefix: concept-tag keys are global.
 */
export const MHTCET_PLANE_NOTES: Record<string, SubtopicNote> = {
  "cetp-mp-vectors": VECTORS_NOTE,
  "cetp-mp-kinematics": KINEMATICS_NOTE,
  "cetp-mp-relative-motion": RELATIVE_MOTION_NOTE,
  "cetp-mp-projectile": PROJECTILE_NOTE,
  "cetp-mp-circular-motion": CIRCULAR_MOTION_NOTE,
};

export const MHTCET_PLANE_SLUGS = Object.keys(MHTCET_PLANE_NOTES);
