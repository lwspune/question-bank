/**
 * Reshape plan: SSC CGL Tier I General Awareness Biology "Cell Biology" (31 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 31 rows (2026-11-01, main session). Seven small subtopics cut into two pages: the cell's parts, and its
 * processes (division, DNA copying, respiration). Never featured: 8dbe22e1, aabe998a and c5846f8d (they ask about
 * an illustration).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  structure: "Cell Structure and Organelles",
  processes: "Cell Division and Respiration",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Cell Biology",
  order: [T.structure, T.processes],
  byPrefix: {
    [T.structure]: [
      "0b761b0b", "62475551", "707aa82d", "803b5a97", "e8fb9bb1", "7906bbe2", "4e00ad0b", "ea70c635",
      "0fbc395a", "6443c208", "6d17072a", "9dbd47ec", "0ebb6ab3", "2bfffb9c", "8dbe22e1", "aabe998a",
      "c5846f8d", "84bc0cbb", "92111483", "9a1b3ff1", "b478d111", "c0138daf", "a128c2ed", "d530bb0a",
      "cb5ab93e",
    ],
    [T.processes]: [
      "4161455a", "f959afa8", "8c09e840", "76f1c274", "0c960c5e", "d99ebd55",
    ],
  },
  expected: {
    [T.structure]: 25,
    [T.processes]: 6,
  },
  total: 31,
};

export default plan;
