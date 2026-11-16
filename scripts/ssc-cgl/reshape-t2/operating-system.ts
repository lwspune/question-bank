/**
 * Reshape plan: SSC CGL TIER II Computer Knowledge "Operating System and Software" (21 q), for
 * scripts/ssc-cgl/reshape.ts. Read all 21 stems and keys (2026-11-15); every key agreed. Shortcuts,
 * Windows tools and kinds of software on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { os: "Windows, Shortcuts and Kinds of Software" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Computer Knowledge",
  chapter: "Operating System and Software",
  order: [T.os],
  byPrefix: {
    [T.os]: [
      "9176292d", "cf95c372", "e82b01f6", "f2810022", "3aa925b1", "a09c256b", "1fa06a6e",
      "08a12af2", "e241f79f", "cf1810aa", "84892b8c", "674623e1", "bbfa0a44", "c6a1af9f", "c939fda1", "fa3a34b7", "fe72ed2e",
      "b67e10ba", "f9330ae7", "78117f14", "4de7f5ea",
    ],
  },
  expected: { [T.os]: 21 },
  total: 21,
};

export default plan;
