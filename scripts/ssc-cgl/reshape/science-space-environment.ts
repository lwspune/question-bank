/**
 * Reshape plan: SSC CGL Tier I Static GK "Science, Space and Environment Facts" (18 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 18 rows (2026-11-19, draft agent S3). The move filed them under two subtopics that
 * already hold one method each, so the cut keeps them: protected areas, air quality and climate
 * response first; then ISRO's centres, rockets, satellite types and older missions.
 * Never featured: a0d6682c (its solution calls LAM a Lyman Alpha photometer; LAM is the Liquid
 * Apogee Motor) and 5b546228 (keyed A-true R-false; sound, but the reason clause is a judgement
 * about geography that the page does not need to lean on).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  parks: "National Parks, Wildlife and Environment",
  space: "Space and Science Milestones",
} as const;

const plan: ReshapePlan = {
  subject: "Static GK",
  chapter: "Science, Space and Environment Facts",
  order: [T.parks, T.space],
  byPrefix: {
    [T.parks]: [
      "464c1af3", "9960f4de", "b536e3d0", "47953590", "74271db7", "9aa8781a", "5b546228", "6bfd28dc",
      "af566b09", "bafa86d6",
    ],
    [T.space]: ["136b0932", "1d8a5c87", "3149d1e3", "8a48e061", "a0d6682c", "aee84b52", "d9fa16e1", "f81c355d"],
  },
  expected: {
    [T.parks]: 10,
    [T.space]: 8,
  },
  total: 18,
};

export default plan;
