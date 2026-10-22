/**
 * Reshape plan: SPI "Trigonometric Ratios and Identities" (39 q), for scripts/spi/reshape.ts.
 *
 * Read all 39 stems and solutions (2026-10-22); every key re-derived and every one stands. The
 * ingest filed them under 25 one-off subtopics. Cut here by technique in Class 10 teaching order:
 * the six ratios of a right triangle (one ratio to the rest, divide by cos to turn a sin-cos
 * fraction into tan), the values at 0, 30, 45, 60 and 90 degrees (and reading an angle back from a
 * value, and the sides of a right triangle or rectangle), the three identities, and complementary
 * angles last because two of its rows (b8f57471, 1ca29c09) need sin² + cos² = 1. No 2022 row exists.
 * Never featured: 29a16cf2 (stem prints "Ifx", options print "cosx = cosy") and 8e437608 (needs its figure).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ratios: "Trigonometric Ratios of an Acute Angle",
  values: "Values at Standard Angles",
  identities: "Trigonometric Identities",
  complementary: "Ratios of Complementary Angles",
} as const;

const plan: ReshapePlan = {
  chapter: "Trigonometric Ratios and Identities",
  order: [T.ratios, T.values, T.identities, T.complementary],
  byPrefix: {
    [T.ratios]: ["12e088d7", "8e437608", "fcc09b1a", "f7e123d5", "6e7b392c", "e5e2fee9"],
    [T.values]: [
      "9afa502a", "325c43e6", "8892698c", "8203e583", "b59c5a34", "3c805ebf", "18ea9b6a", "79047a3f",
      "7675f0c6", "9a48acfa", "95fed1a5", "aa320389", "b8671997",
    ],
    [T.identities]: [
      "1181a202", "c7ab119c", "bac7e916", "f28d8170", "59a59a3e", "44598569", "bfac0a71", "6862d3c7",
      "16dd251b", "5fd60b98", "9175cc98", "08820e5c", "d6db4e17", "af0c94ff",
    ],
    [T.complementary]: ["29a16cf2", "545fada1", "e6a5e9bf", "b8f57471", "0945a477", "1ca29c09"],
  },
  expected: {
    [T.ratios]: 6,
    [T.values]: 13,
    [T.identities]: 14,
    [T.complementary]: 6,
  },
  total: 39,
};

export default plan;
