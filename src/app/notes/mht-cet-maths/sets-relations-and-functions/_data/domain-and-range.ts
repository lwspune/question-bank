import type { SubtopicNote } from "@/app/notes/_types";

export const DOMAIN_AND_RANGE_NOTE: SubtopicNote = {
  subtopicName: "Domain and Range — Where a Formula Is Defined and What It Produces",
  title: "Domain and Range — Where a Formula Is Defined and What It Produces",
  oneLineDefinition:
    "Domain: intersect the conditions each piece imposes (log argument > 0, even root ≥ 0, denominator ≠ 0, inverse-sine argument in [−1, 1]). Range: solve y = f(x) for x and ask which y allow a real solution.",
  whyItMatters:
    "12 PYQs at 25% HARD — the largest page in the chapter and the most repeated: the domain of 2ˣ + 2ʸ = 2 has been set FOUR times with identical options, and sin⁻¹(x − 3)/√(9 − x²) twice. " +
    "The three HARD ones are a log of a rational function, a sin⁻¹ of a rational function, and a rational-function range whose end-points decide the answer. " +
    "Every question is answered by the same two routines below; the marks are lost on the bracket at the boundary.",
  concepts: [
    // 1 — domain from conditions
    {
      kind: "formula" as const,
      slug: "cetsrf-domain-from-each-piece",
      name: "Domain: Write One Condition Per Piece, Then Intersect",
      intuition:
        "Each part of a formula refuses certain inputs. A square root needs its inside \\(\\ge 0\\) (\\(> 0\\) in a denominator), a logarithm needs its argument \\(> 0\\), \\(\\sin^{-1}\\) needs its argument in \\([-1, 1]\\), a denominator must be non-zero. The domain is where ALL conditions hold.",
      definition:
        "- \\(f(x) = \\dfrac{\\sin^{-1}(x - 3)}{\\sqrt{9 - x^2}}\\): \\(-1 \\le x - 3 \\le 1 \\Rightarrow 2 \\le x \\le 4\\); \\(9 - x^2 > 0 \\Rightarrow -3 < x < 3\\). Intersection \\([2, 3)\\) — closed at \\(2\\), OPEN at \\(3\\) because the root is in the denominator.\n" +
        "- \\(f(x) = \\sin^{-1}\\!\\left(\\log_2\\dfrac{x}{2}\\right)\\): \\(-1 \\le \\log_2\\dfrac{x}{2} \\le 1 \\Rightarrow \\dfrac12 \\le \\dfrac{x}{2} \\le 2 \\Rightarrow 1 \\le x \\le 4\\).\n" +
        "- \\(f(x) = \\log_2\\dfrac{x + 3}{x^2 + 3x + 2}\\): need \\(\\dfrac{x + 3}{(x + 1)(x + 2)} > 0\\) — a sign chart on the critical points \\(-3, -2, -1\\) gives \\((-3, -2) \\cup (-1, \\infty)\\). That exact set is not among the options; the official key is (D) \\((-3, \\infty) - \\{-1, -2\\}\\), the only option that starts at \\(-3\\) and removes both poles, so pick it on this stem and know that it over-includes \\((-2, -1)\\).\\n" +
        "- **An implicit equation** \\(2^x + 2^y = 2\\): \\(2^y = 2 - 2^x\\) must be positive, so \\(2^x < 2\\), \\(x < 1\\). Domain \\((-\\infty, 1)\\) — the four-time repeat.",
      formula: {
        label: "Standard conditions",
        latex:
          "\\sqrt{u}: u \\ge 0 \\quad \\frac{1}{\\sqrt{u}}: u > 0 \\quad \\log u: u > 0 \\quad \\sin^{-1}u: -1 \\le u \\le 1 \\quad \\frac{1}{u}: u \\ne 0",
      },
      visualizationSlug: "function-domain-range-graph",
      authoredExample: {
        prompt: "Find the domain of \\(f(x) = \\dfrac{\\sqrt{x - 1}}{\\log(5 - x)}\\).",
        steps: [
          "Root: \\(x \\ge 1\\). Log argument: \\(5 - x > 0 \\Rightarrow x < 5\\). Denominator non-zero: \\(\\log(5 - x) \\ne 0 \\Rightarrow 5 - x \\ne 1 \\Rightarrow x \\ne 4\\).",
          "Intersect: \\([1, 5) - \\{4\\}\\).",
        ],
        answer: "\\([1, 4) \\cup (4, 5)\\)",
      },
      selfCheckExample: {
        prompt: "Find the domain of \\(f(x) = \\dfrac{\\cos^{-1}(x - 2)}{\\sqrt{4 - x^2}}\\).",
        steps: [
          "\\(-1 \\le x - 2 \\le 1 \\Rightarrow 1 \\le x \\le 3\\); \\(4 - x^2 > 0 \\Rightarrow -2 < x < 2\\).",
        ],
        answer: "\\([1, 2)\\)",
      },
      practiceSet: [
        {
          prompt: "Domain of \\(\\sqrt{x - 2}\\)?",
          answer: "\\([2, \\infty)\\)",
        },
        {
          prompt: "Domain of \\(\\dfrac{1}{\\sqrt{x - 2}}\\)?",
          answer: "\\((2, \\infty)\\)",
        },
        {
          prompt: "Domain of \\(\\log(x^2 - 1)\\)?",
          answer: "\\((-\\infty, -1) \\cup (1, \\infty)\\)",
        },
        {
          prompt: "Domain of \\(\\sin^{-1}(2x)\\)?",
          answer: "\\(\\left[-\\dfrac12, \\dfrac12\\right]\\)",
        },
      ],
      pyqExampleId: "71cef164-15d7-4f06-8f59-d84ba554475a",
      traps: [
        {
          title: "Closing the bracket at a root in the denominator",
          body:
            "\\(\\sqrt{9 - x^2}\\) underneath means \\(9 - x^2 > 0\\), strictly. \\([2, 3]\\) is option (C) on both sittings; the answer is \\([2, 3)\\).",
        },
      ],
    },

    // 2 — domain with |x| and a quadratic inequality
    {
      kind: "formula" as const,
      slug: "cetsrf-domain-with-modulus-and-quadratic-inequality",
      name: "Domain Through a Quadratic Inequality: sin⁻¹ of a Rational Function With |x|",
      intuition:
        "When the \\(\\sin^{-1}\\) argument is a fraction with a positive denominator, '\\(\\le 1\\)' clears to a polynomial inequality. With \\(|x|\\) present, solve for \\(x \\ge 0\\) and reflect.",
      definition:
        "- \\(\\sin^{-1}\\dfrac{|x| + 5}{x^2 + 1}\\): the argument is already \\(\\ge 0 > -1\\), so only \\(\\dfrac{|x| + 5}{x^2 + 1} \\le 1\\) matters. Since \\(x^2 + 1 > 0\\): \\(|x| + 5 \\le x^2 + 1\\), i.e. \\(x^2 - |x| - 4 \\ge 0\\).\n" +
        "- For \\(x \\ge 0\\): \\(x^2 - x - 4 \\ge 0 \\Rightarrow x \\ge \\dfrac{1 + \\sqrt{17}}{2}\\) (the other root is negative). Reflect: domain \\((-\\infty, -a] \\cup [a, \\infty)\\) with \\(a = \\dfrac{1 + \\sqrt{17}}{2}\\).\n" +
        "- Multiply through by a denominator ONLY when its sign is known; \\(x^2 + 1\\) is safe, \\(x - 1\\) is not.\n" +
        "- The quadratic-formula root with the '+' is the one that lands in \\(x \\ge 0\\); the options include the '−' root and half-and-minus variants as distractors.",
      formula: {
        label: "Clearing a positive denominator",
        latex:
          "\\frac{p(x)}{q(x)} \\le 1,\\ q(x) > 0 \\iff p(x) \\le q(x)",
      },
      authoredExample: {
        prompt: "Find the domain of \\(f(x) = \\sin^{-1}\\dfrac{2|x| + 3}{x^2 + 2}\\).",
        steps: [
          "Argument \\(\\ge 0\\), so need \\(2|x| + 3 \\le x^2 + 2\\), i.e. \\(x^2 - 2|x| - 1 \\ge 0\\).",
          "For \\(x \\ge 0\\): \\(x^2 - 2x - 1 \\ge 0 \\Rightarrow x \\ge 1 + \\sqrt2\\). Reflect.",
        ],
        answer: "\\((-\\infty, -1 - \\sqrt2] \\cup [1 + \\sqrt2, \\infty)\\)",
      },
      selfCheckExample: {
        prompt: "Find the domain of \\(f(x) = \\cos^{-1}\\dfrac{x^2 + 3}{4x}\\) for \\(x > 0\\).",
        steps: [
          "For \\(x > 0\\) the argument is positive; need \\(\\dfrac{x^2 + 3}{4x} \\le 1 \\Rightarrow x^2 - 4x + 3 \\le 0 \\Rightarrow (x - 1)(x - 3) \\le 0\\).",
        ],
        answer: "\\([1, 3]\\)",
      },
      pyqExampleId: "1a0449c4-7233-4763-97f0-25bbeea1be04",
      traps: [
        {
          title: "Solving x² − x − 4 ≥ 0 as x ≥ the smaller root",
          body:
            "\\(x^2 - x - 4 \\ge 0\\) holds OUTSIDE the roots. With \\(x \\ge 0\\) imposed by the \\(|x|\\) split, only \\(x \\ge \\dfrac{1 + \\sqrt{17}}{2}\\) survives; \\(\\dfrac{\\sqrt{17} - 1}{2}\\) is the wrong sign's root, option (B).",
        },
      ],
    },

    // 3 — range by discriminant
    {
      kind: "formula" as const,
      slug: "cetsrf-range-by-discriminant",
      name: "Range of a Rational Function: Set y = f(x), Clear, and Demand a Real x",
      intuition:
        "Write \\(y = f(x)\\), cross-multiply to a quadratic in \\(x\\), and require its discriminant \\(\\ge 0\\). The \\(y\\) that pass are the range — then check the boundary values separately, because clearing the denominator can create or lose an endpoint.",
      definition:
        "- \\(y = \\dfrac{x}{1 + x^2} \\Rightarrow yx^2 - x + y = 0\\); real \\(x\\) needs \\(1 - 4y^2 \\ge 0\\), so \\(|y| \\le \\dfrac12\\). Range \\(\\left[-\\dfrac12, \\dfrac12\\right]\\).\n" +
        "- \\(y = \\dfrac{x^2 + x + 2}{x^2 + x + 1} = 1 + \\dfrac{1}{x^2 + x + 1}\\): \\(x^2 + x + 1 = \\left(x + \\tfrac12\\right)^2 + \\tfrac34 \\ge \\tfrac34\\), so the fraction lies in \\(\\left(0, \\tfrac43\\right]\\) and \\(y \\in \\left(1, \\tfrac73\\right]\\). The maximum IS attained (at \\(x = -\\tfrac12\\)); \\(y = 1\\) is not.\n" +
        "- \\(y = \\dfrac{x^2}{x^2 + 1} = 1 - \\dfrac{1}{x^2 + 1}\\): \\(0 \\le y < 1\\), range \\([0, 1)\\).\n" +
        "- **Endpoint check**: discriminant \\(= 0\\) gives an attained endpoint; a \\(y\\) that makes the leading coefficient vanish (\\(y = 0\\) in \\(yx^2 - x + y = 0\\)) must be tested directly.",
      formula: {
        label: "Discriminant method",
        latex:
          "y = f(x) \\ \\Rightarrow\\ a(y)x^2 + b(y)x + c(y) = 0 \\ \\Rightarrow\\ b(y)^2 - 4a(y)c(y) \\ge 0",
      },
      authoredExample: {
        prompt: "Find the range of \\(f(x) = \\dfrac{3x^2 + 5}{x^2 + 1}\\).",
        steps: [
          "\\(f(x) = 3 + \\dfrac{2}{x^2 + 1}\\); \\(x^2 + 1 \\ge 1\\), so \\(\\dfrac{2}{x^2 + 1} \\in (0, 2]\\), attained at \\(x = 0\\).",
        ],
        answer: "\\((3, 5]\\)",
      },
      selfCheckExample: {
        prompt: "Find the range of \\(f(x) = \\dfrac{2x}{x^2 + 4}\\).",
        steps: [
          "\\(yx^2 - 2x + 4y = 0\\); discriminant \\(4 - 16y^2 \\ge 0 \\Rightarrow |y| \\le \\dfrac12\\). At \\(y = 0\\), \\(x = 0\\) works.",
        ],
        answer: "\\(\\left[-\\dfrac12, \\dfrac12\\right]\\)",
      },
      practiceSet: [
        {
          prompt: "Range of \\(\\dfrac{1}{x^2 + 1}\\)?",
          answer: "\\((0, 1]\\)",
        },
        {
          prompt: "Range of \\(x^2 + 2x + 3\\)?",
          answer: "\\([2, \\infty)\\)",
        },
        {
          prompt: "Minimum of \\(x^2 + x + 1\\)?",
          answer: "\\(\\dfrac34\\)",
        },
        {
          prompt: "Range of \\(\\dfrac{x^2}{x^2 + 1}\\)?",
          answer: "\\([0, 1)\\)",
        },
      ],
      pyqExampleId: "dca6bba7-f0ce-4894-9898-3507a1aa3849",
      traps: [
        {
          title: "Guessing the bracket from the shape",
          body:
            "\\(\\dfrac{x^2 + x + 2}{x^2 + x + 1}\\) attains its maximum \\(\\dfrac73\\) but never its infimum \\(1\\), so the range is \\(\\left(1, \\dfrac73\\right]\\); every other bracket pairing is on the list. Test each endpoint.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Composite Functions — a composite's domain is inherited from its inner piece",
      href: "/notes/mht-cet-maths/sets-relations-and-functions/cetsrf-composite-functions",
    },
    {
      label: "Sets, Relations and Types of Functions — the [x] interval reading",
      href: "/notes/mht-cet-maths/sets-relations-and-functions/cetsrf-sets-relations-and-function-types",
    },
  ],
};
