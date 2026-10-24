import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_IN_TWO_RATES_NOTE: SubtopicNote = {
  subtopicName: "Sums Lent at Two Rates",
  title: "Sums Lent at Two Rates",
  oneLineDefinition:
    "When money is spread over two or more rates, add the interest from each part; a split of one total is fastest by putting it all at the lower rate first.",
  whyItMatters:
    "Twenty-three questions in the bank, fourteen of them from the 2025 shifts and ten MODERATE: one sum split between two rates, several loans at one rate, and parts tied by a ratio or by equal interest. The equation always works, but the lower-rate shortcut and alligation save most of the time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscintr-split",
      name: "One sum split between two rates",
      intuition:
        "If the whole sum sat at the lower rate it would earn a little less than it does. The shortfall is made up by the part at the higher rate, which earns the gap between the rates on every rupee.",
      definition:
        "- **Equation:** with \\(x\\) at the higher rate \\(r_2\\) and \\(P - x\\) at the lower rate \\(r_1\\), one year's interest is \\(\\frac{r_2 x + r_1(P - x)}{100} = I\\).\n" +
        "- **Fast route:** put all of \\(P\\) at \\(r_1\\). The extra interest \\(I - \\frac{r_1 P}{100}\\) comes from the gap \\(r_2 - r_1\\) on the higher part, so higher part \\(= \\frac{100I - r_1 P}{r_2 - r_1}\\).\n" +
        "- **Alligation:** the average rate is \\(\\bar{r} = \\frac{100 I}{P}\\). Lower part : higher part \\(= (r_2 - \\bar{r}) : (\\bar{r} - r_1)\\).\n" +
        "- Interest for several years: divide by the years first to get \\(I\\) for one year.\n" +
        "- **Difference of the two interests given:** write the higher part's interest minus the lower part's and solve the same way.",
      formula: {
        label: "Splitting a sum between two rates",
        latex: "\\text{Higher part} = \\frac{100 I - r_1 P}{r_2 - r_1} \\qquad \\frac{\\text{Lower part}}{\\text{Higher part}} = \\frac{r_2 - \\bar{r}}{\\bar{r} - r_1}",
        symbols: [
          { symbol: "\\(r_1, r_2\\)", meaning: "the lower and higher rates percent" },
          { symbol: "I", meaning: "the total interest for one year" },
          { symbol: "\\(\\bar{r}\\)", meaning: "the average rate on the whole sum, \\(\\frac{100I}{P}\\)" },
        ],
      },
      authoredExample: {
        prompt: "₹12,000 is lent in two parts at 6% and 10% per annum simple interest. The total interest for one year is ₹1,000. How much is lent at 10%?",
        steps: [
          "All at 6% would earn \\(720\\). The extra \\(1000 - 720 = 280\\) comes from the 4% gap.",
          "Higher part \\(= \\frac{280}{0.04} = 7000\\).",
          "Alligation check: average rate \\(= \\frac{1000}{12000} \\times 100 = 8\\frac{1}{3}\\%\\); lower : higher \\(= (10 - 8\\frac{1}{3}) : (8\\frac{1}{3} - 6) = 5 : 7\\), and \\(\\frac{7}{12}\\) of 12000 is 7000.",
        ],
        answer: "₹7,000",
      },
      selfCheckExample: {
        prompt: "₹9,000 is lent in two parts at 5% and 8% per annum simple interest. The total interest after 2 years is ₹1,140. How much is lent at 8%?",
        steps: [
          "One year's interest \\(= \\frac{1140}{2} = 570\\).",
          "All at 5% would earn 450; the extra 120 comes from the 3% gap: \\(\\frac{120}{0.03} = 4000\\).",
          "Check: \\(5\\%\\) of 5000 is 250 and \\(8\\%\\) of 4000 is 320; \\(250 + 320 = 570\\).",
        ],
        answer: "₹4,000",
      },
      practiceSet: [
        {
          prompt: "₹6,000 is lent in two parts at 4% and 6% per annum simple interest, and the yearly interest is ₹300. How much is lent at 6%?",
          answer: "₹3,000",
        },
        {
          prompt: "₹5,000 is split between 3% and 8% per annum simple interest. The year's interest equals 5% of the whole sum. How much is at 8%?",
          answer: "₹2,000",
          method: "Lower : higher \\(= (8 - 5) : (5 - 3) = 3 : 2\\).",
        },
        {
          prompt: "₹20,000 is split between 6% and 9% per annum simple interest. In a year the 9% part earns ₹600 more than the 6% part. How much is at 9%?",
          answer: "₹12,000",
          method: "\\(0.09x - 0.06(20000 - x) = 600\\), so \\(0.15x = 1800\\).",
        },
      ],
      pyqExampleId: "7d7f73b1-47e6-449c-935f-e70cbd1653e1",
      traps: [
        {
          title: "Running alligation on a several-year interest",
          body:
            "The average rate is the interest for **one** year as a percent of the whole sum. If ₹3,000 is earned in 3 years on ₹12,500, the average rate is 8%, not 24%.",
        },
        {
          title: "Reversing the alligation ratio",
          body:
            "The part at the lower rate takes the higher rate minus the average; the part at the higher rate takes the average minus the lower rate. Swapping them gives the other part as the answer, and that is always one of the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscintr-several",
      name: "Several loans at one rate",
      intuition:
        "When every loan runs at the same rate, the rate can be taken out. What is left to add is principal times years for each loan, as if one big loan had run for one year.",
      definition:
        "- Same rate on every loan: total \\(SI = \\frac{R}{100} \\times (P_1 T_1 + P_2 T_2 + \\dots)\\). So \\(R = \\frac{100 \\times SI}{\\sum PT}\\).\n" +
        "- Same time, different rates: one year's total interest is the sum of each part's interest; time \\(=\\) total interest \\(\\div\\) one year's total.\n" +
        "- A loan made later in the year earns only for the months it is out.\n" +
        "- One loan known, one unknown: take the known loan's interest out of the total, then find the other.",
      formula: {
        label: "Several loans at one rate",
        latex: "SI_{\\text{total}} = \\frac{R}{100}\\left(P_1 T_1 + P_2 T_2 + \\dots\\right)",
      },
      authoredExample: {
        prompt: "₹2,000 is lent for 2 years and ₹1,500 for 4 years, both at the same rate of simple interest. The total interest is ₹1,000. Find the rate.",
        steps: [
          "Principal times years: \\(2000 \\times 2 + 1500 \\times 4 = 4000 + 6000 = 10000\\).",
          "\\(\\frac{10000 \\times R}{100} = 100R = 1000\\), so \\(R = 10\\%\\).",
        ],
        answer: "10% per annum",
      },
      selfCheckExample: {
        prompt: "₹6,000 is invested at 5% and ₹4,000 at 7.5% per annum simple interest, both for the same number of years. The total interest is ₹1,800. For how many years were they invested?",
        steps: [
          "One year earns \\(300 + 300 = 600\\).",
          "Time \\(= \\frac{1800}{600} = 3\\) years.",
        ],
        answer: "3 years",
      },
      practiceSet: [
        { prompt: "₹1,000 is lent for 3 years and ₹2,000 for 2 years at 6% per annum simple interest. Find the total interest.", answer: "₹420" },
        {
          prompt: "₹800 is lent at 10% per annum simple interest. Six months later another ₹1,200 is lent at 10%. Find the total interest at the end of the year.",
          answer: "₹140",
          method: "\\(80 + 1200 \\times 0.1 \\times \\frac{1}{2} = 80 + 60\\).",
        },
        {
          prompt: "₹2,000 is lent to A and some money to B, both at 10% per annum simple interest for 3 years. The total interest is ₹1,500. How much was lent to B?",
          answer: "₹3,000",
          method: "A pays 600, so B pays 900 at 30%.",
        },
      ],
      pyqExampleId: "5f624d40-b1a3-479e-9f11-88927d6d8b3a",
      traps: [
        {
          title: "Charging a later loan for the whole year",
          body:
            "Money lent 9 months into the year earns for the last 3 months only. Multiply its rate by \\(\\frac{3}{12}\\), not by 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscintr-linked",
      name: "Parts linked by a ratio or by equal interest",
      intuition:
        "When the parts are tied to each other, there is only one unknown. Name the smallest part, write every other part through it, and one equation finishes the job.",
      definition:
        "- **Parts tied by percents** (scheme C is 180% of A): write each part through one letter, add the interests, solve.\n" +
        "- **Equal interest from every part** at rates \\(r_1, r_2, r_3\\): \\(r_1 a = r_2 b = r_3 c\\), so \\(a : b : c = \\frac{1}{r_1} : \\frac{1}{r_2} : \\frac{1}{r_3}\\).\n" +
        "- Clear the fractions by multiplying by the LCM of the rates, then share the total in that ratio.\n" +
        "- The lowest rate holds the most money.",
      formula: {
        label: "Equal interest from every part",
        latex: "a : b : c = \\frac{1}{r_1} : \\frac{1}{r_2} : \\frac{1}{r_3}",
      },
      authoredExample: {
        prompt: "₹4,200 is invested in three parts at 3%, 5% and 6% per annum simple interest. Each part earns the same interest in a year. Find the three parts.",
        steps: [
          "\\(a : b : c = \\frac{1}{3} : \\frac{1}{5} : \\frac{1}{6}\\). Multiply by 30: \\(10 : 6 : 5\\).",
          "21 shares make 4200, so one share is 200.",
          "Parts: 2000, 1200 and 1000. Check: each earns ₹60.",
        ],
        answer: "₹2,000, ₹1,200 and ₹1,000",
      },
      selfCheckExample: {
        prompt: "The sum in scheme Y is twice the sum in scheme X, and the sum in scheme Z is three times the sum in X. The rates are 5%, 6% and 4% per annum simple interest. The total yearly interest is ₹580. Find the sum in X.",
        steps: [
          "Let X hold \\(x\\). Interest: \\(0.05x + 0.06(2x) + 0.04(3x) = 0.29x\\).",
          "\\(0.29x = 580\\), so \\(x = 2000\\).",
          "Check: \\(100 + 240 + 240 = 580\\).",
        ],
        answer: "₹2,000",
      },
      practiceSet: [
        {
          prompt: "₹2,700 is split into two parts at 4% and 5% per annum simple interest so that both earn the same yearly interest. Find the part at 4%.",
          answer: "₹1,500",
          method: "\\(\\frac{1}{4} : \\frac{1}{5} = 5 : 4\\).",
        },
        {
          prompt: "A person invests ₹x at 10% and ₹3x at 5% per annum simple interest. The total interest in 2 years is ₹500. Find x.",
          answer: "₹1,000",
        },
        { prompt: "Three parts at 2%, 3% and 6% per annum simple interest earn equal interest. In what ratio are the parts?", answer: "3 : 2 : 1" },
      ],
      pyqExampleId: "638edb6c-f08f-403a-8417-8e78e2da17d0",
      traps: [
        {
          title: "Splitting in the ratio of the rates",
          body:
            "Equal interest needs the parts in the inverse ratio of the rates. At 4% and 5%, the parts are 5 : 4, not 4 : 5: the lower rate needs more money to earn the same.",
        },
      ],
    },
  ],
};
