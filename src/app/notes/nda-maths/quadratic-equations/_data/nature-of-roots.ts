import type { SubtopicNote } from "@/app/notes/_types";

export const NATURE_OF_ROOTS_NOTE: SubtopicNote = {
  subtopicName: "Nature of Roots and Boundary Conditions",
  title: "Nature of Roots & Boundary Conditions",
  oneLineDefinition:
    "Before finding the roots of a quadratic, you can read off what KIND they are — real, equal or complex — and where they sit, straight from the coefficients, using the discriminant and a few sign tests.",
  whyItMatters:
    "This subtopic is the chapter's foundation and its second-largest pocket (21 PYQs). Most questions never ask you to solve the quadratic — they ask whether the roots are real, what the difference between them is, whether the coefficients fall into AP/GP/HP, or how many real roots a disguised equation has. " +
    "Master the discriminant and the a+b+c=0 reflex first; they unlock half the chapter.",
  concepts: [
    // 1 — FOUNDATION: what a quadratic equation is
    {
      kind: "formula" as const,
      slug: "qe-what-is-a-quadratic",
      name: "What a Quadratic Equation Is",
      intuition:
        "A quadratic is the simplest equation that can bend — its graph is a parabola, not a straight line. Because the parabola can cross, touch, or miss the x-axis, a quadratic has at most two real solutions, called its roots.",
      definition:
        "A **quadratic equation** is any equation that can be written in the **standard form**\n" +
        "\\[ax^2 + bx + c = 0, \\quad a \\neq 0.\\]\n" +
        "- \\(a, b, c\\) are the **coefficients** (\\(a\\) the leading coefficient, \\(c\\) the constant term); the condition \\(a \\neq 0\\) is what makes it quadratic rather than linear.\n" +
        "- A **root** (or solution) is a value of \\(x\\) that makes the equation true. Graphically, the real roots are exactly the **x-intercepts** of the parabola \\(y = ax^2 + bx + c\\).\n" +
        "- A quadratic has **at most two** roots. If \\(\\alpha\\) and \\(\\beta\\) are the roots, the equation factors as \\(a(x-\\alpha)(x-\\beta) = 0\\).",
      formula: {
        label: "Standard form",
        latex: "ax^2 + bx + c = 0, \\quad a \\neq 0",
      },
      authoredExample: {
        prompt:
          "Is \\((x-2)(x+5) = 8\\) a quadratic equation? Put it in standard form and name its coefficients.",
        steps: [
          "Expand the left side: \\((x-2)(x+5) = x^2 + 3x - 10\\).",
          "Bring everything to one side: \\(x^2 + 3x - 10 - 8 = 0\\), i.e. \\(x^2 + 3x - 18 = 0\\).",
          "The \\(x^2\\) coefficient is \\(1 \\neq 0\\), so yes — it is quadratic.",
        ],
        answer: "\\(x^2 + 3x - 18 = 0\\); here \\(a = 1,\\ b = 3,\\ c = -18\\).",
      },
      practiceSet: [
        { prompt: "Put \\(3x(x-1) = 2x + 4\\) in standard form.", answer: "\\(3x^2 - 5x - 4 = 0\\)", method: "Expand and collect: \\(3x^2 - 3x - 2x - 4 = 0\\)." },
        { prompt: "Is \\(2x + 7 = 0\\) a quadratic?", answer: "No — there is no \\(x^2\\) term (\\(a = 0\\)), so it is linear." },
        { prompt: "If the roots of \\(x^2 + bx + c = 0\\) are \\(2\\) and \\(-3\\), write the equation.", answer: "\\(x^2 + x - 6 = 0\\)", method: "\\((x-2)(x+3) = x^2 + x - 6\\)." },
      ],
    },

    // 2 — FOUNDATION: three ways to solve
    {
      kind: "formula" as const,
      slug: "qe-solving-methods",
      name: "Three Ways to Solve a Quadratic",
      intuition:
        "There are exactly three tools: factor it (fastest when the roots are tidy), complete the square (always works and reveals the vertex), or use the quadratic formula (completing the square done once, in general). The formula is not magic — it IS completing the square on the general equation, which is why the discriminant appears under its root.",
      definition:
        "Three methods for \\(ax^2 + bx + c = 0\\):\n" +
        "- **Factoring:** write it as \\(a(x-\\alpha)(x-\\beta)=0\\) and read off \\(x=\\alpha,\\beta\\). Works cleanly when the roots are rational.\n" +
        "- **Completing the square:** force a perfect square, e.g. \\(x^2 + bx = \\left(x+\\tfrac{b}{2}\\right)^2 - \\tfrac{b^2}{4}\\), then take square roots.\n" +
        "- **Quadratic formula:** the general result of completing the square,\n" +
        "\\[x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}.\\]\n" +
        "The quantity \\(b^2 - 4ac\\) under the root is the **discriminant** \\(D\\) — the single number that controls everything about the roots (next concept).",
      formula: {
        label: "Quadratic formula",
        latex: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      },
      authoredExample: {
        prompt: "Solve \\(2x^2 - 7x + 3 = 0\\) by factoring, and confirm with the formula.",
        steps: [
          "Factor: split the middle term, \\(2x^2 - 6x - x + 3 = 2x(x-3) - 1(x-3) = (2x-1)(x-3)\\).",
          "Roots: \\(2x-1 = 0 \\Rightarrow x = \\tfrac{1}{2}\\), and \\(x - 3 = 0 \\Rightarrow x = 3\\).",
          "Check with the formula: \\(D = (-7)^2 - 4(2)(3) = 49 - 24 = 25\\), so \\(x = \\dfrac{7 \\pm 5}{4} = 3,\\ \\tfrac{1}{2}\\). ✓",
        ],
        answer: "\\(x = \\dfrac{1}{2}\\) or \\(x = 3\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(x^2 - 6x + 7 = 0\\) by completing the square.",
        steps: [
          "\\(x^2 - 6x = (x-3)^2 - 9\\), so the equation is \\((x-3)^2 - 9 + 7 = 0\\), i.e. \\((x-3)^2 = 2\\).",
          "Take square roots: \\(x - 3 = \\pm\\sqrt{2}\\).",
        ],
        answer: "\\(x = 3 \\pm \\sqrt{2}\\).",
      },
      traps: [
        {
          title: "The formula needs standard form first",
          body:
            "\\(b\\) and \\(c\\) in \\(x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\) are the coefficients AFTER moving everything to one side and with \\(a > 0\\) if you like. Reading \\(b, c\\) off an un-rearranged equation (e.g. \\(x^2 = 5x - 6\\)) is the most common slip.",
        },
      ],
    },

    // 3 — discriminant & nature of roots (viz)
    {
      kind: "formula" as const,
      slug: "qe-discriminant-nature",
      name: "The Discriminant — Nature of the Roots",
      pyqExampleId: "161804c7-dd15-4176-9856-91e016e8a073",
      intuition:
        "The discriminant is the part of the formula under the square root. Its SIGN alone tells you whether the parabola crosses the axis twice, touches it once, or misses it — so you learn the nature of the roots without solving anything.",
      definition:
        "For \\(ax^2 + bx + c = 0\\) with real coefficients, the **discriminant** is \\(D = b^2 - 4ac\\) (also written \\(\\Delta\\)):\n" +
        "- \\(D > 0\\): two **distinct real** roots (parabola crosses the x-axis twice).\n" +
        "- \\(D = 0\\): two **equal real** roots, \\(x = -\\tfrac{b}{2a}\\) (parabola touches the axis).\n" +
        "- \\(D < 0\\): two **complex conjugate** roots, no real root (parabola misses the axis).\n" +
        "A further refinement when \\(a,b,c\\) are rational: if \\(D\\) is a **perfect square** the roots are rational, otherwise they are irrational conjugates. A graph lying **entirely above** the x-axis means \\(a > 0\\) and \\(D < 0\\).",
      formula: {
        label: "Discriminant",
        latex: "D = b^2 - 4ac",
      },
      visualizationSlug: "qe-discriminant-parabola",
      authoredExample: {
        prompt:
          "For which values of \\(k\\) does \\(x^2 + kx + 4 = 0\\) have (a) equal roots, (b) no real roots?",
        steps: [
          "Discriminant: \\(D = k^2 - 4(1)(4) = k^2 - 16\\).",
          "(a) Equal roots need \\(D = 0\\): \\(k^2 = 16 \\Rightarrow k = \\pm 4\\).",
          "(b) No real roots need \\(D < 0\\): \\(k^2 < 16 \\Rightarrow -4 < k < 4\\).",
        ],
        answer: "Equal at \\(k = \\pm 4\\); no real roots for \\(-4 < k < 4\\).",
      },
      traps: [
        {
          title: "\"Real roots\" includes the equal case",
          body:
            "\"Has real roots\" means \\(D \\geq 0\\) (real and distinct OR equal). \"Distinct real roots\" is the strict \\(D > 0\\). Watch which the question asks — boundary values of a parameter live exactly at \\(D = 0\\).",
        },
      ],
    },

    // 4 — equal roots force coefficients into a progression
    {
      kind: "formula" as const,
      slug: "qe-equal-roots-progressions",
      name: "Equal Roots Force a Coefficient Progression",
      pyqExampleId: "f2b6b888-8586-45d4-b97f-8f0fc428edf9",
      intuition:
        "A recurring NDA trick: set the discriminant to zero and the resulting relation between the coefficients is exactly the condition for them to be in AP, GP, or HP. Recognising the target relation lets you skip pages of algebra.",
      definition:
        "When a question says \"the roots are equal,\" write \\(D = 0\\) and simplify — the answer is usually a progression among the coefficients:\n" +
        "- **GP test:** \\(a, b, c\\) in GP \\(\\iff b^2 = ac\\). (So \\(ax^2+bx+c=0\\) with \\(a,b,c\\) in GP has \\(D = ac - 4ac = -3ac\\).)\n" +
        "- **HP test:** \\(a, b, c\\) in HP \\(\\iff \\dfrac{2}{b} = \\dfrac{1}{a} + \\dfrac{1}{c}\\). This is the most-tested outcome — many \"equal roots\" problems collapse to \\(\\frac{1}{a}+\\frac{1}{c}=\\frac{2}{b}\\).\n" +
        "- **AP test:** \\(a, b, c\\) in AP \\(\\iff 2b = a + c\\).",
      formula: {
        label: "Progression tests",
        latex:
          "\\text{GP}:\\ b^2 = ac \\qquad \\text{AP}:\\ 2b = a+c \\qquad \\text{HP}:\\ \\tfrac{2}{b} = \\tfrac{1}{a}+\\tfrac{1}{c}",
      },
      authoredExample: {
        prompt:
          "If \\((b-c)x^2 + (c-a)x + (a-b) = 0\\) has equal roots, show \\(a, b, c\\) are in AP.",
        steps: [
          "Notice the coefficients sum to zero: \\((b-c)+(c-a)+(a-b) = 0\\), so \\(x = 1\\) is always a root.",
          "Equal roots means the other root is also \\(1\\), so the product of roots \\(= 1\\): \\(\\dfrac{a-b}{b-c} = 1\\).",
          "Thus \\(a - b = b - c\\), i.e. \\(2b = a + c\\) — the AP condition.",
        ],
        answer: "\\(a, b, c\\) are in AP.",
      },
      traps: [
        {
          title: "Know all three tests cold",
          body:
            "The HP condition \\(\\frac{2}{b}=\\frac{1}{a}+\\frac{1}{c}\\) is the one most often produced, but the wrong-progression option (AP or GP) is always offered. After simplifying \\(D=0\\), match the EXACT relation, don't pattern-match on \"it has fractions so it's HP\".",
        },
      ],
    },

    // 5 — difference and ratio of the roots
    {
      kind: "formula" as const,
      slug: "qe-difference-and-ratio-of-roots",
      name: "Difference and Ratio of the Roots",
      pyqExampleId: "8595139a-0813-4aaa-a26d-a18af51126d2",
      intuition:
        "You can get the gap between the roots, or compare the root-structure of two equations, without solving either — the difference comes from the discriminant, and a shared ratio of roots forces a relation between the two discriminants.",
      definition:
        "For \\(ax^2+bx+c=0\\) with roots \\(\\alpha,\\beta\\):\n" +
        "- **Difference of roots:** \\(|\\alpha - \\beta| = \\sqrt{(\\alpha+\\beta)^2 - 4\\alpha\\beta} = \\dfrac{\\sqrt{D}}{|a|}\\). A condition like \"the roots differ by \\(k\\)\" becomes \\((\\alpha-\\beta)^2 = k^2\\).\n" +
        "- **Ratio of roots:** if the roots are in ratio \\(\\lambda : 1\\), then \\(\\dfrac{(\\alpha+\\beta)^2}{\\alpha\\beta} = \\dfrac{(\\lambda+1)^2}{\\lambda} = \\dfrac{b^2}{ac}\\). Two equations with the **same** root-ratio satisfy \\(\\dfrac{b^2}{ac} = \\dfrac{q^2}{pr}\\).",
      formula: {
        label: "Difference of roots",
        latex: "|\\alpha - \\beta| = \\sqrt{(\\alpha+\\beta)^2 - 4\\alpha\\beta} = \\dfrac{\\sqrt{D}}{|a|}",
      },
      authoredExample: {
        prompt: "The roots of \\(x^2 - 5x + k = 0\\) differ by \\(3\\). Find \\(k\\).",
        steps: [
          "Sum \\(=5\\), product \\(=k\\). Difference: \\((\\alpha-\\beta)^2 = (\\alpha+\\beta)^2 - 4\\alpha\\beta = 25 - 4k\\).",
          "Set equal to \\(3^2 = 9\\): \\(25 - 4k = 9\\).",
          "Solve: \\(4k = 16\\).",
        ],
        answer: "\\(k = 4\\).",
      },
      traps: [
        {
          title: "Difference uses (sum)² − 4·product, not (sum)² − product",
          body:
            "\\((\\alpha-\\beta)^2 = (\\alpha+\\beta)^2 - 4\\alpha\\beta\\) — the coefficient is \\(4\\), the same \\(4\\) as in the discriminant. Using \\(2\\) instead is the standard error.",
        },
      ],
    },

    // 6 — a+b+c=0 shortcut (set S9)
    {
      kind: "formula" as const,
      slug: "qe-vanishing-coefficient-sum",
      name: "The a + b + c = 0 Shortcut",
      pyqExampleId: "e6f563dd-fe52-4565-8a14-43df9f2680c0",
      intuition:
        "If the coefficients of a quadratic add to zero, then x = 1 satisfies it instantly — so x = 1 is a root, and the other root drops straight out of the product. This turns many \"find a root\" questions into one line.",
      definition:
        "For \\(ax^2 + bx + c = 0\\): substituting \\(x = 1\\) gives \\(a + b + c\\). Therefore\n" +
        "\\[a + b + c = 0 \\iff x = 1 \\text{ is a root.}\\]\n" +
        "The other root then follows from the product of roots: \\(1 \\cdot \\beta = \\dfrac{c}{a}\\), so \\(\\beta = \\dfrac{c}{a}\\). " +
        "A companion fact: if \\(f(p) = f(q)\\) for a quadratic \\(f\\), the **axis of symmetry** is the midpoint \\(x = \\tfrac{p+q}{2} = -\\tfrac{b}{2a}\\), and the two roots are symmetric about it.",
      formula: {
        label: "Unit-root test",
        latex: "a + b + c = 0 \\iff x = 1 \\text{ is a root},\\quad \\text{other root} = \\tfrac{c}{a}",
      },
      authoredExample: {
        prompt: "Find both roots of \\(7x^2 - 12x + 5 = 0\\) by inspection.",
        steps: [
          "Coefficient sum: \\(7 + (-12) + 5 = 0\\), so \\(x = 1\\) is a root.",
          "Product of roots \\(= \\dfrac{c}{a} = \\dfrac{5}{7}\\), and one root is \\(1\\), so the other is \\(\\dfrac{5}{7}\\).",
        ],
        answer: "\\(x = 1\\) and \\(x = \\dfrac{5}{7}\\).",
      },
      traps: [
        {
          title: "Check the sum before reaching for the formula",
          body:
            "Whenever the coefficients are built from symbols like \\((b-c), (c-a), (a-b)\\) or \\((q-r),(r-p),(p-q)\\), test \\(a+b+c\\) first — it is almost always engineered to vanish, making \\(x=1\\) a free root.",
        },
      ],
    },

    // 7 — location of roots (viz)
    {
      kind: "formula" as const,
      slug: "qe-location-of-roots",
      name: "Location of the Roots in an Interval",
      pyqExampleId: "e9794f9e-e51e-43e0-9d05-17755ab39d67",
      intuition:
        "To pin the roots inside an interval without solving, read three things off the parabola: it must actually have real roots (D ≥ 0), it must be above the axis at both ends (so neither end is between the roots), and its vertex must lie inside the interval. A sign change of f across two points guarantees a root between them.",
      definition:
        "For \\(f(x) = ax^2 + bx + c\\) (take \\(a > 0\\)) and an interval \\((p, q)\\):\n" +
        "- **A root lies between \\(p\\) and \\(q\\)** \\(\\iff f(p)\\cdot f(q) < 0\\) (opposite signs — the curve crosses the axis once between them).\n" +
        "- **Both roots lie in \\((p, q)\\)** \\(\\iff\\) all three hold: \\(D \\geq 0\\), \\(\\ a f(p) > 0\\) and \\(a f(q) > 0\\), and the vertex \\(p < -\\tfrac{b}{2a} < q\\).",
      formula: {
        label: "Both roots in (p, q), a > 0",
        latex: "D \\ge 0,\\quad f(p) > 0,\\quad f(q) > 0,\\quad p < -\\tfrac{b}{2a} < q",
      },
      visualizationSlug: "qe-roots-in-interval",
      authoredExample: {
        prompt:
          "For how many integers \\(k\\) does \\(x^2 - 6x + k = 0\\) have both roots in \\((0, 5)\\)?",
        steps: [
          "Real roots: \\(D = 36 - 4k \\geq 0 \\Rightarrow k \\leq 9\\).",
          "Ends positive: \\(f(0) = k > 0\\) and \\(f(5) = 25 - 30 + k = k - 5 > 0 \\Rightarrow k > 5\\).",
          "Vertex \\(x = 3 \\in (0,5)\\) ✓. Combining: \\(5 < k \\leq 9\\), so \\(k \\in \\{6,7,8,9\\}\\).",
        ],
        answer: "\\(4\\) integers.",
      },
      traps: [
        {
          title: "All three conditions are needed — not just the endpoints",
          body:
            "\\(f(p)>0\\) and \\(f(q)>0\\) alone allow BOTH roots to sit on the same side of the interval (or to be complex). You also need \\(D \\ge 0\\) and the vertex inside \\((p,q)\\). Drop any one and a wrong-count option catches you.",
        },
      ],
    },

    // 8 — equations that reduce to a quadratic
    {
      kind: "formula" as const,
      slug: "qe-reduce-to-quadratic",
      name: "Equations That Reduce to a Quadratic",
      pyqExampleId: "acbaf37c-bdcd-4724-9f8f-d078eb591fc1",
      intuition:
        "A modulus, a square root, or a fourth power hides a quadratic. Split the modulus by sign, substitute the radical or the square as a new variable, then count roots carefully — and always feed each candidate back through the domain it came from.",
      definition:
        "Three reducible shapes, all solved by a substitution then a validity check:\n" +
        "- **Modulus:** for \\(|x - a| + \\ldots\\), split into the two sign cases of the modulus and solve each branch on its own interval; keep only the roots that lie in the branch's interval.\n" +
        "- **Radical:** for an equation in \\(\\sqrt{x}\\), set \\(u = \\sqrt{x} \\ge 0\\); reject any \\(u < 0\\).\n" +
        "- **Biquadratic:** for \\(ax^4 + bx^2 + c = 0\\), set \\(u = x^2 \\ge 0\\); each valid \\(u > 0\\) gives \\(x = \\pm\\sqrt{u}\\).\n" +
        "Counting the number and TYPE (rational/irrational) of the real roots is the usual question.",
      formula: {
        label: "Substitution skeleton",
        latex: "u = \\sqrt{x}\\ (\\ge 0)\\ \\text{ or }\\ u = x^2\\ (\\ge 0)\\ \\Rightarrow\\ \\text{quadratic in } u",
      },
      authoredExample: {
        prompt: "How many real roots does \\(x^4 - 13x^2 + 36 = 0\\) have?",
        steps: [
          "Let \\(u = x^2 \\geq 0\\): \\(u^2 - 13u + 36 = 0 \\Rightarrow (u-4)(u-9) = 0\\), so \\(u = 4\\) or \\(u = 9\\).",
          "Both are positive, so each gives two real \\(x\\): \\(x = \\pm 2\\) and \\(x = \\pm 3\\).",
          "Count the distinct real roots.",
        ],
        answer: "\\(4\\) real roots (\\(\\pm 2, \\pm 3\\)).",
      },
      traps: [
        {
          title: "Reject substitution values that violate the domain",
          body:
            "With \\(u = \\sqrt{x}\\) or \\(u = x^2\\), a negative \\(u\\) is impossible — discard it. And for a modulus branch, a candidate root is only valid if it lies in the interval that defined that branch. Forgetting this manufactures phantom roots.",
        },
      ],
    },
  ],
};
