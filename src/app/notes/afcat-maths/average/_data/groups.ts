import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_GROUPS_NOTE: SubtopicNote = {
  subtopicName: "Combined and Group Averages",
  title: "Groups: Combine Totals, Split Totals, Watch the Overlap",
  oneLineDefinition:
    "Turn every group's average into a total. Totals add to give a combined average, subtract to give the average of the rest, and a value two groups share is counted twice.",
  whyItMatters:
    "Four AFCAT past-year questions are on this page, from 2018 and 2019, and about a fifth of it is HARD. Half of the HARD ones are overlaps: when 'the first few' and 'the last few' of a list share a number, that number sits in both totals.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-combined",
      name: "Combining groups",
      intuition:
        "The average of a whole class is not the plain average of its two sections' averages. The bigger section counts for more, so add the totals and divide by everyone.",
      definition:
        "- **Combined average** = sum of the group totals ÷ total count.\n" +
        "- It always lies between the group averages, nearer the bigger group.\n" +
        "- **Balance view:** the amount above the combined average equals the amount below it. If 6 people earn ₹9,000 when the overall average is ₹7,000, they are \\(6 \\times 2000 = 12{,}000\\) above. If everyone else earns ₹6,000 (1,000 below), there must be \\(12{,}000 \\div 1000 = 12\\) others.",
      formula: {
        label: "Combined average of two groups",
        latex: "\\bar x = \\dfrac{n_1A_1 + n_2A_2}{n_1 + n_2}",
      },
      authoredExample: {
        prompt: "Section A has 20 students averaging 64 and section B has 16 averaging 73. Find the class average.",
        steps: [
          "Totals: \\(20 \\times 64 = 1280\\) and \\(16 \\times 73 = 1168\\).",
          "Together: \\(2448\\) over 36 students.",
          "\\(2448 \\div 36 = 68\\), between 64 and 73 and nearer the bigger section.",
        ],
        answer: "\\(68\\).",
      },
      selfCheckExample: {
        prompt: "In an office, 12 men average ₹29,000 a month and 8 women average ₹35,000. Find the average of all 20.",
        steps: [
          "Totals: \\(12 \\times 29{,}000 = 3{,}48{,}000\\) and \\(8 \\times 35{,}000 = 2{,}80{,}000\\).",
          "\\(6{,}28{,}000 \\div 20 = 31{,}400\\).",
        ],
        answer: "₹31,400.",
      },
      practiceSet: [
        { prompt: "20 numbers average 15 and another 25 numbers average 24. Find the average of all 45.", answer: "\\(20\\)" },
        { prompt: "Batches of 12 and 24 students average 50 and 62. Find the overall average.", answer: "\\(58\\)" },
        { prompt: "16 boys average 45 kg and 9 girls average 38 kg. Find the average weight of all 25.", answer: "42.48 kg" },
        {
          prompt: "A workshop pays 4 technicians ₹15,000 each and every other worker ₹9,000. The overall average is ₹10,000. How many workers are there?",
          answer: "\\(24\\)",
          method: "Technicians are \\(4 \\times 5000 = 20{,}000\\) above; each other worker is 1,000 below, so 20 others.",
        },
      ],
      pyqExampleId: "ebbb4ffc-b63e-489f-8b0f-3b8f12cf13d0",
      traps: [
        {
          title: "Not the plain mean of the averages",
          body: "A group of 10 averaging 50 and a group of 50 averaging 80 have an overall average of \\((500 + 4000) \\div 60 = 75\\), not 65.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-remaining-group",
      name: "The rest of the group",
      intuition:
        "Subtract what you know from the whole total. What is left belongs to the part you do not know.",
      definition:
        "- Total of the rest = whole total − the totals of the known parts. Divide by how many are left.\n" +
        "- With three parts, subtract both known totals.\n" +
        "- A single unknown value is a 'group' of one: the 8th of 12 numbers, between the first 7 and the last 4, is the whole total minus those two totals.\n" +
        "- Money stories: income = expenditure + savings, in total or month by month.",
      formula: {
        label: "Average of the rest",
        latex: "A_{\\text{rest}} = \\dfrac{nA - n_1A_1}{n - n_1}",
      },
      authoredExample: {
        prompt: "The average of 14 numbers is 24. The first 4 average 21 and the next 8 average 26. Find the average of the last 2.",
        steps: [
          "All 14 total \\(14 \\times 24 = 336\\).",
          "The known parts total \\(4 \\times 21 + 8 \\times 26 = 84 + 208 = 292\\).",
          "The last 2 total \\(336 - 292 = 44\\), an average of 22.",
        ],
        answer: "\\(22\\).",
      },
      selfCheckExample: {
        prompt: "A family spends an average of ₹8,000 a month for 4 months and ₹9,000 a month for the other 8. It saves ₹4,000 in the year. Find its average monthly income.",
        steps: [
          "Spending: \\(4 \\times 8000 + 8 \\times 9000 = 32{,}000 + 72{,}000 = 1{,}04{,}000\\).",
          "Income = spending + savings \\(= 1{,}08{,}000\\).",
          "\\(1{,}08{,}000 \\div 12 = 9000\\).",
        ],
        answer: "₹9,000.",
      },
      practiceSet: [
        { prompt: "24 students average 62. Sixteen of them average 59. Find the average of the other 8.", answer: "\\(68\\)" },
        { prompt: "Eight numbers average 25. Four of them average 22. Find the average of the other four.", answer: "\\(28\\)" },
        { prompt: "Rainfall over 10 months averaged 12 cm. The first 8 months averaged 11 cm. Find the average of the last 2.", answer: "16 cm" },
        { prompt: "Twelve numbers average 24. The first 7 average 22 and the last 4 average 27. Find the 8th number.", answer: "\\(26\\)" },
      ],
      pyqExampleId: "e6dd1eb9-0f6c-4fe2-b39b-d2212314d9a6",
      traps: [
        {
          title: "Check that the groups cover everyone once",
          body: "If the first 7 of 12 numbers and the last 4 are known, one number (the 8th) is left over. Count the places before you subtract.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-overlap",
      name: "Overlapping groups: the shared value counted twice",
      intuition:
        "'The first 6 and the last 6' of 11 numbers cover 12 places, so one number, the 6th, is in both groups. Adding the two totals counts it twice; taking away the whole total leaves exactly that number.",
      definition:
        "- Shared count = \\(n_1 + n_2 - n\\). If it is 1, the formula gives that value; if it is 2 or more, it gives their sum.\n" +
        "- If \\(n_1 + n_2 < n\\), the groups do not meet. There is a gap instead, and the 'rest of the group' method applies.",
      formula: {
        label: "The shared value",
        latex: "\\text{shared value(s)} = n_1A_1 + n_2A_2 - nA",
      },
      authoredExample: {
        prompt: "The average of 11 numbers is 50. The first 6 average 49 and the last 6 average 52. Find the 6th number.",
        steps: [
          "First 6: \\(294\\). Last 6: \\(312\\). All 11: \\(550\\).",
          "\\(6 + 6 - 11 = 1\\) number is shared: the 6th.",
          "6th number \\(= 294 + 312 - 550 = 56\\).",
        ],
        answer: "\\(56\\).",
      },
      selfCheckExample: {
        prompt: "The average of 20 numbers is 30. The first 12 average 28 and the last 10 average 34. Find the sum of the 11th and 12th numbers.",
        steps: [
          "\\(12 + 10 - 20 = 2\\) numbers are shared: the 11th and 12th.",
          "Their sum \\(= 336 + 340 - 600 = 76\\).",
        ],
        answer: "\\(76\\).",
      },
      practiceSet: [
        { prompt: "Nine numbers average 60. The first 5 average 58 and the last 5 average 63. Find the 5th number.", answer: "\\(65\\)" },
        { prompt: "Fifteen numbers average 24. The first 8 average 22 and the last 8 average 27. Find the 8th number.", answer: "\\(32\\)" },
        { prompt: "27 numbers average 45. The first 14 average 44 and the last 14 average 47. Find the 14th number.", answer: "\\(59\\)" },
      ],
      pyqExampleId: "2b35fb1d-f9a8-4843-b866-56b3ea92948b",
      traps: [
        {
          title: "The overlap may be more than one number",
          body: "The first 12 and the last 10 of 20 numbers share two numbers, so the formula gives their sum, not a single value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-pairwise",
      name: "Pair averages: add all three",
      intuition:
        "Each person appears in two of the three pairs. Add the three pair totals and you have counted everyone twice.",
      definition:
        "- Turn each pair average into a pair total (× 2).\n" +
        "- Half the sum of the three pair totals is \\(a + b + c\\).\n" +
        "- Each value = that full total − the pair it is missing from.\n" +
        "- Overlapping runs of days work the same way: Monday to Wednesday and Tuesday to Thursday share two days, so Thursday − Monday is the difference of the two totals.",
      formula: {
        label: "Three values from three pairs",
        latex: "a + b + c = \\dfrac{(a + b) + (b + c) + (c + a)}{2}",
      },
      authoredExample: {
        prompt: "The average of P and Q is 30, of Q and R is 34, and of P and R is 38. Find Q.",
        steps: [
          "Pair totals: 60, 68 and 76. Their sum is 204.",
          "So \\(P + Q + R = 204 \\div 2 = 102\\).",
          "Q is missing from the pair P and R: \\(Q = 102 - 76 = 26\\).",
        ],
        answer: "\\(26\\).",
      },
      selfCheckExample: {
        prompt: "The average temperature from Monday to Wednesday was 32°C, and from Tuesday to Thursday 33°C. Thursday was 35°C. Find Monday's temperature.",
        steps: [
          "Totals: Mon + Tue + Wed \\(= 96\\), Tue + Wed + Thu \\(= 99\\).",
          "Subtracting, Thu − Mon \\(= 3\\), so Monday \\(= 35 - 3 = 32\\).",
        ],
        answer: "32°C.",
      },
      practiceSet: [
        { prompt: "The averages of \\(a\\) and \\(b\\), \\(b\\) and \\(c\\), and \\(c\\) and \\(a\\) are 15, 17 and 25. Find \\(c\\).", answer: "\\(27\\)" },
        {
          prompt: "The average ages of A and B, B and C, and A and C are 26, 29 and 33. How old is the oldest of the three?",
          answer: "\\(36\\)",
          method: "\\(A + B + C = 88\\); C \\(= 88 - 52\\).",
        },
        { prompt: "Monday to Wednesday averaged 25 units, Tuesday to Thursday 27. Monday was 23. Find Thursday.", answer: "\\(29\\)" },
      ],
      pyqExampleId: "46ede1b8-a94f-4ff7-9648-ab4c8f0e55d1",
      traps: [
        {
          title: "Halve the sum",
          body: "The three pair totals add up to twice the total. If they come to 204, then \\(P + Q + R = 102\\), not 204.",
        },
      ],
    },
  ],
};
