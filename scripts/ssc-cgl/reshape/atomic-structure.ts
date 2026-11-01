/**
 * Reshape plan: SSC CGL Tier I General Awareness Chemistry "Atomic Structure and Periodic Classification"
 * (30 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 30 rows (2026-11-02, main session). Two pages: the periodic table (its history, groups and trends), and
 * atoms and elements (named elements, atomic models, isotopes). Never featured: 997b8ff1 (its solution opens with a Note).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  periodic: "The Periodic Table",
  atoms: "Atoms and Elements",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Atomic Structure and Periodic Classification",
  order: [T.periodic, T.atoms],
  byPrefix: {
    [T.periodic]: [
      "3a925d06", "9dad762c", "f2792712", "010d500b", "aeb27c43", "b7218201", "f3493a4e", "08fdd069",
      "0b55d4ee", "2044fa5b", "2a51df84", "3c83d146", "46430bcf", "4d510c2c", "997b8ff1", "b923cfa1",
      "bdf8b3a6", "bfde7137", "f91e9f51", "5cac9068", "4b0b7dcf",
    ],
    [T.atoms]: [
      "4644be1d", "d15f42fc", "da5b1108", "e8dab459", "3007d80b", "50e3278f", "b148cfb5", "72946ef4",
      "eebe9f14",
    ],
  },
  expected: {
    [T.periodic]: 21,
    [T.atoms]: 9,
  },
  total: 30,
};

export default plan;
