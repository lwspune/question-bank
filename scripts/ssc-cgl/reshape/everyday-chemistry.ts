/**
 * Reshape plan: SSC CGL Tier I General Awareness Chemistry "Chemistry in Everyday Life" (14 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 14 rows (2026-11-02, main session). One page: chemicals in food, then gases and other chemicals.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  everyday: "Chemicals in Food and Daily Use",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Chemistry in Everyday Life",
  order: [T.everyday],
  byPrefix: {
    [T.everyday]: [
      "147e5712", "15c50c14", "1afe2b18", "55bfe972", "96e461bc", "bf61e653", "c5e3a7b7", "ce8b802d",
      "442511a1", "6d239b3c", "87372117", "c5c5a0be", "1f1bb812", "a719d8fb",
    ],
  },
  expected: {
    [T.everyday]: 14,
  },
  total: 14,
};

export default plan;
