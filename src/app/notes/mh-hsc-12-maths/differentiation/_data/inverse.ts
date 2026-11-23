import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DF_INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Derivatives of Inverse Functions",
  title: "Derivatives of Inverse Functions",
  oneLineDefinition:
    "If y = f(x) has an inverse x = f⁻¹(y), the derivative of the inverse is the reciprocal of the derivative of f: dx/dy = 1/(dy/dx), where dy/dx is not zero.",
  whyItMatters:
    "27 questions, two of them from board papers: the proof that dx/dy = 1/(dy/dx), followed by the derivative of tan⁻¹ x (2017), and an MCQ on the derivative of the inverse of x⁵ + 2x − 3 at a point (2022). The textbook rows are Exercise 1.2 Q.1 to Q.4, the solved examples of section 1.2.3 and one MCQ of Miscellaneous Exercise 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdf-inverserule",
      name: "The derivative of an inverse function",
      intuition:
        "If f stretches every small change in x by a factor of 2, then going backwards the inverse shrinks every small change in y by a factor of 2. The two rates are reciprocals of each other. That is the whole theorem, and the board asks for its proof.",
      definition:
        "- **Theorem:** if \\(y = f(x)\\) is a differentiable function of \\(x\\) such that \\(\\dfrac{dy}{dx} \\neq 0\\) and \\(x = f^{-1}(y)\\) exists, then \\(x\\) is a differentiable function of \\(y\\) and \\(\\dfrac{dx}{dy} = \\dfrac{1}{\\dfrac{dy}{dx}}\\).\n" +
        "- **Proof:** let \\(\\delta x\\) be a small increment in \\(x\\) and \\(\\delta y\\) the corresponding increment in \\(y\\), with \\(\\delta x \\neq 0\\) and \\(\\delta y \\neq 0\\).\n" +
        "- \\(\\dfrac{\\delta x}{\\delta y} \\cdot \\dfrac{\\delta y}{\\delta x} = 1\\), so \\(\\dfrac{\\delta x}{\\delta y} = \\dfrac{1}{\\dfrac{\\delta y}{\\delta x}}\\).\n" +
        "- Take the limit as \\(\\delta x \\to 0\\). Then \\(\\delta y \\to 0\\), because \\(f\\) is differentiable and hence continuous ... (I)\n" +
        "- Since \\(y = f(x)\\) is differentiable, \\(\\displaystyle\\lim_{\\delta x \\to 0}\\dfrac{\\delta y}{\\delta x} = \\dfrac{dy}{dx}\\), and \\(\\dfrac{dy}{dx} \\neq 0\\) ... (II)\n" +
        "- From (I) and (II), \\(\\displaystyle\\lim_{\\delta y \\to 0}\\dfrac{\\delta x}{\\delta y} = \\dfrac{1}{\\dfrac{dy}{dx}}\\), which exists and is finite ... (III)\n" +
        "- Hence \\(x\\) is a differentiable function of \\(y\\) and \\(\\dfrac{dx}{dy} = \\dfrac{1}{\\dfrac{dy}{dx}}\\).",
      formula: {
        label: "Derivative of an inverse function",
        latex: "\\frac{dx}{dy} = \\frac{1}{\\dfrac{dy}{dx}}, \\qquad \\frac{dy}{dx} \\neq 0",
      },
      authoredExample: {
        prompt: "Using the derivative of the inverse function, find \\(\\dfrac{dy}{dx}\\) if \\(y = \\sqrt{x + 5}\\).",
        steps: [
          "\\(y = \\sqrt{x + 5}\\), so \\(y^2 = x + 5\\) and the inverse function is \\(x = y^2 - 5\\).",
          "Differentiate with respect to \\(y\\): \\(\\dfrac{dx}{dy} = 2y\\).",
          "By the rule for inverse functions, \\(\\dfrac{dy}{dx} = \\dfrac{1}{\\dfrac{dx}{dy}} = \\dfrac{1}{2y}\\), for \\(y \\neq 0\\).",
          "Put back \\(y = \\sqrt{x + 5}\\): \\(\\dfrac{dy}{dx} = \\dfrac{1}{2\\sqrt{x + 5}}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{1}{2\\sqrt{x + 5}}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = x^3 + 2x\\), find \\(\\dfrac{dx}{dy}\\).",
        steps: ["\\(\\dfrac{dy}{dx} = 3x^2 + 2 \\neq 0\\), so \\(\\dfrac{dx}{dy} = \\dfrac{1}{3x^2 + 2}\\)."],
        answer: "\\(\\dfrac{dx}{dy} = \\dfrac{1}{3x^2 + 2}\\)",
      },
      practiceSet: [
        {
          prompt: "Using the inverse function \\(x = \\log y\\), find \\(\\dfrac{dy}{dx}\\) for \\(y = e^x\\).",
          answer: "\\(\\dfrac{dx}{dy} = \\dfrac{1}{y}\\), so \\(\\dfrac{dy}{dx} = y = e^x\\)",
        },
        {
          prompt: "Find \\(\\dfrac{dx}{dy}\\) if \\(y = x + \\sin x\\).",
          answer: "\\(\\dfrac{1}{1 + \\cos x}\\), where \\(\\cos x \\neq -1\\)",
        },
      ],
      pyqExampleId: "7d51a33e-2545-4e22-bfa8-19d4e6b96a2a",
      traps: [
        {
          title: "Leaving the answer in terms of y",
          body: "When the question asks for \\(\\dfrac{dy}{dx}\\), the final line must be in terms of \\(x\\). Put back the expression for \\(y\\), or the last step loses its mark.",
        },
        {
          title: "Leaving out the condition in the theorem",
          body: "The reciprocal exists only where \\(\\dfrac{dy}{dx} \\neq 0\\). Write this condition in the statement and use it in the proof; the board's wording includes it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-inversevalue",
      name: "The derivative of an inverse at a point",
      intuition:
        "To find the slope of the inverse at a number b, you need the x at which f takes the value b. Solve f(a) = b, then the answer is 1 divided by f′(a). The usual mistake is to put b straight into f′.",
      definition:
        "- If \\(g = f^{-1}\\), then \\(g'(y) = \\dfrac{1}{f'(x)}\\), where \\(y = f(x)\\).\n" +
        "- To find \\(g'(b)\\): solve \\(f(a) = b\\) for \\(a\\), then \\(g'(b) = \\dfrac{1}{f'(a)}\\).\n" +
        "- In general \\(g'(x) = \\dfrac{1}{f'[g(x)]}\\).\n" +
        "- If \\(f'(x) > 0\\) for every \\(x\\), then \\(f\\) is increasing, so it is one-one and its inverse exists.",
      formula: {
        label: "Derivative of the inverse at a point",
        latex: "(f^{-1})'(b) = \\frac{1}{f'(a)}, \\quad \\text{where } f(a) = b",
      },
      authoredExample: {
        prompt: "If \\(f(x) = x^3 + 3x + 1\\), find \\((f^{-1})'(5)\\).",
        steps: [
          "\\(f'(x) = 3x^2 + 3 > 0\\) for every \\(x\\), so \\(f\\) is one-one and \\(f^{-1}\\) exists.",
          "Find \\(a\\) with \\(f(a) = 5\\): \\(a^3 + 3a + 1 = 5\\), that is \\(a^3 + 3a - 4 = 0\\), and \\(a = 1\\) works since \\(1 + 3 - 4 = 0\\).",
          "\\(f'(1) = 3(1)^2 + 3 = 6\\).",
          "\\((f^{-1})'(5) = \\dfrac{1}{f'(1)} = \\dfrac{1}{6}\\).",
        ],
        answer: "\\((f^{-1})'(5) = \\dfrac{1}{6}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(f(x) = 2x + \\sin x\\), find \\((f^{-1})'(0)\\).",
        steps: ["\\(f(0) = 0\\), and \\(f'(x) = 2 + \\cos x\\), so \\(f'(0) = 3\\)."],
        answer: "\\((f^{-1})'(0) = \\dfrac{1}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(f(x) = 4x + \\cos x\\), find \\((f^{-1})'(1)\\).",
          answer: "\\(f(0) = 1\\) and \\(f'(0) = 4\\), so \\((f^{-1})'(1) = \\dfrac{1}{4}\\)",
        },
        {
          prompt: "\\(g\\) is the inverse of \\(f\\) and \\(f'(x) = 1 + x^2\\). Write \\(g'(x)\\) in terms of \\(g(x)\\).",
          answer: "\\(g'(x) = \\dfrac{1}{1 + [g(x)]^2}\\)",
        },
      ],
      pyqExampleId: "c0ac6e19-ac0b-423c-a668-4aa54132309d",
      traps: [
        {
          title: "Putting b into f′",
          body: "\\((f^{-1})'(b)\\) is not \\(\\dfrac{1}{f'(b)}\\). First find the \\(a\\) with \\(f(a) = b\\), then use \\(f'(a)\\).",
        },
        {
          title: "Not saying why the inverse exists",
          body: "One line such as '\\(f'(x) > 0\\) for all \\(x\\), so \\(f\\) is one-one' shows the inverse exists and completes a written answer.",
        },
      ],
    },
  ],
};
