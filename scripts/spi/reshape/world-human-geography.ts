/**
 * Reshape plan: SPI "World and Human Geography" (6 q), for scripts/spi/reshape.ts.
 *
 * Read all 6 stems and solutions (2026-10-22). Six one-off subtopics, six single-fact recall rows:
 * kinds of resources (2), where industry is set up and how we travel (2), a country's nickname and
 * a Himalayan peak (2). Too few for more than one page. Never featured: 1fba597d (its statements are
 * numbered i to iv but its options say "Only A" to "Only D").
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Resources, Industry and World Places",
} as const;

const plan: ReshapePlan = {
  chapter: "World and Human Geography",
  order: [T.basics],
  byPrefix: {
    [T.basics]: ["913df671", "1fba597d", "03e41d9c", "f00265f6", "5a04e846", "18e91f5a"],
  },
  expected: {
    [T.basics]: 6,
  },
  total: 6,
};

export default plan;
