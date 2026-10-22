/**
 * Reshape plan: SPI "Electricity and Magnetism" (22 q), for scripts/spi/reshape.ts.
 *
 * Read all 22 stems and solutions (2026-10-22). The ingest filed them under 19 one-off subtopics.
 * Cut here by technique, in teaching order: Ohm's law and what a resistance depends on, then
 * resistors joined in series and parallel (cutting a wire needs R proportional to length from the
 * first page), then power, energy in kWh and house wiring, then the magnetic effects of a current
 * (field shapes, the motor rule and torque, the generator). Never featured: 138fc55c (as printed the
 * coil's size gives none of the four options; the key assumes an area of 0.04 square metre).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ohm: "Ohm's Law and Resistance",
  circuits: "Series and Parallel Circuits",
  power: "Electric Power and House Wiring",
  magnetic: "Magnetic Effects of Current",
} as const;

const plan: ReshapePlan = {
  chapter: "Electricity and Magnetism",
  order: [T.ohm, T.circuits, T.power, T.magnetic],
  byPrefix: {
    [T.ohm]: ["0a173f78", "f677432a", "29839256", "039753dc", "0121cf5a"],
    [T.circuits]: ["c53f270c", "7a24a25c", "1f304993", "136d32c2"],
    [T.power]: ["09813857", "bd825cee", "eb67121b", "73cb8aac", "e8461560", "0462e29e", "52e826f2", "2aa7422d"],
    [T.magnetic]: ["8f583588", "7b1362f5", "1c86c7ac", "138fc55c", "47870cce"],
  },
  expected: {
    [T.ohm]: 5,
    [T.circuits]: 4,
    [T.power]: 8,
    [T.magnetic]: 5,
  },
  total: 22,
};

export default plan;
