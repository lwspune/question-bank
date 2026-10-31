/**
 * Reshape plan: SSC CGL Tier I General Awareness Polity "Indian Constitution" (89 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 89 rows (2026-10-31, main session). The ingest's biggest subtopic, Federal Structure (38), mixed the
 * three Lists, the councils and commissions, and Union-State finance, and the 2025 shifts asked about all three.
 * Cut here: making and features; amendments; Centre-State relations; Centre-State finance and GST; emergency
 * provisions. Never featured: 459f6865 (its solution opens with a Note) and 38bdad01 (a statement the key reads
 * loosely).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  making: "Making and Features of the Constitution",
  amendments: "Constitutional Amendments",
  relations: "Centre-State Relations",
  finance: "Centre-State Finance and GST",
  emergency: "Emergency Provisions",
} as const;

const plan: ReshapePlan = {
  subject: "Polity",
  chapter: "Indian Constitution — Making, Foundation and Amendments",
  order: [T.making, T.amendments, T.relations, T.finance, T.emergency],
  byPrefix: {
    [T.making]: [
      "f6b31d5b", "59e2fbbf", "8da6aa59", "c4269f82", "ebf46b6e", "0d8c756b", "0f731a77", "82a76601",
      "9e2a2d43", "ce1fd651", "14dfc318", "5e7359c9", "332940a8", "64ad5354", "6b22e504", "7925e11e",
      "cc24893c", "4a1aa5a0", "91a86923", "df487f0a", "eb432cd1", "8e17e5c6", "ad4e54dd", "25c02899",
      "cd52098d",
    ],
    [T.amendments]: [
      "896dfb2a", "9f75b213", "c9b412b8", "d95eb258", "6aa86b10", "0533d368", "741b389f", "b608051a",
      "50e5807f", "8e274e5d", "ca6bc70c", "c15a5806", "d69d2f5c", "4c85af1f", "6d756893",
    ],
    [T.relations]: [
      "ff254437", "dcd5472d", "8eb0a762", "e3dd0aab", "50e25c9d", "14b166e8", "495fc0b3", "91b4fea2",
      "98f3e597", "995d2817", "eee38bb4", "e2ce0254", "6bfd3b37", "459f6865", "38bdad01", "fa4deb28",
      "aa6ce5f1", "014b67ab", "0a283dbe", "2f23e2b1", "5d955c65", "5ddfd299", "a5383313", "aa699610",
      "b47d06cf", "c85a954a", "0b1d1dbb", "7fb959df",
    ],
    [T.finance]: [
      "0073a065", "2731dc3f", "33171c76", "3b4aab64", "490f8512", "07af71e8", "51d96150", "9b83c9a9",
      "b483ab73", "d2d376c3", "d9ebad47",
    ],
    [T.emergency]: [
      "f972e3fd", "84d244c8", "cabadee6", "33edad1a", "7300b266", "7eed06ae", "d2072f1a", "1846f7c6",
      "68c88f5f", "73e005d9",
    ],
  },
  expected: {
    [T.making]: 25,
    [T.amendments]: 15,
    [T.relations]: 28,
    [T.finance]: 11,
    [T.emergency]: 10,
  },
  total: 89,
};

export default plan;
