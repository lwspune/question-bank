/**
 * Reshape plan: SSC CGL Tier I General Awareness Chemistry "Chemical Reactions" (16 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 16 rows (2026-11-02, main session). One page: types of reaction, redox, and reaction rates.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  reactions: "Types of Reactions, Redox and Rates",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Chemical Reactions",
  order: [T.reactions],
  byPrefix: {
    [T.reactions]: [
      "9cee3d68", "2a50a8a1", "83081a7a", "1152a555", "8c9f846e", "a4c11da6", "ac171777", "726321e3",
      "09901e21", "2a4c44aa", "4ddbf056", "9977674a", "278edb88", "780329ca", "7a45d565", "e3a873dd",
    ],
  },
  expected: {
    [T.reactions]: 16,
  },
  total: 16,
};

export default plan;
