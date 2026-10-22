/**
 * Reshape plan: SPI "Atomic Structure and Periodic Classification" (12 q), for scripts/spi/reshape.ts.
 *
 * Read all 12 stems and solutions (2026-10-22). The ingest filed them under 12 one-off subtopics.
 * Cut here into two pages: what is inside the atom (models, atomic and mass number, isobars, electrons
 * and ions), then the periodic table built on it (Newlands, periods and shells, groups and valency,
 * trends). No key is disputed. 54e813a6 (Ga as the most metallic) is not featured: Be against Ga is
 * not settled by the simple trends alone.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  atom: "Structure of the Atom",
  table: "The Periodic Table and Its Trends",
} as const;

const plan: ReshapePlan = {
  chapter: "Atomic Structure and Periodic Classification",
  order: [T.atom, T.table],
  byPrefix: {
    [T.atom]: ["a717d7d1", "39b51dc5", "1ce628f5", "aaf00e96", "a2219817"],
    [T.table]: ["0152acbe", "267f4d34", "b02d4059", "f01c46f4", "9716eaeb", "aaa4a62f", "54e813a6"],
  },
  expected: {
    [T.atom]: 5,
    [T.table]: 7,
  },
  total: 12,
};

export default plan;
