/**
 * Reshape plan: CDS GK Biology "Reproduction" (5 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 5 stems AND solutions (2026-10-23). One teaching page: sexual reproduction in a
 * flowering plant (the order of events, the cells of the ovule, selfing as a test of a tall
 * plant), seeds without fertilisation (apomixis), and colostrum. The selfing row (6e7c5cf9)
 * is really a heredity question: a refile candidate for the genetics chapter.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  all: "Reproduction in Plants and Humans",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Reproduction",
  order: [T.all],
  whole: {
    "Angiosperm Reproduction — Pollination and Fertilization": T.all,
    "Animal and Human Reproduction": T.all,
    "Sexual Reproduction — Genetic Principles": T.all,
    "Meiosis and DNA in Flowering Plants": T.all,
  },
  byPrefix: {},
  expected: { [T.all]: 5 },
  total: 5,
};

export default plan;
