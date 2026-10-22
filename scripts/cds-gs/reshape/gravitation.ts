/**
 * Reshape plan: CDS GK Physics "Gravitation" (12 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 12 stems AND solutions (2026-10-23). Two teaching pages: Newton's law of
 * gravitation with weight and g (8 rows from both filled subtopics), then the four astronomy
 * rows moved in from the retired "Astronomy and Space" chapter (nearest star, constellation,
 * the GMRT, Lagrange point L4), which are recall about the sky and need their own page.
 * The empty catalogue entry "Orbits, Kepler and Escape" drops.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  law: "Gravitation and Weight",
  space: "Stars and Space",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Gravitation",
  order: [T.law, T.space],
  whole: {
    "Newton's Law of Gravitation": T.law,
    "Gravitational Field and Potential": T.law,
  },
  byPrefix: {
    // Constellation, nearest star, Lagrange point L4, the GMRT.
    [T.space]: ["e5197918", "510b177d", "d5499e7e", "54792195"],
  },
  expected: { [T.law]: 8, [T.space]: 4 },
  total: 12,
};

export default plan;
