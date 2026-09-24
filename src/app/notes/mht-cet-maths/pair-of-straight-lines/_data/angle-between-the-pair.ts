import type { SubtopicNote } from "@/app/notes/_types";

export const ANGLE_BETWEEN_THE_PAIR_NOTE: SubtopicNote = {
  subtopicName: "Angle Between the Pair — Perpendicular Pairs, Lines at a Given Angle and the Bisectors",
  title: "Angle Between the Pair — Perpendicular Pairs, Lines at a Given Angle and the Bisectors",
  oneLineDefinition:
    "tan θ = 2√(h² − ab)/|a + b| is the angle between the two lines of ax² + 2hxy + by² = 0; a + b = 0 means perpendicular, h² = ab parallel, and the bisectors are (x² − y²)/(a − b) = xy/h.",
  whyItMatters:
    "12 PYQs at 58% HARD — the chapter's densest HARD page. The stems are lines through a point at 45° or 60° to a given line written as a joint equation (four sittings), the perpendicular condition a + b = 0 in a trigonometric disguise (twice), the pair perpendicular to a given pair through a point, the angle equal to 2θ with a parameter, a right isosceles triangle's two legs (twice), and the bisector pair (twice). " +
    "The pair through a point at a given angle is the Straight Line chapter's two-root problem multiplied out — that is where the marks are.",
  concepts: [
    // 1 — angle formula, perpendicular, parallel
    {
      kind: "formula" as const,
      slug: "cetpsl-angle-formula-perpendicular-and-parallel",
      name: "tan θ = 2√(h² − ab)/|a + b|: Perpendicular When a + b = 0, Parallel When h² = ab",
      intuition:
        "Feed \\(m_1 + m_2\\) and \\(m_1 m_2\\) into \\(\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 + m_1 m_2}\\right|\\): the numerator becomes \\(\\dfrac{2\\sqrt{h^2 - ab}}{|b|}\\) and the denominator \\(\\dfrac{a + b}{b}\\). The angle is \\(90^\\circ\\) exactly when \\(a + b = 0\\), and \\(0\\) when \\(h^2 = ab\\).",
      definition:
        "- \\((x\\cos\\alpha + y\\sin\\alpha)^2 = (x^2 + y^2)\\sin^2\\alpha\\): expand and collect, \\(x^2(\\cos^2\\alpha - \\sin^2\\alpha) + xy\\sin 2\\alpha = 0\\), i.e. \\(x^2\\cos 2\\alpha + xy\\sin 2\\alpha = 0\\); \\(a = \\cos 2\\alpha\\), \\(b = 0\\); perpendicular iff \\(a + b = 0\\), so \\(\\cos 2\\alpha = 0\\), \\(\\alpha = \\dfrac{\\pi}{4}\\) — set in two 2024 shifts.\\n" +
        "- \\(x^2 + \\lambda xy - y^2\\tan^2\\theta = 0\\) with angle \\(2\\theta\\): \\(\\tan 2\\theta = \\dfrac{2\\sqrt{\\lambda^2/4 + \\tan^2\\theta}}{1 - \\tan^2\\theta}\\) and \\(\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta}\\) force \\(\\lambda = 0\\).\n" +
        "- Diagonals along \\(x + 3y = 4\\) and \\(6x - 2y = 7\\) have slopes \\(-\\tfrac13\\) and \\(3\\): perpendicular, so the parallelogram is a rhombus.\n" +
        "- The formula returns the acute angle; \\(h^2 - ab < 0\\) means no real lines at all.",
      formula: {
        label: "Angle between the pair",
        latex:
          "\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{|a + b|} \\qquad a + b = 0 \\iff \\perp \\qquad h^2 = ab \\iff \\parallel",
      },
      authoredExample: {
        prompt: "Find the acute angle between the lines \\(x^2 + 4xy + y^2 = 0\\).",
        steps: [
          "\\(a = 1\\), \\(h = 2\\), \\(b = 1\\): \\(\\tan\\theta = \\dfrac{2\\sqrt{4 - 1}}{2} = \\sqrt3\\).",
        ],
        answer: "\\(60^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "For what \\(k\\) are the lines \\(kx^2 + 5xy - 3y^2 = 0\\) perpendicular?",
        steps: [
          "\\(a + b = 0 \\Rightarrow k - 3 = 0\\).",
        ],
        answer: "\\(k = 3\\)",
      },
      practiceSet: [
        {
          prompt: "Angle between \\(x^2 - y^2 = 0\\)?",
          answer: "\\(90^\\circ\\) (\\(a + b = 0\\))",
        },
        {
          prompt: "Angle between \\(3x^2 - 4xy + y^2 = 0\\)?",
          answer: "\\(\\tan^{-1}\\dfrac12\\)",
          method: "\\(\\dfrac{2\\sqrt{4 - 3}}{4}\\).",
        },
        {
          prompt: "Is \\(x^2 + 2xy + y^2 = 0\\) a pair of distinct lines?",
          answer: "No — \\(h^2 = ab\\), one repeated line \\(x + y = 0\\).",
        },
        {
          prompt: "\\(\\cos 2\\alpha = 0 \\Rightarrow \\alpha = ?\\) (acute)",
          answer: "\\(\\dfrac{\\pi}{4}\\)",
        },
      ],
      pyqExampleId: "f401a478-8b8d-4143-8545-43297527a468",
      traps: [
        {
          title: "Using |a − b| in the denominator",
          body:
            "The denominator is \\(|a + b|\\); \\(a - b\\) belongs to the BISECTOR formula. Mixing them turns a \\(60^\\circ\\) answer into \\(\\tan^{-1}\\) of something not on the list — or worse, onto a distractor.",
        },
      ],
    },

    // 2 — pair through a point at a given angle
    {
      kind: "formula" as const,
      slug: "cetpsl-pair-at-a-given-angle-to-a-line",
      name: "The Pair Through a Point at a Given Angle to a Line: Square the Angle Condition",
      intuition:
        "Both lines through the origin at angle \\(\\alpha\\) to \\(y = m_1 x\\) satisfy \\(\\left(\\dfrac{m - m_1}{1 + m m_1}\\right)^2 = \\tan^2\\alpha\\). Put \\(m = \\dfrac{y}{x}\\), clear denominators, and the squared condition IS the joint equation — both roots at once, no need to find them.",
      definition:
        "- At \\(45^\\circ\\) to \\(3x + y = 0\\) (\\(m_1 = -3\\)): \\((m + 3)^2 = (1 - 3m)^2 \\Rightarrow 2m^2 - 3m - 2 = 0\\); with \\(m = \\dfrac{y}{x}\\): \\(2y^2 - 3xy - 2x^2 = 0\\), i.e. \\(2x^2 + 3xy - 2y^2 = 0\\).\n" +
        "- At \\(\\dfrac{\\pi}{4}\\) to \\(3x + 2y - 8 = 0\\) (\\(m_1 = -\\tfrac32\\)): \\(5m^2 - 24m - 5 = 0 \\Rightarrow 5x^2 + 24xy - 5y^2 = 0\\).\n" +
        "- At \\(\\dfrac{\\pi}{6}\\) to \\(3x + y - 6 = 0\\) (\\(m_1 = -3\\)): \\(3(m + 3)^2 = (1 - 3m)^2 \\Rightarrow 3m^2 - 12m - 13 = 0 \\Rightarrow 13x^2 + 12xy - 3y^2 = 0\\).\n" +
        "- Closed form: lines through the origin at angle \\(\\alpha\\) to \\(ax + by = 0\\) are \\((ax + by)^2 = \\tan^2\\alpha\\,(bx - ay)^2\\).\n" +
        "- Pair through \\((3, -2)\\) perpendicular to \\(5x^2 + 2xy - 3y^2 = 0\\): the given slopes are \\(\\tfrac53\\) and \\(-1\\), the perpendicular slopes \\(-\\tfrac35\\) and \\(1\\); lines \\(3x + 5y + 1 = 0\\) and \\(x - y - 5 = 0\\), product \\(3x^2 + 2xy - 5y^2 - 14x - 26y - 5 = 0\\). Shortcut for the homogeneous part: swap \\(a\\) and \\(b\\) and change the sign of \\(h\\).\n" +
        "- Right isosceles triangle at \\(Q(2, 1)\\) with hypotenuse on \\(2x + y = 3\\): the legs make \\(45^\\circ\\) with slope \\(-2\\), slopes \\(-\\tfrac13\\) and \\(3\\); through \\(Q\\): \\((x + 3y - 5)(3x - y - 5) = 3x^2 + 8xy - 3y^2 - 20x - 10y + 25 = 0\\).",
      formula: {
        label: "Pair at angle α to ax + by = 0",
        latex:
          "(ax + by)^2 = \\tan^2\\alpha\\,(bx - ay)^2 \\qquad \\text{perpendicular pair to } ax^2 + 2hxy + by^2: \\ bx^2 - 2hxy + ay^2 = 0",
      },
      authoredExample: {
        prompt: "Find the joint equation of the lines through the origin making \\(60^\\circ\\) with \\(x + y = 0\\).",
        steps: [
          "\\((x + y)^2 = 3(x - y)^2 \\Rightarrow x^2 + 2xy + y^2 = 3x^2 - 6xy + 3y^2\\).",
          "\\(2x^2 - 8xy + 2y^2 = 0 \\Rightarrow x^2 - 4xy + y^2 = 0\\).",
        ],
        answer: "\\(x^2 - 4xy + y^2 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the pair of lines through \\((1, 1)\\) perpendicular to the lines \\(x^2 - 5xy + 6y^2 = 0\\).",
        steps: [
          "Homogeneous perpendicular pair: \\(6x^2 + 5xy + y^2 = 0\\), i.e. \\((2x + y)(3x + y)\\); shift to \\((1, 1)\\): \\((2(x-1) + (y-1))(3(x-1) + (y-1))\\).",
          "\\((2x + y - 3)(3x + y - 4) = 6x^2 + 5xy + y^2 - 17x - 7y + 12 = 0\\).",
        ],
        answer: "\\(6x^2 + 5xy + y^2 - 17x - 7y + 12 = 0\\)",
      },
      practiceSet: [
        {
          prompt: "Slopes at \\(45^\\circ\\) to slope \\(-3\\)?",
          answer: "\\(2\\) and \\(-\\dfrac12\\)",
        },
        {
          prompt: "Joint equation of slopes \\(2\\) and \\(-\\dfrac12\\) through the origin?",
          answer: "\\(2x^2 + 3xy - 2y^2 = 0\\)",
        },
        {
          prompt: "Perpendicular pair to \\(5x^2 + 2xy - 3y^2 = 0\\) through the origin?",
          answer: "\\(3x^2 - 2xy - 5y^2 = 0\\)",
        },
        {
          prompt: "Legs of a right isosceles triangle make what angle with the hypotenuse?",
          answer: "\\(45^\\circ\\)",
        },
      ],
      pyqExampleId: "9dc8130c-d815-4af6-ba1b-2e2e9ec7eb15",
      traps: [
        {
          title: "Sign of the xy term after substituting m = y/x",
          body:
            "\\(5m^2 - 24m - 5 = 0\\) becomes \\(5y^2 - 24xy - 5x^2 = 0\\); multiplying by \\(-1\\) gives \\(5x^2 + 24xy - 5y^2 = 0\\). The three wrong options differ only in these signs; keep the substitution explicit.",
        },
      ],
    },

    // 3 — bisectors
    {
      kind: "formula" as const,
      slug: "cetpsl-bisectors-of-the-pair",
      name: "The Angle Bisectors: (x² − y²)/(a − b) = xy/h",
      intuition:
        "The two bisectors of the angles between the lines of \\(ax^2 + 2hxy + by^2 = 0\\) form their own pair, \\(h(x^2 - y^2) = (a - b)xy\\). It is always a perpendicular pair (the coefficients of \\(x^2\\) and \\(y^2\\) are \\(h\\) and \\(-h\\)).",
      definition:
        "- \\(x^2 - 4xy - 5y^2 = 0\\): \\(a = 1\\), \\(b = -5\\), \\(h = -2\\): \\(\\dfrac{x^2 - y^2}{6} = \\dfrac{xy}{-2} \\Rightarrow x^2 + 3xy - y^2 = 0\\).\n" +
        "- \\(2x^2 + 11xy + 3y^2 = 0\\): \\(a - b = -1\\), \\(h = \\tfrac{11}{2}\\): \\(-(x^2 - y^2) = \\dfrac{2xy}{11} \\Rightarrow 11x^2 + 2xy - 11y^2 = 0\\).\n" +
        "- \\(2h\\) is the coefficient of \\(xy\\), so \\(h\\) is HALF of it; forgetting the half is the standard error here.\n" +
        "- Bisectors of \\(x = 5\\) and \\(y = 3\\) (not through the origin) come from slopes \\(\\pm1\\) at the intersection, page 1 — the formula above is for pairs through the origin.",
      formula: {
        label: "Bisector pair",
        latex:
          "\\frac{x^2 - y^2}{a - b} = \\frac{xy}{h}",
      },
      authoredExample: {
        prompt: "Find the bisectors of the angles between the lines \\(3x^2 - 8xy - 3y^2 = 0\\).",
        steps: [
          "\\(a - b = 6\\), \\(h = -4\\): \\(\\dfrac{x^2 - y^2}{6} = \\dfrac{xy}{-4} \\Rightarrow 2x^2 + 3xy - 2y^2 = 0\\).",
        ],
        answer: "\\(2x^2 + 3xy - 2y^2 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the bisectors of the angles between \\(x^2 - y^2 = 0\\).",
        steps: [
          "\\(a - b = 2\\), \\(h = 0\\): \\(h(x^2 - y^2) = (a - b)xy \\Rightarrow 0 = 2xy\\).",
        ],
        answer: "\\(xy = 0\\) — the axes.",
      },
      practiceSet: [
        {
          prompt: "\\(h\\) for \\(2x^2 + 11xy + 3y^2 = 0\\)?",
          answer: "\\(\\dfrac{11}{2}\\)",
        },
        {
          prompt: "Bisectors of \\(x^2 - 4xy - 5y^2 = 0\\)?",
          answer: "\\(x^2 + 3xy - y^2 = 0\\)",
        },
        {
          prompt: "Are the bisectors of a pair always perpendicular?",
          answer: "Yes.",
        },
        {
          prompt: "Bisectors of \\(xy = 0\\)?",
          answer: "\\(x^2 - y^2 = 0\\)",
        },
      ],
      pyqExampleId: "ba0ba2b9-ffd9-4376-b1db-ea44ed3e43aa",
      traps: [
        {
          title: "Using the full xy coefficient as h",
          body:
            "For \\(2x^2 + 11xy + 3y^2 = 0\\), \\(h = \\dfrac{11}{2}\\). Using \\(11\\) gives \\(11x^2 + 4xy - 11y^2\\)-type answers that miss every option by a factor in the middle term.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Straight Line — the angle formula this page multiplies out",
      href: "/notes/mht-cet-maths/straight-line/cetsl-slope-angle-and-rotation",
    },
    {
      label: "Slopes of a Pair — m₁ + m₂ and m₁m₂",
      href: "/notes/mht-cet-maths/pair-of-straight-lines/cetpsl-slopes-of-a-pair",
    },
  ],
};
