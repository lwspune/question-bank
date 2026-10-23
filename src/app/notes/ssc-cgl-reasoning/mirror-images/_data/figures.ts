import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMI_FIGURES_NOTE: SubtopicNote = {
  subtopicName: "Figures in a Mirror",
  title: "Figures in a Mirror",
  oneLineDefinition:
    "A drawn figure seen in a mirror beside it: everything swaps left and right, slanting lines and arrows change direction, and nothing moves up or down.",
  whyItMatters:
    "Fifty-seven questions in the bank, 54 of them from the 2023 shifts, with 22 EASY, 34 MODERATE and 1 HARD. The wrong options usually flip one part the wrong way or turn the figure upside down, so checking two or three parts in a fixed order is enough.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmifi-single",
      name: "One figure flipped left to right",
      intuition:
        "In a mirror beside a figure, every point keeps its height and swaps sides: what was on the left is now on the right. A line slanting up to the right now slants up to the left, and an arrow pointing right now points left.",
      definition:
        "- **Swaps:** left and right. A part near the left edge ends up near the right edge, at the same height.\n" +
        "- **Changes direction:** arrows pointing left or right, and lines slanting one way or the other.\n" +
        "- **Stays:** anything pointing straight up or straight down, and the height of every part.\n" +
        "- **Clocks:** a clock's mirror image shows 11:60 minus the time, so 3:00 appears as 9:00 and 2:30 as 9:30.\n" +
        "- **Fast route:** strike every option that has turned the figure upside down (that is a water image). Then check one arrow or slanting line in each option left.",
      authoredExample: {
        prompt:
          "In a figure, an arrow in the top-left corner points up and to the right, and a black dot sits in the bottom-right corner. A mirror stands on the right. Where are the arrow and the dot in the image, and which way does the arrow point?",
        steps: [
          "The arrow keeps its height and swaps sides: it is in the top-right corner.",
          "A slant up and to the right becomes a slant up and to the left.",
          "The dot keeps its height and swaps sides: it is in the bottom-left corner.",
        ],
        answer: "The arrow is top-right, pointing up and to the left; the dot is bottom-left",
      },
      selfCheckExample: {
        prompt: "A clock shows 3:00. What time does it appear to show in a mirror placed beside it?",
        steps: ["The hour hand points to 3, on the right of the dial.", "In the mirror it points to the left of the dial, at 9: 11:60 minus 3:00 is 9:00."],
        answer: "9:00",
      },
      practiceSet: [
        { prompt: "In a mirror beside a figure, which way does an arrow pointing left appear to point?", answer: "Right" },
        { prompt: "Does an arrow pointing straight up change in a mirror beside it?", answer: "No" },
        { prompt: "What time does a clock showing 2:30 appear to show in a mirror?", answer: "9:30", method: "11:60 minus 2:30 is 9:30." },
        { prompt: "A small square sits at the top-left of a figure. Where is it in a mirror placed on the right?", answer: "At the top-right" },
      ],
      pyqExampleId: "fc52d45a-5354-4495-b15e-8480bc7d88b9",
      traps: [
        {
          title: "Turning the figure upside down",
          body:
            "A mirror beside a figure never moves a part up or down. Options with the top part now at the bottom are water images and can be struck at once.",
        },
        {
          title: "Leaving a slanting line as it was",
          body:
            "A line from bottom-left to top-right becomes a line from bottom-right to top-left. Options that move the parts across but keep every slant the same are the setter's favourite trap.",
        },
        {
          title: "Rotating the figure instead of flipping it",
          body:
            "Turning a figure half a circle swaps left with right and top with bottom. A mirror swaps only left with right, so a rotated option is wrong even when its left and right look correct.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmifi-parts",
      name: "Several parts in a frame",
      intuition:
        "Many mirror figures are a frame with parts in two columns or four corners. A mirror beside the frame does two things: each part moves to the other column at the same height, and each part flips left to right on the way.",
      definition:
        "1. **Move:** the left column becomes the right column and the right column the left. Top stays top, bottom stays bottom.\n" +
        "2. **Flip:** each part also flips: an arrow pointing right now points left, a shape with a dot on its right now has the dot on its left.\n" +
        "- Both changes happen together. An option that moves the parts without flipping them, or flips them without moving them, is wrong.\n" +
        "- **Fast route:** follow the part that is easiest to see (a black shape or a letter) to its new corner, strike the options that put it elsewhere, then check one part's flip.",
      authoredExample: {
        prompt:
          "A frame holds four parts: top-left a black triangle pointing right, top-right a white circle, bottom-left the letter F, bottom-right an arrow pointing down. A mirror stands on the right. What is in each corner of the image?",
        steps: [
          "The columns swap. Top-left: the white circle. Top-right: the black triangle, now pointing left.",
          "Bottom-left: the arrow, still pointing down, since straight up and down do not change.",
          "Bottom-right: the letter F, reversed.",
        ],
        answer: "Top: white circle, then a black triangle pointing left. Bottom: a down arrow, then a reversed F",
      },
      selfCheckExample: {
        prompt:
          "A figure has two columns. The left column holds a star above a square; the right column holds a circle above a triangle. A mirror stands on the right. What is in the left column of the image, from top to bottom?",
        steps: ["The right column moves to the left.", "Top and bottom stay, so the circle is above the triangle."],
        answer: "The circle above the triangle",
      },
      practiceSet: [
        { prompt: "In a mirror beside a frame, do the top row and the bottom row swap?", answer: "No" },
        { prompt: "In a figure with a symbol in each corner, which corner does the top-right symbol move to in a mirror beside it?", answer: "The top-left" },
        { prompt: "A part in the left column is an arrow pointing right. Where is it in the image, and which way does it point?", answer: "In the right column, pointing left" },
        { prompt: "Which options can you strike at once in a mirror question?", answer: "Any option where the top and bottom parts have swapped." },
      ],
      pyqExampleId: "ca22eb63-4b4d-49cc-a0a6-e5eb784e598a",
      traps: [
        {
          title: "Moving the parts without flipping them",
          body:
            "When the columns swap, each part also turns to face the other way. An option with every part in its new corner but still facing the old way is wrong.",
        },
        {
          title: "Swapping the rows as well as the columns",
          body:
            "Swapping both rows and columns is a half turn, not a mirror image. Only the columns change sides.",
        },
      ],
    },
  ],
};
