/**
 * Reshape plan: SPI "Sequence and Series" (39 q), for scripts/spi/reshape.ts.
 *
 * Read all 39 stems and solutions (2026-10-22). The ingest filed them under 30 one-off subtopics.
 * Cut here by the formula the question rests on: the nth term of an AP (common difference, term
 * number, a gap between two terms, a term counted from the end), three terms in AP (2b = a + c and
 * a - d, a, a + d), the sum of an AP (both sum formulas, the standard sums, the number of terms, and
 * S_n given as a formula in n), and the geometric progression with the arithmetic and geometric means.
 * Every key re-derived; none disputed, none flawed as printed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  nthTerm: "The nth Term of an AP",
  threeTerms: "Three Terms in an AP",
  sum: "Sum of n Terms of an AP",
  gp: "Geometric Progressions and Means",
} as const;

const plan: ReshapePlan = {
  chapter: "Sequence and Series",
  order: [T.nthTerm, T.threeTerms, T.sum, T.gp],
  byPrefix: {
    [T.nthTerm]: [
      "5db87837", "f858873c", "cf6af309", "7428c396", "1e7a94e8", "78f81845", "dc4d7810", "6fb0e618",
      "87443eda", "4cce67e3", "1b7b7355", "5b0b8068", "5c8182bf", "aa85d973", "80fefdc0", "ec061d9e",
      "9e32a95e",
    ],
    [T.threeTerms]: ["cd67097f", "73bec4b6", "74df35c1", "fdc73845", "d2d8d93e"],
    [T.sum]: [
      "95ef92ec", "ac608010", "5d9588d2", "e038ca87", "3eed5e14", "77cba523", "b9328c05", "1724e961",
      "010d678a", "ec0a66a0", "eaec7618", "140655a9", "738525cf", "f05a0c6f",
    ],
    [T.gp]: ["b87a9c35", "6c84db47", "35d9d71d"],
  },
  expected: {
    [T.nthTerm]: 17,
    [T.threeTerms]: 5,
    [T.sum]: 14,
    [T.gp]: 3,
  },
  total: 39,
};

export default plan;
