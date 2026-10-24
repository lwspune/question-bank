import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AV_SEQUENCES_NOTE: SubtopicNote = {
  subtopicName: "Averages of Consecutive Numbers",
  title: "Averages of Consecutive Numbers",
  oneLineDefinition:
    "Numbers that go up in equal steps average to their middle term, which is also the mean of the first and the last.",
  whyItMatters:
    "Twelve questions in the bank, eight EASY and four MODERATE: consecutive or evenly spaced numbers, multiples of a number in a range, and the first n natural numbers or their squares. Each falls to one formula, with no adding up at all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscavsq-middle",
      name: "Average of numbers in equal steps",
      intuition:
        "In 3, 5, 7, 9, 11 the first and last pair up to 14, and so do the second and fourth. Every pair averages 7, the middle term, so the whole list does too.",
      definition:
        "- Numbers that rise by the same step form an **arithmetic progression (AP)**: consecutive numbers, consecutive even or odd numbers, ages of children born at equal gaps.\n" +
        "- **Average of an AP \\(=\\) middle term \\(= \\frac{\\text{first} + \\text{last}}{2}\\).**\n" +
        "- Sum \\(=\\) count \\(\\times\\) middle term. Given the sum, the middle term is sum \\(\\div\\) count, then step out to the ends.\n" +
        "- An even count has two middle terms and the average lies halfway between them. So six consecutive integers always average to a number ending in .5, and four consecutive odd numbers average to an even number (5, 7, 9, 11 average 8).\n" +
        "- For an even count, write the terms as \\(a, a + d, a + 2d, \\ldots\\) and solve for \\(a\\).",
      formula: {
        label: "Average of an arithmetic progression",
        latex: "\\text{Average} = \\frac{\\text{first} + \\text{last}}{2} \\qquad \\text{Sum} = \\text{count} \\times \\text{middle term}",
      },
      authoredExample: {
        prompt: "The sum of seven consecutive odd numbers is 147. What is the largest of them?",
        steps: [
          "Middle (4th) number \\(= 147 \\div 7 = 21\\).",
          "Step out by 2 three times: the numbers are 15, 17, 19, 21, 23, 25, 27.",
          "Full method check: with smallest \\(a\\), \\(7a + 42 = 147\\), so \\(a = 15\\) and the largest is \\(15 + 12 = 27\\).",
        ],
        answer: "27",
      },
      selfCheckExample: {
        prompt: "Four brothers were born 3 years apart, and the sum of their ages is 54 years. How old is the youngest?",
        steps: [
          "Ages \\(a, a + 3, a + 6, a + 9\\): \\(4a + 18 = 54\\), so \\(a = 9\\).",
          "Check: the average 13.5 lies halfway between the middle two ages, 12 and 15.",
        ],
        answer: "9 years",
      },
      practiceSet: [
        { prompt: "What is the average of 12, 15, 18, 21 and 24?", answer: "18" },
        { prompt: "The average of six consecutive integers is 20.5. What is the smallest of them?", answer: "18" },
        { prompt: "The sum of five consecutive even numbers is 110. What is the smallest of them?", answer: "18" },
        { prompt: "The smallest of 9 consecutive odd numbers is 31. What is their average?", answer: "39", method: "The middle (5th) number is \\(31 + 4 \\times 2 = 39\\)." },
      ],
      pyqExampleId: "f7341154-4579-4e66-b042-047ba7a6e091",
      traps: [
        {
          title: "Expecting a whole-number average from an even count of consecutive integers",
          body:
            "Six consecutive integers such as 4 to 9 average 6.5: an even count of consecutive integers always averages to a number ending in .5.",
        },
        {
          title: "Taking a middle term that does not exist",
          body:
            "With an even count there is no single middle term. Six consecutive even numbers averaging 25 have no term equal to 25; the two middle terms are 24 and 26.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavsq-multiples",
      name: "Average of the multiples of a number in a range",
      intuition:
        "The multiples of 13 go up in steps of 13, so they form an arithmetic progression. Find the first and the last multiple in the range and take their mean: you never need to list or count them.",
      definition:
        "- **First multiple:** divide the lower end by \\(k\\) and round up. **Last multiple:** divide the upper end by \\(k\\) and round down.\n" +
        "- **Average \\(= \\frac{\\text{first multiple} + \\text{last multiple}}{2}\\)**, or \\(k \\times\\) the mean of the two multipliers.\n" +
        "- 'Between' normally leaves the ends out. If both ends are themselves multiples of \\(k\\), adding or dropping both leaves the average unchanged.\n" +
        "- The count is needed only for a sum: count \\(= \\frac{\\text{last} - \\text{first}}{k} + 1\\).",
      formula: {
        label: "Multiples of k in a range",
        latex: "\\text{Average} = \\frac{\\text{first multiple} + \\text{last multiple}}{2} \\qquad \\text{Count} = \\frac{\\text{last} - \\text{first}}{k} + 1",
      },
      authoredExample: {
        prompt: "Find the average of all numbers between 200 and 400 that are divisible by 17.",
        steps: [
          "\\(200 \\div 17 = 11.8\\), so the first multiple is \\(17 \\times 12 = 204\\).",
          "\\(400 \\div 17 = 23.5\\), so the last is \\(17 \\times 23 = 391\\).",
          "Average \\(= \\frac{204 + 391}{2} = 297.5\\). Fast check: \\(17 \\times \\frac{12 + 23}{2} = 17 \\times 17.5 = 297.5\\).",
        ],
        answer: "297.5",
      },
      selfCheckExample: {
        prompt: "Find the average of all two-digit numbers that are divisible by 7.",
        steps: [
          "The first is 14 and the last is 98.",
          "Average \\(= \\frac{14 + 98}{2} = 56\\).",
        ],
        answer: "56",
      },
      practiceSet: [
        { prompt: "What is the average of all multiples of 6 from 6 to 60?", answer: "33" },
        { prompt: "What is the first multiple of 19 greater than 500?", answer: "513" },
        { prompt: "How many multiples of 4 lie from 12 to 48, both included?", answer: "10" },
        { prompt: "What is the average of all multiples of 9 between 50 and 100?", answer: "76.5", method: "First 54, last 99." },
      ],
      pyqExampleId: "c2e1b383-1292-4bb0-b3e8-e4bcf0076808",
      traps: [
        {
          title: "Averaging the ends of the range instead of the multiples",
          body:
            "Between 50 and 100 the multiples of 8 run from 56 to 96, so their average is 76, not 75. Use the first and last multiples, not the ends of the range.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavsq-naturals",
      name: "Averages of the first n natural numbers and their squares",
      intuition:
        "The numbers 1 to n are an arithmetic progression, so their average is the middle, \\(\\frac{n + 1}{2}\\). Squares do not rise in equal steps, so for them use the standard sum formula and divide by n.",
      definition:
        "- \\(1 + 2 + \\cdots + n = \\frac{n(n + 1)}{2}\\), so the **average is \\(\\frac{n + 1}{2}\\)**.\n" +
        "- \\(1^2 + 2^2 + \\cdots + n^2 = \\frac{n(n + 1)(2n + 1)}{6}\\), so the **average of the squares is \\(\\frac{(n + 1)(2n + 1)}{6}\\)**. Cancel before multiplying.\n" +
        "- \\(1^3 + 2^3 + \\cdots + n^3 = \\left(\\frac{n(n + 1)}{2}\\right)^2\\), so the average of the cubes is \\(\\frac{n(n + 1)^2}{4}\\).\n" +
        "- The first \\(n\\) even numbers average \\(n + 1\\); the first \\(n\\) odd numbers average \\(n\\).",
      formula: {
        label: "Sums and averages of the first n natural numbers",
        latex:
          "\\frac{1 + 2 + \\cdots + n}{n} = \\frac{n + 1}{2} \\qquad \\frac{1^2 + 2^2 + \\cdots + n^2}{n} = \\frac{(n + 1)(2n + 1)}{6} \\qquad \\frac{1^3 + 2^3 + \\cdots + n^3}{n} = \\frac{n(n + 1)^2}{4}",
      },
      authoredExample: {
        prompt: "Find the average of the squares of the first 20 natural numbers.",
        steps: [
          "Average \\(= \\frac{(20 + 1)(2 \\times 20 + 1)}{6} = \\frac{21 \\times 41}{6} = \\frac{861}{6} = 143.5\\).",
          "Full method check: sum \\(= \\frac{20 \\times 21 \\times 41}{6} = 2870\\), and \\(\\frac{2870}{20} = 143.5\\).",
        ],
        answer: "143.5",
      },
      selfCheckExample: {
        prompt: "Find the average of the first 60 natural numbers.",
        steps: ["Average \\(= \\frac{60 + 1}{2} = 30.5\\)."],
        answer: "30.5",
      },
      practiceSet: [
        { prompt: "What is the average of the first 30 odd numbers?", answer: "30" },
        { prompt: "What is the average of the first 25 even numbers?", answer: "26" },
        { prompt: "What is the sum of the squares of the first 10 natural numbers?", answer: "385" },
        { prompt: "What is the average of the cubes of the first 4 natural numbers?", answer: "25" },
      ],
      pyqExampleId: "cc50ea9a-bc6d-448f-b19f-fbdeeedbfa06",
      traps: [
        {
          title: "Using n ÷ 2 for the average of 1 to n",
          body:
            "The average of 1 to n is (n + 1) ÷ 2. The numbers 1 to 9 average 5, not 4.5.",
        },
        {
          title: "Giving the sum of squares as the average",
          body:
            "n(n + 1)(2n + 1) ÷ 6 is the SUM of the first n squares. Divide by n to get their average, which is (n + 1)(2n + 1) ÷ 6.",
        },
      ],
    },
  ],
};
