/**
 * Reshape plan: SPI "Genetics and Evolution" (7 q), for scripts/spi/reshape.ts.
 *
 * Read all 7 stems and solutions (2026-10-22). The ingest filed them under 6 one-off subtopics.
 * Cut here into heredity (Mendel's crosses, then the names of genetics and cloning), then evolution
 * (the theories and their authors, then the evidence: fossils and homologous organs). Never featured:
 * 4234bb00 (2022, therapeutic cloning: "nucleus of somatic cell" can be defended beside the key
 * "stem cells").
 */
import type { ReshapePlan } from "../reshape";

const T = {
  heredity: "Heredity and Mendel's Crosses",
  evolution: "Evolution and Its Evidence",
} as const;

const plan: ReshapePlan = {
  chapter: "Genetics and Evolution",
  order: [T.heredity, T.evolution],
  byPrefix: {
    [T.heredity]: ["2793f8e6", "55cbb688", "4234bb00"],
    [T.evolution]: ["9785834a", "2d422223", "512a2c3d", "c567733b"],
  },
  expected: {
    [T.heredity]: 3,
    [T.evolution]: 4,
  },
  total: 7,
};

export default plan;
