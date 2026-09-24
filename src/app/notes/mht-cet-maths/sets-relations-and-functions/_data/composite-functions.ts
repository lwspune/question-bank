import type { SubtopicNote } from "@/app/notes/_types";

export const COMPOSITE_FUNCTIONS_NOTE: SubtopicNote = {
  subtopicName: "Composite Functions — f∘g, Iteration and Functional Identities",
  title: "Composite Functions — f∘g, Iteration and Functional Identities",
  oneLineDefinition:
    "(f∘g)(x) = f(g(x)): apply the inner function first, then the outer — evaluate numerically from the inside out, recover f from a given f(g(x)) by matching shapes, and prove a functional identity by simplifying the argument.",
  whyItMatters:
    "11 PYQs at 9% HARD. The recurring stems are a chain like f(g(g(f(1)))) evaluated step by step (set in two 2024 shifts), f(f(x)) = x used to fix a parameter, and the log identity f(2x/(1 + x²)) = 2f(x) with its cubic twin. " +
    "One HARD question asks for g∘g∘f as a formula and is answered by composing in two steps rather than one. Nothing here is more than substitution done in the right order.",
  concepts: [
    // 1 — evaluate a chain
    {
      kind: "formula" as const,
      slug: "cetsrf-evaluate-a-composite-at-a-point",
      name: "Evaluate a Composite at a Point: Innermost First",
      intuition:
        "\\(f(g(g(f(1))))\\) is four separate evaluations. Start with \\(f(1)\\), feed the number into \\(g\\), feed that into \\(g\\) again, then into \\(f\\). Never expand the formula.",
      definition:
        "- \\(f(x) = x^2 + 1\\), \\(g(x) = \\dfrac1x\\): \\(f(1) = 2 \\to g(2) = \\dfrac12 \\to g\\!\\left(\\dfrac12\\right) = 2 \\to f(2) = 5\\).\n" +
        "- \\(f(x) = \\dfrac{3x - 2}{5x + 3}\\): \\(f(1) = \\dfrac18\\), \\(f\\!\\left(\\dfrac18\\right) = \\dfrac{3/8 - 2}{5/8 + 3} = \\dfrac{-13/8}{29/8} = -\\dfrac{13}{29}\\).\n" +
        "- \\(g(f(x))\\) where \\(f\\) is a trigonometric expression that simplifies to a CONSTANT: \\(\\sin^2 x + \\sin^2\\!\\left(x + \\tfrac{\\pi}{3}\\right) + \\cos x\\cos\\!\\left(x + \\tfrac{\\pi}{3}\\right) = \\dfrac54\\) for all \\(x\\), so \\(g(f(x)) = g\\!\\left(\\dfrac54\\right)\\), whatever \\(g\\) is.\n" +
        "- Order matters: \\(f \\circ g \\ne g \\circ f\\) in general; when they ARE equal (\\(f(x) = \\dfrac{3x + 4}{5x - 7}\\), \\(g(x) = \\dfrac{7x + 4}{5x - 3}\\)), it is because each is the other's inverse and both composites equal \\(x\\).",
      formula: {
        label: "Composition",
        latex:
          "(f \\circ g)(x) = f(g(x)) \\qquad \\text{evaluate inside} \\to \\text{outside}",
      },
      visualizationSlug: "composition-machine",
      authoredExample: {
        prompt: "If \\(f(x) = 2x - 1\\) and \\(g(x) = x^2\\), find \\(f(g(f(2)))\\).",
        steps: [
          "\\(f(2) = 3\\); \\(g(3) = 9\\); \\(f(9) = 17\\).",
        ],
        answer: "\\(17\\)",
      },
      selfCheckExample: {
        prompt: "If \\(f(x) = \\dfrac{x + 1}{x - 1}\\), find \\(f(f(3))\\).",
        steps: [
          "\\(f(3) = 2\\); \\(f(2) = 3\\).",
        ],
        answer: "\\(3\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = x + 2\\), \\(g(x) = 3x\\): \\(f(g(1)) = ?\\)",
          answer: "\\(5\\)",
        },
        {
          prompt: "Same: \\(g(f(1)) = ?\\)",
          answer: "\\(9\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac1x\\): \\(f(f(f(4))) = ?\\)",
          answer: "\\(\\dfrac14\\)",
        },
        {
          prompt: "\\(f(x) = x^2 + 1\\): \\(f(f(0)) = ?\\)",
          answer: "\\(2\\)",
        },
      ],
      pyqExampleId: "b479cf34-8387-40dd-93dc-d731ab3a6419",
      traps: [
        {
          title: "Reading f(g(g(f(x)))) as (f∘g)² or as f²g²",
          body:
            "It is a four-step chain, evaluated one function at a time from the inside. Option (A) \\(4\\) is \\(f(g(1))\\)-style short-cutting; the chain gives \\(5\\).",
        },
      ],
    },

    // 2 — composite as a formula
    {
      kind: "formula" as const,
      slug: "cetsrf-composite-as-a-formula",
      name: "Composite as a Formula: Substitute in Two Steps, Then Simplify",
      intuition:
        "For \\(g \\circ g \\circ f\\), first find \\(g(g(u))\\) in terms of \\(u\\), then put \\(u = f(x)\\). Composing a rational function with itself first keeps the algebra to one fraction.",
      definition:
        "- \\(g(x) = \\dfrac{x + 1}{x + 2}\\): \\(g(g(u)) = \\dfrac{\\frac{u + 1}{u + 2} + 1}{\\frac{u + 1}{u + 2} + 2} = \\dfrac{2u + 3}{3u + 5}\\). With \\(u = f(x) = \\dfrac{x}{2 - x}\\): \\(2u + 3 = \\dfrac{6 - x}{2 - x}\\) and \\(3u + 5 = \\dfrac{10 - 2x}{2 - x}\\), so \\((g \\circ g \\circ f)(x) = \\dfrac{6 - x}{10 - 2x}\\) — the denominators cancel in the ratio, which is why the answer is clean.\\n" +
        "- \\(f(f(x))\\) for \\(f(x) = \\dfrac{\\alpha x}{x + 1}\\): \\(\\dfrac{\\alpha^2 x}{(\\alpha + 1)x + 1}\\). Equal to \\(x\\) for all \\(x\\) needs \\(\\alpha + 1 = 0\\) and \\(\\alpha^2 = 1\\): \\(\\alpha = -1\\).\n" +
        "- \\((f \\circ g)(x)\\) with \\(f(x) = 2x - 3\\), \\(g(x) = x^3 + 5\\): \\(2x^3 + 7\\). With \\(f(x) = 3x + 10\\), \\(g(x) = x^2 - 1\\): \\(3x^2 + 7\\).\n" +
        "- Simplify the inner composite fully before substituting the outer; a nested fraction left unsimplified is where sign errors live.",
      formula: {
        label: "Two-step composition",
        latex:
          "(g \\circ g \\circ f)(x) = g\\big(g(u)\\big)\\Big|_{u = f(x)}",
      },
      authoredExample: {
        prompt: "If \\(f(x) = x + 1\\) and \\(g(x) = \\dfrac{x}{x + 1}\\), find \\((g \\circ g \\circ f)(x)\\).",
        steps: [
          "\\(g(g(u)) = \\dfrac{\\frac{u}{u + 1}}{\\frac{u}{u + 1} + 1} = \\dfrac{u}{2u + 1}\\).",
          "Put \\(u = x + 1\\): \\(\\dfrac{x + 1}{2x + 3}\\).",
        ],
        answer: "\\(\\dfrac{x + 1}{2x + 3}\\)",
      },
      selfCheckExample: {
        prompt: "For \\(f(x) = \\dfrac{kx}{x + 2}\\), find \\(k\\) such that \\(f(f(x)) = x\\) for all admissible \\(x\\).",
        steps: [
          "\\(f(f(x)) = \\dfrac{k \\cdot \\frac{kx}{x + 2}}{\\frac{kx}{x + 2} + 2} = \\dfrac{k^2 x}{(k + 2)x + 4}\\).",
          "Equal to \\(x\\): \\(k + 2 = 0\\) and \\(k^2 = 4\\), so \\(k = -2\\).",
        ],
        answer: "\\(k = -2\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = 2x - 3\\), \\(g(x) = x^3 + 5\\): \\((f \\circ g)(x) = ?\\)",
          answer: "\\(2x^3 + 7\\)",
        },
        {
          prompt: "\\(g(x) = \\dfrac{x + 1}{x + 2}\\): \\(g(g(u)) = ?\\)",
          answer: "\\(\\dfrac{2u + 3}{3u + 5}\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{1}{1 - x}\\): \\(f(f(x)) = ?\\)",
          answer: "\\(\\dfrac{x - 1}{x}\\)",
        },
        {
          prompt: "Same \\(f\\): \\(f(f(f(x))) = ?\\)",
          answer: "\\(x\\)",
        },
      ],
      pyqExampleId: "d3a4c8d7-f555-4a36-b9d6-ba0548d6fb7f",
      traps: [
        {
          title: "Matching α² = 1 alone",
          body:
            "\\(\\alpha = 1\\) satisfies \\(\\alpha^2 = 1\\) but not \\(\\alpha + 1 = 0\\); \\(f(f(x)) = x\\) needs BOTH coefficient equations, so \\(\\alpha = -1\\), option (D).",
        },
      ],
    },

    // 3 — recover f from f(g(x))
    {
      kind: "formula" as const,
      slug: "cetsrf-recover-f-from-a-composite",
      name: "Recover f From f(g(x)): Match the Shape, or Evaluate at the Right x",
      intuition:
        "If \\(f(g(x))\\) can be rewritten as an expression in \\(g(x)\\) alone, that expression IS \\(f\\). If only a number is asked, pick the \\(x\\) that makes \\(g(x)\\) the wanted input.",
      definition:
        "- \\(g(x) = 1 + \\sqrt x\\), \\(f(g(x)) = 3 + 2\\sqrt x + x = (1 + \\sqrt x)^2 + 2 = g(x)^2 + 2\\), so \\(f(x) = x^2 + 2\\) and \\(f(f(x)) = (x^2 + 2)^2 + 2 = x^4 + 4x^2 + 6\\).\n" +
        "- \\(g(x) = x^2 + x - 1\\), \\((g \\circ f)(x) = 4x^2 - 10x + 5\\), find \\(f(2)\\): put \\(x = 2\\): \\(g(f(2)) = 16 - 20 + 5 = 1\\), so \\(f(2)^2 + f(2) - 2 = 0\\), \\(f(2) = 1\\) or \\(-2\\); the option list carries \\(1\\).\n" +
        "- Look for a perfect square or a known expansion in the given composite; \\(3 + 2\\sqrt x + x\\) is \\((1 + \\sqrt x)^2 + 2\\), not a coincidence.",
      formula: {
        label: "Shape matching",
        latex:
          "f(g(x)) = \\Phi\\big(g(x)\\big) \\ \\Rightarrow\\ f = \\Phi",
      },
      authoredExample: {
        prompt: "If \\(g(x) = 2x + 1\\) and \\(f(g(x)) = 4x^2 + 4x + 3\\), find \\(f(x)\\).",
        steps: [
          "\\(4x^2 + 4x + 3 = (2x + 1)^2 + 2 = g(x)^2 + 2\\).",
        ],
        answer: "\\(f(x) = x^2 + 2\\)",
      },
      selfCheckExample: {
        prompt: "If \\(g(x) = x^2 - 3\\) and \\((g \\circ f)(x) = x^2 + 2x - 2\\), find \\(f(1)\\) given \\(f(1) > 0\\).",
        steps: [
          "At \\(x = 1\\): \\(g(f(1)) = 1\\), so \\(f(1)^2 - 3 = 1\\), \\(f(1) = \\pm 2\\); positive root.",
        ],
        answer: "\\(2\\)",
      },
      pyqExampleId: "bca4c989-47d9-4af8-9bc7-2c006aaa752d",
      traps: [
        {
          title: "Solving for f(x) when only f(2) is asked",
          body:
            "Finding \\(f\\) as a formula from \\((g \\circ f)(x) = 4x^2 - 10x + 5\\) needs a square root of a quadratic. One substitution, \\(x = 2\\), gives a quadratic in the number \\(f(2)\\).",
        },
      ],
    },

    // 4 — functional identities with log
    {
      kind: "formula" as const,
      slug: "cetsrf-log-functional-identities",
      name: "Functional Identities: f(2x/(1 + x²)) = 2f(x) and the Cubic Twin",
      intuition:
        "For \\(f(x) = \\log\\dfrac{1 - x}{1 + x}\\), substituting a rational expression and factoring \\(1 \\mp u\\) turns the argument into a power of \\(\\dfrac{1 - x}{1 + x}\\); the log pulls the power out front.",
      definition:
        "- \\(u = \\dfrac{2x}{1 + x^2}\\): \\(1 - u = \\dfrac{(1 - x)^2}{1 + x^2}\\), \\(1 + u = \\dfrac{(1 + x)^2}{1 + x^2}\\), so \\(\\dfrac{1 - u}{1 + u} = \\left(\\dfrac{1 - x}{1 + x}\\right)^2\\) and \\(f(u) = 2f(x)\\).\n" +
        "- \\(f(x) = \\log\\dfrac{1 + x}{1 - x}\\), \\(g(x) = \\dfrac{3x + x^3}{1 + 3x^2}\\): \\(1 + g = \\dfrac{(1 + x)^3}{1 + 3x^2}\\), \\(1 - g = \\dfrac{(1 - x)^3}{1 + 3x^2}\\), so \\((f \\circ g)(x) = 3f(x)\\).\n" +
        "- The pattern: \\(\\dfrac{2x}{1 + x^2}\\) is the \\(\\tanh\\)-double-angle shape, \\(\\dfrac{3x + x^3}{1 + 3x^2}\\) the triple; the log of the ratio scales by \\(2\\) and \\(3\\) respectively.\n" +
        "- Compute \\(1 - u\\) and \\(1 + u\\) SEPARATELY over the common denominator; the denominators cancel in the ratio, which is why the answer is clean.",
      formula: {
        label: "The two identities",
        latex:
          "f(x) = \\log\\frac{1 - x}{1 + x}:\\quad f\\!\\left(\\frac{2x}{1 + x^2}\\right) = 2f(x),\\qquad f\\!\\left(\\frac{3x + x^3}{1 + 3x^2}\\right) = 3f(x)",
      },
      authoredExample: {
        prompt: "If \\(f(x) = \\log\\dfrac{1 + x}{1 - x}\\), show that \\(f(a) + f(b) = f\\!\\left(\\dfrac{a + b}{1 + ab}\\right)\\).",
        steps: [
          "\\(f(a) + f(b) = \\log\\dfrac{(1 + a)(1 + b)}{(1 - a)(1 - b)} = \\log\\dfrac{1 + ab + a + b}{1 + ab - a - b}\\).",
          "Divide numerator and denominator by \\(1 + ab\\): \\(\\log\\dfrac{1 + \\frac{a + b}{1 + ab}}{1 - \\frac{a + b}{1 + ab}} = f\\!\\left(\\dfrac{a + b}{1 + ab}\\right)\\).",
        ],
        answer: "Shown.",
      },
      selfCheckExample: {
        prompt: "If \\(f(x) = \\log\\dfrac{1 + x}{1 - x}\\), express \\(f(a) - f(b)\\) as a single value of \\(f\\).",
        steps: [
          "\\(f(a) - f(b) = \\log\\dfrac{(1 + a)(1 - b)}{(1 - a)(1 + b)} = \\log\\dfrac{1 - ab + a - b}{1 - ab - a + b}\\).",
          "Divide top and bottom by \\(1 - ab\\): \\(\\log\\dfrac{1 + \\frac{a - b}{1 - ab}}{1 - \\frac{a - b}{1 - ab}}\\).",
        ],
        answer: "\\(f\\!\\left(\\dfrac{a - b}{1 - ab}\\right)\\)",
      },
      pyqExampleId: "4c084aac-ca3e-47cf-964f-b0c5a598c5a2",
      traps: [
        {
          title: "Reading the sign of the ratio backwards",
          body:
            "\\(\\dfrac{1 - u}{1 + u}\\) with \\(u = \\dfrac{2x}{1 + x^2}\\) is \\(\\left(\\dfrac{1 - x}{1 + x}\\right)^2\\), positive power. Option (B) \\(-2f(x)\\) is the inverted ratio.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Inverse Functions — f∘g = x is the definition of an inverse pair",
      href: "/notes/mht-cet-maths/sets-relations-and-functions/cetsrf-inverse-functions",
    },
    {
      label: "Domain and Range — the domain a composite inherits",
      href: "/notes/mht-cet-maths/sets-relations-and-functions/cetsrf-domain-and-range",
    },
  ],
};
