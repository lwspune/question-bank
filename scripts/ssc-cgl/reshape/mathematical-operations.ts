/**
 * Reshape plan: SSC CGL Tier I "Mathematical Operations" (282 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 282 stems and solutions (2026-10-23). The ingest filed them under four subtopics, and
 * "Interchanging Signs and Numbers" (133 rows) held three methods while "Symbol Substitution" (98)
 * held two. Cut here by what the student does: rewrite each sign by a given meaning and use BODMAS;
 * rewrite after a pair of signs is interchanged (the 2024 favourite); test sign combinations to balance
 * an equation; find the two signs whose swap makes an equation true; find the numbers (and signs) to
 * swap; and find a hidden rule from worked examples (number-set chains fold in here). Never featured:
 * aa10c74d, 4dcbfb97, b45636df, 2c0f319f (their solutions open with a Note: SSC's key is wrong) and
 * c1964a25 (two rules fit the examples and land on two printed options).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  subst: "Symbol Substitution",
  pairs: "Value After Interchanging Signs",
  balance: "Signs to Balance an Equation",
  twoSigns: "Interchanging Two Signs",
  numbers: "Interchanging Signs and Numbers",
  hidden: "Hidden Operation Rules",
} as const;

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Mathematical Operations",
  order: [T.subst, T.pairs, T.balance, T.twoSigns, T.numbers, T.hidden],
  byPrefix: {
    [T.subst]: [
      "70309ed2", "38a923cd", "df88ad85", "25277091", "13d9b3ac", "0d86d8f4",
      "758dfaea", "dc994a16", "2cf04039", "ce837f63", "f79989bb", "a00f01c1", "3ce8af1c", "765498ee",
      "2cc6803f", "a5a1b525", "e9182eb0", "339adf84", "5fb046cb", "b19518e7", "5b07df11", "e55c345a",
      "844d770c", "fb8543e3", "569e14a9", "ce0c8021", "de0626a1", "c0950079", "01cb1272", "d0c661f5",
      "adfd9d73", "5867d7d8", "1e1b6d41", "d83b66d2", "19a9282d", "3f6ca2f7", "2c41706a", "a4ed7fc9",
      "925fbbd5", "99769d66", "d750b28f",
      "9b77be74", "fc2b3539", "c1f492b1", "aa10c74d", "864eeab6", "7b6fa29b", "25f68d40", "31ac3f2b",
      "f42db9be", "e287ee3e", "9cd2f18f", "58ba21b4",
      "6b237b4e", "be0d2f47", "7903ad39", "b02eae75", "4dcbfb97", "dc5bb393", "778aa353", "221fd5ef",
      "d0668b78", "c58f1b77", "cd58a216",
    ],
    [T.pairs]: [
      "749fcbdd", "acbbe204", "2d98bf32", "c17c11f0", "4dce9ab9", "260903cf", "6f04d152", "7df0e2b6",
      "da462af9", "b2decd3b", "04491602", "237eedaa", "8d0c7ded", "32d54564", "c500cd3a", "2c11ba06",
      "648af76b", "fc000701", "092d1012", "c55d4abd", "b2180b30", "c11486b7", "47899d89", "bc1ee3b0",
      "4202f7e8", "967ac98c", "fa0c97f4", "a6cf00f5", "0180ace3", "9210c96f", "32e46a58", "617b033a",
      "1e90af59", "08c3a82f", "2ed2d5f0", "018cf257", "64ffb43c", "2dfda6e2", "0bf32d6a", "d469ebde",
      "4c7e100f", "328384a6", "911606c9", "6bdc4249", "c70e823d",
      "9a9b2c00", "f699e445", "760abfdf", "cc84cbf7", "0983e0c6", "5359b6f9", "7c3fa83f", "323cb30d",
      "219016af", "10d933ef", "08c167d1", "ebee68b1",
    ],
    [T.balance]: [
      "bbc717ec", "8840499d", "bbc610e7", "9afa2f87", "6b6b0175", "aea4520d", "4dc6ed24", "6cae5df4",
      "ec402264", "943848bd", "a359c0a8", "444eea2e", "8ced6c88", "79fa4870", "6acdb8bf", "aa94434e",
      "f83b83f3", "ec84240a", "9d41445c", "20515345", "95ef38a3", "d3fc404c", "1a608350", "51118409",
      "8ffaa69e", "9fe87f99", "f4e9ffa1", "e8ae86ed",
      "23e25bcb", "3fb42dd8", "bf159fb6", "954bbd2b", "72395d8a", "41baee61", "18de2453", "26d07d7d",
    ],
    [T.twoSigns]: [
      "9ad395a8", "36b33ebf", "5686580e", "a569c9f9", "da4a500d", "1d3c6633", "4b6ee10f", "92b18ddb",
      "f5bda32d", "5d5f200e", "30ac2a9f", "483b891c", "e6e492c5", "b23eb2fa", "69b96b4a", "bd352a9f",
      "0e4462e8", "4beae975", "db628ec2", "999de960", "43b0bac8", "5ddec4fd", "22675efe", "70340c5b",
      "17c2e972", "cdb457b8", "5bef9a17", "27bfaf95", "d0da2411", "c5020eb0", "f84e1a9f", "e6612767",
      "5cd497f3", "bc92de91", "b69a4edf", "d5d7047d", "351551fa", "8f398948", "ec7d83c2", "8caeded3",
      "9f744be5", "c7854eec",
    ],
    [T.numbers]: [
      "dea8ae92", "624db271", "099dd89c", "6c787175", "5f96acf9", "67ea786c", "de779647", "becd18fb",
      "5863d7a2", "35f642fc",
      "e80c4222", "8b7a66da", "7707f718", "a5f43ef9", "69aa31cc", "d4822f3a", "0897ab3c", "c86f9965",
      "af7d99cf", "fe4dd4a5", "2895d288", "756c543e", "1819447c", "57add7c1",
      "4c9643ab", "65381030", "c034151b",
    ],
    [T.hidden]: [
      "bbe65896", "c559c7ef", "699b5b95", "971d570c", "151b12d4",
      "d5221d08", "01f08580", "265e37cf", "6f7ea8fe", "27298893", "ee0b50be", "addf747a", "f129caa9",
      "8a0a93af", "c1964a25", "bec0d35b", "83fced47", "cccbb5ae", "b45636df", "a77ab759", "6c0458ea",
      "2c0f319f", "93def35e", "326f1b61", "33168b5c", "9880d222", "30ddec06", "cb248d73", "3c26e980",
      "c4004ab7", "69e50e05", "43fb25f5", "153b05b7", "9e082364", "44a239e7", "617039e9", "538024a8",
      "a8dfb5fd", "63bf00e6", "30bc59e8", "b2fa63f7", "be5e0328", "6f8e4411", "10a76b60", "014f9c93",
      "1f54a762",
      "c9cdb3df", "b0949a75", "f22180af",
      "3d0b7f47", "b9c6067a", "7e4ef7c5", "8fa9d500", "a1c32117", "80cf226f", "2f0e1b49",
    ],
  },
  expected: {
    [T.subst]: 64,
    [T.pairs]: 57,
    [T.balance]: 36,
    [T.twoSigns]: 42,
    [T.numbers]: 27,
    [T.hidden]: 56,
  },
  total: 282,
};

export default plan;
