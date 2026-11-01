/**
 * Reshape plan: SSC CGL Tier I General Awareness Chemistry "Chemical Bonding" (7 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 7 rows (2026-11-02, main session). One page: valency and oxidation numbers, and atomicity.
 * Never featured: 697cf5d2 (it needs its figure).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  bonding: "Valency, Oxidation Numbers and Atomicity",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Chemical Bonding",
  order: [T.bonding],
  byPrefix: {
    [T.bonding]: [
      "e3270cf9", "eb925f44", "5f34438c", "cbde04b3", "34717c44", "13de4303", "697cf5d2",
    ],
  },
  expected: {
    [T.bonding]: 7,
  },
  total: 7,
};

export default plan;
