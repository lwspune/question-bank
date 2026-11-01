/**
 * Reshape plan: SSC CGL Tier I General Awareness Physics "Modern Physics" (13 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 13 rows (2026-11-02, main session). One page: radioactive decay, then quantum ideas with the physicists
 * behind them. No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  modern: "Radioactivity and Quantum Physics",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Modern Physics",
  order: [T.modern],
  byPrefix: {
    [T.modern]: [
      "4e5f6edd", "7fbc1db5", "8e17aa29", "fbd35332", "bdd94ed8", "8a22b821", "beebe019", "228d9a45",
      "1f3dbb9b", "bba2b7c3", "5844ce4a", "a52bbb38", "ebdc058f",
    ],
  },
  expected: {
    [T.modern]: 13,
  },
  total: 13,
};

export default plan;
