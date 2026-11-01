/**
 * Reshape plan: SSC CGL Tier I General Awareness Physics "Heat and Thermodynamics" (6 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 6 rows (2026-11-02, main session). Five small subtopics cut into one page: heat in daily life, then the
 * laws of thermodynamics. No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  heat: "Heat, Latent Heat and Thermodynamics",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Heat and Thermodynamics",
  order: [T.heat],
  byPrefix: {
    [T.heat]: [
      "0e124c81", "dfb88d8a", "b52938b3", "372700da", "ae5d88f6", "c7692637",
    ],
  },
  expected: {
    [T.heat]: 6,
  },
  total: 6,
};

export default plan;
