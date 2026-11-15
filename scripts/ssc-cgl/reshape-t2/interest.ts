/**
 * Reshape plan: SSC CGL TIER II "Simple and Compound Interest" (29 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 29 stems and solutions (2026-11-15); every key re-derived and agreed. Two pages: simple
 * interest (the formula, rates over changing periods, amounts at two times and sums split two ways) and
 * compound interest (annual compounding, half-yearly and other periods, and the three instalment rows,
 * folded in: Tier II has too few for the page Tier I gives them). Nothing is flawed; every row may be
 * featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  simple: "Simple Interest",
  compound: "Compound Interest",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Simple and Compound Interest",
  order: [T.simple, T.compound],
  byPrefix: {
    [T.simple]: [
      "847e0a93", "bcd97692", "52f34257", "df512b2c", "e2db96da", "f8e69d76", "15b6faa3", "86fd73db", "9cc205d9",
      "537571b8", "1597f909", "77700658", "a3f8f838", "ddf3365a", "ffaf3398",
    ],
    [T.compound]: [
      "618b0b49", "e8179637", "45a348da", "1559ca44",
      "347811f8", "6e55a169", "11a4a7c4", "42242725", "e1970518", "04c65173", "29418c93",
      "0a593afc", "15d3e39a", "bdf57626",
    ],
  },
  expected: { [T.simple]: 15, [T.compound]: 14 },
  total: 29,
};

export default plan;
