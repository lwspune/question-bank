/**
 * Reshape plan: SSC CGL Tier I Reasoning "Paper Folding and Cutting" (56 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 56 solutions (2026-10-23, main session). The ingest split the rows by cutting against punching,
 * which is one method. Cut here by the fold: two half folds down to a quarter (44 rows), and diagonal folds,
 * folds into thirds, a single fold and folded transparent sheets. Never featured: d209c908 (its solution only
 * cites the key SSC printed).
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Paper Folding and Cutting",
  order: ["Unfolding a Quarter", "Other Folds and Transparent Sheets"],
  byPrefix: {
    "Unfolding a Quarter": [
      "e1bc4d24", "e355ae7c", "faf2e7c3", "48a3c2ba", "1457f049", "362fe466", "57e202d1", "86c9d2f1",
      "d209c908", "386a8a87", "c1afcbb7", "f63f5115", "2d701cba", "244b9054", "0e5e1c54", "f65f9e6c",
      "6977d55d", "97f3da2b", "d2fe9f5f", "34984b40", "4df3c148", "aa792e60", "1ac7fa56", "1a4fd1a8",
      "a3cda2dc", "a46a6ebe", "e0ca8273", "3b6118a7", "2a10f359", "f9ae04db", "5ec72a87", "4723104e",
      "1f5f7012", "a604ea6a", "b7f08861", "946e2521", "e0ea5356", "b501e6bf", "54fb4761", "ffa13aed",
      "52a9f153", "0312091f", "a1a52add", "c2011d1e",
    ],
    "Other Folds and Transparent Sheets": [
      "402ea654", "aac89d04", "a948cf48", "b7f3cac8", "750a7529", "5980e34a", "a2ee20bb", "235cc838",
      "80f70883", "2a93a31d", "990507db", "4bb498ac",
    ],
  },
  expected: {"Unfolding a Quarter": 44, "Other Folds and Transparent Sheets": 12},
  total: 56,
};

export default plan;
