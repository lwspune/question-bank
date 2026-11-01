/**
 * Reshape plan: SSC CGL Tier I General Awareness Physics "Kinematics and Motion" (5 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 5 rows (2026-11-02, main session). One page: kinds of motion, then rotation.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  motion: "Kinds of Motion and Rotation",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Kinematics and Motion",
  order: [T.motion],
  byPrefix: {
    [T.motion]: [
      "9d2c8041", "1444888c", "ed57a20c", "04985b93", "0ada1a0e",
    ],
  },
  expected: {
    [T.motion]: 5,
  },
  total: 5,
};

export default plan;
