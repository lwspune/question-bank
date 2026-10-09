import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_EQI_SPECIAL_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Rational, Radical and Exponential Equations",
  title: "Equations with Fractions, Roots, Powers and Logs",
  oneLineDefinition:
    "Clearing a denominator, squaring a root or substituting for a power turns these equations into ones you can solve, but every answer must then be checked against the original.",
  whyItMatters:
    "Equations with x in a denominator appeared in 2018 and 2019, an inequality with a square root in 2025, and a count of the integers satisfying a condition with a root in 2011.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-eqi-rational-equations",
      name: "Equations with the unknown in a denominator",
      intuition:
        "Multiplying through by the common denominator clears the fractions, but it also hides the fact that the denominator was never allowed to be zero. So write down the forbidden values first and throw out any answer that matches them.",
      definition:
        "- State the **excluded values**: every \\(x\\) that makes a denominator zero.\n" +
        "- Multiply every term by the lowest common denominator.\n" +
        "- Solve the resulting equation (often a quadratic).\n" +
        "- **Reject** any solution that is an excluded value. If all are rejected, the equation has no solution.",
      formula: {
        label: "Clearing the denominator",
        latex: "\\frac{P(x)}{Q(x)} = R(x) \\;\\Rightarrow\\; P(x) = R(x)\\,Q(x), \\quad Q(x) \\ne 0",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{2}{x} + \\dfrac{3}{x + 1} = 2\\).",
        steps: [
          "Excluded values: \\(x \\ne 0\\) and \\(x \\ne -1\\).",
          "Multiply by \\(x(x + 1)\\): \\(2(x + 1) + 3x = 2x(x + 1)\\), so \\(5x + 2 = 2x^2 + 2x\\).",
          "\\(2x^2 - 3x - 2 = 0\\), that is \\((2x + 1)(x - 2) = 0\\): \\(x = -\\frac{1}{2}\\) or \\(x = 2\\).",
          "Neither is excluded, so both stand. (Their sum, \\(\\frac{3}{2}\\), matches \\(-\\frac{b}{a}\\).)",
        ],
        answer: "\\(x = -\\frac{1}{2}\\) or \\(x = 2\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{x}{x - 3} = \\dfrac{3}{x - 3} + 2\\).",
        options: ["\\(x = 3\\)", "\\(x = -3\\)", "\\(x = 0\\)", "No solution", "Every \\(x \\ne 3\\)"],
        steps: [
          "Excluded value: \\(x \\ne 3\\).",
          "Multiply by \\(x - 3\\): \\(x = 3 + 2(x - 3)\\), so \\(x = 2x - 3\\) and \\(x = 3\\).",
          "But \\(x = 3\\) is excluded, so the equation has no solution. Option A is the answer you get by forgetting the restriction.",
        ],
        answer: "(D) No solution",
      },
      practiceSet: [
        { prompt: "Solve \\(\\frac{6}{x} = x - 1\\).", answer: "\\(x = 3\\) or \\(x = -2\\)" },
        { prompt: "Solve \\(\\dfrac{1}{x - 2} = \\dfrac{3}{x + 4}\\).", answer: "\\(x = 5\\)", method: "\\(x + 4 = 3(x - 2)\\)" },
        { prompt: "Solve \\(\\dfrac{x^2 - 4}{x - 2} = 4\\).", answer: "No solution", method: "It gives \\(x = 2\\), which is excluded" },
        { prompt: "Solve \\(\\dfrac{5}{x + 1} = 1\\).", answer: "\\(x = 4\\)" },
      ],
      traps: [
        {
          title: "An excluded value can appear as an answer",
          body: "After clearing denominators, the algebra may produce a value that makes an original denominator zero. It is not a solution. IMAT offers it as an option; the correct choice may be \"no solution\".",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-radical-equations",
      name: "Equations and inequalities with square roots",
      intuition:
        "Squaring both sides removes the root, but it also accepts solutions of a different equation: squaring \\(\\sqrt{A} = B\\) gives the same result as squaring \\(\\sqrt{A} = -B\\). Since a square root is never negative, any answer that makes the right side negative is false and must be thrown out.",
      definition:
        "- \\(\\sqrt{A}\\) is defined only for \\(A \\ge 0\\), and \\(\\sqrt{A} \\ge 0\\) always.\n" +
        "- **Equation** \\(\\sqrt{A} = B\\): square to get \\(A = B^2\\), solve, then **check** every answer in the original (or keep only those with \\(B \\ge 0\\)).\n" +
        "- **Inequality** \\(\\sqrt{A} < B\\) (in outline): you need \\(A \\ge 0\\), \\(B > 0\\) and \\(A < B^2\\). Squaring is safe only when both sides are non-negative.\n" +
        "- **Inequality** \\(\\sqrt{A} > B\\): if \\(B < 0\\) it holds wherever \\(A \\ge 0\\); if \\(B \\ge 0\\) it needs \\(A > B^2\\).\n" +
        "- Always state the domain (\\(A \\ge 0\\)) as part of the answer.",
      formula: {
        label: "Squaring a root equation",
        latex: "\\sqrt{A} = B \\;\\Rightarrow\\; A = B^2 \\quad\\text{(keep only solutions with}\\; B \\ge 0)",
      },
      authoredExample: {
        prompt: "Solve \\(\\sqrt{x + 7} = x - 5\\).",
        steps: [
          "Square: \\(x + 7 = x^2 - 10x + 25\\), so \\(x^2 - 11x + 18 = 0\\) and \\((x - 2)(x - 9) = 0\\).",
          "Check \\(x = 2\\): left \\(\\sqrt{9} = 3\\), right \\(2 - 5 = -3\\). Not equal: reject.",
          "Check \\(x = 9\\): left \\(\\sqrt{16} = 4\\), right \\(9 - 5 = 4\\). Equal: keep.",
        ],
        answer: "\\(x = 9\\) only",
      },
      selfCheckExample: {
        prompt: "What is the set of real solutions of \\(\\sqrt{2x + 3} = x\\)?",
        options: ["\\(\\{3\\}\\)", "\\(\\{-1\\}\\)", "\\(\\{-1, 3\\}\\)", "\\(\\varnothing\\)", "\\(\\{1\\}\\)"],
        steps: [
          "Square: \\(2x + 3 = x^2\\), so \\(x^2 - 2x - 3 = 0\\) and \\((x - 3)(x + 1) = 0\\).",
          "\\(x = -1\\): \\(\\sqrt{1} = 1\\), but the right side is \\(-1\\). Reject.",
          "\\(x = 3\\): \\(\\sqrt{9} = 3\\). Keep. Option C forgets to check after squaring.",
        ],
        answer: "(A) \\(\\{3\\}\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(\\sqrt{x - 1} = 3\\).", answer: "\\(x = 10\\)" },
        { prompt: "Solve \\(\\sqrt{x} = -2\\).", answer: "No solution", method: "A square root is never negative" },
        { prompt: "Solve \\(\\sqrt{x} \\le 2\\).", answer: "\\(0 \\le x \\le 4\\)", method: "Domain \\(x \\ge 0\\), then square" },
        { prompt: "Solve \\(\\sqrt{x + 2} = x\\).", answer: "\\(x = 2\\)", method: "\\(x = -1\\) fails the check" },
      ],
      traps: [
        {
          title: "Squaring can add false solutions",
          body: "Every solution of \\(\\sqrt{A} = B\\) solves \\(A = B^2\\), but not the other way round. Substitute each answer back into the original equation; any that makes the right-hand side negative is false.",
        },
        {
          title: "A root inequality has a domain",
          body: "\\(\\sqrt{x} < 3\\) is \\(0 \\le x < 9\\), not \\(x < 9\\): negative \\(x\\) has no square root at all. Options that forget the lower limit are common.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-exp-log-equations",
      name: "Exponential and logarithmic equations",
      intuition:
        "An exponential equation that mixes \\(4^x\\) and \\(2^x\\) is a quadratic in disguise, because \\(4^x = (2^x)^2\\). A logarithmic equation is solved by combining the logs into one and undoing it, but a logarithm only accepts positive inputs, so every answer must be checked. The rules for powers and logarithms are in Numbers, Powers and Logarithms.",
      definition:
        "- **Common base**: \\(a^{f(x)} = a^{g(x)}\\) gives \\(f(x) = g(x)\\).\n" +
        "- **Substitution**: in \\(a^{2x} + b\\,a^x + c = 0\\), put \\(t = a^x\\) and solve the quadratic in \\(t\\). Keep only \\(t > 0\\), since \\(a^x\\) is always positive.\n" +
        "- **Logarithmic equations**: first state the domain (every log argument \\(> 0\\)), then combine the logs with the log laws, undo the log, solve, and **reject** answers outside the domain.",
      formula: {
        label: "Matching exponents or logs",
        latex: "a^{f(x)} = a^{g(x)} \\;\\Rightarrow\\; f(x) = g(x) \\qquad \\log_a f(x) = \\log_a g(x) \\;\\Rightarrow\\; f(x) = g(x) > 0",
      },
      authoredExample: {
        prompt: "Solve \\(4^x - 6 \\cdot 2^x + 8 = 0\\).",
        steps: [
          "\\(4^x = (2^x)^2\\). Put \\(t = 2^x\\), with \\(t > 0\\): \\(t^2 - 6t + 8 = 0\\).",
          "\\((t - 2)(t - 4) = 0\\), so \\(t = 2\\) or \\(t = 4\\). Both are positive.",
          "\\(2^x = 2\\) gives \\(x = 1\\); \\(2^x = 4\\) gives \\(x = 2\\).",
        ],
        answer: "\\(x = 1\\) or \\(x = 2\\)",
      },
      selfCheckExample: {
        prompt: "What is the set of real solutions of \\(\\log_{10}(x + 3) + \\log_{10} x = 1\\)?",
        options: ["\\(\\{-5, 2\\}\\)", "\\(\\{-5\\}\\)", "\\(\\{5\\}\\)", "\\(\\varnothing\\)", "\\(\\{2\\}\\)"],
        steps: [
          "Domain: \\(x + 3 > 0\\) and \\(x > 0\\), so \\(x > 0\\).",
          "Combine: \\(\\log_{10}[x(x + 3)] = 1\\), so \\(x(x + 3) = 10\\) and \\(x^2 + 3x - 10 = 0\\).",
          "\\((x + 5)(x - 2) = 0\\): \\(x = -5\\) is outside the domain, \\(x = 2\\) stands. Option A forgets the domain.",
        ],
        answer: "(E) \\(\\{2\\}\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(9^x - 4 \\cdot 3^x + 3 = 0\\).", answer: "\\(x = 0\\) or \\(x = 1\\)", method: "\\(t = 3^x\\) gives \\(t = 1\\) or 3" },
        { prompt: "Solve \\(2^x + 2^{x + 1} = 24\\).", answer: "\\(x = 3\\)", method: "\\(3 \\cdot 2^x = 24\\)" },
        { prompt: "Solve \\(\\log_2(x - 1) = 3\\).", answer: "\\(x = 9\\)", method: "\\(x - 1 = 2^3\\)" },
        { prompt: "Solve \\(e^{2x} - 5e^x + 6 = 0\\).", answer: "\\(x = \\ln 2\\) or \\(x = \\ln 3\\)" },
      ],
      traps: [
        {
          title: "Check the domain of every logarithm",
          body: "Combining logs can produce an answer that makes an original argument zero or negative, such as \\(x = -5\\) in \\(\\log x\\). Such an answer is not a solution. Likewise, in a substitution \\(t = a^x\\), a negative \\(t\\) gives no \\(x\\).",
        },
      ],
    },
  ],
};
