import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AV_SUM_NOTE: SubtopicNote = {
  subtopicName: "Sum and Mean",
  title: "Sum and Mean",
  oneLineDefinition:
    "The average is the total divided by the number of items, so the total is always the number of items times the average.",
  whyItMatters:
    "Fourteen questions in the bank, eleven EASY and three MODERATE, seven of them from 2025. Every later page in this chapter rests on one habit taught here: change each average into a total, work with totals, and divide only at the end.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscavsm-sum",
      name: "Average, sum and count",
      intuition:
        "Pool everything together and share it out equally: the equal share each item gets is the average. So the average and the total carry the same information, and you can move from one to the other in one step.",
      definition:
        "- **Average** \\(=\\) sum \\(\\div\\) count.\n" +
        "- Turned round: **sum \\(=\\) count \\(\\times\\) average**. Most SSC averages questions are solved by changing every average into a sum, adding or subtracting the sums, and dividing once at the end.\n" +
        "- The **count** is the number of items. Sometimes you must find it first, for example the number of items bought with the money that is left.\n" +
        "- When a value is described by its link to another (\\(20\\%\\) more than the second), write every value in terms of one unknown, add them, and set the result equal to the sum.\n" +
        "- When a question gives limits for a whole-number value, keep only the values that every condition allows, then average those values.",
      formula: {
        label: "Average, sum and count",
        latex: "\\text{Average} = \\frac{\\text{Sum}}{\\text{Count}} \\qquad \\text{Sum} = \\text{Count} \\times \\text{Average}",
      },
      authoredExample: {
        prompt: "Four friends share a taxi. Three of them pay ₹120 each and the fourth pays ₹160. What is the average amount paid?",
        steps: [
          "Full method: sum \\(= 3 \\times 120 + 160 = 360 + 160 = 520\\); count \\(= 4\\).",
          "Average \\(= \\frac{520}{4} = 130\\).",
          "Fast route: the fourth friend paid ₹40 more than the others, and that extra is shared by all 4, so the average is \\(120 + \\frac{40}{4} = 130\\).",
        ],
        answer: "₹130",
      },
      selfCheckExample: {
        prompt: "The average of three numbers is 24. Two of them are 19 and 31. What is the third number?",
        steps: [
          "Sum of all three \\(= 3 \\times 24 = 72\\).",
          "Third number \\(= 72 - 19 - 31 = 22\\).",
        ],
        answer: "22",
      },
      practiceSet: [
        { prompt: "The average of 6 numbers is 15. What is their sum?", answer: "90" },
        { prompt: "Five parcels weigh 3 kg, 4 kg, 6 kg, 7 kg and 10 kg. What is their average weight?", answer: "6 kg" },
        { prompt: "The average of two numbers is 18 and one of them is 11. What is the other number?", answer: "25" },
        {
          prompt: "The average of a, b and c is 12, where b is twice a and c is three times a. What is a?",
          answer: "6",
          method: "\\(a + 2a + 3a = 6a = 3 \\times 12 = 36\\), so \\(a = 6\\).",
        },
      ],
      pyqExampleId: "d9ccce5f-ac0f-4762-9312-6c07d7fe52c0",
      traps: [
        {
          title: "Averaging two averages of unequal groups",
          body:
            "If 4 numbers average 10 and 6 other numbers average 20, the average of all 10 is not 15. Change both to sums first: \\(\\frac{40 + 120}{10} = 16\\).",
        },
        {
          title: "Forgetting part of the count",
          body:
            "In a mixed purchase the average price is total money over total items. Count every item, including the ones whose number you had to work out from the money left over.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavsm-deviation",
      name: "Average from an assumed value",
      intuition:
        "Adding five three-digit numbers is slow. Pick a round number near the middle, note how far each value is above or below it, and average those small gaps instead. The true average is your round number plus that small correction.",
      definition:
        "- Choose an **assumed average** \\(A\\), a round number close to the values.\n" +
        "- Write each **deviation** \\(x - A\\): positive for a value above \\(A\\), negative for a value below.\n" +
        "- True average \\(= A + \\) (sum of deviations) \\(\\div\\) count.\n" +
        "- Deviations from the true average always add to 0. That gives a quick check, and later in this chapter it gives whole methods.\n" +
        "- The shortcut is always safe: it is the sum rule done with smaller numbers.",
      formula: {
        label: "Average from an assumed value",
        latex: "\\bar{x} = A + \\frac{\\sum (x - A)}{n} \\qquad \\sum (x - \\bar{x}) = 0",
        symbols: [
          { symbol: "A", meaning: "the assumed average, any convenient number" },
          { symbol: "n", meaning: "the number of values" },
          { symbol: "\\(\\bar{x}\\)", meaning: "the true average" },
        ],
      },
      authoredExample: {
        prompt: "Find the average of 87, 92, 85, 96 and 93.",
        steps: [
          "Fast route: take \\(A = 90\\). Deviations: \\(-3, +2, -5, +6, +3\\), which add to \\(+3\\).",
          "Average \\(= 90 + \\frac{3}{5} = 90.6\\).",
          "Full method check: sum \\(= 453\\) and \\(\\frac{453}{5} = 90.6\\).",
        ],
        answer: "90.6",
      },
      selfCheckExample: {
        prompt: "Find the average of 148, 152, 155, 141 and 149.",
        steps: [
          "Take \\(A = 150\\). Deviations: \\(-2, +2, +5, -9, -1\\), which add to \\(-5\\).",
          "Average \\(= 150 - \\frac{5}{5} = 149\\).",
        ],
        answer: "149",
      },
      practiceSet: [
        { prompt: "Find the average of 61, 64, 58 and 65.", answer: "62", method: "From 60: \\(+1 + 4 - 2 + 5 = 8\\), and \\(60 + \\frac{8}{4} = 62\\)." },
        { prompt: "Find the average of 205, 198, 210 and 203.", answer: "204", method: "From 200: \\(+5 - 2 + 10 + 3 = 16\\), and \\(200 + 4 = 204\\)." },
        { prompt: "The deviations of five marks from 70 are +4, −3, +6, −2 and 0. What is the average of the marks?", answer: "71" },
        { prompt: "The average of a set of values is 48. What is the sum of their deviations from 48?", answer: "0" },
      ],
      pyqExampleId: "d6a8633c-ca02-4c0b-871d-f666b93b361a",
      traps: [
        {
          title: "Dropping the sign of a deviation",
          body:
            "A value below the assumed average has a negative deviation. Adding every gap as positive pushes the average too high.",
        },
        {
          title: "Adding the deviation total without dividing",
          body:
            "The sum of deviations must be divided by the count before it is added to the assumed average. Adding the whole total overshoots by a factor of the count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavsm-pairs",
      name: "Pair averages: add all the statements",
      intuition:
        "When each statement gives the total of a few people, adding all the statements counts every person the same number of times. Divide by that number and you have the grand total in one step, without solving for anyone first.",
      definition:
        "- Change each average into a sum: 'the average of F and M is 5,000' means \\(F + M = 10000\\).\n" +
        "- If every pair of three people is given, adding the three pair sums counts each person **twice**, so the total of all three is half of that.\n" +
        "- One person \\(=\\) the total of all three minus the pair that leaves that person out.\n" +
        "- For other symmetric statements, count how many times each unknown appears when all the statements are added. With sum \\(S\\), 'the average of two of them plus the third, \\(x\\)' is \\(\\frac{S - x}{2} + x = \\frac{S + x}{2}\\), and adding all three such statements gives \\(\\frac{3S + S}{2} = 2S\\).",
      formula: {
        label: "Total from three pair sums",
        latex: "a + b + c = \\frac{(a + b) + (b + c) + (c + a)}{2}",
      },
      authoredExample: {
        prompt: "The average age of A and B is 20 years, of B and C is 25 years, and of A and C is 27 years. What is B's age?",
        steps: [
          "Pair sums: \\(A + B = 40\\), \\(B + C = 50\\), \\(A + C = 54\\).",
          "Adding: \\(2(A + B + C) = 144\\), so \\(A + B + C = 72\\).",
          "\\(B = 72 - (A + C) = 72 - 54 = 18\\).",
          "Check: \\(A = 72 - 50 = 22\\) and \\(C = 72 - 40 = 32\\); \\(A + B = 40\\).",
        ],
        answer: "18 years",
      },
      selfCheckExample: {
        prompt: "For three numbers p, q and r, \\(p + q = 18\\), \\(q + r = 22\\) and \\(r + p = 26\\). What is the average of p, q and r?",
        steps: [
          "Adding: \\(2(p + q + r) = 66\\), so \\(p + q + r = 33\\).",
          "Average \\(= \\frac{33}{3} = 11\\).",
        ],
        answer: "11",
      },
      practiceSet: [
        { prompt: "If \\(x + y = 14\\), \\(y + z = 20\\) and \\(z + x = 18\\), what is \\(x + y + z\\)?", answer: "26" },
        {
          prompt: "The average weight of A and B is 50 kg, of B and C is 45 kg, and of A and C is 55 kg. What is the average weight of A, B and C?",
          answer: "50 kg",
          method: "Pair sums 100, 90 and 110 add to 300; the total is 150, so the average is 50.",
        },
        {
          prompt: "Three numbers have sum S. One of them is x. In terms of S and x, what do you get when you add x to the average of the other two?",
          answer: "\\(\\frac{S + x}{2}\\)",
        },
        { prompt: "The three pair sums of three numbers add up to 84. What is the sum of the three numbers?", answer: "42" },
      ],
      pyqExampleId: "fd55419c-e2d6-42b6-b4b4-aa5a1babdec7",
      traps: [
        {
          title: "Forgetting to halve the total of the pair sums",
          body:
            "When all three pair sums are added, each person appears in two of them, so the result is twice the total of the three people.",
        },
        {
          title: "Reading an average as a sum",
          body:
            "'The average of F and M is 5,000' means F and M together are 10,000. Using 5,000 as their sum halves every answer that follows.",
        },
      ],
    },
  ],
};
