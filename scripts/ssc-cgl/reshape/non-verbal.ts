/**
 * Reshape plan: SSC CGL Tier I Reasoning "Non-Verbal Series and Analogy" (148 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 148 solutions (2026-10-23, main session). The ingest filed 147 under "Figure Series" and one under
 * "Figure Analogy". Cut here by the rule that solves the row: an element counted up or down, or a figure built or
 * erased part by part; the whole figure turned, or a part mirrored or carried to the next figure; elements stepping
 * round the box; two forms taking turns; and grids of many symbols rearranged by one move or two moves in turn.
 * Never featured: 16502ea4, b0f2517f, f7ae9178, fdf78f37 (their solutions only cite the key SSC printed).
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Non-Verbal Series and Analogy",
  order: ["Counting Elements", "Turning and Flipping", "Moving Round the Box", "Alternating Figures", "Symbol Grids"],
  byPrefix: {
    "Counting Elements": [
      "350fb12f", "66374ce9", "e19e893f", "4d53f44e", "1cd26574", "12760a03", "aec0e8af", "86b94c54",
      "0c26993f", "14be4021", "4ca1b1c3", "87a03de4", "7e701166", "ae315acb", "a8719239", "cf0a5666",
      "0c7b755c", "d8517808", "ef7ff2ae", "57445082", "d7b22ead", "de80342b", "210d7531", "3a5ea86e",
      "2df329e2", "088e95a7", "d83a9208",
    ],
    "Turning and Flipping": [
      "db40fed4", "e8c307e4", "ef791ebe", "c841ddd2", "ffb00d71", "9e9274b4", "5289164f", "0c7aaf08",
      "456ff6fe", "9a230f9e", "983c546d", "3ba0cc62", "c906f6aa", "37adcde9", "7b25188b", "38ec28b7",
      "9eaed2d7", "16124b5c", "71dd8850",
    ],
    "Moving Round the Box": [
      "9b507c8b", "32d0859a", "32da4934", "6917b079", "6142a37b", "6b3ed6ac", "894212ac", "bf46925c",
      "e7cf4d6d", "c0e53374", "2be3c2e4", "e0683572", "08b3842d", "c2b667ab", "3a8a4e90", "5b51d3e2",
      "77494aea", "b951fab3", "e72dfc18", "d33f14d1", "52b6c0f0", "57d2a7dd", "bb08e2db", "cd21dc6c",
      "67302f68", "ce35c33d", "8317cbb9", "5fa9efa8", "8248dc5d", "8b9a505b", "44170be0", "b91bc6f4",
      "7d80e001", "b5015fd3",
    ],
    "Alternating Figures": [
      "246c2a9e", "9324f781", "b001ab49", "8cf6e371", "a6310365", "fdf78f37", "1b3c280d", "38f8d9da",
      "3969b8b8",
    ],
    "Symbol Grids": [
      "16502ea4", "d4d77818", "5e643242", "b2a2f0e1", "9e6ca249", "0949bbc7", "b0f2517f", "144b8938",
      "5c87eda0", "3f8b495d", "f7ae9178", "ba03bbeb", "7f66ce3a", "9071e764", "e642d7c1", "0f6c54ee",
      "69792ec6", "4a4a333f", "25b57150", "da8b0271", "6b2c7d8e", "38d16927", "e36620af", "7623fac3",
      "92efb0f4", "0d5a4556", "a1f5d123", "ba5ce419", "8ba32ed9", "6f6627e1", "f3563476", "f5ef8380",
      "cd1b71a9", "6f72b8bf", "e1f6779c", "f0b4b692", "d619283c", "2d6f6e90", "a19ea799", "2e283e36",
      "210f35d8", "633746ca", "8d609c32", "0153a282", "f792fcc8", "1971e668", "7165cbfd", "d115e6db",
      "06cfa375", "8c7cae21", "53470b56", "021d65e4", "aa01a9f7", "42c81a91", "be7db3b8", "e6047264",
      "d67df827", "7b3782d4", "b789ca05",
    ],
  },
  expected: {"Counting Elements": 27, "Turning and Flipping": 19, "Moving Round the Box": 34, "Alternating Figures": 9, "Symbol Grids": 59},
  total: 148,
};

export default plan;
