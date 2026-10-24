/**
 * Reshape plan: SSC CGL Tier I "Alphabet and Number Tests" (180 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 180 stems and solutions (2026-10-23). The ingest filed them under five subtopics, and
 * "Letter Position and Alphabet Test" (67 rows) held two methods: reading positions, shifts and counts
 * in a word or sentence, and sorting a word's letters into alphabetical order. The sorting rows move to
 * "Arranging Letters and Digits", which also takes the seven "Digit Operations" rows (too few for a page,
 * and two of them are the same arrange-then-count method on digits). Dictionary Order, Word Formation
 * and Address and Data Matching keep their rows. Never featured: 23e19936 and 22b3e12a (their solutions
 * open with a Note) and 1a101c7f ("between the 2nd and 7th letter" reads two ways, landing on 3 and 4).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  positions: "Letter Position and Alphabet Test",
  arranging: "Arranging Letters and Digits",
  dictionary: "Dictionary Order",
  words: "Word Formation",
  matching: "Address and Data Matching",
} as const;

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Alphabet and Number Tests",
  order: [T.positions, T.arranging, T.dictionary, T.words, T.matching],
  byPrefix: {
    [T.positions]: [
      "98818204", "291429fa", "720769ac", "c7966f94", "d3f8d94e", "6ee06fc8", "ec9f0163", "a7e6a682",
      "34f9aec1", "17aaf702", "e995fc96", "2d3d7d61", "1a101c7f", "360c5709", "3a2d8643", "3fdd4428",
      "8410132b", "1c07bd8f", "1568fded",
    ],
    [T.arranging]: [
      "715d6653", "4512560c", "9726ad40", "92b60f01", "4b636369", "74731588", "98b84dc1", "4ea4643c",
      "c717aff9", "85be1de2", "16bd1c0c", "505f7718", "57da71c5", "328f1fd1", "cefc5a56", "66fa3d84",
      "d2fd3134", "13170e1a", "770b8351", "929b5391", "17c823df", "ce4df68a", "dfdc5bbc", "d37e52ad",
      "88e2bb87", "f7a02b3a", "5694c133", "84c2f1e4", "b05b563d", "67a4080b", "cb819387", "e27575ed",
      "4bb37cc3", "9538ff0c", "050dfee6", "45407e83", "abdc920d", "d4d530df", "078871b8", "13909451",
      "1452c35d", "933aedf8", "ecc82b6e", "45bdd1c6", "8b39e0be", "77c58518", "5b34ae48", "7b48875b",
      "23e19936", "a155a740", "0ea39bb8", "2747a8d6", "d0e560fc", "22b3e12a", "a1b561f2",
    ],
    [T.dictionary]: [
      "128caf09", "1a2fbe95", "74b9d610", "8a03fa9a", "b016cd26", "52cb3ab7", "f49d3897", "f9898048",
      "fb66fef3", "a1502c5b", "3e489f1c", "beb6eae7", "117244a9", "e73ba5f2", "42a3600d", "69599e33",
      "e8ef7617", "5e41c741", "2ad56fb2", "f491ce28", "cbdd4f1a", "1af67245", "4e8f18f7", "2a11c465",
      "6257568c", "b3c33192", "2ec9a2ee", "0d447be3", "f48d3b95", "d189e1ad", "8bed77d5", "365a9666",
      "ffdee16f", "aeb127b9", "cb93fe97", "3ad63f0a", "760d5c61", "2d1c3a7f", "e47b277a", "52743a6e",
      "46c2f6e8",
    ],
    [T.words]: [
      "dcb15c8e", "a57b6ac6", "fb63af6d", "759931ae", "70f29792", "a9ad637d", "2cee10ca", "9475bf42",
      "ad949ae4", "f1f8e092", "b33144b5", "e7074752", "1444bd61", "a75add0d", "c9ddaf98", "dda8ea7f",
      "0d8696fb", "24df1f87", "fa2209ed", "3c5f2eb9", "6231e3a5",
    ],
    [T.matching]: [
      "c8f09108", "9527767a", "490d9559", "bc974aae", "e6f191ff", "60be1497", "38646fcb", "14f7ecc6",
      "9b644bb6", "b24150a8", "e086be86", "bf2d60f7", "3c32fb40", "de73e182", "4459a690", "a4c4b67a",
      "28404fe8", "5f52eba3", "84b31365", "56b14d6c", "9e7d6fbf", "21ffb86a", "0d6d1c40", "d7e02c68",
      "8640e7e6", "76d69162", "c6344570", "81b35b5d", "f684a75f", "c6313a7b", "5da66e30", "907971b9",
      "8b0263d2", "afba1382", "2d83ea3b", "8080d373", "7454a1b2", "2f1cee0d", "d7d79bd1", "5a5b97f2",
      "efdd30ae", "89378025", "8418b40a", "45933d93",
    ],
  },
  // A Digit Operations block with no bank row (the remainder of 987654321 on division by 9).
  extra: { "t1-2025-09-21-s1#6": T.arranging },
  expected: {
    [T.positions]: 19,
    [T.arranging]: 55,
    [T.dictionary]: 41,
    [T.words]: 21,
    [T.matching]: 44,
  },
  total: 180,
};

export default plan;
