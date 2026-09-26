import type { SubtopicNote } from "@/app/notes/_types";

export const TRIG_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Equations and General Solutions",
  title: "Trigonometric Equations — General Solutions, Counting Roots and a cos x + b sin x",
  oneLineDefinition:
    "A trigonometric equation is solved by reducing it to one ratio equal to one value, writing the general solution from three fixed patterns, and then keeping only the roots the stated interval and the original equation allow.",
  whyItMatters:
    "47 PYQs, 36% HARD. The paper asks the same five things in rotation: a general or principal solution, a quadratic in one ratio with a root to reject, a cos x + b sin x = c, an equation solved by factorising a sum of sines, and a range argument that shows an equation has no solution or counts its roots. " +
    "The marks are lost in the last step — keeping a root where the original equation is undefined, or counting over the wrong interval — so every concept here ends with a check.",
  concepts: [
    // 1 — the three general-solution patterns
    {
      kind: "formula" as const,
      slug: "cettf-general-solutions",
      name: "General and Principal Solutions of sin θ = k, cos θ = k, tan θ = k",
      intuition:
        "A trigonometric ratio repeats, so an equation like \\(\\sin\\theta = \\frac12\\) has infinitely many solutions. Find ONE angle that works (the principal value \\(\\alpha\\)), then add the repeat: tangent repeats every \\(\\pi\\), cosine is symmetric about 0, and sine is symmetric about \\(\\frac{\\pi}{2}\\), which is where the \\((-1)^n\\) comes from.",
      definition:
        "- \\(\\sin\\theta = \\sin\\alpha \\Rightarrow \\theta = n\\pi + (-1)^n\\alpha\\).\n" +
        "- \\(\\cos\\theta = \\cos\\alpha \\Rightarrow \\theta = 2n\\pi \\pm \\alpha\\).\n" +
        "- \\(\\tan\\theta = \\tan\\alpha \\Rightarrow \\theta = n\\pi + \\alpha\\), with \\(n \\in \\mathbb{Z}\\) throughout.\n" +
        "- **Principal solutions** are the values in \\([0, 2\\pi)\\). Find the reference angle, then place it by the quadrant signs: for \\(\\cos x = -\\frac{\\sqrt3}{2}\\), the reference angle is \\(\\frac{\\pi}{6}\\) and cosine is negative in quadrants II and III, giving \\(\\frac{5\\pi}{6}\\) and \\(\\frac{7\\pi}{6}\\).\n" +
        "- **Two conditions at once** (for example \\(\\sin\\theta < 0\\) and \\(\\tan\\theta > 0\\)) fix the quadrant; take the one angle that satisfies both.\n" +
        "- **Convert first**: \\(\\cot\\theta = \\tan\\left(\\frac{\\pi}{2} - \\theta\\right)\\), \\(\\cos x = \\sin\\left(\\frac{\\pi}{2} - x\\right)\\), and \\(\\dfrac{\\tan x - 1}{\\tan x + 1} = \\tan\\left(x - \\frac{\\pi}{4}\\right)\\). An equation between two different ratios becomes one pattern after this.",
      formula: {
        label: "The three general-solution patterns",
        latex:
          "\\sin\\theta=\\sin\\alpha \\Rightarrow \\theta=n\\pi+(-1)^n\\alpha \\qquad \\cos\\theta=\\cos\\alpha \\Rightarrow \\theta=2n\\pi\\pm\\alpha \\qquad \\tan\\theta=\\tan\\alpha \\Rightarrow \\theta=n\\pi+\\alpha",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "any one solution — usually the principal value" },
          { symbol: "n", meaning: "any integer" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(\\tan 2\\theta = \\cot\\theta\\).",
        steps: [
          "Write the right side as a tangent: \\(\\cot\\theta = \\tan\\left(\\frac{\\pi}{2} - \\theta\\right)\\).",
          "Tangent pattern: \\(2\\theta = n\\pi + \\frac{\\pi}{2} - \\theta\\).",
          "So \\(3\\theta = n\\pi + \\frac{\\pi}{2}\\), \\(\\theta = \\frac{(2n+1)\\pi}{6}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{(2n+1)\\pi}{6},\\ n \\in \\mathbb{Z}\\)",
      },
      selfCheckExample: {
        prompt: "Find the principal solutions of \\(2\\sin x + \\sqrt3 = 0\\).",
        steps: [
          "\\(\\sin x = -\\frac{\\sqrt3}{2}\\); the reference angle is \\(\\frac{\\pi}{3}\\).",
          "Sine is negative in quadrants III and IV: \\(\\pi + \\frac{\\pi}{3}\\) and \\(2\\pi - \\frac{\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{4\\pi}{3},\\ \\dfrac{5\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "General solution of \\(\\cos\\theta = \\frac12\\)?", answer: "\\(2n\\pi \\pm \\frac{\\pi}{3}\\)" },
        { prompt: "General solution of \\(\\sin 2x = \\frac{\\sqrt3}{2}\\)?", answer: "\\(x = \\frac{n\\pi}{2} + (-1)^n\\frac{\\pi}{6}\\)", method: "Solve for \\(2x\\), then halve." },
        { prompt: "The angle in \\([0, 2\\pi)\\) with \\(\\cos\\theta = -\\frac12\\) and \\(\\sin\\theta < 0\\)?", answer: "\\(\\frac{4\\pi}{3}\\)" },
      ],
      pyqExampleId: "24b76023-4284-4d0a-9878-f35a30fb15c5",
      traps: [
        {
          title: "Using the sine pattern for cosine",
          body: "The \\((-1)^n\\) belongs to SINE only. \\(\\cos\\theta = \\cos\\alpha\\) gives \\(2n\\pi \\pm \\alpha\\); \\(\\tan\\) gives \\(n\\pi + \\alpha\\). The options always include the wrong pattern for the right \\(\\alpha\\).",
        },
      ],
    },

    // 2 — quadratics in one ratio, rejecting roots
    {
      kind: "formula" as const,
      slug: "cettf-quadratic-in-one-ratio",
      name: "Equations That Reduce to a Quadratic in One Ratio — and the Roots to Reject",
      intuition:
        "Use \\(\\sin^2 + \\cos^2 = 1\\) to rewrite everything in one ratio; the equation becomes an ordinary quadratic. Then two checks remove wrong answers: a root outside \\([-1, 1]\\) for sine or cosine is impossible, and a root where the ORIGINAL equation divides by zero is not a solution even though the algebra produced it.",
      definition:
        "- Replace \\(\\cos^2 x\\) by \\(1 - \\sin^2 x\\) (or the reverse) so only one ratio remains; factorise.\n" +
        "- **Reject** \\(\\sin x\\) or \\(\\cos x\\) values outside \\([-1, 1]\\): \\(3\\sin^2 x - 7\\sin x + 2 = 0\\) gives \\(\\sin x = \\frac13\\) or \\(2\\), and only \\(\\frac13\\) survives.\n" +
        "- **Reject roots where the equation is undefined.** \\(\\tan x + \\sec x = 2\\cos x\\) becomes \\(2\\sin^2 x + \\sin x - 1 = 0\\), so \\(\\sin x = \\frac12\\) or \\(-1\\); but \\(\\sin x = -1\\) means \\(\\cos x = 0\\), where \\(\\tan x\\) and \\(\\sec x\\) do not exist. Only \\(\\frac{\\pi}{6}\\) and \\(\\frac{5\\pi}{6}\\) remain.\n" +
        "- **Counting in an interval**: \\(\\sin x = k\\) with \\(0 < k < 1\\) has two roots per full turn, both in the half-turns where sine is positive. In \\((0, 5\\pi)\\) those half-turns are \\((0, \\pi)\\), \\((2\\pi, 3\\pi)\\), \\((4\\pi, 5\\pi)\\): six roots.",
      formula: {
        label: "Reduce, then check",
        latex: "\\cos^2 x = 1-\\sin^2 x \\qquad -1 \\le \\sin x,\\ \\cos x \\le 1 \\qquad \\tan x,\\ \\sec x \\text{ need } \\cos x \\ne 0",
      },
      authoredExample: {
        prompt: "Solve \\(2\\cos^2 x + 3\\sin x = 3\\) in \\([0, 2\\pi]\\).",
        steps: [
          "\\(2(1 - \\sin^2 x) + 3\\sin x - 3 = 0 \\Rightarrow 2\\sin^2 x - 3\\sin x + 1 = 0\\).",
          "\\((2\\sin x - 1)(\\sin x - 1) = 0\\), so \\(\\sin x = \\frac12\\) or \\(1\\) — both allowed.",
          "\\(\\sin x = \\frac12\\): \\(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\). \\(\\sin x = 1\\): \\(\\frac{\\pi}{2}\\).",
        ],
        answer: "\\(\\left\\{\\dfrac{\\pi}{6}, \\dfrac{\\pi}{2}, \\dfrac{5\\pi}{6}\\right\\}\\)",
      },
      selfCheckExample: {
        prompt: "How many solutions does \\(\\tan x + \\sec x = \\sqrt3\\) have in \\([0, 2\\pi]\\)?",
        steps: [
          "Multiply by \\(\\cos x\\): \\(\\sin x + 1 = \\sqrt3\\cos x\\), i.e. \\(\\sqrt3\\cos x - \\sin x = 1\\), i.e. \\(\\cos\\left(x + \\frac{\\pi}{6}\\right) = \\frac12\\).",
          "So \\(x = \\frac{\\pi}{6}\\) or \\(x = \\frac{3\\pi}{2}\\).",
          "At \\(\\frac{3\\pi}{2}\\), \\(\\cos x = 0\\) and the original equation is undefined: reject it.",
        ],
        answer: "1 (\\(x = \\frac{\\pi}{6}\\))",
      },
      practiceSet: [
        { prompt: "Solutions of \\(8\\cos^2\\theta + 14\\cos\\theta + 5 = 0\\) in \\([0, 2\\pi]\\)?", answer: "\\(\\frac{2\\pi}{3}, \\frac{4\\pi}{3}\\)", method: "\\((2\\cos\\theta + 1)(4\\cos\\theta + 5) = 0\\); reject \\(-\\frac54\\)." },
        { prompt: "Number of solutions of \\(2\\sin^2 x + 5\\sin x - 3 = 0\\) in \\([0, 3\\pi]\\)?", answer: "4", method: "\\(\\sin x = \\frac12\\), two roots in each of \\([0,\\pi]\\) and \\([2\\pi, 3\\pi]\\)." },
      ],
      pyqExampleId: "fe23e2a3-6e84-458e-b7fd-b9e7141ce943",
      traps: [
        {
          title: "Counting the root the equation cannot hold",
          body: "When the equation contains \\(\\tan\\), \\(\\sec\\), \\(\\cot\\) or \\(\\csc\\), clearing denominators can create a root where one of them is undefined. The option that counts it (3 instead of 2 for \\(\\tan x + \\sec x = 2\\cos x\\)) is always there.",
        },
      ],
    },

    // 3 — a cos x + b sin x = c
    {
      kind: "formula" as const,
      slug: "cettf-a-cos-plus-b-sin",
      name: "a cos x + b sin x = c — the R Form, When a Solution Exists, and Roots as a Pair",
      intuition:
        "\\(a\\cos x + b\\sin x\\) is a single wave in disguise: it equals \\(R\\cos(x - \\phi)\\) with \\(R = \\sqrt{a^2 + b^2}\\). So it can never exceed \\(R\\) in size, which answers every 'for which k does a solution exist' question, and once written as one cosine it solves by the ordinary pattern.",
      definition:
        "- \\(a\\cos x + b\\sin x = R\\cos(x - \\phi)\\) where \\(R = \\sqrt{a^2 + b^2}\\), \\(\\cos\\phi = \\frac{a}{R}\\), \\(\\sin\\phi = \\frac{b}{R}\\).\n" +
        "- **Existence**: \\(a\\cos x + b\\sin x = c\\) has a solution exactly when \\(|c| \\le \\sqrt{a^2 + b^2}\\). The range of \\(a\\cos x + b\\sin x\\) is \\([-R, R]\\).\n" +
        "- **Divide by \\(R\\)** to solve: \\(\\sin x + \\cos x = 1 \\Rightarrow \\cos\\left(x - \\frac{\\pi}{4}\\right) = \\frac{1}{\\sqrt2}\\), so \\(x = 2n\\pi\\) or \\(2n\\pi + \\frac{\\pi}{2}\\).\n" +
        "- **Roots as a pair**: with \\(t = \\tan x\\), \\(\\cos 2x = \\frac{1 - t^2}{1 + t^2}\\) and \\(\\sin 2x = \\frac{2t}{1 + t^2}\\) turn \\(a\\cos 2x + b\\sin 2x = c\\) into a quadratic in \\(t\\). Its roots are \\(\\tan\\alpha, \\tan\\beta\\), so Vieta gives \\(\\tan\\alpha + \\tan\\beta\\) and \\(\\tan\\alpha\\tan\\beta\\), and \\(\\tan(\\alpha + \\beta)\\) follows from the compound-angle formula.",
      formula: {
        label: "The R form and the existence condition",
        latex: "a\\cos x+b\\sin x=\\sqrt{a^2+b^2}\\,\\cos(x-\\phi) \\qquad \\text{solvable} \\iff |c|\\le\\sqrt{a^2+b^2}",
        symbols: [
          { symbol: "\\(\\phi\\)", meaning: "the angle with \\(\\cos\\phi = a/R\\), \\(\\sin\\phi = b/R\\)" },
        ],
      },
      authoredExample: {
        prompt: "For how many integers \\(k\\) does \\(3\\cos x + 4\\sin x = k - 1\\) have a solution?",
        steps: [
          "\\(R = \\sqrt{9 + 16} = 5\\), so a solution exists exactly when \\(-5 \\le k - 1 \\le 5\\).",
          "That is \\(-4 \\le k \\le 6\\).",
        ],
        answer: "11 integers",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\cos x - \\sqrt3\\sin x = 1\\).",
        steps: [
          "Divide by \\(R = 2\\): \\(\\frac12\\cos x - \\frac{\\sqrt3}{2}\\sin x = \\frac12\\), i.e. \\(\\cos\\left(x + \\frac{\\pi}{3}\\right) = \\cos\\frac{\\pi}{3}\\).",
          "\\(x + \\frac{\\pi}{3} = 2n\\pi \\pm \\frac{\\pi}{3}\\).",
        ],
        answer: "\\(x = 2n\\pi\\) or \\(x = 2n\\pi - \\frac{2\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "Range of \\(5\\sin x + 12\\cos x\\)?", answer: "\\([-13, 13]\\)" },
        { prompt: "If \\(a\\cos 2\\theta + b\\sin 2\\theta = c\\) has roots \\(\\alpha, \\beta\\), then \\(\\tan\\alpha\\tan\\beta = ?\\)", answer: "\\(\\frac{c - a}{c + a}\\)", method: "\\((a + c)t^2 - 2bt + (c - a) = 0\\)." },
      ],
      pyqExampleId: "b221023b-9965-4b97-b631-811e1a6e404f",
      traps: [
        {
          title: "Counting the integers at the boundary",
          body: "\\(\\sqrt{74} \\approx 8.6\\) is not an integer, so \\(-8.6 \\le 2k + 1 \\le 8.6\\) gives \\(-4.8 \\le k \\le 3.8\\): the integers are \\(-4\\) to \\(3\\), eight of them. Rounding the bound before solving for \\(k\\) is the usual way to lose one.",
        },
      ],
    },

    // 4 — factorising sums of sines and cosines
    {
      kind: "formula" as const,
      slug: "cettf-factorising-equations",
      name: "Solving by Factorisation — Sum-to-Product and Multiple Angles",
      intuition:
        "An equation with three or more angles is almost never solved term by term. Pair the outer terms with sum-to-product so a common factor appears, then set each factor to zero — every factor is now a one-ratio equation of the first concept.",
      definition:
        "- \\(\\sin A + \\sin B = 2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}\\), \\(\\cos A + \\cos B = 2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}\\).\n" +
        "- **Pair the terms whose average is the middle angle**: in \\(\\sin\\theta + \\sin 4\\theta + \\sin 7\\theta\\), pair \\(\\sin 7\\theta + \\sin\\theta = 2\\sin 4\\theta\\cos 3\\theta\\), so the whole is \\(\\sin 4\\theta(2\\cos 3\\theta + 1)\\).\n" +
        "- **Multiple angles** reduce to one ratio: \\(\\sin 2\\theta = 2\\sin\\theta\\cos\\theta\\), \\(\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta\\). Divide out a factor only after noting when it is zero.\n" +
        "- **Count each factor separately** in the interval, then check no root is shared by two factors.\n" +
        "- A factor that can never vanish (such as \\(2\\cos x - 3\\)) contributes nothing, and the question usually says so in its condition.",
      formula: {
        label: "Sum-to-product",
        latex: "\\sin A+\\sin B=2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2} \\qquad \\cos A+\\cos B=2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}",
      },
      authoredExample: {
        prompt: "Solve \\(\\cos x + \\cos 3x = \\cos 2x\\) in \\(\\left(0, \\frac{\\pi}{2}\\right)\\).",
        steps: [
          "Pair: \\(\\cos 3x + \\cos x = 2\\cos 2x\\cos x\\), so \\(2\\cos 2x\\cos x - \\cos 2x = 0\\).",
          "\\(\\cos 2x(2\\cos x - 1) = 0\\).",
          "\\(\\cos 2x = 0 \\Rightarrow x = \\frac{\\pi}{4}\\); \\(\\cos x = \\frac12 \\Rightarrow x = \\frac{\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4},\\ \\dfrac{\\pi}{3}\\)",
      },
      selfCheckExample: {
        prompt: "How many solutions does \\(\\sin x + \\sin 3x = 0\\) have in \\((0, \\pi)\\)?",
        steps: [
          "\\(2\\sin 2x\\cos x = 0\\).",
          "\\(\\sin 2x = 0\\): \\(x = \\frac{\\pi}{2}\\). \\(\\cos x = 0\\): \\(x = \\frac{\\pi}{2}\\) — the same root.",
        ],
        answer: "1",
      },
      practiceSet: [
        { prompt: "Solutions of \\(\\sin x + \\sin 5x = \\sin 3x\\) in \\(\\left(0, \\frac{\\pi}{2}\\right)\\)?", answer: "\\(\\frac{\\pi}{6}, \\frac{\\pi}{3}\\)", method: "\\(\\sin 3x(2\\cos 2x - 1) = 0\\)." },
        { prompt: "If \\(3\\sin 2\\theta = 2\\sin 3\\theta\\), \\(0 < \\theta < \\pi\\), find \\(\\cos\\theta\\).", answer: "\\(-\\frac14\\)", method: "\\(6\\cos\\theta = 6 - 8\\sin^2\\theta\\) gives \\(4\\cos^2\\theta - 3\\cos\\theta - 1 = 0\\), so \\(\\cos\\theta = 1\\) or \\(-\\frac14\\); reject 1 (it needs \\(\\theta = 0\\))." },
      ],
      pyqExampleId: "239511e5-aa48-4d80-806d-ffaedaa046e1",
      traps: [
        {
          title: "Dividing by a factor that can be zero",
          body: "Cancelling \\(\\sin 3x\\) from both sides of \\(2\\sin 3x\\cos 2x = \\sin 3x\\) loses every root of \\(\\sin 3x = 0\\). Move everything to one side and factor instead.",
        },
      ],
    },

    // 5 — range arguments: no solution, exponential substitution, inequalities
    {
      kind: "formula" as const,
      slug: "cettf-range-arguments",
      name: "Range Arguments — No Solution, Exponential Forms and Trigonometric Inequalities",
      intuition:
        "Some equations are settled before any solving: if one side can only take values in a range the other side never reaches, there is no solution. The same bounds turn exponential equations like \\(16^{\\sin^2 x} + 16^{\\cos^2 x} = 10\\) into a quadratic with the answer read off from \\(0 \\le \\sin^2 x \\le 1\\).",
      definition:
        "- **Bounds to use**: \\(-1 \\le \\sin x, \\cos x \\le 1\\); \\(\\frac1e \\le e^{\\sin x} \\le e\\); \\(\\frac12 \\le \\sin^4 x + \\cos^4 x \\le 1\\) (since it equals \\(1 - \\frac12\\sin^2 2x\\)).\n" +
        "- **No solution**: \\(e^{\\sin x} - e^{-\\sin x} = 4\\) needs \\(e^{\\sin x} \\approx 4.24\\), but \\(e^{\\sin x} \\le e \\approx 2.72\\).\n" +
        "- **Exponential forms**: in \\(a^{\\sin^2 x} + a^{\\cos^2 x} = k\\), put \\(y = a^{\\sin^2 x}\\); then \\(a^{\\cos^2 x} = \\frac{a}{y}\\) and \\(y + \\frac{a}{y} = k\\) is a quadratic. Each root fixes \\(\\sin^2 x\\), and each value of \\(\\sin^2 x\\) strictly between 0 and 1 gives four roots in \\([0, 2\\pi]\\).\n" +
        "- **Inequalities**: solve the trigonometric part for its interval (\\(2\\sin^2 x + 3\\sin x - 2 > 0 \\Rightarrow \\sin x > \\frac12\\)), solve the algebraic part, then intersect on a number line using \\(\\frac{\\pi}{6} \\approx 0.52\\), \\(\\frac{5\\pi}{6} \\approx 2.62\\).",
      formula: {
        label: "Bounds that decide an equation",
        latex: "\\sin^4 x+\\cos^4 x = 1-\\tfrac12\\sin^2 2x \\in \\left[\\tfrac12,\\,1\\right] \\qquad a^{\\sin^2 x}\\cdot a^{\\cos^2 x}=a",
      },
      authoredExample: {
        prompt: "How many solutions does \\(9^{\\sin^2 x} + 9^{\\cos^2 x} = 10\\) have in \\([0, \\pi]\\)?",
        steps: [
          "Let \\(y = 9^{\\sin^2 x}\\); then \\(y + \\frac{9}{y} = 10\\), so \\(y = 9\\) or \\(y = 1\\).",
          "\\(y = 9\\): \\(\\sin^2 x = 1\\), \\(x = \\frac{\\pi}{2}\\). \\(y = 1\\): \\(\\sin^2 x = 0\\), \\(x = 0, \\pi\\).",
        ],
        answer: "3",
      },
      selfCheckExample: {
        prompt: "For which \\(\\lambda\\) does \\(\\sin^4\\theta + \\cos^4\\theta = \\lambda\\) have a real solution?",
        steps: ["\\(\\sin^4\\theta + \\cos^4\\theta = 1 - \\frac12\\sin^2 2\\theta\\) runs over \\(\\left[\\frac12, 1\\right]\\)."],
        answer: "\\(\\frac12 \\le \\lambda \\le 1\\)",
      },
      practiceSet: [
        { prompt: "Number of solutions of \\(2^{1 + |\\cos x| + |\\cos x|^2 + \\cdots} = 4\\) in \\((-\\pi, \\pi)\\)?", answer: "4", method: "The exponent sums to \\(\\frac{1}{1 - |\\cos x|} = 2\\), so \\(|\\cos x| = \\frac12\\)." },
        { prompt: "Does \\(\\sin x + \\cos x = 2\\) have a solution?", answer: "No — the largest value of \\(\\sin x + \\cos x\\) is \\(\\sqrt2\\)." },
      ],
      pyqExampleId: "564f2302-d826-49b1-947a-73fa7cb438f7",
      traps: [
        {
          title: "Counting two roots per value of sin²x instead of four",
          body: "\\(\\sin^2 x = \\frac14\\) means \\(\\sin x = \\frac12\\) OR \\(-\\frac12\\), and each has two roots in \\([0, 2\\pi]\\). Over \\([0, \\pi]\\) only the positive value counts, and it has two.",
        },
        {
          title: "A second root of an equation the key counts once",
          body: "\\((1 - \\tan^2\\theta)\\sec^2\\theta + 2^{\\tan^2\\theta} = 0\\) is keyed 2 values, from \\(\\tan^2\\theta = 3\\). The equation \\(2^t = t^2 - 1\\) also crosses near \\(t \\approx 3.41\\). The paper's answer is 2; know that it counts only the exact root.",
        },
      ],
    },
  ],
  related: [
    { label: "Solution of triangle — sine, cosine and projection rules", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-triangle-rules" },
  ],
};
