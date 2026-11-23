/**
 * Reshape plan: Homi Bhabha Std IX "Classification of Plants" (17 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 17 stems and solutions. The ingest filed them under five subtopics; cut here by what a
 * question asks: the ranks and the flow chart that sort the plant kingdom with the thallophytes
 * and lichens, the spore plants (bryophytes, the "amphibians", and pteridophytes), and the seed
 * plants (gymnosperms, and the dicot and monocot angiosperms). Never featured: 5ef1c0f6 and
 * e85095d1 (each carries a notice: two options fit), 52083511 (Marchantia and Funaria also form
 * spores and zygotes, so the stem fits more than one option).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  basis: "Basis of Classification",
  spores: "Bryophytes and Pteridophytes",
  seeds: "Gymnosperms and Angiosperms",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Classification of Plants",
  order: [T.basis, T.spores, T.seeds],
  byPrefix: {
    [T.basis]: ["932ec851", "c3463f41", "5991ac1e"],
    [T.spores]: [
      "1fec82e0", "064d9a95", "1948b311", "dcc108b0", "9e066613",
      "8f546e61", "c1e1cf97", "7026f61a", "5ef1c0f6", "52083511",
    ],
    [T.seeds]: ["874e891a", "4696457e", "e85095d1", "c0573dcb"],
  },
  expected: { [T.basis]: 3, [T.spores]: 10, [T.seeds]: 4 },
  total: 17,
};

export default plan;
