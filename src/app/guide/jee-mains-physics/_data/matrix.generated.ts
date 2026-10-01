/**
 * GENERATED FILE — do not edit by hand. Run `npm run jee:matrix -- --subject=Physics`.
 *
 * The JEE Mains Physics chapter x year matrix behind /guide/jee-mains-physics, derived from the live
 * bank by scripts/jee-maths/trends-matrix.ts. `-- --check` fails if this file is stale.
 *
 * 6 years · 28 chapters · 3482 PUBLIC PYQ questions from 2021 on
 * (0 earlier reprints left out).
 *
 * Raw counts do NOT compare across years (papers before 2025 printed 30 Physics questions, from 2025
 * 25, and the number of sittings varies); a chapter's share of its year does. Read rates through
 * `perPaper` / `windowPerPaper` in src/lib/guide/jeeTrendsMatrix.ts.
 */
import type { JeeMatrixRow, JeeYear } from "@/lib/guide/jeeTrendsMatrix";

export const YEARS: JeeYear[] = [
  {"year":2021,"total":601},
  {"year":2022,"total":658},
  {"year":2023,"total":719},
  {"year":2024,"total":589},
  {"year":2025,"total":444},
  {"year":2026,"total":471},
];

/** Heaviest chapter first. Column i is YEARS[i]. */
export const CHAPTER_MATRIX: JeeMatrixRow[] = [
  {"chapter":"Electrostatics","total":251,"numeric":70,"counts":[34,48,48,40,42,39]},
  {"chapter":"Current Electricity","total":230,"numeric":98,"counts":[39,49,50,45,18,29]},
  {"chapter":"Units and Measurements","total":190,"numeric":19,"counts":[29,33,26,39,31,32]},
  {"chapter":"Moving Charges and Magnetism","total":172,"numeric":49,"counts":[23,33,38,36,22,20]},
  {"chapter":"Ray Optics","total":169,"numeric":51,"counts":[23,25,28,19,40,34]},
  {"chapter":"System of Particles and Rotational Motion","total":168,"numeric":74,"counts":[30,25,28,25,29,31]},
  {"chapter":"Motion in a Plane","total":151,"numeric":36,"counts":[25,33,34,29,17,13]},
  {"chapter":"Semiconductor Electronics","total":145,"numeric":23,"counts":[31,29,26,22,18,19]},
  {"chapter":"Dual Nature of Radiation and Matter","total":131,"numeric":8,"counts":[30,22,26,20,18,15]},
  {"chapter":"Gravitation","total":128,"numeric":11,"counts":[29,21,36,20,12,10]},
  {"chapter":"Thermodynamics","total":125,"numeric":21,"counts":[27,20,22,17,21,18]},
  {"chapter":"Work, Energy and Power","total":123,"numeric":36,"counts":[23,22,29,20,15,14]},
  {"chapter":"Oscillations","total":120,"numeric":38,"counts":[35,17,27,16,11,14]},
  {"chapter":"Wave Optics","total":119,"numeric":45,"counts":[13,20,20,23,20,23]},
  {"chapter":"Alternating Current","total":113,"numeric":38,"counts":[21,26,22,26,8,10]},
  {"chapter":"Mechanical Properties of Fluids","total":113,"numeric":37,"counts":[10,18,21,25,20,19]},
  {"chapter":"Kinetic Theory","total":110,"numeric":11,"counts":[21,22,22,20,12,13]},
  {"chapter":"Electromagnetic Waves","total":108,"numeric":14,"counts":[14,22,23,18,13,18]},
  {"chapter":"Motion in a Straight Line","total":103,"numeric":28,"counts":[18,23,24,18,8,12]},
  {"chapter":"Laws of Motion","total":101,"numeric":15,"counts":[14,27,16,25,7,12]},
  {"chapter":"Nuclei","total":97,"numeric":23,"counts":[17,20,24,17,6,13]},
  {"chapter":"Atoms","total":92,"numeric":29,"counts":[15,12,21,22,11,11]},
  {"chapter":"Electromagnetic Induction","total":90,"numeric":41,"counts":[12,12,26,15,8,17]},
  {"chapter":"Waves","total":80,"numeric":40,"counts":[12,18,20,10,10,10]},
  {"chapter":"Mechanical Properties of Solids","total":78,"numeric":33,"counts":[13,14,17,13,9,12]},
  {"chapter":"Thermal Properties of Matter","total":66,"numeric":19,"counts":[14,15,14,2,12,9]},
  {"chapter":"Communication Systems","total":63,"numeric":11,"counts":[18,21,24,0,0,0]},
  {"chapter":"Magnetism and Matter","total":46,"numeric":10,"counts":[11,11,7,7,6,4]},
];

/** PYQ rows before 2021 (reprints), left out of every rate. */
export const EXCLUDED_BEFORE_2021 = 0;
