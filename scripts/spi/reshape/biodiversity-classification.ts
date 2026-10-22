/**
 * Reshape plan: SPI "Biodiversity and Classification" (6 q), for scripts/spi/reshape.ts.
 *
 * Read all 6 stems and solutions (2026-10-22). The ingest filed them under 5 one-off subtopics.
 * Cut here into the big picture (the five kingdoms, the ranks of classification, the protists that
 * sit between plants and animals), then the groups inside the plant and animal kingdoms. Never
 * featured: 87335a09 (its solution's note: both the upward and the downward order are correct
 * sequences, so two options can be defended). e4b2cb0f is the one 2022 row.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  kingdoms: "Five Kingdoms and the Ranks of Classification",
  groups: "Plant and Animal Groups",
} as const;

const plan: ReshapePlan = {
  chapter: "Biodiversity and Classification",
  order: [T.kingdoms, T.groups],
  byPrefix: {
    [T.kingdoms]: ["e4b2cb0f", "87335a09", "04504c68", "ec187e78"],
    [T.groups]: ["83fe62a8", "40726a65"],
  },
  expected: {
    [T.kingdoms]: 4,
    [T.groups]: 2,
  },
  total: 6,
};

export default plan;
