/**
 * Reshape plan: SPI "World Polity, Democracy and International Relations" (11 q), for scripts/spi/reshape.ts.
 *
 * Read all 11 stems and solutions (2026-10-22). Too few for more than one page: the State and the
 * forms of government, party systems, what a party is and does (NCERT Class 10 Political Parties),
 * and India's parties. Never featured: fdc13ca7 (UPA member since 2004: the INC and the NCP both fit;
 * the solution carries a Note) and 51254e7c (options B and D both describe a one-party system).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  parties: "Forms of Government and Political Parties",
} as const;

const plan: ReshapePlan = {
  chapter: "World Polity, Democracy and International Relations",
  order: [T.parties],
  byPrefix: {
    [T.parties]: [
      "73626005", "ebf4b28e", "5bd2d432", "224490b3", "51254e7c", "89a4e480", "bff040a4", "2390144c",
      "2828d5e9", "04463ddf", "fdc13ca7",
    ],
  },
  // Repeats of bank rows, skipped at commit by content_hash: 224490b3 (two-party system) and
  // 2390144c (lack of internal democracy).
  extra: { "mock-5#145": T.parties, "mock-6#145": T.parties },
  expected: {
    [T.parties]: 11,
  },
  total: 11,
};

export default plan;
