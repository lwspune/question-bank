import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_SINGLE_NOTE: SubtopicNote = {
  subtopicName: "Adding, Removing or Replacing a Value",
  title: "One Value In, Out or Changed",
  oneLineDefinition:
    "Turn the old average into a total, add or take away the value that changed, and divide by the right count: for a newcomer, someone who leaves, a member who is replaced and a value that was misread.",
  whyItMatters:
    "Six of the chapter's thirteen AFCAT past-year questions are on this page, from 2015 to 2019: a man replaced, a misread weight, a team's ages. Almost all of the page is EASY. The marks go when the count is not updated, or when a misread value is corrected in the wrong direction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-one-added",
      name: "One more value: a new day, a teacher, a manager",
      intuition:
        "A new value joins the total and the count grows by one. If the new value is above the average it pulls the average up, but by much less than the gap.",
      definition:
        "- New total = old total + new value; new count = \\(n + 1\\).\n" +
        "- **Shortcut:** the average moves by \\(\\dfrac{x - A}{n + 1}\\), up if the new value \\(x\\) is above the old average \\(A\\), down if below.\n" +
        "- 'Including the teacher' or 'the next day' is the same move.",
      formula: {
        label: "One value added",
        latex: "\\text{new average} = \\dfrac{nA + x}{n + 1}",
      },
      authoredExample: {
        prompt: "A worker's average output over 9 days is 40 units. On the 10th day he makes 70. Find his new average.",
        steps: [
          "Total over 9 days \\(= 9 \\times 40 = 360\\).",
          "Total over 10 days \\(= 360 + 70 = 430\\), so the average is \\(430 \\div 10 = 43\\).",
          "Shortcut: \\(\\dfrac{70 - 40}{10} = 3\\) above 40.",
        ],
        answer: "43 units.",
      },
      selfCheckExample: {
        prompt: "The average age of 14 players is 21. Their coach, aged 51, is included. Find the new average.",
        steps: [
          "The players total \\(14 \\times 21 = 294\\) years.",
          "With the coach: \\(294 + 51 = 345\\) years over 15 people.",
          "\\(345 \\div 15 = 23\\).",
        ],
        answer: "23 years.",
      },
      practiceSet: [
        { prompt: "Five numbers average 12. The number 18 is added. Find the new average.", answer: "\\(13\\)" },
        { prompt: "11 clerks average ₹20,000 a month. A manager on ₹44,000 joins. Find the new average.", answer: "₹22,000" },
        { prompt: "A student averages 60 in 4 tests and scores 75 in the fifth. Find the new average.", answer: "\\(63\\)" },
        { prompt: "The temperature averaged 32°C for 4 days. On the fifth day it was 27°C. Find the 5-day average.", answer: "31°C" },
      ],
      pyqExampleId: "caf67eab-bde3-4fb2-b70d-904dccd78926",
      traps: [
        {
          title: "The count goes up too",
          body: "A salary of ₹60,000 added to 9 people averaging ₹40,000 gives \\((3{,}60{,}000 + 60{,}000) \\div 10 = ₹42{,}000\\). Dividing by 9 again gives ₹46,667.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-one-removed",
      name: "One value removed",
      intuition:
        "Take the value out of the total and one off the count. Removing a value above the average pulls the average down; removing one below it pushes the average up.",
      definition:
        "- New total = \\(nA - x\\); new count = \\(n - 1\\).\n" +
        "- The average falls by \\(\\dfrac{x - A}{n - 1}\\) when \\(x\\) is above the average, and rises when \\(x\\) is below it.\n" +
        "- Two or three values removed: take out their sum and reduce the count by that many.",
      formula: {
        label: "One value removed",
        latex: "\\text{new average} = \\dfrac{nA - x}{n - 1}",
      },
      authoredExample: {
        prompt: "The average of 10 numbers is 24. The number 42 is removed. Find the new average.",
        steps: [
          "Total \\(= 10 \\times 24 = 240\\); without 42 it is \\(198\\).",
          "\\(198 \\div 9 = 22\\).",
          "Shortcut: 42 is 18 above the average, and \\(18 \\div 9 = 2\\), so the average falls by 2.",
        ],
        answer: "\\(22\\).",
      },
      selfCheckExample: {
        prompt: "The average salary of 13 people, including the manager, is ₹18,000. The manager earns ₹42,000. Find the average of the other 12.",
        steps: [
          "All 13 earn \\(13 \\times 18{,}000 = ₹2{,}34{,}000\\).",
          "Without the manager: \\(2{,}34{,}000 - 42{,}000 = ₹1{,}92{,}000\\).",
          "\\(1{,}92{,}000 \\div 12 = ₹16{,}000\\).",
        ],
        answer: "₹16,000.",
      },
      practiceSet: [
        { prompt: "Eight numbers average 15. The number 22 is removed. Find the new average.", answer: "\\(14\\)" },
        { prompt: "16 boxes average 25 kg. Two boxes of 30 kg and 34 kg are taken away. Find the new average.", answer: "24 kg" },
        { prompt: "Seven numbers average 20. The number 14 is removed. Find the new average.", answer: "\\(21\\)" },
      ],
      pyqExampleId: "5a0467ed-f57f-4bbc-be3b-b784947d0c4d",
      traps: [
        {
          title: "A low value leaving raises the average",
          body: "From 11 values averaging 50, removing a 30 lifts the average to \\((550 - 30) \\div 10 = 52\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-newcomer",
      name: "Finding the value that joined or left",
      intuition:
        "If one newcomer lifts the average of \\(n\\) people by \\(d\\), the newcomer must supply the new average for themselves plus \\(d\\) for each of the \\(n\\) others.",
      definition:
        "- **Joiner:** \\(x = (n + 1) \\times \\text{new average} - n \\times \\text{old average}\\). Shortcut: \\(x = \\text{new average} + n \\times \\text{rise}\\).\n" +
        "- **Leaver:** \\(x = n \\times \\text{old average} - (n - 1) \\times \\text{new average}\\). Shortcut: \\(x = \\text{old average} + (n - 1) \\times \\text{fall}\\).\n" +
        "- If the average falls when someone joins, the 'rise' is negative and the newcomer is below the new average.",
      formula: {
        label: "The newcomer",
        latex: "x = (n + 1)A' - nA = A' + n(A' - A)",
      },
      authoredExample: {
        prompt: "The average age of 19 students is 12. When the teacher is included, the average becomes 13.5. Find the teacher's age.",
        steps: [
          "With the teacher, 20 people total \\(20 \\times 13.5 = 270\\) years.",
          "The students total \\(19 \\times 12 = 228\\).",
          "The teacher is \\(270 - 228 = 42\\). Shortcut: \\(13.5 + 19 \\times 1.5 = 42\\).",
        ],
        answer: "42 years.",
      },
      selfCheckExample: {
        prompt: "The average weight of 30 students is 52 kg. One student leaves and the average falls by 0.2 kg. Find his weight.",
        steps: [
          "Before: \\(30 \\times 52 = 1560\\) kg. After: \\(29 \\times 51.8 = 1502.2\\) kg.",
          "He weighs \\(1560 - 1502.2 = 57.8\\) kg. Shortcut: \\(52 + 29 \\times 0.2 = 57.8\\).",
        ],
        answer: "57.8 kg.",
      },
      practiceSet: [
        { prompt: "Nine people average 40. A newcomer raises the average to 42. Find the newcomer's value.", answer: "\\(60\\)" },
        { prompt: "Eleven numbers average 25. One is removed and the rest average 24. Find the number removed.", answer: "\\(35\\)" },
        { prompt: "17 students average 60. A new student raises the average to 62. Find the new student's mark.", answer: "\\(96\\)" },
        { prompt: "Seven numbers average 16. One is removed and the rest average 15. Find it.", answer: "\\(22\\)" },
      ],
      pyqExampleId: "fa238c47-2a14-4c79-97b8-b86550c24895",
      traps: [
        {
          title: "The newcomer pays for everyone",
          body: "If 20 people average 50 and a newcomer lifts it to 52, the newcomer is \\(52 + 20 \\times 2 = 92\\), not \\(50 + 20 \\times 2 = 90\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-replace",
      name: "Replacing a member",
      intuition:
        "A replacement keeps the count the same, so the whole change in the total is spread over all \\(n\\) members. A rise of \\(d\\) in the average means the newcomer is \\(nd\\) more than the person replaced.",
      definition:
        "- Count unchanged: new value − old value \\(= n \\times\\) change in the average.\n" +
        "- Two replaced by two: the two newcomers' total is the two leavers' total plus \\(n \\times\\) the change; halve it for their average.\n" +
        "- Ages in years and months: turn everything into months first.",
      formula: {
        label: "One member replaced",
        latex: "x_{\\text{new}} = x_{\\text{old}} + n\\,d",
      },
      authoredExample: {
        prompt: "The average weight of 8 boys rises by 1.5 kg when a boy of 46 kg is replaced by a new boy. Find the new boy's weight.",
        steps: [
          "The total rises by \\(8 \\times 1.5 = 12\\) kg, and the count is still 8.",
          "So the new boy is \\(46 + 12 = 58\\) kg.",
        ],
        answer: "58 kg.",
      },
      selfCheckExample: {
        prompt: "The average age of 12 men rises by 2.5 years when two men aged 26 and 30 are replaced by two women. Find the women's average age.",
        steps: [
          "The total rises by \\(12 \\times 2.5 = 30\\) years.",
          "The women total \\(26 + 30 + 30 = 86\\) years.",
          "Their average is \\(86 \\div 2 = 43\\).",
        ],
        answer: "43 years.",
      },
      practiceSet: [
        { prompt: "Twelve numbers average 30. The number 18 is replaced by 42. Find the new average.", answer: "\\(32\\)" },
        { prompt: "Nine numbers average 40. When 48 is replaced by \\(x\\), the average falls by 3. Find \\(x\\).", answer: "\\(21\\)" },
        {
          prompt: "The average age of 16 players rises by 3 months when a 20-year-old is replaced. How old is the new player?",
          answer: "24 years",
          method: "\\(16 \\times 3 = 48\\) months, which is 4 years.",
        },
        { prompt: "Six numbers average 20. 25 and 15 are replaced by 31 and 21. Find the new average.", answer: "\\(22\\)" },
      ],
      pyqExampleId: "814d6169-4ae8-48db-96b0-aa595292370c",
      traps: [
        {
          title: "No one was added",
          body: "A swap changes no count. A rise of 1.5 in the average of 8 means the total rose by \\(8 \\times 1.5 = 12\\), not \\(9 \\times 1.5 = 13.5\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-correct-error",
      name: "A value misread or miscopied",
      intuition:
        "The wrong value sat in the total in place of the right one. Swap it back: the total moves by the difference, and the average by the difference over the count.",
      definition:
        "- Correct total = wrong total − wrong value + right value.\n" +
        "- The average changes by \\(\\dfrac{\\text{right} - \\text{wrong}}{n}\\): up if the right value is bigger, down if smaller.\n" +
        "- Several errors: add up the differences first, then divide once.\n" +
        "- Reversed digits: 53 written as 35 is an error of 18. Any two-digit reversal is off by 9 times the difference of the digits.",
      formula: {
        label: "Correcting one value",
        latex: "\\text{correct average} = A + \\dfrac{\\text{right value} - \\text{wrong value}}{n}",
      },
      authoredExample: {
        prompt: "The average of 40 numbers was found to be 52. Later, 64 was found to have been copied as 40. Find the correct average.",
        steps: [
          "The total was \\(64 - 40 = 24\\) too small.",
          "The average was \\(24 \\div 40 = 0.6\\) too small.",
          "Correct average \\(= 52 + 0.6 = 52.6\\).",
        ],
        answer: "\\(52.6\\).",
      },
      selfCheckExample: {
        prompt: "The average of 25 marks is 60. Two marks, 72 and 38, were entered as 27 and 58. Find the correct average.",
        steps: [
          "The right marks total 110; the wrong ones 85.",
          "The total was 25 too small, so the average was \\(25 \\div 25 = 1\\) too small.",
        ],
        answer: "\\(61\\).",
      },
      practiceSet: [
        { prompt: "The average of 15 numbers was 30, but 21 was read as 51. Find the correct average.", answer: "\\(28\\)" },
        { prompt: "The mean of 10 numbers was 45, but 63 was entered as 36. Find the correct mean.", answer: "\\(47.7\\)" },
        { prompt: "The average of 50 observations was 80, but 92 was taken as 42. Find the correct average.", answer: "\\(81\\)" },
        {
          prompt: "The average of 12 numbers was 18, but 33 was recorded as 45 and 10 as 4. Find the correct average.",
          answer: "\\(17.5\\)",
          method: "Net error \\((33 - 45) + (10 - 4) = -6\\).",
        },
      ],
      pyqExampleId: "d7396853-76c5-4eb3-b342-a4e13ceb4940",
      traps: [
        {
          title: "Which way round",
          body: "If 64 was written as 46, the total was 18 too small and the true average is higher. Subtracting instead moves the average the wrong way by twice as much.",
        },
      ],
    },
  ],
};
