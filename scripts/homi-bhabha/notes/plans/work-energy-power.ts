/**
 * Reshape plan: Homi Bhabha Std IX "Work, Energy and Power" (23 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 23 stems and solutions. The ingest filed them under six subtopics; cut here by what a
 * question asks: the sign of work and work against gravity, kinetic energy and its link to
 * momentum, potential energy turning into kinetic energy with the energy changes in devices, and
 * power. Never featured (each carries a notice): f7a2c25a (the steam-plant chain, option B also
 * defensible), aafb0961 (MSTA's key counts momentum as a factor of kinetic energy).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  work: "Work",
  kinetic: "Kinetic Energy",
  conservation: "Conservation of Energy",
  power: "Power",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Work, Energy and Power",
  order: [T.work, T.kinetic, T.conservation, T.power],
  byPrefix: {
    [T.work]: ["0632a2f9", "aa6659cf", "7b971136", "ea28b491"],
    [T.kinetic]: ["af74277f", "e1720277", "4e1f7e03", "639081cc", "31950e26", "835bea0e", "ca750084", "aafb0961"],
    [T.conservation]: ["a3d2a28f", "91f6d14f", "11756b0e", "1f832bfe", "f7a2c25a"],
    [T.power]: ["25ca4271", "0f06f173", "f27a5fba", "ac5a0205", "1f470c18", "553d9b51"],
  },
  expected: { [T.work]: 4, [T.kinetic]: 8, [T.conservation]: 5, [T.power]: 6 },
  total: 23,
};

export default plan;
