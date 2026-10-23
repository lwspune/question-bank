/**
 * Reshape plan: SSC CGL Tier I Reasoning "Inequalities" (12 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 12 rows (2026-10-23, main session), all from the 2025 shifts. Eleven are direct inequality
 * chains and one uses coded signs; one method reads both, so they form one page. Quantitative Aptitude
 * also has an "Inequalities" chapter: the re-cut touches only the transcript blocks of these rows.
 */
import type { ReshapePlan } from "../reshape";

const T = { chains: "Inequality Chains" } as const;

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Inequalities",
  order: [T.chains],
  byPrefix: {
    [T.chains]: [
      "82bdb73e", "269bf36a", "cc740194", "894ec0d7", "7f9c8a93", "61e4cf40", "d85ff50c", "0d7f1a8d",
      "de6b73a0", "7e593ade", "edf5d56c", "081b90c8",
    ],
  },
  expected: { [T.chains]: 12 },
  total: 12,
};

export default plan;
