/**
 * Reshape plan: Homi Bhabha Std IX "Pressure and Buoyancy" (13 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 13 stems and solutions. The ingest filed them under three subtopics; cut here by what a
 * question asks: pressure as force on an area, in a liquid and in the air (P = F/A, p = hρg, the
 * rising bubble, atmospheric pressure), then the buoyant force and floating (F = Vρg, loss of
 * weight, Plimsoll lines, the Dead Sea). Never featured (each carries a notice): 670381b3 (a line
 * of the stem is cut off), 9a98e589 (no sizes given, so the greatest buoyant force is undecided).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  pressure: "Pressure in Solids, Liquids and Air",
  buoyancy: "Buoyant Force and Floating",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Pressure and Buoyancy",
  order: [T.pressure, T.buoyancy],
  byPrefix: {
    [T.pressure]: ["09cd5c37", "44d646d6", "0616940b", "9a169f5c", "803ec419", "9cea2b3d", "48f34c90"],
    [T.buoyancy]: ["41be2dc1", "68e0942a", "9a98e589", "0396bc43", "dcb4b069", "670381b3"],
  },
  expected: { [T.pressure]: 7, [T.buoyancy]: 6 },
  total: 13,
};

export default plan;
