import type { SubtopicNote } from "@/app/notes/_types";

export const COMPOSITE_EVALUATION_NOTE: SubtopicNote = {
  subtopicName: "Evaluation of Composite Inverse Trigonometric Expressions",
  title: "Evaluating Composite Inverse Expressions",
  oneLineDefinition:
    "Composite expressions nest a trig function around an inverse one (or vice versa); evaluate from the inside out, naming the inner inverse as an angle and building the right triangle for it.",
  whyItMatters:
    "11 PYQs, 4 HARD — the chapter's toughest pocket. The reliable method is always the same: set the innermost inverse equal to an angle θ, read off its sin/cos/tan from a right triangle, then evaluate the outer functions. Double- and half-angle formulas finish the job.",
  concepts: [
    // principal value of composite
    {
      kind: "formula" as const,
      slug: "it-principal-value-of-composite",
      name: "Inner-to-Outer Evaluation & sin⁻¹(sin x)",
      pyqExampleId: "c9d890fa-9206-4d24-95d8-e280b80f70d7",
      intuition:
        "Peel the expression from the inside: evaluate the innermost inverse to a concrete angle, then apply the outer functions one at a time. For sin⁻¹(sin x) the answer is x ONLY if x is already in the principal range — otherwise reduce it.",
      definition:
        "- **Nested evaluation:** name the inner inverse \\(\\theta = \\csc^{-1}2\\) (so \\(\\theta = \\tfrac{\\pi}{6}\\)), then work outward: \\(\\cot\\theta\\), then \\(\\tan^{-1}(\\cot\\theta)\\).\n" +
        "- **\\(\\sin^{-1}(\\sin x)\\):** equals \\(x\\) only for \\(x \\in [-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}]\\). Otherwise use \\(\\sin x = \\sin(\\pi - x)\\) to bring the angle into range (e.g. \\(\\sin^{-1}(\\sin\\tfrac{2\\pi}{3}) = \\tfrac{\\pi}{3}\\)).\n" +
        "- For \\(\\cot^2(\\sec^{-1}2) + \\tan^2(\\csc^{-1}\\sqrt3)\\)-type sums, evaluate each inverse to a standard angle first.",
      formula: {
        label: "Principal-range reduction",
        latex: "\\sin^{-1}(\\sin x) = x \\ \\text{ only if } x \\in \\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\sin^{-1}\\!\\left(\\sin\\dfrac{5\\pi}{6}\\right)\\).",
        steps: [
          "\\(\\tfrac{5\\pi}{6}\\) is outside \\([-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}]\\), so reduce: \\(\\sin\\tfrac{5\\pi}{6} = \\sin\\!\\left(\\pi - \\tfrac{5\\pi}{6}\\right) = \\sin\\tfrac{\\pi}{6}\\).",
          "\\(\\tfrac{\\pi}{6}\\) IS in range, so \\(\\sin^{-1}\\!\\left(\\sin\\tfrac{\\pi}{6}\\right) = \\tfrac{\\pi}{6}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{6}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^{-1}\\!\\left(\\sin\\dfrac{2\\pi}{3}\\right) = ?\\)", answer: "\\(\\tfrac{\\pi}{3}\\)", method: "\\(\\tfrac{2\\pi}{3}\\) is out of range; \\(\\sin\\tfrac{2\\pi}{3}=\\sin(\\pi-\\tfrac{2\\pi}{3})=\\sin\\tfrac{\\pi}{3}\\)." },
        { prompt: "\\(\\cos^{-1}\\!\\left(\\cos\\dfrac{4\\pi}{3}\\right) = ?\\)", answer: "\\(\\tfrac{2\\pi}{3}\\)", method: "\\(\\tfrac{4\\pi}{3}\\in[\\pi,2\\pi]\\): \\(\\cos^{-1}(\\cos x)=2\\pi-x = 2\\pi-\\tfrac{4\\pi}{3}\\)." },
        { prompt: "\\(\\tan^{-1}\\!\\left(\\tan\\dfrac{3\\pi}{4}\\right) = ?\\)", answer: "\\(-\\tfrac{\\pi}{4}\\)", method: "\\(\\tfrac{3\\pi}{4}\\) is out of \\((-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2})\\); \\(\\tan\\tfrac{3\\pi}{4}=-1\\Rightarrow\\tan^{-1}(-1)=-\\tfrac{\\pi}{4}\\)." },
      ],
      traps: [
        {
          title: "sin⁻¹(sin x) ≠ x outside the principal range",
          body:
            "\\(\\sin^{-1}(\\sin\\tfrac{2\\pi}{3})\\) is NOT \\(\\tfrac{2\\pi}{3}\\) (that is outside \\([-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}]\\)). Reduce the inner angle into the principal range first.",
        },
        {
          title: "Each cancellation uses a DIFFERENT reduction rule",
          body:
            "For \\(x\\) just past the range: \\(\\sin^{-1}(\\sin x)=\\pi-x\\), but \\(\\cos^{-1}(\\cos x)=2\\pi-x\\) (for \\(x\\in[\\pi,2\\pi]\\)) and \\(\\tan^{-1}(\\tan x)=x-\\pi\\). Don't reuse the \\(\\pi-x\\) rule for all three — match the reduction to the function's own principal range.",
        },
      ],
    },

    // double / half-angle composite
    {
      kind: "formula" as const,
      slug: "it-double-half-angle-composite",
      name: "Double- & Half-Angle Compositions",
      pyqExampleId: "d2e1933e-efa4-475d-995b-297f4fb3a09d",
      intuition:
        "When the expression is tan(2 tan⁻¹x), or a half-angle of an inverse, name the inverse as θ and apply the double- or half-angle formula. The inverse just hands you tan θ (or cos θ); the formula does the rest.",
      definition:
        "Set \\(\\theta = (\\text{the inner inverse})\\), so its argument gives \\(\\tan\\theta\\) (or \\(\\sin\\theta, \\cos\\theta\\) via a triangle), then apply:\n" +
        "- **Double angle:** \\(\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta}\\), \\(\\sin 2\\theta = 2\\sin\\theta\\cos\\theta\\).\n" +
        "- **Half angle:** \\(\\tan\\tfrac{\\theta}{2} = \\dfrac{1 - \\cos\\theta}{\\sin\\theta} = \\dfrac{\\sin\\theta}{1+\\cos\\theta}\\).\n" +
        "Useful for \\(\\tan(2\\tan^{-1}x)\\), \\(\\tan\\!\\left(\\tfrac12 \\sec^{-1}t\\right)\\), and \\(\\sqrt{1 + \\sin(2\\cos^{-1}t)}\\).",
      formula: {
        label: "Double-angle tangent",
        latex: "\\tan(2\\tan^{-1}x) = \\dfrac{2x}{1 - x^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\tan\\!\\left(2\\tan^{-1}\\tfrac{1}{5}\\right)\\).",
        steps: [
          "Let \\(\\theta = \\tan^{-1}\\tfrac15\\), so \\(\\tan\\theta = \\tfrac15\\).",
          "\\(\\tan 2\\theta = \\dfrac{2\\cdot\\frac15}{1 - \\frac{1}{25}} = \\dfrac{2/5}{24/25} = \\dfrac{2}{5}\\cdot\\dfrac{25}{24}\\).",
        ],
        answer: "\\(\\dfrac{5}{12}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan\\!\\left(2\\tan^{-1}\\tfrac{1}{3}\\right) = ?\\)", answer: "\\(\\tfrac{3}{4}\\)", method: "\\(\\dfrac{2\\cdot\\frac13}{1-\\frac19}=\\dfrac{2/3}{8/9}\\)." },
        { prompt: "\\(2\\tan^{-1}\\tfrac{1}{3} = \\tan^{-1}? \\)", answer: "\\(\\tan^{-1}\\tfrac{3}{4}\\)", method: "\\(2\\tan^{-1}x=\\tan^{-1}\\dfrac{2x}{1-x^2}=\\tan^{-1}\\dfrac{2/3}{8/9}\\)." },
      ],
      traps: [
        {
          title: "Double-angle tangent has 1 − tan²θ, not 1 + tan²θ",
          body:
            "\\(\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1-\\tan^2\\theta}\\). The denominator is \\(1-\\tan^2\\theta\\); using \\(1+\\tan^2\\theta\\) (which is \\(\\sec^2\\theta\\)) is a common confusion that produces the wrong value.",
        },
      ],
    },

    // converting to a common tangent
    {
      kind: "formula" as const,
      slug: "it-converting-to-tangent",
      name: "Converting Everything to a Tangent",
      pyqExampleId: "51d3a46e-d77f-4960-ba39-7bfb9fff676f",
      intuition:
        "A sum of different inverse functions (sin⁻¹ here, cot⁻¹ there) is messy until you rewrite each as a tan⁻¹ using a right triangle. Once every term is a tan⁻¹, the sum/difference formula combines them in one step.",
      definition:
        "For each inverse, build the right triangle to read its tangent: e.g. \\(\\sin^{-1}\\tfrac35 \\Rightarrow \\tan = \\tfrac34\\); \\(\\cot^{-1}\\tfrac32 \\Rightarrow \\tan = \\tfrac23\\); \\(\\csc^{-1}\\tfrac{\\sqrt{41}}{4} \\Rightarrow \\tan = \\tfrac45\\). Then combine the resulting \\(\\tan^{-1}\\) terms with the sum/difference formula, and apply the outer function (\\(\\cot\\), \\(\\tan\\), etc.).",
      formula: {
        label: "Triangle → tangent",
        latex: "\\sin^{-1}\\tfrac{3}{5} = \\tan^{-1}\\tfrac{3}{4}, \\quad \\cot^{-1}\\tfrac{3}{2} = \\tan^{-1}\\tfrac{2}{3}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\tan\\!\\left(\\sin^{-1}\\tfrac{3}{5} + \\cos^{-1}\\tfrac{12}{13}\\right)\\).",
        steps: [
          "\\(\\sin^{-1}\\tfrac35 \\Rightarrow \\tan = \\tfrac34\\); \\(\\cos^{-1}\\tfrac{12}{13} \\Rightarrow \\tan = \\tfrac{5}{12}\\).",
          "Sum formula: \\(\\tan(\\alpha+\\beta) = \\dfrac{\\frac34 + \\frac{5}{12}}{1 - \\frac34\\cdot\\frac{5}{12}} = \\dfrac{14/12}{33/48}\\).",
        ],
        answer: "\\(\\dfrac{56}{33}\\).",
      },
      practiceSet: [
        { prompt: "Write \\(\\sin^{-1}\\tfrac{3}{5}\\) as a \\(\\tan^{-1}\\).", answer: "\\(\\tan^{-1}\\tfrac{3}{4}\\)", method: "3-4-5 triangle: opposite 3, adjacent 4, so \\(\\tan=\\tfrac34\\)." },
        { prompt: "Write \\(\\cos^{-1}\\tfrac{12}{13}\\) as a \\(\\tan^{-1}\\).", answer: "\\(\\tan^{-1}\\tfrac{5}{12}\\)", method: "5-12-13 triangle: adjacent 12, opposite 5, so \\(\\tan=\\tfrac{5}{12}\\)." },
      ],
      traps: [
        {
          title: "Convert sin⁻¹/cos⁻¹ to tan⁻¹ via the TRIANGLE, not the value",
          body:
            "For \\(\\sin^{-1}\\tfrac35\\), the tangent is \\(\\tfrac34\\) (opposite 3, adjacent \\(\\sqrt{5^2-3^2}=4\\)) — NOT \\(\\tfrac35\\). Build the right triangle and read off the missing side before taking the tangent.",
        },
      ],
    },
  ],
};
