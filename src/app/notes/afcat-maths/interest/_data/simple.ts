import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_SIMPLE_NOTE: SubtopicNote = {
  subtopicName: "Simple Interest: Interest and Amount",
  title: "Simple Interest: the Formula, Both Ways",
  oneLineDefinition:
    "Simple interest is the same amount every year, P × R × T ÷ 100; the amount is the principal plus that interest, and the same formula read backwards gives the principal, the rate or the time.",
  whyItMatters:
    "This is the base of the whole chapter, and most of the page is EASY. The marks go on time: months and days have to become years first, and a rate quoted per quarter or per half-year has to become a yearly rate before it goes into the formula.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-si-formula",
      name: "Simple interest and amount",
      intuition:
        "At simple interest only the original sum earns. ₹2,000 at 9% earns ₹180 every year, so 4 years earn ₹720 and the lender gets back ₹2,720.",
      definition:
        "- \\(SI = \\dfrac{P \\times R \\times T}{100}\\), with \\(P\\) the **principal**, \\(R\\) the rate per cent a year and \\(T\\) the time in years.\n" +
        "- The **amount** is \\(A = P + SI\\): what is paid back at the end.\n" +
        "- Months: divide by 12. 9 months is \\(\\tfrac34\\) of a year; 2 years 4 months is \\(2\\tfrac13\\) years.\n" +
        "- Days: divide by 365. Leave out the day the money is lent and count the day it is repaid. From 10 March to 22 May is \\(21 + 30 + 22 = 73\\) days, which is \\(\\tfrac{73}{365} = \\tfrac15\\) of a year.",
      formula: {
        label: "Simple interest",
        latex: "SI = \\dfrac{P \\times R \\times T}{100}, \\quad A = P + SI",
      },
      authoredExample: {
        prompt: "Find the simple interest and the amount on ₹4,500 at 8% a year for 2 years 4 months.",
        steps: [
          "2 years 4 months is \\(2\\tfrac13 = \\tfrac73\\) years.",
          "\\(SI = 4500 \\times \\dfrac{8}{100} \\times \\dfrac73 = 360 \\times \\dfrac73 = 840\\).",
          "The amount is \\(4500 + 840 = 5340\\).",
        ],
        answer: "Interest ₹840; amount ₹5,340.",
      },
      selfCheckExample: {
        prompt: "Find the simple interest on ₹5,000 at 9% a year from 15 June to 27 August.",
        steps: [
          "Days: \\(15 + 31 + 27 = 73\\), which is \\(\\tfrac15\\) of a year.",
          "\\(SI = 5000 \\times \\dfrac{9}{100} \\times \\dfrac15 = 450 \\times \\dfrac15\\).",
        ],
        answer: "₹90.",
      },
      practiceSet: [
        { prompt: "Find the simple interest on ₹3,200 at 5% a year for 3 years.", answer: "₹480" },
        { prompt: "Find the amount on ₹12,000 at 7.5% a year simple interest for 9 months.", answer: "₹12,675", method: "One year's interest is ₹900." },
        { prompt: "Find the simple interest on ₹2,400 at \\(12\\tfrac12\\%\\) a year for 1 year 6 months.", answer: "₹450" },
      ],
      pyqExampleId: "ce6c7033-a823-44ff-9ffd-76643e5f3288",
      traps: [
        {
          title: "Turn months into years",
          body: "At 12% a year, 8 months is \\(\\tfrac{8}{12}\\) of a year, so the interest on ₹5,000 is ₹400. Putting \\(T = 8\\) gives ₹4,800.",
        },
        {
          title: "Interest or amount",
          body: "₹6,000 at 5% for 2 years earns ₹600 and amounts to ₹6,600. Read which one is asked: the options usually carry both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-si-inverse",
      name: "Finding the principal, rate or time",
      intuition:
        "The formula links four quantities. Know any three and the fourth follows: the same formula is simply read backwards.",
      definition:
        "- \\(P = \\dfrac{100 \\times SI}{R \\times T}\\), \\(R = \\dfrac{100 \\times SI}{P \\times T}\\), \\(T = \\dfrac{100 \\times SI}{P \\times R}\\).\n" +
        "- Given the amount and the principal, take the interest out first: \\(SI = A - P\\).\n" +
        "- Given the amount but not the principal: the amount is \\(P\\left(1 + \\tfrac{RT}{100}\\right)\\). At 6% for 5 years that is \\(1.3P\\), so an amount of ₹5,200 means \\(P = 4000\\).\n" +
        "- 'The interest is ₹x less than the principal' is the equation \\(P - SI = x\\). Write the interest as a share of \\(P\\) first.\n" +
        "- A rate that changes over the years: add rate × years for each stretch and treat the total as one percentage of the sum.",
      formula: {
        label: "Finding the rate or time",
        latex: "R = \\dfrac{100 \\times SI}{P \\times T}, \\quad T = \\dfrac{100 \\times SI}{P \\times R}",
      },
      authoredExample: {
        prompt: "₹6,000 amounts to ₹7,440 at simple interest in 4 years. Find the rate.",
        steps: [
          "The interest is \\(7440 - 6000 = 1440\\).",
          "\\(R = \\dfrac{100 \\times 1440}{6000 \\times 4} = \\dfrac{144000}{24000} = 6\\).",
        ],
        answer: "6% a year.",
      },
      selfCheckExample: {
        prompt: "At 6% a year simple interest, the interest on a sum for 5 years is ₹420 less than the sum. Find the sum.",
        steps: [
          "Five years at 6% is 30% of the sum, so the interest is \\(0.3P\\).",
          "\\(P - 0.3P = 0.7P = 420\\), so \\(P = 600\\).",
        ],
        answer: "₹600.",
      },
      practiceSet: [
        { prompt: "In how many years will ₹1,500 earn ₹450 at 6% a year simple interest?", answer: "5 years" },
        { prompt: "Find the principal that earns ₹960 in 4 years at 8% a year simple interest.", answer: "₹3,000" },
        { prompt: "A sum amounts to ₹8,800 in 2 years at 5% a year simple interest. Find the sum.", answer: "₹8,000", method: "The amount is \\(1.1P\\)." },
        {
          prompt: "A sum is lent at 3% for the first 2 years, 5% for the next 3 years and 6% for the year after. The total interest is ₹2,700. Find the sum.",
          answer: "₹10,000",
          method: "\\(6 + 15 + 6 = 27\\%\\) of the sum.",
        },
      ],
      pyqExampleId: "5eec35fb-9cba-4cdd-96d0-ca172a4a17a8",
      traps: [
        {
          title: "Take the interest out of the amount first",
          body: "₹6,000 amounting to ₹7,440 has earned ₹1,440. Dividing the whole ₹7,440 by \\(6000 \\times 4\\) as if it were the interest gives a rate of 31%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-si-period-rates",
      name: "Rates per month, quarter or half-year",
      intuition:
        "Simple interest never earns on itself, so how often it is 'calculated' changes nothing. A rate of 2% a quarter is 8% a year, and 1% a month is 12% a year. Make the rate yearly and the time years, then use the formula.",
      definition:
        "- Yearly rate = rate per quarter × 4 = rate per half-year × 2 = rate per month × 12.\n" +
        "- Or keep both in the same unit: 2% a quarter for 6 quarters is 12% of the sum.\n" +
        "- 'Calculated half-yearly' or 'quarterly' at simple interest gives the same interest as yearly, so the difference between them is zero.\n" +
        "- Asked for a rate per quarter: find the yearly rate first, then divide by 4.",
      formula: {
        label: "Matching the units",
        latex: "SI = \\dfrac{P \\times (\\text{rate per period}) \\times (\\text{number of periods})}{100}",
      },
      authoredExample: {
        prompt: "Find the simple interest on ₹15,000 at 1.25% a month for 8 months.",
        steps: ["\\(1.25 \\times 8 = 10\\), so the interest is 10% of the sum.", "10% of ₹15,000 is ₹1,500."],
        answer: "₹1,500.",
      },
      selfCheckExample: {
        prompt: "₹8,000 amounts to ₹9,200 in 2.5 years at simple interest. What is the rate per half-year?",
        steps: [
          "The interest is ₹1,200, so \\(R = \\dfrac{100 \\times 1200}{8000 \\times 2.5} = 6\\%\\) a year.",
          "Per half-year that is \\(6 \\div 2\\).",
        ],
        answer: "3% a half-year.",
      },
      practiceSet: [
        { prompt: "Write 1.5% a quarter as a yearly rate of simple interest.", answer: "6%" },
        { prompt: "Find the simple interest on ₹9,000 at 3% a half-year for 2 years.", answer: "₹1,080" },
        { prompt: "Find the simple interest on ₹20,000 at 1% a month for 1 year 3 months.", answer: "₹3,000" },
        {
          prompt: "Find the simple interest on ₹12,000 at 8% a year for 2 years, first calculated yearly and then calculated quarterly.",
          answer: "₹1,920 either way",
        },
      ],
      pyqExampleId: "5b46c5ac-0da2-4812-9d03-00c9507227e2",
      traps: [
        {
          title: "A rate per period is not a yearly rate",
          body: "At 3% a quarter the yearly rate is 12%. Using 3% as the yearly rate makes the interest a quarter of what it should be.",
        },
        {
          title: "Compounding words at simple interest",
          body: "'Calculated half-yearly' changes nothing at simple interest. Only compound interest grows faster when it is added more often; that comes later in the chapter.",
        },
      ],
    },
  ],
};
