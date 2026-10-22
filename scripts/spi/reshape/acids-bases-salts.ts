/**
 * Reshape plan: SPI "Acids, Bases and Salts" (8 q), for scripts/spi/reshape.ts.
 *
 * Read all 8 stems and solutions (2026-10-22). The ingest filed them under 8 one-off subtopics.
 * Cut here into two pages: acids and bases themselves (replaceable hydrogen, strong and weak,
 * indicators), then salts (acid salts and the nature of a salt's solution, the salts made from common
 * salt, tests for ions). Never featured: 21f7074b (no printed option lists all three products made
 * from common salt; the key takes the closest one).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  acids: "Acids, Bases and Indicators",
  salts: "Salts and Their Uses",
} as const;

const plan: ReshapePlan = {
  chapter: "Acids, Bases and Salts",
  order: [T.acids, T.salts],
  byPrefix: {
    [T.acids]: ["c45a1ab6", "e5298e29", "11559c0a"],
    [T.salts]: ["3a2852fe", "9495e56a", "ccd4c87d", "21f7074b", "4dc1c0ce"],
  },
  expected: {
    [T.acids]: 3,
    [T.salts]: 5,
  },
  total: 8,
};

export default plan;
