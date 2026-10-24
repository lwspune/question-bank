/**
 * Reshape plan: SPI "Surds, Indices and Simplification" (28 q), for scripts/spi/reshape.ts.
 *
 * Read all 28 stems and solutions (2026-10-22). Cut here by technique, in teaching order: the laws
 * of indices with zero and negative powers, then fractional powers and equations solved by matching
 * powers of one base, then surds (square roots of decimals, comparing roots, rationalising, the
 * square root of a + root b and the endless nested root). e97d6765 is mostly negative indices but
 * needs a square root of 4^m, so it sits on the fractional page. Never featured, each flawed as printed
 * (the solution carries a Note): fb41a376 (bases A and a differ), 04f9a068 (the third condition has
 * no z), 334a3f9b (as printed the value is root 5 over 4, not an option).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  laws: "Laws of Indices",
  fractional: "Fractional Indices and Exponential Equations",
  surds: "Surds and Rationalising",
} as const;

const plan: ReshapePlan = {
  chapter: "Surds, Indices and Simplification",
  order: [T.laws, T.fractional, T.surds],
  byPrefix: {
    [T.laws]: [
      "98fccf6c", "fb41a376", "b04ed824", "756d81e5", "0c7a2f00", "4fa2eac5", "973b617e", "ea9e9020",
      "598dae13",
    ],
    [T.fractional]: [
      "2268e8a8", "e97d6765", "b4bcd725", "98e042e7", "67bc61af", "334a3f9b", "d23c6341", "a9d40545", "9c22d47d",
      "f05063d5", "04f9a068",
    ],
    [T.surds]: ["e0082472", "bdb4811a", "77557f6c", "236964e8", "eaf7a009", "048eb9a3", "250729fd", "9f1d1478"],
  },
  expected: {
    [T.laws]: 9,
    [T.fractional]: 11,
    [T.surds]: 8,
  },
  total: 28,
};

export default plan;
