import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DF_IMPLICIT_NOTE: SubtopicNote = {
  subtopicName: "Derivatives of Implicit Functions",
  title: "Derivatives of Implicit Functions",
  oneLineDefinition:
    "Finding dy/dx when x and y are linked by an equation that is not solved for y, such as x sin y + y sin x = 0: differentiate both sides, treating y as a function of x.",
  whyItMatters:
    "48 questions, ten of them from board papers, more than any other page of this chapter: x sin y + y sin x = 0 (2017), eˣ + eʸ = eˣ⁺ʸ (2020), x√x + y√y = a√a (2025), √x + √y = √a (2026), MCQs on log(x + y) = 2xy (2023), x = e^(x/y) (2024) and log(x + y) = xy (2025), a logarithm of a ratio equal to a constant (2015), and the never-ending root of sin x (2015) and of tan x (2023). The textbook rows are Exercise 1.3 Q.3 and most parts of Q.4 and Q.5, the solved examples of section 1.3.3 and questions from both parts of Miscellaneous Exercise 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdf-implicit",
      name: "Differentiating an implicit relation",
      intuition:
        "You do not need y on its own. Differentiate every term of the equation with respect to x; wherever y appears, the chain rule adds a factor dy/dx. Then collect the dy/dx terms on one side and divide.",
      definition:
        "- \\(\\dfrac{d}{dx}(y^n) = ny^{n-1}\\dfrac{dy}{dx}\\), \\(\\dfrac{d}{dx}\\sin y = \\cos y\\,\\dfrac{dy}{dx}\\), \\(\\dfrac{d}{dx}e^{y} = e^{y}\\dfrac{dy}{dx}\\).\n" +
        "- A product such as \\(xy\\) needs the product rule: \\(\\dfrac{d}{dx}(xy) = x\\dfrac{dy}{dx} + y\\).\n" +
        "- **Steps:** differentiate both sides; move all \\(\\dfrac{dy}{dx}\\) terms to one side; take \\(\\dfrac{dy}{dx}\\) common; divide.\n" +
        "- For a value at a given \\(x\\), first find \\(y\\) at that \\(x\\) from the given equation, then substitute both.",
      formula: {
        label: "Derivative of a term in y",
        latex: "\\frac{d}{dx}f(y) = f'(y)\\,\\frac{dy}{dx}",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x^2 + xy + y^3 = 7\\).",
        steps: [
          "Differentiate both sides with respect to \\(x\\): \\(2x + \\left(x\\dfrac{dy}{dx} + y\\right) + 3y^2\\dfrac{dy}{dx} = 0\\).",
          "Collect the \\(\\dfrac{dy}{dx}\\) terms: \\((x + 3y^2)\\dfrac{dy}{dx} = -(2x + y)\\).",
          "\\(\\dfrac{dy}{dx} = -\\dfrac{2x + y}{x + 3y^2}\\), provided \\(x + 3y^2 \\neq 0\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{2x + y}{x + 3y^2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x^3 + y^3 = 3axy\\).",
        steps: ["\\(3x^2 + 3y^2\\dfrac{dy}{dx} = 3a\\left(y + x\\dfrac{dy}{dx}\\right)\\), so \\((y^2 - ax)\\dfrac{dy}{dx} = ay - x^2\\)."],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{ay - x^2}{y^2 - ax}\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(\\sin(x + y) = y\\).",
          answer: "\\(\\dfrac{\\cos(x + y)}{1 - \\cos(x + y)}\\)",
        },
        {
          prompt: "If \\(x^2 + y^2 = 25\\), find \\(\\dfrac{dy}{dx}\\) at the point \\((3, 4)\\).",
          answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{x}{y} = -\\dfrac{3}{4}\\)",
        },
      ],
      pyqExampleId: "11c5547f-ce27-4594-bbac-1d21ff7deed6",
      traps: [
        {
          title: "Leaving dy/dx off a y term",
          body: "\\(\\dfrac{d}{dx}(y^3)\\) is \\(3y^2\\dfrac{dy}{dx}\\), not \\(3y^2\\). Writing only \\(3y^2\\) is the commonest slip in this topic and spoils the whole answer.",
        },
        {
          title: "Using a wrong value of y at a point",
          body: "When a question asks for \\(\\dfrac{dy}{dx}\\) at a given \\(x\\), find \\(y\\) from the given relation first. Putting \\(y = 0\\) out of habit gives a wrong value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-clear",
      name: "Simplify the relation before differentiating",
      intuition:
        "Many relations look hard: a logarithm, sine or inverse secant of a ratio is equal to a constant. Remove the outer function first. If sin R = c, a constant, then R = sin⁻¹ c is a constant too, and what is left is a plain algebraic relation that differentiates in two lines.",
      definition:
        "- If \\(f\\left(\\dfrac{x^n - y^n}{x^n + y^n}\\right) = c\\), a constant, then \\(\\dfrac{x^n - y^n}{x^n + y^n} = k\\), another constant.\n" +
        "- Cross-multiply: \\((1 - k)x^n = (1 + k)y^n\\), so \\(y^n = \\dfrac{1 - k}{1 + k}\\,x^n\\).\n" +
        "- Differentiating gives \\(\\dfrac{dy}{dx} = \\dfrac{1 - k}{1 + k} \\cdot \\dfrac{x^{n-1}}{y^{n-1}}\\), which is the same as \\(\\dfrac{y}{x}\\).\n" +
        "- A logarithm to base 10: \\(\\log_{10}R = k\\) means \\(R = 10^k\\).\n" +
        "- Other ways to clear: take logs (\\(x = e^{x/y}\\) gives \\(\\log x = \\dfrac{x}{y}\\)), or solve for \\(x\\) or \\(y\\) when that is easy (\\(\\sin y = x\\sin(a + y)\\) gives \\(x = \\dfrac{\\sin y}{\\sin(a + y)}\\), then use \\(\\dfrac{dy}{dx} = 1 \\div \\dfrac{dx}{dy}\\)).",
      formula: {
        label: "A ratio equal to a constant",
        latex: "\\frac{x^n - y^n}{x^n + y^n} = k \\Rightarrow y^n = \\frac{1 - k}{1 + k}\\,x^n \\Rightarrow \\frac{dy}{dx} = \\frac{y}{x}",
      },
      authoredExample: {
        prompt: "If \\(\\sin^{-1}\\left(\\dfrac{x^2 - y^2}{x^2 + y^2}\\right) = \\dfrac{\\pi}{6}\\), show that \\(\\dfrac{dy}{dx} = \\dfrac{x}{3y}\\).",
        steps: [
          "Remove the inverse sine: \\(\\dfrac{x^2 - y^2}{x^2 + y^2} = \\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}\\).",
          "Cross-multiply: \\(2x^2 - 2y^2 = x^2 + y^2\\), so \\(x^2 = 3y^2\\).",
          "Differentiate with respect to \\(x\\): \\(2x = 6y\\dfrac{dy}{dx}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{x}{3y}\\), as required.",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{x}{3y}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\log(x + y) = \\log(xy) + 2\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "\\(x + y = e^2xy\\); dividing by \\(xy\\), \\(\\dfrac{1}{y} + \\dfrac{1}{x} = e^2\\).",
          "Differentiate: \\(-\\dfrac{1}{y^2}\\dfrac{dy}{dx} - \\dfrac{1}{x^2} = 0\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{y^2}{x^2}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(x\\cos(a + y) = \\cos y\\), find \\(\\dfrac{dy}{dx}\\) by first writing \\(x\\) in terms of \\(y\\).",
          answer: "\\(x = \\dfrac{\\cos y}{\\cos(a + y)}\\) gives \\(\\dfrac{dx}{dy} = \\dfrac{\\sin a}{\\cos^2(a + y)}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{\\cos^2(a + y)}{\\sin a}\\)",
        },
        {
          prompt: "If \\(x = e^{\\frac{y}{x}}\\), find \\(\\dfrac{dy}{dx}\\).",
          answer: "\\(\\log x = \\dfrac{y}{x}\\), so \\(y = x\\log x\\) and \\(\\dfrac{dy}{dx} = 1 + \\log x\\)",
        },
      ],
      pyqExampleId: "b876de40-8c37-45d2-a505-c21446e1393d",
      traps: [
        {
          title: "Differentiating the outer function directly",
          body: "Differentiating a logarithm or inverse sine of a quotient directly needs the quotient rule inside another rule. Clearing the outer function first is shorter and leaves less room for error.",
        },
        {
          title: "Treating a base-10 logarithm as natural",
          body: "\\(\\log_{10}R = k\\) means \\(R = 10^k\\), not \\(e^k\\). Read the base before you remove the logarithm.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-infinite",
      name: "Never-ending roots: the expression repeats itself",
      intuition:
        "In y = √(sin x + √(sin x + ...)), everything under the first root after sin x is the whole expression again, which is y itself. So y = √(sin x + y), an ordinary implicit relation. The same idea turns a never-ending power of x into y = x to the power y.",
      definition:
        "- If \\(y = \\sqrt{f(x) + \\sqrt{f(x) + \\sqrt{f(x) + \\cdots}}}\\), then \\(y = \\sqrt{f(x) + y}\\).\n" +
        "- Square: \\(y^2 = f(x) + y\\).\n" +
        "- Differentiate: \\(2y\\dfrac{dy}{dx} = f'(x) + \\dfrac{dy}{dx}\\), so \\((2y - 1)\\dfrac{dy}{dx} = f'(x)\\) and \\(\\dfrac{dy}{dx} = \\dfrac{f'(x)}{2y - 1}\\).\n" +
        "- For a never-ending power \\(y = x^{x^{x^{\\cdots}}}\\), write \\(y = x^{y}\\) and take logs.",
      formula: {
        label: "Never-ending root",
        latex: "y = \\sqrt{f(x) + y} \\Rightarrow y^2 = f(x) + y \\Rightarrow \\frac{dy}{dx} = \\frac{f'(x)}{2y - 1}",
      },
      authoredExample: {
        prompt: "If \\(y = \\sqrt{x^2 + \\sqrt{x^2 + \\sqrt{x^2 + \\cdots}}}\\), show that \\(\\dfrac{dy}{dx} = \\dfrac{2x}{2y - 1}\\).",
        steps: [
          "The part after \\(x^2\\) under the first root is \\(y\\) itself, so \\(y = \\sqrt{x^2 + y}\\).",
          "Square both sides: \\(y^2 = x^2 + y\\).",
          "Differentiate with respect to \\(x\\): \\(2y\\dfrac{dy}{dx} = 2x + \\dfrac{dy}{dx}\\).",
          "\\((2y - 1)\\dfrac{dy}{dx} = 2x\\), so \\(\\dfrac{dy}{dx} = \\dfrac{2x}{2y - 1}\\), as required.",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2x}{2y - 1}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = x^{x^{x^{\\cdots}}}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "\\(y = x^y\\), so \\(\\log y = y\\log x\\).",
          "\\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\dfrac{dy}{dx}\\log x + \\dfrac{y}{x}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{y^2}{x(1 - y\\log x)}\\), and \\(y\\log x = \\log y\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{y^2}{x(1 - \\log y)}\\)",
      },
      practiceSet: [
        {
          prompt: "In \\(y = \\sqrt{f(x) + \\sqrt{f(x) + \\cdots}}\\), why may the part after \\(f(x)\\) be replaced by \\(y\\)?",
          answer: "Because the roots go on for ever, that part is the same never-ending expression as \\(y\\)",
        },
        {
          prompt: "A never-ending root satisfies \\(y^2 = f(x) + y\\). At a point where \\(f(x) = 2\\), find \\(y\\).",
          answer: "\\(y^2 - y - 2 = 0\\), so \\(y = 2\\) (a square root is never negative, so \\(y = -1\\) is rejected)",
        },
      ],
      pyqExampleId: "c2039f47-ac10-46c5-9b15-a3bbb6e92dab",
      traps: [
        {
          title: "Squaring before replacing",
          body: "Replace the repeating part by \\(y\\) first, then square. Squaring the whole never-ending expression term by term leads nowhere.",
        },
        {
          title: "Taking the wrong root for y at a point",
          body: "\\(y\\) is a square root, so it is never negative. When \\(y^2 = f(x) + y\\) has two roots at a point, keep the one that fits the expression.",
        },
      ],
    },
  ],
};
