/**
 * Reshape plan: SPI "Indian Geography — Economy, Resources and Transport" (30 q), for scripts/spi/reshape.ts.
 *
 * Read all 30 stems and solutions (2026-10-22). The ingest filed them under 23 one-off subtopics.
 * All are NCERT Class 8 and Class 10 economic-geography recall, cut here in the Class 10 book's order:
 * resources and soils, then crops, then minerals and energy, then manufacturing industries. No row is
 * about transport, despite the chapter name. Never featured: ef229122 (no option is strictly right:
 * Tata Steel was planned by Jamsetji Tata and set up by Dorabji Tata, the key takes J.R.D. Tata).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  resources: "Resources, Conservation and Soils",
  crops: "Crops and Farming",
  minerals: "Minerals and Energy",
  industries: "Manufacturing Industries",
} as const;

const plan: ReshapePlan = {
  chapter: "Indian Geography — Economy, Resources and Transport",
  order: [T.resources, T.crops, T.minerals, T.industries],
  byPrefix: {
    [T.resources]: ["dd9bf1c1", "cdb731ec", "988068c0", "953760cc", "12000e00"],
    [T.crops]: ["267539d0", "c5d8b672", "cba67d67", "9181dee3", "bec9f438", "45e863f6"],
    [T.minerals]: [
      "212fa376", "2cb59967", "a5c77017", "30613926", "cb5478e2", "0d63e77c", "b032ad13", "78a5db28",
      "f79ea12a", "6f84c268",
    ],
    [T.industries]: [
      "e151d73b", "ef229122", "1ee02dfc", "1018f7a7", "fd95988e", "d1d945dc", "d1404902", "fd7b7703",
      "5628fb4b",
    ],
  },
  expected: {
    [T.resources]: 5,
    [T.crops]: 6,
    [T.minerals]: 10,
    [T.industries]: 9,
  },
  total: 30,
};

export default plan;
