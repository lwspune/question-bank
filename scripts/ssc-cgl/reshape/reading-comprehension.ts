/**
 * Reshape plan: SSC CGL Tier I English "Reading Comprehension" (148 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 148 rows (2026-10-23, main session); 146 are from the 2025 shifts. The ingest's nine question-type
 * subtopics are grouped into three teaching pages: finding a stated fact or reason, the meaning of a word or
 * phrase in context, and the main idea, inferences and option traps.
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "English",
  chapter: "Reading Comprehension",
  order: ["Finding Facts in the Passage", "Words and Phrases in Context", "Main Idea and Inference"],
  byPrefix: {
    "Finding Facts in the Passage": [
      "e8fcb65a", "7d3b7cb8", "20c706fb", "efe9a0fe", "d38764c4", "7f7946f4", "f63d7a94", "aa331a4e",
      "471db1a0", "ef1bec6b", "499c737e", "8c677645", "577ccdbf", "d71368cb", "20a91c79", "c0981daa",
      "aa4de42b", "cfd18ea9", "99838284", "e98255c1", "07418dba", "33f5d158", "f785fc74", "b88b56e5",
      "b3fb4bf1", "f1a1f89a", "1b0b3f5e", "e185d1cc", "74d1f282", "6a2b51ad", "5fa24a6a", "ec7644d8",
      "ef22e220", "6675364c", "924008b9", "2b2fd101", "68bb3065", "cdfcc97a", "9bdf1de0", "6ca3eb97",
      "da7570e1", "abecd8e7", "d6bf0c3f", "86676bd0", "f0b19bb6", "a31cf5f0", "8dc14d41", "d91f75a7",
      "da6a7e43", "bc58ff81", "6e03eeda", "6cd71d2b", "48d712f9", "a385fff3", "1b62ecda", "8f8b6446",
      "f6b0b431", "2678bb92", "783b1bcb", "c224fb97", "0d0860c8", "8af9dabd", "568b3d0d", "982580c7",
    ],
    "Words and Phrases in Context": [
      "142f91c5", "1502ee59", "e2be2ebb", "440332ca", "cacfef13", "025c5113", "77220d75", "5435872e",
      "3ecb22e5", "210086e6", "087d3441", "54ccfb7a", "8fe74a3c", "6f3cc803", "43be5b97", "00011262",
      "12f8603d", "91ebddd8", "821fc159", "e55d8584", "3fa133a5", "d05a135f", "eabcafb7", "4a056ffc",
      "9f0fac55", "537a369d", "6061c540", "550e03a7", "0586d734", "135e1d9f", "aa28bef7", "d24b1957",
      "53976d6b", "46040370",
    ],
    "Main Idea and Inference": [
      "9b621f2f", "691964e3", "a518aaf8", "2352be4e", "c6350fad", "ac2b05eb", "251197e9", "0e3e4b7c",
      "1672cafa", "eec45d6c", "357235c7", "e92a3bd7", "1c226681", "65983179", "2e8db8af", "8a8108e2",
      "0aab21ea", "d7f2cdee", "9483fa7e", "81227ef5", "c99dcb3c", "9a74d072", "9dcfde59", "5c355990",
      "dfd9df5e", "9b56f35b", "4d567260", "ebda9869", "727c82db", "dd383565", "fb2010ed", "fb48cdbf",
      "e623fac4", "e3a3fc81", "315b81fe", "27ec1b93", "25a564b6", "5a0a04f0", "4a4f990b", "3f894031",
      "ffd37fd6", "304a2ee8", "0ff01d78", "86ba7fbe", "09fc9a7a", "990bbbd1", "cb334b8a", "49ab7bd0",
      "74077e93", "3085df6c",
    ],
  },
  expected: {"Finding Facts in the Passage": 64, "Words and Phrases in Context": 34, "Main Idea and Inference": 50},
  total: 148,
};

export default plan;
