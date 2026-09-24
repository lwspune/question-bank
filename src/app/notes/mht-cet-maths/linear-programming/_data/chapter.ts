import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_LPP_CHAPTER: ChapterNote = {
  chapterName: "Linear Programming",
  title: "Linear Programming — MHT-CET Maths",
  intro:
    "Linear Programming is the cheapest chapter in MHT-CET Maths and one question a paper: barely one in twenty of its past-year questions is HARD, and the " +
    "method never changes. Draw each boundary line, pick the correct side with a test point, take the intersection, list the corner points, and evaluate the " +
    "objective at each corner — the optimum of a linear function over a polygon always sits at a corner, so there is nothing to search. The pages below " +
    "follow that order. The only place difficulty appears is the figure questions, where a shaded region is given and the constraints must be read off it; " +
    "both HARD questions in the chapter are of that kind, and they are answered by testing one point inside the region against one line at a time. The last " +
    "page collects the word-problem formulations and the single trick worth knowing — when the objective is parallel to an edge, the optimum is a whole " +
    "segment, so 'infinitely many solutions' is a real answer. Every PYQ is tagged.",
  cardBlurb:
    "The cheapest MHT-CET Maths chapter — half-plane tests, reading constraints off a figure, the corner-point method and the infinitely-many-optima case, with every past-year question tagged.",
  subtopicOrder: [
    "cetlpp-feasible-region",
    "cetlpp-reading-constraints",
    "cetlpp-corner-point-method",
    "cetlpp-formulation-and-special-cases",
  ],
};
