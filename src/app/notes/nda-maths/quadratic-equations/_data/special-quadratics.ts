import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIAL_QUADRATICS_NOTE: SubtopicNote = {
  subtopicName: "Special Quadratics — Parametric, Logarithmic, Constructed",
  title: "Special Quadratics — Parametric, Logarithmic & Constructed",
  oneLineDefinition:
    "A family of disguised quadratics: cube-roots-of-unity hooks, modulus and logarithmic equations that reduce to a quadratic, and equations built from a parameter or from their own roots.",
  whyItMatters:
    "16 PYQs, 7 of them HARD — this subtopic is where the chapter's hardest, most disguised questions live. The recurring star is x²+x+1=0, the gateway to the cube roots of unity ω (which also power the ω+Vieta compound). The rest reward one reflex: spot the substitution — split the modulus, name the log, factor the parameter — that turns the disguise back into an ordinary quadratic.",
  concepts: [
    // 1 — cube roots of unity
    {
      kind: "formula" as const,
      slug: "qe-cube-roots-of-unity",
      name: "Cube Roots of Unity — the x² + x + 1 Hook",
      pyqExampleId: "6a9b7d5f-826e-4c37-9060-139b8e6dff37",
      intuition:
        "Whenever you see x² + x + 1 = 0 (or x(x+1)+1 = 0), its roots are the complex cube roots of unity ω and ω². They satisfy two tiny facts — ω³ = 1 and 1 + ω + ω² = 0 — that collapse enormous powers to almost nothing.",
      definition:
        "The roots of \\(x^2 + x + 1 = 0\\) are the non-real cube roots of unity \\(\\omega\\) and \\(\\omega^2\\), with:\n" +
        "- \\(\\omega^3 = 1\\) (so powers cycle with period 3: \\(\\omega^n = \\omega^{\\,n \\bmod 3}\\)),\n" +
        "- \\(1 + \\omega + \\omega^2 = 0\\),\n" +
        "- \\(\\omega^2 = \\bar{\\omega} = \\dfrac{1}{\\omega}\\) (the two roots are each other's square and reciprocal).\n" +
        "So if \\(x\\) is a root of \\(x^2+x+1=0\\): any \\(x^{3k} = 1\\), and a sum like \\(x^n + x^{n+1} + x^{n+2} = x^n(1 + x + x^2) = 0\\).",
      formula: {
        label: "The two defining facts",
        latex: "\\omega^3 = 1, \\qquad 1 + \\omega + \\omega^2 = 0",
      },
      authoredExample: {
        prompt: "If \\(x^2 + x + 1 = 0\\), find \\(x^{16} + x^{17} + x^{18}\\).",
        steps: [
          "Factor out the lowest power: \\(x^{16}(1 + x + x^2)\\).",
          "Since \\(x\\) is a root, \\(1 + x + x^2 = 0\\).",
          "So the whole product is \\(x^{16} \\cdot 0\\).",
        ],
        answer: "\\(0\\).",
      },
      traps: [
        {
          title: "Reduce the exponent mod 3 before anything else",
          body:
            "\\(\\omega^{200}\\) is not a monster — \\(200 = 3(66) + 2\\), so \\(\\omega^{200} = \\omega^2\\). Always replace \\(\\omega^n\\) by \\(\\omega^{n \\bmod 3}\\) first, and look for the \\(1+x+x^2\\) factor to send a sum to zero.",
        },
      ],
    },

    // 2 — constructed symmetric-coefficient equations (set 8c4dbe3e:S4)
    {
      kind: "formula" as const,
      slug: "qe-constructed-symmetric-equations",
      name: "Constructed Symmetric-Coefficient Equations",
      pyqExampleId: "c950779c-6801-4568-988a-d0304b9194a8",
      intuition:
        "When the coefficients are built symmetrically from letters — (q−r), (r−p), (p−q) — they are engineered so the coefficients sum to zero, handing you x = 1 as a free root. The same constructions, set to have equal roots, fold back to the AP/GP/HP conditions from Subtopic 1.",
      definition:
        "Two moves for symbol-coefficient quadratics:\n" +
        "- **Sum-to-zero ⇒ unit root.** For \\((q-r)x^2 + (r-p)x + (p-q) = 0\\), the coefficients add to \\(0\\), so \\(x = 1\\) is a root and the other root is the product \\(\\dfrac{p-q}{q-r}\\) (from \\(1 \\cdot \\beta = c/a\\)).\n" +
        "- **Equal roots ⇒ a progression.** A constructed equation whose roots are equal yields \\(D = 0\\), which simplifies to an AP/GP/HP relation among the letters — often the HP form \\(\\frac{2}{b^2} = \\frac{1}{a^2} + \\frac{1}{c^2}\\) for the squared-coefficient family. The repeated root is \\(x = -\\dfrac{B}{2A}\\) (not \\(-B/A\\)).",
      formula: {
        label: "Symmetric construction ⇒ unit root",
        latex: "(q-r)x^2 + (r-p)x + (p-q) = 0 \\ \\Rightarrow\\ x = 1,\\ \\ x = \\tfrac{p-q}{q-r}",
      },
      authoredExample: {
        prompt: "Find both roots of \\((b-c)x^2 + (c-a)x + (a-b) = 0\\).",
        steps: [
          "Coefficients sum to zero: \\((b-c)+(c-a)+(a-b) = 0\\), so \\(x = 1\\) is a root.",
          "Product of roots \\(= \\dfrac{a-b}{b-c}\\), and one root is \\(1\\).",
        ],
        answer: "\\(x = 1\\) and \\(x = \\dfrac{a-b}{b-c}\\).",
      },
      traps: [
        {
          title: "Repeated root is −B/2A, not −B/A",
          body:
            "For equal roots the single root equals the vertex \\(x = -\\frac{B}{2A}\\) (half of the sum of roots, since both roots coincide). Using \\(-B/A\\) (the full sum) doubles it — the offered wrong answer.",
        },
      ],
    },

    // 3 — modulus equations
    {
      kind: "formula" as const,
      slug: "qe-modulus-equations",
      name: "Modulus Equations Reducing to Quadratics",
      pyqExampleId: "6a45f39e-fab7-4198-a92f-fd236407939f",
      intuition:
        "An absolute value hides a quadratic. Either substitute the modulus as a single non-negative variable, or split into the two sign cases — but always finish by checking each candidate against the domain the case came from.",
      definition:
        "Two strategies for an equation containing \\(|\\,\\cdot\\,|\\):\n" +
        "- **Substitute the modulus:** for \\(|x-a|^2 + |x-a| - 2 = 0\\), set \\(t = |x-a| \\ge 0\\), solve \\(t^2 + t - 2 = 0\\), keep only \\(t \\ge 0\\), then undo \\(t = |x-a|\\).\n" +
        "- **Split by sign:** for \\(|f(x)| = g(x)\\), first require \\(g(x) \\ge 0\\), then solve \\(f(x) = g(x)\\) and \\(f(x) = -g(x)\\), keeping only roots that satisfy the sign assumption.\n" +
        "Note \\(x^2 + k|x| + m = 0\\) with \\(k, m > 0\\) has **no real root** — a sum of non-negative terms can't vanish.",
      formula: {
        label: "Substitute t = |·| ≥ 0",
        latex: "|x-a|^2 + |x-a| - 2 = 0,\\ \\ t = |x-a| \\ge 0 \\ \\Rightarrow\\ t^2 + t - 2 = 0",
      },
      authoredExample: {
        prompt: "Find the sum of the real roots of \\(|x-3|^2 + |x-3| - 2 = 0\\).",
        steps: [
          "Let \\(t = |x-3| \\ge 0\\): \\(t^2 + t - 2 = (t+2)(t-1) = 0\\), so \\(t = 1\\) (reject \\(t = -2\\)).",
          "\\(|x-3| = 1 \\Rightarrow x = 4\\) or \\(x = 2\\).",
          "Sum \\(= 4 + 2\\).",
        ],
        answer: "\\(6\\).",
      },
      traps: [
        {
          title: "A negative value of the modulus variable is impossible",
          body:
            "After \\(t = |x-a|\\), discard any negative \\(t\\) before solving back. And for \\(|f| = g\\), a candidate root is valid only if \\(g \\ge 0\\) there — skip this and you import roots the equation never had.",
        },
      ],
    },

    // 4 — parametric quadratics
    {
      kind: "formula" as const,
      slug: "qe-parametric-quadratics",
      name: "Parametric Quadratics — Factor, Don't Force",
      pyqExampleId: "bdf3d2a1-c0f8-4e3e-8a47-a45c1cf71772",
      intuition:
        "When a quadratic carries a parameter and you're given a specific value of it, the cleaner path is almost always to factor the resulting expression — it usually splits neatly — rather than grinding the quadratic formula through messy symbols.",
      definition:
        "For a parametric quadratic at a given parameter value:\n" +
        "- **Substitute the value, then factor.** E.g. with \\(k = c\\), \\((a+b)x^2 - (a+b+c)x + c = 0\\) factors as \\([(a+b)x - c](x - 1) = 0\\), giving \\(x = 1\\) and \\(x = \\dfrac{c}{a+b}\\) directly — no formula needed.\n" +
        "- **Minimum of a parametric quadratic:** \\(x^2 + kx + k^2\\) has minimum value at the vertex \\(= c - \\dfrac{b^2}{4a} = k^2 - \\dfrac{k^2}{4} = \\dfrac{3k^2}{4}\\).\n" +
        "- For a general parameter, the nature of the roots still comes from the discriminant in terms of that parameter.",
      formula: {
        label: "Vertex (minimum) value, a > 0",
        latex: "\\min(ax^2+bx+c) = c - \\dfrac{b^2}{4a} = -\\dfrac{D}{4a}",
      },
      authoredExample: {
        prompt: "With \\(k = c\\), solve \\((a+b)x^2 - (a+b+c)x + c = 0\\).",
        steps: [
          "Try to factor with \\(x = 1\\): coefficients sum to \\((a+b) - (a+b+c) + c = 0\\), so \\(x = 1\\) is a root.",
          "Factor: \\([(a+b)x - c](x-1) = 0\\).",
        ],
        answer: "\\(x = 1\\) and \\(x = \\dfrac{c}{a+b}\\).",
      },
      traps: [
        {
          title: "Look for the unit-root before the formula",
          body:
            "Parametric quadratics in NDA are nearly always built to factor (often with \\(x=1\\) a root). Reaching for \\(\\frac{-b\\pm\\sqrt{D}}{2a}\\) with symbolic \\(a,b,c\\) is slow and error-prone — test the coefficient sum first.",
        },
      ],
    },

    // 5 — logarithmic quadratics
    {
      kind: "formula" as const,
      slug: "qe-logarithmic-quadratics",
      name: "Logarithmic Equations That Are Quadratics",
      pyqExampleId: "be59b072-fa2e-45be-b68b-becf1fcb8e53",
      intuition:
        "An equation that is quadratic in a logarithm is just an ordinary quadratic in disguise — name the log as a single variable, solve the quadratic, then undo the log. The only extra care is the domain (the argument of a log must be positive).",
      definition:
        "If an equation is quadratic in \\(\\log_b(\\,\\cdot\\,)\\), substitute \\(t = \\log_b(\\text{argument})\\), solve the quadratic in \\(t\\), then convert back with \\(t = \\log_b u \\iff u = b^{\\,t}\\). " +
        "Useful log facts: \\(\\log_b u = \\dfrac{1}{\\log_u b}\\) (reciprocal of base and argument) and \\(\\log_{b^2} u = \\tfrac{1}{2}\\log_b u\\). When the coefficients of the quadratic are themselves logs, the same substitution turns Vieta's relations into relations among the logs.",
      formula: {
        label: "Name the log, solve, invert",
        latex: "t = \\log_b u \\ \\Rightarrow\\ \\text{quadratic in } t,\\quad u = b^{\\,t}",
      },
      authoredExample: {
        prompt: "Solve \\((\\log_{10} x)^2 - 3\\log_{10} x + 2 = 0\\).",
        steps: [
          "Let \\(t = \\log_{10} x\\): \\(t^2 - 3t + 2 = (t-1)(t-2) = 0\\), so \\(t = 1\\) or \\(t = 2\\).",
          "Undo the log: \\(\\log_{10} x = 1 \\Rightarrow x = 10\\); \\(\\log_{10} x = 2 \\Rightarrow x = 100\\).",
        ],
        answer: "\\(x = 10\\) or \\(x = 100\\).",
      },
      traps: [
        {
          title: "Solve for the log first, the variable second",
          body:
            "The quadratic is in \\(t = \\log x\\), not in \\(x\\). Its roots are values of the LOG; you still have to exponentiate to recover \\(x\\). And every recovered \\(x\\) must keep the original log arguments positive.",
        },
      ],
    },

    // 6 — quadratics built from / transformed by their roots
    {
      kind: "formula" as const,
      slug: "qe-constructed-from-roots",
      name: "Quadratics Built From Their Roots",
      pyqExampleId: "f8491cd6-b9ea-4292-aa7a-ed331c39c835",
      intuition:
        "An equation handed to you in a factored or constructed form already shows its sum and product once you expand it — read those off, then build whatever new equation the question wants by computing the new sum and product.",
      definition:
        "Expand a constructed quadratic to standard form and read off Vieta's relations:\n" +
        "- \\(x^2 - ax - bx + (ab - c) = 0\\) is \\(x^2 - (a+b)x + (ab-c) = 0\\), so \\(\\alpha+\\beta = a+b\\) and \\(\\alpha\\beta = ab - c\\).\n" +
        "- To build the equation whose roots are a transform of \\(\\alpha, \\beta\\) (their cubes, shifts, reciprocals), compute the new sum \\(S\\) and product \\(P\\) from \\(\\alpha+\\beta\\) and \\(\\alpha\\beta\\), then write \\(x^2 - Sx + P = 0\\). E.g. if \\(\\alpha^3, \\beta^3\\) are the new roots, \\(S = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)\\) and \\(P = (\\alpha\\beta)^3\\).",
      formula: {
        label: "Expand, then Vieta",
        latex: "x^2 - ax - bx + (ab - c) = 0 \\ \\Rightarrow\\ \\alpha+\\beta = a+b,\\ \\ \\alpha\\beta = ab - c",
      },
      authoredExample: {
        prompt:
          "\\(\\alpha, \\beta\\) are the roots of \\(x^2 + px + q = 0\\). Find the sum of the roots of the equation whose roots are \\(\\alpha^3, \\beta^3\\).",
        steps: [
          "From \\(x^2+px+q=0\\): \\(\\alpha+\\beta = -p\\), \\(\\alpha\\beta = q\\).",
          "New sum \\(= \\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta) = (-p)^3 - 3q(-p)\\).",
        ],
        answer: "\\(-p^3 + 3pq\\).",
      },
      traps: [
        {
          title: "Expand the constructed form before reading coefficients",
          body:
            "\\(x^2 - ax - bx + ab - c\\) looks like it has linear coefficient \\(-a\\) or \\(-b\\); it doesn't until you combine them into \\(-(a+b)\\). Always collect like terms to standard form before applying Vieta.",
        },
      ],
    },
  ],
};
