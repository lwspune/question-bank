/**
 * Reshape plan: SSC CGL Tier I "Simple and Compound Interest" (132 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 132 stems and solutions (2026-10-23). The ingest filed 103 rows under one "Simple Interest"
 * subtopic, 27 under "Compound Interest" and 2 under "Instalments and Difference of SI and CI". Cut
 * here by the method that solves the row. Simple interest splits five ways: the formula itself (with
 * part-year time and the principal from an amount); a missing rate, time or principal (with two amounts
 * after two periods, equal interests, and a rate tied to the time); interest as a fraction of the sum
 * (the rate times the time, sums that become n times, scaling); sums lent at two or more rates; and a
 * rate or time that changes, with part repayments. Compound interest splits two ways: the growth factor
 * (amount, rate, time, year-by-year interest, CI against SI), then doubling, part years, shorter periods
 * and equal instalments. The 2-row instalment subtopic folds into the last page, where the CI instalment
 * needs the present value of compound growth. No row's solution opens with a Note and no key is disputed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  simple: "Simple Interest",
  unknowns: "Finding the Rate, Time or Principal",
  fraction: "Interest as a Fraction of the Sum",
  twoRates: "Sums Lent at Two Rates",
  changes: "Rate Changes and Part Repayments",
  compound: "Compound Interest",
  periods: "Doubling, Part Years and Instalments",
} as const;

const plan: ReshapePlan = {
  chapter: "Simple and Compound Interest",
  order: [T.simple, T.unknowns, T.fraction, T.twoRates, T.changes, T.compound, T.periods],
  byPrefix: {
    [T.simple]: [
      "dec75908", "660e7dd9", "198e64fe", "bc69c842", "0e06203a", "fcd2d38f", "5d973e15", "e22e964d",
      "ab797886", "a6fa2a6f", "25a2e53f", "f286b86a", "82c89fae", "43d239fc", "4f4e5c8c",
    ],
    [T.unknowns]: [
      "ccf73054", "ab0d2049", "eacd6e7b", "8e4948a6", "64284183", "622d6911", "ac56f6cb", "065d91c9",
      "f831a359", "56e05353", "31e41832", "c9b680ce", "96c7e8cf", "4a11a615", "460d13d4", "81270be9",
      "be4b57f1", "2aebdef0", "244818cd", "d58ed842", "aeac8b9f", "108dd120", "4abf1565", "f3ad3a4d",
      "347abea1", "79d0f940", "a514c3eb", "a231532f",
    ],
    [T.fraction]: [
      "26b98f5b", "29910da3", "b25f1f62", "a913e571", "f63674b5", "f1a72bad", "a3a92aaa", "501c3fca",
      "1e5d7fb6", "b48def34", "32f0a1b5", "f3206dcc", "8ec53292", "080b1cef", "203e0d8b", "b0ecfd10",
      "387d75b3", "bb019554", "6028d23d", "2f02f6fa", "8737daa0",
    ],
    [T.twoRates]: [
      "61fbb4f7", "39739aac", "8ed03fd7", "6c3da76d", "7d7f73b1", "514933b1", "b3fbb45f", "d306bfe1",
      "6e308f29", "760de02a", "7921f8b0", "9b6a7d53", "153546c4", "fa2b7683", "3fc089cd", "5a792e06",
      "5f624d40", "9f1f47cb", "93d13ebc", "2fcdcadb", "638edb6c", "ad76936a", "712490fb",
    ],
    [T.changes]: [
      "8175f5f3", "5cb174f7", "0b5a4f49", "b848bf19", "4974adf6", "bdfe3e9d", "1ddff965", "6338f2df",
      "1ec00ab7", "9b92fa81", "89d85299", "bce8ccbf", "7d6e309b", "b6ecafae", "9d9732cd", "5b10928d",
    ],
    [T.compound]: [
      "48251943", "70cbad3b", "fc740c05", "c1e2493d", "600b87d9", "5481d394", "84146ff2", "63c76d47",
      "2eddaf53", "883f1984", "0772028a", "495856da", "9c44ecc4", "c77ac644", "324d3281", "8054ea5d",
      "7f7186ad", "3e85564b",
    ],
    [T.periods]: [
      "dfac1a6b", "38f128d0", "428b164f", "d488f25d", "08828184", "779b7b75", "99f28de9", "767f9e13",
      "1040d803", "b706d841", "375721c2",
    ],
  },
  expected: {
    [T.simple]: 15,
    [T.unknowns]: 28,
    [T.fraction]: 21,
    [T.twoRates]: 23,
    [T.changes]: 16,
    [T.compound]: 18,
    [T.periods]: 11,
  },
  total: 132,
};

export default plan;
