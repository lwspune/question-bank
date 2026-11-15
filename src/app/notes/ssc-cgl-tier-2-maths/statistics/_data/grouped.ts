import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ST_GROUPED_NOTE: SubtopicNote = {
  subtopicName: "Mean, Median and Mode of Grouped Data",
  title: "Mean, Median and Mode of Grouped Data",
  oneLineDefinition:
    "From a frequency table, the mean uses class mid-points, the median and mode use a formula inside the right class, and the empirical rule links mode, median and mean when one is missing.",
  whyItMatters:
    "8 questions in the Tier II bank, 4 EASY and 4 MODERATE. All four MODERATE questions in the chapter are here; each is one of three formulas used carefully.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2stgr-median",
      name: "Mean and median of grouped data",
      intuition:
        "In a frequency table each class stands in for its mid-point when finding the mean. For the median, the running total of frequencies finds the class that holds the middle value, and a formula places the median inside it.",
      definition:
        "- Mean \\(= \\frac{\\sum f x}{\\sum f}\\), with x the mid-point of each class.\n" +
        "- Median: find \\(\\frac{N}{2}\\), then the first class whose running total (cf) reaches it.\n" +
        "- Median \\(= l + \\frac{N/2 - cf}{f} \\times h\\), with l the class's lower limit, cf the running total before it, f its frequency, h its width.\n" +
        "- **Shortcut for the mean:** pick an assumed mean A, and mean \\(= A + \\frac{\\sum f d}{\\sum f}\\) with \\(d = x - A\\).",
      formula: {
        label: "Median of grouped data",
        latex: "\\text{median} = l + \\frac{\\frac{N}{2} - cf}{f} \\times h",
      },
      authoredExample: {
        prompt: "Find the median.\n\n| Class | 0-10 | 10-20 | 20-30 | 30-40 |\n|---|---|---|---|---|\n| Frequency | 4 | 10 | 8 | 6 |",
        steps: [
          "\\(N = 28\\), so \\(\\frac{N}{2} = 14\\). Running totals: 4, 14, 22, 28.",
          "The 14th value is the last in 10-20: \\(l = 10\\), \\(cf = 4\\), \\(f = 10\\), \\(h = 10\\).",
          "Median \\(= 10 + \\frac{14 - 4}{10} \\times 10 = 20\\).",
        ],
        answer: "20",
      },
      selfCheckExample: {
        prompt: "Find the mean.\n\n| Class | 0-10 | 10-20 | 20-30 |\n|---|---|---|---|\n| Frequency | 3 | 5 | 2 |",
        steps: ["Mid-points 5, 15, 25: \\(\\sum f x = 15 + 75 + 50 = 140\\).", "Mean \\(= \\frac{140}{10} = 14\\)."],
        answer: "14",
      },
      practiceSet: [
        { prompt: "A class 40-50 holds the median, with N = 40, a running total of 15 before it, frequency 10. Find the median.", answer: "45" },
        { prompt: "Find the mid-point of the class 25-29.", answer: "27" },
        { prompt: "With an assumed mean of 50, \\(\\sum f d = 60\\) and \\(\\sum f = 30\\). Find the mean.", answer: "52" },
      ],
      pyqExampleId: "82c3c8fd-9f28-41af-85fc-18cbceea9054",
      traps: [
        {
          title: "Using the running total of the median class itself",
          body: "In the median formula, cf is the running total BEFORE the median class, not including it. Using the total up to the end of the class pulls the median below its true value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2stgr-mode",
      name: "Mode of grouped data and the empirical rule",
      intuition:
        "The modal class is the one with the highest frequency, and the mode sits inside it, pulled towards whichever neighbour is bigger. When the data are only summarised by their mean and median, the empirical rule estimates the mode.",
      definition:
        "- Modal class: the class with the highest frequency \\(f_1\\); \\(f_0\\) and \\(f_2\\) are the frequencies before and after it.\n" +
        "- Mode \\(= l + \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h\\).\n" +
        "- The answer must lie inside the modal class; use that to rule out options.\n" +
        "- Empirical rule: mode \\(= 3 \\times\\) median \\(- 2 \\times\\) mean.",
      formula: {
        label: "Mode of grouped data, and the empirical rule",
        latex: "\\text{mode} = l + \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h, \\quad \\text{mode} = 3\\,\\text{median} - 2\\,\\text{mean}",
      },
      authoredExample: {
        prompt: "Find the mode.\n\n| Class | 10-20 | 20-30 | 30-40 | 40-50 |\n|---|---|---|---|---|\n| Frequency | 5 | 12 | 18 | 9 |",
        steps: [
          "Modal class 30-40: \\(l = 30\\), \\(f_1 = 18\\), \\(f_0 = 12\\), \\(f_2 = 9\\), \\(h = 10\\).",
          "Mode \\(= 30 + \\frac{6}{36 - 12 - 9} \\times 10 = 30 + \\frac{60}{15} = 34\\).",
        ],
        answer: "34",
      },
      selfCheckExample: {
        prompt: "A distribution has mean 42 and median 40. Estimate its mode.",
        steps: ["Mode \\(= 3 \\times 40 - 2 \\times 42\\).", "\\(= 120 - 84 = 36\\)."],
        answer: "36",
      },
      practiceSet: [
        { prompt: "Mode 20 and mean 26: estimate the median.", answer: "24" },
        { prompt: "A modal class 50-60 has \\(f_1 = 20\\), \\(f_0 = 12\\), \\(f_2 = 12\\). Find the mode.", answer: "55" },
        { prompt: "Which class is the modal class: 0-5 (4), 5-10 (9), 10-15 (7)?", answer: "5-10" },
      ],
      pyqExampleId: "175df507-7916-413a-b0ff-40ecf72df86e",
      traps: [
        {
          title: "Swapping the median and mean in the empirical rule",
          body: "The rule is 3 times the MEDIAN minus 2 times the MEAN. With mean 60 and median 48 the mode is 24; swapping them gives 84, outside any sensible range.",
        },
      ],
    },
  ],
};
