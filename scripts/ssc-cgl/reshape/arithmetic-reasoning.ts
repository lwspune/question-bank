/**
 * Reshape plan: SSC CGL Tier I Reasoning "Arithmetic Reasoning" (74 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 74 stems and solutions (2026-10-23). Every row comes from the 2025 shifts and the ingest
 * filed all of them under one subtopic, "Arithmetic Word Problems", which held six methods. Cut here
 * by the method that solves the row: plain calculation and number facts (order of operations, powers,
 * the digit-sum test, LCM and HCF); equations from words (two numbers, combining equations, ages,
 * equal shares); ratio and mixtures; percentages and interest; speed, time and work; and counting,
 * chance and shapes (pairs, one probability, two solid and flat figures). Never featured: 6f772889
 * (a circle gives each student two neighbours, not three; SSC's key 20 is wrong, ours is 30) and
 * c401e52c (no option is exact: the diagonal is about 58.31 m). Both open with a Note.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  calc: "Calculation and Number Facts",
  equations: "Equations from Word Problems",
  ratio: "Ratio and Mixtures",
  percent: "Percentages and Interest",
  speed: "Speed, Time and Work",
  counting: "Counting, Chance and Shapes",
} as const;

const plan: ReshapePlan = {
  chapter: "Arithmetic Reasoning",
  subject: "Reasoning",
  order: [T.calc, T.equations, T.ratio, T.percent, T.speed, T.counting],
  byPrefix: {
    [T.calc]: [
      "2f13c70f", "88114c35", "53c32944", "46a94c8b", "9f2ed351", "e6cc0bb3", "2f0aee04", "8aede969",
      "ae064215", "f1df3e12", "10aa37ab", "04761390",
      "a22925b7", "1d894453", "377f2f2e", "bf53f257",
      "261868d2", "607e458a", "f56d43fc",
    ],
    [T.equations]: [
      "29c5273b", "2b4dac51", "2c03d846", "c782c551", "139e8745", "0a21eb08",
      "878cbe71", "2e4ec42f", "5aa366f3", "1c5ebd71",
      "bab65f1c", "5528bb91", "cc3dbe24", "ff93f8a5", "ca66bb5c",
    ],
    [T.ratio]: [
      "7d39bf17", "b391f15a", "a0c7dee8", "d0cc3eab", "d1424465",
      "24d61c2f", "872e7f19", "fad9b66b", "ca035d2f", "e76880fd",
    ],
    [T.percent]: [
      "6b1d1982", "2dd0a8fa", "b87d2f91", "61f1ab5f", "85d15ccc",
      "3f87e0b8", "4230e27c", "50d5028a",
      "c3f085bb", "93d61eed", "04898936", "885b9c57",
    ],
    [T.speed]: [
      "6693a848", "50e9b1b8", "d113ba7e", "4eb7d79c", "c57fbb90", "f7e4c934", "96d29f05",
      "2e19cc79", "1aa7fc63", "5cc357d7", "f4c77d19",
    ],
    [T.counting]: [
      "ecf9386f", "733fdc41", "6f772889", "2d69901d",
      "452c9fb3", "08da7674", "c401e52c",
    ],
  },
  expected: {
    [T.calc]: 19,
    [T.equations]: 15,
    [T.ratio]: 10,
    [T.percent]: 12,
    [T.speed]: 11,
    [T.counting]: 7,
  },
  total: 74,
};

export default plan;
