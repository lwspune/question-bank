import type { SubtopicNote } from "@/app/notes/_types";

export const INVERSE_FUNCTIONS_NOTE: SubtopicNote = {
  subtopicName: "Inverse Functions — Finding f⁻¹ and Solving f(x) = f⁻¹(x)",
  title: "Inverse Functions — Finding f⁻¹ and Solving f(x) = f⁻¹(x)",
  oneLineDefinition:
    "Swap the roles: set y = f(x), solve for x in terms of y, and rename — a linear-fractional (ax + b)/(cx + d) inverts to (dx − b)/(−cx + a); for an increasing f, f(x) = f⁻¹(x) reduces to f(x) = x.",
  whyItMatters:
    "7 PYQs at 14% HARD. Four are 'find f⁻¹' for a linear-fractional, a quadratic-type or a composite function, two use the self-inverse condition f∘f = x, and one solves f(x) = f⁻¹(x). " +
    "The HARD one adds two inverses and solves a quadratic. The method never changes; the checks that matter are the branch of a square root and the domain the inverse must land in.",
  concepts: [
    // 1 — linear fractional inverse
    {
      kind: "formula" as const,
      slug: "cetsrf-inverse-of-a-linear-fractional-function",
      name: "Inverse of (ax + b)/(cx + d): Solve for x, and the Swap-and-Negate Shortcut",
      intuition:
        "Write \\(y = \\dfrac{ax + b}{cx + d}\\), cross-multiply, gather the \\(x\\) terms, divide. The result is always \\(\\dfrac{dy - b}{-cy + a}\\): swap \\(a\\) and \\(d\\), negate \\(b\\) and \\(c\\).",
      definition:
        "- \\(f(x) = \\dfrac{2x - 3}{3x - 4}\\): \\(3xy - 4y = 2x - 3 \\Rightarrow x(3y - 2) = 4y - 3 \\Rightarrow f^{-1}(x) = \\dfrac{4x - 3}{3x - 2}\\).\n" +
        "- Shortcut check: \\(a = 2, b = -3, c = 3, d = -4\\): \\(\\dfrac{dx - b}{-cx + a} = \\dfrac{-4x + 3}{-3x + 2} = \\dfrac{4x - 3}{3x - 2}\\). Same.\n" +
        "- \\(f(x) = \\dfrac{x - 3}{x - 2}\\): \\(f^{-1}(x) = \\dfrac{2x - 3}{x - 1}\\). \\(g(x) = 3x - 2\\): \\(g^{-1}(x) = \\dfrac{x + 2}{3}\\). Their sum \\(= \\dfrac{19}{6}\\) gives \\(2x^2 - 5x - 3 = 0\\), roots \\(-\\tfrac12\\) and \\(3\\), sum \\(\\tfrac52\\).\n" +
        "- The inverse's domain excludes \\(x = \\dfrac{a}{c}\\), the value \\(f\\) never takes — the same number as the onto exception on the function-types page.",
      formula: {
        label: "Linear-fractional inverse",
        latex:
          "f(x) = \\frac{ax + b}{cx + d} \\ \\Rightarrow\\ f^{-1}(x) = \\frac{dx - b}{-cx + a}",
      },
      visualizationSlug: "inverse-reflection-line",
      authoredExample: {
        prompt: "Find \\(f^{-1}(x)\\) for \\(f(x) = \\dfrac{5x + 1}{2x - 7}\\).",
        steps: [
          "\\(2xy - 7y = 5x + 1 \\Rightarrow x(2y - 5) = 7y + 1 \\Rightarrow x = \\dfrac{7y + 1}{2y - 5}\\).",
        ],
        answer: "\\(f^{-1}(x) = \\dfrac{7x + 1}{2x - 5}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(f(x) = \\dfrac{x + 4}{x - 1}\\) and \\(g(x) = 2x + 5\\), solve \\(f^{-1}(x) = g^{-1}(x)\\).",
        steps: [
          "\\(f^{-1}(x) = \\dfrac{x + 4}{x - 1}\\) (self-inverse: \\(a = -d\\)); \\(g^{-1}(x) = \\dfrac{x - 5}{2}\\).",
          "\\(2(x + 4) = (x - 5)(x - 1) \\Rightarrow x^2 - 8x - 3 = 0 \\Rightarrow x = 4 \\pm \\sqrt{19}\\).",
        ],
        answer: "\\(x = 4 \\pm \\sqrt{19}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = 3x - 2\\): \\(f^{-1}(x) = ?\\)",
          answer: "\\(\\dfrac{x + 2}{3}\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{x - 3}{x - 2}\\): \\(f^{-1}(x) = ?\\)",
          answer: "\\(\\dfrac{2x - 3}{x - 1}\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{2x + 1}{x + 3}\\): \\(f^{-1}(x) = ?\\)",
          answer: "\\(\\dfrac{3x - 1}{2 - x}\\)",
        },
        {
          prompt: "\\(f^{-1}(x) = \\dfrac{4x - 3}{3x - 2}\\): \\(f^{-1}(1) = ?\\)",
          answer: "\\(1\\)",
        },
      ],
      pyqExampleId: "971209a4-284a-4a2a-b92c-62423ea2cb88",
      traps: [
        {
          title: "Taking the reciprocal",
          body:
            "\\(f^{-1}\\) is not \\(\\dfrac1f\\). \\(\\dfrac{3x - 4}{2x - 3}\\)-type options are the reciprocal; the inverse swaps and negates the coefficients instead.",
        },
      ],
    },

    // 2 — self-inverse f∘f = x
    {
      kind: "formula" as const,
      slug: "cetsrf-self-inverse-condition",
      name: "Self-Inverse: f(f(x)) = x Fixes the Parameter",
      intuition:
        "A function equal to its own inverse satisfies \\(f(f(x)) = x\\). For \\(\\dfrac{ax + b}{cx + d}\\) that is exactly \\(a + d = 0\\) — compose once and compare coefficients.",
      definition:
        "- \\(f(x) = \\dfrac{a - x}{a + x}\\): \\(f(f(x)) = \\dfrac{a - \\frac{a - x}{a + x}}{a + \\frac{a - x}{a + x}} = \\dfrac{a^2 + ax - a + x}{a^2 + ax + a - x}\\). Equal to \\(x\\) for all \\(x\\) forces \\(a = 1\\); then \\(f(x) = \\dfrac{1 - x}{1 + x}\\) and \\(f\\!\\left(-\\tfrac15\\right) = \\dfrac{6/5}{4/5} = \\dfrac32\\).\n" +
        "- \\(f(x) = \\dfrac{\\alpha x}{x + 1}\\) is self-inverse iff \\(\\alpha = -1\\) (composite page).\n" +
        "- Test: \\(\\dfrac{ax + b}{cx + d}\\) is an involution iff \\(a = -d\\) (or \\(f\\) is the identity). \\(\\dfrac{x + 4}{x - 1}\\): yes; \\(\\dfrac{2x - 3}{3x - 4}\\): no.\n" +
        "- Two functions that are inverses of each other satisfy \\(f(g(x)) = g(f(x)) = x\\), which is how \\(\\dfrac{3x + 4}{5x - 7}\\) and \\(\\dfrac{7x + 4}{5x - 3}\\) commute.",
      formula: {
        label: "Involution test",
        latex:
          "f(f(x)) = x \\ \\iff\\ f = f^{-1} \\qquad \\frac{ax + b}{cx + d} \\text{ self-inverse} \\iff a + d = 0",
      },
      authoredExample: {
        prompt: "For what value of \\(k\\) is \\(f(x) = \\dfrac{3x + 2}{5x + k}\\) its own inverse?",
        steps: [
          "\\(a + d = 0 \\Rightarrow 3 + k = 0\\).",
        ],
        answer: "\\(k = -3\\)",
      },
      selfCheckExample: {
        prompt: "Let \\(f(x) = \\dfrac{b - x}{b + x}\\) satisfy \\(f(f(x)) = x\\). Find \\(f(3)\\).",
        steps: [
          "\\(a + d = 0\\) with \\(a = -1\\), \\(d = b\\): \\(b = 1\\). \\(f(3) = \\dfrac{1 - 3}{1 + 3} = -\\dfrac12\\).",
        ],
        answer: "\\(-\\dfrac12\\)",
      },
      practiceSet: [
        {
          prompt: "Is \\(f(x) = \\dfrac1x\\) self-inverse?",
          answer: "Yes.",
        },
        {
          prompt: "Is \\(f(x) = 5 - x\\) self-inverse?",
          answer: "Yes.",
        },
        {
          prompt: "Is \\(f(x) = 2x\\) self-inverse?",
          answer: "No (\\(f(f(x)) = 4x\\)).",
        },
        {
          prompt: "\\(\\dfrac{1 - x}{1 + x}\\) at \\(x = \\dfrac13\\)?",
          answer: "\\(\\dfrac12\\)",
        },
      ],
      pyqExampleId: "cfe3c449-c331-4b5a-b48a-3dad1f4f7a9e",
      traps: [
        {
          title: "Solving f(x) = x instead of f(f(x)) = x",
          body:
            "Fixed points of \\(f\\) are not the same as \\(f\\) being an involution. The parameter comes from the identity \\(f(f(x)) = x\\) holding for EVERY \\(x\\).",
        },
      ],
    },

    // 3 — inverse of a quadratic-type / composite
    {
      kind: "formula" as const,
      slug: "cetsrf-inverse-with-a-root-choose-the-branch",
      name: "Inverse With a Square Root: Choose the Branch From the Domain",
      intuition:
        "When solving \\(y = f(x)\\) for \\(x\\) produces a \\(\\pm\\), the stated domain of \\(f\\) picks the sign. \\(f(x) = x + \\dfrac1x\\) on \\([1, \\infty)\\) keeps the '+' root; a composite \\((f \\circ g)^{-1}\\) is found by inverting the composite formula, not by composing inverses in the wrong order.",
      definition:
        "- \\(y = x + \\dfrac1x \\Rightarrow x^2 - yx + 1 = 0 \\Rightarrow x = \\dfrac{y \\pm \\sqrt{y^2 - 4}}{2}\\); for \\(x \\ge 1\\) take '+': \\(f^{-1}(x) = \\dfrac{x + \\sqrt{x^2 - 4}}{2}\\).\n" +
        "- \\((f \\circ g)(x) = 3x^2 + 7\\) (with \\(f(x) = 3x + 10\\), \\(g(x) = x^2 - 1\\)): \\(x = \\left(\\dfrac{y - 7}{3}\\right)^{1/2}\\), so \\((f \\circ g)^{-1}(x) = \\left(\\dfrac{x - 7}{3}\\right)^{1/2}\\) on \\(x \\ge 0\\).\n" +
        "- \\((f \\circ g)(x) = 2x^3 + 7\\): \\((f \\circ g)^{-1}(-9)\\) solves \\(2x^3 + 7 = -9\\), \\(x^3 = -8\\), \\(x = -2\\).\n" +
        "- \\((f \\circ g)^{-1} = g^{-1} \\circ f^{-1}\\): the order reverses. Inverting the composed formula directly avoids the reversal error.",
      formula: {
        label: "Order of inverses",
        latex:
          "(f \\circ g)^{-1} = g^{-1} \\circ f^{-1}",
      },
      authoredExample: {
        prompt: "If \\(f : [0, \\infty) \\to [3, \\infty)\\), \\(f(x) = x^2 + 3\\), find \\(f^{-1}(x)\\).",
        steps: [
          "\\(y = x^2 + 3 \\Rightarrow x = \\pm\\sqrt{y - 3}\\); domain \\(x \\ge 0\\) picks '+'.",
        ],
        answer: "\\(f^{-1}(x) = \\sqrt{x - 3}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(f(x) = 4x - 1\\) and \\(g(x) = x^3 + 2\\), find \\((f \\circ g)^{-1}(31)\\).",
        steps: [
          "\\((f \\circ g)(x) = 4x^3 + 7 = 31 \\Rightarrow x^3 = 6\\).",
        ],
        answer: "\\(\\sqrt[3]{6}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = x^2\\) on \\((-\\infty, 0]\\): \\(f^{-1}(x) = ?\\)",
          answer: "\\(-\\sqrt{x}\\)",
        },
        {
          prompt: "\\(f(x) = 2x + 7\\), \\(g(x) = x^3\\): \\((f \\circ g)^{-1}(x) = ?\\)",
          answer: "\\(\\sqrt[3]{\\dfrac{x - 7}{2}}\\)",
        },
        {
          prompt: "Same: \\((g \\circ f)^{-1}(x) = ?\\)",
          answer: "\\(\\dfrac{\\sqrt[3]{x} - 7}{2}\\)",
        },
        {
          prompt: "\\(f(x) = x + \\dfrac1x\\), \\(x \\ge 1\\): \\(f^{-1}\\!\\left(\\dfrac52\\right) = ?\\)",
          answer: "\\(2\\)",
        },
      ],
      pyqExampleId: "20cd7ebc-d811-468c-b157-19c361688c31",
      traps: [
        {
          title: "Keeping the '−' branch",
          body:
            "\\(\\dfrac{x - \\sqrt{x^2 - 4}}{2}\\) is option (C), and it is at most \\(1\\) for \\(x \\ge 2\\) — it lands OUTSIDE the domain \\([1, \\infty)\\) except at the endpoint. The domain chooses the sign.",
        },
      ],
    },

    // 4 — f(x) = f^{-1}(x)
    {
      kind: "formula" as const,
      slug: "cetsrf-solve-f-equals-f-inverse",
      name: "Solving f(x) = f⁻¹(x): For an Increasing f, Solve f(x) = x",
      intuition:
        "The graphs of \\(f\\) and \\(f^{-1}\\) are reflections in \\(y = x\\); for an increasing \\(f\\) they can only meet ON that line, so \\(f(x) = f^{-1}(x)\\) reduces to \\(f(x) = x\\).",
      definition:
        "- \\(f(x) = (x + 1)^2 - 1\\), \\(x \\ge -1\\), is increasing. \\(f(x) = x \\Rightarrow x^2 + x = 0 \\Rightarrow x \\in \\{0, -1\\}\\).\n" +
        "- Why the reduction is legitimate: if \\(f(x) = f^{-1}(x) = y\\) with \\(y > x\\), increasing \\(f\\) gives \\(f(y) > f(x) = y\\) but \\(f(y) = f(f^{-1}(x)) = x < y\\), a contradiction; likewise \\(y < x\\).\n" +
        "- The option with complex numbers \\(\\dfrac{-3 \\pm i\\sqrt3}{2}\\) comes from solving \\(f(x) = f^{-1}(x)\\) by brute force, \\((x + 1)^2 - 1 = \\sqrt{x + 1} - 1\\), and squaring; those roots are not real and \\(x \\ge -1\\) is required.\n" +
        "- For a DECREASING \\(f\\) the reduction fails (\\(f(x) = \\dfrac1x\\) meets its inverse everywhere); check monotonicity first.",
      formula: {
        label: "Fixed points",
        latex:
          "f \\text{ increasing}:\\quad f(x) = f^{-1}(x) \\iff f(x) = x",
      },
      authoredExample: {
        prompt: "If \\(f(x) = x^2 + 2x\\), \\(x \\ge -1\\), find all \\(x\\) with \\(f(x) = f^{-1}(x)\\).",
        steps: [
          "\\(f\\) is increasing on \\([-1, \\infty)\\), so solve \\(x^2 + 2x = x \\Rightarrow x(x + 1) = 0\\).",
        ],
        answer: "\\(x \\in \\{-1, 0\\}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(f(x) = \\sqrt{x + 2}\\), \\(x \\ge -2\\), solve \\(f(x) = f^{-1}(x)\\).",
        steps: [
          "\\(f\\) is increasing: \\(\\sqrt{x + 2} = x \\Rightarrow x \\ge 0\\) and \\(x^2 - x - 2 = 0 \\Rightarrow x = 2\\) (reject \\(-1\\)).",
        ],
        answer: "\\(x = 2\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = 2x - 1\\): solve \\(f(x) = f^{-1}(x)\\).",
          answer: "\\(x = 1\\)",
        },
        {
          prompt: "\\(f(x) = x^3\\): solve \\(f(x) = f^{-1}(x)\\).",
          answer: "\\(x \\in \\{-1, 0, 1\\}\\)",
        },
        {
          prompt: "Is \\(f(x) = (x + 1)^2 - 1\\) increasing on \\(x \\ge -1\\)?",
          answer: "Yes.",
        },
        {
          prompt: "Does \\(f(x) = 4 - x\\) meet \\(f^{-1}\\) only on \\(y = x\\)?",
          answer: "No — it IS its inverse; they coincide.",
        },
      ],
      pyqExampleId: "c288e70d-cc57-41fd-b93c-385275eeccad",
      traps: [
        {
          title: "Including the complex roots",
          body:
            "Option (C) lists two non-real numbers alongside \\(0\\) and \\(-1\\). The set is real-valued and domain-restricted; the fixed-point equation \\(x^2 + x = 0\\) has exactly the two real solutions.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Composite Functions — f(f(x)) = x and the order of composed inverses",
      href: "/notes/mht-cet-maths/sets-relations-and-functions/cetsrf-composite-functions",
    },
    {
      label: "Sets, Relations and Types of Functions — one-one is what makes f⁻¹ exist",
      href: "/notes/mht-cet-maths/sets-relations-and-functions/cetsrf-sets-relations-and-function-types",
    },
  ],
};
