import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_REF_EMBEDDED_NOTE: SubtopicNote = {
  subtopicName: "Embedded Figures",
  title: "Embedded Figures",
  oneLineDefinition:
    "Find the option that contains a given figure hidden among its lines, or the option that is hidden in a given figure, with the figure kept the same size and the same way up.",
  whyItMatters:
    "Fifty-four questions in the bank, 39 from the 2023 shifts and 15 from the 2024 shifts, with 8 EASY, 37 MODERATE and 9 HARD. Every one is a tracing check, and most options fail on one feature you can spot quickly: a slant the wrong way, a missing curve, a line of the wrong length.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrefem-find",
      name: "Finding the figure inside an option",
      intuition:
        "The given figure is a small drawing; one option hides it among other lines. Every line of the given figure must appear in that option, in the same direction and the same proportion. Extra lines around it do not matter.",
      definition:
        "1. Pick the most unusual feature of the given figure: a curve, a slant, a small loop, a sharp corner.\n" +
        "2. Look for that feature in each option, the same way up. Strike the options that do not have it.\n" +
        "3. In the options left, trace the whole figure from that feature, line by line.\n" +
        "- **No rotation:** the figure must appear exactly as it is, not turned or flipped. A line slanting up to the right must slant up to the right.\n" +
        "- **Same proportion:** a long line must stay long relative to the short ones.\n" +
        "- **Fast route:** the most unusual feature usually rules out three options at once.",
      authoredExample: {
        prompt:
          "Think of capital letters as figures. Is the letter F embedded in the letter E, with rotation not allowed?",
        steps: [
          "F is a vertical line with a horizontal line from its top going right and a shorter one from its middle going right.",
          "E has the same vertical line, the same top line and the same middle line, plus one more line at the bottom.",
          "Every line of F appears in E the same way up; the extra bottom line does not matter.",
        ],
        answer: "Yes",
      },
      selfCheckExample: {
        prompt: "Is the letter L embedded in the letter T, with rotation not allowed?",
        steps: [
          "L needs a vertical line with a horizontal line going right from its bottom end.",
          "T's horizontal line is at the top of its vertical, and nothing leaves the bottom end.",
        ],
        answer: "No",
      },
      practiceSet: [
        { prompt: "Is the letter V embedded in the letter W, with rotation not allowed?", answer: "Yes: the first two strokes of W form a V." },
        { prompt: "Does it matter if an option has extra lines around the given figure?", answer: "No: only the figure's own lines must be there." },
        { prompt: "The given figure has a line slanting up to the right. Can an option with that line slanting up to the left contain it?", answer: "No: rotation and flipping are not allowed." },
        { prompt: "Which feature of the given figure should you look for first?", answer: "Its most unusual one: a curve, a loop or a slant." },
      ],
      pyqExampleId: "23c13e23-bfb2-4943-990f-8ecaa79437ef",
      traps: [
        {
          title: "Accepting a turned or flipped copy",
          body:
            "If the option shows the figure turned round or as a mirror image, it does not contain it. The stem says rotation is not allowed, so the figure must sit exactly the same way.",
        },
        {
          title: "Ignoring the proportions",
          body:
            "A figure with one long side and one short side is not found in an option where both sides are equal. Compare the lengths of the lines as well as their directions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrefem-part",
      name: "Finding the option hidden in the figure",
      intuition:
        "Here the large figure is given and each option is a small piece. The right option is a piece you can trace inside the large figure, every one of its lines lying on a line of the figure, the same way up.",
      definition:
        "1. For each option, find its most unusual line or corner.\n" +
        "2. Look for that line or corner in the given figure, the same way up and in the same proportion.\n" +
        "3. Trace the rest of the option from there. If any line of the option has no matching line in the figure, the option is not hidden in it.\n" +
        "- **Every line must be there:** an option that needs a line the figure does not have (a curve, a vertical, a second diagonal) is wrong.\n" +
        "- **Fast route:** check the options for a feature the figure has nowhere at all; that strikes most of them at once.",
      authoredExample: {
        prompt:
          "Think of capital letters as figures. Which of these is hidden in the letter H: (a) a vertical line with a short line from its middle going right, (b) a vertical line with a line from its top going right, (c) a V shape?",
        steps: [
          "H is two vertical lines joined by a horizontal line across the middle.",
          "(a) is H's left vertical with the start of its middle line. It is hidden in H.",
          "(b) needs a line at the top, which H does not have. (c) needs two slanting lines, which H does not have.",
        ],
        answer: "(a)",
      },
      selfCheckExample: {
        prompt:
          "Which of these is hidden in the letter E: a vertical line with a horizontal line going right from its top, or a vertical line with a horizontal line going left from its middle?",
        steps: [
          "E's horizontal lines all go to the right of its vertical line.",
          "So the first is hidden in E, and the second, which goes left, is not.",
        ],
        answer: "The vertical line with a line going right from its top",
      },
      practiceSet: [
        { prompt: "An option needs a curved line, and the given figure has only straight lines. Can the option be hidden in it?", answer: "No" },
        { prompt: "Must every line of the option lie on a line of the given figure?", answer: "Yes" },
        { prompt: "Is a small triangle hidden in the letter A, with rotation not allowed?", answer: "Yes: the top of A with its crossbar forms one." },
        { prompt: "What is the quickest way to strike options here?", answer: "Look for a feature the given figure does not have anywhere." },
      ],
      pyqExampleId: "16d21122-2554-4bf8-a945-0a4b6526c18c",
      traps: [
        {
          title: "Matching the outline but not the inside",
          body:
            "An option can share the figure's outline and still need an inner line the figure lacks. Trace every line of the option, not just its edge.",
        },
        {
          title: "Finding the shape only after turning it",
          body:
            "A piece that fits the figure only when turned on its side is not hidden in it. Keep the option exactly as printed while you search.",
        },
      ],
    },
  ],
};
