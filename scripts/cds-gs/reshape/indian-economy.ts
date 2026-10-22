/**
 * Reshape plan: CDS GK Economics "Indian Economy" (34 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 34 stems AND solutions (2026-10-23). Three teaching pages: planning (Five Year
 * Plans to NITI Aayog) with the farm, food and livestock schemes; the balance of payments and
 * foreign capital (accounts, FDI and portfolio money, reserves, the IMF); and exchange rates
 * with trade policy (devaluation, FTAs, export schemes). "International Trade and Finance"
 * (19 rows) is split row by row between the last two pages.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  planning: "Planning and Farm Policy",
  bop: "Balance of Payments and Foreign Capital",
  trade: "Exchange Rates and Trade Policy",
} as const;

const plan: ReshapePlan = {
  subject: "Economics",
  chapter: "Indian Economy",
  order: [T.planning, T.bop, T.trade],
  whole: {
    "Five Year Plans and Indian Planning": T.planning,
    "Government Schemes — Agriculture and Livestock": T.planning,
    "International Trade and Finance": T.trade,
  },
  byPrefix: {
    [T.bop]: ["c876e8b3", "3ae011b6", "f031f636", "f25f388d", "44d485f2", "fc945412", "bdb60fc3", "108f261e"],
  },
  expected: { [T.planning]: 15, [T.bop]: 8, [T.trade]: 11 },
  total: 34,
};

export default plan;
