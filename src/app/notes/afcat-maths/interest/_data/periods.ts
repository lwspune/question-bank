import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_PERIODS_NOTE: SubtopicNote = {
  subtopicName: "Compounding Half-Yearly or Quarterly",
  title: "Compounding Half-Yearly, Quarterly or Monthly",
  oneLineDefinition:
    "Compounded k times a year, a rate of R% becomes R ÷ k per period and n years become k × n periods; the effective yearly rate is what one year of that compounding really adds.",
  whyItMatters:
    "Two of AFCAT's past-year questions are here, from 2015 and 2018, both compounded half-yearly. Two changes come before anything else: divide the rate and multiply the number of periods. Forgetting either one is the usual error, and the rest of the page turns a quoted rate into its effective yearly rate and back.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-period-amount",
      name: "Rate per period and number of periods",
      intuition:
        "8% a year compounded half-yearly is 4% every six months. Two years is four half-years, so the factor is \\(1.04^4\\).",
      definition:
        "- Half-yearly: rate \\(\\tfrac R2\\), periods \\(2n\\). Quarterly: rate \\(\\tfrac R4\\), periods \\(4n\\). Monthly: rate \\(\\tfrac{R}{12}\\), periods \\(12n\\).\n" +
        "- 9 months compounded quarterly is 3 quarters; 18 months compounded half-yearly is 3 half-years.\n" +
        "- Time from an amount: recognise the factor, count the periods, then turn periods back into years.\n" +
        "- Present value: divide by the factor, as with annual compounding.",
      formula: {
        label: "Compounded k times a year",
        latex: "A = P\\left(1 + \\dfrac{R}{100k}\\right)^{kn}",
      },
      authoredExample: {
        prompt: "Find the compound interest on ₹20,000 for \\(1\\tfrac12\\) years at 10% a year compounded half-yearly.",
        steps: ["5% a half-year for 3 half-years: \\(1.05^3 = 1.157625\\).", "\\(20000 \\times 1.157625 = 23152.50\\), so the interest is \\(23152.50 - 20000\\)."],
        answer: "₹3,152.50.",
      },
      selfCheckExample: {
        prompt: "Find the amount on ₹40,000 for 6 months at 12% a year compounded quarterly.",
        steps: ["3% a quarter for 2 quarters: \\(1.03^2 = 1.0609\\).", "\\(40000 \\times 1.0609 = 42436\\)."],
        answer: "₹42,436.",
      },
      practiceSet: [
        { prompt: "Write 20% a year compounded quarterly as a rate per quarter.", answer: "5%" },
        { prompt: "In how many years will ₹1,000 become ₹1,102.50 at 10% a year compounded half-yearly?", answer: "1 year", method: "\\(1.1025 = 1.05^2\\), two half-years." },
        { prompt: "Find the amount on ₹5,000 for 1 year at 12% a year compounded quarterly.", answer: "₹5,627.54", method: "\\(1.03^4 = 1.12550881\\)." },
      ],
      pyqExampleId: "6d66870a-8efa-47f7-9112-40e5c9ea5a35",
      traps: [
        {
          title: "Change both the rate and the count",
          body: "For 2 years at 12% compounded half-yearly the factor is \\(1.06^4\\). Halving the rate but keeping 2 periods, or keeping 12% for 4 periods, are both offered as options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-compare-compounding",
      name: "Annual against half-yearly, and CI against SI",
      intuition:
        "More frequent compounding earns a little more, because interest starts earning sooner. The gap between two ways of compounding is the difference of their factors times the sum.",
      definition:
        "- Gap = \\(P \\times (\\text{factor}_1 - \\text{factor}_2)\\). Half-yearly against annual for \\(n\\) years: \\(P\\left[\\left(1 + \\tfrac{R}{200}\\right)^{2n} - \\left(1 + \\tfrac{R}{100}\\right)^n\\right]\\).\n" +
        "- Compound minus simple interest when the compounding is half-yearly: work out each in full. The shortcut \\(P(R/100)^2\\) holds only for annual compounding.\n" +
        "- Two schemes: work out each amount; the better scheme is the larger amount.",
      formula: {
        label: "Gap between two compoundings",
        latex: "\\text{gap} = P \\times (\\text{factor}_1 - \\text{factor}_2)",
      },
      authoredExample: {
        prompt: "₹10,000 is lent for 1 year at 10%. How much more does it earn compounded half-yearly than compounded annually?",
        steps: ["Half-yearly: \\(1.05^2 = 1.1025\\). Annually: 1.1.", "\\(10000 \\times 0.0025 = 25\\)."],
        answer: "₹25.",
      },
      selfCheckExample: {
        prompt: "Find compound minus simple interest on ₹5,000 for 1 year at 8% a year, the compound interest being compounded half-yearly.",
        steps: ["\\(1.04^2 = 1.0816\\) against \\(1.08\\).", "\\(5000 \\times 0.0016 = 8\\)."],
        answer: "₹8.",
      },
      practiceSet: [
        {
          prompt: "A sum earns ₹36 more in 1 year at 12% compounded half-yearly than at 12% compounded annually. Find the sum.",
          answer: "₹10,000",
          method: "\\(1.06^2 - 1.12 = 0.0036\\).",
        },
        {
          prompt: "Which pays more on ₹10,000 for 1 year: 10% compounded annually, or 9.8% compounded half-yearly? By how much?",
          answer: "9.8% half-yearly, by ₹4.01",
        },
        {
          prompt: "Find the gap on ₹40,000 for 1 year at 6% a year between quarterly and annual compounding.",
          answer: "₹54.54",
          method: "\\(1.015^4 = 1.06136355\\).",
        },
      ],
      pyqExampleId: "8d2032c0-8606-407a-88f7-b567efb85df6",
      traps: [
        {
          title: "The two-year shortcut is annual only",
          body: "\\(P(R/100)^2\\) is the gap between compound and simple interest for 2 years compounded annually. With half-yearly compounding, work out both interests in full.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-effective-rate",
      name: "Effective annual rate",
      intuition:
        "A rate compounded several times a year is worth more than it says. 10% compounded half-yearly turns ₹100 into ₹110.25 in a year, so it is worth 10.25% a year.",
      definition:
        "- **Effective annual rate** \\(= \\left(1 + \\dfrac{R}{100k}\\right)^k - 1\\).\n" +
        "- 1% a month compounded monthly is \\(1.01^{12} - 1 \\approx 12.68\\%\\); 3% a quarter is \\(1.03^4 - 1 \\approx 12.55\\%\\).\n" +
        "- The same number is the simple interest rate that gives the same amount in one year.",
      formula: {
        label: "Effective annual rate",
        latex: "E = \\left(1 + \\dfrac{R}{100k}\\right)^k - 1",
      },
      authoredExample: {
        prompt: "Find the effective annual rate of 12% a year compounded half-yearly.",
        steps: ["\\(1.06^2 = 1.1236\\)."],
        answer: "12.36%.",
      },
      selfCheckExample: {
        prompt: "Find the effective annual rate of 6% a year compounded quarterly.",
        steps: ["1.5% a quarter: \\(1.015^4 \\approx 1.0614\\)."],
        answer: "About 6.14%.",
      },
      practiceSet: [
        { prompt: "Find the effective annual rate of 2% a month compounded monthly.", answer: "About 26.82%" },
        { prompt: "Find the effective annual rate of 7% a half-year compounded half-yearly.", answer: "14.49%" },
        { prompt: "Find the effective annual rate of 16% a year compounded half-yearly.", answer: "16.64%" },
      ],
      pyqExampleId: "d0bc4bd4-c3d0-43b1-b040-65be91c79a2d",
      traps: [
        {
          title: "Never below the quoted rate",
          body: "12% compounded monthly is about 12.68% a year. An option below 12% cannot be its effective rate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-equivalent-rate",
      name: "From an effective rate back to a period rate",
      intuition:
        "Going the other way takes a root. A yearly rate of 21% is the same as 10% each half-year compounded, because \\(1.1^2 = 1.21\\).",
      definition:
        "- Rate per period \\(= \\sqrt[k]{1 + \\tfrac{E}{100}} - 1\\); the nominal yearly rate is \\(k\\) times that.\n" +
        "- Dividing by \\(k\\) is wrong: 12% a year compounded annually is about 2.87% a quarter compounded, not 3%.\n" +
        "- Growth over a longer time works the same way: a sum that doubles in 3 years grows by \\(\\sqrt[3]{2}\\) each year.\n" +
        "- Continuous compounding, if it appears, is \\(e^{r}\\) a year, so the rate is \\(\\ln\\left(1 + \\tfrac{E}{100}\\right)\\).",
      formula: {
        label: "Period rate from the effective rate",
        latex: "\\text{rate per period} = \\sqrt[k]{1 + \\dfrac{E}{100}} - 1",
      },
      authoredExample: {
        prompt: "What nominal yearly rate, compounded half-yearly, is the same as 44% a year compounded annually?",
        steps: ["\\(\\sqrt{1.44} = 1.2\\), so 20% a half-year.", "The nominal yearly rate is \\(2 \\times 20\\)."],
        answer: "40% a year.",
      },
      selfCheckExample: {
        prompt: "What monthly rate, compounded monthly, gives an effective 12.68% a year?",
        steps: ["\\(\\sqrt[12]{1.1268} \\approx 1.01\\)."],
        answer: "About 1% a month.",
      },
      practiceSet: [
        { prompt: "What half-yearly rate, compounded, matches an effective 10.25% a year?", answer: "5%" },
        { prompt: "What quarterly rate, compounded, matches an effective 46.41% a year?", answer: "10%", method: "\\(1.1^4 = 1.4641\\)." },
        { prompt: "What half-yearly rate, compounded, gives the same amount in 1 year as 21% simple interest?", answer: "10%" },
      ],
      pyqExampleId: "9f86e046-7a94-4706-b1ac-d20fd8223650",
      traps: [
        {
          title: "Take the root, do not divide",
          body: "21% a year is 10% a half-year compounded, not 10.5%. Halving a compound rate is the simple interest habit.",
        },
      ],
    },
  ],
};
