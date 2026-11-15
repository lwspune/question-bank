/**
 * Reshape plan: SSC CGL TIER II English "Sentence Rearrangement" (38 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 38 stems and keys (2026-11-15); every key agreed. The ingest used eleven subtopics of 1-9 rows,
 * so they become two pages by what is being ordered: whole SENTENCES into a paragraph (29), and the PARTS
 * of one sentence (9). Nothing is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  paragraph: "Ordering Sentences in a Paragraph",
  parts: "Ordering Parts of a Sentence",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "English",
  chapter: "Sentence Rearrangement",
  order: [T.paragraph, T.parts],
  byPrefix: {
    [T.paragraph]: [
      "0094125e", "21c16184", "22b8cc5e", "703b5b1e", "8fb78c4d", "9f4d5858", "c4a5270b", "a6e43c96", "5df03bf1", "c9442baa", "04afa4cd",
      "0911acea", "108425d0", "134937c5", "147625ac", "3a0469f5", "51aba010", "791216d8", "859ad283", "bdb56a5a", "c493dc29", "d81e5a65",
      "1da1bc65", "b1d3e02a", "6366f059",
      "3c07a1c6", "3dcb281e", "eff7b398", "bf0d4521",
    ],
    [T.parts]: ["a8a48a71", "284cf16e", "329c5293", "9b926e85", "ca9102a7", "9aee59ec", "4953d7e4", "51997c14", "78b41d49"],
  },
  expected: { [T.paragraph]: 29, [T.parts]: 9 },
  total: 38,
};

export default plan;
