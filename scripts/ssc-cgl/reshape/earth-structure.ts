/**
 * Reshape plan: SSC CGL Tier I General Awareness Geography "Earth's Structure, Landforms and Geological Time" (26 q),
 * for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 26 rows (2026-11-01, main session). Five small subtopics folded into two pages: the interior, rocks and
 * earthquakes; landforms, weathering and mass movements. No row is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  interior: "Earth's Interior, Rocks and Earthquakes",
  landforms: "Landforms, Weathering and Mass Movements",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Earth's Structure, Landforms and Geological Time",
  order: [T.interior, T.landforms],
  byPrefix: {
    [T.interior]: [
      "9b5db346", "af4dda14", "d9f9d820", "ebac65b2", "0e28cd68", "227b912f", "a6249ab9", "db52f251",
      "1144124f", "41850a22", "506f26a8", "692ad2c0", "5b968902", "76eff3c4", "632467d2",
    ],
    [T.landforms]: [
      "21e2b7c3", "4ae08425", "bf621b7e", "ca7ba655", "028169c4", "2aed9071", "6da2393d", "7d7d3f57",
      "d4198ce2", "fb3bac17", "fdc970dc",
    ],
  },
  expected: {
    [T.interior]: 15,
    [T.landforms]: 11,
  },
  total: 26,
};

export default plan;
