/**
 * Reshape plan: SSC CGL Tier I General Awareness Biology "Biodiversity and Classification" (38 q),
 * for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 38 rows (2026-11-01, main session). Two pages, plants and animals, as the bank already had them.
 * Never featured: 17a31e79 (its solution opens with a Note).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  plants: "Plant Kingdom Classification",
  animals: "Animal Kingdom Classification",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Biodiversity and Classification",
  order: [T.plants, T.animals],
  byPrefix: {
    [T.plants]: [
      "0db2361d", "17a31e79", "3e4d49e2", "65c0a4d9", "749ed4b2", "df4553f8", "6ca8c47b", "a6a18049",
      "b7bbac63", "c8e5931b", "5e4ee30e", "cd43022c",
    ],
    [T.animals]: [
      "11ffdd92", "31e6cf54", "42503902", "6f8fbc71", "97ac8b40", "9c7f5fd2", "b5c1ede0", "e7295ca8",
      "044649ef", "e6faa4c0", "34a351fb", "781c9e6f", "a07729ae", "fe77dc33", "2a5062dd", "688329bf",
      "8320689c", "8f8f1352", "3dee452c", "e7507e16", "1a3d86e4", "2d7931a5", "a8164f56", "c9c8ce36",
      "d4970ad0", "f2144348",
    ],
  },
  expected: {
    [T.plants]: 12,
    [T.animals]: 26,
  },
  total: 38,
};

export default plan;
