import type { ChapterNote } from "@/app/notes/_types";

export const SSC_CODING_DECODING_CHAPTER: ChapterNote = {
  chapterName: "Coding-Decoding",
  title: "Coding-Decoding: SSC CGL Reasoning",
  intro:
    "Coding-Decoding has 247 questions in the SSC CGL Tier I bank, and 95 of them come from the 2025 shifts. " +
    "Most are quick: 163 are EASY and only 5 HARD, so at about 36 seconds a question the marks go to a fixed method rather than to insight. " +
    "Start every question the same way: write the example word above its code and ask what changed, the letters themselves or only their places. " +
    "Know the alphabet positions by heart (EJOTY, and opposite letters adding to 27), because nearly every rule is counted on them. " +
    "The marks are lost in three places: a shift that runs past Z without wrapping round, a reversal not undone before the gaps are counted, and a rule tested on one example when two are printed.",
  cardBlurb:
    "Letter shifts, reversals and opposite letters, letters as numbers and sums, shuffled digit codes, and coded sentences.",
  subtopicOrder: [
    "ssc-rcd-shifts",
    "ssc-rcd-reversal",
    "ssc-rcd-values",
    "ssc-rcd-symbols",
    "ssc-rcd-sentences",
  ],
};
