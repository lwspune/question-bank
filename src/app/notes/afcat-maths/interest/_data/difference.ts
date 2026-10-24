import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_DIFFERENCE_NOTE: SubtopicNote = {
  subtopicName: "Difference Between CI and SI",
  title: "The Difference Between Compound and Simple Interest",
  oneLineDefinition:
    "For the same sum, rate and time, compound interest is more than simple interest by the interest earned on interest: P(R/100)² over 2 years and P(R/100)²(3 + R/100) over 3 years.",
  whyItMatters:
    "Three of AFCAT's past-year questions are on this page, from 2016, 2018 and 2019, and about half the page is EASY. For two years the whole question is one line. Marks go on three years, where the gap is not three times the two-year gap, and on rows that give one interest and ask for the other.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-diff-two-years",
      name: "Two years: P(R/100)²",
      intuition:
        "Over two years both kinds of interest give R% of the principal each year. Compound interest also gives R% on the first year's interest during the second year. That extra is \\(P \\times \\tfrac{R}{100} \\times \\tfrac{R}{100}\\).",
      definition:
        "- \\(CI - SI = P\\left(\\dfrac{R}{100}\\right)^2\\) for 2 years compounded annually.\n" +
        "- The sum from the gap: \\(P = \\dfrac{\\text{gap}}{(R/100)^2}\\). At 10% divide by 0.01, at 5% by 0.0025.\n" +
        "- 'SI and CI differ by' and 'CI exceeds SI by' mean the same positive gap.",
      formula: {
        label: "Two-year gap",
        latex: "CI - SI = P\\left(\\dfrac{R}{100}\\right)^2",
      },
      authoredExample: {
        prompt: "Find the difference between the compound and simple interest on ₹12,000 for 2 years at 5% a year.",
        steps: ["\\(\\left(\\tfrac{5}{100}\\right)^2 = 0.0025\\).", "\\(12000 \\times 0.0025 = 30\\)."],
        answer: "₹30.",
      },
      selfCheckExample: {
        prompt: "Compound and simple interest on a sum for 2 years at 10% differ by ₹45. Find the sum.",
        steps: ["\\(P \\times 0.01 = 45\\)."],
        answer: "₹4,500.",
      },
      practiceSet: [
        { prompt: "Find CI minus SI on ₹9,000 for 2 years at 6%.", answer: "₹32.40" },
        { prompt: "CI minus SI on a sum for 2 years at 12% is ₹36. Find the sum.", answer: "₹2,500" },
        { prompt: "A sum doubles at simple interest in 10 years. Find CI minus SI on ₹20,000 for 2 years at the same rate.", answer: "₹200" },
      ],
      pyqExampleId: "4b5f0d88-8f38-4d36-8b75-4a8a2094ccd3",
      traps: [
        {
          title: "Square the rate as a fraction",
          body: "At 5% the factor is \\(0.05^2 = 0.0025\\), not 0.025. Using 0.025 makes the gap ten times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-diff-find-rate",
      name: "The rate from the two-year gap",
      intuition:
        "Turn the same formula round: \\((R/100)^2 = \\text{gap} \\div P\\). In every such question the right side is a perfect square, and its square root is the rate as a fraction.",
      definition:
        "- \\(\\left(\\dfrac{R}{100}\\right)^2 = \\dfrac{\\text{gap}}{P}\\).\n" +
        "- Recognise the square: 0.0025 is \\(0.05^2\\), 0.0049 is \\(0.07^2\\), 0.0081 is \\(0.09^2\\), 0.0225 is \\(0.15^2\\).\n" +
        "- Or work in whole numbers: \\(R^2 = \\dfrac{10000 \\times \\text{gap}}{P}\\).",
      formula: {
        label: "Rate from the gap",
        latex: "R = 100\\sqrt{\\dfrac{CI - SI}{P}}",
      },
      authoredExample: {
        prompt: "On ₹20,000 for 2 years, compound interest is more than simple interest by ₹98. Find the rate.",
        steps: ["\\(\\dfrac{98}{20000} = 0.0049 = 0.07^2\\)."],
        answer: "7% a year.",
      },
      selfCheckExample: {
        prompt: "On ₹5,000 for 2 years, compound interest is more than simple interest by ₹72. Find the rate.",
        steps: ["\\(\\dfrac{72}{5000} = 0.0144 = 0.12^2\\)."],
        answer: "12% a year.",
      },
      practiceSet: [
        { prompt: "On ₹10,000 for 2 years, CI minus SI is ₹81. Find the rate.", answer: "9%" },
        { prompt: "On ₹3,200 for 2 years, CI minus SI is ₹50. Find the rate.", answer: "12.5%" },
        { prompt: "On ₹4,000 for 2 years, CI minus SI is ₹90. Find the rate.", answer: "15%" },
      ],
      pyqExampleId: "1d5b1df4-0fe1-49c5-9331-cb51bf0ffaa6",
      traps: [
        {
          title: "R squared is not R",
          body: "If \\(R^2 = 49\\), the rate is 7%, not 49% and not 4.9%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-diff-three-years",
      name: "Three years",
      intuition:
        "Over three years the interest on interest piles up: the first year's interest earns in years 2 and 3, the second year's interest earns in year 3, and the first year's interest on interest earns once more. Together that is \\(P(R/100)^2(3 + R/100)\\).",
      definition:
        "- \\(CI - SI = P\\left(\\dfrac{R}{100}\\right)^2\\left(3 + \\dfrac{R}{100}\\right)\\).\n" +
        "- At 5% that is \\(0.007625P\\); at 20% it is \\(0.128P\\).\n" +
        "- Or work it out in full: compound interest from \\((1 + R/100)^3 - 1\\), simple interest as \\(3R\\%\\), and subtract.",
      formula: {
        label: "Three-year gap",
        latex: "CI - SI = P\\left(\\dfrac{R}{100}\\right)^2\\left(3 + \\dfrac{R}{100}\\right)",
      },
      authoredExample: {
        prompt: "Find CI minus SI on ₹16,000 for 3 years at 5% a year.",
        steps: ["\\(0.05^2 \\times 3.05 = 0.0025 \\times 3.05 = 0.007625\\).", "\\(16000 \\times 0.007625 = 122\\)."],
        answer: "₹122.",
      },
      selfCheckExample: {
        prompt: "CI minus SI on a sum for 3 years at 20% is ₹256. Find the sum.",
        steps: ["\\(0.2^2 \\times 3.2 = 0.128\\).", "\\(P = \\dfrac{256}{0.128} = 2000\\)."],
        answer: "₹2,000.",
      },
      practiceSet: [
        { prompt: "Find CI minus SI on ₹20,000 for 3 years at 6%.", answer: "₹220.32", method: "\\(0.0036 \\times 3.06 = 0.011016\\)." },
        { prompt: "CI minus SI on a sum for 3 years at 5% is ₹30.50. Find the sum.", answer: "₹4,000" },
        { prompt: "Find CI minus SI on ₹10,000 for 3 years at 4%.", answer: "₹48.64" },
      ],
      pyqExampleId: "d6064648-43e2-4508-aecd-b597e486c200",
      traps: [
        {
          title: "Three years is not three times two",
          body: "At 20% on ₹1,000 the two-year gap is ₹40, but the three-year gap is ₹128. Tripling ₹40 misses the interest earned on interest on interest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-diff-convert",
      name: "From one interest to the other",
      intuition:
        "A question that gives the compound interest and asks for the simple interest (or the other way round) takes two steps: find the sum from the interest you have, then work out the other one.",
      definition:
        "- From compound interest: \\(P = \\dfrac{CI}{(1 + R/100)^n - 1}\\), then \\(SI = \\dfrac{P R n}{100}\\).\n" +
        "- From simple interest: \\(P = \\dfrac{100\\,SI}{R n}\\), then the compound interest or the gap.\n" +
        "- Comparing both as percentages of the sum skips \\(P\\): at 8% for 2 years compound interest is 16.64% of the sum and simple interest 16%, so \\(SI = CI \\times \\tfrac{16}{16.64}\\).\n" +
        "- For 2 years, \\(CI : SI = (2 + R/100) : 2\\).",
      formula: {
        label: "Sum from compound interest",
        latex: "P = \\dfrac{CI}{\\left(1 + \\frac{R}{100}\\right)^n - 1}",
      },
      authoredExample: {
        prompt: "The compound interest on a sum for 2 years at 5% is ₹1,230. Find the simple interest for the same time and rate.",
        steps: ["Compound interest for 2 years at 5% is 10.25% of the sum, so \\(P = \\dfrac{1230}{0.1025} = 12000\\).", "\\(SI = 12000 \\times 0.10 = 1200\\)."],
        answer: "₹1,200.",
      },
      selfCheckExample: {
        prompt: "The simple interest on a sum for 2 years at 15% is ₹1,800. Find the compound interest for the same time and rate.",
        steps: ["\\(P = \\dfrac{1800}{0.30} = 6000\\).", "\\(CI = 6000 \\times (1.15^2 - 1) = 6000 \\times 0.3225 = 1935\\)."],
        answer: "₹1,935.",
      },
      practiceSet: [
        { prompt: "The compound interest on a sum for 2 years at 8% is ₹4,160. Find the simple interest.", answer: "₹4,000" },
        { prompt: "Find the ratio of compound to simple interest on any sum for 2 years at 5%.", answer: "\\(41 : 40\\)" },
        { prompt: "The compound interest on a sum for 3 years at 10% is ₹662. Find the simple interest.", answer: "₹600" },
      ],
      pyqExampleId: "3c85c2ce-33b9-4487-a732-05b7b8b1abc1",
      traps: [
        {
          title: "Divide by the compound share",
          body: "At 5% for 2 years compound interest is 10.25% of the sum, so ₹1,230 of it means a sum of ₹12,000. Dividing by 10% instead treats it as simple interest and overstates the sum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-diff-interest-on-interest",
      name: "Both interests given: interest on interest",
      intuition:
        "For 2 years, half the simple interest is one year's interest. The extra in the compound interest is that one year's interest earning for a year, so extra ÷ one year's interest is the rate.",
      definition:
        "- One year's interest is \\(\\dfrac{SI}{2}\\).\n" +
        "- Rate: \\(\\dfrac{R}{100} = \\dfrac{CI - SI}{SI/2}\\).\n" +
        "- Then the sum is \\(\\dfrac{SI/2}{R/100}\\).",
      formula: {
        label: "Rate from both interests",
        latex: "\\dfrac{R}{100} = \\dfrac{CI - SI}{SI / 2}",
      },
      authoredExample: {
        prompt: "The simple and compound interest on a sum for 2 years are ₹1,000 and ₹1,050. Find the rate and the sum.",
        steps: ["One year's interest is ₹500.", "The extra ₹50 is 10% of ₹500, so the rate is 10%.", "The sum is \\(\\dfrac{500}{0.1} = 5000\\)."],
        answer: "10% a year; ₹5,000.",
      },
      selfCheckExample: {
        prompt: "The simple and compound interest on a sum for 2 years at the same rate are ₹400 and ₹416. Find the rate.",
        steps: ["One year's interest is ₹200.", "\\(\\dfrac{16}{200} = 0.08\\)."],
        answer: "8% a year.",
      },
      practiceSet: [
        { prompt: "The simple and compound interest on a sum for 2 years are ₹600 and ₹618. Find the rate.", answer: "6%" },
        { prompt: "The simple and compound interest on a sum for 2 years are ₹2,400 and ₹2,544. Find the sum.", answer: "₹10,000" },
        { prompt: "The simple and compound interest on a sum for 2 years are ₹500 and ₹525. Find the rate and the sum.", answer: "10%; ₹2,500" },
      ],
      pyqExampleId: "d1f9c693-4b01-476f-831c-cdad0f8b8449",
      traps: [
        {
          title: "Halve the simple interest first",
          body: "With ₹1,000 and ₹1,050 for 2 years, the rate is \\(\\tfrac{50}{500} = 10\\%\\). Dividing by the whole ₹1,000 gives 5%.",
        },
      ],
    },
  ],
};
