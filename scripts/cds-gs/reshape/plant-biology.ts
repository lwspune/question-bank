/**
 * Reshape plan: CDS GK Biology "Plant Biology" (31 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 31 stems AND solutions (2026-10-23). Three teaching pages. The first is the plant's
 * organs: modified roots and stems, the leaf and its work, and fruits and seed dispersal. The second
 * is the tissues (meristems, simple tissues, xylem and phloem) with what xylem does next: the rise
 * of water, guttation, and the water-saving build of xerophytes and halophytes. The third is how a
 * plant makes and runs on food: photosynthesis, its pigments, the mineral nutrients and the
 * hormones. The catch-all "Transpiration, Tropisms and Plant Processes" is split between them.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  organs: "Plant Organs",
  tissues: "Tissues and Water Transport",
  food: "Photosynthesis, Nutrients and Hormones",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Plant Biology",
  order: [T.organs, T.tissues, T.food],
  whole: {
    "Plant Morphology — Roots, Stems and Modifications": T.organs,
    "Seed, Fruit and Embryo Development": T.organs,
    "Plant Tissues and Meristems": T.tissues,
    "Transpiration, Tropisms and Plant Processes": T.tissues,
    "Photosynthesis": T.food,
  },
  byPrefix: {
    // A green leaf's primary functions: the leaf page.
    [T.organs]: ["9b97a812"],
    // Hormones and a micronutrient: the food page.
    [T.food]: ["882d7164", "b21fd326", "a1807a62", "2829378f"],
  },
  expected: { [T.organs]: 7, [T.tissues]: 13, [T.food]: 11 },
  total: 31,
};

export default plan;
