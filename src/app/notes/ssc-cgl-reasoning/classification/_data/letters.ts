import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCL_LETTERS_NOTE: SubtopicNote = {
  subtopicName: "Letter Classification",
  title: "Letter Classification",
  oneLineDefinition:
    "Change each letter to its place in the alphabet, then compare the clusters: equal steps, letters in a run, or letters that are opposites of each other.",
  whyItMatters:
    "Twenty questions in the bank, 13 EASY and 7 MODERATE, twelve of them from the 2023 shifts. Every letter question in the chapter, here and on the next two pages, starts from the same habit: turning letters into numbers in a second or two.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrclle-positions",
      name: "Letter positions and clusters with equal steps",
      intuition:
        "A letter cluster is a short number series in disguise. Once each letter is its position (A is 1, Z is 26), the rule is a step you can count.",
      definition:
        "- **Forward positions**: A1 to Z26. Anchor them with **EJOTY**: E5, J10, O15, T20, Y25, and count one or two from the nearest anchor (R is T20 minus 2, so 18).\n" +
        "- **Reverse position** (counting from Z): 27 minus the forward position. Z is 1, A is 26, H is 19.\n" +
        "- **Wrap round**: after Z, carry on from A. A position above 26 loses 26 (X24 + 4 is 28, which is B2). Before A, add 26.\n" +
        "- Write the steps between neighbouring letters (+3, +3). Three clusters share the step list; the odd one has a different step somewhere.\n" +
        "- Letters in a plain run (BCD, RST) and the same run backwards (ONM) count as different patterns: direction matters.",
      formula: {
        label: "Reverse position and wrapping round",
        latex: "\\text{reverse position} = 27 - \\text{position} \\qquad \\text{position after Z} = \\text{position} - 26",
      },
      authoredExample: {
        prompt: "Find the odd one out: (a) BHN (b) EKQ (c) TZF (d) DJO",
        steps: [
          "Positions: B2 H8 N14; E5 K11 Q17; T20 Z26 F6.",
          "Steps: (a) +6, +6. (b) +6, +6. (c) Z to F wraps round: 26 + 6 = 32, and 32 − 26 = 6, which is F. So +6, +6.",
          "(d) D4 J10 O15 steps +6, +5.",
        ],
        answer: "(d) DJO",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) QPON (b) HGFE (c) UTSR (d) LKJH",
        steps: [
          "QPON, HGFE and UTSR each step back by 1 three times.",
          "LKJH steps back 1, 1 and then 2 (I is skipped).",
        ],
        answer: "(d) LKJH",
      },
      practiceSet: [
        { prompt: "What is the position of the letter T, counting from A?", answer: "20" },
        { prompt: "What is the position of the letter H, counting backwards from Z?", answer: "19", method: "\\(27 - 8 = 19\\)." },
        { prompt: "Which letter is 4 places after X, wrapping round after Z?", answer: "B", method: "\\(24 + 4 = 28\\), and \\(28 - 26 = 2\\)." },
        { prompt: "Find the odd one out: DGJ, LOR, PSV, SVX", answer: "SVX", method: "The others step +3, +3; SVX steps +3, +2." },
      ],
      pyqExampleId: "83d3cfe7-b55e-49eb-904b-b3da59a2abc5",
      traps: [
        {
          title: "Counting the starting letter as a step",
          body: "Three places after D is G (E, F, G), not F. Count the letters you move onto, not the one you start from.",
        },
        {
          title: "Stopping at Z",
          body:
            "The alphabet wraps round. In a +4 cluster such as PTXB, X is followed by B, four places on. Subtract 26 from any position above 26.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclle-opposite",
      name: "Opposite letters, whose positions add to 27",
      intuition:
        "Fold the alphabet in half and A lands on Z, B on Y, M on N. Each pair is called opposite letters, and SSC builds whole questions on them.",
      definition:
        "- Opposite pairs: A and Z, B and Y, C and X, D and W, E and V, F and U, G and T, H and S, I and R, J and Q, K and P, L and O, M and N.\n" +
        "- Two letters are opposites when their positions add to 27. To find the opposite of a letter, take its position from 27.\n" +
        "- In a cluster, test which two letters are opposites (first and second, or first and third), then find the rule for the remaining letter.\n" +
        "- Like a triad of numbers, a cluster can keep one link and break the other, so check both.",
      formula: {
        label: "Opposite letters",
        latex: "\\text{position}(L) + \\text{position}(\\text{opposite of } L) = 27",
      },
      authoredExample: {
        prompt: "Find the odd one out: (a) DWF (b) KPM (c) HSJ (d) ETG",
        steps: [
          "First and second letters: D4 + W23 = 27, K11 + P16 = 27, H8 + S19 = 27. Opposites.",
          "E5 + T20 = 25. Not opposites (the opposite of E is V).",
          "Third letter: F, M, J and G are each 2 after the first letter, so that link holds in all four. (d) breaks the opposite-letter link.",
        ],
        answer: "(d) ETG",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) BYD (b) FUH (c) LOM (d) JQL",
        steps: [
          "Opposites: B2 + Y25, F6 + U21, L12 + O15, J10 + Q17 all make 27. That link holds everywhere.",
          "Third letter, two after the first: B to D, F to H, J to L.",
          "L to M is only one step; L + 2 is N.",
        ],
        answer: "(c) LOM",
      },
      practiceSet: [
        { prompt: "What is the opposite letter of G?", answer: "T", method: "\\(27 - 7 = 20\\)." },
        { prompt: "Are R and I opposite letters?", answer: "Yes", method: "\\(18 + 9 = 27\\)." },
        { prompt: "Which of these pairs is not a pair of opposite letters: CX, FU, MO, KP?", answer: "MO", method: "\\(13 + 15 = 28\\)." },
        { prompt: "What is the opposite letter of the letter two places after K?", answer: "N", method: "Two after K is M (13), and \\(27 - 13 = 14\\)." },
      ],
      pyqExampleId: "36e3ce38-f986-4ae3-b3ca-539ac8b7a5cf",
      traps: [
        {
          title: "Using 26 as the total for opposite letters",
          body:
            "Opposite positions add to 27, because A (1) pairs with Z (26). With 26 as the total you get the letter one place off, such as U for E instead of V.",
        },
      ],
    },
  ],
};
