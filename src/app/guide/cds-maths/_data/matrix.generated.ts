/**
 * GENERATED FILE — do not edit by hand. Run `npm run cds:matrix`.
 *
 * The CDS Maths chapter x sitting matrix behind /guide/cds-maths/trends, derived from the live bank
 * by scripts/cds-maths/trends-matrix.ts. `-- --check` fails if this file is stale.
 *
 * 21 papers · 26 chapters · 2096 PUBLIC PYQ questions.
 *
 * Every CDS Maths paper is 100 questions, so raw counts compare across every column. A zero is a
 * measured zero, not missing data.
 */
import type { MatrixPaper, MatrixRow } from "@/app/guide/_components/ExamPaperMatrix";

export const PAPERS: MatrixPaper[] = [
  {"id":"2016-2","year":2016,"label":"II","title":"CDS (II) 2016"},
  {"id":"2017-1","year":2017,"label":"I","title":"CDS (I) 2017"},
  {"id":"2017-2","year":2017,"label":"II","title":"CDS (II) 2017"},
  {"id":"2018-1","year":2018,"label":"I","title":"CDS (I) 2018"},
  {"id":"2018-2","year":2018,"label":"II","title":"CDS (II) 2018"},
  {"id":"2019-1","year":2019,"label":"I","title":"CDS (I) 2019"},
  {"id":"2019-2","year":2019,"label":"II","title":"CDS (II) 2019"},
  {"id":"2020-1","year":2020,"label":"I","title":"CDS (I) 2020"},
  {"id":"2020-2","year":2020,"label":"II","title":"CDS (II) 2020"},
  {"id":"2021-1","year":2021,"label":"I","title":"CDS (I) 2021"},
  {"id":"2021-2","year":2021,"label":"II","title":"CDS (II) 2021"},
  {"id":"2022-1","year":2022,"label":"I","title":"CDS (I) 2022"},
  {"id":"2022-2","year":2022,"label":"II","title":"CDS (II) 2022"},
  {"id":"2023-1","year":2023,"label":"I","title":"CDS (I) 2023"},
  {"id":"2023-2","year":2023,"label":"II","title":"CDS (II) 2023"},
  {"id":"2024-1","year":2024,"label":"I","title":"CDS (I) 2024"},
  {"id":"2024-2","year":2024,"label":"II","title":"CDS (II) 2024"},
  {"id":"2025-1","year":2025,"label":"I","title":"CDS (I) 2025"},
  {"id":"2025-2","year":2025,"label":"II","title":"CDS (II) 2025"},
  {"id":"2026-1","year":2026,"label":"I","title":"CDS (I) 2026"},
  {"id":"2026-2","year":2026,"label":"II","title":"CDS (II) 2026"},
];

