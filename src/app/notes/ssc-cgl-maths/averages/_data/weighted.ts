import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AV_WEIGHTED_NOTE: SubtopicNote = {
  subtopicName: "Weighted and Combined Averages",
  title: "Weighted and Combined Averages",
  oneLineDefinition:
    "When groups of different sizes are pooled, the combined average is the total of all groups over the total count, so each group's average counts in proportion to its size.",
  whyItMatters:
    "Twenty-seven questions in the bank, the biggest page in this chapter and all EASY. Eight questions from the 2024 shifts share one shape: 30 students, of whom 12 have one average and the other 18 another. The full method is safe; the fast route and the options often finish it in one line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscavwt-combined",
      name: "Combined average of two groups",
      intuition:
        "Pool the groups: add their totals, add their counts, and divide. The result always lies between the two group averages, and it sits nearer the average of the bigger group, because that group has more members pulling on it.",
      definition:
        "- **Full method:** combined \\(= \\frac{n_1A_1 + n_2A_2}{n_1 + n_2}\\).\n" +
        "- **Fast route:** start at one group's average and move towards the other's by the other group's share of the count: \\(A_1 + \\frac{n_2}{n_1 + n_2}(A_2 - A_1)\\).\n" +
        "- It equals the plain average of \\(A_1\\) and \\(A_2\\) only when the groups are the same size. If both groups have the same average, the combined average is that same value.\n" +
        "- **Option check:** the answer lies between the two averages and nearer the larger group. That often removes two options before any working.",
      formula: {
        label: "Combined average",
        latex: "\\bar{x} = \\frac{n_1A_1 + n_2A_2}{n_1 + n_2} \\qquad \\bar{x} = A_1 + \\frac{n_2}{n_1 + n_2}(A_2 - A_1)",
        symbols: [
          { symbol: "n_1, n_2", meaning: "the sizes of the two groups" },
          { symbol: "A_1, A_2", meaning: "their averages" },
        ],
      },
      authoredExample: {
        prompt: "In a test, 15 boys average 54 marks and 25 girls average 62 marks. What is the average of all 40 students?",
        steps: [
          "Full method: total \\(= 15 \\times 54 + 25 \\times 62 = 810 + 1550 = 2360\\); average \\(= \\frac{2360}{40} = 59\\).",
          "Fast route: the girls are \\(\\frac{25}{40} = \\frac{5}{8}\\) of the class and their average is 8 higher, so \\(54 + \\frac{5}{8} \\times 8 = 59\\).",
        ],
        answer: "59",
      },
      selfCheckExample: {
        prompt: "A shop sells 30 shirts at an average price of ₹500 and 20 shirts at an average price of ₹650. What is the average price of all the shirts?",
        steps: [
          "Total \\(= 15000 + 13000 = 28000\\) for 50 shirts, so the average is ₹560.",
          "Fast route: \\(500 + \\frac{20}{50} \\times 150 = 500 + 60 = 560\\).",
        ],
        answer: "₹560",
      },
      practiceSet: [
        { prompt: "Group A has 10 people averaging 20 years and group B has 10 people averaging 30 years. What is the combined average age?", answer: "25 years" },
        { prompt: "Two sections of 40 and 60 students average 70 and 80 marks. What is the combined average?", answer: "76" },
        { prompt: "Two groups of different sizes both average 45. What is their combined average?", answer: "45" },
        {
          prompt: "A group of 12 averages 50 and a group of 8 averages 60. What is the combined average?",
          answer: "54",
          method: "Nearer 50, since the group of 12 is bigger: \\(50 + \\frac{8}{20} \\times 10 = 54\\).",
        },
      ],
      pyqExampleId: "a6cb870b-9330-4f7a-96ff-1031317343d0",
      traps: [
        {
          title: "Averaging the two averages",
          body:
            "Groups of 3 and 7 averaging 40 and 80 do not average 60 together: weight by size, \\(\\frac{120 + 560}{10} = 68\\). The plain average is right only for equal groups.",
        },
        {
          title: "Choosing an option outside the two averages",
          body:
            "A combined average can never be below the smaller group average or above the larger one. An option outside that range is wrong at sight.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavwt-weights",
      name: "Weights given as percentages or a ratio",
      intuition:
        "A weight is just a group's share of the whole. Percentages and ratios are counts in disguise, so the combined-average rule works unchanged.",
      definition:
        "- **Weights as percentages** that add to \\(100\\%\\): weighted average \\(= w_1x_1 + w_2x_2 + \\cdots\\), with each weight written as a decimal.\n" +
        "- **Weights as a ratio** \\(a : b : c\\): treat \\(a\\), \\(b\\), \\(c\\) as the counts and divide by \\(a + b + c\\).\n" +
        "- A loss or a negative return enters with its minus sign.\n" +
        "- Fast route: take deviations from a convenient value, weight them, and add the result to that value.",
      formula: {
        label: "Weighted average",
        latex: "\\bar{x} = \\frac{w_1x_1 + w_2x_2 + w_3x_3}{w_1 + w_2 + w_3}",
        symbols: [
          { symbol: "w", meaning: "a weight: a count, a ratio term or a percentage" },
          { symbol: "x", meaning: "the value carrying that weight" },
        ],
      },
      authoredExample: {
        prompt: "A final grade counts homework 30%, a project 20% and an exam 50%. A student scores 80 in homework, 90 in the project and 70 in the exam. What is her final grade?",
        steps: [
          "\\(0.3 \\times 80 + 0.2 \\times 90 + 0.5 \\times 70 = 24 + 18 + 35 = 77\\).",
          "Fast route from 80: \\(0.3(0) + 0.2(+10) + 0.5(-10) = -3\\), so \\(80 - 3 = 77\\).",
        ],
        answer: "77",
      },
      selfCheckExample: {
        prompt: "Three kinds of rice costing ₹40, ₹50 and ₹45 per kg are mixed in the ratio 1 : 2 : 2. What is the average cost per kg of the mixture?",
        steps: [
          "\\(\\frac{1 \\times 40 + 2 \\times 50 + 2 \\times 45}{1 + 2 + 2} = \\frac{40 + 100 + 90}{5} = \\frac{230}{5} = 46\\).",
        ],
        answer: "₹46 per kg",
      },
      practiceSet: [
        { prompt: "Weights of 40% and 60% are given to marks of 70 and 80. What is the weighted average?", answer: "76" },
        { prompt: "Two classes in the ratio 3 : 1 average 60 and 80 marks. What is the overall average?", answer: "65" },
        { prompt: "Half of an investment earns a return of 10% and the other half a return of −4%. What is the average return?", answer: "3%" },
        { prompt: "Weights of 25%, 25% and 50% are given to the values 60, 80 and 90. What is the weighted average?", answer: "80" },
      ],
      pyqExampleId: "10467d93-cded-4b0a-bad1-9ed8ee62835a",
      traps: [
        {
          title: "Dropping the sign of a loss",
          body:
            "In a weighted average a 5% loss enters as −5. Adding it as +5 overstates the result by twice its weighted share.",
        },
        {
          title: "Ignoring the weights",
          body:
            "Marks of 75, 80 and 60 with weights 40%, 50% and 10% do not average \\(\\frac{75 + 80 + 60}{3}\\). Each mark counts by its weight, and the light 60 barely moves the result.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavwt-missing",
      name: "Finding a missing group's average",
      intuition:
        "Run the combined average backwards. The total of everyone, minus the known group's total, is the other group's total. Or think of a balance: the known group's gap above the overall average is matched by the other group's gap below it.",
      definition:
        "- **Full method:** missing total \\(= nA - n_1A_1\\); missing average \\(=\\) that total \\(\\div (n - n_1)\\).\n" +
        "- **Fast route (balance):** \\(n_1(A_1 - A) = n_2(A - A_2)\\). The known group's total excess over the average is the other group's total shortfall.\n" +
        "- With three or more groups, take every known group's total away from the grand total, then divide what is left by the members left.",
      formula: {
        label: "Missing group's average",
        latex: "A_2 = \\frac{nA - n_1A_1}{n - n_1} \\qquad n_1(A_1 - A) = n_2(A - A_2)",
        symbols: [
          { symbol: "n, A", meaning: "size and average of everyone" },
          { symbol: "n_1, A_1", meaning: "the known group" },
          { symbol: "n_2, A_2", meaning: "the missing group, with \\(n_2 = n - n_1\\)" },
        ],
      },
      authoredExample: {
        prompt: "The average weight of 40 students is 50 kg. The 15 boys average 56 kg. What is the average weight of the girls?",
        steps: [
          "Full method: total \\(= 2000\\) kg; boys \\(= 840\\) kg; the 25 girls weigh \\(1160\\) kg, an average of \\(46.4\\) kg.",
          "Fast route: the boys are \\(15 \\times 6 = 90\\) kg above the mean in total, so the girls are \\(\\frac{90}{25} = 3.6\\) kg below it each: \\(50 - 3.6 = 46.4\\).",
        ],
        answer: "46.4 kg",
      },
      selfCheckExample: {
        prompt: "The average salary of 50 staff is ₹30,000. The 10 managers average ₹50,000 and the 15 clerks average ₹20,000. What is the average salary of the other staff?",
        steps: [
          "Total \\(= 1500000\\); managers \\(= 500000\\); clerks \\(= 300000\\).",
          "The other 25 earn \\(700000\\), an average of ₹28,000.",
        ],
        answer: "₹28,000",
      },
      practiceSet: [
        { prompt: "The average of 20 numbers is 15. Eight of them average 12. What is the average of the other 12?", answer: "17" },
        { prompt: "A class of 30 averages 60 marks. The top 10 students average 75. What do the other 20 average?", answer: "52.5" },
        { prompt: "A group of 9 averages 40, and 3 of its members average 46. By how much is the average of the other 6 below 40?", answer: "3" },
      ],
      pyqExampleId: "50b20a46-4358-414d-853d-9727cb0e814c",
      traps: [
        {
          title: "Dividing the missing total by the whole count",
          body:
            "The total left after removing the known group belongs only to the remaining members, so divide by the number remaining, not by the size of the whole group.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavwt-alligation",
      name: "Alligation: group sizes from the averages",
      intuition:
        "The combined average is a balance point. Each group's distance from it is in inverse proportion to its size: the bigger group sits closer to the combined average.",
      definition:
        "- **Rule of alligation:** \\(n_1 : n_2 = (A_2 - A) : (A - A_1)\\), where the combined average \\(A\\) lies between \\(A_1\\) and \\(A_2\\).\n" +
        "- Write \\(A_1\\) and \\(A_2\\) on top, \\(A\\) in the middle, and take the differences across: each group gets the **other** group's distance.\n" +
        "- Once the ratio is known, scale it to the count you are given.\n" +
        "- The full method gives the same answer: write the combined-average equation and solve for the unknown count.\n" +
        "- The rule is for **two** groups. With three groups, go back to totals.",
      formula: {
        label: "Rule of alligation",
        latex: "\\frac{n_1}{n_2} = \\frac{A_2 - A}{A - A_1}",
        symbols: [
          { symbol: "A", meaning: "the combined average, between \\(A_1\\) and \\(A_2\\)" },
        ],
      },
      authoredExample: {
        prompt: "Boys in a class average 60 marks and girls average 72 marks. The class average is 65. Find the ratio of boys to girls.",
        steps: [
          "Fast route: boys : girls \\(= (72 - 65) : (65 - 60) = 7 : 5\\).",
          "Full method check: \\(\\frac{7 \\times 60 + 5 \\times 72}{12} = \\frac{420 + 360}{12} = 65\\).",
        ],
        answer: "7 : 5",
      },
      selfCheckExample: {
        prompt: "Tea at ₹200 per kg is mixed with tea at ₹260 per kg to give a mixture worth ₹220 per kg. If 12 kg of the cheaper tea is used, how much of the dearer tea is used?",
        steps: [
          "Cheaper : dearer \\(= (260 - 220) : (220 - 200) = 40 : 20 = 2 : 1\\).",
          "12 kg of the cheaper tea is 2 parts, so 1 part is 6 kg.",
          "Check: \\(\\frac{2400 + 1560}{18} = \\frac{3960}{18} = 220\\).",
        ],
        answer: "6 kg",
      },
      practiceSet: [
        { prompt: "Two groups average 30 and 50, and together they average 40. What is the ratio of their sizes?", answer: "1 : 1" },
        { prompt: "Group P averages 20 and group Q averages 35. Together they average 26. Find P : Q.", answer: "3 : 2" },
        {
          prompt: "Workers earning ₹400 and ₹600 a day average ₹450 a day together. If 6 workers earn ₹600, how many earn ₹400?",
          answer: "18",
          method: "₹400 : ₹600 workers \\(= (600 - 450) : (450 - 400) = 3 : 1\\).",
        },
      ],
      pyqExampleId: "7d34266d-b1d7-4c2b-abe3-fb1349e7861e",
      traps: [
        {
          title: "Giving each group its own distance",
          body:
            "In alligation each group's share is the OTHER group's distance from the combined average. A combined average close to group 1's average means group 1 is the bigger group.",
        },
      ],
    },
  ],
};
