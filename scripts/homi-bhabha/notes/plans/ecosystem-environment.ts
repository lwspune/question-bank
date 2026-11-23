/**
 * Reshape plan: Homi Bhabha Std IX "Ecosystem and Environment" (31 q), for scripts/homi-bhabha/reshape.ts.
 *
 * Read all 31 stems and solutions. Cut by what a question asks: who eats whom (consumers,
 * scavengers, decomposers, a freshwater food chain), energy along a chain (the 10% law, pyramids,
 * one-way energy against cyclic nutrients), the nitrogen, carbon and oxygen cycles, and managing the
 * environment (kinds of waste, waste to energy, sanctuaries and national parks). Never featured
 * (notice): 3d2e0233 (no option names Q and R), ebf257df (America or Japan), fe0d6fa2 (every level
 * loses heat). Also not featured: c958e37b (rests on the same America claim as ebf257df).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  chains: "Food Chains and Consumers",
  energy: "Energy Flow and Ecological Pyramids",
  cycles: "Nitrogen, Carbon and Oxygen Cycles",
  environment: "Waste Management and Conservation",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Ecosystem and Environment",
  order: [T.chains, T.energy, T.cycles, T.environment],
  byPrefix: {
    [T.chains]: ["112c0cc0", "fb3b83e4", "4f305979", "d7097970", "9da36514"],
    [T.energy]: ["98e69cc5", "664bf1d8", "339579df", "fe0d6fa2", "b9ad268a", "d108bff3"],
    [T.cycles]: ["3959600e", "3d2e0233", "0d82376d", "b8253471", "eb0ba4ee", "23f9bada", "69c494f1", "efecc51b", "2effe6a3"],
    [T.environment]: [
      "7ed21ef5", "de14a6ad", "de5a86d1", "6717664e",
      "15648fc4", "ebf257df", "c958e37b",
      "b0d9a69e", "3cb6fd82", "7621bd67", "6fdaa4c8",
    ],
  },
  expected: { [T.chains]: 5, [T.energy]: 6, [T.cycles]: 9, [T.environment]: 11 },
  total: 31,
};

export default plan;
