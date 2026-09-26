import type { SubtopicNote } from "@/app/notes/_types";

export const INVERSE_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Inverse Trigonometric Functions — Principal Values and Evaluation",
  title: "Inverse Trigonometric Functions — Principal Values and Evaluating Expressions",
  oneLineDefinition:
    "Each inverse trigonometric function returns one angle from a fixed principal range, so evaluating an expression means placing every inverse value in its own range and then converting between ratios with a right triangle.",
  whyItMatters:
    "33 PYQs, and the page where inverse trigonometry is won or lost: 16 test the principal ranges directly (a value, a sum of values, a domain, an inequality), and 17 ask for a trigonometric ratio of an inverse value or of a sum of two. " +
    "Nothing here is long; the marks go to the student who knows that sin⁻¹(sin 2π/3) is not 2π/3.",
  concepts: [
    // 1 — principal ranges
    {
      kind: "reference" as const,
      slug: "cettf-principal-values",
      name: "Principal Ranges, Negative Arguments and f⁻¹(f(x))",
      intuition:
        "An inverse function must give ONE answer, so each is restricted to a range: sine and tangent to angles around 0, cosine and cotangent to \\([0, \\pi]\\). Every principal-value question is a test of these ranges — which is why \\(\\sin^{-1}(\\sin\\theta) = \\theta\\) only when \\(\\theta\\) is already inside \\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\).",
      definition:
        "- **Negative arguments**: \\(\\sin^{-1}(-x) = -\\sin^{-1}x\\), \\(\\tan^{-1}(-x) = -\\tan^{-1}x\\), \\(\\csc^{-1}(-x) = -\\csc^{-1}x\\); but \\(\\cos^{-1}(-x) = \\pi - \\cos^{-1}x\\), \\(\\cot^{-1}(-x) = \\pi - \\cot^{-1}x\\), \\(\\sec^{-1}(-x) = \\pi - \\sec^{-1}x\\).\n" +
        "- **\\(f^{-1}(f(\\theta))\\)**: find the angle IN the range with the same ratio. \\(\\sin^{-1}(\\sin\\frac{2\\pi}{3}) = \\frac{\\pi}{3}\\); \\(\\tan^{-1}(\\tan\\frac{7\\pi}{6}) = \\frac{\\pi}{6}\\); \\(\\cos^{-1}(\\cos\\frac{23\\pi}{20}) = \\frac{17\\pi}{20}\\).\n" +
        "- **Extremes**: \\(\\cos^{-1}x \\le \\pi\\), so \\(\\cos^{-1}x + \\cos^{-1}y + \\cos^{-1}z = 3\\pi\\) forces each to be \\(\\pi\\), i.e. \\(x = y = z = -1\\).\n" +
        "- **Domains**: \\(\\sin^{-1}u\\), \\(\\cos^{-1}u\\) need \\(-1 \\le u \\le 1\\). For \\(\\sqrt{\\sin^{-1}(2x) + \\frac{\\pi}{6}}\\) also need \\(\\sin^{-1}(2x) \\ge -\\frac{\\pi}{6}\\), so \\(-\\frac14 \\le x \\le \\frac12\\).\n" +
        "- **Near a standard value**: \\(\\tan^{-1}(1 + h) \\approx \\frac{\\pi}{4} + \\frac{h}{2}\\), since the derivative of \\(\\tan^{-1}x\\) at 1 is \\(\\frac12\\).",
      table: {
        columns: ["Function", "Domain", "Principal range"],
        rows: [
          { cells: ["\\(\\sin^{-1}x\\)", "\\([-1, 1]\\)", "\\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\)"], pyqExampleId: "77267d61-d453-497d-be56-d92d2b155fd3" },
          { cells: ["\\(\\cos^{-1}x\\)", "\\([-1, 1]\\)", "\\([0, \\pi]\\)"], pyqExampleId: "d5693705-ec02-4c8a-9d7e-a2c91e4129ad" },
          { cells: ["\\(\\tan^{-1}x\\)", "\\(\\mathbb{R}\\)", "\\(\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\)"], pyqExampleId: "53e79741-1421-4335-9733-b19c0e9e081d" },
          { cells: ["\\(\\cot^{-1}x\\)", "\\(\\mathbb{R}\\)", "\\((0, \\pi)\\)"], pyqExampleId: "add04c11-cd65-4fd5-8ff6-62e0b8867496" },
          { cells: ["\\(\\sec^{-1}x\\)", "\\(|x| \\ge 1\\)", "\\([0, \\pi]\\), not \\(\\frac{\\pi}{2}\\)"], pyqExampleId: "a980607f-fb32-42a5-bb5f-d8bfdcddfec6" },
          { cells: ["\\(\\csc^{-1}x\\)", "\\(|x| \\ge 1\\)", "\\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\), not 0"], pyqExampleId: "d0fbb09c-3a40-48bd-8749-dc7043f909e6" },
        ],
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\tan^{-1}(-1) + \\cos^{-1}\\left(-\\frac{\\sqrt3}{2}\\right)\\).",
        steps: [
          "\\(\\tan^{-1}(-1) = -\\frac{\\pi}{4}\\).",
          "\\(\\cos^{-1}\\left(-\\frac{\\sqrt3}{2}\\right) = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}\\).",
        ],
        answer: "\\(\\dfrac{7\\pi}{12}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\sin^{-1}\\left(\\sin\\frac{5\\pi}{6}\\right) = ?\\)", answer: "\\(\\frac{\\pi}{6}\\)" },
        { prompt: "\\(\\cos^{-1}\\left(\\cos\\frac{4\\pi}{3}\\right) = ?\\)", answer: "\\(\\frac{2\\pi}{3}\\)" },
        { prompt: "For which \\(x\\) is \\(\\cos^{-1}x > \\sin^{-1}x\\)?", answer: "\\(-1 \\le x < \\frac{1}{\\sqrt2}\\)", method: "\\(\\cos^{-1}x > \\frac{\\pi}{4}\\)." },
      ],
      pyqExampleId: "2b87b7b9-7983-4639-9478-b25737904c7c",
      traps: [
        {
          title: "Taking the negative out of cos⁻¹",
          body: "\\(\\cos^{-1}\\left(-\\frac12\\right)\\) is \\(\\frac{2\\pi}{3}\\), not \\(-\\frac{\\pi}{3}\\). Negative angles are outside the range of \\(\\cos^{-1}\\), \\(\\cot^{-1}\\) and \\(\\sec^{-1}\\); for these three the rule is \\(\\pi\\) minus the positive value.",
        },
        {
          title: "Several options can be true",
          body: "With \\(\\alpha = 3\\sin^{-1}\\frac{6}{11}\\approx 1.74\\) and \\(\\beta = 3\\cos^{-1}\\frac49 \\approx 3.33\\), the statements \\(\\sin\\beta < 0\\), \\(\\cos(\\alpha + \\beta) > 0\\) and \\(\\cos\\alpha < 0\\) are all true. The paper keys \\(\\sin\\beta < 0\\); place each angle by estimate before choosing.",
        },
      ],
    },

    // 2 — a ratio of an inverse value
    {
      kind: "formula" as const,
      slug: "cettf-ratio-of-inverse",
      name: "A Trigonometric Ratio of an Inverse Value — the Right-Triangle Conversion",
      intuition:
        "\\(\\sin^{-1}\\frac35\\) is just an angle whose sine is \\(\\frac35\\). Draw the right triangle with opposite 3, hypotenuse 5 and adjacent 4, and every other ratio of that angle is read off. Sums of two inverse values then fall to the compound-angle formula.",
      definition:
        "- **Convert** by a right triangle: \\(\\sin^{-1}\\frac35 = \\cos^{-1}\\frac45 = \\tan^{-1}\\frac34\\) (for positive arguments).\n" +
        "- **Compositions in \\(x\\)**: \\(\\sin(\\cot^{-1}x) = \\dfrac{1}{\\sqrt{1 + x^2}}\\), \\(\\cos(\\tan^{-1}x) = \\dfrac{1}{\\sqrt{1 + x^2}}\\), \\(\\sec^2(\\tan^{-1}x) = 1 + x^2\\), \\(\\csc^2(\\cot^{-1}x) = 1 + x^2\\).\n" +
        "- **Sums**: \\(\\cos(\\sin^{-1}a + \\cos^{-1}b)\\) — let \\(\\alpha = \\sin^{-1}a\\), \\(\\beta = \\cos^{-1}b\\), read all four ratios from two triangles, then expand \\(\\cos(\\alpha + \\beta)\\).\n" +
        "- **Doubles**: \\(\\sin(2\\sin^{-1}x) = 2x\\sqrt{1 - x^2}\\); \\(\\tan(2\\tan^{-1}x) = \\frac{2x}{1 - x^2}\\).\n" +
        "- **Negative arguments** change the sign of one leg: \\(\\cos^{-1}\\left(-\\frac35\\right)\\) has cosine \\(-\\frac35\\) and sine \\(+\\frac45\\), so \\(\\sin\\left(2\\cos^{-1}\\left(-\\frac35\\right)\\right) = -\\frac{24}{25}\\).",
      formula: {
        label: "Two conversions worth memorising",
        latex: "\\sin(\\cot^{-1}x)=\\cos(\\tan^{-1}x)=\\frac{1}{\\sqrt{1+x^2}} \\qquad \\sin(2\\sin^{-1}x)=2x\\sqrt{1-x^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\tan\\left(\\sin^{-1}\\frac45 + \\tan^{-1}\\frac13\\right)\\).",
        steps: [
          "\\(\\sin^{-1}\\frac45 = \\tan^{-1}\\frac43\\).",
          "\\(\\tan(\\alpha + \\beta) = \\dfrac{\\frac43 + \\frac13}{1 - \\frac43 \\cdot \\frac13} = \\dfrac{5/3}{5/9}\\).",
        ],
        answer: "3",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\sec^2(\\tan^{-1}3) + \\csc^2(\\cot^{-1}2)\\).",
        steps: ["\\(1 + 9 = 10\\) and \\(1 + 4 = 5\\)."],
        answer: "15",
      },
      practiceSet: [
        { prompt: "\\(\\sin(2\\sin^{-1}0.6) = ?\\)", answer: "0.96" },
        { prompt: "\\(\\cos\\left(\\sin^{-1}\\frac35 + \\cos^{-1}\\frac{12}{13}\\right) = ?\\)", answer: "\\(\\frac{33}{65}\\)" },
        { prompt: "\\(\\tan^2(\\sec^{-1}3) + \\cot^2(\\csc^{-1}4) = ?\\)", answer: "23", method: "\\(8 + 15\\)." },
      ],
      pyqExampleId: "e30c9272-7862-47a8-a1e6-a52eff5920a9",
      traps: [
        {
          title: "Doubling the ratio instead of the angle",
          body: "\\(\\sin(2\\sin^{-1}0.8)\\) is \\(2(0.8)(0.6) = 0.96\\), not \\(2 \\times 0.8\\). The double-angle formula needs the cosine too, and the option \\(0.16\\) or \\(1.6\\) catches the shortcut.",
        },
      ],
    },
  ],
  related: [
    { label: "Inverse trigonometric identities", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-inverse-identities" },
  ],
};
