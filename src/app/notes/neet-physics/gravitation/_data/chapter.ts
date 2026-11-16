import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_GR_CHAPTER: ChapterNote = {
  chapterName: "Gravitation",
  title: "Gravitation: NEET Physics",
  intro:
    "Gravitation has 15 past-year questions in NEET Physics, from 2021 to 2026: 5 EASY, 6 MODERATE and 4 HARD. " +
    "Every one of the eight papers asked it, two questions each except NEET 2026 with one. " +
    "Escape speed is the idea asked most: three questions want the escape speed of another planet and a fourth asks how high a slower launch rises. " +
    "Nearly every question is a ratio, so the skill is to write the formula, see how it depends on M, R or r, and scale. " +
    "Marks are lost on small slips: a height used where the distance from the centre is needed, a square root forgotten, or grams left unconverted. " +
    "Work through the pages in order, from the pull between two masses to the energy of a satellite.",
  cardBlurb:
    "Newton's law and the field, g at a height and a depth, potential energy and potential, escape speed, Kepler's laws, and the speed, period and energy of satellites.",
  subtopicOrder: ["nph-gr-field", "nph-gr-energy", "nph-gr-orbits"],
};
