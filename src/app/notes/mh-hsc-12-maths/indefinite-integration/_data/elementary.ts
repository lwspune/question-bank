import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_II_ELEMENTARY_NOTE: SubtopicNote = {
  subtopicName: "Elementary Integration and Standard Formulae",
  title: "Elementary Integration and the Standard Formulae",
  oneLineDefinition:
    "Integration runs differentiation backwards: if the derivative of g(x) is f(x), then the integral of f(x) is g(x) + c, and a short table of standard formulae covers most simple integrands.",
  whyItMatters:
    "55 questions, five of them from board papers: MCQs on the integral of 1/(4x − 1) (2022), cos³x (2023) and xˣ(1 + log x) (2025), and two short evaluations, 5ˣ/3ˣ (2024) and 1/√x (2025). The textbook rows are Exercise 3.1, its solved examples and a few Miscellaneous items: the power rule, (ax + b) forms, rationalising, and integrands that a trigonometric identity turns into standard ones.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmii-formulae",
      name: "Primitive, constant of integration and the standard formulae",
      intuition:
        "Integration asks the question differentiation answers, but the other way round. You know the derivative of x³ is 3x², so the integral of 3x² is x³. A constant has derivative zero, so x³ + 5 and x³ − 2 have the same derivative too: that is why every answer carries + c. Most short questions need only the table of standard formulae and the rule that the integral of a sum is the sum of the integrals.",
      definition:
        "- If \\(\\dfrac{d}{dx}g(x) = f(x)\\), then \\(\\int f(x)\\,dx = g(x) + c\\). Here \\(g(x)\\) is a **primitive** of \\(f(x)\\) and \\(c\\) is an arbitrary constant.\n" +
        "- \\(\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + c\\) for \\(n \\neq -1\\), and \\(\\int \\dfrac{1}{x}\\,dx = \\log|x| + c\\).\n" +
        "- \\(\\int e^x\\,dx = e^x + c\\) and \\(\\int a^x\\,dx = \\dfrac{a^x}{\\log a} + c\\) for \\(a > 0\\), \\(a \\neq 1\\).\n" +
        "- \\(\\int \\sin x\\,dx = -\\cos x + c\\), \\(\\int \\cos x\\,dx = \\sin x + c\\), \\(\\int \\sec^2 x\\,dx = \\tan x + c\\), \\(\\int \\operatorname{cosec}^2 x\\,dx = -\\cot x + c\\).\n" +
        "- \\(\\int \\sec x\\tan x\\,dx = \\sec x + c\\) and \\(\\int \\operatorname{cosec} x\\cot x\\,dx = -\\operatorname{cosec} x + c\\).\n" +
        "- \\(\\int [f(x) \\pm g(x)]\\,dx = \\int f(x)\\,dx \\pm \\int g(x)\\,dx\\) and \\(\\int k\\,f(x)\\,dx = k\\int f(x)\\,dx\\).\n" +
        "- Given \\(f'(x)\\) and one value of \\(f\\): integrate first, then use the value to find \\(c\\).",
      formula: {
        label: "Power rule and exponential rule",
        latex: "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + c \\;\\; (n \\neq -1), \\qquad \\int a^x\\,dx = \\frac{a^x}{\\log a} + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{(x+1)^2}{\\sqrt{x}}\\,dx\\).",
        steps: [
          "Expand the numerator: \\((x+1)^2 = x^2 + 2x + 1\\).",
          "Divide each term by \\(\\sqrt{x} = x^{1/2}\\): \\(\\dfrac{(x+1)^2}{\\sqrt{x}} = x^{3/2} + 2x^{1/2} + x^{-1/2}\\).",
          "Use \\(\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}\\) on each term: \\(\\int x^{3/2}\\,dx = \\dfrac{2}{5}x^{5/2}\\), \\(\\int 2x^{1/2}\\,dx = \\dfrac{4}{3}x^{3/2}\\), \\(\\int x^{-1/2}\\,dx = 2x^{1/2}\\).",
          "\\(\\therefore \\int \\dfrac{(x+1)^2}{\\sqrt{x}}\\,dx = \\dfrac{2}{5}x^{5/2} + \\dfrac{4}{3}x^{3/2} + 2\\sqrt{x} + c\\).",
        ],
        answer: "\\(\\dfrac{2}{5}x^{5/2} + \\dfrac{4}{3}x^{3/2} + 2\\sqrt{x} + c\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(f(x)\\) if \\(f'(x) = 6x^2 - 4\\) and \\(f(1) = 5\\).",
        steps: [
          "\\(f(x) = \\int (6x^2 - 4)\\,dx = 2x^3 - 4x + c\\).",
          "\\(f(1) = 2 - 4 + c = 5\\), so \\(c = 7\\).",
        ],
        answer: "\\(f(x) = 2x^3 - 4x + 7\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int 3^{2x}\\,dx\\).", answer: "\\(\\dfrac{3^{2x}}{2\\log 3} + c\\), since \\(3^{2x} = 9^x\\) and \\(\\log 9 = 2\\log 3\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{e^{2\\log x}}{x}\\,dx\\).", answer: "\\(e^{2\\log x} = x^2\\), so the integral is \\(\\int x\\,dx = \\dfrac{x^2}{2} + c\\)" },
        { prompt: "Evaluate \\(\\int (\\sec^2 x - \\operatorname{cosec}^2 x)\\,dx\\).", answer: "\\(\\tan x + \\cot x + c\\)" },
      ],
      pyqExampleId: "6e49f7d4-090e-4a19-8cb1-a8e99ef26d6f",
      traps: [
        {
          title: "Leaving out + c",
          body: "An indefinite integral is a whole family of functions. Write \\(+ c\\) in the final line of every answer, or the board takes off the mark for the answer.",
        },
        {
          title: "Using the power rule at n = −1",
          body: "\\(\\int x^{-1}\\,dx\\) is \\(\\log|x| + c\\). The power rule would divide by \\(n + 1 = 0\\), which is why it excludes \\(n = -1\\).",
        },
        {
          title: "Integrating a product term by term",
          body: "The integral of a product is not the product of the integrals. Expand \\((x+1)^2\\) or divide by \\(\\sqrt{x}\\) first, then integrate each term.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-axb",
      name: "The linear argument ax + b and algebraic rewriting",
      intuition:
        "When x inside a standard function is replaced by ax + b, the answer keeps its shape and is simply divided by a, because differentiating ax + b brings out a factor a. Fractions with a linear denominator, roots of linear expressions and differences of two roots all come down to this rule after a little algebra.",
      definition:
        "- If \\(\\int f(x)\\,dx = g(x) + c\\), then \\(\\int f(ax+b)\\,dx = \\dfrac{1}{a}\\,g(ax+b) + c\\), for \\(a \\neq 0\\).\n" +
        "- \\(\\int (ax+b)^n\\,dx = \\dfrac{(ax+b)^{n+1}}{a(n+1)} + c\\) for \\(n \\neq -1\\), and \\(\\int \\dfrac{dx}{ax+b} = \\dfrac{1}{a}\\log|ax+b| + c\\).\n" +
        "- For \\(\\dfrac{px+q}{ax+b}\\): write \\(px + q = \\dfrac{p}{a}(ax+b) + \\left(q - \\dfrac{pb}{a}\\right)\\), then split into a constant and a multiple of \\(\\dfrac{1}{ax+b}\\).\n" +
        "- For \\(\\dfrac{px+q}{\\sqrt{ax+b}}\\): the same split gives a \\((ax+b)^{1/2}\\) term and an \\((ax+b)^{-1/2}\\) term.\n" +
        "- For \\(\\dfrac{1}{\\sqrt{ax+b} - \\sqrt{ax+d}}\\): multiply by the conjugate; the denominator becomes the constant \\(b - d\\).\n" +
        "- An improper fraction such as \\(\\dfrac{x^3}{x - 1}\\): divide first.",
      formula: {
        label: "The (ax + b) rule",
        latex: "\\int f(ax+b)\\,dx = \\frac{1}{a}\\,g(ax+b) + c \\quad \\text{when } \\int f(x)\\,dx = g(x) + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{3x+5}{2x+1}\\,dx\\).",
        steps: [
          "Write the numerator in terms of the denominator: \\(3x + 5 = \\dfrac{3}{2}(2x+1) + \\dfrac{7}{2}\\).",
          "So \\(\\dfrac{3x+5}{2x+1} = \\dfrac{3}{2} + \\dfrac{7}{2}\\cdot\\dfrac{1}{2x+1}\\).",
          "Integrate, using \\(\\int \\dfrac{dx}{2x+1} = \\dfrac{1}{2}\\log|2x+1|\\): \\(\\dfrac{3}{2}x + \\dfrac{7}{2}\\cdot\\dfrac{1}{2}\\log|2x+1|\\).",
          "\\(\\therefore \\int \\dfrac{3x+5}{2x+1}\\,dx = \\dfrac{3}{2}x + \\dfrac{7}{4}\\log|2x+1| + c\\).",
        ],
        answer: "\\(\\dfrac{3}{2}x + \\dfrac{7}{4}\\log|2x+1| + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int (5x - 2)^4\\,dx\\).",
        steps: ["\\(\\int (5x-2)^4\\,dx = \\dfrac{(5x-2)^5}{5 \\times 5} + c\\)."],
        answer: "\\(\\dfrac{(5x-2)^5}{25} + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{x+1}{\\sqrt{2x+3}}\\,dx\\).", answer: "Write \\(x + 1 = \\dfrac{1}{2}(2x+3) - \\dfrac{1}{2}\\); the answer is \\(\\dfrac{1}{6}(2x+3)^{3/2} - \\dfrac{1}{2}\\sqrt{2x+3} + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{\\sqrt{x+4} - \\sqrt{x+1}}\\,dx\\).", answer: "Multiply by the conjugate: the integrand is \\(\\dfrac{\\sqrt{x+4} + \\sqrt{x+1}}{3}\\), so the answer is \\(\\dfrac{2}{9}\\left[(x+4)^{3/2} + (x+1)^{3/2}\\right] + c\\)" },
        { prompt: "Evaluate \\(\\int e^{3x-2}\\,dx\\).", answer: "\\(\\dfrac{1}{3}e^{3x-2} + c\\)" },
      ],
      pyqExampleId: "2f85b32e-0086-4a5b-bd14-9738a41eb8af",
      traps: [
        {
          title: "Forgetting to divide by a",
          body: "\\(\\int \\cos 3x\\,dx = \\dfrac{1}{3}\\sin 3x + c\\), not \\(\\sin 3x + c\\). Differentiate your answer in your head: the chain rule must give back exactly the integrand.",
        },
        {
          title: "Using the 1/a shortcut on a non-linear inside",
          body: "The rule works only for \\(ax + b\\). \\(\\int e^{x^2}\\,dx\\) is not \\(\\dfrac{e^{x^2}}{2x}\\); an inside such as \\(x^2\\) needs a substitution with its derivative present.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-identities",
      name: "Trigonometric identities before integrating",
      intuition:
        "Many trigonometric integrands are not in the table as they stand but fall into it after one identity. Squares and cubes come down through the double and triple angle formulae, products of sines and cosines become sums, and 1 over 1 ± sin x is rationalised into sec² x and sec x tan x.",
      definition:
        "- \\(\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}\\), \\(\\cos^2 x = \\dfrac{1 + \\cos 2x}{2}\\), \\(\\tan^2 x = \\sec^2 x - 1\\), \\(\\cot^2 x = \\operatorname{cosec}^2 x - 1\\).\n" +
        "- \\(\\cos^3 x = \\dfrac{\\cos 3x + 3\\cos x}{4}\\) and \\(\\sin^3 x = \\dfrac{3\\sin x - \\sin 3x}{4}\\).\n" +
        "- \\(2\\sin A\\cos B = \\sin(A+B) + \\sin(A-B)\\), \\(2\\cos A\\cos B = \\cos(A+B) + \\cos(A-B)\\), \\(2\\sin A\\sin B = \\cos(A-B) - \\cos(A+B)\\).\n" +
        "- For \\(\\dfrac{1}{1 \\pm \\sin x}\\): multiply by \\(1 \\mp \\sin x\\), which gives \\(\\dfrac{1 \\mp \\sin x}{\\cos^2 x}\\).\n" +
        "- \\(1 + \\sin 2x = (\\sin x + \\cos x)^2\\), \\(1 - \\cos 2x = 2\\sin^2 x\\), \\(1 + \\cos 2x = 2\\cos^2 x\\).\n" +
        "- An inverse trigonometric function of a trigonometric function: simplify the argument first, for example \\(\\tan^{-1}(\\tan x) = x\\) on its principal range.",
      formula: {
        label: "Power reduction",
        latex: "\\sin^2 x = \\frac{1 - \\cos 2x}{2}, \\qquad \\cos^2 x = \\frac{1 + \\cos 2x}{2}, \\qquad \\cos^3 x = \\frac{\\cos 3x + 3\\cos x}{4}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\cos 5x\\cos 2x\\,dx\\).",
        steps: [
          "Use \\(2\\cos A\\cos B = \\cos(A+B) + \\cos(A-B)\\): \\(\\cos 5x\\cos 2x = \\dfrac{1}{2}(\\cos 7x + \\cos 3x)\\).",
          "\\(\\int \\cos 5x\\cos 2x\\,dx = \\dfrac{1}{2}\\int \\cos 7x\\,dx + \\dfrac{1}{2}\\int \\cos 3x\\,dx\\).",
          "\\(= \\dfrac{1}{2}\\cdot\\dfrac{\\sin 7x}{7} + \\dfrac{1}{2}\\cdot\\dfrac{\\sin 3x}{3}\\).",
          "\\(\\therefore \\int \\cos 5x\\cos 2x\\,dx = \\dfrac{\\sin 7x}{14} + \\dfrac{\\sin 3x}{6} + c\\).",
        ],
        answer: "\\(\\dfrac{\\sin 7x}{14} + \\dfrac{\\sin 3x}{6} + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\sin^2 x\\,dx\\).",
        steps: ["\\(\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}\\), so the integral is \\(\\dfrac{x}{2} - \\dfrac{\\sin 2x}{4}\\)."],
        answer: "\\(\\dfrac{x}{2} - \\dfrac{\\sin 2x}{4} + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\cot^2 x\\,dx\\).", answer: "\\(\\int (\\operatorname{cosec}^2 x - 1)\\,dx = -\\cot x - x + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{1 + \\cos 2x}\\,dx\\).", answer: "\\(1 + \\cos 2x = 2\\cos^2 x\\), so the integral is \\(\\dfrac{1}{2}\\int \\sec^2 x\\,dx = \\dfrac{1}{2}\\tan x + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{1 + \\sin x}\\,dx\\).", answer: "Multiply by \\(1 - \\sin x\\): \\(\\int (\\sec^2 x - \\sec x\\tan x)\\,dx = \\tan x - \\sec x + c\\)" },
      ],
      pyqExampleId: "da7c7912-a66f-4aee-aa21-fae6b834112f",
      traps: [
        {
          title: "Integrating a power of sin x as if it were a power of x",
          body: "\\(\\int \\sin^2 x\\,dx\\) is not \\(\\dfrac{\\sin^3 x}{3}\\). That would need a factor \\(\\cos x\\) beside it. Reduce the power with the double angle formula first.",
        },
        {
          title: "The root of a square is a modulus",
          body: "\\(\\sqrt{1 + \\sin 2x} = |\\sin x + \\cos x|\\). The answer \\(\\sin x - \\cos x + c\\) holds where \\(\\sin x + \\cos x > 0\\); say so in one line.",
        },
      ],
    },
  ],
};
