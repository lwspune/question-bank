/**
 * Reshape plan: Homi Bhabha Std IX "Light" (27 q), for scripts/homi-bhabha/reshape.ts.
 *
 * Read all 27 stems and solutions. The ingest filed them under five subtopics; cut here by what a
 * question asks: the laws of reflection with plane mirrors (one mirror and two or three at an
 * angle), the parts of a spherical mirror and how the three kinds of mirror compare, the images a
 * concave mirror forms with the mirror formula and magnification, and refraction with optical
 * instruments. Never featured: 2285ad2c (notice: a line of the printed stem is cut off), 7f981a22
 * (notice: a closed triangle of mirrors gives endless images), a77640b5 (options B and D say the
 * same thing).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  plane: "Reflection and Plane Mirrors",
  spherical: "Spherical Mirrors",
  concave: "Images by a Concave Mirror",
  refraction: "Refraction and Optical Instruments",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Light",
  order: [T.plane, T.spherical, T.concave, T.refraction],
  byPrefix: {
    [T.plane]: ["d301a77f", "ab03032e", "5335881d", "dba0e47a", "2d830b72", "3fbd4085", "5160389e", "7f981a22"],
    [T.spherical]: ["4ea6f096", "6b971172", "cb266ed0", "c704a054", "16cc54df", "21affb7d", "a79acb26", "bd983b17"],
    [T.concave]: ["34a56215", "5b3a10cc", "a77640b5", "59d477c4", "e69028f5", "e41a4975"],
    [T.refraction]: ["128cc929", "479491b4", "84b5e134", "af1530bb", "2285ad2c"],
  },
  expected: { [T.plane]: 8, [T.spherical]: 8, [T.concave]: 6, [T.refraction]: 5 },
  total: 27,
};

export default plan;
