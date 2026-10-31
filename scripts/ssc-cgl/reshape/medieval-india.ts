/**
 * Reshape plan: SSC CGL Tier I General Awareness History "Medieval India" (118 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 118 rows (2026-10-31, main session). The ingest's biggest subtopic, "Other Medieval Kingdoms" (38),
 * held the Delhi Sultans as well as the Cholas and Rajputs. Cut here in time order: the early medieval kingdoms
 * (the tripartite struggle, the Cholas, the Rajputs and Ghori); the Delhi Sultanate with its departments and
 * taxes; Vijayanagara with the Bahmani and Deccan sultanates; the Mughals from Babur to Shah Alam II, with Sher
 * Shah; books, music and travellers; temples, forts and Mughal buildings. Never featured: 65a70e01 (printed in
 * Hindi only), 1b91c45f, 8c601473 and b4402249 (vague or resting on one source), c8fadf6f (a claim about volume).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  kingdoms: "Early Medieval Kingdoms",
  sultanate: "Delhi Sultanate",
  vijayanagara: "Vijayanagara Empire",
  mughals: "Mughal Empire and Administration",
  literature: "Literature, Music and Travellers",
  architecture: "Temple and Monument Architecture",
} as const;

const plan: ReshapePlan = {
  subject: "History",
  chapter: "Medieval India",
  order: [T.kingdoms, T.sultanate, T.vijayanagara, T.mughals, T.literature, T.architecture],
  byPrefix: {
    [T.kingdoms]: [
      "87d6add3", "87efec44", "65a70e01", "5cb3f420", "96c6a06b", "9e01d1c9", "6e5b2dae", "22878151",
      "028d79ae", "594cb67a", "8cf371ba", "8c05b7bc", "8d39a9a5", "9c827c83", "9d0dcc20", "dc8e0ee1",
      "e0dc171a", "0e8dbb32", "3e42a4e1", "a3330c68", "e3077d73", "c2bc8805", "d253405c",
    ],
    [T.sultanate]: [
      "42dee81d", "442cac24", "5f486511", "62032340", "27f6fa47", "a655365d", "b45a64e1", "a11ec052",
      "aed85cd4", "c4b65b88", "d6d5108f", "30f02d90", "099e505d", "3b5ef638", "4c1f50f5", "71ff096e",
      "b6447ed1", "b985a278", "04ec39b1", "1b91bc13", "1f953729", "cc947fc9", "eb04f984",
    ],
    [T.vijayanagara]: [
      "1db2c300", "6a4e9d45", "6b11fcfc", "57d34dac", "1c4000f6", "416d3498", "97dfdd01", "9be2871e",
      "bf3e2210", "c88875ba", "7b91d1db", "f5bdc026", "3a2606ac", "54c60410", "e5947530",
    ],
    [T.mughals]: [
      "8f57d082", "19d8ca34", "2cb705fd", "46547b75", "99a30f01", "e1c7b4ab", "e846037d", "8b6463c2",
      "ad007c42", "b4402249", "bfd79c5e", "e947a3f8", "6007662a", "7de4123e", "b29d90ed", "478ef8ff",
      "66a54a30", "6b96dba5", "f760a2b0", "18a2763c", "8d10fa01", "4685c159", "c9d7f8ec",
    ],
    [T.literature]: [
      "9fac4d44", "073865e0", "5a38a680", "69a0dea5", "9d25e484", "1c44501c", "c8fadf6f", "f21b45c9",
      "3ded751f", "133996a4", "fe8b1098", "6e59de9a", "08ef06ac", "6709398a",
    ],
    [T.architecture]: [
      "169d77e6", "2456a940", "6886fbbe", "9e7e1d62", "bea7ef94", "ca643a6f", "7a96f8ea", "bbf8fcbb",
      "1b91c45f", "3a9343ba", "8c601473", "1fd2d556", "c93ccd86", "42fd7c9d", "52c954cb", "55943e5d",
      "a44978ac", "ad2ed1a0", "b8e95a3f", "5675aeca",
    ],
  },
  expected: {
    [T.kingdoms]: 23,
    [T.sultanate]: 23,
    [T.vijayanagara]: 15,
    [T.mughals]: 23,
    [T.literature]: 14,
    [T.architecture]: 20,
  },
  total: 118,
};

export default plan;
