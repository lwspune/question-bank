/**
 * Reshape plan: SSC CGL Tier I English "Fill in the Blanks" (34 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 34 rows (2026-10-23, main session). The ingest's single subtopic is the teaching page, so nothing
 * moves; the concepts split the rows by what decides the blank (meaning, a fixed pairing, grammar). Never
 * featured: 35f91b51 (its notice: two options fit).
 */
import type { ReshapePlan } from "../reshape";

const T = { blanks: "Sentence Fill-in-Blanks" } as const;

const plan: ReshapePlan = {
  subject: "English",
  chapter: "Fill in the Blanks",
  order: [T.blanks],
  byPrefix: {
    [T.blanks]: [
      "3988ed64", "74bcfb9f", "f529a885", "d98209b0", "6b676784", "8976fa08", "ca433e79", "495dba6d",
      "bd3a636f", "cd1adc9b", "85b58e7d", "6b801f53", "0ea61d13", "f1001235", "35f91b51", "2c3f38b5",
      "bf30badc", "1627add9", "ce593737", "0f88ab96",
      "54cf1f50", "5631ffff", "b5314bb7", "8234249a", "33cc689b",
      "576f3d8b", "af791edf", "d46b5e4d", "41c4e028", "80d5934b", "d81e3631", "04e9d2b3", "0ece2e6e",
      "958058bf",
    ],
  },
  expected: { [T.blanks]: 34 },
  total: 34,
};

export default plan;
