/**
 * Reshape plan: SSC CGL TIER II "Surds, Indices and Simplification" (48 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 48 stems and solutions (2026-11-15); every key re-derived. The ingest filed them under seven
 * subtopics, four with 1 to 5 rows. Cut by technique, in teaching order, with Tier I's names: BODMAS and
 * brackets (order of operations, mixed numbers with 'of', and the two decimal sums that hide an
 * algebraic identity, folded in rather than a page of two); fractions and decimals (recurring decimals,
 * comparing and adding fractions, the one continued fraction); indices and square roots (laws of
 * indices, the exponential pair, square and cube roots, comparing roots); and surds (rationalising and
 * telescoping, the square root of a surd, nested and endless radicals).
 *
 * Never featured: c32e2e80 (Note: its data contradict the stated order x > y > z), 1e253f82 (Note: as
 * printed no option is right; SSC keyed D) and 9ab5f048 (its key needs '7{...}' read as one term).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  bodmas: "BODMAS and Brackets",
  fractions: "Fractions and Decimals",
  indices: "Indices and Square Roots",
  surds: "Surds and Rationalisation",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Surds, Indices and Simplification",
  order: [T.bodmas, T.fractions, T.indices, T.surds],
  byPrefix: {
    [T.bodmas]: [
      "628d3fbc", "68041297", "53d52453", "90e2ec1b", "9ab5f048", "2fe54d78",
      "327eefa3", "4b983355", "bf178c14", "8d1c57e6", "cfcdb4f1", "379c5f76",
      "94910377", "d51feaf8",
    ],
    [T.fractions]: ["cc391145", "66d41607", "aa7d05a4", "ca4aacbd", "64df49f7", "a869b115", "b610d9d2", "a8d4051d", "c32e2e80", "d17863b7"],
    [T.indices]: [
      "4daf9951", "63c2c357", "4e07a357", "12d35aed", "b62e0acb",
      "18984daa", "b038969c", "75cc0a8f", "7b7bcd10", "72b779e6", "1e253f82", "df1e9ea7",
    ],
    [T.surds]: [
      "30d492a9", "3e1b0689", "49cf99f6", "8ee86867", "876ca6de",
      "0a9ebf2d", "35a7fbb8", "3f878804", "e50e0886",
      "31922d80", "537a610f", "97b0fae8",
    ],
  },
  expected: { [T.bodmas]: 14, [T.fractions]: 10, [T.indices]: 12, [T.surds]: 12 },
  total: 48,
};

export default plan;
