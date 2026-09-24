import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_PNC_CHAPTER: ChapterNote = {
  chapterName: "Permutations and Combinations",
  title: "Permutations and Combinations — MHT-CET Maths",
  intro:
    "Permutations and Combinations is one question a paper and the classic time sink of MHT-CET Maths. Two of every five of its past-year questions are HARD, " +
    "not because the counting is deep but because one misread constraint — adjacent or not, at least or at most, round table or row — changes the answer, and " +
    "the wrong answer is always on the list. The chapter has almost no formulas; it is a small set of moves. Fix the constrained items first, glue a together-group " +
    "into one block, subtract the forbidden case from the total, list the cases for at least and at most, and seat the unrestricted people before placing the " +
    "restricted ones in the gaps. The pages below meet each move once in a row before it reappears in a circle or in a digit-counting stem; the last page holds " +
    "the numbers-and-figures questions, the most mechanical and the easiest marks here. Every PYQ is tagged.",
  cardBlurb:
    "The one-a-paper MHT-CET counting chapter — arrangement and selection moves, circular tables and the digit and polygon counts, with every past-year question tagged.",
  subtopicOrder: [
    "cetpc-fundamentals",
    "cetpc-arrangements-with-constraints",
    "cetpc-selections-with-conditions",
    "cetpc-circular-arrangements",
    "cetpc-counting-numbers-and-figures",
  ],
};
