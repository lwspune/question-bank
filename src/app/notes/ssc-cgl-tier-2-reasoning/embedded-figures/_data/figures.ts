import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_REF_FIGURES_NOTE: SubtopicNote = {
  subtopicName: "Hidden Figures and Pattern Completion",
  title: "Hidden Figures and Pattern Completion",
  oneLineDefinition:
    "Find the option in which a given figure is hidden (same size, same way up), or the piece that fills the gap in a pattern.",
  whyItMatters:
    "14 questions in the Tier II bank, 3 EASY, 10 MODERATE and 1 HARD, split evenly between the two kinds. Most options fail on a single detail, so one sharp check usually leaves one option.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2reffg-embedded",
      name: "Figure hidden in an option",
      intuition:
        "Every line of the given figure must be somewhere in the right option, pointing the same way and in the same proportions; extra lines around it are allowed. Look for the given figure's oddest part first.",
      definition:
        "- **Pick the oddest part:** a short slanted line, a curve, a closed loop.\n" +
        "- **Strike options** that do not have that part the same way up.\n" +
        "- **Trace the rest** in the options left.\n" +
        "- **No turning, no flipping,** no stretching.",
      authoredExample: {
        prompt: "On a calculator display, digits are made of seven straight bars. Is the digit 7 hidden in the digit 9?",
        steps: ["7 uses the top bar and the two right-hand bars.", "9 lights the top bar, both right-hand bars and three more, so all of 7's bars are there."],
        answer: "Yes",
      },
      selfCheckExample: {
        prompt: "On the same display, is the digit 2 hidden in the digit 3?",
        steps: ["2 needs the lower-left bar.", "3 does not light the lower-left bar."],
        answer: "No",
      },
      practiceSet: [
        { prompt: "On a calculator display, is 1 hidden in 4?", answer: "Yes: both right-hand bars are lit in 4" },
        { prompt: "Can an option contain the given figure if it shows it upside down?", answer: "No: rotation is not allowed" },
        { prompt: "An option has the figure plus several extra lines. Can it be the answer?", answer: "Yes: extra lines do not matter" },
      ],
      pyqExampleId: "e8c7684b-4959-4a03-b51f-95665b9862e4",
      traps: [
        {
          title: "Accepting a mirror image",
          body: "A figure flipped left to right is not the same figure. A slant that rises to the right must rise to the right in the answer too.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2reffg-pattern",
      name: "Completing a pattern",
      intuition:
        "Patterns are usually symmetric: what is in one quarter or half is repeated, mirrored or turned in the others. Work out what the missing part must contain from its neighbours, then find it among the options.",
      definition:
        "- **Find the symmetry:** left and right halves mirror; or the four quarters are the same figure turned.\n" +
        "- **Continue every line** that runs into the gap; it must meet the gap's edge at the same point in the answer.\n" +
        "- **Check shading and small marks** last; they decide between the final two options.",
      authoredExample: {
        prompt: "A square tile has an X drawn from corner to corner, and its top-right quarter is cut out. What must the missing piece show?",
        steps: ["One arm of the X runs from the centre to the top-right corner.", "That arm crosses the missing quarter."],
        answer: "A single line from its inner corner to its outer corner",
      },
      selfCheckExample: {
        prompt: "A tile shows a circle centred in the middle, and its bottom-left quarter is cut out. What must the piece show?",
        steps: ["The circle passes through every quarter.", "In the bottom-left quarter it is a quarter-arc, curving round the tile's centre."],
        answer: "A quarter-arc bulging towards the bottom-left corner",
      },
      practiceSet: [
        { prompt: "A pattern's left half is the mirror of its right half, and part of the right half is missing. Where do you look?", answer: "At the matching part of the left half, mirrored" },
        { prompt: "A line enters the gap halfway along its top edge. Where must it enter the answer piece?", answer: "Halfway along the top edge" },
        { prompt: "Two options match the lines. What decides between them?", answer: "Shading and small marks" },
      ],
      pyqExampleId: "5be618d1-5ad6-4dd6-9c47-0216e07c586e",
      traps: [
        {
          title: "Choosing a piece that is turned the wrong way",
          body: "The right piece often appears among the options turned or flipped as well. Check that its lines meet the gap's edges at the same points.",
        },
      ],
    },
  ],
};
