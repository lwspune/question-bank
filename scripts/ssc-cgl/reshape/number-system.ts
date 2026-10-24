/**
 * Reshape plan: SSC CGL Tier I "Number System" (91 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 91 stems and solutions (2026-10-23). The ingest filed them under ten subtopics, eight of
 * them 1 to 10 rows, and "Divisibility Rules and Missing Digits" (47 rows) mixed two jobs: testing a
 * given number and recovering a hidden digit. Cut here by the method that solves the row: number
 * families, decimals, primes and perfect squares (the vocabulary); the division algorithm and the
 * nearest multiple; the divisibility tests on a given number (single tests, the 11 test, a composite
 * divisor split into co-prime parts, the remainder a test gives); missing digits (digit-sum, tail
 * and 11 conditions); factorisation, HCF and LCM (divisor counts, a common power taken out, the
 * least square multiple); and remainders of expressions and powers. ba829f24 (how many are
 * divisible by 132) moves to the composite-divisor concept, and 47d94a0b (consecutive even numbers)
 * to the number families. Never featured: d419966f and bfd1a75a (their solutions open with a Note),
 * 2aec79b4 (as printed, no option is both a perfect square and an integer) and b833478f (the two
 * stars are read as one digit).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  types: "Number Types, Primes and Squares",
  division: "Division Algorithm and Multiples",
  tests: "Divisibility Tests",
  digits: "Missing Digits",
  factors: "Factorisation, HCF and LCM",
  remainders: "Remainders by Congruence and Cyclicity",
} as const;

const plan: ReshapePlan = {
  chapter: "Number System",
  order: [T.types, T.division, T.tests, T.digits, T.factors, T.remainders],
  byPrefix: {
    [T.types]: [
      "5291e3e6", "6ffd9081", "bde643c1", "a3f94c68", "b57e29da", "79625d34", "47d94a0b",
      "ae77601d", "67e23025",
      "da7e8afa",
      "2aec79b4", "967e1c7a", "a973a02d", "39e6b0de",
    ],
    [T.division]: [
      "d419966f", "ffb14639", "193f6b3e",
      "98a2cdce", "a0d8f306", "bd752109", "eb07c98f", "02d22b98",
    ],
    [T.tests]: [
      "366f4d60", "ec1b6d52", "2285a8cc", "7c6b9c4c", "58ac6315", "f1c9d1e8", "413f1090", "4722cd0b",
      "e299dc7f", "e83c6b7c", "3b9dbf5f", "cd0794b4", "95d6510c",
      "3b2ca0dc", "ca2f1609", "5c6eac38", "5d98fbe6", "e33cdde2", "4599bded", "e271229e", "2723bc17",
      "ac942d4a", "c0e56b3f", "1d8a3388", "ba829f24",
      "38f84646", "b03970c9", "cdc2b247", "b1d638df",
    ],
    [T.digits]: [
      "bd973620", "671e6229", "1995ef54", "4b6caab8", "5991c9e5", "88c16ee5", "4e5446e1", "bae547c9",
      "b833478f", "6df34605", "3533ca0d",
      "f6daff04", "e6d69e30", "a1c619e0", "a071c28d", "9ab2ab61", "27d4aa9e",
      "7470757c", "060d30be",
    ],
    [T.factors]: [
      "200471d5", "8dcdfd60",
      "ab6de10c", "ecb7b67c", "bfd1a75a", "d94fc85a", "e1edc5b6",
      "0aba0a27", "9b1f1b42", "5421a526", "9352925e",
    ],
    [T.remainders]: [
      "56457406", "8bbab4e5", "64427950", "67c4a0cd",
      "fbdc6ab5", "ef1b3278", "080e2c8f", "bb8ef03c", "b88f64e3", "2e4c1b49",
    ],
  },
  expected: {
    [T.types]: 14,
    [T.division]: 8,
    [T.tests]: 29,
    [T.digits]: 19,
    [T.factors]: 11,
    [T.remainders]: 10,
  },
  total: 91,
};

export default plan;
