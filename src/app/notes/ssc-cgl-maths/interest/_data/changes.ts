import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_IN_CHANGES_NOTE: SubtopicNote = {
  subtopicName: "Rate Changes and Part Repayments",
  title: "Rate Changes and Part Repayments",
  oneLineDefinition:
    "When the rate, the time or the principal changes partway, work out the interest stretch by stretch on what is owed in each stretch, and add.",
  whyItMatters:
    "Sixteen questions in the bank, eleven of them MODERATE, the hardest page of simple interest. Seven of them, all from the 2024 shifts, are one pattern with new numbers: part of a loan is repaid after a year and the rest is cleared a year later. The others change the rate or the time and ask for the extra interest or the sum.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscinch-change",
      name: "Extra interest from a change in rate or time",
      intuition:
        "If the rate goes up by 3%, the lender earns 3% more on the same sum every year. You do not need either full interest, only the extra.",
      definition:
        "- **Rate up by** \\(\\Delta R\\) for the same sum and time: extra interest \\(= \\frac{P \\times \\Delta R \\times T}{100}\\).\n" +
        "- **More years** \\(\\Delta T\\) at the same rate: extra interest \\(= \\frac{P \\times R \\times \\Delta T}{100}\\).\n" +
        "- **Rate multiplied by** \\(k\\) for the same sum and time: the interest is multiplied by \\(k\\).\n" +
        "- Rate and time both changed: the new interest is the old one times the ratio of rate times time.\n" +
        "- If only an amount is given, find the old rate first, then apply the change.",
      formula: {
        label: "Extra interest from a change",
        latex: "\\Delta SI = \\frac{P \\times \\Delta R \\times T}{100} \\qquad \\Delta SI = \\frac{P \\times R \\times \\Delta T}{100}",
        symbols: [
          { symbol: "\\(\\Delta R\\)", meaning: "the rise in the rate percent" },
          { symbol: "\\(\\Delta T\\)", meaning: "the extra years" },
        ],
      },
      authoredExample: {
        prompt: "A sum lent for 4 years at simple interest would earn ₹480 more if the rate were 3% higher. Find the sum.",
        steps: [
          "The extra 3% for 4 years is \\(12\\%\\) of the sum.",
          "\\(0.12P = 480\\), so \\(P = 4000\\).",
        ],
        answer: "₹4,000",
      },
      selfCheckExample: {
        prompt: "The simple interest on a sum for 5 years at 6% per annum is ₹1,800 less than the simple interest on it for 8 years at the same rate. Find the sum.",
        steps: [
          "The difference is 3 extra years at 6%, which is \\(18\\%\\) of the sum.",
          "\\(0.18P = 1800\\), so \\(P = 10000\\).",
        ],
        answer: "₹10,000",
      },
      practiceSet: [
        {
          prompt: "A deposit earns ₹240 a year at 6% per annum simple interest. How much more will it earn in a year at 7%?",
          answer: "₹40",
          method: "The deposit is 4000; 1% of it is 40.",
        },
        { prompt: "How much more simple interest does ₹5,000 earn in 3 years at 9% per annum than at 7% per annum?", answer: "₹300" },
        {
          prompt: "A sum earns simple interest I at r% per annum in 2 years. What does it earn at 3r% per annum in 4 years, as a multiple of I?",
          answer: "6I",
          method: "Rate times time goes from \\(2r\\) to \\(12r\\).",
        },
      ],
      pyqExampleId: "4974adf6-1175-44bf-a044-fb8d8a26c067",
      traps: [
        {
          title: "Applying a rate rise for one year only",
          body:
            "A rate 2% higher on a 5-year loan earns 2% more in each of the 5 years: 10% of the sum in all, not 2%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinch-periods",
      name: "Different rates in different years",
      intuition:
        "Each stretch of years adds its own rate times its own years to the total percent. Add the stretches, and the whole loan becomes one percent of the principal.",
      definition:
        "- Total percent over the loan \\(= R_1 T_1 + R_2 T_2 + \\dots\\). The interest is that percent of the principal.\n" +
        "- **Rate rising by a fixed step each year:** add the yearly rates. 6%, 7% and 8% over 3 years make 21%.\n" +
        "- \"For the period beyond 6 years\" in a 9-year loan means the last 3 years.\n" +
        "- Given the total interest, the principal is the interest divided by the total percent.",
      formula: {
        label: "Rates that change over the years",
        latex: "SI = \\frac{P}{100}\\left(R_1 T_1 + R_2 T_2 + R_3 T_3\\right)",
      },
      authoredExample: {
        prompt: "A loan is charged simple interest at 4% per annum for 2 years, 6% for the next 3 years and 8% for the year after that. The total interest is ₹1,360. Find the loan.",
        steps: [
          "Total percent \\(= 4 \\times 2 + 6 \\times 3 + 8 \\times 1 = 8 + 18 + 8 = 34\\%\\).",
          "\\(0.34P = 1360\\), so \\(P = 4000\\).",
        ],
        answer: "₹4,000",
      },
      selfCheckExample: {
        prompt: "A loan is charged 4% simple interest in its first year, and the rate rises by 1% every year after that. The total interest over 3 years is ₹1,350. Find the loan.",
        steps: [
          "Rates: 4%, 5% and 6%; total \\(15\\%\\).",
          "\\(0.15P = 1350\\), so \\(P = 9000\\).",
        ],
        answer: "₹9,000",
      },
      practiceSet: [
        { prompt: "₹5,000 is lent at 5% per annum simple interest for 2 years and then at 8% for 3 more years. Find the total interest.", answer: "₹1,700" },
        { prompt: "₹2,000 is lent at 6% per annum simple interest for 1 year and then at 9% for 2 more years. Find the amount at the end.", answer: "₹2,480" },
        { prompt: "₹10,000 is lent at 3% per annum simple interest for the first 2 years and 5% after that. Find the total interest over 5 years.", answer: "₹2,100" },
      ],
      pyqExampleId: "6338f2df-3a0b-4868-85b2-aaca04c19f04",
      traps: [
        {
          title: "Averaging the rates without the years",
          body:
            "Rates of 4% for 1 year and 10% for 3 years do not average to 7%. The total percent is \\(4 + 30 = 34\\%\\) over 4 years, an average of 8.5%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinch-repay",
      name: "Part repayments and interest added to the principal",
      intuition:
        "Simple interest is charged on what is owed. Pay back part of the principal and next year's interest shrinks; leave the first year's interest unpaid and, under simple interest, it waits without earning anything.",
      definition:
        "- **Year 1:** interest on the full principal \\(P\\). Repaying \\(x\\) of the principal leaves \\(P - x\\).\n" +
        "- **Year 2:** interest on \\(P - x\\). The year 1 interest is still owed but earns nothing.\n" +
        "- **Final payment** \\(=\\) the principal left \\(+\\) both years' interest.\n" +
        "- **Fast route:** both interests together are \\(R\\%\\) of \\(P + (P - x)\\), one multiplication.\n" +
        "- **Interest added to the principal** at the end of a period: the amount becomes the new principal, and simple interest starts again on it.",
      formula: {
        label: "Final payment after a part repayment",
        latex: "\\text{Final payment} = (P - x) + \\frac{R}{100}\\left(P + (P - x)\\right)",
        symbols: [
          { symbol: "P", meaning: "the sum borrowed" },
          { symbol: "x", meaning: "the principal repaid at the end of year 1" },
        ],
      },
      authoredExample: {
        prompt: "₹50,000 is borrowed at 12% per annum simple interest. At the end of the first year ₹10,000 of the principal is repaid. Everything left is cleared at the end of the second year. How much is paid then?",
        steps: [
          "Year 1 interest \\(= 12\\%\\) of 50000 \\(= 6000\\). Principal left \\(= 40000\\).",
          "Year 2 interest \\(= 12\\%\\) of 40000 \\(= 4800\\).",
          "Final payment \\(= 40000 + 6000 + 4800 = 50800\\). Fast route: \\(12\\%\\) of \\(90000 = 10800\\), plus 40000.",
        ],
        answer: "₹50,800",
      },
      selfCheckExample: {
        prompt: "₹8,000 is lent at 10% per annum simple interest for 2 years. It is not repaid, so the lender adds the interest to the principal and lends the total for 2 more years at the same rate. How much is owed at the end of 4 years?",
        steps: [
          "First 2 years: interest \\(= 20\\%\\) of 8000 \\(= 1600\\); new principal \\(= 9600\\).",
          "Next 2 years: interest \\(= 20\\%\\) of 9600 \\(= 1920\\).",
          "Owed \\(= 9600 + 1920 = 11520\\).",
        ],
        answer: "₹11,520",
      },
      practiceSet: [
        {
          prompt: "₹20,000 is borrowed at 10% per annum simple interest. ₹5,000 of the principal is repaid at the end of year 1, and the rest is cleared at the end of year 2. Find the final payment.",
          answer: "₹18,500",
          method: "\\(15000 + 10\\%\\) of 35000.",
        },
        {
          prompt: "₹6,000 is borrowed at 15% per annum simple interest, and ₹1,000 of the principal is repaid after one year. Find the interest for the second year.",
          answer: "₹750",
        },
        {
          prompt: "₹5,000 is lent at 10% per annum simple interest for one year. The interest is added to the principal, and the total is lent for one more year at the same rate. Find the amount at the end.",
          answer: "₹6,050",
        },
      ],
      pyqExampleId: "9d9732cd-296c-4905-8b99-ebd0a8574dd7",
      traps: [
        {
          title: "Charging the second year on the original sum",
          body:
            "After a part of the principal is repaid, the second year's interest is on what is still owed. Charging it on the full sum overstates the payment by the rate times the amount repaid.",
        },
        {
          title: "Leaving out the unpaid first-year interest",
          body:
            "If the first year's interest was not paid when it fell due, it is still owed at the end. The final payment is the principal left plus both years' interest.",
        },
      ],
    },
  ],
};
