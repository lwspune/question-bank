/**
 * Reshape plan: SSC CGL Tier I "Linear Equations" (62 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 62 stems and solutions (2026-10-23). The ingest filed them under four subtopics, and
 * "Solving Linear Systems" (25 rows) mixed two methods: actually solving a system (elimination,
 * substitution, testing the options) and deciding how many solutions it has from the coefficient
 * ratios without solving. Those are cut apart here. The two coin rows of "Integral Solutions and
 * Diophantine Equations" fold into word problems: both build two equations, eliminate one unknown
 * and then test the options for whole numbers. Ages stay their own page because one fact (the gap
 * between two ages never changes) runs through them. No row opens with a Note; 26856a00 ("five times
 * more than") is never featured, since only one of its two readings reaches a printed option.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  solve: "Solving Linear Systems",
  count: "Number of Solutions",
  word: "Word Problems and Applications",
  ages: "Age Problems",
} as const;

const plan: ReshapePlan = {
  chapter: "Linear Equations",
  order: [T.solve, T.count, T.word, T.ages],
  byPrefix: {
    [T.solve]: [
      "b3254067", "a0c5830a", "44f356a3",
      "0ce2b784", "a97f9380", "715fdd64", "af415457", "c2e6e5d0",
      "d260dbb1", "894706b6",
    ],
    [T.count]: [
      "190b9042", "89a91d22", "6e59e6f5", "e8cb061d", "14537314",
      "b04e335c", "14ae17b2", "98ae10f8", "aabeaae2", "ff7fb1b5", "39aabe2c", "07fc53f6",
      "001a04c7", "527b4ae0", "e38088f3",
    ],
    [T.word]: [
      "2b994993", "6fc51801", "975ac992", "6dd41c45", "55e37a42", "4be1dabd", "6b9118c6", "f7a68172",
      "b253d4f2", "a1ce4b99", "2835748f", "ff0f0d3e", "41e01231", "568adbae", "15c4de27", "ff73134c",
      "8108a045", "a8da5053", "a2f19e83", "4a086ff1", "529ab689",
      "4d28ff41", "96360cb7",
    ],
    [T.ages]: [
      "b245b789", "8781d0d6", "0c1dd420",
      "92798982", "7e6770af", "3a16f886", "535eb3da", "1bd4bbfe", "0513724c", "fd671ea9", "26856a00",
      "1e575d20", "de911393", "9d952660",
    ],
  },
  expected: {
    [T.solve]: 10,
    [T.count]: 15,
    [T.word]: 23,
    [T.ages]: 14,
  },
  total: 62,
};

export default plan;
