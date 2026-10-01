/**
 * Reshape plan — CDS GK Chemistry "Hydrogen and Water" (5 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 5 stems AND solutions (2026-10-02). Too few for more than one page: hardness (three
 * rows), anhydrous calcium chloride as a drying agent (re-filed from Practical Chemistry) and
 * water's density between 0 and 4 °C all sit on one page about water.
 */
import type { ReshapePlan } from "../reshape";

const T = { water: "Water: Hardness and Properties" } as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Hydrogen and Water",
  order: [T.water],
  whole: {
    "Hardness and Purity of Water": T.water,
    "Properties and Anomalous Behaviour of Water": T.water,
  },
  byPrefix: {},
  expected: { [T.water]: 5 },
  total: 5,
};

export default plan;
