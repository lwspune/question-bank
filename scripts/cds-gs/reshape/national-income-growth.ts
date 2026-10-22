/**
 * Reshape plan: CDS GK Economics "National Income, Growth and Development Indicators" (79 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 79 stems AND solutions (2026-10-23). Six teaching pages, foundations first:
 * the measures of national income with the sector shares they describe; the macro theory and
 * the economic curves; employment and its rates; poverty lines and anti-poverty schemes;
 * human development with the global indices and rankings; and industrial policy with the
 * production indices (IIP, core industries). The catch-all "Economic Curves, Indices and
 * Statistical Reports" and "Poverty, Employment and Human Development" are split row by row.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  measures: "National Income Measures",
  theory: "Macroeconomic Theory",
  employment: "Employment and Unemployment",
  poverty: "Poverty and Its Measurement",
  development: "Human Development and Global Indices",
  industry: "Industrial Policy",
} as const;

const plan: ReshapePlan = {
  subject: "Economics",
  chapter: "National Income, Growth and Development Indicators",
  order: [T.measures, T.theory, T.employment, T.poverty, T.development, T.industry],
  whole: {
    "National Income and Sectoral Composition": T.measures,
    "Macroeconomic Theory and Schools of Thought": T.theory,
    "Economic Curves, Indices and Statistical Reports": T.development,
    "Poverty, Employment and Human Development": T.poverty,
    "Industrial and Manufacturing Policy": T.industry,
  },
  byPrefix: {
    [T.measures]: ["8e4fddba", "1ebacc95", "443a6170", "3c10a5a8"],
    [T.theory]: ["72fdfeef", "60589d16", "f0b1806e", "ab752027", "49a53f1f", "60c999d3"],
    [T.employment]: ["cefed420", "3f20640a", "8f9be95d", "14c02c78", "03d54b83", "93d65353", "1cd32e15", "1d03a303"],
    [T.development]: [
      "916c3d70", "24dc3b7a", "b06ce392", "b2816e29", "be8c031c", "5a48d9fa", "718e814d",
      "b86f36bb", "d7d4c832", "48308d8e", "c4fe1c9b", "3b455cc0", "6daf603b",
    ],
    [T.industry]: ["7c199cef", "c14d6c04"],
  },
  expected: {
    [T.measures]: 13,
    [T.theory]: 14,
    [T.employment]: 8,
    [T.poverty]: 11,
    [T.development]: 21,
    [T.industry]: 12,
  },
  total: 79,
};

export default plan;
