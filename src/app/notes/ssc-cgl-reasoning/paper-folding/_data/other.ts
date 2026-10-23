import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RPF_OTHER_NOTE: SubtopicNote = {
  subtopicName: "Other Folds and Transparent Sheets",
  title: "Other Folds and Transparent Sheets",
  oneLineDefinition:
    "Sheets folded along a diagonal, into thirds or only once before they are cut, and transparent sheets folded so that the pattern on one half lands on the other.",
  whyItMatters:
    "Twelve questions in the bank, 4 from the 2023 shifts and 8 from the 2024 shifts, with 1 EASY, 10 MODERATE and 1 HARD. The rule is the same mirror in a fold line, but the fold lines are not the two centre lines, so the copies land in less familiar places.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrpfot-folds",
      name: "Diagonal folds, thirds and single folds",
      intuition:
        "Any fold makes a mirror line. Opening it puts a reflection of each cut on the other side of that line, at the same distance. That holds whether the line is a diagonal, a line one third of the way across, or the only fold made.",
      definition:
        "- **Count the layers:** each fold doubles the layers under it. A cut through every layer makes one hole per layer.\n" +
        "- **Thirds:** a strip folded into three equal parts has 3 layers, so each hole opens into 3, one in each third. The outer copies are reflections of the middle one in the two fold lines.\n" +
        "- **A diagonal fold:** the reflection lies across the diagonal. A hole near one side of the diagonal opens into a pair facing each other across it.\n" +
        "- **A part with one layer:** a hole punched where the paper is not folded over stays a single hole.\n" +
        "- **Fast route:** count the holes first. Options with the wrong number are struck before you think about places.",
      authoredExample: {
        prompt:
          "A strip of paper is folded into three equal parts, giving three layers, and one hole is punched through all of them. How many holes does the opened strip have, and where?",
        steps: [
          "Three layers under the punch give three holes.",
          "One lies in each third. The two outer holes are reflections of the middle hole in the two fold lines.",
        ],
        answer: "Three holes, one in each third",
      },
      selfCheckExample: {
        prompt:
          "A square sheet is folded once along a diagonal, and one hole is punched through both layers near the fold. What does the opened sheet show?",
        steps: [
          "The fold makes two layers, so there are two holes.",
          "They are reflections of each other across the diagonal, one on each side of it and the same distance from it.",
        ],
        answer: "Two holes facing each other across the diagonal",
      },
      practiceSet: [
        { prompt: "A sheet folded in half once is punched with 4 holes through both layers. How many holes does the opened sheet have?", answer: "8" },
        { prompt: "A strip folded into thirds is punched with 2 holes through all layers. How many holes does the opened strip have?", answer: "6" },
        { prompt: "A square is folded along one diagonal and then folded in half again. How many layers does it have?", answer: "4" },
        { prompt: "A hole is punched in a part of the sheet that was never folded over. How many holes does it make?", answer: "One" },
      ],
      pyqExampleId: "235cc838-6689-4c26-b8d6-b4c845bdb40c",
      traps: [
        {
          title: "Using the centre lines for a diagonal fold",
          body:
            "When the fold runs corner to corner, the copy is a reflection across that diagonal, not across a centre line. Find the actual fold line before you place any copy.",
        },
        {
          title: "Counting layers that the punch did not go through",
          body:
            "If part of the folded sheet has only one layer, a hole there makes one hole only. Check how many layers sit under each cut, not under the whole sheet.",
        },
        {
          title: "Putting the outer copies in the same position as the middle one",
          body:
            "In a strip folded into thirds, each outer copy is a reflection of the middle one, not a copy slid sideways. A hole near the left of the middle third opens next to the left fold line in the outer third.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrpfot-sheet",
      name: "Folding a transparent sheet",
      intuition:
        "A transparent sheet with a drawing on it is folded once. The folded half lands on the other half as its reflection in the fold line, and because the sheet is clear, you see that reflection on top.",
      definition:
        "- The part of the drawing on the folded half is reflected in the fold line and lands on the other half.\n" +
        "- **A horizontal fold** (top half down) turns that part upside down; left and right stay.\n" +
        "- **A vertical fold** (left half over) reverses that part left to right; top and bottom stay.\n" +
        "- The part of the drawing already on the half that stays still does not move.\n" +
        "- **Fast route:** pick one end of the folded part, such as an arrowhead, and work out only where it lands.",
      authoredExample: {
        prompt:
          "A transparent sheet has a dot near its top-left corner. Its left half is folded over onto its right half. Where is the dot now?",
        steps: [
          "The fold line is the vertical centre line, so left and right swap for the folded half.",
          "The dot keeps its height and lands as far from the fold on the right as it was on the left.",
        ],
        answer: "Near the top-right corner",
      },
      selfCheckExample: {
        prompt:
          "A transparent sheet has an arrow in its top half, pointing straight up. The top half is folded down onto the bottom half. Which way does the arrow point now?",
        steps: ["A horizontal fold turns the folded part upside down.", "An arrow pointing up now points down."],
        answer: "Down",
      },
      practiceSet: [
        { prompt: "A transparent sheet has an arrow pointing right in its left half. The left half is folded over onto the right half. Which way does the arrow point?", answer: "Left" },
        { prompt: "Does a fold along a horizontal line change left and right?", answer: "No" },
        { prompt: "The small letter b is drawn in the top half of a transparent sheet, and the top half is folded down. What does it look like now?", answer: "p" },
        { prompt: "Does the part of the drawing on the half that stays still move when the sheet is folded?", answer: "No" },
      ],
      pyqExampleId: "4bb498ac-9f8a-47ba-b961-732de7a05125",
      traps: [
        {
          title: "Sliding the folded part instead of reflecting it",
          body:
            "The folded half lands upside down (for a horizontal fold) or reversed (for a vertical fold), not slid across unchanged. An arrow that still points the same way after the fold is wrong.",
        },
        {
          title: "Moving the half that stays still",
          body:
            "Only the folded half moves. A mark already on the half that does not move stays exactly where it was.",
        },
        {
          title: "Measuring the distance from the edge, not the fold",
          body:
            "A folded mark lands as far from the fold line as it started. A mark near the fold stays near it; a mark near the outer edge lands near the other outer edge.",
        },
      ],
    },
  ],
};
