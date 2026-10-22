import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ST_GROUPED_MEDIAN_NOTE: SubtopicNote = {
  subtopicName: "Median and Mode of Grouped Data",
  title: "Median and Mode of Grouped Data",
  oneLineDefinition:
    "For a frequency table, the median is found inside the class where the cumulative frequency first reaches half the total, and the mode inside the class with the highest frequency.",
  whyItMatters:
    "Ten questions in the bank, six of them EASY. Four only ask you to recognise the median or mode formula or one of its letters, three work out a median from a table, and the rest find the median class or the mode. The one HARD question has classes with gaps between them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spistgd-cumulative",
      name: "Cumulative frequency and the median class",
      intuition:
        "The median is the value with half the data below it. Keep a running total of the frequencies down the table, and the class where that running total first reaches half the total is where the median lives.",
      definition:
        "- **Cumulative frequency** (cf) of a class \\(=\\) its frequency plus all the frequencies before it.\n" +
        "- The last cumulative frequency equals the total, N.\n" +
        "- The **median class** is the first class whose cumulative frequency reaches \\(\\frac{N}{2}\\).\n" +
        "- This is why a cumulative frequency table is needed to find the median.\n" +
        "- The median class is not the class with the highest frequency. That one is the modal class.",
      formula: {
        label: "Median class",
        latex: "\\text{median class: first class with } cf \\ge \\frac{N}{2}",
      },
      authoredExample: {
        prompt:
          "The classes 0-10, 10-20, 20-30, 30-40 and 40-50 have frequencies 5, 8, 12, 9 and 6. Find the median class.",
        steps: [
          "\\(N = 5 + 8 + 12 + 9 + 6 = 40\\), so \\(\\frac{N}{2} = 20\\).",
          "Cumulative frequencies: 5, 13, 25, 34, 40.",
          "The first to reach 20 is 25, so the median class is 20-30.",
        ],
        answer: "20-30",
      },
      selfCheckExample: {
        prompt:
          "The classes 0-5, 5-10, 10-15, 15-20 and 20-25 have frequencies 3, 7, 10, 6 and 4. Find the median class.",
        steps: ["\\(N = 30\\), so \\(\\frac{N}{2} = 15\\).", "Cumulative frequencies: 3, 10, 20, ... The first to reach 15 is 20.", "The median class is 10-15."],
        answer: "10-15",
      },
      practiceSet: [
        { prompt: "Four classes have frequencies 4, 6, 9 and 5. Write their cumulative frequencies.", answer: "4, 10, 19, 24" },
        { prompt: "Which average needs a cumulative frequency table to find?", answer: "The median" },
        { prompt: "A table has total frequency 50. The median class is the first class whose cumulative frequency reaches what number?", answer: "25" },
      ],
      pyqExampleId: "b67991f1-598d-4ebb-b86f-053af3be7b03",
      traps: [
        {
          title: "Picking the tallest class as the median class",
          body:
            "The class with the largest frequency is the modal class. The median class is found from the cumulative frequencies and is often a different class.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spistgd-median",
      name: "The median formula",
      intuition:
        "Inside the median class you still need to walk a little way. You arrive with cf values already counted, need \\(\\frac{N}{2}\\), and the class holds f values spread over a width h, so you go that share of the way across.",
      definition:
        "- Median \\(= l + \\dfrac{\\frac{N}{2} - cf}{f} \\times h\\).\n" +
        "- l is the lower limit of the median class, f its frequency and h its width.\n" +
        "- **cf is the cumulative frequency of the class BEFORE the median class**, not of the median class itself.\n" +
        "- If only mid-values are given, rebuild the classes first: mid-values 5, 15, 25 mean classes 0-10, 10-20, 20-30.\n" +
        "- If a cumulative frequency equals \\(\\frac{N}{2}\\) exactly, the median is the upper limit of that class.",
      formula: {
        label: "Median of grouped data",
        latex: "\\text{Median} = l + \\frac{\\frac{N}{2} - cf}{f} \\times h",
        symbols: [
          { symbol: "l", meaning: "lower limit of the median class" },
          { symbol: "N", meaning: "total frequency" },
          { symbol: "cf", meaning: "cumulative frequency of the class before the median class" },
          { symbol: "f", meaning: "frequency of the median class" },
          { symbol: "h", meaning: "class size" },
        ],
      },
      authoredExample: {
        prompt:
          "The classes 0-20, 20-40, 40-60, 60-80 and 80-100 have frequencies 6, 10, 16, 5 and 3. Find the median.",
        steps: [
          "\\(N = 40\\), so \\(\\frac{N}{2} = 20\\). Cumulative frequencies: 6, 16, 32, ...",
          "The median class is 40-60: \\(l = 40\\), \\(cf = 16\\), \\(f = 16\\), \\(h = 20\\).",
          "Median \\(= 40 + \\frac{20 - 16}{16} \\times 20 = 40 + 5 = 45\\).",
        ],
        answer: "45",
      },
      selfCheckExample: {
        prompt: "For a median class, l = 30, h = 10 and f = 16. The total frequency is 60 and the cumulative frequency before the median class is 22. Find the median.",
        steps: ["\\(\\frac{N}{2} = 30\\).", "Median \\(= 30 + \\frac{30 - 22}{16} \\times 10 = 30 + 5 = 35\\)."],
        answer: "35",
      },
      practiceSet: [
        {
          prompt: "For a median class, l = 50, h = 10 and f = 12. Half the total frequency is 40 and the cumulative frequency before the class is 34. Find the median.",
          answer: "\\(50 + \\frac{6}{12} \\times 10 = 55\\)",
        },
        { prompt: "In the median formula, what does cf stand for?", answer: "The cumulative frequency of the class before the median class" },
        { prompt: "A table gives mid-values 25, 35, 45, 55. What are its classes?", answer: "20-30, 30-40, 40-50, 50-60" },
      ],
      pyqExampleId: "5cf03c9e-6c47-4630-8c70-1ff569788a0d",
      traps: [
        {
          title: "Using the median class's own cumulative frequency",
          body:
            "cf in the median formula is the running total up to the class before the median class. Using the median class's own cumulative frequency makes \\(\\frac{N}{2} - cf\\) negative or too small.",
        },
        {
          title: "Plugging mid-values in as limits",
          body:
            "When a table lists mid-values, the lower limit l is the mid-value minus half the class size. A median class with mid-value 45 and size 10 has l = 40, not 45.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spistgd-mode",
      name: "The mode formula",
      intuition:
        "The mode sits in the tallest class, but it leans towards whichever neighbour is taller. The formula measures that lean by comparing the modal class with the class before it and the class after it.",
      definition:
        "- The **modal class** is the class with the highest frequency.\n" +
        "- Mode \\(= l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h\\).\n" +
        "- \\(f_1\\) is the frequency of the modal class, \\(f_0\\) of the class before it, \\(f_2\\) of the class after it.\n" +
        "- **Classes with gaps** (1-5, 6-10, ...) must be made continuous first: subtract 0.5 from each lower limit and add 0.5 to each upper limit, so 6-10 becomes 5.5-10.5.",
      formula: {
        label: "Mode of grouped data",
        latex: "\\text{Mode} = l + \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h",
        symbols: [
          { symbol: "l", meaning: "lower limit of the modal class" },
          { symbol: "f_1", meaning: "frequency of the modal class" },
          { symbol: "f_0", meaning: "frequency of the class before it" },
          { symbol: "f_2", meaning: "frequency of the class after it" },
          { symbol: "h", meaning: "class size" },
        ],
      },
      authoredExample: {
        prompt:
          "The classes 0-10, 10-20, 20-30, 30-40 and 40-50 have frequencies 4, 10, 16, 12 and 6. Find the mode.",
        steps: [
          "The highest frequency is 16, so the modal class is 20-30: \\(l = 20\\), \\(h = 10\\).",
          "\\(f_1 = 16\\), \\(f_0 = 10\\), \\(f_2 = 12\\).",
          "Mode \\(= 20 + \\frac{16 - 10}{32 - 10 - 12} \\times 10 = 20 + \\frac{6}{10} \\times 10 = 26\\).",
        ],
        answer: "26",
      },
      selfCheckExample: {
        prompt: "For a modal class, l = 60, h = 5, \\(f_1 = 20\\), \\(f_0 = 12\\) and \\(f_2 = 8\\). Find the mode.",
        steps: ["\\(2f_1 - f_0 - f_2 = 40 - 12 - 8 = 20\\).", "Mode \\(= 60 + \\frac{8}{20} \\times 5 = 60 + 2 = 62\\)."],
        answer: "62",
      },
      practiceSet: [
        { prompt: "The classes 0-10, 10-20 and 20-30 have frequencies 7, 12 and 5. Which is the modal class?", answer: "10-20" },
        { prompt: "In the mode formula, what does \\(f_0\\) stand for?", answer: "The frequency of the class before the modal class" },
        { prompt: "The classes 1-5, 6-10 and 11-15 have gaps between them. What does 6-10 become?", answer: "5.5-10.5" },
        {
          prompt: "For a modal class, l = 10, h = 10, \\(f_1 = 8\\), \\(f_0 = 4\\) and \\(f_2 = 4\\). Find the mode.",
          answer: "\\(10 + \\frac{4}{8} \\times 10 = 15\\)",
        },
      ],
      pyqExampleId: "784c2c36-a45b-4314-acd5-819a3757c608",
      traps: [
        {
          title: "Swapping f0 and f1 in the top line",
          body:
            "The top of the mode fraction is \\(f_1 - f_0\\), the modal class minus the class before it. Writing \\(f_0 - f_1\\) makes it negative and puts the mode below the modal class.",
        },
        {
          title: "Using classes with gaps as they are",
          body:
            "For classes like 41-45 and 46-50, the true limits are 40.5-45.5 and 45.5-50.5. Using 46 as l without the 0.5 shift gives the wrong mode.",
        },
      ],
    },
  ],
};
