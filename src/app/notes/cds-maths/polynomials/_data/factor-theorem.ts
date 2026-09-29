import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_FACTOR_THEOREM_NOTE: SubtopicNote = {
  subtopicName: "The Factor Theorem",
  title: "The Factor Theorem",
  oneLineDefinition:
    "x − a is a factor of f(x) exactly when f(a) = 0; a quadratic factor gives one such equation for each of its roots.",
  whyItMatters:
    "Twelve PYQs. Either test which expression vanishes at a given root, or use a known factor to find unknown coefficients — one equation per root, solved together. A quadratic factor is simply two linear factors.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspo-factor-test",
      name: "Testing for a factor",
      intuition:
        "A factor \\(x - a\\) means \\(a\\) is a zero. So to test, substitute the zero and check for \\(0\\) — no division needed.",
      definition:
        "- \\(x - a\\) is a factor \\(\\iff f(a) = 0\\); \\(x + a\\) is a factor \\(\\iff f(-a) = 0\\); \\(ax - b\\) \\(\\iff f\\left(\\dfrac ba\\right) = 0\\).\n" +
        "- \\(x - 1\\) is a factor \\(\\iff\\) the coefficients add to \\(0\\).\n" +
        "- \\(x + 1\\) is a factor \\(\\iff\\) the even-place and odd-place coefficient sums are equal.\n" +
        "- \\(x^2 - 1\\) is a factor \\(\\iff\\) both of these hold.",
      formula: {
        label: "Factor theorem",
        latex: "(x - a) \\mid f(x) \\iff f(a) = 0",
      },
      authoredExample: {
        prompt: "Is \\(x - 3\\) a factor of \\(x^3 - 4x^2 + x + 6\\)? Is \\(x + 1\\)?",
        steps: ["\\(f(3) = 27 - 36 + 3 + 6 = 0\\): yes.", "\\(f(-1) = -1 - 4 - 1 + 6 = 0\\): yes."],
        answer: "Both are factors (the third is \\(x - 2\\)).",
      },
      selfCheckExample: {
        prompt: "Which zero of \\(2x^3 - x^2 - 1\\) is among \\(0, 1, -1\\)?",
        steps: ["\\(f(1) = 2 - 1 - 1 = 0\\)."],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Is \\(x - 1\\) a factor of \\(x^3 - 2x + 1\\)?", answer: "Yes" },
        { prompt: "Is \\(x + 2\\) a factor of \\(x^2 + x - 2\\)?", answer: "Yes" },
        { prompt: "Is \\(2x - 1\\) a factor of \\(2x^2 + x - 1\\)?", answer: "Yes" },
        { prompt: "\\(x^2 - 1\\) divides \\(ax^3 + bx^2 + cx + d\\). Condition?", answer: "\\(a + c = 0\\) and \\(b + d = 0\\)" },
      ],
      pyqExampleId: "8bedf4f1-ced1-40f7-b7e8-6670b45ef4a5", // 2017 (I) — x + 4 is a factor of which expression
      traps: [
        {
          title: "A factor of one is not a factor of both",
          body:
            "When asked what divides BOTH polynomials, test each candidate on each polynomial. A root of one alone is not enough.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspo-unknown-coefficients",
      name: "Finding unknown coefficients",
      intuition:
        "Each known factor gives one equation. With two unknowns you need two factors — often the two linear factors of a given quadratic.",
      definition:
        "- Factorise a given quadratic factor into its roots \\(\\alpha, \\beta\\); then \\(f(\\alpha) = 0\\) and \\(f(\\beta) = 0\\).\n" +
        "- Solve the two linear equations for the two unknowns.\n" +
        "- Once one zero is known, divide it out and factorise the quotient to find the rest.",
      formula: {
        label: "Quadratic factor",
        latex: "(x - \\alpha)(x - \\beta) \\mid f(x) \\iff f(\\alpha) = f(\\beta) = 0",
      },
      authoredExample: {
        prompt: "If \\(x^2 - 3x + 2\\) is a factor of \\(x^4 + ax^2 + b\\), find \\(a\\) and \\(b\\).",
        steps: [
          "The roots are \\(1\\) and \\(2\\): \\(1 + a + b = 0\\) and \\(16 + 4a + b = 0\\).",
          "Subtracting: \\(15 + 3a = 0\\), so \\(a = -5\\), \\(b = 4\\).",
        ],
        answer: "\\(a = -5\\), \\(b = 4\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x - 2\\) and \\(x + 1\\) are factors of \\(x^3 + px^2 + qx + 2\\), find \\(p\\) and \\(q\\).",
        steps: [
          "\\(f(2) = 8 + 4p + 2q + 2 = 0\\), so \\(2p + q = -5\\).",
          "\\(f(-1) = -1 + p - q + 2 = 0\\), so \\(p - q = -1\\).",
          "Adding: \\(3p = -6\\).",
        ],
        answer: "\\(p = -2\\), \\(q = -1\\).",
      },
      practiceSet: [
        { prompt: "\\(x - 2\\) is a factor of \\(x^2 + kx - 6\\). \\(k\\)?", answer: "\\(1\\)" },
        { prompt: "\\(x + 1\\) is a factor of \\(x^3 + k\\). \\(k\\)?", answer: "\\(1\\)" },
        { prompt: "Roots of the factor \\(x^2 - x - 6\\)?", answer: "\\(3\\) and \\(-2\\)" },
        { prompt: "\\(x - 1\\) divides \\(x^3 + ax + 4\\). \\(a\\)?", answer: "\\(-5\\)" },
      ],
      pyqExampleId: "6600c93d-7adf-495f-929c-891696a24424", // 2025 (I) — x² − 5x + 4 a factor of x⁴ − px² + q
      traps: [
        {
          title: "Factorise the quadratic factor first",
          body:
            "Substituting a quadratic like \\(x^2 - 4x + 3\\) is not possible directly; its roots \\(1\\) and \\(3\\) are what you substitute. Getting a root's sign wrong gives two consistent but wrong equations.",
        },
      ],
    },
  ],
};
