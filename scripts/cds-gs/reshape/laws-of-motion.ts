/**
 * Reshape plan: CDS GK Physics "Laws of Motion and Forces" (9 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 9 stems AND solutions (2026-10-23). Nine rows make one teaching page in Newton's
 * order: net force zero (inertia, equilibrium, the stretched rope), then the second law with
 * momentum, then the conservation of momentum. The four catalogue subtopics split one idea
 * (what a net force does) four ways, so they merge.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  newton: "Newton's Laws and Momentum",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Laws of Motion and Forces",
  order: [T.newton],
  whole: {
    "Newton's Laws of Motion": T.newton,
    "Types of Forces": T.newton,
    "Impulse and Momentum": T.newton,
    "Conservation of Momentum and Collisions": T.newton,
  },
  byPrefix: {},
  expected: { [T.newton]: 9 },
  total: 9,
};

export default plan;
