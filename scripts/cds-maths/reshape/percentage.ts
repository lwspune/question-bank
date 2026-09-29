/**
 * Reshape plan — CDS "Percentage, Profit and Loss" (50 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 50 stems AND solutions (2026-09-29). "Percentage" (26) held two moves: taking a
 * percentage OF something (marks, populations, what-per-cent-of, more-than/less-than) and chaining
 * percentage CHANGES (area from two sides, rent times rooms, up-then-down, price against
 * consumption), so each gets a page. The one discount row filed under profit joins the discount
 * page, which leaves a clean "Profit and Loss".
 */
import type { ReshapePlan } from "../reshape";

const T = {
  percent: "Percentage",
  successive: "Successive Percentage Change",
  profit: "Profit and Loss",
  discount: "Successive Discount and Marked Price",
} as const;

const plan: ReshapePlan = {
  chapter: "Percentage, Profit and Loss",
  order: [T.percent, T.successive, T.profit, T.discount],
  whole: {},
  byPrefix: {
    [T.percent]: [
      "f33cd03e", "a6712281", "39a0113a", "6cbd69d8", "cf2a91f2", "2cc0d141", "a55ce747", "f7102d2e",
      "f5347d22", "61ce3598", "b83b0d87", "585db50a", "c045a5aa", "a15b61f7",
    ],
    [T.successive]: [
      "29912b4b", "94e423af", "26433c05", "a7123a1e", "ee14d66a", "93e838ad", "c09cd465", "9bf41717",
      "93045fe4", "674a1a6d", "18918ad3", "347b3d34",
    ],
    [T.profit]: [
      "110a7619", "cb4ef0b7", "54afd267", "185f495e", "23facbfc", "183ad148", "f88088da", "59d5247e",
      "9734bfbc", "be9d83d3", "00e2612b", "0236e0c5", "afaffaad", "cdd90941", "e74da6f0", "ee55d706",
      "c37cf4a2",
    ],
    [T.discount]: ["78a40864", "9e0db31a", "41132c04", "4b10146c", "dd531bfa", "d419fa4f", "613b7261"],
  },
  expected: {
    [T.percent]: 14,
    [T.successive]: 12,
    [T.profit]: 17,
    [T.discount]: 7,
  },
  total: 50,
};

export default plan;
