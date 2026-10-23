/**
 * Reshape plan: SSC CGL Tier I Reasoning "Classification" (212 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 212 stems and solutions (2026-10-23). The ingest filed them under "Number Classification"
 * (85), "Letter Classification" (73) and "Word Classification" (54). Each of those held more than one
 * method, so the cut here follows the method that solves the row: single numbers and lists judged by a
 * property (prime, square, cube, digit pattern); number pairs whose second number is made from the
 * first; triads and sets whose numbers are linked to each other; letter clusters with equal steps or
 * opposite letters; letter clusters whose steps change size or direction; the groups that mix letters,
 * numbers and symbols (all from the 2025 shifts); and words. Never featured: 62c3f565 (it lists the
 * category "Geographical Phenomena" as an option beside three of its members, and the key picks
 * Cyclone; by the reading 7375a14c is keyed on, the category word itself is the odd one).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  numbers: "Number Classification",
  pairs: "Number Pairs",
  triads: "Number Triads and Sets",
  letters: "Letter Classification",
  gaps: "Letter Gap Patterns",
  mixed: "Letter, Number and Symbol Groups",
  words: "Word Classification",
} as const;

const plan: ReshapePlan = {
  chapter: "Classification",
  subject: "Reasoning",
  order: [T.numbers, T.pairs, T.triads, T.letters, T.gaps, T.mixed, T.words],
  byPrefix: {
    [T.numbers]: [
      "1269f104", "2a1886a1", "37d570a8", "ff50e9be", "b483c63f", "30ddf979", "8d81b5f8", "e90b4ff5",
      "713b5512", "13065680", "ebf2ecef", "4742295f", "edf806e4", "22556cbb", "f9ea8701", "26ba9621",
    ],
    [T.pairs]: [
      "0c5dab75", "ec9229d7", "cbf139db", "315b85d9", "e9f940e7", "96302c88", "8ce096a7", "ddfc684f",
      "29404238", "874eb9e0", "813c747d", "76984e5d", "395da863", "d989a557", "804f7b6a", "e9a22acc",
      "1a73d0d2", "a2f0494d", "9aab924a", "772b5a98", "4a8827ee", "04f48788", "c0506eba", "0d8c9dd0",
      "4019bfc8", "4cd1baf2", "386e194f", "6c83aba9", "88cae6b3", "233ec6c0", "66b68cd1", "7a30b037",
      "0f3b23b5", "2a34828c", "c149aa62", "b3767116", "342b062c", "b0479be5", "06c9c6db", "5dccde4d",
      "94fb6cd0", "9bd302ea", "67f3e51d", "24b8a913", "ccddc68b", "a6ee07e1", "c23f919b",
    ],
    [T.triads]: [
      "642db73a", "421f718f", "73efbbae", "863904a7", "658d0fd7", "7b765f02", "a7186cc0", "e2298219",
      "32a0e4ed", "c7182164", "3c8789ef", "41a5561b", "7af48a9e", "59f853bf", "1dd1c74f", "4036da8b",
      "f504d8ba", "30fa9e3e", "a2a9dc25", "6a5e96a2", "fb593990", "9da69205",
    ],
    [T.letters]: [
      "edbccbe3", "685374b0", "28f80eb4", "3e2528f3", "5042c551", "83d3cfe7", "9326c46c", "5eba9be5",
      "61c3638c", "cf2883e3", "2f340112", "f726212b", "8bc48828", "dee7ae77", "7b51378e", "8fb771a6",
      "f29dc225", "a74d11a4", "3f4d7177", "36e3ce38",
    ],
    [T.gaps]: [
      "cbed9b0a", "0c26f290", "717690e1", "b0410770", "2c2beed6", "4ce7d75e", "1d49caf0", "fbfe0b62",
      "065fefa5", "6b2a5e55", "abd41aff", "f5cf8cac", "6510ab00", "9bf7101d", "55e7008e", "33237452",
      "abad56b7", "0d263298", "5fb0daa2", "21dc3e81", "a86709fd", "6f54311d", "ff258302", "f5760db0",
      "ad3818de", "9dc923db", "5b981351", "26c47789", "933e1162", "a40595db", "9f0944c4", "cf129986",
      "883f7757", "a5b5ff1f", "5dbec3b0", "91b79db9", "c53e530c", "17983161", "6b512302",
    ],
    [T.mixed]: [
      "2cfd87f4", "e8a88aef", "5c61ab32", "c6baab18", "68260187", "2cb1970f", "4b3f9433", "e5fc8322",
      "7ab4e1ae", "35ecfe19", "9c8d2f61", "a1dc4574", "71352b1e", "191db7de",
    ],
    [T.words]: [
      "4d23e443", "f7502d8f", "5861cd91", "9733b3de", "d7fc4b2d", "5271b379", "bc4615da", "05b0db72",
      "7a1ccbac", "2384a17e", "adfd76c2", "c53a2731", "62e737c8", "fdebd761", "bb50d8d4", "90cd6ea3",
      "bb7ab0fd", "5950851e", "af6fd347", "162c5ada", "fe172032", "1ce89944", "3ffba83c", "3a20af71",
      "45c9f10f", "7375a14c", "62c3f565", "8d78daff", "adedf583", "cc638a6a", "2dcf5e19", "3adbf2bc",
      "603373ef", "3e6ecc16", "a26f57ac", "fb160777", "a0db839f", "2a967eb5", "3d36ed18", "ff854cc6",
      "f258ee56", "cfb90366", "9e328b36", "fc3307d5", "0dedf3dd", "96c5c7f8", "df1b4354", "1df8eef0",
      "8c96c7d1", "c05981d4", "77276de1", "c6e0f0ae", "bcf8dcd0", "e60ee345",
    ],
  },
  expected: {
    [T.numbers]: 16,
    [T.pairs]: 47,
    [T.triads]: 22,
    [T.letters]: 20,
    [T.gaps]: 39,
    [T.mixed]: 14,
    [T.words]: 54,
  },
  total: 212,
};

export default plan;
