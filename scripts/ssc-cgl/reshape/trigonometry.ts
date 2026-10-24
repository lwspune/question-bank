/**
 * Reshape plan: SSC CGL Tier I "Trigonometric Ratios and Identities" (291 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 291 stems and solutions (2026-10-23). The ingest used ten subtopics; the teaching cut is seven, by
 * technique. Ratio definitions and the standard table come first, then one ratio giving the rest (and the
 * divide-by-cos trick), then the Pythagorean identities, which the complementary-angle questions lean on
 * (sin^2 25 + sin^2 65 = 1), so identities come BEFORE complementary and allied angles. "Reciprocal Pairs"
 * (sec +/- tan) and "Power Identities and Given Sums" share one move (a given combination plus an identity
 * gives its partner) and merge into one page. "Trigonometric Equations" (13) and "Maximum, Minimum and
 * Impossible Values" (4) merge into the last page. Never featured: de96d6e1, 214ae64d, 860d58da, 9e5c4d07
 * (solutions open with a Note), ba00c834 (sin A + cos A = sqrt 3 is impossible), e5a3fa9d (two options
 * printed alike), c5296333 (degenerate: B = C = 0).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  values: "Degree, Radian and Standard Values",
  triangle: "Ratios in a Right Triangle",
  identities: "Simplifying and Proving Identities",
  complementary: "Complementary and Allied Angles",
  pairs: "Reciprocal Pairs and Given Sums",
  compound: "Compound and Multiple Angles",
  equations: "Trigonometric Equations and Maximum Values",
} as const;

const plan: ReshapePlan = {
  chapter: "Trigonometric Ratios and Identities",
  order: [T.values, T.triangle, T.identities, T.complementary, T.pairs, T.compound, T.equations],
  byPrefix: {
    [T.values]: [
      "dc02bf0b", "8ae44b5a", "3d65698b", "beb26cb1", "e3e9bfb5", "a7d12dad", "4c5d7a1c", "56f3d83b",
      "be29cf0d", "13efce76", "d4389f3a", "2d9ee03a", "b5bb52a6", "a7c5b27a", "b1cd5991", "1464fa51",
      "bf07c069", "6f480f59", "4077f034", "13771816", "bb60a99b", "dab68557", "225ab579", "e0771240",
      "80f55e86", "cc91834c", "b1011189", "b2429ae9", "adf4d8a7", "7fe60fa3", "b0ecd383", "ce1b2390",
      "8765e49f", "1a65cc9a",
    ],
    [T.triangle]: [
      "c9299d4c", "81f36d42", "6cbb1c49", "eb391e1f", "17b08f24", "cbb189aa", "724b3f1c", "06da73a2",
      "f86156c5", "568323d5", "b633e5c3", "971ecc9e", "af5bdfb9", "7ef137b1", "cf48e1bc", "9fecc919",
      "9218abaa", "3ca4e4ba", "0282f618", "f1af9d48", "362396c6", "95df03b7", "2264d018", "9bed33ef",
      "9d72d495", "1d7a740f", "53db2d58", "493ece43", "e013c6d5", "6b18cfb1", "83d211ac", "e73c5289",
      "7c6e028a", "ab32ab1a", "6a0c0b0d", "50c9afcb", "265f5c0a", "066472b5", "0de7dabb", "85732529",
      "ebfaf76a", "042998b8", "3ac7c31a", "ee571a80", "99b3782b", "e9f567e2", "218ea506", "5533a63a",
      "93d10643", "0e33bf16", "514c9d8c", "20a2cf8d", "d92793d6", "adba156f", "08e16a06", "5ce3a965",
      "55831e95", "ac6acd8e", "517f0345",
    ],
    [T.identities]: [
      "ceaacf95", "7109e149", "7f7391d3", "dfe4a354", "6c924e39", "63981739", "13a8ef3f", "2ab4fc01",
      "d28f2d61", "77d0edbd", "df76d2b6", "e5a3fa9d", "ac737557", "a4e32614", "6ee690c7", "fc1159da",
      "9fe71634", "d4953471", "6c669f75", "67a2d575", "6ff83515", "a31c0c51", "9fb7d27e", "860d58da",
      "015d0edc", "fc992329", "91c16428", "35881c41", "276559e4", "e0bc9180", "948905d8", "5fd6f60b",
      "06068472", "9e5c4d07", "d445348e", "c8a3ce63", "a2094815", "5d3e259f", "214ae64d", "e2c817af",
      "d72707dc", "1ebdc258", "b44860e1", "599da05b", "29453315", "0ba46269", "10884c41", "a96ca7b8",
      "3b74641e",
    ],
    [T.complementary]: [
      "40e5c6fb", "df681106", "85fb8223", "a53d6b8f", "6ed56213", "f579ee45", "b43092c7", "057789ee",
      "9b7a53d7", "21f84af9", "d165106a", "003412ce", "841c17a1", "de480e13", "310fdd80", "4e91ee45",
      "423a3bc5", "5cf1e566", "570e0fb6", "b55505b6", "ab2e3770", "3c1650cb", "a1a39021", "dea492e9",
      "d357de15", "2c22763b", "a9471f6a", "db8f5df0", "5630ed3e", "e9bdb8cb", "e51501ec", "f5727c7b",
      "4ce630e0", "bc89d194", "8e096318", "1e9125ae", "d14f7cce", "c5296333", "4d353049", "efedd6e2",
      "0aee135b", "17105aa9", "02c9a941", "f60c2585", "d904ffee", "8e0c8461", "2a030d3d", "de96d6e1",
      "582e1bd2", "71de3459", "dadfa269", "55bf10ed", "06f1fe98", "2baf7cc4", "f28f8813", "d48117e9",
      "1bec8729", "1c30c677", "ea6c6171", "5a025e28", "8a078ce1",
    ],
    [T.pairs]: [
      "c2ad8567", "29e4ec16", "c469f556", "c5d36afd", "eb753635", "41ae8707", "e55f9834", "c7861188",
      "9c06b99b", "7df5f69e", "42628009", "a9482dc9", "0e682e91", "17231954", "221f65a1", "6dcd76c8",
      "da331167", "b421d8d7", "92786dd4", "61b22826", "96c86493", "19fce22d", "dc52bcb6", "ba00c834",
      "f9e0a6b3", "0ee4b10c", "873245b1", "a11bf5c6", "9a3a0650", "1927bf3d", "260cd28e", "58eeac57",
      "ca0820c6", "db00d77e", "c8d0fd0e", "69d502d7", "4cdc4a70", "7e407a34", "026df458", "9c24e42e",
      "8b090bad", "8fc7af63", "217330ae", "692114d7", "3bccbd54",
    ],
    [T.compound]: [
      "484d2a47", "ae7c69c6", "104a6bad", "19172d0c", "a2ce9d3e", "2e1118db", "9be2a9fe", "e0aa4ad6",
      "de911998", "6806343b", "3cae85ab", "9fa0cd0b", "aacf060b", "b28d7aff", "7f438835", "392a3bc5",
      "4f31a56d", "c6258bcb", "652c7adf", "065a8591", "fff0ddc1", "1d6c8482", "5515a827", "d1a0194b",
      "b178502f", "46d45bc4", "98ab2eb9", "8c5c95f2",
    ],
    [T.equations]: [
      "6042bd08", "80c68cb1", "ecf32aad", "e4155ddb", "89ad93fa", "efbb3701", "d88ed8ed", "08393456",
      "a5f06d54", "419b2c34", "1fccc8a3", "0eb2c515", "0545cac1", "8f87f989", "19596647",
    ],
  },
  expected: {
    [T.values]: 34,
    [T.triangle]: 59,
    [T.identities]: 49,
    [T.complementary]: 61,
    [T.pairs]: 45,
    [T.compound]: 28,
    [T.equations]: 15,
  },
  total: 291,
};

export default plan;
