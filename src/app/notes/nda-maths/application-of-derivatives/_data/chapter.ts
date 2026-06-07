import type { ChapterNote } from "@/app/notes/_types";

export const APPLICATION_OF_DERIVATIVES_CHAPTER: ChapterNote = {
  chapterName: "Application of Derivatives",
  title: "Application of Derivatives — NDA Mathematics",
  intro:
    "Application of Derivatives is around 73 past-year NDA questions and the pay-off of Differentiation: " +
    "once you can differentiate, the derivative tells you slopes, rates, where a function rises or falls, " +
    "and where it peaks. Work the three notes in order — first tangents, rates of change, and small-change " +
    "approximations; then monotonicity and the maxima/minima tests; then optimisation word problems. The " +
    "single biggest time-saver is recognising when AM-GM beats calculus for a max/min, and the recurring " +
    "trap is forgetting to check endpoints (or open-interval behaviour) when hunting the absolute extremum.",
  subtopicOrder: [
    "aod-tangents",
    "aod-monotonicity-extrema",
    "aod-optimisation",
  ],
};
