/**
 * Reshape plan: SPI "Coordinate Geometry" (30 q), for scripts/spi/reshape.ts.
 *
 * Read all 30 stems and solutions (2026-10-22); every key re-derived and agreed. The ingest filed
 * them under 22 one-off subtopics. Cut here by the formula used: the plane and the distance formula
 * first (axes, abscissa and ordinate, lines parallel to the axes, distance, an unknown coordinate),
 * then the section formula with its midpoint and centroid cases, and last the area of a triangle,
 * slope, collinearity and the equation of a line. The one 2022 past-paper row (c31d2b8f, a centroid)
 * is on page 2. Never featured: 2599d13c (the given point lies on the given line, so the "parallel"
 * line asked for is the line itself) and eb14fec4 (P is printed "(l, 2)" and option A reads "b = A").
 */
import type { ReshapePlan } from "../reshape";

const T = {
  distance: "Coordinates and the Distance Formula",
  section: "Section Formula, Midpoint and Centroid",
  lines: "Area, Slope and Straight Lines",
} as const;

const plan: ReshapePlan = {
  chapter: "Coordinate Geometry",
  order: [T.distance, T.section, T.lines],
  byPrefix: {
    [T.distance]: [
      "11561998", "cd5fca6b", "ad6854cc", "832104a4", "8e4c18a9", "2a97e14f", "c3bba9c8", "5dad8b80",
      "6780a326", "709e7960", "fd379421",
    ],
    [T.section]: [
      "13f7f28c", "546908da", "536d93c2", "94b717a9", "f6a2a749", "cfe76afd", "eb14fec4", "3a95fa67",
      "c31d2b8f", "2c1bd4db", "43803f64", "12c0103a",
    ],
    [T.lines]: ["a988777a", "91d542fb", "0b8958a2", "a8802620", "a8760250", "f8075066", "2599d13c"],
  },
  expected: {
    [T.distance]: 11,
    [T.section]: 12,
    [T.lines]: 7,
  },
  total: 30,
};

export default plan;
