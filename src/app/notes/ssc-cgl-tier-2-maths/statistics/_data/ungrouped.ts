import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ST_UNGROUPED_NOTE: SubtopicNote = {
  subtopicName: "Mean, Median and Mode of Ungrouped Data",
  title: "Mean, Median and Mode of Ungrouped Data",
  oneLineDefinition:
    "For a plain list of numbers the mode is the value that turns up most, the median is the middle value once the list is sorted, and the standard deviation measures the spread around the mean.",
  whyItMatters:
    "10 questions in the Tier II bank, every one EASY. Each takes careful counting or sorting, and a slip in either is the only way to lose the mark.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2stun-mode",
      name: "Mode",
      intuition:
        "The mode is simply the value that turns up most often. A list can have one mode, two (or more) when there is a tie, or none if every value appears once.",
      definition:
        "- Count how often each value appears; the most frequent value is the mode.\n" +
        "- A tie for the top count gives two modes; a question may then ask for their product or sum.\n" +
        "- With letters, the repeated term is the mode: set it equal to the given value.\n" +
        "- 'Above average' questions: find the mean as well and count the values above it.",
      formula: {
        label: "Mode",
        latex: "\\text{mode} = \\text{the value with the highest frequency}",
      },
      authoredExample: {
        prompt: "Find the mode of 4, 9, 6, 9, 3, 6, 9, 2, 6, 9.",
        steps: ["9 appears 4 times, 6 three times, every other value once.", "The mode is 9."],
        answer: "9",
      },
      selfCheckExample: {
        prompt: "The mode of the set \\(\\{b, b + 3, b + 3, b + 5, b + 8\\}\\) is 21. Find b.",
        steps: ["\\(b + 3\\) is the only repeated value, so it is the mode.", "\\(b + 3 = 21\\), so \\(b = 18\\)."],
        answer: "18",
      },
      practiceSet: [
        { prompt: "Find the mode of 2, 5, 5, 7, 2, 5, 8.", answer: "5" },
        { prompt: "The marks 12, 15, 12, 18, 15, 20 have two modes. Find their sum.", answer: "27" },
        { prompt: "Marks are 4, 6, 6, 7, 9, 10. How many are above the average?", answer: "2 (9 and 10)", method: "The average is 7." },
      ],
      pyqExampleId: "5cea96d0-d3c6-4c4b-acd8-a1c1772f9a85",
      traps: [
        {
          title: "Taking the largest value as the mode",
          body: "The mode is the most FREQUENT value, not the biggest. In 2, 5, 5, 8 the mode is 5, though 8 is larger.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2stun-median",
      name: "Median",
      intuition:
        "The median is the value in the middle once the list is sorted. With an odd count there is one middle value; with an even count it is the average of the two in the middle.",
      definition:
        "- Sort the values first, smallest to largest.\n" +
        "- n odd: the median is the \\(\\frac{n + 1}{2}\\)-th value.\n" +
        "- n even: the median is the average of the \\(\\frac{n}{2}\\)-th and \\(\\left(\\frac{n}{2} + 1\\right)\\)-th values.\n" +
        "- Changing only values above (or below) the middle leaves the median unchanged.",
      formula: {
        label: "Position of the median",
        latex: "n \\text{ odd: the } \\tfrac{n + 1}{2}\\text{-th value}; \\quad n \\text{ even: the mean of the } \\tfrac{n}{2}\\text{-th and } \\left(\\tfrac{n}{2} + 1\\right)\\text{-th}",
      },
      authoredExample: {
        prompt: "Find the median of 41, 37, 45, 39, 50, 43.",
        steps: ["Sorted: 37, 39, 41, 43, 45, 50 (6 values).", "Median \\(= \\frac{41 + 43}{2} = 42\\)."],
        answer: "42",
      },
      selfCheckExample: {
        prompt: "The median of 9 distinct values is 30. The three smallest values are each lowered by 5. What is the new median?",
        steps: ["The median is the 5th value in order.", "The three smallest stay below it, so the 5th value, 30, is unchanged."],
        answer: "30",
      },
      practiceSet: [
        { prompt: "Find the median of 8, 3, 5, 9, 1.", answer: "5" },
        { prompt: "Find the median of 12, 7, 15, 10.", answer: "11" },
        { prompt: "The values 2, 4, x, 9, 11 are already in order and their median is 6. Find x.", answer: "6" },
      ],
      pyqExampleId: "feeb7016-582b-48ca-8487-4383a7a8c1ad",
      traps: [
        {
          title: "Reading the middle of the unsorted list",
          body: "In 32, 25, 33, 27, 35 the middle number as written is 33, but sorted the list is 25, 27, 32, 33, 35 and the median is 32. Sort first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2stun-spread",
      name: "Standard deviation",
      intuition:
        "The standard deviation measures how far the values sit from their mean on average. Shifting every value by the same amount moves the mean too, so the spread, and the standard deviation, do not change.",
      definition:
        "- Variance \\(= \\frac{\\sum (x - \\bar{x})^2}{n}\\), or \\(\\frac{\\sum x^2}{n} - \\bar{x}^2\\); the standard deviation is its square root.\n" +
        "- Adding or subtracting a constant from every value leaves the standard deviation the same.\n" +
        "- Multiplying every value by k multiplies the standard deviation by \\(|k|\\).",
      formula: {
        label: "Standard deviation",
        latex: "\\sigma = \\sqrt{\\frac{\\sum x^2}{n} - \\bar{x}^2}",
      },
      authoredExample: {
        prompt: "Find the standard deviation of 2, 4, 6, 8.",
        steps: [
          "Mean \\(= 5\\); squared deviations: 9, 1, 1, 9, total 20.",
          "Variance \\(= \\frac{20}{4} = 5\\), so \\(\\sigma = \\sqrt{5} \\approx 2.24\\).",
        ],
        answer: "\\(\\sqrt{5} \\approx 2.24\\)",
      },
      selfCheckExample: {
        prompt: "A set of values has standard deviation 4. Every value is doubled and then increased by 3. Find the new standard deviation.",
        steps: ["Adding 3 changes nothing; doubling doubles the spread.", "New standard deviation \\(= 8\\)."],
        answer: "8",
      },
      practiceSet: [
        { prompt: "Find the standard deviation of 5, 5, 5, 5.", answer: "0" },
        { prompt: "A set has standard deviation 6. Each value is increased by 10. Find the new standard deviation.", answer: "6" },
        { prompt: "Find the variance of 1, 3, 5.", answer: "\\(\\frac{8}{3}\\)" },
      ],
      pyqExampleId: "0d3d0e14-7767-47c7-a8f5-b17c5e8e195e",
      traps: [
        {
          title: "Shifting the standard deviation with the values",
          body: "Subtracting 7 from every value lowers the mean by 7 but leaves every distance from the mean the same, so the standard deviation does not change.",
        },
      ],
    },
  ],
};
