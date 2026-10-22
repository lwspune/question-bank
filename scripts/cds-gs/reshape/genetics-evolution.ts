/**
 * Reshape plan: CDS GK Biology "Genetics and Evolution" (13 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 13 stems AND solutions (2026-10-23). Two teaching pages. The first is heredity at the
 * level of the cell: chromosomes, DNA and histones, mutation, Mendel's ratios, how sex is decided,
 * and genetic engineering. The second is evolution: why acquired traits are not inherited
 * (Lamarck against Darwin, and Hardy-Weinberg), variation and natural selection, and analogous
 * against homologous organs. The chess-champion row (acquired traits) is filed under heredity but
 * is the textbook's lead-in to Lamarck, so it moves to the evolution page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  heredity: "Heredity and DNA",
  evolution: "Evolution",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Genetics and Evolution",
  order: [T.heredity, T.evolution],
  whole: {
    "Theory of Evolution": T.evolution,
  },
  byPrefix: {
    [T.evolution]: ["4c33c414"],
  },
  expected: { [T.heredity]: 9, [T.evolution]: 4 },
  total: 13,
};

export default plan;
