/**
 * Reshape plan: SPI "Triangles" (34 q), for scripts/spi/reshape.ts.
 *
 * Read all 34 stems and solutions (2026-10-22); every key re-derived and agreed. The ingest filed
 * them under 28 one-off subtopics. Cut here by technique: angles, sides and Pythagoras first (the
 * angle sum, the exterior angle, the side rule and the right triangle, used by every later page),
 * then congruence (the four rules and the order of letters), then similarity (corresponding sides,
 * basic proportionality, the angle bisector), and last the areas of triangles (same height, and
 * similar triangles). No 2022 past-paper row in this chapter. Never featured: cd2519a0 and its
 * repeat 5f636984 (option C, "equiangular", is also true of congruent triangles) and c5ebfbcd
 * (its part (ii) is only about 12 m: 12.01 to two decimals).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  angles: "Angles, Sides and Pythagoras Theorem",
  congruence: "Congruence of Triangles",
  similar: "Similar Triangles and Proportional Sides",
  areas: "Areas of Triangles and Similar Triangles",
} as const;

const plan: ReshapePlan = {
  chapter: "Triangles",
  order: [T.angles, T.congruence, T.similar, T.areas],
  byPrefix: {
    [T.angles]: ["0dad8560", "4cfd5809", "163b01a3", "cb09de3a", "66b3fec7", "26bd74cb", "2f293c0a", "9ccff6cd"],
    [T.congruence]: [
      "cd2519a0", "5f636984", "e2626e2b", "1713affa", "7412cef0", "d66c2994", "9d13b7ca", "a9e07263",
      "22be1ee3", "9137c7e1", "779dcda5",
    ],
    [T.similar]: [
      "fd1b4ed0", "e72f5381", "3eb67e27", "a396afbc", "49757b8a", "babbecfc", "c5ebfbcd", "209129aa",
      "5c00075a", "a9973547", "a3de5970",
    ],
    [T.areas]: ["918e5dc9", "f1d7a936", "65d67eba", "75e09df0"],
  },
  // A repeat of 1713affa (AB = QR, BC = PR, CA = PQ), skipped at commit by content_hash.
  extra: { "mock-5#44": T.congruence },
  expected: {
    [T.angles]: 8,
    [T.congruence]: 11,
    [T.similar]: 11,
    [T.areas]: 4,
  },
  total: 34,
};

export default plan;
