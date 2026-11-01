/**
 * Reshape plan: SSC CGL Tier I General Awareness Physics "Light and Optics" (11 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 11 rows (2026-11-02, main session). Five small subtopics cut into one page: mirrors and lenses, then
 * refraction, the eye and light's other behaviour. No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  light: "Mirrors, Lenses and Refraction",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Light and Optics",
  order: [T.light],
  byPrefix: {
    [T.light]: [
      "d2640dfd", "d68acc6c", "38bf7f9a", "85bae9b5", "618f9895", "f5c7e861", "e243e2ab", "4576680d",
      "23cfe3ed", "b9d6cee7", "736c0ec7",
    ],
  },
  expected: {
    [T.light]: 11,
  },
  total: 11,
};

export default plan;
