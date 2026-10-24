/**
 * Reshape plan: SPI "Circles" (36 q), for scripts/spi/reshape.ts.
 *
 * Read all 36 stems and solutions (2026-10-22). The ingest filed them under 27 one-off subtopics.
 * 26 of the 36 are about tangents, so the cut follows the tangent: first the single tangent and its
 * radius (one right triangle, parallel tangents), then two tangents from one point (equal lengths,
 * the angle between them, the incircle), and last chords, angles in a circle and cyclic
 * quadrilaterals (the concentric-circle chords sit here because they need the perpendicular from the
 * centre bisecting a chord). Never featured: 7ad3067f (2022 Q71: two printed statements are true).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  radius: "Tangent and Radius",
  external: "Tangents from an External Point",
  chords: "Chords, Angles and Cyclic Quadrilaterals",
} as const;

const plan: ReshapePlan = {
  chapter: "Circles",
  order: [T.radius, T.external, T.chords],
  byPrefix: {
    [T.radius]: [
      "b8b4e43e", "fa5be942", "cb6f62b0", "8e57f97d", "79c88ef3", "da30de94", "c281d3ad", "f2883988",
      "4220c3ee", "104a13c6", "42d068ad", "622c88ab", "3060a29e", "cfeb094e",
    ],
    [T.external]: [
      "85a823a4", "3aa8cbed", "97ce903b", "46c8d00a", "6cbd62eb", "192d54bd", "dd4b69d1", "2e7c06eb",
      "56b66f3e", "43b86185", "fc3f18b9", "a8a58877",
    ],
    [T.chords]: [
      "79ee2ca5", "77f98c1e", "f355cc23", "9e479dd2", "231b4b49", "606ea579", "76fcffb2", "f2b6680b",
      "e2f361ee", "7ad3067f",
    ],
  },
  expected: {
    [T.radius]: 14,
    [T.external]: 12,
    [T.chords]: 10,
  },
  total: 36,
};

export default plan;
