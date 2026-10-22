/**
 * Reshape plan: CDS GK Biology "Biochemistry" (12 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 12 stems AND solutions (2026-10-23). Two teaching pages. The first is what the body
 * is made of and the carbohydrates: the elements by mass, the classes of biomolecule, sugars by
 * size (mono, di, poly) and starch against glycogen. The second is the proteins (silk, egg white,
 * isoenzymes) and the one piece of energy chemistry the papers ask, lactic acid in a tired muscle.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  carbs: "Elements and Carbohydrates",
  proteins: "Proteins, Enzymes and Lactic Acid",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Biochemistry",
  order: [T.carbs, T.proteins],
  whole: {
    "Carbohydrates and Biomolecules": T.carbs,
    "Protein Structure": T.proteins,
    "Anaerobic Respiration and Fermentation": T.proteins,
  },
  byPrefix: {},
  expected: { [T.carbs]: 7, [T.proteins]: 5 },
  total: 12,
};

export default plan;
