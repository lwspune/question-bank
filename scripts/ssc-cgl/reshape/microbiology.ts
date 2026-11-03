/**
 * Reshape plan: SSC CGL Tier I General Awareness Biology "Microbiology and Disease" (11 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 11 rows (2026-11-01, main session). One page: the organisms that cause disease, and the diseases with
 * their organs, vaccines and remedies. No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  diseases: "Pathogens and Diseases",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Microbiology and Disease",
  order: [T.diseases],
  byPrefix: {
    [T.diseases]: [
      "3167dbdf", "6c515689", "6eed54cc", "4e4d0490", "63b73ef5", "4618b569", "94603690", "9f2231b0",
      "abedb933", "d3509d5c", "091df3ce",
    ],
  },
  expected: {
    [T.diseases]: 11,
  },
  total: 11,
};

export default plan;
