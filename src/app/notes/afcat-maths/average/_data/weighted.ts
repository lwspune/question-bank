import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_WEIGHTED_NOTE: SubtopicNote = {
  subtopicName: "Weighted Averages",
  title: "Weighted Averages, Rates and Percentages",
  oneLineDefinition:
    "When values count unequally, multiply each by its weight, add, and divide by the total weight: for marks with weightage, percentage shares of a group, average speed, and members a percentage above or below the average.",
  whyItMatters:
    "About a fifth of this page is HARD, and most of those are percentage stories. Marks go when two rates are averaged directly (40 and 60 km/h do not average 50 unless the times are equal) and when '20% above the average' is worked out from the wrong average.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-weights",
      name: "Weights given as numbers or ratios",
      intuition:
        "A weight says how many times a value counts. A mark with weightage 2 counts as if it appeared twice.",
      definition:
        "- Multiply each value by its weight, add, and divide by the **sum of the weights**.\n" +
        "- Weights in a ratio such as \\(2 : 3 : 5\\) can be used as 2, 3 and 5 directly.\n" +
        "- Counts are weights: 40 people rating a product 4 stars puts a weight of 40 on the value 4.\n" +
        "- The answer lies between the smallest and largest value, nearer the heavily weighted ones.",
      formula: {
        label: "Weighted average",
        latex: "\\bar x = \\dfrac{w_1x_1 + w_2x_2 + \\dots}{w_1 + w_2 + \\dots}",
      },
      authoredExample: {
        prompt: "Marks of 70, 80 and 90 carry weights of 1, 2 and 2. Find the weighted average.",
        steps: [
          "Weighted sum: \\(70 \\times 1 + 80 \\times 2 + 90 \\times 2 = 70 + 160 + 180 = 410\\).",
          "Total weight: \\(1 + 2 + 2 = 5\\).",
          "\\(410 \\div 5 = 82\\).",
        ],
        answer: "\\(82\\).",
      },
      selfCheckExample: {
        prompt: "An investor buys 50 shares at ₹40, 30 at ₹48 and 20 at ₹55. Find the average price per share.",
        steps: [
          "Cost: \\(2000 + 1440 + 1100 = ₹4540\\) for 100 shares.",
          "\\(4540 \\div 100 = ₹45.40\\).",
        ],
        answer: "₹45.40.",
      },
      practiceSet: [
        { prompt: "Values 10, 20 and 30 have weights 1, 2 and 5. Find the weighted average.", answer: "\\(25\\)" },
        { prompt: "20 people gave 5 stars, 50 gave 4 stars and 30 gave 2 stars. Find the average rating.", answer: "\\(3.6\\)" },
        { prompt: "Quarterly profits were ₹2, 3, 4 and 5 lakh, weighted \\(1 : 1 : 1 : 2\\). Find the weighted average.", answer: "₹3.8 lakh" },
      ],
      pyqExampleId: "4f91248a-f81e-4ee4-b6f1-db2fae9d181b",
      traps: [
        {
          title: "Divide by the weights, not the count",
          body: "60 and 80 with weights 1 and 3 average \\((60 + 240) \\div 4 = 75\\). Dividing 300 by 2 values gives 150, which is not even between them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-rates",
      name: "Averages of rates: speed, pass rate, return",
      intuition:
        "A rate is one total per unit of another. To average rates, rebuild both totals: total distance over total time, total passes over total items.",
      definition:
        "- **Average speed** = total distance ÷ total time. It equals the plain average of the speeds only when the times are equal.\n" +
        "- Equal distances at speeds \\(u\\) and \\(v\\): average speed \\(\\dfrac{2uv}{u + v}\\).\n" +
        "- A percentage rate (pass rate, efficiency, return) is weighted by its base: 500 items at a 96% pass rate give 480 passes.\n" +
        "- Turn minutes into hours before dividing: 45 minutes is \\(\\tfrac34\\) hour.",
      formula: {
        label: "Average speed",
        latex: "\\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}",
      },
      authoredExample: {
        prompt: "A bus goes 150 km at 50 km/h and then 120 km at 40 km/h. Find its average speed.",
        steps: [
          "Times: \\(150 \\div 50 = 3\\) h and \\(120 \\div 40 = 3\\) h.",
          "Total: 270 km in 6 h.",
          "\\(270 \\div 6 = 45\\) km/h.",
        ],
        answer: "45 km/h.",
      },
      selfCheckExample: {
        prompt: "Batch A has 400 items with a 95% pass rate and batch B has 600 items with a 90% pass rate. Find the overall pass rate.",
        steps: [
          "Passes: \\(380 + 540 = 920\\) out of 1000.",
          "\\(920 \\div 1000 = 92\\%\\).",
        ],
        answer: "92%.",
      },
      practiceSet: [
        { prompt: "A runner covers 4 km in 20 minutes and then 6 km in 40 minutes. Find the average speed in km/h.", answer: "10 km/h" },
        { prompt: "A car covers equal distances at 30 km/h and 45 km/h. Find its average speed.", answer: "36 km/h" },
        { prompt: "A train runs 3 hours at 45 km/h and 1 hour at 65 km/h. Find its average speed.", answer: "50 km/h" },
        { prompt: "₹20,000 earns 10% and ₹30,000 earns 15%. Find the overall rate of return.", answer: "13%" },
      ],
      pyqExampleId: "662ef121-7b38-4059-a6d4-436ea969fac8",
      traps: [
        {
          title: "Speeds do not average directly",
          body: "Going out at 30 km/h and back the same way at 50 km/h averages 37.5 km/h, not 40, because more time is spent at the slower speed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-percent-shares",
      name: "Percentage shares as weights, and the missing share",
      intuition:
        "If 35% of a class are boys, picture 100 students: 35 boys and 65 girls. Percentage shares are simply weights that add up to 100.",
      definition:
        "- Overall average = (share₁ × average₁ + share₂ × average₂ + ...) ÷ 100.\n" +
        "- **Reverse:** overall × 100 − the known parts = the missing share × its average.\n" +
        "- 'The rest' is 100% minus the shares given.\n" +
        "- An average stated relative to another ('Commerce averages 15% less than Science') is worked out first, then weighted.",
      formula: {
        label: "Overall average from percentage shares",
        latex: "\\bar x = \\dfrac{p_1x_1 + p_2x_2 + \\dots}{100}",
      },
      authoredExample: {
        prompt: "In a test, 45% of the students averaged 80 and the rest averaged 62. Find the overall average.",
        steps: [
          "The rest are 55%.",
          "\\(\\dfrac{45 \\times 80 + 55 \\times 62}{100} = \\dfrac{3600 + 3410}{100} = 70.1\\).",
        ],
        answer: "\\(70.1\\).",
      },
      selfCheckExample: {
        prompt: "20% of a company's employees average ₹40,000, 40% average ₹25,000 and the rest average \\(x\\). The overall average is ₹29,500. Find \\(x\\).",
        steps: [
          "The rest are 40%.",
          "\\(0.2 \\times 40{,}000 + 0.4 \\times 25{,}000 + 0.4x = 29{,}500\\), so \\(8000 + 10{,}000 + 0.4x = 29{,}500\\).",
          "\\(0.4x = 11{,}500\\), so \\(x = 28{,}750\\).",
        ],
        answer: "₹28,750.",
      },
      practiceSet: [
        { prompt: "70% of students passed with an average of 64 and 30% failed with an average of 24. Find the class average.", answer: "\\(52\\)" },
        {
          prompt: "40% of a factory's workers are skilled at ₹500 a day; the rest earn 20% less. Find the average daily wage.",
          answer: "₹440",
          method: "The others earn ₹400.",
        },
        { prompt: "A class is 45% girls. The girls average 76 and the whole class 71.6. Find the boys' average.", answer: "\\(68\\)" },
      ],
      pyqExampleId: "16cfd953-c4e1-4cc5-9e98-f986a8a6b2b5",
      traps: [
        {
          title: "Turn the percentage into people",
          body: "'15% of 40 students failed' means 6 students. Use 6 as the count of that group, not 15.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-percent-change",
      name: "Values a percentage above or below the average",
      intuition:
        "'20% above the average' is just a number. Work it out from the average it refers to, then treat it like any value that joins, leaves or replaces.",
      definition:
        "- First find the value: \\(p\\%\\) above \\(A\\) is \\(A(1 + \\tfrac{p}{100})\\); \\(p\\%\\) below is \\(A(1 - \\tfrac{p}{100})\\). Then use totals as on the earlier pages.\n" +
        "- Every value up by \\(p\\%\\): the average goes up by \\(p\\%\\) too.\n" +
        "- 'The average rises by \\(p\\%\\) when one member joins': write the new average as \\((1 + \\tfrac{p}{100})\\) times the old one and solve.\n" +
        "- 'The average fell by 8%' means the new average is \\(0.92\\) times the old one.",
      formula: {
        label: "A value relative to the average",
        latex: "\\text{value} = A\\left(1 \\pm \\dfrac{p}{100}\\right)",
      },
      authoredExample: {
        prompt: "The average mark of 20 students is 70. Five students whose average is 30% below that leave. Find the new average.",
        steps: [
          "The five average \\(70 \\times 0.7 = 49\\), a total of 245.",
          "Old total \\(= 1400\\); the rest total \\(1400 - 245 = 1155\\).",
          "\\(1155 \\div 15 = 77\\).",
        ],
        answer: "\\(77\\).",
      },
      selfCheckExample: {
        prompt: "The average salary of 9 employees rises by 20% when the manager, who earns ₹66,000, joins them. Find the employees' old average.",
        steps: [
          "Let the old average be \\(x\\). Then \\(9x + 66{,}000 = 10 \\times 1.2x = 12x\\).",
          "\\(3x = 66{,}000\\), so \\(x = 22{,}000\\).",
        ],
        answer: "₹22,000.",
      },
      practiceSet: [
        { prompt: "Ten numbers average 40. Each is increased by 15%. Find the new average.", answer: "\\(46\\)" },
        {
          prompt: "The temperature averaged 30°C for 9 days. The 10th day was 20% hotter than that average. Find the 10-day average.",
          answer: "30.6°C",
        },
        {
          prompt: "A group of 16 averages 45 kg. Two people each 40% heavier than that average join. Find the new average.",
          answer: "47 kg",
          method: "Each weighs 63 kg.",
        },
      ],
      pyqExampleId: "7e4dff39-29aa-4be3-9988-0e9f1c90c152",
      traps: [
        {
          title: "Which average?",
          body: "'20% above the group average' uses the average before anyone leaves or joins, unless the question says otherwise. Working it out from the new average gives a different number.",
        },
      ],
    },
  ],
};
