import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DF_LOGARITHMIC_NOTE: SubtopicNote = {
  subtopicName: "Logarithmic Differentiation",
  title: "Logarithmic Differentiation",
  oneLineDefinition:
    "Taking the logarithm of both sides before differentiating, used for long products and quotients and for a variable raised to a variable power, such as x to the power x.",
  whyItMatters:
    "31 questions, four of them from board papers: the derivative of x to the power x (2016) and of (log x) to the power x (2024), an MCQ on the derivative of the logarithm of a to the base x (2026), and the logarithm of a quotient simplified by the log laws (2026). The textbook rows are Exercise 1.3 Q.1, Q.2 and some parts of Q.4 and Q.5, the solved examples of section 1.3.1 and one MCQ of Miscellaneous Exercise 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdf-logdiff",
      name: "Products and quotients: take logs first",
      intuition:
        "A long product or quotient of powers needs the product and quotient rules many times over. Take logs instead: the product becomes a sum, the powers come down as numbers, and each term differentiates in one short step.",
      definition:
        "- **Step 1:** write \\(y = \\) the expression and take \\(\\log\\) of both sides.\n" +
        "- **Step 2:** use the log laws to write the right side as a sum of simple terms.\n" +
        "- **Step 3:** differentiate with respect to \\(x\\); the left side gives \\(\\dfrac{1}{y}\\dfrac{dy}{dx}\\).\n" +
        "- **Step 4:** multiply by \\(y\\) and write \\(y\\) as the original expression.",
      formula: {
        label: "Logarithmic differentiation",
        latex: "\\log y = \\log f(x) \\Rightarrow \\frac{1}{y}\\frac{dy}{dx} = \\frac{d}{dx}[\\log f(x)] \\Rightarrow \\frac{dy}{dx} = y\\,\\frac{d}{dx}[\\log f(x)]",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\dfrac{x^5\\sqrt{x^2 + 9}}{(5x - 7)^6}\\) with respect to \\(x\\).",
        steps: [
          "Take logs: \\(\\log y = 5\\log x + \\dfrac{1}{2}\\log(x^2 + 9) - 6\\log(5x - 7)\\).",
          "Differentiate with respect to \\(x\\): \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\dfrac{5}{x} + \\dfrac{1}{2} \\cdot \\dfrac{2x}{x^2 + 9} - 6 \\cdot \\dfrac{5}{5x - 7}\\).",
          "\\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\dfrac{5}{x} + \\dfrac{x}{x^2 + 9} - \\dfrac{30}{5x - 7}\\).",
          "Multiply by \\(y\\): \\(\\dfrac{dy}{dx} = \\dfrac{x^5\\sqrt{x^2 + 9}}{(5x - 7)^6}\\left[\\dfrac{5}{x} + \\dfrac{x}{x^2 + 9} - \\dfrac{30}{5x - 7}\\right]\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{x^5\\sqrt{x^2 + 9}}{(5x - 7)^6}\\left[\\dfrac{5}{x} + \\dfrac{x}{x^2 + 9} - \\dfrac{30}{5x - 7}\\right]\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = \\sqrt{x}\\,(x^2 + 1)^3\\) by taking logs.",
        steps: ["\\(\\log y = \\dfrac{1}{2}\\log x + 3\\log(x^2 + 1)\\), so \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\dfrac{1}{2x} + \\dfrac{6x}{x^2 + 1}\\)."],
        answer: "\\(\\dfrac{dy}{dx} = \\sqrt{x}\\,(x^2 + 1)^3\\left[\\dfrac{1}{2x} + \\dfrac{6x}{x^2 + 1}\\right]\\)",
      },
      practiceSet: [
        {
          prompt: "Differentiate \\(y = \\dfrac{e^x}{x^2 + 1}\\) by taking logs.",
          answer: "\\(\\dfrac{e^x}{x^2 + 1}\\left[1 - \\dfrac{2x}{x^2 + 1}\\right]\\)",
        },
        {
          prompt: "Differentiate \\(y = x^2\\sin^3 x\\) by taking logs.",
          answer: "\\(x^2\\sin^3 x\\left[\\dfrac{2}{x} + 3\\cot x\\right]\\)",
        },
      ],
      pyqExampleId: "89c4b23c-1cd7-40d0-9b84-5ed218346e82",
      traps: [
        {
          title: "Forgetting to multiply by y",
          body: "After differentiating, the left side is \\(\\dfrac{1}{y}\\dfrac{dy}{dx}\\). The final line must multiply the bracket by \\(y\\) and write \\(y\\) as the original expression.",
        },
        {
          title: "Wrong sign for factors in the denominator",
          body: "Every factor in the denominator enters \\(\\log y\\) with a minus sign, and so does its term in the derivative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-power",
      name: "A variable raised to a variable power",
      intuition:
        "In x to the power x neither the power rule (which needs a fixed power) nor the exponential rule (which needs a fixed base) applies, because both the base and the power change. Taking logs brings the power down as a factor, and the product rule finishes the job.",
      definition:
        "- For \\(y = u^{v}\\), where \\(u\\) and \\(v\\) are functions of \\(x\\): \\(\\log y = v\\log u\\).\n" +
        "- Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = v \\cdot \\dfrac{1}{u}\\dfrac{du}{dx} + \\log u \\cdot \\dfrac{dv}{dx}\\).\n" +
        "- So \\(\\dfrac{dy}{dx} = u^{v}\\left[\\dfrac{v}{u}\\dfrac{du}{dx} + \\log u\\,\\dfrac{dv}{dx}\\right]\\).\n" +
        "- For a sum such as \\(y = A + B\\), where \\(A\\) and \\(B\\) are such powers, find \\(\\dfrac{dA}{dx}\\) and \\(\\dfrac{dB}{dx}\\) separately and add. Never take the log of a sum.",
      formula: {
        label: "Derivative of u to the power v",
        latex: "\\frac{d}{dx}\\left(u^{v}\\right) = u^{v}\\left[\\frac{v}{u}\\frac{du}{dx} + \\log u\\,\\frac{dv}{dx}\\right]",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = x^{\\sin x}\\).",
        steps: [
          "Take logs: \\(\\log y = \\sin x \\cdot \\log x\\).",
          "Differentiate by the product rule: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\sin x \\cdot \\dfrac{1}{x} + \\log x \\cdot \\cos x\\).",
          "Multiply by \\(y\\): \\(\\dfrac{dy}{dx} = x^{\\sin x}\\left[\\dfrac{\\sin x}{x} + \\cos x\\log x\\right]\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = x^{\\sin x}\\left[\\dfrac{\\sin x}{x} + \\cos x\\log x\\right]\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = x^{x^2}\\).",
        steps: ["\\(\\log y = x^2\\log x\\), so \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = 2x\\log x + x\\)."],
        answer: "\\(\\dfrac{dy}{dx} = x^{x^2}(2x\\log x + x) = x^{x^2 + 1}(2\\log x + 1)\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = x^x + 2^x\\).", answer: "\\(x^x(1 + \\log x) + 2^x\\log 2\\)" },
        {
          prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = (\\sin x)^{\\cos x}\\).",
          answer: "\\((\\sin x)^{\\cos x}\\left[\\cos x\\cot x - \\sin x\\log(\\sin x)\\right]\\)",
        },
      ],
      pyqExampleId: "503c6b39-8e8a-461e-b39d-fd85e4577de6",
      traps: [
        {
          title: "Using the power rule or the exponential rule",
          body: "\\(x \\cdot x^{x - 1}\\) treats the power as a constant, and \\(x^x\\log x\\) treats the base as a constant. Both are wrong for \\(x^x\\); its derivative is \\(x^x(1 + \\log x)\\).",
        },
        {
          title: "Taking the log of a sum",
          body: "\\(\\log(A + B)\\) is not \\(\\log A + \\log B\\). For a sum of two such powers, differentiate each term on its own by logs, then add.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-logrules",
      name: "Logarithms to another base and the log laws",
      intuition:
        "Two board questions of 2026 were about logarithms themselves: a logarithm whose base is x, and a logarithm of a fraction that simplifies. Change the base to e, or use the laws, before you differentiate; the derivative then takes one or two lines.",
      definition:
        "- Change of base: \\(\\log_b a = \\dfrac{\\log a}{\\log b}\\). So \\(\\log_x a = \\dfrac{\\log a}{\\log x}\\), where \\(\\log a\\) is a constant.\n" +
        "- \\(\\dfrac{d}{dx}\\left(\\dfrac{1}{\\log x}\\right) = -\\dfrac{1}{x(\\log x)^2}\\).\n" +
        "- Rationalise a fraction inside a log when it has a root: \\(\\left(\\sqrt{x^2 + a^2} - x\\right)\\left(\\sqrt{x^2 + a^2} + x\\right) = a^2\\).\n" +
        "- \\(\\dfrac{d}{dx}\\log\\left(x + \\sqrt{x^2 + a^2}\\right) = \\dfrac{1}{\\sqrt{x^2 + a^2}}\\).",
      formula: {
        label: "Change of base",
        latex: "\\log_x a = \\frac{\\log a}{\\log x} \\Rightarrow \\frac{d}{dx}\\log_x a = -\\frac{\\log a}{x(\\log x)^2}",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\log_x 5 + \\log_5 x\\) with respect to \\(x\\).",
        steps: [
          "Change both to base \\(e\\): \\(y = \\dfrac{\\log 5}{\\log x} + \\dfrac{\\log x}{\\log 5}\\).",
          "\\(\\log 5\\) is a constant, so \\(\\dfrac{dy}{dx} = \\log 5 \\cdot \\left(-\\dfrac{1}{(\\log x)^2} \\cdot \\dfrac{1}{x}\\right) + \\dfrac{1}{\\log 5} \\cdot \\dfrac{1}{x}\\).",
          "\\(\\dfrac{dy}{dx} = -\\dfrac{\\log 5}{x(\\log x)^2} + \\dfrac{1}{x\\log 5}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{\\log 5}{x(\\log x)^2} + \\dfrac{1}{x\\log 5}\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\log\\left(x + \\sqrt{x^2 + 9}\\right)\\) with respect to \\(x\\).",
        steps: ["\\(\\dfrac{1}{x + \\sqrt{x^2 + 9}}\\left(1 + \\dfrac{x}{\\sqrt{x^2 + 9}}\\right) = \\dfrac{1}{\\sqrt{x^2 + 9}}\\)."],
        answer: "\\(\\dfrac{1}{\\sqrt{x^2 + 9}}\\)",
      },
      practiceSet: [
        { prompt: "Differentiate \\(\\log_{2x} 3\\) with respect to \\(x\\).", answer: "\\(-\\dfrac{\\log 3}{x(\\log 2x)^2}\\)" },
        { prompt: "Differentiate \\(\\log\\left(\\dfrac{1 + x}{1 - x}\\right)\\) with respect to \\(x\\).", answer: "\\(\\dfrac{1}{1 + x} + \\dfrac{1}{1 - x} = \\dfrac{2}{1 - x^2}\\)" },
      ],
      pyqExampleId: "e7f44be5-6871-4a93-add2-474819ec4d3b",
      traps: [
        {
          title: "Treating log a as a variable",
          body: "In \\(\\log_x a\\) only the base changes. \\(\\log a\\) is a constant and stays in the numerator as a factor.",
        },
        {
          title: "Writing a quotient of logs as a log of a quotient",
          body: "\\(\\dfrac{\\log a}{\\log x}\\) is not \\(\\log a - \\log x\\). The log law turns a log of a quotient into a difference, never the other way round for a quotient of logs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-logrelation",
      name: "Relations with powers of x and y: take logs",
      intuition:
        "In relations like x⁷y⁵ = (x + y)¹² or x to the power y equal to y to the power x, y sits inside powers. Take logs of both sides to bring the powers down, then differentiate term by term, remembering that y is a function of x.",
      definition:
        "- Take \\(\\log\\) of both sides, then use the log laws.\n" +
        "- Differentiate term by term; a term in \\(y\\) gives a factor \\(\\dfrac{dy}{dx}\\), for example \\(\\dfrac{d}{dx}\\log y = \\dfrac{1}{y}\\dfrac{dy}{dx}\\).\n" +
        "- Collect the \\(\\dfrac{dy}{dx}\\) terms on one side and simplify. For \\(x^m y^n = (x + y)^{m + n}\\) a common factor cancels and leaves \\(\\dfrac{dy}{dx} = \\dfrac{y}{x}\\).\n" +
        "- When the relation can be solved for \\(y\\) after taking logs, do so: \\(x^y = e^{x - y}\\) gives \\(y\\log x = x - y\\), so \\(y = \\dfrac{x}{1 + \\log x}\\).",
      formula: {
        label: "Logs of a product of powers",
        latex: "\\log\\left(x^m y^n\\right) = m\\log x + n\\log y",
      },
      authoredExample: {
        prompt: "If \\(x^y = e^{2(x - y)}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Take logs: \\(y\\log x = 2(x - y)\\), since \\(\\log e = 1\\).",
          "\\(y\\log x + 2y = 2x\\), so \\(y = \\dfrac{2x}{2 + \\log x}\\).",
          "Quotient rule: \\(\\dfrac{dy}{dx} = \\dfrac{(2 + \\log x)(2) - 2x \\cdot \\dfrac{1}{x}}{(2 + \\log x)^2}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{4 + 2\\log x - 2}{(2 + \\log x)^2} = \\dfrac{2(1 + \\log x)}{(2 + \\log x)^2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2(1 + \\log x)}{(2 + \\log x)^2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(x^y = 10\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: ["\\(y\\log x = \\log 10\\), so \\(y = \\dfrac{\\log 10}{\\log x}\\) and \\(\\dfrac{dy}{dx} = -\\dfrac{\\log 10}{x(\\log x)^2}\\)."],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{\\log 10}{x(\\log x)^2} = -\\dfrac{y}{x\\log x}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(x^y = y^x\\), find \\(\\dfrac{dy}{dx}\\).",
          answer: "\\(\\dfrac{y(x\\log y - y)}{x(y\\log x - x)}\\)",
        },
        {
          prompt: "If \\(y = x^y\\), find \\(\\dfrac{dy}{dx}\\).",
          answer: "\\(\\log y = y\\log x\\) gives \\(\\dfrac{dy}{dx} = \\dfrac{y^2}{x(1 - y\\log x)}\\)",
        },
      ],
      pyqExampleId: "d936ffe8-f09e-44f8-af34-ce93ff90ce65",
      traps: [
        {
          title: "Leaving dy/dx off a y term",
          body: "\\(\\log y\\) differentiates to \\(\\dfrac{1}{y}\\dfrac{dy}{dx}\\), not \\(\\dfrac{1}{y}\\). Every term that contains \\(y\\) carries the factor \\(\\dfrac{dy}{dx}\\).",
        },
        {
          title: "Cancelling a factor without saying so",
          body: "In \\(x^m y^n = (x + y)^{m + n}\\) the last step divides by a factor such as \\(nx - my\\). Write that it is non-zero when you cancel it.",
        },
      ],
    },
  ],
};
