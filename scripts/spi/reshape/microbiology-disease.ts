/**
 * Reshape plan: SPI "Microbiology and Disease" (7 q), for scripts/spi/reshape.ts.
 *
 * Read all 7 stems and solutions (2026-10-22). The ingest filed them under 7 one-off subtopics.
 * Cut here into microbes themselves (where they live, how saprophytes feed, useful microbes and the
 * scientists who used them), then disease (the microbe behind a disease, the organ it attacks). No
 * row is flawed. 6705f0a5 is the one 2022 row.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  microbes: "Microorganisms and Their Uses",
  diseases: "Diseases and Their Causes",
} as const;

const plan: ReshapePlan = {
  chapter: "Microbiology and Disease",
  order: [T.microbes, T.diseases],
  byPrefix: {
    [T.microbes]: ["592485f9", "2f0a4eb1", "ac8ab8ce", "6705f0a5", "9677d4ef"],
    [T.diseases]: ["cfb0a250", "7890be62"],
  },
  expected: {
    [T.microbes]: 5,
    [T.diseases]: 2,
  },
  total: 7,
};

export default plan;
