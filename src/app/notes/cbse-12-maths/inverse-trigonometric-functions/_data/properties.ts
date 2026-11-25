import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IT_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Inverse Trigonometric Functions",
  title: "Simplest Forms, Proofs and Equations",
  oneLineDefinition:
    "Writing an inverse function of an expression in its simplest form by a substitution or a half-angle identity, proving that two inverse expressions are equal, and solving equations in inverse functions.",
  whyItMatters:
    "30 questions, seven of them from board papers from 2024 to 2026. The board asks you to write an expression in its simplest form: tan⁻¹(cos x/(1 − sin x)) (2024), sin⁻¹(x/√(1 + x²)) (2025) and three half-angle forms in 2026. It also asked you to simplify cos⁻¹x + cos⁻¹[x/2 + √(3 − 3x²)/2] (2024) and to solve 2 tan⁻¹x + sin⁻¹(2x/(1 + x²)) = 4√3 (2025). The textbook adds Examples 3 to 5, the proofs and simplest forms of Exercise 2.2 and the proofs and equations of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmit-substitution",
      name: "Simplest form by a substitution",
      intuition:
        "A square root such as \\(\\sqrt{1 - x^2}\\) or \\(\\sqrt{1 + x^2}\\) is a trigonometric identity in hiding. Put \\(x = \\sin\\theta\\) or \\(x = \\tan\\theta\\) and the root becomes a single ratio. Then the inverse function meets its own ratio, and it cancels if the angle lies in its branch.",
      definition:
        "- Choose the substitution from the root: \\(\\sqrt{1 - x^2}\\) or \\(\\sqrt{a^2 - x^2}\\): put \\(x = \\sin\\theta\\) (or \\(a\\sin\\theta\\)), or \\(x = \\cos\\theta\\). \\(\\sqrt{1 + x^2}\\): put \\(x = \\tan\\theta\\). \\(\\sqrt{x^2 - 1}\\): put \\(x = \\sec\\theta\\).\n" +
        "- Write \\(\\theta\\) as an inverse value, such as \\(\\theta = \\sin^{-1}x\\), and find the interval \\(\\theta\\) lies in from the given interval of \\(x\\).\n" +
        "- Simplify the expression to one ratio of \\(\\theta\\) (or of \\(2\\theta\\), \\(3\\theta\\)). Take the positive root only where the ratio is positive in that interval.\n" +
        "- Check that the angle lies in the branch of the outer inverse function, then cancel: \\(\\cos^{-1}(\\cos\\theta) = \\theta\\) for \\(\\theta\\) in \\([0, \\pi]\\).\n" +
        "- Write the answer back in \\(x\\).\n" +
        "- In a \"show that\" or \"prove\" question, write each of these steps on its own line, and state the interval of the angle before you cancel.",
      formula: {
        label: "Substitutions for the common roots",
        latex: "\\sqrt{1 - x^2}:\\ x = \\sin\\theta \\qquad \\sqrt{1 + x^2}:\\ x = \\tan\\theta \\qquad \\sqrt{x^2 - 1}:\\ x = \\sec\\theta",
      },
      authoredExample: {
        prompt: "Write \\(\\cos^{-1}\\sqrt{1 - x^2}\\), \\(0 \\le x \\le 1\\), in the simplest form.",
        steps: [
          "Let \\(x = \\sin\\theta\\). Then \\(\\theta = \\sin^{-1}x\\), and for \\(0 \\le x \\le 1\\), \\(\\theta\\) lies in \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\).",
          "\\(\\sqrt{1 - x^2} = \\sqrt{1 - \\sin^2\\theta} = \\sqrt{\\cos^2\\theta} = \\cos\\theta\\), since \\(\\cos\\theta \\ge 0\\) in \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\).",
          "So \\(\\cos^{-1}\\sqrt{1 - x^2} = \\cos^{-1}(\\cos\\theta)\\).",
          "\\(\\theta\\) lies in \\([0, \\pi]\\), the branch of \\(\\cos^{-1}\\), so \\(\\cos^{-1}(\\cos\\theta) = \\theta\\).",
          "\\(\\therefore \\cos^{-1}\\sqrt{1 - x^2} = \\theta = \\sin^{-1}x\\).",
        ],
        answer: "\\(\\sin^{-1}x\\)",
      },
      selfCheckExample: {
        prompt: "Show that \\(\\cos^{-1}(1 - 2x^2) = 2\\sin^{-1}x\\) for \\(0 \\le x \\le 1\\).",
        steps: [
          "Let \\(x = \\sin\\theta\\), so \\(\\theta = \\sin^{-1}x\\) and \\(\\theta\\) lies in \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\).",
          "\\(1 - 2x^2 = 1 - 2\\sin^2\\theta = \\cos 2\\theta\\).",
          "\\(2\\theta\\) lies in \\([0, \\pi]\\), the branch of \\(\\cos^{-1}\\), so \\(\\cos^{-1}(\\cos 2\\theta) = 2\\theta\\).",
          "\\(\\therefore \\cos^{-1}(1 - 2x^2) = 2\\theta = 2\\sin^{-1}x\\).",
        ],
        answer: "Shown: \\(\\cos^{-1}(1 - 2x^2) = 2\\sin^{-1}x\\)",
      },
      practiceSet: [
        { prompt: "Write \\(\\tan^{-1}\\dfrac{2x}{1 - x^2}\\), \\(-1 < x < 1\\), in the simplest form.", answer: "\\(2\\tan^{-1}x\\)", method: "\\(x = \\tan\\theta\\), \\(\\theta\\) in \\(\\left(-\\dfrac{\\pi}{4}, \\dfrac{\\pi}{4}\\right)\\), so \\(2\\theta\\) is in the branch." },
        { prompt: "Write \\(\\cot^{-1}\\dfrac{x}{\\sqrt{1 - x^2}}\\), \\(-1 < x < 1\\), in the simplest form.", answer: "\\(\\cos^{-1}x\\)", method: "\\(x = \\cos\\theta\\), \\(\\theta\\) in \\((0, \\pi)\\), so \\(\\sin\\theta > 0\\)." },
        { prompt: "Which substitution suits an expression containing \\(\\sqrt{a^2 + x^2}\\)?", answer: "\\(x = a\\tan\\theta\\)" },
      ],
      pyqExampleId: "d3b82527-6da5-4ab1-8e36-2bb566b10d1a",
      traps: [
        {
          title: "Cancelling without the interval",
          body: "\\(\\cos^{-1}(\\cos 2\\theta) = 2\\theta\\) holds only when \\(2\\theta\\) lies in \\([0, \\pi]\\). Find the interval of \\(\\theta\\) from the given interval of \\(x\\) and write it down; the marks for that step are lost otherwise.",
        },
        {
          title: "The root of a square",
          body: "\\(\\sqrt{\\cos^2\\theta} = |\\cos\\theta|\\). It equals \\(\\cos\\theta\\) only where \\(\\cos\\theta \\ge 0\\), so say why the ratio is positive in your interval.",
        },
        {
          title: "Leaving the answer in θ",
          body: "The question is in \\(x\\), so the answer must be in \\(x\\): write \\(\\theta = \\sin^{-1}x\\) at the end.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmit-half-angle",
      name: "Simplest form by a half-angle or tan(π/4 ± x) identity",
      intuition:
        "Some expressions are already ratios of \\(x\\), such as \\(\\dfrac{\\cos x}{1 - \\sin x}\\). Rewrite them with half angles, or divide through to make \\(\\dfrac{1 \\pm \\tan x}{1 \\mp \\tan x}\\), and they turn into one ratio of one angle. Then the inverse cancels, as long as that angle lies in the branch.",
      definition:
        "- Half-angle forms: \\(1 + \\cos x = 2\\cos^2\\dfrac{x}{2}\\), \\(1 - \\cos x = 2\\sin^2\\dfrac{x}{2}\\), \\(\\sin x = 2\\sin\\dfrac{x}{2}\\cos\\dfrac{x}{2}\\).\n" +
        "- \\(1 \\pm \\sin x = \\left(\\cos\\dfrac{x}{2} \\pm \\sin\\dfrac{x}{2}\\right)^2\\) and \\(\\cos x = \\left(\\cos\\dfrac{x}{2} - \\sin\\dfrac{x}{2}\\right)\\left(\\cos\\dfrac{x}{2} + \\sin\\dfrac{x}{2}\\right)\\).\n" +
        "- \\(\\dfrac{1 + \\tan x}{1 - \\tan x} = \\tan\\left(\\dfrac{\\pi}{4} + x\\right)\\) and \\(\\dfrac{1 - \\tan x}{1 + \\tan x} = \\tan\\left(\\dfrac{\\pi}{4} - x\\right)\\).\n" +
        "- \\(\\cot\\theta = \\tan\\left(\\dfrac{\\pi}{2} - \\theta\\right)\\) and \\(\\cos\\theta = \\sin\\left(\\dfrac{\\pi}{2} - \\theta\\right)\\) change the ratio to the one the inverse undoes.\n" +
        "- Last line: show the final angle lies in the branch for the given interval of \\(x\\), then cancel.",
      formula: {
        label: "The two tan(π/4 ± x) forms",
        latex: "\\frac{1 + \\tan x}{1 - \\tan x} = \\tan\\left(\\frac{\\pi}{4} + x\\right), \\qquad \\frac{1 - \\tan x}{1 + \\tan x} = \\tan\\left(\\frac{\\pi}{4} - x\\right)",
      },
      authoredExample: {
        prompt: "Write \\(\\tan^{-1}\\left(\\dfrac{1 + \\cos x}{\\sin x}\\right)\\), \\(0 < x < \\pi\\), in the simplest form.",
        steps: [
          "\\(1 + \\cos x = 2\\cos^2\\dfrac{x}{2}\\) and \\(\\sin x = 2\\sin\\dfrac{x}{2}\\cos\\dfrac{x}{2}\\).",
          "\\(\\dfrac{1 + \\cos x}{\\sin x} = \\dfrac{2\\cos^2\\frac{x}{2}}{2\\sin\\frac{x}{2}\\cos\\frac{x}{2}} = \\cot\\dfrac{x}{2} = \\tan\\left(\\dfrac{\\pi}{2} - \\dfrac{x}{2}\\right)\\).",
          "For \\(0 < x < \\pi\\), \\(\\dfrac{\\pi}{2} - \\dfrac{x}{2}\\) lies in \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\), inside the branch \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\).",
          "\\(\\therefore \\tan^{-1}\\left[\\tan\\left(\\dfrac{\\pi}{2} - \\dfrac{x}{2}\\right)\\right] = \\dfrac{\\pi}{2} - \\dfrac{x}{2}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{2} - \\dfrac{x}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Write \\(\\tan^{-1}\\left(\\dfrac{\\sin x}{1 + \\cos x}\\right)\\), \\(0 < x < \\pi\\), in the simplest form.",
        steps: [
          "\\(\\dfrac{\\sin x}{1 + \\cos x} = \\dfrac{2\\sin\\frac{x}{2}\\cos\\frac{x}{2}}{2\\cos^2\\frac{x}{2}} = \\tan\\dfrac{x}{2}\\).",
          "\\(\\dfrac{x}{2}\\) lies in \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\), inside the branch of \\(\\tan^{-1}\\).",
        ],
        answer: "\\(\\dfrac{x}{2}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(\\cos^{-1}\\sqrt{\\dfrac{1 + \\cos x}{2}}\\), \\(0 < x < \\pi\\), in the simplest form.", answer: "\\(\\dfrac{x}{2}\\)", method: "The root is \\(\\cos\\dfrac{x}{2}\\), positive here." },
        { prompt: "Write \\(1 - \\sin x\\) as a perfect square.", answer: "\\(\\left(\\cos\\dfrac{x}{2} - \\sin\\dfrac{x}{2}\\right)^2\\)" },
        { prompt: "Write \\(\\dfrac{1 + \\tan x}{1 - \\tan x}\\) as one ratio.", answer: "\\(\\tan\\left(\\dfrac{\\pi}{4} + x\\right)\\)" },
      ],
      pyqExampleId: "30d4507f-e1d3-48fc-91fc-3b700cac17f2",
      traps: [
        {
          title: "The interval changes the answer",
          body: "NCERT's Example 4 gives \\(\\tan^{-1}\\left(\\dfrac{\\cos x}{1 - \\sin x}\\right) = \\dfrac{\\pi}{4} + \\dfrac{x}{2}\\) because \\(-\\dfrac{3\\pi}{2} < x < \\dfrac{\\pi}{2}\\) keeps \\(\\dfrac{\\pi}{4} + \\dfrac{x}{2}\\) inside \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\). Always use the interval printed in your question to make this check.",
        },
        {
          title: "A root with no sign check",
          body: "\\(\\sqrt{2\\cos^2 x} = \\sqrt{2}\\,|\\cos x|\\). Use the given interval to say \\(\\cos x > 0\\) before you drop the modulus.",
        },
        {
          title: "Dividing by a ratio that can be zero",
          body: "Before dividing the top and bottom by \\(\\cos x\\), say why \\(\\cos x \\ne 0\\) in the given interval.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmit-sum-of-values",
      name: "Proving a sum of inverse values",
      intuition:
        "To prove \\(\\tan^{-1}\\dfrac{1}{2} + \\tan^{-1}\\dfrac{1}{3} = \\dfrac{\\pi}{4}\\), call the two angles \\(A\\) and \\(B\\). You know a ratio of each, so you can find a ratio of \\(A + B\\) with the Class 11 addition formulas. One more check finishes it: \\(A + B\\) must lie in the branch of the inverse on the right side.",
      definition:
        "- Let \\(A\\) and \\(B\\) be the two inverse values. Write the ratio you know for each, and the other ratios you need (from \\(\\sin^2 + \\cos^2 = 1\\)).\n" +
        "- Use \\(\\sin(A + B) = \\sin A\\cos B + \\cos A\\sin B\\), \\(\\cos(A + B) = \\cos A\\cos B - \\sin A\\sin B\\) or \\(\\tan(A + B) = \\dfrac{\\tan A + \\tan B}{1 - \\tan A\\tan B}\\), whichever matches the right side.\n" +
        "- For \\(2A\\): \\(\\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}\\).\n" +
        "- Show that \\(A + B\\) lies in the branch of the inverse on the right side, then write \\(A + B\\) as that inverse value.",
      formula: {
        label: "Tangent of a sum",
        latex: "\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A\\tan B}",
      },
      authoredExample: {
        prompt: "Prove that \\(\\tan^{-1}\\dfrac{1}{2} + \\tan^{-1}\\dfrac{1}{3} = \\dfrac{\\pi}{4}\\).",
        steps: [
          "Let \\(A = \\tan^{-1}\\dfrac{1}{2}\\) and \\(B = \\tan^{-1}\\dfrac{1}{3}\\). Then \\(\\tan A = \\dfrac{1}{2}\\), \\(\\tan B = \\dfrac{1}{3}\\).",
          "Both tangents are positive and less than 1, so \\(A\\) and \\(B\\) lie in \\(\\left(0, \\dfrac{\\pi}{4}\\right)\\) and \\(A + B\\) lies in \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\).",
          "\\(\\tan(A + B) = \\dfrac{\\frac{1}{2} + \\frac{1}{3}}{1 - \\frac{1}{2} \\times \\frac{1}{3}} = \\dfrac{\\frac{5}{6}}{\\frac{5}{6}} = 1\\).",
          "The only angle in \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\) with tangent 1 is \\(\\dfrac{\\pi}{4}\\), so \\(A + B = \\dfrac{\\pi}{4}\\).",
        ],
        answer: "Proved: \\(\\tan^{-1}\\dfrac{1}{2} + \\tan^{-1}\\dfrac{1}{3} = \\dfrac{\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Prove that \\(2\\tan^{-1}\\dfrac{1}{3} = \\tan^{-1}\\dfrac{3}{4}\\).",
        steps: [
          "Let \\(\\theta = \\tan^{-1}\\dfrac{1}{3}\\), so \\(\\tan\\theta = \\dfrac{1}{3}\\) and \\(\\theta\\) lies in \\(\\left(0, \\dfrac{\\pi}{4}\\right)\\).",
          "\\(\\tan 2\\theta = \\dfrac{2 \\times \\frac{1}{3}}{1 - \\frac{1}{9}} = \\dfrac{\\frac{2}{3}}{\\frac{8}{9}} = \\dfrac{3}{4}\\).",
          "\\(2\\theta\\) lies in \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\), inside the branch of \\(\\tan^{-1}\\), so \\(2\\theta = \\tan^{-1}\\dfrac{3}{4}\\).",
        ],
        answer: "Proved",
      },
      practiceSet: [
        { prompt: "Find \\(\\sin\\left(2\\cos^{-1}\\dfrac{3}{5}\\right)\\).", answer: "\\(\\dfrac{24}{25}\\)", method: "\\(2\\sin A\\cos A = 2 \\times \\dfrac{4}{5} \\times \\dfrac{3}{5}\\)" },
        { prompt: "Find \\(\\tan\\left(\\tan^{-1}2 + \\tan^{-1}3\\right)\\).", answer: "\\(-1\\)" },
        { prompt: "Find the value of \\(\\tan^{-1}2 + \\tan^{-1}3\\).", answer: "\\(\\dfrac{3\\pi}{4}\\)", method: "Both angles are between \\(\\dfrac{\\pi}{4}\\) and \\(\\dfrac{\\pi}{2}\\), so the sum lies in \\(\\left(\\dfrac{\\pi}{2}, \\pi\\right)\\), where the tangent is \\(-1\\) at \\(\\dfrac{3\\pi}{4}\\)." },
      ],
      pyqExampleId: "4356482b-2349-4b84-8a3f-c7b03091dbb9",
      traps: [
        {
          title: "Skipping the branch check",
          body: "\\(\\tan(\\tan^{-1}2 + \\tan^{-1}3) = -1\\), but the sum is \\(\\dfrac{3\\pi}{4}\\), not \\(-\\dfrac{\\pi}{4}\\). Knowing the ratio of \\(A + B\\) is not enough: say where \\(A + B\\) lies.",
        },
        {
          title: "A wrong sign for the second ratio",
          body: "For \\(A = \\sin^{-1}\\dfrac{3}{5}\\), \\(A\\) is acute, so \\(\\cos A = +\\dfrac{4}{5}\\). For \\(\\cos^{-1}\\) of a negative number the angle is obtuse and its tangent is negative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmit-equations",
      name: "Equations in inverse functions, and identities the present book does not list",
      intuition:
        "To solve an equation in inverse functions, turn it into an ordinary equation: take the same ratio of both sides, or put each inverse value equal to an angle. Then go back and test every root, because the branches can rule a root out.",
      definition:
        "- Take the tangent (or sine, cosine) of both sides, or write \\(A = \\tan^{-1}(\\ldots)\\) and use the addition formulas. Solve the ordinary equation.\n" +
        "- **Check every root in the given equation.** A root can fail because an angle falls outside its branch or the two sides have different signs.\n" +
        "- An equation can have **no solution** because of the branches: \\(\\tan^{-1}x\\) lies strictly between \\(-\\dfrac{\\pi}{2}\\) and \\(\\dfrac{\\pi}{2}\\), so \\(\\tan^{-1}x = 2\\) has no solution. Compare the largest possible value of each side.\n" +
        "- **Not in the present NCERT book.** The book no longer lists the identities below, but its own Exercise 2.2 (Q9) and Miscellaneous Exercise (Q11, Q12) use them, Board 2023 used the first in an assertion and Board 2025 set an equation built on the second. Learn them with their short proofs, and give them less time than the branches.\n" +
        "- \\(\\sin^{-1}x + \\cos^{-1}x = \\dfrac{\\pi}{2}\\) for \\(x\\) in \\([-1, 1]\\). Proof: let \\(\\sin^{-1}x = \\theta\\); then \\(x = \\sin\\theta = \\cos\\left(\\dfrac{\\pi}{2} - \\theta\\right)\\), and \\(\\dfrac{\\pi}{2} - \\theta\\) lies in \\([0, \\pi]\\), so \\(\\cos^{-1}x = \\dfrac{\\pi}{2} - \\theta\\).\n" +
        "- \\(2\\tan^{-1}x = \\sin^{-1}\\dfrac{2x}{1 + x^2}\\) for \\(|x| \\le 1\\), and \\(2\\tan^{-1}x = \\cos^{-1}\\dfrac{1 - x^2}{1 + x^2}\\) for \\(x \\ge 0\\). Proof: put \\(x = \\tan\\theta\\); the two fractions are \\(\\sin 2\\theta\\) and \\(\\cos 2\\theta\\).\n" +
        "- \\(\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\dfrac{x + y}{1 - xy}\\) when \\(xy < 1\\). Proof: the tangent of a sum, as in the concept above.",
      formula: {
        label: "Sum of sin⁻¹x and cos⁻¹x",
        latex: "\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}, \\quad x \\in [-1, 1]",
      },
      authoredExample: {
        prompt: "Solve \\(\\tan^{-1}2x + \\tan^{-1}3x = \\dfrac{\\pi}{4}\\).",
        steps: [
          "Let \\(A = \\tan^{-1}2x\\) and \\(B = \\tan^{-1}3x\\), so \\(A + B = \\dfrac{\\pi}{4}\\) and \\(\\tan(A + B) = 1\\).",
          "\\(\\dfrac{2x + 3x}{1 - 6x^2} = 1\\), so \\(5x = 1 - 6x^2\\).",
          "\\(6x^2 + 5x - 1 = 0\\), that is \\((6x - 1)(x + 1) = 0\\), so \\(x = \\dfrac{1}{6}\\) or \\(x = -1\\).",
          "Check \\(x = -1\\): \\(\\tan^{-1}(-2)\\) and \\(\\tan^{-1}(-3)\\) are both negative, so their sum cannot be \\(\\dfrac{\\pi}{4}\\). Reject it.",
          "Check \\(x = \\dfrac{1}{6}\\): the left side is \\(\\tan^{-1}\\dfrac{1}{3} + \\tan^{-1}\\dfrac{1}{2}\\), a sum in \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\) with tangent 1, which is \\(\\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(x = \\dfrac{1}{6}\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\cos^{-1}x - \\sin^{-1}x = \\dfrac{\\pi}{6}\\).",
        steps: [
          "\\(\\cos^{-1}x = \\dfrac{\\pi}{2} - \\sin^{-1}x\\), so the equation is \\(\\dfrac{\\pi}{2} - 2\\sin^{-1}x = \\dfrac{\\pi}{6}\\).",
          "\\(2\\sin^{-1}x = \\dfrac{\\pi}{3}\\), so \\(\\sin^{-1}x = \\dfrac{\\pi}{6}\\) and \\(x = \\dfrac{1}{2}\\).",
          "Check: \\(\\cos^{-1}\\dfrac{1}{2} - \\sin^{-1}\\dfrac{1}{2} = \\dfrac{\\pi}{3} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{6}\\).",
        ],
        answer: "\\(x = \\dfrac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "Explain why \\(\\tan^{-1}x = 2\\) has no solution.", answer: "\\(\\tan^{-1}x\\) is always less than \\(\\dfrac{\\pi}{2}\\), which is about 1.57, so it can never equal 2" },
        { prompt: "Find the value of \\(\\sin^{-1}\\dfrac{2}{3} + \\cos^{-1}\\dfrac{2}{3}\\).", answer: "\\(\\dfrac{\\pi}{2}\\)" },
        { prompt: "Solve \\(\\sin^{-1}x = 2\\sin^{-1}\\dfrac{1}{2}\\).", answer: "\\(x = \\dfrac{\\sqrt{3}}{2}\\)", method: "\\(\\sin^{-1}x = \\dfrac{\\pi}{3}\\)" },
      ],
      pyqExampleId: "d2370b99-1b5c-402b-8978-a77077e21368",
      traps: [
        {
          title: "Keeping a root without checking it",
          body: "Taking the tangent of both sides can bring in a root that does not satisfy the equation, as \\(x = -1\\) does above. Test every root in the given equation and say which one you reject and why.",
        },
        {
          title: "Using 2 tan⁻¹ x = sin⁻¹(2x/(1 + x²)) for every x",
          body: "It holds only for \\(|x| \\le 1\\). For \\(x > 1\\), \\(\\sin^{-1}\\dfrac{2x}{1 + x^2} = \\pi - 2\\tan^{-1}x\\).",
        },
        {
          title: "The tan⁻¹ addition rule when xy > 1",
          body: "\\(\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\dfrac{x + y}{1 - xy}\\) needs \\(xy < 1\\). For \\(x = 2\\), \\(y = 3\\) it would give \\(-\\dfrac{\\pi}{4}\\), but the true sum is \\(\\dfrac{3\\pi}{4}\\).",
        },
      ],
    },
  ],
};
