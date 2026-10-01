import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_EMW_CHAPTER: ChapterNote = {
  chapterName: "Electromagnetic Waves",
  title: "Electromagnetic Waves — JEE Mains Physics",
  intro:
    "Electromagnetic Waves has 108 past-year questions from 2021 to 2026, and 14 of them ask for a number rather than an option. " +
    "It is a short chapter in which most questions need a single relation, such as E₀ = cB₀, I = ½cε₀E₀² or v = c/√(μᵣεᵣ), and then a careful cross product for a direction. " +
    "About a third are about the two fields of the wave themselves, and the spectrum questions are pure recall of order, sources and uses. " +
    "Marks are lost on factors and directions: B written as cE instead of E/c, the average energy split wrongly between the two fields, a mirror given I/c instead of 2I/c, or the cross product taken in the wrong order.",
  subtopicOrder: [
    "jph-emw-maxwell",
    "jph-emw-fields",
    "jph-emw-energy",
    "jph-emw-spectrum",
  ],
};
