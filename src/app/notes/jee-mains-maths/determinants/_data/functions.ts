import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTIONS_DET_NOTE: SubtopicNote = {
  subtopicName: "Determinants as Functions of x",
  title: "Determinants as Functions of x",
  oneLineDefinition:
    "Determinants whose entries depend on x or on an angle: simplifying them to a single function, then finding its greatest value, its roots, its derivative or a limit.",
  whyItMatters:
    "Fifteen PYQs, twelve of them multiple choice. Eight reduce a trigonometric determinant to one expression and then find its range or solve it; seven differentiate, integrate or take a limit of a determinant function. Two ideas cover the page.",
  concepts: [
    // C1 — trig determinants
    {
      kind: "formula" as const,
      slug: "jdet-trig-fn",
      name: "Trigonometric determinants",
      intuition:
        "Simplify first with row operations and identities like \\(\\sin^2\\theta+\\cos^2\\theta=1\\); the determinant usually collapses to a short expression in one trigonometric function. Then the range, the maximum or the number of solutions in an interval is an ordinary trigonometry question.",
      definition:
        "- Simplify by row operations and identities before expanding.\n" +
        "- The result is a function of \\(\\theta\\); find its range or roots.\n" +
        "- \\(\\sin^2\\theta\\in[0,1]\\), \\(a\\sin\\theta+b\\cos\\theta\\in\\left[-\\sqrt{a^2+b^2},\\sqrt{a^2+b^2}\\right]\\).",
      formula: {
        label: "Range of a sinusoid",
        latex: "a\\sin\\theta+b\\cos\\theta\\in\\left[-\\sqrt{a^2+b^2},\\ \\sqrt{a^2+b^2}\\right]",
      },
      authoredExample: {
        prompt: "Find the range of \\(f(\\theta)=\\begin{vmatrix}1&\\sin\\theta&1\\\\-\\sin\\theta&1&\\sin\\theta\\\\-1&-\\sin\\theta&1\\end{vmatrix}\\).",
        steps: [
          "Expanding: \\(1(1+\\sin^2\\theta)-\\sin\\theta\\cdot0+1(\\sin^2\\theta+1)=2(1+\\sin^2\\theta)\\).",
        ],
        answer: "\\([2,4]\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}\\cos\\theta&\\sin\\theta\\\\-\\sin\\theta&\\cos\\theta\\end{vmatrix}\\).",
        steps: [
          "\\(\\cos^2\\theta+\\sin^2\\theta\\).",
        ],
        answer: "\\(1\\) for every \\(\\theta\\).",
      },
      practiceSet: [
        { prompt: "Range of \\(3\\sin\\theta+4\\cos\\theta\\)?", answer: "\\([-5,5]\\)" },
        { prompt: "Range of \\(1+\\sin^2\\theta\\)?", answer: "\\([1,2]\\)" },
        { prompt: "Roots of \\(\\sin2\\theta=0\\) in \\([0,\\pi]\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\begin{vmatrix}\\sec\\theta&\\tan\\theta\\\\\\tan\\theta&\\sec\\theta\\end{vmatrix}\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "dc4b2947-7298-4b00-aaa0-77766724e23c", // 2025 — reduce a trigonometric determinant, then its extreme values
      traps: [
        {
          title: "Simplify before expanding",
          body: "Expanding a trigonometric determinant straight away produces long products that are easy to get wrong. One row operation or identity usually removes most terms first.",
        },
      ],
    },

    // C2 — calculus of determinants
    {
      kind: "formula" as const,
      slug: "jdet-calculus",
      name: "Derivatives, integrals and limits",
      intuition:
        "A determinant of functions can be expanded into one function and then differentiated, integrated or taken to a limit. For a derivative there is a shortcut: differentiate one row at a time and add the determinants. A constant row or column survives unchanged.",
      definition:
        "- \\(\\frac{d}{dx}\\Delta=\\) sum of the determinants with one row differentiated.\n" +
        "- Or expand to a single function first.\n" +
        "- A row that is constant differentiates to zero, so that term drops.",
      formula: {
        label: "Derivative of a determinant",
        latex: "\\frac{d}{dx}\\begin{vmatrix}f_1&f_2\\\\g_1&g_2\\end{vmatrix}=\\begin{vmatrix}f_1'&f_2'\\\\g_1&g_2\\end{vmatrix}+\\begin{vmatrix}f_1&f_2\\\\g_1'&g_2'\\end{vmatrix}",
      },
      authoredExample: {
        prompt: "\\(f(x)=\\begin{vmatrix}x&1\\\\x^2&2\\end{vmatrix}\\). Find \\(f'(1)\\).",
        steps: [
          "\\(f(x)=2x-x^2\\), so \\(f'(x)=2-2x\\).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "\\(g(x)=\\begin{vmatrix}x&x^2\\\\1&2x\\end{vmatrix}\\). Find \\(g'(x)\\).",
        steps: [
          "\\(g(x)=2x^2-x^2=x^2\\).",
        ],
        answer: "\\(2x\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}\\begin{vmatrix}1&2\\\\3&4\\end{vmatrix}\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\int_0^1\\begin{vmatrix}x&0\\\\0&1\\end{vmatrix}dx\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac1x\\begin{vmatrix}\\sin x&0\\\\0&1\\end{vmatrix}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\begin{vmatrix}e^x&1\\\\e^x&2\\end{vmatrix}\\)?", answer: "\\(e^x\\)" },
      ],
      pyqExampleId: "8bf17d10-0aef-4546-8270-0aa9d059a051", // 2025 — derivative of a determinant function
      traps: [
        {
          title: "Differentiate one row at a time",
          body: "The derivative of a determinant is not the determinant of the derivatives. Differentiate each row separately and add, or expand first.",
        },
      ],
    },
  ],
};
