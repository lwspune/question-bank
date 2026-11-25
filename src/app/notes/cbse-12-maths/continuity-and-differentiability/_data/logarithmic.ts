import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_CD_LOGARITHMIC_NOTE: SubtopicNote = {
  subtopicName: "Logarithmic Differentiation",
  title: "Logarithmic Differentiation",
  oneLineDefinition:
    "Taking logarithms before differentiating, for a function with the variable in both the base and the index, for sums of such functions, for implicit relations between such powers, and for long products and quotients.",
  whyItMatters:
    "46 questions, eighteen of them from board papers from 2023 to 2026. The board asks derivatives of variable powers such as x^(2x) and x^(1/x) (2023) and (tan x)^x (2024); sums such as (sin x)^x · x^(sin x) + a^x and (cos x)^x + cos⁻¹√x (2024), x^(tan x) + √(x² + 1)/2 (2025) and x^(cot x) plus a quotient (2026); implicit relations such as (cos x)^y = (cos y)^x and x^y + y^x = a^b (2024), x^y = y^x and y^x + x^y + x^x = a^b (2025) and (sin x)^y = y^(cos x) (2026); and the proof that x^30 y^20 = (x + y)^50 gives dy/dx = y/x (2024). The textbook adds Examples 27 to 30, Exercise 5.5, Miscellaneous Example 41 and five Miscellaneous Exercise questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmcd-variable-power",
      name: "A variable raised to a variable power",
      intuition:
        "In \\(x^x\\) the variable is in the base and in the index, so neither the power rule nor the rule for \\(a^x\\) applies. Taking logs brings the index down as a multiplier, and then the product rule finishes the job.",
      definition:
        "- For \\(y = [u(x)]^{v(x)}\\), take logs: \\(\\log y = v(x)\\log[u(x)]\\).\n" +
        "- Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = v(x)\\dfrac{u'(x)}{u(x)} + v'(x)\\log[u(x)]\\).\n" +
        "- Multiply by y and write y in full: \\(\\dfrac{dy}{dx} = [u(x)]^{v(x)}\\left[\\dfrac{v(x)u'(x)}{u(x)} + v'(x)\\log u(x)\\right]\\).\n" +
        "- The book's condition: \\(f(x)\\) and \\(u(x)\\) must be positive, since their logarithms are taken.\n" +
        "- NCERT Example 29 does this for \\(x^{\\sin x}\\).",
      formula: {
        label: "Logarithmic differentiation of u to the power v",
        latex: "\\frac{dy}{dx} = y\\left[v(x)\\frac{u'(x)}{u(x)} + v'(x)\\log u(x)\\right]",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = x^{\\cos x}\\), \\(x > 0\\).",
        steps: [
          "Take logs: \\(\\log y = \\cos x\\log x\\).",
          "Differentiate both sides: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\cos x \\cdot \\dfrac{1}{x} + \\log x \\cdot (-\\sin x)\\).",
          "Multiply by y: \\(\\dfrac{dy}{dx} = x^{\\cos x}\\left(\\dfrac{\\cos x}{x} - \\sin x\\log x\\right)\\).",
        ],
        answer: "\\(x^{\\cos x}\\left(\\dfrac{\\cos x}{x} - \\sin x\\log x\\right)\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = (x^2 + 1)^x\\).",
        steps: [
          "\\(\\log y = x\\log(x^2 + 1)\\).",
          "\\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\log(x^2 + 1) + x \\cdot \\dfrac{2x}{x^2 + 1}\\).",
          "\\(\\dfrac{dy}{dx} = (x^2 + 1)^x\\left[\\log(x^2 + 1) + \\dfrac{2x^2}{x^2 + 1}\\right]\\).",
        ],
        answer: "\\((x^2 + 1)^x\\left[\\log(x^2 + 1) + \\dfrac{2x^2}{x^2 + 1}\\right]\\)",
      },
      practiceSet: [
        { prompt: "Find the derivative of \\(x^x\\) at \\(x = 1\\).", answer: "1", method: "\\(x^x(1 + \\log x)\\) at 1" },
        { prompt: "Differentiate \\((2x)^x\\), \\(x > 0\\).", answer: "\\((2x)^x(1 + \\log 2x)\\)" },
        { prompt: "Differentiate \\(x^{\\sqrt{x}}\\), \\(x > 0\\).", answer: "\\(\\dfrac{x^{\\sqrt{x}}(2 + \\log x)}{2\\sqrt{x}}\\)" },
      ],
      pyqExampleId: "65961d7e-d98d-409e-9a71-bbc7b2606c78",
      traps: [
        {
          title: "Not multiplying back by y",
          body: "After differentiating \\(\\log y\\), the left side is \\(\\dfrac{1}{y}\\dfrac{dy}{dx}\\). Multiply the whole bracket by y and write y in full; stopping at the bracket loses the last mark.",
        },
        {
          title: "The power rule on a variable index",
          body: "\\(\\dfrac{d}{dx}x^{2x}\\) is not \\(2x \\cdot x^{2x - 1}\\). Taking logs gives \\(2x^{2x}(1 + \\log x)\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-sum-of-powers",
      name: "Sums of variable powers: one term at a time",
      intuition:
        "You cannot take the log of a sum term by term. So split y into its terms, call each variable power u or v, differentiate each separately, and add.",
      definition:
        "- Write \\(y = u + v\\) (or \\(u - v\\)). Then \\(\\dfrac{dy}{dx} = \\dfrac{du}{dx} \\pm \\dfrac{dv}{dx}\\).\n" +
        "- Use logarithmic differentiation only on a term with a variable base and a variable index; differentiate the other terms in the usual way.\n" +
        "- A constant term such as \\(a^a\\) or \\(a^b\\) has derivative 0.\n" +
        "- Write the final answer as the sum of the two pieces, each in full.",
      formula: {
        label: "Split the sum",
        latex: "y = u + v \\Rightarrow \\frac{dy}{dx} = \\frac{du}{dx} + \\frac{dv}{dx}",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = x^{3x} + 3^{x^2}\\), \\(x > 0\\).",
        steps: [
          "Let \\(u = x^{3x}\\) and \\(v = 3^{x^2}\\).",
          "\\(\\log u = 3x\\log x\\), so \\(\\dfrac{1}{u}\\dfrac{du}{dx} = 3\\log x + 3\\) and \\(\\dfrac{du}{dx} = 3x^{3x}(1 + \\log x)\\).",
          "v has a constant base: \\(\\dfrac{dv}{dx} = 3^{x^2}\\log 3 \\cdot 2x\\).",
          "\\(\\dfrac{dy}{dx} = 3x^{3x}(1 + \\log x) + 2x \\cdot 3^{x^2}\\log 3\\).",
        ],
        answer: "\\(3x^{3x}(1 + \\log x) + 2x \\cdot 3^{x^2}\\log 3\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = x^{e^x} + e^{x^2}\\), \\(x > 0\\).",
        steps: [
          "\\(u = x^{e^x}\\): \\(\\log u = e^x\\log x\\), so \\(\\dfrac{du}{dx} = x^{e^x}e^x\\left(\\log x + \\dfrac{1}{x}\\right)\\).",
          "\\(\\dfrac{d}{dx}e^{x^2} = 2xe^{x^2}\\).",
          "\\(\\dfrac{dy}{dx} = x^{e^x}e^x\\left(\\log x + \\dfrac{1}{x}\\right) + 2xe^{x^2}\\).",
        ],
        answer: "\\(x^{e^x}e^x\\left(\\log x + \\dfrac{1}{x}\\right) + 2xe^{x^2}\\)",
      },
      practiceSet: [
        {
          prompt: "Why can you not take logs of \\(y = x^x + x^2\\) and split the right side?",
          answer: "The log of a sum is not the sum of the logs",
        },
        { prompt: "Differentiate \\(x^x - x\\), \\(x > 0\\).", answer: "\\(x^x(1 + \\log x) - 1\\)" },
        { prompt: "Differentiate \\(x^x + a^a\\), where a is a positive constant.", answer: "\\(x^x(1 + \\log x)\\)" },
      ],
      pyqExampleId: "4132e70b-86d4-4e58-9c72-58edec12b5ea",
      traps: [
        {
          title: "Taking the log of a sum",
          body: "\\(\\log(x^x + x^2)\\) does not split into \\(\\log x^x + \\log x^2\\). Take logs only inside each separate term.",
        },
        {
          title: "A constant that looks like a variable",
          body: "\\(a^b\\) with constants a and b is a number, so its derivative is 0, not \\(a^b\\log a\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-implicit-powers",
      name: "Implicit relations between variable powers",
      intuition:
        "In \\(x^y = y^x\\) the variables are in the indices on both sides. Take logs of both sides to bring them down, then differentiate implicitly, with the product rule on each side.",
      definition:
        "- Take logs: \\(x^y = y^x\\) becomes \\(y\\log x = x\\log y\\).\n" +
        "- Differentiate each side by the product rule, with a factor \\(\\dfrac{dy}{dx}\\) on every term that comes from y.\n" +
        "- Collect the \\(\\dfrac{dy}{dx}\\) terms and divide.\n" +
        "- A sum of variable powers equal to a constant, as in \\(x^y + y^x = a^b\\): put each power equal to u, v and use \\(\\dfrac{du}{dx} + \\dfrac{dv}{dx} = 0\\) (NCERT Example 30).\n" +
        "- Sometimes taking logs lets you solve for y: \\(x^y = e^{x - y}\\) gives \\(y\\log x = x - y\\), so \\(y = \\dfrac{x}{1 + \\log x}\\).",
      formula: {
        label: "Log of a variable power",
        latex: "\\log\\left(x^{y}\\right) = y\\log x",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x^y \\cdot y^x = 1\\).",
        steps: [
          "Take logs: \\(y\\log x + x\\log y = 0\\).",
          "Differentiate: \\(\\dfrac{dy}{dx}\\log x + \\dfrac{y}{x} + \\log y + \\dfrac{x}{y}\\dfrac{dy}{dx} = 0\\).",
          "Collect: \\(\\left(\\log x + \\dfrac{x}{y}\\right)\\dfrac{dy}{dx} = -\\left(\\log y + \\dfrac{y}{x}\\right)\\).",
          "Multiply top and bottom by xy: \\(\\dfrac{dy}{dx} = -\\dfrac{y(x\\log y + y)}{x(y\\log x + x)}\\).",
        ],
        answer: "\\(-\\dfrac{y(x\\log y + y)}{x(y\\log x + x)}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = x^y\\), \\(x > 0\\).",
        steps: [
          "Take logs: \\(\\log y = y\\log x\\).",
          "Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\dfrac{dy}{dx}\\log x + \\dfrac{y}{x}\\).",
          "\\(\\left(\\dfrac{1}{y} - \\log x\\right)\\dfrac{dy}{dx} = \\dfrac{y}{x}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{y^2}{x(1 - y\\log x)}\\).",
        ],
        answer: "\\(\\dfrac{y^2}{x(1 - y\\log x)}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y^x = e\\).", answer: "\\(-\\dfrac{y\\log y}{x}\\)", method: "\\(x\\log y = 1\\)" },
        { prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x^y = 2^x\\).", answer: "\\(\\dfrac{x\\log 2 - y}{x\\log x}\\)", method: "\\(y\\log x = x\\log 2\\)" },
        {
          prompt: "Take logs of \\((\\sin x)^y = x\\) and write the relation you would differentiate.",
          answer: "\\(y\\log\\sin x = \\log x\\)",
        },
      ],
      pyqExampleId: "381d0147-50c7-480f-a60b-e9ebe4072276",
      traps: [
        {
          title: "The product rule on both sides",
          body: "\\(\\dfrac{d}{dx}(x\\log y) = \\log y + \\dfrac{x}{y}\\dfrac{dy}{dx}\\). Missing either term changes the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-products",
      name: "Long products and quotients by logarithms",
      intuition:
        "A product of many brackets, or a root of a quotient, is slow by the product and quotient rules. Its logarithm is a plain sum, which differentiates term by term.",
      definition:
        "- Take logs: a product becomes a sum, a quotient a difference, and a square root a factor \\(\\dfrac{1}{2}\\) (NCERT Example 27).\n" +
        "- Differentiate each log, then multiply the bracket by y and write y in full.\n" +
        "- The same idea works on an implicit relation that is a product of powers: take logs first, then differentiate implicitly.",
      formula: {
        label: "Log of a product",
        latex: "\\log(uvw) = \\log u + \\log v + \\log w",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\sqrt{\\dfrac{x - 1}{x + 2}}\\), \\(x > 1\\).",
        steps: [
          "\\(\\log y = \\dfrac{1}{2}\\left[\\log(x - 1) - \\log(x + 2)\\right]\\).",
          "\\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\dfrac{1}{2}\\left[\\dfrac{1}{x - 1} - \\dfrac{1}{x + 2}\\right] = \\dfrac{3}{2(x - 1)(x + 2)}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{3}{2(x - 1)(x + 2)}\\sqrt{\\dfrac{x - 1}{x + 2}}\\).",
        ],
        answer: "\\(\\dfrac{3}{2(x - 1)(x + 2)}\\sqrt{\\dfrac{x - 1}{x + 2}}\\)",
      },
      selfCheckExample: {
        prompt: "Use logarithms to find \\(f'(1)\\) for \\(f(x) = x(x + 1)(x + 2)\\).",
        steps: [
          "\\(\\log f(x) = \\log x + \\log(x + 1) + \\log(x + 2)\\), so \\(\\dfrac{f'(x)}{f(x)} = \\dfrac{1}{x} + \\dfrac{1}{x + 1} + \\dfrac{1}{x + 2}\\).",
          "At \\(x = 1\\): \\(f(1) = 6\\) and the bracket is \\(1 + \\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{11}{6}\\).",
          "\\(f'(1) = 6 \\times \\dfrac{11}{6} = 11\\).",
        ],
        answer: "\\(f'(1) = 11\\)",
      },
      practiceSet: [
        {
          prompt: "Differentiate \\((x + 1)^3(x - 2)^2\\) by taking logs.",
          answer: "\\((x + 1)^3(x - 2)^2\\left[\\dfrac{3}{x + 1} + \\dfrac{2}{x - 2}\\right]\\)",
        },
        {
          prompt: "Differentiate \\(\\dfrac{x^2 + 1}{x^2 - 1}\\), \\(x > 1\\), by taking logs.",
          answer: "\\(-\\dfrac{4x}{(x^2 - 1)^2}\\)",
          method: "\\(y\\left[\\dfrac{2x}{x^2 + 1} - \\dfrac{2x}{x^2 - 1}\\right]\\)",
        },
        { prompt: "Use logs to find \\(f'(0)\\) for \\(f(x) = (1 + x)(1 + 2x)\\).", answer: "3" },
      ],
      pyqExampleId: "9b670c85-e7ec-4bc4-b6c9-1f4d9ec9406b",
      traps: [
        {
          title: "A root becomes a half",
          body: "\\(\\log\\sqrt{u} = \\dfrac{1}{2}\\log u\\). Forgetting the \\(\\dfrac{1}{2}\\) doubles the answer.",
        },
      ],
    },
  ],
};
