/**
 * Reshape plan: SSC CGL Tier I English "Cloze Test" (410 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 410 rows (2026-10-23, main session). Three teaching pages: blanks settled by the passage's
 * meaning, blanks settled by the word that goes with its neighbours, and blanks settled by grammar.
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "English",
  chapter: "Cloze Test",
  order: ["Reading the Passage's Meaning", "Word Partners and the Precise Word", "Grammar of the Blank"],
  byPrefix: {
    "Reading the Passage's Meaning": [
      "01a51db7", "06319cdb", "0857044f", "0d232fde", "0da7e6c5", "0f89944a", "11b280df", "13ee442f",
      "14b318fa", "15a694bc", "17de2039", "19494550", "200320b5", "214861a0", "27f3d6e4", "2bd5784f",
      "2e040a14", "35906dd4", "364b3cc6", "38ce20bb", "4497fc03", "51f18850", "6763bc53", "6b189071",
      "6e95446d", "6f55d894", "761eba58", "7c187ef6", "7c474c24", "86d3476c", "8c9013c9", "8f319994",
      "903ab8a3", "912e5e1a", "957b4984", "9c003db3", "9c6e4ef1", "9fa787b0", "ae5deb01", "b7d0fb54",
      "c870d332", "d027796f", "d1eb2730", "d6dc538e", "d77cbe9f", "df89d8de", "e0928ea1", "e1292696",
      "e4720b6b", "e67a1eb0", "eb96b726", "f2d69e2d", "f473674f", "f77be2cf", "f81ae53b", "fb453ec7",
      "ffa2bcba", "1309c0a2", "1714de6e", "17dda027", "1cbe3b48", "20119ae8", "28109fe4", "29bedf83",
      "2aec65b8", "2f26a94c", "3e39c5a6", "4341aa95", "47438b8f", "4899d8f6", "4e157461", "5245af38",
      "5684e221", "594441f0", "6249708b", "64163019", "6fb30f12", "787df03f", "79171e62", "7b8aefe8",
      "7b9bb4df", "7f58b752", "821d3e52", "8530998c", "87e83d6b", "8b46f041", "9078f95e", "90fc22f7",
      "9177e16d", "933074ed", "934e1808", "9769090c", "9d7535e5", "9d86d45b", "a073a359", "a8b791d8",
      "b0408da5", "b1956ca6", "b228f001", "b580a0cc", "b8b2d75d", "bac909a6", "bcaa7568", "bd1ac5eb",
      "c229abbb", "c2cbaa30", "c9ec26d9", "d11d3bbf", "db4c3cde", "e2427603", "e7817987", "e7fff023",
      "eaa87a53", "eefe3ee6", "f2137240", "f2d5be47", "f54dcbff", "f628074f", "f973afde", "fc58f27c",
      "fe138800", "fe1faebd", "0196ce79", "10f6a25c", "12909e07", "19c4a449", "1fdfc7a2", "20231504",
      "223b2250", "298add76", "29fd442d", "3b9fad22", "5a068458", "5a95f173", "5c4d2952", "631af93f",
      "7b920d84", "7d3b574b", "927d2900", "96c24a85", "98c162e1", "ab539aa8", "ac04e1e8", "adbb03cb",
      "b11bf51e", "b760d1a6", "bd669b1b", "c7776fd0", "c9d5d621", "f304eb74", "f306b496", "f38b0132",
      "f505d158", "f91bb0d5", "fb166ec7",
    ],
    "Word Partners and the Precise Word": [
      "03f4c605", "0713da1a", "0875a916", "087e5d18", "0914a8df", "0b5cb071", "0f89af50", "108cc6ec",
      "109f77fb", "1633c21c", "1b951244", "1c6d58fc", "23dee09d", "24811888", "26183055", "2f1d1962",
      "334773d9", "375f9aeb", "3e462a85", "3e61c1a7", "40cf4da8", "44f95484", "47dd5f64", "4b32641c",
      "4b68957b", "4ee7bd9f", "4ef56b2a", "553091b2", "5600e0db", "5ab4c560", "5bd33826", "65b6841a",
      "65d663d9", "6e93eac1", "78b2690a", "78f3d771", "79d977b6", "7a33617b", "8611404e", "881d9404",
      "8a9d1cc3", "8d12bda0", "8e59420d", "91ef0fad", "948c519a", "9659192a", "96b6000d", "989e579a",
      "9b32f7bf", "9bcf4a4e", "9cd8c05a", "a0672206", "a38070c5", "a6f56075", "ab973cf6", "ae818a88",
      "b0a785f0", "b27c26f1", "b85c1bb5", "ba34580a", "bc33b394", "bdfb97ef", "c1d9a624", "c3d5419f",
      "c62be30e", "c98d2780", "ca30f275", "ce797707", "cf6c85fb", "d2d9a4dd", "d8231873", "d86ed9ff",
      "df6f35ad", "e5d8f494", "eb49b1fa", "ef782e73", "f3b30d5b", "f8ed9f97", "f947b727", "fa15b321",
      "feeef310", "05314a58", "077fdbbc", "0d1decf4", "109dbd67", "12897586", "13816422", "1adc15d8",
      "1e6fee45", "216c13fa", "25fb280d", "26c83c8e", "2993e562", "2e2a733e", "2fc38789", "35018108",
      "3793a51f", "38da1414", "40dde1d3", "4279c397", "5031681b", "55edbfd3", "5a26d890", "5c0668c0",
      "5d6a8f5e", "6525da82", "671fb8ab", "69cca156", "6a1a4f5e", "6ab99503", "6d108f94", "6d43c457",
      "77110970", "77a63e0f", "78fbc9f0", "8c8fd055", "9534a105", "96ee840c", "a3192045", "ad886f40",
      "adb76723", "afe7c106", "b3a6d408", "c3122455", "c72acb53", "c94f4503", "cc91b709", "cd05efdd",
      "d072e973", "d10ea633", "d7de70e4", "d9aee3b0", "e1bf64b1", "e6e92e5c", "e9986927", "eb62db47",
      "eba548ee", "eec7a7c8", "f2815ac0", "f37b6f1c", "32359a68", "d9fb1e78",
    ],
    "Grammar of the Blank": [
      "003d4c3a", "014d9f97", "087a380a", "0924278e", "09a7af66", "0c186b5a", "0c7b1a65", "1641703e",
      "184904a0", "1fbbd300", "2723f564", "2c491aee", "2e7854c1", "2f14659b", "300db611", "30f939b6",
      "31b0dc9c", "3f3ceb16", "457d0a4b", "4a9e630f", "4c804b46", "568fe1b6", "5802e318", "5a202346",
      "644c082f", "66b84998", "6b22aeb3", "6e483a00", "7375ceb6", "73fe03a0", "7a9d3f49", "84807806",
      "8e50801b", "90d0a5bf", "91472925", "a7128f60", "a7e20ed4", "a896898e", "b436d415", "b5865b5a",
      "b7bba2df", "bb10e886", "bbb43738", "beee7c9a", "cb0a0a64", "cd651b1a", "ce774b44", "cff8d8bf",
      "d7841d7e", "deec9add", "e32cb93f", "e682194c", "e7ab7dbd", "ea1254a5", "f41ab29b", "fa80db85",
      "fe6998c1", "02269a35", "03e4d57b", "0842a49a", "0950a7fc", "0d012e14", "0d82e724", "0dc60b6d",
      "16034b95", "18f336be", "287b44a9", "28b931e2", "2b01d0f2", "2bc36b29", "2f2094db", "2fa0cbd3",
      "30d469ef", "30df35e9", "357f9a39", "3e788208", "43ffbf0c", "44ca363e", "50fce8b1", "5420972c",
      "55d2d62f", "61663a9e", "667ab9f4", "67b2d326", "701a4197", "76a29045", "7bf8ed3e", "84162d87",
      "886e194d", "8a9b0198", "8e64f56d", "8ee3ce73", "8f2201b4", "926e7099", "9eff4e54", "a0f5900c",
      "a5dd5f5e", "a72ed912", "ab99f2af", "af8532c8", "b137652e", "b1f97f2a", "b3d2f2f6", "b76e8282",
      "bb90429d", "cb125cc4", "d360191f", "d4c3530d", "d5ebfeae", "dc21ed17", "e2d5241d", "e997e8e1",
      "f8899175",
    ],
  },
  expected: {"Reading the Passage's Meaning": 155, "Word Partners and the Precise Word": 142, "Grammar of the Blank": 113},
  total: 410,
};

export default plan;
