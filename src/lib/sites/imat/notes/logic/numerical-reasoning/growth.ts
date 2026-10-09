import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_NUR_GROWTH_NOTE: SubtopicNote = {
  subtopicName: "Growth, Decay and Estimation",
  title: "Repeated Growth, Half-Life and Checking by Estimate",
  oneLineDefinition:
    "Repeated growth multiplies by the same factor each step, a half-life halves the amount each period, and a rough estimate removes most wrong options before any exact calculation.",
  whyItMatters:
    "The 2023 paper asked a breeding-population count month by month and a ratio after two different half-lives. Estimation and bounds (the fewest, the most, at least) run through many Cambridge items on costs and quantities.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-nur-growth",
      name: "Repeated growth, doubling and half-life",
      intuition:
        "When something grows by the same factor in every time step, the factors multiply: doubling three times is \\(\\times 8\\), not \\(\\times 6\\). A half-life is the same idea run backwards: each half-life multiplies what is left by one half. When the rule is a story (each pair breeds once a month, newborns mature after a month), a small table with one row per step is safer than any formula.",
      definition:
        "- **Growth by a factor** \\(r\\) each step: after \\(n\\) steps, \\(N = N_0 \\times r^n\\). A 10% rise per year is \\(r = 1.1\\).\n" +
        "- **Half-life** \\(T\\): the time for half of the substance to remain. After \\(t\\) the fraction left is \\(\\left(\\tfrac{1}{2}\\right)^{t/T}\\).\n" +
        "- After 1, 2, 3, 4 half-lives: \\(\\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{8}, \\tfrac{1}{16}\\) remains. It never quite reaches zero.\n" +
        "- Two substances with **different** half-lives each follow their own halving; compare them only after working each out.\n" +
        "- **Step rules**: make a table (step, what is there, what is added) and fill it row by row.",
      formula: {
        label: "Growth and decay",
        latex: "N = N_0\\, r^{\\,n} \\qquad N = N_0 \\left(\\tfrac{1}{2}\\right)^{t/T}",
        symbols: [
          { symbol: "\\(N_0\\)", meaning: "starting amount" },
          { symbol: "\\(r, n\\)", meaning: "factor per step, number of steps" },
          { symbol: "\\(T\\)", meaning: "half-life, in the same unit as the time \\(t\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A culture of 500 bacteria doubles every 20 minutes. How many are there after 2 hours? Separately, a medicine has a half-life of 6 hours. How much of a 400 mg dose is left after 24 hours?",
        steps: [
          "Bacteria: 2 hours is \\(120 / 20 = 6\\) doublings, so \\(500 \\times 2^6 = 500 \\times 64 = 32\\,000\\).",
          "Medicine: 24 hours is \\(24 / 6 = 4\\) half-lives, so \\(400 \\times \\left(\\tfrac{1}{2}\\right)^4 = 400 / 16 = 25\\) mg.",
        ],
        answer: "32,000 bacteria; 25 mg",
      },
      selfCheckExample: {
        prompt:
          "The activity of a radioactive sample falls from 3,200 units to 200 units in 20 hours. What is its half-life?",
        options: ["4 h", "5 h", "10 h", "1.25 h", "8 h"],
        steps: [
          "\\(3200 / 200 = 16 = 2^4\\), so 4 half-lives have passed.",
          "Half-life: \\(20 / 4 = 5\\) hours.",
          "Option D divides 20 by 16, the number of times smaller, instead of by the number of halvings. Option C assumes a single halving in half the time.",
        ],
        answer: "(B) 5 h",
      },
      practiceSet: [
        { prompt: "€1,000 grows by 10% a year, with the interest added each year. What is it worth after 2 years?", answer: "€1,210", method: "\\(1000 \\times 1.1^2\\)" },
        { prompt: "A population of 2,000 halves every 5 years. What is it after 15 years?", answer: "250", method: "3 halvings: \\(2000 / 8\\)" },
        { prompt: "Starting from 1, how many doublings are needed to pass 1,000?", answer: "10", method: "\\(2^{10} = 1024\\)" },
      ],
      traps: [
        {
          title: "Repeated percentages compound",
          body: "10% a year for 2 years is a 21% rise, not 20%, because the second 10% is taken on the larger amount. Use the multiplier raised to the number of years.",
        },
        {
          title: "Two half-lives leave a quarter, not nothing",
          body: "After one half-life half remains; after two, a quarter; after three, an eighth. An option saying the substance is gone after two half-lives treats the halving as a straight-line fall.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-estimation",
      name: "Estimation, bounds and checking the options",
      intuition:
        "Five options usually differ by much more than rounding error: often by a power of ten, or by a simple slip. Rounding every number to one significant figure gives an estimate in seconds that rules most of them out. For questions about the fewest or the most, push every quantity to its extreme in the same direction.",
      definition:
        "- **Estimate**: round each number to 1 significant figure, calculate, and pick the option of the right size. Rounding one number up and another down helps the errors cancel.\n" +
        "- **Quick checks**: units; odd or even; last digit; whether the answer must be smaller than one of the given numbers.\n" +
        "- **Bounds**: the most items fit when each item is as small as allowed; the fewest when each is as large as allowed.\n" +
        "- **Round up** when the question asks how many tins, coaches or packs are **needed**: 4.2 tins means 5 tins.",
      authoredExample: {
        prompt:
          "Estimate \\(\\dfrac{4.92 \\times 0.0198 \\times 612}{3.1}\\). Separately, a box holds 3 kg of apples, and each apple weighs between 150 g and 250 g. What are the fewest and the most apples the box can hold?",
        steps: [
          "Round: \\(\\dfrac{5 \\times 0.02 \\times 600}{3} = \\dfrac{60}{3} = 20\\). (The exact value is about 19.2.)",
          "Fewest apples: each as heavy as possible, \\(3000 / 250 = 12\\).",
          "Most apples: each as light as possible, \\(3000 / 150 = 20\\).",
        ],
        answer: "About 20; between 12 and 20 apples",
      },
      selfCheckExample: {
        prompt: "Which of these is closest to \\(\\dfrac{0.48 \\times 6020}{0.0119}\\)?",
        options: ["2,400", "24,000", "240,000", "2,400,000", "24,000,000"],
        steps: [
          "Round: \\(\\dfrac{0.5 \\times 6000}{0.012} = \\dfrac{3000}{0.012} = 250\\,000\\).",
          "The exact value is about 243,000, so 240,000 is closest.",
          "The other options differ by powers of ten, the result of moving a decimal point when dividing by 0.0119.",
        ],
        answer: "(C) 240,000",
      },
      practiceSet: [
        { prompt: "Estimate \\(39.8 \\times 51.2\\).", answer: "About 2,000", method: "\\(40 \\times 50\\); exact 2,037.76" },
        { prompt: "Can three odd numbers add up to 40?", answer: "No", method: "Odd + odd + odd is always odd" },
        { prompt: "A 10 m rope is cut into pieces, each at least 1.2 m long. What is the largest possible number of pieces?", answer: "8", method: "\\(10 / 1.2 = 8.3\\), round down" },
      ],
      traps: [
        {
          title: "\"How many are needed\" rounds up",
          body: "If a wall needs 4.2 litres of paint and paint comes in 1 litre tins, you must buy 5 tins. Rounding to the nearest whole number gives 4, which leaves part of the wall unpainted. \"How many fit\" rounds down instead.",
        },
      ],
    },
  ],
};
