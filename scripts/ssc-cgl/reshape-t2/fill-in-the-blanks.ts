/**
 * Reshape plan: SSC CGL TIER II English "Fill in the Blanks" (12 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 12 stems and keys (2026-11-15); every key agreed. One page, the subtopic the ingest already
 * used: words that go together, comparisons with 'than', and the word the sentence's meaning asks for.
 * Nothing is flawed; every row may be featured.
 */
import type { ReshapePlan } from "../reshape";

const T = { blanks: "Sentence Fill-in-Blanks" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "English",
  chapter: "Fill in the Blanks",
  order: [T.blanks],
  byPrefix: {
    [T.blanks]: ["2c01c02b", "4a619233", "51369b89", "a0c79feb", "deda4f2f", "4732b242", "92f04d84", "ade2f0ad", "6976be4f", "c8dc2ec2", "ece924c7", "e290c5e0"],
  },
  expected: { [T.blanks]: 12 },
  total: 12,
};

export default plan;
