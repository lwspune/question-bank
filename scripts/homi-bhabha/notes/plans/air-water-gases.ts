/**
 * Reshape plan: Homi Bhabha Std IX "Air, Water and Gases" (10 q, 2017, 2018, the November and
 * December 2021 online papers, 2023 and 2024), for scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 10 stems and solutions. The ingest filed them under three subtopics; cut here by what a
 * question asks: the air (how the atmosphere protects, its gases and their boiling points) with
 * water (electrolysis, what sea water holds), then preparing and testing gases (hydrogen, carbon
 * dioxide, the lead acetate test). No row carries a notice. Not featured: d190b437 (rests on
 * calling the -78.5 °C sublimation point a boiling point), 9755e9ed (same: CO2 has no boiling
 * point at normal pressure).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  air: "Air and Water",
  gases: "Preparing and Testing Gases",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Air, Water and Gases",
  order: [T.air, T.gases],
  byPrefix: {
    [T.air]: ["fccd6612", "9755e9ed", "e1b6fe29", "9ff12b83"],
    [T.gases]: ["ca6ad97a", "7ab6a7d2", "16176602", "d190b437", "29e875db", "02cab2d9"],
  },
  expected: { [T.air]: 4, [T.gases]: 6 },
  total: 10,
};

export default plan;
