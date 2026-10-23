/**
 * Reshape plan: SSC CGL Tier I "Time and Work" (198 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 198 stems and solutions (2026-10-23). The ingest filed them under four subtopics, and
 * "Work Rates" (106 rows) mixed five methods. Cut here by the method that solves the row: one day's
 * work (adding and subtracting rates, the fraction done, pairs, pay shared by work); efficiency and
 * time ratios (including "k times as fast and N days less"); work done in stages (one worker hands
 * over, a worker joins or leaves, a worker leaves N days before the end); alternate days and helpers
 * on every k-th day (cycles); man-days and man-hours (including a workforce that changes partway);
 * men, women and boys as equivalent workers; and pipes and cisterns (net rate, leaks, pipe speed
 * ratios, pipes opened or closed partway, with the build-and-break wall row because an outlet is the
 * same idea). Never featured: e921501d, c35b495d and 886f341e (their solutions open with a Note),
 * 34274b79 and 49dd3084 ("times more efficient" read as "times as efficient"; 49dd3084's other
 * reading is option C).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  rates: "Work Rates",
  efficiency: "Efficiency Ratios",
  joining: "Workers Joining and Leaving",
  alternate: "Working on Alternate Days",
  mandays: "Man-Days and Man-Hours",
  equivalent: "Men, Women and Equivalent Workers",
  pipes: "Pipes and Cisterns",
} as const;

const plan: ReshapePlan = {
  chapter: "Time and Work",
  order: [T.rates, T.efficiency, T.joining, T.alternate, T.mandays, T.equivalent, T.pipes],
  byPrefix: {
    [T.rates]: [
      // together
      "32fb8488", "3b1366d2", "00ca565e", "c744d7db", "aea30039", "3504eab4", "82bc110f", "e873b422",
      "04f92dff", "329fe44e", "3b794981", "e2887ec3", "598439ab", "0a08f83f", "1238665c", "b7e6ed5c",
      // fraction of the work
      "b895c6af", "2bba1a0f", "f5a99870", "3d902480", "bed0a170", "ea0fba91", "7ddd7aa4", "d653b1ba",
      "da468472", "0494de5c", "f437e40f",
      // one worker from the total, and pairs
      "d71993cc", "3578aea9", "3973153c", "77c34be5", "1ad6d98f", "6a386881", "91f3b8e8", "af511013",
      "18064bba", "e4fa7143", "c0b20059", "c99d1882", "0631c0fb", "0236a27b", "f4f3c1d9", "86b74822",
      "525a25a4", "beb30395", "c3030b59", "0e80d974", "4d757852", "41de2b2f",
      // pay
      "80fa6727", "529bdd2b", "3e829db9",
    ],
    [T.efficiency]: [
      "751d8741", "48e3bb25", "73f2fcfa", "31f4f12a", "fd6effeb", "cefa3efd", "10c7f178", "f91e1df9",
      "f61fc7f6",
      "5285779e", "b1aac145", "34274b79", "49dd3084",
    ],
    [T.joining]: [
      "48fc6e94", "d4f76078", "f5ab0e71", "89b0f2c9", "29d6959f", "8f31415c", "20d7aec1", "fe3d8e1f",
      "a8386717",
      "7ef3610c", "c462ee9b", "806e78c2", "665951d4", "2323c166", "5879ce59", "410f87a9", "4ad11068",
      "214ce104", "38f0a9ba",
      "1c319e3c", "ed13461a",
    ],
    [T.alternate]: [
      "d6dc41c7", "0938c56b", "0d63b9b2", "d9b389ce", "5705005c", "6ad272a5", "c6af58d8", "8cdd42e4",
      "49aa47a2", "7778cb87", "54f1ad27", "cbbb5c1b", "a3df1a3b",
      "56b1e14e", "c59107d7", "3aa6d181", "126b12f9", "5899b964", "b59cb7b1",
    ],
    [T.mandays]: [
      "7222fc34", "15c930ca", "3666cb40", "4739020e", "d880ba73", "3c49f4cc", "231f3531", "f7003620",
      "5d123b60",
      "b5ad1221", "3642635e", "7aa1fd92", "09c66206",
      "f4dc3171", "b549a085", "82a5a41c", "7f2dc711", "be519644", "f45d87c8",
    ],
    [T.equivalent]: [
      "351a3f44", "ae63af8f", "12a70acf", "ab603946",
      "ccf90f28", "000dbc49", "556f3dbc", "01a4d88e", "0581845e", "886f341e", "f9c07d1a", "ac52db25",
      "3890309f", "3838d03d", "f4845409", "984f351a", "8e4a5029", "fd3738b1", "776f50b5", "7c044045",
      "c5502d34", "38e0695b",
    ],
    [T.pipes]: [
      // net rate
      "f3d4175f", "99e3c85c", "ada224b2", "78410510", "3207e654", "33f2219e", "8d0ba506", "f9e27559",
      "5f64543a", "3c03175e", "53af8837", "bbcc9a15", "447becb3", "c3b037a1", "22a3bed1", "d4edc48f",
      "513d9322", "e921501d", "c35b495d",
      // leaks
      "d5a1e7b7", "ffe7a362", "bfb0fd53",
      // speed ratios and unknown times
      "72dd9bc7", "174a4973", "82628662", "a16964f4", "ed6f2928", "51d0ccca", "1f79f7ab", "54bac514",
      "b1b2f819",
      // opened or closed partway, and alternate hours
      "4c5bd72f", "2a297ea0", "2e7f1975", "eca747c2", "34abbbc1", "fd8042b5", "e853fc00", "f127b8fe",
      "db4dd88c", "fb0e0269", "dfac1325", "b2bd5765", "6d2e6556", "dcf5e1c9", "2bd1cc10", "772f954d",
      "8674915d", "456d37c6", "f79c43f8", "b9e45bb1", "b7e35153",
    ],
  },
  expected: {
    [T.rates]: 52,
    [T.efficiency]: 13,
    [T.joining]: 21,
    [T.alternate]: 19,
    [T.mandays]: 19,
    [T.equivalent]: 22,
    [T.pipes]: 52,
  },
  total: 198,
};

export default plan;
