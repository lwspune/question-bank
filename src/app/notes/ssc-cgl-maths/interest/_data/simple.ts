import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_IN_SIMPLE_NOTE: SubtopicNote = {
  subtopicName: "Simple Interest",
  title: "Simple Interest",
  oneLineDefinition:
    "Simple interest is paid on the original sum only, so every year earns the same interest: the rate percent of the principal.",
  whyItMatters:
    "Fifteen questions in the bank, thirteen EASY and two MODERATE, five from each year: find the interest or the amount, count months and days, or work back from the amount to the principal. These are the marks to take in under 30 seconds, so learn the one-line routes.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscinsi-formula",
      name: "Simple interest formula and the amount",
      intuition:
        "The lender charges the same fee every year, worked out on the money first lent. Three years cost three times one year. Nothing is ever charged on the interest itself.",
      definition:
        "- **Principal** \\(P\\): the sum lent or invested. **Rate** \\(R\\): the percent charged each year. **Time** \\(T\\): in years.\n" +
        "- **Simple interest:** \\(SI = \\frac{P \\times R \\times T}{100}\\). **Amount:** \\(A = P + SI\\), the total paid back.\n" +
        "- **Fast route:** multiply the rate by the years first. At 8% for 3 years the interest is 24% of the principal, so you take one percentage, not three.\n" +
        "- Use fractions for friendly rates: 12.5% is \\(\\frac{1}{8}\\), 20% is \\(\\frac{1}{5}\\), 25% is \\(\\frac{1}{4}\\).\n" +
        "- **Earn at one rate, pay at another** (a bank, a fee): the gain is the difference of the two rates on the same sum.",
      formula: {
        label: "Simple interest and amount",
        latex: "SI = \\frac{P \\times R \\times T}{100} \\qquad A = P + SI = P\\left(1 + \\frac{R T}{100}\\right)",
        symbols: [
          { symbol: "P", meaning: "principal, the sum lent" },
          { symbol: "R", meaning: "rate percent per year" },
          { symbol: "T", meaning: "time in years" },
          { symbol: "A", meaning: "amount, principal plus interest" },
        ],
      },
      authoredExample: {
        prompt: "Find the simple interest and the amount on ₹4,500 at 8% per annum for 3 years.",
        steps: [
          "Full method: \\(SI = \\frac{4500 \\times 8 \\times 3}{100} = 1080\\).",
          "Fast route: \\(8\\% \\times 3 = 24\\%\\), and \\(24\\%\\) of 4500 is \\(1080\\).",
          "Amount \\(= 4500 + 1080 = 5580\\).",
        ],
        answer: "Interest ₹1,080, amount ₹5,580",
      },
      selfCheckExample: {
        prompt: "₹5,200 is lent at 6% per annum simple interest for 4 years. What amount is paid back?",
        steps: [
          "Rate times years: \\(6\\% \\times 4 = 24\\%\\).",
          "\\(24\\%\\) of 5200 is \\(1248\\).",
          "Amount \\(= 5200 + 1248 = 6448\\).",
        ],
        answer: "₹6,448",
      },
      practiceSet: [
        { prompt: "Find the simple interest on ₹800 at 5% per annum for 3 years.", answer: "₹120", method: "\\(15\\%\\) of 800." },
        {
          prompt: "Find the simple interest on ₹2,000 at 12.5% per annum for 4 years.",
          answer: "₹1,000",
          method: "\\(12.5\\% \\times 4 = 50\\%\\), half of 2000.",
        },
        { prompt: "Find the amount on ₹1,200 at 10% per annum simple interest for 2 years.", answer: "₹1,440" },
        {
          prompt: "A bank pays 5% a year on deposits and earns 9% a year by lending the same money. How much does it keep in a year on ₹10,00,000?",
          answer: "₹40,000",
          method: "It keeps \\(9\\% - 5\\% = 4\\%\\) of the sum.",
        },
      ],
      pyqExampleId: "198e64fe-e6b6-4be2-a809-c67f36af16d7",
      traps: [
        {
          title: "Giving the amount when the interest is asked",
          body:
            "The options usually print both the interest and the amount. Read the last line of the question again: interest is what is earned, the amount is principal plus interest.",
        },
        {
          title: "Taking a percentage earning on the interest",
          body:
            "A percentage earning or return is always a percent of the sum invested. If ₹50,000 earns a net ₹4,000 after a fee, the earning is \\(\\frac{4000}{50000} = 8\\%\\), a percent of the sum and not of the interest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinsi-months",
      name: "Simple interest for months and days",
      intuition:
        "The rate is per year, so the time must be in years too. Six months is half a year and earns half a year's interest.",
      definition:
        "- **Months:** \\(T = \\frac{\\text{months}}{12}\\). 9 months is \\(\\frac{3}{4}\\) year; 21 months is \\(1\\frac{3}{4}\\) years.\n" +
        "- **Dates on the same day of the month** (10 March to 10 September): count whole months.\n" +
        "- **Days:** \\(T = \\frac{\\text{days}}{365}\\). Do not count the day the money is lent; do count the day it is repaid. February has 29 days in a leap year (2012, 2016, 2020, 2024), and the bank's key then divides by 366.\n" +
        "- **Fast route:** a 12% yearly rate is 1% a month. 18% a year is 1.5% a month.",
      formula: {
        label: "Time in years",
        latex: "T = \\frac{\\text{months}}{12} \\qquad T = \\frac{\\text{days}}{365}",
      },
      authoredExample: {
        prompt: "Find the simple interest on ₹9,000 at 10% per annum for 9 months.",
        steps: [
          "9 months is \\(\\frac{9}{12} = \\frac{3}{4}\\) year.",
          "One year's interest is \\(10\\%\\) of 9000 \\(= 900\\).",
          "Interest \\(= 900 \\times \\frac{3}{4} = 675\\).",
        ],
        answer: "₹675",
      },
      selfCheckExample: {
        prompt: "₹14,600 is borrowed on 1 March 2023 at 5% per annum simple interest and repaid on 12 May 2023. Find the interest.",
        steps: [
          "Days: March 2 to 31 is 30 days, April is 30, May 1 to 12 is 12. Total 72 days.",
          "One year's interest is \\(5\\%\\) of 14600 \\(= 730\\).",
          "Interest \\(= 730 \\times \\frac{72}{365} = 144\\).",
        ],
        answer: "₹144",
      },
      practiceSet: [
        {
          prompt: "Find the simple interest on ₹3,600 at 12% per annum for 5 months.",
          answer: "₹180",
          method: "1% a month: \\(36 \\times 5 = 180\\).",
        },
        {
          prompt: "₹4,000 is lent on 5 February at 9% per annum simple interest and repaid on 5 August of the same year. What amount is repaid?",
          answer: "₹4,180",
          method: "Six months: \\(4000 \\times 0.09 \\times \\frac{1}{2} = 180\\).",
        },
        { prompt: "How many years is 18 months?", answer: "1.5 years" },
        {
          prompt: "Find the simple interest on ₹7,300 at 10% per annum for 73 days.",
          answer: "₹146",
          method: "\\(\\frac{73}{365} = \\frac{1}{5}\\), and \\(730 \\times \\frac{1}{5} = 146\\).",
        },
      ],
      pyqExampleId: "25a2e53f-e3bd-4f6a-8252-806aae035aa9",
      traps: [
        {
          title: "Putting months in place of years",
          body:
            "\\(SI = \\frac{P \\times R \\times 8}{100}\\) for 8 months charges 8 years of interest. Divide the months by 12 first: 8 months is \\(\\frac{2}{3}\\) year.",
        },
        {
          title: "Counting both the first and the last day",
          body:
            "Money lent on 24 January earns from 25 January. Count the days left in the first month without the start date, then the full months, then the days of the last month up to the repayment date.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinsi-worth",
      name: "Principal from the amount (present worth)",
      intuition:
        "If a sum grows to an amount by gaining a fixed share of itself, you get back to the sum by dividing that share out, not by taking a percent off the amount.",
      definition:
        "- The amount is the principal times one growth factor: \\(A = P\\left(1 + \\frac{RT}{100}\\right)\\). So \\(P = \\frac{100A}{100 + RT}\\).\n" +
        "- **Present worth** of a sum due later is the principal that grows to it by that date. It is found the same way.\n" +
        "- **Settling a debt early:** find the debt's present worth today, then let it grow at the same rate to the day you pay. SSC's keys use this method.\n" +
        "- **Fast route:** at 9.5% for 2 years the factor is 1.19, so \\(P = A \\div 1.19\\). Check by growing \\(P\\) back.",
      formula: {
        label: "Principal from amount",
        latex: "P = \\frac{100 \\times A}{100 + R T}",
        symbols: [
          { symbol: "A", meaning: "the amount, or the sum due later" },
          { symbol: "P", meaning: "the principal, or the present worth" },
        ],
      },
      authoredExample: {
        prompt: "What principal amounts to ₹5,900 in 3 years at 6% per annum simple interest?",
        steps: [
          "Rate times years: \\(6 \\times 3 = 18\\), so the amount is \\(118\\%\\) of the principal.",
          "\\(P = \\frac{5900 \\times 100}{118} = 5000\\).",
          "Check: \\(18\\%\\) of 5000 is 900, and \\(5000 + 900 = 5900\\).",
        ],
        answer: "₹5,000",
      },
      selfCheckExample: {
        prompt: "Find the present worth of ₹3,240 due in 4 years at 2% per annum simple interest.",
        steps: [
          "The growth factor is \\(1 + \\frac{2 \\times 4}{100} = 1.08\\).",
          "Present worth \\(= \\frac{3240}{1.08} = 3000\\).",
        ],
        answer: "₹3,000",
      },
      practiceSet: [
        { prompt: "What sum amounts to ₹1,320 in 2 years at 5% per annum simple interest?", answer: "₹1,200" },
        { prompt: "Find the present worth of ₹6,500 due in 3 years at 10% per annum simple interest.", answer: "₹5,000" },
        {
          prompt: "A debt of ₹5,300 is due in 1 year at 6% per annum simple interest. How much settles it after 6 months?",
          answer: "₹5,150",
          method: "Present worth today \\(= \\frac{5300}{1.06} = 5000\\); six months at 3% gives \\(5000 \\times 1.03 = 5150\\).",
        },
        { prompt: "A sum becomes ₹1,560 in 4 years at 7.5% per annum simple interest. Find the sum.", answer: "₹1,200" },
      ],
      pyqExampleId: "43d239fc-1e17-4a5c-bc38-b3fb5e701767",
      traps: [
        {
          title: "Taking the percent off the amount",
          body:
            "At 19% for the period, the principal is the amount divided by 1.19, not 81% of the amount. 81% of ₹11,900 is ₹9,639, but the principal is ₹10,000.",
        },
      ],
    },
  ],
};
