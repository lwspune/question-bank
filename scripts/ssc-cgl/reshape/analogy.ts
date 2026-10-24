/**
 * Reshape plan: SSC CGL Tier I Reasoning "Analogy" (456 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 456 stems and solutions (2026-10-23). The ingest cut the chapter by what is compared
 * (words, letters, numbers, number sets), and two of those buckets each held two methods. Cut here
 * by the method that solves the row: word relations; letter positions and shifts (same shift, a
 * pattern of shifts, opposite letters, letters turned into numbers); letters moved rather than
 * changed (reversal, swaps, and a move followed by a shift); number pairs joined by one or two
 * plain operations; number triads whose third member is a sum, difference or product of the
 * others, or which climb by fixed steps; and every pair or triad built on squares, cubes or roots.
 * Pair-shaped rows filed under "Number Set Analogy" join the pair pages. Never featured:
 * 0093e7a1, 6704e54a, 6ec2e38b, 6c6a3104, 13bf4237, 11ea3667, 77ce62c0 (Hindi-only prints),
 * bfa17208 (no option fits the pattern), 2d0e26b7, 725d856c, 6a10d9fd (their solutions open with a
 * Note), and e4195357 (8n - 12 fits both examples and lands on another printed option).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  words: "Word Analogy",
  letters: "Letter Analogy",
  rearrangement: "Letter Rearrangement",
  numbers: "Number Analogy",
  sets: "Number Set Analogy",
  powers: "Square and Cube Rules",
} as const;

const plan: ReshapePlan = {
  chapter: "Analogy",
  subject: "Reasoning",
  order: [T.words, T.letters, T.rearrangement, T.numbers, T.sets, T.powers],
  byPrefix: {
    [T.words]: [
      "fc9e7ac1", "d8c13950", "5e7ca507", "4fd91ff0", "2d069122", "eb746c24", "0093e7a1", "9c681d40",
      "6ec2e38b", "6c6a3104", "26d550d2", "13bf4237", "0856655b", "11ea3667", "727b7c6e", "7c2a706e",
      "643386b0", "eb3e681b", "ef438618", "6cd64636", "70195b3f", "3a58830c", "583180ce", "77ce62c0",
      "dc11473b", "85ef7219", "b03afe59", "eb3f6a45", "5804cf7e", "99a53cec", "e9178f02",
      "c9162cdd", "0ebc7ada", "de591ac7", "88ba879e", "eb47e529", "8e5288f3", "900bee79", "2ff0aa6f",
      "788c3f05", "8e54781c", "8066fec1", "147b006f", "c0a981b3", "82ddf155", "af434146", "f0823498",
      "5bc3c78e", "0eab30a2", "4b0662a3", "599f6af8", "edc61046", "e7aa3b74", "e8099205",
      "39499fca", "e5788ab0", "613f2c5e", "4bf1907f", "80ca9af0", "9b47fdda", "d902f9eb", "693356b5",
      "0290d26b", "60d47563", "c7ce5f15", "71c02ac7", "5b77b7dc", "95dd49e0", "fcbdbb13",
      "37733e3b", "27dc80e9", "002a9f6a", "6704e54a", "1200128b", "da6e66f5", "f327ca29", "ea33c303",
      "4b8e930c", "aaa6ade5", "719f56a4", "6c5850a5", "ce5c84ff", "f6a139c2", "9126822f",
    ],
    [T.letters]: [
      "a82f6201", "10507182", "4f0e0f4b", "a80a1652", "abbae2f6",
      "72d48ca0", "f9969b23", "2c001283", "efd7bc0a", "7a816ff2", "35999244", "9ef70d82", "9b27ce2b",
      "36f97633", "90c339f7", "7abaab95", "a64898ce", "1764daf2", "68243571", "ab804c02", "ca206696",
      "dc5a01af", "68c9456b", "07994fe1", "8a8da60b", "9090df7e", "b7f256b5", "2097ecb4",
      "f3aec31c", "2f765baa", "4a8b7d1d", "aa0d4969", "6166fd8f", "3bc1adfc", "0371d137", "9ee8112a",
      "5017c741", "6eabe0ca", "ef92f6f0", "83dbe8f8", "a8842d02", "f9f19afc", "95755633", "1449de64",
      "831c6ccf", "f61556d5", "1d6f20b6", "2662b767", "19ff39fc", "81039de3", "7607ef3f", "9aff1b8b",
      "0371462a", "8c998df2", "046aaf38", "434bb082", "27c207ac", "b74935e6", "3eaa1871", "5024df97",
      "a159b9ef",
      "82bef030", "52f2eb29", "615dff90", "6b9d7f2a", "c5e2b477", "3ee23fde", "42147e58", "dfbbef8f",
      "d56bf572", "baaabdb6", "3f2aed74", "3d0748b6", "ed82b2a7", "05092806",
    ],
    [T.rearrangement]: [
      "d1965323", "5790bd6f", "73bb4901", "b3a999a3", "f3f8ef4a", "ac28d578", "ce310e9a", "a002ccaf",
      "a9bd109d", "eab67583",
      "e0e6881e", "c869b4b3", "73697487", "e5ae2790", "79064531", "61a108df", "0638a3e1", "aa274b83",
      "c3dc6614", "31bb546a",
      "65398d7c", "fc13815f", "8bbd7996", "13354119", "3bfbac8f", "8169f4bf", "51ac014a", "f9901c82",
      "50a5a3ba", "beef4a83", "1e3fe15f", "3bd93573", "610e80ac", "f6c018f6", "2e157c14", "bfa17208",
      "a8b324c4",
    ],
    [T.numbers]: [
      "a9bce033", "bf7f163d", "21cff70b", "c70dc8ae", "3a42fb3f", "d6565ed3", "e467ea44", "6ab24e27",
      "85c0266f", "0029302e", "851ba17a", "6248aba1", "10109b7e", "6d27bdfc", "003c0184", "625d1b2d",
      "febfb6d0", "870cdef2", "a84c8a4a", "5d28218b", "f7e0b115",
      "030f5005", "50840351", "7589bef3", "c4d26125", "95070454", "8aa190f2", "63732f2e", "47585cec",
      "cad41f59", "a945a09b", "6f44bc09",
      "37a14341", "a25f5c54", "8b3f4c92", "83c365e1", "f597155b", "5a3f50b4", "1927fe87", "93b63a30",
      "c3262384", "305d5bb3", "52b45e08", "3f19ecdf", "eea60a7d", "6972e25d", "6d167a7b", "5cff52ab",
      "a49a428e", "8c106b07", "ef2771af", "7fc562de", "0ddcfc61", "be5065ff", "f3f22916", "199bf61c",
      "3d709d54", "836bf17a", "cea999aa",
    ],
    [T.sets]: [
      "f1fa2a34", "0ca64cf9", "99ace6a8", "a2c71e70", "2939c306", "68a6b80b", "1979f958", "1c5524ee",
      "4a66d9cc", "55ecb7ea", "075560ac", "88f4020c", "b6fe2691", "066e5448", "a17f3298", "4a5d9afc",
      "f9fd2f65", "d265f389", "33cb4306", "d3beeed9", "0f3696cb", "7d3cdb3c", "363ea1d4", "5484ee1a",
      "fcc2b5ba", "9f0d8f3f", "4e01c8cc", "36292e65",
      "a46249bf", "892227ea", "29955f97", "c57962ba", "41582022", "725d856c", "471bb528", "158684ae",
      "48c22bc1", "9172824e", "a7b36e38", "92b3c86b", "8c9abe0a", "c0c92b4d", "0c62df77", "c907e169",
      "eae25a8a", "ff373e6b", "665031b8", "46f92ac4", "7f999027", "682edaa1", "1a0e372c", "ca3d2dba",
      "0848204e", "11308ccd", "37e45f4e", "f20b5ff8", "0750db15", "1f9c2d14", "f07b0edf", "d03dacc2",
      "7619bb23", "6f109e2a", "6779bd1b", "737d54c2", "6aa01095", "f105bce3", "e9665110", "2d0e26b7",
      "282fbba2",
      "b0b4f6ab", "22faaa7b", "9fbd8aff", "e222cdbb", "0eaf25f7", "1bcde5bb", "262d3b73", "3d35d36e",
      "0d2d5bc6", "9d7f62ba", "174efdf0", "06f4057c", "199543ea", "e2d4029f", "29116f28", "68660906",
      "51feb8bc", "ae2bfb41", "d6c8fe91", "fcbd868e", "7da95d5f", "4b22fde6", "9138b547", "0f898254",
      "8669f2fd", "a049ef3f", "3636618c", "970bfec0", "fdf326ba", "13cbbe17", "40e976cb", "d060b402",
      "7d5cd4c4", "89e64aa4", "5e1e77cb", "30652e1c", "742b4b5b", "b5bb86a1", "fea8b6aa", "a71e68e2",
      "79e727e6", "a3fbd44b",
    ],
    [T.powers]: [
      "37dfd91a", "f7c8c681", "59d76c82", "dcce07d4", "7ba8e711", "7b0e98c7", "d0d00e67", "3a09872b",
      "3918ddeb", "d1db5fd5", "b40e2fe7", "ef59d147", "9e3c85e2", "ff4c9cea", "c2a83cf7", "a96384fb",
      "d79ba3fb", "480a56c3", "42fc6bdd", "9e377839", "2fb2dd3c", "107fea0e", "e9cc0bc0", "931c1482",
      "c7454088", "e7499a47", "08f33554", "94c07585", "d3f74086", "c4c0d16b", "6088b1ee", "47dc478a",
      "017e8d1d", "e3560e79", "cb4b4fe4", "b33f5555", "6c4c459b", "be0ce49a", "ff9c3f7b", "28cdd806",
      "0b75eed2", "e4195357",
      "f074d88e", "70d8b523", "8fcdfc7a", "cccbec07", "96f87c6b", "0c7508a3", "f0310d7e", "6f3b74c7",
      "a76c63ca", "b6d3f710", "954fd097", "cfc7cc58", "4d0cf569", "ae75d314", "a5144f61", "cecbbf0c",
      "3225e269", "7a4b51b6", "90f89f94", "9a88d514", "af79be9b", "19a0170b", "5ef71b0d", "0517e708",
      "3821717a",
      "6cd9cc63", "dcd9c841", "c5ed40cc", "256a5e3c", "29d69fd0", "25f0e80e", "114c76fe", "0f7a0d5d",
      "67659d33", "6f6c79c8", "d3c819b8", "029fad04", "860f5589", "e33d2b0f", "610f86f8", "bb196ebe",
      "00dfa53b", "c20e91db", "6a10d9fd", "dad7e834", "8f6f893a", "86fee1ad", "fc3aac7f",
    ],
  },
  expected: {
    [T.words]: 84,
    [T.letters]: 75,
    [T.rearrangement]: 37,
    [T.numbers]: 59,
    [T.sets]: 111,
    [T.powers]: 90,
  },
  total: 456,
};

export default plan;
