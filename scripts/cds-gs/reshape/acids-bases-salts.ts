/**
 * Reshape plan — CDS GK Chemistry "Acids, Bases and Salts" (40 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 40 stems AND solutions (2026-10-01). The classification already split the chapter
 * by topic; the re-cut renames the four pages for what they teach and folds the one-row
 * "Water of Crystallization" into the salts page, where washing soda, plaster of Paris and
 * blue vitriol are already taught by formula. No row changes page otherwise.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  theory: "Acids, Bases and Oxides",
  ph: "pH Scale and Indicators",
  acids: "Acids in Food and the Body",
  salts: "Common Salts and Carbonates",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Acids, Bases and Salts",
  order: [T.theory, T.ph, T.acids, T.salts],
  whole: {
    "Acid-Base Theory: Concepts, Oxides and Electrolytes": T.theory,
    "pH Scale and Common Substances": T.ph,
    "Common Acids: Names, Formulas and Uses": T.acids,
    "Salts and Common Compounds": T.salts,
    "Water of Crystallization": T.salts,
  },
  byPrefix: {},
  expected: { [T.theory]: 12, [T.ph]: 7, [T.acids]: 11, [T.salts]: 10 },
  total: 40,
};

export default plan;
