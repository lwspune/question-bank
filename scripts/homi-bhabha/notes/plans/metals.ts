/**
 * Reshape plan: Homi Bhabha Std IX "Metals and Their Compounds" (16 q, all eight papers), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 16 stems and solutions. The ingest filed them under six subtopics; cut here by what a
 * question asks: the properties and uses of metals with their ores, the reactivity series and
 * displacement, and corrosion with alloys. Never featured: bef840ae (carries a notice: pairs B and D
 * both look wrong), 0247bc89 (its observation table cannot be real: P displaces calcium but not
 * magnesium).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  properties: "Properties, Uses and Ores of Metals",
  reactivity: "Reactivity Series and Displacement",
  corrosion: "Corrosion and Alloys",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Metals and Their Compounds",
  order: [T.properties, T.reactivity, T.corrosion],
  byPrefix: {
    [T.properties]: ["31e787a0", "bef840ae", "f01f5557", "5c2abab5", "126399bf", "19cb51b5"],
    [T.reactivity]: ["ef8b66de", "22645d85", "011164dd", "0247bc89"],
    [T.corrosion]: ["e58e5b6f", "bec306be", "d7a99636", "155cb6dc", "c68459a9", "cdfa6a74"],
  },
  expected: { [T.properties]: 6, [T.reactivity]: 4, [T.corrosion]: 6 },
  total: 16,
};

export default plan;
