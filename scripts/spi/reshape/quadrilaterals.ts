/**
 * Reshape plan: SPI "Quadrilaterals" (6 q), for scripts/spi/reshape.ts.
 *
 * Read all 6 stems and solutions (2026-10-22). The ingest filed them under 6 one-off subtopics.
 * Too few for more than one page: the angle sum and bisectors, the parallelogram, the special
 * quadrilaterals and the mid-point figure, and a trapezium cut by a parallel line, all on one page.
 * Never featured: 44704a28 (2022 Q5: the shape depends on how the triangles are joined, so rhombus,
 * parallelogram and kite are all possible).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  shapes: "Parallelograms and Other Quadrilaterals",
} as const;

const plan: ReshapePlan = {
  chapter: "Quadrilaterals",
  order: [T.shapes],
  byPrefix: {
    [T.shapes]: ["fa8c9cc1", "351e513f", "584746a0", "4b5459a8", "44704a28", "ee8f5047"],
  },
  expected: {
    [T.shapes]: 6,
  },
  total: 6,
};

export default plan;
