import type { SubtopicNote } from "@/app/notes/_types";

export const COMPOUND_NOTE: SubtopicNote = {
  subtopicName: "Compound Angles and Conditional Identities",
  title: "Compound Angles and Conditional Identities",
  oneLineDefinition:
    "The sine, cosine and tangent of A + B and A − B, the maximum of a sin x + b cos x, and what a fixed sum such as A + B = 45° or A + B + C = π does to the tangent formula.",
  whyItMatters:
    "13 PYQs, two HARD. Seven use the compound-angle formulas directly — a ratio from a given tangent, cot(A − B) from two differences, a maximum, an angle rewritten as α − π/4. " +
    "Six fix a sum of angles and rearrange tan(A + B): tan 3A − tan 2A − tan A, A + B = 225°, the half angles of a triangle. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cett2-compound-formulas",
      name: "The Compound-Angle Formulas and a sin x + b cos x",
      intuition:
        "Every other identity in this chapter comes from four lines: the sine and cosine of A ± B. Sine keeps the sign of the angle sum; cosine flips it. Tangent is their quotient. The same formulas run backwards: a sin x + b cos x is one sine of a shifted angle, with amplitude \\(\\sqrt{a^2 + b^2}\\), so that is its largest value.",
      definition:
        "- \\(\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\).\n" +
        "- \\(\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B\\) — the sign FLIPS.\n" +
        "- \\(\\tan(A \\pm B) = \\dfrac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}\\).\n" +
        "- \\(a\\sin x + b\\cos x = \\sqrt{a^2 + b^2}\\,\\sin(x + \\theta)\\), so it lies in \\(\\left[-\\sqrt{a^2 + b^2},\\ \\sqrt{a^2 + b^2}\\right]\\).\n" +
        "- \\(\\dfrac{\\sin\\alpha - \\cos\\alpha}{\\sin\\alpha + \\cos\\alpha} = \\dfrac{\\tan\\alpha - 1}{\\tan\\alpha + 1} = \\tan\\left(\\alpha - \\frac{\\pi}{4}\\right)\\).\n" +
        "- A ratio of sines and cosines with a known \\(\\tan\\theta\\): divide top and bottom by \\(\\cos\\theta\\).",
      formula: {
        label: "Compound angles",
        latex:
          "\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B \\qquad \\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B \\qquad \\tan(A\\pm B)=\\frac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}",
      },
      authoredExample: {
        prompt: "Find the maximum of \\(3\\sin x + 4\\cos x + 2\\).",
        steps: [
          "\\(3\\sin x + 4\\cos x\\) has amplitude \\(\\sqrt{9 + 16} = 5\\).",
          "So it reaches 5, and the whole expression reaches \\(5 + 2\\).",
        ],
        answer: "7",
      },
      selfCheckExample: {
        prompt: "If \\(\\tan A = \\frac12\\) and \\(\\tan B = \\frac13\\), find \\(A + B\\) for acute A and B.",
        steps: [
          "\\(\\tan(A + B) = \\dfrac{\\frac12 + \\frac13}{1 - \\frac16} = \\dfrac{5/6}{5/6} = 1\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\cos(A + B)\\) in terms of A and B?", answer: "\\(\\cos A\\cos B - \\sin A\\sin B\\)" },
        { prompt: "Maximum of \\(5\\sin x - 12\\cos x\\)?", answer: "13" },
        { prompt: "\\(\\tan\\theta = 2\\). Find \\(\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}\\).", answer: "3", method: "Divide by \\(\\cos\\theta\\): \\((2 + 1)/(2 - 1)\\)." },
      ],
      pyqExampleId: "a7612f19-7bc8-498e-a286-fc260f902693",
      traps: [
        {
          title: "Keeping the plus sign in cos(A + B)",
          body: "cos(A + B) = cos A cos B − sin A sin B. The sine formula keeps the sign of the angle sum; the cosine formula reverses it.",
        },
        {
          title: "Taking a + b as the maximum of a sin x + b cos x",
          body: "The two terms never peak together. The maximum is \\(\\sqrt{a^2 + b^2}\\), not \\(a + b\\) and not \\(a^2 + b^2\\).",
        },
        {
          title: "Forgetting that cot is the reciprocal",
          body: "cot B − cot A = (tan A − tan B)/(tan A tan B). Given tan A − tan B = x and cot B − cot A = y, the product tan A tan B is x/y, and cot(A − B) = 1/x + 1/y.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cett2-tan-sums",
      name: "Fixed Angle Sums and the Tangent Formula",
      intuition:
        "When a question fixes a sum of angles, write the tangent formula for that sum and clear the fraction. tan(A + B) = 1 becomes tan A + tan B + tan A tan B = 1. A triangle gives A/2 + B/2 = π/2 − C/2, so the tangent of the half-sum is the cotangent of the third half-angle. And 3A = 2A + A turns tan 3A into a relation between tan A, tan 2A and tan 3A.",
      definition:
        "- \\(A + B = \\frac{\\pi}{4}\\) or \\(\\frac{5\\pi}{4}\\) (225°): \\((1 + \\tan A)(1 + \\tan B) = 2\\).\n" +
        "- \\(\\tan 3A - \\tan 2A - \\tan A = \\tan A\\tan 2A\\tan 3A\\), from \\(\\tan 3A = \\tan(2A + A)\\).\n" +
        "- In a triangle: \\(\\tan\\frac{A + B}{2} = \\cot\\frac{C}{2}\\).\n" +
        "- \\(\\cot(A + B) = 0\\) means \\(A + B = \\frac{\\pi}{2}\\) (up to \\(n\\pi\\)), so \\(\\sin(A + 2B) = \\sin(\\frac{\\pi}{2} + B) = \\cos B = \\sin A\\).\n" +
        "- To compare two angles given by tangents, compute \\(\\tan(A + B)\\) and compare it with the third tangent.",
      formula: {
        label: "Clearing the fraction",
        latex: "\\tan(A+B)=k \\iff \\tan A+\\tan B = k\\,(1-\\tan A\\tan B)",
      },
      authoredExample: {
        prompt: "If \\(A + B = \\frac{\\pi}{4}\\), find \\((1 + \\tan A)(1 + \\tan B)\\).",
        steps: [
          "\\(\\tan(A + B) = 1\\), so \\(\\tan A + \\tan B = 1 - \\tan A\\tan B\\).",
          "Expand: \\(1 + \\tan A + \\tan B + \\tan A\\tan B = 1 + 1\\).",
        ],
        answer: "2",
      },
      selfCheckExample: {
        prompt: "In a triangle, \\(\\tan\\frac{A}{2} = \\frac12\\) and \\(\\tan\\frac{B}{2} = \\frac13\\). Find \\(\\tan\\frac{C}{2}\\).",
        steps: [
          "\\(\\tan\\frac{A + B}{2} = \\dfrac{\\frac12 + \\frac13}{1 - \\frac16} = 1\\).",
          "That equals \\(\\cot\\frac{C}{2}\\).",
        ],
        answer: "1",
      },
      practiceSet: [
        { prompt: "\\(A + B = 45^\\circ\\). Find \\((\\cot A - 1)(\\cot B - 1)\\).", answer: "2" },
        { prompt: "Simplify \\(\\tan 3A - \\tan 2A - \\tan A\\).", answer: "\\(\\tan A\\tan 2A\\tan 3A\\)" },
      ],
      pyqExampleId: "d06af0ff-aef2-4752-988c-3c6e107f0a8e",
      traps: [
        {
          title: "Reading 225° as a new case",
          body: "tan 225° = tan 45° = 1, so A + B = 225° gives exactly the same identity as A + B = 45°: the product of (1 + tan A)(1 + tan B) is 2.",
        },
        {
          title: "Dropping a sign in the triple rearrangement",
          body: "tan 3A(1 − tan 2A tan A) = tan 2A + tan A, so tan 3A − tan 2A − tan A = +tan A tan 2A tan 3A. The negative of it is printed as an option.",
        },
      ],
    },
  ],
  related: [
    { label: "Multiple and Sub-multiple Angles", href: "/notes/mht-cet-maths/trigonometry-ii/cett2-multiple" },
  ],
};
