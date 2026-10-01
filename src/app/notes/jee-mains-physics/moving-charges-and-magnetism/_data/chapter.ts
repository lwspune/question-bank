import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_MAG_CHAPTER: ChapterNote = {
  chapterName: "Moving Charges and Magnetism",
  title: "Moving Charges and Magnetism — JEE Mains Physics",
  intro:
    "Moving Charges and Magnetism has 172 past-year questions from 2021 to 2026, and 49 of them ask for a number rather than an option. " +
    "About two in five find the field that a current makes; most of the rest find the force a field puts on a moving charge or on a wire, and the last part turns the torque on a coil into a meter. " +
    "Every field question is a sum of a few standard results, so knowing those by heart saves the most time. " +
    "Marks are lost on a direction or a factor: μ₀I/2πd used for a wire that ends at the point, an angle measured from the plane of a coil instead of its axis, an electron's force left with the sign of a proton's, or turns per centimetre never turned into turns per metre.",
  subtopicOrder: [
    "jph-mag-wires",
    "jph-mag-loops",
    "jph-mag-ampere",
    "jph-mag-lorentz",
    "jph-mag-circular",
    "jph-mag-currents",
    "jph-mag-galvanometer",
  ],
};
