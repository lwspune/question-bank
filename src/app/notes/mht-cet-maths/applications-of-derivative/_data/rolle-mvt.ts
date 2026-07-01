import type { SubtopicNote } from "@/app/notes/_types";

export const ROLLE_MVT_NOTE: SubtopicNote = {
  subtopicName: "Rolle's Theorem and Mean Value Theorem",
  title: "Rolle's Theorem and the Mean Value Theorem",
  oneLineDefinition:
    "If a function is smooth on an interval with equal endpoint values, its graph must level off somewhere (Rolle); more generally, some tangent must be parallel to the chord joining the endpoints (Lagrange). The whole subtopic is checking the three hypotheses, then solving f'(c) for the point c.",
  whyItMatters:
    "One of the most reliably tested subtopics in MHT-CET calculus: 18 PYQs sit here (3 HARD, 12 MODERATE, 3 EASY). The paper recycles a small set of moves — verify Rolle and find c, count how many c work, apply LMVT and solve for c, or use 'Rolle holds' to back out unknown coefficients a and b. " +
    "The recurring traps are always the same: rejecting a root of f'(c)=0 that falls outside the open interval, forgetting that MVT needs differentiability (not just continuity), and confusing Rolle's f(a)=f(b) requirement with LMVT's chord slope.",
  concepts: [
    // 1 — Rolle's theorem: the three hypotheses + conclusion (foundation, PYQ-anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-rolle-theorem",
      name: "Rolle's Theorem — the Three Hypotheses and the Conclusion",
      intuition:
        "If a smooth curve starts and ends at the same height over [a, b], it cannot rise without coming back down — somewhere in between its tangent must be flat. That flat spot is a point c where f'(c) = 0. Rolle's theorem promises at least one such c, provided three hypotheses hold.",
      definition:
        "**Rolle's theorem.** If \\(f\\) satisfies all three hypotheses:\n" +
        "- \\(f\\) is **continuous** on the closed interval \\([a, b]\\),\n" +
        "- \\(f\\) is **differentiable** on the open interval \\((a, b)\\),\n" +
        "- \\(f(a) = f(b)\\) (equal endpoint values),\n\n" +
        "then there exists at least one \\(c \\in (a, b)\\) with \\(f'(c) = 0\\).\n\n" +
        "In practice: check the hypotheses (for a polynomial, continuity and differentiability are automatic — only \\(f(a)=f(b)\\) needs verifying), then solve \\(f'(x)=0\\) and keep the root that lies **inside** \\((a,b)\\).",
      formula: {
        label: "Rolle's theorem",
        latex:
          "f \\text{ cont. on }[a,b],\\ \\text{diff. on }(a,b),\\ f(a)=f(b)\\ \\Rightarrow\\ \\exists\\, c\\in(a,b):\\ f'(c)=0",
        symbols: [
          { symbol: "c", meaning: "point inside (a, b) where the tangent is horizontal" },
          { symbol: "f(a)=f(b)", meaning: "the equal-endpoint hypothesis unique to Rolle" },
        ],
      },
      authoredExample: {
        prompt:
          "Verify Rolle's theorem for \\(f(x) = x^2 - 4x + 3\\) on \\([1, 3]\\) and find \\(c\\).",
        steps: [
          "\\(f\\) is a polynomial, so it is continuous on \\([1,3]\\) and differentiable on \\((1,3)\\).",
          "Endpoint values: \\(f(1) = 1 - 4 + 3 = 0\\) and \\(f(3) = 9 - 12 + 3 = 0\\), so \\(f(1) = f(3)\\). All three hypotheses hold.",
          "Solve \\(f'(x) = 2x - 4 = 0 \\Rightarrow x = 2\\).",
          "\\(c = 2 \\in (1,3)\\), so Rolle's theorem is verified with \\(c = 2\\).",
        ],
        answer: "\\(c = 2\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(f(x) = x^2 - 6x + 8\\) on \\([2, 4]\\), verify the hypotheses of Rolle's theorem and find \\(c\\).",
        steps: [
          "Polynomial ⇒ continuous on \\([2,4]\\), differentiable on \\((2,4)\\).",
          "\\(f(2) = 4 - 12 + 8 = 0\\), \\(f(4) = 16 - 24 + 8 = 0\\): equal endpoints.",
          "\\(f'(x) = 2x - 6 = 0 \\Rightarrow x = 3 \\in (2,4)\\).",
        ],
        answer: "\\(c = 3\\)",
      },
      practiceSet: [
        { prompt: "State the third (interval-endpoint) hypothesis of Rolle's theorem.", answer: "\\(f(a) = f(b)\\)" },
        { prompt: "What does Rolle guarantee about \\(f'\\)?", answer: "\\(f'(c) = 0\\) for some \\(c \\in (a,b)\\)" },
        { prompt: "For a polynomial on \\([a,b]\\), which hypothesis actually needs checking?", answer: "\\(f(a) = f(b)\\) (continuity + differentiability are automatic)" },
        { prompt: "Find \\(c\\) for \\(f(x)=x^2-2x\\) on \\([0,2]\\).", answer: "\\(c = 1\\)", method: "\\(2x-2=0\\)" },
      ],
      pyqExampleId: "c905d00b-f3d5-4f5a-a4cb-04ba18e65576", // Rolle for x^3-3x^2+2x on [0,2], c = 1 ± 1/√3
      traps: [
        {
          title: "All THREE hypotheses are required, not just f(a) = f(b)",
          body:
            "Rolle needs continuity on \\([a,b]\\) AND differentiability on \\((a,b)\\) AND \\(f(a)=f(b)\\). A function like \\(f(x)=|x|\\) on \\([-1,1]\\) has \\(f(-1)=f(1)=1\\) but is NOT differentiable at \\(0\\), so Rolle does not apply — there is no \\(c\\) with \\(f'(c)=0\\). Never skip the differentiability check.",
        },
        {
          title: "Rolle gives f'(c) = 0, not the chord slope",
          body:
            "Rolle's conclusion is specifically \\(f'(c)=0\\) (a horizontal tangent), because the endpoints are equal. If the endpoints differ, use the Mean Value Theorem instead — its conclusion is \\(f'(c)=\\frac{f(b)-f(a)}{b-a}\\), which reduces to \\(0\\) only when \\(f(a)=f(b)\\).",
        },
      ],
    },

    // 2 — Rolle: find c, reject roots outside (a,b) (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-rolle-find-c",
      name: "Finding c and Rejecting Roots Outside the Interval",
      intuition:
        "Once the hypotheses hold, finding \\(c\\) is just solving \\(f'(x)=0\\). But \\(f'\\) often has more than one root — and Rolle only promises a \\(c\\) that lies STRICTLY between \\(a\\) and \\(b\\). So compute every root, then discard any that fall outside the open interval \\((a,b)\\).",
      definition:
        "To find the Rolle point \\(c\\):\n" +
        "- Solve \\(f'(x) = 0\\) to get all candidate values.\n" +
        "- **Keep only the candidates that lie inside the open interval \\((a,b)\\)**; reject the rest.\n\n" +
        "For products/exponential-times-polynomial forms, differentiate carefully (product rule + chain rule) — the exponential factor \\(e^{kx}\\) is never zero, so it only scales \\(f'\\); the roots come entirely from the polynomial factor. Set that polynomial factor to zero and filter by the interval.",
      formula: {
        label: "Rolle point from f'(x) = 0",
        latex: "f'(c) = 0,\\quad c \\in (a,b)\\ \\ \\text{(reject any root outside the interval)}",
      },
      authoredExample: {
        prompt:
          "Rolle's theorem holds for \\(f(x) = (x-1)(x-4)\\) on \\([1,4]\\). Find \\(c\\), rejecting any root outside the interval.",
        steps: [
          "Expand: \\(f(x) = x^2 - 5x + 4\\), so \\(f'(x) = 2x - 5\\).",
          "Solve \\(f'(x) = 0\\): \\(x = \\tfrac{5}{2} = 2.5\\).",
          "Check the interval: \\(2.5 \\in (1,4)\\) ✓ — accept it.",
        ],
        answer: "\\(c = \\dfrac{5}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(f(x) = x(x+3)e^{-x/2}\\) satisfies Rolle's theorem on \\([-3, 0]\\), find \\(c\\).",
        steps: [
          "Differentiate: \\(f'(x) = -\\tfrac12 e^{-x/2}(x^2 - x - 6)\\).",
          "Since \\(e^{-x/2} \\neq 0\\), set the polynomial factor to zero: \\(x^2 - x - 6 = 0 \\Rightarrow (x-3)(x+2)=0 \\Rightarrow x = 3\\) or \\(x = -2\\).",
          "Only \\(c = -2 \\in (-3, 0)\\); reject \\(x = 3\\) (outside the interval).",
        ],
        answer: "\\(c = -2\\)",
      },
      practiceSet: [
        { prompt: "\\(f'(x) = (x-1)(x-5)\\) on \\([0,3]\\). Which root is the Rolle point?", answer: "\\(c = 1\\)", method: "reject \\(x=5 \\notin (0,3)\\)" },
        { prompt: "Rolle point must lie in which interval — \\([a,b]\\) or \\((a,b)\\)?", answer: "The open interval \\((a,b)\\)" },
        { prompt: "For \\(f'(x) = e^{x}(x^2 - 9)\\) on \\([-4, 0]\\), find \\(c\\).", answer: "\\(c = -3\\)", method: "\\(e^x \\neq 0\\); reject \\(x=3\\)" },
        { prompt: "If both roots of \\(f'\\) lie in \\((a,b)\\), how many valid \\(c\\)?", answer: "Two" },
      ],
      pyqExampleId: "7091276a-ad45-4a30-9969-b0a7956f6ae0", // f(x)=x√(x+6) on [-6,0], c = -4
      traps: [
        {
          title: "Reject any root of f'(c) = 0 that lies OUTSIDE (a, b)",
          body:
            "Solving \\(f'(x)=0\\) can give roots that Rolle never promised. For \\(f(x)=x(x+3)e^{-x/2}\\) on \\([-3,0]\\), \\(f'\\) vanishes at \\(x=3\\) and \\(x=-2\\), but only \\(-2\\) lies in \\((-3,0)\\). Picking \\(x=3\\) is the single most common mistake — always filter candidates by the interval.",
        },
        {
          title: "The exponential factor is never zero",
          body:
            "In a form like \\(f'(x)=e^{-x/2}\\,(\\text{polynomial})\\), the factor \\(e^{-x/2}>0\\) always. So \\(f'(c)=0\\) forces the POLYNOMIAL factor to be zero — never set the exponential to zero. It only affects sign/scaling, not the location of the Rolle point.",
        },
      ],
    },

    // 3 — Counting the number of valid c (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-count-c",
      name: "Counting the Number of Valid c",
      intuition:
        "Some questions do not ask for the value of \\(c\\) but for HOW MANY values of \\(c\\) satisfy the conclusion. For a trigonometric function like \\(\\sin(k\\pi x)\\), \\(f'(x)=0\\) has many solutions — so you count all the roots of \\(f'\\) that fall inside the open interval.",
      definition:
        "To count the Rolle/MVT points:\n" +
        "- Write \\(f'(x)=0\\) and solve the resulting trigonometric (or polynomial) equation over the open interval.\n" +
        "- **Count every solution that lies strictly inside** \\((a,b)\\).\n\n" +
        "For \\(f(x)=\\sin(k\\pi x)\\), \\(f'(x)=k\\pi\\cos(k\\pi x)\\); \\(f'=0\\) where \\(\\cos(k\\pi x)=0\\), i.e. \\(k\\pi x = \\pm\\tfrac{\\pi}{2}, \\pm\\tfrac{3\\pi}{2}, \\dots\\). List these, then keep the ones inside the interval and count them.",
      formula: {
        label: "Number of Rolle points",
        latex: "\\#\\{\\,c\\in(a,b): f'(c)=0\\,\\} = \\text{number of roots of } f'(x)=0 \\text{ inside } (a,b)",
      },
      authoredExample: {
        prompt:
          "How many values of \\(c\\) satisfy Rolle's theorem for \\(f(x) = \\sin \\pi x\\) on \\([0, 2]\\)?",
        steps: [
          "\\(f(0) = \\sin 0 = 0\\), \\(f(2) = \\sin 2\\pi = 0\\): endpoints equal, hypotheses hold.",
          "\\(f'(x) = \\pi\\cos \\pi x = 0 \\Rightarrow \\cos \\pi x = 0 \\Rightarrow \\pi x = \\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2}\\).",
          "So \\(x = \\tfrac12, \\tfrac32\\), both in \\((0,2)\\).",
        ],
        answer: "Two values of \\(c\\): \\(x = \\tfrac12\\) and \\(x = \\tfrac32\\).",
      },
      selfCheckExample: {
        prompt:
          "How many values of \\(c\\) satisfy the conclusion of Rolle's theorem for \\(f(x) = \\sin 2\\pi x\\) on \\([-1, 1]\\)?",
        steps: [
          "\\(f(-1) = \\sin(-2\\pi) = 0 = \\sin(2\\pi) = f(1)\\): endpoints equal.",
          "\\(f'(x) = 2\\pi\\cos 2\\pi x = 0 \\Rightarrow \\cos 2\\pi x = 0 \\Rightarrow 2\\pi x = \\pm\\tfrac{\\pi}{2}, \\pm\\tfrac{3\\pi}{2}\\).",
          "So \\(x = \\pm\\tfrac14, \\pm\\tfrac34\\) — four values, all in \\((-1,1)\\).",
        ],
        answer: "Four values of \\(c\\).",
      },
      practiceSet: [
        { prompt: "\\(f'(x)=\\cos \\pi x = 0\\) on \\((0,1)\\): how many roots?", answer: "One (\\(x = \\tfrac12\\))" },
        { prompt: "How many \\(c\\) for \\(f(x)=\\sin \\pi x\\) on \\([0,3]\\)?", answer: "Three (\\(x = \\tfrac12, \\tfrac32, \\tfrac52\\))" },
        { prompt: "To count Rolle points, count roots of \\(f'\\) that lie where?", answer: "Strictly inside \\((a,b)\\)" },
        { prompt: "\\(f(x)=\\sin 2\\pi x\\) on \\([0,1]\\): how many \\(c\\)?", answer: "Two (\\(x = \\tfrac14, \\tfrac34\\))" },
      ],
      pyqExampleId: "ba95ed0e-aa3b-490f-8a34-a3629da60d16", // sin 2πx on [-1,1], answer 4
      traps: [
        {
          title: "Count roots INSIDE the open interval only — mind the endpoints",
          body:
            "When counting \\(c\\), include only roots strictly between \\(a\\) and \\(b\\). For \\(\\sin 2\\pi x\\) on \\([-1,1]\\) the roots of \\(f'\\) are \\(\\pm\\tfrac14, \\pm\\tfrac34\\) — four values, all interior. A root landing exactly on an endpoint would NOT count. Sketch or list them; don't guess the count.",
        },
        {
          title: "Solve the full trig equation — don't stop at the first solution",
          body:
            "\\(\\cos(k\\pi x)=0\\) has infinitely many solutions; over a finite interval several survive. Writing \\(k\\pi x = \\pm\\tfrac{\\pi}{2}, \\pm\\tfrac{3\\pi}{2}, \\dots\\) systematically and filtering by the interval avoids under-counting (a common way to pick '02' when the answer is '04').",
        },
      ],
    },

    // 4 — Lagrange's Mean Value Theorem: statement + find c (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-lmvt",
      name: "Lagrange's Mean Value Theorem — Statement and Finding c",
      intuition:
        "Rolle needs equal endpoints; Lagrange removes that restriction. Over any smooth arc from \\((a, f(a))\\) to \\((b, f(b))\\), there is a point where the tangent is parallel to the CHORD joining the ends. The chord's slope is \\(\\frac{f(b)-f(a)}{b-a}\\), so LMVT says \\(f'(c)\\) equals that slope for some \\(c\\) inside.",
      definition:
        "**Lagrange's Mean Value Theorem (LMVT).** If \\(f\\) is continuous on \\([a,b]\\) and differentiable on \\((a,b)\\), then there exists \\(c \\in (a,b)\\) with\n" +
        "\\[f'(c) = \\dfrac{f(b) - f(a)}{b - a}.\\]\n" +
        "To find \\(c\\): compute the chord slope \\(\\frac{f(b)-f(a)}{b-a}\\), set \\(f'(x)\\) equal to it, solve, and keep the root inside \\((a,b)\\). Rolle is the special case \\(f(a)=f(b)\\), where the chord slope is \\(0\\).",
      formula: {
        label: "Lagrange's Mean Value Theorem",
        latex: "f'(c) = \\dfrac{f(b) - f(a)}{b - a},\\qquad c \\in (a,b)",
        symbols: [
          { symbol: "\\frac{f(b)-f(a)}{b-a}", meaning: "slope of the chord joining the endpoints" },
          { symbol: "f'(c)", meaning: "slope of the tangent at the guaranteed point c" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the value of \\(c\\) of LMVT for \\(f(x) = x^2\\) on \\([1, 3]\\).",
        steps: [
          "Chord slope: \\(\\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9 - 1}{2} = 4\\).",
          "\\(f'(x) = 2x\\); set equal to the chord slope: \\(2c = 4 \\Rightarrow c = 2\\).",
          "\\(c = 2 \\in (1,3)\\) ✓.",
        ],
        answer: "\\(c = 2\\)",
      },
      selfCheckExample: {
        prompt:
          "Find \\(c\\) of LMVT for \\(f(x) = x^2 - 3x\\) on \\([1, 4]\\).",
        steps: [
          "Chord slope: \\(\\dfrac{f(4) - f(1)}{4 - 1} = \\dfrac{4 - (-2)}{3} = \\dfrac{6}{3} = 2\\).",
          "\\(f'(x) = 2x - 3\\); set equal to the chord slope: \\(2c - 3 = 2\\).",
          "Solve: \\(2c = 5 \\Rightarrow c = \\tfrac52 \\in (1,4)\\) ✓.",
        ],
        answer: "\\(c = \\dfrac{5}{2}\\)",
      },
      practiceSet: [
        { prompt: "Chord slope of \\(f(x)=x^2\\) on \\([0,4]\\)?", answer: "\\(4\\)", method: "\\((16-0)/4\\)" },
        { prompt: "LMVT for \\(f(x)=\\log x\\) on \\([1,e]\\): find \\(c\\).", answer: "\\(c = e - 1\\)", method: "\\(1/c = 1/(e-1)\\)" },
        { prompt: "Rolle is the special case of LMVT when the chord slope is?", answer: "\\(0\\) (i.e. \\(f(a)=f(b)\\))" },
        { prompt: "If \\(f(1)=1\\) and \\(f'(x)\\le 5\\) on \\([1,5]\\), max of \\(f(5)\\)?", answer: "\\(21\\)", method: "\\(f(5)-1 \\le 4\\times5\\)" },
      ],
      pyqExampleId: "ae34d84f-eed4-447e-bbc2-e48e1fa16d85", // LMVT √(25-x²) on [1,5], c=√15
      traps: [
        {
          title: "MVT needs DIFFERENTIABILITY, not just continuity",
          body:
            "Both hypotheses must hold: continuous on \\([a,b]\\) AND differentiable on \\((a,b)\\). A function continuous but with a corner (non-differentiable) inside the interval can fail to have a valid \\(c\\). Continuity alone is not enough — always confirm differentiability before applying LMVT.",
        },
        {
          title: "Chord slope uses f(b) − f(a), not f'(a) or f'(b)",
          body:
            "The right-hand side of LMVT is the average slope \\(\\frac{f(b)-f(a)}{b-a}\\) — a difference of FUNCTION values over the interval width, not a derivative at an endpoint. A frequent slip is to compute \\(f'(a)\\) or \\(f'(b)\\) instead of the chord slope.",
        },
        {
          title: "Bounding trick: f(b) − f(a) ≤ (b − a)·max f'",
          body:
            "When \\(f'(x) \\le M\\) everywhere, LMVT gives \\(f(b) - f(a) = f'(c)(b-a) \\le M(b-a)\\). So if \\(f(1)=1\\) and \\(f'\\le 5\\) on \\([1,5]\\), then \\(f(5) \\le 1 + 5\\cdot 4 = 21\\). Use the theorem as an INEQUALITY to bound a value.",
        },
      ],
    },

    // 5 — Verify hypotheses ⇒ solve parameters a,b; geometric MVT (tangent ∥ chord) (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-verify-parameters",
      name: "Solving Unknown Parameters and the Tangent-Parallel-to-Chord View",
      intuition:
        "A whole family of questions says 'Rolle (or MVT) holds for \\(f\\) at a GIVEN point \\(c\\)' and asks you to find unknown coefficients \\(a, b\\). Each piece of the theorem is an equation: \\(f(a)=f(b)\\) gives one, and \\(f'(c)=0\\) (Rolle) or \\(f'(c)=\\text{chord slope}\\) (MVT) gives another — two equations, two unknowns. Geometrically, MVT is just 'find the point where the tangent is parallel to the chord.'",
      definition:
        "**Back-solving parameters.** Given that the theorem holds with a specified \\(c\\):\n" +
        "- Write the endpoint equation: **Rolle** ⇒ \\(f(a)=f(b)\\); **MVT** ⇒ (usually) also \\(f(a)=f(b)\\) or the given chord.\n" +
        "- Write the interior equation: **Rolle** ⇒ \\(f'(c)=0\\); **MVT** ⇒ \\(f'(c)=\\frac{f(b)-f(a)}{b-a}\\).\n" +
        "- Solve the resulting simultaneous equations for the unknowns.\n\n" +
        "**Tangent parallel to chord (geometric MVT).** 'Find the point(s) where the tangent is parallel to the chord \\(AB\\)' means: compute the chord slope through \\(A, B\\), set \\(f'(x)\\) equal to it, and solve for \\(x\\) — the same computation as finding the LMVT point.",
      formula: {
        label: "Two equations from 'the theorem holds at c'",
        latex: "\\underbrace{f(a)=f(b)}_{\\text{endpoint}} \\quad \\text{and} \\quad \\underbrace{f'(c)=0}_{\\text{Rolle at given }c}",
      },
      authoredExample: {
        prompt:
          "Rolle's theorem holds for \\(f(x) = x^3 + ax^2 + bx\\) on \\([0, 3]\\) at the point \\(c = 1\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "Endpoint equation \\(f(0) = f(3)\\): \\(0 = 27 + 9a + 3b \\Rightarrow 3a + b = -9\\).",
          "Interior equation \\(f'(c) = 0\\): \\(f'(x) = 3x^2 + 2ax + b\\), so \\(f'(1) = 3 + 2a + b = 0 \\Rightarrow 2a + b = -3\\).",
          "Solve the pair \\(3a + b = -9,\\ 2a + b = -3\\): subtract to get \\(a = -6\\), then \\(b = -3 - 2(-6) = 9\\).",
        ],
        answer: "\\(a = -6,\\ b = 9\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(A(1,-3), B(4,3)\\) lie on the curve \\(y = x - \\dfrac{4}{x}\\). Find the points on the curve where the tangent is parallel to the chord \\(AB\\).",
        steps: [
          "Chord slope: \\(\\dfrac{3 - (-3)}{4 - 1} = \\dfrac{6}{3} = 2\\).",
          "\\(\\dfrac{dy}{dx} = 1 + \\dfrac{4}{x^2}\\); set equal to \\(2\\): \\(1 + \\dfrac{4}{x^2} = 2 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2\\).",
          "Compute \\(y\\): at \\(x=2\\), \\(y = 2 - 2 = 0\\); at \\(x=-2\\), \\(y = -2 + 2 = 0\\).",
        ],
        answer: "\\((2, 0)\\) and \\((-2, 0)\\).",
      },
      practiceSet: [
        { prompt: "Rolle for \\(x^3 - 6x^2 + ax + b\\) on \\([1,3]\\) needs \\(f(1)=f(3)\\). Find \\(a\\).", answer: "\\(a = 11\\)", method: "\\(a+b-5 = 3a+b-27\\)" },
        { prompt: "'Tangent parallel to chord' means set \\(f'(x)\\) equal to?", answer: "The chord slope \\(\\frac{f(b)-f(a)}{b-a}\\)" },
        { prompt: "Two unknowns \\(a,b\\) need how many equations?", answer: "Two (endpoint + interior)" },
        { prompt: "Chord slope through \\((1,-3),(4,3)\\)?", answer: "\\(2\\)", method: "\\((3+3)/(4-1)\\)" },
      ],
      pyqExampleId: "aee2ee7b-e28c-4309-a65d-6566ca7d9d8b", // Rolle x^3+ax^2+bx on [1,2] at c=4/3 → a=-5,b=8
      traps: [
        {
          title: "You need BOTH equations — endpoint and interior",
          body:
            "Using only \\(f(a)=f(b)\\) fixes just one relation between \\(a\\) and \\(b\\); some options may share that value. You must ALSO use \\(f'(c)=0\\) (or the chord condition) at the given \\(c\\) to pin down both. Solving one equation and matching a partial answer is how students land on the wrong option.",
        },
        {
          title: "Watch coefficient order — 'a and b respectively'",
          body:
            "Options like \\((11, -6)\\) vs \\((-6, 11)\\) differ only by which value is \\(a\\) and which is \\(b\\). Track exactly which unknown you solved for; re-substitute into the original \\(f\\) to confirm the pair actually satisfies \\(f(a)=f(b)\\) and \\(f'(c)=0\\) before selecting.",
        },
      ],
    },
  ],
  related: [
    { label: "Applications of Derivative (chapter)", href: "/notes/mht-cet-maths/applications-of-derivative" },
    { label: "Differentiation notes", href: "/notes/mht-cet-maths/differentiation" },
  ],
};
