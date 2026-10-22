/**
 * Reshape plan: CDS GK Physics "Fluid Mechanics and Properties of Matter" (9 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 9 stems AND solutions (2026-10-23). Nine rows make one teaching page: pressure,
 * then buoyancy and flotation, then density of a mixture, then elasticity (Hooke's law and the
 * spring constant). The two elasticity rows (9f816987, 17f9582c) were filed under "Pressure and
 * Surface Tension"; they move with that subtopic onto the same page, where they get their own
 * concept. The empty catalogue entry "Elasticity, Hooke's Law and Young's Modulus" drops.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  matter: "Pressure, Buoyancy and Elasticity",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Fluid Mechanics and Properties of Matter",
  order: [T.matter],
  whole: {
    "Pressure and Surface Tension": T.matter,
    "Buoyancy, Density and Flotation": T.matter,
  },
  byPrefix: {},
  expected: { [T.matter]: 9 },
  total: 9,
};

export default plan;
