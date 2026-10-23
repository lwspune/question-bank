/**
 * Reshape plan: SSC CGL Tier I Reasoning "Dice and Cubes" (63 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 63 rows (2026-10-23, main session). Cut by the method that finds the hidden face: the face never
 * seen beside a given face is its opposite (with the two cube-net rows, which use the same opposite-face idea);
 * or, when one face sits in the same place in two views, the faces in matching places are opposite.
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Dice and Cubes",
  order: ["Opposite Faces of a Dice", "Turning About a Common Face"],
  byPrefix: {
    "Opposite Faces of a Dice": [
      "3d19f5ab", "95c51619", "a39d2e13", "97548efa", "49577f93", "67fb0d63", "e54edaeb", "1e9adbcb",
      "74a3638d", "99de6212", "e8948337", "31bd43c4", "2b0b5b85", "f056c3bb", "2b73b538", "f3e5410d",
      "38270449", "f42b12b2", "e6e8d602", "ea833ac0", "412c1616", "fdb173a4", "8dc11921", "0e7c4156",
      "6092772e", "83a25553", "64fe8ae9", "8065e651", "f8234a12", "3bdec7d5", "ad605391", "a5de80a9",
      "e2290ec9", "872a40bc", "851d7009", "cb4c3add", "2c18ff5e", "dbbfc95f", "9d125526", "9e43d83f",
      "d2ea8df0",
    ],
    "Turning About a Common Face": [
      "954a4935", "ee691efa", "578c2741", "3c582c1c", "ec897d07", "b8ac59bc", "68947eb7", "11888bc1",
      "a694ecb9", "cff945ac", "34fa3ff8", "9cc4a254", "8ec43c33", "287e3020", "270390b8", "1f10dd29",
      "f25674b6", "d7e70792", "4eda1e25", "f5357c1e", "e7f9ea4b", "a22f70e1",
    ],
  },
  expected: {"Opposite Faces of a Dice": 41, "Turning About a Common Face": 22},
  total: 63,
};

export default plan;
