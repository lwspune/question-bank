/**
 * Reshape plan: SSC CGL Tier I Static GK "Books and Authors" (28 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 28 rows (2026-11-19, draft agent S3). The move filed them under one subtopic. Cut here
 * by what a student learns together: non-fiction first (books by freedom fighters and leaders,
 * music primers, modern writing on India), then fiction (Indian writers and the Booker Prize,
 * Indian and diaspora novels with their themes, a short world-literature table).
 * Never featured: 34e20ed3 (Hot Stage is a crime novel; no option describes it) and 3d367680 (our
 * answer differs from SSC's key), both carrying a Note; 130c8c20 (its key rests on a Crossword
 * Award for Being Indian that no standard book confirms).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  nonfiction: "Non-Fiction Books and Their Authors",
  fiction: "Novels, Authors and Literary Prizes",
} as const;

const plan: ReshapePlan = {
  subject: "Static GK",
  chapter: "Books and Authors",
  order: [T.nonfiction, T.fiction],
  byPrefix: {
    [T.nonfiction]: [
      "b9a29f27", "6b39b0e0", "2a32bffb", "b763f651", "05614e01", "130c8c20", "187c1bf5", "9e49d85e",
      "eab46c4d", "6e7c2d88", "ed5abee3",
    ],
    [T.fiction]: [
      "07aafbb3", "58ec1911", "1de6aa3c", "9bb64cf7", "67a4a570", "3d367680", "25059894", "3c680c8e",
      "34e20ed3", "5389143d", "68825b3b", "78496597", "d5e6efab", "e9ab03c9", "344f1b79", "58788e2c",
      "e3aa6eb7",
    ],
  },
  expected: {
    [T.nonfiction]: 11,
    [T.fiction]: 17,
  },
  total: 28,
};

export default plan;
