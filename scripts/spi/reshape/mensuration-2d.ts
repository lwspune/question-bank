/**
 * Reshape plan: SPI "Mensuration 2D" (27 q), for scripts/spi/reshape.ts.
 *
 * Read all 27 stems and solutions (2026-10-22). The ingest filed them under 23 one-off subtopics.
 * Cut here by the shape: straight-sided figures first (rectangles, squares, triangles and the regular
 * hexagon, with diagonals and cost), then whole circles (circumference, wheels, area, wire bent from one
 * shape to another), then parts of a circle (sectors, the clock hand, a shaded segment), which need the
 * circle formulas. Never featured: e2c50344 (two options are the same expression) and f8e89ade (the
 * count of 4 holds only for whole-number sides, which the question does not say).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  straight: "Rectangles, Squares and Triangles",
  circles: "Circumference and Area of a Circle",
  sectors: "Sectors and Segments",
} as const;

const plan: ReshapePlan = {
  chapter: "Mensuration 2D",
  order: [T.straight, T.circles, T.sectors],
  byPrefix: {
    [T.straight]: [
      "39fe7103", "4b6d17ec", "cc6b4c6f", "b5bbb066", "f8e89ade", "cfbb8df9", "13b7d04a", "075beb3c",
      "bca30bb8", "ca6a870c", "e7e1ce47", "f7cb0164", "4628bdfb",
    ],
    [T.circles]: [
      "fa391083", "af825332", "2ce86f55", "384ac064", "33084f26", "6b07e811", "3e6f44ba", "a5f00825",
      "dd926141", "6bfb2966",
    ],
    [T.sectors]: ["a47041de", "535869b8", "e2c50344", "408062ef"],
  },
  // A repeat of fa391083 (area of a circle of diameter 21 cm), skipped at commit by content_hash.
  extra: { "qp1-maths#27": T.circles },
  expected: {
    [T.straight]: 13,
    [T.circles]: 10,
    [T.sectors]: 4,
  },
  total: 27,
};

export default plan;
