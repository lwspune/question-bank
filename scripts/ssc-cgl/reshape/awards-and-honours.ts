/**
 * Reshape plan: SSC CGL Tier I Static GK "Awards and Honours" (36 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 36 rows (2026-11-19, draft agent S1). Almost every row is an award given to a musician or a
 * dancer. Cut here by who gives the award: the Government of India (Bharat Ratna, Padma, gallantry);
 * states and music academies; then Nobel, Grammy and film awards. Never featured: 029aab7a (gallantry
 * awards are announced on Independence Day too), a27bec8c (its "first vocalist" premise is false:
 * M. S. Subbulakshmi got the Bharat Ratna in 1998), 3e573ff9 (the edition number of the award).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  national: "Bharat Ratna, Padma and Gallantry Awards",
  state: "State and Academy Awards",
  global: "Nobel, Grammy and Film Awards",
} as const;

const plan: ReshapePlan = {
  subject: "Static GK",
  chapter: "Awards and Honours",
  order: [T.national, T.state, T.global],
  byPrefix: {
    [T.national]: [
      "4a4b5c39", "6b8c656d", "029aab7a", "3e573ff9", "d3f6125e", "baac0022", "2f736540", "4fe727e9",
      "a27bec8c", "0876cad6", "0ae24520", "ed932d3c", "5bfcee39", "6ae50335", "c4455ea4",
    ],
    [T.state]: [
      "0fca7f9c", "36e46f81", "4d862265", "91bf880b", "9cc4fc91", "f9e9afc9", "8b3b47e9", "18dad24b",
      "5f3d77c3", "45cf7402", "7da60b8b",
    ],
    [T.global]: [
      "5dbcd63b", "73b0a80d", "baa61202", "c69c3ec1", "96a630f5", "1cfd8f4d", "5cd0c350", "903e789f",
      "7af46fcd", "d00333d1",
    ],
  },
  expected: {
    [T.national]: 15,
    [T.state]: 11,
    [T.global]: 10,
  },
  total: 36,
};

export default plan;
