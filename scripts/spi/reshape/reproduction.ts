/**
 * Reshape plan: SPI "Reproduction" (7 q), for scripts/spi/reshape.ts.
 *
 * Read all 7 stems and solutions (2026-10-22). The ingest filed them under 7 one-off subtopics.
 * Cut here the way the Class 10 book runs: reproduction in flowering plants (bisexual flowers,
 * pollination, fertilisation), then human reproduction (organs, hormones, the ovary's cycle,
 * contraception). Never featured: 7820ce09 (statement iv is "both i and ii", so the options naming i
 * and ii alone are also true), 3a64ffae and e817f1ff (both rest on a figure I could not see).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  plants: "Reproduction in Flowering Plants",
  human: "Human Reproduction",
} as const;

const plan: ReshapePlan = {
  chapter: "Reproduction",
  order: [T.plants, T.human],
  byPrefix: {
    [T.plants]: ["6c94b283", "f6cb0700", "3a64ffae"],
    [T.human]: ["131cd62b", "7820ce09", "e817f1ff", "17e1a5ee"],
  },
  expected: {
    [T.plants]: 3,
    [T.human]: 4,
  },
  total: 7,
};

export default plan;
