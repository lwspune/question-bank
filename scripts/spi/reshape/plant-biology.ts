/**
 * Reshape plan: SPI "Plant Biology" (8 q), for scripts/spi/reshape.ts.
 *
 * Read all 8 stems and solutions (2026-10-22). The ingest filed them under 8 one-off subtopics.
 * Cut here into how a plant gets and uses food (photosynthesis and its experiments, stomata, root
 * nodules, respiration in seeds), then how a plant responds (hormones and tropisms). No row is
 * flawed; c7e8632e calls light "day or night", which is loose but leaves one right option.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  nutrition: "Nutrition and Respiration in Plants",
  hormones: "Plant Hormones and Movements",
} as const;

const plan: ReshapePlan = {
  chapter: "Plant Biology",
  order: [T.nutrition, T.hormones],
  byPrefix: {
    [T.nutrition]: ["8633d61e", "7e7a297d", "9298a8d9", "3c0b87be", "90581c1b", "14930942"],
    [T.hormones]: ["f8adef75", "c7e8632e"],
  },
  expected: {
    [T.nutrition]: 6,
    [T.hormones]: 2,
  },
  total: 8,
};

export default plan;
