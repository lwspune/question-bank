/**
 * Reshape plan: SSC CGL Tier I Reasoning "Statement-Based Reasoning" (65 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 65 rows (2026-10-23, main session), all from the 2025 shifts. The ingest's three subtopics are
 * already the three teaching pages, so nothing moves. Most keys here are judgement calls taken from SSC.
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Statement-Based Reasoning",
  order: ["Statement and Conclusions", "Statement and Assumptions", "Cause, Effect and Courses of Action"],
  byPrefix: {
    "Statement and Conclusions": [
      "7ea0eec7", "cdd66ebd", "c3e75f4c", "6fc3460b", "2d62a7cb", "45db124b", "46086b66", "6e2019be",
      "e79fdcd7", "63f41291", "58b93699", "39090057", "e0a83b36", "3d7bf662", "86837838", "411b08a2",
      "85d1b5ec", "583f2255", "ffe47fd5", "d03d5a40", "d849e47c", "747c5038", "b49a2742", "6de841f9",
      "66086318", "e30e2331", "27854a9e", "232a812b", "43c05c0c",
    ],
    "Statement and Assumptions": [
      "6ecf9610", "53d63342", "dd293132", "7616049b", "62e05d31", "b96ae855", "d7555696", "0ba02981",
      "fd55f183", "12fb523d", "3fa17804", "0ac1d10f", "63da5083", "b7b865bd", "15575b63", "b85e61b0",
      "a414fa04", "6b25f583",
    ],
    "Cause, Effect and Courses of Action": [
      "a087bd7f", "eca6d96e", "cf90ac5d", "09e212aa", "26d2856e", "2f66eacf", "dc863d6b", "74a8fa02",
      "9283c63f", "de1b1a10", "11b3fa8c", "f970ec14", "8063393e", "75b0ee49", "7cfa1731", "207a6c7f",
      "bcb3fb03", "3f985716",
    ],
  },
  expected: {"Statement and Conclusions": 29, "Statement and Assumptions": 18, "Cause, Effect and Courses of Action": 18},
  total: 65,
};

export default plan;
