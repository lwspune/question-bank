import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_PST_STATISTICS_NOTE: SubtopicNote = {
  subtopicName: "Averages and Spread",
  title: "Mean, Median, Mode and Spread",
  oneLineDefinition:
    "The mean, median and mode describe the centre of a data set, the range and standard deviation describe its spread, and a mean is always a total in disguise.",
  whyItMatters:
    "The statistics questions so far all come from the older papers (2015 to 2022): a mean after the data change, a combined mean for two groups, and a median or a largest value found from the mean and other facts. The ministry papers have not asked one yet, but averages are on the syllabus.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-pst-averages",
      name: "Mean, median, mode and range",
      intuition:
        "The mean shares the total out equally; the median is the middle value once the data are in order; the mode is the most common value. The most useful trick is to turn a mean back into a total: if 5 numbers have mean 8, they add up to 40, whatever they are.",
      definition:
        "- **Mean** \\(\\bar{x} = \\dfrac{\\text{sum of the values}}{\\text{number of values}}\\), so the **total** is mean \\(\\times\\) number.\n" +
        "- **Median**: put the values in order; for an odd count take the middle one, for an even count the mean of the two middle ones.\n" +
        "- **Mode**: the value that occurs most often (there can be more than one).\n" +
        "- **Range**: largest value minus smallest value.",
      formula: {
        label: "Mean",
        latex: "\\bar{x} = \\frac{\\sum x}{n} \\qquad \\sum x = n\\,\\bar{x}",
        symbols: [
          { symbol: "\\(\\sum x\\)", meaning: "sum of all the values" },
          { symbol: "\\(n\\)", meaning: "number of values" },
        ],
      },
      authoredExample: {
        prompt: "Find the mean, median, mode and range of 7, 3, 9, 3, 12, 8.",
        steps: [
          "Order them: 3, 3, 7, 8, 9, 12.",
          "Mean: \\(42 / 6 = 7\\).",
          "Six values, so the median is the mean of the 3rd and 4th: \\((7 + 8)/2 = 7.5\\).",
          "Mode 3; range \\(12 - 3 = 9\\).",
        ],
        answer: "Mean 7, median 7.5, mode 3, range 9",
      },
      selfCheckExample: {
        prompt: "Five numbers have a mean of 8. Four of them are 5, 9, 11 and 6. What is the median of all five?",
        options: ["8", "7.75", "7.5", "9", "6"],
        steps: [
          "Total: \\(5 \\times 8 = 40\\). The four known numbers add to 31, so the fifth is 9.",
          "In order: 5, 6, 9, 9, 11. The median is 9.",
          "A is the mean, not the median; B is the mean of the four known numbers; C is their median, before the fifth number is found.",
        ],
        answer: "(D) 9",
      },
      practiceSet: [
        { prompt: "Median of 4, 1, 9, 6, 2?", answer: "4", method: "Order: 1, 2, 4, 6, 9" },
        { prompt: "Mode of 2, 5, 5, 7, 7, 7?", answer: "7" },
        { prompt: "Range of 15, 22, 9, 30?", answer: "21" },
        { prompt: "Three numbers have mean 6. Two of them are 4 and 5. Find the third.", answer: "9", method: "Total 18" },
      ],
      traps: [
        {
          title: "Order the data before finding the median",
          body: "The median is the middle of the ordered list, not the middle of the list as written. With an even number of values it is the mean of the two middle values, which need not be one of the data.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-pst-mean-changes",
      name: "Combined and weighted means, and how averages change when data change",
      intuition:
        "Two groups pooled together give a mean pulled towards the larger group, because the larger group contributes more to the total. When every value is shifted by the same amount, the centre moves but the spread does not; when every value is scaled, centre and spread both scale.",
      definition:
        "- **Combined mean** of two groups: add the totals, divide by the total number. It equals the simple average of the two means only when the groups are the same size.\n" +
        "- A **weighted mean** works the same way: \\(\\bar{x} = \\dfrac{\\sum w x}{\\sum w}\\), with each value \\(x\\) counted \\(w\\) times.\n" +
        "- Adding \\(c\\) to every value adds \\(c\\) to the mean, median and mode; the range and standard deviation do not change.\n" +
        "- Multiplying every value by \\(k\\) multiplies the mean, median, mode and range by \\(k\\) (the spread by \\(|k|\\)).\n" +
        "- Adding a new value above the mean raises the mean; below the mean lowers it.",
      formula: {
        label: "Combined mean",
        latex: "\\bar{x} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}",
        symbols: [
          { symbol: "\\(n_1, n_2\\)", meaning: "sizes of the two groups" },
          { symbol: "\\(\\bar{x}_1, \\bar{x}_2\\)", meaning: "their means" },
        ],
      },
      authoredExample: {
        prompt: "Class A has 20 students with a mean mark of 64; class B has 30 students with a mean mark of 74. What is the mean mark of all 50 students?",
        steps: [
          "Totals: \\(20 \\times 64 = 1280\\) and \\(30 \\times 74 = 2220\\).",
          "Combined: \\((1280 + 2220) / 50 = 3500 / 50 = 70\\).",
          "Not 69, the simple average of 64 and 74: the larger class pulls the mean towards its own.",
        ],
        answer: "70",
      },
      selfCheckExample: {
        prompt: "Ten numbers have a mean of 12. Each number is multiplied by 3 and then 5 is added to it. What is the new mean?",
        options: ["36", "41", "51", "17", "12"],
        steps: [
          "Multiplying by 3 gives a mean of 36; adding 5 gives 41.",
          "C adds 5 before multiplying; A forgets the \\(+5\\); D forgets the \\(\\times 3\\).",
        ],
        answer: "(B) 41",
      },
      practiceSet: [
        { prompt: "Four numbers have mean 10. A fifth number, 20, is added. New mean?", answer: "12", method: "\\((40 + 20)/5\\)" },
        { prompt: "15 values with mean 8 are pooled with 5 values with mean 12. Combined mean?", answer: "9", method: "\\((120 + 60)/20\\)" },
        { prompt: "7 is added to every value in a data set. What happens to the range?", answer: "Nothing: it stays the same" },
        { prompt: "Six values have mean 5. The value 11 is removed. New mean?", answer: "3.8", method: "\\((30 - 11)/5\\)" },
      ],
      traps: [
        {
          title: "A combined mean is not the average of the two means",
          body: "Pooling a group of 20 and a group of 30 weights the second more. Work through the totals; the simple average of the two means is right only when the groups are equal in size.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-pst-frequency-sd",
      name: "Frequency tables and standard deviation (in outline)",
      intuition:
        "A frequency table is a shorthand for a long list: \"value 2, frequency 6\" means six 2s. The standard deviation measures how far the values typically sit from the mean: tightly bunched data have a small one, scattered data a large one.",
      definition:
        "- In a **frequency table**, value \\(x\\) occurs \\(f\\) times. The number of values is \\(\\sum f\\) and the mean is \\(\\dfrac{\\sum f x}{\\sum f}\\).\n" +
        "- The median is the value in position \\(\\tfrac{n + 1}{2}\\) of the ordered list; use running totals of \\(f\\) to find it. The mode is the value with the highest frequency.\n" +
        "- **Standard deviation** \\(\\sigma\\): the square root of the mean of the squared distances from the mean. Its square is the **variance**.\n" +
        "- \\(\\sigma = 0\\) only when all values are equal. Adding a constant leaves \\(\\sigma\\) unchanged; multiplying by \\(k\\) multiplies \\(\\sigma\\) by \\(|k|\\).",
      formula: {
        label: "Mean of a frequency table and standard deviation",
        latex: "\\bar{x} = \\frac{\\sum f x}{\\sum f} \\qquad \\sigma = \\sqrt{\\frac{\\sum (x - \\bar{x})^2}{n}}",
        symbols: [
          { symbol: "\\(f\\)", meaning: "frequency of the value \\(x\\)" },
          { symbol: "\\(\\sigma\\)", meaning: "standard deviation" },
        ],
      },
      authoredExample: {
        prompt:
          "A football team's goals in 20 matches: 0 goals in 4 matches, 1 goal in 7, 2 goals in 6, 3 goals in 3. Find the mean, the median and the mode.",
        steps: [
          "\\(\\sum f = 20\\); \\(\\sum f x = 0 + 7 + 12 + 9 = 28\\). Mean \\(= 28 / 20 = 1.4\\) goals.",
          "Median: the mean of the 10th and 11th values. Running totals: 4 zeros, then 11 values up to the 1s. Both the 10th and the 11th are 1, so the median is 1.",
          "Mode: 1 goal (frequency 7).",
        ],
        answer: "Mean 1.4, median 1, mode 1",
      },
      selfCheckExample: {
        prompt: "What is the standard deviation of the data 2, 4, 4, 4, 5, 5, 7, 9?",
        options: ["4", "5", "2", "\\(\\sqrt{2}\\)", "1"],
        steps: [
          "Mean: \\(40 / 8 = 5\\).",
          "Squared distances: 9, 1, 1, 1, 0, 0, 4, 16; their sum is 32 and their mean is \\(32 / 8 = 4\\).",
          "\\(\\sigma = \\sqrt{4} = 2\\). A is the variance, the step before the square root; B is the mean.",
        ],
        answer: "(C) 2",
      },
      practiceSet: [
        { prompt: "Standard deviation of 5, 5, 5, 5?", answer: "0", method: "No spread" },
        { prompt: "Which has the larger standard deviation: 10, 20, 30 or 19, 20, 21?", answer: "10, 20, 30", method: "Same mean, more spread" },
        { prompt: "Values 1, 2, 3 occur with frequencies 2, 5, 3. Find the mean.", answer: "2.1", method: "\\((2 + 10 + 9)/10\\)" },
        { prompt: "Every value in a data set is doubled. What happens to the standard deviation?", answer: "It doubles" },
      ],
      traps: [
        {
          title: "Shifting every value does not change the spread",
          body: "Adding the same number to every value moves the mean but leaves every distance from the mean the same, so the standard deviation and the range do not change. Only scaling changes the spread.",
        },
      ],
    },
  ],
};
