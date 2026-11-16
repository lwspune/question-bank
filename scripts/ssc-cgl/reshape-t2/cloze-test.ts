/**
 * Reshape plan: SSC CGL TIER II English "Cloze Test" (35 q, nine passages), for scripts/ssc-cgl/reshape.ts.
 *
 * Read every blank in its passage with its options (2026-11-15); every key agreed. The ingest used five
 * subtopics of 3-14 rows, so they become two pages by what decides the blank: the GRAMMAR around it
 * (small words, verb form, prepositions) or its MEANING (a fixed word partner, or the passage's sense).
 * The 'must' blank (69cd3a80) moves from meaning to verb form: a modal is grammar. Nothing is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  grammar: "Cloze: The Grammar Around the Blank",
  meaning: "Cloze: Meaning and the Precise Word",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "English",
  chapter: "Cloze Test",
  order: [T.grammar, T.meaning],
  byPrefix: {
    [T.grammar]: [
      "01282e4b", "326af98a", "41848546", "6a6f3b3a", "a73c23a7",
      "1f27e67d", "8e7a9417", "809d6995", "69cd3a80",
      "44517492", "7a319b90", "26711064",
    ],
    [T.meaning]: [
      "356eb3f2", "513618d9", "64181bcb", "76ec7619", "a1c8d3df", "b0ca2706", "5972c155", "7c483402", "1e79aa2d", "161d9b98",
      "60c9c3b5", "df860dfd", "10e13a4b", "24cf3bf9", "434c2976", "5843738c", "76f5d059", "8d4f8b64", "a1827462", "c33abe4a",
      "d039f603", "0c05a866", "ab04273d",
    ],
  },
  expected: { [T.grammar]: 12, [T.meaning]: 23 },
  total: 35,
};

export default plan;
