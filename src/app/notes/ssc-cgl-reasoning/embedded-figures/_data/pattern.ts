import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_REF_PATTERN_NOTE: SubtopicNote = {
  subtopicName: "Pattern Completion",
  title: "Pattern Completion",
  oneLineDefinition:
    "A symmetric figure has one piece missing; the right option is the piece that mirrors the part on the other side of the figure's line of symmetry.",
  whyItMatters:
    "Five questions in the bank, all from the 2024 shifts, with 1 EASY and 4 MODERATE. They are solved by one idea, reflection in a line, so they are quick once you find the line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrefpc-symmetry",
      name: "Completing a symmetric pattern",
      intuition:
        "Most of these figures are symmetric about one or both centre lines. The missing piece is not a copy of its neighbour but its reflection: what is near the edge stays near the edge, and what slants one way slants the other way.",
      definition:
        "1. Find the line of symmetry: compare the pieces you can see and find the line across which they mirror each other.\n" +
        "2. Take the piece on the other side of that line from the gap.\n" +
        "3. Reflect it in the line: every mark keeps its distance from the line but moves to the other side.\n" +
        "- **Symmetric about both centre lines:** the piece diagonally opposite the gap is the gap's half-turn, and either neighbour mirrored gives the answer.\n" +
        "- **Fast route:** check one slanting line or one off-centre mark in the options; a copied piece has it slanting the wrong way.",
      authoredExample: {
        prompt:
          "A square is split into four quarters by its centre lines, and the pattern is symmetric about both lines. The top-left quarter has a dot near the square's outer top-left corner. Where is the dot in the missing bottom-right quarter?",
        steps: [
          "Reflect top-left in the horizontal line: the bottom-left quarter has a dot near the outer bottom-left corner.",
          "Reflect that in the vertical line: the bottom-right quarter has a dot near the outer bottom-right corner.",
        ],
        answer: "Near the square's outer bottom-right corner",
      },
      selfCheckExample: {
        prompt:
          "A circle is split into quarters and is symmetric about its vertical diameter. The top-right quarter has a line from the centre slanting up to the rim on the right. What does the top-left quarter have?",
        steps: [
          "Reflect in the vertical diameter: left and right swap, height stays.",
          "So the line runs from the centre slanting up to the rim on the left.",
        ],
        answer: "A line from the centre slanting up to the rim on the left",
      },
      practiceSet: [
        { prompt: "Is the missing piece of a symmetric pattern a copy of its neighbour or a mirror image?", answer: "A mirror image" },
        { prompt: "A mark sits close to the line of symmetry on one side. Where is its reflection?", answer: "Equally close to the line, on the other side." },
        { prompt: "A line slants up to the right in one quarter. How does its reflection in the vertical centre line slant?", answer: "Up to the left" },
        { prompt: "What should you find before choosing an option?", answer: "The line of symmetry." },
      ],
      pyqExampleId: "21ec68b3-cb90-42a5-ba4c-a1307b40c95c",
      traps: [
        {
          title: "Copying the neighbour instead of reflecting it",
          body:
            "A copied piece keeps its slants pointing the same way, but a reflection reverses them. Options that copy the neighbouring quarter are the setter's usual trap.",
        },
        {
          title: "Reflecting in the wrong line",
          body:
            "If the pattern is symmetric only about its vertical line, reflecting in the horizontal line gives the wrong piece. Find which line the visible pieces mirror across first.",
        },
      ],
    },
  ],
};
