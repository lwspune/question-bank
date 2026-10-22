/**
 * Reshape plan: SPI "Carbon and Its Compounds" (12 q), for scripts/spi/reshape.ts.
 *
 * Read all 12 stems and solutions (2026-10-22). The ingest filed them under 12 one-off subtopics.
 * Cut here into two pages: the carbon skeleton (allotropes, counting covalent bonds, alkanes,
 * alkenes, alkynes and rings, homologous series and isomers), then what carbon compounds do
 * (addition and oxidation, ethanol, ethanoic acid, esters and saponification). No key is disputed.
 * 28bf2b16 prints a typo in a wrong option (A: "CH3COO2H5"), which does not touch the key.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  hydrocarbons: "Carbon Bonding and Hydrocarbons",
  reactions: "Reactions, Ethanol and Ethanoic Acid",
} as const;

const plan: ReshapePlan = {
  chapter: "Carbon and Its Compounds",
  order: [T.hydrocarbons, T.reactions],
  byPrefix: {
    [T.hydrocarbons]: ["167a1444", "214d3fee", "023e2849", "53a6425b", "90d435fc", "28917dd4", "87fba508"],
    [T.reactions]: ["a652eb6d", "6ca81154", "38a96f68", "3074951a", "28bf2b16"],
  },
  expected: {
    [T.hydrocarbons]: 7,
    [T.reactions]: 5,
  },
  total: 12,
};

export default plan;
