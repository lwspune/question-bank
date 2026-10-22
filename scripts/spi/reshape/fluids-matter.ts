/**
 * Reshape plan: SPI "Fluid Mechanics and Properties of Matter" (7 q), for scripts/spi/reshape.ts.
 *
 * Read all 7 stems and solutions and the figure (2026-10-22). The ingest filed them under 7 one-off
 * subtopics. Cut here by technique: pressure (thrust over area, and the pressure of a liquid column),
 * then density, buoyancy and flotation (relative density, loss of weight in a liquid, the load a
 * floating raft can carry). Never featured: 616d5fb9 (the key's "some pressure" is a misprint for
 * "same pressure") and 3066e7b0 ("increases as it comes out" is also true; the key is the fuller
 * statement).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  pressure: "Thrust and Liquid Pressure",
  buoyancy: "Density, Buoyancy and Flotation",
} as const;

const plan: ReshapePlan = {
  chapter: "Fluid Mechanics and Properties of Matter",
  order: [T.pressure, T.buoyancy],
  byPrefix: {
    [T.pressure]: ["616d5fb9", "6a7439b6", "d736b6f6"],
    [T.buoyancy]: ["9c8880ef", "2462c8a7", "3066e7b0", "de9c8a65"],
  },
  expected: {
    [T.pressure]: 3,
    [T.buoyancy]: 4,
  },
  total: 7,
};

export default plan;
