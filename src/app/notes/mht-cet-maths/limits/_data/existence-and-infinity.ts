import type { SubtopicNote } from "@/app/notes/_types";

export const EXISTENCE_AND_INFINITY_NOTE: SubtopicNote = {
  subtopicName: "Limits — Existence, One-Sided Limits and Limits at Infinity",
  title: "Limits — Existence, One-Sided Limits and Limits at Infinity",
  oneLineDefinition:
    "A limit is where a function is heading, not where it is — so it can fail to exist when the two sides disagree, and it can be asked as x runs off to infinity.",
  whyItMatters:
    "This is the foundation block: 9 PYQs at 44% HARD, the gentlest page of the chapter, but every later page assumes it. " +
    "Two question types recur almost verbatim across sittings — a modulus or greatest-integer expression near 0 where the left and right sides must be compared, " +
    "and a ratio at infinity that is settled by the leading powers alone. Learn the one-sided habit here, because the continuity pages use it on every question.",
  concepts: [
    // 1 — foundation
    {
      kind: "formula" as const,
      slug: "cetlim-what-a-limit-says",
      name: "What a Limit Says",
      intuition:
        "\\(\\lim_{x\\to a} f(x) = L\\) is a statement about the approach, not the arrival: as \\(x\\) gets close to \\(a\\) — from either side, never equal to \\(a\\) — the values \\(f(x)\\) get close to \\(L\\). " +
        "Whether \\(f(a)\\) exists, or what it equals, is a separate question.",
      definition:
        "- \\(\\lim_{x\\to a} f(x) = L\\) means \\(f(x)\\) can be made as close to \\(L\\) as we like by taking \\(x\\) close enough to \\(a\\), with \\(x \\neq a\\).\n" +
        "- The value \\(f(a)\\) plays **no part**: it may be different from \\(L\\), or not exist at all.\n" +
        "- **Algebra of limits**: limits of sums, differences, products and quotients are the sums, differences, products and quotients of the limits — provided each limit exists and a quotient's denominator limit is not \\(0\\).\n" +
        "- **Direct substitution** is legal wherever it makes sense: polynomials everywhere, rational functions where the denominator is non-zero, \\(\\sin\\), \\(\\cos\\), \\(e^x\\), \\(\\log\\) and roots at any point of their domain.\n" +
        "- The whole chapter is about the cases where substitution fails — \\(0/0\\), \\(\\infty/\\infty\\), \\(\\infty-\\infty\\), \\(1^\\infty\\) — and the tools that resolve each.",
      formula: {
        label: "Algebra of limits",
        latex:
          "\\lim (f \\pm g) = \\lim f \\pm \\lim g \\qquad \\lim (fg) = \\lim f \\cdot \\lim g \\qquad \\lim \\frac{f}{g} = \\frac{\\lim f}{\\lim g}\\ \\ (\\lim g \\neq 0)",
        symbols: [
          { symbol: "\\(\\lim\\)", meaning: "all limits taken as \\(x \\to a\\), each assumed to exist" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 2} \\dfrac{x^3 - 3x + 1}{x + 3}\\).",
        steps: [
          "Both numerator and denominator are polynomials, and the denominator at \\(x = 2\\) is \\(5 \\neq 0\\), so direct substitution is legal.",
          "Numerator at \\(2\\): \\(8 - 6 + 1 = 3\\).",
          "The limit is the quotient of the two values: \\(\\dfrac{3}{5}\\).",
        ],
        answer: "\\(\\dfrac{3}{5}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 1}(x^2 + 2x) = ?\\)",
          answer: "\\(3\\)",
          method: "Polynomial — substitute.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\cos x}{1 + x} = ?\\)",
          answer: "\\(1\\)",
          method: "Denominator is \\(1 \\neq 0\\) at \\(0\\); substitute.",
        },
        {
          prompt: "\\(\\lim_{x\\to 3}\\sqrt{x + 1} = ?\\)",
          answer: "\\(2\\)",
          method: "\\(3\\) is inside the domain of the root; substitute.",
        },
        {
          prompt: "\\(\\lim_{x\\to -1}\\dfrac{x^2 - 1}{x + 2} = ?\\)",
          answer: "\\(0\\)",
          method: "Denominator is \\(1\\) at \\(-1\\); numerator is \\(0\\).",
        },
      ],
      traps: [
        {
          title: "The value at the point is not the limit",
          body:
            "\\(f(x) = \\dfrac{x^2}{x}\\) has no value at \\(x = 0\\), yet \\(\\lim_{x\\to 0} f(x) = 0\\). " +
            "Conversely a function can be defined at a point with a value that has nothing to do with its limit there. Keep the two questions separate — continuity is precisely the case where they agree.",
        },
      ],
    },

    // 2 — one-sided limits
    {
      kind: "formula" as const,
      slug: "cetlim-one-sided-limits",
      name: "One-Sided Limits and When a Limit Exists",
      intuition:
        "Walk towards \\(a\\) from the left and from the right. If the two walks arrive at the same height, that height is the limit; if not, there is no limit at all. " +
        "A modulus is the usual reason the two walks differ, because \\(|x|\\) means \\(x\\) on one side of \\(0\\) and \\(-x\\) on the other.",
      definition:
        "- **Left-hand limit** \\(\\lim_{x\\to a^-} f(x)\\): the approach through values \\(x < a\\). **Right-hand limit** \\(\\lim_{x\\to a^+} f(x)\\): through values \\(x > a\\).\n" +
        "- The limit **exists** exactly when both one-sided limits exist and are **equal**; their common value is the limit.\n" +
        "- Near \\(0\\): \\(|x| = x\\) for \\(x > 0\\) and \\(|x| = -x\\) for \\(x < 0\\). Near \\(a\\): \\(|x - a| = x - a\\) on the right of \\(a\\) and \\(-(x - a)\\) on the left.\n" +
        "- Method: whenever a stem contains \\(|\\cdot|\\), \\([\\cdot]\\), a piecewise definition or a square root of something that changes sign, **compute the two sides separately** before saying anything.",
      formula: {
        label: "Existence of a limit",
        latex:
          "\\lim_{x\\to a} f(x) = L \\iff \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L",
      },
      visualizationSlug: "lim-one-sided-approach",
      authoredExample: {
        prompt: "Does \\(\\lim_{x\\to 2}\\dfrac{|x - 2|}{x - 2}\\) exist?",
        steps: [
          "Right of \\(2\\): \\(|x - 2| = x - 2\\), so the ratio is \\(1\\) for every \\(x > 2\\). Right-hand limit \\(= 1\\).",
          "Left of \\(2\\): \\(|x - 2| = -(x - 2)\\), so the ratio is \\(-1\\) for every \\(x < 2\\). Left-hand limit \\(= -1\\).",
          "\\(1 \\neq -1\\): the two sides disagree.",
        ],
        answer: "The limit does not exist.",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{x + |x|}{x}\\), or show that it does not exist.",
        steps: [
          "Right of \\(0\\): \\(|x| = x\\), so \\(\\dfrac{x + x}{x} = 2\\). Right-hand limit \\(= 2\\).",
          "Left of \\(0\\): \\(|x| = -x\\), so \\(\\dfrac{x - x}{x} = 0\\). Left-hand limit \\(= 0\\).",
          "The one-sided limits differ.",
        ],
        answer: "Does not exist (right-hand limit \\(2\\), left-hand limit \\(0\\)).",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0^+}\\dfrac{|x|}{x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\(|x| = x\\) on the right.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^-}\\dfrac{|x|}{x} = ?\\)",
          answer: "\\(-1\\)",
          method: "\\(|x| = -x\\) on the left.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}|x| = ?\\)",
          answer: "\\(0\\)",
          method: "Both sides give \\(0\\); the modulus itself is continuous.",
        },
        {
          prompt: "\\(\\lim_{x\\to 3^-}\\dfrac{x - 3}{|x - 3|} = ?\\)",
          answer: "\\(-1\\)",
          method: "Left of \\(3\\), \\(|x - 3| = 3 - x\\).",
        },
      ],
      pyqExampleId: "cdb2f4e5-881a-4916-9ed8-7326ecbd0f90",
      traps: [
        {
          title: "Not every modulus makes the limit fail",
          body:
            "\\(\\dfrac{x}{|x| + x^2}\\) tends to \\(+1\\) from the right and \\(-1\\) from the left — no limit. But \\(\\dfrac{|x|}{|x| + x^2}\\) tends to \\(1\\) from BOTH sides, because the sign that flips upstairs also flips downstairs. " +
            "Both versions have been set in the same paper series; the answer is decided by working the two sides, not by spotting a modulus.",
        },
      ],
    },

    // 3 — greatest integer and sign near a point
    {
      kind: "formula" as const,
      slug: "cetlim-greatest-integer-and-sign-near-a-point",
      name: "Greatest-Integer and Sign Functions Near a Point",
      intuition:
        "\\([x]\\) is a staircase: flat between integers, with a step of height \\(1\\) at each integer. Approaching an integer \\(n\\) from the left you are on the lower stair \\(n - 1\\); from the right, on the stair \\(n\\) itself. " +
        "Away from the integers there is no step, so the limit is simply the stair you are standing on.",
      definition:
        "- \\([x]\\) = the greatest integer \\(\\le x\\). So \\([2.7] = 2\\), \\([5] = 5\\), and — the one students get wrong — \\([-0.3] = -1\\), because \\(-1\\) is the largest integer not exceeding \\(-0.3\\).\n" +
        "- At an integer \\(n\\): \\(\\lim_{x\\to n^-}[x] = n - 1\\) and \\(\\lim_{x\\to n^+}[x] = n\\). The two-sided limit does **not** exist.\n" +
        "- At a non-integer \\(a\\): \\(\\lim_{x\\to a}[x] = [a]\\), because \\([x]\\) is constant on an interval around \\(a\\).\n" +
        "- Near \\(0\\) from the left: \\([x] = -1\\) and \\(|x| = -x\\). Substitute these **as constants** and the expression usually collapses.\n" +
        "- The sign function \\(\\dfrac{x}{|x|}\\) (also written \\(\\operatorname{sgn} x\\)) is \\(+1\\) for \\(x > 0\\) and \\(-1\\) for \\(x < 0\\): a two-step staircase with its single step at \\(0\\).",
      formula: {
        label: "Greatest integer at an integer",
        latex:
          "\\lim_{x\\to n^-}[x] = n - 1, \\qquad \\lim_{x\\to n^+}[x] = n \\qquad (n \\in \\mathbb{Z})",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 2^-}\\dfrac{[x] + x}{x}\\).",
        steps: [
          "For \\(1 \\le x < 2\\), \\([x] = 1\\) — a constant on the whole left approach.",
          "So the expression is \\(\\dfrac{1 + x}{x}\\) for every \\(x\\) just left of \\(2\\).",
          "Now substitute \\(x = 2\\): \\(\\dfrac{1 + 2}{2} = \\dfrac{3}{2}\\).",
        ],
        answer: "\\(\\dfrac{3}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 1^+}\\dfrac{[x] - x}{x - 1}\\).",
        steps: [
          "For \\(1 \\le x < 2\\), \\([x] = 1\\).",
          "The expression becomes \\(\\dfrac{1 - x}{x - 1} = -1\\) for every \\(x\\) just right of \\(1\\).",
          "A constant's limit is itself.",
        ],
        answer: "\\(-1\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 3^-}[x] = ?\\)",
          answer: "\\(2\\)",
          method: "Lower stair on the left of an integer.",
        },
        {
          prompt: "\\(\\lim_{x\\to 3^+}[x] = ?\\)",
          answer: "\\(3\\)",
          method: "On the right you are on the stair \\(3\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 2.5}[x] = ?\\)",
          answer: "\\(2\\)",
          method: "No step at a non-integer; \\([x] = 2\\) nearby on both sides.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^-}[x] = ?\\)",
          answer: "\\(-1\\)",
          method: "Just left of \\(0\\), the greatest integer below is \\(-1\\).",
        },
      ],
      pyqExampleId: "a30ef464-26b1-45bb-9f7e-ce543977e479",
      traps: [
        {
          title: "[x] for a small negative x is −1, not 0",
          body:
            "\\([-0.001] = -1\\). Writing \\(0\\) here turns a \\(-\\sin 1\\) answer into \\(0\\), which is always one of the options. " +
            "On the left of any integer \\(n\\), \\([x]\\) is \\(n - 1\\) — including \\(n = 0\\).",
        },
      ],
    },

    // 4 — limits at infinity
    {
      kind: "formula" as const,
      slug: "cetlim-limits-at-infinity",
      name: "Limits at Infinity — Compare the Leading Powers",
      intuition:
        "When \\(x\\) is enormous, \\(x^{50}\\) dwarfs \\(x^{49}\\), and a constant is invisible next to either. So only the highest power on top and the highest power below matter, and the limit is decided by comparing those two.",
      definition:
        "- **Ratio of polynomials**: divide numerator and denominator by the highest power of \\(x\\) present. Every term with a lower power becomes \\(\\dfrac{c}{x^k} \\to 0\\).\n" +
        "- Degree on top **smaller** → limit \\(0\\). Degrees **equal** → ratio of leading coefficients. Degree on top **larger** → \\(\\pm\\infty\\), no finite limit.\n" +
        "- \\((2x + k)^{50}\\) and \\((2x)^{50}\\) have the same leading term, so their ratio \\(\\to 1\\) whatever the constant \\(k\\) — a **sum of a hundred such terms** over \\((2x)^{50}\\) therefore tends to \\(100\\).\n" +
        "- A **finite sum inside the limit** (\\(1 + 8 + 27 + \\dots + n^3\\)) must be replaced by its closed form first (\\(\\left(\\frac{n(n+1)}{2}\\right)^2\\)); only then can leading powers be compared.\n" +
        "- \\(e^{-x} \\to 0\\), \\(a^{-x} \\to 0\\) for \\(a > 1\\), and \\(\\dfrac{e^{x} - 1}{e^{x} + 1} \\to 1\\): divide by the dominant exponential exactly as you would by the dominant power.",
      formula: {
        label: "Ratio of polynomials at infinity",
        latex:
          "\\lim_{x\\to\\infty}\\frac{a_n x^n + \\dots + a_0}{b_m x^m + \\dots + b_0} = \\begin{cases} 0, & n < m \\\\[2pt] \\dfrac{a_n}{b_m}, & n = m \\\\[2pt] \\pm\\infty, & n > m \\end{cases}",
        symbols: [
          { symbol: "\\(n, m\\)", meaning: "degrees of numerator and denominator" },
          { symbol: "\\(a_n, b_m\\)", meaning: "their leading coefficients" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to\\infty}\\dfrac{3x^2 - 5x + 1}{2x^2 + 7}\\).",
        steps: [
          "Highest power present is \\(x^2\\). Divide every term by \\(x^2\\): \\(\\dfrac{3 - 5/x + 1/x^2}{2 + 7/x^2}\\).",
          "As \\(x \\to \\infty\\), each of \\(5/x\\), \\(1/x^2\\), \\(7/x^2\\) tends to \\(0\\).",
          "What remains is the ratio of leading coefficients, \\(\\dfrac{3}{2}\\).",
        ],
        answer: "\\(\\dfrac{3}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{n\\to\\infty}\\dfrac{1 + 2 + 3 + \\dots + n}{n^2}\\).",
        steps: [
          "Replace the sum by its closed form: \\(1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}\\).",
          "The expression is \\(\\dfrac{n^2 + n}{2n^2}\\). Divide by \\(n^2\\): \\(\\dfrac{1 + 1/n}{2}\\).",
          "As \\(n \\to \\infty\\), \\(1/n \\to 0\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\dfrac{5x + 1}{x - 3} = ?\\)",
          answer: "\\(5\\)",
          method: "Equal degrees — leading coefficients \\(5/1\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\dfrac{x^2 + 1}{x^3} = ?\\)",
          answer: "\\(0\\)",
          method: "Degree on top is smaller.",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\dfrac{1 - x}{2x + 3} = ?\\)",
          answer: "\\(-\\dfrac{1}{2}\\)",
          method: "Leading coefficients \\(-1\\) and \\(2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty} 3^{-x} = ?\\)",
          answer: "\\(0\\)",
          method: "\\(3^{-x} = 1/3^{x}\\), and \\(3^x \\to \\infty\\).",
        },
      ],
      pyqExampleId: "70de4e86-d517-4acf-8cb2-3a9d4527fead",
      traps: [
        {
          title: "A sum of n terms is not 'n copies of the biggest term'",
          body:
            "\\(\\dfrac{1 + 8 + 27 + \\dots + n^3}{1 - n^4}\\) is NOT \\(\\dfrac{n \\cdot n^3}{-n^4} = -1\\). The sum is \\(\\left(\\frac{n(n+1)}{2}\\right)^2 \\sim \\frac{n^4}{4}\\), so the limit is \\(-\\dfrac{1}{4}\\). " +
            "Always write the closed form of a sum before comparing powers.",
        },
      ],
    },

    // 5 — finite limit forces the divergent part to vanish
    {
      kind: "formula" as const,
      slug: "cetlim-finite-limit-forces-vanishing",
      name: "A Finite Limit at Infinity Forces the Divergent Part to Vanish",
      intuition:
        "If \\(\\dfrac{x^2 + x + 1}{x + 1} - ax - b\\) is to settle down to a number as \\(x\\) grows, the piece that grows like \\(x\\) must be cancelled exactly by \\(ax\\). " +
        "That single observation fixes \\(a\\); only then does \\(b\\) come into view.",
      definition:
        "- **Divide** the rational function: \\(\\dfrac{p(x)}{q(x)} = (\\text{quotient}) + \\dfrac{r(x)}{q(x)}\\), with \\(\\deg r < \\deg q\\), so the remainder term \\(\\to 0\\).\n" +
        "- For the limit of \\(\\dfrac{p(x)}{q(x)} - ax - b\\) to be **finite**, the coefficient of \\(x\\) in (quotient \\(- ax - b\\)) must be **zero** — this determines \\(a\\).\n" +
        "- The limit is then the constant left over, which determines \\(b\\).\n" +
        "- Geometrically \\(y = ax + b\\) is the **oblique asymptote** of the curve; the question is asking for it in disguise.",
      formula: {
        label: "Finite limit at infinity",
        latex:
          "\\frac{p(x)}{q(x)} = \\alpha x + \\beta + \\frac{r(x)}{q(x)} \\ \\Rightarrow\\ \\lim_{x\\to\\infty}\\left(\\frac{p(x)}{q(x)} - ax - b\\right) \\text{ finite} \\iff a = \\alpha,\\ \\text{and the limit is } \\beta - b",
      },
      authoredExample: {
        prompt: "If \\(\\lim_{x\\to\\infty}\\left(\\dfrac{x^2 + 2x + 3}{x + 1} - ax - b\\right) = 0\\), find \\(a\\) and \\(b\\).",
        steps: [
          "Divide: \\(x^2 + 2x + 3 = (x + 1)(x + 1) + 2\\), so \\(\\dfrac{x^2 + 2x + 3}{x + 1} = x + 1 + \\dfrac{2}{x + 1}\\).",
          "The expression is \\((1 - a)x + (1 - b) + \\dfrac{2}{x + 1}\\). The last term \\(\\to 0\\).",
          "A finite limit needs \\(1 - a = 0\\), so \\(a = 1\\); the limit is then \\(1 - b\\), and it must equal \\(0\\).",
        ],
        answer: "\\(a = 1,\\ b = 1\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\lim_{x\\to\\infty}\\left(\\dfrac{2x^2 + 3}{x - 1} - ax - b\\right) = 5\\), find \\(a\\) and \\(b\\).",
        steps: [
          "Divide: \\(2x^2 + 3 = (x - 1)(2x + 2) + 5\\), so \\(\\dfrac{2x^2 + 3}{x - 1} = 2x + 2 + \\dfrac{5}{x - 1}\\).",
          "Expression: \\((2 - a)x + (2 - b) + \\dfrac{5}{x - 1}\\). Finite limit forces \\(a = 2\\).",
          "The limit is \\(2 - b = 5\\), so \\(b = -3\\).",
        ],
        answer: "\\(a = 2,\\ b = -3\\)",
      },
      pyqExampleId: "68b7c0ea-cabe-45ad-987d-66f62d467c38",
      traps: [
        {
          title: "Solving for b before a",
          body:
            "There is no equation for \\(b\\) until \\(a\\) has killed the growing term. Students who 'compare constants' first get \\(b\\) from the wrong expression. " +
            "Order: divide → set the \\(x\\)-coefficient to zero → read off the constant.",
        },
      ],
    },

    // 6 — infinity minus infinity
    {
      kind: "formula" as const,
      slug: "cetlim-infinity-minus-infinity",
      name: "Infinity Minus Infinity — Rationalise at Infinity",
      intuition:
        "\\(\\sqrt{x^2 + 4x} - x\\) is a huge number minus a huge number, and the difference could be anything. Multiplying by the conjugate turns the subtraction into a division, where the leading powers can be compared as usual.",
      definition:
        "- \\(\\infty - \\infty\\) is **indeterminate**: it is never \\(0\\) by inspection.\n" +
        "- With square roots, multiply and divide by the **conjugate**: \\(\\sqrt{A} - \\sqrt{B} = \\dfrac{A - B}{\\sqrt{A} + \\sqrt{B}}\\). The numerator usually drops to a lower degree; then divide by the highest power.\n" +
        "- **Nested roots** need the trick twice — once for the outer difference, once more for the inner \\(\\sqrt{1 + x^4} - x^2\\) that appears.\n" +
        "- For large \\(x\\), \\(\\sqrt{x^2 + ax + b} \\approx x + \\dfrac{a}{2}\\): a shortcut worth remembering, and the reason the standard result below holds.",
      formula: {
        label: "Root minus its leading term",
        latex:
          "\\lim_{x\\to\\infty}\\left(\\sqrt{x^2 + ax + b} - x\\right) = \\frac{a}{2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to\\infty}\\left(\\sqrt{x^2 + 4x} - x\\right)\\).",
        steps: [
          "Multiply and divide by the conjugate: \\(\\dfrac{(x^2 + 4x) - x^2}{\\sqrt{x^2 + 4x} + x} = \\dfrac{4x}{\\sqrt{x^2 + 4x} + x}\\).",
          "Divide top and bottom by \\(x\\): \\(\\dfrac{4}{\\sqrt{1 + 4/x} + 1}\\).",
          "As \\(x \\to \\infty\\), \\(4/x \\to 0\\), leaving \\(\\dfrac{4}{1 + 1} = 2\\).",
        ],
        answer: "\\(2\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to\\infty} x\\left(\\sqrt{x^2 + 1} - x\\right)\\).",
        steps: [
          "Rationalise the bracket: \\(\\sqrt{x^2 + 1} - x = \\dfrac{1}{\\sqrt{x^2 + 1} + x}\\).",
          "So the expression is \\(\\dfrac{x}{\\sqrt{x^2 + 1} + x}\\). Divide by \\(x\\): \\(\\dfrac{1}{\\sqrt{1 + 1/x^2} + 1}\\).",
          "As \\(x \\to \\infty\\) this tends to \\(\\dfrac{1}{1 + 1}\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\left(\\sqrt{x^2 + 6x} - x\\right) = ?\\)",
          answer: "\\(3\\)",
          method: "\\(a/2\\) with \\(a = 6\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\left(\\sqrt{x^2 + x + 1} - x\\right) = ?\\)",
          answer: "\\(\\dfrac{1}{2}\\)",
          method: "\\(a = 1\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\left(x - \\sqrt{x^2 - 2x}\\right) = ?\\)",
          answer: "\\(1\\)",
          method: "\\(-(a/2)\\) with \\(a = -2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\left(\\sqrt{x + 1} - \\sqrt{x}\\right) = ?\\)",
          answer: "\\(0\\)",
          method: "Conjugate gives \\(\\dfrac{1}{\\sqrt{x+1} + \\sqrt{x}} \\to 0\\).",
        },
      ],
      pyqExampleId: "88fcd5d1-99c9-4b00-a8e9-68e8f92f87af",
      traps: [
        {
          title: "Subtracting infinities term by term",
          body:
            "Writing \\(\\sqrt{x^2 + 4x} - x \\approx x - x = 0\\) is wrong; the answer is \\(2\\). The lower-order terms under the root are exactly what survives after the leading parts cancel, so they cannot be dropped before rationalising.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Discontinuities of [x], |x| and sgn x — the same one-sided habit, applied to continuity",
      href: "/notes/mht-cet-maths/limits/cetlim-special-functions",
    },
  ],
};
