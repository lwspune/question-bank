import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_IN_PERIODS_NOTE: SubtopicNote = {
  subtopicName: "Doubling, Part Years and Instalments",
  title: "Doubling, Part Years and Instalments",
  oneLineDefinition:
    "Compound growth repeats a factor every period: a sum that doubles keeps doubling, a part year or a shorter period uses its share of the rate, and equal instalments are matched to the loan by present worth.",
  whyItMatters:
    "Eleven questions in the bank, eight of them MODERATE and ten from the 2025 shifts: the hardest page of the chapter. A sum that doubles and must become 8 times, compound interest for whole years plus some months, interest compounded more often than yearly, and the equal instalment on a loan. Each one is a rule about the period, so learn the rule and the arithmetic is short.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscinpe-doubling",
      name: "A sum that becomes n times itself at compound interest",
      intuition:
        "Under compound interest the sum is multiplied by the same factor every equal stretch of time. If it doubles in 9 years, the next 9 years double the doubled sum, so it is 4 times after 18 years and 8 times after 27.",
      definition:
        "- If \\(\\left(1 + \\frac{r}{100}\\right)^t = n\\), then \\(\\left(1 + \\frac{r}{100}\\right)^{kt} = n^k\\): the multiple is raised to a power as the time is multiplied.\n" +
        "- Doubles in \\(t\\) years: 4 times in \\(2t\\), 8 times in \\(3t\\), 16 times in \\(4t\\).\n" +
        "- **Rate from a multiple:** \\(1 + \\frac{r}{100} = n^{1/t}\\). Becoming 4 times in 2 years means a factor of 2 a year, a rate of 100%.\n" +
        "- Compare simple interest, where the time grows with \\(n - 1\\): doubling in 10 years means 4 times in 30 years at simple interest, but in 20 years at compound interest.",
      formula: {
        label: "Repeated multiples at compound interest",
        latex: "\\left(1 + \\frac{r}{100}\\right)^{t} = n \\quad \\Rightarrow \\quad \\left(1 + \\frac{r}{100}\\right)^{kt} = n^{k}",
        symbols: [
          { symbol: "n", meaning: "the multiple reached in \\(t\\) years" },
          { symbol: "k", meaning: "how many such stretches of \\(t\\) years" },
        ],
      },
      authoredExample: {
        prompt: "A sum becomes 3 times itself in 4 years at compound interest. In how many years will it become 9 times, and 27 times, itself?",
        steps: [
          "Every 4 years the sum is multiplied by 3.",
          "\\(9 = 3^2\\): two stretches, 8 years.",
          "\\(27 = 3^3\\): three stretches, 12 years.",
        ],
        answer: "8 years and 12 years",
      },
      selfCheckExample: {
        prompt: "A sum doubles in 6 years at compound interest. In how many years will it become 16 times itself?",
        steps: [
          "\\(16 = 2^4\\), so it needs four doublings.",
          "\\(4 \\times 6 = 24\\) years.",
        ],
        answer: "24 years",
      },
      practiceSet: [
        { prompt: "A sum becomes 4 times itself in 5 years at compound interest. In how many years will it become 16 times itself?", answer: "10 years" },
        { prompt: "A sum doubles in 3 years at compound interest. How many times itself is it after 9 years?", answer: "8 times" },
        { prompt: "At what rate of compound interest does a sum become 4 times itself in 2 years?", answer: "100% per annum" },
        {
          prompt: "A sum doubles in 5 years at simple interest. In how many years will it become 4 times itself at the same rate?",
          answer: "15 years",
          method: "Simple interest: three copies of interest at 5 years each.",
        },
      ],
      pyqExampleId: "38f128d0-1e8c-4951-94c2-c412cd6e1329",
      traps: [
        {
          title: "Using the simple interest rule under compound interest",
          body:
            "At compound interest a sum that doubles in 7 years becomes 8 times in 21 years, because \\(8 = 2^3\\). The simple interest rule (seven copies of interest, 49 years) does not apply.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinpe-part-year",
      name: "Part years and compounding more often than yearly",
      intuition:
        "The rate is per year. A shorter period gets its share of the rate, and a leftover part of a year, when interest is compounded yearly, earns its share once on the amount reached so far.",
      definition:
        "- **Compounded yearly for \\(n\\) years and \\(m\\) months:** grow for \\(n\\) whole years, then multiply once by \\(1 + \\frac{r m}{1200}\\). 4 months at 9% is 3%.\n" +
        "- **Compounded half-yearly:** rate \\(\\frac{r}{2}\\) per period, \\(2n\\) periods. **Quarterly:** rate \\(\\frac{r}{4}\\), \\(4n\\) periods.\n" +
        "- **Every \\(k\\) months:** rate \\(\\frac{rk}{12}\\%\\) per period, \\(\\frac{12n}{k}\\) periods. Every 4 months for 1 year is 3 periods, each at a third of the yearly rate.\n" +
        "- Halve the rate **and** double the periods together; changing only one of them is the usual slip.",
      formula: {
        label: "Part years and shorter periods",
        latex: "A = P\\left(1 + \\frac{r}{100}\\right)^{n}\\left(1 + \\frac{r m}{1200}\\right) \\qquad \\text{every } k \\text{ months: } \\frac{rk}{12}\\% \\text{ per period, } \\frac{12n}{k} \\text{ periods}",
        symbols: [
          { symbol: "m", meaning: "the months left over after \\(n\\) whole years" },
          { symbol: "k", meaning: "the months in one compounding period" },
        ],
      },
      authoredExample: {
        prompt: "Find the compound interest on ₹5,000 at 8% per annum for 2 years 3 months, compounded annually.",
        steps: [
          "Two whole years: \\(5000 \\times 1.08^2 = 5000 \\times 1.1664 = 5832\\).",
          "3 months is a quarter year, so the rate for it is 2%: \\(5832 \\times 1.02 = 5948.64\\).",
          "\\(CI = 5948.64 - 5000 = 948.64\\).",
        ],
        answer: "₹948.64",
      },
      selfCheckExample: {
        prompt: "Find the compound interest on ₹16,000 at 10% per annum for 1 year, compounded half-yearly.",
        steps: [
          "Half-yearly: 5% per period, 2 periods.",
          "\\(16000 \\times 1.05^2 = 16000 \\times 1.1025 = 17640\\).",
          "\\(CI = 1640\\), which is more than the ₹1,600 of yearly compounding.",
        ],
        answer: "₹1,640",
      },
      practiceSet: [
        { prompt: "Find the amount on ₹10,000 at 20% per annum for 1 year, compounded half-yearly.", answer: "₹12,100" },
        {
          prompt: "Find the amount on ₹8,000 at 12% per annum for 6 months, compounded quarterly.",
          answer: "₹8,487.20",
          method: "3% per quarter, 2 quarters: \\(8000 \\times 1.0609\\).",
        },
        {
          prompt: "Find the amount on ₹2,000 at 10% per annum for 1 year 6 months, compounded annually.",
          answer: "₹2,310",
          method: "\\(2000 \\times 1.1 \\times 1.05\\).",
        },
      ],
      pyqExampleId: "779b7b75-32de-4d8c-a99b-ca3134068774",
      traps: [
        {
          title: "Compounding the part year at the full rate",
          body:
            "For 1 year 6 months compounded annually, the last 6 months earn half the rate on the amount after 1 year. Charging the full rate for them treats the half year as a whole year.",
        },
        {
          title: "Halving the rate but not doubling the periods",
          body:
            "Half-yearly compounding for 2 years at 10% means 5% for 4 periods. Using 5% for 2 periods, or 10% for 4 periods, is wrong both ways.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinpe-instalments",
      name: "Equal annual instalments",
      intuition:
        "An instalment paid in a year's time is worth less than its face value today. The loan is fair when today's worth of all the instalments together equals the loan.",
      definition:
        "- **Compound interest:** the present worth of an instalment \\(x\\) paid after \\(k\\) years is \\(\\frac{x}{(1 + r/100)^k}\\). Add these for every instalment and set the total equal to the loan.\n" +
        "- Take off any cash down payment first: only the rest is financed.\n" +
        "- **Simple interest, a debt due after \\(n\\) years:** an instalment paid at the end of year \\(k\\) earns simple interest for the \\(n - k\\) years left. So the debt \\(= nx + \\frac{xr}{100}\\left(1 + 2 + \\dots + (n - 1)\\right)\\).\n" +
        "- **Check by running the balance:** grow what is owed for a year, subtract the instalment, repeat. The last instalment should clear it exactly.",
      formula: {
        label: "Equal annual instalments",
        latex: "\\text{CI: } P = \\frac{x}{1 + \\frac{r}{100}} + \\frac{x}{\\left(1 + \\frac{r}{100}\\right)^2} + \\dots \\qquad \\text{SI: } A = nx + \\frac{x r}{100} \\cdot \\frac{n(n - 1)}{2}",
        symbols: [
          { symbol: "x", meaning: "each equal instalment" },
          { symbol: "P", meaning: "the loan financed today" },
          { symbol: "A", meaning: "the debt due after \\(n\\) years, under simple interest" },
        ],
      },
      authoredExample: {
        prompt: "A loan of ₹2,100 is repaid in 2 equal annual instalments at 10% per annum compound interest. Find each instalment.",
        steps: [
          "\\(\\frac{x}{1.1} + \\frac{x}{1.21} = \\frac{1.1x + x}{1.21} = \\frac{2.1x}{1.21} = 2100\\).",
          "\\(x = 1000 \\times 1.21 = 1210\\).",
          "Running balance: \\(2100 \\times 1.1 = 2310\\), minus 1210 is 1100; \\(1100 \\times 1.1 = 1210\\), the last instalment.",
        ],
        answer: "₹1,210",
      },
      selfCheckExample: {
        prompt: "What equal annual instalment discharges a debt of ₹3,150 due in 3 years at 5% per annum simple interest?",
        steps: [
          "The first instalment earns 2 years of interest, the second 1, the third none.",
          "\\(3x + \\frac{x \\times 5 \\times (2 + 1)}{100} = 3.15x = 3150\\).",
          "\\(x = 1000\\).",
        ],
        answer: "₹1,000",
      },
      practiceSet: [
        {
          prompt: "A loan of ₹1,640 is repaid in 2 equal annual instalments at 5% per annum compound interest. Find each instalment.",
          answer: "₹882",
          method: "\\(\\frac{2.05x}{1.1025} = 1640\\).",
        },
        { prompt: "A debt of ₹2,100 due in 2 years at 10% per annum simple interest is paid in 2 equal annual instalments. Find each instalment.", answer: "₹1,000" },
        {
          prompt: "An article costs ₹5,000 in cash, or ₹1,000 down and one payment after a year at 10% per annum compound interest. Find that payment.",
          answer: "₹4,400",
        },
      ],
      pyqExampleId: "375721c2-60ab-457e-af3c-6c21883e2104",
      traps: [
        {
          title: "Charging every instalment interest for the full term",
          body:
            "Under simple interest the last instalment is paid on the due date and earns no interest. An instalment paid at the end of year 1 of a 4-year debt earns 3 years of interest, not 4.",
        },
        {
          title: "Forgetting the down payment",
          body:
            "When an article is sold for a cash down payment plus instalments, the instalments repay the cash price minus the down payment, not the whole cash price.",
        },
      ],
    },
  ],
};
