/**
 * Reshape plan: SSC CGL Tier I English "Sentence Rearrangement" (212 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 212 rows (2026-10-23, main session). The ingest's fourteen subtopics are grouped into three
 * teaching pages: ordering whole sentences by the shape of the paragraph and by time, the words that link
 * one sentence to the next, and ordering the parts (P, Q, R, S) of a single sentence.
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "English",
  chapter: "Sentence Rearrangement",
  order: ["Ordering Sentences in a Paragraph", "Links Between Sentences", "Ordering the Parts of a Sentence"],
  byPrefix: {
    "Ordering Sentences in a Paragraph": [
      "6a0e76cc", "baa5d913", "3320a239", "0ec02cb7", "1385815a", "98148d5b", "d0361091", "d2c0bba4",
      "78741633", "50ec66b3", "6074e163", "05a2b70a", "ab1c4c74", "9bc50681", "317f09f5", "b0625b61",
      "5db26555", "4ad4e3bc", "addc3078", "9cc570bc", "02d36268", "e7aa37cb", "20b6d7b6", "4f115ac1",
      "38419747", "9dc1a79e", "a5a9a4f2", "a5148026", "305fb653", "d47f7cd8", "c03cf294", "a14911cb",
      "63d3e5f2", "a5fe14d1", "b0e7dfe6", "2cb95dbb", "795cccbe", "1f128697", "6fdf5126", "eb1b013e",
      "59244cff", "88ce8b1d", "fe7210f8", "5c6300e0", "b8b83f85", "2d0fb6fb", "f2e98ea3", "0ebcf93a",
      "283ed175", "2e81383c", "c6a6ed8f", "57a6c69b", "2518870b", "f84e7050", "9b07e0c7", "c8de042b",
      "4d38ebbd", "5960f152", "8022abd2", "dc9a0fb8", "932bbf41", "2718ed99", "4c487a31", "07aa709a",
      "444e465b", "2b75d80d", "1855f870", "162a1d10", "c5b7ab65", "f7f00851", "3f01954a", "22c62f62",
      "2fea282e", "ca5bc222", "8703da55", "134c8a34", "1f414231", "2d8eac94", "087a4bdc", "ff6c02a1",
      "eccc9748", "590827d7", "e7a35ab5", "b575862e", "371b068e", "2e5bc1b8", "0437b2a3", "fbffeb54",
    ],
    "Links Between Sentences": [
      "c61f0120", "2025c835", "ea2eca32", "3fa7a3c2", "6a7ca483", "77cb4a93", "a5178ebd", "40af444d",
      "fdafa82b", "f38f0b49", "38bf9102", "2f757f72", "dfbd81b8", "58fa9115", "8cca61cf", "257ebec8",
      "0887146f", "612b5027", "946adac1", "e3a5ce71", "1f641dfd", "20d15661", "e2b7c494", "52f66e42",
      "2f929c53", "5db6cbc7", "e875774b", "2b0d79ff", "f0ea25ca", "d64b7803", "5e9ef3ce", "acc8668d",
      "467c1364", "50fc5c9a", "cfc75875", "20ae6c6c", "0fb8d94a", "44b77168", "edc4cbe2", "c0b3b2b5",
      "f6ddc320", "114a1c55", "f2fa5708", "5ebe7b05", "69486ba6", "3625ca34", "0dd312ed", "3efefc2e",
      "6c07786b", "d22c8d59", "aa85b8cb", "2d14ade5", "c6752165", "0a158f57", "7ab4e5a2", "adcfa48a",
      "ceeb40c7", "4d101031", "b396edce", "0a6b982e", "ffceb422", "7fbdfe70", "bb1474bf", "9034d3b8",
      "ffa66489", "974f5b65", "10d7d55c", "50fdf0e3", "8f6055dd", "1d886857", "34777fef", "2c8c6f22",
      "c612da32", "65ce0c31", "d9196ba9", "4aa27fa9",
    ],
    "Ordering the Parts of a Sentence": [
      "300eda71", "acf19c1a", "10ff613a", "e3f98dfc", "2670504c", "d3570d23", "c5b2f0d3", "55e2c82c",
      "ff4b715c", "fb5df4af", "bfa680e0", "f96ecec6", "dcd79e74", "9d0831bc", "88c6573b", "866fe9dd",
      "8c386874", "3b6b7408", "d2789e92", "83ab5dc2", "c2af3efb", "dfad21f9", "73c07636", "822ed14b",
      "442d4e92", "8656055d", "7303630e", "47dc60aa", "33a65b1d", "0ffb5b0d", "12111ccc", "47dd1c49",
      "6802d70b", "5fae5b43", "68e962e0", "28794a0c", "c29b23ef", "0c68ab90", "5a319c9a", "e1de538b",
      "3bad80ae", "6b03bc4c", "49e89af6", "e15de48a", "ea9a6da6", "23d937fa", "7beb6111", "b7dd8229",
    ],
  },
  expected: {"Ordering Sentences in a Paragraph": 88, "Links Between Sentences": 76, "Ordering the Parts of a Sentence": 48},
  total: 212,
};

export default plan;
