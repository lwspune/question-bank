/**
 * Reshape plan: SPI "World History" (5 q), for scripts/spi/reshape.ts.
 *
 * Read all 5 stems and solutions (2026-10-22). Too few for more than one page: two 2022 questions on
 * historiography (Balbharati Class 10: Foucault, Public History) and three on the modern world
 * (women's vote in the USA and the UK, Mustafa Kemal of Turkey). Never featured: 1309415f (Kemal was
 * born in Salonika, Ottoman then and Greek now; the key "Turkey" stands for the Ottoman Empire).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  world: "Historiography and the Modern World",
} as const;

const plan: ReshapePlan = {
  chapter: "World History",
  order: [T.world],
  byPrefix: {
    [T.world]: ["9cd6a65d", "e2a0e553", "1309415f", "8fed39e4", "a7de2860"],
  },
  expected: {
    [T.world]: 5,
  },
  total: 5,
};

export default plan;
