/**
 * Reshape plan: SSC CGL Tier I "Surds, Indices and Simplification" (157 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 157 stems and solutions (2026-10-23). The ingest filed them under seven subtopics, and
 * "Simplification of Expressions" (82 rows) mixed BODMAS, missing numbers, square roots, identities and
 * even two surd rows. Cut here by the method that solves the row: BODMAS with brackets, "of" and the
 * bar; fractions and decimals (with comparing fractions and continued fractions); a missing number or
 * letters in an expression (work backwards, collect like terms, substitute with signs); indices and the
 * square roots of perfect squares (with nested radicals); shortcuts (difference of squares and cubes,
 * sums of cubes in the same ratio, common factors and quick checks); surds (like surds, expanding,
 * rationalising, comparing); and the square root of a surd with the two surd-equation methods.
 * Never featured: 35ed227b (its solution opens with a Note: options A and C are the same number).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  bodmas: "BODMAS and Brackets",
  fractions: "Fractions and Decimals",
  missing: "Missing Numbers and Letters",
  indices: "Indices and Square Roots",
  shortcuts: "Simplification Shortcuts",
  surds: "Surds and Rationalisation",
  roots: "Square Roots of Surds and Surd Equations",
} as const;

const plan: ReshapePlan = {
  chapter: "Surds, Indices and Simplification",
  order: [T.bodmas, T.fractions, T.missing, T.indices, T.shortcuts, T.surds, T.roots],
  byPrefix: {
    [T.bodmas]: [
      // order of operations
      "ed811025", "3cdac0b8", "b44953e5", "3d8e7971", "b99b1370", "7f9929d2", "be79251e", "b7c39123",
      "60dc8abf", "8064b779", "a515ac00", "d5c6ff3e",
      // brackets and signs
      "1016958f", "de87e7a0", "0d938e7f", "9d07a74e", "b2e927e1", "31ebe98b", "f52861bb", "633c329c",
      "a08e3f77", "0b69a8dc", "51d8e83f", "ff0b6d22", "3cf6ede6", "b5ba22bc",
      // "of" and the bar
      "10ee14f5", "8ae60008", "21f834e7", "f3c66705", "de3abdd8", "9ac156f7", "3ae5ad86", "5bfd8b55",
      "879da176", "f7df4ee9", "c12e4b72", "c31e2020", "2d20c9fb", "9603da20", "31cb58d4", "96350ac4",
      "8a4df811", "c5b0fb05",
    ],
    [T.fractions]: [
      // fraction BODMAS
      "d60431c9", "1de51783", "8df4a359", "59a1bf8f", "d943c52d", "cd94d173", "15f44e8a", "bfa13ff1",
      "626c9f4a", "7196b4af", "51a15726", "66778e36", "9bf1bed1", "d1275114", "30afdf10", "554a2638",
      "51bcd1c3", "2f72b0b0",
      // decimals
      "3669b7b4", "e00c7d0e", "aa3463f8", "2905e779", "7f97363c", "8447134c", "7686e445", "9d2e529d",
      "538fc4b9", "5de502aa", "6e9ab22e", "9c4a5261", "285f3b3e", "0bc0aa4e", "ebe0c039", "15365ac7",
      "f11d780c", "6c0561c4", "ee9804b2", "28372e05",
      // comparing fractions
      "650e571b", "ec437be7", "0fd7b842",
      // continued fractions
      "0cda61e3", "367e4e44", "40a8cd07",
    ],
    [T.missing]: [
      // work backwards
      "2f13c16a", "6efcb0fb", "87b5ba0b", "508282db", "d4aa122b",
      // letters
      "231456e6", "0d2622c1", "74a413a3", "3b403d96",
    ],
    [T.indices]: [
      // laws of indices
      "60b85f1d", "22a44a19", "dfbf019e",
      // square roots of perfect squares
      "551ead94", "6447e63f", "fc57a2fd", "90879351", "72d52888", "2d46a986",
      // nested radicals
      "ca78a891", "4c1865b4", "053ba4cd",
    ],
    [T.shortcuts]: [
      // difference of squares and cubes
      "42e5f6ed", "035aad56", "7a5387f6", "98434032",
      // sums of cubes in the same ratio
      "1f82a49f", "b94253ef", "a7b65da7", "d0b2b12a", "2517aed2", "17d62381", "0f9719ea", "2d1a9c45",
      "1222aeb2", "ef008324",
      // common factors and quick checks
      "39ea10c2", "105bf957", "0f936235", "05e44105",
    ],
    [T.surds]: [
      // like surds and expanding
      "3bf0e1f8", "580f366a", "533d03a3", "71dad99c", "00d2ec41", "7a39b741", "487668f5", "5b3a2743",
      "b275238f",
      // rationalising
      "cf4a7dc6", "bf05695e", "766f2c0f", "eb994089", "d20acb06", "28458b32", "64295a04",
      // comparing surds
      "d4b76c31", "8f36d318", "4a2c2804", "6a6ac403",
    ],
    [T.roots]: [
      // square root of a surd
      "c0e407cb", "6e2e4a70", "1fd7426b", "c683defc", "e857b59f", "35ed227b",
      // surd equations
      "14c32df6", "1eea25c5", "3e0963dc", "92da7041",
    ],
  },
  expected: {
    [T.bodmas]: 44,
    [T.fractions]: 44,
    [T.missing]: 9,
    [T.indices]: 12,
    [T.shortcuts]: 18,
    [T.surds]: 20,
    [T.roots]: 10,
  },
  total: 157,
};

export default plan;
