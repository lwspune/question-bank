/**
 * Reshape plan: Homi Bhabha Std IX "Information and Communication Technology" (11 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 11 stems and solutions. The ingest filed them under four subtopics; cut here by what a
 * question asks: the machine itself (generations of computers, chip size, RAM and storage), then
 * what runs on and between machines (Unicode, spreadsheet data entry, networks by size, India's
 * satellites and their uses). Never featured (carries a notice): d5072deb (the expected chip width
 * depends on the setter's source).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  hardware: "Computer Generations and Memory",
  networks: "Software, Networks and Satellites",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Information and Communication Technology",
  order: [T.hardware, T.networks],
  byPrefix: {
    [T.hardware]: ["6c2292f4", "c9bdf118", "d5072deb", "99026eef", "8f330729"],
    [T.networks]: ["1071c66f", "89e2e0fd", "25fce0a2", "a8d819cd", "901830d9", "16b92f79"],
  },
  expected: { [T.hardware]: 5, [T.networks]: 6 },
  total: 11,
};

export default plan;
