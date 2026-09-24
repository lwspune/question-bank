import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_KINETICS_CHAPTER: ChapterNote = {
  chapterName: "Chemical Kinetics",
  title: "Chemical Kinetics — MHT-CET Chemistry",
  intro:
    "Chemical Kinetics is three questions a paper in MHT-CET Chemistry and, with barely one in thirty of its past-year questions HARD, one of the cheapest " +
    "chapters on the paper. It runs on four equations: the rate expression that ties one species' rate to another's through the stoichiometric " +
    "coefficients, the rate law with its order, the zero-order and first-order integrated laws with their half-lives, and the Arrhenius equation in its " +
    "two-temperature form. The recall list is short too: order against molecularity, intermediates and the rate-determining step, the slopes and intercepts " +
    "of the standard plots. The pages below follow that order, because each page's formula is the previous page's rate law integrated or differentiated once. " +
    "The first-order page is the largest by far and the one to drill until k = 0.693/t½ and k = (2.303/t) log([A]₀/[A]) are automatic. Every PYQ is tagged.",
  cardBlurb:
    "Rate expressions, rate law and order, zero- and first-order integrated laws with half-lives, mechanisms and the Arrhenius equation — MHT-CET Chemical Kinetics with every past-year question tagged.",
  subtopicOrder: [
    "cetkin-rate-and-stoichiometry",
    "cetkin-rate-law-and-order",
    "cetkin-zero-order",
    "cetkin-first-order",
    "cetkin-mechanism",
    "cetkin-arrhenius",
  ],
};
