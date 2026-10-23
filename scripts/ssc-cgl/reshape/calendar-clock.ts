/**
 * Reshape plan: SSC CGL Tier I Reasoning "Calendar and Clock" (9 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 9 stems and solutions (2026-10-23). Five come from the 2023 shifts, four from 2025, and all
 * nine are calendar questions: the bank holds no clock question in this chapter. One page, "Calendar",
 * the ingest's own subtopic: counting dates forward and back, the day of the week after a number of
 * days (odd days, month lengths), and odd days in a year with the leap-year rule. Nothing is flawed;
 * every key checks.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  calendar: "Calendar",
} as const;

const plan: ReshapePlan = {
  chapter: "Calendar and Clock",
  subject: "Reasoning",
  order: [T.calendar],
  byPrefix: {
    [T.calendar]: [
      "8f60ff76", "ff92056a", "23653a24",
      "613de3c9", "2861f013", "84604dbc",
      "33fb56c2", "2525500d", "8dfdd6b9",
    ],
  },
  expected: {
    [T.calendar]: 9,
  },
  total: 9,
};

export default plan;
