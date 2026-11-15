/**
 * Reshape plan: SSC CGL TIER II "Mensuration 3D" (69 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 69 stems and solutions (2026-11-15); every key re-derived and agreed. The ingest filed them
 * under eleven subtopics, six of them with 1 to 6 rows. Cut by the solid, then by the method, in
 * Tier I's order: cuboids, prisms and pyramids together (a cuboid is a right prism, and Tier II has
 * only five cuboid rows, the two diagonal rows among them); cylinders (with the hollow tube and the
 * cylinder with cones drilled out); cones (with the cone on a hemisphere); spheres and hemispheres
 * (with the shell, the sphere cut in eight and the sphere carved from a cube); scaling and comparing
 * (the percentage-change rows and the two ratios of two solids); and melting, recasting and water,
 * where the volume never changes. One new name: "Cuboids, Prisms and Pyramids". Nothing is flawed;
 * every row may be featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  prisms: "Cuboids, Prisms and Pyramids",
  cylinders: "Cylinders",
  cones: "Cones",
  spheres: "Spheres, Hemispheres and Shells",
  scaling: "Scaling and Comparing Solids",
  recasting: "Melting, Recasting and Water",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Mensuration 3D",
  order: [T.prisms, T.cylinders, T.cones, T.spheres, T.scaling, T.recasting],
  byPrefix: {
    [T.prisms]: [
      "eacfed2c", "d3dcfe0d", "6b0be65f", "a3f50407", "823e401f",
      "11864101", "14608900", "5768fdff", "1c605554", "872efc17", "14ce0d52",
      "2b608ef9", "d21e07a2", "dc4e4f5c", "06ca1013", "3ae67ebc", "5f1687a9", "32d9205c", "d272dc64",
    ],
    [T.cylinders]: [
      "1f51d7f4", "2dd31526", "cb423bb6", "ebc2289c", "dc368495", "796e10a4",
      "d2f4b6b6", "29a57365", "496582af", "5efb4baa", "cd13db85", "bbbb3e81", "96a2a5b0",
      "eb63b678", "4351880c",
    ],
    [T.cones]: ["2058ea08", "a9ef7034", "84a95b02", "7e69528d", "8baa9acc", "c61880b9", "ed10d5f1", "0d1a9d49", "cf8bd730", "13280260"],
    [T.spheres]: ["176e9685", "3f468bd8", "eec019c5", "50962886", "c74885bd", "03a848e1", "bf0507ba"],
    [T.scaling]: ["4bb00cae", "3b451d8e", "c71688b8", "6207757f", "b00355d9", "b456211a", "9409c615", "63e78cb4"],
    [T.recasting]: ["85968312", "b4776baa", "d08f4870", "3bd41df6", "370f3076", "6a838784", "be712dd9", "56b462f2", "9353ec08", "18adddf4"],
  },
  expected: { [T.prisms]: 19, [T.cylinders]: 15, [T.cones]: 10, [T.spheres]: 7, [T.scaling]: 8, [T.recasting]: 10 },
  total: 69,
};

export default plan;
