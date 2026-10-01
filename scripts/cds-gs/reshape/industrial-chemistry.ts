/**
 * Reshape plan — CDS GK Chemistry "Industrial and Applied Chemistry" (14 q), for
 * scripts/cds-gs/reshape.ts.
 *
 * Read all 14 stems AND solutions (2026-10-02). Three teaching pages: industrial gases and
 * manufacturing (cryogenic nitrogen, gases in bulbs and packaging, paper-making); fertilizers;
 * and glass, cement and polymers, which joins the building-materials subtopic with the two
 * plastics rows (thermosetting plastic, nylon-6) that were filed under "Common Industrial
 * Substances and Alloys".
 */
import type { ReshapePlan } from "../reshape";

const T = {
  gases: "Industrial Gases and Manufacturing",
  fert: "Fertilizers",
  materials: "Glass, Cement and Polymers",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Industrial and Applied Chemistry",
  order: [T.gases, T.fert, T.materials],
  whole: {
    "Industrial Gases, Manufacturing and Reactions": T.gases,
    "Cement, Glass and Building Materials": T.materials,
    "Common Industrial Substances and Alloys": T.materials,
  },
  byPrefix: {},
  expected: { [T.gases]: 6, [T.fert]: 3, [T.materials]: 5 },
  total: 14,
};

export default plan;
