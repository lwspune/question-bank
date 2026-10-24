/**
 * Reshape plan: SPI "Government Structure — Parliament, Judiciary and Constitutional Bodies" (8 q),
 * for scripts/spi/reshape.ts.
 *
 * Read all 8 stems and solutions (2026-10-22). Too few for more than one page: the organs and levels
 * of government, Parliament and the state legislature (money bill, minimum ages), and elections (the
 * Election Commission, party recognition, affidavits, defection). No row is flawed; 0b13210e keys
 * "None of these" correctly (the rule is 6% in four states).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  parliament: "Organs of Government, Parliament and Elections",
} as const;

const plan: ReshapePlan = {
  chapter: "Government Structure — Parliament, Judiciary and Constitutional Bodies",
  order: [T.parliament],
  byPrefix: {
    [T.parliament]: [
      "4bb932a8", "b9135251", "5e54a269", "c9a77a9b", "73834d7a", "0b13210e", "eab9a45d", "724aba1b",
    ],
  },
  expected: {
    [T.parliament]: 8,
  },
  total: 8,
};

export default plan;
