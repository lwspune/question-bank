/**
 * Reshape plan: SPI "Chemical Reactions" (8 q), for scripts/spi/reshape.ts.
 *
 * Read all 8 stems and solutions (2026-10-22). The ingest filed them under 8 one-off subtopics.
 * Cut here into two pages: writing equations and naming the types of reaction (reactants and
 * products, state symbols, collision, combination, decomposition, precipitation), then oxidation
 * and its everyday effects (rusting, rancidity). No key is disputed. Never featured: a52086f4 (says
 * molecules need the "same" orientation, where the idea is the right orientation; collision theory is
 * above Class 10) and 116184dd (its stem prints one sentence twice).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  equations: "Chemical Equations and Types of Reactions",
  oxidation: "Oxidation, Corrosion and Rancidity",
} as const;

const plan: ReshapePlan = {
  chapter: "Chemical Reactions",
  order: [T.equations, T.oxidation],
  byPrefix: {
    [T.equations]: ["ac3c1662", "a998a84f", "a52086f4", "4cfb78b0", "116184dd", "ce2469c5"],
    [T.oxidation]: ["35be49f2", "27ffc336"],
  },
  expected: {
    [T.equations]: 6,
    [T.oxidation]: 2,
  },
  total: 8,
};

export default plan;
