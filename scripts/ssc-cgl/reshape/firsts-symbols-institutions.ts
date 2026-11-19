/**
 * Reshape plan: SSC CGL Tier I Static GK "Firsts, Symbols and Institutions" (23 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 23 rows (2026-11-19, draft agent S2). The move filed them under four subtopics, one of them
 * ("National Symbols") a single row. A short chapter, cut into two pages: firsts in India with famous people
 * and their titles; and Indian academies and institutes with the global groupings and indices SSC asks.
 * Never featured: 866037d7 (SSC printed it in Hindi only) and 003836b3 (SSC's key names IPCL, 1969, but
 * the private NOCIL at Thane, 1961, is also called India's first petrochemical company).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  people: "Firsts and Famous Personalities",
  institutions: "Institutions, Organisations and Headquarters",
} as const;

const plan: ReshapePlan = {
  subject: "Static GK",
  chapter: "Firsts, Symbols and Institutions",
  order: [T.people, T.institutions],
  byPrefix: {
    [T.people]: [
      "003836b3", "cc981209", "7323b247", "052bf1a5", "69c1ed58", "0e32604c", "c9eefd17", "eaf01501",
      "9d0deb5d", "866037d7",
    ],
    [T.institutions]: [
      "203589f0", "9b4c9313", "45d1c2c4", "5f6e3777", "7a6ac89f", "e19b5cd6", "f0db333f", "5e618ecf",
      "bb12c0ce", "c70599a9", "1151c4b6", "c60325cb", "fa51ae92",
    ],
  },
  expected: {
    [T.people]: 10,
    [T.institutions]: 13,
  },
  total: 23,
};

export default plan;
