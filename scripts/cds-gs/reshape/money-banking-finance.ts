/**
 * Reshape plan: CDS GK Economics "Money, Banking and Public Finance" (72 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 72 stems AND solutions (2026-10-23). Five teaching pages, foundations first:
 * money, its measures and the RBI's tools; inflation and price indices; banks and financial
 * markets; the Budget, deficits and fiscal policy; taxes, GST and the Finance Commission.
 * The catalogue's "Banking, RBI and Financial Institutions" mixed the central bank with
 * commercial banks and markets, so its seven RBI and credit-term rows join the money page
 * (the money multiplier and the RBI's tools are one idea: how much money there is). The
 * NIIF budget row joins the NIIFL funds row on the banks page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  money: "Money and Monetary Policy",
  inflation: "Inflation and Price Indices",
  banks: "Banks and Financial Markets",
  budget: "Budget, Deficits and Fiscal Policy",
  taxes: "Taxes, GST and Finance Commission",
} as const;

const plan: ReshapePlan = {
  subject: "Economics",
  chapter: "Money, Banking and Public Finance",
  order: [T.money, T.inflation, T.banks, T.budget, T.taxes],
  whole: {
    "Money, Inflation and Price Behaviour": T.inflation,
    "Banking, RBI and Financial Institutions": T.banks,
    "Union Budget and Fiscal Policy": T.budget,
    "Taxation and Public Finance": T.taxes,
  },
  byPrefix: {
    [T.money]: [
      "8625f61d", "75231659", "de91ba9c", "83268a91",
      "ecba279e", "8c1676c4", "350eb2d4", "a707b15c", "59e4f43e", "0e12e3ae", "e68ff903", "2e4dcf62", "72a70611",
    ],
    [T.banks]: ["17bd449f"],
  },
  expected: { [T.money]: 13, [T.inflation]: 14, [T.banks]: 16, [T.budget]: 16, [T.taxes]: 13 },
  total: 72,
};

export default plan;
