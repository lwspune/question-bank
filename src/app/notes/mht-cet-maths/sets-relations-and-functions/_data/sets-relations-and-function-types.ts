import type { SubtopicNote } from "@/app/notes/_types";

export const SETS_RELATIONS_AND_FUNCTION_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Sets, Relations and Types of Functions — One-One, Onto and the Greatest-Integer Equation",
  title: "Sets, Relations and Types of Functions — One-One, Onto and the Greatest-Integer Equation",
  oneLineDefinition:
    "The definitions the chapter runs on: counting with sets and Cartesian products, whether a function is one-one and onto, and reading an equation in [x] as an interval.",
  whyItMatters:
    "10 PYQs, none HARD — the vocabulary page, and the one with the most repeated stem in the chapter: [x]² − 5[x] + 6 = 0 has been set in three sittings with the same four options every time. " +
    "The rest are a subsets-of-A×B count, a double-counting argument, two trig sets that turn out equal, a one-one/onto verdict on a linear-fractional function, and an identity in f(x + 1) − f(x). " +
    "None needs more than the definition, applied once.",
  concepts: [
    // 1 — sets, cartesian product, counting subsets
    {
      kind: "formula" as const,
      slug: "cetsrf-sets-cartesian-product-and-subset-counts",
      name: "Sets and Cartesian Products: Counting Subsets and Double Counting",
      intuition:
        "\\(A \\times B\\) has \\(n(A)\\,n(B)\\) ordered pairs, and a set with \\(m\\) elements has \\(2^m\\) subsets. 'At least \\(3\\) elements' is \\(2^m\\) minus the subsets with \\(0\\), \\(1\\) or \\(2\\) elements.",
      definition:
        "- \\(n(A \\times B) = n(A)\\cdot n(B)\\); subsets of an \\(m\\)-set: \\(2^m\\); subsets with exactly \\(k\\) elements: \\({}^mC_k\\).\n" +
        "- \\(n(A) = 4\\), \\(n(B) = 2\\): \\(A \\times B\\) has \\(8\\) elements, \\(2^8 = 256\\) subsets; with at least \\(3\\) elements: \\(256 - (1 + 8 + 28) = 219\\).\n" +
        "- **Double counting**: \\(300\\) students each read \\(5\\) papers, each paper read by \\(60\\) students. Count (student, paper) pairs both ways: \\(300 \\times 5 = 60 \\times N\\), so \\(N = 25\\).\n" +
        "- **Equality of sets defined by conditions**: \\(P = \\{\\theta : \\sin\\theta - \\cos\\theta = \\sqrt2\\cos\\theta\\}\\) is \\(\\tan\\theta = \\sqrt2 + 1\\); \\(Q = \\{\\theta : \\sin\\theta + \\cos\\theta = \\sqrt2\\sin\\theta\\}\\) is \\(\\cot\\theta = \\sqrt2 - 1\\), i.e. \\(\\tan\\theta = \\dfrac{1}{\\sqrt2 - 1} = \\sqrt2 + 1\\). Same condition, so \\(P = Q\\).\n" +
        "- \\(n(A \\cup B) = n(A) + n(B) - n(A \\cap B)\\) for two-set survey stems.",
      formula: {
        label: "Counting with sets",
        latex:
          "n(A \\times B) = n(A)\\,n(B) \\qquad \\#\\text{subsets} = 2^m \\qquad n(A \\cup B) = n(A) + n(B) - n(A \\cap B)",
      },
      visualizationSlug: "sets-venn-two",
      authoredExample: {
        prompt: "If \\(n(A) = 3\\) and \\(n(B) = 2\\), how many subsets of \\(A \\times B\\) have at least \\(2\\) elements?",
        steps: [
          "\\(n(A \\times B) = 6\\), subsets \\(2^6 = 64\\). With \\(0\\) or \\(1\\) element: \\(1 + 6 = 7\\).",
          "\\(64 - 7 = 57\\).",
        ],
        answer: "\\(57\\)",
      },
      selfCheckExample: {
        prompt: "In a school of \\(240\\) students every student is in exactly \\(3\\) clubs and every club has \\(40\\) members. How many clubs are there?",
        steps: [
          "(student, club) pairs: \\(240 \\times 3 = 720 = 40 \\times N\\), so \\(N = 18\\).",
        ],
        answer: "\\(18\\)",
      },
      practiceSet: [
        {
          prompt: "Subsets of a \\(4\\)-element set?",
          answer: "\\(16\\)",
        },
        {
          prompt: "Proper subsets of a \\(4\\)-element set?",
          answer: "\\(15\\)",
        },
        {
          prompt: "\\(n(A) = 5\\), \\(n(B) = 3\\): \\(n(A \\times B) = ?\\)",
          answer: "\\(15\\)",
        },
        {
          prompt: "\\(n(A) = 20\\), \\(n(B) = 15\\), \\(n(A \\cap B) = 5\\): \\(n(A \\cup B) = ?\\)",
          answer: "\\(30\\)",
        },
      ],
      pyqExampleId: "6e3e039a-38da-451d-aff4-97a068138bb5",
      traps: [
        {
          title: "Subtracting only the empty set",
          body:
            "'At least \\(3\\) elements' removes the subsets of size \\(0\\), \\(1\\) AND \\(2\\): \\(1 + 8 + 28 = 37\\). Removing only \\(1\\) gives \\(255\\); removing \\(1 + 8\\) gives \\(247\\).",
        },
      ],
    },

    // 2 — one-one and onto
    {
      kind: "formula" as const,
      slug: "cetsrf-one-one-and-onto",
      name: "One-One and Onto: Test Injectivity by f(x₁) = f(x₂), Surjectivity by Solving for x",
      intuition:
        "One-one: different inputs never share an output — assume \\(f(x_1) = f(x_2)\\) and show \\(x_1 = x_2\\). Onto: every value in the codomain is hit — solve \\(y = f(x)\\) for \\(x\\) and see which \\(y\\) fail.",
      definition:
        "- \\(f(x) = \\dfrac{2x + 3}{3x + 4}\\): cross-multiplying \\(f(x_1) = f(x_2)\\) gives \\(x_1 = x_2\\), so one-one. Solving \\(y = f(x)\\): \\(x = \\dfrac{3 - 4y}{3y - 2}\\), defined for all \\(y \\ne \\dfrac23\\) — onto \\(\\mathbb{R} - \\{\\tfrac23\\}\\), not onto \\(\\mathbb{R}\\).\n" +
        "- A linear-fractional \\(\\dfrac{ax + b}{cx + d}\\) (\\(ad \\ne bc\\)) is always one-one on its domain, and misses exactly \\(y = \\dfrac{a}{c}\\).\n" +
        "- A strictly monotone function is one-one: \\(f(x) = x^3 + x - 1\\) has \\(f'(x) = 3x^2 + 1 > 0\\), so it is increasing and has EXACTLY ONE real root.\n" +
        "- Even functions and quadratics on \\(\\mathbb{R}\\) are not one-one (\\(f(-x) = f(x)\\)); restricting the domain, as in \\(f(x) = (x+1)^2 - 1\\) for \\(x \\ge -1\\), makes them one-one and invertible.",
      formula: {
        label: "One-one and onto",
        latex:
          "f(x_1) = f(x_2) \\Rightarrow x_1 = x_2 \\ (\\text{one-one}) \\qquad \\forall y\\ \\exists x: f(x) = y \\ (\\text{onto}) \\qquad f' > 0 \\Rightarrow \\text{one-one}",
      },
      visualizationSlug: "function-mapping-diagram",
      authoredExample: {
        prompt: "Is \\(f : \\mathbb{R} - \\{1\\} \\to \\mathbb{R}\\), \\(f(x) = \\dfrac{x + 2}{x - 1}\\), one-one? Is it onto?",
        steps: [
          "\\(\\dfrac{x_1 + 2}{x_1 - 1} = \\dfrac{x_2 + 2}{x_2 - 1} \\Rightarrow x_1x_2 - x_1 + 2x_2 - 2 = x_1x_2 - x_2 + 2x_1 - 2 \\Rightarrow 3x_2 = 3x_1\\). One-one.",
          "\\(y = \\dfrac{x + 2}{x - 1} \\Rightarrow x = \\dfrac{y + 2}{y - 1}\\), undefined at \\(y = 1\\). Not onto \\(\\mathbb{R}\\); onto \\(\\mathbb{R} - \\{1\\}\\).",
        ],
        answer: "One-one; onto \\(\\mathbb{R} - \\{1\\}\\) but not onto \\(\\mathbb{R}\\).",
      },
      selfCheckExample: {
        prompt: "How many real roots does \\(x^5 + 2x + 3 = 0\\) have?",
        steps: [
          "\\(f'(x) = 5x^4 + 2 > 0\\), so \\(f\\) is strictly increasing; \\(f(-1) = 0\\).",
        ],
        answer: "Exactly one, \\(x = -1\\).",
      },
      practiceSet: [
        {
          prompt: "Is \\(f(x) = x^2\\) on \\(\\mathbb{R}\\) one-one?",
          answer: "No: \\(f(2) = f(-2)\\).",
        },
        {
          prompt: "Is \\(f(x) = 2x + 1\\) onto \\(\\mathbb{R}\\)?",
          answer: "Yes.",
        },
        {
          prompt: "Which \\(y\\) does \\(f(x) = \\dfrac{3x - 1}{x + 2}\\) miss?",
          answer: "\\(y = 3\\)",
        },
        {
          prompt: "Real roots of \\(x^3 + 4x + 1 = 0\\)?",
          answer: "Exactly one (\\(f' > 0\\)).",
        },
      ],
      pyqExampleId: "a6d380ef-8d71-42d6-9f14-182641ee8639",
      traps: [
        {
          title: "Calling a linear-fractional function onto ℝ",
          body:
            "It always misses \\(y = \\dfrac{a}{c}\\). Option (C) 'onto for \\(y \\ne \\frac23\\) and one-one' is the honest statement; 'only onto' and 'neither' are the traps.",
        },
      ],
    },

    // 3 — greatest integer equations
    {
      kind: "formula" as const,
      slug: "cetsrf-greatest-integer-equations",
      name: "Equations in [x]: Solve for the Integer, Then Widen to the Interval",
      intuition:
        "\\([x] = k\\) means \\(k \\le x < k + 1\\) — a half-open interval, closed on the left. Solve the equation for \\([x]\\) as an ordinary unknown, then translate each integer solution into its interval and take the union.",
      definition:
        "- \\([x]^2 - 5[x] + 6 = 0 \\Rightarrow ([x] - 2)([x] - 3) = 0 \\Rightarrow [x] = 2\\) or \\(3\\). \\([x] = 2 \\Rightarrow x \\in [2, 3)\\); \\([x] = 3 \\Rightarrow x \\in [3, 4)\\). Union \\([2, 4)\\).\n" +
        "- \\(2[2x - 5] - 1 = 7 \\Rightarrow [2x - 5] = 4 \\Rightarrow 4 \\le 2x - 5 < 5 \\Rightarrow \\dfrac92 \\le x < 5\\).\n" +
        "- Non-integer solutions for \\([x]\\) are discarded: \\([x] = 2.5\\) has no \\(x\\).\n" +
        "- The left end is always included and the right end always excluded; every option list offers all four bracket combinations.",
      formula: {
        label: "Greatest integer",
        latex:
          "[x] = k \\iff k \\le x < k + 1",
      },
      visualizationSlug: "greatest-integer-staircase",
      authoredExample: {
        prompt: "Solve \\([x]^2 - 3[x] - 4 = 0\\) for \\(x\\).",
        steps: [
          "\\(([x] - 4)([x] + 1) = 0 \\Rightarrow [x] = 4\\) or \\(-1\\).",
          "\\(x \\in [4, 5)\\) or \\(x \\in [-1, 0)\\).",
        ],
        answer: "\\(x \\in [-1, 0) \\cup [4, 5)\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(3[x + 1] - 2 = 10\\).",
        steps: [
          "\\([x + 1] = 4 \\Rightarrow 4 \\le x + 1 < 5\\).",
        ],
        answer: "\\(3 \\le x < 4\\)",
      },
      practiceSet: [
        {
          prompt: "\\([x] = -2\\) means \\(x \\in ?\\)",
          answer: "\\([-2, -1)\\)",
        },
        {
          prompt: "\\([2.7] = ?\\), \\([-2.7] = ?\\)",
          answer: "\\(2\\), \\(-3\\)",
        },
        {
          prompt: "Solve \\([x]^2 = 9\\).",
          answer: "\\(x \\in [-3, -2) \\cup [3, 4)\\)",
        },
        {
          prompt: "Solve \\([2x] = 5\\).",
          answer: "\\(\\dfrac52 \\le x < 3\\)",
        },
      ],
      pyqExampleId: "f36570fd-da01-496f-be39-bd974a384811",
      traps: [
        {
          title: "Closing the right end",
          body:
            "\\([x] = 3\\) stops strictly before \\(4\\): at \\(x = 4\\), \\([x] = 4\\) and \\(16 - 20 + 6 \\ne 0\\). The answer is \\([2, 4)\\), never \\([2, 4]\\).",
        },
      ],
    },

    // 4 — identities in f(x+1) - f(x)
    {
      kind: "formula" as const,
      slug: "cetsrf-polynomial-identities-compare-coefficients",
      name: "Identities Like f(x + 1) − f(x) = 8x + 3: Compare Coefficients",
      intuition:
        "An identity holds for EVERY \\(x\\), so after substituting the polynomial and simplifying, the coefficients of each power of \\(x\\) must match on both sides.",
      definition:
        "- \\(f(x) = bx^2 + cx + d\\): \\(f(x + 1) - f(x) = b(2x + 1) + c = 2bx + (b + c)\\). Equal to \\(8x + 3\\): \\(2b = 8\\), \\(b + c = 3\\), so \\(b = 4\\), \\(c = -1\\); \\(d\\) is free.\n" +
        "- A difference \\(f(x + 1) - f(x)\\) lowers the degree by one — a quadratic's difference is linear — so the given right-hand side tells you the degree of \\(f\\).\n" +
        "- The same move solves 'find \\(f\\) given \\(f(g(x))\\)' on the composite page: match the shape, then the coefficients.",
      formula: {
        label: "Comparing coefficients",
        latex:
          "f(x) = bx^2 + cx + d \\Rightarrow f(x+1) - f(x) = 2bx + (b + c)",
      },
      authoredExample: {
        prompt: "If \\(f(x) = ax^2 + bx + 1\\) and \\(f(x + 1) - f(x) = 6x + 5\\) for all \\(x\\), find \\(a\\) and \\(b\\).",
        steps: [
          "\\(f(x + 1) - f(x) = 2ax + (a + b) = 6x + 5\\).",
          "\\(a = 3\\), \\(b = 2\\).",
        ],
        answer: "\\(a = 3,\\ b = 2\\)",
      },
      selfCheckExample: {
        prompt: "If \\(f(x) = px + q\\) and \\(f(f(x)) = 4x + 9\\), find \\(p\\) and \\(q\\) with \\(p > 0\\).",
        steps: [
          "\\(f(f(x)) = p(px + q) + q = p^2x + (pq + q)\\). So \\(p^2 = 4\\), \\(p = 2\\); \\(2q + q = 9\\), \\(q = 3\\).",
        ],
        answer: "\\(p = 2,\\ q = 3\\)",
      },
      pyqExampleId: "5f7626b1-c56d-4743-8029-4b1309c9dd35",
      traps: [
        {
          title: "Substituting one value of x",
          body:
            "Putting \\(x = 0\\) gives one equation in two unknowns. An identity is matched coefficient by coefficient; that yields as many equations as there are unknowns.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Domain and Range — the next page: where a formula is defined",
      href: "/notes/mht-cet-maths/sets-relations-and-functions/cetsrf-domain-and-range",
    },
    {
      label: "Inverse Functions — one-one is exactly what makes an inverse exist",
      href: "/notes/mht-cet-maths/sets-relations-and-functions/cetsrf-inverse-functions",
    },
  ],
};
