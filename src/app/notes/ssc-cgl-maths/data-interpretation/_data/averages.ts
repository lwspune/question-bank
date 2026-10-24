import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_DI_AVERAGES_NOTE: SubtopicNote = {
  subtopicName: "Averages from Data",
  title: "Averages from Data",
  oneLineDefinition:
    "An average from a table is a total divided by the number of entries, and two averages over the same number of entries can be compared through their totals alone.",
  whyItMatters:
    "Forty-two questions in the bank, the largest share of the chapter after pie charts, and thirty-eight of them are EASY. Four come from 2025. Most need one total and one division; the time is saved by not dividing when the question only compares.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscdiav-mean",
      name: "Average of a row or a column",
      intuition:
        "An average shares a total out equally. Add the entries the question names, count them, and divide. When the numbers sit close together, guess a round value in the middle and only average how far each entry sits from it.",
      definition:
        "- **Full method:** average \\(=\\) total \\(\\div\\) number of entries.\n" +
        "- **Count carefully:** \"from 2010 to 2013\" is four years, \"the first five months\" is five.\n" +
        "- **Fast route (assumed average):** pick a round value \\(A\\) near the middle, add the gaps \\(x - A\\) (with signs), divide that small sum by the count and add it to \\(A\\). This is exact, not an estimate, so it is always safe.\n" +
        "- **Average speed** from a distance table is total distance \\(\\div\\) total time.\n" +
        "- **Mean of the highest and lowest** is just those two values added and halved.\n" +
        "- Keep the table's unit: an average of values \"in thousands\" is in thousands.",
      formula: {
        label: "Average and the assumed average",
        latex: "\\bar{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n} \\qquad \\bar{x} = A + \\frac{\\sum (x_i - A)}{n}",
        symbols: [
          { symbol: "n", meaning: "number of entries" },
          { symbol: "A", meaning: "any round value you choose" },
        ],
      },
      authoredExample: {
        prompt:
          "The table shows a shop's monthly sales (in ₹ thousand).\n\n| Month | Jan | Feb | Mar | Apr | May |\n|---|---|---|---|---|---|\n| Sales | 142 | 155 | 138 | 161 | 149 |\n\nFind the average monthly sales.",
        steps: [
          "Full method: total \\(= 142 + 155 + 138 + 161 + 149 = 745\\), and \\(745 \\div 5 = 149\\).",
          "Fast route: take 150. The gaps are \\(-8, +5, -12, +11, -1\\), which add to \\(-5\\).",
          "\\(150 + \\frac{-5}{5} = 149\\), the same answer, so ₹149 thousand, that is ₹1,49,000.",
        ],
        answer: "₹1,49,000",
      },
      selfCheckExample: {
        prompt:
          "A factory's weekly output (in tonnes) for six weeks was 48.5, 52, 47, 50.5, 53 and 49. Find the average weekly output.",
        steps: [
          "Take 50: the gaps are \\(-1.5, +2, -3, +0.5, +3, -1\\), which add to 0.",
          "So the average is exactly 50 tonnes. Check: the total is 300, and \\(300 \\div 6 = 50\\).",
        ],
        answer: "50 tonnes",
      },
      practiceSet: [
        { prompt: "Find the average of 72, 75, 78 and 83.", answer: "77" },
        {
          prompt: "Using 600 as the assumed average, find the average of 612, 594, 605 and 601.",
          answer: "603",
          method: "Gaps \\(12 - 6 + 5 + 1 = 12\\), and \\(600 + \\frac{12}{4} = 603\\).",
        },
        { prompt: "A runner covers 12 km, 15 km, 9 km and 14 km in four successive hours. What is the average speed?", answer: "12.5 km/h" },
        { prompt: "What is the mean of the highest and the lowest of 310, 455, 280 and 390?", answer: "367.5" },
      ],
      pyqExampleId: "25fb4280-3306-42e1-b5e4-18d2dba56754",
      traps: [
        {
          title: "Dividing by the wrong count",
          body:
            "Years from 2010 to 2013 are four entries, not three. Count the entries you added, not the gap between the first and last year.",
        },
        {
          title: "Rounding the entries before adding",
          body:
            "Add the entries exactly, divide, and only then compare with the options. Rounding each entry first can shift the average onto a neighbouring option when the options sit close together.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdiav-compare",
      name: "Comparing or subtracting two averages",
      intuition:
        "If two lists have the same number of entries, the one with the bigger total has the bigger average, because both are divided by the same number. And the gap between their averages is the gap between their totals, divided once.",
      definition:
        "- **Same count:** compare totals; there is no need to divide at all.\n" +
        "- **Difference of two averages over the same count** \\(=\\) difference of totals \\(\\div n\\). You can also add the pair-by-pair gaps and divide once.\n" +
        "- **Different counts:** each average must be worked out on its own before you compare.\n" +
        "- If one row beats another in every column, its average is higher with no arithmetic at all.",
      formula: {
        label: "Difference of averages over the same count",
        latex: "\\bar{x} - \\bar{y} = \\frac{\\sum x_i - \\sum y_i}{n}",
        symbols: [{ symbol: "n", meaning: "the common number of entries" }],
      },
      authoredExample: {
        prompt:
          "The table shows the output of two plants (in thousand units).\n\n| Year | 2019 | 2020 | 2021 | 2022 |\n|---|---|---|---|---|\n| Plant A | 36 | 41 | 39 | 44 |\n| Plant B | 30 | 38 | 42 | 34 |\n\nFind the difference between the average yearly outputs of the two plants.",
        steps: [
          "Full method: A's total is 160 and B's is 144, so the averages are 40 and 36, and the difference is 4.",
          "Fast route: the year-by-year gaps are \\(+6, +3, -3, +10\\), adding to 16, and \\(16 \\div 4 = 4\\).",
          "The unit is thousands, so the difference is 4,000 units.",
        ],
        answer: "4,000 units",
      },
      selfCheckExample: {
        prompt:
          "The table shows three students' marks in three tests.\n\n| Student | Test 1 | Test 2 | Test 3 |\n|---|---|---|---|\n| Asha | 72 | 81 | 77 |\n| Bilal | 79 | 74 | 80 |\n| Chitra | 70 | 85 | 76 |\n\nWho has the highest average?",
        steps: [
          "Each student sat three tests, so compare totals: Asha 230, Bilal 233, Chitra 231.",
          "Bilal's total is the largest, so his average (about 77.7) is the largest.",
        ],
        answer: "Bilal",
      },
      practiceSet: [
        {
          prompt: "Over the same 5 years, company P sold 2,450 units in all and company Q sold 2,300. By how much is P's average yearly sale higher?",
          answer: "30 units",
        },
        { prompt: "Team X scored 54, 61 and 58 in three rounds and team Y scored 60, 59 and 63. Which team has the higher average?", answer: "Team Y" },
        { prompt: "Over four years, A's yearly figures exceed B's by 8, 3, \\(-5\\) and 6. By how much is A's average higher?", answer: "3" },
        { prompt: "Four values average 25 and four other values average 31. What is the difference between their totals?", answer: "24" },
      ],
      pyqExampleId: "8117d7e9-6708-4db7-b096-381f39c765f7",
      traps: [
        {
          title: "Comparing totals when the counts differ",
          body:
            "A total of 300 over 4 years is a larger average than a total of 360 over 6 years. Totals stand in for averages only when the number of entries is the same.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdiav-above",
      name: "Values above, below or closest to the average",
      intuition:
        "Once the average is known, each entry is either above it, below it or on it. Questions ask you to count one side, or to find the entry with the smallest gap from it.",
      definition:
        "- Find the average first, then compare each entry with it.\n" +
        "- **Above or below** are strict: an entry equal to the average is neither.\n" +
        "- **Closest to the average:** the entry with the smallest gap \\(|x - \\bar{x}|\\). Two entries can tie, and the options may say \"both\".\n" +
        "- The entries above and below always balance: their gaps add to zero, which is a quick check on the average.",
      formula: {
        label: "Gap from the average",
        latex: "d_i = x_i - \\bar{x} \\qquad \\sum d_i = 0",
      },
      authoredExample: {
        prompt:
          "The table shows a machine's output on seven days.\n\n| Day | Mon | Tue | Wed | Thu | Fri | Sat | Sun |\n|---|---|---|---|---|---|---|---|\n| Output | 62 | 48 | 75 | 55 | 70 | 58 | 66 |\n\nOn how many days was the output above the average?",
        steps: [
          "Total \\(= 434\\), so the average is \\(434 \\div 7 = 62\\).",
          "Above 62: Wednesday (75), Friday (70) and Sunday (66).",
          "Monday is exactly 62, which is not above the average.",
        ],
        answer: "3 days",
      },
      selfCheckExample: {
        prompt: "A shop's sales in five months were 1,240, 1,310, 1,195, 1,275 and 1,330. Which value is closest to the average?",
        steps: [
          "Total \\(= 6350\\), so the average is \\(6350 \\div 5 = 1270\\).",
          "Gaps: 30, 40, 75, 5, 60. The smallest is 5.",
        ],
        answer: "1,275",
      },
      practiceSet: [
        { prompt: "How many of 38, 45, 40, 33 and 44 are above their own average?", answer: "2", method: "The average is 40; 45 and 44 are above it." },
        { prompt: "Which of 18, 25, 22, 31 and 29 is closest to their average?", answer: "25", method: "The average is exactly 25." },
        { prompt: "Sales in four months were 12, 20, 16 and 24. In how many months were sales below the average?", answer: "2" },
        { prompt: "How many of 3, 7, 8 and 14 are at least their average?", answer: "2", method: "The average is 8; 8 and 14 qualify." },
      ],
      pyqExampleId: "9bca55c9-14fc-49ca-93ea-f03698fa5845",
      traps: [
        {
          title: "Counting the entry that equals the average",
          body:
            "An entry equal to the average is not more than it and not less than it. Leave it out of both counts unless the question says \"at least\" or \"at most\".",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdiav-combined",
      name: "Combined average of two or more groups",
      intuition:
        "Putting two groups together means putting their totals together and their counts together. The combined average is the new total over the new count. It is the plain mean of the two averages only when both groups are the same size.",
      definition:
        "- **Combined average** \\(=\\) (sum of all entries) \\(\\div\\) (number of all entries).\n" +
        "- From averages: multiply each average by its count to get totals, add, divide by the total count.\n" +
        "- **Equal group sizes:** the combined average is the mean of the group averages. Unequal sizes: never take the plain mean.\n" +
        "- **A score table** (how many students got each mark) is a combined average: \\(\\sum (\\text{count} \\times \\text{mark}) \\div \\) number of students.",
      formula: {
        label: "Combined average",
        latex: "\\bar{x}_{\\text{combined}} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}",
        symbols: [
          { symbol: "n_1, n_2", meaning: "sizes of the two groups" },
          { symbol: "\\(\\bar{x}_1\\), \\(\\bar{x}_2\\)", meaning: "their averages" },
        ],
      },
      authoredExample: {
        prompt:
          "The table shows the daily output of two machines.\n\n| Machine | Day 1 | Day 2 | Day 3 |\n|---|---|---|---|\n| M1 | 31 | 35 | 33 |\n| M2 | 41 | 38 | 44 |\n\nWhat is the overall average output per machine per day?",
        steps: [
          "All six entries add to \\(99 + 123 = 222\\), over 6 machine-days, so the average is \\(222 \\div 6 = 37\\).",
          "Check: the groups are the same size, so the mean of their averages also works: \\(\\frac{33 + 41}{2} = 37\\).",
        ],
        answer: "37 units",
      },
      selfCheckExample: {
        prompt: "In a test, 12 students scored 5 marks, 20 scored 3 marks and 8 scored 0. What is the average mark per student?",
        steps: [
          "Total marks \\(= 12 \\times 5 + 20 \\times 3 + 8 \\times 0 = 120\\).",
          "Students \\(= 12 + 20 + 8 = 40\\), so the average is \\(120 \\div 40 = 3\\).",
        ],
        answer: "3 marks",
      },
      practiceSet: [
        { prompt: "A group of 10 has an average of 30 and a group of 30 has an average of 40. What is the combined average?", answer: "37.5" },
        { prompt: "A class of 25 averages 60 marks and a class of 15 averages 52. What is the combined average?", answer: "57" },
        {
          prompt: "Over the same 4 years, type X averaged 600 units a year and type Y averaged 800. What is the combined average of all 8 yearly figures?",
          answer: "700",
        },
        {
          prompt: "Three questions carry 1, 2 and 4 marks, and 30, 20 and 10 of 40 students answered them correctly. With no negative marking, what is the average mark per student?",
          answer: "2.75",
        },
      ],
      pyqExampleId: "7fbc58d5-f9ab-4a16-9ac5-6868753dd32b",
      traps: [
        {
          title: "Taking the plain mean of two averages",
          body:
            "A group of 10 averaging 30 and a group of 30 averaging 40 do not combine to 35. The larger group pulls harder: the combined average is 37.5.",
        },
      ],
    },
  ],
};
