/**
 * Reshape plan: SSC CGL Tier I "Mensuration 3D" (160 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 160 stems and solutions (2026-10-23). The ingest filed them under eleven subtopics, five
 * of them with 3 to 9 rows. Cut here by the solid and then by the method: cubes and cuboids (with the
 * three diagonal rows); prisms and pyramids (base area times height, perimeter times height, layers in
 * an AP, the one-third rule, and the pyramid set on a cube); cylinders; cones; spheres and hemispheres
 * (with the six spheres fitted inside a cube, a box or a cone); scaling and comparing (the ratio and
 * percentage-change rows taken off the cylinder and cone pages, the six cones cut parallel to the base,
 * and the equal-volume and equal-surface comparisons); and melting, recasting and water, where every
 * row is the same idea: the volume does not change. Never featured: 35e10665 and 4dc49094 (their
 * solutions open with a Note), and 5e8bb9f3 (base area equal to curved area forces l = r, so h = 0).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  cuboids: "Cubes and Cuboids",
  prisms: "Prisms and Pyramids",
  cylinders: "Cylinders",
  cones: "Cones",
  spheres: "Spheres, Hemispheres and Shells",
  scaling: "Scaling and Comparing Solids",
  recasting: "Melting, Recasting and Water",
} as const;

const plan: ReshapePlan = {
  chapter: "Mensuration 3D",
  order: [T.cuboids, T.prisms, T.cylinders, T.cones, T.spheres, T.scaling, T.recasting],
  byPrefix: {
    [T.cuboids]: [
      // volume and surface
      "5356a0e5", "b02a3578", "9665d24d", "c6041c22", "05376ef1", "202e870b", "546380d7", "66b18b83",
      "93256ced", "cdf3351d", "4131e51b", "0e07a552", "00a315fc", "a86886b3", "54dc1b7c",
      // rooms, walls and capacity
      "fe9326a2", "bd752d7c", "aab23dd5", "0da2be0f", "fc5c49c4", "46c8660d", "29160a68", "7882f740",
      // cutting, joining and counting blocks
      "f4515d09", "ec2d693b", "317233bd", "7f40e32c", "f82297f4",
      // the diagonal
      "691e2143", "77c850b9", "96505be3",
    ],
    [T.prisms]: [
      "a5d59d9a", "4dc49094", "3cf99f63", "dba56194", "c151699e", "e8467a15", "d22c5ea5", "28efd95a",
      "b264341d", "09d2d7b2",
      "9f9c2508", "bf4eb044", "c80db5cc", "f9c99738",
      "59e2886c", "b1e6605e", "2b7e6b0b", "ec5b4dbb",
      "0cd77b65", "e1c63020", "c24619d6", "4aceed8b", "a7d9aa03",
    ],
    [T.cylinders]: [
      "69ca936d", "d9ec4a01", "95c2bd2a", "d87672d3", "de024001", "1eca6533", "a2d25b1f", "ac078d39",
      "b64ad04a", "0c1fa981",
      "981df7d4", "af21c8bf", "cf34693c", "cf9eec2c", "70c05735", "077bd539", "c0a42624", "05e950e9",
      "291f0108", "46484e34", "3bda7bfd", "4deae43d",
    ],
    [T.cones]: [
      "d644a806", "f5a207d4", "29e4ab4b", "65a6a627", "5e8bb9f3", "b0d4763b",
      "e5525afb", "eeae10ba", "17530dd5", "d4b3d38d",
      "a97a7300", "3a63368b", "89acbee9", "0e8845c0", "859c6d96", "a222253a", "976c0307", "e7284f3e",
      "196ebeb7",
    ],
    [T.spheres]: [
      "38d72ff9", "b669ef1f", "9ceb2781", "77ef8f9f", "757ba653", "431f5c62", "35e10665", "d21c2b7e",
      "c8e91553", "fc9742b1", "83f3b947", "b9c5800c", "3e1503f1",
      "693aa6f3", "91b29741",
      "f6d514d2", "09b4ef11", "4170259f", "5e25901e", "7248f6a0", "9e986dd1",
    ],
    [T.scaling]: [
      "0fdeea96", "f9be5648", "d1e0c3bc", "6168ecac", "3ebdd032", "4e2b6e5a", "4fd419ce", "cae32336",
      "556eacd3", "ba49fb44", "c4416d51",
      "f0891c1b", "d2d4a4c3", "c0ecc759", "c1f19d22", "b9a6dfce", "4c839fdc",
      "36d8761b", "16455fab", "90ef0598", "0f23ada3", "2973d05b", "3316dce7",
    ],
    [T.recasting]: [
      "bd459154", "8efa2100", "d335b9a9", "a464dd52", "80c96f02", "6de20236", "3a081be4", "a077ef20",
      "4db2f75e", "ebedbd5b", "967fcea6",
      "cc2c56e3", "f57d3182", "e6bae944", "3ddef8f6",
      "1ec14fbe", "bba5ed47",
      "f33ce52e", "63d3d280", "f0585d7e", "93b0eefd",
    ],
  },
  expected: {
    [T.cuboids]: 31,
    [T.prisms]: 23,
    [T.cylinders]: 22,
    [T.cones]: 19,
    [T.spheres]: 21,
    [T.scaling]: 23,
    [T.recasting]: 21,
  },
  total: 160,
};

export default plan;
