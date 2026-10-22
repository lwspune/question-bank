/**
 * Reshape plan: SPI "Ecology and Environment" (7 q), for scripts/spi/reshape.ts.
 *
 * Read all 7 stems and solutions (2026-10-22). The ingest filed them under 7 one-off subtopics.
 * Cut here into the ecosystem itself (its parts, food chains, pyramids), then what people do to it
 * (waste, threatened species, migrants). Never featured: 8e7aeccb (its solution carries a note that
 * two pyramids can be defended, and the options are pictures). e92e9a96 is the one 2022 row.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  food: "Ecosystems and Food Chains",
  environment: "Waste and Wildlife Conservation",
} as const;

const plan: ReshapePlan = {
  chapter: "Ecology and Environment",
  order: [T.food, T.environment],
  byPrefix: {
    [T.food]: ["94df979e", "a54851e5", "8e7aeccb"],
    [T.environment]: ["2d3e8ab7", "538c1a11", "e92e9a96", "9268a26f"],
  },
  expected: {
    [T.food]: 3,
    [T.environment]: 4,
  },
  total: 7,
};

export default plan;
