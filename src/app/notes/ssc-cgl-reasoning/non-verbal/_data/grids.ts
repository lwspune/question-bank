import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RNV_GRIDS_NOTE: SubtopicNote = {
  subtopicName: "Symbol Grids",
  title: "Symbol Grids",
  oneLineDefinition:
    "Figure series where a box holds many letters, numbers and symbols, and each step rearranges them by a fixed move, or by two moves used in turn.",
  whyItMatters:
    "Fifty-nine questions in the bank, 36 from the 2023 shifts and 23 from the 2024 shifts: 39 HARD and 20 MODERATE. This page holds 39 of the chapter's 45 HARD questions. They take time, so the skill is a method that finds the answer by tracking two or three symbols instead of all of them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrnvgr-one",
      name: "One move repeated at every step",
      intuition:
        "In the simpler grids every step uses the same move: each symbol goes from its place to a fixed new place. Find where two or three symbols go from figure 1 to figure 2, check it on the next pair, and use it again.",
      definition:
        "1. Number the places in the box (cells 1 to 9 row by row in a 3 by 3 grid, or positions along a row).\n" +
        "2. For one symbol, write the place it leaves and the place it reaches: cell 1 to cell 3.\n" +
        "3. Do the same for two more symbols. Together they show the move.\n" +
        "4. Check the move from figure 2 to figure 3. If it holds, apply it to the last figure.\n" +
        "- Common moves: the whole row shifts one place (the end symbol goes to the front); every symbol moves one place round the border; each column or place runs its own short series.\n" +
        "- **Fast route:** you need the final places of only two or three symbols. Strike every option that misplaces one of them.",
      authoredExample: {
        prompt:
          "A box has four cells numbered 1 to 4. At each step the symbol in cell 1 moves to cell 3, cell 3 to cell 4, cell 4 to cell 2 and cell 2 to cell 1. Figure 1 has A, B, C, D in cells 1 to 4. What does figure 3 show in cells 1 to 4?",
        steps: [
          "Figure 2: A goes to cell 3, C to cell 4, D to cell 2 and B to cell 1, so cells 1 to 4 read B, D, A, C.",
          "Figure 3: B goes to cell 3, A to cell 4, C to cell 2 and D to cell 1, so cells 1 to 4 read D, C, B, A.",
        ],
        answer: "D, C, B, A",
      },
      selfCheckExample: {
        prompt:
          "At each step the last symbol of a row moves to the front and the others move one place right. Row 1 reads P Q R S T. What does row 3 read?",
        steps: ["Row 2: T moves to the front: T P Q R S.", "Row 3: S moves to the front: S T P Q R."],
        answer: "S T P Q R",
      },
      practiceSet: [
        { prompt: "In a 3 by 3 grid numbered 1 to 9 row by row, which number is the centre cell?", answer: "5" },
        { prompt: "A move sends cell 1 to 3, 3 to 9, 9 to 7 and 7 to 1 in a 3 by 3 grid numbered row by row. Which way round the corners does it go?", answer: "Clockwise", method: "1, 3, 9, 7 are top-left, top-right, bottom-right, bottom-left." },
        { prompt: "A row of four symbols shifts one place at each step. After how many steps is the first row repeated?", answer: "4" },
        { prompt: "How many symbols do you need to track to strike most wrong options?", answer: "Two or three" },
      ],
      pyqExampleId: "144b8938-5ba4-44fe-83b3-f3e3fbebda07",
      traps: [
        {
          title: "Tracking a symbol by its look, not its place",
          body:
            "In a grid of nine symbols the eye jumps to whatever stands out. Number the cells and write each symbol's cell number; the move is about places, not shapes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrnvgr-two",
      name: "Two moves used in turn",
      intuition:
        "Most HARD grids use two different moves that take turns: one from figure 1 to 2, another from 2 to 3, then the first again. So the step from figure 4 to the answer repeats the step from figure 2 to figure 3, not the step just before it.",
      definition:
        "1. Write move X from figure 1 to figure 2, and move Y from figure 2 to figure 3.\n" +
        "2. Check that figure 3 to figure 4 repeats move X. If it does, the moves alternate.\n" +
        "3. The answer is figure 4 after move Y.\n" +
        "- Another form: figures 1, 3 and 5 make one series and figures 2 and 4 another. Then the answer continues the odd series from figure 3.\n" +
        "- If figure 3 to 4 does not repeat move X, the series uses one move each time or a longer cycle; go back to the first concept.\n" +
        "- **Fast route:** apply move Y to just two symbols of figure 4 and strike the options that disagree. Apply it in full only if two options are left.",
      authoredExample: {
        prompt:
          "A row of five letters starts as A B C D E. Move 1 reverses the row; move 2 swaps the middle letter with the first. The moves take turns, starting with move 1. What is the row after four moves (the fifth figure)?",
        steps: [
          "Move 1: E D C B A. Move 2 swaps the middle C with the first E: C D E B A.",
          "Move 1 again: A B E D C.",
          "Move 2 again swaps the middle E with the first A: E B A D C.",
        ],
        answer: "E B A D C",
      },
      selfCheckExample: {
        prompt: "A series of rows reads K L M N, then L M N K, then L N M K, then N M K L. What is the fifth row?",
        steps: [
          "Row 1 to 2 moves the first letter to the end. Row 3 to 4 does the same: L N M K becomes N M K L.",
          "Row 2 to 3 swaps the two middle letters: L M N K becomes L N M K.",
          "So row 4 to 5 swaps the two middle letters too: N M K L becomes N K M L.",
        ],
        answer: "N K M L",
      },
      practiceSet: [
        { prompt: "In a series where figure 1 to 2 and figure 3 to 4 use the same move, which earlier step does figure 4 to 5 repeat?", answer: "Figure 2 to figure 3" },
        { prompt: "A row reads P Q R S. It is reversed and then its first two symbols are swapped. What does it read?", answer: "R S Q P", method: "Reversed: S R Q P; then swap S and R." },
        { prompt: "Figures 1, 3 and 5 of a series form one series. From which figure do you continue to get figure 5?", answer: "Figure 3" },
        { prompt: "After two moves that take turns, you have checked two symbols and two options are left. What do you do?", answer: "Check a third symbol, or apply the move in full to those two options." },
      ],
      pyqExampleId: "d619283c-e554-4fa0-bc26-e395147e4f4c",
      traps: [
        {
          title: "Repeating the last move instead of the one before",
          body:
            "When two moves take turns, figure 4 to 5 repeats figure 2 to 3. Using the figure 3 to 4 move again gives a figure the setter prints among the options.",
        },
        {
          title: "Deciding the moves alternate from one pair",
          body:
            "Two different moves from figure 1 to 2 and 2 to 3 could also be a longer cycle. Check that figure 3 to 4 really repeats the first move before you rely on it.",
        },
      ],
    },
  ],
};
