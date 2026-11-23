import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PD_EXPECTATION_NOTE: SubtopicNote = {
  subtopicName: "Expected Value and Variance of a Random Variable",
  title: "Expected Value, Variance and Standard Deviation",
  oneLineDefinition:
    "The expected value E(X) is the sum of each value of X times its probability; the variance is E(X²) minus the square of E(X), and the standard deviation is its square root.",
  whyItMatters:
    "28 questions, nine of them from board papers, the most of any page: the expected value from a table (MCQs in 2015, 2018 and 2022, a written question in 2020), the mean of a number chosen at random from 1 to 15 (2023), the variance and standard deviation from a table (2018, 2019 and 2024), and the expected value and variance of the number on a die (2026). The textbook rows are the solved examples of 7.3.3, Exercise 7.1 Q.9 to Q.16, Exercise 7.2 Q.10 and Miscellaneous Exercise 7.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmpd-mean",
      name: "Expected value (mean) of a discrete random variable",
      intuition:
        "If the experiment is repeated many times, the average of the values of X settles near one number: the expected value. Each value pulls the average towards itself in proportion to its probability, so you multiply every value by its probability and add.",
      definition:
        "- \\(E(X) = \\mu = \\sum x_i p_i = x_1 p_1 + x_2 p_2 + \\ldots + x_n p_n\\).\n" +
        "- In words: the sum of the products of all possible values of \\(X\\) by their respective probabilities.\n" +
        "- Board layout: a table with the columns \\(x_i\\), \\(p_i\\) and \\(x_i p_i\\), and the total of the last column.\n" +
        "- If the p.m.f. has an unknown constant, find it first from \\(\\sum p_i = 1\\).\n" +
        "- \\(E(X)\\) need not be a possible value of \\(X\\); it can be a fraction even when \\(X\\) takes whole-number values.",
      formula: {
        label: "Expected value",
        latex: "E(X) = \\mu = \\sum_{i=1}^{n} x_i p_i",
      },
      authoredExample: {
        prompt:
          "\\(X\\) takes the values 0, 1, 2, 3, 4 with probabilities 0.2, 0.3, 0.25, 0.15, 0.1. Find \\(E(X)\\).",
        steps: [
          "Check: \\(0.2 + 0.3 + 0.25 + 0.15 + 0.1 = 1\\), so this is a p.m.f.",
          "\\(x_i p_i\\): \\(0 \\times 0.2 = 0\\), \\(1 \\times 0.3 = 0.3\\), \\(2 \\times 0.25 = 0.5\\), \\(3 \\times 0.15 = 0.45\\), \\(4 \\times 0.1 = 0.4\\).",
          "\\(E(X) = \\sum x_i p_i = 0 + 0.3 + 0.5 + 0.45 + 0.4 = 1.65\\).",
        ],
        answer: "\\(E(X) = 1.65\\)",
      },
      selfCheckExample: {
        prompt: "A number \\(X\\) is chosen at random from 1, 2, 3, 4, each equally likely. Find \\(E(X)\\).",
        steps: ["\\(E(X) = (1 + 2 + 3 + 4) \\times \\dfrac{1}{4} = \\dfrac{10}{4}\\)."],
        answer: "\\(E(X) = 2.5\\)",
      },
      practiceSet: [
        { prompt: "\\(X\\) takes the values \\(-1\\) and 1, each with probability \\(\\dfrac{1}{2}\\). Find \\(E(X)\\).", answer: "\\(-\\dfrac{1}{2} + \\dfrac{1}{2} = 0\\)" },
        { prompt: "A player wins ₹ 20 with probability 0.3 and loses ₹ 5 with probability 0.7. Find the expected gain.", answer: "\\(20(0.3) + (-5)(0.7) = 6 - 3.5 = 2.5\\), a gain of ₹ 2.50" },
      ],
      pyqExampleId: "7e5d18e5-d82c-4d4f-8d82-28944f7915ec",
      traps: [
        {
          title: "Dropping the sign of a negative value",
          body: "A value of \\(-2\\) with probability 0.3 gives \\(x_i p_i = -0.6\\). Writing \\(+0.6\\) changes the answer, and an MCQ will offer that wrong answer as an option.",
        },
        {
          title: "Taking the plain average of the values",
          body: "\\(E(X)\\) is not the sum of the values divided by how many there are, unless every value has the same probability. Weight each value by its probability.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmpd-variance",
      name: "Variance and standard deviation",
      intuition:
        "The mean says where X sits; the variance says how widely it spreads around that mean. It is the probability-weighted average of the squared distances from the mean. The shortcut E(X²) minus the square of E(X) gives the same number with less work, and the standard deviation brings it back to the units of X.",
      definition:
        "- \\(\\text{Var}(X) = \\sigma^2 = \\sum (x_i - \\mu)^2 p_i\\).\n" +
        "- Shortcut: \\(\\text{Var}(X) = \\sum x_i^2 p_i - \\left(\\sum x_i p_i\\right)^2 = E(X^2) - [E(X)]^2\\).\n" +
        "- The non-negative number \\(\\sigma = \\sqrt{\\text{Var}(X)}\\) is the **standard deviation**.\n" +
        "- Board layout: a table with the columns \\(x_i\\), \\(p_i\\), \\(x_i p_i\\), \\(x_i^2 p_i\\) and their totals; then \\(E(X)\\), \\(E(X^2)\\), \\(\\text{Var}(X)\\) and \\(\\sigma\\) on separate lines.\n" +
        "- A variance is never negative; a negative answer means an arithmetic slip.",
      formula: {
        label: "Variance and standard deviation",
        latex: "\\text{Var}(X) = \\sum x_i^2 p_i - \\left(\\sum x_i p_i\\right)^2, \\qquad \\sigma = \\sqrt{\\text{Var}(X)}",
      },
      authoredExample: {
        prompt:
          "\\(X\\) takes the values 0, 1, 2 with probabilities 0.3, 0.5, 0.2. Find the variance and standard deviation of \\(X\\).",
        steps: [
          "\\(x_i p_i\\): 0, 0.5, 0.4, total \\(\\sum x_i p_i = 0.9\\), so \\(E(X) = 0.9\\).",
          "\\(x_i^2 p_i\\): \\(0\\), \\(1 \\times 0.5 = 0.5\\), \\(4 \\times 0.2 = 0.8\\), total \\(\\sum x_i^2 p_i = 1.3\\), so \\(E(X^2) = 1.3\\).",
          "\\(\\text{Var}(X) = E(X^2) - [E(X)]^2 = 1.3 - (0.9)^2 = 1.3 - 0.81 = 0.49\\).",
          "\\(\\sigma = \\sqrt{0.49} = 0.7\\).",
        ],
        answer: "\\(\\text{Var}(X) = 0.49\\) and \\(\\sigma = 0.7\\)",
      },
      selfCheckExample: {
        prompt: "For a random variable, \\(E(X) = 2\\) and \\(E(X^{2}) = 5.5\\). Find \\(\\text{Var}(X)\\).",
        steps: ["\\(\\text{Var}(X) = E(X^2) - [E(X)]^2 = 5.5 - 4\\)."],
        answer: "\\(\\text{Var}(X) = 1.5\\)",
      },
      practiceSet: [
        { prompt: "\\(X = 1\\) with probability 0.6 and \\(X = 0\\) with probability 0.4. Find \\(\\text{Var}(X)\\).", answer: "\\(E(X) = 0.6\\), \\(E(X^2) = 0.6\\), so \\(\\text{Var}(X) = 0.6 - 0.36 = 0.24\\)" },
        { prompt: "\\(\\text{Var}(X) = 2.25\\). Find the standard deviation of \\(X\\).", answer: "\\(\\sigma = \\sqrt{2.25} = 1.5\\)" },
      ],
      pyqExampleId: "e3300f37-4c7e-4b95-8c01-b5de2666fb04",
      traps: [
        {
          title: "Squaring the probability instead of the value",
          body: "The column is \\(x_i^2 p_i\\): square the value, then multiply by its probability. \\(x_i p_i^2\\) is a different number.",
        },
        {
          title: "Stopping at E(X²)",
          body: "\\(\\sum x_i^2 p_i\\) is \\(E(X^2)\\), not the variance. Subtract \\([E(X)]^2\\) on the next line.",
        },
        {
          title: "Leaving out the standard deviation",
          body: "When the question asks for the standard deviation too, write \\(\\sigma = \\sqrt{\\text{Var}(X)}\\) with its value. The variance alone loses that mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmpd-integral-mean",
      name: "Mean and variance of a continuous random variable",
      intuition:
        "A continuous random variable is described by a probability density function f(x), whose area over an interval is a probability (the next page teaches it). For its mean, the sum of x times p becomes the integral of x times f(x), just as the textbook turns a sum into an integral for the c.d.f.",
      definition:
        "- \\(E(X) = \\int_a^b x f(x)\\,dx\\), where \\((a, b)\\) is the interval on which \\(f(x)\\) is not zero.\n" +
        "- \\(E(X^2) = \\int_a^b x^2 f(x)\\,dx\\), and \\(\\text{Var}(X) = E(X^2) - [E(X)]^2\\).\n" +
        "- If \\(f(x)\\) has a constant in it, find the constant first from \\(\\int_a^b f(x)\\,dx = 1\\).\n" +
        "- Only one textbook exercise (Exercise 7.2 Q.10) asks for this, and no board paper in this bank has asked it.",
      formula: {
        label: "Mean and variance, continuous case",
        latex: "E(X) = \\int_a^b x f(x)\\,dx, \\qquad \\text{Var}(X) = \\int_a^b x^2 f(x)\\,dx - [E(X)]^2",
      },
      authoredExample: {
        prompt: "\\(X\\) has p.d.f. \\(f(x) = 2x\\) for \\(0 < x < 1\\) and \\(= 0\\) otherwise. Find \\(E(X)\\) and \\(\\text{Var}(X)\\).",
        steps: [
          "\\(E(X) = \\int_0^1 x \\cdot 2x\\,dx = \\left[\\dfrac{2x^3}{3}\\right]_0^1 = \\dfrac{2}{3}\\).",
          "\\(E(X^2) = \\int_0^1 x^2 \\cdot 2x\\,dx = \\left[\\dfrac{x^4}{2}\\right]_0^1 = \\dfrac{1}{2}\\).",
          "\\(\\text{Var}(X) = \\dfrac{1}{2} - \\left(\\dfrac{2}{3}\\right)^2 = \\dfrac{1}{2} - \\dfrac{4}{9} = \\dfrac{9 - 8}{18} = \\dfrac{1}{18}\\).",
        ],
        answer: "\\(E(X) = \\dfrac{2}{3}\\) and \\(\\text{Var}(X) = \\dfrac{1}{18}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{1}{2}\\) for \\(0 < x < 2\\) and \\(= 0\\) otherwise. Find \\(E(X)\\).",
        steps: ["\\(E(X) = \\int_0^2 \\dfrac{x}{2}\\,dx = \\left[\\dfrac{x^2}{4}\\right]_0^2 = 1\\)."],
        answer: "\\(E(X) = 1\\)",
      },
      practiceSet: [
        { prompt: "\\(f(x) = 3x^2\\) for \\(0 < x < 1\\) and \\(= 0\\) otherwise. Find \\(E(X)\\).", answer: "\\(\\int_0^1 3x^3\\,dx = \\dfrac{3}{4}\\)" },
        { prompt: "\\(f(x) = \\dfrac{1}{4}\\) for \\(0 < x < 4\\) and \\(= 0\\) otherwise. Find \\(E(X^2)\\).", answer: "\\(\\int_0^4 \\dfrac{x^2}{4}\\,dx = \\dfrac{64}{12} = \\dfrac{16}{3}\\)" },
      ],
      pyqExampleId: "e3058919-1107-4c2a-b8b1-604fc87784fe",
      traps: [
        {
          title: "Adding f(x) values instead of integrating",
          body: "\\(f(x)\\) is a height, not the probability of \\(x\\). For a continuous variable, \\(E(X)\\) is an integral of \\(x f(x)\\), never a sum.",
        },
      ],
    },
  ],
};
