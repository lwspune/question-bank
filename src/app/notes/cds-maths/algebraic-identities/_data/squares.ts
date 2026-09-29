import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AI_SQUARES_NOTE: SubtopicNote = {
  subtopicName: "Sums of Squares and Least Values",
  title: "Sums of Squares and Least Values",
  oneLineDefinition:
    "A square is never negative, so a sum of squares that equals zero forces each square to be zero, and t + 1/t is never less than 2 for positive t.",
  whyItMatters:
    "Twelve PYQs, five of them HARD, and many are data-sufficiency items. One fact runs the whole page: a square is never negative. It decides when numbers must be equal, gives the least value of expressions like a + 1/a, and settles most 'which is larger' comparisons.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsai-squares-vanish",
      name: "Sums of squares that vanish",
      intuition:
        "Squares cannot cancel each other because none of them is negative. So if a sum of squares is zero, each square is zero. Complete the squares first, then read off the values.",
      definition:
        "- If \\(p^2 + q^2 + \\cdots = 0\\) for real numbers, then \\(p = q = \\cdots = 0\\).\n" +
        "- \\(a^2 + b^2 + c^2 - ab - bc - ca = \\dfrac12\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right] \\ge 0\\), and it is \\(0\\) only when \\(a = b = c\\).\n" +
        "- \\(x^2 + y^2 - 2xy = (x - y)^2\\), so \\(\\dfrac xy + \\dfrac yx = 2\\) forces \\(x = y\\).\n" +
        "- An expression that looks lopsided can still be a sum of squares: expand a guess like \\((a - b)^2 + k(a - c)^2 + k(b - c)^2\\) and compare.",
      formula: {
        label: "Sum of squared differences",
        latex: "a^2 + b^2 + c^2 - ab - bc - ca = \\tfrac12\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]",
      },
      authoredExample: {
        prompt: "If \\(x^2 + y^2 - 4x + 6y + 13 = 0\\), find \\(x\\) and \\(y\\).",
        steps: [
          "Complete the squares: \\((x - 2)^2 + (y + 3)^2 = 0\\).",
          "Both squares must be zero.",
        ],
        answer: "\\(x = 2\\), \\(y = -3\\).",
      },
      selfCheckExample: {
        prompt: "Real numbers satisfy \\(a^2 + b^2 + c^2 = ab + bc + ca\\). What can you say about them?",
        steps: ["The difference is \\(\\dfrac12\\sum(a - b)^2 = 0\\), so every difference is zero."],
        answer: "\\(a = b = c\\).",
      },
      practiceSet: [
        { prompt: "\\((x - 1)^2 + (y - 2)^2 = 0\\). Find \\(x + y\\).", answer: "\\(3\\)" },
        { prompt: "\\(x^2 + 4y^2 = 4xy\\). Find \\(x : y\\).", answer: "\\(2 : 1\\)" },
        { prompt: "\\(a^2 + b^2 = 2ab\\). Then?", answer: "\\(a = b\\)" },
        { prompt: "\\(a^2 + b^2 + c^2 - ab - bc - ca\\) at \\((1, 2, 3)\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "1fd1c7d4-5626-4570-b778-5b50ab51c270", // 2023 (II) — squares plus 3(x² + y² + z²) = 0
      traps: [
        {
          title: "Read what the stem already gives",
          body:
            "If the stem says \\(a\\), \\(b\\), \\(c\\) are distinct, then \\(a^2 + b^2 + c^2 - ab - bc - ca\\) is already known to be positive, and no statement is needed. Data-sufficiency items set this on purpose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-least-value",
      name: "Least values: t + 1/t is at least 2",
      intuition:
        "For positive \\(t\\), \\(t + \\dfrac1t - 2 = \\left(\\sqrt t - \\dfrac{1}{\\sqrt t}\\right)^2 \\ge 0\\). So \\(t + \\dfrac1t\\) is smallest, equal to \\(2\\), at \\(t = 1\\). Split a fraction into pieces of that shape and the least value is read off.",
      definition:
        "- For \\(t > 0\\): \\(t + \\dfrac1t \\ge 2\\), with equality at \\(t = 1\\).\n" +
        "- More generally \\(pt + \\dfrac qt \\ge 2\\sqrt{pq}\\) for \\(p, q, t > 0\\) (AM–GM: \\(x + y \\ge 2\\sqrt{xy}\\)).\n" +
        "- Split: \\(\\dfrac{a^2 + ka + 1}{a} = a + k + \\dfrac1a \\ge k + 2\\).\n" +
        "- A product of brackets in different positive variables is least when each bracket is least.",
      formula: {
        label: "AM–GM",
        latex: "pt + \\dfrac{q}{t} \\ge 2\\sqrt{pq} \\quad (p, q, t > 0)",
      },
      authoredExample: {
        prompt: "Find the least value of \\(\\dfrac{x^2 + 4x + 4}{x}\\) for \\(x > 0\\).",
        steps: [
          "Split: \\(x + 4 + \\dfrac4x\\).",
          "\\(x + \\dfrac4x \\ge 2\\sqrt4 = 4\\), with equality at \\(x = 2\\).",
        ],
        answer: "\\(8\\).",
      },
      selfCheckExample: {
        prompt: "Find the least value of \\(9t + \\dfrac1t\\) for \\(t > 0\\).",
        steps: ["\\(9t + \\dfrac1t \\ge 2\\sqrt9 = 6\\), at \\(t = \\dfrac13\\)."],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Least value of \\(x + \\dfrac1x\\), \\(x > 0\\)?", answer: "\\(2\\)" },
        { prompt: "Least value of \\(x^2 + \\dfrac{1}{x^2}\\)?", answer: "\\(2\\)" },
        { prompt: "Least value of \\(\\left(a + \\dfrac1a\\right)\\left(b + \\dfrac1b\\right)\\), \\(a, b > 0\\)?", answer: "\\(4\\)" },
        { prompt: "Least value of \\(x + \\dfrac9x\\), \\(x > 0\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "d2d8d5e7-6aa4-4ac0-b251-047d0f7b1a3c", // 2024 (I) — product of two (a² + 3a + 1)/a brackets
      traps: [
        {
          title: "Only for positive values",
          body:
            "For negative \\(t\\), \\(t + \\dfrac1t \\le -2\\), so the expression has no least value on all reals. The condition \\(x > 0\\) in the stem is what makes the answer exist.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-comparisons",
      name: "Which is larger?",
      intuition:
        "To compare two expressions, look at the sign of their difference. If the difference factors into squares, it is never negative, and it is zero exactly where the squares vanish.",
      definition:
        "- Subtract and factor: if the difference is a square times something positive, the first is never smaller.\n" +
        "- 'Always greater' fails if the difference can be zero anywhere the question allows.\n" +
        "- For powers against exponentials (\\(2^n\\) and \\(n^2\\)), test the small cases one by one; the exponential wins from some point on.",
      formula: {
        label: "Mean of squares against square of mean",
        latex: "\\dfrac{a^2 + b^2}{2} - \\left(\\dfrac{a + b}{2}\\right)^2 = \\dfrac{(a - b)^2}{4} \\ge 0",
      },
      authoredExample: {
        prompt: "Which is larger, \\(\\dfrac{a^2 + b^2}{2}\\) or \\(\\left(\\dfrac{a + b}{2}\\right)^2\\)?",
        steps: [
          "Their difference is \\(\\dfrac{(a - b)^2}{4}\\).",
          "That is never negative and is zero only when \\(a = b\\).",
        ],
        answer: "\\(\\dfrac{a^2 + b^2}{2}\\), or equal when \\(a = b\\).",
      },
      selfCheckExample: {
        prompt: "For which natural numbers \\(n\\) is \\(2^n > n^2\\)?",
        steps: [
          "\\(n = 1\\): \\(2 > 1\\). \\(n = 2\\): \\(4 = 4\\). \\(n = 3\\): \\(8 < 9\\). \\(n = 4\\): \\(16 = 16\\).",
          "From \\(n = 5\\) on (\\(32 > 25\\)) the power of \\(2\\) stays ahead.",
        ],
        answer: "\\(n = 1\\) and every \\(n \\ge 5\\).",
      },
      practiceSet: [
        { prompt: "Sign of \\(x^2 - 2x + 2\\)?", answer: "Always positive" },
        { prompt: "Larger: \\(2^{10}\\) or \\(10^3\\)?", answer: "\\(2^{10} = 1024\\)" },
        { prompt: "Larger: \\(3^{40}\\) or \\(4^{30}\\)?", answer: "\\(3^{40}\\) (\\(81^{10} > 64^{10}\\))" },
        { prompt: "\\(a, b > 0\\). Larger: \\(\\dfrac{a + b}{2}\\) or \\(\\sqrt{ab}\\)?", answer: "\\(\\dfrac{a + b}{2}\\) (equal if \\(a = b\\))" },
      ],
      pyqExampleId: "eb5c25f0-daf3-4d19-b256-69c0748f4137", // 2019 (II) — 3^N against N³
      traps: [
        {
          title: "Greater or greater-or-equal?",
          body:
            "A difference like \\(x^2y^2(x^2 - y^2)^2\\) is never negative but is zero when \\(x = -y\\). If the question asks 'always greater', that single case answers no.",
        },
      ],
    },
  ],
};
