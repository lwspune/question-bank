import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ST_MEDIAN_MODE_NOTE: SubtopicNote = {
  subtopicName: "Median and Mode of Raw Data",
  title: "Median and Mode of Raw Data",
  oneLineDefinition:
    "The median is the middle value once the data is in order, and the mode is the value that occurs most often.",
  whyItMatters:
    "Eight questions in the bank, seven of them EASY. Three only ask which average is which, and the rest put a short list in order for the median or count how often each value occurs for the mode, sometimes with one value left unknown.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spistmm-averages",
      name: "Mean, median and mode side by side",
      intuition:
        "All three are called measures of central tendency because each picks one number to stand for the whole list. They pick it in different ways, and the options in a definition question are built from mixing those ways up.",
      definition:
        "Three words settle most definition questions:\n" +
        "- **Mean** uses every value.\n" +
        "- **Median** is the middle value, so it ignores how big the end values are.\n" +
        "- **Mode** is the most frequent value. A list can have two modes, or none if every value occurs once.",
      table: {
        columns: ["Measure", "What it is", "How to find it"],
        rows: [
          { cells: ["Mean", "The average", "Add all the values and divide by how many there are"] },
          { cells: ["Median", "The middle value", "Put the values in order and take the middle one"] },
          { cells: ["Mode", "The most frequent value", "Count how often each value occurs"] },
          {
            cells: ["Smallest and largest value removed", "The median stays the same", "The middle of an ordered list is still the middle"],
            noteAmber: "The mean uses every value, so it usually changes. The mode changes only if an end value was the most frequent one.",
          },
        ],
        caption: "The mode is the most frequent value, the median the middle one: 'middle most frequent' is a mix of the two.",
      },
      selfCheckExample: {
        prompt: "Find the median and the mode of 8, 3, 5, 3, 6.",
        steps: ["In order: 3, 3, 5, 6, 8.", "The middle (3rd) value is 5, so the median is 5.", "3 occurs twice and every other value once, so the mode is 3."],
        answer: "Median 5, mode 3",
      },
      practiceSet: [
        { prompt: "Which average is the middle value of data arranged in order?", answer: "The median" },
        { prompt: "Which average uses every value of the data?", answer: "The mean" },
        { prompt: "Which average is the value that occurs most often?", answer: "The mode" },
        {
          prompt: "The smallest and largest values of an ordered list are removed. Which average is sure to stay the same?",
          answer: "The median",
        },
      ],
      pyqExampleId: "9798b9a7-f849-4949-91c5-5d4e39a81f70",
      traps: [
        {
          title: "Calling the mode the middle value",
          body:
            "The middle value of ordered data is the median. The mode is the most frequent value, whether or not it sits in the middle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spistmm-median",
      name: "Median of a list",
      intuition:
        "Line the values up from smallest to largest. With an odd number of values one sits exactly in the middle; with an even number two share the middle, and the median is halfway between them.",
      definition:
        "- **Put the values in order first.** The median of an unordered list means nothing.\n" +
        "- n odd: the median is the \\(\\left(\\frac{n + 1}{2}\\right)\\)th value.\n" +
        "- n even: the median is the mean of the \\(\\left(\\frac{n}{2}\\right)\\)th and \\(\\left(\\frac{n}{2} + 1\\right)\\)th values.\n" +
        "- If the median and the two middle values contain an unknown, set their mean equal to the median and solve.",
      formula: {
        label: "Position of the median",
        latex:
          "n \\text{ odd: } \\left(\\frac{n + 1}{2}\\right)\\text{th value} \\qquad n \\text{ even: mean of the } \\left(\\frac{n}{2}\\right)\\text{th and } \\left(\\frac{n}{2} + 1\\right)\\text{th values}",
      },
      authoredExample: {
        prompt: "Find the median of 12, 7, 19, 4, 15, 10.",
        steps: [
          "In order: 4, 7, 10, 12, 15, 19.",
          "There are 6 values, so the median is the mean of the 3rd and 4th: 10 and 12.",
          "Median \\(= \\frac{10 + 12}{2} = 11\\).",
        ],
        answer: "11",
      },
      selfCheckExample: {
        prompt: "Find the median of 31, 18, 25, 40, 22.",
        steps: ["In order: 18, 22, 25, 31, 40.", "There are 5 values, so the median is the 3rd: 25."],
        answer: "25",
      },
      practiceSet: [
        { prompt: "15 values are arranged in order. Which value is the median?", answer: "The 8th" },
        { prompt: "Find the median of 3, 9, 1, 7.", answer: "In order 1, 3, 7, 9: \\(\\frac{3 + 7}{2} = 5\\)" },
        { prompt: "The ordered data 4, 6, x, 11, 13 has median 9. Find x.", answer: "9 (the 3rd value is the median)" },
        { prompt: "Find the median of the first 10 natural numbers.", answer: "\\(\\frac{5 + 6}{2} = 5.5\\)" },
      ],
      pyqExampleId: "5de9bd35-c3df-4be2-9094-37b21022af11",
      traps: [
        {
          title: "Taking the middle of an unordered list",
          body:
            "In 59, 46, 30, 23, 27 the middle number as written is 30, but in order the list is 23, 27, 30, 46, 59. Always sort before you count to the middle.",
        },
        {
          title: "Giving the position for the value",
          body:
            "For 9 values, \\(\\frac{9 + 1}{2} = 5\\) says the median is the 5th value. The answer is whatever number stands 5th, not 5.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spistmm-mode",
      name: "Mode of a list",
      intuition:
        "Make a quick tally of each value. The one with the longest tally is the mode. If a value is unknown, ask what it must be to break a tie.",
      definition:
        "- Tally every value, then add the tallies up: the total must equal the number of values.\n" +
        "- The mode is the value with the largest count.\n" +
        "- If two values tie and the mode is given as one of them, the unknown value must be that one.",
      authoredExample: {
        prompt: "Find the mode of 3, 6, 6, 2, 9, 3, 6, 4.",
        steps: ["Tally: 6 occurs 3 times, 3 occurs twice, and 2, 9, 4 once each (total 8).", "The largest count belongs to 6."],
        answer: "6",
      },
      selfCheckExample: {
        prompt: "Find the mode of 11, 14, 11, 17, 14, 11, 19.",
        steps: ["11 occurs 3 times, 14 twice, 17 and 19 once each.", "The mode is 11."],
        answer: "11",
      },
      practiceSet: [
        { prompt: "Find the mode of 2, 4, 4, 7, 7, 7, 9.", answer: "7" },
        { prompt: "The mode of 1, 3, 3, 5, 5, x is 5. Find x.", answer: "5 (it breaks the tie between 3 and 5)" },
        { prompt: "How many modes does 1, 1, 2, 2, 3 have?", answer: "Two: 1 and 2" },
      ],
      pyqExampleId: "13f46a4e-1ffc-4bfa-975e-2a08ff0309b3",
      traps: [
        {
          title: "Losing count in a long list",
          body:
            "In a list of 15 numbers, two values can look equally common at a glance. Tally them and check that the tallies add to 15 before you choose.",
        },
      ],
    },
  ],
};
