/**
 * Reshape plan: Homi Bhabha Std IX "Measurement of Matter" (16 q, 2010, 2017, 2018, all three
 * 2021 online papers, 2023 and 2024), for scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 16 stems and solutions. The ingest filed them under four subtopics; cut here by what a
 * question asks: working out atomic and molecular masses, the laws of chemical combination with the
 * proportion by weight of the elements in a compound, and the mole (number of particles, mass and
 * molarity). Never featured: ec263948 (carries a notice: the ratio 9 : 1 : 35 should read
 * 9 : 1 : 3.5).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  mass: "Atomic and Molecular Mass",
  laws: "Laws of Chemical Combination",
  mole: "Mole Concept",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Measurement of Matter",
  order: [T.mass, T.laws, T.mole],
  byPrefix: {
    [T.mass]: ["8853a139", "fcb56a18", "10b663fb", "2065d434", "575d3d71"],
    [T.laws]: ["af39f112", "3d8053f2", "cbca09ed", "ec263948"],
    [T.mole]: ["8729d205", "5f117227", "d270bb41", "9384e40f", "d6b9bdac", "4e10b403", "e2b2ba7f"],
  },
  expected: { [T.mass]: 5, [T.laws]: 4, [T.mole]: 7 },
  total: 16,
};

export default plan;
