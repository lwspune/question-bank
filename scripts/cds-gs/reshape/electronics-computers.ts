/**
 * Reshape plan: CDS GK Physics "Electronics and Computer Fundamentals" (23 q), for
 * scripts/cds-gs/reshape.ts.
 *
 * Read all 23 stems AND solutions (2026-10-23). Two teaching pages: the machine first
 * (the transistor, computer generations and new kinds of computing, memory and file sizes,
 * binary numbers and logic), then what runs on it and how machines talk (system and
 * application software, programming and markup languages, networks and security).
 *
 * The ingest filed 20 of the 23 rows under one catch-all "Computer Hardware, Software and
 * Networking"; the six about the machine and its data move to the first page by prefix.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  hardware: "Electronics, Hardware and Data",
  software: "Software and Networks",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Electronics and Computer Fundamentals",
  order: [T.hardware, T.software],
  whole: {
    "Semiconductors, Diodes and Transistors": T.hardware,
    "Number Systems and Boolean Logic": T.hardware,
    "Computer Hardware, Software and Networking": T.software,
  },
  byPrefix: {
    // Qubit, multimedia, AI, computer generations, flash memory, MP3 file size.
    [T.hardware]: ["c2e95c68", "62796676", "a979b7f3", "127da852", "6bdde583", "d72c87ef"],
  },
  expected: { [T.hardware]: 9, [T.software]: 14 },
  total: 23,
};

export default plan;
