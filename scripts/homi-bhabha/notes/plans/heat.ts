/**
 * Reshape plan: Homi Bhabha Std IX "Heat" (18 q), for scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 18 stems and solutions (and both figures). The ingest filed them under six subtopics; cut
 * here by what a question asks: what temperature is and converting between °C, °F and kelvin; how
 * heat moves, cooling by evaporation and Q = mcΔT; expansion on heating and water's anomalous
 * behaviour. Never featured: 0499083b (carries a notice: a Pune March night defends A as well as B).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  temperature: "Temperature and Its Scales",
  transfer: "Heat Transfer and Specific Heat",
  expansion: "Expansion and Anomalous Behaviour of Water",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Heat",
  order: [T.temperature, T.transfer, T.expansion],
  byPrefix: {
    [T.temperature]: ["8f31c308", "878822af", "dbc2e748", "0499083b", "140596fb", "1cf8adcd", "c1395481", "1f636f32", "7316f239"],
    [T.transfer]: ["9d859ec3", "9939e7a9", "cac657d2", "a00b0082"],
    [T.expansion]: ["b0d09042", "27501d6b", "3baef0dd", "bcf9f71c", "337338f9"],
  },
  expected: { [T.temperature]: 9, [T.transfer]: 4, [T.expansion]: 5 },
  total: 18,
};

export default plan;
