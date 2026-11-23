/**
 * Reshape plan: Homi Bhabha Std IX "Measurement and Units" (13 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 13 stems and solutions. The ingest filed them under three subtopics; cut here by what a
 * question asks: which quantities are fundamental, which unit goes with which quantity (and the
 * odd unit out), and which instrument measures what; then writing a unit in kg, m and s (power
 * above all) and sorting scalars from vectors. No row carries a notice.
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  quantities: "Physical Quantities, Units and Instruments",
  derived: "Derived Units, Scalars and Vectors",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Measurement and Units",
  order: [T.quantities, T.derived],
  byPrefix: {
    [T.quantities]: ["eb819246", "cd0fa9e2", "be3fd652", "66c3d707", "3efc2bc1"],
    [T.derived]: ["e25f4fb1", "1f7dda42", "2bef7f0d", "a1e689a7", "93a70c57", "7a3c3336", "937b5676", "e942302c"],
  },
  expected: { [T.quantities]: 5, [T.derived]: 8 },
  total: 13,
};

export default plan;
