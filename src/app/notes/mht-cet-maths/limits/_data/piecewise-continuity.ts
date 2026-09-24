import type { SubtopicNote } from "@/app/notes/_types";

export const PIECEWISE_CONTINUITY_NOTE: SubtopicNote = {
  subtopicName: "Continuity of Piecewise Functions — Junction Conditions and Parameter Systems",
  title: "Continuity of Piecewise Functions — Junction Conditions and Parameter Systems",
  oneLineDefinition:
    "A piecewise function can only fail at the points where its formula changes — so continuity is one equation per junction, and two unknowns need two junctions.",
  whyItMatters:
    "19 PYQs at 53% HARD, and the most mechanical page in the chapter once the habit is fixed: find the junctions, write left = right = value at each, solve. " +
    "The same three-piece trigonometric function has been set four times with the question changed only in what combination of a and b it asks for; the 1 − cos 4x family five times. " +
    "The HARD tag here comes from junctions hidden inside an inequality or a limit that must be evaluated with different tools on the two sides — never from new theory.",
  concepts: [
    // 1 — one junction
    {
      kind: "formula" as const,
      slug: "cetlim-one-junction-condition",
      name: "One Junction: Left Limit = Right Limit = Value",
      intuition:
        "Two formulas glued at \\(x = c\\) agree everywhere except possibly at the seam. Continuity at the seam is a single equation: the formula on the left, evaluated at \\(c\\), equals the formula on the right, evaluated at \\(c\\).",
      definition:
        "- A piecewise function is continuous away from its junctions automatically (each piece is a nice formula on an open interval). Only the **junctions** need checking.\n" +
        "- At a junction \\(c\\): compute \\(\\lim_{x\\to c^-}\\) from the **left piece**, \\(\\lim_{x\\to c^+}\\) from the **right piece**, and \\(f(c)\\) from **whichever piece's inequality includes \\(c\\)**. Set all three equal.\n" +
        "- With one unknown, one junction gives one equation — solve it.\n" +
        "- When each piece is a polynomial or a trigonometric function, the one-sided limit is just substitution into that piece.\n" +
        "- Check the domain: 'continuous on its domain' or 'on \\([-2, 2]\\)' means every junction inside that domain must be tested.",
      formula: {
        label: "Junction condition",
        latex:
          "f(x) = \\begin{cases} g(x), & x \\le c \\\\ h(x), & x > c \\end{cases} \\text{ continuous at } c \\iff g(c) = \\lim_{x\\to c^+} h(x)",
      },
      authoredExample: {
        prompt: "\\(f(x) = 2x + k\\) for \\(x \\le 1\\) and \\(f(x) = x^2 + 3\\) for \\(x > 1\\). Find \\(k\\) if \\(f\\) is continuous.",
        steps: [
          "The only junction is \\(x = 1\\). Left piece at \\(1\\): \\(2 + k\\); this is also \\(f(1)\\) because \\(x \\le 1\\) includes \\(1\\).",
          "Right piece as \\(x \\to 1^+\\): \\(1 + 3 = 4\\).",
          "Equate: \\(2 + k = 4\\).",
        ],
        answer: "\\(k = 2\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = ax + 1\\) for \\(x \\le 2\\) and \\(f(x) = 3x - a\\) for \\(x > 2\\). Find \\(a\\) if \\(f\\) is continuous.",
        steps: [
          "Junction \\(x = 2\\): left \\(2a + 1\\), right \\(6 - a\\).",
          "\\(2a + 1 = 6 - a \\Rightarrow 3a = 5\\).",
        ],
        answer: "\\(a = \\dfrac{5}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f = x + k\\) (\\(x < 0\\)), \\(\\cos x\\) (\\(x \\ge 0\\)). Continuous ⇒ \\(k = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(f = kx^2\\) (\\(x \\le 2\\)), \\(3\\) (\\(x > 2\\)). Continuous ⇒ \\(k = ?\\)",
          answer: "\\(\\dfrac{3}{4}\\)",
        },
        {
          prompt: "\\(f = 2x\\) (\\(x < 3\\)), \\(x + a\\) (\\(x \\ge 3\\)). Continuous ⇒ \\(a = ?\\)",
          answer: "\\(3\\)",
        },
        {
          prompt: "\\(f = k\\) (\\(x \\le 0\\)), \\(\\dfrac{\\sin x}{x}\\) (\\(x > 0\\)). Continuous ⇒ \\(k = ?\\)",
          answer: "\\(1\\)",
        },
      ],
      pyqExampleId: "fde75b1d-870e-4e41-bf3d-2fc01cf7d6e6",
      traps: [
        {
          title: "Which piece owns the point?",
          body:
            "\\(f(c)\\) comes from the piece whose inequality includes \\(c\\) — the one written with \\(\\le\\) or \\(\\ge\\). When a stem gives a separate value at \\(c\\) (\\(f(3) = a + b\\)), that value is a THIRD quantity and must equal both one-sided limits.",
        },
      ],
    },

    // 2 — each side its own tool
    {
      kind: "formula" as const,
      slug: "cetlim-each-side-its-own-tool",
      name: "Two Different Formulas Meeting at 0: Compute Each Side with Its Own Tool",
      intuition:
        "The paper's favourite: a trigonometric standard form on the left of \\(0\\), a surd on the right, and a constant \\(\\alpha\\) at \\(0\\). The two sides need two different tools — and both must come out equal to \\(\\alpha\\).",
      definition:
        "- **Left of \\(0\\)**: typically \\(\\dfrac{1 - \\cos kx}{x^2} \\to \\dfrac{k^2}{2}\\) (for \\(k = 4\\): \\(8\\)), or \\(\\dfrac{\\sin ax}{x} + 3 \\to a + 3\\).\n" +
        "- **Right of \\(0\\)**: typically a surd — \\(\\dfrac{\\sqrt{x}}{\\sqrt{16 + \\sqrt{x}} - 4}\\): rationalise to \\(\\sqrt{16 + \\sqrt{x}} + 4 \\to 8\\); or \\(\\dfrac{\\sqrt{1 + mx} - \\sqrt{1 - mx}}{x} \\to m\\).\n" +
        "- If **both** sides are pure limits, they must agree with each other; \\(\\alpha\\) is then their common value. If one side is a formula that can be substituted (\\(\\dfrac{2x + 1}{x - 2} \\to -\\dfrac{1}{2}\\)), that value is the target for the other side.\n" +
        "- When the unknown sits inside the left piece (\\(k\\) in \\(1 - \\cos kx\\)) and the right piece is fixed, solve \\(\\dfrac{k^2}{2} = 8\\), and read the sign from the options.",
      formula: {
        label: "The two recurring one-sided limits",
        latex:
          "\\lim_{x\\to 0^-}\\frac{1 - \\cos 4x}{x^2} = 8 \\qquad \\lim_{x\\to 0^+}\\frac{\\sqrt{x}}{\\sqrt{16 + \\sqrt{x}} - 4} = \\lim_{x\\to 0^+}\\left(\\sqrt{16 + \\sqrt{x}} + 4\\right) = 8",
      },
      authoredExample: {
        prompt: "\\(f(x) = \\dfrac{\\sin 3x}{x}\\) for \\(x < 0\\), \\(f(0) = \\alpha\\), \\(f(x) = \\dfrac{e^{3x} - 1}{x}\\) for \\(x > 0\\). Find \\(\\alpha\\) if \\(f\\) is continuous at \\(0\\).",
        steps: [
          "Left: \\(\\dfrac{\\sin 3x}{x} \\to 3\\) (scaled sine).",
          "Right: \\(\\dfrac{e^{3x} - 1}{x} \\to 3\\) (exponential standard limit).",
          "Both sides give \\(3\\), so continuity requires \\(\\alpha = 3\\).",
        ],
        answer: "\\(\\alpha = 3\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{1 - \\cos x}{x^2}\\) for \\(x < 0\\), \\(f(0) = a\\), \\(f(x) = \\dfrac{\\sqrt{1 + x} - 1}{x}\\) for \\(x > 0\\). Find \\(a\\) if \\(f\\) is continuous at \\(0\\).",
        steps: [
          "Left: \\(\\dfrac{1 - \\cos x}{x^2} \\to \\dfrac{1}{2}\\).",
          "Right: rationalise, \\(\\dfrac{1}{\\sqrt{1 + x} + 1} \\to \\dfrac{1}{2}\\).",
          "Both equal \\(\\dfrac{1}{2}\\).",
        ],
        answer: "\\(a = \\dfrac{1}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0^-}\\dfrac{1 - \\cos 4x}{x^2} = ?\\)",
          answer: "\\(8\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^+}\\dfrac{\\sqrt{x}}{\\sqrt{16 + \\sqrt{x}} - 4} = ?\\)",
          answer: "\\(8\\)",
          method: "Rationalise: \\(\\sqrt{16 + \\sqrt{x}} + 4\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^+}\\dfrac{\\sqrt{1 + 2x} - 1}{x} = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^-}\\dfrac{\\tan 3x}{x} = ?\\)",
          answer: "\\(3\\)",
        },
      ],
      pyqExampleId: "90ce5f78-824f-4285-94d4-6ad7554e6a1d",
      traps: [
        {
          title: "Substituting into the surd piece",
          body:
            "\\(\\dfrac{\\sqrt{x}}{\\sqrt{16 + \\sqrt{x}} - 4}\\) is \\(\\dfrac{0}{0}\\) at \\(0\\), not \\(0\\). Multiply by the conjugate \\(\\sqrt{16 + \\sqrt{x}} + 4\\); the \\(\\sqrt{x}\\) cancels and the value is \\(8\\). Answering \\(0\\) or \\(-8\\) (a sign slip in the conjugate) are the two distractors.",
        },
      ],
    },

    // 3 — exponential junctions with a given value
    {
      kind: "formula" as const,
      slug: "cetlim-exponential-junctions",
      name: "Exponential Junctions and the Given Value at 0",
      intuition:
        "When a piece is \\(\\dfrac{3\\sin x + 5\\tan x}{a^{x} - 1}\\), its limit is \\(\\dfrac{8}{\\log a}\\) — a formula in the unknown base. Equating it to the value given at \\(0\\) turns the unknown into a power of \\(2\\).",
      definition:
        "- \\(\\dfrac{p\\sin x + q\\tan x}{a^{x} - 1} \\to \\dfrac{p + q}{\\log a}\\); \\(\\dfrac{px + qx\\cos x}{b^{x} - 1} \\to \\dfrac{p + q}{\\log b}\\).\n" +
        "- Equate to the given \\(f(0)\\), say \\(\\dfrac{2}{\\log 2}\\): \\(\\dfrac{8}{\\log a} = \\dfrac{2}{\\log 2} \\Rightarrow \\log a = 4\\log 2 = \\log 16 \\Rightarrow a = 16\\).\n" +
        "- \\(\\dfrac{8^{x} - 4^{x} - 2^{x} + 1}{x^2} = \\dfrac{(4^{x} - 1)(2^{x} - 1)}{x^2} \\to \\log 4\\log 2 = 2(\\log 2)^2\\) on one side; a polynomial-plus-constant piece \\(e^{x}\\sin x + x + \\lambda\\log 4\\) on the other simply **substitutes** to \\(\\lambda\\log 4 = 2\\lambda\\log 2\\).\n" +
        "- The answer is usually requested as \\(e^{\\lambda}\\) or \\(500e^{\\lambda}\\): with \\(\\lambda = \\log 2\\), \\(e^{\\lambda} = 2\\).",
      formula: {
        label: "Exponential-denominator junction",
        latex:
          "\\lim_{x\\to 0}\\frac{p\\sin x + q\\tan x}{a^{x} - 1} = \\frac{p + q}{\\log a} \\qquad \\log a = k\\log 2 \\iff a = 2^{k}",
      },
      authoredExample: {
        prompt: "\\(f(x) = \\dfrac{a^{x} - 1}{x}\\) for \\(x < 0\\), \\(f(0) = 2\\), \\(f(x) = \\dfrac{e^{2x} - 1}{x}\\) for \\(x > 0\\). Find \\(a\\) if \\(f\\) is continuous at \\(0\\).",
        steps: [
          "Right: \\(\\dfrac{e^{2x} - 1}{x} \\to 2 = f(0)\\). Consistent.",
          "Left: \\(\\dfrac{a^{x} - 1}{x} \\to \\log a\\). Continuity: \\(\\log a = 2\\).",
          "\\(a = e^{2}\\).",
        ],
        answer: "\\(a = e^{2}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{9^{x} - 2\\cdot 3^{x} + 1}{x^2}\\) for \\(x > 0\\) and \\(f(x) = 4\\lambda\\) for \\(x \\le 0\\). Find \\(\\lambda\\) if \\(f\\) is continuous at \\(0\\).",
        steps: [
          "\\(9^{x} - 2\\cdot 3^{x} + 1 = (3^{x} - 1)^2 \\sim x^2(\\log 3)^2\\), so the right limit is \\((\\log 3)^2\\).",
          "Left value \\(4\\lambda\\). Equate: \\(\\lambda = \\dfrac{(\\log 3)^2}{4}\\).",
        ],
        answer: "\\(\\lambda = \\dfrac{(\\log 3)^2}{4}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0^+}\\dfrac{5^{x} - 1}{x} = ?\\)",
          answer: "\\(\\log 5\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{x} - 1}{2x} = ?\\)",
          answer: "\\(\\dfrac{1}{2}\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{4^{x} - 2^{x}}{x} = ?\\)",
          answer: "\\(\\log 2\\)",
        },
        {
          prompt: "If \\(\\log a = 5\\log 2\\), then \\(a = ?\\)",
          answer: "\\(32\\)",
        },
      ],
      pyqExampleId: "dfa64738-9e71-4195-9668-df5b368c32bc",
      traps: [
        {
          title: "log a = 4 log 2 means a = 16, not a = 8",
          body:
            "\\(4\\log 2 = \\log 2^4 = \\log 16\\). The option \\(a = 8\\) comes from \\(2 \\times 4\\); the exponent rule for logs is what the stem is testing.",
        },
      ],
    },

    // 4 — two junctions, two unknowns
    {
      kind: "formula" as const,
      slug: "cetlim-two-junctions-linear-system",
      name: "Two Junctions, Two Unknowns: Set Up a Linear System",
      intuition:
        "Three pieces have two seams, and each seam gives one equation in \\(a\\) and \\(b\\). Write both, solve the pair, then compute whatever combination the stem asks for — \\(a - b\\), \\(2a + 3b\\), the ordered pair.",
      definition:
        "- Count the junctions **first**. Three pieces → two junctions → two equations. Unknowns beyond that number cannot be determined by continuity alone.\n" +
        "- The recurring paper: \\(x + a\\sqrt2\\sin x\\) on \\([0, \\frac{\\pi}{4}]\\), \\(2x\\cot x + b\\) on \\([\\frac{\\pi}{4}, \\frac{\\pi}{2}]\\), \\(a\\cos 2x - b\\sin x\\) on \\((\\frac{\\pi}{2}, \\pi]\\). At \\(\\frac{\\pi}{4}\\): \\(\\frac{\\pi}{4} + a = \\frac{\\pi}{2} + b\\), i.e. \\(a - b = \\frac{\\pi}{4}\\). At \\(\\frac{\\pi}{2}\\): \\(2\\cdot\\frac{\\pi}{2}\\cdot 0 + b = -a - b\\), i.e. \\(a + 2b = 0\\). Hence \\(a = \\frac{\\pi}{6}\\), \\(b = -\\frac{\\pi}{12}\\).\n" +
        "- Junctions can be **hidden in an inequality**: \\(|2x - 3| \\ge 2\\) means \\(x \\le \\frac12\\) or \\(x \\ge \\frac52\\), so the seams are at \\(\\frac12\\) and \\(\\frac52\\). Solve the inequality before writing anything.\n" +
        "- A seam that involves a **limit** rather than substitution (\\(\\dfrac{\\sin ax}{x} + 3\\) at \\(0\\)) is handled with the standard form, then the equation is linear as usual.\n" +
        "- Pieces like \\(\\dfrac{2x^2}{a}\\) and \\(a\\) meeting at \\(1\\) give \\(a^2 = 2\\) — a quadratic; carry both roots to the second junction and let it decide.",
      formula: {
        label: "The two-seam system",
        latex:
          "\\text{seam } c_1:\\ g(c_1) = h(c_1) \\qquad \\text{seam } c_2:\\ h(c_2) = k(c_2) \\qquad \\Rightarrow\\ \\text{two linear equations in } a, b",
      },
      authoredExample: {
        prompt: "\\(f(x) = x + a\\) for \\(x \\le 0\\), \\(2x + b\\) for \\(0 < x \\le 1\\), \\(3\\) for \\(x > 1\\). Find \\(a\\) and \\(b\\) if \\(f\\) is continuous.",
        steps: [
          "Two junctions: \\(0\\) and \\(1\\).",
          "At \\(0\\): left \\(0 + a\\), right \\(0 + b\\), so \\(a = b\\).",
          "At \\(1\\): left \\(2 + b\\), right \\(3\\), so \\(b = 1\\). Hence \\(a = 1\\).",
        ],
        answer: "\\(a = 1,\\ b = 1\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = ax + b\\) for \\(x \\le 1\\), \\(5\\) for \\(1 < x < 2\\), \\(bx - a\\) for \\(x \\ge 2\\). Find \\(a\\) and \\(b\\) if \\(f\\) is continuous.",
        steps: [
          "At \\(1\\): \\(a + b = 5\\).",
          "At \\(2\\): \\(5 = 2b - a\\).",
          "Add: \\(3b = 10 \\Rightarrow b = \\dfrac{10}{3}\\), then \\(a = 5 - \\dfrac{10}{3} = \\dfrac{5}{3}\\).",
        ],
        answer: "\\(a = \\dfrac{5}{3},\\ b = \\dfrac{10}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f = x + a\\) (\\(x < 1\\)), \\(3\\) (\\(1 \\le x \\le 2\\)), \\(bx\\) (\\(x > 2\\)). Continuous ⇒ \\((a, b) = ?\\)",
          answer: "\\(\\left(2, \\dfrac{3}{2}\\right)\\)",
        },
        {
          prompt: "\\(f = 2\\) (\\(x < 0\\)), \\(a + bx\\) (\\(0 \\le x \\le 1\\)), \\(4\\) (\\(x > 1\\)). Continuous ⇒ \\((a, b) = ?\\)",
          answer: "\\((2, 2)\\)",
        },
        {
          prompt: "How many equations does continuity give for a three-piece function with seams at \\(\\pi/4\\) and \\(\\pi/2\\)?",
          answer: "Two — one per seam.",
        },
        {
          prompt: "Where are the seams of a function defined one way for \\(|2x - 3| \\ge 2\\) and another way otherwise?",
          answer: "\\(x = \\dfrac{1}{2}\\) and \\(x = \\dfrac{5}{2}\\).",
        },
      ],
      pyqExampleId: "b7971687-677c-4b3d-a3c7-dc4273a56829",
      traps: [
        {
          title: "Applying continuity at only one seam",
          body:
            "With two unknowns, one equation leaves a free parameter, and any option can be 'reached'. The 2022 sitting's own key was wrong for exactly this reason — it used one seam and printed \\(\\frac{13}{5}\\) where two seams give \\(\\frac{23}{5}\\). Count the seams before solving.",
        },
      ],
    },

    // 5 — squeeze
    {
      kind: "formula" as const,
      slug: "cetlim-squeeze-x-squared-sin-one-over-x",
      name: "The Squeeze: x² sin(1/x) Is Continuous for Any Coefficient",
      intuition:
        "\\(\\sin\\dfrac{1}{x}\\) oscillates wildly near \\(0\\) and has no limit — but multiply it by \\(x^2\\) and the oscillation is crushed between \\(-x^2\\) and \\(x^2\\), both of which go to \\(0\\). The product is continuous at \\(0\\) no matter what constant sits in front.",
      definition:
        "- **Squeeze theorem**: if \\(g(x) \\le f(x) \\le h(x)\\) near \\(c\\) and \\(g, h \\to L\\), then \\(f \\to L\\).\n" +
        "- \\(|\\sin u| \\le 1\\) for every \\(u\\), so \\(\\left|x^2\\sin\\dfrac{1}{x}\\right| \\le x^2 \\to 0\\) and \\(\\left|x\\sin\\dfrac{1}{x}\\right| \\le |x| \\to 0\\).\n" +
        "- Consequence: \\(f(x) = bx^2\\sin\\dfrac{1}{x}\\) for \\(x > 0\\), \\(f(0) = 0\\), is continuous at \\(0\\) for **every** real \\(b\\) — the parameter is unconstrained.\n" +
        "- Likewise \\(a^2(x - |x|)\\) for \\(x < 0\\) equals \\(2a^2x \\to 0\\) for every \\(a\\). A stem asking 'for which \\(a, b\\) is \\(f\\) continuous' can have the answer 'all real \\(a\\) and \\(b\\)'.\n" +
        "- Without the crushing factor, \\(\\sin\\dfrac{1}{x}\\) alone has **no** limit at \\(0\\) and no choice of \\(f(0)\\) makes it continuous.",
      formula: {
        label: "Squeeze at 0",
        latex:
          "\\left|x^2\\sin\\frac{1}{x}\\right| \\le x^2 \\to 0 \\ \\Rightarrow\\ \\lim_{x\\to 0} x^2\\sin\\frac{1}{x} = 0",
      },
      authoredExample: {
        prompt: "\\(f(x) = x\\sin\\dfrac{1}{x}\\) for \\(x \\neq 0\\) and \\(f(0) = 0\\). Is \\(f\\) continuous at \\(0\\)?",
        steps: [
          "\\(\\left|x\\sin\\dfrac{1}{x}\\right| \\le |x|\\), because \\(|\\sin u| \\le 1\\).",
          "\\(|x| \\to 0\\), so by the squeeze \\(\\lim_{x\\to 0} f(x) = 0\\).",
          "This equals \\(f(0) = 0\\).",
        ],
        answer: "Yes — continuous at \\(0\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = x^2\\cos\\dfrac{1}{x^2}\\) for \\(x \\neq 0\\) and \\(f(0) = k\\). Find \\(k\\) if \\(f\\) is continuous at \\(0\\).",
        steps: [
          "\\(\\left|x^2\\cos\\dfrac{1}{x^2}\\right| \\le x^2 \\to 0\\), so the limit is \\(0\\).",
          "Continuity forces \\(k = 0\\).",
        ],
        answer: "\\(k = 0\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0} x^2\\sin\\dfrac{1}{x} = ?\\)",
          answer: "\\(0\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\sin\\dfrac{1}{x} = ?\\)",
          answer: "Does not exist — oscillates between \\(-1\\) and \\(1\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0} x\\cos\\dfrac{1}{x} = ?\\)",
          answer: "\\(0\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\dfrac{\\sin x}{x} = ?\\)",
          answer: "\\(0\\)",
          method: "Squeeze: \\(|\\sin x / x| \\le 1/x\\).",
        },
      ],
      pyqExampleId: "76115b67-63c7-474f-97d3-ba1669af9099",
      traps: [
        {
          title: "Looking for a constraint that is not there",
          body:
            "When both pieces tend to \\(0\\) for every value of the parameters, the answer is 'any real \\(a\\), any real \\(b\\)'. Options that restrict \\(a\\) to rationals or irrationals are noise — nothing in the limit distinguishes them.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Continuity at a Point — the single-formula version of the same test",
      href: "/notes/mht-cet-maths/limits/cetlim-continuity-at-a-point",
    },
    {
      label: "Algebraic Limits — rationalisation for the surd pieces",
      href: "/notes/mht-cet-maths/limits/cetlim-algebraic",
    },
  ],
};
