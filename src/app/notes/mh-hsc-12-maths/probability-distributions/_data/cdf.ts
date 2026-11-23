import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PD_CDF_NOTE: SubtopicNote = {
  subtopicName: "Cumulative Distribution Function",
  title: "The Cumulative Distribution Function",
  oneLineDefinition:
    "The cumulative distribution function F(x) = P(X ≤ x) adds up the probability up to x: a sum of the p.m.f. for a discrete random variable and an integral of the p.d.f. for a continuous one.",
  whyItMatters:
    "19 questions, five of them from board papers: the c.d.f. of a continuous random variable with its values or the probabilities read from it (2015, 2016, 2017, and in 2026 for the p.d.f. x/8 on 0 < x < 4), and F(2) for a discrete table with k (2026). The textbook rows are the c.d.f. examples of 7.3.2 and 7.4, Exercise 7.2 Q.8 and Q.9 and Miscellaneous Exercise 7.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmpd-step",
      name: "c.d.f. of a discrete random variable",
      intuition:
        "F(x) is a running total of the p.m.f.: start at the smallest value of X and keep adding probabilities as you move right. A running total of non-negative numbers never goes down, and once every value is included it has reached 1.",
      definition:
        "- \\(F(x) = P[X \\leq x] = \\sum_{x_i \\leq x} P[X = x_i]\\), where the sum is over the values of \\(X\\) up to and including \\(x\\).\n" +
        "- \\(F\\) is a non-decreasing step function, and it equals 1 from the largest value of \\(X\\) onwards.\n" +
        "- Table: add a row \\(F(x)\\) under the row of \\(P[X = x]\\); each entry is the one before it plus the next probability.\n" +
        "- From a c.d.f. table you get the p.m.f. back: \\(P[X = x_i] = F(x_i) - F(x_{i-1})\\).",
      formula: {
        label: "Discrete c.d.f.",
        latex: "F(x) = P[X \\leq x] = \\sum_{x_i \\leq x} P[X = x_i]",
      },
      authoredExample: {
        prompt:
          "\\(X\\) takes the values 1, 2, 3, 4 with probabilities 0.1, 0.3, 0.4, 0.2. Write the c.d.f. of \\(X\\) as a table and find \\(F(3)\\) and \\(P(X > 1)\\).",
        steps: [
          "\\(F(1) = 0.1\\).",
          "\\(F(2) = 0.1 + 0.3 = 0.4\\).",
          "\\(F(3) = 0.4 + 0.4 = 0.8\\).",
          "\\(F(4) = 0.8 + 0.2 = 1\\), as the last entry must be.",
          "\\(P(X > 1) = 1 - P(X \\leq 1) = 1 - F(1) = 1 - 0.1 = 0.9\\).",
        ],
        answer: "\\(F\\): 0.1, 0.4, 0.8, 1 for \\(x = 1, 2, 3, 4\\); \\(F(3) = 0.8\\) and \\(P(X > 1) = 0.9\\)",
      },
      selfCheckExample: {
        prompt: "For \\(X = 0, 1, 2\\) the c.d.f. is \\(F(0) = 0.2\\), \\(F(1) = 0.5\\), \\(F(2) = 1\\). Find \\(P[X = 1]\\).",
        steps: ["\\(P[X = 1] = F(1) - F(0) = 0.5 - 0.2\\)."],
        answer: "0.3",
      },
      practiceSet: [
        { prompt: "What is the value of the c.d.f. at the largest value of a discrete \\(X\\)?", answer: "1" },
        { prompt: "For a discrete \\(X\\), \\(F(3) = 0.7\\). Find \\(P(X > 3)\\).", answer: "\\(1 - 0.7 = 0.3\\)" },
      ],
      pyqExampleId: "d5980fd9-958a-4f5f-8ef8-024cd18a1826",
      traps: [
        {
          title: "Writing F(x) as P(X = x)",
          body: "\\(F(x)\\) is cumulative: it is the probability of \\(X\\) being at most \\(x\\), so it includes every smaller value as well.",
        },
        {
          title: "A c.d.f. that goes down",
          body: "Each entry of the \\(F\\) row adds a non-negative probability, so the row can never decrease and must end at 1. A fall in your table means an arithmetic slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmpd-integral-cdf",
      name: "c.d.f. of a continuous random variable",
      intuition:
        "For a continuous variable the running total becomes an area: F(x) is the area under the p.d.f. from the start of the support up to x. Before the support no area has built up, so F is 0; after it all the area is in, so F is 1. A full answer gives all three pieces.",
      definition:
        "- \\(F(x) = \\int_a^x f(t)\\,dt\\) for \\(a < x < b\\), where \\((a, b)\\) is the support.\n" +
        "- \\(F(x) = 0\\) for \\(x \\leq a\\) and \\(F(x) = 1\\) for \\(x \\geq b\\).\n" +
        "- Use \\(t\\) as the variable inside the integral, so that \\(x\\) can be the upper limit.\n" +
        "- For a continuous variable, \\(F\\) is non-decreasing and continuous, so the middle piece must give 0 at \\(x = a\\) and 1 at \\(x = b\\).\n" +
        "- If \\(f\\) is given in two pieces, the c.d.f. on the second piece starts from the whole area of the first piece.",
      formula: {
        label: "Continuous c.d.f.",
        latex: "F(x) = \\begin{cases} 0, & x \\leq a \\\\ \\int_a^x f(t)\\,dt, & a < x < b \\\\ 1, & x \\geq b \\end{cases}",
      },
      authoredExample: {
        prompt:
          "\\(X\\) has p.d.f. \\(f(x) = \\dfrac{3x^2}{8}\\) for \\(0 < x < 2\\) and \\(= 0\\) otherwise. Find the c.d.f. of \\(X\\) and its value at \\(x = 1\\) and \\(x = 3\\).",
        steps: [
          "For \\(x \\leq 0\\): \\(F(x) = 0\\).",
          "For \\(0 < x < 2\\): \\(F(x) = \\int_0^x \\dfrac{3t^2}{8}\\,dt = \\left[\\dfrac{t^3}{8}\\right]_0^x = \\dfrac{x^3}{8}\\).",
          "For \\(x \\geq 2\\): \\(F(x) = 1\\). Check: \\(\\dfrac{2^3}{8} = 1\\), so the pieces join.",
          "\\(x = 1\\) lies in \\((0, 2)\\): \\(F(1) = \\dfrac{1}{8}\\).",
          "\\(x = 3\\) is beyond the support: \\(F(3) = 1\\).",
        ],
        answer: "\\(F(x) = 0\\) for \\(x \\leq 0\\), \\(\\dfrac{x^3}{8}\\) for \\(0 < x < 2\\), 1 for \\(x \\geq 2\\); \\(F(1) = \\dfrac{1}{8}\\), \\(F(3) = 1\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = 2x\\) for \\(0 < x < 1\\) and \\(= 0\\) otherwise. Write \\(F(x)\\) for \\(0 < x < 1\\).",
        steps: ["\\(F(x) = \\int_0^x 2t\\,dt = \\left[t^2\\right]_0^x\\)."],
        answer: "\\(F(x) = x^2\\)",
      },
      practiceSet: [
        { prompt: "A continuous \\(X\\) has support \\((0, 3)\\). What are \\(F(-1)\\) and \\(F(5)\\)?", answer: "\\(F(-1) = 0\\) and \\(F(5) = 1\\)" },
        { prompt: "\\(f(x) = \\dfrac{1}{2}\\) for \\(0 < x < 2\\) and \\(= 0\\) otherwise. Find \\(F(x)\\) for \\(0 < x < 2\\).", answer: "\\(F(x) = \\dfrac{x}{2}\\)" },
      ],
      pyqExampleId: "250019ae-93e5-4a49-abd3-f65d9210ffb8",
      traps: [
        {
          title: "Giving only the middle piece",
          body: "The c.d.f. is defined for every real \\(x\\). Write all three ranges: 0 before the support, the integral inside it, 1 after it.",
        },
        {
          title: "Using x as both the limit and the variable",
          body: "Write \\(\\int_a^x f(t)\\,dt\\), not \\(\\int_a^x f(x)\\,dx\\); with one letter doing two jobs, the working is hard to follow and easy to get wrong.",
        },
        {
          title: "Starting the integral at 0 when the support does not",
          body: "If the support is \\((-3, 3)\\), the c.d.f. is \\(\\int_{-3}^{x} f(t)\\,dt\\). Starting at 0 leaves out the area on the negative side.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmpd-from-cdf",
      name: "Probabilities from the c.d.f.",
      intuition:
        "Once F is known, there is no need to integrate again: every probability is a value of F or a difference of two values. 'Hence find' in a question means exactly this.",
      definition:
        "- \\(P[X \\leq c] = F(c)\\).\n" +
        "- \\(P[X > c] = 1 - F(c)\\).\n" +
        "- \\(P[c < X \\leq d] = F(d) - F(c)\\).\n" +
        "- For a continuous \\(X\\), \\(<\\) and \\(\\leq\\) give the same values, since \\(P[X = c] = 0\\).\n" +
        "- A point below the support gives \\(F = 0\\); a point above it gives \\(F = 1\\).",
      formula: {
        label: "Reading probabilities off F",
        latex: "P[c < X \\leq d] = F(d) - F(c), \\qquad P[X > c] = 1 - F(c)",
      },
      authoredExample: {
        prompt:
          "The c.d.f. of a continuous \\(X\\) is \\(F(x) = 0\\) for \\(x \\leq 1\\), \\(F(x) = \\dfrac{x^2 - 1}{8}\\) for \\(1 < x < 3\\), and \\(F(x) = 1\\) for \\(x \\geq 3\\). Find \\(P(X < 2)\\), \\(P(X > 2.5)\\) and \\(P(1.5 < X < 2.5)\\).",
        steps: [
          "\\(P(X < 2) = F(2) = \\dfrac{4 - 1}{8} = \\dfrac{3}{8}\\).",
          "\\(F(2.5) = \\dfrac{6.25 - 1}{8} = \\dfrac{21}{32}\\), so \\(P(X > 2.5) = 1 - \\dfrac{21}{32} = \\dfrac{11}{32}\\).",
          "\\(F(1.5) = \\dfrac{2.25 - 1}{8} = \\dfrac{5}{32}\\), so \\(P(1.5 < X < 2.5) = F(2.5) - F(1.5) = \\dfrac{21 - 5}{32} = \\dfrac{1}{2}\\).",
        ],
        answer: "\\(P(X < 2) = \\dfrac{3}{8}\\), \\(P(X > 2.5) = \\dfrac{11}{32}\\), \\(P(1.5 < X < 2.5) = \\dfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "The c.d.f. of \\(X\\) is \\(F(x) = \\dfrac{x}{4}\\) for \\(0 < x < 4\\). Find \\(P(X > 1)\\).",
        steps: ["\\(P(X > 1) = 1 - F(1) = 1 - \\dfrac{1}{4}\\)."],
        answer: "\\(\\dfrac{3}{4}\\)",
      },
      practiceSet: [
        { prompt: "For a continuous \\(X\\), \\(F(2) = 0.3\\) and \\(F(5) = 0.9\\). Find \\(P(2 < X < 5)\\).", answer: "\\(0.9 - 0.3 = 0.6\\)" },
        { prompt: "A continuous \\(X\\) has support \\((0, 1)\\). Find \\(P(X \\leq -2)\\).", answer: "0, since \\(-2\\) is below the support" },
      ],
      pyqExampleId: "dedeedf5-ed9d-4152-b354-4dcbc6881305",
      traps: [
        {
          title: "Writing P(X > c) as F(c)",
          body: "\\(F(c)\\) is the probability up to \\(c\\). Above \\(c\\) is the rest: \\(1 - F(c)\\).",
        },
        {
          title: "Subtracting in the wrong order",
          body: "\\(P(c < X < d) = F(d) - F(c)\\) with \\(d > c\\). A negative answer means the two values were subtracted the wrong way round.",
        },
      ],
    },
  ],
};
