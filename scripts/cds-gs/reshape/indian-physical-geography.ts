/**
 * Reshape plan: CDS GK Geography "Indian Geography — Physical Features" (103 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 103 stems AND solutions (2026-10-22). The ingest's six catalogue subtopics are kept
 * in spirit but cut in the order NCERT teaches India (location, relief, drainage, climate, soils,
 * vegetation). Two buckets each held two different ideas, so they are split: "Indian States and
 * Islands" gives up its island and sea-channel rows (plus the Ten Degree Channel row filed under
 * Location) to an Islands page, and the rest joins Location as one page on states and borders;
 * "Rivers, Lakes and Water Bodies" gives its lakes, waterfalls and the rainwater-harvesting row
 * to a Lakes page; "Soils and Climate-Agriculture" gives its monsoon and rainfall rows to a
 * Climate page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  location: "Location, States and Borders",
  islands: "Islands and Sea Channels",
  relief: "Mountains, Plateaus and Plains",
  rivers: "River Systems",
  lakes: "Lakes and Waterfalls",
  climate: "Monsoon and Rainfall",
  soils: "Soils of India",
  forests: "Forests and Protected Areas",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Indian Geography — Physical Features",
  order: [T.location, T.islands, T.relief, T.rivers, T.lakes, T.climate, T.soils, T.forests],
  whole: {
    "Location, Extent and Frontiers of India": T.location,
    "Indian States and Islands": T.location,
    "Mountains, Plateaus and Plains of India": T.relief,
    "Indian Rivers, Lakes and Water Bodies": T.rivers,
    "Indian Soils and Climate-Agriculture": T.soils,
    "Forests and Natural Vegetation of India": T.forests,
  },
  byPrefix: {
    // Sea channels, Andaman and Nicobar peaks and tribes, the smallest UT (Lakshadweep).
    [T.islands]: [
      "ce63789f", "63dbd88d", "d4e48b6e", "41d1f3dc", "e5085c76",
      "d57230a4", "ce830696", "8cb8b4d7", "437041dd",
    ],
    // Lakes by type and state, waterfalls, the glacial lake, urban rainwater harvesting.
    [T.lakes]: [
      "7fc408fd", "5b2ffba9", "a56b014d", "cff4ee2e", "9a89e339", "bb34eb27",
      "3261e86c", "17f30fc5", "861a4a33", "7998c0c4", "99db92ff", "a13e2c7a",
    ],
    // Rain shadow, the north-east monsoon, both branches, driest place, January isotherm, drought.
    [T.climate]: ["411c29f2", "ef1fcdf9", "9086d685", "aa359d0a", "a070ab4e", "b03062a8", "5cb7d7c4"],
  },
  expected: {
    [T.location]: 16,
    [T.islands]: 9,
    [T.relief]: 16,
    [T.rivers]: 20,
    [T.lakes]: 12,
    [T.climate]: 7,
    [T.soils]: 8,
    [T.forests]: 15,
  },
  total: 103,
};

export default plan;
