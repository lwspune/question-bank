/**
 * Reshape plan: SPI "Laws of Motion and Forces" (5 q), for scripts/spi/reshape.ts.
 *
 * Read all 5 stems and solutions (2026-10-22). The ingest filed them under 5 one-off subtopics.
 * Cut here by technique: momentum (force as rate of change of momentum, a gun firing bullets,
 * conservation in a collision), then named facts about forces (the four fundamental forces and the
 * three classes of lever). No row is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  momentum: "Momentum and Force",
  forces: "Fundamental Forces and Levers",
} as const;

const plan: ReshapePlan = {
  chapter: "Laws of Motion and Forces",
  order: [T.momentum, T.forces],
  byPrefix: {
    [T.momentum]: ["d7b31360", "dfd53a32", "31dc8fba"],
    [T.forces]: ["4b546455", "2f278714"],
  },
  expected: {
    [T.momentum]: 3,
    [T.forces]: 2,
  },
  total: 5,
};

export default plan;
