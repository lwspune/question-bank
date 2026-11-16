import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_DI_GRAPHS_NOTE: SubtopicNote = {
  subtopicName: "Reading Tables and Graphs",
  title: "Reading Tables and Graphs",
  oneLineDefinition:
    "Read off only the bars, points or classes a question names, add them into the two totals it compares, and finish with one division: a percentage, a ratio, an average or a growth factor.",
  whyItMatters:
    "16 questions in the Tier II bank, 14 EASY and 2 MODERATE. They are quick once the right values are picked out; the usual loss is adding a wrong year or class.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2dirg-percent",
      name: "Percentage of, and percent more or less",
      intuition:
        "Most graph questions compare two totals read off the chart: one as a percentage of the other, or how much more or less one is than the other. Add up the named values first, then do a single division.",
      definition:
        "- 'A is what percentage of B': \\(\\frac{A}{B} \\times 100\\).\n" +
        "- 'A is what percentage more than B': \\(\\frac{A - B}{B} \\times 100\\); 'less than': \\(\\frac{B - A}{B} \\times 100\\). The base is the value after 'than'.\n" +
        "- Add only the bars, years or classes the question names. In a histogram, '55 or more but less than 75' takes the classes from 55-60 up to 70-75.\n" +
        "- Look at how far apart the options are before dividing: if they differ by more than 1%, a rough division is enough.",
      formula: {
        label: "Comparing two totals",
        latex: "\\frac{A}{B} \\times 100 \\;\\text{(A as a percentage of B)}, \\quad \\frac{A - B}{B} \\times 100 \\;\\text{(A more than B)}",
      },
      authoredExample: {
        prompt: "A shop's sales (in ₹ thousands) by month:\n\n| Month | Jan | Feb | Mar | Apr |\n|---|---|---|---|---|\n| Sales | 120 | 150 | 130 | 170 |\n\nBy what percentage are the February and April sales together more than the January and March sales together?",
        steps: ["February and April: \\(150 + 170 = 320\\). January and March: \\(120 + 130 = 250\\).", "\\(\\frac{320 - 250}{250} \\times 100 = 28\\%\\)."],
        answer: "28%",
      },
      selfCheckExample: {
        prompt: "A shop sold goods worth ₹130 thousand in March and ₹150 thousand in February. March's sales are what percentage of February's?",
        steps: ["\\(\\frac{130}{150} \\times 100\\).", "\\(= 86\\frac{2}{3}\\%\\)."],
        answer: "\\(86\\frac{2}{3}\\%\\)",
      },
      practiceSet: [
        { prompt: "A graph shows 240 cars sold in 2022 and 300 in 2023. By what percentage did sales rise?", answer: "25%" },
        { prompt: "300 is what percentage more than 240, and 240 is what percentage less than 300?", answer: "25% and 20%" },
        { prompt: "In a histogram, the classes 40-50, 50-60 and 60-70 hold 18, 27 and 15 people. How many are 50 or older but under 70?", answer: "42" },
      ],
      pyqExampleId: "4b3925f1-e3a0-4bc7-85b7-20a9a88dfa1e",
      traps: [
        {
          title: "Dividing by the wrong total",
          body: "'Is what percentage less than B' divides by B, the value after 'than'. 240 is 20% less than 300, while 300 is 25% more than 240.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2dirg-ratio",
      name: "Ratios, averages and growth from a graph",
      intuition:
        "The other common graph questions ask for a ratio of two totals, an average over some years, or a growth rate carried one more year forward. Each takes one line once the right values are picked out.",
      definition:
        "- Ratio of totals: add each side, then divide both by their largest common factor.\n" +
        "- Average over chosen years: the sum of those values \\(\\div\\) the number of years.\n" +
        "- 'Grows by the same percentage as last year': multiply by the same factor, this year \\(\\div\\) last year.\n" +
        "- Profit as a percentage of revenue: \\(\\frac{\\text{revenue} - \\text{expenditure}}{\\text{revenue}} \\times 100\\), year by year.\n" +
        "- When one chart gives a ratio and another a total, call the two groups x and y and solve the sum and the weighted sum together.",
      formula: {
        label: "Carrying a growth rate forward",
        latex: "\\text{next value} = \\text{this value} \\times \\frac{\\text{this value}}{\\text{last value}}",
      },
      authoredExample: {
        prompt: "Production (thousand units):\n\n| Year | 2019 | 2020 | 2021 | 2022 |\n|---|---|---|---|---|\n| Plant P | 200 | 250 | 300 | 360 |\n| Plant Q | 180 | 210 | 240 | 270 |\n\nFind the ratio of P's production in 2019 and 2021 together to Q's production in 2020 and 2022 together.",
        steps: ["P: \\(200 + 300 = 500\\). Q: \\(210 + 270 = 480\\).", "\\(500 : 480 = 25 : 24\\)."],
        answer: "25 : 24",
      },
      selfCheckExample: {
        prompt: "A plant made 300 thousand units in 2021 and 360 thousand in 2022. If 2023 grows by the same percentage as 2022, how many units does it make in 2023?",
        steps: ["The 2022 factor is \\(\\frac{360}{300} = 1.2\\).", "2023: \\(360 \\times 1.2 = 432\\) thousand."],
        answer: "432 thousand",
      },
      practiceSet: [
        { prompt: "A company's revenue is 250 and its expenditure 190 (₹ crores). Find the profit as a percentage of revenue.", answer: "24%" },
        { prompt: "A graph shows 120, 150 and 180 over three years. Find the average.", answer: "150" },
        { prompt: "Write the ratio 360 : 240 in its lowest terms.", answer: "3 : 2" },
      ],
      pyqExampleId: "da02ffab-588a-4e76-aa34-8c678803565a",
      traps: [
        {
          title: "Growing by the same amount instead of the same percentage",
          body: "A rise from 300 to 360 is 60 units but 20%. 'The same percentage' next year gives 432, not 420.",
        },
      ],
    },
  ],
};
