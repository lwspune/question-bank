/**
 * Reshape plan: SSC CGL Tier I General Awareness Geography "Climatology, Atmosphere and Weather" (42 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 42 rows (2026-11-01, main session). Six small subtopics folded into three pages: the atmosphere
 * and temperature; pressure, monsoon winds and storms; climate types and rainfall. No row is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  atmosphere: "Atmosphere and Temperature",
  winds: "Pressure, Winds and Storms",
  climates: "Climate Types and Rainfall",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Climatology, Atmosphere and Weather",
  order: [T.atmosphere, T.winds, T.climates],
  byPrefix: {
    [T.atmosphere]: [
      "5ea817a5", "0ee37c60", "192ec585", "4e6d3a3d", "854791ee", "9a57655c", "db34f377", "fc8ceeed",
      "b118883f", "70983e7f", "a86759ca", "dfcc2e9f",
    ],
    [T.winds]: [
      "436d1ce6", "f1a569a6", "bd167dc8", "fa6bd2ef", "67acfba2", "b5746e79", "fe663179", "6063eb21",
      "6a70d221", "ad311e95", "af35edef", "14523d40", "acb9a7ef", "c701e4f0", "f9e5ff57", "fb9aee4e",
    ],
    [T.climates]: [
      "3db9ea41", "5367e5f7", "e09bcf1c", "f85e9ad6", "7c354f80", "a3022ac8", "135e7869", "e3129ed0",
      "3e2af657", "e7ba27fc", "60827f02", "ab123f28", "f4cf1e49", "a99c606a",
    ],
  },
  expected: {
    [T.atmosphere]: 12,
    [T.winds]: 16,
    [T.climates]: 14,
  },
  total: 42,
};

export default plan;
