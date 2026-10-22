import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_CONSECUTIVE_NOTE: SubtopicNote = {
  subtopicName: "Consecutive Numbers",
  title: "Consecutive Numbers: the Middle Term Does the Work",
  oneLineDefinition:
    "Consecutive integers, even numbers, odd numbers and multiples are evenly spaced, so their average is the middle term and every other term is a fixed number of steps away from it.",
  whyItMatters:
    "About one question in eight here is HARD, and nearly all of them use one idea in different directions. Marks go when the count is even, because then no single number sits in the middle, and when a step of 2 (even or odd numbers) is treated as a step of 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-middle-term",
      name: "An odd count: the average is the middle number",
      intuition:
        "Five consecutive numbers balance on the third one. So the average is the middle number, and the others step away from it on both sides.",
      definition:
        "- **Consecutive integers** step by 1; **consecutive even** or **odd** numbers step by 2; consecutive multiples of \\(k\\) step by \\(k\\).\n" +
        "- With an odd count \\(n\\), the middle term equals the average \\(A\\). The largest is \\(A + \\tfrac{n - 1}{2}d\\) and the smallest is \\(A - \\tfrac{n - 1}{2}d\\), where \\(d\\) is the step.\n" +
        "- Given the sum instead of the average, divide by the count first.",
      formula: {
        label: "Ends of an odd-length run",
        latex: "\\text{largest} = A + \\dfrac{n - 1}{2}\\,d, \\qquad \\text{smallest} = A - \\dfrac{n - 1}{2}\\,d",
      },
      authoredExample: {
        prompt: "The average of 5 consecutive multiples of 4 is 48. Find the smallest and the largest.",
        steps: [
          "With 5 terms the middle one is the average, 48.",
          "The ends are \\(\\tfrac{5 - 1}{2} = 2\\) steps of 4 away: \\(48 \\pm 8\\).",
          "The numbers are 40, 44, 48, 52 and 56.",
        ],
        answer: "Smallest 40, largest 56.",
      },
      selfCheckExample: {
        prompt: "The sum of 5 consecutive even numbers is 160. Find the largest.",
        steps: [
          "The average, and so the middle number, is \\(160 \\div 5 = 32\\).",
          "The largest is 2 steps of 2 above it: \\(32 + 4 = 36\\).",
        ],
        answer: "\\(36\\).",
      },
      practiceSet: [
        { prompt: "The average of 11 consecutive integers is 30. Find the largest.", answer: "\\(35\\)" },
        { prompt: "Five consecutive odd numbers average 37. Find the smallest.", answer: "\\(33\\)" },
        { prompt: "Three consecutive multiples of 6 add up to 108. Find the middle one.", answer: "\\(36\\)" },
        {
          prompt: "Thirteen consecutive even numbers average 50. Find the second smallest.",
          answer: "\\(40\\)",
          method: "The smallest is 6 steps of 2 below 50, so 38.",
        },
      ],
      pyqExampleId: "98c5f2db-d561-441c-8caa-1081ba8833e2",
      traps: [
        {
          title: "Use the right step",
          body: "Five consecutive odd numbers averaging 31 run from 27 to 35, not from 29 to 33. Odd and even numbers step by 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-even-count",
      name: "An even count: halfway between the two middle numbers",
      intuition:
        "Six consecutive numbers have no middle number. The average falls halfway between the third and the fourth, so for consecutive integers it ends in .5.",
      definition:
        "- With an even count \\(n\\), the two middle terms are \\(A - \\tfrac d2\\) and \\(A + \\tfrac d2\\).\n" +
        "- The same formula still gives the ends: largest \\(= A + \\tfrac{n - 1}{2}d\\), where \\(\\tfrac{n - 1}{2}\\) is now a half-number such as 2.5.\n" +
        "- **Parity check:** an even count of consecutive odd numbers always averages an even number, and an even count of consecutive even numbers averages an odd number.\n" +
        "- Or name the first term \\(a\\) and solve \\(a + \\tfrac{n - 1}{2}d = A\\).",
      formula: {
        label: "Ends of an even-length run",
        latex: "\\text{largest} = A + \\dfrac{n - 1}{2}\\,d \\quad (n \\text{ even, so } \\tfrac{n - 1}{2} \\text{ ends in } .5)",
      },
      authoredExample: {
        prompt: "The average of 6 consecutive odd numbers is 40. Find the largest.",
        steps: [
          "The largest is \\(\\tfrac{6 - 1}{2} = 2.5\\) steps of 2 above the average: \\(40 + 5 = 45\\).",
          "The numbers are 35, 37, 39, 41, 43 and 45. Check: their sum is 240, and \\(240 \\div 6 = 40\\).",
        ],
        answer: "\\(45\\).",
      },
      selfCheckExample: {
        prompt: "Ten consecutive integers average 36.5. Find the smallest, and the sum of the 3rd and the 8th.",
        steps: [
          "The smallest is 4.5 steps below the average: \\(36.5 - 4.5 = 32\\).",
          "The numbers run from 32 to 41, so the 3rd is 34 and the 8th is 39.",
          "\\(34 + 39 = 73\\), which is twice the average, as it must be for terms equally far from the two ends.",
        ],
        answer: "Smallest 32; sum 73.",
      },
      practiceSet: [
        { prompt: "Four consecutive integers average 20.5. Find the largest.", answer: "\\(22\\)" },
        { prompt: "Six consecutive even numbers average 37. Find the smallest.", answer: "\\(32\\)" },
        { prompt: "Four consecutive odd numbers average 44. Find the product of the middle two.", answer: "\\(1935\\)", method: "\\(43 \\times 45\\)." },
        { prompt: "Twelve consecutive integers average 10.5. Find the sum of the first six.", answer: "\\(45\\)", method: "They start at 5." },
      ],
      pyqExampleId: "f608ca13-2c80-4757-bcaf-5d4a9a1f89df",
      traps: [
        {
          title: "Check the parity",
          body: "Six consecutive odd numbers can never average 25: an even count of odd numbers averages an even number. A question like that cannot be solved as printed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-first-last",
      name: "Pairs from the two ends",
      intuition:
        "In an evenly spaced run, the first and the last add up to twice the average, and so do the second and the second-last. Pairs taken from the two ends always balance.",
      definition:
        "- **First + last = 2 × average**, whatever the count.\n" +
        "- Any two terms the same distance from the two ends also add up to 2 × average.\n" +
        "- **Largest − smallest = (n − 1) × step**, whatever the average.\n" +
        "- Sum = average × count, so the sum of 5 consecutive numbers is 5 times the middle one.",
      formula: {
        label: "End pairs and spread",
        latex: "\\text{first} + \\text{last} = 2\\bar x, \\qquad \\text{last} - \\text{first} = (n - 1)\\,d",
      },
      authoredExample: {
        prompt: "The average of 11 consecutive odd numbers is 63. Find the sum of the largest and the smallest, and their difference.",
        steps: [
          "First + last \\(= 2 \\times 63 = 126\\).",
          "Last − first \\(= (11 - 1) \\times 2 = 20\\).",
          "Check: the numbers run from 53 to 73.",
        ],
        answer: "Sum 126; difference 20.",
      },
      selfCheckExample: {
        prompt: "Seven consecutive integers add up to 266. Find the average of the smallest and the largest.",
        steps: [
          "The average of all seven is \\(266 \\div 7 = 38\\).",
          "The smallest and largest are a pair from the ends, so they average 38 too.",
        ],
        answer: "\\(38\\).",
      },
      practiceSet: [
        { prompt: "Five consecutive multiples of 3 average 60. Find the sum of the largest and the smallest.", answer: "\\(120\\)" },
        { prompt: "Find the difference between the largest and the smallest of 15 consecutive integers.", answer: "\\(14\\)" },
        { prompt: "The first and last of 5 consecutive even numbers add up to 84. Find the middle one.", answer: "\\(42\\)" },
        { prompt: "Six consecutive odd numbers average 50. Find the sum of the 2nd and the 5th.", answer: "\\(100\\)" },
      ],
      pyqExampleId: "4ea9da0e-fc67-4037-bd39-c0acb650ef2f",
      traps: [
        {
          title: "The spread does not depend on the average",
          body: "Any 12 consecutive integers span 11 from the smallest to the largest, not 12: there are 11 gaps between 12 numbers.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-consec-algebra",
      name: "Letters, products, and a run that changes",
      intuition:
        "When the average is a letter, write the numbers around it: \\(x - 2, x - 1, x, x + 1, x + 2\\). When a term is added or removed, go back to totals.",
      definition:
        "- **Centre the run** on its middle term: five consecutive numbers averaging \\(x\\) are \\(x - 2\\) to \\(x + 2\\). A run that starts at \\(m\\) with 11 terms averages \\(m + 5\\).\n" +
        "- **Products:** consecutive numbers whose product is given sit near its root. For three of them try near the cube root: \\(11 \\times 12 \\times 13 = 1716\\), and \\(\\sqrt[3]{1716}\\) is just under 12. For two, try near the square root.\n" +
        "- **Adding or removing a term:** total = average × count, add or remove the term, divide by the new count.",
      formula: {
        label: "A run centred on its average",
        latex: "x - 2,\\; x - 1,\\; x,\\; x + 1,\\; x + 2 \\quad (\\text{five terms averaging } x)",
      },
      authoredExample: {
        prompt: "The average of 11 consecutive integers starting from \\(m\\) is 40. Find \\(m\\).",
        steps: [
          "The numbers are \\(m, m + 1, \\dots, m + 10\\); the middle one is \\(m + 5\\).",
          "So \\(m + 5 = 40\\) and \\(m = 35\\).",
        ],
        answer: "\\(m = 35\\).",
      },
      selfCheckExample: {
        prompt: "Two consecutive odd numbers have a product of 323. Find their average.",
        steps: [
          "\\(\\sqrt{323}\\) is just under 18, so try 17 and 19.",
          "\\(17 \\times 19 = 323\\). Their average is 18.",
        ],
        answer: "\\(18\\).",
      },
      practiceSet: [
        {
          prompt: "Five consecutive numbers average \\(y\\). Find the sum of the smallest and the fourth, in terms of \\(y\\).",
          answer: "\\(2y - 1\\)",
          method: "\\((y - 2) + (y + 1)\\).",
        },
        { prompt: "Four consecutive even numbers average 31. What number must be added to make the average 32?", answer: "\\(36\\)", method: "\\(5 \\times 32 - 124\\)." },
        { prompt: "Five consecutive integers average 21. The largest is removed. Find the new average.", answer: "\\(20.5\\)" },
        { prompt: "The product of two consecutive integers is 552. Find their average.", answer: "\\(23.5\\)" },
      ],
      pyqExampleId: "e2e94814-7fb5-481a-9dad-fac04913cd11",
      traps: [
        {
          title: "Centre the run, do not start it",
          body: "Writing five consecutive numbers as \\(x, x + 1, \\dots, x + 4\\) makes \\(x\\) the smallest, not the average. Centring them on \\(x\\) keeps the average equal to \\(x\\).",
        },
      ],
    },
  ],
};
