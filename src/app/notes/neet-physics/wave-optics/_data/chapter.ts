import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_WO_CHAPTER: ChapterNote = {
  chapterName: "Wave Optics",
  title: "Wave Optics: NEET Physics",
  intro:
    "Wave Optics has 11 past-year questions in NEET Physics, from 2022 to 2026: 4 EASY and 7 MODERATE. " +
    "Six of the eight papers asked it, one to three times each; NEET 2021 and Re-NEET 2026 did not. " +
    "Only one of the eleven comes with a figure, so the work is in knowing the ideas, not in reading a diagram. " +
    "Nearly every question rests on one short relation: the fringe width λD/d, the intensity of two overlapping waves, Malus' law or Brewster's law. " +
    "Marks are lost on small slips: the half lost at the first polaroid forgotten, a cosine used where a cosine squared belongs, or the angular fringe width made to depend on the screen distance. " +
    "Work through the pages in order, from wavefronts to polarisation.",
  cardBlurb:
    "Wavefronts and Huygens' principle, coherent sources and the intensity of two overlapping waves, Young's double slit fringes, single slit diffraction, and polarisation by polaroids and by reflection.",
  subtopicOrder: ["nph-wo-wavefronts", "nph-wo-ydse", "nph-wo-polarisation"],
};
