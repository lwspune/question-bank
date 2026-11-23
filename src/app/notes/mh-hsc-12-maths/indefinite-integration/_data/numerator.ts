import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_II_NUMERATOR_NOTE: SubtopicNote = {
  subtopicName: "Integrals of the Type (px+q) over a Quadratic",
  title: "A Linear Numerator over a Quadratic",
  oneLineDefinition:
    "For (px + q) over a quadratic or its square root, split the numerator into a multiple of the derivative of the quadratic plus a constant; the first part gives a log or a root, the second a special integral.",
  whyItMatters:
    "14 questions, one of them from a board paper: x over x² + 4x + 8 (2020). The textbook rows are Exercise 3.2(C), its solved examples and one Miscellaneous item: a linear numerator over a quadratic or over its square root, and roots of ratios such as √((x − 5)/(x − 7)).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmii-split",
      name: "Split the numerator: px + q = A times the derivative + B",
      intuition:
        "The derivative of the quadratic is linear, and so is the numerator. So the numerator is some multiple of that derivative plus a leftover constant. The multiple gives a log (or a root, if the quadratic is under a square root), and the constant gives a special integral after completing the square.",
      definition:
        "- Write \\(px + q = A\\dfrac{d}{dx}(ax^2 + bx + c) + B = A(2ax + b) + B\\).\n" +
        "- Compare coefficients: \\(2aA = p\\) and \\(Ab + B = q\\).\n" +
        "- First part: \\(A\\int \\dfrac{2ax + b}{ax^2 + bx + c}\\,dx = A\\log|ax^2 + bx + c|\\).\n" +
        "- Under a root: \\(A\\int \\dfrac{2ax + b}{\\sqrt{ax^2 + bx + c}}\\,dx = 2A\\sqrt{ax^2 + bx + c}\\).\n" +
        "- Second part: \\(B\\int \\dfrac{dx}{ax^2 + bx + c}\\) (or under a root): complete the square and use a standard result.",
      formula: {
        label: "Splitting the numerator",
        latex: "\\int \\frac{px+q}{ax^2+bx+c}\\,dx = A\\log|ax^2+bx+c| + B\\int \\frac{dx}{ax^2+bx+c}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{2x + 5}{x^2 + 2x + 5}\\,dx\\).",
        steps: [
          "\\(\\dfrac{d}{dx}(x^2 + 2x + 5) = 2x + 2\\), so write \\(2x + 5 = (2x + 2) + 3\\).",
          "\\(\\int \\dfrac{2x + 5}{x^2 + 2x + 5}\\,dx = \\int \\dfrac{2x + 2}{x^2 + 2x + 5}\\,dx + 3\\int \\dfrac{dx}{(x + 1)^2 + 2^2}\\).",
          "First part: \\(\\log(x^2 + 2x + 5)\\), with no modulus since \\(x^2 + 2x + 5 = (x+1)^2 + 4 > 0\\).",
          "Second part: \\(3\\cdot\\dfrac{1}{2}\\tan^{-1}\\dfrac{x + 1}{2}\\).",
          "\\(\\therefore \\int \\dfrac{2x + 5}{x^2 + 2x + 5}\\,dx = \\log(x^2 + 2x + 5) + \\dfrac{3}{2}\\tan^{-1}\\left(\\dfrac{x + 1}{2}\\right) + c\\).",
        ],
        answer: "\\(\\log(x^2 + 2x + 5) + \\dfrac{3}{2}\\tan^{-1}\\left(\\dfrac{x + 1}{2}\\right) + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{x + 1}{\\sqrt{x^2 + 2x + 3}}\\,dx\\).",
        steps: ["\\(x + 1 = \\dfrac{1}{2}(2x + 2)\\), so \\(B = 0\\) and the integral is \\(\\dfrac{1}{2}\\cdot 2\\sqrt{x^2 + 2x + 3}\\)."],
        answer: "\\(\\sqrt{x^2 + 2x + 3} + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{3x + 1}{x^2 + 1}\\,dx\\).", answer: "\\(\\dfrac{3}{2}\\log(x^2 + 1) + \\tan^{-1} x + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{x}{\\sqrt{x^2 + 4x + 5}}\\,dx\\).", answer: "\\(x = \\dfrac{1}{2}(2x + 4) - 2\\): \\(\\sqrt{x^2 + 4x + 5} - 2\\log\\left|x + 2 + \\sqrt{x^2 + 4x + 5}\\right| + c\\)" },
      ],
      pyqExampleId: "2a4a58c6-df34-47a0-a5c0-269ce839788d",
      traps: [
        {
          title: "Completing the square before splitting",
          body: "Split the numerator first. Completing the square in the denominator alone leaves an \\(x\\) on top that no standard result takes.",
        },
        {
          title: "Under a root the first part is not a log",
          body: "\\(\\int \\dfrac{f'(x)}{\\sqrt{f(x)}}\\,dx = 2\\sqrt{f(x)} + c\\). The log comes only when there is no root.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-ratio",
      name: "Square root of a ratio: rationalise first",
      intuition:
        "A square root of a fraction of two linear expressions cannot be integrated as it stands. Multiplying top and bottom inside the root by the numerator moves the root to the denominator alone: the top becomes linear and the bottom the root of a quadratic, which is the split of the first concept.",
      definition:
        "- \\(\\sqrt{\\dfrac{x - a}{x - b}} = \\dfrac{x - a}{\\sqrt{(x - a)(x - b)}}\\), on the interval where both sides are real.\n" +
        "- \\(\\sqrt{\\dfrac{a - x}{x}} = \\dfrac{a - x}{\\sqrt{ax - x^2}}\\).\n" +
        "- Expand the product under the root into a quadratic, then split the linear numerator as \\(A\\) times the derivative plus \\(B\\).",
      formula: {
        label: "Rationalising the ratio",
        latex: "\\sqrt{\\frac{x-a}{x-b}} = \\frac{x - a}{\\sqrt{(x-a)(x-b)}}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\sqrt{\\dfrac{x - 1}{x - 3}}\\,dx\\), for \\(x > 3\\).",
        steps: [
          "Rationalise: \\(\\sqrt{\\dfrac{x - 1}{x - 3}} = \\dfrac{x - 1}{\\sqrt{(x - 1)(x - 3)}} = \\dfrac{x - 1}{\\sqrt{x^2 - 4x + 3}}\\).",
          "Split: \\(x - 1 = \\dfrac{1}{2}(2x - 4) + 1\\).",
          "\\(\\dfrac{1}{2}\\int \\dfrac{2x - 4}{\\sqrt{x^2 - 4x + 3}}\\,dx = \\sqrt{x^2 - 4x + 3}\\).",
          "\\(\\int \\dfrac{dx}{\\sqrt{(x - 2)^2 - 1}} = \\log\\left|x - 2 + \\sqrt{x^2 - 4x + 3}\\right|\\).",
          "\\(\\therefore \\int \\sqrt{\\dfrac{x - 1}{x - 3}}\\,dx = \\sqrt{x^2 - 4x + 3} + \\log\\left|x - 2 + \\sqrt{x^2 - 4x + 3}\\right| + c\\).",
        ],
        answer: "\\(\\sqrt{x^2 - 4x + 3} + \\log\\left|x - 2 + \\sqrt{x^2 - 4x + 3}\\right| + c\\)",
      },
      selfCheckExample: {
        prompt: "Write \\(\\sqrt{\\dfrac{3 + x}{3 - x}}\\) as a fraction with a root only in the denominator.",
        steps: ["Multiply top and bottom inside the root by \\(3 + x\\)."],
        answer: "\\(\\dfrac{3 + x}{\\sqrt{9 - x^2}}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\sqrt{\\dfrac{2 + x}{2 - x}}\\,dx\\).", answer: "\\(\\dfrac{2 + x}{\\sqrt{4 - x^2}}\\): \\(2\\sin^{-1}\\left(\\dfrac{x}{2}\\right) - \\sqrt{4 - x^2} + c\\)" },
      ],
      pyqExampleId: "a3541f64-6e35-41a3-b6ca-29615926a422",
      traps: [
        {
          title: "Multiplying by the wrong factor",
          body: "Multiply inside the root by the NUMERATOR, so that the top becomes a perfect square and leaves the root. Multiplying by the denominator moves the root to the top instead.",
        },
        {
          title: "Forgetting the second part",
          body: "After the split, the constant \\(B\\) still needs its own standard integral. An answer with only the root term has lost half the marks.",
        },
      ],
    },
  ],
};
