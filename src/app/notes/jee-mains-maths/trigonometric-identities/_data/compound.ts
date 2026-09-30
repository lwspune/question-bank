import type { SubtopicNote } from "@/app/notes/_types";

export const COMPOUND_TI_NOTE: SubtopicNote = {
  subtopicName: "Compound Angle Formulae",
  title: "Compound Angle Formulae",
  oneLineDefinition:
    "The sine, cosine and tangent of a sum or difference of two angles, with the sign of each ratio fixed by its quadrant.",
  whyItMatters:
    "Fourteen PYQs, thirteen of them multiple choice, and five from 2026. Three fix the sign of each ratio from the quadrant before anything else; six expand or spot sin(A ± B) and cos(A ± B), often to collapse a long expression into one ratio; five use tan(A ± B), two of them with tan A and tan B as the roots of a quadratic. Three ideas cover the page.",
  concepts: [
    // C1 — signs by quadrant
    {
      kind: "formula" as const,
      slug: "jti-quadrant",
      name: "Signs by quadrant",
      intuition:
        "One given ratio fixes the others up to sign. A right triangle gives their sizes: \\(\\sin x=-\\frac35\\) means sides 3, 4 and 5. The quadrant then gives each sign. When the question is about \\(\\alpha+\\beta\\), place \\(\\alpha+\\beta\\) in its quadrant first.",
      definition:
        "- Sizes come from the right triangle, or from \\(\\sin^2x+\\cos^2x=1\\).\n" +
        "- Quadrant I: all ratios positive. II: only \\(\\sin\\) and \\(\\csc\\). III: only \\(\\tan\\) and \\(\\cot\\). IV: only \\(\\cos\\) and \\(\\sec\\).\n" +
        "- For \\(\\alpha\\pm\\beta\\), add or subtract the ranges of \\(\\alpha\\) and \\(\\beta\\), then use the sign of the given ratio to narrow the range.",
      formula: {
        label: "Pythagorean identities",
        latex: "\\sin^2x+\\cos^2x=1,\\quad1+\\tan^2x=\\sec^2x,\\quad1+\\cot^2x=\\csc^2x",
      },
      authoredExample: {
        prompt: "\\(\\tan x=-\\frac{5}{12}\\) and \\(\\frac{3\\pi}{2}<x<2\\pi\\). Find \\(13(\\sin x-\\cos x)\\).",
        steps: [
          "The 5–12–13 triangle gives \\(|\\sin x|=\\frac{5}{13}\\) and \\(|\\cos x|=\\frac{12}{13}\\).",
          "In quadrant IV cosine is positive and sine is negative: \\(\\sin x=-\\frac{5}{13}\\), \\(\\cos x=\\frac{12}{13}\\).",
          "\\(13\\left(-\\frac{5}{13}-\\frac{12}{13}\\right)=-17\\).",
        ],
        answer: "\\(-17\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\sin\\alpha=\\frac35\\) with \\(\\alpha\\) in quadrant II, and \\(\\cos\\beta=\\frac{5}{13}\\) with \\(\\beta\\) in quadrant IV. Find \\(\\sin(\\alpha+\\beta)\\).",
        steps: [
          "Quadrant II: \\(\\cos\\alpha=-\\frac45\\). Quadrant IV: \\(\\sin\\beta=-\\frac{12}{13}\\).",
          "\\(\\sin(\\alpha+\\beta)=\\frac35\\cdot\\frac{5}{13}+\\left(-\\frac45\\right)\\left(-\\frac{12}{13}\\right)=\\frac{15+48}{65}\\).",
        ],
        answer: "\\(\\frac{63}{65}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin x\\) if \\(\\cos x=-\\frac35\\) and \\(x\\) is in quadrant III?", answer: "\\(-\\frac45\\)" },
        { prompt: "\\(\\tan x\\) if \\(\\sec x=-2\\) and \\(\\frac{\\pi}{2}<x<\\pi\\)?", answer: "\\(-\\sqrt3\\)" },
        { prompt: "Signs of \\(\\cos x\\) and \\(\\tan x\\) at \\(x=250^\\circ\\)?", answer: "\\(\\cos x<0\\), \\(\\tan x>0\\)" },
        { prompt: "\\(\\csc x\\) if \\(\\cot x=\\frac{8}{15}\\) and \\(x\\) is in quadrant III?", answer: "\\(-\\frac{17}{15}\\)" },
      ],
      pyqExampleId: "5891165a-dacc-4ecc-9b3a-a43ce54507d0", // 2026 — tan 2α from cos(α+β) and sin(α−β), signs from the ranges
      traps: [
        {
          title: "The triangle gives the size, not the sign",
          body: "\\(\\sin x=-\\frac35\\) in quadrant III gives \\(\\cos x=-\\frac45\\), not \\(+\\frac45\\). Fix every sign from the quadrant before substituting. For \\(\\alpha+\\beta\\), place the sum, not the parts.",
        },
      ],
    },

    // C2 — expanding and spotting sin/cos(A ± B)
    {
      kind: "formula" as const,
      slug: "jti-expansion",
      name: "Sine and cosine of a sum",
      intuition:
        "Expanding turns a condition such as \\(3\\sin(\\alpha+\\beta)=2\\sin(\\alpha-\\beta)\\) into a relation between \\(\\tan\\alpha\\) and \\(\\tan\\beta\\). Read backwards, the same formulas collapse two products into one ratio. When a long expression has the shape \\(\\sin P\\cos Q\\pm\\cos P\\sin Q\\), regroup it until one angle is left.",
      definition:
        "- \\(\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B\\).\n" +
        "- \\(\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B\\).\n" +
        "- Divide an expanded equation by \\(\\cos A\\cos B\\) to get \\(\\tan A\\) and \\(\\tan B\\).\n" +
        "- \\(\\sin(A+B)\\sin(A-B)=\\sin^2A-\\sin^2B\\), \\(\\cos(A+B)\\cos(A-B)=\\cos^2A-\\sin^2B\\).",
      formula: {
        label: "Compound angles",
        latex: "\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B,\\quad\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B",
      },
      authoredExample: {
        prompt: "\\(2\\sin(\\alpha-\\beta)=\\sin(\\alpha+\\beta)\\). Find \\(\\frac{\\tan\\alpha}{\\tan\\beta}\\).",
        steps: [
          "Expand: \\(2\\sin\\alpha\\cos\\beta-2\\cos\\alpha\\sin\\beta=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta\\).",
          "So \\(\\sin\\alpha\\cos\\beta=3\\cos\\alpha\\sin\\beta\\). Divide by \\(\\cos\\alpha\\cos\\beta\\): \\(\\tan\\alpha=3\\tan\\beta\\).",
        ],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sin50^\\circ\\cos20^\\circ-\\cos50^\\circ\\sin20^\\circ+\\cos40^\\circ\\cos20^\\circ-\\sin40^\\circ\\sin20^\\circ\\).",
        steps: [
          "The first pair is \\(\\sin(50^\\circ-20^\\circ)=\\sin30^\\circ\\).",
          "The second pair is \\(\\cos(40^\\circ+20^\\circ)=\\cos60^\\circ\\).",
          "\\(\\frac12+\\frac12\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos75^\\circ\\)?", answer: "\\(\\frac{\\sqrt6-\\sqrt2}{4}\\)" },
        { prompt: "\\(\\cos70^\\circ\\cos10^\\circ+\\sin70^\\circ\\sin10^\\circ\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\sin3x\\cos x-\\cos3x\\sin x\\) as one ratio?", answer: "\\(\\sin2x\\)" },
        { prompt: "\\(\\sin(A+B)\\sin(A-B)\\) in terms of \\(\\sin A\\) and \\(\\sin B\\)?", answer: "\\(\\sin^2A-\\sin^2B\\)" },
      ],
      pyqExampleId: "1b841c84-32bf-40b7-95f1-5d34c4bb6b87", // 2026 — regroup into sin and cos of (7x − 13x/2), then a half angle
      traps: [
        {
          title: "The sign in cos(A ± B) flips",
          body: "\\(\\cos(A-B)=\\cos A\\cos B+\\sin A\\sin B\\), with a plus. When collapsing a pair, match its sign to the formula, or \\(\\cos(A-B)\\) becomes \\(\\cos(A+B)\\).",
        },
      ],
    },

    // C3 — tan of a sum
    {
      kind: "formula" as const,
      slug: "jti-tan-sum",
      name: "Tangent of a sum",
      intuition:
        "\\(\\tan(A+B)\\) needs only \\(\\tan A+\\tan B\\) and \\(\\tan A\\tan B\\). Those are the sum and product of the roots when \\(\\tan A\\) and \\(\\tan B\\) solve a quadratic. When the sum of the angles is known, such as \\(45^\\circ\\), the same formula becomes a relation between the two tangents.",
      definition:
        "- \\(\\tan(A\\pm B)=\\frac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}\\).\n" +
        "- If \\(\\tan A,\\tan B\\) are the roots of \\(ax^2+bx+c=0\\): \\(\\tan A+\\tan B=-\\frac ba\\), \\(\\tan A\\tan B=\\frac ca\\).\n" +
        "- \\(A+B=45^\\circ\\) gives \\(\\tan A+\\tan B+\\tan A\\tan B=1\\), so \\((1+\\tan A)(1+\\tan B)=2\\).\n" +
        "- \\(\\tan(90^\\circ-A)=\\cot A\\), so \\(\\tan A\\tan(90^\\circ-A)=1\\).",
      formula: {
        label: "Tangent of a sum",
        latex: "\\tan(A\\pm B)=\\frac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}",
      },
      authoredExample: {
        prompt: "\\(\\tan A\\) and \\(\\tan B\\) are the roots of \\(x^2-5x+6=0\\), with \\(A,B\\in\\left(0,\\frac{\\pi}{2}\\right)\\). Find \\(A+B\\).",
        steps: [
          "\\(\\tan A+\\tan B=5\\) and \\(\\tan A\\tan B=6\\).",
          "\\(\\tan(A+B)=\\frac{5}{1-6}=-1\\).",
          "\\(A+B\\) lies in \\((0,\\pi)\\) and its tangent is negative, so it is in quadrant II.",
        ],
        answer: "\\(A+B=\\frac{3\\pi}{4}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\((1+\\tan20^\\circ)(1+\\tan25^\\circ)\\).",
        steps: [
          "\\(20^\\circ+25^\\circ=45^\\circ\\), so \\(\\tan20^\\circ+\\tan25^\\circ=1-\\tan20^\\circ\\tan25^\\circ\\).",
          "Expand: \\(1+(\\tan20^\\circ+\\tan25^\\circ)+\\tan20^\\circ\\tan25^\\circ=1+1\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan15^\\circ\\)?", answer: "\\(2-\\sqrt3\\)" },
        { prompt: "\\(\\frac{1+\\tan15^\\circ}{1-\\tan15^\\circ}\\)?", answer: "\\(\\sqrt3\\)" },
        { prompt: "\\(A+B\\) for acute \\(A,B\\) with \\(\\tan A=\\frac12\\), \\(\\tan B=\\frac13\\)?", answer: "\\(\\frac{\\pi}{4}\\)" },
        { prompt: "\\(\\tan70^\\circ-\\tan20^\\circ\\) in terms of \\(\\tan50^\\circ\\)?", answer: "\\(2\\tan50^\\circ\\)" },
      ],
      pyqExampleId: "c3d9b90f-d96f-4fb2-8102-00bf7d23e992", // 2026 — tan A, tan B as roots of a quadratic, then a half angle
      traps: [
        {
          title: "One tangent, two angles",
          body: "\\(\\tan(A+B)=-1\\) fits both \\(\\frac{3\\pi}{4}\\) and \\(-\\frac{\\pi}{4}\\). Use the ranges of \\(A\\) and \\(B\\), and the signs of \\(\\tan A\\) and \\(\\tan B\\), to choose the angle before taking its sine or cosine.",
        },
      ],
    },
  ],
};
