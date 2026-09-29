/**
 * Reshape plan — CDS "Time, Speed and Distance" (75 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 75 stems AND solutions (2026-09-29). The subtopic named after the chapter (35) held
 * three techniques: average speed over legs (the harmonic mean) with the speed-ratio ↔ time-ratio
 * rule; equations built from a change in speed ('5 km/hr faster, 2 hours less'); and relative
 * speed between two movers (chasing and meeting). "Trains and Relative Speed" (23) also held
 * pure meeting problems with no train length; those join the relative-speed page, leaving the
 * trains page for crossings that use lengths. The premise set 03667ff3/9861368d/ff2cff23 stays
 * together on the relative-speed page. Boats, races and clocks keep their pages.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  average: "Average Speed and Speed–Time Ratios",
  equations: "Speed Changes and Equations",
  relative: "Relative Speed: Chasing and Meeting",
  trains: "Trains and Relative Speed",
  boats: "Boats and Streams",
  races: "Races",
  clocks: "Clocks and Angles",
} as const;

const plan: ReshapePlan = {
  chapter: "Time, Speed and Distance",
  order: [T.average, T.equations, T.relative, T.trains, T.boats, T.races, T.clocks],
  whole: {},
  byPrefix: {
    [T.average]: [
      "080be6e4", "1217f8e7", "78191912", "3d1e060b", "93a4243b", "9d710377", "adce0650", "240927c1",
      "a934ae08", "7b9e747f", "60fa28c4", "03f850b6", "c85eccb9", "19ea5fc1", "2fb5d6ab", "919b5060",
      "71196371", "35199655", "da2d9420", "de757249", "4a612b59", "f8194d25",
    ],
    [T.equations]: ["453d8822", "134a1e65", "6afa9cdb", "d3eeaa63", "e5983f2f", "f5acf38e", "691a1fe2", "264f87b2", "46cb82ac"],
    [T.relative]: [
      "7e5e87c0", "bc96cce3", "0693d452", "58066acc", "418a7b1d", "f6d5054e", "3a617885", "97dec004",
      "6cca1ead", "970d9ac3", "03667ff3", "9861368d", "ff2cff23",
    ],
    [T.trains]: [
      "1df70df1", "b20268de", "7e906d0c", "b510f00d", "89fcd198", "74f50a6c", "5f23814a", "ac6816eb",
      "08746a6c", "39fcd654", "ad313250", "895bb9fc", "ab8d9f3a", "603d3b29",
    ],
    [T.boats]: ["88ab4977", "e1e1f7d5", "01826fa7", "0e2a8d0b", "3a1526fd", "375a40a9", "812474ba"],
    [T.races]: ["3958338e", "94c13fde", "70113ad8", "22ba0b00", "1e7357ef"],
    [T.clocks]: ["5aa06716", "99c00b08", "e52ffa35", "7dff968b", "9d9a0f7d"],
  },
  expected: {
    [T.average]: 22,
    [T.equations]: 9,
    [T.relative]: 13,
    [T.trains]: 14,
    [T.boats]: 7,
    [T.races]: 5,
    [T.clocks]: 5,
  },
  total: 75,
};

export default plan;
