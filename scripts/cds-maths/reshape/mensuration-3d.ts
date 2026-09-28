/**
 * Reshape plan — CDS "Mensuration 3D" (171 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 171 stems AND solutions (2026-09-28). The classification put 68 rows in one
 * "Cylinder, Cone and Sphere" bucket and scattered the paper's two big ideas — volume is
 * conserved (melting, recasting, pouring, immersing) and ratios of like solids scale as
 * the square or cube of length — across four others. The teaching cut: one page per solid
 * (cuboid, cylinder, cone, sphere), a page for the cuboid's diagonal-and-identity tricks,
 * frustums and combined solids, MELTING (volume carried from one shape to another), WATER
 * (displacement, flow and rainfall, where units are the trap), scaling and comparison, and
 * solids fitted inside solids. Premise sets stay together: 99dea6b5/7d9b8f41/08885023,
 * 4c8f6274/dbe723ef/9c8c031c, f79c622d/e8ab3840, c1b58306/3231a5e8/c2e818d7,
 * 1e160e97/e5e70be6, 7e2dd834/8e47fce6/0e133346, dbd81f35/0c72ff68, e26db3e4/f3e764a5,
 * b64814e4/287c13e9, c6e8d11e/2ffbc13a, a8502be4/7742e022, f0be4ce4/a3015db2.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  cuboid: "Cubes and Cuboids",
  diag: "Diagonals and Cuboid Identities",
  cyl: "Cylinders",
  cone: "Cones",
  sphere: "Spheres, Hemispheres and Shells",
  frustum: "Frustums and Combined Solids",
  recast: "Melting and Recasting",
  water: "Water — Immersion, Flow and Rainfall",
  scaling: "Scaling and Comparing Solids",
  inside: "Solids Inside Solids",
} as const;

const plan: ReshapePlan = {
  chapter: "Mensuration 3D",
  order: [T.cuboid, T.diag, T.cyl, T.cone, T.sphere, T.frustum, T.recast, T.water, T.scaling, T.inside],
  whole: {},
  byPrefix: {
    [T.cuboid]: [
      "d4a3871b", "d37b694f", "6e755c7c", "83a6b1e6", "5a7d80dc", "4e52b4c3", "f9773485", "13432651",
      "871a9beb", "2e6734f4", "7b06b01e", "d92f3b5c", "faa0123e", "e26db3e4", "f3e764a5", "d7364332",
      "5ac5200a", "5542568a", "8f65aac4", "ebb78947",
    ],
    [T.diag]: [
      "4e2ebb6a", "f79c622d", "e8ab3840", "4decd45f", "03663d39", "ff4c6f59", "764e2857", "0d1ca03a",
      "1a719971", "a3015db2", "f0be4ce4", "7da6d548", "a2a072a2", "a6879110", "c5ad57ad", "f82a3f7b",
    ],
    [T.cyl]: [
      "e17e0a50", "6932cb10", "08b55c1e", "fec2c25e", "764ec28c", "d1116bc7", "9c023322", "4dcdbe92",
      "c0fe3c7b", "820add93", "72b8f1c8", "dfa72ab4", "69e8c8ab", "9e07281d", "45b1011d", "9ff55aed",
    ],
    [T.cone]: [
      "c208deec", "b54632f7", "0a582896", "c39f8bce", "b098b699", "53ce8cb2", "6d752bfc", "138248de",
      "feea7c6d", "f9785cbb", "9b77a3d4", "82d9feb4", "4cc32efd", "b64814e4", "287c13e9", "7633b02b",
      "29381238", "bfd936ef",
    ],
    [T.sphere]: [
      "b01a6b07", "ae453c02", "550ab222", "d0cfca97", "9d6b7b90", "c7bbda28", "e98b45e1", "7742e022",
      "a8502be4", "e0b2f80e",
    ],
    [T.frustum]: [
      "f98ecc86", "99dea6b5", "7d9b8f41", "08885023", "c6597474", "c3c04122", "6cab5d8f", "430dc7cb",
      "962ee149", "401220c6", "58c098bd", "39675c2d", "c1b58306", "3231a5e8", "c2e818d7", "53aa5300",
      "620dbd8e", "e76f2bfd", "a8174f0e", "dbd81f35", "0c72ff68", "8e82515d",
    ],
    [T.recast]: [
      "f3fd4b8f", "6de812c8", "33be827a", "41040a6e", "d4c2befc", "e39dd0b2", "4955159a", "960a042f",
      "30460dad", "fdc733fc", "c647de6b", "4bad777a", "2122e5d2", "f30736e5", "65083eda", "cdb5e5df",
      "dffd4d90", "a32591ff",
    ],
    [T.water]: [
      "e1d249b4", "2bb9c878", "daeeae5d", "6d5c8e12", "7934784d", "05933d64", "300e97ed", "b41b835f",
      "a0d37a66", "177e1383", "c6e8d11e", "2ffbc13a", "147fba83", "b77c6952", "e961ca8f", "8a03c565",
      "1fddbc53",
    ],
    [T.scaling]: [
      "d082fa9d", "fb42dbd0", "caa10210", "8c693e20", "380f0f27", "33ff31f5", "5be338ef", "820aa874",
      "45a3d77b", "4f409ee7", "8e5c3e4e", "1607f75e", "7037b939", "69a1d6ca", "f197c84f", "7a088b65",
      "9781bc0c", "16853ef5", "d03a94c5",
    ],
    [T.inside]: [
      "35b530a6", "89cea19c", "517c2f82", "4c8f6274", "dbe723ef", "9c8c031c", "c44d2515", "89cc0500",
      "1e160e97", "e5e70be6", "7e2dd834", "8e47fce6", "0e133346", "d983177a", "77c0aed5",
    ],
  },
  expected: {
    [T.cuboid]: 20,
    [T.diag]: 16,
    [T.cyl]: 16,
    [T.cone]: 18,
    [T.sphere]: 10,
    [T.frustum]: 22,
    [T.recast]: 18,
    [T.water]: 17,
    [T.scaling]: 19,
    [T.inside]: 15,
  },
  total: 171,
};

export default plan;
