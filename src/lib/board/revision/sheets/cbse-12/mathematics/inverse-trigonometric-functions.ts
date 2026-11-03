import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics, Ch. 2 Inverse Trigonometric Functions.
 * Definitions are NCERT's own, trimmed; every principal value and branch
 * re-checked by hand; most-asked groups from the CBSE board past-paper
 * questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Inverse Trigonometric Functions",
  chapterSlug: "inverse-trigonometric-functions",
  source: "NCERT Mathematics Part I (CBSE Class 12), Chapter 2",
  keyPoints: [
    {
      term: "Why the domain is restricted",
      text: "Trigonometric functions are not one-one and onto over their natural domains and ranges, so their inverses do not exist there. Restricting the domain (e.g. sine to \\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\)) makes each one-one and onto, and then the inverse exists.",
    },
    {
      term: "Principal value branch",
      text: "For \\(\\sin^{-1}\\), the branch with range \\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\) is the principal value branch. Whenever no branch of an inverse trigonometric function is mentioned, we mean the principal value branch.",
    },
    {
      term: "Principal value",
      text: "The value of an inverse trigonometric function which lies in the range of the principal branch is called the principal value. So \\(\\sin^{-1}\\left(\\frac{1}{2}\\right) = \\frac{\\pi}{6}\\), never \\(\\frac{5\\pi}{6}\\).",
    },
    {
      term: "Other branches",
      text: "Other intervals as range give different branches: for \\(\\sin^{-1}\\), \\(\\left[-\\frac{3\\pi}{2}, -\\frac{\\pi}{2}\\right]\\) or \\(\\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]\\); for \\(\\cos^{-1}\\), \\([-\\pi, 0]\\) or \\([\\pi, 2\\pi]\\).",
    },
    {
      term: "Notation",
      text: "\\(\\sin^{-1} x\\) should not be confused with \\((\\sin x)^{-1} = \\frac{1}{\\sin x}\\); similarly for the other functions.",
    },
    {
      term: "Domains and ranges",
      text: "\\(\\sin^{-1}\\) and \\(\\cos^{-1}\\) take \\([-1, 1]\\); \\(\\operatorname{cosec}^{-1}\\) and \\(\\sec^{-1}\\) take \\(\\mathbb{R} - (-1, 1)\\); \\(\\tan^{-1}\\) and \\(\\cot^{-1}\\) take all of \\(\\mathbb{R}\\). Ranges are in the formulas below: learn them exactly, with the open ends and the left-out points.",
    },
    {
      term: "Graph of an inverse function",
      text: "The graph of an inverse function is the mirror image (reflection) of the original graph in the line \\(y = x\\): a point \\((a, b)\\) on \\(y = \\sin x\\) becomes \\((b, a)\\) on \\(y = \\sin^{-1} x\\).",
    },
    {
      term: "Inverse undoes the function",
      text: "\\(y = \\sin^{-1} x \\Rightarrow x = \\sin y\\), so \\(\\sin(\\sin^{-1} x) = x\\) for \\(x \\in [-1, 1]\\), and \\(\\sin^{-1}(\\sin x) = x\\) for \\(x \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\).",
    },
    {
      term: "Valid only in the branch",
      text: "These results are valid within the principal value branches. If x lies outside the branch, first rewrite \\(\\sin x\\) as \\(\\sin\\) of an angle inside it: \\(\\sin^{-1}\\left(\\sin \\frac{3\\pi}{5}\\right) = \\sin^{-1}\\left(\\sin \\frac{2\\pi}{5}\\right) = \\frac{2\\pi}{5}\\).",
    },
    {
      term: "Simplest form",
      text: "To write a function in the simplest form, substitute \\(x = \\sin\\theta\\), \\(\\cos\\theta\\), \\(\\tan\\theta\\) or \\(\\sec\\theta\\) (or use half-angle identities), reduce the inside to one trigonometric ratio of one angle, check that angle lies in the branch, then cancel.",
    },
  ],
  formulas: [
    { label: "Sine inverse", latex: "\\sin^{-1} : [-1, 1] \\to \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]" },
    { label: "Cosine inverse", latex: "\\cos^{-1} : [-1, 1] \\to [0, \\pi]" },
    {
      label: "Cosecant inverse",
      latex: "\\operatorname{cosec}^{-1} : \\mathbb{R} - (-1, 1) \\to \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right] - \\{0\\}",
    },
    { label: "Secant inverse", latex: "\\sec^{-1} : \\mathbb{R} - (-1, 1) \\to [0, \\pi] - \\left\\{\\frac{\\pi}{2}\\right\\}" },
    { label: "Tangent inverse", latex: "\\tan^{-1} : \\mathbb{R} \\to \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)" },
    { label: "Cotangent inverse", latex: "\\cot^{-1} : \\mathbb{R} \\to (0, \\pi)" },
    {
      label: "Function of its inverse",
      latex: "\\sin(\\sin^{-1} x) = x,\\; \\cos(\\cos^{-1} x) = x \\;\\; (x \\in [-1, 1]) \\qquad \\tan(\\tan^{-1} x) = x \\;\\; (x \\in \\mathbb{R})",
    },
    {
      label: "Inverse of its function, inside the branch",
      latex:
        "\\sin^{-1}(\\sin x) = x \\;\\; \\left(|x| \\le \\tfrac{\\pi}{2}\\right) \\qquad \\cos^{-1}(\\cos x) = x \\;\\; (0 \\le x \\le \\pi) \\qquad \\tan^{-1}(\\tan x) = x \\;\\; \\left(|x| < \\tfrac{\\pi}{2}\\right)",
    },
    {
      label: "Outside the branch",
      latex:
        "\\sin^{-1}(\\sin x) = \\pi - x \\;\\; \\left(\\tfrac{\\pi}{2} \\le x \\le \\tfrac{3\\pi}{2}\\right) \\qquad \\cos^{-1}(\\cos x) = 2\\pi - x \\;\\; (\\pi \\le x \\le 2\\pi) \\qquad \\tan^{-1}(\\tan x) = x - \\pi \\;\\; \\left(\\tfrac{\\pi}{2} < x < \\tfrac{3\\pi}{2}\\right)",
    },
    {
      label: "Negative arguments",
      latex:
        "\\sin^{-1}(-x) = -\\sin^{-1} x,\\; \\tan^{-1}(-x) = -\\tan^{-1} x,\\; \\operatorname{cosec}^{-1}(-x) = -\\operatorname{cosec}^{-1} x \\\\ \\cos^{-1}(-x) = \\pi - \\cos^{-1} x,\\; \\sec^{-1}(-x) = \\pi - \\sec^{-1} x,\\; \\cot^{-1}(-x) = \\pi - \\cot^{-1} x",
    },
    {
      label: "Double angle (NCERT Example 3)",
      latex:
        "\\sin^{-1}\\left(2x\\sqrt{1 - x^2}\\right) = \\begin{cases} 2\\sin^{-1} x, & -\\frac{1}{\\sqrt{2}} \\le x \\le \\frac{1}{\\sqrt{2}} \\\\ 2\\cos^{-1} x, & \\frac{1}{\\sqrt{2}} \\le x \\le 1 \\end{cases}",
    },
    {
      label: "Triple angle (Exercise 2.2)",
      latex:
        "3\\sin^{-1} x = \\sin^{-1}(3x - 4x^3) \\;\\; \\left(-\\tfrac{1}{2} \\le x \\le \\tfrac{1}{2}\\right) \\qquad 3\\cos^{-1} x = \\cos^{-1}(4x^3 - 3x) \\;\\; \\left(\\tfrac{1}{2} \\le x \\le 1\\right)",
    },
    {
      label: "Substitutions for simplest form",
      latex:
        "\\sqrt{1 - x^2}: x = \\sin\\theta \\text{ or } \\cos\\theta \\qquad \\sqrt{1 + x^2}: x = \\tan\\theta \\qquad \\sqrt{x^2 - 1}: x = \\sec\\theta",
    },
    {
      label: "Values to know",
      latex:
        "\\cos^{-1}\\left(-\\tfrac{1}{2}\\right) = \\tfrac{2\\pi}{3} \\quad \\tan^{-1}(-\\sqrt{3}) = -\\tfrac{\\pi}{3} \\quad \\cot^{-1}(-\\sqrt{3}) = \\tfrac{5\\pi}{6} \\quad \\sec^{-1}(2) = \\tfrac{\\pi}{3} \\quad \\operatorname{cosec}^{-1}(-\\sqrt{2}) = -\\tfrac{\\pi}{4}",
    },
  ],
  derivations: [
    {
      title: "Find the value of an expression in principal values",
      steps: [
        "Take each inverse term alone. Find the angle in its principal branch with that ratio (e.g. \\(\\cos^{-1}\\left(-\\frac{1}{2}\\right) = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}\\)).",
        "For a negative argument, use the negative-argument results: odd ones (sin, tan, cosec) change sign, the others give \\(\\pi\\) minus.",
        "Add or subtract the angles, then apply any outer trigonometric function last.",
      ],
    },
    {
      title: "Evaluate an inverse of a trigonometric value outside the principal branch",
      steps: [
        "Check whether the angle lies in the branch: \\(\\frac{3\\pi}{5}\\) is not in \\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\).",
        "Rewrite with an angle inside the branch: \\(\\sin \\frac{3\\pi}{5} = \\sin\\left(\\pi - \\frac{3\\pi}{5}\\right) = \\sin \\frac{2\\pi}{5}\\).",
        "Now cancel: \\(\\sin^{-1}\\left(\\sin \\frac{3\\pi}{5}\\right) = \\frac{2\\pi}{5}\\). Likewise \\(\\cos^{-1}\\left(\\cos \\frac{7\\pi}{6}\\right) = \\frac{5\\pi}{6}\\), \\(\\tan^{-1}\\left(\\tan \\frac{3\\pi}{4}\\right) = -\\frac{\\pi}{4}\\).",
      ],
    },
    {
      title: "Find the domain of an inverse trigonometric function of an expression",
      steps: [
        "For \\(\\sin^{-1} u\\) or \\(\\cos^{-1} u\\), write \\(-1 \\le u \\le 1\\); for \\(\\sec^{-1} u\\) or \\(\\operatorname{cosec}^{-1} u\\), write \\(u \\le -1\\) or \\(u \\ge 1\\).",
        "Solve both inequalities. For \\(\\sin^{-1}(x^2 - 4)\\): \\(3 \\le x^2 \\le 5\\), so \\(x \\in [-\\sqrt{5}, -\\sqrt{3}] \\cup [\\sqrt{3}, \\sqrt{5}]\\).",
        "Range: the inverse function takes its branch only over the values u actually reaches; scale and shift that interval for \\(2\\sin^{-1} u + c\\).",
      ],
    },
    {
      title: "Express \\(\\tan^{-1}\\left(\\frac{\\cos x}{1 - \\sin x}\\right)\\) in the simplest form",
      steps: [
        "Write \\(\\cos x = \\cos^2\\frac{x}{2} - \\sin^2\\frac{x}{2}\\) and \\(1 - \\sin x = \\left(\\cos\\frac{x}{2} - \\sin\\frac{x}{2}\\right)^2\\).",
        "The fraction becomes \\(\\frac{1 + \\tan\\frac{x}{2}}{1 - \\tan\\frac{x}{2}} = \\tan\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)\\).",
        "For \\(-\\frac{3\\pi}{2} < x < \\frac{\\pi}{2}\\), \\(\\frac{\\pi}{4} + \\frac{x}{2}\\) lies in \\(\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\), so the answer is \\(\\frac{\\pi}{4} + \\frac{x}{2}\\).",
      ],
    },
    {
      title: "Show that \\(\\sin^{-1}(2x\\sqrt{1 - x^2}) = 2\\sin^{-1} x\\) for \\(-\\frac{1}{\\sqrt{2}} \\le x \\le \\frac{1}{\\sqrt{2}}\\)",
      steps: [
        "Let \\(x = \\sin\\theta\\), so \\(\\theta = \\sin^{-1} x\\) and \\(-\\frac{\\pi}{4} \\le \\theta \\le \\frac{\\pi}{4}\\).",
        "\\(2x\\sqrt{1 - x^2} = 2\\sin\\theta\\cos\\theta = \\sin 2\\theta\\) (\\(\\cos\\theta \\ge 0\\) here).",
        "\\(2\\theta\\) lies in \\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\), so \\(\\sin^{-1}(\\sin 2\\theta) = 2\\theta = 2\\sin^{-1} x\\). With \\(x = \\cos\\theta\\) we get \\(2\\cos^{-1} x\\) on \\(\\left[\\frac{1}{\\sqrt{2}}, 1\\right]\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Graph of the principal branch of \\(y = \\sin^{-1} x\\)",
      labels: [
        "Domain \\([-1, 1]\\) on the x-axis",
        "Lowest point \\(\\left(-1, -\\frac{\\pi}{2}\\right)\\)",
        "Highest point \\(\\left(1, \\frac{\\pi}{2}\\right)\\)",
        "Passes through the origin; increasing",
        "Mirror image of \\(y = \\sin x\\) in \\(y = x\\)",
      ],
    },
    {
      title: "Graph of the principal branch of \\(y = \\cos^{-1} x\\)",
      labels: [
        "Domain \\([-1, 1]\\), range \\([0, \\pi]\\)",
        "End points \\((-1, \\pi)\\) and \\((1, 0)\\)",
        "Point \\(\\left(0, \\frac{\\pi}{2}\\right)\\); decreasing",
      ],
    },
    {
      title: "Graph of \\(y = \\operatorname{cosec}^{-1} x\\)",
      labels: [
        "Two pieces: \\(x \\le -1\\) and \\(x \\ge 1\\)",
        "Right piece starts at \\(\\left(1, \\frac{\\pi}{2}\\right)\\)",
        "Left piece ends at \\(\\left(-1, -\\frac{\\pi}{2}\\right)\\)",
        "Approaches \\(y = 0\\), never reaches it",
      ],
    },
    {
      title: "Graph of \\(y = \\sec^{-1} x\\)",
      labels: [
        "Two pieces: \\(x \\le -1\\) and \\(x \\ge 1\\)",
        "Points \\((1, 0)\\) and \\((-1, \\pi)\\)",
        "Approaches \\(y = \\frac{\\pi}{2}\\), never reaches it",
      ],
    },
    {
      title: "Graph of \\(y = \\tan^{-1} x\\)",
      labels: [
        "Domain all real x; passes through the origin; increasing",
        "Asymptotes \\(y = \\frac{\\pi}{2}\\) and \\(y = -\\frac{\\pi}{2}\\)",
      ],
    },
    {
      title: "Graph of \\(y = \\cot^{-1} x\\)",
      labels: [
        "Domain all real x; decreasing",
        "Point \\(\\left(0, \\frac{\\pi}{2}\\right)\\)",
        "Asymptotes \\(y = 0\\) and \\(y = \\pi\\)",
      ],
    },
  ],
  mostAsked: [
    {
      topic: "Find the value of a sum or composite of inverse trigonometric functions in principal values",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Find the domain (and range) of an inverse trigonometric function of an expression",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Principal value branches: the range of y when y is built from an inverse function",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Identify or draw the graph of an inverse trigonometric function and write its range",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Evaluate \\(\\sin^{-1}(\\sin x)\\), \\(\\cos^{-1}(\\cos x)\\) or \\(\\tan^{-1}(\\tan x)\\) when x is outside the principal branch",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Write an inverse trigonometric function in the simplest form (substitute or rewrite, then use the branch)",
      marks: 2,
      years: [2026, 2025, 2024],
    },
  ],
  mistakes: [
    {
      title: "A principal value outside the branch",
      body: "\\(\\cos^{-1}\\left(-\\frac{1}{2}\\right)\\) is \\(\\frac{2\\pi}{3}\\), not \\(-\\frac{\\pi}{3}\\); \\(\\cot^{-1}\\left(-\\frac{1}{\\sqrt{3}}\\right)\\) is \\(\\frac{2\\pi}{3}\\), not \\(-\\frac{\\pi}{3}\\). Cos, sec and cot inverses are never negative.",
    },
    {
      title: "Cancelling \\(\\sin^{-1}(\\sin x)\\) to x every time",
      body: "\\(\\sin^{-1}(\\sin x) = x\\) only for x in \\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\). \\(\\sin^{-1}\\left(\\sin \\frac{3\\pi}{4}\\right) = \\frac{\\pi}{4}\\), and \\(\\cos^{-1}\\left(\\cos\\left(-\\frac{7\\pi}{3}\\right)\\right) = \\frac{\\pi}{3}\\).",
    },
    {
      title: "Solving only half the domain inequality",
      body: "For \\(\\cos^{-1}(x^2 - 1)\\), \\(-1 \\le x^2 - 1 \\le 1\\) gives \\(0 \\le x^2 \\le 2\\): domain \\([-\\sqrt{2}, \\sqrt{2}]\\). Write both sides, and remember \\(x^2 \\le a\\) gives a two-sided interval.",
    },
    {
      title: "Wrong ends of a range",
      body: "\\(\\tan^{-1}\\) and \\(\\cot^{-1}\\) have open intervals; \\(\\sec^{-1}\\) leaves out \\(\\frac{\\pi}{2}\\) and \\(\\operatorname{cosec}^{-1}\\) leaves out 0. The range of \\(2\\sin^{-1} x + \\frac{3\\pi}{2}\\) is \\(\\left[\\frac{\\pi}{2}, \\frac{5\\pi}{2}\\right]\\): scale, then shift.",
    },
    {
      title: "Reading \\(\\sin^{-1} x\\) as \\(\\frac{1}{\\sin x}\\)",
      body: "\\(\\sin^{-1} x\\) is an angle; \\((\\sin x)^{-1}\\) is \\(\\operatorname{cosec} x\\). Keep the two apart in every step.",
    },
    {
      title: "Dropping the interval in a simplest-form answer",
      body: "After substituting, check the new angle lies in the branch for the given x before you cancel. For \\(0 < x < \\frac{\\pi}{4}\\), \\(\\tan^{-1}\\left(\\frac{\\cos 2x - \\sin 2x}{\\cos 2x + \\sin 2x}\\right) = \\frac{\\pi}{4} - 2x\\).",
    },
  ],
};

export default sheet;
