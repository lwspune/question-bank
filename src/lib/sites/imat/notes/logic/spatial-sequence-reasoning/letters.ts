import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_SPA_LETTERS_NOTE: SubtopicNote = {
  subtopicName: "Letter Sequences and Codes",
  title: "Letter Sequences and Letter Codes",
  oneLineDefinition:
    "Turn each letter into its position in the alphabet, and a letter sequence or code becomes a number problem.",
  whyItMatters:
    "No past IMAT paper has asked a letter sequence yet. They test the same skill as number sequences and are standard in reasoning tests, so the method is worth the few minutes it takes to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-spa-alphabet",
      name: "Alphabet positions and letter sequences",
      intuition:
        "Letters are numbers in disguise: A is 1 and Z is 26. Convert, find the number rule, then convert back. A few anchor letters make the conversion fast: E is 5, J is 10, O is 15, T is 20, Y is 25.",
      definition:
        "- **Position**: A = 1, B = 2, …, Z = 26. Anchors: E 5, J 10, O 15, T 20, Y 25.\n" +
        "- **Position from the end**: Z is 1st from the end, A is 26th. Position from the end = 27 minus the position.\n" +
        "- **Wrap-around**: after Z comes A again. Subtract 26 from any position above 26.\n" +
        "- Pairs of letters may move in opposite directions, for example AZ, BY, CX, where each pair adds to 27.",
      table: {
        columns: ["Letters", "Positions", "Positions from the end"],
        rows: [
          { cells: ["A B C D E", "1 2 3 4 5", "26 25 24 23 22"] },
          { cells: ["F G H I J", "6 7 8 9 10", "21 20 19 18 17"] },
          { cells: ["K L M N O", "11 12 13 14 15", "16 15 14 13 12"] },
          { cells: ["P Q R S T", "16 17 18 19 20", "11 10 9 8 7"] },
          { cells: ["U V W X Y", "21 22 23 24 25", "6 5 4 3 2"] },
          { cells: ["Z", "26", "1"] },
        ],
        caption: "Learn the anchors E, J, O, T, Y and count from the nearest one.",
      },
      selfCheckExample: {
        prompt: "What letter comes next: B, E, I, N, …?",
        options: ["S", "T", "U", "R", "O"],
        steps: [
          "Positions: 2, 5, 9, 14. The gaps are 3, 4, 5.",
          "The next gap is 6: \\(14 + 6 = 20\\), which is T.",
          "A repeats the last gap of 5 and D adds only 4. C adds 7. E is simply the letter after N.",
        ],
        answer: "(B) T",
      },
      practiceSet: [
        { prompt: "Next letter: C, F, I, L, …", answer: "O", method: "Add 3" },
        { prompt: "Next letter: Z, X, U, Q, …", answer: "L", method: "Positions 26, 24, 21, 17: subtract 2, 3, 4, then 5" },
        { prompt: "Next pair: AZ, BY, CX, …", answer: "DW", method: "First letter forwards, second backwards" },
        { prompt: "Next letter: W, A, E, …", answer: "I", method: "Add 4, wrapping from Z to A" },
      ],
      traps: [
        {
          title: "Position from the end is 27 minus the position",
          body: "Z is 1st from the end, not 0th. So a letter at position \\(p\\) is \\(27 - p\\) from the end: M (13) is 14th from the end. Using 26 minus the position puts you one letter off, and that letter is usually an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-codes",
      name: "Letter codes: shifts and reversed alphabets",
      intuition:
        "In a simple code every letter is moved the same number of places along the alphabet. Compare one original letter with its coded letter to find the shift, check it on a second letter, then apply it to the new word.",
      definition:
        "- A **shift code** moves every letter \\(k\\) places forward (or back), wrapping from Z to A.\n" +
        "- Find \\(k\\) from one letter pair, then **check it on every letter** of the example: codes sometimes use different shifts for different positions.\n" +
        "- A **reversed alphabet** code swaps A with Z, B with Y, and so on: each pair of positions adds to 27.\n" +
        "- To decode, apply the shift in the opposite direction.",
      formula: {
        label: "Shift code",
        latex: "\\text{coded position} = \\text{position} + k \\quad (\\text{subtract } 26 \\text{ if above } 26)",
        symbols: [{ symbol: "\\(k\\)", meaning: "the shift; negative means move backwards" }],
      },
      authoredExample: {
        prompt: "With a shift of 3, how is CAT coded? With the same code, which word is coded as JRR?",
        steps: [
          "C (3) becomes F (6), A (1) becomes D (4), T (20) becomes W (23). CAT is coded FDW.",
          "To decode, go back 3: J (10) to G (7), R (18) to O (15), R to O. The word is GOO.",
        ],
        answer: "FDW; GOO",
      },
      selfCheckExample: {
        prompt: "In a code, LIME is written as NKOG. How is SEED written in the same code?",
        options: ["TFFE", "QCCB", "VHHG", "UGGE", "UGGF"],
        steps: [
          "L (12) becomes N (14): a shift of +2. Check: I to K, M to O, E to G. All +2.",
          "SEED: S to U, E to G, E to G, D to F. The code is UGGF.",
          "A shifts by 1, B by \\(-2\\), C by 3. D forgets to shift the last letter.",
        ],
        answer: "(E) UGGF",
      },
      practiceSet: [
        { prompt: "If DOG is coded EPH, how is CAT coded?", answer: "DBU", method: "Shift +1" },
        { prompt: "In the reversed-alphabet code (A to Z, B to Y, …), how is BOX coded?", answer: "YLC", method: "Each position becomes 27 minus itself" },
        { prompt: "A shift of +5 produced MJQQT. What was the original word?", answer: "HELLO", method: "Shift back by 5" },
      ],
      traps: [
        {
          title: "Shifts wrap from Z back to A",
          body: "With a shift of +3, X becomes A, not a symbol beyond Z. Forgetting to subtract 26 gives a position like 27, and an option that skips the wrap is often there to catch it.",
        },
      ],
    },
  ],
};
