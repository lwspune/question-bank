import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_IN_COMPOUND_NOTE: SubtopicNote = {
  subtopicName: "Compound Interest",
  title: "Compound Interest",
  oneLineDefinition:
    "Under compound interest each year's interest joins the principal, so the amount is multiplied by the same growth factor every year.",
  whyItMatters:
    "Eighteen questions in the bank, seventeen of them from the 2025 shifts: compound interest was almost absent from the earlier papers. Twelve are EASY. Know the growth factors of 10%, 20% and 12% by heart and most of these become one multiplication or one division.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscinco-amount",
      name: "Compound interest amount and principal",
      intuition:
        "In year 2 the lender charges interest on last year's interest too. So the sum grows by a fixed percent of itself each year, like a price that rises by 10% and then by 10% of the new price.",
      definition:
        "- **Amount:** \\(A = P\\left(1 + \\frac{r}{100}\\right)^n\\) for \\(n\\) years compounded yearly. **Compound interest:** \\(CI = A - P\\).\n" +
        "- **Principal from the amount:** \\(P = A \\div \\left(1 + \\frac{r}{100}\\right)^n\\).\n" +
        "- **Fast route, 2 years:** the total percent is \\(2r + \\frac{r^2}{100}\\). At 10% that is 21%; at 20% it is 44%.\n" +
        "- **Fast route, 3 years:** go year by year. At 10%, 1000 becomes 1100, 1210, 1331.\n" +
        "- Write the factor as a fraction when it is friendly: 10% is \\(\\frac{11}{10}\\), 20% is \\(\\frac{6}{5}\\), 12% is \\(\\frac{28}{25}\\), 4% is \\(\\frac{26}{25}\\).\n" +
        "- Profit or growth that is reinvested every year is compound interest by another name.",
      formula: {
        label: "Compound interest, yearly",
        latex: "A = P\\left(1 + \\frac{r}{100}\\right)^n \\qquad CI = A - P \\qquad \\text{2 years: } \\left(2r + \\frac{r^2}{100}\\right)\\%",
        symbols: [
          { symbol: "r", meaning: "rate percent per year" },
          { symbol: "n", meaning: "number of years, compounded yearly" },
        ],
      },
      authoredExample: {
        prompt: "Find the compound interest on ₹6,000 at 5% per annum for 3 years, compounded annually.",
        steps: [
          "Year by year: \\(6000 \\to 6300 \\to 6615 \\to 6945.75\\).",
          "Check by the formula: \\(6000 \\times 1.05^3 = 6000 \\times 1.157625 = 6945.75\\).",
          "\\(CI = 6945.75 - 6000 = 945.75\\).",
        ],
        answer: "₹945.75",
      },
      selfCheckExample: {
        prompt: "Find the amount on ₹5,000 at 20% per annum compound interest for 2 years.",
        steps: [
          "Two-year percent: \\(2 \\times 20 + \\frac{400}{100} = 44\\%\\).",
          "\\(44\\%\\) of 5000 is 2200, so the amount is \\(7200\\).",
          "Check: \\(5000 \\to 6000 \\to 7200\\).",
        ],
        answer: "₹7,200",
      },
      practiceSet: [
        { prompt: "Find the amount on ₹2,000 at 10% per annum compound interest for 3 years.", answer: "₹2,662" },
        { prompt: "What principal becomes ₹3,630 in 2 years at 10% per annum compound interest?", answer: "₹3,000", method: "\\(3630 \\div 1.21\\)." },
        {
          prompt: "Find the compound interest on ₹10,000 at 12% per annum for 2 years.",
          answer: "₹2,544",
          method: "\\(24 + 1.44 = 25.44\\%\\).",
        },
        { prompt: "A profit of 20% a year is reinvested each year on ₹1,000. What is the total value after 2 years?", answer: "₹1,440" },
      ],
      pyqExampleId: "48251943-8804-45a8-9f24-7cd37c03291b",
      traps: [
        {
          title: "Doubling the first year's interest",
          body:
            "Compound interest for 2 years is more than twice one year's interest, because year 2 also charges interest on year 1's interest. At 10% on ₹5,000 it is ₹1,050, not ₹1,000.",
        },
        {
          title: "Giving the amount when compound interest is asked",
          body:
            "\\(P(1 + r)^n\\) is the amount. The compound interest is the amount minus the principal, and both figures usually sit among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinco-factor",
      name: "Rate or time from the growth factor",
      intuition:
        "Divide the amount by the principal and you get the growth factor raised to the number of years. Recognise the power and you have both the rate and the time.",
      definition:
        "- \\(\\frac{A}{P} = \\left(1 + \\frac{r}{100}\\right)^n\\).\n" +
        "- **Time:** match the ratio to a known power. \\(1.21 = 1.1^2\\), \\(1.331 = 1.1^3\\), \\(1.44 = 1.2^2\\), \\(1.728 = 1.2^3\\), \\(1.2544 = 1.12^2\\), \\(1.1025 = 1.05^2\\).\n" +
        "- **Rate:** take the \\(n\\)th root of the ratio. For 2 years, \\(1 + \\frac{r}{100} = \\sqrt{A/P}\\).\n" +
        "- **Steady growth** of production or population is the same rule: each year's figure is the last one times the same factor. Find the factor from two neighbouring years, then apply it again.",
      formula: {
        label: "Growth factor",
        latex: "\\left(1 + \\frac{r}{100}\\right)^n = \\frac{A}{P}",
      },
      authoredExample: {
        prompt: "In how many years will ₹8,000 become ₹10,648 at 10% per annum compound interest?",
        steps: [
          "\\(\\frac{10648}{8000} = 1.331\\).",
          "\\(1.331 = 1.1^3\\), so the time is 3 years.",
          "Check: \\(8000 \\to 8800 \\to 9680 \\to 10648\\).",
        ],
        answer: "3 years",
      },
      selfCheckExample: {
        prompt: "₹6,250 becomes ₹7,290 in 2 years at compound interest. Find the rate.",
        steps: [
          "\\(\\frac{7290}{6250} = 1.1664\\).",
          "\\(\\sqrt{1.1664} = 1.08\\), so the rate is 8%.",
          "Check: \\(6250 \\to 6750 \\to 7290\\).",
        ],
        answer: "8% per annum",
      },
      practiceSet: [
        { prompt: "A town of 40,000 people grows at 5% a year, compounded. Find its population after 2 years.", answer: "44,100" },
        {
          prompt: "A factory makes 2,500 units one year and 3,000 the next, growing at a constant percent each year. How many units will it make the year after?",
          answer: "3,600",
          method: "The factor is \\(\\frac{3000}{2500} = 1.2\\).",
        },
        { prompt: "₹1,000 becomes ₹1,440 in 2 years at compound interest. Find the rate.", answer: "20% per annum" },
        { prompt: "In how many years will ₹4,000 become ₹5,324 at 10% per annum compound interest?", answer: "3 years" },
      ],
      pyqExampleId: "84146ff2-2e6e-41d4-8e7d-99623fdd2dc1",
      traps: [
        {
          title: "Dividing the total growth by the years",
          body:
            "A 21% rise over 2 years at compound interest is 10% a year, not 10.5%: \\(1.1^2 = 1.21\\). Splitting the total growth evenly is the simple interest method.",
        },
        {
          title: "Reading constant growth as a constant addition",
          body:
            "A constant growth rate means the same **percent** each year, so the increase itself grows. From 2,500 to 3,000 is 20%, and the next year rises by 600, not 500.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinco-yearly",
      name: "Interest year by year and consecutive amounts",
      intuition:
        "Each year's interest is the rate on the amount at the start of that year. So the jump from one year's amount to the next is that rate on the earlier amount.",
      definition:
        "- **Consecutive amounts** \\(A_n\\) and \\(A_{n+1}\\): the rate is \\(\\frac{A_{n+1} - A_n}{A_n} \\times 100\\). Then the principal is \\(A_n\\) divided by the factor \\(n\\) times.\n" +
        "- **Interest for the \\(k\\)th year** alone \\(= \\frac{r}{100} \\times\\) the amount after \\(k - 1\\) years \\(= P\\left(1 + \\frac{r}{100}\\right)^{k-1} \\times \\frac{r}{100}\\).\n" +
        "- The interest for the 3rd year is not the compound interest for 3 years; it is one year's slice.\n" +
        "- Under simple interest, by contrast, the jump is the same every year and is a percent of the principal.",
      formula: {
        label: "Year-by-year compound interest",
        latex: "r = \\frac{A_{n+1} - A_n}{A_n} \\times 100 \\qquad I_k = P\\left(1 + \\frac{r}{100}\\right)^{k-1} \\times \\frac{r}{100}",
        symbols: [
          { symbol: "\\(A_n\\)", meaning: "the amount after \\(n\\) years" },
          { symbol: "\\(I_k\\)", meaning: "the interest earned in year \\(k\\) alone" },
        ],
      },
      authoredExample: {
        prompt: "A sum at compound interest amounts to ₹7,200 after 2 years and ₹8,640 after 3 years. Find the rate and the sum.",
        steps: [
          "Third year's interest \\(= 8640 - 7200 = 1440\\), earned on 7200.",
          "Rate \\(= \\frac{1440}{7200} \\times 100 = 20\\%\\).",
          "Sum \\(= \\frac{7200}{1.2^2} = \\frac{7200}{1.44} = 5000\\).",
        ],
        answer: "20% per annum; ₹5,000",
      },
      selfCheckExample: {
        prompt: "Find the interest earned in the 2nd year alone on ₹15,000 at 8% per annum compound interest.",
        steps: [
          "Amount after 1 year \\(= 15000 \\times 1.08 = 16200\\).",
          "Interest in year 2 \\(= 8\\%\\) of 16200 \\(= 1296\\).",
        ],
        answer: "₹1,296",
      },
      practiceSet: [
        { prompt: "A sum at compound interest is ₹2,000 after 1 year and ₹2,100 after 2 years. Find the rate.", answer: "5% per annum" },
        { prompt: "Find the interest earned in the 3rd year alone on ₹10,000 at 10% per annum compound interest.", answer: "₹1,210" },
        { prompt: "A sum at compound interest is ₹9,000 after 3 years and ₹10,800 after 4 years. Find the rate.", answer: "20% per annum" },
      ],
      pyqExampleId: "8054ea5d-7e4a-4a47-8a2d-0b1891deb63f",
      traps: [
        {
          title: "Using the simple interest method on compound amounts",
          body:
            "Under compound interest the gap between two consecutive amounts is the rate on the **earlier** amount, not on the principal. Stepping back by equal gaps, as for simple interest, gives the wrong principal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinco-vs-si",
      name: "Compound and simple interest on the same sum",
      intuition:
        "For one year the two are equal. After that compound interest pulls ahead, by exactly the interest earned on earlier interest.",
      definition:
        "- For the same \\(P\\), \\(r\\) and \\(n\\) years compounded yearly: \\(CI = SI\\) when \\(n = 1\\), and \\(CI > SI\\) after.\n" +
        "- **Given CI, find SI:** get the principal from the CI factor, \\(P = \\frac{CI}{(1 + r/100)^n - 1}\\), then \\(SI = \\frac{P r n}{100}\\).\n" +
        "- **The gap for 2 years:** \\(CI - SI = P\\left(\\frac{r}{100}\\right)^2\\), the interest on the first year's interest.\n" +
        "- **The gap for 3 years:** \\(CI - SI = P\\left(\\frac{r}{100}\\right)^2\\left(3 + \\frac{r}{100}\\right)\\).",
      formula: {
        label: "Gap between compound and simple interest",
        latex: "CI - SI = P\\left(\\frac{r}{100}\\right)^2 \\ (2 \\text{ years}) \\qquad CI - SI = P\\left(\\frac{r}{100}\\right)^2\\left(3 + \\frac{r}{100}\\right) \\ (3 \\text{ years})",
      },
      authoredExample: {
        prompt: "The compound interest on a sum at 10% per annum for 2 years is ₹1,050. Find the simple interest on it at the same rate for the same time.",
        steps: [
          "The 2-year CI factor is \\(1.21 - 1 = 0.21\\), so \\(P = \\frac{1050}{0.21} = 5000\\).",
          "\\(SI = 5000 \\times 10\\% \\times 2 = 1000\\).",
          "Check with the gap: \\(5000 \\times 0.1^2 = 50 = 1050 - 1000\\).",
        ],
        answer: "₹1,000",
      },
      selfCheckExample: {
        prompt: "Find the difference between the compound and simple interest on ₹8,000 at 5% per annum for 2 years.",
        steps: [
          "\\(CI - SI = 8000 \\times 0.05^2 = 8000 \\times 0.0025 = 20\\).",
          "Check: \\(CI = 8000 \\times 0.1025 = 820\\) and \\(SI = 800\\).",
        ],
        answer: "₹20",
      },
      practiceSet: [
        { prompt: "The compound interest on a sum at 20% per annum for 2 years is ₹880. Find the simple interest on it at the same rate for the same time.", answer: "₹800" },
        { prompt: "The difference between compound and simple interest on a sum for 2 years at 10% per annum is ₹40. Find the sum.", answer: "₹4,000" },
        {
          prompt: "Find the difference between compound and simple interest on ₹1,000 at 10% per annum for 3 years.",
          answer: "₹31",
          method: "CI is 331 and SI is 300.",
        },
      ],
      pyqExampleId: "7f7186ad-44e5-4207-81dd-a29b2bc2236b",
      traps: [
        {
          title: "Expecting a gap in the first year",
          body:
            "Compounded yearly, compound and simple interest are equal for the first year. The gap starts in year 2, which is why the 2-year gap is just the interest on the first year's interest.",
        },
      ],
    },
  ],
};
