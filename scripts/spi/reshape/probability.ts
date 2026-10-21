/**
 * Reshape plan: SPI "Probability" (59 q), for scripts/spi/reshape.ts.
 *
 * Read all 59 stems and solutions (2026-10-21). The ingest filed them under 32 one-off subtopics.
 * All are Class 10 classical probability, cut here by the object being counted: one die or coins,
 * the rules (range, complement, odds), two dice and calendar pairs (a grid of equally likely
 * pairs), cards and bags (odds sit here: 46e0156e needs the deck's make-up), and experimental probability with expected counts. Never featured:
 * a606332f (two options print the same number) and efaa46b1 (the wording allows two answers).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  coinsDie: "Coins and a Single Die",
  rules: "Probability Rules and the Complement",
  twoDice: "Two Dice and Calendar Pairs",
  cardsBags: "Cards, Bags and Numbered Cards",
  expected: "Experimental Probability and Expected Counts",
} as const;

const plan: ReshapePlan = {
  chapter: "Probability",
  order: [T.coinsDie, T.rules, T.twoDice, T.cardsBags, T.expected],
  byPrefix: {
    [T.coinsDie]: [
      "4f83761f", "773a6e8b", "60cc0033", "3ea726f5", "f00603d0", "063a5a04", "0b6a03bc", "87d57a9d",
      "ca641846", "b5d2696c", "5eac6692", "ce752736",
    ],
    [T.rules]: [
      "e1899cd1", "c4ad1bee", "93702930", "4a41daad", "cd847879", "c6b472a1", "02c562ac", "3cd7bcd4",
      "308345d9", "139a8001", "acbf9634",
    ],
    [T.twoDice]: [
      "7dc44b5b", "76fa210f", "72aebfef", "7c9ddb7c", "46bef604", "86d39a82", "09014292", "33ec0250",
      "efaa46b1", "0a894965", "e6b937eb", "6e4a69e5", "e52d0dcf",
    ],
    [T.cardsBags]: [
      "b0042870", "4aaab76f", "3d18e08d", "3b02f1d8", "e84233de", "a606332f", "c8ae6f2c", "8d41056d",
      "bb82340f", "41586f8c", "acef9f20", "72fb7d2d", "f3675bfa", "0f80187b", "75d4f01e", "9b9a6bfa",
      "5ca727dc", "46e0156e",
    ],
    [T.expected]: ["1da7ee97", "a035c937", "304b2e74", "dce8c440", "ed065e9f"],
  },
  // A repeat of 1da7ee97 (the 400-toss coin), skipped at commit by content_hash.
  extra: { "mock-3#28": T.expected },
  expected: {
    [T.coinsDie]: 12,
    [T.rules]: 11,
    [T.twoDice]: 13,
    [T.cardsBags]: 18,
    [T.expected]: 5,
  },
  total: 59,
};

export default plan;
