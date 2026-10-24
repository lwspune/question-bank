/**
 * Reshape plan: SPI "Gravitation" (5 q), for scripts/spi/reshape.ts.
 *
 * Read all 5 stems and solutions (2026-10-22). The ingest filed them under 5 one-off subtopics.
 * Too small to split well: one page, taught in order from Newton's law, to g and how it changes over
 * the Earth, to satellites and escape velocity. Never featured: 47b25fd0 (asks for escape velocity in
 * m/s and prints 11.2, the km/s value, so the key is "None of these" on a unit technicality).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  gravity: "Gravitational Force, g and Satellites",
} as const;

const plan: ReshapePlan = {
  chapter: "Gravitation",
  order: [T.gravity],
  byPrefix: {
    [T.gravity]: ["b3ee95ef", "7533b5af", "9205c6e0", "57506442", "47b25fd0"],
  },
  expected: {
    [T.gravity]: 5,
  },
  total: 5,
};

export default plan;
