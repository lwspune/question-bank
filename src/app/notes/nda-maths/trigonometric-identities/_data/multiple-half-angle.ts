import type { SubtopicNote } from "@/app/notes/_types";

export const MULTIPLE_HALF_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "Multiple and Half-Angle Formulas",
  title: "Double, Triple & Half-Angle",
  oneLineDefinition:
    "Double-angle (the most-used), triple-angle, and half-angle formulas — plus the symmetric tricks like sin α + cos α = p that feed straight into sin 2α.",
  whyItMatters:
    "Half of this subtopic's questions are HARD — the densest difficulty pocket in the chapter. Most resolve to picking the right form of cos 2A, knowing sin 3A = 3 sin A − 4 sin³A, or recognising a half-angle in 1 ± cos A.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "trig-double-angle",
      name: "Double-angle formulas",
      intuition:
        "Set B = A in the compound formulas. Cosine of a double angle has **three interchangeable forms** — the art is choosing the one that matches what you're given (sin only, cos only, or tan only).",
      definition:
        "- \\(\\sin 2A=2\\sin A\\cos A=\\dfrac{2\\tan A}{1+\\tan^2 A}\\).\n" +
        "- \\(\\cos 2A=\\cos^2 A-\\sin^2 A=1-2\\sin^2 A=2\\cos^2 A-1=\\dfrac{1-\\tan^2 A}{1+\\tan^2 A}\\).\n" +
        "- \\(\\tan 2A=\\dfrac{2\\tan A}{1-\\tan^2 A}\\). Also \\(\\tan A+\\cot A=\\dfrac{2}{\\sin 2A}\\).",
      formula: {
        label: "The three forms of cos 2A",
        latex: "\\cos 2A=\\cos^2 A-\\sin^2 A=1-2\\sin^2 A=2\\cos^2 A-1",
      },
      authoredExample: {
        prompt: "If \\(\\tan A=\\tfrac34\\), find \\(\\sin 2A\\).",
        steps: [
          "\\(\\sin 2A=\\dfrac{2\\tan A}{1+\\tan^2 A}=\\dfrac{2\\cdot\\tfrac34}{1+\\tfrac{9}{16}}\\).",
          "\\(=\\dfrac{3/2}{25/16}=\\dfrac{24}{25}\\).",
        ],
        answer: "\\(\\sin 2A=\\tfrac{24}{25}\\).",
      },
      selfCheckExample: {
        prompt: "With \\(\\tan\\alpha=\\tfrac34\\), find \\(2\\sin 2\\alpha+\\cos 2\\alpha\\).",
        steps: [
          "\\(\\sin\\alpha=\\tfrac35,\\cos\\alpha=\\tfrac45\\Rightarrow\\sin 2\\alpha=\\tfrac{24}{25}\\), \\(\\cos 2\\alpha=1-2\\sin^2\\alpha=\\tfrac{7}{25}\\).",
          "\\(2\\cdot\\tfrac{24}{25}+\\tfrac{7}{25}=\\tfrac{55}{25}=\\tfrac{11}{5}\\).",
        ],
        answer: "\\(\\tfrac{11}{5}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin 2A=?\\)", answer: "\\(2\\sin A\\cos A\\)" },
        { prompt: "\\(\\cos 2A\\) in terms of \\(\\sin A\\)?", answer: "\\(1-2\\sin^2 A\\)" },
        { prompt: "\\(\\tan A+\\cot A=?\\)", answer: "\\(\\dfrac{2}{\\sin 2A}\\)" },
        { prompt: "\\(\\dfrac{2\\tan\\theta}{1+\\tan^2\\theta}=?\\)", answer: "\\(\\sin 2\\theta\\)" },
      ],
      pyqExampleId: "9a84f0b6-0a11-4274-a1d4-6f148fe6b635", // 2sin2α+cos2α, tanα=3/4
    },

    {
      kind: "formula" as const,
      slug: "trig-triple-angle",
      name: "Triple-angle formulas",
      intuition:
        "The triple-angle identities turn sin 3A / cos 3A back into powers of sin A / cos A — and run in reverse to collapse \"3 sin A − 4 sin³A\" into a single sin 3A.",
      definition:
        "- \\(\\sin 3A=3\\sin A-4\\sin^3 A\\).\n" +
        "- \\(\\cos 3A=4\\cos^3 A-3\\cos A\\).\n" +
        "- \\(\\tan 3A=\\dfrac{3\\tan A-\\tan^3 A}{1-3\\tan^2 A}\\).",
      formula: {
        label: "Triple angle",
        latex: "\\sin 3A=3\\sin A-4\\sin^3 A,\\qquad \\cos 3A=4\\cos^3 A-3\\cos A",
      },
      authoredExample: {
        prompt: "Simplify \\(3\\sin 20°-4\\sin^3 20°\\).",
        steps: [
          "This is exactly \\(\\sin 3A\\) with \\(A=20°\\).",
          "\\(=\\sin 60°=\\tfrac{\\sqrt3}{2}\\).",
        ],
        answer: "\\(\\tfrac{\\sqrt3}{2}\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\sin 3x+\\cos 3x+4\\sin^3 x-3\\sin x\\).",
        steps: [
          "\\(4\\sin^3 x-3\\sin x=-(3\\sin x-4\\sin^3 x)=-\\sin 3x\\).",
          "So the expression \\(=\\sin 3x+\\cos 3x-\\sin 3x=\\cos 3x\\).",
        ],
        answer: "\\(\\cos 3x\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin 3A=?\\)", answer: "\\(3\\sin A-4\\sin^3 A\\)" },
        { prompt: "\\(\\cos 3A=?\\)", answer: "\\(4\\cos^3 A-3\\cos A\\)" },
        { prompt: "\\(4\\cos^3 10°-3\\cos 10°=?\\)", answer: "\\(\\cos 30°=\\tfrac{\\sqrt3}{2}\\)" },
        { prompt: "\\(\\tan 3A=?\\)", answer: "\\(\\dfrac{3\\tan A-\\tan^3 A}{1-3\\tan^2 A}\\)" },
      ],
      pyqExampleId: "9a6a0aff-0b23-45b1-a114-415518ef1387", // sin3x+cos3x+4sin³x-3sinx
    },

    {
      kind: "formula" as const,
      slug: "trig-half-angle",
      name: "Half-angle formulas and 1 ± cos A / 1 ± sin A",
      intuition:
        "Read the double-angle formulas backwards. The key recognitions: \\(1-\\cos A=2\\sin^2\\tfrac A2\\), \\(1+\\cos A=2\\cos^2\\tfrac A2\\), and \\(1\\pm\\sin A=(\\sin\\tfrac A2\\pm\\cos\\tfrac A2)^2\\). These convert square roots into clean half-angle expressions.",
      definition:
        "- \\(1-\\cos A=2\\sin^2\\tfrac A2\\), \\(\\;1+\\cos A=2\\cos^2\\tfrac A2\\).\n" +
        "- \\(\\tan\\tfrac A2=\\dfrac{\\sin A}{1+\\cos A}=\\dfrac{1-\\cos A}{\\sin A}\\).\n" +
        "- \\(\\csc A+\\cot A=\\cot\\tfrac A2\\), \\(\\;\\csc A-\\cot A=\\tan\\tfrac A2\\).\n" +
        "- \\(1\\pm\\sin A=\\left(\\sin\\tfrac A2\\pm\\cos\\tfrac A2\\right)^2\\) (mind the sign when taking the root).",
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{1-\\cos 2\\theta}{\\sin 2\\theta}\\).",
        steps: [
          "\\(1-\\cos 2\\theta=2\\sin^2\\theta\\) and \\(\\sin 2\\theta=2\\sin\\theta\\cos\\theta\\).",
          "Ratio \\(=\\dfrac{2\\sin^2\\theta}{2\\sin\\theta\\cos\\theta}=\\tan\\theta\\).",
        ],
        answer: "\\(\\tan\\theta\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan\\!\\left(\\tfrac{3\\pi}{8}\\right)=\\tan 67.5°\\).",
        steps: [
          "\\(\\tan 67.5°=\\tan(45°+22.5°)\\), or use \\(\\tan\\tfrac A2=\\tfrac{1-\\cos A}{\\sin A}\\) with \\(A=135°\\).",
          "\\(=\\dfrac{1-\\cos 135°}{\\sin 135°}=\\dfrac{1+\\tfrac{1}{\\sqrt2}}{\\tfrac{1}{\\sqrt2}}=\\sqrt2+1\\).",
        ],
        answer: "\\(\\sqrt2+1\\).",
      },
      practiceSet: [
        { prompt: "\\(1-\\cos A=?\\)", answer: "\\(2\\sin^2\\tfrac A2\\)" },
        { prompt: "\\(1+\\cos A=?\\)", answer: "\\(2\\cos^2\\tfrac A2\\)" },
        { prompt: "\\(\\csc A+\\cot A=?\\)", answer: "\\(\\cot\\tfrac A2\\)" },
        { prompt: "\\(\\sqrt{\\tfrac{1-\\cos A}{1+\\cos A}}=?\\) (acute \\(A\\))", answer: "\\(\\tan\\tfrac A2\\)" },
      ],
      pyqExampleId: "707296b0-d778-4458-83ea-9019bd8b3150", // tan(3π/8)
    },

    {
      kind: "formula" as const,
      slug: "trig-multiple-applications",
      name: "Symmetric tricks: sin ± cos, power reduction, sₙ patterns",
      intuition:
        "A cluster of questions square a symmetric expression to expose a double angle (sin α + cos α squared gives 1 + sin 2α), reduce a fourth power to multiple angles, or chase patterns in \\(t_n=\\sin^n\\theta+\\cos^n\\theta\\).",
      definition:
        "- **Square the sum:** \\((\\sin\\alpha+\\cos\\alpha)^2=1+\\sin 2\\alpha\\), \\((\\sin\\alpha-\\cos\\alpha)^2=1-\\sin 2\\alpha\\).\n" +
        "- **Power reduction:** \\(\\cos^4 x=\\dfrac{3+4\\cos 2x+\\cos 4x}{8}\\) (and similarly for \\(\\sin^4\\)).\n" +
        "- **\\(x+\\tfrac1x=2\\cos\\theta\\Rightarrow x^n+\\tfrac{1}{x^n}=2\\cos n\\theta\\)** (De Moivre flavour).",
      authoredExample: {
        prompt: "If \\(\\sin\\alpha+\\cos\\alpha=p\\), express \\(\\sin 2\\alpha\\) in terms of \\(p\\).",
        steps: [
          "Square: \\(p^2=\\sin^2\\alpha+2\\sin\\alpha\\cos\\alpha+\\cos^2\\alpha=1+\\sin 2\\alpha\\).",
          "So \\(\\sin 2\\alpha=p^2-1\\).",
        ],
        answer: "\\(\\sin 2\\alpha=p^2-1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x+\\tfrac1x=2\\cos\\theta\\), find \\(x^2+\\tfrac{1}{x^2}\\).",
        steps: [
          "Square: \\(\\left(x+\\tfrac1x\\right)^2=x^2+\\tfrac{1}{x^2}+2=4\\cos^2\\theta\\).",
          "\\(x^2+\\tfrac{1}{x^2}=4\\cos^2\\theta-2=2\\cos 2\\theta\\).",
        ],
        answer: "\\(2\\cos 2\\theta\\).",
      },
      practiceSet: [
        { prompt: "\\((\\sin\\alpha+\\cos\\alpha)^2=?\\)", answer: "\\(1+\\sin 2\\alpha\\)" },
        { prompt: "\\(\\sin\\alpha+\\cos\\alpha=p\\Rightarrow\\sin 2\\alpha=?\\)", answer: "\\(p^2-1\\)" },
        { prompt: "\\(x+\\tfrac1x=2\\cos\\theta\\Rightarrow x^n+\\tfrac{1}{x^n}=?\\)", answer: "\\(2\\cos n\\theta\\)" },
        { prompt: "\\((\\sin\\alpha-\\cos\\alpha)^2=?\\)", answer: "\\(1-\\sin 2\\alpha\\)" },
      ],
      pyqExampleId: "de34dff5-e371-4544-a4c9-5376a63cccc4", // sinα+cosα=p
    },
  ],
  related: [
    { label: "Compound Angles", href: "/notes/nda-maths/trigonometric-identities/trig-compound-angle" },
    { label: "Product-to-Sum & Sum-to-Product", href: "/notes/nda-maths/trigonometric-identities/trig-product-sum" },
  ],
};
