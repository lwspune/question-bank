/**
 * Reshape plan: SSC CGL Tier I Reasoning "Order, Ranking and Arrangement" (19 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 19 stems and solutions (2026-10-23). Every row is from the 2025 shifts. The ingest used
 * three subtopics; "Linear and Circular Seating" held only three rows, and they need the same
 * left-and-right reading as a rank in a row, so they join "Ranking and Position" (rank from both
 * ends, people between, a swap, seating directions). "Scheduling and Puzzles" keeps the date chains,
 * the chronological ordering row, the floor puzzles and the one month-and-profession grid. Never
 * featured: 6e9c308a (its solution opens with a Note: SSC's key is wrong) and c0a47e94 (B's facing
 * direction is never given, so "Cannot be determined" is defensible against the key).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ranks: "Ranking and Position",
  puzzles: "Scheduling and Puzzles",
} as const;

const plan: ReshapePlan = {
  chapter: "Order, Ranking and Arrangement",
  subject: "Reasoning",
  order: [T.ranks, T.puzzles],
  byPrefix: {
    [T.ranks]: [
      "e042a9b6", "14f99625", "5d84cf3a", "636209a0",
      "c0a47e94", "7592f1b7", "fbd3333a",
    ],
    [T.puzzles]: [
      "32869ca1", "a1db1225", "6e9c308a", "8e926ba0", "ce8efb4f", "43739e34",
      "d801dcb6", "8d7e7dd3", "7d5767ce", "c89dbddd", "567f965f",
      "7136199c",
    ],
  },
  expected: {
    [T.ranks]: 7,
    [T.puzzles]: 12,
  },
  total: 19,
};

export default plan;
