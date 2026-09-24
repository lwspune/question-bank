import type { SubtopicNote } from "@/app/notes/_types";

export const MODULUS_AND_GREATEST_INTEGER_NOTE: SubtopicNote = {
  subtopicName: "Modulus and Greatest-Integer Integrands — Split the Interval",
  title: "Modulus and Greatest-Integer Integrands — Split the Interval",
  oneLineDefinition:
    "A modulus changes formula where its inside changes sign, and [x] changes value at every integer — so the interval is split at those points and each piece is integrated with its own formula.",
  whyItMatters:
    "15 PYQs at 27% HARD — the gentlest page in the chapter, and the most mechanical: find the break points, split, integrate each piece. " +
    "The MODERATE tag is where the marks are lost, not the HARD one: a modulus integrated as if it were the bare expression, or a greatest-integer function evaluated at the wrong endpoint, produces a confident wrong answer that is always among the options. " +
    "Two stems ask for the integral of an expression that is piecewise CONSTANT by an inverse-trig identity, and one of them carries an official key that ignores the sign of x.",
  concepts: [
    // 1 — modulus
    {
      kind: "formula" as const,
      slug: "cetdi-modulus-split-at-the-zero",
      name: "Modulus: Split Where the Inside Changes Sign",
      intuition:
        "\\(|2x - 5|\\) is \\(5 - 2x\\) until \\(x = \\frac52\\) and \\(2x - 5\\) after it. The graph is a V; the integral is the area of two triangles, computed one at a time.",
      definition:
        "- Solve \\(\\text{inside} = 0\\) to find the break points inside the interval; on each piece replace \\(|u|\\) by \\(u\\) or \\(-u\\) according to the sign there.\n" +
        "- \\(\\int_0^4|2x - 5|\\,dx = \\int_0^{5/2}(5 - 2x)\\,dx + \\int_{5/2}^{4}(2x - 5)\\,dx = \\dfrac{25}{4} + \\dfrac94 = \\dfrac{17}{2}\\).\n" +
        "- Quadratic inside: \\(x^2 - x - 2 = (x - 2)(x + 1)\\) is negative between the roots; on \\([-2, 2]\\) split at \\(-1\\) and flip the sign on \\([-1, 2]\\).\n" +
        "- Trigonometric inside: \\(\\sin x - \\cos x\\) changes sign at \\(\\frac{\\pi}{4}\\); \\(\\sin x - \\dfrac{2x}{\\pi}\\) at \\(\\frac{\\pi}{2}\\) (where \\(\\sin x = 1 = \\frac{2x}{\\pi}\\)). Sketch both curves to see which is on top on each side.\n" +
        "- A factor outside the modulus, as in \\(x\\left|x - \\frac12\\right|\\), rides along: split at \\(\\frac12\\) and integrate \\(x(\\frac12 - x)\\) then \\(x(x - \\frac12)\\).",
      formula: {
        label: "Modulus splitting",
        latex:
          "\\int_a^b|u(x)|\\,dx = \\int_a^c\\pm u\\,dx + \\int_c^b\\mp u\\,dx \\ \\text{ where } u(c) = 0,\\ \\text{sign chosen to make each piece } \\ge 0",
      },
      visualizationSlug: "defint-absolute-value-fold",
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^3|x - 1|\\,dx\\).",
        steps: [
          "Inside vanishes at \\(x = 1\\). On \\([0, 1]\\), \\(|x - 1| = 1 - x\\); on \\([1, 3]\\), \\(|x - 1| = x - 1\\).",
          "\\(\\int_0^1(1 - x)\\,dx = \\dfrac12\\); \\(\\int_1^3(x - 1)\\,dx = \\left[\\dfrac{(x - 1)^2}{2}\\right]_1^3 = 2\\).",
          "Total \\(\\dfrac12 + 2\\).",
        ],
        answer: "\\(\\dfrac52\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-1}^{2}|x^2 - 1|\\,dx\\).",
        steps: [
          "\\(x^2 - 1 < 0\\) on \\((-1, 1)\\) and \\(> 0\\) on \\((1, 2)\\).",
          "\\(\\int_{-1}^{1}(1 - x^2)\\,dx = 2 - \\dfrac23 = \\dfrac43\\); \\(\\int_1^2(x^2 - 1)\\,dx = \\left(\\dfrac83 - 2\\right) - \\left(\\dfrac13 - 1\\right) = \\dfrac43\\).",
          "Total \\(\\dfrac83\\).",
        ],
        answer: "\\(\\dfrac83\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_{-2}^{2}|x|\\,dx = ?\\)",
          answer: "\\(4\\)",
        },
        {
          prompt: "Where does \\(|\\sin x - \\cos x|\\) change formula on \\([0, \\pi/2]\\)?",
          answer: "At \\(x = \\pi/4\\).",
        },
        {
          prompt: "\\(\\int_0^2|x - 1|\\,dx = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2}|\\sin x - \\cos x|\\,dx = ?\\)",
          answer: "\\(2(\\sqrt2 - 1)\\)",
        },
      ],
      pyqExampleId: "d5e5b429-4941-4942-aa38-bf3023f3729c",
      traps: [
        {
          title: "Integrating the bare expression",
          body:
            "\\(\\int_0^4(2x - 5)\\,dx = -4\\), but \\(\\int_0^4|2x - 5|\\,dx = \\frac{17}{2}\\). A modulus integral is never negative and is never the signed integral of the inside; if you did not split, you answered a different question.",
        },
      ],
    },

    // 2 — greatest integer
    {
      kind: "formula" as const,
      slug: "cetdi-greatest-integer-piecewise-constant",
      name: "Greatest Integer: Piecewise Constant, So Sum the Pieces",
      intuition:
        "\\([x]\\) is \\(0\\) on \\([0, 1)\\), \\(1\\) on \\([1, 2)\\), \\(2\\) on \\([2, 3)\\). Its integral is a staircase of rectangles; multiplied by another function, each rectangle becomes that function's integral times a constant.",
      definition:
        "- Split at every integer inside the interval; on each piece \\([x]\\) is a **constant**, so \\(\\int[x]\\,g(x)\\,dx = (\\text{that integer})\\int g(x)\\,dx\\) over the piece.\n" +
        "- \\(\\int_{0.2}^{3.5}[x]\\,dx = 0\\cdot0.8 + 1\\cdot1 + 2\\cdot1 + 3\\cdot0.5 = 4.5\\). Watch the fractional ends: the first piece is \\([0.2, 1)\\), the last \\([3, 3.5]\\).\n" +
        "- \\(\\int_0^5x^2[x]\\,dx = \\int_1^2x^2 + 2\\int_2^3x^2 + 3\\int_3^4x^2 + 4\\int_4^5x^2 = \\dfrac{7 + 38 + 111 + 244}{3} = \\dfrac{400}{3}\\).\n" +
        "- \\(\\int_1^4\\log[x]\\,dx = 0 + \\log 2 + \\log 3 = \\log 6\\).\n" +
        "- **Composite** \\([x^2]\\) on \\([0, 2]\\): it steps at \\(x = 1, \\sqrt2, \\sqrt3\\), so the integral is \\(1(\\sqrt2 - 1) + 2(\\sqrt3 - \\sqrt2) + 3(2 - \\sqrt3) = 5 - \\sqrt2 - \\sqrt3\\).\n" +
        "- The same counting answers a **sum** of floors: \\(\\left[\\frac12 + \\frac{i}{100}\\right]\\) is \\(0\\) for \\(i \\le 49\\) and \\(1\\) for \\(50 \\le i \\le 99\\), so the hundred-term sum is \\(50\\).",
      formula: {
        label: "Integrating a staircase",
        latex:
          "\\int_a^b[x]\\,g(x)\\,dx = \\sum_{n}\\; n\\int_{\\max(a,n)}^{\\min(b,n+1)} g(x)\\,dx \\qquad \\int_0^2[x^2]\\,dx = 5 - \\sqrt2 - \\sqrt3",
      },
      visualizationSlug: "defint-greatest-integer-area",
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^3 x[x]\\,dx\\).",
        steps: [
          "Pieces: \\([0, 1)\\) with \\([x] = 0\\); \\([1, 2)\\) with \\([x] = 1\\); \\([2, 3)\\) with \\([x] = 2\\).",
          "\\(0 + 1\\int_1^2 x\\,dx + 2\\int_2^3 x\\,dx = \\dfrac32 + 2\\cdot\\dfrac52 = \\dfrac32 + 5\\).",
        ],
        answer: "\\(\\dfrac{13}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{2.5}[x]\\,dx\\).",
        steps: [
          "\\(0\\cdot1 + 1\\cdot1 + 2\\cdot0.5\\).",
        ],
        answer: "\\(2\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^2[x]\\,dx = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(\\int_1^3[x]\\,dx = ?\\)",
          answer: "\\(3\\)",
          method: "\\(1 + 2\\).",
        },
        {
          prompt: "Where does \\([x^2]\\) step on \\([0, 2]\\)?",
          answer: "At \\(x = 1, \\sqrt2, \\sqrt3\\).",
        },
        {
          prompt: "\\(\\int_0^2[x] + |x - 1|\\,dx = ?\\)",
          answer: "\\(2\\)",
          method: "\\(1 + 1\\).",
        },
      ],
      pyqExampleId: "9a85dfd0-16e5-4aaa-8363-82832e585f5a",
      traps: [
        {
          title: "Using the endpoint's floor for the whole last piece",
          body:
            "On \\([3, 3.5]\\) the floor is \\(3\\) throughout, contributing \\(3 \\times 0.5 = 1.5\\) — not \\(3.5 \\times\\) anything. And \\([x]\\) on \\([0.2, 1)\\) is \\(0\\), so that piece contributes nothing however long it is.",
        },
      ],
    },

    // 3 — piecewise-constant by identity
    {
      kind: "formula" as const,
      slug: "cetdi-piecewise-constant-by-inverse-trig-identity",
      name: "Piecewise Constant by an Identity: tan⁻¹u + tan⁻¹(1/u)",
      intuition:
        "\\(\\tan^{-1}\\dfrac{x}{x^2 + 1} + \\tan^{-1}\\dfrac{x^2 + 1}{x}\\) is \\(\\tan^{-1}u + \\tan^{-1}\\dfrac1u\\), which is \\(\\dfrac{\\pi}{2}\\) when \\(u > 0\\) and \\(-\\dfrac{\\pi}{2}\\) when \\(u < 0\\). The integrand is a constant on each side of \\(0\\) — no integration, just lengths times constants.",
      definition:
        "- \\(\\tan^{-1}u + \\tan^{-1}\\dfrac1u = \\dfrac{\\pi}{2}\\) for \\(u > 0\\) and \\(-\\dfrac{\\pi}{2}\\) for \\(u < 0\\). With \\(u = \\dfrac{x}{x^2 + 1}\\) the sign is the sign of \\(x\\).\n" +
        "- Strictly, on \\([-1, 3]\\): \\(\\int_{-1}^{0}\\left(-\\dfrac{\\pi}{2}\\right)dx + \\int_0^3\\dfrac{\\pi}{2}\\,dx = -\\dfrac{\\pi}{2} + \\dfrac{3\\pi}{2} = \\pi\\).\n" +
        "- **The official MHT-CET key treats the sum as \\(\\dfrac{\\pi}{2}\\) throughout** and marks \\(\\dfrac{\\pi}{2}\\times 4 = 2\\pi\\) — in both the \\(\\tan^{-1}\\) (2025) and \\(\\cot^{-1}\\) (2024) versions. On the paper, answer \\(2\\pi\\).\n" +
        "- The \\(\\cot^{-1}\\) version is subtler still: \\(\\cot^{-1}\\) has range \\((0, \\pi)\\), so for \\(u < 0\\) the two terms sum to \\(\\dfrac{3\\pi}{2}\\), and the strict value on \\([-1, 3]\\) is \\(3\\pi\\).\n" +
        "- General lesson: when an integrand is an identity in disguise, evaluate the identity **on each sign region** before multiplying by the interval length.",
      formula: {
        label: "The reciprocal arctangent identity",
        latex:
          "\\tan^{-1}u + \\tan^{-1}\\frac{1}{u} = \\begin{cases} \\dfrac{\\pi}{2}, & u > 0 \\\\[4pt] -\\dfrac{\\pi}{2}, & u < 0 \\end{cases}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_1^5\\left[\\tan^{-1}\\dfrac{x}{x^2 + 4} + \\tan^{-1}\\dfrac{x^2 + 4}{x}\\right]dx\\).",
        steps: [
          "On \\([1, 5]\\), \\(u = \\dfrac{x}{x^2 + 4} > 0\\), so the integrand is \\(\\dfrac{\\pi}{2}\\) throughout.",
          "Integral \\(= \\dfrac{\\pi}{2}\\times(5 - 1)\\).",
        ],
        answer: "\\(2\\pi\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-2}^{1}\\left[\\tan^{-1}x + \\tan^{-1}\\dfrac1x\\right]dx\\) (strictly, respecting the sign of \\(x\\)).",
        steps: [
          "On \\([-2, 0)\\) the sum is \\(-\\dfrac{\\pi}{2}\\); on \\((0, 1]\\) it is \\(\\dfrac{\\pi}{2}\\).",
          "\\(-\\dfrac{\\pi}{2}\\cdot2 + \\dfrac{\\pi}{2}\\cdot1 = -\\dfrac{\\pi}{2}\\).",
        ],
        answer: "\\(-\\dfrac{\\pi}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\tan^{-1}3 + \\tan^{-1}\\dfrac13 = ?\\)",
          answer: "\\(\\dfrac{\\pi}{2}\\)",
        },
        {
          prompt: "\\(\\tan^{-1}(-2) + \\tan^{-1}\\left(-\\dfrac12\\right) = ?\\)",
          answer: "\\(-\\dfrac{\\pi}{2}\\)",
        },
        {
          prompt: "\\(\\cot^{-1}(-1) = ?\\)",
          answer: "\\(\\dfrac{3\\pi}{4}\\)",
          method: "Range of \\(\\cot^{-1}\\) is \\((0, \\pi)\\).",
        },
        {
          prompt: "\\(\\int_0^3\\left[\\tan^{-1}x + \\cot^{-1}x\\right]dx = ?\\)",
          answer: "\\(\\dfrac{3\\pi}{2}\\)",
          method: "\\(\\tan^{-1}x + \\cot^{-1}x = \\pi/2\\) for every real \\(x\\).",
        },
      ],
      pyqExampleId: "df729256-5367-4448-a716-d3b927de69d9",
      traps: [
        {
          title: "The key that ignores the sign of x",
          body:
            "Both sittings of this question mark \\(2\\pi\\), which assumes \\(\\tan^{-1}u + \\tan^{-1}(1/u) = \\pi/2\\) even for negative \\(u\\). Mathematically the answer on \\([-1, 3]\\) is \\(\\pi\\); on the paper choose \\(2\\pi\\), and know why.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Limits — Discontinuities of [x], |x| and sgn x (where the staircase and the sign function are introduced)",
      href: "/notes/mht-cet-maths/limits/cetlim-special-functions",
    },
    {
      label: "Odd and Even Integrands — the [x] term that is neither",
      href: "/notes/mht-cet-maths/definite-integration/cetdi-odd-even-symmetry",
    },
  ],
};
