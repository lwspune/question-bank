/**
 * Reshape plan: SSC CGL Tier I General Awareness Economics "National Income, Growth and Development Indicators"
 * (98 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 98 rows (2026-11-01, main session). Cut into national income, poverty and employment, industrial
 * policy and reforms, and global indices. Never featured: a6b4295a, a9447a7f and b71b566e (solutions open with a
 * Note), 13e70eb6 and 778f1ea2 (single report figures that are hard to check).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  income: "National Income Accounting",
  poverty: "Poverty, Unemployment and Human Development",
  industry: "Industrial Policy and Reforms",
  indices: "Economic Indices and Reports",
} as const;

const plan: ReshapePlan = {
  subject: "Economics",
  chapter: "National Income, Growth and Development Indicators",
  order: [T.income, T.poverty, T.industry, T.indices],
  byPrefix: {
    [T.income]: [
      "13b678dc", "256a83a3", "66d093f8", "b71b566e", "bd75b2c2", "c4520325", "0b44f399", "19b263a5",
      "3006582c", "4adf1c11", "626643f2", "9114c62c", "b28f42c9", "c26d92a5", "e59fb7ac", "e0f28469",
      "2006a378", "42cf0487", "d1654c78", "91090556", "09fb7266", "89ceb6ea", "8c3dd5c0", "a621f2fc",
      "7871da82", "56b2bff0", "5ba658af",
    ],
    [T.poverty]: [
      "0b84df7e", "23bdcb97", "502ae38d", "507f7283", "7cce6ca2", "96d0812d", "f88d4f5a", "a2fa535c",
      "7163c5b8", "1e1f49fa", "21fb2049", "c3272e83", "e01ae39b", "13e70eb6", "31b81e60", "9a38a24f",
      "a6b4295a", "cf8da0ac", "e0e1451b", "a9447a7f", "1435a398", "c2907f05",
    ],
    [T.industry]: [
      "49debac4", "9e1af060", "f363b6e8", "58a9b40c", "abd5fc17", "b033bb63", "cebc7342", "48eebc66",
      "8d7ab102", "8e097a07", "939de2b8", "d1dbf79d", "dc26964b", "0c9cbc60", "8621f8ee", "ed339959",
      "17646581", "42200ba7", "584dfa3e", "7cfa5fde", "951edfbe", "d23fd4c0", "df9c3881", "e1bd2efc",
      "ef16425b", "8f6a7a11", "119f2139", "22e70d34", "662a8c57", "d545a12c", "f85167c2", "2f8bf4a2",
      "509d304a",
    ],
    [T.indices]: [
      "7c66aa96", "a7862cd0", "b94117df", "a53436d2", "b526e7ee", "e9ef1650", "cdf5fdc7", "778f1ea2",
      "e4997692", "9f5f3c25", "1fe032e1", "634a684a", "700ec98f", "ba3b09b1", "c646ddc0", "ceb3ced5",
    ],
  },
  expected: {
    [T.income]: 27,
    [T.poverty]: 22,
    [T.industry]: 33,
    [T.indices]: 16,
  },
  total: 98,
};

export default plan;
