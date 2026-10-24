/**
 * Reshape plan — CDS GK History "World History" (15 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 15 stems AND solutions (2026-10-22). Two teaching pages in time order: the
 * classical world, the voyages and the age of revolutions (Greek, Roman and Arab learning,
 * the Portuguese in Africa, Rousseau, the French Revolution, the Kansas-Nebraska Act); then
 * the Industrial Revolution and the twentieth century (the Guomindang, Hiroshima, Hong Kong,
 * a Commonwealth war cemetery). Five catalogue subtopics of 1-4 rows each are too thin to be
 * pages on their own.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  revolutions: "Classical World to the Age of Revolutions",
  modern: "Industrial Revolution and the Modern World",
} as const;

const plan: ReshapePlan = {
  subject: "History",
  chapter: "World History",
  order: [T.revolutions, T.modern],
  whole: {
    "Ancient and Classical World": T.revolutions,
    "Renaissance, Exploration and Scientific Revolution": T.revolutions,
    "Enlightenment and Political Revolutions": T.revolutions,
    "Industrial Revolution": T.modern,
    "20th Century — World Wars, Modernity and Global Institutions": T.modern,
  },
  byPrefix: {},
  expected: { [T.revolutions]: 7, [T.modern]: 8 },
  total: 15,
};

export default plan;
