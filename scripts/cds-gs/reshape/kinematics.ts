/**
 * Reshape plan: CDS GK Physics "Kinematics and Motion" (18 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 18 stems AND solutions (2026-10-23). Two teaching pages, in the NCERT order:
 * motion in a straight line first (distance and displacement, average speed, the equations of
 * motion and the graphs), then motion in a plane (vectors, free fall and horizontal launch,
 * uniform circular motion). The two circular-track rows (39818b4e, e4a6722e) ask for a
 * DISPLACEMENT, not anything circular, so they join the straight-line page's
 * distance-and-displacement concept.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  line: "Motion in a Straight Line",
  plane: "Motion in a Plane",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Kinematics and Motion",
  order: [T.line, T.plane],
  whole: {
    "Equations of Motion and Graphs": T.line,
    "Vectors and Position": T.plane,
    "Projectile and Vertical Motion": T.plane,
    "Circular Motion": T.plane,
  },
  byPrefix: {
    // Displacement after whole and half laps of a circular track.
    [T.line]: ["39818b4e", "e4a6722e"],
  },
  expected: { [T.line]: 10, [T.plane]: 8 },
  total: 18,
};

export default plan;
