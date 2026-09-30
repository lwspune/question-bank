/**
 * GENERATED FILE — do not edit by hand. Run `npm run jee:matrix`.
 *
 * The JEE Mains Maths chapter x year matrix behind /guide/jee-mains-maths, derived from the live
 * bank by scripts/jee-maths/trends-matrix.ts. `-- --check` fails if this file is stale.
 *
 * 6 years · 27 chapters · 3556 PUBLIC PYQ questions from 2021 on
 * (9 earlier reprints left out).
 *
 * Raw counts do NOT compare across years (papers before 2025 printed 30 Maths questions, from 2025
 * 25, and the number of sittings varies); a chapter's share of its year does. Read rates through
 * `perPaper` / `windowPerPaper` in src/lib/guide/jeeTrendsMatrix.ts.
 */
import type { JeeMatrixRow, JeeYear } from "@/lib/guide/jeeTrendsMatrix";

export const YEARS: JeeYear[] = [
  {"year":2021,"total":685},
  {"year":2022,"total":654},
  {"year":2023,"total":707},
  {"year":2024,"total":585},
  {"year":2025,"total":450},
  {"year":2026,"total":475},
];

/** Heaviest chapter first. Column i is YEARS[i]. */
export const CHAPTER_MATRIX: JeeMatrixRow[] = [
  {"chapter":"Conic Sections","total":346,"numeric":105,"counts":[63,70,55,48,55,55]},
  {"chapter":"Three Dimensional Geometry","total":268,"numeric":76,"counts":[47,45,70,41,33,32]},
  {"chapter":"Sequences and Series","total":221,"numeric":81,"counts":[38,42,47,33,29,32]},
  {"chapter":"Relations and Functions","total":199,"numeric":47,"counts":[29,27,42,37,34,30]},
  {"chapter":"Definite Integration","total":196,"numeric":65,"counts":[42,37,36,33,21,27]},
  {"chapter":"Vector Algebra","total":182,"numeric":44,"counts":[28,29,44,37,20,24]},
  {"chapter":"Differential Equations","total":180,"numeric":47,"counts":[35,39,25,39,19,23]},
  {"chapter":"Binomial Theorem","total":165,"numeric":75,"counts":[31,23,47,25,21,18]},
  {"chapter":"Permutations and Combinations","total":160,"numeric":92,"counts":[24,23,46,22,21,24]},
  {"chapter":"Probability","total":149,"numeric":29,"counts":[29,30,25,24,22,19]},
  {"chapter":"Complex Numbers","total":142,"numeric":41,"counts":[30,27,25,23,18,19]},
  {"chapter":"Application of Derivatives","total":140,"numeric":38,"counts":[35,39,19,25,11,11]},
  {"chapter":"Determinants","total":136,"numeric":22,"counts":[29,20,29,27,19,12]},
  {"chapter":"Limits and Continuity","total":136,"numeric":34,"counts":[35,26,17,24,18,16]},
  {"chapter":"Quadratic Equations","total":119,"numeric":38,"counts":[23,18,22,19,16,21]},
  {"chapter":"Application of Integrals","total":117,"numeric":41,"counts":[13,20,25,21,19,19]},
  {"chapter":"Matrices","total":115,"numeric":44,"counts":[22,25,21,14,13,20]},
  {"chapter":"Straight Lines","total":112,"numeric":20,"counts":[18,17,16,27,18,16]},
  {"chapter":"Statistics","total":88,"numeric":30,"counts":[16,13,20,16,8,15]},
  {"chapter":"Differentiation","total":77,"numeric":24,"counts":[17,15,15,17,6,7]},
  {"chapter":"Inverse Trigonometric Functions","total":70,"numeric":16,"counts":[18,15,12,7,10,8]},
  {"chapter":"Mathematical Reasoning","total":67,"numeric":2,"counts":[21,22,24,0,0,0]},
  {"chapter":"Trigonometric Equations","total":51,"numeric":17,"counts":[11,13,6,9,6,6]},
  {"chapter":"Trigonometric Identities","total":48,"numeric":6,"counts":[11,7,4,7,5,14]},
  {"chapter":"Indefinite Integration","total":46,"numeric":14,"counts":[10,4,9,8,8,7]},
  {"chapter":"Height & Distance","total":15,"numeric":0,"counts":[6,7,2,0,0,0]},
  {"chapter":"Properties of Triangle","total":11,"numeric":5,"counts":[4,1,4,2,0,0]},
];

/** PYQ rows before 2021 (reprints), left out of every rate. */
export const EXCLUDED_BEFORE_2021 = 9;
