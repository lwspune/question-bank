import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DF_HIGHER_NOTE: SubtopicNote = {
  subtopicName: "Higher Order Derivatives",
  title: "Higher Order Derivatives",
  oneLineDefinition:
    "Differentiating again and again: the second derivative is the derivative of dy/dx, and the nth derivative of a standard function follows a pattern you can write down.",
  whyItMatters:
    "65 questions, seven of them from board papers: the second derivative of x log x (2020) and of a cubic polynomial (2026), the nth derivative of log x (2025), and 'show that' relations for (tan⁻¹ x)² (2015), e^(m tan⁻¹ x) (2022), cos(m cos⁻¹ x) (2023) and sin⁻¹ x (2024). The textbook rows are Exercise 1.5, the solved examples of section 1.5 and questions from both parts of Miscellaneous Exercise 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdf-second",
      name: "The second derivative",
      intuition:
        "dy/dx is itself a function of x, so you can differentiate it again. The result, the second derivative, tells how fast the slope is changing. Work in two clear stages: find and simplify dy/dx, then differentiate that.",
      definition:
        "- \\(\\dfrac{d^2y}{dx^2} = \\dfrac{d}{dx}\\left(\\dfrac{dy}{dx}\\right)\\), also written \\(y_2\\), \\(y''\\) or \\(f''(x)\\); and \\(y_1 = \\dfrac{dy}{dx}\\).\n" +
        "- In the same way \\(\\dfrac{d^3y}{dx^3} = \\dfrac{d}{dx}\\left(\\dfrac{d^2y}{dx^2}\\right)\\), and so on.\n" +
        "- Simplify \\(\\dfrac{dy}{dx}\\) before differentiating again.\n" +
        "- If \\(f(x)\\) is a polynomial of degree \\(n\\), its \\(n\\)th derivative is a constant and all later derivatives are zero.",
      formula: {
        label: "Second derivative",
        latex: "\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{d^2y}{dx^2}\\) if \\(y = x\\sin x\\).",
        steps: [
          "Product rule: \\(\\dfrac{dy}{dx} = x\\cos x + \\sin x\\).",
          "Differentiate again: \\(\\dfrac{d^2y}{dx^2} = (x(-\\sin x) + \\cos x) + \\cos x\\).",
          "\\(\\dfrac{d^2y}{dx^2} = 2\\cos x - x\\sin x\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} = 2\\cos x - x\\sin x\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{d^2y}{dx^2}\\) if \\(y = e^{3x} + x^4\\).",
        steps: ["\\(\\dfrac{dy}{dx} = 3e^{3x} + 4x^3\\)."],
        answer: "\\(\\dfrac{d^2y}{dx^2} = 9e^{3x} + 12x^2\\)",
      },
      practiceSet: [
        { prompt: "Find the third derivative of \\(y = x^4 - 2x^3\\).", answer: "\\(24x - 12\\)" },
        { prompt: "Find \\(\\dfrac{d^2y}{dx^2}\\) if \\(y = \\tan x\\).", answer: "\\(2\\sec^2 x\\tan x\\)" },
      ],
      pyqExampleId: "4ff5cd7f-0c4f-4726-bd54-d9ab68c2101e",
      traps: [
        {
          title: "Differentiating an untidy first derivative",
          body: "Simplify \\(\\dfrac{dy}{dx}\\) before the second step. Differentiating a long unsimplified expression doubles the work and the chances of a sign slip.",
        },
        {
          title: "Forgetting the product rule the second time",
          body: "If \\(\\dfrac{dy}{dx}\\) contains a product such as \\(x\\cos x\\), the second derivative needs the product rule again. Differentiating each factor on its own is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-secondparam",
      name: "Second derivative of parametric and implicit functions",
      intuition:
        "For parametric functions the second derivative is not the ratio of the two second derivatives with respect to t. Find dy/dx in terms of t, differentiate that with respect to t, and then divide by dx/dt, because you are differentiating with respect to x.",
      definition:
        "- Parametric: \\(\\dfrac{d^2y}{dx^2} = \\dfrac{d}{dx}\\left(\\dfrac{dy}{dx}\\right) = \\dfrac{d}{dt}\\left(\\dfrac{dy}{dx}\\right) \\cdot \\dfrac{dt}{dx}\\).\n" +
        "- So: find \\(\\dfrac{dy}{dx}\\) in \\(t\\); differentiate it with respect to \\(t\\); divide by \\(\\dfrac{dx}{dt}\\).\n" +
        "- Implicit: differentiate the expression for \\(\\dfrac{dy}{dx}\\) again, replace \\(\\dfrac{dy}{dx}\\) by its value, and use the given relation to simplify.\n" +
        "- **Warning:** \\(\\dfrac{d^2y}{dx^2}\\) is not \\(\\dfrac{d^2y/dt^2}{d^2x/dt^2}\\).",
      formula: {
        label: "Parametric second derivative",
        latex: "\\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\div \\frac{dx}{dt}",
      },
      authoredExample: {
        prompt: "If \\(x = a\\cos\\theta\\) and \\(y = a\\sin\\theta\\), find \\(\\dfrac{d^2y}{dx^2}\\).",
        steps: [
          "\\(\\dfrac{dx}{d\\theta} = -a\\sin\\theta\\), \\(\\dfrac{dy}{d\\theta} = a\\cos\\theta\\), so \\(\\dfrac{dy}{dx} = \\dfrac{a\\cos\\theta}{-a\\sin\\theta} = -\\cot\\theta\\).",
          "Differentiate with respect to \\(\\theta\\): \\(\\dfrac{d}{d\\theta}(-\\cot\\theta) = \\operatorname{cosec}^2\\theta\\).",
          "Divide by \\(\\dfrac{dx}{d\\theta}\\): \\(\\dfrac{d^2y}{dx^2} = \\dfrac{\\operatorname{cosec}^2\\theta}{-a\\sin\\theta}\\).",
          "\\(\\dfrac{d^2y}{dx^2} = -\\dfrac{1}{a}\\operatorname{cosec}^3\\theta\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} = -\\dfrac{1}{a}\\operatorname{cosec}^3\\theta\\)",
      },
      selfCheckExample: {
        prompt: "If \\(x^2 + y^2 = 4\\), find \\(\\dfrac{d^2y}{dx^2}\\) in terms of \\(y\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\), so \\(\\dfrac{d^2y}{dx^2} = -\\dfrac{y - x\\frac{dy}{dx}}{y^2} = -\\dfrac{y + \\frac{x^2}{y}}{y^2} = -\\dfrac{x^2 + y^2}{y^3}\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} = -\\dfrac{4}{y^3}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(x = t^2\\) and \\(y = t^3\\), find \\(\\dfrac{d^2y}{dx^2}\\).",
          answer: "\\(\\dfrac{dy}{dx} = \\dfrac{3t}{2}\\); its \\(t\\)-derivative \\(\\dfrac{3}{2}\\) divided by \\(2t\\) gives \\(\\dfrac{3}{4t}\\)",
        },
        {
          prompt: "If \\(x = e^t\\) and \\(y = t\\), find \\(\\dfrac{d^2y}{dx^2}\\).",
          answer: "\\(\\dfrac{dy}{dx} = e^{-t}\\), so \\(\\dfrac{d^2y}{dx^2} = \\dfrac{-e^{-t}}{e^t} = -e^{-2t}\\)",
        },
      ],
      pyqExampleId: "8e0e8623-6037-4c7d-b8c4-37d80d0d9758",
      traps: [
        {
          title: "Dividing second derivatives",
          body: "\\(\\dfrac{d^2y}{dx^2}\\) is not \\(\\dfrac{d^2y}{dt^2}\\) divided by \\(\\dfrac{d^2x}{dt^2}\\). Differentiate \\(\\dfrac{dy}{dx}\\) with respect to \\(t\\), then divide by \\(\\dfrac{dx}{dt}\\).",
        },
        {
          title: "Forgetting to divide by dx/dt",
          body: "After differentiating \\(\\dfrac{dy}{dx}\\) with respect to \\(t\\), the division by \\(\\dfrac{dx}{dt}\\) is still needed. Stopping one line early gives a wrong second derivative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-relation",
      name: "Showing a relation between y, y₁ and y₂",
      intuition:
        "A 'show that' question with y₂ and y₁ is easiest when you clear fractions and roots before the second differentiation. Write y₁ in a form with no denominator, then differentiate both sides with the product rule, and the required relation appears.",
      definition:
        "- Find \\(y_1\\).\n" +
        "- Clear denominators and roots: multiply across, or square, so that the relation has no fraction. For example \\(y_1 = \\dfrac{my}{1 + x^2}\\) becomes \\((1 + x^2)y_1 = my\\).\n" +
        "- Differentiate both sides again, using the product rule.\n" +
        "- Rearrange into the required form and end with 'as required' or 'hence proved'.\n" +
        "- Known results: \\(y = \\sin^{-1}x\\) gives \\((1 - x^2)y_2 - xy_1 = 0\\); \\(y = \\cos(m\\cos^{-1}x)\\) gives \\((1 - x^2)y_2 - xy_1 + m^2y = 0\\).",
      formula: {
        label: "Clearing the denominator",
        latex: "y_1 = \\frac{my}{1 + x^2} \\Rightarrow (1 + x^2)y_1 = my \\Rightarrow (1 + x^2)y_2 + 2xy_1 = my_1",
      },
      authoredExample: {
        prompt: "If \\(y = (\\sin^{-1}x)^2\\), show that \\((1 - x^2)y_2 - xy_1 = 2\\).",
        steps: [
          "\\(y_1 = 2\\sin^{-1}x \\cdot \\dfrac{1}{\\sqrt{1 - x^2}}\\), so \\(\\sqrt{1 - x^2}\\,y_1 = 2\\sin^{-1}x\\).",
          "Square to remove the root: \\((1 - x^2)y_1^2 = 4(\\sin^{-1}x)^2 = 4y\\).",
          "Differentiate both sides: \\((1 - x^2) \\cdot 2y_1y_2 + y_1^2(-2x) = 4y_1\\).",
          "Divide by \\(2y_1\\) (\\(y_1 \\neq 0\\)): \\((1 - x^2)y_2 - xy_1 = 2\\), as required.",
        ],
        answer: "\\((1 - x^2)y_2 - xy_1 = 2\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = a\\cos 2x + b\\sin 2x\\), show that \\(y_2 + 4y = 0\\).",
        steps: ["\\(y_1 = -2a\\sin 2x + 2b\\cos 2x\\) and \\(y_2 = -4a\\cos 2x - 4b\\sin 2x = -4y\\)."],
        answer: "\\(y_2 + 4y = 0\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(y = xe^x\\), show that \\(y_2 - 2y_1 + y = 0\\).",
          answer: "\\(y_1 = e^x(1 + x)\\), \\(y_2 = e^x(2 + x)\\), and \\(e^x(2 + x - 2 - 2x + x) = 0\\)",
        },
        {
          prompt: "If \\(y = e^x\\sin x\\), show that \\(y_2 - 2y_1 + 2y = 0\\).",
          answer: "\\(y_1 = e^x(\\sin x + \\cos x)\\) and \\(y_2 = 2e^x\\cos x\\), so \\(2e^x\\cos x - 2e^x(\\sin x + \\cos x) + 2e^x\\sin x = 0\\)",
        },
      ],
      pyqExampleId: "1638313f-a8d7-47df-834b-32a2f76e015c",
      traps: [
        {
          title: "Using the quotient rule twice",
          body: "Differentiating a fraction for \\(y_1\\) by the quotient rule gives a long \\(y_2\\) that is hard to rearrange. Multiply out the denominator first; the product rule then gives the relation directly.",
        },
        {
          title: "Cancelling y₁ without a word",
          body: "When you divide every term by \\(y_1\\) or \\(2y_1\\), write that \\(y_1 \\neq 0\\). It is one short phrase and it completes the argument.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-nth",
      name: "The nth derivative of standard functions",
      intuition:
        "Differentiate two or three times and watch what changes: the power of the bracket, the sign, the factorial and the power of a. Write the general term that fits all of them; that is the nth derivative.",
      definition:
        "- \\(y = (ax + b)^m\\): \\(y_n = m(m - 1)\\cdots(m - n + 1)\\,a^n(ax + b)^{m - n}\\).\n" +
        "- \\(y = \\dfrac{1}{ax + b}\\): \\(y_n = \\dfrac{(-1)^n\\, n!\\, a^n}{(ax + b)^{n + 1}}\\).\n" +
        "- \\(y = \\log(ax + b)\\): \\(y_n = \\dfrac{(-1)^{n - 1}(n - 1)!\\, a^n}{(ax + b)^n}\\).\n" +
        "- \\(y = e^{ax + b}\\): \\(y_n = a^n e^{ax + b}\\).\n" +
        "- \\(y = \\sin(ax + b)\\): \\(y_n = a^n\\sin\\left(ax + b + \\dfrac{n\\pi}{2}\\right)\\); \\(y = \\cos(ax + b)\\): \\(y_n = a^n\\cos\\left(ax + b + \\dfrac{n\\pi}{2}\\right)\\).\n" +
        "- \\(y = e^{ax}\\sin(bx + c)\\): \\(y_n = (a^2 + b^2)^{\\frac{n}{2}}e^{ax}\\sin(bx + c + n\\alpha)\\), where \\(\\alpha = \\tan^{-1}\\dfrac{b}{a}\\).",
      formula: {
        label: "nth derivative of 1/(ax + b)",
        latex: "\\frac{d^n}{dx^n}\\left(\\frac{1}{ax + b}\\right) = \\frac{(-1)^n\\, n!\\, a^n}{(ax + b)^{n + 1}}",
      },
      authoredExample: {
        prompt: "Find the \\(n\\)th derivative of \\(y = \\dfrac{1}{2x + 3}\\).",
        steps: [
          "\\(y = (2x + 3)^{-1}\\).",
          "\\(y_1 = (-1)(2x + 3)^{-2} \\cdot 2 = \\dfrac{(-1)^1 \\cdot 1! \\cdot 2^1}{(2x + 3)^2}\\).",
          "\\(y_2 = (-1)(-2)(2x + 3)^{-3} \\cdot 2^2 = \\dfrac{(-1)^2 \\cdot 2! \\cdot 2^2}{(2x + 3)^3}\\).",
          "\\(y_3 = (-1)(-2)(-3)(2x + 3)^{-4} \\cdot 2^3 = \\dfrac{(-1)^3 \\cdot 3! \\cdot 2^3}{(2x + 3)^4}\\).",
          "Following the pattern, \\(y_n = \\dfrac{(-1)^n\\, n!\\, 2^n}{(2x + 3)^{n + 1}}\\).",
        ],
        answer: "\\(\\dfrac{d^ny}{dx^n} = \\dfrac{(-1)^n\\, n!\\, 2^n}{(2x + 3)^{n + 1}}\\)",
      },
      selfCheckExample: {
        prompt: "Find the \\(n\\)th derivative of \\(y = e^{5x + 1}\\).",
        steps: ["Each differentiation brings out one factor 5."],
        answer: "\\(\\dfrac{d^ny}{dx^n} = 5^n e^{5x + 1}\\)",
      },
      practiceSet: [
        { prompt: "Find the \\(n\\)th derivative of \\(\\cos 3x\\).", answer: "\\(3^n\\cos\\left(3x + \\dfrac{n\\pi}{2}\\right)\\)" },
        { prompt: "Find the fifth derivative of \\((2x + 1)^5\\).", answer: "\\(5! \\cdot 2^5 = 3840\\)" },
      ],
      pyqExampleId: "2a4a6951-b37f-4f4d-b9bb-1048475644c2",
      traps: [
        {
          title: "Mixing up the sign pattern",
          body: "\\(\\dfrac{1}{ax + b}\\) has \\((-1)^n\\) and \\(n!\\), but \\(\\log(ax + b)\\) has \\((-1)^{n - 1}\\) and \\((n - 1)!\\), because its first derivative is already \\(\\dfrac{a}{ax + b}\\). Check your formula at \\(n = 1\\).",
        },
        {
          title: "Forgetting the power of a",
          body: "Each differentiation of the inner \\(ax + b\\) brings out one factor \\(a\\), so the \\(n\\)th derivative carries \\(a^n\\). Leaving it out is right only when \\(a = 1\\).",
        },
      ],
    },
  ],
};
