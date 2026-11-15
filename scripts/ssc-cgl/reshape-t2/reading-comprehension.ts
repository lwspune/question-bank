/**
 * Reshape plan: SSC CGL TIER II English "Reading Comprehension" (97 q, 24 passages), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read every question and key against its passage's question type (2026-11-15). The keys are SSC's own,
 * blind-checked at ingest; nothing new disagreed. The ingest used nine question-type subtopics of 1-30
 * rows, so they become three pages by what the question asks: a FACT in the passage (48), the passage's
 * MAIN IDEA, tone or an inference (33), and a WORD in the passage (16).
 * Flawed (solution opens with a **Note:**, tagged but never featured): ffa1c7c2, c9cd5006.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  facts: "RC: Finding the Fact",
  ideas: "RC: Main Idea, Tone and Inference",
  words: "RC: Words in the Passage",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "English",
  chapter: "Reading Comprehension",
  order: [T.facts, T.ideas, T.words],
  byPrefix: {
    [T.facts]: [
      "3644fd79", "3d0365d2", "4cfe9d88", "70808a00", "77acbf5f", "78c35b32", "8c22b443", "9c8a9c36", "a408d878", "c23c549f",
      "d763d6a4", "dc0d7ada", "e5ed371d", "f05cdcc2", "444f9b8c", "a71cc4b3", "b5450a50", "2231acef", "26d6cd09", "3eb41e4e",
      "9981f34c", "d51f8784", "e4bc5a98", "57479d14", "5b27ea76", "6bb90552", "6c4096b3", "d6300475", "da68acdb", "f5d29482",
      "7b37095b", "a4c89ef0", "b96ff9bb", "c9cd5006", "cde02e7c", "d7ac03f8", "e63fcc65", "0ef99826", "db9ba851",
      "41b92d7f", "4b69f0a1", "bc286be7", "ffa1c7c2", "353b03b2", "fe88e769", "033dd61d", "452d3507", "e976c867",
    ],
    [T.ideas]: [
      "1730ade1", "1a379c73", "31dcf5b4", "52007743", "5a10eda7", "5c54660b", "74987a92", "7ccf6752", "8b730747", "086ce4f3",
      "39c042f0", "8e53718a", "7a23a03b", "7abd6081", "c3d2811f",
      "1f5413f4", "a8489612", "8afd2d37", "91ef9c44", "7e612053", "e89231de", "4b3a72e0", "4fbfead1", "c2c819da", "f79bac2a",
      "03d8e42d", "cba23ee0", "ea6ac4c8", "30b262bf", "120f6e1d", "3516f31a", "6b4a05a5", "a88f0827",
    ],
    [T.words]: [
      "1a6461c2", "44305cc2", "6973afde", "c1e1f756", "db245b84", "df8c949b", "eaef21e6", "4b39533d", "646f4888", "bd3c5e62",
      "e206ce8b", "d03feb1c",
      "4534eb3c", "9bdc51f0", "d4e035ed", "fa550e56",
    ],
  },
  expected: { [T.facts]: 48, [T.ideas]: 33, [T.words]: 16 },
  total: 97,
};

export default plan;
