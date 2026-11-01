/**
 * Reshape plan: SSC CGL Tier I General Awareness Physics "Electricity and Magnetism" (15 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 15 rows (2026-11-02, main session). Six small subtopics cut into one page: circuits, electrical energy,
 * and magnetism with devices. Never featured: 730c35de (its solution opens with a Note).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  electricity: "Circuits, Power and Magnetism",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Electricity and Magnetism",
  order: [T.electricity],
  byPrefix: {
    [T.electricity]: [
      "1a5d4ce9", "a5ade2cb", "585d6e9e", "a174310f", "70037d77", "88b7d45f", "f725271c", "0ea314cd",
      "311dba26", "ff51086a", "56573681", "730c35de", "1dcc1a57", "4347ff2a", "5f739f06",
    ],
  },
  expected: {
    [T.electricity]: 15,
  },
  total: 15,
};

export default plan;
