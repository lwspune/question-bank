/**
 * Reshape plan: SSC CGL Tier I Reasoning "Coding-Decoding" (247 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 247 stems and solutions (2026-10-23). The ingest filed them by what the code LOOKS like
 * (Letter Coding 139, Number and Symbol Coding 82, Word-Code Sentences 26). Cut here by the method that
 * solves the row: letters moved along the alphabet (one shift, a pattern of shifts, vowels and
 * consonants apart); letters reversed, regrouped or swapped, alone or with a shift, and opposite
 * letters; letters turned into numbers (positions, reverse positions, sums, the word's length); a code
 * table read off directly or a letter's code found from two words that share the rest; and sentence
 * codes matched by common words. Never featured: 8b02700f (its solution opens with a Note: SSC's key is
 * B, ours A), 4092fba7 ('you' twice in each sentence yet five different codes), e6a0bfc4 (the two
 * printed codes contradict each other letter by letter), a81c9e2a (the least number with code 2, 2, 2
 * is 2, which is not printed), 804d87b6 (the middle number fits only an invented '+24').
 */
import type { ReshapePlan } from "../reshape";

const T = {
  shifts: "Letter Shifts",
  reversal: "Reversal and Opposite Letters",
  values: "Position Values and Sums",
  symbols: "Number and Symbol Coding",
  sentences: "Word-Code Sentences",
} as const;

const plan: ReshapePlan = {
  chapter: "Coding-Decoding",
  subject: "Reasoning",
  order: [T.shifts, T.reversal, T.values, T.symbols, T.sentences],
  byPrefix: {
    [T.shifts]: [
      "2c6c9494", "9d569d98", "b8a1c1a3", "994468e4", "8847d7fc", "781e792c", "59ee9d9d", "1439f685",
      "945d6cab", "bebc4e55", "0295c0d4", "8b02700f", "3fe570ab", "b7462dc3", "14f92215", "254737ba",
      "a245525c", "74d21244", "ec3456f5", "d5eafd06", "afa76148", "8c20bc04", "760f8375", "df30f9d2",
      "ae6d1130", "94b5f53c", "84101d80", "fae0edd6", "11e9ff36", "7bbccbbc", "e603cee8", "979be77b",
      "c65e97c7", "2efa41d5", "63f6ac94", "46faf3f3", "afac7fee", "f5fc0734", "8c915ae5", "f0ba3333",
      "d13bd808", "59176aae", "2181b9f7", "c99880b6",
      "40e9a4c6", "5db0ff60", "0bf6705a", "6609e83e", "8015d82a", "d0bec646", "d41de686", "5cbdee14",
      "8875e00a", "73b6bfa2", "d8f76048", "24951625", "7c06d990", "4f322eda", "d81dfaff", "b0211d70",
      "804d87b6", "b8f777bb", "28a0bb52", "f09107f2", "67e5b698", "d8fe184c", "ce5aae8c", "dcd34174",
      "79479187", "fcf6af5b", "2184e284", "2d0537f9", "3d96e653", "1b5c86ef", "c3d64484", "24e21eda",
      "f619012d", "46eec91d", "3853ca71", "33eeff8d", "88bfdab2", "5945289d",
    ],
    [T.reversal]: [
      "df9c0f86", "a1f67b9f", "88439d8e", "a1b80159", "5a9d90f6", "0450563b", "744f0c81", "aae571e8",
      "ee7e7010", "f28d92e4", "981eb8c9", "2aba53ea", "81cf64e7", "413b2c50", "b9716ad2", "f37697c3",
      "67fb158a",
      "944edd69", "51aaaa60", "183fb360", "b2cb8b17", "305b18c3", "875ee436", "027a1c95", "42e8667b",
      "ba0c99b8", "112f304e", "acb00b84", "a898d40a", "7f927727", "2e94ea8f", "a864bd3b", "a047d64d",
      "19aad4dd", "381e2b28", "b289abe3", "302aee01", "ca9543a6", "b5e5c407", "049e275d", "21b3cbf7",
      "fc1bc5ee", "c1496248", "b6c1731e", "0e1eb0c5",
      "0f7dacf7", "9a583649", "e9c49927", "95cbfb4d",
    ],
    [T.values]: [
      "2ef30d5e", "b487ba9f", "2850bbb3", "8b19413d", "5738504e", "e5e86a9f", "a9a775c6", "b7b282bf",
      "0a68e020", "c69f29a6", "431b15a7", "a179e5f2", "54d57740", "48e85b62", "b8af8f98", "e25f07ad",
      "7cb3283d", "eaf9c361", "97240f30", "2ddceb19", "f38656af", "c8d59b07", "9d99c8d5", "aadf4489",
      "d07d1443", "0b7c2d85", "af1b73a9", "181ecc5d", "631f7e7f", "cb341461", "4d874f84", "7ddb2320",
      "c8c76f1e", "ddc47f1c", "3985c468", "b0ead6a1", "c5ea7ca6", "ec574eb0", "cafd438f", "feb0d82a",
      "68b3ef01", "6d33be83", "80bf6dca", "505a81c4", "79ae05ed", "d0914464", "0326f237", "e00bbf7e",
      "db8eed4d", "20573f02", "39f3109e",
      "93336b7c", "b353cdff", "bc41732d", "8d3d27dd", "a6107b93", "2ed74e6f", "0d71c810", "c5890f37",
      "a81c9e2a",
    ],
    [T.symbols]: [
      "27cb0311", "ba4413d7", "645e977f", "e52e4b33", "836b2eeb", "d290db68", "4c1c261a", "74e35f32",
      "2b86914c", "e6a0bfc4",
      "ac6dc386", "e551df37", "6cae1f8d", "7b3ee43e", "334f739e", "0ee36fd5", "580c8e00", "6702df43",
      "be08622f", "10c2ed2a", "d0aab967", "adcdb5c2", "02d2ec6b", "95091762", "f1b43ee8", "6e1c1fa1",
      "e2474a71", "77d721c4", "ad6f0cc1", "886c4c3b",
    ],
    [T.sentences]: [
      "f20a3caf", "f40275df", "bc976413", "6274ae65", "8244d602", "aa80d63c", "5e4e379a", "4a214b24",
      "4092fba7", "8953ee5c", "43c44f5e",
      "ca9490e3", "663b3386", "e601fff7", "526b781b", "aae20ec0", "2abf3f48", "acc45506", "2b117505",
      "10ba8452", "c7b15d7c", "3c84ff13", "3c4b3dbf", "f271adee", "a06772c1", "76bd9830",
    ],
  },
  expected: {
    [T.shifts]: 82,
    [T.reversal]: 49,
    [T.values]: 60,
    [T.symbols]: 30,
    [T.sentences]: 26,
  },
  total: 247,
};

export default plan;
