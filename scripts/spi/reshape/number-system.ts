/**
 * Reshape plan: SPI "Number System" (47 q), for scripts/spi/reshape.ts.
 *
 * Read all 47 stems and solutions (2026-10-22). The ingest filed them under 29 one-off subtopics.
 * Cut here by technique, in teaching order: the number sets with place value and digit counts,
 * then divisibility, primes and prime factorisation, then HCF and LCM (which lean on the factors),
 * then fractions, rational numbers and recurring decimals (which lean on the LCM), and last the
 * irrational numbers (which lean on perfect squares and the rationals). Never featured: d924cfc5
 * (the stem says "a rational" with no "non-zero", and 0 times an irrational is rational).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  types: "Number Types and Place Value",
  primes: "Divisibility, Primes and Factorisation",
  hcfLcm: "HCF and LCM",
  rationals: "Fractions and Rational Numbers",
  irrationals: "Irrational Numbers",
} as const;

const plan: ReshapePlan = {
  chapter: "Number System",
  order: [T.types, T.primes, T.hcfLcm, T.rationals, T.irrationals],
  byPrefix: {
    [T.types]: ["27bccc04", "5a64d414", "01fd02cd", "9cc6bb3e", "3ecd7bbb", "b44be761", "b644d0ab", "a948e2a8"],
    [T.primes]: [
      "0eaef1cc", "7544ce81", "035bc72f", "9b1b6a66", "99252700", "02978f8d", "e70fc1bb", "2deb439f",
      "4abf7b58", "f96699d9", "ddebeb82",
    ],
    [T.hcfLcm]: [
      "ca686979", "486eeab5", "517fb9f6", "a650a9ad", "4e4badb7", "9be7c2a4", "00a8d2ea", "463200c9",
      "ccd6dbb1", "9c5b46e2", "d8fdef54",
    ],
    [T.rationals]: [
      "ac7964ae", "aa2365e3", "49225570", "aad98912", "ba8dba11", "888f688b", "f65a1bc0", "8d43a248",
      "b93d0d3b", "d025916f",
    ],
    [T.irrationals]: ["6545aee2", "4afa3bc1", "3c35cdda", "d924cfc5", "fdfa8ac2", "a237e0ec", "35a1c1b0"],
  },
  expected: {
    [T.types]: 8,
    [T.primes]: 11,
    [T.hcfLcm]: 11,
    [T.rationals]: 10,
    [T.irrationals]: 7,
  },
  total: 47,
};

export default plan;
