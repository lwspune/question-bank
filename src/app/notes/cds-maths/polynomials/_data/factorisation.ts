import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_FACTORISATION_NOTE: SubtopicNote = {
  subtopicName: "Factorisation of Polynomials",
  title: "Factorisation of Polynomials",
  oneLineDefinition:
    "Factorise a cubic by finding one root and dividing, a product of four brackets by pairing them, and everything else by spotting a standard identity.",
  whyItMatters:
    "Nineteen PYQs. Three routes cover them: find a small integer root and divide; pair four linear brackets so a common quadratic appears and substitute; or recognise a known identity — difference of squares or cubes, a perfect square, grouping.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspo-cubic-factor",
      name: "Cubics: find a root, then divide",
      intuition:
        "An integer root of a monic cubic must divide the constant term. Try the small divisors, and the first one that gives zero splits off a linear factor; the quadratic left over factorises by the usual method.",
      definition:
        "- Integer roots of \\(x^3 + bx^2 + cx + d\\) divide \\(d\\): try \\(\\pm 1, \\pm 2, \\ldots\\).\n" +
        "- Once \\(x - a\\) is found, divide (or compare coefficients) to get the quadratic.\n" +
        "- A monic quartic with a known cubic factor \\((x - 1)^3\\) has its last factor fixed by the constant term.\n" +
        "- Grouping: \\(x^3(x^2 + 2x + 1) - (x^2 + 2x + 1) = (x^3 - 1)(x + 1)^2\\).",
      formula: {
        label: "Rational root test (monic)",
        latex: "x^3 + bx^2 + cx + d:\\ \\text{integer roots divide } d",
      },
      authoredExample: {
        prompt: "Factorise \\(x^3 - 2x^2 - 5x + 6\\).",
        steps: [
          "\\(f(1) = 1 - 2 - 5 + 6 = 0\\), so \\(x - 1\\) is a factor.",
          "Dividing: \\(x^2 - x - 6 = (x - 3)(x + 2)\\).",
        ],
        answer: "\\((x - 1)(x - 3)(x + 2)\\).",
      },
      selfCheckExample: {
        prompt: "Factorise \\(x^3 + 2x^2 - x - 2\\) by grouping.",
        steps: ["\\(x^2(x + 2) - (x + 2) = (x + 2)(x^2 - 1)\\)."],
        answer: "\\((x + 2)(x - 1)(x + 1)\\).",
      },
      practiceSet: [
        { prompt: "An integer root of \\(x^3 - 7x - 6\\)?", answer: "\\(-1\\) (also \\(-2\\), \\(3\\))" },
        { prompt: "Factorise \\(x^3 - x\\).", answer: "\\(x(x - 1)(x + 1)\\)" },
        { prompt: "Factorise \\(x^3 + x^2 - 4x - 4\\).", answer: "\\((x + 1)(x - 2)(x + 2)\\)" },
        { prompt: "\\((x - 1)^3(x + k) = x^4 + \\cdots - 2\\). \\(k\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "a011c87d-3b71-4e07-ae52-0fa0b52f1790", // 2017 (II) — factors of x³ + 4x² − 11x − 30
      traps: [
        {
          title: "Check the sign of each root",
          body:
            "If \\(f(-2) = 0\\), the factor is \\(x + 2\\), not \\(x - 2\\). Options are built from the same numbers with the signs changed, so verify one root in the original.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspo-pair-and-substitute",
      name: "Pair the brackets and substitute",
      intuition:
        "In \\(x(x + 2)(x + 3)(x + 5)\\), pairing the outer and inner brackets gives \\(x^2 + 5x\\) and \\(x^2 + 5x + 6\\) — the same quadratic plus a constant. Call it \\(t\\) and the expression becomes a quadratic in \\(t\\).",
      definition:
        "- Pair brackets so that each pair has the same \\(x^2 + bx\\) part: the constants in the brackets must add to the same total in each pair.\n" +
        "- Substitute \\(t = x^2 + bx\\), factorise in \\(t\\), then substitute back.\n" +
        "- Expressions in \\((3x + y)\\) and \\((x + 5y)\\): put \\(A = 3x + y\\), \\(B = x + 5y\\) and factorise in \\(A, B\\).\n" +
        "- \\(x(x + 1)(x + 2)(x + 3) + 1 = (x^2 + 3x + 1)^2\\).",
      formula: {
        label: "Pairing four brackets",
        latex: "x(x + 3)\\cdot(x + 1)(x + 2) = t(t + 2), \\quad t = x^2 + 3x",
      },
      authoredExample: {
        prompt: "Factorise \\((x + 1)(x + 2)(x + 3)(x + 4) - 24\\).",
        steps: [
          "Pair: \\((x + 1)(x + 4) = x^2 + 5x + 4\\) and \\((x + 2)(x + 3) = x^2 + 5x + 6\\). Let \\(t = x^2 + 5x\\).",
          "\\((t + 4)(t + 6) - 24 = t^2 + 10t = t(t + 10)\\).",
        ],
        answer: "\\(x(x + 5)(x^2 + 5x + 10)\\).",
      },
      selfCheckExample: {
        prompt: "Factorise \\(2x^2 + 5xy + 2y^2\\).",
        steps: ["Split \\(5xy = 4xy + xy\\): \\(2x(x + 2y) + y(x + 2y)\\)."],
        answer: "\\((2x + y)(x + 2y)\\).",
      },
      practiceSet: [
        { prompt: "\\(x(x + 1)(x + 2)(x + 3) + 1\\) is the square of?", answer: "\\(x^2 + 3x + 1\\)" },
        { prompt: "Pairing for \\((x - 1)(x + 2)(x + 3)(x + 6)\\)?", answer: "\\((x - 1)(x + 6)\\) and \\((x + 2)(x + 3)\\)" },
        { prompt: "Factorise \\(A^2 - A B - 2B^2\\).", answer: "\\((A - 2B)(A + B)\\)" },
        { prompt: "Sum of the factors of \\(x^2 - y^2\\)?", answer: "\\(2x\\)" },
      ],
      pyqExampleId: "9c423c5a-87f3-4b97-a0b0-8f13bd777e1a", // 2021 (I) — x(x − 1)(x − 2)(x − 3) + 1 = k²
      traps: [
        {
          title: "Pair by equal sums",
          body:
            "In \\(x(x + 2)(x + 3)(x + 5)\\), pair \\(0\\) with \\(5\\) and \\(2\\) with \\(3\\) (both sum to \\(5\\)). Pairing \\(x\\) with \\(x + 2\\) gives two different quadratics and no substitution.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspo-identity-factoring",
      name: "Factorising with identities",
      intuition:
        "Many exam polynomials are a standard identity in disguise: a difference of squares or cubes, a perfect square, or a sum that groups into a common bracket. Recognising the shape is the whole solution.",
      definition:
        "- \\(a^2 - b^2\\), \\(a^3 \\pm b^3\\), \\(a^4 + a^2b^2 + b^4 = (a^2 + ab + b^2)(a^2 - ab + b^2)\\).\n" +
        "- Perfect square: \\((px^2 + qx + r)^2\\) — check the first term, the last term and the cross term \\(2pr\\).\n" +
        "- Grouping: \\(1 - x - x^n + x^{n + 1} = (1 - x)(1 - x^n)\\), and \\(1 - x^n\\) has the factor \\(1 - x\\).\n" +
        "- \\(u^3 + v^3 + w^3 - 3uvw = (u + v + w)(u^2 + v^2 + w^2 - uv - vw - wu)\\).",
      formula: {
        label: "A useful quartic",
        latex: "a^4 + a^2b^2 + b^4 = (a^2 + ab + b^2)(a^2 - ab + b^2)",
      },
      authoredExample: {
        prompt: "Find the square root of \\(9x^4 - 12x^3 + 10x^2 - 4x + 1\\).",
        steps: [
          "Try \\((3x^2 + qx + r)^2\\): the \\(x^3\\) term gives \\(6q = -12\\), \\(q = -2\\); the constant gives \\(r = \\pm 1\\).",
          "\\(x^2\\) term: \\(q^2 + 6r = 4 + 6r = 10\\), so \\(r = 1\\). Check the \\(x\\) term: \\(2qr = -4\\).",
        ],
        answer: "\\(3x^2 - 2x + 1\\).",
      },
      selfCheckExample: {
        prompt: "Factorise \\(x^4 + x^2 + 1\\).",
        steps: ["It is \\(a^4 + a^2b^2 + b^4\\) with \\(a = x\\), \\(b = 1\\)."],
        answer: "\\((x^2 + x + 1)(x^2 - x + 1)\\).",
      },
      practiceSet: [
        { prompt: "Factorise \\(x^3 - 27\\).", answer: "\\((x - 3)(x^2 + 3x + 9)\\)" },
        { prompt: "Square root of \\(x^4 + 6x^2 + 9\\)?", answer: "\\(x^2 + 3\\)" },
        { prompt: "\\(1 - x - x^2 + x^3\\) factorised?", answer: "\\((1 - x)^2(1 + x)\\)" },
        { prompt: "\\((x^2 - 4)(x^2 + 4)\\)?", answer: "\\(x^4 - 16\\)" },
      ],
      pyqExampleId: "285644b5-7c2f-4d03-b557-74d3c6765e01", // 2020 (II) — 1 − x − xⁿ + xⁿ⁺¹ divisible by (1 − x)²
      traps: [
        {
          title: "Plus or minus in the linear factor",
          body:
            "\\(u^3 + v^3 + w^3 - 3uvw\\) has the factor \\(u + v + w\\) with every sign PLUS. An option with one term negated is not a factor, even though it looks close.",
        },
      ],
    },
  ],
};
