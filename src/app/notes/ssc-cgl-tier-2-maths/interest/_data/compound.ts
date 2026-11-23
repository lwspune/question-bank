import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_IN_COMPOUND_NOTE: SubtopicNote = {
  subtopicName: "Compound Interest",
  title: "Compound Interest",
  oneLineDefinition:
    "Compound interest multiplies the amount by the same factor every period; a shorter period divides the rate and multiplies the count, and equal instalments repay the sum of their values brought back to today.",
  whyItMatters:
    "14 questions in the Tier II bank, 11 EASY and 3 MODERATE. The MODERATE ones are loans repaid in two equal instalments; the rest are one factor raised to a power.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2inci-annual",
      name: "Compound interest year by year",
      visualizationSlug: "ssc-t2-ci-minus-si",
      intuition:
        "Compound interest adds each year's interest to the sum before the next year's is worked out. The amount grows by one fixed factor a year, just like a chain of equal percentage rises.",
      definition:
        "- \\(A = P\\left(1 + \\frac{R}{100}\\right)^n\\) and CI \\(= A - P\\).\n" +
        "- Over two years, CI \\(-\\) SI \\(= P\\left(\\frac{R}{100}\\right)^2\\): the extra is interest on the first year's interest.\n" +
        "- Amounts at two times: their ratio is the factor for the years between, so \\(\\frac{A_6}{A_4} = \\left(1 + \\frac{R}{100}\\right)^2\\).\n" +
        "- A sum that doubles in n years becomes 4 times in 2n and 8 times in 3n.",
      formula: {
        label: "Compound amount",
        latex: "A = P\\left(1 + \\frac{R}{100}\\right)^n, \\quad \\text{CI} - \\text{SI over 2 years} = P\\left(\\frac{R}{100}\\right)^2",
      },
      authoredExample: {
        prompt: "₹24,000 is left for 3 years at 5% a year, compounded yearly. How much interest does it earn?",
        steps: ["\\(A = 24000 \\times 1.05^3 = 24000 \\times 1.157625 = 27783\\).", "CI \\(= 27783 - 24000 = 3783\\)."],
        answer: "₹3,783",
      },
      selfCheckExample: {
        prompt: "Over 2 years at 10% a year, a sum earns ₹60 more as compound interest than as simple interest. What is the sum?",
        steps: ["\\(P \\times 0.1^2 = 60\\).", "\\(P = 6000\\)."],
        answer: "₹6,000",
      },
      practiceSet: [
        { prompt: "Find the amount of ₹10,000 at 20% per annum compounded yearly for 2 years.", answer: "₹14,400" },
        { prompt: "A sum becomes ₹4,840 in 2 years and ₹5,324 in 3 years at compound interest. Find the rate.", answer: "10%" },
        { prompt: "Money left at compound interest triples in 5 years. After how many years is it 27 times the original?", answer: "15 years" },
      ],
      pyqExampleId: "618b0b49-a970-4910-8f4a-37d3c5774b27",
      traps: [
        {
          title: "Working later years on the first sum",
          body: "At 10% compound, ₹1,000 earns ₹100 in the first year and ₹110 in the second, because the second year's interest is on ₹1,100. Using ₹100 every year is simple interest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2inci-periods",
      name: "Half-yearly and other periods",
      intuition:
        "When interest is added more often than once a year, divide the yearly rate by the number of additions a year and multiply the number of years by the same number.",
      definition:
        "- Half-yearly: rate \\(\\frac{R}{2}\\) for \\(2n\\) periods. Quarterly: \\(\\frac{R}{4}\\) for \\(4n\\). Every 8 months: \\(R \\times \\frac{8}{12}\\) a period.\n" +
        "- Adding interest more often always earns a little more than adding it yearly.\n" +
        "- Working back: find the factor (amount \\(\\div\\) sum) and recognise its power: \\(1.1^4 = 1.4641\\), \\(1.05^3 = 1.157625\\), \\(\\left(\\frac{27}{25}\\right)^3 = \\frac{19683}{15625}\\).",
      formula: {
        label: "k additions a year",
        latex: "A = P\\left(1 + \\frac{R}{100k}\\right)^{kn}",
      },
      authoredExample: {
        prompt: "₹20,000 earns 12% a year, with interest added every six months. What is the interest after one year?",
        steps: ["6% a period for 2 periods: \\(20000 \\times 1.06^2 = 20000 \\times 1.1236 = 22472\\).", "CI \\(= 2472\\)."],
        answer: "₹2,472",
      },
      selfCheckExample: {
        prompt: "At 20% per annum compounded half-yearly, how long does ₹40,000 take to become ₹53,240?",
        steps: ["The factor is \\(\\frac{53240}{40000} = 1.331 = 1.1^3\\).", "That is 3 half-years, or \\(1\\frac{1}{2}\\) years."],
        answer: "\\(1\\frac{1}{2}\\) years",
      },
      practiceSet: [
        { prompt: "Find the amount of ₹8,000 at 10% per annum compounded half-yearly for 1 year.", answer: "₹8,820" },
        { prompt: "What is the rate for each period when 16% per annum is compounded quarterly?", answer: "4%" },
        { prompt: "On ₹10,000 for one year at 10% per annum, how much more does half-yearly compounding earn than yearly compounding?", answer: "₹25" },
      ],
      pyqExampleId: "29418c93-ad6a-456a-be73-8331ef6b2e62",
      traps: [
        {
          title: "Keeping the yearly rate with half-yearly periods",
          body: "20% a year compounded half-yearly is 10% for each half-year. Using 20% for every half-year doubles the rate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2inci-instalments",
      name: "Equal instalments",
      intuition:
        "A loan paid back in equal yearly instalments equals the instalments brought back to today: the first divided by one year's factor, the second by two years' factor, and so on.",
      definition:
        "- Loan P repaid by two equal yearly instalments X at rate r (a decimal): \\(P = \\frac{X}{1 + r} + \\frac{X}{(1 + r)^2}\\).\n" +
        "- Total interest paid \\(=\\) (number of instalments \\(\\times X\\)) \\(- P\\).\n" +
        "- Check by following the debt: grow it for a year, take off one instalment, and repeat; it must end at zero.",
      formula: {
        label: "Two equal instalments",
        latex: "P = \\frac{X}{1 + r} + \\frac{X}{(1 + r)^2}",
      },
      authoredExample: {
        prompt: "At 5% per annum compounded yearly, what loan is repaid by two equal yearly instalments of ₹4,410?",
        steps: ["\\(\\frac{4410}{1.05} = 4200\\) and \\(\\frac{4410}{1.1025} = 4000\\).", "Loan \\(= 4200 + 4000 = 8200\\)."],
        answer: "₹8,200",
      },
      selfCheckExample: {
        prompt: "Two equal yearly instalments of ₹1,690 repay a loan at 30% per annum compounded yearly. Find the loan and the total interest.",
        steps: ["\\(\\frac{1690}{1.3} = 1300\\) and \\(\\frac{1690}{1.69} = 1000\\), so the loan is ₹2,300.", "Interest \\(= 2 \\times 1690 - 2300 = 1080\\)."],
        answer: "₹2,300, and ₹1,080 of interest",
      },
      practiceSet: [
        { prompt: "At 10% per annum compounded yearly, what loan do two equal yearly instalments of ₹1,210 repay?", answer: "₹2,100" },
        { prompt: "A loan of ₹2,100 is repaid by two equal yearly instalments of ₹1,210. Find the total interest.", answer: "₹320" },
        { prompt: "At 20% per annum compounded yearly, what is ₹1,440 due in 2 years worth today?", answer: "₹1,000" },
      ],
      pyqExampleId: "bdf57626-b1a5-4ace-87c1-a7011ed53165",
      traps: [
        {
          title: "Splitting the loan into equal halves",
          body: "Each instalment is not half the loan plus interest. The first instalment pays off more of the loan than the second, so bring each one back to today separately.",
        },
      ],
    },
  ],
};
