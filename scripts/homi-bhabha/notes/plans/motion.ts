/**
 * Reshape plan: Homi Bhabha Std IX "Motion" (18 q), for scripts/homi-bhabha/reshape.ts
 * (2026-11-19).
 *
 * Read all 18 stems and solutions and the six graphs. The ingest filed them under seven subtopics;
 * cut here by what a question asks: rest and kinds of motion, distance against displacement and
 * speed against velocity (with speed sums on straight and circular paths); then acceleration with
 * the equations of motion, and reading displacement-time and velocity-time graphs. Never featured:
 * 4c93b709 (carries a notice: the printed paper cuts off a line).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  speed: "Speed and Velocity",
  graphs: "Acceleration and Graphs of Motion",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Motion",
  order: [T.speed, T.graphs],
  byPrefix: {
    [T.speed]: ["09d6018f", "1fced7e4", "11b10935", "b941ad94", "3aba0b35", "4c93b709", "ea4f9068", "3e50f990", "18346637"],
    [T.graphs]: ["1ad63cb2", "206dfaed", "0961f149", "31a6e084", "6a9a001e", "35735fbb", "7e5b94fd", "e8d330a8", "649671f2"],
  },
  expected: { [T.speed]: 9, [T.graphs]: 9 },
  total: 18,
};

export default plan;
