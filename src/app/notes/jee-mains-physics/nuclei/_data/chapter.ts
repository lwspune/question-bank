import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_NUC_CHAPTER: ChapterNote = {
  chapterName: "Nuclei",
  title: "Nuclei — JEE Mains Physics",
  intro:
    "Nuclei has 97 past-year questions from 2021 to 2026, and 23 of them ask for a number rather than an option. " +
    "The nuclear radius, binding energy from a mass defect and the energy a reaction releases account for 53 of them, including all 13 from 2026. " +
    "Radioactivity was cut from the syllabus in 2023-24, and the bank shows it: of the 44 questions on decay modes, half-lives and decay constants, only four come after 2023 and none from 2026, so those pages serve older papers more than the next one. " +
    "Marks are lost on bookkeeping: a binding energy per nucleon not multiplied by A, the alpha's recoil share forgotten, or the fraction decayed read as the fraction left.",
  subtopicOrder: [
    "jph-nuc-structure",
    "jph-nuc-qvalue",
    "jph-nuc-halflife",
    "jph-nuc-activity",
  ],
};
