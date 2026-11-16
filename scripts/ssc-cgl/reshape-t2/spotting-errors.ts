/**
 * Reshape plan: SSC CGL TIER II English "Spotting Errors" (29 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 29 stems and keys (2026-11-15); every key agreed. The ingest used ten grammar subtopics of
 * 1-9 rows each, so they become two teaching pages: errors in the VERB and the PRONOUN (tense, verb form,
 * agreement, case), and errors in COMPARISON, WORD FORM and PREPOSITIONS. Nothing is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  verbs: "Errors in Verbs and Pronouns",
  words: "Errors in Comparison, Words and Prepositions",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "English",
  chapter: "Spotting Errors",
  order: [T.verbs, T.words],
  byPrefix: {
    [T.verbs]: [
      "640154c5", "9f9a1c42", "15a0e125", "bc27ab4c", "5acbdee0", "1b067bf5", "a74c1857",
      "28b30719", "7ab0dca0", "ca0d4a11", "5fda16b3",
    ],
    [T.words]: [
      "0e03837d", "2651211c", "fdc60261", "2802eb07", "57d76d96", "a6ebb7a6", "c1fb9803", "e39dc260", "9cf86c6f",
      "58e51b22", "a0e3fd12", "6e405821", "5405a271", "c92ffdef",
      "45620f47", "9f61c1fb", "fef71c86", "33327f1a",
    ],
  },
  expected: { [T.verbs]: 11, [T.words]: 18 },
  total: 29,
};

export default plan;
