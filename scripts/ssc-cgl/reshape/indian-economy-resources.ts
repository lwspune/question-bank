/**
 * Reshape plan: SSC CGL Tier I General Awareness Geography "Indian Geography: Economy, Resources and Transport"
 * (132 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 132 rows (2026-11-01, main session). Cut into population and the Census, agriculture, minerals and
 * energy, industries, and transport. Never featured: 276c5ca0 and bc94f6ca (solutions open with a Note),
 * fd87300f (an industrial-district key that rests on SSC alone), da704a9e (a provisional Census figure).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  population: "Population and Census 2011",
  agriculture: "Agriculture and the Green Revolution",
  minerals: "Minerals and Energy",
  industries: "Manufacturing Industries",
  transport: "Transport and Ports",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Indian Geography — Economy, Resources and Transport",
  order: [T.population, T.agriculture, T.minerals, T.industries, T.transport],
  byPrefix: {
    [T.population]: [
      "0a2a2371", "167060c7", "21e25602", "491e654b", "577b7d8d", "aee86690", "20268321", "da51d17f",
      "b8037f1a", "c9606278", "be5db374", "213899f2", "6434c6aa", "bc0b74cb", "933c5e31", "ac9fce50",
      "c2dca86f", "c7e707f2", "da704a9e", "f2df99a8", "f4253b16", "00742960", "35255933", "7bfc4d00",
      "a0b20fc9", "b1aa9d83", "c47ea636", "d0408079", "6c93a5d9", "276c5ca0", "abefccfe", "6437e18f",
      "e23a2bc1", "f9bd6169", "09b6683f", "cb4e047f", "e7211985", "42d90d33", "532a1402", "69eb5119",
      "7563fea1", "cf593b49", "e104c242",
    ],
    [T.agriculture]: [
      "46c35eaa", "3f132fc0", "682b751c", "85716105", "e2918eef", "e516596a", "f3fdf0d4", "f5827dc8",
      "fb8c4772", "2155c5c1", "8353ed53", "9fc10a98", "cd6d1725", "88b56d32", "a1b58623", "e5d0e30b",
      "0727127e", "b25e1e08",
    ],
    [T.minerals]: [
      "3bcd75a4", "ea5e1058", "f852c62a", "36933990", "3aca212e", "7b9bc152", "8ebf2b92", "9334ca48",
      "9be11c18", "abf3abee", "ce0aa6dc", "d1b9a217", "f3625833", "2bbc9ab3", "ebe9d715", "44d3fb0d",
      "66fd0541", "d9b4cdda",
    ],
    [T.industries]: [
      "3c3bc6e4", "489a6949", "74e67df4", "9b1d355e", "f1eca149", "2f7815c6", "c0d31dd0", "1a2318e6",
      "a1240472", "a47dad40", "cc673eea", "fd87300f", "08d87b2b", "2ecb8afe", "41e305cf", "6c2e4976",
      "d53c2c4b", "6a81c3b6", "bc94f6ca", "eeb09ed5", "24d3835e", "489cfc7b", "9bad9630", "b5c8257b",
      "d3e1a49a", "e06d459e",
    ],
    [T.transport]: [
      "08e31704", "0bc7f640", "27c15ae7", "4c9e14ce", "577cfe31", "c151cbc9", "cfe3a758", "1351a7e5",
      "5c10eb0d", "ad4a83cf", "00a647fa", "32a24d21", "541f8cd7", "54924d73", "fc9fe360", "206aff26",
      "78e5f744", "8c175c68", "ab1f839b", "eb72475e", "ede72f53", "9eaa39c2", "d7ee9f44", "2f1f52f5",
      "3872c931", "dab9ab68", "ed492641",
    ],
  },
  expected: {
    [T.population]: 43,
    [T.agriculture]: 18,
    [T.minerals]: 18,
    [T.industries]: 26,
    [T.transport]: 27,
  },
  total: 132,
};

export default plan;
