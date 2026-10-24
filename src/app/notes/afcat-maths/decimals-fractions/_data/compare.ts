import type { SubtopicNote } from "@/app/notes/_types";

export const AF_DF_COMPARE_NOTE: SubtopicNote = {
  subtopicName: "Comparing and Ordering",
  title: "Comparing and Ordering Decimals and Fractions",
  oneLineDefinition:
    "Give every decimal the same number of places, then compare them as whole numbers. For fractions, turn them into decimals or cross-multiply.",
  whyItMatters:
    "Most of this page is putting four decimals in order when they share the same digits, like 0.4, 0.44 and 0.404. The marks go on two habits: reading the longer decimal as the bigger one, and picking the reversed list when the question wanted the other order.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afdf-compare-two",
      name: "Comparing two decimals",
      intuition:
        "Zeros at the end of a decimal change nothing, so \\(0.7 = 0.70 = 0.700\\). Pad both numbers to the same length and the comparison becomes one between whole numbers.",
      definition:
        "- Add zeros on the right until both have the same number of places.\n" +
        "- Compare digit by digit from the left: tenths first, then hundredths. The first place that differs decides.\n" +
        "- A fraction compared with a decimal: turn the fraction into a decimal first (\\(\\tfrac25 = 0.4\\)).",
      formula: {
        label: "Padding with zeros",
        latex: "0.7 = 0.70 = 0.700",
      },
      authoredExample: {
        prompt: "Compare \\(0.709\\) and \\(0.79\\).",
        steps: [
          "Pad: \\(0.709\\) and \\(0.790\\).",
          "The tenths are both 7. In the hundredths, \\(0 < 9\\).",
        ],
        answer: "\\(0.709 < 0.79\\).",
      },
      selfCheckExample: {
        prompt: "Which is greater, \\(0.6\\) or \\(0.599\\)?",
        steps: ["Pad: \\(0.600\\) against \\(0.599\\).", "As whole numbers, \\(600 > 599\\)."],
        answer: "\\(0.6\\).",
      },
      practiceSet: [
        { prompt: "Fill in \\(>\\), \\(<\\) or \\(=\\): \\(0.25\\) _ \\(0.205\\)", answer: "\\(>\\)" },
        { prompt: "Fill in \\(>\\), \\(<\\) or \\(=\\): \\(0.08\\) _ \\(0.080\\)", answer: "\\(=\\)" },
        { prompt: "Which is smaller, \\(0.9\\) or \\(0.89\\)?", answer: "\\(0.89\\)" },
        { prompt: "Fill in \\(>\\), \\(<\\) or \\(=\\): \\(\\tfrac35\\) _ \\(0.6\\)", answer: "\\(=\\)" },
      ],
      pyqExampleId: "05583317-1e54-4b9e-b8c4-fafe2d59b343",
      traps: [
        {
          title: "More digits is not bigger",
          body: "\\(0.2\\) is greater than \\(0.1999\\). Pad to \\(0.2000\\) and compare: \\(2000 > 1999\\).",
        },
        {
          title: "Trailing zeros change nothing",
          body: "\\(0.50\\) and \\(0.5\\) are the same number. The option 'both are equal' is right whenever only zeros at the end differ.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-order-list",
      name: "Ordering a list, and picking the largest or smallest",
      intuition:
        "Pad every number in the list to the same length, read them as whole numbers, and sort those. The same step finds the largest or the smallest.",
      definition:
        "- Pad all the numbers to the longest length: \\(0.5, 0.505, 0.05\\) become \\(500, 505, 050\\) in thousandths.\n" +
        "- **Ascending** means smallest first; **descending** means largest first.\n" +
        "- Check the whole option, not only its first number: two options often start the same way.",
      formula: {
        label: "Order by padded value",
        latex: "0.5,\\ 0.505,\\ 0.05 \\;\\to\\; 500,\\ 505,\\ 50 \\text{ thousandths}",
      },
      authoredExample: {
        prompt: "Arrange \\(0.9, 0.099, 0.909, 0.09\\) in ascending order.",
        steps: [
          "Pad to three places: \\(0.900, 0.099, 0.909, 0.090\\).",
          "As thousandths: 900, 99, 909, 90.",
          "Smallest first: 90, 99, 900, 909.",
        ],
        answer: "\\(0.09, 0.099, 0.9, 0.909\\).",
      },
      selfCheckExample: {
        prompt: "Arrange \\(0.52, 0.5, 0.205, 0.025\\) in descending order.",
        steps: ["As thousandths: 520, 500, 205, 25.", "Largest first."],
        answer: "\\(0.52, 0.5, 0.205, 0.025\\).",
      },
      practiceSet: [
        { prompt: "Which is the smallest: \\(0.71, 0.7, 0.077, 0.707\\)?", answer: "\\(0.077\\)" },
        { prompt: "Which is the largest: \\(0.06, 0.6, 0.066, 0.606\\)?", answer: "\\(0.606\\)" },
        { prompt: "Arrange \\(0.12, 0.012, 0.21, 0.102\\) in ascending order.", answer: "\\(0.012, 0.102, 0.12, 0.21\\)" },
        { prompt: "Arrange \\(0.8, 0.808, 0.88, 0.088\\) in descending order.", answer: "\\(0.88, 0.808, 0.8, 0.088\\)" },
      ],
      pyqExampleId: "53773993-a4d8-4803-ba2a-425d232b54be",
      traps: [
        {
          title: "Read which order is asked",
          body: "The options nearly always include the right list reversed. Ascending is smallest first; descending is largest first.",
        },
        {
          title: "A longer decimal can be smaller",
          body: "\\(0.606\\) is less than \\(0.66\\): padded, \\(606 < 660\\). Ordering by length puts it in the wrong place.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-between",
      name: "A decimal between two decimals",
      intuition:
        "Pad both ends to the same length, then any number in between is between them. If they look side by side, pad one place more: between \\(0.6\\) and \\(0.61\\) lie \\(0.601\\) to \\(0.609\\).",
      definition:
        "- Pad both ends, then check each option against both ends.\n" +
        "- If the ends are next to each other at their length, add one more place.\n" +
        "- There are always infinitely many decimals between two different decimals.",
      formula: {
        label: "Between two decimals",
        latex: "a < x < b",
      },
      authoredExample: {
        prompt: "Find a decimal between \\(0.6\\) and \\(0.61\\).",
        steps: ["Pad: \\(0.600\\) and \\(0.610\\).", "Any number from \\(0.601\\) to \\(0.609\\) works, for example \\(0.605\\)."],
        answer: "\\(0.605\\) (or any of \\(0.601\\) to \\(0.609\\)).",
      },
      selfCheckExample: {
        prompt: "Which of \\(0.15, 0.25, 0.205, 0.3\\) lies between \\(0.2\\) and \\(0.21\\)?",
        steps: ["Pad to thousandths: the ends are 200 and 210.", "Only 205 lies between them."],
        answer: "\\(0.205\\).",
      },
      practiceSet: [
        { prompt: "Which lies between \\(0.8\\) and \\(0.9\\): \\(0.79\\), \\(0.85\\) or \\(0.95\\)?", answer: "\\(0.85\\)" },
        { prompt: "Name a decimal between \\(0.01\\) and \\(0.02\\).", answer: "For example \\(0.015\\)" },
        { prompt: "Which lies between \\(0.12\\) and \\(0.13\\): \\(0.115\\), \\(0.125\\) or \\(0.135\\)?", answer: "\\(0.125\\)" },
      ],
      pyqExampleId: "20fa6f40-8fdf-4dad-857d-00a535fc008a",
      traps: [
        {
          title: "Check against both ends",
          body: "\\(0.15\\) is above \\(0.1\\) but not below \\(0.12\\), so it is not between \\(0.1\\) and \\(0.12\\). An option passing one end only is the usual wrong pick.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-compare-fractions",
      name: "Comparing and ordering fractions",
      intuition:
        "Two fractions are hard to compare by eye when both numerator and denominator differ. Turn each into a decimal, or cross-multiply and compare the two products.",
      definition:
        "- **Decimals**: divide and compare to two or three places (\\(\\tfrac37 \\approx 0.429\\)).\n" +
        "- **Cross-multiplying**: \\(\\tfrac ab > \\tfrac cd\\) when \\(a \\times d > b \\times c\\) (for positive numbers).\n" +
        "- Same numerator: the smaller denominator is the larger fraction. Same denominator: the larger numerator is larger.",
      formula: {
        label: "Cross-multiplying",
        latex: "\\dfrac ab > \\dfrac cd \\;\\text{means}\\; ad > bc",
      },
      authoredExample: {
        prompt: "Arrange \\(\\tfrac37, \\tfrac25, \\tfrac49\\) in ascending order.",
        steps: [
          "As decimals: \\(\\tfrac37 \\approx 0.429\\), \\(\\tfrac25 = 0.4\\), \\(\\tfrac49 \\approx 0.444\\).",
          "Smallest first: \\(0.4, 0.429, 0.444\\).",
        ],
        answer: "\\(\\tfrac25, \\tfrac37, \\tfrac49\\).",
      },
      selfCheckExample: {
        prompt: "Which is larger, \\(\\tfrac{5}{12}\\) or \\(\\tfrac37\\)?",
        steps: ["Cross-multiply: \\(5 \\times 7 = 35\\) and \\(12 \\times 3 = 36\\).", "\\(35 < 36\\), so \\(\\tfrac{5}{12} < \\tfrac37\\)."],
        answer: "\\(\\tfrac37\\).",
      },
      practiceSet: [
        { prompt: "Which is larger, \\(\\tfrac47\\) or \\(\\tfrac59\\)?", answer: "\\(\\tfrac47\\)", method: "\\(36 > 35\\)." },
        { prompt: "Which is the smallest: \\(\\tfrac12, \\tfrac{5}{11}, \\tfrac{6}{13}\\)?", answer: "\\(\\tfrac{5}{11}\\)" },
        { prompt: "Arrange \\(\\tfrac34, \\tfrac58, \\tfrac{7}{10}\\) in ascending order.", answer: "\\(\\tfrac58, \\tfrac{7}{10}, \\tfrac34\\)" },
        { prompt: "Which is larger, \\(\\tfrac{11}{12}\\) or \\(\\tfrac{12}{13}\\)?", answer: "\\(\\tfrac{12}{13}\\)", method: "\\(143 < 144\\)." },
      ],
      pyqExampleId: "530e73de-4d5c-4b58-8c0b-45d9456d7681",
      traps: [
        {
          title: "A bigger denominator is smaller only when the numerators match",
          body: "\\(\\tfrac17 < \\tfrac15\\), but \\(\\tfrac67 \\approx 0.857\\) is larger than \\(\\tfrac45 = 0.8\\).",
        },
        {
          title: "Cross-multiply the right pairs",
          body: "For \\(\\tfrac ab\\) against \\(\\tfrac cd\\), compare \\(a \\times d\\) with \\(b \\times c\\). Multiplying the two numerators together tells you nothing.",
        },
      ],
    },
  ],
};
