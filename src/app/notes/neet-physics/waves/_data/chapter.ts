import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_WV_CHAPTER: ChapterNote = {
  chapterName: "Waves",
  title: "Waves: NEET Physics",
  intro:
    "Waves has 6 past-year questions in NEET Physics, from 2022 to 2026: 2 EASY and 4 MODERATE. " +
    "Six of the eight papers asked it once each; NEET 2021 and NEET 2024 did not. " +
    "Half the questions read a travelling wave: its frequency or the phase difference between two points from its equation, and its speed on a string when the tension changes. The other half are about pipes: open against closed, a pipe dipped into water, and counting the nodes of a harmonic. " +
    "Each needs one formula and a line or two of working, so marks are lost on small slips: a phase difference taken with metres and centimetres mixed, a closed pipe given even harmonics, or a speed scaled with the tension instead of its square root. " +
    "Work through the pages in order, from the travelling wave to the standing waves in pipes.",
  cardBlurb:
    "The travelling wave equation, wavelength, frequency, speed and phase difference, wave speed on a string and in a gas, standing waves, harmonics of strings and pipes, and counting nodes and antinodes.",
  subtopicOrder: ["nph-wv-travelling", "nph-wv-standing"],
};
