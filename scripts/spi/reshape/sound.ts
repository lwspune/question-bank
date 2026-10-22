/**
 * Reshape plan: SPI "Sound" (9 q), for scripts/spi/reshape.ts.
 *
 * Read all 9 stems and solutions (2026-10-22). The ingest filed them under 8 one-off subtopics.
 * Cut into two pages: what sound is and how fast it travels in each medium (four of the five rows
 * are about its speed), then how we speak and hear and what reflected sound and ultrasound are used
 * for. Never featured: ae95a42f (options B and C are both true as printed; the solution's Note says so).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  waves: "Sound Waves and Their Speed",
  hearing: "Hearing, Speech and Uses of Sound",
} as const;

const plan: ReshapePlan = {
  chapter: "Sound",
  order: [T.waves, T.hearing],
  byPrefix: {
    [T.waves]: ["22c5af21", "8a23f784", "4b327ca5", "7a96e56a", "ae95a42f"],
    [T.hearing]: ["78da0acc", "fad4384b", "304f0fcf", "60ec54b6"],
  },
  expected: {
    [T.waves]: 5,
    [T.hearing]: 4,
  },
  total: 9,
};

export default plan;
