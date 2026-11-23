import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_II_FRACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Integration by Partial Fractions",
  title: "Integration by Partial Fractions",
  oneLineDefinition:
    "A proper rational function is split into simpler fractions, one for each factor of the denominator, and each piece integrates to a log or an inverse tangent.",
  whyItMatters:
    "36 questions, two of them from board papers: 5eˣ over (eˣ + 1)(e²ˣ + 9) (2024), and (3x² + 4x − 5) over (x² − 1)(x + 2) (2026), the same as a solved example of the textbook. The textbook rows are Exercise 3.4, its solved examples and Miscellaneous items.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmii-linfactors",
      name: "Non-repeated linear factors",
      intuition:
        "A fraction whose denominator is a product of different linear factors is a sum of simple fractions A over each factor. Each constant is found in one line by putting x equal to the value that makes its factor zero, and each piece integrates to a log.",
      definition:
        "- A rational function \\(\\dfrac{f(x)}{g(x)}\\) is **proper** when the degree of \\(f\\) is less than the degree of \\(g\\). If it is not, divide first: quotient plus a proper fraction.\n" +
        "- \\(\\dfrac{px + q}{(x - a)(x - b)} = \\dfrac{A}{x - a} + \\dfrac{B}{x - b}\\).\n" +
        "- Multiply through by the denominator; put \\(x = a\\) to find \\(A\\) and \\(x = b\\) to find \\(B\\).\n" +
        "- \\(\\int \\dfrac{A}{x - a}\\,dx = A\\log|x - a| + c\\), and \\(\\int \\dfrac{dx}{ax + b} = \\dfrac{1}{a}\\log|ax + b| + c\\).",
      formula: {
        label: "Distinct linear factors",
        latex: "\\frac{px^2+qx+r}{(x-a)(x-b)(x-c)} = \\frac{A}{x-a} + \\frac{B}{x-b} + \\frac{C}{x-c}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{x + 7}{(x - 1)(x + 2)}\\,dx\\).",
        steps: [
          "Let \\(\\dfrac{x + 7}{(x - 1)(x + 2)} = \\dfrac{A}{x - 1} + \\dfrac{B}{x + 2}\\), so \\(x + 7 = A(x + 2) + B(x - 1)\\).",
          "Put \\(x = 1\\): \\(8 = 3A\\), \\(A = \\dfrac{8}{3}\\). Put \\(x = -2\\): \\(5 = -3B\\), \\(B = -\\dfrac{5}{3}\\).",
          "\\(\\int \\dfrac{x + 7}{(x - 1)(x + 2)}\\,dx = \\dfrac{8}{3}\\int \\dfrac{dx}{x - 1} - \\dfrac{5}{3}\\int \\dfrac{dx}{x + 2}\\).",
          "\\(\\therefore \\int \\dfrac{x + 7}{(x - 1)(x + 2)}\\,dx = \\dfrac{8}{3}\\log|x - 1| - \\dfrac{5}{3}\\log|x + 2| + c\\).",
        ],
        answer: "\\(\\dfrac{8}{3}\\log|x - 1| - \\dfrac{5}{3}\\log|x + 2| + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{x^2}{x^2 - 1}\\,dx\\).",
        steps: [
          "Improper, so divide: \\(\\dfrac{x^2}{x^2 - 1} = 1 + \\dfrac{1}{x^2 - 1}\\).",
          "\\(\\dfrac{1}{x^2 - 1} = \\dfrac{1}{2}\\left[\\dfrac{1}{x - 1} - \\dfrac{1}{x + 1}\\right]\\).",
        ],
        answer: "\\(x + \\dfrac{1}{2}\\log\\left|\\dfrac{x - 1}{x + 1}\\right| + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{1}{x(x + 3)}\\,dx\\).", answer: "\\(\\dfrac{1}{3}\\log\\left|\\dfrac{x}{x + 3}\\right| + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{2x + 1}{x^2 - 5x + 6}\\,dx\\).", answer: "\\(x^2 - 5x + 6 = (x - 2)(x - 3)\\): \\(7\\log|x - 3| - 5\\log|x - 2| + c\\)" },
      ],
      pyqExampleId: "9d42cb2c-6fca-47bd-8c5a-15d1fdbc76ab",
      traps: [
        {
          title: "Splitting an improper fraction",
          body: "If the degree of the numerator is not less than that of the denominator, divide first. Partial fractions of an improper fraction miss the quotient and give a wrong answer.",
        },
        {
          title: "Dropping the 1/a with a factor like 3x + 1",
          body: "\\(\\int \\dfrac{dx}{3x + 1} = \\dfrac{1}{3}\\log|3x + 1| + c\\). The partial fraction constant and this \\(\\dfrac{1}{3}\\) multiply together.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-repeated",
      name: "Repeated linear factors and quadratic factors",
      intuition:
        "A repeated factor needs a fraction for every power of it, and a quadratic factor that does not split needs a linear numerator, not a constant. The constants that the 'put x equal to' trick cannot reach are found by comparing coefficients.",
      definition:
        "- A repeated factor \\((x - a)^2\\) gives \\(\\dfrac{A}{x - a} + \\dfrac{B}{(x - a)^2}\\).\n" +
        "- A quadratic factor \\(x^2 + bx + c\\) with no real factors gives \\(\\dfrac{Bx + C}{x^2 + bx + c}\\).\n" +
        "- Find the constants by putting convenient values of \\(x\\), then compare the coefficients of the highest power for the rest.\n" +
        "- \\(\\int \\dfrac{dx}{(x - a)^2} = -\\dfrac{1}{x - a} + c\\).\n" +
        "- An expression in \\(x^2\\) only, such as \\(\\dfrac{x^2}{(x^2 + 1)(x^2 + 4)}\\): put \\(x^2 = m\\) only to find the constants, then write the fractions in \\(x\\) again.",
      formula: {
        label: "Repeated and quadratic factors",
        latex: "\\frac{f(x)}{(x-a)^2(x-b)} = \\frac{A}{x-a} + \\frac{B}{(x-a)^2} + \\frac{C}{x-b}, \\qquad \\frac{f(x)}{(x-a)(x^2+k)} = \\frac{A}{x-a} + \\frac{Bx+C}{x^2+k}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{x^2}{(x^2 + 1)(x^2 + 4)}\\,dx\\).",
        steps: [
          "Put \\(x^2 = m\\): \\(\\dfrac{m}{(m + 1)(m + 4)} = \\dfrac{A}{m + 1} + \\dfrac{B}{m + 4}\\), so \\(m = A(m + 4) + B(m + 1)\\).",
          "\\(m = -1\\): \\(-1 = 3A\\), \\(A = -\\dfrac{1}{3}\\). \\(m = -4\\): \\(-4 = -3B\\), \\(B = \\dfrac{4}{3}\\).",
          "\\(\\int \\dfrac{x^2\\,dx}{(x^2 + 1)(x^2 + 4)} = -\\dfrac{1}{3}\\int \\dfrac{dx}{x^2 + 1} + \\dfrac{4}{3}\\int \\dfrac{dx}{x^2 + 2^2}\\).",
          "\\(= -\\dfrac{1}{3}\\tan^{-1} x + \\dfrac{4}{3}\\cdot\\dfrac{1}{2}\\tan^{-1}\\dfrac{x}{2} + c\\).",
          "\\(\\therefore \\int \\dfrac{x^2\\,dx}{(x^2 + 1)(x^2 + 4)} = -\\dfrac{1}{3}\\tan^{-1} x + \\dfrac{2}{3}\\tan^{-1}\\left(\\dfrac{x}{2}\\right) + c\\).",
        ],
        answer: "\\(-\\dfrac{1}{3}\\tan^{-1} x + \\dfrac{2}{3}\\tan^{-1}\\left(\\dfrac{x}{2}\\right) + c\\)",
      },
      selfCheckExample: {
        prompt: "Write the form of the partial fractions of \\(\\dfrac{2x + 1}{(x - 2)(x^2 + 1)}\\).",
        steps: ["\\(x^2 + 1\\) has no real factors, so it takes a linear numerator."],
        answer: "\\(\\dfrac{A}{x - 2} + \\dfrac{Bx + C}{x^2 + 1}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{1}{x(x^2 + 1)}\\,dx\\).", answer: "\\(\\dfrac{1}{x} - \\dfrac{x}{x^2 + 1}\\): \\(\\log|x| - \\dfrac{1}{2}\\log(x^2 + 1) + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{(x^2 + 1)(x^2 + 9)}\\,dx\\).", answer: "\\(\\dfrac{1}{8}\\left[\\dfrac{1}{x^2 + 1} - \\dfrac{1}{x^2 + 9}\\right]\\): \\(\\dfrac{1}{8}\\tan^{-1} x - \\dfrac{1}{24}\\tan^{-1}\\left(\\dfrac{x}{3}\\right) + c\\)" },
      ],
      pyqExampleId: "8094eadb-c69f-4324-a16b-86b9d7afe4f4",
      traps: [
        {
          title: "Missing a power of a repeated factor",
          body: "\\((x + 1)^2\\) in the denominator needs both \\(\\dfrac{A}{x + 1}\\) and \\(\\dfrac{B}{(x + 1)^2}\\). With only one of them the constants cannot be found.",
        },
        {
          title: "A constant over a quadratic factor",
          body: "Over \\(x^2 + 1\\) the numerator must be \\(Bx + C\\). Writing just \\(B\\) forces wrong values for the other constants.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-pfsub",
      name: "Substitute first, then partial fractions",
      intuition:
        "Many integrands are rational functions of eˣ, log x, sin x, cos x or a power of x rather than of x itself. One substitution turns them into an ordinary rational function of t, and the partial fractions are then done in t.",
      definition:
        "- Powers of \\(e^x\\): put \\(t = e^x\\), \\(dt = e^x\\,dx\\).\n" +
        "- \\(\\log x\\): put \\(t = \\log x\\), \\(dt = \\dfrac{dx}{x}\\).\n" +
        "- \\(\\dfrac{1}{x(x^n + 1)}\\): multiply top and bottom by \\(x^{n-1}\\) and put \\(t = x^n\\).\n" +
        "- \\(\\dfrac{1}{\\sin x(a + b\\cos x)}\\): multiply top and bottom by \\(\\sin x\\), write \\(\\sin^2 x = 1 - \\cos^2 x\\) and put \\(t = \\cos x\\). With \\(\\cos x\\) and \\(\\sin x\\) the other way round, put \\(t = \\sin x\\).\n" +
        "- Split the rational function of \\(t\\) into partial fractions, integrate, and put back.",
      formula: {
        label: "eˣ first",
        latex: "t = e^x,\\; dt = e^x\\,dx: \\qquad \\int \\frac{e^x\\,dx}{(e^x+a)(e^x+b)} = \\int \\frac{dt}{(t+a)(t+b)}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{\\sin x(1 + \\cos x)}\\,dx\\).",
        steps: [
          "Multiply top and bottom by \\(\\sin x\\): \\(\\dfrac{\\sin x}{(1 - \\cos^2 x)(1 + \\cos x)} = \\dfrac{\\sin x}{(1 - \\cos x)(1 + \\cos x)^2}\\).",
          "Put \\(t = \\cos x\\), \\(dt = -\\sin x\\,dx\\): \\(I = -\\int \\dfrac{dt}{(1 - t)(1 + t)^2}\\).",
          "\\(\\dfrac{1}{(1 - t)(1 + t)^2} = \\dfrac{A}{1 - t} + \\dfrac{B}{1 + t} + \\dfrac{C}{(1 + t)^2}\\): \\(t = 1\\) gives \\(A = \\dfrac{1}{4}\\); \\(t = -1\\) gives \\(C = \\dfrac{1}{2}\\); the \\(t^2\\) terms give \\(A - B = 0\\), so \\(B = \\dfrac{1}{4}\\).",
          "\\(I = -\\left[-\\dfrac{1}{4}\\log|1 - t| + \\dfrac{1}{4}\\log|1 + t| - \\dfrac{1}{2(1 + t)}\\right] + c\\).",
          "\\(\\therefore I = \\dfrac{1}{4}\\log\\left|\\dfrac{1 - \\cos x}{1 + \\cos x}\\right| + \\dfrac{1}{2(1 + \\cos x)} + c\\).",
        ],
        answer: "\\(\\dfrac{1}{4}\\log\\left|\\dfrac{1 - \\cos x}{1 + \\cos x}\\right| + \\dfrac{1}{2(1 + \\cos x)} + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{x(x^4 + 1)}\\,dx\\).",
        steps: [
          "Multiply by \\(x^3\\): \\(\\dfrac{x^3}{x^4(x^4 + 1)}\\). Put \\(t = x^4\\), \\(x^3\\,dx = \\dfrac{dt}{4}\\).",
          "\\(\\dfrac{1}{4}\\int \\dfrac{dt}{t(t + 1)} = \\dfrac{1}{4}\\log\\left|\\dfrac{t}{t + 1}\\right|\\).",
        ],
        answer: "\\(\\dfrac{1}{4}\\log\\left(\\dfrac{x^4}{x^4 + 1}\\right) + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{1}{x\\log x(1 + \\log x)}\\,dx\\).", answer: "Put \\(t = \\log x\\): \\(\\log\\left|\\dfrac{\\log x}{1 + \\log x}\\right| + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{\\cos x}{(1 + \\sin x)(2 + \\sin x)}\\,dx\\).", answer: "Put \\(t = \\sin x\\): \\(\\log\\left|\\dfrac{1 + \\sin x}{2 + \\sin x}\\right| + c\\)" },
      ],
      pyqExampleId: "72d9b26a-21c5-4ec2-bbb2-48db92bbd886",
      traps: [
        {
          title: "Doing partial fractions in x when the expression is in eˣ",
          body: "\\(\\dfrac{e^x}{(e^x + 1)(e^x + 2)}\\) is not a rational function of \\(x\\). Put \\(t = e^x\\) first; then the factors are linear in \\(t\\).",
        },
        {
          title: "Putting back the wrong function",
          body: "If \\(t = \\cos x\\), every \\(t\\) in the answer becomes \\(\\cos x\\), including the one inside \\(\\dfrac{1}{2(1 + t)}\\).",
        },
      ],
    },
  ],
};
