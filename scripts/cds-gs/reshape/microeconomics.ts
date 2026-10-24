/**
 * Reshape plan: CDS GK Economics "Microeconomics — Demand, Supply and Market Structure" (32 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 32 stems AND solutions (2026-10-23). Three teaching pages, foundations first:
 * choice, utility and demand; supply, elasticity and the market price (with the one externality
 * row, which is a market outcome); and the market structures with firms and economic systems.
 * The catch-all "Basic Economic Concepts and Opportunity Cost" is split by idea: opportunity cost,
 * exchange and models go to the demand page; factors of production go to supply; capitalism and
 * the social market economy go with the firms on the markets page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  demand: "Choice, Utility and Demand",
  supply: "Supply, Elasticity and Market Price",
  markets: "Market Structures and Economic Systems",
} as const;

const plan: ReshapePlan = {
  subject: "Economics",
  chapter: "Microeconomics — Demand, Supply and Market Structure",
  order: [T.demand, T.supply, T.markets],
  whole: {
    "Demand, Supply and Elasticity": T.demand,
    "Market Equilibrium and Comparative Statics": T.supply,
    "Externalities, Market Failure and Public Goods": T.supply,
    "Market Structures and Types of Firms": T.markets,
  },
  byPrefix: {
    [T.demand]: ["048cd055", "8ca98f5a", "6e93d83f", "758a95d6", "cb1365c4"],
    [T.supply]: ["39475029", "0d821fda", "b86c3e43", "fe2bc5d3"],
    [T.markets]: ["a48ffd93", "7b9d6cbc"],
  },
  expected: { [T.demand]: 13, [T.supply]: 8, [T.markets]: 11 },
  total: 32,
};

export default plan;
