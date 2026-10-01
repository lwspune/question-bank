/**
 * Reshape plan — CDS GK Chemistry "Atomic Structure and Periodic Classification" (26 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 26 stems AND solutions (2026-10-01). Three teaching pages: the atomic models;
 * the particles, isotopes and isobars (two classification subtopics that answer the same
 * kind of question, counting protons, neutrons and electrons); and electron configuration
 * with the periodic table. The one-row "Scientists and Discoveries" (Moseley: atomic number
 * is more fundamental than atomic mass) is the basis of the modern table, so it joins that page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  models: "Atomic Models",
  particles: "Atomic Number, Isotopes and Isobars",
  periodic: "Electron Configuration and the Periodic Table",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Atomic Structure and Periodic Classification",
  order: [T.models, T.particles, T.periodic],
  whole: {
    "Atomic Models: Dalton, Rutherford, Bohr": T.models,
    "Atomic Number, Mass Number and Subatomic Particles": T.particles,
    "Isotopes and Isoelectronic Species": T.particles,
    "Electron Configuration and Valence Shells": T.periodic,
    "Periodic Trends, Valency and Atomicity": T.periodic,
    "Scientists and Discoveries": T.periodic,
  },
  byPrefix: {},
  expected: { [T.models]: 6, [T.particles]: 8, [T.periodic]: 12 },
  total: 26,
};

export default plan;
