import type { SubtopicNote } from "@/app/notes/_types";

export const AF_NS_DIVISIBILITY_NOTE: SubtopicNote = {
  subtopicName: "Divisibility Rules",
  title: "Divisibility Rules from 2 to 12, and Counting Multiples",
  oneLineDefinition:
    "Decide whether a number divides exactly without dividing: read its last digits, its digit sum or its alternating digit sum, and combine rules for 6, 12, 15 and the like.",
  whyItMatters:
    "Most questions here name a number and a divisor and ask yes or no, so each rule has to be exact. The HARD ones count or add the multiples in a range, or ask what to add to make a number divisible, and that is where a missed 1 in a count or a remainder read the wrong way costs the mark.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afns-last-digit-rules",
      name: "Rules that read the last digits: 2, 4, 5, 8, 10 and 25",
      intuition:
        "10, 100 and 1000 are already divisible by these numbers, so everything to the left of the last one, two or three digits divides exactly. Only the tail can leave a remainder.",
      definition:
        "Look at as many digits from the right as the rule says, and test that small number. For 2, 5 and 10 one digit is enough, for 4 and 25 two, for 8 three.",
      table: {
        columns: ["Divisor", "Test", "Example that passes"],
        rows: [
          { cells: ["2", "Last digit is 0, 2, 4, 6 or 8", "5,318"] },
          {
            cells: ["4", "Last two digits form a multiple of 4", "7,316 (16)"],
            noteAmber: "An even last digit is not enough: 1,326 ends in 26, which is not a multiple of 4.",
          },
          { cells: ["8", "Last three digits form a multiple of 8", "41,128 (128)"] },
          { cells: ["5", "Last digit is 0 or 5", "6,035"] },
          { cells: ["10", "Last digit is 0", "4,560"] },
          { cells: ["25", "Last two digits are 00, 25, 50 or 75", "3,175"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of 6,118, 5,236, 7,154 and 9,342 is divisible by 4?",
        steps: ["Test the last two digits: 18, 36, 54, 42.", "Only \\(36 = 4 \\times 9\\) is a multiple of 4."],
        answer: "5,236.",
      },
      practiceSet: [
        { prompt: "Is 91,304 divisible by 8?", answer: "Yes", method: "\\(304 = 8 \\times 38\\)." },
        { prompt: "Is 2,726 divisible by 4?", answer: "No", method: "26 is not a multiple of 4." },
        { prompt: "Which of 4,315 and 4,312 is divisible by 5?", answer: "4,315" },
        { prompt: "Is 70,120 divisible by 10?", answer: "Yes" },
      ],
      pyqExampleId: "5123f93d-f31b-4bb5-b14b-e0e7a7913fd0",
      traps: [
        {
          title: "Two digits are not enough for 8",
          body: "3,140 ends in 40, a multiple of 8, but the rule for 8 reads three digits: 140 is not a multiple of 8, so 3,140 is not divisible by 8.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-digit-sum-rules",
      name: "Rules that add the digits: 3 and 9",
      intuition:
        "Every power of 10 is one more than a multiple of 9 (\\(10 = 9 + 1\\), \\(100 = 99 + 1\\)). So a number leaves the same remainder on division by 9, or by 3, as the sum of its digits does.",
      definition:
        "- **3:** the digit sum is a multiple of 3.\n" +
        "- **9:** the digit sum is a multiple of 9.\n" +
        "- If the digit sum is large, add its digits again.\n" +
        "- Divisible by 9 means divisible by 3, but not the other way round: 2,145 has digit sum 12, so it is divisible by 3 and not by 9.",
      formula: {
        label: "Digit-sum rule",
        latex: "N \\text{ divisible by } 9 \\;\\text{means}\\; \\text{its digit sum is divisible by } 9",
      },
      authoredExample: {
        prompt: "Is 87,354 divisible by 3? By 9?",
        steps: ["Digit sum: \\(8 + 7 + 3 + 5 + 4 = 27\\).", "27 is a multiple of 9, and so of 3."],
        answer: "Yes to both (\\(87{,}354 = 9 \\times 9{,}706\\)).",
      },
      selfCheckExample: {
        prompt: "Which of 4,821, 6,715, 3,302 and 7,094 is divisible by 3?",
        steps: ["Digit sums: 15, 19, 8 and 20.", "Only 15 is a multiple of 3."],
        answer: "4,821.",
      },
      practiceSet: [
        { prompt: "Is 55,512 divisible by 9?", answer: "Yes", method: "Digit sum 18." },
        { prompt: "Is 1,111 divisible by 3?", answer: "No", method: "Digit sum 4." },
        { prompt: "Is 98,765 divisible by 3?", answer: "No", method: "Digit sum 35." },
        { prompt: "Is 7,380 divisible by 9?", answer: "Yes", method: "Digit sum 18." },
      ],
      pyqExampleId: "773f91aa-faff-4bbc-b185-9f3529c1e9e9",
      traps: [
        {
          title: "Divisible by 3 is not divisible by 9",
          body: "99,999,996 has digit sum 69, a multiple of 3 but not of 9. It is divisible by 3 only.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-seven-eleven",
      name: "Rules for 7 and 11",
      intuition:
        "For 7, cut off the last digit, double it and subtract it from what is left; the result is divisible by 7 exactly when the number was. For 11, add and subtract the digits in turn from the right, because \\(10\\) is one less than 11.",
      definition:
        "- **7:** remove the last digit, subtract twice it from the rest, and repeat until the number is small.\n" +
        "- **11:** starting from the units digit, add, subtract, add, ... the digits. The number is divisible by 11 when this alternating sum is 0 or a multiple of 11 (11, 22, \\(-11\\), ...).\n" +
        "- The alternating sum also gives the remainder on division by 11 when it is not a multiple: a sum of 3 means remainder 3, and a negative sum such as \\(-5\\) means \\(11 - 5 = 6\\).",
      formula: {
        label: "Rule for 11",
        latex: "(d_0 + d_2 + d_4 + \\cdots) - (d_1 + d_3 + \\cdots) = 0, \\pm 11, \\pm 22, \\ldots",
      },
      authoredExample: {
        prompt: "Is 4,893 divisible by 7? Is 90,816 divisible by 11?",
        steps: [
          "7: \\(489 - 2 \\times 3 = 483\\), then \\(48 - 2 \\times 3 = 42 = 7 \\times 6\\). Yes.",
          "11: from the right, \\(6 - 1 + 8 - 0 + 9 = 22\\), a multiple of 11. Yes.",
        ],
        answer: "Both are divisible (\\(4{,}893 = 7 \\times 699\\), \\(90{,}816 = 11 \\times 8{,}256\\)).",
      },
      selfCheckExample: {
        prompt: "Is 72,358 divisible by 11?",
        steps: ["From the right: \\(8 - 5 + 3 - 2 + 7 = 11\\).", "11 is a multiple of 11."],
        answer: "Yes (\\(11 \\times 6{,}578\\)).",
      },
      practiceSet: [
        { prompt: "Is 504 divisible by 7?", answer: "Yes", method: "\\(50 - 8 = 42\\)." },
        { prompt: "Is 3,729 divisible by 11?", answer: "Yes", method: "\\(9 - 2 + 7 - 3 = 11\\)." },
        { prompt: "Is 6,412 divisible by 7?", answer: "Yes", method: "\\(641 - 4 = 637\\), then \\(63 - 14 = 49\\)." },
        { prompt: "Is 8,349 divisible by 11?", answer: "Yes", method: "\\(9 - 4 + 3 - 8 = 0\\)." },
      ],
      pyqExampleId: "da18382a-a397-4933-8069-0c5a68e3c606",
      traps: [
        {
          title: "11 passes as well as 0",
          body: "An alternating sum of 11 or \\(-11\\) means divisible, just as 0 does. Only a result that is not a multiple of 11 means no.",
        },
        {
          title: "Subtract twice the last digit",
          body: "For 7 the doubled last digit is taken away, not added: 504 gives \\(50 - 8 = 42\\). Adding gives 58 and the wrong verdict.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-combined-divisors",
      name: "Divisors made of two rules: 6, 12, 15, 18, 36",
      intuition:
        "A number divisible by 3 and by 4 is divisible by 12, because 3 and 4 share no factor except 1. Split the divisor into two such pieces and run both tests.",
      definition:
        "- \\(6 = 2 \\times 3\\), \\(12 = 3 \\times 4\\), \\(15 = 3 \\times 5\\), \\(18 = 2 \\times 9\\), \\(24 = 3 \\times 8\\), \\(36 = 4 \\times 9\\).\n" +
        "- The two pieces must share no factor except 1. \\(12 = 2 \\times 6\\) does not work: 18 passes the tests for 2 and 6 and is not divisible by 12.\n" +
        "- Both tests must pass. One failure is enough to say no.",
      formula: {
        label: "Combining two rules",
        latex: "a \\mid N,\\ b \\mid N,\\ a \\text{ and } b \\text{ share no factor} \\;\\Rightarrow\\; ab \\mid N",
      },
      authoredExample: {
        prompt: "Is 7,524 divisible by 36?",
        steps: [
          "\\(36 = 4 \\times 9\\).",
          "4: the last two digits 24 are a multiple of 4.",
          "9: the digit sum \\(7 + 5 + 2 + 4 = 18\\) is a multiple of 9.",
        ],
        answer: "Yes (\\(7{,}524 = 36 \\times 209\\)).",
      },
      selfCheckExample: {
        prompt: "Is 5,670 divisible by 15? By 18?",
        steps: [
          "15: it ends in 0 (passes 5) and its digit sum is 18 (passes 3).",
          "18: it is even (passes 2) and its digit sum 18 passes 9.",
        ],
        answer: "Yes to both.",
      },
      practiceSet: [
        { prompt: "Is 3,174 divisible by 6?", answer: "Yes", method: "Even, digit sum 15." },
        { prompt: "Is 2,316 divisible by 12?", answer: "Yes", method: "16 passes 4, digit sum 12 passes 3." },
        { prompt: "Is 4,350 divisible by 15?", answer: "Yes" },
        { prompt: "Is 9,126 divisible by 18?", answer: "Yes", method: "Even, digit sum 18." },
      ],
      pyqExampleId: "d250bbc2-d16c-4b92-931f-2631b74db9f6",
      traps: [
        {
          title: "The pieces must share nothing",
          body: "12 is divisible by 4 and by 6 but not by 24. Test 24 as \\(3 \\times 8\\), never as \\(4 \\times 6\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-making-divisible",
      name: "A missing digit, or the least number to add or take away",
      intuition:
        "Write the rule with the unknown digit as a letter and solve for it; a digit is one of only ten values. To make a number divisible, find its remainder first: adding the divisor minus the remainder finishes the step up, and taking away the remainder steps down.",
      definition:
        "- **Digit sum rules (3, 9):** add the known digits, then pick the digit that lifts the total to the next multiple.\n" +
        "- **Tail rules (4, 8):** only the last digits matter. Several digits may work, so test each option.\n" +
        "- **Rule for 11:** write the alternating sum with the letter in it and make it 0 or a multiple of 11.\n" +
        "- If \\(N\\) leaves remainder \\(r\\) on division by \\(d\\): the least number to **add** is \\(d - r\\); the least to **subtract** is \\(r\\). For example, \\(2{,}519 = 9 \\times 279 + 8\\), so add 1 or take away 8.",
      formula: {
        label: "Least number to add or subtract",
        latex: "N = dq + r:\\quad \\text{add } d - r,\\ \\text{or subtract } r",
      },
      authoredExample: {
        prompt: "Find the digit \\(k\\) that makes \\(3k754\\) divisible by 9.",
        steps: [
          "Digit sum: \\(3 + k + 7 + 5 + 4 = 19 + k\\).",
          "The next multiple of 9 above 19 is 27, so \\(k = 8\\).",
          "Check: 38,754 has digit sum 27.",
        ],
        answer: "\\(k = 8\\).",
      },
      selfCheckExample: {
        prompt: "Find the digit \\(p\\) that makes \\(7p49\\) divisible by 11.",
        steps: ["From the right: \\(9 - 4 + p - 7 = p - 2\\).", "This must be 0, so \\(p = 2\\). Check: \\(7{,}249 = 11 \\times 659\\)."],
        answer: "\\(p = 2\\).",
      },
      practiceSet: [
        { prompt: "Find the least number to add to 4,327 to make it divisible by 7.", answer: "\\(6\\)", method: "\\(4{,}327 = 7 \\times 618 + 1\\)." },
        { prompt: "Find the smallest digit \\(x\\) that makes \\(5x24\\) divisible by 3.", answer: "\\(1\\)", method: "Digit sum \\(11 + x\\)." },
        { prompt: "Find the least number to subtract from 1,000 to make it divisible by 13.", answer: "\\(12\\)", method: "\\(1{,}000 = 13 \\times 76 + 12\\)." },
        { prompt: "For which digits \\(d\\) is \\(61d2\\) divisible by 4?", answer: "\\(1, 3, 5, 7, 9\\)", method: "12, 32, 52, 72 and 92 are multiples of 4." },
      ],
      pyqExampleId: "b0df7f77-c29c-4580-a4b0-a388d8f84350",
      traps: [
        {
          title: "Add the divisor minus the remainder",
          body: "4,327 leaves remainder 1 on division by 7, so 6 must be added. Adding the remainder itself gives 4,328, which leaves 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-counting-multiples",
      name: "Counting and adding the multiples in a range",
      intuition:
        "The multiples of \\(d\\) in a range are \\(d\\) times a run of whole numbers. Find the first and last of that run and count it; to add the multiples, use first plus last, times the count, halved.",
      definition:
        "- First multiple of \\(d\\) at or above \\(a\\), last at or below \\(b\\): write them as \\(d \\times m\\) and \\(d \\times n\\). The count is \\(n - m + 1\\).\n" +
        "- Largest multiple of \\(d\\) up to \\(N\\): \\(N\\) minus its remainder. The largest 4-digit multiple of 7 is \\(9{,}999 - 3 = 9{,}996\\).\n" +
        "- Sum of the multiples: \\(\\tfrac{\\text{count} \\times (\\text{first} + \\text{last})}{2}\\).\n" +
        "- Divisible by both \\(a\\) and \\(b\\): divisible by their LCM, which is \\(ab\\) when they share no factor. (The LCM in general comes on Factors and Multiples.)",
      formula: {
        label: "Multiples of d from d·m to d·n",
        latex: "\\text{count} = n - m + 1,\\qquad \\text{sum} = \\dfrac{\\text{count} \\times (dm + dn)}{2}",
      },
      authoredExample: {
        prompt: "How many 3-digit numbers are divisible by 13?",
        steps: [
          "The first is \\(13 \\times 8 = 104\\); \\(13 \\times 7 = 91\\) has two digits.",
          "The last is \\(13 \\times 76 = 988\\); \\(13 \\times 77 = 1{,}001\\) has four.",
          "Count: \\(76 - 8 + 1 = 69\\).",
        ],
        answer: "\\(69\\).",
      },
      selfCheckExample: {
        prompt: "Find the sum of all 2-digit multiples of 9.",
        steps: [
          "They run from \\(9 \\times 2 = 18\\) to \\(9 \\times 11 = 99\\): \\(11 - 2 + 1 = 10\\) numbers.",
          "Sum: \\(\\tfrac{10 \\times (18 + 99)}{2} = 585\\).",
        ],
        answer: "\\(585\\).",
      },
      practiceSet: [
        { prompt: "How many numbers between 210 and 310 are divisible by 8?", answer: "\\(12\\)", method: "\\(8 \\times 27 = 216\\) to \\(8 \\times 38 = 304\\)." },
        { prompt: "Find the largest 4-digit number divisible by 7.", answer: "\\(9{,}996\\)" },
        { prompt: "How many numbers from 1 to 100 are divisible by both 4 and 6?", answer: "\\(8\\)", method: "Multiples of 12." },
        { prompt: "How many 2-digit numbers are divisible by both 3 and 5?", answer: "\\(6\\)", method: "15, 30, ..., 90." },
      ],
      pyqExampleId: "100731cf-40e4-4aaf-b8b9-0d1fb5fafd26",
      traps: [
        {
          title: "Count both ends",
          body: "From \\(4 \\times 1\\) to \\(4 \\times 10\\) there are \\(10 - 1 + 1 = 10\\) multiples of 4, not 9. Subtracting the two multipliers forgets one end.",
        },
        {
          title: "Both 4 and 6 means 12",
          body: "4 and 6 share the factor 2, so a number divisible by both is a multiple of 12, not of 24. Multiply only when the two share no factor.",
        },
      ],
    },
  ],
};
