/**
 * Reshape plan: SSC CGL TIER II English "Vocabulary" (71 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 71 stems and keys (2026-11-15); every key agreed. The ingest used thirteen subtopics, ten of
 * them under 6 rows, so they become three pages: word MEANING (synonyms, antonyms, a word's sense, 25),
 * ONE-WORD SUBSTITUTION (18), and SPELLING with words that sound alike (28). Nothing is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  meaning: "Synonyms, Antonyms and Word Meaning",
  oneword: "One-Word Substitution",
  spelling: "Spelling and Words That Sound Alike",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "English",
  chapter: "Vocabulary",
  order: [T.meaning, T.oneword, T.spelling],
  byPrefix: {
    [T.meaning]: [
      "2c713238", "cec6c1c7", "38ae6043", "672aca17", "9933db3f", "820804ee", "aee962c8", "90cb9a55", "9ec159d8", "bc2e5f15",
      "e5d3dd45", "ccc978c0", "892ca62e", "ad7715b0", "25712e69",
      "cbd4b150", "2628b070", "e1797d82", "fbb98282", "c792a099", "5d661f75", "80eb23ff", "9ed603c4", "4d167fd7", "7a00a00f",
    ],
    [T.oneword]: [
      "32c208ee", "3dafe0b1", "60664f4d", "a5dc91ca", "a97dda9a", "3763ae2c", "a76c47bf", "c7e8f4b0",
      "3b1ddf66", "7eae3d05", "ac72c03d", "37d01b08", "4ea4350c", "0e7716fb", "4e04bad6", "906eb486", "db10d5c4", "fcbd8332",
    ],
    [T.spelling]: [
      "275d58d4", "5bf0aa20", "89a54923", "ac39fc90", "b4bd7819", "e37f9bcf", "f09cd64c", "f40409d4", "14bfa323", "442a90d2",
      "28f6fab4", "2afa45a7", "dc8eee0d", "eb29990a", "467baca5", "e55b9452",
      "1a780a89", "4136d38e", "57b53db9", "b318f6a9", "ecb872ee", "fcad3346", "fdff616f", "709b322f", "1c288edc", "7efad9dd",
      "aafe2a36", "e59246a4",
    ],
  },
  expected: { [T.meaning]: 25, [T.oneword]: 18, [T.spelling]: 28 },
  total: 71,
};

export default plan;
