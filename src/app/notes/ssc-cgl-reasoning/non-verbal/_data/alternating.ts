import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RNV_ALTERNATING_NOTE: SubtopicNote = {
  subtopicName: "Alternating Figures",
  title: "Alternating Figures",
  oneLineDefinition:
    "Figure series where two forms take turns, so every second figure is the same, or where each part of the figure follows its own short rule.",
  whyItMatters:
    "Nine questions in the bank, 6 from the 2023 shifts and 3 from the 2024 shifts, with 5 EASY, 3 MODERATE and 1 HARD. Spotting that figure 3 repeats figure 1 solves the easy ones in seconds; the harder ones split the figure into parts that each change in their own way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrnval-two",
      name: "Two forms taking turns",
      intuition:
        "Some series do not progress at all: they swing between two forms, A, B, A, B. Once you see that figure 3 matches figure 1, the fifth figure must match them too.",
      definition:
        "- Compare figure 1 with figure 3, and figure 2 with figure 4. If both pairs match exactly, the series alternates.\n" +
        "- The next figure after four is figure 5, an odd figure, so it repeats figures 1 and 3.\n" +
        "- The two forms can differ in shading (black and white swapped), in direction (up and down) or in which half is shaded.\n" +
        "- If figures 1 and 3 differ even a little, the series is not a plain alternation; check the other rules.\n" +
        "- **Fast route:** find the option identical to figure 3. Then confirm it differs from figure 4 the way figure 3 differs from figure 2.",
      authoredExample: {
        prompt:
          "The first four figures of a series are: a white circle with a black dot, a black circle with a white dot, a white circle with a black dot, a black circle with a white dot. What is the fifth figure?",
        steps: [
          "Figure 3 matches figure 1, and figure 4 matches figure 2: the series alternates.",
          "The fifth figure is an odd one, so it matches figures 1 and 3.",
        ],
        answer: "A white circle with a black dot",
      },
      selfCheckExample: {
        prompt:
          "In a series, the odd figures show an arrow pointing up and the even figures show it pointing down. Which way does the arrow point in figure 6, and in figure 7?",
        steps: ["Figure 6 is even, so the arrow points down.", "Figure 7 is odd, so it points up."],
        answer: "Down in figure 6, up in figure 7",
      },
      practiceSet: [
        { prompt: "In an alternating series A, B, A, B, what is the fifth figure?", answer: "A" },
        { prompt: "In an alternating series, figure 2 shows a black square. What does figure 4 show?", answer: "A black square" },
        { prompt: "Why can the fifth figure of an alternating series be found without looking at figure 4?", answer: "Because it repeats figure 3." },
        { prompt: "Figures 1 and 3 of a series differ in one small mark. Is it a plain alternation?", answer: "No: check the other kinds of rule." },
      ],
      pyqExampleId: "a6310365-ef63-4999-ba96-57322aac3c45",
      traps: [
        {
          title: "Calling a series alternating too soon",
          body:
            "Two figures that look alike at a glance can differ in one dot or one shaded half. Compare figures 1 and 3 mark by mark before you decide the series alternates.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrnval-parts",
      name: "Parts with rules of their own",
      intuition:
        "A figure can have several parts, each changing by its own short rule: one part alternates, another turns, a third is counted. Treat the figure as a set of small series, solve each one, and put the answers back together.",
      definition:
        "1. List the parts that change: an outline, a set of lines, a dot, a mark inside.\n" +
        "2. For each part, find its rule using the order of checks: count, turn, move, alternate.\n" +
        "3. Write what each part becomes in the next figure.\n" +
        "4. The answer is the option that shows every part's next state.\n" +
        "- Parts with rules of different lengths (one alternates every 2 figures, one goes round 4 corners) line up again after a number of steps that both lengths divide.\n" +
        "- **Fast route:** use the part with the clearest rule to strike options first, then check the next part on the ones left.",
      authoredExample: {
        prompt:
          "In each figure of a series, the top shape alternates square, circle, square, circle, and the number of lines below it runs 1, 2, 3, 4. What is the fifth figure?",
        steps: [
          "Top shape: it alternates, and figure 5 is odd, so it is a square.",
          "Lines: up by one each time, so 5.",
        ],
        answer: "A square with 5 lines below it",
      },
      selfCheckExample: {
        prompt:
          "In a series, the letter at the top alternates A, B, A, B; a dot moves one corner clockwise each step from the top-left; and the lines run 4, 3, 2, 1. Describe the fifth figure.",
        steps: [
          "Letter: figure 5 is odd, so A.",
          "Dot: top-left, top-right, bottom-right, bottom-left, then back to the top-left.",
          "Lines: one fewer each time, so none.",
        ],
        answer: "A at the top, the dot at the top-left, no lines",
      },
      practiceSet: [
        { prompt: "One part of a figure alternates and another is counted up. How many rules must the answer obey?", answer: "Two" },
        { prompt: "An arrow points up in figure 1 and turns 90 degrees clockwise each step, while the shading alternates, starting shaded. What are figure 3's arrow and shading?", answer: "Pointing down, and shaded" },
        { prompt: "One part alternates every 2 figures and another goes round 4 corners. Which figure first matches figure 1 in both parts?", answer: "Figure 5", method: "Both rules repeat after 4 steps." },
        { prompt: "Which part should you use first to strike options?", answer: "The part whose rule is clearest." },
      ],
      pyqExampleId: "38f8d9da-1b50-422f-9351-219e147dde7e",
      traps: [
        {
          title: "Solving one part and stopping",
          body:
            "When three parts change, an option that gets two of them right is still wrong. Write the next state of every part before you pick.",
        },
        {
          title: "Mixing the rules of two parts",
          body:
            "If the dots alternate and the lines are counted, do not count the dots. Keep each rule tied to its own part.",
        },
      ],
    },
  ],
};
