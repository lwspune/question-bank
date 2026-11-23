import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_II_SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Integration by Substitution",
  title: "Integration by Substitution",
  oneLineDefinition:
    "When the integrand holds a function together with its derivative, putting that function equal to t turns the integral into a standard one in t.",
  whyItMatters:
    "51 questions, six of them from board papers: sin √x over √x (2017), eˣ(1 + x) over sin² or cos² of xeˣ (2024, 2026), x⁹ sec²(x¹⁰) (2025), 1/(x + x⁻¹⁰) (2025) and 2x/(1 + x²) (2026). The textbook rows are Exercise 3.2(A) Part I, its solved examples and Miscellaneous items.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmii-chain",
      name: "Substitution: put the inner function equal to t",
      intuition:
        "The chain rule makes a derivative of the form f(g(x)) times g′(x). Substitution undoes it: spot a function g(x) whose derivative also stands in the integrand, call g(x) = t, and the derivative disappears into dt. What is left is a standard integral in t. The answer is then written back in x.",
      definition:
        "- Look for a function \\(g(x)\\) whose derivative \\(g'(x)\\) is also a factor of the integrand (a constant multiple is enough).\n" +
        "- Put \\(t = g(x)\\), so \\(dt = g'(x)\\,dx\\).\n" +
        "- Rewrite every \\(x\\) and \\(dx\\) in terms of \\(t\\), then integrate.\n" +
        "- Put \\(t = g(x)\\) back in the answer.\n" +
        "- A useful case: \\(\\int [f(x)]^n f'(x)\\,dx = \\dfrac{[f(x)]^{n+1}}{n+1} + c\\) for \\(n \\neq -1\\).",
      formula: {
        label: "Substitution",
        latex: "\\int f\\big(g(x)\\big)\\,g'(x)\\,dx = \\int f(t)\\,dt, \\qquad t = g(x)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{(\\tan^{-1} x)^2}{1 + x^2}\\,dx\\).",
        steps: [
          "Put \\(t = \\tan^{-1} x\\), so \\(dt = \\dfrac{1}{1 + x^2}\\,dx\\).",
          "\\(\\int \\dfrac{(\\tan^{-1} x)^2}{1 + x^2}\\,dx = \\int t^2\\,dt\\).",
          "\\(= \\dfrac{t^3}{3} + c\\).",
          "\\(\\therefore \\int \\dfrac{(\\tan^{-1} x)^2}{1 + x^2}\\,dx = \\dfrac{(\\tan^{-1} x)^3}{3} + c\\).",
        ],
        answer: "\\(\\dfrac{(\\tan^{-1} x)^3}{3} + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{\\cos(\\log x)}{x}\\,dx\\).",
        steps: ["Put \\(t = \\log x\\), \\(dt = \\dfrac{dx}{x}\\): \\(\\int \\cos t\\,dt = \\sin t\\)."],
        answer: "\\(\\sin(\\log x) + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int x e^{x^2}\\,dx\\).", answer: "Put \\(t = x^2\\), \\(x\\,dx = \\dfrac{dt}{2}\\): \\(\\dfrac{1}{2}e^{x^2} + c\\)" },
        { prompt: "Evaluate \\(\\int \\sin^4 x\\cos x\\,dx\\).", answer: "Put \\(t = \\sin x\\): \\(\\dfrac{\\sin^5 x}{5} + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx\\).", answer: "Put \\(t = \\sqrt{x}\\), \\(\\dfrac{dx}{\\sqrt{x}} = 2\\,dt\\): \\(2e^{\\sqrt{x}} + c\\)" },
      ],
      pyqExampleId: "123648e8-0ac9-4456-b0f9-94c1c890cf2d",
      traps: [
        {
          title: "Losing the constant from dt",
          body: "With \\(t = x^2\\), \\(dt = 2x\\,dx\\), so \\(x\\,dx = \\dfrac{dt}{2}\\). The \\(\\dfrac{1}{2}\\) must stay in front of the integral; dropping it doubles the answer.",
        },
        {
          title: "Leaving the answer in t",
          body: "The question is in \\(x\\), so the answer must be in \\(x\\). Write the last line with \\(t\\) replaced by the function you put equal to \\(t\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-logform",
      name: "When the numerator is the derivative of the denominator",
      intuition:
        "The derivative of log f(x) is f′(x) over f(x). So whenever the top of a fraction is the derivative of the bottom, the answer is a log at once. Often the top is not quite the derivative: then multiply up to make it so, or split the top into a part that is the denominator and a part that is its derivative.",
      definition:
        "- \\(\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\log|f(x)| + c\\). If the numerator is \\(k\\,f'(x)\\), take \\(k\\) out.\n" +
        "- \\(\\int \\tan x\\,dx = \\log|\\sec x| + c\\) and \\(\\int \\cot x\\,dx = \\log|\\sin x| + c\\) follow from this rule.\n" +
        "- For \\(\\dfrac{1}{ax + bx^{-n}}\\): multiply top and bottom by \\(x^n\\), giving \\(\\dfrac{x^n}{ax^{n+1} + b}\\), whose top is a multiple of the derivative of the bottom.\n" +
        "- For \\(\\dfrac{pe^x + q}{ae^x + b}\\): write the numerator as \\(A(ae^x + b) + B\\dfrac{d}{dx}(ae^x + b)\\), find \\(A\\) and \\(B\\) by comparing coefficients; the answer is \\(Ax + B\\log|ae^x + b| + c\\).",
      formula: {
        label: "Log rule",
        latex: "\\int \\frac{f'(x)}{f(x)}\\,dx = \\log|f(x)| + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{3e^x + 4}{2e^x + 1}\\,dx\\).",
        steps: [
          "Let \\(3e^x + 4 = A(2e^x + 1) + B\\dfrac{d}{dx}(2e^x + 1) = A(2e^x + 1) + 2Be^x\\).",
          "Constant terms: \\(A = 4\\). Coefficients of \\(e^x\\): \\(2A + 2B = 3\\), so \\(B = -\\dfrac{5}{2}\\).",
          "\\(\\int \\dfrac{3e^x + 4}{2e^x + 1}\\,dx = 4\\int dx - \\dfrac{5}{2}\\int \\dfrac{2e^x}{2e^x + 1}\\,dx\\).",
          "\\(\\therefore \\int \\dfrac{3e^x + 4}{2e^x + 1}\\,dx = 4x - \\dfrac{5}{2}\\log(2e^x + 1) + c\\), the modulus not needed since \\(2e^x + 1 > 0\\).",
        ],
        answer: "\\(4x - \\dfrac{5}{2}\\log(2e^x + 1) + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{\\sec^2 x}{3 + \\tan x}\\,dx\\).",
        steps: ["The numerator is the derivative of \\(3 + \\tan x\\)."],
        answer: "\\(\\log|3 + \\tan x| + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{2x + 3}{x^2 + 3x + 7}\\,dx\\).", answer: "\\(\\log(x^2 + 3x + 7) + c\\)" },
        { prompt: "Evaluate \\(\\int \\cot x\\,dx\\).", answer: "\\(\\int \\dfrac{\\cos x}{\\sin x}\\,dx = \\log|\\sin x| + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{x\\log x}\\,dx\\).", answer: "The numerator \\(\\dfrac{1}{x}\\) is the derivative of \\(\\log x\\): \\(\\log|\\log x| + c\\)" },
      ],
      pyqExampleId: "532c65e4-747c-4702-8b20-2629471985c8",
      traps: [
        {
          title: "The log of a negative number",
          body: "Write \\(\\log|f(x)|\\). Drop the modulus only when \\(f(x)\\) is always positive, such as \\(1 + x^2\\) or \\(e^x + 1\\), and say why.",
        },
        {
          title: "A numerator that is only nearly the derivative",
          body: "If the top is not a multiple of the derivative of the bottom, it does not all go into the log. Split it as \\(A\\) times the denominator plus \\(B\\) times its derivative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-algebraic",
      name: "Algebraic substitutions: t = ax + b and roots",
      intuition:
        "A polynomial times the root of a linear expression has no derivative in it to swallow, but putting t equal to the linear expression, or to the root, turns every piece into powers of t. The one rule is to change everything: each x, and dx too.",
      definition:
        "- For \\((px+q)\\sqrt{ax+b}\\) or \\(\\dfrac{px+q}{\\sqrt{ax+b}}\\): put \\(t = ax + b\\), so \\(x = \\dfrac{t - b}{a}\\) and \\(dx = \\dfrac{dt}{a}\\).\n" +
        "- For \\(\\dfrac{1}{x + \\sqrt{x}}\\) or \\(\\dfrac{1}{\\sqrt{x} + \\sqrt{x^3}}\\): take \\(\\sqrt{x}\\) out and put \\(t = \\sqrt{x}\\) (or \\(t = \\sqrt{x} + 1\\)).\n" +
        "- For \\(x^3\\sqrt{a^2 + x^2}\\) and similar: put \\(t^2 = a^2 + x^2\\), so \\(x\\,dx = t\\,dt\\).\n" +
        "- Write the integrand fully in \\(t\\), expand into powers of \\(t\\), integrate, and put back.",
      formula: {
        label: "Linear substitution",
        latex: "t = ax + b \\;\\Rightarrow\\; x = \\frac{t - b}{a}, \\qquad dx = \\frac{dt}{a}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int x\\sqrt{x + 2}\\,dx\\).",
        steps: [
          "Put \\(t = x + 2\\), so \\(x = t - 2\\) and \\(dx = dt\\).",
          "\\(\\int x\\sqrt{x+2}\\,dx = \\int (t - 2)\\,t^{1/2}\\,dt = \\int \\left(t^{3/2} - 2t^{1/2}\\right) dt\\).",
          "\\(= \\dfrac{2}{5}t^{5/2} - \\dfrac{4}{3}t^{3/2} + c\\).",
          "\\(\\therefore \\int x\\sqrt{x+2}\\,dx = \\dfrac{2}{5}(x+2)^{5/2} - \\dfrac{4}{3}(x+2)^{3/2} + c\\).",
        ],
        answer: "\\(\\dfrac{2}{5}(x+2)^{5/2} - \\dfrac{4}{3}(x+2)^{3/2} + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int x^3\\sqrt{1 + x^2}\\,dx\\).",
        steps: [
          "Put \\(t^2 = 1 + x^2\\): \\(x\\,dx = t\\,dt\\) and \\(x^2 = t^2 - 1\\).",
          "\\(\\int (t^2 - 1)\\,t\\cdot t\\,dt = \\int (t^4 - t^2)\\,dt = \\dfrac{t^5}{5} - \\dfrac{t^3}{3}\\).",
        ],
        answer: "\\(\\dfrac{(1 + x^2)^{5/2}}{5} - \\dfrac{(1 + x^2)^{3/2}}{3} + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int (2x - 1)\\sqrt{x + 1}\\,dx\\).", answer: "Put \\(t = x + 1\\), \\(2x - 1 = 2t - 3\\): \\(\\dfrac{4}{5}(x+1)^{5/2} - 2(x+1)^{3/2} + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{x}{(x+3)^2}\\,dx\\).", answer: "Put \\(t = x + 3\\): \\(\\int \\dfrac{t - 3}{t^2}\\,dt\\), so \\(\\log|x + 3| + \\dfrac{3}{x+3} + c\\)" },
      ],
      pyqExampleId: "c8b73079-4389-45dc-ab36-bf6a31f68af8",
      traps: [
        {
          title: "Changing x but not dx",
          body: "With \\(t = 3x + 1\\), \\(dx = \\dfrac{dt}{3}\\), not \\(dt\\). Write the \\(dx\\) line before you write the new integral.",
        },
        {
          title: "Splitting a root over a sum",
          body: "\\(\\sqrt{x + 2}\\) is not \\(\\sqrt{x} + \\sqrt{2}\\). Keep the root whole by putting \\(t = x + 2\\).",
        },
      ],
    },
  ],
};
