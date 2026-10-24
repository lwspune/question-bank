/**
 * Reshape plan: SSC CGL Tier I Reasoning "Syllogism" (113 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 113 rows (2026-10-23, main session). The ingest's two subtopics (two and three statements) are
 * kept as the two teaching pages: two statements teach the rules, three statements chain them. Concepts split
 * by the kind of statement (all and some; a negative) and, on the three-statement page, conclusions that ask
 * what is possible. Never featured: the eight rows that open with a notice, and 86ec6bde (it prints the same
 * wrong option twice; its key is sound).
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Syllogism",
  order: ["Two-Statement Syllogism", "Three-Statement Syllogism"],
  byPrefix: {
    "Two-Statement Syllogism": [
      "cb481d36", "5bac8210", "7da9feab", "3312dc43", "ab814066", "73838d7e", "86ec6bde", "c445eb0a",
      "260256ed", "cd2b6453", "0abd7f0f", "85dbf03c", "8efd75d7", "1612f439", "96a44eee", "ef10c2ba",
      "072024e2", "5446b557", "df648fd2",
    ],
    "Three-Statement Syllogism": [
      "f29d2cab", "085391f0", "c8aaaa6e", "49d28eed", "256a1f18", "dad4227e", "7dd8b423", "dc520ba5",
      "78b1911e", "a98a70f4", "5ed955da", "620f222a", "4d0e96cc", "b5fc7574", "5cb0ed6b", "8d293ba9",
      "78bff5dd", "6eeacaa3", "28cf7227", "17105046", "d6675d4a", "15329609", "6be134f5", "0b6de0bf",
      "214ae430", "7e5cdad5", "929dcd4a", "d0fb40b6", "fc0f7164", "34786f77", "17b699e7", "0a45b3a3",
      "e4219f9b", "49e30ee0", "4ab727b6", "be2fa587", "644aca6d", "dbe8ef1b", "60e55791", "affe16ba",
      "4400771d", "0032a224", "df4e689b", "1e1ac640", "636018e4", "1e5145ff", "5b2ceaa0", "a2ff53e9",
      "d595669b", "059895a4", "a5d90c8f", "57462cc4", "3ffcb9b3", "d2f7fbfd", "e7ba1e28", "27d2131c",
      "1d971075", "a1e4edb7", "b883af80", "aa5c3352", "997a5ba7", "a169e30e", "a86a427f", "37e06910",
      "acacd112", "6df3f6aa", "14c4da34", "270fdab6", "95adba9e", "810b8cda", "67d092f9", "5d633729",
      "f19903a8", "4ff5a713", "f7f51d54", "4ec6e9c8", "d4fe9944", "ba34c0f9", "6a37065e", "087aa8fb",
      "a144d7dd", "ddbd74b8", "8b5997ce", "882e807f", "920ac5bf", "71711130", "8332f49c", "78317f15",
      "bb886f85", "5a7be2bc", "6661b08b", "29eb6044", "36cdabc1", "2668559f",
    ],
  },
  expected: {"Two-Statement Syllogism": 19, "Three-Statement Syllogism": 94},
  total: 113,
};

export default plan;
