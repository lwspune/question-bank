/**
 * Reshape plan — CDS "Inequalities" (13 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 13 stems AND solutions (2026-09-29). "Linear Inequalities" (10) held two kinds of item:
 * solving an inequality for x (with the two quadratic rows, which are solved the same way by
 * factorising), and reasoning about SIGNS and comparisons without solving (data-sufficiency items
 * on signs and powers, a negative x, x + 1/x >= 2). The one powers row joins the second page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  solve: "Solving Linear and Quadratic Inequalities",
  signs: "Signs, Powers and Comparisons",
} as const;

const plan: ReshapePlan = {
  chapter: "Inequalities",
  order: [T.solve, T.signs],
  whole: {},
  byPrefix: {
    [T.solve]: ["ec2b2534", "85c82bb5", "c378503f", "66fb3061", "55d0c235"],
    [T.signs]: ["4dc86b4b", "72e4409b", "8d9f8ae8", "6042fccc", "cbb74815", "31b53528", "3a7b73a0", "e5cb6391"],
  },
  expected: {
    [T.solve]: 5,
    [T.signs]: 8,
  },
  total: 13,
};

export default plan;
