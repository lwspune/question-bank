import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_AN_FIGURES_NOTE: SubtopicNote = {
  subtopicName: "Figure Pairs",
  title: "Figure Pairs",
  oneLineDefinition:
    "Name the one change from the first figure to the second (turned, flipped, a part added, shading swapped) and make exactly that change to the third figure.",
  whyItMatters:
    "2 of the chapter's 5 questions: 1 EASY and 1 HARD. The hard one flips a figure left to right. The other links lines to shapes by their number of sides, and MSCE's key accepts two answers for it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4anfi-turns",
      name: "Turns, flips and counts",
      intuition:
        "A figure pair shows one change. Was the figure turned, like a clock hand? Flipped, like your face in a mirror? Or did it gain a part or change colour? Name the change in words, then do it to the third figure.",
      definition:
        "- **Turn**: the figure goes round, but its parts keep their order.\n" +
        "- **Flip** (mirror image): left and right change sides, top and bottom stay. The order of the parts is reversed.\n" +
        "- **Count**: the number of sides, lines or dots goes up or down in a fixed way.\n" +
        "- **Shading**: black parts become white, or the other way round.\n" +
        "- Make **only** the change the first pair shows.",
      authoredExample: {
        prompt: "A flag on a pole faces right; in the second figure the same flag faces left. A shoe points right in the third figure. What is the fourth figure?",
        steps: [
          "The flag was flipped left to right: what pointed right now points left. Top and bottom did not change.",
          "Flip the shoe in the same way.",
        ],
        answer: "The same shoe pointing left",
      },
      selfCheckExample: {
        prompt: "A circle with 1 dot : a circle with 2 dots : : a square with 3 dots : ?",
        steps: ["The shape stays the same and one dot is added."],
        answer: "A square with 4 dots",
      },
      practiceSet: [
        { prompt: "A triangle (3 sides) : a hexagon (6 sides) : : a square (4 sides) : ?", answer: "An octagon (8 sides). The number of sides is doubled." },
        { prompt: "A white circle : a black circle : : a white star : ?", answer: "A black star" },
        { prompt: "An arrow pointing up : an arrow pointing down : : an arrow pointing left : ?", answer: "An arrow pointing right (a half turn)" },
        { prompt: "In a side mirror the letter b looks like d. What does the letter p look like?", answer: "q" },
      ],
      pyqExampleId: "db787602-443f-4512-ada3-933a159478ac",
      traps: [
        {
          title: "Mixing up a turn and a flip",
          body: "A half turn moves the top to the bottom. A left to right flip keeps the top at the top. Check where the top part went.",
        },
        {
          title: "Making two changes",
          body: "If the first pair only flipped the figure, do not also change its shading or size.",
        },
      ],
    },
  ],
};
