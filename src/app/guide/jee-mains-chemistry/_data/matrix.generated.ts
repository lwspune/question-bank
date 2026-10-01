/**
 * GENERATED FILE — do not edit by hand. Run `npm run jee:matrix -- --subject=Chemistry`.
 *
 * The JEE Mains Chemistry chapter x year matrix behind /guide/jee-mains-chemistry, derived from the live
 * bank by scripts/jee-maths/trends-matrix.ts. `-- --check` fails if this file is stale.
 *
 * 6 years · 28 chapters · 3455 PUBLIC PYQ questions from 2021 on
 * (0 earlier reprints left out).
 *
 * Raw counts do NOT compare across years (papers before 2025 printed 30 Chemistry questions, from 2025
 * 25, and the number of sittings varies); a chapter's share of its year does. Read rates through
 * `perPaper` / `windowPerPaper` in src/lib/guide/jeeTrendsMatrix.ts.
 */
import type { JeeMatrixRow, JeeYear } from "@/lib/guide/jeeTrendsMatrix";

export const YEARS: JeeYear[] = [
  {"year":2021,"total":598},
  {"year":2022,"total":643},
  {"year":2023,"total":708},
  {"year":2024,"total":591},
  {"year":2025,"total":443},
  {"year":2026,"total":472},
];

/** Heaviest chapter first. Column i is YEARS[i]. */
export const CHAPTER_MATRIX: JeeMatrixRow[] = [
  {"chapter":"Organic Chemistry - Some Basic Principles and Techniques","total":243,"numeric":70,"calc":86,"counts":[27,39,34,68,41,34]},
  {"chapter":"Coordination Compounds","total":215,"numeric":63,"calc":75,"counts":[35,27,48,36,33,36]},
  {"chapter":"The d- and f-Block Elements","total":214,"numeric":46,"calc":59,"counts":[36,33,39,53,28,25]},
  {"chapter":"Some Basic Concepts of Chemistry","total":205,"numeric":111,"calc":148,"counts":[26,46,39,39,32,23]},
  {"chapter":"The p-Block Elements","total":185,"numeric":16,"calc":25,"counts":[36,35,33,41,21,19]},
  {"chapter":"Chemical Bonding and Molecular Structure","total":176,"numeric":54,"calc":61,"counts":[29,29,27,44,22,25]},
  {"chapter":"Aldehydes, Ketones and Carboxylic Acids","total":165,"numeric":14,"calc":17,"counts":[43,27,26,28,17,24]},
  {"chapter":"Hydrocarbons","total":165,"numeric":31,"calc":38,"counts":[26,28,22,32,23,34]},
  {"chapter":"Amines","total":160,"numeric":24,"calc":31,"counts":[39,20,26,26,19,30]},
  {"chapter":"Biomolecules","total":135,"numeric":16,"calc":20,"counts":[26,24,23,20,20,22]},
  {"chapter":"Equilibrium","total":131,"numeric":60,"calc":78,"counts":[13,24,29,17,22,26]},
  {"chapter":"Structure of Atom","total":130,"numeric":46,"calc":55,"counts":[17,21,26,21,19,26]},
  {"chapter":"Chemical Thermodynamics","total":128,"numeric":77,"calc":83,"counts":[11,22,24,20,29,22]},
  {"chapter":"Chemical Kinetics","total":126,"numeric":80,"calc":90,"counts":[13,23,20,20,24,26]},
  {"chapter":"Electrochemistry","total":125,"numeric":69,"calc":73,"counts":[10,21,25,26,22,21]},
  {"chapter":"Classification of Elements and Periodicity","total":117,"numeric":8,"calc":15,"counts":[16,20,18,22,17,24]},
  {"chapter":"Solutions","total":110,"numeric":60,"calc":72,"counts":[11,19,24,16,18,22]},
  {"chapter":"Alcohols, Phenols and Ethers","total":102,"numeric":10,"calc":13,"counts":[17,19,16,28,8,14]},
  {"chapter":"Haloalkanes and Haloarenes","total":92,"numeric":6,"calc":6,"counts":[9,11,19,23,16,14]},
  {"chapter":"The s-Block Elements","total":88,"numeric":5,"calc":8,"counts":[19,21,42,2,2,2]},
  {"chapter":"General Principles and Processes of Isolation of Elements","total":74,"numeric":5,"calc":5,"counts":[26,23,22,1,2,0]},
  {"chapter":"Environmental Chemistry","total":65,"numeric":0,"calc":0,"counts":[22,20,23,0,0,0]},
  {"chapter":"Hydrogen","total":64,"numeric":4,"calc":4,"counts":[23,18,23,0,0,0]},
  {"chapter":"Surface Chemistry","total":64,"numeric":16,"calc":16,"counts":[20,20,23,1,0,0]},
  {"chapter":"Chemistry in Everyday Life","total":49,"numeric":3,"calc":3,"counts":[12,21,16,0,0,0]},
  {"chapter":"Organic Reaction Mechanisms","total":48,"numeric":8,"calc":8,"counts":[11,6,15,6,7,3]},
  {"chapter":"Polymers","total":46,"numeric":0,"calc":0,"counts":[16,17,12,0,1,0]},
  {"chapter":"Solid State","total":33,"numeric":17,"calc":18,"counts":[9,9,14,1,0,0]},
];

/** PYQ rows before 2021 (reprints), left out of every rate. */
export const EXCLUDED_BEFORE_2021 = 0;
