import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Basic and Simple Averages",
  title: "The Average, Its Total and the First n Numbers",
  oneLineDefinition:
    "An average is a total shared out equally: find it, run it backwards to a total or a missing value, see how it moves when every value changes, and use the shortcuts for evenly spaced numbers.",
  whyItMatters:
    "This page has only two HARD questions, but every later page leans on it: almost every average problem becomes a total, a subtraction and a division. Marks go on two slips, dividing by the wrong count and forgetting that adding the same number to every value moves the average by exactly that number.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-sum-count",
      name: "Average, total and count",
      intuition:
        "An average is what each value would be if the total were shared out equally. Know any two of the average, the total and the count, and you have the third.",
      definition:
        "- **Average** = total ÷ count. So total = average × count, and count = total ÷ average.\n" +
        "- Work with **totals**, not averages. Two averages cannot be added or subtracted directly; two totals can.\n" +
        "- The average always lies between the smallest and the largest value. Use that to strike out options.",
      formula: {
        label: "Arithmetic mean",
        latex: "\\text{Average} = \\dfrac{\\text{Sum of the values}}{\\text{Number of values}}",
      },
      authoredExample: {
        prompt: "Find the average of 14, 9, 23, 17 and 12.",
        steps: [
          "Add them: \\(14 + 9 + 23 + 17 + 12 = 75\\).",
          "There are 5 values, so the average is \\(75 \\div 5 = 15\\).",
          "Check: 15 lies between the smallest (9) and the largest (23).",
        ],
        answer: "\\(15\\).",
      },
      selfCheckExample: {
        prompt: "Seven numbers have a total of 245. What is their average? If their average had been 38, what would their total be?",
        steps: [
          "Average \\(= 245 \\div 7 = 35\\).",
          "Total \\(= 38 \\times 7 = 266\\).",
        ],
        answer: "35; 266.",
      },
      practiceSet: [
        { prompt: "Find the average of 6, 11, 16, 21 and 26.", answer: "\\(16\\)" },
        { prompt: "The average of 12 numbers is 7.5. Find their total.", answer: "\\(90\\)" },
        { prompt: "17 values add up to 391. Find their average.", answer: "\\(23\\)" },
        { prompt: "Find the average of 0, 4, 10 and 18.", answer: "\\(8\\)", method: "The 0 still counts: \\(32 \\div 4\\)." },
      ],
      pyqExampleId: "d84339cd-dbff-440a-86e8-4f4ad81abe00",
      traps: [
        {
          title: "An average of averages",
          body: "Two classes averaging 60 and 70 do not average 65 unless they are the same size. Add the two totals, then divide by everyone.",
        },
        {
          title: "Zero is a value",
          body: "A score of 0 still counts in the count: 10, 0 and 20 average 10, not 15.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-missing-value",
      name: "A missing value, or the score needed for a target",
      intuition:
        "If you know the average you want, you know the total you need. The missing value is that total minus everything you already have.",
      definition:
        "- **Missing value** = average × count − the sum of the known values.\n" +
        "- 'What must he score next to average \\(A\\) over \\(n\\) tests?' The needed total is \\(A \\times n\\); subtract the scores so far.\n" +
        "- **Deviation shortcut:** add up how far each known value is above or below the target. The missing value must cancel that. For a target of 50 with 47, 52 and 55, the deviations are \\(-3, +2, +5\\), a total of \\(+4\\), so the fourth value is \\(50 - 4 = 46\\).",
      formula: {
        label: "The missing value",
        latex: "x = A \\times n - (\\text{sum of the other } n - 1 \\text{ values})",
      },
      authoredExample: {
        prompt: "The average of five numbers is 26. Four of them are 21, 30, 18 and 33. Find the fifth.",
        steps: [
          "All five total \\(5 \\times 26 = 130\\).",
          "The four known ones total \\(21 + 30 + 18 + 33 = 102\\).",
          "The fifth is \\(130 - 102 = 28\\).",
        ],
        answer: "\\(28\\).",
      },
      selfCheckExample: {
        prompt: "A shop sold 40, 55 and 47 shirts on three days. How many must it sell on the fourth day to average 50 a day?",
        steps: [
          "Four days at 50 need \\(4 \\times 50 = 200\\) shirts.",
          "It has sold \\(40 + 55 + 47 = 142\\).",
          "So it needs \\(200 - 142 = 58\\). (Deviations: \\(-10 + 5 - 3 = -8\\), so \\(50 + 8 = 58\\).)",
        ],
        answer: "\\(58\\).",
      },
      practiceSet: [
        { prompt: "The average of 4 numbers is 15. Three of them are 12, 16 and 20. Find the fourth.", answer: "\\(12\\)" },
        { prompt: "A student scored 62, 70 and 74 in three tests. What must she score in the fourth to average 70?", answer: "\\(74\\)" },
        { prompt: "The average of \\(x\\), 11, 19 and 26 is 17. Find \\(x\\).", answer: "\\(12\\)" },
        { prompt: "The average of three numbers is 40. Two of them add up to 75. Find the third.", answer: "\\(45\\)" },
      ],
      pyqExampleId: "291e013d-97e5-4906-8f81-85571cd96a72",
      traps: [
        {
          title: "Count the test still to come",
          body: "For a target average over 5 tests, the needed total is 5 times the target, not 4 times. The test you are about to sit is part of the count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-change-all",
      name: "When every value changes",
      intuition:
        "Add 5 to every value and the average rises by 5. Double every value and the average doubles. Change only some values, and the total moves by the sum of the changes.",
      definition:
        "- Add or subtract \\(k\\) from **every** value: the average moves by \\(k\\).\n" +
        "- Multiply or divide every value by \\(k\\): the average is multiplied or divided by \\(k\\). Apply the steps in their order: × 3 and then − 5 turns \\(A\\) into \\(3A - 5\\).\n" +
        "- When only **some** values change, find the total change and divide by the full count. If 4 of 20 values each rise by 5, the total rises by 20 and the average by 1.\n" +
        "- If the total must stay the same with fewer items, the new average is that total ÷ the new count.",
      formula: {
        label: "A change applied to every value",
        latex: "x_i \\to a\\,x_i + b \\;\\Rightarrow\\; \\bar x \\to a\\,\\bar x + b",
      },
      authoredExample: {
        prompt: "The average of 15 numbers is 30. Each number is multiplied by 4, and then 6 is subtracted from each. Find the new average.",
        steps: [
          "Multiplying every value by 4 makes the average \\(30 \\times 4 = 120\\).",
          "Subtracting 6 from every value makes it \\(120 - 6 = 114\\).",
          "The count (15) does not matter here.",
        ],
        answer: "\\(114\\).",
      },
      selfCheckExample: {
        prompt: "The average mark of 40 students is 52. Eight of them get 5 grace marks each. Find the new average.",
        steps: [
          "The total rises by \\(8 \\times 5 = 40\\).",
          "Shared over all 40 students, the average rises by \\(40 \\div 40 = 1\\).",
        ],
        answer: "\\(53\\).",
      },
      practiceSet: [
        { prompt: "The average of 9 numbers is 14. 7 is added to each. Find the new average.", answer: "\\(21\\)" },
        { prompt: "The average of 18 numbers is 42. Each is halved. Find the new average.", answer: "\\(21\\)" },
        {
          prompt: "The average of 10 numbers is 20. Each of the first five rises by 6 and each of the last five falls by 2. Find the new average.",
          answer: "\\(22\\)",
          method: "Total change \\(30 - 10 = 20\\), so \\(+2\\).",
        },
        { prompt: "The average weight of 12 boxes is 15 kg. Each box loses 0.5 kg. Find the new average.", answer: "\\(14.5\\) kg" },
      ],
      pyqExampleId: "64b3db0d-d102-449e-a0af-a9e47036161e",
      traps: [
        {
          title: "Order matters",
          body: "Doubling and then adding 3 turns an average of 12 into 27. Adding 3 first and then doubling gives 30.",
        },
        {
          title: "Some values, not all",
          body: "If only 6 of 30 values rise by 5, the total rises by 30 and the average by 1, not by 5.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-evenly-spaced",
      name: "Evenly spaced numbers: first plus last, halved",
      intuition:
        "When numbers go up in equal steps, the average sits exactly in the middle: halfway between the first and the last.",
      definition:
        "- For an **evenly spaced** list (the same gap every time), average = \\(\\dfrac{\\text{first} + \\text{last}}{2}\\).\n" +
        "- With an odd count that is the middle number; with an even count it is halfway between the two middle numbers.\n" +
        "- Multiples of \\(k\\) from \\(k\\) up to \\(nk\\) average \\(\\dfrac{k(n + 1)}{2}\\).\n" +
        "- For 'the last 6 multiples of 3 up to 60', write the first and last of that stretch (45 and 60), then halve their sum: 52.5.",
      formula: {
        label: "Average of an evenly spaced list",
        latex: "\\bar x = \\dfrac{\\text{first term} + \\text{last term}}{2}",
      },
      authoredExample: {
        prompt: "Find the average of the first 9 multiples of 7.",
        steps: [
          "They run from 7 to \\(9 \\times 7 = 63\\), in equal steps.",
          "Average \\(= \\dfrac{7 + 63}{2} = 35\\). (Or \\(\\dfrac{7 \\times 10}{2} = 35\\).)",
        ],
        answer: "\\(35\\).",
      },
      selfCheckExample: {
        prompt: "Find the average of the last 5 odd numbers from 1 to 41.",
        steps: [
          "They are 33, 35, 37, 39 and 41.",
          "Average \\(= \\dfrac{33 + 41}{2} = 37\\).",
        ],
        answer: "\\(37\\).",
      },
      practiceSet: [
        { prompt: "Find the average of 13, 20, 27, 34 and 41.", answer: "\\(27\\)" },
        { prompt: "Find the average of the first 11 multiples of 4.", answer: "\\(24\\)" },
        { prompt: "Find the average of 101, 103, 105, ..., 119.", answer: "\\(110\\)" },
        { prompt: "Find the average of the last 10 numbers from 1 to 60.", answer: "\\(55.5\\)", method: "They are 51 to 60." },
      ],
      pyqExampleId: "7acc2980-4f16-4212-8920-07deaeaa5acc",
      traps: [
        {
          title: "Check the spacing first",
          body: "1, 2, 4, 8 is not evenly spaced. Its average is \\(15 \\div 4 = 3.75\\), not \\((1 + 8) \\div 2 = 4.5\\).",
        },
        {
          title: "Find the right first term",
          body: "The last 4 multiples of 6 up to 60 are 42, 48, 54 and 60. The stretch starts at 42, not at 6.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afav-first-n",
      name: "The first n natural, odd and even numbers",
      intuition:
        "The natural, odd and even numbers are evenly spaced, so their averages come straight from the middle. Squares and cubes are not evenly spaced and need their sum formulas. Learn the rows below and most first-n questions take one line.",
      definition:
        "Run a formula backwards to find \\(n\\): if the first \\(n\\) natural numbers average 12, then \\(\\tfrac{n + 1}{2} = 12\\) and \\(n = 23\\). Natural numbers start at 1. 'The first \\(n\\) even numbers' means 2, 4, ..., \\(2n\\).",
      table: {
        columns: ["The first n ...", "Sum", "Average"],
        rows: [
          { cells: ["Natural numbers 1 to n", "\\(\\dfrac{n(n + 1)}{2}\\)", "\\(\\dfrac{n + 1}{2}\\)"] },
          { cells: ["Odd numbers 1 to 2n − 1", "\\(n^2\\)", "\\(n\\)"] },
          { cells: ["Even numbers 2 to 2n", "\\(n(n + 1)\\)", "\\(n + 1\\)"] },
          { cells: ["Squares 1² to n²", "\\(\\dfrac{n(n + 1)(2n + 1)}{6}\\)", "\\(\\dfrac{(n + 1)(2n + 1)}{6}\\)"] },
          { cells: ["Cubes 1³ to n³", "\\(\\left(\\dfrac{n(n + 1)}{2}\\right)^2\\)", "\\(\\dfrac{n(n + 1)^2}{4}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "The first \\(n\\) even numbers average 41. Find \\(n\\) and the sum of these numbers.",
        steps: [
          "Their average is \\(n + 1 = 41\\), so \\(n = 40\\).",
          "Their sum is \\(n(n + 1) = 40 \\times 41 = 1640\\).",
        ],
        answer: "\\(n = 40\\); sum 1640.",
      },
      practiceSet: [
        { prompt: "Find the average of the first 40 natural numbers.", answer: "\\(20.5\\)" },
        { prompt: "Find the average of the first 25 odd numbers.", answer: "\\(25\\)" },
        { prompt: "Find the average of the squares of the first 4 natural numbers.", answer: "\\(7.5\\)", method: "\\((1 + 4 + 9 + 16) \\div 4\\)." },
        { prompt: "The first \\(n\\) odd numbers add up to 196. Find their average.", answer: "\\(14\\)", method: "\\(n^2 = 196\\), so \\(n = 14\\)." },
      ],
      pyqExampleId: "6833c7f6-41fe-480e-ac55-ace325f5b7a1",
      traps: [
        {
          title: "Even numbers average n + 1, not n",
          body: "The first 8 even numbers, 2 to 16, average 9. It is the odd numbers that average exactly \\(n\\).",
        },
        {
          title: "Squares are not evenly spaced",
          body: "1, 4 and 9 average \\(\\tfrac{14}{3}\\), not \\((1 + 9) \\div 2 = 5\\). Use the sum of squares.",
        },
      ],
    },
  ],
};
