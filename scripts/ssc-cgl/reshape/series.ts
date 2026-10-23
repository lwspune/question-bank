/**
 * Reshape plan: SSC CGL Tier I Reasoning "Series" (433 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 433 stems and solutions (2026-10-23) and checked every key with a small solver (letter
 * steps per position, the shortest repeating block for blank series, and a library of number rules),
 * then by hand for the rows the solver could not read. The ingest filed the rows under three
 * subtopics by what the terms are made of (letters, numbers, mixed). Cut here by the method that
 * solves the row: single letters and pairs by position; clusters read position by position; blank
 * series by their repeating block; number series by differences, by multiplying, or by squares,
 * cubes and primes; letter-and-number terms and rearrangements; and wrong-term questions last, since
 * they use every rule before them. Never featured: 446b8b03 (SSC key 88, ours 93: the steps
 * alternate times 3 and plus 3) and 7c5d9ff8 (two options complete the series). Both open with a Note.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  positions: "Letter Positions and Gaps",
  clusters: "Letter Clusters",
  blanks: "Letter Series with Blanks",
  differences: "Difference Series",
  multiply: "Multiplication Series",
  powers: "Squares, Cubes and Primes",
  alphanumeric: "Alphanumeric and Pattern Series",
  wrong: "Wrong Term Series",
} as const;

const plan: ReshapePlan = {
  chapter: "Series",
  subject: "Reasoning",
  order: [T.positions, T.clusters, T.blanks, T.differences, T.multiply, T.powers, T.alphanumeric, T.wrong],
  byPrefix: {
    [T.positions]: [
      "65a20250", "59eae7df", "2a6e84f1", "d90dd938", "e25bedd7", "39100193", "ef4a336b", "c575661a",
      "2a4b618e", "cfa1a565", "e86f1e51", "cb37135b", "a83c218e",
      "740fde46", "2a1db84e", "0e7e5b46", "4d133c78", "46080944", "584aa6b2", "5044ae05", "4251c9f3",
      "c57bc5d9", "6beb41af", "390e1b57", "02dd7df2", "d8a6e795", "3c938340",
      "877edd33", "8576e1ae", "1970e175", "3faabedc",
    ],
    [T.clusters]: [
      "e40bc4bd", "5c563f1d", "900ac37c", "d426c2de", "74523dc7", "d3809ac2", "9c2e1403", "ca0fa060",
      "a215e65e", "7bf12708", "ceb982e7", "dcc13a16", "1e28faac", "24b95999", "097ee2e3", "99bd6ea0",
      "5f4bbec0", "fd360fa0", "ba09100c", "3b311db7", "01571d72", "ba8a3d18", "314fe3e8", "5a776d23",
      "0d86f3fc", "ec7c5f95", "85ed5fe9", "bd68dea9", "b8e0b994", "6926fcdb", "69e72acb", "e553b59d",
      "9198d967", "748429c1", "0aaffdbd", "ec894a39", "e6a7f180",
      "85dcda98", "09dcf92b", "07880195", "c5fd2aff", "d0d869d3", "bde6e3be", "596eee76", "cbce1794",
      "44d774e7", "48cc21cb", "b07a0005", "fed1c39a", "72f04dd4", "f0398ba0", "e6f940fe", "f9425b16",
      "01ffea7b", "7922f433", "6c257f29", "f83fe4b0", "2d2a7b85", "ca33210e", "da330807", "ba651587",
      "59e1cd36", "20239128", "530724d8", "0a126c6e", "0233fe75", "596ad860", "1baa58ca", "fe01339f",
      "d11252b0", "965dde77", "8751c919", "2f4aa896", "8c071f25", "ed5d0d7e", "639a9db4", "41463de7",
      "cca855ad", "b1ec4d8b", "a8e63199", "0dd36c5c", "bdbea1a4", "5a461ec2", "dce8e522", "8b9d003c",
      "68fa9400", "5c0e826d", "390e7641", "2c3a59e2", "8a333ab2", "0e3d8c8f", "c7ff229e", "7e4fdfff",
      "9b2ddc11", "53475ca4", "2581694e", "1f9dc350", "523ea08e", "daa66c76", "32dd2ada", "4a77814e",
      "a17576f8", "9c9c0e4f", "ffa79765", "460fead8", "553a493b", "e9cd11c1", "c1c78795", "16900c24",
      "2aaccbb1", "3de9422f", "654aeec5", "4e5bb5cd", "bc1a86aa", "046ec1ef",
      "88ed1550", "6d5f3d0e", "42091030", "7e0c01bc",
    ],
    [T.blanks]: [
      "8a372498", "10f43d9d", "1de5e5fe", "4fb83ea2", "ce4076e4", "1e2959fc", "d377352f", "7c5fa1e5",
      "45218434", "c5b5ec25", "5071db81", "1dcc70e6", "ec44f5f8", "15341953", "d124beaa", "08caa680",
      "99b797e1", "e33564e3", "3df86902", "fd19e738", "a16e7edf", "b4e43943", "bcee9df3", "95451dcf",
      "6cc82b3b", "05bc33b0", "2c13d269", "b495210a", "654af199", "2a44aa62", "7a805414", "98dd5e1d",
      "75eb946b", "bd426ce8", "1b1e84cd", "b8db4413", "c7e5a353", "9cb26ae6", "0f3c2838", "df5bc58c",
      "0319436e", "0fc9f1fc", "4827cd88", "d8f26ba3", "885f560c", "b3ad77d6", "a2b00235", "4c65bcef",
      "c01f98c2", "3234bcfc", "3ab1b009", "7c5d9ff8", "306daba8", "3ece8244", "82c3152c", "119b7f00",
      "5977c8fb", "cef0bdd2",
      "918cfc60", "b901e08c", "6c2c3c9c", "f7f28ab9", "ebf93c51", "e1ce2ad5", "daea94db", "2d4f304c",
      "7a0e13ad", "450228a0", "4439ac3a", "91d59af4", "61247db7", "a25727e9", "ebca2624", "bc119e6b",
      "151c0ae7", "b9f07d94", "2a26cb22", "8eb3c729", "39522a22", "37e3b785", "a2c4f03b", "2084b04f",
      "3a39f3e1",
    ],
    [T.differences]: [
      "e6cf6d99", "e0ef9bde", "d6423e70", "d21e78c8", "739ac51f", "d640a16a", "9f4c30e9", "ceabe869",
      "f9243478", "c99ab57c", "3ec0636d", "efbc4ed6", "7b136fbe", "451e4c47", "d7ddef33", "38f2d37b",
      "8c76f413", "473019ee", "183d45ff", "afcb42ea", "42dddfc3", "de782318", "89ae0244", "64c34a8a",
      "1e28ebcf", "cab1fb22", "8098dd9f", "19d3ff4d", "b0952c08", "2d01877a", "408e203b", "a5b9984c",
      "324bab65", "ebbf5480", "5ad0ab28", "5016729e", "259e14f5", "a23c3627", "8766308d", "80ddfa1d",
      "cf256ecc", "d412ced2", "c99c7164", "18703c84",
      "d43a247a", "522f3412", "cbd8b264", "181af2ce", "602f70e8", "d9c34192", "5e8eb4ea", "2ac18aba",
      "22e1feaf", "565003ce", "6043aca5", "e6a377c5", "3a5cb349", "569d2a36", "2f7bde2b", "5225afb5",
      "a970d949", "25be8b59", "161f53cd", "259046a7",
      "fce8f1b8", "7aafb1e0", "acad358f", "57cd3d22", "eb2e5040", "e13ad18f", "e9f32547", "a9fe76ed",
      "5575cc68", "103fb173", "cb18f69e",
    ],
    [T.multiply]: [
      "ff317f6d", "c3493b0a", "d32395ca", "d3357536", "379f3445", "e85ea8dc", "662be4ba", "efc3a209",
      "9349e60b", "247b9669",
      "5a9e1082", "d9440dc5", "1c21e463", "56bf2de4", "d7f8c759", "4b71130f", "b20eec0f", "028d6e4b",
      "d45eb407", "856943a1", "3dd341c8", "f37a7bd9", "1af575d5", "c1291e24", "b623bd35",
      "a62ee608", "e34eb7c0", "2d346655", "f7caa856", "809af59b", "d40ac020", "ee064ef0", "9d026596",
      "573f2740", "8f61e150", "d5fc9483", "4176a94f", "d1b99a8d", "d600415b", "25f4efba", "cd4c7ca0",
      "4e340fd3",
      "446b8b03", "09e79c38", "20f5ac2d", "45c35e3b", "61195c74", "c9052ead", "209275a6", "59266e5f",
      "3461eae1", "f7fcd50b",
    ],
    [T.powers]: [
      "134a62d7", "b88f2b8c", "db2d890f", "ea1fd624", "9e0c979e", "d22ac1db", "58974b0d", "b3e7331c",
      "293fdbed", "0502fbdd",
      "200e611e", "12abb234", "7baff1c1", "1703475b", "4da4f371", "c30177a8", "e828350e", "043da5ad",
      "aa096b5c", "cfefaa7d", "cb669811", "f6bb646b",
      "097e2885", "84c8e553", "2b79c2f2", "d9e893e5", "c9f9a5f6",
    ],
    [T.alphanumeric]: [
      "3d101f8d", "801be371", "abaa3b70", "503e3404", "56c8bd8b", "d52ebff9", "849b3c36", "10e92473",
      "88c9b501", "1b04a90c", "4b34a290", "2cb9e810", "0e2505aa", "203cd621", "0a9c7421",
      "2061c716", "05dc6d4d", "df1fe8d6",
      "1eaf7820", "0b6a986a", "28dab578", "cb9adbe4", "6e273ad2",
    ],
    [T.wrong]: [
      "cc88137a", "bd1dd5f1", "a66cb1bb", "27bc622c", "c0e445c8", "6c423d3c", "57891425", "f8bfd147",
      "d0287a5a", "60615b5b", "ce151f59", "30655554", "8ce8007a", "80e5674d", "f24814ba", "8a899226",
      "3cce11f2", "066ff69e", "d5679303",
      "14bbdbb8", "88d5c234", "e304e803", "4a92ea95",
    ],
  },
  expected: {
    [T.positions]: 31,
    [T.clusters]: 119,
    [T.blanks]: 83,
    [T.differences]: 75,
    [T.multiply]: 52,
    [T.powers]: 27,
    [T.alphanumeric]: 23,
    [T.wrong]: 23,
  },
  total: 433,
};

export default plan;
