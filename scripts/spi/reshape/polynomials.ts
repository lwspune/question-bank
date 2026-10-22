/**
 * Reshape plan: SPI "Polynomials" (32 q), for scripts/spi/reshape.ts.
 *
 * Read all 32 stems and solutions (2026-10-22). The ingest filed them under 27 one-off subtopics.
 * Cut here by technique, in teaching order: degree, value and the zeroes read from a graph;
 * factorising (splitting the middle term, grouping, a substitution); the division algorithm with
 * the remainder and factor theorems; and the zeroes against the coefficients (quadratic, forming
 * a polynomial, cubic). Never featured: c196f46d (no printed option is right: the answer is -3/7),
 * 4d65028b (no option is exactly right), fdfac53d (the stem leaves out the zero), 35413e30 (two
 * options are equal and one prints "B"), 5e5efd48 and 20a71397 (options print "A" for a).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Degree, Value and Zeroes of a Polynomial",
  factorising: "Factorising Polynomials",
  division: "Division Algorithm, Remainder and Factor Theorems",
  zeroes: "Zeroes and Coefficients",
} as const;

const plan: ReshapePlan = {
  chapter: "Polynomials",
  order: [T.basics, T.factorising, T.division, T.zeroes],
  byPrefix: {
    [T.basics]: ["1875cbe0", "18ea4be3", "c7a0923e", "5deb512f", "8092edd2", "fdfac53d", "9fc50057", "efdeba83"],
    [T.factorising]: ["a4e032ba", "4d65028b", "ed63dd12", "432a4970", "5e5efd48"],
    [T.division]: [
      "75f2987a", "0f4d3245", "666b2221", "5993fe30", "35413e30", "8f478ff1", "3ceb9eab", "fbe7547c",
      "20a71397", "668b76ec",
    ],
    [T.zeroes]: ["c196f46d", "dcf64123", "7f01a0ac", "35515fe2", "8bbfa75c", "631e2416", "17eac718", "b6ad182d", "2dee071e"],
  },
  // Repeats of 668b76ec (the other two zeroes) and 0f4d3245 (degree of the quotient), skipped at
  // commit by content_hash.
  extra: { "mock-6#71": T.division, "mock-6#72": T.division },
  expected: {
    [T.basics]: 8,
    [T.factorising]: 5,
    [T.division]: 10,
    [T.zeroes]: 9,
  },
  total: 32,
};

export default plan;
