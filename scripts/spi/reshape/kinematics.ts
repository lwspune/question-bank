/**
 * Reshape plan: SPI "Kinematics and Motion" (7 q), for scripts/spi/reshape.ts.
 *
 * Read all 7 stems and solutions and both figures (2026-10-22). The ingest filed them under 6 one-off
 * subtopics. Cut here by technique: describing motion in words and numbers (rest and motion are
 * relative, distance and displacement, average speed), then reading motion off graphs and the
 * equations of motion (v-t area and slope, constant-speed graphs, a jump to a height). No row is
 * flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  describe: "Distance, Displacement and Speed",
  graphs: "Motion Graphs and Equations of Motion",
} as const;

const plan: ReshapePlan = {
  chapter: "Kinematics and Motion",
  order: [T.describe, T.graphs],
  byPrefix: {
    [T.describe]: ["d2bceaf6", "01881cf2", "04cf8503"],
    [T.graphs]: ["3004b31f", "80632377", "ece24309", "e914e30d"],
  },
  expected: {
    [T.describe]: 3,
    [T.graphs]: 4,
  },
  total: 7,
};

export default plan;
