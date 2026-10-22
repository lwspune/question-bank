import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ST_GROUPED_MEAN_NOTE: SubtopicNote = {
  subtopicName: "Mean of Grouped Data",
  title: "Mean of Grouped Data",
  oneLineDefinition:
    "For a frequency table, each class is stood in for by its class mark, and the mean is the sum of frequency times class mark divided by the total frequency.",
  whyItMatters:
    "Ten questions in the bank, seven of them EASY. Most hand you the totals and ask for the mean or a missing number in one line, by the direct, assumed mean or step deviation formula. One HARD question asks for two missing frequencies from the mean and the total.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spistgm-direct",
      name: "Class marks and the direct method",
      intuition:
        "In a table you do not know the exact values inside a class, so you treat every value in it as sitting at the middle of the class. Then frequency times class mark is that class's share of the total.",
      definition:
        "- **Class mark** \\(= \\dfrac{\\text{lower limit} + \\text{upper limit}}{2}\\), the mid-point of the class.\n" +
        "- **Class size** (width) \\(=\\) upper limit \\(-\\) lower limit. It is not the class mark.\n" +
        "- Mean \\(= \\dfrac{\\sum f_i x_i}{\\sum f_i}\\), with \\(x_i\\) the class marks.\n" +
        "- Divide by the total frequency \\(\\sum f_i\\), never by the number of classes.\n" +
        "- Two missing frequencies need two equations: one from the total frequency, one from \\(\\sum f_i x_i = \\bar{x} \\times \\sum f_i\\).",
      formula: {
        label: "Direct method",
        latex: "\\text{class mark} = \\frac{\\text{lower} + \\text{upper}}{2} \\qquad \\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}",
        symbols: [
          { symbol: "f_i", meaning: "frequency of a class" },
          { symbol: "x_i", meaning: "class mark of that class" },
        ],
      },
      authoredExample: {
        prompt: "The classes 0-10, 10-20, 20-30 and 30-40 have frequencies 3, 5, 8 and 4. Find the mean.",
        steps: [
          "Class marks: 5, 15, 25, 35. \\(\\sum f = 3 + 5 + 8 + 4 = 20\\).",
          "\\(\\sum fx = 15 + 75 + 200 + 140 = 430\\).",
          "Mean \\(= \\frac{430}{20} = 21.5\\).",
        ],
        answer: "21.5",
      },
      selfCheckExample: {
        prompt: "The classes 10-20, 20-30 and 30-40 have frequencies 2, 5 and 3. Find the mean.",
        steps: [
          "Class marks 15, 25, 35. \\(\\sum f = 10\\).",
          "\\(\\sum fx = 30 + 125 + 105 = 260\\).",
          "Mean \\(= \\frac{260}{10} = 26\\).",
        ],
        answer: "26",
      },
      practiceSet: [
        { prompt: "What is the class mark of the class 25-35?", answer: "30" },
        { prompt: "For a frequency table, \\(\\sum f_i = 25\\) and \\(\\sum f_i x_i = 750\\). Find the mean.", answer: "30" },
        {
          prompt: "The mean of a frequency table is 12, \\(\\sum f_i = 15\\) and \\(\\sum f_i x_i = 150 + 6k\\). Find k.",
          answer: "\\(150 + 6k = 180\\), so \\(k = 5\\)",
        },
        { prompt: "A class has class mark 18 and class size 6. What are its limits?", answer: "15 and 21" },
      ],
      pyqExampleId: "a5a3b066-ef9e-47f7-8652-08636d2b473a",
      traps: [
        {
          title: "Multiplying by a class limit",
          body:
            "Each frequency is multiplied by the class mark, the mid-point. Using the lower or upper limit shifts the mean by half a class.",
        },
        {
          title: "Dividing by the number of classes",
          body:
            "The mean of a table is \\(\\sum f_i x_i\\) over the total frequency \\(\\sum f_i\\). A table with 6 classes and 50 students divides by 50, not 6.",
        },
        {
          title: "Using only one equation for two unknown frequencies",
          body:
            "When two frequencies are missing, the total frequency gives one equation and the mean gives the other. Solve them together, then check that the frequencies add to the total.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spistgm-assumed",
      name: "Assumed mean method",
      intuition:
        "Large class marks make big products. Pick one class mark near the middle as a guess a, measure every class mark from it, and the small deviations tell you how far the true mean is from the guess.",
      definition:
        "- Choose an **assumed mean** a, usually a class mark near the middle.\n" +
        "- Deviation \\(d_i = x_i - a\\), measured from the **class mark** \\(x_i\\) of each class.\n" +
        "- Mean \\(= a + \\dfrac{\\sum f_i d_i}{\\sum f_i}\\).\n" +
        "- Classes below a have negative deviations; keep the signs.",
      formula: {
        label: "Assumed mean method",
        latex: "d_i = x_i - a \\qquad \\bar{x} = a + \\frac{\\sum f_i d_i}{\\sum f_i}",
        symbols: [
          { symbol: "a", meaning: "assumed mean" },
          { symbol: "d_i", meaning: "deviation of a class mark from a" },
        ],
      },
      authoredExample: {
        prompt:
          "Class marks 15, 25, 35, 45 have frequencies 4, 6, 7, 3. Find the mean taking a = 25.",
        steps: [
          "Deviations \\(d = x - 25\\): \\(-10, 0, 10, 20\\).",
          "\\(\\sum fd = -40 + 0 + 70 + 60 = 90\\), and \\(\\sum f = 20\\).",
          "Mean \\(= 25 + \\frac{90}{20} = 25 + 4.5 = 29.5\\).",
        ],
        answer: "29.5",
      },
      selfCheckExample: {
        prompt: "With assumed mean a = 50, \\(\\sum f_i d_i = -60\\) and \\(\\sum f_i = 40\\). Find the mean.",
        steps: ["\\(\\frac{-60}{40} = -1.5\\).", "Mean \\(= 50 - 1.5 = 48.5\\)."],
        answer: "48.5",
      },
      practiceSet: [
        { prompt: "With a = 30, \\(\\sum f_i d_i = 120\\) and \\(\\sum f_i = 24\\), find the mean.", answer: "\\(30 + 5 = 35\\)" },
        { prompt: "In the assumed mean method, each deviation is measured from which point of its class?", answer: "Its class mark (mid-point)" },
        { prompt: "In the assumed mean method \\(\\sum f_i d_i = 0\\). What is the mean?", answer: "The assumed mean a" },
      ],
      pyqExampleId: "980e841e-2f07-4455-b882-4c86bd195a76",
      traps: [
        {
          title: "Dropping the minus signs",
          body:
            "Class marks below the assumed mean give negative deviations. Adding them as positive numbers makes \\(\\sum f_i d_i\\) too large and the mean too high.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spistgm-step",
      name: "Step deviation method",
      intuition:
        "When the classes all have the same width h, every deviation is a whole number of steps of h. Divide by h to work with small numbers, then multiply back by h at the end.",
      definition:
        "- \\(u_i = \\dfrac{x_i - a}{h}\\), where h is the class size.\n" +
        "- Mean \\(= a + h \\times \\dfrac{\\sum f_i u_i}{\\sum f_i}\\).\n" +
        "- If \\(u_i = \\frac{x_i - 40}{5}\\) is given, read off a = 40 and h = 5.",
      formula: {
        label: "Step deviation method",
        latex: "u_i = \\frac{x_i - a}{h} \\qquad \\bar{x} = a + h \\times \\frac{\\sum f_i u_i}{\\sum f_i}",
        symbols: [{ symbol: "h", meaning: "class size, the same for every class" }],
      },
      authoredExample: {
        prompt:
          "Class marks 15, 25, 35, 45, 55 have frequencies 2, 3, 5, 6, 4. Find the mean by the step deviation method with a = 35 and h = 10.",
        steps: [
          "\\(u = \\frac{x - 35}{10}\\): \\(-2, -1, 0, 1, 2\\).",
          "\\(\\sum fu = -4 - 3 + 0 + 6 + 8 = 7\\), and \\(\\sum f = 20\\).",
          "Mean \\(= 35 + 10 \\times \\frac{7}{20} = 35 + 3.5 = 38.5\\).",
        ],
        answer: "38.5",
      },
      selfCheckExample: {
        prompt: "With a = 40, h = 5, \\(\\sum f_i u_i = -8\\) and \\(\\sum f_i = 20\\), find the mean.",
        steps: ["\\(5 \\times \\frac{-8}{20} = -2\\).", "Mean \\(= 40 - 2 = 38\\)."],
        answer: "38",
      },
      practiceSet: [
        { prompt: "With a = 50 and h = 5, what is u for the class mark 65?", answer: "\\(\\frac{65 - 50}{5} = 3\\)" },
        { prompt: "With a = 100, h = 20, \\(\\sum f_i u_i = 15\\) and \\(\\sum f_i = 50\\), find the mean.", answer: "\\(100 + 20 \\times 0.3 = 106\\)" },
      ],
      pyqExampleId: "92403aae-5720-4865-9907-0acec7e200e1",
      traps: [
        {
          title: "Forgetting to multiply by h",
          body:
            "In the step deviation method, \\(\\frac{\\sum f_i u_i}{\\sum f_i}\\) counts steps, not marks. Multiply it by the class size h before adding it to a.",
        },
      ],
    },
  ],
};
