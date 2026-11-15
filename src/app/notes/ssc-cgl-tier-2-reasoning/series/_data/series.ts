import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RSE_SERIES_NOTE: SubtopicNote = {
  subtopicName: "Number and Letter Series",
  title: "Number and Letter Series",
  oneLineDefinition:
    "Find the missing or next term of a series of numbers or letters by spotting the single rule that takes each term to the next.",
  whyItMatters:
    "18 questions in the Tier II bank, 15 EASY and 3 MODERATE. Most number series fall to the differences, and most letter series to a repeating block, so two habits answer nearly all of them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rsese-number",
      name: "Number series",
      intuition:
        "Write the gap between each pair of neighbours. If the gaps grow steadily, the rule is in the gaps; if they grow too fast, the rule is a multiplication, a square or a cube.",
      definition:
        "Check in this order:\n" +
        "- **Differences:** steady (+6 each time) or growing steadily (+27, +33, +39).\n" +
        "- **Multiply and add:** ×2 + 1, ×4 + 2: the next term is roughly a fixed multiple of the last.\n" +
        "- **Squares and cubes:** 4, 9, 16, 25 or one less or more than them.\n" +
        "- **Alternating rules:** a series that goes up and down may be two series woven together.",
      formula: { label: "Second differences", latex: "a_{n+1} - a_n = d_n, \\quad d_{n+1} - d_n = \\text{constant}" },
      authoredExample: {
        prompt: "Find the next term: 5, 11, 23, 47, ?",
        steps: ["Differences 6, 12, 24 double each time, so each term is about twice the last.", "Rule: ×2 + 1. Then 47 × 2 + 1 = 95."],
        answer: "95",
      },
      selfCheckExample: {
        prompt: "Find the next term: 3, 8, 15, 24, ?",
        steps: ["These are 4 − 1, 9 − 1, 16 − 1, 25 − 1.", "Next: 36 − 1 = 35."],
        answer: "35",
      },
      practiceSet: [
        { prompt: "Find the next term: 2, 6, 12, 20, ?", answer: "30 (differences 4, 6, 8, 10)" },
        { prompt: "Find the next term: 100, 50, 25, ?", answer: "12.5 (halving)" },
        { prompt: "Find the missing term: 7, 10, ?, 22, 31", answer: "15 (differences 3, 5, 7, 9)" },
      ],
      pyqExampleId: "9def946a-0f13-42e2-92e1-42b5f4b2bba3",
      traps: [
        {
          title: "Stopping at the first difference",
          body: "If the first differences are not steady, take differences of the differences. A steady second difference is the most common SSC rule.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rsese-blanks",
      name: "Letter series with blanks: the repeating block",
      intuition:
        "A long letter string with gaps is almost always one short block written again and again. Find the block's length from the letters you can see, and the blanks fill themselves.",
      definition:
        "- **Find the block:** look for where the first letter repeats; the distance is the block length.\n" +
        "- **Write the string in blocks** of that length, one under another, and read each column.\n" +
        "- **Fill the blanks** in order, left to right, and match the whole string of filled letters to an option.",
      authoredExample: {
        prompt: "Fill the blanks in order: a b _ d a _ c d _ b c d",
        steps: ["a repeats after 4 letters, so the block is abcd.", "The blanks are c, b and a in turn."],
        answer: "c b a",
      },
      selfCheckExample: {
        prompt: "Fill the blanks in order: M A _ N M _ T N M A T _",
        steps: ["M repeats after 4 letters: the block is MATN.", "The blanks are T, A and N."],
        answer: "T A N",
      },
      practiceSet: [
        { prompt: "Fill the blanks: x y _ x _ z x y _", answer: "z y z (block xyz)" },
        { prompt: "Fill the blanks: P _ Q R P Q _ R P Q Q _", answer: "Q Q R (block PQQR)" },
        { prompt: "How do you find the block length?", answer: "See where the first letter repeats" },
      ],
      pyqExampleId: "5baa6dfd-f6f2-4775-bff1-378c4db8e051",
      traps: [
        {
          title: "Filling blanks one at a time from the options",
          body: "Options differ by one letter; checking them blank by blank is slow and error-prone. Write the full block first, then read off every blank.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rsese-step",
      name: "Letter series by steady steps",
      intuition:
        "When each term is a group of letters, each position in the group usually moves by its own fixed step through the alphabet. Turn the letters into numbers (A = 1, Z = 26) and the steps show.",
      definition:
        "- **Positions:** A 1, E 5, J 10, O 15, T 20, Z 26.\n" +
        "- **Track each place in the group separately:** first letters, second letters, third letters.\n" +
        "- **Past Z, start again at A** (Z + 1 = A).",
      authoredExample: {
        prompt: "Find the next term: AZ, CX, EV, ?",
        steps: ["First letters: A, C, E go +2, so G.", "Second letters: Z, X, V go −2, so T."],
        answer: "GT",
      },
      selfCheckExample: {
        prompt: "Find the next term: BDF, GIK, LNP, ?",
        steps: ["Each letter moves +5 from one group to the next: B to G, D to I, F to K.", "L + 5 = Q, N + 5 = S, P + 5 = U."],
        answer: "QSU",
      },
      practiceSet: [
        { prompt: "Find the next term: C, F, I, L, ?", answer: "O (+3)" },
        { prompt: "Find the next term: Z, X, U, Q, ?", answer: "L (−2, −3, −4, −5)" },
        { prompt: "What is the position of the letter R?", answer: "18" },
      ],
      pyqExampleId: "b743aa54-55db-459f-8a44-7043d50df367",
      traps: [
        {
          title: "Following one letter and ignoring the others",
          body: "In a group like ZYA, the first two letters can go back while the third goes forward. Check every position before choosing.",
        },
      ],
    },
  ],
};
