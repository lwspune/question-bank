/**
 * Reshape plan: SSC CGL TIER II "Ratio, Proportion and Variation" (55 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 55 stems and solutions (2026-11-15); every key re-derived and agreed. The ingest filed them
 * under six subtopics; "Ratio and Proportion" (15) mixed plain shares with multi-condition splits, and
 * three subtopics held 1 or 2 rows. Cut by technique, in teaching order: ratio basics (shares, and
 * joining ratios through a common term); changing ratios, proportion and variation (one new name: the
 * multi-condition splits, a ratio that changes, proportion algebra, the mean proportional and the one
 * variation row, too few on Tier II for Tier I's three pages); incomes, savings and ages; partnership;
 * mixtures and alligation (Tier I's two mixture pages as one: Tier II has 15 rows between them).
 *
 * Never featured: 3c167899 (its solution opens with a Note: the English is our translation of SSC's
 * Hindi) and 52be5fdb (Note: inconsistent as printed, a one-year profit that needs 21 months).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Ratio Basics",
  changing: "Changing Ratios, Proportion and Variation",
  income: "Ratios in Income, Savings and Ages",
  partnership: "Partnership",
  mixtures: "Mixtures and Alligation",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Ratio, Proportion and Variation",
  order: [T.basics, T.changing, T.income, T.partnership, T.mixtures],
  byPrefix: {
    [T.basics]: ["65a3eb8d", "18946447", "976fa26f", "e5fc66c4", "da23fcad", "96473f9b", "b7cc41d7", "83ddc687", "145faf05", "8f02d1a2"],
    [T.changing]: ["3c167899", "32218f37", "c75a7dec", "51b33bf1", "fdb81907", "4bd44290", "5d802ddd", "76803027"],
    [T.income]: ["c56ba40c", "13397b86", "ada9f116", "f76f4762", "bb4a7570", "e80f2bb5", "1fad8f8d", "bd0a92e1"],
    [T.partnership]: [
      "0c7809d1", "018471d5", "52be5fdb", "74c1de4c", "5e887405", "a5e5c634", "bc09bed8", "ef56c341", "a40ead84",
      "456d128c", "5b5b7ad5", "36790ff2", "a109c7bb", "2658d4e3",
    ],
    [T.mixtures]: [
      "d4a7e21b", "d69f0e13", "6d716f5d", "914433dd", "49250978", "d59c1b64",
      "64f4fdb0", "b2c667bb", "e41ccdf3", "25110bf7",
      "e7a8fcfe", "52c7d4ff", "70db24ae", "3f9683d7", "87fa445d",
    ],
  },
  expected: { [T.basics]: 10, [T.changing]: 8, [T.income]: 8, [T.partnership]: 14, [T.mixtures]: 15 },
  total: 55,
};

export default plan;
