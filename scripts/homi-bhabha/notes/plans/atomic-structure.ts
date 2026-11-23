/**
 * Reshape plan: Homi Bhabha Std IX "Atomic Structure" (33 q, all eight papers), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 33 stems and solutions. The ingest filed them under seven subtopics; cut here by what a
 * question asks: the models of the atom and its particles, atomic and mass numbers with isotopes,
 * electron shells and the electrons of ions, valency with radicals and formulae, and ionic and
 * covalent bonds. Never featured (each carries a notice): af241c2a (an electron is not a hadron),
 * 60a5d572 (more than one group can be the odd one out).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  models: "Atomic Models and Subatomic Particles",
  numbers: "Atomic Number, Mass Number and Isotopes",
  shells: "Electron Shells and Ions",
  valency: "Valency, Radicals and Formulae",
  bonds: "Ionic and Covalent Bonds",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Atomic Structure",
  order: [T.models, T.numbers, T.shells, T.valency, T.bonds],
  byPrefix: {
    [T.models]: ["42b6046e", "a11416ce", "cc273fff", "af241c2a", "38370c3a", "65a6b4db", "3f8a46a6"],
    [T.numbers]: ["58347943", "91b04646", "3b706def", "cebc4c27"],
    [T.shells]: ["05abdea2", "b5d57b1c", "8104861d", "7e3f4829", "f66231c2", "40a6f569"],
    [T.valency]: ["f98aa866", "83c5dfa5", "614a6143", "f7661262", "d824810c", "60a5d572", "fc88e4ad", "93700fe4", "17f6f09f", "c7d84d8a"],
    [T.bonds]: ["cc3e9d00", "67ffad0c", "65d1235e", "a9162dc2", "4d1b9d30", "b19824f2"],
  },
  expected: { [T.models]: 7, [T.numbers]: 4, [T.shells]: 6, [T.valency]: 10, [T.bonds]: 6 },
  total: 33,
};

export default plan;
