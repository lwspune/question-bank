import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTIONS_COMPOSITION_INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Composition and Inverse of Functions",
  title: "Composition and Inverse of Functions",
  oneLineDefinition:
    "Chain functions together (f∘g) or run one backwards (f⁻¹) — the chapter's richest source of HARD questions.",
  whyItMatters:
    "Twenty-eight PYQs and the chapter's difficulty hot-spot — 7 of the chapter's HARD questions live here. " +
    "The staples: evaluate f at a point, compose two functions (and notice f∘g ≠ g∘f), find the constant that " +
    "makes two linear functions commute (a near-annual question), and invert a rational/exponential function. " +
    "Order and bijectivity are where marks are won and lost.",
  concepts: [
    // Evaluating + combining functions (foundation-flavoured, anchored)
    {
      kind: "formula" as const,
      slug: "funcs-evaluating-functions",
      name: "Evaluating and combining functions",
      intuition:
        "To evaluate \\(f\\) at something, substitute it everywhere \\(x\\) appears — the input can be a number, " +
        "another variable, or an expression like \\(\\sin\\theta\\). Sums and products of functions are done " +
        "**pointwise**: \\((f+g)(x)=f(x)+g(x)\\), \\((fg)(x)=f(x)\\,g(x)\\).",
      definition:
        "- **Value:** \\(f(a)\\) replaces \\(x\\) by \\(a\\) throughout the rule.\n" +
        "- **Substitution:** \\(f(\\sin\\theta)\\) replaces \\(x\\) by \\(\\sin\\theta\\) (use identities to simplify).\n" +
        "- **Pointwise sum/product:** \\((f\\pm g)(x)=f(x)\\pm g(x)\\), \\((fg)(x)=f(x)g(x)\\), \\(\\left(\\tfrac fg\\right)(x)=\\tfrac{f(x)}{g(x)}\\) where \\(g(x)\\neq0\\).",
      authoredExample: {
        prompt: "If \\(f(x)=x+1\\) and \\(g(x)=x^2\\), find \\((fg)(2)\\).",
        steps: [
          "\\((fg)(2)=f(2)\\,g(2)\\) — a product, evaluated at \\(x=2\\).",
          "\\(f(2)=3\\), \\(g(2)=4\\).",
          "Product \\(=3\\times4=12\\).",
        ],
        answer: "\\((fg)(2)=12\\).",
      },
      traps: [
        {
          title: "\\((fg)\\) is a product, \\((f\\circ g)\\) is a composition",
          body:
            "NDA writes the **product** as \\((fg)(x)=f(x)g(x)\\) and the **composition** as \\((f\\circ g)(x)=f(g(x))\\). " +
            "They are completely different operations — read the symbol carefully before computing.",
        },
      ],
      pyqExampleId: "ff17cef5-0c7c-419b-abab-39c75ec326c3", // 2023 — (fg)(1) for f=x²+2, g=2x−3 → −3
    },

    // Composition
    {
      kind: "formula" as const,
      slug: "funcs-composition",
      name: "Composition of functions",
      intuition:
        "Composition feeds one function's output into the next: \\((f\\circ g)(x)=f(g(x))\\) means 'do \\(g\\) first, " +
        "then \\(f\\)'. Work **inside-out**, and remember the order matters — \\(f\\circ g\\) and \\(g\\circ f\\) are " +
        "usually different.",
      definition:
        "\\((f\\circ g)(x)=f(g(x))\\); the range of \\(g\\) must sit inside the domain of \\(f\\). " +
        "Composition is **associative** \\((f\\circ(g\\circ h)=(f\\circ g)\\circ h)\\) but **not commutative** " +
        "\\((f\\circ g\\neq g\\circ f\\) in general\\()\\). Iterating \\(f\\circ f\\circ\\cdots\\) just repeats the substitution.",
      visualizationSlug: "composition-machine",
      formula: {
        label: "Composition and its inverse",
        latex: "(f\\circ g)(x)=f(g(x))\\qquad (f\\circ g)^{-1}=g^{-1}\\circ f^{-1}",
      },
      authoredExample: {
        prompt:
          "With \\(f(x)=2x+1\\) and \\(g(x)=x^2\\), find \\((f\\circ g)(x)\\) and \\((g\\circ f)(x)\\).",
        steps: [
          "\\((f\\circ g)(x)=f(g(x))=f(x^2)=2x^2+1\\).",
          "\\((g\\circ f)(x)=g(f(x))=g(2x+1)=(2x+1)^2=4x^2+4x+1\\).",
          "They differ — concrete proof that composition is not commutative.",
        ],
        answer: "\\((f\\circ g)(x)=2x^2+1\\); \\((g\\circ f)(x)=4x^2+4x+1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(f(x)=3x-2\\), find \\((f\\circ f)(2)\\).",
        steps: [
          "Inner: \\(f(2)=3(2)-2=4\\).",
          "Outer: \\(f(4)=3(4)-2=10\\).",
        ],
        answer: "\\((f\\circ f)(2)=10\\).",
      },
      traps: [
        {
          title: "Work inside-out, and keep the order",
          body:
            "\\((f\\circ g)(x)=f(g(x))\\) means \\(g\\) acts **first**. Students often apply \\(f\\) first or read " +
            "\\(f\\circ g\\) as a product. For iterated composition, peel one layer at a time — don't try to do all of " +
            "\\(f\\circ f\\circ f\\) in one leap.",
        },
      ],
      pyqExampleId: "06a63ebd-0df7-4773-ac32-3a0b5adbfd5c", // 2022 — f(x)=4x+3, f∘f∘f(−1) = −1
    },

    // Commuting linear functions
    {
      kind: "formula" as const,
      slug: "funcs-commuting-linear",
      name: "When do two linear functions commute?",
      intuition:
        "A near-annual NDA question: given two linear functions, find the constant that makes \\(f\\circ g=g\\circ f\\). " +
        "Both compositions are linear, so just expand both, match coefficients, and solve.",
      definition:
        "For \\(f(x)=ax+b\\) and \\(g(x)=cx+d\\): \\(f(g(x))=acx+ad+b\\) and \\(g(f(x))=acx+bc+d\\). " +
        "The \\(x\\)-coefficients always match (both \\(ac\\)), so \\(f\\circ g=g\\circ f\\) reduces to the constant " +
        "condition \\(ad+b=bc+d\\), i.e. \\(b(c-1)=d(a-1)\\).",
      formula: {
        label: "Commuting condition for linear f, g",
        latex: "f\\circ g=g\\circ f\\iff b(c-1)=d(a-1)\\ \\ [f=ax+b,\\ g=cx+d]",
      },
      authoredExample: {
        prompt:
          "If \\(f(x)=2x+1\\) and \\(g(x)=3x+d\\) satisfy \\(f\\circ g=g\\circ f\\), find \\(d\\).",
        steps: [
          "Here \\(a=2,\\ b=1,\\ c=3\\). Use \\(b(c-1)=d(a-1)\\).",
          "\\(1\\cdot(3-1)=d\\cdot(2-1)\\Rightarrow 2=d\\).",
        ],
        answer: "\\(d=2\\).",
      },
      pyqExampleId: "192c1d33-9ea6-4467-86c9-7738cc820f94", // 2022 — f=4x+1, g=kx+2, fog=gof → k=7
    },

    // Inverse functions
    {
      kind: "formula" as const,
      slug: "funcs-inverse",
      name: "Inverse of a function",
      intuition:
        "The inverse \\(f^{-1}\\) undoes \\(f\\): if \\(f\\) sends \\(a\\mapsto b\\), then \\(f^{-1}\\) sends \\(b\\mapsto a\\). " +
        "It exists only when \\(f\\) is a **bijection**, and its graph is the mirror image of \\(f\\) across the line \\(y=x\\).",
      definition:
        "To find \\(f^{-1}\\): write \\(y=f(x)\\), **solve for \\(x\\)** in terms of \\(y\\), then swap names. " +
        "Domain and range swap: \\(\\text{dom}(f^{-1})=\\text{range}(f)\\). Properties: \\(f^{-1}\\circ f=\\text{id}\\), " +
        "and the graph of \\(f^{-1}\\) is the reflection of \\(f\\) in \\(y=x\\). Note \\(f^{-1}(x)\\neq\\dfrac{1}{f(x)}\\).",
      visualizationSlug: "inverse-reflection-line",
      formula: {
        label: "Inverse of a linear function",
        latex: "f(x)=ax+b\\ (a\\neq0)\\ \\Rightarrow\\ f^{-1}(x)=\\dfrac{x-b}{a}",
      },
      authoredExample: {
        prompt: "Find the inverse of \\(f(x)=\\dfrac{3x+2}{x-1}\\), \\(x\\neq1\\).",
        steps: [
          "Set \\(y=\\dfrac{3x+2}{x-1}\\) and clear the fraction: \\(y(x-1)=3x+2\\).",
          "Expand and collect \\(x\\): \\(yx-y=3x+2\\Rightarrow x(y-3)=y+2\\).",
          "Solve: \\(x=\\dfrac{y+2}{y-3}\\); rename \\(y\\to x\\).",
        ],
        answer: "\\(f^{-1}(x)=\\dfrac{x+2}{x-3}\\).",
      },
      selfCheckExample: {
        prompt: "Find the inverse of \\(f(x)=2x-5\\).",
        steps: [
          "\\(y=2x-5\\Rightarrow x=\\dfrac{y+5}{2}\\).",
          "Rename: \\(f^{-1}(x)=\\dfrac{x+5}{2}\\).",
        ],
        answer: "\\(f^{-1}(x)=\\dfrac{x+5}{2}\\).",
      },
      traps: [
        {
          title: "Inverse needs a bijection — and \\(f^{-1}\\neq1/f\\)",
          body:
            "Only one-one onto functions have an inverse; \\(x^2\\) on \\(\\mathbb{R}\\) has none (not one-one). And " +
            "\\(f^{-1}\\) is the **undo** function, not the reciprocal — \\(f^{-1}(x)\\) is generally nothing like " +
            "\\(\\dfrac{1}{f(x)}\\). When finding it, remember the domain of \\(f^{-1}\\) is the range of \\(f\\).",
        },
      ],
      pyqExampleId: "2c47d961-02c7-4607-82dd-90875c2c7e2c", // 2019 — inverse of (x−2)/(x+2)
    },
  ],
};
