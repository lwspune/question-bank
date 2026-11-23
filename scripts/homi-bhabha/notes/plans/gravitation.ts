/**
 * Reshape plan: Homi Bhabha Std IX "Gravitation" (10 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 10 stems and solutions. The ingest filed them under three subtopics; cut here by what a
 * question asks: the law F = Gm₁m₂/r² and what gravity does, G against g, how g changes with height,
 * depth and latitude, and weight; then free fall: the equations with u = 0, what changes and what
 * stays the same while a body falls, and weight speeding a car down a slope. No row carries a notice.
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  law: "Law of Gravitation, g and Weight",
  freefall: "Free Fall",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Gravitation",
  order: [T.law, T.freefall],
  byPrefix: {
    [T.law]: ["2e202e45", "9300ab50", "5fe07a40", "1866cbd7", "385e5e08", "2d8984db"],
    [T.freefall]: ["72da0a25", "b6b60ba3", "d273bd79", "8b384142"],
  },
  expected: { [T.law]: 6, [T.freefall]: 4 },
  total: 10,
};

export default plan;
