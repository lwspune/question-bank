/**
 * Reshape plan: SSC CGL TIER II "Number System" (29 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 29 stems and solutions (2026-11-15); every key re-derived and agreed. Eleven subtopics, ten
 * of them with 1 to 4 rows. Three pages, by technique: divisibility tests (the rules and missing digits,
 * with the two factorisation rows); factorisation, HCF and LCM (the laws, the remainder recipes and the
 * two divisor-counting rows); and primes, remainders and digits (one new name: primes, squares and
 * cubes, remainders and unit digits, and place value). Nothing is flawed; every row may be featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  divisibility: "Divisibility Tests",
  hcf: "Factorisation, HCF and LCM",
  primes: "Primes, Remainders and Digits",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Number System",
  order: [T.divisibility, T.hcf, T.primes],
  byPrefix: {
    [T.divisibility]: [
      "61854ef0", "94ac5e62", "9ac422f4", "ced40298", "45932966", "61de6266",
      "054411ea", "f073ae06", "8cc8cf59", "ad156f82", "fda0d1bb",
    ],
    [T.hcf]: ["1142fac7", "54fcc028", "4b82ab8a", "96293bf6", "9d09123f", "a2b121a5", "92ca53db", "81025c8b", "7dc6b25b"],
    [T.primes]: ["4752180d", "5ef9eb6a", "c8bbfbbb", "fa453ff0", "061a81c4", "68d1a445", "ed4c1f07", "297c6fe2", "cc50690c"],
  },
  expected: { [T.divisibility]: 11, [T.hcf]: 9, [T.primes]: 9 },
  total: 29,
};

export default plan;
