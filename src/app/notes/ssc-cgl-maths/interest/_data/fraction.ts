import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_IN_FRACTION_NOTE: SubtopicNote = {
  subtopicName: "Interest as a Fraction of the Sum",
  title: "Interest as a Fraction of the Sum",
  oneLineDefinition:
    "The interest as a percent of the principal is the rate times the years, so a question that never names the sum can still be solved.",
  whyItMatters:
    "Twenty-one questions in the bank, nineteen of them EASY: the interest is three-fifths of the sum, the sum becomes 8/7 of itself, a sum triples in 16 years, or the interest for new years and rates is wanted. One fact, rate times years, answers all of them in a line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscinfr-fraction",
      name: "Simple interest as a fraction of the principal",
      intuition:
        "Divide the simple interest formula by the principal and the principal disappears. What is left says that rate times years is the interest as a percent of the sum, whatever the sum is.",
      definition:
        "- \\(\\frac{SI}{P} = \\frac{R \\times T}{100}\\). So the interest is \\((R \\times T)\\%\\) of the principal.\n" +
        "- **Interest given as a fraction** \\(\\frac{a}{b}\\) of the sum in \\(T\\) years: \\(R = \\frac{100}{T} \\times \\frac{a}{b}\\).\n" +
        "- **Amount given as a fraction** of the sum: subtract 1 first. Becoming \\(\\frac{7}{4}\\) of itself means the interest is \\(\\frac{3}{4}\\) of it.\n" +
        "- **Interest a fixed number of rupees less than the sum:** if the interest is \\(k\\) times the sum, then \\(P - kP\\) equals that number of rupees.\n" +
        "- **Fast route:** turn the fraction into a percent, then divide by the years. Three-fifths is 60%; over 12 years that is 5% a year.",
      formula: {
        label: "Interest as a share of the principal",
        latex: "\\frac{SI}{P} = \\frac{R \\times T}{100} \\qquad R = \\frac{100}{T} \\times \\frac{SI}{P}",
      },
      authoredExample: {
        prompt: "The simple interest on a sum for 5 years is two-fifths of the sum. Find the rate.",
        steps: [
          "Two-fifths is \\(40\\%\\) of the sum.",
          "\\(40\\%\\) over 5 years is \\(8\\%\\) a year.",
          "Check: \\(8 \\times 5 = 40\\).",
        ],
        answer: "8% per annum",
      },
      selfCheckExample: {
        prompt: "A sum of money becomes \\(\\frac{13}{10}\\) of itself in 4 years at simple interest. Find the rate.",
        steps: [
          "Interest \\(= \\frac{13}{10} - 1 = \\frac{3}{10}\\) of the sum, which is \\(30\\%\\).",
          "\\(30\\%\\) over 4 years is \\(7.5\\%\\) a year.",
        ],
        answer: "7.5% per annum",
      },
      practiceSet: [
        { prompt: "The simple interest on a sum for 8 years is half the sum. Find the rate.", answer: "6.25% per annum" },
        { prompt: "At 4% per annum simple interest, in how many years is the interest three-fifths of the sum?", answer: "15 years" },
        {
          prompt: "The simple interest on a sum at 10% per annum for 3 years is ₹2,100 less than the sum. Find the sum.",
          answer: "₹3,000",
          method: "Interest is \\(0.3P\\), so \\(0.7P = 2100\\).",
        },
        {
          prompt: "The simple interest on a sum for 4 years is 20% of the sum. After how many years will the interest equal the sum?",
          answer: "20 years",
          method: "The rate is 5% a year, and 100% needs 20 years.",
        },
      ],
      pyqExampleId: "f63674b5-42a0-45b2-8c26-866b445b1cfb",
      traps: [
        {
          title: "Reading the amount's fraction as the interest's fraction",
          body:
            "A sum that becomes \\(\\frac{8}{7}\\) of itself has earned \\(\\frac{1}{7}\\) of itself, not \\(\\frac{8}{7}\\). The amount includes the sum; take 1 away before you find the rate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinfr-multiples",
      name: "A sum that becomes n times itself at simple interest",
      intuition:
        "To become n times itself the sum must earn n minus 1 copies of itself. Under simple interest every copy takes the same number of years, so the time grows with n minus 1, not with n.",
      definition:
        "- Becoming \\(n\\) times means \\(SI = (n - 1)P\\), so \\(R \\times T = 100(n - 1)\\).\n" +
        "- Doubling: \\(R \\times T = 100\\). Tripling: \\(R \\times T = 200\\).\n" +
        "- **Same rate, a new multiple:** the times are in the ratio of \\(n - 1\\): \\(T_2 = T_1 \\times \\frac{n_2 - 1}{n_1 - 1}\\).\n" +
        "- **Fast route:** a sum that doubles in 7 years earns one copy in 7 years, so four times (three copies) takes 21 years.",
      formula: {
        label: "Becoming n times at simple interest",
        latex: "R \\times T = 100(n - 1) \\qquad T_2 = T_1 \\times \\frac{n_2 - 1}{n_1 - 1}",
        symbols: [
          { symbol: "n", meaning: "how many times its own value the sum becomes" },
          { symbol: "\\(T_1, T_2\\)", meaning: "the times taken to become \\(n_1\\) and \\(n_2\\) times" },
        ],
      },
      authoredExample: {
        prompt: "A sum doubles in 10 years at simple interest. Find the rate, and the years it takes to become 4 times itself.",
        steps: [
          "Doubling: \\(R \\times 10 = 100\\), so \\(R = 10\\%\\).",
          "Four times means 3 copies of interest: \\(T = 10 \\times \\frac{4 - 1}{2 - 1} = 30\\) years.",
          "Check: \\(10\\% \\times 30 = 300\\%\\), and \\(P + 3P = 4P\\).",
        ],
        answer: "10% per annum; 30 years",
      },
      selfCheckExample: {
        prompt: "A sum becomes 3 times itself in 12 years at simple interest. In how many years will it become 6 times itself at the same rate?",
        steps: [
          "3 times is 2 copies of interest in 12 years, so one copy takes 6 years.",
          "6 times needs 5 copies: \\(5 \\times 6 = 30\\) years.",
        ],
        answer: "30 years",
      },
      practiceSet: [
        { prompt: "At what rate of simple interest does a sum double in 16 years?", answer: "6.25% per annum" },
        { prompt: "In how many years does a sum triple at 10% per annum simple interest?", answer: "20 years" },
        { prompt: "At what rate of simple interest does a sum become 5 times itself in 20 years?", answer: "20% per annum", method: "\\(R \\times 20 = 400\\)." },
        { prompt: "A sum doubles in 6 years at simple interest. In how many years will it become 4 times itself?", answer: "18 years" },
      ],
      pyqExampleId: "203e0d8b-c7ba-4b4f-a263-637ce011a0e4",
      traps: [
        {
          title: "Scaling the time by n instead of n minus 1",
          body:
            "A sum that doubles in 5 years at simple interest does not become 4 times in 10 years. Doubling is one copy of interest; four times is three copies, so it takes 15 years.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinfr-scaling",
      name: "Simple interest scales with principal, rate and time",
      intuition:
        "Double the sum, the rate or the years and the interest doubles. So a known interest under one set of terms gives the interest under any other terms by a ratio.",
      definition:
        "- \\(SI\\) is proportional to each of \\(P\\), \\(R\\) and \\(T\\).\n" +
        "- Same sum and rate: interests are in the ratio of the times. Same sum: interests are in the ratio of rate times time.\n" +
        "- **New terms on a known interest:** \\(SI_2 = SI_1 \\times \\frac{R_2 T_2}{R_1 T_1}\\) for the same sum.\n" +
        "- **Interest on the interest:** if \\(B\\) is the interest on \\(A\\), and \\(C\\) is the interest on \\(B\\) for the same rate and time, then \\(\\frac{B}{A} = \\frac{C}{B}\\), so \\(B^2 = AC\\).\n" +
        "- Comparing two deals on one sum: compare rate times time. 7% for 2 years (14%) earns less than 5% for 3 years (15%).",
      formula: {
        label: "Scaling simple interest",
        latex: "\\frac{SI_2}{SI_1} = \\frac{P_2 R_2 T_2}{P_1 R_1 T_1} \\qquad B^2 = AC",
        symbols: [
          { symbol: "\\(A, B, C\\)", meaning: "a sum, its interest, and the interest on that interest, all at one rate and time" },
        ],
      },
      authoredExample: {
        prompt: "The simple interest on a sum for 3 years at 6% per annum is ₹540. Find the simple interest on the same sum for 5 years at 8% per annum.",
        steps: [
          "Rate times time goes from \\(6 \\times 3 = 18\\) to \\(8 \\times 5 = 40\\).",
          "New interest \\(= 540 \\times \\frac{40}{18} = 1200\\).",
          "Check: the sum is \\(\\frac{540 \\times 100}{18} = 3000\\), and \\(40\\%\\) of 3000 is 1200.",
        ],
        answer: "₹1,200",
      },
      selfCheckExample: {
        prompt: "₹2,500 earns simple interest ₹B in 2 years at 10% per annum. ₹B then earns simple interest ₹C in 2 years at 10% per annum. Find B and C, and check that \\(B^2 = 2500 \\times C\\).",
        steps: [
          "\\(B = 20\\%\\) of 2500 \\(= 500\\).",
          "\\(C = 20\\%\\) of 500 \\(= 100\\).",
          "\\(B^2 = 250000\\) and \\(2500 \\times 100 = 250000\\).",
        ],
        answer: "B = ₹500, C = ₹100",
      },
      practiceSet: [
        { prompt: "Find the ratio of the simple interest on a sum for 4 years to that for 10 years at the same rate.", answer: "2 : 5" },
        { prompt: "The simple interest on a sum at 5% per annum for 2 years is ₹300. Find the simple interest on it at 5% per annum for 6 years.", answer: "₹900" },
        {
          prompt: "Find the difference between the simple interest on ₹1,000 at 6% per annum for 2 years and at 4% per annum for 4 years.",
          answer: "₹40",
          method: "12% against 16%: 4% of 1000.",
        },
      ],
      pyqExampleId: "2f02f6fa-412e-46ee-8646-9e056ab48acf",
      traps: [
        {
          title: "Comparing the rates alone",
          body:
            "The higher rate does not always earn more. On the same sum, 9% for 2 years (18%) earns less than 4% for 5 years (20%): compare rate times time.",
        },
      ],
    },
  ],
};
