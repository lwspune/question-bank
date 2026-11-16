import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_LM_CHAPTER: ChapterNote = {
  chapterName: "Laws of Motion",
  title: "Laws of Motion: NEET Physics",
  intro:
    "Laws of Motion has 12 past-year questions in NEET Physics, from 2021 to 2026: 7 EASY and 5 MODERATE, none HARD. " +
    "Seven of the eight papers asked it, once or twice each; only NEET 2022 did not. " +
    "Most need one law and two lines of arithmetic: the impulse on a ball that bounces, the largest acceleration before a box slips, the tension when a bob spins faster, the angle of a banked road. " +
    "Marks are lost on small slips: a bounce's change in velocity taken without its sign, the whole push given to the front block, or a ratio of times not squared. " +
    "Work through the pages in order, from Newton's laws to the forces that keep a body moving in a circle.",
  cardBlurb:
    "Newton's three laws, impulse and conservation of momentum, connected blocks and pulleys, static and kinetic friction, inclined planes, centripetal force and banked roads.",
  subtopicOrder: ["nph-lm-newton", "nph-lm-friction", "nph-lm-circular"],
};
