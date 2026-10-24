/**
 * Reshape plan: SSC CGL Tier I "Ratio, Proportion and Variation" (212 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 212 stems and solutions (2026-10-23). The ingest filed them under six subtopics, and two of
 * them were too wide to teach from: "Ratio and Proportion" (73 rows) mixed sharing a quantity, the three
 * proportionals, joining ratios and changing a ratio, and "Mixtures and Alligation" (63 rows) mixed the
 * mean-price rule with bookkeeping of what a vessel holds. Cut here by the method that solves the row:
 * ratio units (sharing, converting fractions and percentages to a ratio, coins, the value of an expression
 * from a ratio); the fourth, third and mean proportionals; direct, inverse and joint variation; joining
 * ratios through a common term and a ratio after items are added or removed; income, savings and ages;
 * partnership (capital times time, changing capital, money taken out before sharing, grazing rent); the
 * quantities in a mixture (the unchanged part, combining, taking out, repeated replacement); and the
 * mean price with alligation. Wages paid by the day (0bf0b654) sit with partnership, since the share is
 * rate times days; 2A = 4B = 6C (c1b2dc4c) sits with converting to a ratio. Never featured: ef0e742d
 * (its solution opens with a Note: two options are the same ratio), dc99d0a1 ("2 times more" read as
 * 3 times, as SSC's key needs) and 1899e4cb (the stem says "inversely with y" but the data force
 * f = ax + b/y).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Ratio Basics",
  proportionals: "Fourth, Third and Mean Proportionals",
  variation: "Direct and Inverse Variation",
  changing: "Combining and Changing Ratios",
  income: "Ratios in Income, Savings and Ages",
  partnership: "Partnership",
  mixtures: "Mixture Quantities and Replacement",
  alligation: "Mixtures and Alligation",
} as const;

const plan: ReshapePlan = {
  chapter: "Ratio, Proportion and Variation",
  order: [T.basics, T.proportionals, T.variation, T.changing, T.income, T.partnership, T.mixtures, T.alligation],
  byPrefix: {
    [T.basics]: [
      "7885b8c3", "69c25c68", "14e331ac", "32fa28e1", "7e287a55", "c92b8696", "c8844647", "0d6a348b",
      "3e05751c", "7773a4a1", "b04996b8", "c1b2dc4c",
      "d8ac9ddc", "0e39cae4", "046488b2", "9c30d8f3", "781dacf0", "1e21942b", "09f4ae55", "32f3718e",
      "109f9040", "e71a11dc", "d91e178d",
      "946e004b", "c58cb235", "327df39d", "4b880a3c",
      "dd7602cf", "caa07faa", "5545b752", "743cca39", "73ddb518", "339d7c35", "a3a6f2a0",
    ],
    [T.proportionals]: [
      "b089544a", "9e4dbc6e", "c1e8267f", "c1fadb64", "e384b414", "c62d8189", "c524db42",
      "9eaecbe4", "9fa10995", "82c1af02", "67e89306", "3226f7b0", "3253e474",
      "31a3c39d", "7386366a", "07f73be6", "ac5596d9", "985a5a74", "39a221a9", "fd6a26bc", "9ce1912c",
      "14820ca6", "e4183140", "ed62859f", "2a249986", "9ce0a0e5", "85a33436",
    ],
    [T.variation]: [
      "f63d8133", "80a95e30", "065fb22d", "6c44345a", "922aa3a0", "39489aa8", "7f6d68f0",
      "ae18a5ef", "56ab3673", "a7d8f957", "cc03093a", "e1bd834a", "1899e4cb",
    ],
    [T.changing]: [
      "e5ab3396", "28b4f81e", "b20cf122", "532983e4", "be9850d2", "7bae2616", "bd9145be", "337068ed",
      "64752151", "88ca1b90",
      "259346cd", "58ba19de", "47dab9a2", "84acbfdb", "97b53e4d", "74906eff", "8ccee912", "55c2bcc9",
      "2b624469",
    ],
    [T.income]: [
      "a65fa513", "c92285f3", "3a77a282", "60b6a7db", "657dac4b", "fed82b2b", "48dc7c07", "feed41d4",
      "a8b470e5",
      "2df7e85c", "3c7bd0b0", "b509fb14", "276acf2a", "47793f56",
    ],
    [T.partnership]: [
      "39d32526", "93135f70", "3e9ed38a", "5cc40ced", "f0f4df5f", "103ad383", "756e73ba", "052291cb",
      "eb5dc917", "436a3255", "79a2dc97", "6e3cb606", "942b1859", "a1867eda", "c08a380d", "c268f3b9",
      "30ee9850", "4ffc419c", "c9d0548e", "1ebb3ddb", "0bf0b654",
      "a283293c", "a14b52db", "b85b4722", "e27d3e22", "dc99d0a1", "676627f7", "8a8906ee", "a2acbde9",
      "a426913f",
      "bf9732c2", "a736144a", "495d34e3", "21ddc7bf", "23456e81", "1e2a7783", "367a4db6", "6a71607c",
      "01605484", "d02d6c07", "c6715522", "d72e7adb",
    ],
    [T.mixtures]: [
      "f48fafb8", "d7b00e3b", "82729bd4", "01aa391a", "8b288ea6", "839c4985", "2ffd3fa2", "11de7178",
      "4a152d3b", "4cffb4cf", "957e3798", "1db20015", "5b059800", "9fc3b457", "54e0fb3b",
      "5268b576", "7a41d49f", "8be42c11", "dfeabd9a", "ef0e742d",
      "7dcf07c3", "45bfcf82", "35fa55a4", "c03bc3be", "bbab97b3", "0fa302de", "8b532de3", "9a6d8cc9",
      "d1ba84c2", "3a69b308",
      "2e29b234", "9228d2e1", "fa8f7865",
    ],
    [T.alligation]: [
      "3dfa1f10", "a10de7e5", "6fcd8227", "beab49cb", "ab424660", "72ef5186", "4746cf2e", "5f0a0fec",
      "8dccfd5c", "897b0788", "82f579e1", "5b6583c4", "15b6b7ba", "774e9f82", "796fac6f",
      "e58714ad", "9d59d968", "bbc2a7ff", "7f51f2a1",
      "8d9be655", "b97e7e3e", "4762fb3e", "71d7f2f1", "ca6405db", "4e303a91", "cdeac963", "efc39971",
      "83a69b6b", "1362b6b5", "307defe1",
    ],
  },
  expected: {
    [T.basics]: 34,
    [T.proportionals]: 27,
    [T.variation]: 13,
    [T.changing]: 19,
    [T.income]: 14,
    [T.partnership]: 42,
    [T.mixtures]: 33,
    [T.alligation]: 30,
  },
  total: 212,
};

export default plan;
