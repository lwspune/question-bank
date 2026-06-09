import type { SubtopicNote } from "@/app/notes/_types";

export const VIETA_NOTE: SubtopicNote = {
  subtopicName: "Vieta's Relations and Root-Coefficient Identities",
  title: "Vieta's Relations & Root-Coefficient Identities",
  oneLineDefinition:
    "Vieta's relations tie the sum and product of the roots directly to the coefficients — so almost any question about the roots can be answered from a, b, c without ever finding the roots themselves.",
  whyItMatters:
    "This is the chapter's centre of gravity — 26 PYQs, 11 of them HARD. The pattern is relentless: a question asks for a symmetric expression in the roots (their squares, cubes, reciprocals), or to build a new equation from transformed roots, and the whole thing collapses to sum and product. It also powers the ω+Vieta compound. Internalise α+β = −b/a and αβ = c/a together with the symmetric-function identities and most of these are one-liners.",
  concepts: [
    // 1 — sum & product
    {
      kind: "formula" as const,
      slug: "qe-vieta-sum-product",
      name: "Vieta's Relations — Sum and Product of Roots",
      pyqExampleId: "9f41517b-6d4b-4264-841a-cc52af6e1f35",
      intuition:
        "Expanding a(x−α)(x−β) and matching it to ax²+bx+c forces two identities: the sum of the roots is −b/a and the product is c/a. They are the workhorse of the whole chapter.",
      definition:
        "If \\(\\alpha, \\beta\\) are the roots of \\(ax^2 + bx + c = 0\\), then\n" +
        "\\[\\alpha + \\beta = -\\dfrac{b}{a}, \\qquad \\alpha\\beta = \\dfrac{c}{a}.\\]\n" +
        "Consequences worth memorising:\n" +
        "- **Reciprocal roots** (one root \\(= 1/\\)other) \\(\\iff \\alpha\\beta = 1 \\iff c = a\\).\n" +
        "- **Roots equal in magnitude, opposite sign** \\(\\iff \\alpha+\\beta = 0 \\iff b = 0\\).\n" +
        "- **Sum of roots \\(=\\) product of roots** \\(\\iff -b = c\\).\n" +
        "- Sign reading: if \\(a,b,c\\) are all positive then \\(\\alpha+\\beta<0\\) and \\(\\alpha\\beta>0\\), so both roots are negative.",
      formula: {
        label: "Vieta's relations",
        latex: "\\alpha + \\beta = -\\dfrac{b}{a}, \\qquad \\alpha\\beta = \\dfrac{c}{a}",
      },
      authoredExample: {
        prompt: "One root of \\(3x^2 - 10x + k = 0\\) is the reciprocal of the other. Find \\(k\\).",
        steps: [
          "Reciprocal roots means the product of roots is \\(1\\).",
          "Product \\(= \\dfrac{c}{a} = \\dfrac{k}{3}\\), so \\(\\dfrac{k}{3} = 1\\).",
        ],
        answer: "\\(k = 3\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(x^2 - 7x + 12 = 0\\): sum and product?", answer: "Sum \\(7\\), product \\(12\\).", method: "\\(-b/a = 7,\\ c/a = 12\\)." },
        { prompt: "For what \\(b\\) are the roots of \\(x^2 + bx + 9 = 0\\) equal in magnitude, opposite in sign?", answer: "\\(b = 0\\)", method: "Need \\(\\alpha+\\beta = -b = 0\\)." },
      ],
    },

    // 2 — symmetric functions + forming new equations
    {
      kind: "formula" as const,
      slug: "qe-symmetric-functions",
      name: "Symmetric Functions & Forming New Equations",
      pyqExampleId: "152ebac8-3f65-4fff-826e-a0e03f11cc67",
      intuition:
        "Any expression in the roots that is unchanged when you swap α and β — their squares, cubes, difference, reciprocals — can be rewritten using only the sum s and product p. Compute the new sum and new product, and you can even build the quadratic whose roots are the transformed ones.",
      definition:
        "Let \\(s = \\alpha+\\beta\\), \\(p = \\alpha\\beta\\). The standard identities:\n" +
        "- \\(\\alpha^2 + \\beta^2 = s^2 - 2p\\)\n" +
        "- \\((\\alpha-\\beta)^2 = s^2 - 4p\\)\n" +
        "- \\(\\alpha^3 + \\beta^3 = s^3 - 3ps = s(s^2 - 3p)\\)\n" +
        "- \\(\\dfrac{1}{\\alpha} + \\dfrac{1}{\\beta} = \\dfrac{s}{p}\\)\n" +
        "**Forming a new equation:** if the new roots have sum \\(S\\) and product \\(P\\), the quadratic is \\(x^2 - Sx + P = 0\\). Compute \\(S\\) and \\(P\\) as symmetric functions of \\(\\alpha,\\beta\\).",
      formula: {
        label: "Build the equation from new sum & product",
        latex: "x^2 - S x + P = 0, \\quad S = \\text{(new sum)},\\ P = \\text{(new product)}",
      },
      authoredExample: {
        prompt: "If \\(p, q\\) are the roots of \\(x^2 - 5x + 2 = 0\\), find \\(p^3 + q^3\\).",
        steps: [
          "Sum \\(s = 5\\), product \\(pq = 2\\).",
          "\\(p^3 + q^3 = s(s^2 - 3p) = 5(25 - 6) = 5 \\times 19\\).",
        ],
        answer: "\\(95\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\alpha,\\beta\\) are the roots of \\(x^2 - 4x + 1 = 0\\), form the equation whose roots are \\(\\alpha^2, \\beta^2\\).",
        steps: [
          "\\(s = 4,\\ p = 1\\). New sum \\(S = \\alpha^2+\\beta^2 = s^2 - 2p = 16 - 2 = 14\\).",
          "New product \\(P = (\\alpha\\beta)^2 = 1\\).",
          "Equation: \\(x^2 - Sx + P = 0\\).",
        ],
        answer: "\\(x^2 - 14x + 1 = 0\\).",
      },
      traps: [
        {
          title: "Difference of roots uses −4p, sum of squares uses −2p",
          body:
            "\\((\\alpha-\\beta)^2 = s^2 - 4p\\) but \\(\\alpha^2+\\beta^2 = s^2 - 2p\\). Mixing the \\(2\\) and the \\(4\\) is the single most common Vieta error.",
        },
      ],
    },

    // 3 — special root relations: AM/GM/HM, equal-mag-opposite
    {
      kind: "formula" as const,
      slug: "qe-special-root-relations",
      name: "Means of the Roots & Equal-Magnitude Conditions",
      pyqExampleId: "dca6297c-fb31-41fb-beab-a782a5a59d23",
      intuition:
        "The arithmetic, geometric and harmonic means of the two roots are themselves just sum and product in disguise — so questions about the AM/GM/HM of the roots, or about roots equal in magnitude but opposite in sign, are pure Vieta.",
      definition:
        "For roots \\(\\alpha, \\beta\\) of \\(ax^2+bx+c=0\\):\n" +
        "- **AM** \\(= \\dfrac{\\alpha+\\beta}{2} = -\\dfrac{b}{2a}\\)\n" +
        "- **GM** \\(= \\sqrt{\\alpha\\beta} = \\sqrt{\\dfrac{c}{a}}\\)\n" +
        "- **HM** \\(= \\dfrac{2\\alpha\\beta}{\\alpha+\\beta} = \\dfrac{2c}{-b} = -\\dfrac{2c}{b}\\)\n" +
        "- **Roots of equal magnitude, opposite sign:** \\(\\alpha+\\beta = 0\\) (so \\(b = 0\\)) **and** \\(\\alpha\\beta < 0\\) (so \\(\\frac{c}{a} < 0\\)). Both conditions are required.",
      formula: {
        label: "Means of the roots",
        latex: "\\text{AM} = -\\tfrac{b}{2a},\\quad \\text{GM} = \\sqrt{\\tfrac{c}{a}},\\quad \\text{HM} = -\\tfrac{2c}{b}",
      },
      authoredExample: {
        prompt: "Find the harmonic mean of the roots of \\(2x^2 - 9x + 6 = 0\\).",
        steps: [
          "Sum \\(= \\dfrac{9}{2}\\), product \\(= \\dfrac{6}{2} = 3\\).",
          "HM \\(= \\dfrac{2 \\times \\text{product}}{\\text{sum}} = \\dfrac{2 \\times 3}{9/2} = \\dfrac{6}{9/2} = \\dfrac{12}{9}\\).",
        ],
        answer: "\\(\\dfrac{4}{3}\\).",
      },
      traps: [
        {
          title: "Equal magnitude opposite sign needs TWO conditions",
          body:
            "\\(b = 0\\) alone only makes the roots negatives of each other IF they are real — you also need \\(\\frac{c}{a} < 0\\) for the roots to be real (and nonzero). A parameter value giving \\(b=0\\) but \\(\\frac{c}{a}>0\\) yields imaginary roots, not \\(\\pm k\\).",
        },
      ],
    },

    // 4 — cross-equation conditions
    {
      kind: "formula" as const,
      slug: "qe-cross-equation-conditions",
      name: "Cross-Equation and Shared-Ratio Conditions",
      pyqExampleId: "59dc0328-738f-4233-a62d-7755c5f71ae8",
      intuition:
        "When a value is a root of one equation and another value is a root of a second, substitute each into its equation and combine the two resulting relations — usually subtracting them is the key move. Two equations sharing a root-ratio link their coefficients.",
      definition:
        "Two recurring cross-equation setups:\n" +
        "- **Swapped roots:** \"\\(n\\) is a root of \\(x^2+px+m=0\\) and \\(m\\) is a root of \\(x^2+px+n=0\\)\" — substitute to get \\(n^2+pn+m=0\\) and \\(m^2+pm+n=0\\); **subtract** them and factor out \\((n-m)\\) to get \\(m+n+p = 1\\) (when \\(m \\neq n\\)).\n" +
        "- **Same ratio of roots:** if \\(ax^2+bx+c=0\\) and \\(px^2+qx+r=0\\) have roots in the same ratio, then \\(\\dfrac{b^2}{ac} = \\dfrac{q^2}{pr}\\) (equivalently \\(b^2 pr = q^2 ac\\)).",
      formula: {
        label: "Subtract the substituted equations",
        latex: "n^2+pn+m = 0,\\ \\ m^2+pm+n = 0 \\ \\Rightarrow\\ (n-m)(n+m+p-1) = 0",
      },
      authoredExample: {
        prompt:
          "\\(a\\) is a root of \\(x^2 + 3x + b = 0\\) and \\(b\\) is a root of \\(x^2 + 3x + a = 0\\), with \\(a \\neq b\\). Find \\(a + b\\).",
        steps: [
          "Substitute: \\(a^2 + 3a + b = 0\\) and \\(b^2 + 3b + a = 0\\).",
          "Subtract: \\((a^2 - b^2) + 3(a - b) + (b - a) = 0 \\Rightarrow (a-b)(a+b+3-1) = 0\\).",
          "Since \\(a \\neq b\\): \\(a + b + 2 = 0\\).",
        ],
        answer: "\\(a + b = -2\\).",
      },
      traps: [
        {
          title: "Subtract, don't add",
          body:
            "Adding the two substituted equations keeps a stubborn \\(m^2+n^2\\); subtracting produces the factor \\((m-n)\\) you can cancel. When you see a symmetric pair of \"X is a root of … , Y is a root of …\", subtract.",
        },
      ],
    },

    // 5 — reduce a symmetric higher-degree equation by substitution
    {
      kind: "formula" as const,
      slug: "qe-reduce-symmetric-substitution",
      name: "Reducing a Symmetric Equation by Substitution",
      pyqExampleId: "af8d3238-96cb-4cf2-8e35-32ebdd83d697",
      intuition:
        "An equation that is symmetric about some centre — like (x−1)⁴ + (x−5)⁴ = constant — flattens to a quadratic once you shift the variable to that centre, because the odd powers cancel. Then Vieta on the full polynomial gives the sum of ALL its roots, real and complex.",
      definition:
        "For an equation symmetric about \\(x = m\\) (e.g. \\((x-a)^4 + (x-b)^4 = k\\) with centre \\(m = \\tfrac{a+b}{2}\\)), substitute \\(u = x - m\\). The odd powers of \\(u\\) cancel, leaving an even equation \\(u^4 + Au^2 + B = 0\\) — a quadratic in \\(u^2\\). " +
        "Solve for \\(u^2\\), count the **real** roots (each positive \\(u^2\\) gives two), and for the **sum of all roots** use Vieta on the degree-\\(n\\) polynomial: sum \\(= -\\dfrac{(\\text{coeff of }x^{n-1})}{(\\text{coeff of }x^{n})}\\) — the complex roots are included.",
      formula: {
        label: "Shift to the centre of symmetry",
        latex: "(x-a)^4 + (x-b)^4 = k,\\ \\ u = x - \\tfrac{a+b}{2} \\ \\Rightarrow\\ u^4 + Au^2 + B = 0",
      },
      authoredExample: {
        prompt: "How many real roots does \\((x-1)^4 + (x-3)^4 = 16\\) have?",
        steps: [
          "Centre \\(m = 2\\); let \\(u = x - 2\\): \\((u+1)^4 + (u-1)^4 = 16\\).",
          "Expand: \\(2(u^4 + 6u^2 + 1) = 16 \\Rightarrow u^4 + 6u^2 - 7 = 0 \\Rightarrow (u^2-1)(u^2+7) = 0\\).",
          "\\(u^2 = 1\\) gives \\(u = \\pm 1\\) (real); \\(u^2 = -7\\) gives no real \\(u\\).",
        ],
        answer: "\\(2\\) real roots (\\(x = 1, 3\\)).",
      },
      traps: [
        {
          title: "\"Number of real roots\" ≠ \"sum of all roots\"",
          body:
            "After \\(u^2 = -7\\) is rejected for real roots, those two complex roots STILL count toward the sum-of-all-roots (via Vieta on the quartic). Read whether the question wants the real-root count or the full Vieta sum.",
        },
      ],
    },

    // 6 — self-referential roots
    {
      kind: "formula" as const,
      slug: "qe-self-referential-roots",
      name: "Self-Referential Root Conditions",
      pyqExampleId: "3b9c02e1-10d7-4bf7-a844-f460f8bb6ccc",
      intuition:
        "Sometimes the roots themselves appear in the coefficients, or the roots must satisfy extra relations like α+β = α²+β². Just write Vieta's two relations and treat them as simultaneous equations in the unknowns — the system pins everything down.",
      definition:
        "When the roots feed back into the equation or an extra relation is imposed, set \\(s = \\alpha+\\beta\\), \\(p = \\alpha\\beta\\) and translate every condition into \\(s, p\\):\n" +
        "- **Coefficients made of the roots:** e.g. \\(x^2 + \\alpha x - \\beta = 0\\) with roots \\(\\alpha, \\beta\\) gives \\(\\alpha+\\beta = -\\alpha\\) and \\(\\alpha\\beta = -\\beta\\); solve the pair.\n" +
        "- **Extra symmetric relation:** e.g. \\(\\alpha+\\beta = \\alpha^2+\\beta^2\\) becomes \\(s = s^2 - 2p\\); combine with a second given relation to find \\(s, p\\).\n" +
        "- A relation true for ALL such roots is established by checking it against \\(s\\) and \\(p\\), not by finding the roots numerically.",
      formula: {
        label: "Translate every condition into s and p",
        latex: "s = \\alpha+\\beta,\\quad p = \\alpha\\beta \\ \\Rightarrow\\ \\text{solve the system in } s, p",
      },
      authoredExample: {
        prompt: "If \\(\\alpha, \\beta\\) are the roots of \\(x^2 + \\alpha x + \\beta = 0\\) with \\(\\beta \\neq 0\\), find \\(\\alpha\\) and \\(\\beta\\).",
        steps: [
          "Vieta: \\(\\alpha + \\beta = -\\alpha\\) and \\(\\alpha\\beta = \\beta\\).",
          "From the product (with \\(\\beta \\neq 0\\)): \\(\\alpha = 1\\). Then \\(1 + \\beta = -1 \\Rightarrow \\beta = -2\\).",
        ],
        answer: "\\(\\alpha = 1,\\ \\beta = -2\\).",
      },
      traps: [
        {
          title: "Don't divide away a root you still need",
          body:
            "Cancelling \\(\\beta\\) from \\(\\alpha\\beta = \\beta\\) is valid only because \\(\\beta \\neq 0\\) is given; the discarded case \\(\\beta = 0\\) must be checked separately (it usually fails another condition).",
        },
      ],
    },

    // 7 — structural / counting root problems
    {
      kind: "formula" as const,
      slug: "qe-structural-root-problems",
      name: "Structural and Counting Root Problems",
      pyqExampleId: "99a7ced0-9e7d-48c3-9e18-eb231d74f8d2",
      intuition:
        "Some questions are about the STRUCTURE the roots must have — integer coefficients forcing conjugate roots, or an equation unchanged when its roots are squared. These are solved by Vieta plus a constraint argument, not by computation.",
      definition:
        "Two structural patterns:\n" +
        "- **Integer / rational coefficients force partner roots.** A polynomial with integer coefficients that has a root \\(r\\) and is of higher degree often forces a partner (e.g. for a quartic with given roots \\(-2, 3\\), the symmetric construction \\((x^2-4)(x^2-9)\\) supplies \\(\\pm 2, \\pm 3\\)).\n" +
        "- **Equation unchanged under a root transform.** \"The equation is the same when its roots \\(\\alpha,\\beta\\) are replaced by \\(\\alpha^2,\\beta^2\\)\" means \\(\\{\\alpha^2,\\beta^2\\} = \\{\\alpha,\\beta\\}\\); enumerate cases (\\(\\alpha^2=\\alpha\\) or \\(\\alpha^2=\\beta\\)) to count the valid equations. Roots land in \\(\\{0, 1, \\omega, \\omega^2\\}\\).",
      formula: {
        label: "Unchanged under squaring the roots",
        latex: "\\{\\alpha^2, \\beta^2\\} = \\{\\alpha, \\beta\\} \\ \\Rightarrow\\ \\alpha, \\beta \\in \\{0, 1, \\omega, \\omega^2\\}",
      },
      authoredExample: {
        prompt:
          "A monic quadratic with roots \\(\\alpha, \\beta\\) is unchanged when the roots are replaced by \\(\\alpha^2, \\beta^2\\), with \\(\\alpha = \\beta\\). What are the possible repeated roots?",
        steps: [
          "Unchanged means \\(\\alpha^2 = \\alpha\\) (the repeated root maps to itself).",
          "\\(\\alpha^2 - \\alpha = 0 \\Rightarrow \\alpha(\\alpha - 1) = 0\\).",
        ],
        answer: "\\(\\alpha = 0\\) or \\(\\alpha = 1\\).",
      },
      traps: [
        {
          title: "Enumerate the set-equality cases",
          body:
            "\\(\\{\\alpha^2,\\beta^2\\}=\\{\\alpha,\\beta\\}\\) splits into the matched case (\\(\\alpha^2=\\alpha,\\beta^2=\\beta\\)) AND the swapped case (\\(\\alpha^2=\\beta,\\beta^2=\\alpha\\)). The swapped case is where \\(\\omega, \\omega^2\\) enter — miss it and you undercount.",
        },
      ],
    },
  ],
};
