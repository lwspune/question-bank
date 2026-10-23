import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RNV_MOVING_NOTE: SubtopicNote = {
  subtopicName: "Moving Round the Box",
  title: "Moving Round the Box",
  oneLineDefinition:
    "Figure series where small parts step from place to place inside a box: one corner at a time, round the border, or all together along a fixed path, often changing colour as they go.",
  whyItMatters:
    "Thirty-four questions in the bank, 13 from the 2023 shifts and 21 from the 2024 shifts, with 6 EASY, 24 MODERATE and 4 HARD. The moves are simple, but several parts often move at once in different directions, so marks go to the student who follows each part on its own.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrnvmo-corners",
      name: "One part stepping round the corners or the border",
      intuition:
        "Follow a single part, such as a dot, a star or a black square, from figure to figure and name its place each time. The places form a path round the box, and the next figure puts the part one step further along it.",
      definition:
        "- **Corners clockwise:** top-left, top-right, bottom-right, bottom-left, then top-left again. **Anticlockwise** is the reverse.\n" +
        "- **Border of a 3 by 3 grid:** eight cells, not four. Clockwise from the top-left: top-left, top-middle, top-right, middle-right, bottom-right, bottom-middle, bottom-left, middle-left.\n" +
        "- A part may move two places a step instead of one. Count the places it skips.\n" +
        "- Colour often alternates as it moves: black, white, black. Read the colour as a separate rule.\n" +
        "- When two parts move, follow each one; they can go in opposite directions.\n" +
        "- **Fast route:** name the next place of the part that moves most clearly, strike the options that do not have it there, then check the colour or a second part on what is left.",
      authoredExample: {
        prompt:
          "In a series, a dot sits at the top-left corner, then the top-right, then the bottom-right. It is black, then white, then black. Where is it in the fourth figure, and what colour is it?",
        steps: [
          "Top-left, top-right, bottom-right is one corner clockwise each step, so next is the bottom-left.",
          "The colour alternates black, white, black, so next is white.",
        ],
        answer: "A white dot at the bottom-left corner",
      },
      selfCheckExample: {
        prompt:
          "A star moves anticlockwise round the eight border cells of a 3 by 3 grid, one cell a step: top-middle, top-left, middle-left. Where is it in the fifth figure?",
        steps: [
          "Anticlockwise from middle-left, the border runs bottom-left, then bottom-middle.",
          "The fourth figure has it at the bottom-left and the fifth at the bottom-middle.",
        ],
        answer: "The bottom-middle cell",
      },
      practiceSet: [
        { prompt: "Moving clockwise round the corners of a box, which corner comes after the bottom-right?", answer: "The bottom-left" },
        { prompt: "A circle starts at the top-left and moves two corners clockwise each step. Where is it after one step?", answer: "The bottom-right corner" },
        { prompt: "A dot moves one corner clockwise each step. Where is it after four steps?", answer: "Back where it started" },
        { prompt: "A part's colour runs black, white, black, white. What colour is it in the seventh figure?", answer: "Black" },
      ],
      pyqExampleId: "bf46925c-cb21-4bf6-b857-b959a00b2941",
      traps: [
        {
          title: "Counting four border places in a grid",
          body:
            "A 3 by 3 grid has eight border cells, so a part moving one cell a step takes eight steps to go round, not four. Count the middle cells of each side as places.",
        },
        {
          title: "Following only one of two moving parts",
          body:
            "When a square moves clockwise and a triangle moves anticlockwise, an option with the square right and the triangle wrong is the setter's trap. Find the next place of every moving part.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrnvmo-cycle",
      name: "Several parts moving together along one path",
      intuition:
        "In many series every symbol in the box moves at once, each one stepping to the next place along the same path. Learn the path from one symbol, check it on a second, and every symbol's next place follows.",
      definition:
        "1. Name the places in the box: the four corners and the centre, or the cells of a grid.\n" +
        "2. Follow one symbol through the figures and write its path: centre, top-left, top-right, bottom-right, bottom-left.\n" +
        "3. Check that a second symbol follows the same path, one place behind or ahead.\n" +
        "4. Move every symbol one step along the path to get the next figure.\n" +
        "- A path of n places repeats after n steps, so the figure after n steps matches the first one.\n" +
        "- Sometimes a new symbol enters at the start of the path and the oldest one leaves at the end.\n" +
        "- **Fast route:** after finding the path, predict where just two symbols will be; usually only one option has both in the right places.",
      authoredExample: {
        prompt:
          "In a box, A is at the top-left, B at the top-right, C at the bottom-right and D at the bottom-left. At each step every letter moves one corner clockwise. Which letter is at the top-left after two steps?",
        steps: [
          "Moving clockwise, the top-left corner receives the letter from the bottom-left.",
          "After one step that is D, and the bottom-left now holds C.",
          "After the second step the top-left receives C.",
        ],
        answer: "C",
      },
      selfCheckExample: {
        prompt:
          "Five symbols sit at the centre and the four corners. At each step: centre to top-left, top-left to top-right, top-right to bottom-right, bottom-right to bottom-left, bottom-left to centre. P is at the centre in figure 1. Where is P in figure 3?",
        steps: ["Figure 2: P moves from the centre to the top-left.", "Figure 3: P moves from the top-left to the top-right."],
        answer: "The top-right corner",
      },
      practiceSet: [
        { prompt: "Four symbols move one place along a four-place path at each step. After how many steps does the figure repeat?", answer: "4" },
        { prompt: "Symbols move along a path of five places. After how many steps is the first figure repeated?", answer: "5" },
        { prompt: "A new symbol enters at the top-left at each step and every symbol moves on along top-left, top-right, bottom-right, bottom-left, leaving after the bottom-left. In how many figures does each symbol appear?", answer: "4" },
        { prompt: "In a series, every corner symbol moves one corner clockwise and a centre arrow turns 90 degrees. What two things must the right option show?", answer: "The corner symbols moved one more corner, and the arrow turned once more." },
      ],
      pyqExampleId: "8317cbb9-c827-42b9-a2d0-dbf0963b1f79",
      traps: [
        {
          title: "Reading the path from one symbol only",
          body:
            "One symbol can seem to jump straight across the box when it is really one step along a path that passes through the centre. Check the path on a second symbol before you use it.",
        },
        {
          title: "Losing the new symbol at the start of the path",
          body:
            "When a new symbol enters each time, the oldest leaves. An option that keeps every old symbol and adds a new one has one symbol too many.",
        },
      ],
    },
  ],
};
