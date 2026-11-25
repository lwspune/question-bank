import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IT_EVALUATE_NOTE: SubtopicNote = {
  subtopicName: "Evaluating Inverse Trigonometric Expressions",
  title: "Evaluating Inverse Trigonometric Expressions",
  oneLineDefinition:
    "Working out an expression built from principal values: adding them, putting one inside a trigonometric ratio, and taking an inverse function of a ratio whose angle may lie outside the branch.",
  whyItMatters:
    "42 questions, twenty-nine of them from board papers from 2023 to 2026. Every year the board asks you to add principal values, such as sin⁻¹(−1/2) + cos⁻¹(−√3/2), or to work an expression from the inside out, such as tan⁻¹[2 cos(2 sin⁻¹ ½)]. Every year it also asks for a value such as sin⁻¹(sin 3π/5), where the angle lies outside the branch. In 2024 it asked for squares such as sec²(tan⁻¹ ½). The textbook adds the sums of Exercise 2.1 and the values of Exercise 2.2.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmit-combine",
      name: "Adding principal values and working from the inside out",
      intuition:
        "An expression like \\(\\sec^{-1}(-2) + \\cot^{-1}(-1)\\) is just two angles added. Find each angle on its own, inside its own branch, and then do the arithmetic with fractions of \\(\\pi\\). When one function sits inside another, start with the innermost one and work outwards, one layer a line.",
      definition:
        "- Write each inverse value as a principal value, with the branch it comes from.\n" +
        "- For a negative number use the branch: \\(\\sin^{-1}(-x) = -\\sin^{-1}x\\) and \\(\\tan^{-1}(-x) = -\\tan^{-1}x\\) stay negative; \\(\\cos^{-1}\\), \\(\\sec^{-1}\\) and \\(\\cot^{-1}\\) of a negative number lie between \\(\\dfrac{\\pi}{2}\\) and \\(\\pi\\).\n" +
        "- Add the angles over a common denominator, such as 12 for quarters, thirds and sixths of \\(\\pi\\).\n" +
        "- **Inside out:** in \\(\\tan^{-1}\\left[2\\cos\\left(2\\sin^{-1}\\tfrac{1}{2}\\right)\\right]\\), first \\(\\sin^{-1}\\tfrac{1}{2} = \\tfrac{\\pi}{6}\\), then \\(\\cos\\tfrac{\\pi}{3} = \\tfrac{1}{2}\\), then \\(\\tan^{-1}1 = \\tfrac{\\pi}{4}\\).\n" +
        "- **An unknown inside:** if \\(\\sin^{-1}(\\text{expression}) = \\alpha\\), take the sine of both sides: expression \\(= \\sin\\alpha\\).",
      formula: {
        label: "Principal values at a negative number",
        latex: "\\cos^{-1}(-x) = \\pi - \\cos^{-1}x, \\quad \\cot^{-1}(-x) = \\pi - \\cot^{-1}x, \\quad \\sin^{-1}(-x) = -\\sin^{-1}x",
      },
      authoredExample: {
        prompt: "Find the value of \\(\\sec^{-1}(-2) + 2\\cot^{-1}(-1) - \\sin^{-1}\\dfrac{\\sqrt{3}}{2}\\).",
        steps: [
          "\\(\\sec^{-1}(-2)\\): \\(\\cos y = -\\dfrac{1}{2}\\) with \\(y\\) in \\([0, \\pi] - \\left\\{\\dfrac{\\pi}{2}\\right\\}\\), so \\(\\sec^{-1}(-2) = \\dfrac{2\\pi}{3}\\).",
          "\\(\\cot^{-1}(-1)\\): \\(\\cot y = -1\\) with \\(y\\) in \\((0, \\pi)\\), so \\(\\cot^{-1}(-1) = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\).",
          "\\(\\sin^{-1}\\dfrac{\\sqrt{3}}{2} = \\dfrac{\\pi}{3}\\), which lies in \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\).",
          "Value \\(= \\dfrac{2\\pi}{3} + 2 \\times \\dfrac{3\\pi}{4} - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3} + \\dfrac{3\\pi}{2} - \\dfrac{\\pi}{3}\\).",
          "\\(= \\dfrac{4\\pi + 9\\pi - 2\\pi}{6} = \\dfrac{11\\pi}{6}\\).",
        ],
        answer: "\\(\\dfrac{11\\pi}{6}\\)",
      },
      selfCheckExample: {
        prompt: "Find the value of \\(\\tan\\left[2\\tan^{-1}\\dfrac{1}{\\sqrt{3}} + \\cos^{-1}\\dfrac{1}{2}\\right]\\).",
        steps: [
          "\\(\\tan^{-1}\\dfrac{1}{\\sqrt{3}} = \\dfrac{\\pi}{6}\\) and \\(\\cos^{-1}\\dfrac{1}{2} = \\dfrac{\\pi}{3}\\).",
          "The angle is \\(\\dfrac{\\pi}{3} + \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}\\).",
          "\\(\\tan\\dfrac{2\\pi}{3} = -\\tan\\dfrac{\\pi}{3} = -\\sqrt{3}\\).",
        ],
        answer: "\\(-\\sqrt{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the value of \\(\\operatorname{cosec}^{-1}\\sqrt{2} + \\cot^{-1}(-\\sqrt{3})\\).", answer: "\\(\\dfrac{13\\pi}{12}\\)", method: "\\(\\dfrac{\\pi}{4} + \\dfrac{5\\pi}{6}\\)" },
        { prompt: "Find the value of \\(\\sin\\left[\\dfrac{\\pi}{2} - \\cos^{-1}\\left(-\\dfrac{1}{2}\\right)\\right]\\).", answer: "\\(-\\dfrac{1}{2}\\)", method: "\\(\\cos^{-1}\\left(-\\dfrac{1}{2}\\right) = \\dfrac{2\\pi}{3}\\), and \\(\\sin\\left(-\\dfrac{\\pi}{6}\\right) = -\\dfrac{1}{2}\\)." },
        { prompt: "Find \\(x\\) if \\(\\tan^{-1}x = 2\\sin^{-1}\\dfrac{1}{2}\\).", answer: "\\(x = \\sqrt{3}\\)", method: "\\(\\tan^{-1}x = \\dfrac{\\pi}{3}\\), so \\(x = \\tan\\dfrac{\\pi}{3}\\)." },
      ],
      pyqExampleId: "10106fb2-13aa-41d8-8a7f-c5ffc3994700",
      traps: [
        {
          title: "Taking the negative angle for cot⁻¹",
          body: "\\(\\cot^{-1}(-\\sqrt{3})\\) is \\(\\dfrac{5\\pi}{6}\\), not \\(-\\dfrac{\\pi}{6}\\). A negative angle is outside \\((0, \\pi)\\).",
        },
        {
          title: "Doubling before finding the value",
          body: "In \\(2\\cot^{-1}(-1)\\), find \\(\\cot^{-1}(-1) = \\dfrac{3\\pi}{4}\\) first, then double it. Do not look for an angle whose cotangent is \\(-2\\).",
        },
        {
          title: "Mixing degrees and radians",
          body: "Inverse values are written in radians. Writing \\(60^\\circ + \\dfrac{\\pi}{4}\\) loses the mark for the final answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmit-undo",
      name: "An inverse function of a ratio: when it undoes the ratio",
      intuition:
        "\\(\\sin^{-1}\\) gives back the angle only if the angle was inside its branch to begin with. For \\(\\sin^{-1}\\left(\\sin\\dfrac{5\\pi}{6}\\right)\\) the answer cannot be \\(\\dfrac{5\\pi}{6}\\), because \\(\\sin^{-1}\\) never gives an angle bigger than \\(\\dfrac{\\pi}{2}\\). Find the angle inside the branch that has the same sine, and that is the answer.",
      definition:
        "- \\(\\sin(\\sin^{-1}x) = x\\) for \\(x\\) in \\([-1, 1]\\), and \\(\\sin^{-1}(\\sin x) = x\\) only for \\(x\\) in \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\).\n" +
        "- In the same way \\(\\cos^{-1}(\\cos x) = x\\) only for \\(x\\) in \\([0, \\pi]\\), and \\(\\tan^{-1}(\\tan x) = x\\) only for \\(x\\) in \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\).\n" +
        "- **Outside the branch,** change the angle without changing the ratio, until it lies in the branch.\n" +
        "- For sine use \\(\\sin(\\pi - x) = \\sin x\\); sine repeats every \\(2\\pi\\).\n" +
        "- For cosine use \\(\\cos(-x) = \\cos x\\) and \\(\\cos(2\\pi - x) = \\cos x\\); cosine repeats every \\(2\\pi\\).\n" +
        "- For tangent add or subtract \\(\\pi\\); tangent repeats every \\(\\pi\\).\n" +
        "- Or work out the ratio as a number first, then take its principal value.\n" +
        "- For \\(\\sin^{-1}(\\cos x)\\), first write \\(\\cos x = \\sin\\left(\\dfrac{\\pi}{2} - x\\right)\\).",
      formula: {
        label: "When the inverse undoes the function",
        latex: "\\sin^{-1}(\\sin x) = x,\\ x \\in \\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]; \\quad \\cos^{-1}(\\cos x) = x,\\ x \\in [0, \\pi]; \\quad \\tan^{-1}(\\tan x) = x,\\ x \\in \\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\sin^{-1}\\left(\\sin\\dfrac{5\\pi}{6}\\right) + \\cos^{-1}\\left(\\cos\\dfrac{5\\pi}{4}\\right) + \\tan^{-1}\\left(\\tan\\dfrac{5\\pi}{6}\\right)\\).",
        steps: [
          "\\(\\dfrac{5\\pi}{6}\\) is not in \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\). \\(\\sin\\dfrac{5\\pi}{6} = \\sin\\left(\\pi - \\dfrac{5\\pi}{6}\\right) = \\sin\\dfrac{\\pi}{6}\\), so the first term is \\(\\dfrac{\\pi}{6}\\).",
          "\\(\\dfrac{5\\pi}{4}\\) is not in \\([0, \\pi]\\). \\(\\cos\\dfrac{5\\pi}{4} = \\cos\\left(2\\pi - \\dfrac{5\\pi}{4}\\right) = \\cos\\dfrac{3\\pi}{4}\\), and \\(\\dfrac{3\\pi}{4}\\) is in \\([0, \\pi]\\), so the second term is \\(\\dfrac{3\\pi}{4}\\).",
          "\\(\\dfrac{5\\pi}{6}\\) is not in \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\). \\(\\tan\\dfrac{5\\pi}{6} = \\tan\\left(\\dfrac{5\\pi}{6} - \\pi\\right) = \\tan\\left(-\\dfrac{\\pi}{6}\\right)\\), so the third term is \\(-\\dfrac{\\pi}{6}\\).",
          "Sum \\(= \\dfrac{\\pi}{6} + \\dfrac{3\\pi}{4} - \\dfrac{\\pi}{6} = \\dfrac{3\\pi}{4}\\).",
        ],
        answer: "\\(\\dfrac{3\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Find the value of \\(\\cos^{-1}\\left[\\cos\\left(-\\dfrac{4\\pi}{3}\\right)\\right]\\).",
        steps: [
          "Cosine is even: \\(\\cos\\left(-\\dfrac{4\\pi}{3}\\right) = \\cos\\dfrac{4\\pi}{3}\\).",
          "\\(\\cos\\dfrac{4\\pi}{3} = \\cos\\left(2\\pi - \\dfrac{4\\pi}{3}\\right) = \\cos\\dfrac{2\\pi}{3}\\), and \\(\\dfrac{2\\pi}{3}\\) lies in \\([0, \\pi]\\).",
          "\\(\\therefore \\cos^{-1}\\left[\\cos\\left(-\\dfrac{4\\pi}{3}\\right)\\right] = \\dfrac{2\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{2\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the value of \\(\\tan^{-1}\\left(\\tan\\dfrac{9\\pi}{8}\\right)\\).", answer: "\\(\\dfrac{\\pi}{8}\\)" },
        { prompt: "Find the value of \\(\\sin^{-1}\\left(\\sin\\dfrac{4\\pi}{3}\\right)\\).", answer: "\\(-\\dfrac{\\pi}{3}\\)", method: "\\(\\sin\\dfrac{4\\pi}{3} = -\\dfrac{\\sqrt{3}}{2}\\)" },
        { prompt: "Find the value of \\(\\sin^{-1}\\left(\\cos\\dfrac{3\\pi}{4}\\right)\\).", answer: "\\(-\\dfrac{\\pi}{4}\\)", method: "\\(\\cos\\dfrac{3\\pi}{4} = -\\dfrac{1}{\\sqrt{2}}\\)" },
        { prompt: "Find the value of \\(\\cos^{-1}\\left(\\cos\\dfrac{3\\pi}{2}\\right)\\).", answer: "\\(\\dfrac{\\pi}{2}\\)", method: "\\(\\cos\\dfrac{3\\pi}{2} = 0\\)" },
      ],
      pyqExampleId: "5cb60dbe-1527-4598-95c8-da4f53b25259",
      traps: [
        {
          title: "Cancelling at once",
          body: "\\(\\sin^{-1}(\\sin x) = x\\) only inside \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\). Always check where the angle lies before you cancel; an answer outside the branch gets no marks.",
        },
        {
          title: "Using the period of sine for tangent",
          body: "Tangent repeats every \\(\\pi\\): \\(\\tan\\dfrac{3\\pi}{4} = \\tan\\left(\\dfrac{3\\pi}{4} - \\pi\\right) = \\tan\\left(-\\dfrac{\\pi}{4}\\right)\\), so \\(\\tan^{-1}\\left(\\tan\\dfrac{3\\pi}{4}\\right) = -\\dfrac{\\pi}{4}\\). The sine rule \\(\\pi - x\\) gives \\(\\dfrac{\\pi}{4}\\), with the wrong sign, because \\(\\tan(\\pi - x) = -\\tan x\\).",
        },
        {
          title: "The wrong rule for cosine",
          body: "\\(\\cos(\\pi - x) = -\\cos x\\), not \\(\\cos x\\). For cosine use \\(\\cos(2\\pi - x) = \\cos x\\) or \\(\\cos(-x) = \\cos x\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmit-ratio-of-inverse",
      name: "A trigonometric ratio of an inverse value",
      intuition:
        "\\(\\cos^{-1}\\dfrac{5}{13}\\) is an angle \\(\\theta\\) whose cosine is \\(\\dfrac{5}{13}\\). Any other ratio of \\(\\theta\\) follows from the identities of Class 11, with the sign fixed by the branch \\(\\theta\\) lies in.",
      definition:
        "- Let \\(\\theta\\) be the inverse value. Then you know one ratio of \\(\\theta\\), and the branch tells you where \\(\\theta\\) lies.\n" +
        "- Use \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), \\(\\sec^2\\theta = 1 + \\tan^2\\theta\\) and \\(\\operatorname{cosec}^2\\theta = 1 + \\cot^2\\theta\\).\n" +
        "- A square needs no sign: \\(\\sin^2(\\cos^{-1}x) = 1 - x^2\\) and \\(\\tan^2(\\sec^{-1}x) = x^2 - 1\\).\n" +
        "- For one ratio, the sign comes from the branch: \\(\\theta = \\cos^{-1}x\\) lies in \\([0, \\pi]\\), so \\(\\sin\\theta \\ge 0\\), but \\(\\tan\\theta < 0\\) when \\(x < 0\\).\n" +
        "- For two inverse values, let \\(A\\) and \\(B\\) be the angles, find \\(\\tan A\\) and \\(\\tan B\\), then use \\(\\tan(A + B) = \\dfrac{\\tan A + \\tan B}{1 - \\tan A\\tan B}\\).",
      formula: {
        label: "Squares of a ratio of an inverse value",
        latex: "\\sec^2(\\tan^{-1}x) = 1 + x^2, \\qquad \\operatorname{cosec}^2(\\cot^{-1}x) = 1 + x^2, \\qquad \\sin^2(\\cos^{-1}x) = 1 - x^2",
      },
      authoredExample: {
        prompt: "Find the value of \\(\\sin\\left(\\cos^{-1}\\dfrac{5}{13}\\right) + \\tan^2\\left(\\sec^{-1}4\\right)\\).",
        steps: [
          "Let \\(\\theta = \\cos^{-1}\\dfrac{5}{13}\\). Then \\(\\cos\\theta = \\dfrac{5}{13}\\) and \\(\\theta\\) is in \\([0, \\pi]\\), so \\(\\sin\\theta \\ge 0\\).",
          "\\(\\sin\\theta = \\sqrt{1 - \\dfrac{25}{169}} = \\sqrt{\\dfrac{144}{169}} = \\dfrac{12}{13}\\).",
          "\\(\\tan^2\\left(\\sec^{-1}4\\right) = \\sec^2\\left(\\sec^{-1}4\\right) - 1 = 16 - 1 = 15\\).",
          "Value \\(= \\dfrac{12}{13} + 15 = \\dfrac{12 + 195}{13} = \\dfrac{207}{13}\\).",
        ],
        answer: "\\(\\dfrac{207}{13}\\)",
      },
      selfCheckExample: {
        prompt: "Find the value of \\(\\sin\\left(\\tan^{-1}\\dfrac{5}{12}\\right)\\).",
        steps: [
          "Let \\(\\theta = \\tan^{-1}\\dfrac{5}{12}\\), so \\(\\tan\\theta = \\dfrac{5}{12}\\) and \\(\\theta\\) is acute.",
          "\\(\\sec^2\\theta = 1 + \\dfrac{25}{144} = \\dfrac{169}{144}\\), so \\(\\cos\\theta = \\dfrac{12}{13}\\).",
          "\\(\\sin\\theta = \\tan\\theta\\cos\\theta = \\dfrac{5}{12} \\times \\dfrac{12}{13} = \\dfrac{5}{13}\\).",
        ],
        answer: "\\(\\dfrac{5}{13}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\operatorname{cosec}^2\\left(\\cot^{-1}2\\right)\\).", answer: "5" },
        { prompt: "Find \\(\\sec^2\\left(\\tan^{-1}3\\right)\\).", answer: "10" },
        { prompt: "Find \\(\\tan\\left(\\cos^{-1}\\left(-\\dfrac{3}{5}\\right)\\right)\\).", answer: "\\(-\\dfrac{4}{3}\\)", method: "The angle is obtuse: \\(\\sin\\theta = \\dfrac{4}{5}\\), \\(\\cos\\theta = -\\dfrac{3}{5}\\)." },
      ],
      pyqExampleId: "76584e0e-81f4-4b93-9089-1510a76d327e",
      traps: [
        {
          title: "Dropping the sign of an obtuse angle",
          body: "\\(\\cos^{-1}\\) of a negative number is obtuse, so its tangent is negative. A right-angled triangle drawn for it gives the size only; put the sign in from the branch.",
        },
        {
          title: "Squaring the identity the wrong way",
          body: "\\(\\tan^2\\theta = \\sec^2\\theta - 1\\), not \\(1 - \\sec^2\\theta\\). Check: a square cannot be negative.",
        },
      ],
    },
  ],
};
