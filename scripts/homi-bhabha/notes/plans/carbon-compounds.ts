/**
 * Reshape plan: Homi Bhabha Std IX "Carbon and Its Compounds" (29 q, all eight papers), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 29 stems and solutions. The ingest filed them under seven subtopics; cut here by what a
 * question asks: carbon's covalent bonds and the hydrocarbon families (bond counts, -ane/-ene/-yne,
 * isomers and homologous series), the free and combined carbon with its allotropes (diamond,
 * graphite, fullerene), and fuels with combustion (flame, ignition temperature, gaseous fuels,
 * petroleum). Never featured: 002b3a32 and 7c912dff (each carries a notice: neither statement is
 * the reason for the other), c09057ec (water gas printed as CO2 + H2), 708f296f ("tetragonal" for
 * tetrahedral).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  bonds: "Covalent Bonds and Hydrocarbons",
  allotropes: "Occurrence and Allotropes of Carbon",
  fuels: "Fuels and Combustion",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Carbon and Its Compounds",
  order: [T.bonds, T.allotropes, T.fuels],
  byPrefix: {
    [T.bonds]: ["e6e74e8e", "08437fc7", "87900807", "7fca6f7a", "eaf22878", "002b3a32", "7c912dff", "c880f4ca", "8faf5350"],
    [T.allotropes]: ["64aeb809", "25fcdee4", "14ac6a21", "c6f5d634", "708f296f", "e6697575", "d6bd0d16", "a7cc69dd", "1b784e56", "dae15d15"],
    [T.fuels]: ["4c22e00c", "86298d03", "1a2ce662", "b200896d", "5efed268", "e8eac1c5", "7ff1a9dc", "c09057ec", "f3c6cb4a", "6c6f5d96"],
  },
  expected: { [T.bonds]: 9, [T.allotropes]: 10, [T.fuels]: 10 },
  total: 29,
};

export default plan;