/** Heaviest chapter first. Column i is PAPERS[i]. */
export const CHAPTER_MATRIX: MatrixRow[] = [
  {"chapter":"Trigonometric Ratios and Identities","total":227,"counts":[11,9,6,8,9,2,9,12,13,12,13,13,12,9,11,9,13,14,16,13,13]},
  {"chapter":"Number System","total":223,"counts":[11,5,5,10,7,13,14,10,13,6,9,9,6,23,4,12,25,10,11,15,5]},
  {"chapter":"Mensuration 2D","total":197,"counts":[9,8,5,11,9,9,9,15,10,4,7,11,11,12,8,23,10,7,6,4,9]},
  {"chapter":"Mensuration 3D","total":171,"counts":[14,4,8,10,7,12,6,4,8,13,13,9,9,7,7,3,4,14,4,6,9]},
  {"chapter":"Triangles","total":151,"counts":[3,10,9,5,7,8,10,3,8,6,7,10,7,8,4,5,6,8,8,9,10]},
  {"chapter":"Algebraic Identities and Simplification","total":98,"counts":[3,5,3,4,3,3,4,2,3,8,6,7,6,1,14,3,3,5,7,4,4]},
  {"chapter":"Quadratic Equations","total":89,"counts":[4,4,5,4,4,9,2,1,1,4,6,7,5,5,5,3,6,5,3,1,5]},
  {"chapter":"Surds, Indices and Simplification","total":82,"counts":[3,8,2,5,4,3,8,6,2,5,1,8,3,3,3,3,1,2,5,4,3]},
  {"chapter":"Statistics","total":80,"counts":[5,3,5,0,5,2,6,2,6,2,0,0,6,4,4,1,2,8,10,3,6]},
  {"chapter":"Polynomials","total":79,"counts":[1,3,9,5,3,3,1,5,5,4,2,0,4,2,6,4,3,2,7,6,4]},
  {"chapter":"Ratio, Proportion and Variation","total":76,"counts":[5,5,3,5,4,4,3,3,4,3,4,0,4,2,5,6,3,3,1,6,3]},
  {"chapter":"Time, Speed and Distance","total":75,"counts":[6,4,6,5,4,1,3,3,4,3,3,4,5,3,2,5,3,2,2,3,4]},
  {"chapter":"Circles","total":69,"counts":[4,1,3,5,5,1,4,4,1,5,4,2,2,3,5,2,3,3,2,4,6]},
  {"chapter":"Quadrilaterals","total":54,"counts":[1,4,3,0,1,4,1,5,3,2,0,2,5,1,0,4,0,0,4,8,6]},
  {"chapter":"Data Interpretation","total":52,"counts":[1,1,7,1,0,8,1,4,0,5,8,6,0,0,0,3,0,6,0,0,1]},
  {"chapter":"Percentage, Profit and Loss","total":50,"counts":[2,4,5,2,1,3,3,2,5,3,1,1,0,2,1,2,3,2,4,2,2]},
  {"chapter":"Averages","total":47,"counts":[5,4,1,4,1,1,4,1,3,4,0,0,3,1,4,0,6,2,0,1,2]},
  {"chapter":"Time and Work","total":46,"counts":[2,3,3,4,5,2,2,2,1,2,2,1,3,4,2,4,1,0,0,3,0]},
  {"chapter":"Heights and Distances","total":41,"counts":[3,4,2,2,1,1,2,3,0,2,2,2,2,3,4,1,2,1,0,2,2]},
  {"chapter":"Linear Equations","total":40,"counts":[1,5,2,2,3,2,0,4,5,1,5,0,1,1,7,0,0,0,0,1,0]},
  {"chapter":"Simple and Compound Interest","total":34,"counts":[0,2,1,3,1,2,2,1,1,2,1,1,1,2,2,3,2,2,1,3,1]},
  {"chapter":"Logarithms","total":33,"counts":[3,2,1,1,2,4,1,2,1,2,2,0,2,1,1,0,0,2,3,1,2]},
  {"chapter":"Sets","total":28,"counts":[1,1,2,0,7,1,4,1,0,0,0,4,0,2,0,0,2,0,0,0,3]},
  {"chapter":"Lines, Angles and Polygons","total":22,"counts":[0,1,3,3,2,1,0,4,2,0,0,1,0,0,0,1,1,0,3,0,0]},
  {"chapter":"Sequence and Series","total":19,"counts":[2,0,1,1,1,1,0,1,1,1,1,1,2,0,0,3,1,2,0,0,0]},
  {"chapter":"Inequalities","total":13,"counts":[0,0,0,0,2,0,1,0,0,0,2,1,1,1,1,0,0,0,3,1,0]},
];

/** Questions and HARD questions per paper. Aligned 1:1 to PAPERS. */
export const PAPER_TOTALS: { id: string; total: number; hard: number }[] = [
  {"id":"2016-2","total":100,"hard":18},
  {"id":"2017-1","total":100,"hard":11},
  {"id":"2017-2","total":100,"hard":10},
  {"id":"2018-1","total":100,"hard":14},
  {"id":"2018-2","total":98,"hard":21},
  {"id":"2019-1","total":100,"hard":11},
  {"id":"2019-2","total":100,"hard":15},
  {"id":"2020-1","total":100,"hard":19},
  {"id":"2020-2","total":100,"hard":9},
  {"id":"2021-1","total":99,"hard":13},
  {"id":"2021-2","total":99,"hard":15},
  {"id":"2022-1","total":100,"hard":17},
  {"id":"2022-2","total":100,"hard":18},
  {"id":"2023-1","total":100,"hard":21},
  {"id":"2023-2","total":100,"hard":26},
  {"id":"2024-1","total":100,"hard":31},
  {"id":"2024-2","total":100,"hard":19},
  {"id":"2025-1","total":100,"hard":12},
  {"id":"2025-2","total":100,"hard":19},
  {"id":"2026-1","total":100,"hard":35},
  {"id":"2026-2","total":100,"hard":28},
];
