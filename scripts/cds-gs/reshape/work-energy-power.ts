/**
 * Reshape plan: CDS GK Physics "Work, Energy and Power" (5 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 5 stems AND solutions (2026-10-23). Five rows make one teaching page in the
 * NCERT order: work, then kinetic and potential energy, then power. The three filled
 * catalogue subtopics merge; the empty "Simple Machines" drops from the catalogue.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  energy: "Work, Energy and Power",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Work, Energy and Power",
  order: [T.energy],
  whole: {
    "Work and Work Done": T.energy,
    "Energy and Conservation": T.energy,
    "Work-Energy Theorem and Power": T.energy,
  },
  byPrefix: {},
  expected: { [T.energy]: 5 },
  total: 5,
};

export default plan;
