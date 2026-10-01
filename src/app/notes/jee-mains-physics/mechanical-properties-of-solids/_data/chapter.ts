import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_SOLID_CHAPTER: ChapterNote = {
  chapterName: "Mechanical Properties of Solids",
  title: "Mechanical Properties of Solids — JEE Mains Physics",
  intro:
    "Mechanical Properties of Solids has 78 past-year questions from 2021 to 2026, and 33 of them ask for a number rather than an option. " +
    "Most rest on one relation, ΔL = FL/(AY), and on its versions for volume and shape, so the work is finding the tension a wire really carries and seeing which length, area or modulus the question has changed. " +
    "Marks are lost on units (mm² and cm² against m²), on a diameter used as a radius, on giving a wire pulled from both ends twice its tension, and on testing only the upper wire of a stack for breaking.",
  subtopicOrder: [
    "jph-solid-young",
    "jph-solid-loaded",
    "jph-solid-moduli",
    "jph-solid-energy",
  ],
};
