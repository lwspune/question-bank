/**
 * Reshape plan — CDS GK Chemistry "Chemical Reactions" (19 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 19 stems AND solutions (2026-10-02). Three teaching pages. Types of reactions takes
 * physical vs chemical change, the reaction types, lead nitrate's decomposition and the two
 * Class 11 energetics rows (Gibbs energy, state functions), which are too few for a page of
 * their own. Oxidation and reduction takes the redox rows plus the thermite rail-welding row
 * (7a85892b), which is filed under types but is taught as aluminium reducing iron oxide.
 * Reactions in daily life keeps whitewashing, the limewater tests and brine electrolysis.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  types: "Types of Reactions and Energy Changes",
  redox: "Oxidation and Reduction",
  daily: "Reactions in Daily Life",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Chemical Reactions",
  order: [T.types, T.redox, T.daily],
  whole: {
    "Physical vs Chemical Changes": T.types,
    "Types of Reactions: Combination, Decomposition, Displacement": T.types,
    "Thermal and Photochemical Decomposition": T.types,
    "Thermochemistry and Energetics": T.types,
    "Redox: Oxidation, Reduction and Reducing Agents": T.redox,
    "Specific Reactions: Precipitation, Electrolysis and Daily Life": T.daily,
  },
  byPrefix: { [T.redox]: ["7a85892b"] },
  expected: { [T.types]: 8, [T.redox]: 5, [T.daily]: 6 },
  total: 19,
};

export default plan;
