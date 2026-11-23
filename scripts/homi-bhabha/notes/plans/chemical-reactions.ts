/**
 * Reshape plan: Homi Bhabha Std IX "Chemical Reactions" (21 q, all eight papers), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 21 stems and solutions. The ingest filed them under six subtopics; cut here by what a
 * question asks: physical and chemical change with the kinds of reaction and the heat they give out
 * or take in, writing and balancing equations and finding the missing substance, and oxidation,
 * reduction, their agents and catalysts. Never featured (each carries a notice): 58417ecb (reaction
 * (i) is balanced too), 52904e6b (the switch in the figure is open).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  types: "Types of Chemical Reactions",
  equations: "Chemical Equations",
  redox: "Oxidation, Reduction and Catalysts",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Chemical Reactions",
  order: [T.types, T.equations, T.redox],
  byPrefix: {
    [T.types]: ["b99afe87", "3e7534c6", "52904e6b", "8f78f92d", "3a0db9b1", "8d6a623e", "8d5e7a1d"],
    [T.equations]: ["cf860b75", "c7958104", "58417ecb", "b41c2673", "b4a90bdc", "d1f77db2"],
    [T.redox]: ["f9f5ca89", "b38b4f52", "093e4126", "24aacebd", "eb5e527d", "8a088f1f", "0e5b8947", "b1d47701"],
  },
  expected: { [T.types]: 7, [T.equations]: 6, [T.redox]: 8 },
  total: 21,
};

export default plan;
