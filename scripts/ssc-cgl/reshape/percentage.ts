/**
 * Reshape plan: SSC CGL Tier I "Percentage, Profit and Loss" (326 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 326 stems and solutions (2026-10-23). The ingest filed them under four broad subtopics; the
 * old "Successive Discount and Marked Price" bucket (132 rows) mixed simple discounts, mark-up with
 * profit, and successive-discount schemes, and "Percentage" (84) mixed basic arithmetic with
 * elections and savings. Cut here by technique, in teaching order: percentage as a fraction and the
 * changing base; successive changes as a product of factors (with price against consumption);
 * percentage word problems (elections, exams, savings, weighted totals); cost price, selling price
 * and overall profit; marked price with discount and profit; successive discounts and free-item offers;
 * faulty weights and "cost of x equals selling price of y" (last, because three of its rows also use a
 * discount). Never featured: 3763f8e6 (SSC's key disputed, solution opens with a Note) and 6353c8d4
 * (the stored solution argues 13.4%, option D, against the key B, 13%; the stem is ambiguous).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Percentage Basics",
  successive: "Successive Percentage Change",
  problems: "Percentage Word Problems",
  profit: "Profit and Loss",
  discount: "Marked Price and Discount",
  offers: "Successive Discounts and Offers",
  weights: "Faulty Weights and Article Counts",
} as const;

const plan: ReshapePlan = {
  chapter: "Percentage, Profit and Loss",
  order: [T.basics, T.successive, T.problems, T.profit, T.discount, T.offers, T.weights],
  byPrefix: {
    [T.basics]: [
      "be1affac", "790837be", "f7d082f8", "946fcdf8", "e17df154", "a88536d4", "6544f0ad", "1641e0a4",
      "f6e6b6e0", "6a4048b2", "3abdbb28", "4b067a85", "5088cecc", "d8de7ab3", "845e0adc", "8491bf5f",
      "f6c69f21", "cf5aa74f", "f6a4b155", "ae602b2a", "d0c7b338", "398aac3f", "1284e064", "a60f5a1c",
      "ff3bc46b", "c1259f47", "f4253ccf", "ac88871d", "c541c47d", "f36b91b5", "1290c6d3",
    ],
    [T.successive]: [
      "9a0038ed", "b72b68e1", "a6c6c05b", "ef58edd6", "aff8b7b3", "bc360a03", "84b1ad44", "0fa964f2",
      "3a49a21c", "86399df2", "2fd7202d", "ebbf1039", "93f0a1ec", "f4c53b8a", "603334ce", "6353c8d4",
      "e5c34ccd", "cd461d2a", "e3001636", "faa1b76b", "0eee787c", "1fafec9f", "42c6b7f5", "224b0426",
      "61055af5", "99c13878", "6ec5b37b", "d5c00e63",
    ],
    [T.problems]: [
      "7e9fba94", "fe8e78ff", "be401abb", "65fa7b9b", "4bc52aeb", "06cb40e1", "b9e015c4", "29da0bdc",
      "df55f46d", "8d103dbb", "9c2671e0", "63e8053e", "753cea75", "2969341d", "598816e3", "8a18785c",
      "37a6ebff", "6585367e", "349a1e7c", "85e2bbc7", "36b88e06", "c7814cac", "a50d7228", "6ece436f",
      "5c89f9e9", "32b75b78", "60c24f04", "3e260079", "9f32a23b", "ee9cb2d4", "8e6b386d", "5aa4d6d3",
      "11d2321b", "253963a8", "797f573f", "22d674be", "7885ef33", "43a8abce", "5591aac2", "acc2712d",
      "25fea2b4", "d6505cd9", "ce391bfb",
    ],
    [T.profit]: [
      "fff1194d", "fb1a86c4", "4f273def", "219bc64a", "18bf96f7", "fc34a041", "e6e572f4", "373f4840",
      "d155f22f", "3b603eec", "64c4215c", "fea2a9a3", "1355057f", "cf1a5fa3", "30c674f9", "b5073a45",
      "e3b908d5", "51ed026f", "f0c2b35d", "46a8bf08", "eb980838", "79ed01fc", "3044bd5c", "bf55ace2",
      "7163503f", "3d6e3ad3", "52581272", "da366591", "d87181a7", "e44e7cf9", "1b935ca9", "d2f519f3",
      "03b7b1d0", "9f676fc9", "a3ea1a77", "81062307", "05b736e7", "8a88acf1", "b18b87f7", "ab51c036",
      "ea5ceba1", "1835ae0f", "3763f8e6", "89b71e84", "989398ef", "7b0f3fea", "cbf819bf", "ee3450dd",
      "4e747dfb", "da3496a1", "dbdff723", "85caab73", "3b05b80d", "56d55ea1", "10506058", "2c695c83",
      "82f4cdba", "408148a6", "947501f8", "70c84884", "0df58b7d",
    ],
    [T.discount]: [
      "db83153d", "668f159a", "71e66bdf", "05b6b6bf", "4c2fa7c2", "bdaf2c1e", "09e46cd5", "1364de23",
      "a27f1112", "0b82ee72", "990fadef", "f0c0a64a", "acd18c7b", "3a60dcf4", "9d67de4e", "63ee3f32",
      "5cb462e0", "f4006249", "e0c8ebdf", "1abc7c4a", "f3983b75", "1bb0ffb3", "4f77d4b6", "bdd1154d",
      "946faf1f", "636427ca", "d754ed43", "f2f13fe8", "b3f35fb9", "80038060", "742eba40", "018fb38f",
      "a2979480", "f5b647ca", "523cd1a3", "c0e24b9f", "f7dcdee6", "ecc6b589", "72087455", "a2eb06ce",
      "bc7323cb", "9d043bb7", "2f60c520", "c77c41d5", "afb9ca17", "8da25fde", "95bb2087", "1142dbdb",
      "de1a10e1", "89962c15", "bb761bf1", "4f79afea", "c2cdcd99", "d637c05c", "83caa535", "23e32740",
      "0fd7dd6a", "7cc276a3", "832dcf04", "a775c937", "70f94aa0", "52212c02", "b73ef52c", "1dbcaf87",
      "26c090dc", "e58a6437", "f89c85c8", "8409d40f", "90790694", "07c17438", "e2422fe7", "80e4c6b9",
      "23e0b488", "ca20ba7e", "3cec3b32", "02a19e10", "a2fe56be", "82265764", "9a884f9e", "0b3b4bb0",
      "99e96df3",
    ],
    [T.offers]: [
      "9dd6fd4b", "5f7bfc47", "43812364", "4d2974fe", "194cce54", "e5fe2298", "0d77d90d", "c5dd9edd",
      "baf0b661", "386c0711", "051c45ce", "3497a351", "e2e9a878", "5d6b29ce", "8bd097d4", "e38307ed",
      "4dd8602e", "1a3ace0c", "c032b2e5", "733552e0", "1180b67d", "8806c3d7", "a443667c", "8d5b4528",
      "99a80273", "460f9984", "5ea402cd", "480e6348", "7fbe8c8f", "f9f4f68f", "3b5bdb7a", "d7ad9b54",
      "39a97603", "b48d1783", "f2f5595a", "7123448b", "72afada1", "145d0554", "060e2051", "e62752d5",
      "d321e0dc", "3031d407", "9da1e28c", "3e0ffe56", "62349b78", "c088e974", "1f309625", "5b5a301d",
      "75f8ed2c", "c8cc7ebe", "907fe6ac", "6f78d426", "a75451f0", "5531783d",
    ],
    [T.weights]: [
      "affca09b", "a46193c7", "815a3476", "fcf694ca", "4991ff2b", "8e44efc3", "3db9d6df", "3686819b",
      "0fbbd016", "65354adf", "54e1db03", "912dbc4d", "af8249f0", "73298362", "6895a490", "de723e9d",
      "1b6bef6f", "cdc00c6e", "cc26ec21", "51465d32", "8cc080c8", "f2b6375b", "a236daaa", "75ab5939",
      "25401ad0", "9d90dcf3", "0cf32750", "c7f366ef",
    ],
  },
  expected: {
    [T.basics]: 31,
    [T.successive]: 28,
    [T.problems]: 43,
    [T.profit]: 61,
    [T.discount]: 81,
    [T.offers]: 54,
    [T.weights]: 28,
  },
  total: 326,
};

export default plan;
