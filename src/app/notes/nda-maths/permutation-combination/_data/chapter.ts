import type { ChapterNote } from "@/app/notes/_types";

export const PERMUTATION_COMBINATION_CHAPTER: ChapterNote = {
  chapterName: "Permutation & Combination",
  title: "Permutation & Combination — NDA Mathematics",
  intro:
    "Permutation & Combination is around 78 past-year NDA questions and the art of counting without listing. " +
    "It rests on one decision repeated everywhere: does order matter (a permutation) or not (a combination)? " +
    "Work the five notes in order — first factorials and the binomial coefficient identities; then arrangements " +
    "(with their restrictions); then combinations; then forming numbers from digits; and finally geometric " +
    "counting. The recurring trap is double-counting or forgetting a constraint (a leading zero, a repeated " +
    "letter, three collinear points) — name the constraint first, then count.",
  subtopicOrder: [
    "pc-factorials-coefficients",
    "pc-arrangements",
    "pc-combinations",
    "pc-forming-numbers",
    "pc-geometric-counting",
  ],
};
