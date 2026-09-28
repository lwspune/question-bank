import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_ELIMINATION_NOTE: SubtopicNote = {
  subtopicName: "Eliminating θ and Substitution Chains",
  title: "Eliminating θ & Substitution Chains",
  oneLineDefinition:
    "When two equations define p and q through the same angle, find the relation between p and q that no longer mentions θ — by squaring and adding, by rewriting in sine and cosine, or by substituting a given relation into itself.",
  whyItMatters:
    "Thirty-four PYQs and the hardest page in the chapter — sixteen are HARD, and the 2026 papers set four of these as linked pairs. Each looks unique, but they use only four moves. Recognise which one the question is built on and the algebra is short.",
  concepts: [
    // C1 — square and add
    {
      kind: "formula" as const,
      slug: "cdstr-square-and-add",
      name: "Square and add",
      intuition:
        "If \\(x = a\\cos\\theta + b\\sin\\theta\\) and \\(y = a\\sin\\theta - b\\cos\\theta\\), squaring both makes the cross terms appear with opposite signs, and adding cancels them. What survives is a combination of \\(\\sin^2\\theta + \\cos^2\\theta\\), which is \\(1\\) — and \\(\\theta\\) has gone.",
      definition:
        "Square each given relation and add (or subtract) so the cross terms cancel:\n" +
        "- \\((a\\cos\\theta + b\\sin\\theta)^2 + (a\\sin\\theta - b\\cos\\theta)^2 = a^2 + b^2\\);\n" +
        "- with secant and tangent, subtract instead, so \\(\\sec^2\\theta - \\tan^2\\theta = 1\\) does the work: \\((m\\sec A + n\\tan A)^2 - (m\\tan A + n\\sec A)^2 = m^2 - n^2\\);\n" +
        "- relations like \\(p + q\\cot\\theta = 3\\operatorname{cosec}\\theta\\) and \\(q - p\\cot\\theta = 2\\operatorname{cosec}\\theta\\) square and add to \\((p^2 + q^2)(1 + \\cot^2\\theta) = 13\\operatorname{cosec}^2\\theta\\), so \\(p^2 + q^2 = 13\\).",
      formula: {
        label: "The cancelling squares",
        latex: "(a\\cos\\theta + b\\sin\\theta)^2 + (a\\sin\\theta - b\\cos\\theta)^2 = a^2 + b^2",
      },
      authoredExample: {
        prompt: "If \\(x = 3\\sec\\theta + 2\\tan\\theta\\) and \\(y = 3\\tan\\theta + 2\\sec\\theta\\), find \\(x^2 - y^2\\).",
        steps: [
          "\\(x^2 = 9\\sec^2\\theta + 12\\sec\\theta\\tan\\theta + 4\\tan^2\\theta\\), \\(y^2 = 9\\tan^2\\theta + 12\\sec\\theta\\tan\\theta + 4\\sec^2\\theta\\).",
          "Subtracting, the middle terms cancel: \\(x^2 - y^2 = 5\\sec^2\\theta - 5\\tan^2\\theta\\).",
          "That is \\(5(\\sec^2\\theta - \\tan^2\\theta) = 5\\).",
        ],
        answer: "\\(5\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x = r\\sin A\\cos B\\), \\(y = r\\sin A\\sin B\\) and \\(z = r\\cos A\\), find \\(x^2 + y^2 + z^2\\).",
        steps: [
          "\\(x^2 + y^2 = r^2\\sin^2 A(\\cos^2 B + \\sin^2 B) = r^2\\sin^2 A\\).",
          "Adding \\(z^2 = r^2\\cos^2 A\\) gives \\(r^2(\\sin^2 A + \\cos^2 A) = r^2\\).",
        ],
        answer: "\\(r^2\\).",
      },
      practiceSet: [
        { prompt: "\\(x = 2\\cos\\theta\\), \\(y = 2\\sin\\theta\\): \\(x^2 + y^2\\)?", answer: "\\(4\\)" },
        { prompt: "\\(x = \\sec\\theta\\), \\(y = \\tan\\theta\\): \\(x^2 - y^2\\)?", answer: "\\(1\\)" },
        { prompt: "\\(6 + 8\\tan\\theta = \\sec\\theta\\), \\(8 - 6\\tan\\theta = k\\sec\\theta\\): \\(k^2\\)?", answer: "\\(99\\)" },
        { prompt: "What must happen to the cross terms?", answer: "They must cancel on adding or subtracting" },
      ],
      pyqExampleId: "bada3928-9f5b-4226-bd30-264901a88659", // 2017 (I) — x = a cos + b sin, y = a sin − b cos
      traps: [
        {
          title: "Add for sine–cosine, subtract for secant–tangent",
          body:
            "With sine and cosine the useful identity is a sum (\\(\\sin^2 + \\cos^2 = 1\\)); with secant and tangent it is a difference (\\(\\sec^2 - \\tan^2 = 1\\)). Choosing the wrong operation leaves the cross terms doubled instead of cancelled.",
        },
      ],
    },

    // C2 — rewrite in sine and cosine, then combine
    {
      kind: "formula" as const,
      slug: "cdstr-reduce-then-combine",
      name: "Rewrite each quantity in sine and cosine, then combine",
      intuition:
        "\\(\\operatorname{cosec}\\theta - \\sin\\theta\\) looks awkward until it is written as one fraction: \\(\\dfrac{1 - \\sin^2\\theta}{\\sin\\theta} = \\dfrac{\\cos^2\\theta}{\\sin\\theta}\\). Do that to each given quantity, and their product, quotient or sum is a clean expression in \\(\\sin\\theta\\cos\\theta\\) — often a constant.",
      definition:
        "- \\(\\operatorname{cosec}\\theta - \\sin\\theta = \\dfrac{\\cos^2\\theta}{\\sin\\theta}\\) and \\(\\sec\\theta - \\cos\\theta = \\dfrac{\\sin^2\\theta}{\\cos\\theta}\\).\n" +
        "- Their product is \\(\\sin\\theta\\cos\\theta\\); their quotient is \\(\\cot^3\\theta\\) or \\(\\tan^3\\theta\\).\n" +
        "- \\(\\cot\\theta(1 \\pm \\sin\\theta) = \\cot\\theta \\pm \\cos\\theta\\): their product is \\(\\cot^2\\theta\\cos^2\\theta\\), their sum \\(2\\cot\\theta\\), their difference \\(2\\cos\\theta\\).\n" +
        "- If the given quantities are \\(p^3\\) and \\(q^3\\), expect answers in \\(p^2\\), \\(q^2\\) — that is, \\((\\sin\\theta\\cos\\theta)^{2/3}\\).",
      formula: {
        label: "The two reductions that recur",
        latex: "\\operatorname{cosec}\\theta - \\sin\\theta = \\frac{\\cos^2\\theta}{\\sin\\theta}, \\qquad \\sec\\theta - \\cos\\theta = \\frac{\\sin^2\\theta}{\\cos\\theta}",
      },
      authoredExample: {
        prompt: "If \\(\\operatorname{cosec}\\theta - \\sin\\theta = a\\) and \\(\\sec\\theta - \\cos\\theta = b\\), find \\(a^2b^2(a^2 + b^2 + 3)\\).",
        steps: [
          "\\(a = \\dfrac{\\cos^2\\theta}{\\sin\\theta}\\), \\(b = \\dfrac{\\sin^2\\theta}{\\cos\\theta}\\), so \\(ab = \\sin\\theta\\cos\\theta\\). Write \\(k = \\sin^2\\theta\\cos^2\\theta = a^2b^2\\).",
          "\\(a^2 + b^2 = \\dfrac{\\cos^6\\theta + \\sin^6\\theta}{k} = \\dfrac{1 - 3k}{k}\\).",
          "So \\(a^2b^2(a^2 + b^2 + 3) = k\\left(\\dfrac{1 - 3k}{k} + 3\\right) = 1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\cot\\theta + \\cos\\theta = m\\) and \\(\\cot\\theta - \\cos\\theta = n\\), find \\(m^2 - n^2\\) in terms of \\(mn\\).",
        steps: [
          "\\(m^2 - n^2 = (m + n)(m - n) = 2\\cot\\theta \\cdot 2\\cos\\theta = 4\\cot\\theta\\cos\\theta\\).",
          "\\(mn = \\cot^2\\theta - \\cos^2\\theta = \\cot^2\\theta\\cos^2\\theta\\), so \\(\\cot\\theta\\cos\\theta = \\sqrt{mn}\\) for acute \\(\\theta\\).",
          "Hence \\(m^2 - n^2 = 4\\sqrt{mn}\\).",
        ],
        answer: "\\(4\\sqrt{mn}\\).",
      },
      practiceSet: [
        { prompt: "\\((\\operatorname{cosec}\\theta - \\sin\\theta)(\\sec\\theta - \\cos\\theta)\\)?", answer: "\\(\\sin\\theta\\cos\\theta\\)" },
        { prompt: "\\(\\dfrac{\\sec\\theta - \\cos\\theta}{\\operatorname{cosec}\\theta - \\sin\\theta}\\)?", answer: "\\(\\tan^3\\theta\\)" },
        { prompt: "\\((\\operatorname{cosec}\\theta - \\sin\\theta)\\sin\\theta + (\\sec\\theta - \\cos\\theta)\\cos\\theta\\)?", answer: "\\(1\\)" },
        { prompt: "If \\(\\operatorname{cosec}\\theta - \\sin\\theta = p^3\\), \\(\\sec\\theta - \\cos\\theta = q^3\\): \\(\\tan\\theta\\)?", answer: "\\(\\dfrac{q}{p}\\)" },
      ],
      pyqExampleId: "6d53f931-ed29-47d2-abde-6b3f8459507d", // 2018 (II) — cot θ(1 + sin θ) = 4m, cot θ(1 − sin θ) = 4n
      traps: [
        {
          title: "Square roots need the sign of θ's quadrant",
          body:
            "\\(\\sqrt{\\cot^2\\theta\\cos^2\\theta}\\) is \\(\\cot\\theta\\cos\\theta\\) only when that product is positive. The stems that use it restrict \\(\\theta\\) to \\(0 < \\theta < 90^\\circ\\) for exactly this reason.",
        },
      ],
    },

    // C3 — substitution chains
    {
      kind: "formula" as const,
      slug: "cdstr-substitution-chains",
      name: "Substitution chains: sin x + sin²x = 1",
      intuition:
        "\\(\\sin x + \\sin^2 x = 1\\) says \\(\\sin x = 1 - \\sin^2 x = \\cos^2 x\\). That one swap is the whole question: every \\(\\cos^2 x\\) in the target can be replaced by \\(\\sin x\\), and the target turns back into the given relation. The powers — \\(\\cos^{12}\\), \\(\\cos^{10}\\) — are there to hide a binomial expansion.",
      definition:
        "- From \\(\\sin x + \\sin^2 x = 1\\): \\(\\sin x = \\cos^2 x\\). (From \\(\\cos x + \\cos^2 x = 1\\): \\(\\cos x = \\sin^2 x\\).)\n" +
        "- Look for \\((u + 1)^n\\) or \\(u^k(u + 1)^n\\) in the target: \\(\\cos^6 x + 3\\cos^4 x + 3\\cos^2 x + 1\\) is \\((\\cos^2 x + 1)^3\\), and \\(\\cos^{12} x + 3\\cos^{10} x + 3\\cos^8 x + \\cos^6 x = \\cos^6 x(\\cos^2 x + 1)^3\\).\n" +
        "- Then \\(\\cos^2 x(\\cos^2 x + 1) = \\sin x(\\sin x + 1) = 1\\).\n" +
        "- **Nested squares:** if \\(\\tan^8\\theta + \\cot^8\\theta = m\\), unwind with \\(t^2 + \\dfrac{1}{t^2} = \\left(t + \\dfrac1t\\right)^2 - 2\\), one level at a time.",
      formula: {
        label: "The swap and the grouping",
        latex: "\\sin x + \\sin^2 x = 1 \\Rightarrow \\sin x = \\cos^2 x, \\qquad \\cos^2 x(\\cos^2 x + 1) = 1",
      },
      authoredExample: {
        prompt: "If \\(\\cos x + \\cos^2 x = 1\\), find \\(\\sin^8 x + 2\\sin^6 x + \\sin^4 x\\).",
        steps: [
          "The condition gives \\(\\cos x = 1 - \\cos^2 x = \\sin^2 x\\).",
          "The target is \\(\\sin^4 x(\\sin^2 x + 1)^2 = \\big[\\sin^2 x(\\sin^2 x + 1)\\big]^2\\).",
          "Replace \\(\\sin^2 x\\) by \\(\\cos x\\): \\(\\big[\\cos x(\\cos x + 1)\\big]^2 = (\\cos x + \\cos^2 x)^2 = 1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\tan\\theta + \\cot\\theta = 3\\), find \\(\\tan^4\\theta + \\cot^4\\theta\\).",
        steps: [
          "\\(\\tan^2\\theta + \\cot^2\\theta = 3^2 - 2 = 7\\).",
          "\\(\\tan^4\\theta + \\cot^4\\theta = 7^2 - 2 = 47\\).",
        ],
        answer: "\\(47\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\sin x + \\sin^2 x = 1\\), then \\(\\cos^2 x + \\cos^4 x\\)?", answer: "\\(1\\)" },
        { prompt: "Factor \\(u^3 + 3u^2 + 3u + 1\\)?", answer: "\\((u + 1)^3\\)" },
        { prompt: "If \\(t + \\dfrac1t = 2\\), then \\(t^8 + \\dfrac{1}{t^8}\\)?", answer: "\\(2\\)" },
        { prompt: "If \\(\\cos x + \\cos^2 x = 1\\), then \\(\\sin^2 x + \\sin^4 x\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "6b65b2dd-0b33-4433-8d42-ca43c13828ad", // 2018 (II) — sin²x + sin x = 1, cos¹² + 3cos¹⁰ + 3cos⁸ + cos⁶
      traps: [
        {
          title: "Swap the square, not the first power",
          body:
            "\\(\\sin x + \\sin^2 x = 1\\) gives \\(\\sin x = \\cos^2 x\\) — it does **not** give \\(\\sin^2 x = \\cos x\\). That second form belongs to the cosine version of the question, and the two are set in alternate years.",
        },
      ],
    },

    // C4 — solve for sin² from a weighted equation
    {
      kind: "formula" as const,
      slug: "cdstr-solve-for-sin-squared",
      name: "Solving p sin²α + q cos²α = m for tan²α",
      intuition:
        "\\(p\\sin^2\\alpha + q\\cos^2\\alpha = m\\) is a weighted average of \\(p\\) and \\(q\\) with weights \\(\\sin^2\\alpha\\) and \\(\\cos^2\\alpha\\). Replace \\(\\cos^2\\alpha\\) by \\(1 - \\sin^2\\alpha\\), and \\(\\sin^2\\alpha\\) comes out as a simple fraction; \\(\\cos^2\\alpha\\) and \\(\\tan^2\\alpha\\) follow.",
      definition:
        "From \\(p\\sin^2\\alpha + q\\cos^2\\alpha = m\\):\n" +
        "- \\(\\sin^2\\alpha = \\dfrac{m - q}{p - q}\\) and \\(\\cos^2\\alpha = \\dfrac{p - m}{p - q}\\);\n" +
        "- so \\(\\tan^2\\alpha = \\dfrac{m - q}{p - m}\\).\n" +
        "Ratios of sines and cosines work the same way: if \\(\\sin\\alpha = k\\sin\\beta\\) and \\(\\cos\\alpha = l\\cos\\beta\\), substitute both into \\(\\sin^2\\alpha + \\cos^2\\alpha = 1\\) to find \\(\\sin^2\\beta\\).",
      formula: {
        label: "The weighted-average solution",
        latex: "p\\sin^2\\alpha + q\\cos^2\\alpha = m \\;\\Rightarrow\\; \\tan^2\\alpha = \\frac{m - q}{p - m}",
      },
      authoredExample: {
        prompt: "If \\(5\\sin^2\\alpha + 2\\cos^2\\alpha = 3\\), find \\(\\tan^2\\alpha\\).",
        steps: [
          "Replace \\(\\cos^2\\alpha\\): \\(5\\sin^2\\alpha + 2 - 2\\sin^2\\alpha = 3\\), so \\(\\sin^2\\alpha = \\dfrac13\\).",
          "\\(\\cos^2\\alpha = \\dfrac23\\).",
          "\\(\\tan^2\\alpha = \\dfrac{1/3}{2/3} = \\dfrac12\\) — matching \\(\\dfrac{m - q}{p - m} = \\dfrac{3 - 2}{5 - 3}\\).",
        ],
        answer: "\\(\\dfrac12\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin\\alpha = 2\\sin\\beta\\) and \\(\\cos\\alpha = \\dfrac{1}{\\sqrt2}\\cos\\beta\\), find \\(\\sin^2\\beta\\).",
        steps: [
          "\\(\\sin^2\\alpha + \\cos^2\\alpha = 1\\) gives \\(4\\sin^2\\beta + \\dfrac12\\cos^2\\beta = 1\\).",
          "With \\(s = \\sin^2\\beta\\): \\(4s + \\dfrac12(1 - s) = 1\\), so \\(\\dfrac72 s = \\dfrac12\\).",
          "\\(s = \\dfrac17\\).",
        ],
        answer: "\\(\\dfrac17\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^2\\alpha\\) if \\(3\\sin^2\\alpha + \\cos^2\\alpha = 2\\)?", answer: "\\(\\dfrac12\\)" },
        { prompt: "\\(\\tan^2\\alpha\\) for that same equation?", answer: "\\(1\\)" },
        { prompt: "If \\(\\alpha\\) and \\(\\beta\\) are complementary, \\(\\sin^2\\beta\\) equals?", answer: "\\(\\cos^2\\alpha\\)" },
        { prompt: "Formula for \\(\\cos^2\\alpha\\) from \\(p\\sin^2\\alpha + q\\cos^2\\alpha = m\\)?", answer: "\\(\\dfrac{p - m}{p - q}\\)" },
      ],
      pyqExampleId: "542da01b-727b-49d9-a690-7519bb2b441f", // 2026 (I) — p sin²α + q cos²α = m, find tan²α
      traps: [
        {
          title: "Keep the sign pattern of the fraction",
          body:
            "\\(\\tan^2\\alpha = \\dfrac{m - q}{p - m}\\). The options include \\(\\dfrac{m - p}{q - m}\\) and \\(\\dfrac{m - q}{m - p}\\), which differ by a sign in the denominator. A squared tangent cannot be negative, so check your answer's sign with sample values (\\(p > m > q\\)).",
        },
      ],
    },
  ],
};
