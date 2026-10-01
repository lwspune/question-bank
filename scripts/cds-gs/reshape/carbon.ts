/**
 * Reshape plan — CDS GK Chemistry "Carbon and Its Compounds" (21 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 21 stems AND solutions (2026-10-02). Four teaching pages: carbon and its allotropes
 * (the one-row crustal-abundance question joins it); hydrocarbons and fuels (general formula,
 * sooty flames, octane and cetane, benzene); functional groups and isomerism (catenation and
 * isomerism had two rows, functional groups three, including the Lassaigne row re-filed from
 * Practical Chemistry); soaps, detergents and hydrogenation. The empty "Polymers and Plastics"
 * catalog entry is dropped: CDS files its plastics questions under Industrial Chemistry.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  allotropes: "Carbon and Its Allotropes",
  hydrocarbons: "Hydrocarbons and Fuels",
  groups: "Functional Groups and Isomerism",
  soaps: "Soaps, Detergents and Hydrogenation of Oils",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Carbon and Its Compounds",
  order: [T.allotropes, T.hydrocarbons, T.groups, T.soaps],
  whole: {
    "Allotropes of Carbon": T.allotropes,
    "Common Carbon Compounds and Pigments": T.allotropes,
    "Hydrocarbons and Organic Classification": T.hydrocarbons,
    "Catenation, Tetra-valency and Isomerism": T.groups,
    "Functional Groups and Common Organic Compounds": T.groups,
  },
  byPrefix: {},
  expected: { [T.allotropes]: 7, [T.hydrocarbons]: 6, [T.groups]: 5, [T.soaps]: 3 },
  total: 21,
};

export default plan;
