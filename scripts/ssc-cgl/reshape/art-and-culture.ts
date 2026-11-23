/**
 * Reshape plan: SSC CGL Tier I Static GK "Art and Culture" (213 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 213 rows (2026-11-19, draft agent S1). The move filed them under three wide subtopics
 * (dances 127, music 76, heritage 10). Cut here by what a student learns together: the eight classical
 * dances with their terms and Kathak gharanas; the dancers, gurus and dance schools; folk dances of the
 * north, west and south; folk dances of the centre, east and north-east (the three match-the-following
 * rows sit here, after every dance they name is taught); Hindustani and Carnatic music (gharanas, singers,
 * forms, theory); instruments and their maestros; heritage sites, seasons and martial arts.
 * Never featured: 4ef60345 and 98896542 (SSC printed them in Hindi only), 31672d14 (two famous Faiyaz
 * Khans), 286170f4 (the stem calls Girija Devi a ghazal singer), 65768c5c (an order of "earliest
 * references" no standard book fixes), 52861fdc, 0401fc01, 321f14f3, 3a971364, e98df4f0, 9b18a546,
 * b2ae1d56, c05aa921 and d3eb935e (keys rest on details no standard book carries).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  classical: "Classical Dances: States and Features",
  dancers: "Classical Dancers, Gurus and Institutions",
  folk_nws: "Folk Dances of North, West and South India",
  folk_ce: "Folk Dances of Central, East and North-East India",
  music: "Hindustani and Carnatic Music",
  instruments: "Instruments and Maestros",
  heritage: "Art, Architecture and Heritage",
} as const;

const plan: ReshapePlan = {
  subject: "Static GK",
  chapter: "Art and Culture",
  order: [T.classical, T.dancers, T.folk_nws, T.folk_ce, T.music, T.instruments, T.heritage],
  byPrefix: {
    [T.classical]: [
      "22479c6b", "ceb74bba", "ca2557b1", "ce678da6", "ef19ea63", "f6b4ef86", "eb526854", "f8886728",
      "65768c5c", "02221de6", "755950f9", "059cc5db", "4948cfed", "616e1f51", "66a89ab1", "927dd150",
      "c5b38db8", "ba739a6d", "f4600e5c", "d84e4067", "da898cd2", "c07d25f0", "d4d4b284", "e0d1dde7",
      "f4e513a3", "5e5aa8a3",
    ],
    [T.dancers]: [
      "1562719b", "52ab0dfe", "a49bcc91", "3bdd88aa", "fa0331e8", "828fd0cf", "a5c45d4e", "e8258722",
      "bb735d53", "1778e94d", "1cea1f1d", "55d8d936", "59937c58", "8f242127", "a30e1c4c", "b34ae6a5",
      "c510703c", "cbbe27d1", "e786b49d", "28eaf568", "293cc78c", "4affac8e", "c34ac3bc", "40c89dc2",
      "ab628a1e", "0b8c2565", "4033a33c", "462a2054", "e6047e16", "b8a7a48f",
    ],
    [T.folk_nws]: [
      "0401fc01", "f0a19f34", "5928ca42", "d3dbdb7a", "e17aad12", "77905dcc", "87c1274f", "196ab557",
      "6c63eb38", "2147a423", "9e0c314d", "2467ebb4", "dada4252", "bbcbcb7b", "cf42e551", "dc9cc856",
      "e70c1bcc", "fa9432c2", "edbc7c03", "e98df4f0", "3a971364", "321f14f3", "e77251fe", "ea45b229",
      "33dcd27c", "b3bff473", "c0a739bb", "d65e81fd", "77bd1e59", "d4623486", "2e2f8c93", "d113b28f",
      "45cc6922", "c6ac3672", "cd36d79d", "8c898f26", "8958742a", "c4c9da2a",
    ],
    [T.folk_ce]: [
      "5f5e2111", "30e8ef27", "6450b4db", "d70b6a8f", "4ef60345", "35c56927", "904f457d", "43254b80",
      "f18106b7", "50ca4882", "b58e4b7a", "24a07849", "7a0ca2ab", "25e8acc5", "6d4f1e8d", "edd3d946",
      "52861fdc", "00404351", "d6a29fbd", "deee06e4", "601f9c75", "80b01699", "407eb643", "cf9a52b4",
      "fcd6d222", "b8de7567", "7df9f858", "be41bb29", "1b2a84fe", "dbfcf7ac", "ea4b13c3", "8ff8a1a5",
      "9680bb90",
    ],
    [T.music]: [
      "359273ab", "6945b8c1", "96ccdca4", "b565a062", "03e9cb06", "9b4e8d4d", "286170f4", "2e845471",
      "4f8675e0", "5706c794", "df866df9", "fdd5fdf8", "58405b80", "7fb68805", "b48e8296", "bc300047",
      "e86687c6", "f819c595", "020b87a0", "2a96be43", "cf51b5a9", "75772b0b", "fda46264", "ec411a42",
      "67796984", "ab8bf385", "eab0771a", "b2ae1d56", "477fa71a", "47c536de", "4fae9971", "9b18a546",
      "a5010a01", "ac67585c", "d2166006", "e113c36e",
    ],
    [T.instruments]: [
      "08dc4727", "0d3ec30b", "381e5ecf", "4885bcbb", "7e8597b9", "91041b4b", "008f42b8", "08cdd024",
      "0f7f3a08", "2fd110c4", "5fae1946", "83f857ab", "393a52ea", "76e27fb6", "98896542", "b7add61c",
      "e315f17b", "e3b71415", "192759d2", "5b46c489", "7ebca8b9", "8c97ab89", "b76b5aa7", "dedeeb7b",
      "e6c04a06", "04f7c474", "0f66077c", "2f4bde94", "31672d14", "9481abd1", "9c481ad6", "cdc74cb8",
      "945af502", "a3f0ae9f", "f66aa34c", "504a8a37", "65df28c8", "b7820156", "c05aa921", "ccfb0f7b",
    ],
    [T.heritage]: [
      "7817e277", "68fc7bbd", "750d8112", "426d2541", "a764e90a", "d3eb935e", "faaabb79", "695b2789",
      "996ce163", "2d1e0e34",
    ],
  },
  expected: {
    [T.classical]: 26,
    [T.dancers]: 30,
    [T.folk_nws]: 38,
    [T.folk_ce]: 33,
    [T.music]: 36,
    [T.instruments]: 40,
    [T.heritage]: 10,
  },
  total: 213,
};

export default plan;
