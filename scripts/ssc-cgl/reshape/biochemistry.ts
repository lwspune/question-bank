/**
 * Reshape plan: SSC CGL Tier I General Awareness Biology "Biochemistry" (11 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 11 rows (2026-11-01, main session). One page: carbohydrates, then pigments and proteins.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  biomolecules: "Carbohydrates, Pigments and Proteins",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Biochemistry",
  order: [T.biomolecules],
  byPrefix: {
    [T.biomolecules]: [
      "012d3029", "3b9f0378", "596b0cdf", "7742dc70", "3d6875dd", "49bfc14c", "2c5269c6", "d6faa1cd",
      "366e9b82", "0b4d8f4f", "86b8f6eb",
    ],
  },
  expected: {
    [T.biomolecules]: 11,
  },
  total: 11,
};

export default plan;
