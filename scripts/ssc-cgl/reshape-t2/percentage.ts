/**
 * Reshape plan: SSC CGL TIER II "Percentage, Profit and Loss" (71 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 71 stems and solutions (2026-11-15); every key re-derived and agreed. The ingest filed them
 * under four broad subtopics; "Percentage" (31) mixed plain percentage arithmetic with chains of
 * changes and with savings and election problems. Cut by technique, in teaching order, reusing Tier I's
 * page names (one catalog serves both tiers): percentage as a fraction and the changing base;
 * successive changes as a product of factors (with price against quantity, and "A is x% more than B"
 * chains); word problems on income, savings, expenses and elections; cost price, selling price and
 * overall profit (with the three faulty-weight and article-count rows, too few for a page of their
 * own on Tier II); marked price, discount and successive discounts (Tier I's two discount pages as
 * one: Tier II has 20 rows between them).
 *
 * Never featured: 43999e38 (its solution opens with a Note: the English is our translation of SSC's
 * Hindi). 6a3db381 reads "continued the same trend for the next 3 years" but asks for 2020, two years
 * on; its key fits the two-year reading, so it is tagged but never featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Percentage Basics",
  successive: "Successive Percentage Change",
  problems: "Percentage Word Problems",
  profit: "Profit and Loss",
  discount: "Marked Price and Discount",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Percentage, Profit and Loss",
  order: [T.basics, T.successive, T.problems, T.profit, T.discount],
  byPrefix: {
    [T.basics]: [
      "1262fc89", "313d47c1", "13693dbd", "8251c8b3", "d543c602", "9edcecc8",
      "5c6cedca", "816cfd86", "82b624b1", "a9912a57", "f773d5ad",
    ],
    [T.successive]: ["23a57dcb", "64fa0184", "3f9acad0", "6a3db381", "9522a0f0", "80ffd93e", "1a70e6bc", "98c284b4"],
    [T.problems]: [
      "151298fd", "9b28266e", "7f6a6f22", "8045c1ea", "97f7ed50", "d5346f94",
      "f5577694", "2dbed64a", "cf26e5ce", "7d180647", "14b2717a", "6ff10461",
    ],
    [T.profit]: [
      "4a063a12", "64f6586d", "775dfccb", "97b6f86f", "0f07610c", "695fdc7e", "739a552a",
      "b25684b6", "e969cb12", "f90b7c7c", "42c6cfb8", "45fe6f56", "5d75037a", "69b14c28",
      "50980dff", "f4181909", "891383ec", "c49d34d7", "b46968cd", "cbab3290",
    ],
    [T.discount]: [
      "43999e38", "bc71370b", "de33a1bc", "1ca86df4", "38db0f40", "4805ed11", "61b4c897",
      "70c6717e", "8af8cd18", "696f1b99", "d835b4bd", "0b816d5f", "6aea7922", "89a39b45",
      "dd098e40", "d0fe77cc", "5c8192b7", "a3641dad", "bf4f4bfd", "0193acca",
    ],
  },
  expected: { [T.basics]: 11, [T.successive]: 8, [T.problems]: 12, [T.profit]: 20, [T.discount]: 20 },
  total: 71,
};

export default plan;
