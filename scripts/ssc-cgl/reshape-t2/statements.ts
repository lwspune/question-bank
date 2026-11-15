/**
 * Reshape plan: SSC CGL TIER II Reasoning "Statement-Based Reasoning" (21 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 21 stems and keys (2026-11-15); every key agreed. Inferences, causes and courses of action on
 * one page. Flawed (solution opens with a **Note:**, tagged but never featured): 2c34fce3.
 */
import type { ReshapePlan } from "../reshape";

const T = { logic: "Inferences, Causes and Courses of Action" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Statement-Based Reasoning",
  order: [T.logic],
  byPrefix: {
    [T.logic]: [
      "1b0795bc", "2c34fce3", "6289fb84", "6478b2fa", "6916c7e6", "84a696ad", "3539d108", "70fb3110", "8333c7f2", "cce96d28",
      "2a8c8fa9", "464e68c7", "4b308dc0", "b5e8f4b2", "1454223e", "328c02e1", "3d39ec01",
      "4cb760b1", "85118ef8", "8f225926", "470d7ae0",
    ],
  },
  expected: { [T.logic]: 21 },
  total: 21,
};

export default plan;
