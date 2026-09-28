import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_MAX_MIN_NOTE: SubtopicNote = {
  subtopicName: "Maximum, Minimum and Impossible Values",
  title: "Maximum, Minimum & Impossible Values",
  oneLineDefinition:
    "The greatest and least values of trigonometric expressions, and the equations that can never hold — all settled by the range of a ratio, by t + 1/t ≥ 2, or by a sin θ + b cos θ ≤ √(a² + b²).",
  whyItMatters:
    "Thirty-seven PYQs — the largest page in the chapter and one of its two hardest, with thirteen HARD. Four tools cover all of them. The hard ones are hard only because the tool is disguised: an expression that is secretly t + 1/t, or an equation that is secretly at its maximum.",
  concepts: [
    // C1 — linear in sin² or sin
    {
      kind: "formula" as const,
      slug: "cdstr-bounded-ratios",
      name: "Expressions linear in sin²θ or sin θ",
      intuition:
        "\\(9\\sin^2\\theta + 16\\cos^2\\theta\\) looks like two moving parts, but \\(\\cos^2\\theta = 1 - \\sin^2\\theta\\) turns it into \\(16 - 7\\sin^2\\theta\\): one moving part, \\(\\sin^2\\theta\\), which runs from \\(0\\) to \\(1\\). The extremes are then the two ends.",
      definition:
        "- \\(a\\sin^2\\theta + b\\cos^2\\theta = b + (a - b)\\sin^2\\theta\\), so it runs between \\(a\\) and \\(b\\).\n" +
        "- \\(p + q\\sin\\theta\\) runs from \\(p - |q|\\) to \\(p + |q|\\) — or over a smaller interval if \\(\\theta\\) is restricted.\n" +
        "- **Restricted range:** on \\(0 \\le \\theta \\le \\dfrac{\\pi}{2}\\), \\(\\sin\\theta\\) runs over \\([0, 1]\\), not \\([-1, 1]\\). Recompute the ends.",
      formula: {
        label: "The two ends",
        latex: "a\\sin^2\\theta + b\\cos^2\\theta \\in [\\min(a,b),\\, \\max(a,b)]",
      },
      authoredExample: {
        prompt: "Find the greatest and least values of \\(5\\cos^2\\theta + 2\\sin^2\\theta\\).",
        steps: [
          "Write it as \\(2 + 3\\cos^2\\theta\\).",
          "\\(\\cos^2\\theta\\) runs from \\(0\\) to \\(1\\).",
          "So the expression runs from \\(2\\) to \\(5\\).",
        ],
        answer: "Greatest \\(5\\), least \\(2\\).",
      },
      selfCheckExample: {
        prompt: "Find the least value of \\(7 - 3\\sin\\theta\\) for \\(0 \\le \\theta \\le \\dfrac{\\pi}{2}\\).",
        steps: [
          "The expression is smallest when \\(\\sin\\theta\\) is largest.",
          "On this range \\(\\sin\\theta\\) reaches \\(1\\), at \\(\\theta = \\dfrac{\\pi}{2}\\).",
          "Least value: \\(7 - 3 = 4\\).",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "Maximum of \\(2\\sin\\theta + 1\\)?", answer: "\\(3\\)" },
        { prompt: "Least value of \\(3\\sin^2\\theta + 5\\cos^2\\theta\\)?", answer: "\\(3\\)" },
        { prompt: "Range of \\(\\sin^2\\theta + 4\\)?", answer: "\\([4, 5]\\)" },
        { prompt: "Maximum of \\(1 - \\cos^2\\theta\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "b1d7ff3b-99ad-4b10-b51c-7545c29a17b2", // 2020 (II) — least value of 9 sin²θ + 16 cos²θ
      traps: [
        {
          title: "A restricted range moves the ends",
          body:
            "On \\(0 \\le \\theta \\le \\dfrac{\\pi}{2}\\), \\(\\sin\\theta\\) never goes below \\(0\\). The minimum of \\(6 + 4\\sin\\theta\\) there is \\(6\\), not \\(2\\). Always take the ends of the ratio over the **stated** range.",
        },
      ],
    },

    // C2 — t + 1/t ≥ 2 and AM–GM
    {
      kind: "formula" as const,
      slug: "cdstr-am-gm-bound",
      name: "t + 1/t ≥ 2, and weighted forms by AM–GM",
      intuition:
        "A positive number plus its reciprocal is never below \\(2\\), because \\(t + \\dfrac1t - 2 = \\dfrac{(t - 1)^2}{t}\\). Trig ratios come in reciprocal pairs — \\(\\tan\\) and \\(\\cot\\), \\(\\sin\\) and \\(\\operatorname{cosec}\\) — so this one inequality settles a large share of the page.",
      definition:
        "- For \\(t > 0\\): \\(t + \\dfrac1t \\ge 2\\), with equality only at \\(t = 1\\).\n" +
        "- **AM–GM:** for \\(x, y > 0\\), \\(x + y \\ge 2\\sqrt{xy}\\). So \\(a\\tan^2\\theta + b\\cot^2\\theta \\ge 2\\sqrt{ab}\\).\n" +
        "- \\(a\\sec^2\\theta + b\\operatorname{cosec}^2\\theta = (a + b) + a\\tan^2\\theta + b\\cot^2\\theta \\ge a + b + 2\\sqrt{ab} = (\\sqrt a + \\sqrt b)^2\\).\n" +
        "- **Equality** needs the two terms equal. If the range forbids that (open interval ending at \\(t = 1\\)), the bound is not reached, and the answer is 'greater than', not 'at least'.",
      formula: {
        label: "The bounds",
        latex: "t + \\frac1t \\ge 2, \\qquad a\\sec^2\\theta + b\\operatorname{cosec}^2\\theta \\ge (\\sqrt a + \\sqrt b)^2",
      },
      authoredExample: {
        prompt: "Find the minimum of \\(16\\sec^2\\theta + 9\\operatorname{cosec}^2\\theta\\).",
        steps: [
          "Write \\(\\sec^2\\theta = 1 + \\tan^2\\theta\\), \\(\\operatorname{cosec}^2\\theta = 1 + \\cot^2\\theta\\): the expression is \\(25 + 16\\tan^2\\theta + 9\\cot^2\\theta\\).",
          "By AM–GM, \\(16\\tan^2\\theta + 9\\cot^2\\theta \\ge 2\\sqrt{144} = 24\\), reached when \\(\\tan^2\\theta = \\dfrac34\\).",
          "Minimum: \\(25 + 24 = 49\\), which is \\((4 + 3)^2\\).",
        ],
        answer: "\\(49\\).",
      },
      selfCheckExample: {
        prompt: "Find the minimum of \\(4\\tan^2\\theta + 25\\cot^2\\theta\\).",
        steps: [
          "AM–GM: \\(4\\tan^2\\theta + 25\\cot^2\\theta \\ge 2\\sqrt{4 \\times 25} = 20\\).",
          "Equality when \\(4\\tan^2\\theta = 25\\cot^2\\theta\\), i.e. \\(\\tan^4\\theta = \\dfrac{25}{4}\\), which is attainable.",
        ],
        answer: "\\(20\\).",
      },
      practiceSet: [
        { prompt: "Minimum of \\(\\tan\\theta + \\cot\\theta\\) for acute \\(\\theta\\)?", answer: "\\(2\\)" },
        { prompt: "Minimum of \\(\\sec^2\\theta + \\operatorname{cosec}^2\\theta\\)?", answer: "\\(4\\)" },
        { prompt: "Can \\(\\cos\\theta + \\sec\\theta = 1.5\\)?", answer: "No", method: "it is at least 2 or at most −2" },
        { prompt: "Minimum of \\(\\cos^2 x + \\sec^2 x\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "d3d02a81-51cf-4726-acd4-d1a2df1990c4", // 2017 (I) — minimum of 9 tan²θ + 4 cot²θ
      traps: [
        {
          title: "On an open interval the bound may not be reached",
          body:
            "For \\(0 < x < \\dfrac{\\pi}{2}\\), \\(\\sin x + \\operatorname{cosec} x\\) would equal \\(2\\) only at \\(\\sin x = 1\\), which the open interval excludes. So the correct statement is '\\(> 2\\)', and the option '\\(\\ge 2\\)' is the trap.",
        },
      ],
    },

    // C3 — quadratic in sin or cos
    {
      kind: "formula" as const,
      slug: "cdstr-quadratic-in-ratio",
      name: "Quadratics in sin θ or cos²θ",
      intuition:
        "\\(\\sin^2\\theta + \\cos^4\\theta\\) is not linear in anything — but with \\(c = \\cos^2\\theta\\) it is \\(c^2 - c + 1\\), a parabola in \\(c\\). Complete the square to find its lowest point, then remember that \\(c\\) only runs over \\([0, 1]\\), so the highest value sits at an end.",
      definition:
        "- Substitute one variable: \\(s = \\sin\\theta\\) in \\([-1, 1]\\), or \\(c = \\cos^2\\theta\\) in \\([0, 1]\\).\n" +
        "- Complete the square: \\(as^2 + bs + k = a\\left(s + \\dfrac{b}{2a}\\right)^2 + \\ldots\\).\n" +
        "- The extreme is at the vertex **if the vertex lies in the variable's range**; otherwise at the nearer end. Always check the ends too.",
      formula: {
        label: "Vertex, then ends",
        latex: "c^2 - c + 1 = \\left(c - \\tfrac12\\right)^2 + \\tfrac34, \\quad c \\in [0, 1]",
      },
      authoredExample: {
        prompt: "Find the greatest value of \\(6\\sin\\theta - 3\\sin^2\\theta\\).",
        steps: [
          "With \\(s = \\sin\\theta\\): \\(6s - 3s^2 = 3 - 3(s - 1)^2\\).",
          "The vertex \\(s = 1\\) lies in \\([-1, 1]\\).",
          "Greatest value: \\(3\\), at \\(\\theta = 90^\\circ\\).",
        ],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "Find the range of \\(\\cos^2\\theta + \\sin^4\\theta\\).",
        steps: [
          "With \\(s = \\sin^2\\theta\\) in \\([0, 1]\\): \\(1 - s + s^2 = \\left(s - \\dfrac12\\right)^2 + \\dfrac34\\).",
          "Least at \\(s = \\dfrac12\\): \\(\\dfrac34\\). Greatest at the ends \\(s = 0\\) or \\(1\\): \\(1\\).",
        ],
        answer: "\\(\\left[\\dfrac34, 1\\right]\\).",
      },
      practiceSet: [
        { prompt: "Least value of \\(\\sin^2\\theta - \\sin\\theta\\)?", answer: "\\(-\\dfrac14\\)" },
        { prompt: "Maximum of \\(4\\sin\\theta - 2\\sin^2\\theta\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\sin^4\\theta + \\cos^4\\theta - 2\\sin^2\\theta\\cos^2\\theta\\) in one ratio?", answer: "\\(\\cos^2 2\\theta\\)" },
        { prompt: "Its minimum?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "953a033a-3adf-49c9-9606-5515dada6b13", // 2016 (II) — A = sin²θ + cos⁴θ, its range
      traps: [
        {
          title: "The vertex may lie outside the variable's range",
          body:
            "For \\(s^2 + 4s\\) with \\(s = \\sin\\theta\\), the vertex \\(s = -2\\) is not a possible sine. The minimum is then at the nearer end, \\(s = -1\\), giving \\(-3\\) — not the vertex value \\(-4\\).",
        },
      ],
    },

    // C4 — a sin + b cos ≤ √(a² + b²)
    {
      kind: "formula" as const,
      slug: "cdstr-a-sin-b-cos-extreme",
      name: "a sin θ + b cos θ is at most √(a² + b²)",
      intuition:
        "\\(a\\sin\\theta + b\\cos\\theta\\) is a single sine wave of height \\(\\sqrt{a^2 + b^2}\\). So when a question says \\(11\\sin\\theta + 60\\cos\\theta = 61\\) and \\(61 = \\sqrt{11^2 + 60^2}\\), the equation is sitting exactly at its maximum — which pins \\(\\sin\\theta\\) and \\(\\cos\\theta\\) completely.",
      definition:
        "- \\(-\\sqrt{a^2 + b^2} \\le a\\sin\\theta + b\\cos\\theta \\le \\sqrt{a^2 + b^2}\\).\n" +
        "- If \\(a\\sin\\theta + b\\cos\\theta = \\sqrt{a^2 + b^2}\\), then \\(\\sin\\theta = \\dfrac{a}{\\sqrt{a^2 + b^2}}\\) and \\(\\cos\\theta = \\dfrac{b}{\\sqrt{a^2 + b^2}}\\) — nothing else fits.\n" +
        "- If the given value exceeds \\(\\sqrt{a^2 + b^2}\\), the equation has no solution.\n" +
        "- In particular \\(\\sin\\theta + \\cos\\theta \\le \\sqrt2\\).",
      formula: {
        label: "Amplitude bound",
        latex: "|a\\sin\\theta + b\\cos\\theta| \\le \\sqrt{a^2 + b^2}",
      },
      visualizationSlug: "trig-amplitude-phase",
      authoredExample: {
        prompt: "If \\(8\\sin\\theta + 15\\cos\\theta = 17\\), find \\(\\tan\\theta + \\cot\\theta\\).",
        steps: [
          "\\(\\sqrt{8^2 + 15^2} = 17\\), so the equation is at its maximum.",
          "Hence \\(\\sin\\theta = \\dfrac{8}{17}\\), \\(\\cos\\theta = \\dfrac{15}{17}\\).",
          "\\(\\tan\\theta + \\cot\\theta = \\dfrac{8}{15} + \\dfrac{15}{8} = \\dfrac{64 + 225}{120} = \\dfrac{289}{120}\\).",
        ],
        answer: "\\(\\dfrac{289}{120}\\).",
      },
      selfCheckExample: {
        prompt: "Does \\(2\\sin\\theta + 3\\cos\\theta = 4\\) have a solution?",
        steps: [
          "The maximum is \\(\\sqrt{4 + 9} = \\sqrt{13} \\approx 3.61\\).",
          "\\(4\\) exceeds it, so no angle works.",
        ],
        answer: "No.",
      },
      practiceSet: [
        { prompt: "Maximum of \\(5\\sin\\theta + 12\\cos\\theta\\)?", answer: "\\(13\\)" },
        { prompt: "Maximum of \\(\\sin\\theta + \\cos\\theta\\)?", answer: "\\(\\sqrt2\\)" },
        { prompt: "If \\(3\\sin\\theta + 4\\cos\\theta = 5\\), then \\(\\tan\\theta\\)?", answer: "\\(\\dfrac34\\)" },
        { prompt: "Least value of \\(6\\sin\\theta - 8\\cos\\theta\\)?", answer: "\\(-10\\)" },
      ],
      pyqExampleId: "8255d7b4-bba7-4f1f-a5a1-9dda5d732d37", // 2026 (II) — 5 sin θ + 12 cos θ = 13
      traps: [
        {
          title: "Check whether the given value IS the maximum",
          body:
            "Before squaring and solving a quadratic, compute \\(\\sqrt{a^2 + b^2}\\). If it equals the right-hand side, the sine and cosine are read off immediately; solving the long way wastes minutes and invites a spurious root.",
        },
      ],
    },

    // C5 — impossible values
    {
      kind: "formula" as const,
      slug: "cdstr-impossible-values",
      name: "Equations that can never hold",
      intuition:
        "Many statements ask whether something like \\(\\sin\\theta = x + \\dfrac1x\\) is possible. The right side is at least \\(2\\) in size, and a sine is at most \\(1\\), so it never is. Put a bound on each side, and see whether the two ranges overlap.",
      definition:
        "- \\(\\left|x + \\dfrac1x\\right| \\ge 2\\) for every real \\(x \\ne 0\\), so it can never equal a sine or cosine.\n" +
        "- \\(\\dfrac{a + b}{2\\sqrt{ab}} \\ge 1\\) for \\(a, b > 0\\), with equality only at \\(a = b\\); so it can equal \\(\\sin\\theta\\) only if \\(a = b\\).\n" +
        "- \\(\\dfrac{(x + y)^2}{4xy} > 1\\) for positive unequal \\(x, y\\), so it cannot be \\(\\sin^2\\theta\\).\n" +
        "- A product like \\((\\sin\\alpha + 2)(\\sin\\alpha - 2)\\) is never zero: \\(\\pm 2\\) is out of reach.\n" +
        "- A quadratic \\(x^2 + y^2 - 2xy\\sin^2\\theta = 0\\) has real solutions only when its discriminant is not negative, which forces \\(x = y\\).",
      formula: {
        label: "The key bound",
        latex: "\\left|x + \\frac1x\\right| \\ge 2, \\qquad |\\sin\\theta|, |\\cos\\theta| \\le 1",
      },
      authoredExample: {
        prompt: "For how many values of \\(\\theta\\) is \\((\\cos\\theta - 3)(\\cos\\theta + 1.5) = 0\\)?",
        steps: [
          "The product is zero only if \\(\\cos\\theta = 3\\) or \\(\\cos\\theta = -1.5\\).",
          "Both lie outside \\([-1, 1]\\).",
          "So no value of \\(\\theta\\) makes it zero.",
        ],
        answer: "None.",
      },
      selfCheckExample: {
        prompt: "Is \\(\\cos^2\\theta = \\dfrac{(p + q)^2}{4pq}\\) possible for positive unequal \\(p\\) and \\(q\\)?",
        steps: [
          "\\((p + q)^2 - 4pq = (p - q)^2 > 0\\) when \\(p \\ne q\\).",
          "So the right side exceeds \\(1\\), and \\(\\cos^2\\theta\\) never does.",
        ],
        answer: "No.",
      },
      practiceSet: [
        { prompt: "Can \\(\\sin\\theta = 1.01\\)?", answer: "No" },
        { prompt: "Can \\(\\sin\\theta + \\cos\\theta = 2\\)?", answer: "No", method: "it is at most \\(\\sqrt2\\)" },
        { prompt: "Can \\(\\sec\\theta = \\dfrac{a^2 + b^2}{2ab}\\) for positive \\(a \\ne b\\)?", answer: "Yes", method: "the right side exceeds 1" },
        { prompt: "Least size of \\(x + \\dfrac1x\\) for real \\(x\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "abe88b35-60f9-48d9-9f74-7da677d154ef", // 2020 (II) — sin θ = x + 1/x and cos θ = x + 1/x
      traps: [
        {
          title: "A secant CAN exceed 1 — the bound runs the other way",
          body:
            "\\(\\dfrac{a^2 + b^2}{2ab} \\ge 1\\) can never be a sine or cosine, but it is a perfectly good secant or cosecant. Match the bound to the ratio: sine and cosine live inside \\([-1, 1]\\), secant and cosecant outside it.",
        },
      ],
    },
  ],
};
