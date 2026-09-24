import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_PAIR_OF_LINES_CHAPTER: ChapterNote = {
  chapterName: "Pair of Straight Lines",
  title: "Pair of Straight Lines — MHT-CET Maths",
  intro:
    "Pair of Straight Lines is one question a paper and one of the more expensive chapters in MHT-CET Maths: two of every five of its past-year questions are HARD, " +
    "and the difficulty is real algebra rather than a misread constraint. The whole chapter rests on one idea — the product of two linear equations is one " +
    "quadratic equation, and the quadratic's coefficients remember the two slopes: their sum is −2h/b and their product a/b. From that come the slope-ratio " +
    "conditions, the angle formula tan θ = 2√(h² − ab)/|a + b|, the bisector equation, and the determinant test that decides whether a general second-degree " +
    "equation is a pair at all. The pages below run in that order, from writing a joint equation to reading a general one; the angle page holds the most HARD " +
    "questions and the joint-equation page the cheapest ones. Every PYQ is tagged.",
  cardBlurb:
    "Joint equations, slope conditions, the angle and bisectors of a pair, and the general second-degree test — the MHT-CET Pair of Straight Lines chapter with every past-year question tagged.",
  subtopicOrder: [
    "cetpsl-joint-equation",
    "cetpsl-slopes-of-a-pair",
    "cetpsl-angle-between-the-pair",
    "cetpsl-general-second-degree-equation",
  ],
};
