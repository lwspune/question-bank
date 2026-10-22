import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_JOINING_NOTE: SubtopicNote = {
  subtopicName: "Members Joining or Leaving",
  title: "Groups That Join or Leave",
  oneLineDefinition:
    "When a whole group with its own average joins or leaves, add or take away its total and change the count by its size. When some leave and others join, do both before you divide.",
  whyItMatters:
    "This is the chapter's biggest page and nearly a quarter of it is HARD. Most of the HARD questions have some people leaving and others joining at once. The slip is to change the total but not the count, or to change the count for only one of the two groups.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-group-joins",
      name: "A group joins",
      intuition:
        "A group of \\(m\\) with average \\(B\\) brings a total of \\(mB\\). Add it to the old total, add \\(m\\) to the count, and divide.",
      definition:
        "- New total = \\(nA + mB\\) (or the sum of the listed values); new count = \\(n + m\\).\n" +
        "- The new average lies between \\(A\\) and \\(B\\), nearer the bigger group.\n" +
        "- **Shortcut:** the average moves by \\(\\dfrac{m(B - A)}{n + m}\\).",
      formula: {
        label: "A group joins",
        latex: "\\bar x' = \\dfrac{nA + mB}{n + m}",
      },
      authoredExample: {
        prompt: "The average height of 24 players is 170 cm. Six players averaging 180 cm join. Find the new average.",
        steps: [
          "Totals: \\(24 \\times 170 = 4080\\) and \\(6 \\times 180 = 1080\\).",
          "\\(5160 \\div 30 = 172\\).",
          "Shortcut: \\(\\dfrac{6 \\times 10}{30} = 2\\) above 170.",
        ],
        answer: "172 cm.",
      },
      selfCheckExample: {
        prompt: "A club of 12 members has an average age of 32. Four members aged 40, 42, 46 and 48 join. Find the new average.",
        steps: [
          "Old total \\(= 12 \\times 32 = 384\\). The joiners total \\(176\\).",
          "\\((384 + 176) \\div 16 = 560 \\div 16 = 35\\).",
        ],
        answer: "35 years.",
      },
      practiceSet: [
        { prompt: "40 students average 50. Ten students averaging 60 join. Find the new average.", answer: "\\(52\\)" },
        { prompt: "12 families average ₹19,000 a month. Four more families averaging ₹33,000 move in. Find the new average.", answer: "₹22,500" },
        { prompt: "28 workers make 8 units a day on average. Twelve workers averaging 13 join. Find the new average.", answer: "\\(9.5\\)" },
      ],
      pyqExampleId: "c53b1d92-01ad-4156-871d-5cc509f608ff",
      traps: [
        {
          title: "The size of the joining group matters",
          body: "Six people averaging 80 joining 24 who average 70 lift the average to \\((1680 + 480) \\div 30 = 72\\), not to the midpoint 75.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-group-leaves",
      name: "A group leaves",
      intuition:
        "Take the leavers' total out of the old total and their number off the count. If those who leave were above average, the rest are below it.",
      definition:
        "- New total = \\(nA - mB\\); new count = \\(n - m\\).\n" +
        "- If the leavers' values are listed one by one, add them to get \\(mB\\).\n" +
        "- If the leavers average exactly \\(A\\), the average of the rest is still \\(A\\).",
      formula: {
        label: "A group leaves",
        latex: "\\bar x' = \\dfrac{nA - mB}{n - m}",
      },
      authoredExample: {
        prompt: "The average salary of 30 employees is ₹40,000. Six employees averaging ₹52,000 leave. Find the new average.",
        steps: [
          "Old total \\(= 30 \\times 40{,}000 = ₹12{,}00{,}000\\). The leavers take \\(6 \\times 52{,}000 = ₹3{,}12{,}000\\).",
          "\\(8{,}88{,}000 \\div 24 = 37{,}000\\).",
        ],
        answer: "₹37,000.",
      },
      selfCheckExample: {
        prompt: "33 students average 60 marks. Three students scoring 72, 78 and 90 leave. Find the average of the rest.",
        steps: [
          "Old total \\(= 33 \\times 60 = 1980\\). The leavers scored \\(72 + 78 + 90 = 240\\).",
          "\\((1980 - 240) \\div 30 = 1740 \\div 30 = 58\\).",
        ],
        answer: "\\(58\\).",
      },
      practiceSet: [
        { prompt: "24 numbers average 30. Six numbers averaging 42 are removed. Find the new average.", answer: "\\(26\\)" },
        { prompt: "A gym's 32 members average 72 kg. Eight members averaging 84 kg cancel. Find the new average.", answer: "68 kg" },
        { prompt: "50 employees average 9 years of service. Ten averaging 15 years retire. Find the new average.", answer: "7.5 years" },
      ],
      pyqExampleId: "41b7740b-2032-49c4-a08d-ff6055b31d66",
      traps: [
        {
          title: "Leaving can raise the average",
          body: "If 6 of 30 students averaging 50 leave and those 6 averaged 38, the rest average \\((1500 - 228) \\div 24 = 53\\), above the old 50.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-join-and-leave",
      name: "Some leave, others join",
      intuition:
        "Do the leaving and the joining on the total, do the same on the count, and divide once at the end.",
      definition:
        "- New total = old total − leavers' total + joiners' total.\n" +
        "- New count = \\(n - m + k\\). When as many join as leave (a group replaced), the count does not change.\n" +
        "- Write four numbers in a line before you calculate: old total, out, in, new count.",
      formula: {
        label: "Leave and join together",
        latex: "\\bar x' = \\dfrac{nA - mB + kC}{n - m + k}",
      },
      authoredExample: {
        prompt: "A class of 32 averages 60. Nine students averaging 45 leave and seven averaging 75 join. Find the new average.",
        steps: [
          "Old total \\(= 32 \\times 60 = 1920\\).",
          "Out: \\(9 \\times 45 = 405\\). In: \\(7 \\times 75 = 525\\). New total \\(= 1920 - 405 + 525 = 2040\\).",
          "New count \\(= 32 - 9 + 7 = 30\\), so the average is \\(2040 \\div 30 = 68\\).",
        ],
        answer: "\\(68\\).",
      },
      selfCheckExample: {
        prompt: "The average weight of 20 boxes is 30 kg. Five boxes are replaced by five new boxes averaging 36 kg, and the average rises to 31 kg. Find the average weight of the boxes taken out.",
        steps: [
          "The count is unchanged, so the total rose by \\(20 \\times 1 = 20\\) kg.",
          "The new boxes weigh 180 kg, so the old five weighed \\(180 - 20 = 160\\) kg.",
          "Their average is \\(160 \\div 5 = 32\\) kg.",
        ],
        answer: "32 kg.",
      },
      practiceSet: [
        { prompt: "40 workers average ₹500 a day. Ten averaging ₹600 leave and five averaging ₹420 join. Find the new average.", answer: "₹460" },
        { prompt: "15 players average 70. Three scoring 80, 82 and 84 are replaced by three scoring 60, 64 and 68. Find the new average.", answer: "\\(66.4\\)" },
        { prompt: "A team of 12 averages 25 years. Two aged 34 and 36 leave, and three aged 21, 23 and 25 join. Find the new average.", answer: "23 years" },
      ],
      pyqExampleId: "99d37818-a4a4-4139-8ab5-eedf63b19a76",
      traps: [
        {
          title: "Two changes to the count",
          body: "If 9 leave and 7 join a class of 32, the new count is 30. Using \\(32 - 9 = 23\\) or \\(32 + 7 = 39\\) gives a wrong average.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-find-group",
      name: "Finding the group that joined or left",
      intuition:
        "Work backwards from the two averages. The gap between the new total and the old total is what the group brought in or took away.",
      definition:
        "- **Joined:** group total = new total − old total.\n" +
        "- **Left:** group total = old total − new total.\n" +
        "- **Shortcut for joiners:** \\(B = A' + \\dfrac{n(A' - A)}{m}\\).\n" +
        "- A group average of 0 (brand-new books, newborn babies) is possible: the total did not change at all.",
      formula: {
        label: "The joining group's total",
        latex: "mB = (n + m)A' - nA",
      },
      authoredExample: {
        prompt: "The average of 40 numbers is 25. Ten more numbers are added and the average becomes 28. Find the average of the new numbers.",
        steps: [
          "Old total \\(= 1000\\); new total \\(= 50 \\times 28 = 1400\\).",
          "The new numbers total 400, an average of 40.",
          "Shortcut: \\(28 + \\dfrac{40 \\times 3}{10} = 40\\).",
        ],
        answer: "\\(40\\).",
      },
      selfCheckExample: {
        prompt: "The average age of 36 teachers is 42. Six retire, and the other 30 average 40. Find the average age of those who retired.",
        steps: [
          "Before: \\(36 \\times 42 = 1512\\). After: \\(30 \\times 40 = 1200\\).",
          "The six took out \\(312\\) years, an average of 52.",
        ],
        answer: "52 years.",
      },
      practiceSet: [
        { prompt: "20 numbers average 46. Four are removed and the rest average 44. Find the average of the four.", answer: "\\(54\\)" },
        { prompt: "A class of 30 averages 60. Six new students raise the average to 61. Find their average.", answer: "\\(66\\)" },
        {
          prompt: "24 books average 6 years in age. Some brand-new books are added and the average falls to 4.5 years. How many were added?",
          answer: "\\(8\\)",
          method: "The total stays 144, and \\(144 \\div 4.5 = 32\\) books.",
        },
      ],
      pyqExampleId: "cf195340-b5af-43a6-aa9d-2010b85c6f31",
      traps: [
        {
          title: "Divide by the group, not by everyone",
          body: "If ten joiners add 400 to the total, they average \\(400 \\div 10 = 40\\) each, not \\(400 \\div 50\\).",
        },
      ],
    },
  ],
};
