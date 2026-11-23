import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_TF_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Equations and General Solutions",
  title: "Trigonometric Equations: Principal and General Solutions",
  oneLineDefinition:
    "A trigonometric equation is solved by bringing it to one ratio equal to one value, then writing the principal solutions in [0, 2π) or the general solution with an integer n.",
  whyItMatters:
    "82 questions. Twelve were set in board papers: principal solutions of sec x = 2/√3, cot x = −√3, cot θ = 0 and cos θ = 1/2 (2018, 2019, 2022, 2024), general solutions of tan θ = 0, tan²θ = 1, cos 5θ = 1/2 and 4cos²θ = 3 (2025, 2026), cos x − sin x = 1 (2015), and three-term sums like sin x + sin 3x + sin 5x = 0 (2016, 2017, 2023). The textbook adds which equations have solutions, multiple angles and equations in squares.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmtf-principal",
      name: "Principal solutions in the interval from 0 to 2π",
      intuition:
        "A trigonometric ratio takes the same value again and again, so an equation has many solutions. The principal solutions are only the ones in \\([0, 2\\pi)\\), one full turn. Find the acute angle that gives the value (the reference angle), then let the sign of the ratio tell you which two quadrants to use.",
      definition:
        "- **Principal solution:** a solution \\(\\alpha\\) of the equation with \\(0 \\le \\alpha < 2\\pi\\).\n" +
        "- Step 1: change \\(\\operatorname{cosec}\\), \\(\\sec\\) and \\(\\cot\\) into \\(\\sin\\), \\(\\cos\\) and \\(\\tan\\).\n" +
        "- Step 2: find the reference angle \\(\\alpha\\) from the value without its sign.\n" +
        "- Step 3: the sign picks two quadrants. Sine is positive in I and II, tangent in I and III, cosine in I and IV.\n" +
        "- Step 4: the angles are \\(\\alpha\\) (I), \\(\\pi - \\alpha\\) (II), \\(\\pi + \\alpha\\) (III) and \\(2\\pi - \\alpha\\) (IV).\n" +
        "- A ratio that is not defined cannot equal a number: \\(\\tan\\) and \\(\\sec\\) need \\(\\cos\\theta \\ne 0\\), \\(\\cot\\) and \\(\\operatorname{cosec}\\) need \\(\\sin\\theta \\ne 0\\).\n" +
        "- For a multiple angle such as \\(\\sin 2\\theta\\), list every value of \\(2\\theta\\) in \\([0, 4\\pi)\\), then divide by 2.",
      formula: {
        label: "Placing the reference angle in each quadrant",
        latex: "\\text{I: } \\alpha \\qquad \\text{II: } \\pi - \\alpha \\qquad \\text{III: } \\pi + \\alpha \\qquad \\text{IV: } 2\\pi - \\alpha",
        symbols: [{ symbol: "\\(\\alpha\\)", meaning: "the acute reference angle, found from the value without its sign" }],
      },
      authoredExample: {
        prompt: "Find the principal solutions of \\(2\\cos\\theta + \\sqrt{3} = 0\\).",
        steps: [
          "Given: \\(2\\cos\\theta + \\sqrt{3} = 0\\), so \\(\\cos\\theta = -\\dfrac{\\sqrt{3}}{2}\\).",
          "We know \\(\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}\\), so the reference angle is \\(\\dfrac{\\pi}{6}\\).",
          "\\(\\cos\\theta\\) is negative, so \\(\\theta\\) lies in the second or the third quadrant.",
          "As \\(\\cos(\\pi - \\theta) = \\cos(\\pi + \\theta) = -\\cos\\theta\\): \\(\\theta = \\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}\\) or \\(\\theta = \\pi + \\dfrac{\\pi}{6} = \\dfrac{7\\pi}{6}\\).",
          "Both values lie in \\([0, 2\\pi)\\).",
        ],
        answer: "The principal solutions are \\(\\dfrac{5\\pi}{6}\\) and \\(\\dfrac{7\\pi}{6}\\)",
      },
      selfCheckExample: {
        prompt: "Find the principal solutions of \\(\\sin 2\\theta = \\dfrac{\\sqrt{3}}{2}\\).",
        steps: [
          "For \\(0 \\le \\theta < 2\\pi\\), \\(0 \\le 2\\theta < 4\\pi\\). Sine is positive in I and II, reference angle \\(\\dfrac{\\pi}{3}\\).",
          "\\(2\\theta = \\dfrac{\\pi}{3}, \\dfrac{2\\pi}{3}, \\dfrac{7\\pi}{3}, \\dfrac{8\\pi}{3}\\).",
          "Divide by 2: \\(\\theta = \\dfrac{\\pi}{6}, \\dfrac{\\pi}{3}, \\dfrac{7\\pi}{6}, \\dfrac{4\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{6},\\ \\dfrac{\\pi}{3},\\ \\dfrac{7\\pi}{6},\\ \\dfrac{4\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the principal solutions of \\(\\sin\\theta = \\dfrac{\\sqrt{3}}{2}\\).", answer: "\\(\\dfrac{\\pi}{3}\\) and \\(\\dfrac{2\\pi}{3}\\)" },
        { prompt: "Find the principal solutions of \\(\\sec\\theta = -2\\).", answer: "\\(\\dfrac{2\\pi}{3}\\) and \\(\\dfrac{4\\pi}{3}\\)", method: "\\(\\cos\\theta = -\\dfrac{1}{2}\\): quadrants II and III." },
        { prompt: "How many principal solutions does \\(\\cos\\theta = -1\\) have?", answer: "Only one, \\(\\theta = \\pi\\)" },
        { prompt: "Is \\(2\\pi\\) a principal solution of \\(\\sin\\theta = 0\\)?", answer: "No. Principal solutions are less than \\(2\\pi\\); they are \\(0\\) and \\(\\pi\\)" },
      ],
      pyqExampleId: "b55244c9-1a1c-4b24-8956-784d7357112d",
      traps: [
        {
          title: "Picking the wrong pair of quadrants",
          body: "A negative cosine means quadrants II and III, not I and II. Write the sign rule (sine I, II; tangent I, III; cosine I, IV) before choosing the angles.",
        },
        {
          title: "Dividing too early for a multiple angle",
          body: "For \\(\\tan 3\\theta = k\\), find every \\(3\\theta\\) in \\([0, 6\\pi)\\) first. Finding \\(3\\theta\\) only in \\([0, 2\\pi)\\) and then dividing loses most of the solutions.",
        },
        {
          title: "Writing a general solution when principal solutions are asked",
          body: "Principal solutions are particular angles in \\([0, 2\\pi)\\). An answer with \\(n\\pi\\) in it does not answer the question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-general",
      name: "General solutions of sin, cos and tan equations",
      intuition:
        "The general solution lists every angle that works, using an integer n. Find one angle \\(\\alpha\\) that works, then add the repeat of the ratio: tangent repeats every \\(\\pi\\), cosine is the same at \\(\\alpha\\) and \\(-\\alpha\\), and sine is the same at \\(\\alpha\\) and \\(\\pi - \\alpha\\), which gives the \\((-1)^n\\).",
      definition:
        "- **Theorem 3.1:** \\(\\sin\\theta = \\sin\\alpha \\Rightarrow \\theta = n\\pi + (-1)^n\\alpha\\).\n" +
        "- **Theorem 3.2:** \\(\\cos\\theta = \\cos\\alpha \\Rightarrow \\theta = 2n\\pi \\pm \\alpha\\).\n" +
        "- **Theorem 3.3:** \\(\\tan\\theta = \\tan\\alpha \\Rightarrow \\theta = n\\pi + \\alpha\\).\n" +
        "- **Squares (Theorems 3.4 to 3.6):** \\(\\sin^2\\theta = \\sin^2\\alpha\\), \\(\\cos^2\\theta = \\cos^2\\alpha\\) and \\(\\tan^2\\theta = \\tan^2\\alpha\\) each give \\(\\theta = n\\pi \\pm \\alpha\\).\n" +
        "- **Zeros:** \\(\\sin\\theta = 0 \\Leftrightarrow \\theta = n\\pi\\); \\(\\cos\\theta = 0 \\Leftrightarrow \\theta = (2n + 1)\\dfrac{\\pi}{2}\\); \\(\\tan\\theta = 0 \\Leftrightarrow \\theta = n\\pi\\).\n" +
        "- In every answer write \"where \\(n \\in Z\\)\".\n" +
        "- **Does a solution exist?** \\(\\sin\\theta\\) and \\(\\cos\\theta\\) lie in \\([-1, 1]\\), \\(\\tan\\theta\\) takes every real value, and a square is never negative.",
      formula: {
        label: "The three general-solution patterns",
        latex:
          "\\sin\\theta = \\sin\\alpha \\Rightarrow \\theta = n\\pi + (-1)^n\\alpha \\qquad \\cos\\theta = \\cos\\alpha \\Rightarrow \\theta = 2n\\pi \\pm \\alpha \\qquad \\tan\\theta = \\tan\\alpha \\Rightarrow \\theta = n\\pi + \\alpha",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "any one angle that satisfies the equation" },
          { symbol: "\\(n\\)", meaning: "any integer" },
        ],
      },
      authoredExample: {
        prompt: "Find the general solution of \\(\\sin 3\\theta = -\\dfrac{1}{2}\\).",
        steps: [
          "We have \\(\\sin 3\\theta = -\\dfrac{1}{2}\\). As \\(\\sin\\left(-\\dfrac{\\pi}{6}\\right) = -\\dfrac{1}{2}\\), \\(\\sin 3\\theta = \\sin\\left(-\\dfrac{\\pi}{6}\\right)\\).",
          "The general solution of \\(\\sin\\theta = \\sin\\alpha\\) is \\(\\theta = n\\pi + (-1)^n\\alpha\\), where \\(n \\in Z\\).",
          "\\(\\therefore 3\\theta = n\\pi + (-1)^n\\left(-\\dfrac{\\pi}{6}\\right)\\).",
          "Divide every term by 3: \\(\\theta = \\dfrac{n\\pi}{3} - (-1)^n\\dfrac{\\pi}{18}\\), where \\(n \\in Z\\).",
          "Check with \\(n = 0\\): \\(\\theta = -\\dfrac{\\pi}{18}\\), \\(\\sin 3\\theta = \\sin\\left(-\\dfrac{\\pi}{6}\\right) = -\\dfrac{1}{2}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{n\\pi}{3} - (-1)^n\\dfrac{\\pi}{18}\\), where \\(n \\in Z\\)",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(\\tan^2\\theta = \\dfrac{1}{3}\\).",
        steps: [
          "\\(\\tan^2\\theta = \\dfrac{1}{3} = \\tan^2\\dfrac{\\pi}{6}\\).",
          "\\(\\tan^2\\theta = \\tan^2\\alpha \\Rightarrow \\theta = n\\pi \\pm \\alpha\\).",
        ],
        answer: "\\(\\theta = n\\pi \\pm \\dfrac{\\pi}{6}\\), where \\(n \\in Z\\)",
      },
      practiceSet: [
        { prompt: "Write the general solution of \\(\\cos\\theta = 0\\).", answer: "\\(\\theta = (2n + 1)\\dfrac{\\pi}{2}\\), where \\(n \\in Z\\)" },
        { prompt: "Find the general solution of \\(\\tan 2\\theta = 1\\).", answer: "\\(\\theta = \\dfrac{n\\pi}{2} + \\dfrac{\\pi}{8}\\), where \\(n \\in Z\\)" },
        { prompt: "Does \\(4\\cos\\theta = 5\\) have a solution? Give a reason.", answer: "No. It needs \\(\\cos\\theta = \\dfrac{5}{4}\\), which is more than 1" },
        { prompt: "Find the general solution of \\(\\sin\\theta = -1\\).", answer: "\\(\\theta = n\\pi + (-1)^n\\left(-\\dfrac{\\pi}{2}\\right)\\), which is the same as \\(\\theta = 2n\\pi - \\dfrac{\\pi}{2}\\), where \\(n \\in Z\\)" },
      ],
      pyqExampleId: "0d51bb2c-bdc0-4305-9fd4-ea9ba9c45f2a",
      traps: [
        {
          title: "Using the sine pattern for cosine",
          body: "The \\((-1)^n\\) belongs to sine only. Cosine gives \\(2n\\pi \\pm \\alpha\\) and tangent gives \\(n\\pi + \\alpha\\).",
        },
        {
          title: "Leaving out \"where n ∈ Z\"",
          body: "A general solution without \\(n \\in Z\\) does not say what \\(n\\) is, and the board takes a mark for it.",
        },
        {
          title: "Dividing only part of the answer",
          body: "When the angle is \\(k\\theta\\), divide every term by \\(k\\), the \\(2n\\pi\\) too: \\(3\\theta = 2n\\pi \\pm \\alpha\\) gives \\(\\theta = \\dfrac{2n\\pi}{3} \\pm \\dfrac{\\alpha}{3}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-combine",
      name: "Equations of the form a cos θ + b sin θ = c",
      intuition:
        "A sum like \\(\\cos\\theta - \\sin\\theta\\) is one cosine wave in disguise. Divide by \\(\\sqrt{a^2 + b^2}\\) and the two coefficients become the cosine and sine of a standard angle, so the left side folds into a single \\(\\cos(\\theta \\pm \\beta)\\) or \\(\\sin(\\theta \\pm \\beta)\\). Then one pattern finishes the job.",
      definition:
        "- Step 1: divide both sides by \\(\\sqrt{a^2 + b^2}\\).\n" +
        "- Step 2: write the two coefficients as \\(\\cos\\beta\\) and \\(\\sin\\beta\\) of a standard angle \\(\\beta\\).\n" +
        "- Step 3: fold the left side with \\(\\cos(\\theta + \\beta) = \\cos\\theta\\cos\\beta - \\sin\\theta\\sin\\beta\\) or \\(\\sin(\\theta + \\beta) = \\sin\\theta\\cos\\beta + \\cos\\theta\\sin\\beta\\).\n" +
        "- Step 4: write the right side as the same ratio of a standard angle, use the pattern, and make \\(\\theta\\) the subject.\n" +
        "- Step 5: check one value from each family in the original equation.\n" +
        "- After dividing, if the right side is more than 1 in size, there is no solution.",
      formula: {
        label: "Dividing by the root of the sum of squares",
        latex:
          "a\\cos\\theta + b\\sin\\theta = c \\;\\Rightarrow\\; \\frac{a}{\\sqrt{a^2+b^2}}\\cos\\theta + \\frac{b}{\\sqrt{a^2+b^2}}\\sin\\theta = \\frac{c}{\\sqrt{a^2+b^2}}",
      },
      authoredExample: {
        prompt: "Find the general solution of \\(\\sin\\theta + \\sqrt{3}\\cos\\theta = 1\\).",
        steps: [
          "Here \\(\\sqrt{1^2 + (\\sqrt{3})^2} = 2\\). Dividing by 2: \\(\\dfrac{1}{2}\\sin\\theta + \\dfrac{\\sqrt{3}}{2}\\cos\\theta = \\dfrac{1}{2}\\).",
          "\\(\\therefore \\sin\\theta\\cos\\dfrac{\\pi}{3} + \\cos\\theta\\sin\\dfrac{\\pi}{3} = \\sin\\dfrac{\\pi}{6}\\)",
          "\\(\\therefore \\sin\\left(\\theta + \\dfrac{\\pi}{3}\\right) = \\sin\\dfrac{\\pi}{6}\\)",
          "\\(\\therefore \\theta + \\dfrac{\\pi}{3} = n\\pi + (-1)^n\\dfrac{\\pi}{6}\\), so \\(\\theta = n\\pi + (-1)^n\\dfrac{\\pi}{6} - \\dfrac{\\pi}{3}\\).",
          "Check: \\(n = 0\\) gives \\(\\theta = -\\dfrac{\\pi}{6}\\): \\(-\\dfrac{1}{2} + \\sqrt{3} \\times \\dfrac{\\sqrt{3}}{2} = 1\\). \\(n = 1\\) gives \\(\\theta = \\dfrac{\\pi}{2}\\): \\(1 + 0 = 1\\).",
        ],
        answer: "\\(\\theta = n\\pi + (-1)^n\\dfrac{\\pi}{6} - \\dfrac{\\pi}{3}\\), where \\(n \\in Z\\)",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(\\cos\\theta + \\sin\\theta = \\sqrt{2}\\).",
        steps: [
          "Divide by \\(\\sqrt{2}\\): \\(\\cos\\theta\\cos\\dfrac{\\pi}{4} + \\sin\\theta\\sin\\dfrac{\\pi}{4} = 1\\), so \\(\\cos\\left(\\theta - \\dfrac{\\pi}{4}\\right) = 1 = \\cos 0\\).",
          "\\(\\theta - \\dfrac{\\pi}{4} = 2n\\pi \\pm 0\\).",
        ],
        answer: "\\(\\theta = 2n\\pi + \\dfrac{\\pi}{4}\\), where \\(n \\in Z\\)",
      },
      practiceSet: [
        { prompt: "Write \\(\\dfrac{1}{\\sqrt{2}}\\cos\\theta - \\dfrac{1}{\\sqrt{2}}\\sin\\theta\\) as a single cosine.", answer: "\\(\\cos\\left(\\theta + \\dfrac{\\pi}{4}\\right)\\)" },
        { prompt: "Does \\(\\sin\\theta + \\cos\\theta = 2\\) have a solution? Give a reason.", answer: "No. Dividing by \\(\\sqrt{2}\\) gives \\(\\sin\\left(\\theta + \\dfrac{\\pi}{4}\\right) = \\sqrt{2}\\), which is more than 1" },
        { prompt: "Find the general solution of \\(\\sqrt{3}\\sin\\theta - \\cos\\theta = 2\\).", answer: "\\(\\theta = 2n\\pi + \\dfrac{2\\pi}{3}\\), where \\(n \\in Z\\)", method: "Divide by 2: \\(\\sin\\left(\\theta - \\dfrac{\\pi}{6}\\right) = 1\\)." },
      ],
      pyqExampleId: "41f0274a-3c18-4f4a-874a-b4aa4753d397",
      traps: [
        {
          title: "Dividing by the wrong number",
          body: "Divide by \\(\\sqrt{a^2 + b^2}\\), not by \\(a + b\\). Only then are the coefficients the cosine and sine of one angle.",
        },
        {
          title: "A sign slip inside the bracket",
          body: "\\(\\cos\\theta\\cos\\beta - \\sin\\theta\\sin\\beta\\) is \\(\\cos(\\theta + \\beta)\\), with a plus. A wrong sign gives a family that fails the equation, so put one value from each family back and check.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-factorise",
      name: "Solving by factorising: sums of ratios, identities and quadratics",
      intuition:
        "When an equation has several ratios or several angles, turn it into a product equal to zero. Then each factor is a simple equation of its own. Sums of sines or cosines become products with the sum and difference formulae; squares become a quadratic in one ratio.",
      definition:
        "- Bring every term to one side and factorise; each factor equal to zero gives its own family of solutions.\n" +
        "- **Three angles in A.P.** (like \\(x, 3x, 5x\\)): pair the first and last with \\(\\sin C + \\sin D = 2\\sin\\dfrac{C+D}{2}\\cos\\dfrac{C-D}{2}\\). The middle term then comes out as a common factor.\n" +
        "- **Two different ratios:** change one, for example \\(\\sin 3\\theta = \\cos\\left(\\dfrac{\\pi}{2} - 3\\theta\\right)\\), then use the cosine pattern.\n" +
        "- **Squares:** use \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) or \\(\\sec^2\\theta = 1 + \\tan^2\\theta\\) to get a quadratic in one ratio, then factorise.\n" +
        "- Never cancel a factor such as \\(\\sin\\theta\\) or \\(\\tan\\theta\\) from both sides. Set it equal to zero instead.\n" +
        "- Reject a value that is impossible (\\(\\cos\\theta = 2\\)) or where the equation is not defined.",
      formula: {
        label: "Sum and difference into product",
        latex:
          "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2} \\qquad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2} \\qquad \\cos C - \\cos D = -2\\sin\\frac{C+D}{2}\\sin\\frac{C-D}{2}",
      },
      authoredExample: {
        prompt: "Find the general solution of \\(\\cos\\theta + \\cos 3\\theta + \\cos 5\\theta = 0\\).",
        steps: [
          "Pair the first and last terms: \\(\\cos\\theta + \\cos 5\\theta = 2\\cos 3\\theta\\cos 2\\theta\\).",
          "\\(\\therefore 2\\cos 3\\theta\\cos 2\\theta + \\cos 3\\theta = 0\\), so \\(\\cos 3\\theta\\,(2\\cos 2\\theta + 1) = 0\\).",
          "\\(\\therefore \\cos 3\\theta = 0\\) or \\(\\cos 2\\theta = -\\dfrac{1}{2} = \\cos\\dfrac{2\\pi}{3}\\).",
          "\\(\\cos 3\\theta = 0\\): \\(3\\theta = (2n + 1)\\dfrac{\\pi}{2}\\), so \\(\\theta = (2n + 1)\\dfrac{\\pi}{6}\\).",
          "\\(\\cos 2\\theta = \\cos\\dfrac{2\\pi}{3}\\): \\(2\\theta = 2n\\pi \\pm \\dfrac{2\\pi}{3}\\), so \\(\\theta = n\\pi \\pm \\dfrac{\\pi}{3}\\).",
          "Check \\(\\theta = \\dfrac{\\pi}{6}\\): \\(\\dfrac{\\sqrt{3}}{2} + 0 - \\dfrac{\\sqrt{3}}{2} = 0\\).",
        ],
        answer: "\\(\\theta = (2n + 1)\\dfrac{\\pi}{6}\\) or \\(\\theta = n\\pi \\pm \\dfrac{\\pi}{3}\\), where \\(n \\in Z\\)",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(2\\sin^2\\theta + 3\\cos\\theta = 3\\).",
        steps: [
          "\\(2(1 - \\cos^2\\theta) + 3\\cos\\theta - 3 = 0\\), so \\(2\\cos^2\\theta - 3\\cos\\theta + 1 = 0\\).",
          "\\((2\\cos\\theta - 1)(\\cos\\theta - 1) = 0\\), so \\(\\cos\\theta = \\dfrac{1}{2}\\) or \\(\\cos\\theta = 1\\).",
          "\\(\\cos\\theta = \\cos\\dfrac{\\pi}{3}\\) gives \\(2n\\pi \\pm \\dfrac{\\pi}{3}\\); \\(\\cos\\theta = 1\\) gives \\(2n\\pi\\).",
        ],
        answer: "\\(\\theta = 2n\\pi\\) or \\(\\theta = 2n\\pi \\pm \\dfrac{\\pi}{3}\\), where \\(n \\in Z\\)",
      },
      practiceSet: [
        { prompt: "Find the general solution of \\(\\sin 2\\theta = \\sin\\theta\\).", answer: "\\(\\theta = n\\pi\\) or \\(\\theta = 2n\\pi \\pm \\dfrac{\\pi}{3}\\), where \\(n \\in Z\\)", method: "\\(\\sin\\theta(2\\cos\\theta - 1) = 0\\)." },
        { prompt: "Why must you not cancel \\(\\tan\\theta\\) from both sides of \\(\\tan^2\\theta = \\tan\\theta\\)?", answer: "Cancelling loses the solutions with \\(\\tan\\theta = 0\\), that is \\(\\theta = n\\pi\\)" },
        { prompt: "Find the general solution of \\(\\cos 2\\theta = \\cos\\theta\\).", answer: "\\(\\theta = \\dfrac{2n\\pi}{3}\\), where \\(n \\in Z\\)", method: "\\(2\\theta = 2n\\pi \\pm \\theta\\) gives \\(2n\\pi\\) or \\(\\dfrac{2n\\pi}{3}\\); the first is inside the second." },
      ],
      pyqExampleId: "952d96e5-71a7-4ecb-93bc-24d215b8a22a",
      traps: [
        {
          title: "Cancelling a common factor",
          body: "Dividing both sides by \\(\\sin\\theta\\) throws away \\(\\theta = n\\pi\\). Take the factor to one side and set it equal to zero.",
        },
        {
          title: "Pairing the wrong two terms",
          body: "Pair the two angles whose half-sum is the middle angle. Then the middle term is a common factor; any other pairing leaves nothing to factor out.",
        },
        {
          title: "Keeping an impossible factor",
          body: "A quadratic can give \\(\\cos\\theta = -\\dfrac{5}{4}\\) or \\(\\sin\\theta = 2\\). Reject it in writing, with the reason that sine and cosine lie between \\(-1\\) and 1.",
        },
      ],
    },
  ],
};
