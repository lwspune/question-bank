import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_TRIG_NOTE: SubtopicNote = {
  subtopicName: "Integration using Trigonometric Identities",
  title: "Integration using Trigonometric Identities",
  oneLineDefinition:
    "When a trigonometric integrand is not a standard form, an identity rewrites it as one: squares and cubes become multiple angles, products become sums, and fractions become sec, tan, cosec and cot.",
  whyItMatters:
    "59 questions, twenty-six of them from board papers: two in 2022, seven in 2023, three in 2024, nine in 2025 and five in 2026. Most of the one-mark items are here: one plus tan x over one minus tan x and its partner (2023), sec x over sec x minus tan x (2023), 2 over 1 + cos 2x (2023), roots such as the root of 1 + sin 2x, 1 + sin x and (1 + cos x)/(1 − cos x) (2024, 2025, 2026), 1 over sin squared x cos squared x (2025) and 1 over 1 + cos x (2026). The longer questions ask for sin 3x over sin x (2022), F(x) from sec to the fourth over cosec to the fourth (2022), cos x over sin 3x and 1 over cos(x − a) cos(x − b) (2023), cos x over 1 + cos x + sin x and cos 2x over (sin x + cos x) squared (2025). The textbook adds Example 7, Exercise 7.3 and Miscellaneous questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-trig-powers",
      name: "Squares, cubes and half angles",
      intuition:
        "There is no direct formula for \\(\\sin^2 x\\) or \\(\\cos^2 x\\), but each is a constant plus a multiple of \\(\\cos 2x\\), and those integrate at once. In the same way \\(1 + \\cos x\\) and \\(1 - \\cos x\\) become \\(2\\cos^2\\dfrac{x}{2}\\) and \\(2\\sin^2\\dfrac{x}{2}\\), which clear roots and fractions.",
      definition:
        "- \\(\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}\\), \\(\\cos^2 x = \\dfrac{1 + \\cos 2x}{2}\\).\n" +
        "- \\(\\sin^3 x = \\dfrac{3\\sin x - \\sin 3x}{4}\\), \\(\\cos^3 x = \\dfrac{3\\cos x + \\cos 3x}{4}\\).\n" +
        "- \\(1 + \\cos x = 2\\cos^2\\dfrac{x}{2}\\), \\(1 - \\cos x = 2\\sin^2\\dfrac{x}{2}\\), \\(\\sin x = 2\\sin\\dfrac{x}{2}\\cos\\dfrac{x}{2}\\).\n" +
        "- \\(1 \\pm \\sin 2x = (\\sin x \\pm \\cos x)^2\\), so \\(\\sqrt{1 + \\sin 2x} = |\\sin x + \\cos x|\\). Use the given interval to drop the modulus.\n" +
        "- \\(\\tan^2 x = \\sec^2 x - 1\\); for \\(\\tan^4 x\\) write \\(\\tan^2 x\\sec^2 x - \\tan^2 x\\).",
      formula: {
        label: "Lowering the power",
        latex: "\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}, \\qquad \\cos^2 x = \\dfrac{1 + \\cos 2x}{2}",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\sqrt{1 - \\sin 2x}\\,dx\\), where \\(0 < x < \\dfrac{\\pi}{4}\\).",
        steps: [
          "\\(1 - \\sin 2x = \\sin^2 x + \\cos^2 x - 2\\sin x\\cos x = (\\cos x - \\sin x)^2\\).",
          "\\(\\sqrt{1 - \\sin 2x} = |\\cos x - \\sin x|\\).",
          "For \\(0 < x < \\dfrac{\\pi}{4}\\), \\(\\cos x > \\sin x\\), so \\(|\\cos x - \\sin x| = \\cos x - \\sin x\\).",
          "\\(\\int (\\cos x - \\sin x)\\,dx = \\sin x + \\cos x + C\\).",
        ],
        answer: "\\(\\sin x + \\cos x + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\sin^2 3x\\,dx\\).",
        steps: [
          "\\(\\sin^2 3x = \\dfrac{1 - \\cos 6x}{2}\\).",
          "\\(\\int \\dfrac{1 - \\cos 6x}{2}\\,dx = \\dfrac{x}{2} - \\dfrac{1}{2} \\cdot \\dfrac{\\sin 6x}{6} + C\\).",
          "\\(= \\dfrac{x}{2} - \\dfrac{\\sin 6x}{12} + C\\).",
        ],
        answer: "\\(\\dfrac{x}{2} - \\dfrac{\\sin 6x}{12} + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{dx}{1 - \\cos x}\\).", answer: "\\(-\\cot\\dfrac{x}{2} + C\\)", method: "\\(\\dfrac{1}{2}\\operatorname{cosec}^2\\dfrac{x}{2}\\)" },
        { prompt: "Find \\(\\int \\cos^2\\dfrac{x}{2}\\,dx\\).", answer: "\\(\\dfrac{x}{2} + \\dfrac{\\sin x}{2} + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{\\sin^2 x}{1 - \\cos x}\\,dx\\).", answer: "\\(x + \\sin x + C\\)", method: "\\(\\sin^2 x = (1 - \\cos x)(1 + \\cos x)\\)" },
      ],
      pyqExampleId: "74cbff9b-765c-4527-89f5-3383b7ecbe93",
      traps: [
        {
          title: "Dropping the modulus without a reason",
          body: "\\(\\sqrt{(\\sin x + \\cos x)^2}\\) is \\(|\\sin x + \\cos x|\\). Remove the modulus only after saying why the bracket is positive on the given interval.",
        },
        {
          title: "Losing the half in the angle",
          body: "\\(\\int \\sec^2\\dfrac{x}{2}\\,dx = 2\\tan\\dfrac{x}{2}\\), not \\(\\tan\\dfrac{x}{2}\\). Dividing by the coefficient \\(\\dfrac{1}{2}\\) doubles the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-trig-products",
      name: "Products and multiple angles",
      intuition:
        "A product such as \\(\\sin 5x\\cos 2x\\) has no standard integral, but twice that product is a sum of two sines, and a sum is easy. A multiple angle in a fraction, such as \\(\\sin 3x\\) over \\(\\sin x\\), is opened with its own formula so that the denominator cancels.",
      definition:
        "- \\(2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)\\).\n" +
        "- \\(2\\cos A\\cos B = \\cos(A + B) + \\cos(A - B)\\).\n" +
        "- \\(2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B)\\).\n" +
        "- \\(\\sin 3x = 3\\sin x - 4\\sin^3 x\\), \\(\\cos 3x = 4\\cos^3 x - 3\\cos x\\).\n" +
        "- A product of three, such as \\(\\cos 2x\\cos 4x\\cos 6x\\), is done two at a time.",
      formula: {
        label: "Product to sum",
        latex: "\\sin A\\cos B = \\dfrac{1}{2}\\left[\\sin(A + B) + \\sin(A - B)\\right]",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\sin 5x\\cos 2x\\,dx\\).",
        steps: [
          "\\(\\sin 5x\\cos 2x = \\dfrac{1}{2}\\left[\\sin 7x + \\sin 3x\\right]\\).",
          "\\(\\int \\dfrac{1}{2}(\\sin 7x + \\sin 3x)\\,dx = \\dfrac{1}{2}\\left[-\\dfrac{\\cos 7x}{7} - \\dfrac{\\cos 3x}{3}\\right] + C\\).",
          "\\(= -\\dfrac{\\cos 7x}{14} - \\dfrac{\\cos 3x}{6} + C\\).",
        ],
        answer: "\\(-\\dfrac{\\cos 7x}{14} - \\dfrac{\\cos 3x}{6} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\cos 3x\\cos x\\,dx\\).",
        steps: [
          "\\(\\cos 3x\\cos x = \\dfrac{1}{2}\\left[\\cos 4x + \\cos 2x\\right]\\).",
          "\\(\\int \\dfrac{1}{2}(\\cos 4x + \\cos 2x)\\,dx = \\dfrac{1}{2}\\left[\\dfrac{\\sin 4x}{4} + \\dfrac{\\sin 2x}{2}\\right] + C\\).",
          "\\(= \\dfrac{\\sin 4x}{8} + \\dfrac{\\sin 2x}{4} + C\\).",
        ],
        answer: "\\(\\dfrac{\\sin 4x}{8} + \\dfrac{\\sin 2x}{4} + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\sin 4x\\sin 2x\\,dx\\).", answer: "\\(\\dfrac{\\sin 2x}{4} - \\dfrac{\\sin 6x}{12} + C\\)" },
        { prompt: "Find \\(\\int \\sin^3 x\\,dx\\) using \\(\\sin 3x = 3\\sin x - 4\\sin^3 x\\).", answer: "\\(-\\dfrac{3}{4}\\cos x + \\dfrac{1}{12}\\cos 3x + C\\)" },
      ],
      pyqExampleId: "2c1c5d83-93f3-406d-892a-3b12978f4175",
      traps: [
        {
          title: "Forgetting the half",
          body: "\\(\\sin A\\cos B\\) is half of \\(\\sin(A + B) + \\sin(A - B)\\). Leaving out \\(\\dfrac{1}{2}\\) doubles the answer.",
        },
        {
          title: "The order in 2 sin A sin B",
          body: "\\(2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B)\\): the difference angle comes first. Reversing them changes the sign of the whole answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-trig-rewrite",
      name: "Rewriting in sec, tan, cosec and cot",
      intuition:
        "Many fractions turn into standard integrals once you divide or multiply by the right thing. Multiplying \\(\\dfrac{1}{1 + \\sin x}\\) by \\(1 - \\sin x\\) gives \\(\\cos^2 x\\) below and splits into \\(\\sec^2 x\\) and \\(\\sec x\\tan x\\). Writing 1 as \\(\\sin^2 x + \\cos^2 x\\), or factorising \\(\\cos 2x\\), often makes a fraction cancel.",
      definition:
        "- Multiply by the conjugate: \\(\\dfrac{1}{1 + \\sin x} = \\dfrac{1 - \\sin x}{\\cos^2 x} = \\sec^2 x - \\sec x\\tan x\\).\n" +
        "- Replace 1 by \\(\\sin^2 x + \\cos^2 x\\): \\(\\dfrac{1}{\\sin^2 x\\cos^2 x} = \\sec^2 x + \\operatorname{cosec}^2 x\\).\n" +
        "- \\(\\cos 2x = \\cos^2 x - \\sin^2 x = (\\cos x - \\sin x)(\\cos x + \\sin x)\\); cancel a factor with the denominator.\n" +
        "- \\(\\cos 2x - \\cos 2a = 2(\\cos^2 x - \\cos^2 a)\\), which cancels with \\(\\cos x - \\cos a\\).\n" +
        "- \\(\\sec^2 x - \\tan^2 x = 1\\), so \\(\\dfrac{1}{\\sec x - \\tan x} = \\sec x + \\tan x\\).",
      formula: {
        label: "Two standard results that appear here",
        latex: "\\int \\sec^2 x\\,dx = \\tan x + C, \\qquad \\int \\sec x\\tan x\\,dx = \\sec x + C",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{dx}{1 + \\sin x}\\).",
        steps: [
          "Multiply numerator and denominator by \\(1 - \\sin x\\).",
          "\\(\\dfrac{1 - \\sin x}{1 - \\sin^2 x} = \\dfrac{1 - \\sin x}{\\cos^2 x} = \\sec^2 x - \\sec x\\tan x\\).",
          "\\(\\int (\\sec^2 x - \\sec x\\tan x)\\,dx = \\tan x - \\sec x + C\\).",
        ],
        answer: "\\(\\tan x - \\sec x + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{1 + \\cos 2x}{\\sin^2 2x}\\,dx\\).",
        steps: [
          "\\(1 + \\cos 2x = 2\\cos^2 x\\) and \\(\\sin^2 2x = 4\\sin^2 x\\cos^2 x\\).",
          "The integrand is \\(\\dfrac{2\\cos^2 x}{4\\sin^2 x\\cos^2 x} = \\dfrac{1}{2}\\operatorname{cosec}^2 x\\).",
          "\\(\\int \\dfrac{1}{2}\\operatorname{cosec}^2 x\\,dx = -\\dfrac{1}{2}\\cot x + C\\).",
        ],
        answer: "\\(-\\dfrac{1}{2}\\cot x + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{dx}{1 - \\sin x}\\).", answer: "\\(\\tan x + \\sec x + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{\\sec x}{\\sec x + \\tan x}\\,dx\\).", answer: "\\(\\tan x - \\sec x + C\\)", method: "\\(\\dfrac{1}{\\sec x + \\tan x} = \\sec x - \\tan x\\)" },
        { prompt: "Find \\(\\int (\\sin x + \\cos x)^2\\,dx\\).", answer: "\\(x - \\dfrac{\\cos 2x}{2} + C\\)", method: "\\(1 + \\sin 2x\\)" },
      ],
      pyqExampleId: "4e551a7e-547d-4fff-8e90-81e57e3b4a0b",
      traps: [
        {
          title: "Splitting a fraction the wrong way",
          body: "\\(\\dfrac{1}{1 + \\sin x}\\) is not \\(1 + \\operatorname{cosec} x\\). Only a numerator can be split term by term; a sum in the denominator needs the conjugate.",
        },
        {
          title: "Sign of the cosec squared integral",
          body: "\\(\\int \\operatorname{cosec}^2 x\\,dx = -\\cot x + C\\). So \\(\\int (\\sec^2 x - \\operatorname{cosec}^2 x)\\,dx = \\tan x + \\cot x + C\\), with a plus sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-trig-shift",
      name: "Shifted angles: the sin(a − b) trick and tan(π/4 ± x)",
      intuition:
        "For \\(\\dfrac{1}{\\cos(x - a)\\cos(x - b)}\\), the two angles differ by the constant \\(a - b\\). Multiply and divide by \\(\\sin(a - b)\\), write \\(a - b\\) as \\((x - b) - (x - a)\\) and expand: each term cancels one cosine and leaves a tangent. In the same spirit, \\(\\dfrac{1 + \\tan x}{1 - \\tan x}\\) is \\(\\tan\\left(\\dfrac{\\pi}{4} + x\\right)\\).",
      definition:
        "- \\(\\sin(a - b) = \\sin[(x - b) - (x - a)] = \\sin(x - b)\\cos(x - a) - \\cos(x - b)\\sin(x - a)\\).\n" +
        "- Dividing by \\(\\cos(x - a)\\cos(x - b)\\) gives \\(\\tan(x - b) - \\tan(x - a)\\).\n" +
        "- \\(\\sin(a - b)\\) is a constant, so it is written outside as \\(\\dfrac{1}{\\sin(a - b)}\\).\n" +
        "- \\(\\dfrac{1 + \\tan x}{1 - \\tan x} = \\tan\\left(\\dfrac{\\pi}{4} + x\\right)\\) and \\(\\dfrac{1 - \\tan x}{1 + \\tan x} = \\tan\\left(\\dfrac{\\pi}{4} - x\\right)\\).\n" +
        "- \\(\\sin x + \\cos x = \\sqrt{2}\\sin\\left(x + \\dfrac{\\pi}{4}\\right)\\), which turns \\(\\dfrac{1}{\\sin x + \\cos x}\\) into a cosec.",
      formula: {
        label: "Writing the constant angle as a difference",
        latex: "\\sin(a - b) = \\sin(x - b)\\cos(x - a) - \\cos(x - b)\\sin(x - a)",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{dx}{\\sin(x - a)\\cos(x - b)}\\).",
        steps: [
          "\\(\\cos(a - b) = \\cos[(x - b) - (x - a)] = \\cos(x - b)\\cos(x - a) + \\sin(x - b)\\sin(x - a)\\).",
          "Multiply and divide the integrand by \\(\\cos(a - b)\\): \\(I = \\dfrac{1}{\\cos(a - b)}\\int \\dfrac{\\cos(x - b)\\cos(x - a) + \\sin(x - b)\\sin(x - a)}{\\sin(x - a)\\cos(x - b)}\\,dx\\).",
          "\\(= \\dfrac{1}{\\cos(a - b)}\\int \\left[\\cot(x - a) + \\tan(x - b)\\right]dx\\).",
          "\\(= \\dfrac{1}{\\cos(a - b)}\\left[\\log|\\sin(x - a)| + \\log|\\sec(x - b)|\\right] + C\\).",
          "\\(\\therefore I = \\dfrac{1}{\\cos(a - b)}\\log\\left|\\dfrac{\\sin(x - a)}{\\cos(x - b)}\\right| + C\\).",
        ],
        answer: "\\(\\dfrac{1}{\\cos(a - b)}\\log\\left|\\dfrac{\\sin(x - a)}{\\cos(x - b)}\\right| + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{1 - \\tan x}{1 + \\tan x}\\,dx\\).",
        steps: [
          "\\(\\dfrac{1 - \\tan x}{1 + \\tan x} = \\dfrac{\\tan\\dfrac{\\pi}{4} - \\tan x}{1 + \\tan\\dfrac{\\pi}{4}\\tan x} = \\tan\\left(\\dfrac{\\pi}{4} - x\\right)\\).",
          "Put \\(\\dfrac{\\pi}{4} - x = u\\), so \\(dx = -du\\).",
          "\\(\\int \\tan\\left(\\dfrac{\\pi}{4} - x\\right)dx = -\\int \\tan u\\,du = -\\log|\\sec u| + C\\).",
          "\\(= \\log\\left|\\cos\\left(\\dfrac{\\pi}{4} - x\\right)\\right| + C\\).",
        ],
        answer: "\\(\\log\\left|\\cos\\left(\\dfrac{\\pi}{4} - x\\right)\\right| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{\\sin(x - a)}{\\sin x}\\,dx\\).", answer: "\\(x\\cos a - \\sin a\\log|\\sin x| + C\\)", method: "\\(\\cos a - \\sin a\\cot x\\)" },
        { prompt: "Find \\(\\int \\tan x\\tan(x + a)\\,dx\\).", answer: "\\(\\cot a\\log\\left|\\dfrac{\\cos x}{\\cos(x + a)}\\right| - x + C\\)", method: "From \\(\\tan a = \\tan[(x + a) - x]\\): \\(\\tan x\\tan(x + a) = \\cot a[\\tan(x + a) - \\tan x] - 1\\)." },
        { prompt: "Find \\(\\int \\dfrac{dx}{\\sqrt{3}\\sin x + \\cos x}\\).", answer: "\\(\\dfrac{1}{2}\\log\\left|\\operatorname{cosec}\\left(x + \\dfrac{\\pi}{6}\\right) - \\cot\\left(x + \\dfrac{\\pi}{6}\\right)\\right| + C\\)", method: "The denominator is \\(2\\sin\\left(x + \\dfrac{\\pi}{6}\\right)\\)." },
      ],
      pyqExampleId: "98dd6c51-670e-4504-abb9-dacd54bdffac",
      traps: [
        {
          title: "Integrating the constant sin(a − b)",
          body: "\\(\\sin(a - b)\\) has no \\(x\\) in it. It stays outside as a fixed factor; it is never part of the substitution.",
        },
        {
          title: "Order of the angles",
          body: "Write \\(a - b\\) as \\((x - b) - (x - a)\\), not the other way round. The reverse order gives \\(\\sin(b - a)\\) and every sign in the answer flips.",
        },
      ],
    },
  ],
};
