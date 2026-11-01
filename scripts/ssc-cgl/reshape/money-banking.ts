/**
 * Reshape plan: SSC CGL Tier I General Awareness Economics "Money, Banking and Public Finance"
 * (78 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 78 rows (2026-11-01, main session). Cut into money with the RBI's monetary policy, banks with
 * microfinance, and the budget with taxation; nine RBI and credit-control rows move from banking to the money page.
 * Never featured: 83a313e0, acb4a53f and c0630985 (solutions open with a Note), ffd0497d and 52488526 (single
 * budget figures), 53e6e9b6 (a one-year global trend).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  money: "Money, the RBI and Monetary Policy",
  banking: "Banks, Microfinance and Financial Inclusion",
  budget: "Budget, Fiscal Policy and Taxation",
} as const;

const plan: ReshapePlan = {
  subject: "Economics",
  chapter: "Money, Banking and Public Finance",
  order: [T.money, T.banking, T.budget],
  byPrefix: {
    [T.money]: [
      "00b7a5a9", "1b37cc54", "4cf20029", "93408fca", "dddcdd67", "0bbab8cd", "1366ff13", "21ffcb34",
      "9e122a01", "ea4c6c86", "85671f78", "53e6e9b6", "223957f7", "ac7627a1", "c1258827", "c8bd9222",
      "2c87e95b", "5ae50612", "a61a04cd", "f117496c", "baf76628",
    ],
    [T.banking]: [
      "067977c7", "18e082dc", "1ceb858f", "cd78cb31", "d8ad5ff4", "6834722d", "6a10a596", "d349c977",
      "9d51e8f4", "a161736c", "829a3113", "c44c48a6", "059dd997", "0777f090", "38ce6273", "40fa0d39",
      "4dc0fdd5", "7f3daf63", "83a313e0", "cf853193", "f5232ba4", "fe5e97c4", "35d42e7d", "3cb85267",
      "c0630985", "c9225e78", "d6917322", "f35ad828",
    ],
    [T.budget]: [
      "0f9aae88", "3dcf9d99", "3f523c5b", "df37752c", "f4839c28", "f9678449", "bf4b1541", "21ec6559",
      "295d03e2", "440465fc", "98952b0e", "d8ef15a5", "30a59ab7", "3fb3529c", "6da566ea", "f8a66bb7",
      "e338d4ac", "07c2d738", "c60fd8da", "2ed7aa7f", "ffd0497d", "52488526", "7f8eb33a", "3b5b6139",
      "a8cb1c89", "acb4a53f", "fc6bce29", "29163f8c", "49e83470",
    ],
  },
  expected: {
    [T.money]: 21,
    [T.banking]: 28,
    [T.budget]: 29,
  },
  total: 78,
};

export default plan;
