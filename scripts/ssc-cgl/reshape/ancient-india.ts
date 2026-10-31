/**
 * Reshape plan: SSC CGL Tier I General Awareness History "Ancient India" (132 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 132 rows (2026-10-31, main session). The ingest filed them under thirteen subtopics, seven of them
 * with four rows or fewer. Cut here in time order: prehistory, Harappa and the Vedic age; the mahajanapadas,
 * the new religions and the Mauryas; the Shungas, Shakas, Kushanas, Satavahanas and the Sangam kingdoms; the
 * Guptas with their officers and revenue terms (eleven questions from the 2025 shifts alone) and the kingdoms
 * after them; literature and inscriptions; sculpture; temple architecture. Never featured: 71a40df2 and
 * 98aae352 (SSC printed them in Hindi only), 1386fd3b (the key's Krishna for Pushyamitra rests on no inscription
 * of his), bef94714 (Romania as an early iron user is SSC's key, not a textbook fact), fb4074de (specialist).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  early: "Prehistory, Harappa and the Vedic Age",
  maurya: "Mahajanapadas, Magadha and Mauryan Empire",
  postmaurya: "Post-Mauryan Kingdoms and the Sangam Age",
  gupta: "The Guptas and Their Successors",
  literature: "Ancient Indian Literature and Inscriptions",
  art: "Art, Painting and Sculpture",
  temples: "Temple and Rock-Cut Architecture",
} as const;

const plan: ReshapePlan = {
  subject: "History",
  chapter: "Ancient India",
  order: [T.early, T.maurya, T.postmaurya, T.gupta, T.literature, T.art, T.temples],
  byPrefix: {
    [T.early]: [
      "099ec558", "9e2519ce", "bef94714", "0979f38e", "39c7ad27", "604314aa", "e6bcd4fc", "5b47a448",
      "b61439cd", "1f3fcc9c", "22bc8c05", "2aeed597", "35c2560b", "f3e6d79d", "ff1b7a7d", "71a40df2",
      "8949e7d0", "ab948cdb", "c39e830a", "14aa0cf9", "3199adbd", "7bcc5487", "8b0c0012", "b5376305",
    ],
    [T.maurya]: [
      "236a0d30", "31b83fef", "7f0b0745", "b603a4aa", "a4fad8d0", "b9f6d1a5", "7b67e3dc", "1898177b",
      "8eaf8939", "078e186b", "07cd617f", "32d5cf48", "77148a61", "10e6c614", "275988dd", "3ff8f912",
      "50ae1e9b", "72b871bb", "8fdfc2df", "9a5e4ded", "dd12e352", "54f33111", "68361e87", "98aae352",
      "cffc9076", "f449408b", "50f730f8", "78b6fe9b", "807b5c16", "e5a6d089", "2a32e579", "4869b925",
      "aaec12fb",
    ],
    [T.postmaurya]: [
      "4e11615c", "1386fd3b", "7f7c7421", "f24632bb", "03246260", "6cc8f382", "f6b9460c", "3f67c817",
      "550521c7", "0fd4c5f6", "16518251",
    ],
    [T.gupta]: [
      "161bb47b", "3259dd46", "622baf29", "e4695290", "d401c7a4", "e55f9534", "160fea6a", "20efb6f4",
      "32a29a37", "9401abe5", "c16ab9ae", "e84d0330", "023a7b17", "320eacf1", "8c8f0715", "cc16f13e",
      "dadb8294", "37c0bc9d", "09c1b6bf", "0ad4ca73", "552fb950", "82c11780", "aee2b5c1", "ce128fb5",
      "f3d7ac01", "ce1127d0", "f08f9497", "6b9af8a6",
    ],
    [T.literature]: [
      "396c4f5f", "5d8871b8", "41ba67a6", "60f1f73f", "c5af9900", "74d99178", "66296460", "91d65f4e",
      "c5cdb5a8", "a356acbc", "ca3271a1",
    ],
    [T.art]: [
      "d415cec5", "37042020", "bfbefb83", "7adb1832", "64cd9df0", "01e97cda", "653d052e", "67b0d1ab",
      "a8568c62", "bb7490b7", "fb4074de",
    ],
    [T.temples]: [
      "467ee141", "f67b40b3", "5e9ea17b", "caddcb95", "9c0faa27", "09627920", "0e5ff4d8", "3afc004e",
      "5d533be1", "7530578f", "a547f5ff", "ac186f7f", "b4b49536", "c18430da",
    ],
  },
  expected: {
    [T.early]: 24,
    [T.maurya]: 33,
    [T.postmaurya]: 11,
    [T.gupta]: 28,
    [T.literature]: 11,
    [T.art]: 11,
    [T.temples]: 14,
  },
  total: 132,
};

export default plan;
