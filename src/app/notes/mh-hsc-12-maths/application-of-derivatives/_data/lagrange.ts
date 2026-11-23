import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AD_LAGRANGE_NOTE: SubtopicNote = {
  subtopicName: "Lagrange's Mean Value Theorem",
  title: "Lagrange's Mean Value Theorem",
  oneLineDefinition:
    "If f is continuous on [a, b] and differentiable on (a, b), then at some c between a and b the slope f'(c) equals the slope of the chord, (f(b) − f(a))/(b − a).",
  whyItMatters:
    "12 questions, three of them from board papers: finding c for x(x − 1)(x − 2)(x − 3) on [0, 4] (2019), and verifying the theorem for the square root of (4 + x) on [0, 5] (2023) and for log x on [1, e] (2026). The textbook rows are Exercise 2.3 Q.7, the two solved examples of section 2.3.2 and two Miscellaneous Exercise questions, one of them on average and instantaneous velocity.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmad-lmvt",
      name: "Statement and verification of LMVT",
      intuition:
        "Join the end points A and B of the curve by a chord. If the curve is smooth all the way, somewhere between them the tangent runs parallel to that chord. LMVT needs only two conditions; the end values do not have to be equal.",
      definition:
        "- **Statement:** if \\(f\\) is continuous on \\([a, b]\\) and differentiable on \\((a, b)\\), then there is at least one \\(c \\in (a, b)\\) such that \\(f'(c) = \\dfrac{f(b) - f(a)}{b - a}\\).\n" +
        "- **Geometrical meaning:** the tangent at \\(x = c\\) is parallel to the chord joining \\(A(a, f(a))\\) and \\(B(b, f(b))\\).\n" +
        "- When \\(f(a) = f(b)\\) the chord is level and LMVT says the same as Rolle's theorem.\n" +
        "- Board steps: the two conditions with reasons; \\(f(a)\\), \\(f(b)\\) and the slope of the chord; \\(f'(c)\\); solve; check \\(c \\in (a, b)\\); 'LMVT is verified'.",
      formula: {
        label: "Lagrange's mean value theorem",
        latex: "f'(c) = \\frac{f(b) - f(a)}{b - a}, \\qquad c \\in (a, b)",
      },
      authoredExample: {
        prompt: "Verify Lagrange's mean value theorem for \\(f(x) = x^2 + 2x\\) on \\([0, 2]\\).",
        steps: [
          "\\(f\\) is a polynomial, so it is continuous on \\([0, 2]\\) and differentiable on \\((0, 2)\\).",
          "\\(f(0) = 0\\) and \\(f(2) = 4 + 4 = 8\\), so \\(\\dfrac{f(2) - f(0)}{2 - 0} = \\dfrac{8}{2} = 4\\).",
          "\\(f'(x) = 2x + 2\\). Put \\(f'(c) = 4\\): \\(2c + 2 = 4\\), so \\(c = 1\\).",
          "\\(1 \\in (0, 2)\\).",
        ],
        answer: "LMVT is verified, with \\(c = 1\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(c\\) of Lagrange's mean value theorem for \\(f(x) = x^3\\) on \\([0, 3]\\).",
        steps: ["Slope of the chord \\(= \\dfrac{27 - 0}{3} = 9\\).", "\\(3c^2 = 9\\), so \\(c = \\sqrt{3}\\) (the value \\(-\\sqrt{3}\\) is outside \\((0, 3)\\))."],
        answer: "\\(c = \\sqrt{3}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(c\\) of LMVT for \\(f(x) = \\dfrac{1}{x}\\) on \\([1, 4]\\).", answer: "\\(c = 2\\) (the chord's slope is \\(-\\dfrac{1}{4} = -\\dfrac{1}{c^2}\\))" },
        { prompt: "Find \\(c\\) of LMVT for \\(f(x) = e^{x}\\) on \\([0, 1]\\).", answer: "\\(c = \\log(e - 1)\\), about 0.54" },
      ],
      pyqExampleId: "79fa390a-a585-4080-8449-55f6aec867bc",
      traps: [
        {
          title: "Testing f(a) = f(b) for LMVT",
          body: "Equal end values is Rolle's third condition. LMVT does not need it, so do not write it as a condition or conclude the theorem fails because \\(f(a) \\neq f(b)\\).",
        },
        {
          title: "Not checking where c lies",
          body: "Solving \\(f'(c)\\) = slope often gives two values, such as \\(c = \\pm\\sqrt{3}\\). Keep only those in \\((a, b)\\), and say why the other is rejected.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-chord",
      name: "Finding c, and LMVT as an average rate",
      intuition:
        "The slope of the chord is the average rate of change of f over [a, b], and f'(c) is the rate at one instant. So LMVT says that the instantaneous rate equals the average rate at least once. For motion: at some moment the speedometer shows exactly the average velocity of the trip.",
      definition:
        "- \\(\\dfrac{f(b) - f(a)}{b - a}\\) is the average rate of change of \\(f\\) over \\([a, b]\\).\n" +
        "- For a displacement \\(s(t)\\), the average velocity over \\([t_1, t_2]\\) equals the velocity \\(s'(c)\\) at some \\(c \\in (t_1, t_2)\\).\n" +
        "- For a product of several factors, group them in pairs to keep \\(f'(x)\\) short.\n" +
        "- A cubic equation in \\(c\\): try small whole numbers to find one root, then factorise.",
      formula: {
        label: "Average velocity equals velocity at some instant",
        latex: "\\frac{s(t_2) - s(t_1)}{t_2 - t_1} = s'(c), \\qquad t_1 < c < t_2",
      },
      authoredExample: {
        prompt:
          "The position of a car is \\(s(t) = t^2 + 4t\\) metres at time \\(t\\) seconds. Find the time \\(c\\) in \\([0, 6]\\) when its velocity equals its average velocity over this interval.",
        steps: [
          "\\(s\\) is a polynomial, so LMVT applies on \\([0, 6]\\).",
          "\\(s(0) = 0\\) and \\(s(6) = 36 + 24 = 60\\). Average velocity \\(= \\dfrac{60 - 0}{6 - 0} = 10\\) m/sec.",
          "\\(s'(t) = 2t + 4\\). Put \\(s'(c) = 10\\): \\(2c + 4 = 10\\), so \\(c = 3\\).",
          "\\(3 \\in (0, 6)\\).",
        ],
        answer: "At \\(c = 3\\) seconds",
      },
      selfCheckExample: {
        prompt: "A function satisfies the conditions of LMVT on \\([1, 5]\\), with \\(f(1) = 2\\) and \\(f(5) = 14\\). What value must \\(f'\\) take somewhere in \\((1, 5)\\)?",
        steps: ["\\(\\dfrac{14 - 2}{5 - 1} = \\dfrac{12}{4}\\)."],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Find \\(c\\) of LMVT for \\(f(x) = x^3 - x\\) on \\([0, 2]\\).", answer: "\\(c = \\dfrac{2}{\\sqrt{3}}\\), about 1.155" },
        { prompt: "A train covers 120 km in 2 hours. What does LMVT say about its speed?", answer: "At some instant its speed was exactly 60 km/hr (if its position is differentiable in time)" },
      ],
      pyqExampleId: "7691775b-bfa9-42de-b5a6-1036a4a61c0f",
      traps: [
        {
          title: "Expanding a long product term by term",
          body: "For a product of four factors, pair them so that both pairs share a part, then differentiate. Multiplying everything out invites a slip in a power or a sign.",
        },
        {
          title: "Giving up on a cubic in c",
          body: "Try \\(c = 1, 2, 3, \\ldots\\) in the cubic first. Once one root is found, divide it out and test the quadratic's discriminant for the others.",
        },
      ],
    },
  ],
};
