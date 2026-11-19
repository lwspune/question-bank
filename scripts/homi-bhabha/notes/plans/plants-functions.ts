/**
 * Reshape plan: Homi Bhabha Std IX "Plants and Their Functions" (14 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 14 stems and solutions. The ingest filed them under seven subtopics; cut here by what a
 * question asks: roots and stems with their special forms and the plants adapted to odd places,
 * what the leaf does with water and light (transpiration, guttation, root pressure,
 * photosynthesis), and the colour pigments with the hormones and minerals that control growth.
 * Never featured: c4820c2c (statement 2 on cactus leaves is arguable; the key rests on the
 * options offered).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  roots: "Roots, Stems and Adaptations",
  leaves: "Transpiration and Photosynthesis",
  pigments: "Pigments, Hormones and Minerals",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Plants and Their Functions",
  order: [T.roots, T.leaves, T.pigments],
  byPrefix: {
    [T.roots]: ["1679b722", "434da6a5", "c1122e8d", "d4c45d89", "c4820c2c"],
    [T.leaves]: ["6d1c9fab", "09f6eea7", "419d92e9", "af4d87b4"],
    [T.pigments]: ["c5b0f7c1", "8d0cd4e7", "abd6f41e", "e3d3991d", "0d020339"],
  },
  expected: { [T.roots]: 5, [T.leaves]: 4, [T.pigments]: 5 },
  total: 14,
};

export default plan;
