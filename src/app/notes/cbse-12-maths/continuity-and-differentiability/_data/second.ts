import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_CD_SECOND_NOTE: SubtopicNote = {
  subtopicName: "Second Order Derivatives",
  title: "Second Order Derivatives",
  oneLineDefinition:
    "Differentiating a function twice, proving a relation between a function and its first and second derivatives, and clearing a root or a fraction before the second differentiation.",
  whyItMatters:
    "42 questions, seventeen of them from board papers from 2023 to 2026. Most are proofs: y(d²y/dx²) + (dy/dx)² = 0 for y = √(ax + b) and d²y/dx² = cos x/(1 − sin x)² for y = tan x + sec x (2023), x²y″ + xy′ = 2 for y = (log x)² and (x² + 1)²y″ + 2x(x² + 1)y′ = 2 for y = (tan⁻¹x)² (2024), x(x + 1)²y₂ + (x + 1)²y₁ = 2 (2025) and d²y/dx² + u²y = 0 (2026). There are also MCQs on y = A cos 4t + B sin 4t (2023) and on y = sin⁻¹x (2024, 2025), a case study value f″(1) (2023) and parametric second derivatives (2024, 2026). The textbook adds Examples 35 to 38, Exercise 5.7 and Miscellaneous Exercise Q15, Q17, Q18 and Q22.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmcd-second-derivative",
      name: "Finding the second derivative",
      intuition:
        "The second derivative is the derivative of the derivative. Find dy/dx, tidy it, and differentiate once more with the same rules.",
      definition:
        "- \\(\\dfrac{d^2y}{dx^2} = \\dfrac{d}{dx}\\left(\\dfrac{dy}{dx}\\right)\\), also written \\(f''(x)\\), \\(D^2y\\), \\(y''\\) or \\(y_2\\).\n" +
        "- Simplify \\(\\dfrac{dy}{dx}\\) before differentiating again; a product needs the product rule a second time (NCERT Example 35).\n" +
        "- For a value at a point, find \\(f''(x)\\) first, then substitute.\n" +
        "- **In terms of y:** for \\(y = \\sin^{-1}x\\), \\(\\dfrac{dy}{dx} = \\sec y\\), so \\(\\dfrac{d^2y}{dx^2} = \\dfrac{d}{dy}(\\sec y) \\cdot \\dfrac{dy}{dx} = \\sec^2 y\\tan y\\).\n" +
        "- For a parametric pair, use \\(\\dfrac{d^2y}{dx^2} = \\dfrac{d}{dt}\\left(\\dfrac{dy}{dx}\\right)\\dfrac{dt}{dx}\\), as on the parametric page.",
      formula: {
        label: "Second order derivative",
        latex: "\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{d^2y}{dx^2}\\) if \\(y = x^2e^x\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = 2xe^x + x^2e^x = (x^2 + 2x)e^x\\).",
          "\\(\\dfrac{d^2y}{dx^2} = (2x + 2)e^x + (x^2 + 2x)e^x\\).",
          "\\(\\dfrac{d^2y}{dx^2} = (x^2 + 4x + 2)e^x\\).",
        ],
        answer: "\\((x^2 + 4x + 2)e^x\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{d^2y}{dx^2}\\) if \\(y = \\log(1 + x^2)\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{2x}{1 + x^2}\\).",
          "Quotient rule: \\(\\dfrac{d^2y}{dx^2} = \\dfrac{2(1 + x^2) - 2x \\cdot 2x}{(1 + x^2)^2} = \\dfrac{2(1 - x^2)}{(1 + x^2)^2}\\).",
        ],
        answer: "\\(\\dfrac{2(1 - x^2)}{(1 + x^2)^2}\\)",
      },
      practiceSet: [
        { prompt: "If \\(y = \\sin 3x\\), find \\(y''\\).", answer: "\\(-9\\sin 3x\\)" },
        { prompt: "If \\(f(x) = x^5\\), find \\(f''(1)\\).", answer: "20" },
        { prompt: "If \\(y = \\dfrac{1}{x}\\), find \\(\\dfrac{d^2y}{dx^2}\\).", answer: "\\(\\dfrac{2}{x^3}\\)" },
      ],
      pyqExampleId: "aac884a1-ff73-4302-9c34-bf8301478988",
      traps: [
        {
          title: "Squaring is not differentiating twice",
          body: "\\(\\dfrac{d^2y}{dx^2}\\) is not \\(\\left(\\dfrac{dy}{dx}\\right)^2\\). For \\(y = x^3\\), \\(y'' = 6x\\), but \\((y')^2 = 9x^4\\).",
        },
        {
          title: "Substituting too early",
          body: "Find \\(f''(x)\\) as a function before you put in the point. A number put in early has derivative 0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-second-identity",
      name: "Proving a relation between y and its derivatives",
      intuition:
        "Functions such as \\(A\\sin x + B\\cos x\\) or \\(Ae^{2x} + Be^{3x}\\) satisfy a fixed relation whatever the constants are. Differentiate twice and look for the original y inside the result.",
      definition:
        "- Find \\(\\dfrac{dy}{dx}\\) and \\(\\dfrac{d^2y}{dx^2}\\).\n" +
        "- Group the terms of \\(\\dfrac{d^2y}{dx^2}\\) so that y appears: for \\(y = A\\sin x + B\\cos x\\), \\(\\dfrac{d^2y}{dx^2} = -(A\\sin x + B\\cos x) = -y\\) (NCERT Example 36).\n" +
        "- Or substitute y, \\(\\dfrac{dy}{dx}\\) and \\(\\dfrac{d^2y}{dx^2}\\) into the left side and show it simplifies to the right side (NCERT Example 37).\n" +
        "- The final relation must not contain the arbitrary constants A and B.",
      formula: {
        label: "NCERT Example 36",
        latex: "y = A\\sin x + B\\cos x \\Rightarrow \\frac{d^2y}{dx^2} + y = 0",
      },
      authoredExample: {
        prompt: "If \\(y = Ae^{2x} + Be^{-3x}\\), show that \\(\\dfrac{d^2y}{dx^2} + \\dfrac{dy}{dx} - 6y = 0\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = 2Ae^{2x} - 3Be^{-3x}\\).",
          "\\(\\dfrac{d^2y}{dx^2} = 4Ae^{2x} + 9Be^{-3x}\\).",
          "Left side \\(= (4 + 2 - 6)Ae^{2x} + (9 - 3 - 6)Be^{-3x}\\).",
          "\\(= 0\\), as required.",
        ],
        answer: "Shown: \\(\\dfrac{d^2y}{dx^2} + \\dfrac{dy}{dx} - 6y = 0\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = (A + Bx)e^{2x}\\), show that \\(\\dfrac{d^2y}{dx^2} - 4\\dfrac{dy}{dx} + 4y = 0\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = Be^{2x} + 2(A + Bx)e^{2x} = (2A + B + 2Bx)e^{2x}\\).",
          "\\(\\dfrac{d^2y}{dx^2} = 2Be^{2x} + 2(2A + B + 2Bx)e^{2x} = (4A + 4B + 4Bx)e^{2x}\\).",
          "\\(\\dfrac{d^2y}{dx^2} - 4\\dfrac{dy}{dx} + 4y = [(4A + 4B + 4Bx) - 4(2A + B + 2Bx) + 4(A + Bx)]e^{2x} = 0\\).",
        ],
        answer: "Shown",
      },
      practiceSet: [
        { prompt: "If \\(y = Ae^{4x}\\), show that \\(y'' = 16y\\).", answer: "\\(y'' = 16Ae^{4x} = 16y\\)" },
        { prompt: "If \\(y = ae^x + be^{-x}\\), find \\(y'' - y\\).", answer: "0" },
        { prompt: "If \\(y = e^{5x}\\) satisfies \\(\\dfrac{d^2y}{dx^2} - ky = 0\\), find k.", answer: "\\(k = 25\\)" },
      ],
      pyqExampleId: "161b83c4-c9b4-4033-8e73-4c451a064e1a",
      traps: [
        {
          title: "Constants left in the answer",
          body: "A relation like \\(y'' + y = 0\\) holds for every A and B. If A or B is still in your last line, regroup the terms until y appears.",
        },
        {
          title: "The sign of k",
          body: "If \\(\\dfrac{d^2y}{dx^2} = -9y\\) and the question writes \\(\\dfrac{d^2y}{dx^2} - ky = 0\\), then \\(k = -9\\), not 9. Compare term by term with the printed form.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-clear-first",
      name: "Clear the root or fraction before differentiating again",
      intuition:
        "For \\(y = \\sin^{-1}x\\) the first derivative has a square root in it. Multiply it across, or square, before the second differentiation; then only the product rule is needed and the inverse function disappears.",
      definition:
        "- After the first derivative, multiply out the denominator: \\(\\dfrac{dy}{dx} = \\dfrac{1}{\\sqrt{1 - x^2}}\\) becomes \\(\\sqrt{1 - x^2}\\dfrac{dy}{dx} = 1\\), or, squared, \\((1 - x^2)\\left(\\dfrac{dy}{dx}\\right)^2 = 1\\) (NCERT Example 38).\n" +
        "- Differentiate this relation by the product rule. A factor \\(2\\dfrac{dy}{dx}\\) common to every term may be cancelled where \\(\\dfrac{dy}{dx} \\ne 0\\).\n" +
        "- Squaring first also removes a root in y itself: \\(y = \\sqrt{ax + b}\\) gives \\(y^2 = ax + b\\).\n" +
        "- Multiply through at the end to match the form the question asks for.",
      formula: {
        label: "NCERT Example 38",
        latex: "y = \\sin^{-1}x \\Rightarrow (1 - x^2)\\frac{d^2y}{dx^2} - x\\frac{dy}{dx} = 0",
      },
      authoredExample: {
        prompt: "If \\(y = (\\sin^{-1}x)^2\\), show that \\((1 - x^2)\\dfrac{d^2y}{dx^2} - x\\dfrac{dy}{dx} = 2\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{2\\sin^{-1}x}{\\sqrt{1 - x^2}}\\), so \\(\\sqrt{1 - x^2}\\dfrac{dy}{dx} = 2\\sin^{-1}x\\).",
          "Square: \\((1 - x^2)\\left(\\dfrac{dy}{dx}\\right)^2 = 4(\\sin^{-1}x)^2 = 4y\\).",
          "Differentiate: \\((1 - x^2) \\cdot 2\\dfrac{dy}{dx}\\dfrac{d^2y}{dx^2} - 2x\\left(\\dfrac{dy}{dx}\\right)^2 = 4\\dfrac{dy}{dx}\\).",
          "Divide by \\(2\\dfrac{dy}{dx}\\): \\((1 - x^2)\\dfrac{d^2y}{dx^2} - x\\dfrac{dy}{dx} = 2\\).",
        ],
        answer: "Shown: \\((1 - x^2)\\dfrac{d^2y}{dx^2} - x\\dfrac{dy}{dx} = 2\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = \\log\\left(x + \\sqrt{x^2 + 1}\\right)\\), show that \\((x^2 + 1)\\dfrac{d^2y}{dx^2} + x\\dfrac{dy}{dx} = 0\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{1}{x + \\sqrt{x^2 + 1}}\\left(1 + \\dfrac{x}{\\sqrt{x^2 + 1}}\\right) = \\dfrac{1}{\\sqrt{x^2 + 1}}\\).",
          "So \\(\\sqrt{x^2 + 1}\\dfrac{dy}{dx} = 1\\). Square: \\((x^2 + 1)\\left(\\dfrac{dy}{dx}\\right)^2 = 1\\).",
          "Differentiate: \\((x^2 + 1) \\cdot 2\\dfrac{dy}{dx}\\dfrac{d^2y}{dx^2} + 2x\\left(\\dfrac{dy}{dx}\\right)^2 = 0\\).",
          "Divide by \\(2\\dfrac{dy}{dx}\\): \\((x^2 + 1)\\dfrac{d^2y}{dx^2} + x\\dfrac{dy}{dx} = 0\\).",
        ],
        answer: "Shown",
      },
      practiceSet: [
        {
          prompt: "If \\(y = e^{\\tan^{-1}x}\\), show that \\((1 + x^2)y'' + (2x - 1)y' = 0\\).",
          answer: "Shown",
          method: "\\((1 + x^2)y' = y\\); differentiate both sides",
        },
        { prompt: "If \\(y = \\log x\\), find \\(xy'' + y'\\).", answer: "0" },
        {
          prompt: "If \\(y = \\sqrt{x}\\), show that \\(2yy'' + 2(y')^2 = 0\\).",
          answer: "Shown",
          method: "\\(y^2 = x\\), so \\(2yy' = 1\\); differentiate again",
        },
      ],
      pyqExampleId: "8d980f1a-d6ab-495e-9696-afec5842c360",
      traps: [
        {
          title: "Differentiating the root again",
          body: "Differentiating \\(\\dfrac{1}{\\sqrt{1 - x^2}}\\) by the chain rule gives \\(\\dfrac{x}{(1 - x^2)^{3/2}}\\), which then has to be rearranged into the required form. Multiplying out first reaches it in one step.",
        },
        {
          title: "Cancelling a factor that can be zero",
          body: "When you divide by \\(2\\dfrac{dy}{dx}\\), write that \\(\\dfrac{dy}{dx} \\ne 0\\). It is one line and it completes the argument.",
        },
      ],
    },
  ],
};
