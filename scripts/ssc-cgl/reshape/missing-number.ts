/**
 * Reshape plan: SSC CGL Tier I Reasoning "Missing Number" (12 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 12 stems and solutions (2026-10-23). Eleven come from the 2023 shifts, one from 2025. The
 * ingest split them into "Missing Number in Grids" (10) and "Missing Number in Figures" (2), but the
 * two "Figures" rows are printed as rows of three numbers exactly like the grid rows and need the same
 * method, so the chapter is one page: find the rule from row 1, confirm it on row 2, apply it to row 3.
 * Nothing is flawed; every key checks.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  grids: "Missing Number in Grids",
} as const;

const plan: ReshapePlan = {
  chapter: "Missing Number",
  subject: "Reasoning",
  order: [T.grids],
  byPrefix: {
    [T.grids]: [
      "d9c38eef", "fe31852f", "a60a100e", "c83f9d29", "4ebd7fa4", "3ca35599", "7f21fe41",
      "1e4a209b", "3f56972e", "7c115e56",
      "4402c7c5", "6203e32e",
    ],
  },
  expected: {
    [T.grids]: 12,
  },
  total: 12,
};

export default plan;
