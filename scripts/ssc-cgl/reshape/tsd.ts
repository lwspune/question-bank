/**
 * Reshape plan: SSC CGL Tier I "Time, Speed and Distance" (155 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 155 stems and solutions (2026-10-23). The ingest filed them under six subtopics, and
 * "Relative Speed: Chasing and Meeting" (63 rows) held both straight-line chases and every circular
 * track, while "Races" held circular laps beside head starts. Cut here by the method that solves the
 * row: speed = distance over time with the unit change and fixed-time or fixed-distance ratios;
 * average speed (total over total, and the equal-distance mean); speed changes on one route (inverse
 * proportion, the time gap between two speeds, halts and rests); relative speed on a straight road
 * (closing a gap, how far each runs, a late start, moving towards each other); trains (lengths added
 * to the distance); boats and streams (half the sum and half the difference, ratios, two journeys);
 * races (beats and head starts); circular tracks (first meeting, meeting at the start, distinct
 * meeting points). Never featured: adf38b2f (counting the start as a meeting decides between two
 * printed options) and f1cef4f3 (the stem names the walker P, then A).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Speed, Time and Distance Basics",
  average: "Average Speed",
  changes: "Speed Changes and Equations",
  relative: "Relative Speed: Chasing and Meeting",
  trains: "Trains and Relative Speed",
  boats: "Boats and Streams",
  races: "Races",
  circular: "Circular Tracks",
} as const;

const plan: ReshapePlan = {
  chapter: "Time, Speed and Distance",
  order: [T.basics, T.average, T.changes, T.relative, T.trains, T.boats, T.races, T.circular],
  byPrefix: {
    [T.basics]: [
      "9d564d38", "7f4c51bb", "12acacc5", "3f4b0049", "4d6607d3", "db4c83ed",
      "1159416d", "68f77843", "2538c271", "907f326c", "0fca16e1", "9e0fd2d5", "362c2968",
      "b11daf4d", "b804fcfb", "5fc5281c", "57aa367c",
    ],
    [T.average]: [
      "e027334e", "0f355887", "93d9ccec", "321323ca", "80606786", "46c040de", "61a43aa8", "98fa4729",
      "64927d94",
      "7b7b5c89", "88c1644f", "a4fc18c7", "b414cd44", "99aae72a", "3bb44eb4", "72e7a25b", "6a31677e",
    ],
    [T.changes]: [
      "ca8a76c8", "916e5502", "676d73df", "5e49a9d8", "cec3ef77",
      "0712534f", "7b717a55", "9db52bfc", "d71cd632", "df0bdaef",
      "21352eb6", "8c40b1fe", "3a6398a7", "0d8e0580",
    ],
    [T.relative]: [
      "78f6f70f", "b3cb38ab", "a53da348", "072dd585", "fabe8dab", "e257f9b2", "5d7c4a13", "5392faf5",
      "0a4d3bcc", "8f638da9", "3a509398", "0a8fcc2e", "731ccf60",
      "439e4aed", "8a8b4033", "2f98ed75", "719f1e62", "7cb76097", "9022967c", "b7273f25", "97acd125",
      "19367733", "af461f90", "c897bbb8", "5285908c", "03468e97", "6d381b9a", "8e8382f6", "b7362f01",
      "03641ddd", "1e83cd17", "a8512e8f", "f1cef4f3", "2855fff8", "c82f285f",
      "aec7b347", "7380041c", "a6ccbeef", "2104890d", "5fbe7cec", "2a5f5118", "2c47e92a",
    ],
    [T.trains]: [
      "67dcee64", "e822e957",
      "8e12239e", "bcb6ddde", "a64fa2ff", "48d3288f", "ffbd3ba5", "05c8a02e",
    ],
    [T.boats]: [
      "9cec21d8", "b93a48db", "9be932d0", "b9db87c3", "ff6414c6", "97c3e8a0", "7ee9560b", "2e1dbce3",
      "68883cbf", "6e801b92", "0015f219", "4cbdaa82", "36e182d4",
      "4e8fe376", "6ce096a8", "06c4b953", "f55f9dc2",
      "5e49ea52", "e80a1d01", "91421d32", "b915cd40", "e9a581c3", "e595618e",
    ],
    [T.races]: [
      "1b407630", "9a5332b0", "e809653c",
      "5208e6a1", "3349cb03", "c034c3b2", "b507febb",
    ],
    [T.circular]: [
      "809b45ab", "a5a0aae3", "dde3e226", "97194214", "afce98dc", "246fbe7c", "8d6026c0", "6363fa6f",
      "dc8e3c68", "bb101392", "66ff0f83", "a66b7cc6", "06b23d0c", "afd52d99", "51074050", "3f870b66",
      "fbff8f52", "c8ce6967",
      "64ad0a31", "3dc89961", "63fb8008", "adf38b2f", "b578af2c",
      "e3e63bd9", "222c905a", "7f5b7609", "28b12be4",
    ],
  },
  expected: {
    [T.basics]: 17,
    [T.average]: 17,
    [T.changes]: 14,
    [T.relative]: 42,
    [T.trains]: 8,
    [T.boats]: 23,
    [T.races]: 7,
    [T.circular]: 27,
  },
  total: 155,
};

export default plan;
