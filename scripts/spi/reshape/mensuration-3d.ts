/**
 * Reshape plan: SPI "Mensuration 3D" (52 q), for scripts/spi/reshape.ts.
 *
 * Read all 52 stems and solutions (2026-10-22). The ingest filed them under 41 one-off subtopics.
 * Cut here by the solid: cuboids and cubes (with the painted-cube pair and unit conversion), cylinders
 * and cones, spheres and hemispheres, then solids joined together and the frustum (a cone cut parallel
 * to its base sits here, since the cut leaves a frustum), and last melting, recasting and the rise of
 * water, which need the volume formulas of every earlier page.
 * Never featured: a891f9fd (no option is the cube's total surface area), c890d39c (only 6 whole cubes
 * fit; the key is the volume ratio), f4d09e73 ("wastage 10%" also reads as 6000/0.9, giving 834),
 * 00104df1 (an area printed in cubic cm).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  cuboids: "Cuboids and Cubes",
  cylCone: "Cylinders and Cones",
  spheres: "Spheres and Hemispheres",
  frustum: "Combined Solids and the Frustum",
  recast: "Melting, Recasting and Water Level",
} as const;

const plan: ReshapePlan = {
  chapter: "Mensuration 3D",
  order: [T.cuboids, T.cylCone, T.spheres, T.frustum, T.recast],
  byPrefix: {
    [T.cuboids]: [
      "84f075ad", "9ca9d06d", "f4d09e73", "253b1f7a", "5ce3ff9e", "9152ff35", "23005267", "a891f9fd",
      "9ed25c13", "c890d39c", "17a1339a",
    ],
    [T.cylCone]: [
      "6f3404a8", "665c4d03", "fe33fc08", "7d5bd20e", "ded4b07f", "cffb14be", "9b9d85ec", "f02c2ba3",
      "5974d059", "4916d49a", "7e453d1a", "4d4c3f38", "54316553", "5948890a", "8cbc67df",
    ],
    [T.spheres]: [
      "c674f245", "2f4f83b1", "19041e35", "1038262b", "d600c11e", "5c413214", "981072b7", "7cd7ccfc",
      "031a0ab0",
    ],
    [T.frustum]: [
      "1279b511", "ef864c2d", "97b4e0b6", "497ab924", "69fa77a7", "22d4ec68", "fad37c7f", "4e81c28b",
      "00104df1", "2d8de001", "80e6f37a",
    ],
    [T.recast]: ["cb44c0a4", "2266c28e", "e86012e1", "bf625460", "34639f46", "2e7791d4"],
  },
  // Repeats skipped at commit by content_hash: mock-5 Q59 is 2d8de001 (the 35 cm and 14 cm bucket),
  // mock-6 Q57 is 497ab924 (the ice-cream cone with a hemispherical top).
  extra: { "mock-5#59": T.frustum, "mock-6#57": T.frustum },
  expected: {
    [T.cuboids]: 11,
    [T.cylCone]: 15,
    [T.spheres]: 9,
    [T.frustum]: 11,
    [T.recast]: 6,
  },
  total: 52,
};

export default plan;
