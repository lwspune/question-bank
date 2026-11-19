/**
 * Reshape plan: SSC CGL Tier I Static GK "Sports and Games" (162 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 162 rows (2026-11-19, draft agent S2). The move filed them under three wide subtopics (terms and
 * rules, trophies and venues, sportspersons). Cut here by what a student learns together: the Olympic,
 * Paralympic and Asian Games; India's Olympic medals and its famous players; Indian sports bodies, domestic
 * trophies and awards; cricket; hockey, football, kabaddi and the court games; racket sports and chess;
 * athletics, swimming and combat sports. Never featured: 49d29b3e and ab9453b5 (SSC printed them in Hindi
 * only), 828f9860 (two tournaments fit "first men's Asian hockey championship": India and Pakistan are both
 * printed), 7cf8099c (India did not win the 1951-52 series; 1952 Madras was its first Test win),
 * 3d8e351b (the 4 x 100 m zone has been 30 m since 2018, also printed), bf706d69 and f93e9e53 (their
 * solutions disagree on where the 1924 Indian Olympic Games were held), 7496c278, 15abc426 and 39562e98
 * (coaching-manual detail no standard rulebook settles).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  olympics: "Olympic, Paralympic and Asian Games",
  india: "Indian Sportspersons and Medal Firsts",
  bodies: "Indian Sports Bodies, Trophies and Awards",
  cricket: "Cricket Rules, Terms and World Cups",
  teamGames: "Hockey, Football, Kabaddi and Court Games",
  racket: "Racket Sports and Chess",
  athletics: "Athletics, Swimming and Combat Sports",
} as const;

const plan: ReshapePlan = {
  subject: "Static GK",
  chapter: "Sports and Games",
  order: [T.olympics, T.india, T.bodies, T.cricket, T.teamGames, T.racket, T.athletics],
  byPrefix: {
    [T.olympics]: [
      "03786a9a", "10d62f42", "1a8d24c7", "203d1d28", "2cbff93d", "32fb9108", "5daee296", "9bf8621e",
      "d9e30e92", "00f05fec", "4cdd2c23", "fb76b20f", "948d3a72",
    ],
    [T.india]: [
      "704f0388", "85710d37", "8eaa5a82", "cdac19a2", "d7079b88", "facc6c73", "06050afa", "2af62004",
      "2ce82c24", "2e0bee9c", "3697349f", "46024afc", "66b8770a", "7585722e", "77702cd1", "786cb43f",
      "ad156516", "b1dd9a1b", "f93e9e53", "120ceec5", "20f88e01", "64199c98", "8bd72ad3", "8e90c23a",
      "930cbb89", "980f3059", "a51f0899", "a6a82de6", "afad5a53", "bdebaaed", "c7d6673c", "dc0d8d57",
      "edc2a928", "ee84a666",
    ],
    [T.bodies]: [
      "08d52d7b", "414fa677", "56911d7d", "710dca8e", "81e566d9", "d50554e8", "44bc80fa", "46a22326",
      "66356954", "7035b1d7", "74b0240c", "80f8e292", "908772ae", "a7975d3f", "bf706d69", "e0c16c88",
      "1745f96b", "433877a4", "6e4c7f35", "708d6df9", "aabc6190", "bcdc8077", "bff140af", "f698eed8",
      "fe69aff5",
    ],
    [T.cricket]: [
      "24765580", "49d29b3e", "5d93badb", "74d658d2", "97c5f5d9", "d4d510ff", "f7c619a4", "05fb5c1f",
      "3a3af632", "3b56d2e8", "66eb4375", "870df55a", "93dcd100", "be017a0b", "f57fec8f", "fb584e35",
      "7cf8099c", "e526dbab", "f364ff95",
    ],
    [T.teamGames]: [
      "2280ff42", "2550ff77", "3659a15a", "53b1e864", "6f8cb5df", "bde8f7bf", "dc198cc6", "ddd93a1c",
      "e062b5bb", "35e917a4", "5aeea3af", "7a566f0a", "828f9860", "9e305b7b", "b0e83fb0", "b64d36e2",
      "e0988f54", "e9e000f5", "22a23a71", "2eeadf4b", "32b7f0fd", "81806523", "8c4bc117", "91472e27",
      "9b57ae13", "a3770e64", "b21f887d", "f91068e5", "fec5d394",
    ],
    [T.racket]: [
      "078e4680", "ab9453b5", "d6c40869", "faf0ba05", "14c32cb4", "20ac56b5", "766577fd", "a93f7cba",
      "bac4866d", "e52d1d9c", "ee105447", "58f11003", "5bb6fb89", "69e6a1b6", "6c04f538", "c95c0b38",
      "d07a3335", "da2a850a", "dcb23ea4", "e1c1dd13",
    ],
    [T.athletics]: [
      "01138c6e", "2f0884cc", "15abc426", "2013f4bf", "20302b8f", "39562e98", "3d8e351b", "4561a38e",
      "5bbd08ce", "60a90738", "6c535a1c", "7496c278", "831f0da4", "8a29035d", "8f448bce", "9fa81224",
      "ac6843aa", "bfd3177f", "eb7a8ed0", "ee93b17e", "f4648889", "ff8bb7f4",
    ],
  },
  expected: {
    [T.olympics]: 13,
    [T.india]: 34,
    [T.bodies]: 25,
    [T.cricket]: 19,
    [T.teamGames]: 29,
    [T.racket]: 20,
    [T.athletics]: 22,
  },
  total: 162,
};

export default plan;
