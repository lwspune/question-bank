import type { SubtopicNote } from "@/app/notes/_types";

export const INVERSE_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Inverse Trigonometric Equations",
  title: "Inverse Trigonometric Equations — Solve, Then Check Every Root",
  oneLineDefinition:
    "An equation in inverse trigonometric functions is solved by combining terms with a complementary pair or the addition formula, or by converting both sides to one ratio, and every root found must then be checked against the domains and principal ranges it passed through.",
  whyItMatters:
    "29 PYQs. Twelve combine two or three arctangents with the addition formula, nine convert both sides to one function or substitute x = tan θ, and eight use a complementary pair. " +
    "The algebra is short. The HARD rows are the ones where a root the algebra produced must be thrown out — a negative root when x ≥ 0, a root that makes xy > 1, a root outside a domain — and the answer is a COUNT of roots.",
  concepts: [
    // 1 — complementary pairs
    {
      kind: "formula" as const,
      slug: "cettf-inverse-equations-complementary",
      name: "Equations Solved by a Complementary Pair",
      intuition:
        "When an equation mixes \\(\\sin^{-1}x\\) with \\(\\cos^{-1}x\\) (or \\(\\tan^{-1}\\) with \\(\\cot^{-1}\\)) of the SAME argument, replace one by \\(\\frac{\\pi}{2}\\) minus the other. The equation becomes linear, or quadratic, in a single inverse value.",
      definition:
        "- Replace \\(\\cos^{-1}x\\) by \\(\\frac{\\pi}{2} - \\sin^{-1}x\\): \\(4\\sin^{-1}x + \\cos^{-1}x = \\pi\\) becomes \\(3\\sin^{-1}x = \\frac{\\pi}{2}\\).\n" +
        "- \\(\\sin^{-1}\\frac{x}{13} + \\csc^{-1}\\frac{13}{12} = \\frac{\\pi}{2}\\): \\(\\csc^{-1}\\frac{13}{12} = \\sin^{-1}\\frac{12}{13}\\), so \\(\\sin^{-1}\\frac{x}{13} = \\cos^{-1}\\frac{12}{13} = \\sin^{-1}\\frac{5}{13}\\).\n" +
        "- **Squares**: with \\(t = \\tan^{-1}x\\), \\((\\tan^{-1}x)^2 + (\\cot^{-1}x)^2 = k\\) is \\(t^2 + \\left(\\frac{\\pi}{2} - t\\right)^2 = k\\), a quadratic in \\(t\\). Keep only roots in \\(\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\).\n" +
        "- \\(\\tan^{-1}(1 + x) + \\tan^{-1}(1 - x) = \\frac{\\pi}{2}\\) says the two are complementary, so \\((1 + x)(1 - x) = 1\\).",
      formula: {
        label: "Replace one of the pair",
        latex: "\\cos^{-1}x=\\frac{\\pi}{2}-\\sin^{-1}x \\qquad \\cot^{-1}x=\\frac{\\pi}{2}-\\tan^{-1}x",
      },
      authoredExample: {
        prompt: "Solve \\(2\\sin^{-1}x + 3\\cos^{-1}x = \\frac{4\\pi}{3}\\).",
        steps: [
          "\\(3\\cos^{-1}x = 3\\left(\\frac{\\pi}{2} - \\sin^{-1}x\\right)\\), so \\(\\frac{3\\pi}{2} - \\sin^{-1}x = \\frac{4\\pi}{3}\\).",
          "\\(\\sin^{-1}x = \\frac{\\pi}{6}\\).",
        ],
        answer: "\\(x = \\dfrac12\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin^{-1}\\frac{x}{5} + \\csc^{-1}\\frac54 = \\frac{\\pi}{2}\\), find \\(x\\).",
        steps: ["\\(\\csc^{-1}\\frac54 = \\sin^{-1}\\frac45\\), so \\(\\sin^{-1}\\frac{x}{5} = \\cos^{-1}\\frac45 = \\sin^{-1}\\frac35\\)."],
        answer: "3",
      },
      practiceSet: [
        { prompt: "If \\(\\sin\\left(\\sin^{-1}\\frac15 + \\cos^{-1}x\\right) = 1\\), find \\(x\\).", answer: "\\(\\frac15\\)" },
      ],
      pyqExampleId: "f55a88d5-0f13-4086-8358-a5fbff433419",
      traps: [
        {
          title: "Keeping the root outside the range",
          body: "\\(2t^2 - \\pi t - \\frac{3\\pi^2}{8} = 0\\) gives \\(t = -\\frac{\\pi}{4}\\) or \\(\\frac{3\\pi}{4}\\), but \\(t = \\tan^{-1}x\\) lies in \\(\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\). Only \\(-\\frac{\\pi}{4}\\) is allowed, so \\(x = -1\\).",
        },
      ],
    },

    // 2 — addition formula
    {
      kind: "formula" as const,
      slug: "cettf-inverse-equations-addition",
      name: "Equations Solved by the Addition Formula — and the Roots It Adds",
      intuition:
        "Combine the inverse tangents on one side into a single \\(\\tan^{-1}\\), take the tangent of both sides, and solve the algebraic equation. The formula was only valid while \\(xy < 1\\), so substitute every root back; the questions that ask how many elements a solution set has are testing exactly this check.",
      definition:
        "- \\(\\tan^{-1}ax + \\tan^{-1}bx = \\frac{\\pi}{4}\\) gives \\(\\dfrac{(a + b)x}{1 - abx^2} = 1\\), a quadratic. With \\(x \\ge 0\\) required, only the positive root counts — so the set is a SINGLETON even though the quadratic has two roots.\n" +
        "- Three terms: combine two first, then the third. \\(\\tan^{-1}(x + 1) + \\tan^{-1}(x - 1) + \\tan^{-1}x = \\tan^{-1}3\\) reduces to a cubic; use the stated condition (\\(x < 0\\)) to pick the root.\n" +
        "- \\(\\tan^{-1}\\frac{1 - x}{1 + x} = \\frac{\\pi}{4} - \\tan^{-1}x\\) (for \\(x > -1\\)): the equation \\(\\tan^{-1}\\frac{1 - x}{1 + x} = \\frac12\\tan^{-1}x\\) becomes \\(\\tan^{-1}x = \\frac{\\pi}{6}\\).\n" +
        "- **Sine forms**: \\(\\sin^{-1}\\frac13 + \\sin^{-1}\\frac35 + \\sin^{-1}x = \\frac{\\pi}{2}\\) means \\(x = \\cos\\left(\\sin^{-1}\\frac13 + \\sin^{-1}\\frac35\\right)\\), a compound-angle expansion.\n" +
        "- **Counting solutions**: an equation \\(\\frac{P}{Q} = P\\) has roots from \\(P = 0\\) AND from \\(Q = 1\\); check each for existence.",
      formula: {
        label: "Combine, then take tangents",
        latex: "\\tan^{-1}u+\\tan^{-1}v=\\theta \\;\\Rightarrow\\; \\frac{u+v}{1-uv}=\\tan\\theta\\quad(\\text{then check }uv<1)",
      },
      authoredExample: {
        prompt: "How many non-negative solutions does \\(\\tan^{-1}x + \\tan^{-1}2x = \\frac{\\pi}{4}\\) have?",
        steps: [
          "\\(\\dfrac{3x}{1 - 2x^2} = 1 \\Rightarrow 2x^2 + 3x - 1 = 0\\).",
          "\\(x = \\dfrac{-3 \\pm \\sqrt{17}}{4}\\): one positive root (about 0.28), one negative.",
          "Check the positive root: \\(2x^2 \\approx 0.16 < 1\\), so the formula applied.",
        ],
        answer: "1 — a singleton set",
      },
      selfCheckExample: {
        prompt: "If \\(\\tan^{-1}(x + 3) + \\tan^{-1}(x - 3) = \\tan^{-1}\\frac34\\), find \\(x\\).",
        steps: [
          "\\(\\dfrac{2x}{1 - (x^2 - 9)} = \\dfrac{2x}{10 - x^2} = \\frac34\\), so \\(3x^2 + 8x - 30 = 0\\) and \\(x = \\dfrac{-4 \\pm \\sqrt{106}}{3}\\).",
          "Check \\(uv = x^2 - 9 < 1\\): the positive root (about 2.1) passes; the negative one (about \\(-4.8\\)) does not.",
        ],
        answer: "\\(x = \\dfrac{-4 + \\sqrt{106}}{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\tan^{-1}\\frac14 + \\tan^{-1}\\frac29 = \\frac12\\cos^{-1}x\\). Find \\(x\\).", answer: "\\(\\frac35\\)", method: "The left side is \\(\\tan^{-1}\\frac12\\); \\(\\cos(2\\tan^{-1}\\frac12) = \\frac{1 - 1/4}{1 + 1/4}\\)." },
        { prompt: "Positive integral solutions of \\(\\tan^{-1}x + \\cot^{-1}y = \\tan^{-1}3\\)?", answer: "2 — \\((1, 2)\\) and \\((2, 7)\\)", method: "\\(y = \\frac{1 + 3x}{3 - x}\\)." },
      ],
      pyqExampleId: "5cd90862-d417-434a-963e-7a59b3180b24",
      traps: [
        {
          title: "Answering with the number of roots of the quadratic",
          body: "\\(6x^2 + 5x - 1 = 0\\) has two roots, \\(\\frac16\\) and \\(-1\\), but the set was defined with \\(x \\ge 0\\). 'Contains two elements' is the planted option; the set is a singleton.",
        },
      ],
    },

    // 3 — converting both sides / substitution / domains
    {
      kind: "formula" as const,
      slug: "cettf-inverse-equations-conversion",
      name: "Converting Both Sides to One Function, Substituting, and Checking the Domain",
      intuition:
        "When the two sides use different functions — \\(\\sin(\\cot^{-1}x)\\) against \\(\\cos(\\tan^{-1}(1 + x))\\) — convert each to an algebraic expression with a right triangle and equate. When the arguments are \\(\\frac{2x}{1 + x^2}\\) and its relatives, substitute \\(x = \\tan\\theta\\). Either way, the final step is to check the domain the square roots and inverse functions impose.",
      definition:
        "- \\(\\sin(\\cot^{-1}u) = \\cos(\\tan^{-1}u) = \\dfrac{1}{\\sqrt{1 + u^2}}\\), so \\(\\sin(\\cot^{-1}x) = \\cos(\\tan^{-1}(1 + x))\\) gives \\(1 + x^2 = 1 + (1 + x)^2\\), \\(x = -\\frac12\\).\n" +
        "- **Substitute \\(x = \\tan\\theta\\)**: \\(\\sin^{-1}\\frac{2x}{1 + x^2} = 2\\theta\\), \\(\\cos^{-1}\\frac{1 - x^2}{1 + x^2} = 2\\theta\\), \\(\\tan^{-1}\\frac{2x}{1 - x^2} = 2\\theta\\) (for \\(|x| < 1\\)), which turns a three-term equation into one in \\(\\theta\\).\n" +
        "- **Domain first**: \\(\\tan^{-1}\\sqrt{x(x + 1)} + \\sin^{-1}\\sqrt{x^2 + x + 1} = \\frac{\\pi}{2}\\) needs \\(x(x + 1) \\ge 0\\) and \\(x^2 + x + 1 \\le 1\\). Together they force \\(x(x + 1) = 0\\): two solutions, \\(0\\) and \\(-1\\).\n" +
        "- **Complementary square roots**: \\(\\cos^{-1}\\sqrt{p} + \\cos^{-1}\\sqrt{1 - p} = \\frac{\\pi}{2}\\) for \\(0 \\le p \\le 1\\).\n" +
        "- **Squaring** can admit a root with the wrong sign: substitute back. In \\(\\sin^{-1}4x + \\sin^{-1}4\\sqrt3 x = -\\frac{\\pi}{2}\\), squaring gives \\(x = \\pm\\frac18\\), but only \\(-\\frac18\\) satisfies the original.",
      formula: {
        label: "Two conversions and a substitution",
        latex: "\\sin(\\cot^{-1}u)=\\cos(\\tan^{-1}u)=\\frac{1}{\\sqrt{1+u^2}} \\qquad x=\\tan\\theta:\\ \\sin^{-1}\\frac{2x}{1+x^2}=2\\theta\\ (|x|\\le1)",
      },
      authoredExample: {
        prompt: "Solve \\(\\cos(\\tan^{-1}x) = \\sin(\\cot^{-1}(x - 2))\\).",
        steps: [
          "Both sides are \\(\\frac{1}{\\sqrt{1 + u^2}}\\): \\(1 + x^2 = 1 + (x - 2)^2\\).",
          "\\(x^2 = x^2 - 4x + 4\\), so \\(x = 1\\).",
        ],
        answer: "\\(x = 1\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sin^{-1}\\dfrac{2x}{1 + x^2} + \\cos^{-1}\\dfrac{1 - x^2}{1 + x^2} = \\dfrac{2\\pi}{3}\\) for \\(0 \\le x \\le 1\\).",
        steps: [
          "With \\(x = \\tan\\theta\\), \\(0 \\le \\theta \\le \\frac{\\pi}{4}\\): the left side is \\(2\\theta + 2\\theta = 4\\theta\\).",
          "\\(4\\theta = \\frac{2\\pi}{3}\\), \\(\\theta = \\frac{\\pi}{6}\\).",
        ],
        answer: "\\(x = \\dfrac{1}{\\sqrt3}\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(\\sin^{-1}(1 - x) - 2\\sin^{-1}x = \\frac{\\pi}{2}\\).", answer: "\\(x = 0\\)", method: "The algebra also produces \\(x = \\frac12\\); substituting it gives \\(-\\frac{\\pi}{6}\\), so reject it." },
      ],
      pyqExampleId: "b324e89a-053c-403a-822f-3408bf06456e",
      traps: [
        {
          title: "Reporting both signs after squaring",
          body: "Squaring \\(\\sin^{-1}4x + \\sin^{-1}4\\sqrt3 x = -\\frac{\\pi}{2}\\) gives \\(x = \\pm\\frac18\\), but \\(x = \\frac18\\) makes the left side \\(+\\frac{\\pi}{2}\\). Substitute each candidate. (The paper's options are all written with \\(\\pm\\), and its key is \\(\\pm\\frac18\\).)",
        },
      ],
    },
  ],
  related: [
    { label: "Inverse trigonometric identities", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-inverse-identities" },
    { label: "Trigonometric equations", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-equations" },
  ],
};
