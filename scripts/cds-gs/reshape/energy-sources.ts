/**
 * Reshape plan: CDS GK Physics "Energy Sources" (5 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 5 stems AND solutions (2026-10-23). Five rows make one teaching page: conventional
 * and non-conventional sources with the thermal power station, biogas (asked twice), and solar
 * heating through the greenhouse effect. The page is renamed so it reads as a topic.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  sources: "Sources of Energy",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Energy Sources",
  order: [T.sources],
  whole: {
    "Energy Sources": T.sources,
  },
  byPrefix: {},
  expected: { [T.sources]: 5 },
  total: 5,
};

export default plan;
