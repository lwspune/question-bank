import type { SubtopicNote } from "@/app/notes/_types";

export const GENERAL_SOLUTIONS_NOTE: SubtopicNote = {
  subtopicName: "General Solutions and Counting Solutions of Trigonometric Equations",
  title: "General Solutions & Counting Solutions",
  oneLineDefinition:
    "Because sine, cosine, and tangent repeat, a trig equation has an infinite family of solutions captured by one general formula — and counting how many fall in a given interval is the most-tested skill in the chapter.",
  whyItMatters:
    "The chapter's hardest pocket (13 PYQs, 6 HARD). Two skills dominate: writing the general solution after reducing the equation to a standard sin = sin / cos = cos / tan = tan form, and counting the solutions inside an interval. Get the reduction right and the counting follows.",
  concepts: [
    // FOUNDATION — general solution formulas
    {
      kind: "formula" as const,
      slug: "te-general-solution-formulas",
      name: "The General-Solution Formulas",
      pyqExampleId: "924eb7b4-8e3f-466b-95c6-25460a3487c5",
      intuition:
        "Solving sin θ = sin α doesn't give one answer — it gives every angle co-terminal with α or its supplement. The three general-solution formulas package that whole infinite family into a single expression with an integer parameter n.",
      definition:
        "Write each equation in the form (function of θ) = (same function of a known angle α), then:\n" +
        "- \\(\\sin\\theta = \\sin\\alpha \\Rightarrow \\theta = n\\pi + (-1)^n \\alpha\\)\n" +
        "- \\(\\cos\\theta = \\cos\\alpha \\Rightarrow \\theta = 2n\\pi \\pm \\alpha\\)\n" +
        "- \\(\\tan\\theta = \\tan\\alpha \\Rightarrow \\theta = n\\pi + \\alpha\\)\n" +
        "for \\(n \\in \\mathbb{Z}\\). The **principal solution** is the one in the first cycle; the **general solution** adds the periodic family. (Special: \\(\\sin\\theta=0 \\Rightarrow \\theta=n\\pi\\); \\(\\cos\\theta=0 \\Rightarrow \\theta=(2n+1)\\tfrac{\\pi}{2}\\).)",
      formula: {
        label: "General solutions",
        latex: "\\sin\\theta=\\sin\\alpha:\\ \\theta=n\\pi+(-1)^n\\alpha; \\quad \\cos\\theta=\\cos\\alpha:\\ \\theta=2n\\pi\\pm\\alpha; \\quad \\tan\\theta=\\tan\\alpha:\\ \\theta=n\\pi+\\alpha",
      },
      authoredExample: {
        prompt: "Find the general solution of \\(\\cos\\theta = \\tfrac{1}{2}\\).",
        steps: [
          "\\(\\cos\\theta = \\cos\\tfrac{\\pi}{3}\\), so use \\(\\theta = 2n\\pi \\pm \\alpha\\) with \\(\\alpha = \\tfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\theta = 2n\\pi \\pm \\dfrac{\\pi}{3},\\ n \\in \\mathbb{Z}\\).",
      },
      practiceSet: [
        { prompt: "General solution of \\(\\tan\\theta = 1\\)?", answer: "\\(\\theta = n\\pi + \\tfrac{\\pi}{4}\\)", method: "\\(\\tan\\theta = \\tan\\tfrac{\\pi}{4}\\)." },
        { prompt: "General solution of \\(\\sin\\theta = 0\\)?", answer: "\\(\\theta = n\\pi\\)." },
      ],
      traps: [
        {
          title: "sin and cos use DIFFERENT general forms",
          body:
            "\\(\\sin\\theta=\\sin\\alpha\\) uses \\(n\\pi+(-1)^n\\alpha\\); \\(\\cos\\theta=\\cos\\alpha\\) uses \\(2n\\pi\\pm\\alpha\\). Swapping them is the most common error and changes which solutions you count.",
        },
      ],
    },

    // reducing & solving
    {
      kind: "formula" as const,
      slug: "te-reducing-and-solving",
      name: "Reducing an Equation to Standard Form",
      pyqExampleId: "90352246-69b2-4e65-bb79-cc76106c420d",
      intuition:
        "Most equations don't arrive as sin = sin. The work is to massage them — co-function shifts, double-angle identities, or factoring a quadratic in one ratio — into a standard form. Watch for extraneous roots when you square.",
      definition:
        "Common reductions:\n" +
        "- **Co-function:** \\(\\sin 2\\theta = \\cos 3\\theta = \\sin(\\tfrac{\\pi}{2} - 3\\theta)\\), then equate angles.\n" +
        "- **Quadratic in one ratio:** equations like \\(2\\cos^2 x + \\cos x - 1 = 0\\) factor; solve each linear factor.\n" +
        "- **Half-angle / Weierstrass:** \\(\\csc x + \\cot x = \\sqrt3\\) becomes \\(1 + \\cos x = \\sqrt3\\sin x\\); square carefully.\n" +
        "- **Always verify** roots in the ORIGINAL equation — squaring or dividing can introduce or drop solutions (e.g. where a denominator vanishes).",
      formula: {
        label: "Co-function reduction",
        latex: "\\cos\\theta = \\sin\\!\\left(\\tfrac{\\pi}{2} - \\theta\\right), \\quad \\sin\\theta = \\cos\\!\\left(\\tfrac{\\pi}{2} - \\theta\\right)",
      },
      authoredExample: {
        prompt: "Solve \\(\\sin 3\\theta = \\cos 2\\theta\\) for \\(0 < \\theta < \\tfrac{\\pi}{2}\\).",
        steps: [
          "Write \\(\\cos 2\\theta = \\sin(\\tfrac{\\pi}{2} - 2\\theta)\\), so \\(\\sin 3\\theta = \\sin(\\tfrac{\\pi}{2} - 2\\theta)\\).",
          "Equate: \\(3\\theta = \\tfrac{\\pi}{2} - 2\\theta \\Rightarrow 5\\theta = \\tfrac{\\pi}{2}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{10}\\) (i.e. \\(18^\\circ\\)).",
      },
      traps: [
        {
          title: "Squaring can add false roots",
          body:
            "\\(1 + \\cos x = \\sqrt3\\sin x\\) squared gives a quadratic whose roots include \\(\\cos x = -1\\) — which makes the original \\(\\csc x + \\cot x\\) undefined. Substitute every root back before counting.",
        },
      ],
    },

    // counting solutions (viz)
    {
      kind: "formula" as const,
      slug: "te-counting-solutions",
      name: "Counting Solutions in an Interval",
      pyqExampleId: "1431f3ac-0112-4fab-aa97-222fd657a30e",
      intuition:
        "'How many solutions?' is asking how many members of the infinite family land inside the interval. Reduce to a single function = constant, then count the periods that fit — graphically, how many times the curve crosses the level line.",
      definition:
        "To count solutions of (function) \\(= k\\) on an interval:\n" +
        "- Reduce to one trig function equal to a constant (e.g. \\(\\cot 2x\\cot 3x = 1 \\Rightarrow \\cos 5x = 0\\)).\n" +
        "- Find the general solution, then list the values of \\(n\\) that keep \\(\\theta\\) inside the interval.\n" +
        "- **Discard values where the original equation is undefined** (a cotangent/cosecant blowing up, a denominator zero).\n" +
        "- Graphically, the count is the number of intersections of \\(y = (\\text{function})\\) with the horizontal line \\(y = k\\) over the interval.",
      formula: {
        label: "Count = solutions of the reduced equation in range",
        latex: "\\cot 2x\\,\\cot 3x = 1 \\ \\Rightarrow\\ \\cos 5x = 0 \\ \\Rightarrow\\ 5x = (2n+1)\\tfrac{\\pi}{2}",
      },
      visualizationSlug: "te-solution-counting",
      authoredExample: {
        prompt: "How many solutions does \\(\\sin 2x = \\tfrac{1}{2}\\) have on \\(0 \\le x < 2\\pi\\)?",
        steps: [
          "Let \\(u = 2x\\), so \\(u \\in [0, 4\\pi)\\) and \\(\\sin u = \\tfrac12\\).",
          "In each \\(2\\pi\\) of \\(u\\) there are 2 solutions; over \\([0,4\\pi)\\) that is \\(2 \\times 2 = 4\\).",
        ],
        answer: "\\(4\\) solutions.",
      },
    },

    // range & existence
    {
      kind: "formula" as const,
      slug: "te-range-and-existence",
      name: "Range & Existence Conditions",
      pyqExampleId: "34151393-b687-4e0a-9850-f77b0cd0c5c5",
      intuition:
        "Before solving, check whether a solution can exist at all: sine and cosine are trapped in [−1, 1], so an equation that forces a value outside that has no solution. The same bound limits how many parameter values are allowed.",
      definition:
        "- \\(\\sin x, \\cos x \\in [-1, 1]\\), so \\(a\\sin x = b\\) needs \\(|b| \\le |a|\\); count integer parameters by intersecting with this range.\n" +
        "- For \\(\\cos^{100}x - \\sin^{100}x = 1\\): since both terms are in \\([0,1]\\), equality forces \\(\\cos^2 x = 1\\), i.e. \\(x = n\\pi\\).\n" +
        "- A boundary condition (\\(0 \\le x \\le \\tfrac{\\pi}{2}\\)) plus an undefined-point check often cuts the candidate solutions down to one or two.",
      formula: {
        label: "Existence bound",
        latex: "a\\sin x = b \\ \\text{ solvable} \\iff |b| \\le |a|",
      },
      authoredExample: {
        prompt: "For how many integers \\(k\\) does \\(3\\cos x = k\\) have a solution?",
        steps: [
          "\\(\\cos x \\in [-1,1]\\), so \\(3\\cos x \\in [-3, 3]\\); need \\(k \\in [-3, 3]\\).",
          "Integers: \\(-3, -2, -1, 0, 1, 2, 3\\).",
        ],
        answer: "\\(7\\) values.",
      },
    },
  ],
};
