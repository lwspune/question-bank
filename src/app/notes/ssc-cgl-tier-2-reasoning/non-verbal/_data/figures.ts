import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RNV_FIGURES_NOTE: SubtopicNote = {
  subtopicName: "Figure Series, Analogy and Odd Figure",
  title: "Figure Series, Analogy and Odd Figure",
  oneLineDefinition:
    "Picture questions: the next figure in a series, the figure that completes A : B :: C : D, and the one figure out of five that does not belong.",
  whyItMatters:
    "26 questions in the Tier II bank, 6 EASY, 16 MODERATE and 4 HARD. Options usually differ in one detail, so the fastest route is to predict one feature of the answer and strike every option that lacks it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rnvfg-series",
      name: "Figure series",
      visualizationSlug: "ssc-t2-figure-series",
      intuition:
        "From one figure to the next, each part follows its own simple rule: it turns by a fixed angle, moves one step, or a line is added. Track one part at a time across the figures.",
      definition:
        "Changes to look for:\n" +
        "- **Turning:** 45° or 90° each step, clockwise or anticlockwise.\n" +
        "- **Moving:** a part steps along a path, one place at a time.\n" +
        "- **Adding or removing:** one more line, dot or side each step.\n" +
        "- **Shading:** black, white, black, or one more part shaded each step.\n" +
        "- **Fast route:** predict the next state of the clearest part and strike options that disagree.",
      authoredExample: {
        prompt:
          "In a series, an arrow points up, then right, then down. A small circle at its tail is white, then black, then white. Describe the fourth figure.",
        steps: ["The arrow turns 90° clockwise each step: up, right, down, then left.", "The circle alternates: the fourth is black."],
        answer: "An arrow pointing left with a black circle at its tail",
      },
      selfCheckExample: {
        prompt: "A shape has 3 sides, then 4, then 5. How many sides does the fifth shape have?",
        steps: ["One side is added each step.", "Fourth: 6 sides, fifth: 7 sides."],
        answer: "7",
      },
      practiceSet: [
        { prompt: "A line turns 45° clockwise each step. After 4 steps, how far has it turned?", answer: "180° (it points the opposite way)" },
        { prompt: "A square has 1, then 2, then 3 corners shaded. How many in the fourth figure?", answer: "All 4" },
        { prompt: "Two parts change at once. How do you check them?", answer: "One at a time, each against the options" },
      ],
      pyqExampleId: "04a12eea-ecfe-45a2-9982-1377d55cfa3d",
      traps: [
        {
          title: "Following only one part",
          body: "The option that gets the moving part right may get the shading wrong. Check every changing part before choosing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rnvfg-analogy",
      name: "Figure analogy",
      intuition:
        "Describe in words what happens from figure A to figure B (turned, flipped, enlarged, a part added or removed), then do exactly that to figure C.",
      definition:
        "- **List each change** from A to B: turn, flip, size, shading, parts added or taken away.\n" +
        "- **Apply every change** to C, in the same way.\n" +
        "- **Parts can swap:** an inner shape and an outer shape may change places.",
      authoredExample: {
        prompt: "Figure A is a small white circle; figure B is the same circle, larger and shaded. Figure C is a small white triangle. Describe D.",
        steps: ["A to B: enlarged and shaded.", "Do the same to C."],
        answer: "A larger, shaded triangle",
      },
      selfCheckExample: {
        prompt: "Figure A is a square inside a circle; figure B is a circle inside a square. Figure C is a triangle inside a hexagon. Describe D.",
        steps: ["A to B: the inner and outer shapes swap.", "Swap them in C."],
        answer: "A hexagon inside a triangle",
      },
      practiceSet: [
        { prompt: "A: an arrow pointing up. B: the arrow pointing down. C: an arrow pointing left. What is D?", answer: "An arrow pointing right" },
        { prompt: "A has three dots; B has six dots. C has two dots. How many dots in D?", answer: "Four (the dots double)" },
        { prompt: "From A to B two things change. How many must the answer show?", answer: "Both" },
      ],
      pyqExampleId: "e6f251c6-42a8-42af-b2aa-4ec3c7e05fd4",
      traps: [
        {
          title: "Copying B instead of transforming C",
          body: "The answer is C changed in the way A changed into B, not something that looks like B.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rnvfg-odd",
      name: "Odd figure out",
      intuition:
        "Four of the five figures share a property, such as the same number of lines, the same turn of one part, or a mirror pair. Look for the property in the first two and test the rest.",
      definition:
        "Properties to test:\n" +
        "- **Count:** lines, sides, dots or enclosed spaces.\n" +
        "- **Position:** a small part sits at the same place relative to a larger one.\n" +
        "- **Turning:** four figures are the same figure turned; the odd one is flipped.\n" +
        "- **Shading:** the same number of parts shaded.",
      authoredExample: {
        prompt: "Five figures: a triangle, a square, a pentagon, a hexagon and a circle. Which is odd?",
        steps: ["Four have straight sides.", "The circle has none."],
        answer: "The circle",
      },
      selfCheckExample: {
        prompt: "Five figures hold 2, 4, 6, 7 and 8 dots. Which is odd?",
        steps: ["Four counts are even.", "7 is odd."],
        answer: "The figure with 7 dots",
      },
      practiceSet: [
        { prompt: "Four figures are the same letter L turned; one is L flipped like a mirror image. Which is odd?", answer: "The flipped one" },
        { prompt: "What do you count first in an odd-figure question?", answer: "Lines, sides, dots or closed spaces" },
        { prompt: "Four figures have a dot inside a shape and one has it outside. Which is odd?", answer: "The one with the dot outside" },
      ],
      pyqExampleId: "c8f50857-bbfe-4d8a-a6f7-c55018aab277",
      traps: [
        {
          title: "Mistaking a turned figure for a different one",
          body: "A figure turned through 90° is the same figure. Only a mirror flip makes it different, so check which way it faces.",
        },
      ],
    },
  ],
};
