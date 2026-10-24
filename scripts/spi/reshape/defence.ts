/**
 * Reshape plan: SPI "Defence and Armed Forces" (21 q), for scripts/spi/reshape.ts.
 *
 * Read all 21 stems and solutions (2026-10-22). Three pages: ranks (equivalents across the three
 * services and the order within one), command and history (supreme command, the CDS, chiefs in the
 * wars, operations, days, mottos and firsts), and equipment (aircraft, carriers, missiles). No row is
 * flawed. 015d47cb ("the fastest supersonic cruise missile in the world") is a time-bound claim: the
 * page teaches it "as asked in the paper", never as a fact of today.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ranks: "Ranks and Equivalent Ranks",
  command: "Command, Wars and Traditions",
  equipment: "Aircraft, Ships and Missiles",
} as const;

const plan: ReshapePlan = {
  chapter: "Defence and Armed Forces",
  order: [T.ranks, T.command, T.equipment],
  byPrefix: {
    [T.ranks]: [
      "0ccb4b23", "459abefa", "d249d8c9", "fbc13ef4", "c0d7ac77", "5fd8f282", "b5764828", "32159ffa",
    ],
    [T.command]: [
      "792d2b27", "4c482d2f", "9f0bed42", "f1d94260", "c66ba519", "efda07bd", "4fd01e51", "52c04029",
    ],
    [T.equipment]: ["c4d50c5d", "1a9576f4", "03b75ace", "967422ee", "015d47cb"],
  },
  // Repeats of bank rows, skipped at commit by content_hash: b5764828 (head of the Army, x2),
  // 459abefa (Colonel = Group Captain, x2), d249d8c9 (Colonel = Captain), 32159ffa (Arjan Singh),
  // c0d7ac77 (lowest IAF rank), 9f0bed42 (1965 chief), 52c04029 (first woman Air Marshal),
  // c66ba519 (Meghdoot), 4fd01e51 (Navy motto), c4d50c5d and 1a9576f4 (Tejas).
  extra: {
    "mock-2#150": T.ranks,
    "mock-3#148": T.ranks,
    "mock-4#148": T.ranks,
    "mock-4#150": T.equipment,
    "mock-5#146": T.ranks,
    "mock-5#147": T.ranks,
    "mock-5#148": T.command,
    "mock-5#150": T.ranks,
    "mock-6#146": T.command,
    "mock-6#147": T.equipment,
    "mock-6#148": T.command,
    "mock-6#149": T.command,
    "mock-6#150": T.ranks,
  },
  expected: {
    [T.ranks]: 8,
    [T.command]: 8,
    [T.equipment]: 5,
  },
  total: 21,
};

export default plan;
