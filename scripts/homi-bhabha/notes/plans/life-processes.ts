/**
 * Reshape plan: Homi Bhabha Std IX "Life Processes" (28 q), for scripts/homi-bhabha/reshape.ts.
 *
 * Read all 28 stems and solutions. Cut by what a question asks: digestion (the glands and their
 * juices, insect mouthparts), respiration (inside the cell, aerobic against anaerobic, and the
 * breathing organs of animals), transport and excretion (osmosis, transpiration, the kidney,
 * dialysis, plant wastes), and control and coordination (the endocrine glands, the pancreatic islets,
 * reflexes and tropic movements). No row carries a notice. Not featured: efe3577a (the pancreas is
 * also defensible as the gland that makes food alkaline).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  nutrition: "Digestion and Nutrition",
  respiration: "Respiration",
  transport: "Transport and Excretion",
  control: "Control and Coordination",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Life Processes",
  order: [T.nutrition, T.respiration, T.transport, T.control],
  byPrefix: {
    [T.nutrition]: ["4817bf59", "efe3577a", "f53728e1", "40a49140", "37c171db"],
    [T.respiration]: ["9c5d2919", "e80a4695", "3b8ef15c", "fdb4b485"],
    [T.transport]: ["981a12fa", "9fe56591", "ce4d55c1", "2c25d5b9", "32c8ea15", "3ef5f1e7", "fdad5ca7", "cf3458d6"],
    [T.control]: [
      "afc51e73", "5e8321eb", "5dbba3fc", "d6174300",
      "f910a256", "5de3e68f", "6bb6ede1", "5a18d4cc", "5fe2928a",
      "8131e09d", "e5f610fd",
    ],
  },
  expected: { [T.nutrition]: 5, [T.respiration]: 4, [T.transport]: 8, [T.control]: 11 },
  total: 28,
};

export default plan;
