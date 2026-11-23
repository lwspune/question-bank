import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PD_PDF_NOTE: SubtopicNote = {
  subtopicName: "Continuous Random Variables and Probability Density Function",
  title: "Continuous Random Variables and the Probability Density Function",
  oneLineDefinition:
    "A continuous random variable is described by a probability density function f(x): f(x) is never negative, the total area under it is 1, and the probability of an interval is the area over that interval.",
  whyItMatters:
    "35 questions, seven of them from board papers: finding k so that a function is a p.d.f. (2024, and with P(1 < X < 2) in 2020), P(X < 1) and P(|X| < 1) for a given p.d.f. (2019, 2023, and as an MCQ in 2026), and the bus waiting-time question with a constant p.d.f. (2025, both as an MCQ and as a written question). The textbook rows are the solved examples of 7.4, Exercise 7.2 Q.1 to Q.7 and Miscellaneous Exercise 7.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmpd-density",
      name: "Checking a p.d.f. and finding its constant",
      intuition:
        "A continuous variable has too many values to give each one a probability, so probability is spread over an interval like mass along a rod, and f(x) is how thick the spread is at x. The thickness can never be negative, and the total amount spread must be 1. Because f(x) is a height and not a probability, it can be more than 1.",
      definition:
        "- Let \\(X\\) be a continuous random variable whose values form the interval \\(S = (a, b)\\), called the **support** of \\(X\\).\n" +
        "- A non-negative integrable function \\(f(x)\\) is the **probability density function (p.d.f.)** of \\(X\\) when the three conditions below hold.\n" +
        "- **Condition 1:** \\(f(x) \\geq 0\\) for every \\(x\\) in \\(S\\).\n" +
        "- **Condition 2:** the area under \\(y = f(x)\\) over \\(S\\) is 1, that is \\(\\int_S f(x)\\,dx = 1\\).\n" +
        "- **Condition 3:** for an interval \\(A\\), \\(P[X \\in A] = \\int_A f(x)\\,dx\\).\n" +
        "- \\(f(x)\\) is not \\(P[X = x]\\): for \\(f(x) = 3x^2\\) on \\((0, 1)\\), \\(f(0.9) = 2.43\\).\n" +
        "- To find a constant \\(k\\) in \\(f(x)\\), put \\(\\int_a^b f(x)\\,dx = 1\\) and solve.",
      formula: {
        label: "Conditions for a p.d.f.",
        latex: "f(x) \\geq 0 \\text{ on } S, \\qquad \\int_{S} f(x)\\,dx = 1",
      },
      authoredExample: {
        prompt: "Find \\(k\\) if \\(f(x) = k(2x + 1)\\) for \\(0 < x < 2\\) and \\(= 0\\) otherwise is the p.d.f. of a random variable \\(X\\).",
        steps: [
          "Since \\(f\\) is a p.d.f., \\(\\int_0^2 k(2x + 1)\\,dx = 1\\).",
          "\\(k\\left[x^2 + x\\right]_0^2 = 1\\), so \\(k(4 + 2 - 0) = 1\\).",
          "\\(6k = 1\\), so \\(k = \\dfrac{1}{6}\\).",
          "Check the sign: for \\(0 < x < 2\\), \\(2x + 1 > 0\\) and \\(k > 0\\), so \\(f(x) \\geq 0\\).",
        ],
        answer: "\\(k = \\dfrac{1}{6}\\)",
      },
      selfCheckExample: {
        prompt: "Is \\(f(x) = 4x^3\\) for \\(0 < x < 1\\) and \\(= 0\\) otherwise a p.d.f.?",
        steps: ["\\(4x^3 \\geq 0\\) on \\((0, 1)\\), and \\(\\int_0^1 4x^3\\,dx = \\left[x^4\\right]_0^1 = 1\\)."],
        answer: "Yes, both conditions hold",
      },
      practiceSet: [
        { prompt: "Is \\(f(x) = x - 1\\) for \\(0 < x < 2\\) and \\(= 0\\) otherwise a p.d.f.?", answer: "No, \\(f(x) < 0\\) for \\(0 < x < 1\\)" },
        { prompt: "Find \\(c\\) if \\(f(x) = c\\) for \\(2 < x < 6\\) and \\(= 0\\) otherwise is a p.d.f.", answer: "\\(4c = 1\\), so \\(c = \\dfrac{1}{4}\\)" },
      ],
      pyqExampleId: "b6bcfa0d-c3a4-48cd-a4c5-a56d577e3473",
      traps: [
        {
          title: "Checking only the area",
          body: "\\(f(x) = \\dfrac{x}{2}\\) on \\((-2, 2)\\) is negative for \\(x < 0\\), so it is not a p.d.f. whatever its area. Test the sign over the whole support as well as the area.",
        },
        {
          title: "Treating f(x) as a probability",
          body: "A value of \\(f(x)\\) greater than 1 does not make \\(f\\) wrong. Only areas under the curve are probabilities.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmpd-interval",
      name: "Probability of an interval",
      intuition:
        "The probability that X lands between c and d is the area under the curve between them. A single point has no width and so no area, which is why P(X = c) is 0 for a continuous variable and why strict and non-strict inequalities give the same answer. Outside the support the curve is flat at 0, so the area stops at the edge of the support.",
      definition:
        "- \\(P[c < X < d] = \\int_c^d f(x)\\,dx\\).\n" +
        "- \\(P[X = c] = 0\\) for every \\(c\\), so \\(P[c < X < d] = P[c \\leq X \\leq d]\\).\n" +
        "- Cut the limits to the support: where \\(f(x) = 0\\), there is no area.\n" +
        "- \\(|X| < a\\) means \\(-a < X < a\\); \\(|X| > a\\) means \\(X < -a\\) or \\(X > a\\).\n" +
        "- \\(P[X > d] = 1 - P[X \\leq d]\\) is often the quicker route.",
      formula: {
        label: "Probability as an area",
        latex: "P[c < X < d] = \\int_{c}^{d} f(x)\\,dx, \\qquad P[X = c] = 0",
      },
      authoredExample: {
        prompt:
          "\\(X\\) has p.d.f. \\(f(x) = \\dfrac{x^2}{9}\\) for \\(0 < x < 3\\) and \\(= 0\\) otherwise. Find \\(P(1 < X < 2)\\) and \\(P(X > 2)\\).",
        steps: [
          "\\(\\int f(x)\\,dx = \\dfrac{x^3}{27}\\), and \\(\\left[\\dfrac{x^3}{27}\\right]_0^3 = 1\\), so \\(f\\) is a p.d.f.",
          "\\(P(1 < X < 2) = \\int_1^2 \\dfrac{x^2}{9}\\,dx = \\left[\\dfrac{x^3}{27}\\right]_1^2 = \\dfrac{8 - 1}{27} = \\dfrac{7}{27}\\).",
          "\\(P(X > 2) = \\int_2^3 \\dfrac{x^2}{9}\\,dx = \\left[\\dfrac{x^3}{27}\\right]_2^3 = \\dfrac{27 - 8}{27} = \\dfrac{19}{27}\\). The upper limit is 3, the end of the support.",
        ],
        answer: "\\(P(1 < X < 2) = \\dfrac{7}{27}\\) and \\(P(X > 2) = \\dfrac{19}{27}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = 2x\\) for \\(0 < x < 1\\) and \\(= 0\\) otherwise. Find \\(P\\left(X < \\dfrac{1}{2}\\right)\\).",
        steps: ["\\(\\int_0^{1/2} 2x\\,dx = \\left[x^2\\right]_0^{1/2} = \\dfrac{1}{4}\\)."],
        answer: "\\(\\dfrac{1}{4}\\)",
      },
      practiceSet: [
        { prompt: "\\(X\\) is a continuous random variable. What is \\(P[X = 2]\\)?", answer: "0" },
        { prompt: "\\(f(x) = \\dfrac{x + 1}{4}\\) for \\(0 < x < 2\\) and \\(= 0\\) otherwise. Find \\(P(X > 1)\\).", answer: "\\(\\dfrac{1}{4}\\left[\\dfrac{x^2}{2} + x\\right]_1^2 = \\dfrac{1}{4}\\left(4 - \\dfrac{3}{2}\\right) = \\dfrac{5}{8}\\)" },
        { prompt: "Write \\(P(|X| < 2)\\) without the modulus.", answer: "\\(P(-2 < X < 2)\\)" },
      ],
      pyqExampleId: "8d4527c7-d3e3-4d2d-89f8-6d21752cb046",
      traps: [
        {
          title: "Integrating beyond the support",
          body: "If the support is \\((0, 6)\\) and you need \\(P(X > 3)\\), integrate from 3 to 6, not to infinity: beyond 6 the density is 0.",
        },
        {
          title: "Reading |X| < a as X < a",
          body: "\\(|X| < a\\) is the two-sided interval \\(-a < X < a\\). Write it out before you integrate.",
        },
        {
          title: "Expecting < and ≤ to differ",
          body: "For a continuous variable \\(P[X = c] = 0\\), so \\(P(X < c)\\) and \\(P(X \\leq c)\\) are equal. Say so in one line rather than working both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmpd-uniform",
      name: "A constant p.d.f.: waiting-time questions",
      intuition:
        "When f(x) is the same constant across the whole support, every stretch of the same length carries the same probability. The probability of an interval is then just its length divided by the length of the support, which makes a quick check on the integral.",
      definition:
        "- \\(f(x) = \\dfrac{1}{b - a}\\) for \\(a \\leq x \\leq b\\), and 0 otherwise, is a p.d.f.: its area is \\(\\dfrac{1}{b - a} \\times (b - a) = 1\\).\n" +
        "- For \\(a \\leq c < d \\leq b\\): \\(P[c < X < d] = \\int_c^d \\dfrac{1}{b - a}\\,dx = \\dfrac{d - c}{b - a}\\).\n" +
        "- A board answer still shows the integral; the length rule is the check.",
      formula: {
        label: "Constant density",
        latex: "f(x) = \\frac{1}{b - a},\\ a \\leq x \\leq b, \\qquad P[c < X < d] = \\frac{d - c}{b - a}",
      },
      authoredExample: {
        prompt:
          "The time \\(X\\) (in minutes) a customer waits at a counter has p.d.f. \\(f(x) = \\dfrac{1}{10}\\) for \\(0 \\leq x \\leq 10\\) and \\(= 0\\) otherwise. Find the probability that the wait is (i) between 2 and 5 minutes, (ii) less than 6 minutes.",
        steps: [
          "(i) \\(P(2 < X < 5) = \\int_2^5 \\dfrac{1}{10}\\,dx = \\left[\\dfrac{x}{10}\\right]_2^5 = \\dfrac{5 - 2}{10} = \\dfrac{3}{10}\\).",
          "(ii) \\(P(X < 6) = \\int_0^6 \\dfrac{1}{10}\\,dx = \\left[\\dfrac{x}{10}\\right]_0^6 = \\dfrac{6}{10} = \\dfrac{3}{5}\\). The lower limit is 0, the start of the support.",
        ],
        answer: "(i) \\(\\dfrac{3}{10}\\), (ii) \\(\\dfrac{3}{5}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{1}{4}\\) for \\(1 < x < 5\\) and \\(= 0\\) otherwise. Find \\(P(X < 2)\\).",
        steps: ["\\(\\int_1^2 \\dfrac{1}{4}\\,dx = \\dfrac{2 - 1}{4}\\)."],
        answer: "\\(\\dfrac{1}{4}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(k\\) if \\(f(x) = k\\) for \\(0 \\leq x \\leq 8\\) and \\(= 0\\) otherwise is a p.d.f.", answer: "\\(8k = 1\\), so \\(k = \\dfrac{1}{8}\\)" },
        { prompt: "\\(f(x) = \\dfrac{1}{6}\\) for \\(0 \\leq x \\leq 6\\) and \\(= 0\\) otherwise. Find \\(P(X > 4.5)\\).", answer: "\\(\\dfrac{6 - 4.5}{6} = \\dfrac{1}{4}\\)" },
      ],
      pyqExampleId: "d74b9716-5599-4dd9-a4f4-c1488ad49a8f",
      traps: [
        {
          title: "Integrating to infinity for 'more than'",
          body: "'More than' a time means up to the end of the support, not to infinity. Past the end the density is 0, and integrating a constant to infinity gives no finite answer.",
        },
        {
          title: "Only the length rule, no working",
          body: "Writing the answer from the lengths alone can lose the method marks. Show \\(\\int_c^d f(x)\\,dx\\) with its limits, then evaluate.",
        },
      ],
    },
  ],
};
