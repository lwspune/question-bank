import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AI_RATIONAL_NOTE: SubtopicNote = {
  subtopicName: "Rational Algebraic Expressions",
  title: "Rational Algebraic Expressions",
  oneLineDefinition:
    "Factor every numerator and denominator, cancel common factors, combine over a common denominator, and clear denominators to solve.",
  whyItMatters:
    "Nineteen PYQs, the most of any page in the chapter. Nothing here is a trick: the work is factorising cleanly and keeping signs straight. Most answers collapse to a single term or a constant, so if yours does not, look for a factor you missed.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsai-factorise-cancel",
      name: "Factorise and cancel",
      intuition:
        "A fraction of polynomials simplifies only through common factors, so factor everything first. The factors that appear are the ones from the identity pages: differences of squares, sums and differences of cubes, and split-middle-term quadratics.",
      definition:
        "- Factor each quadratic: \\(x^2 - 9x + 14 = (x - 2)(x - 7)\\).\n" +
        "- Use \\(a^2 - b^2\\), \\(a^3 \\pm b^3\\), and perfect squares like \\(x^2 + 4\\sqrt3\\,x + 12 = (x + 2\\sqrt3)^2\\).\n" +
        "- Cancel only whole factors, never single terms.\n" +
        "- With a numeric value like \\(x = 9999\\), simplify the algebra first and substitute last.",
      formula: {
        label: "Cancel a common factor",
        latex: "\\dfrac{(x - 1)(x^2 + x + 1)}{x^2 + x + 1} = x - 1",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{(x^2 - 9)(x^2 + 2x - 8)}{(x^2 + x - 6)(x^2 + 7x + 12)}\\).",
        steps: [
          "Factor: \\(\\dfrac{(x - 3)(x + 3)(x + 4)(x - 2)}{(x + 3)(x - 2)(x + 3)(x + 4)}\\).",
          "Cancel \\((x + 3)\\), \\((x - 2)\\), \\((x + 4)\\).",
        ],
        answer: "\\(\\dfrac{x - 3}{x + 3}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{x^3 + 8}{x^2 - 2x + 4}\\) at \\(x = 98\\).",
        steps: ["\\(x^3 + 8 = (x + 2)(x^2 - 2x + 4)\\), so the fraction is \\(x + 2\\)."],
        answer: "\\(100\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{x^2 - 1}{x^2 + x}\\)?", answer: "\\(\\dfrac{x - 1}{x}\\)" },
        { prompt: "\\(\\dfrac{a^4 - b^4}{a^2 + b^2}\\)?", answer: "\\(a^2 - b^2\\)" },
        { prompt: "\\(\\dfrac{x^3 - 27}{x - 3}\\)?", answer: "\\(x^2 + 3x + 9\\)" },
        { prompt: "\\(\\dfrac{6x^2 + x - 2}{2x - 1}\\)?", answer: "\\(3x + 2\\)" },
      ],
      pyqExampleId: "e6ddd1c0-f725-46cc-8fdc-783859c0d7b1", // 2021 (I) — (x³ − 1)(x² − 9x + 14) over ...
      traps: [
        {
          title: "Cancel factors, not terms",
          body:
            "In \\(\\dfrac{x^2 + 3x}{x + 3}\\) you may cancel \\((x + 3)\\) after writing the top as \\(x(x + 3)\\). You may not cross out the \\(3x\\) against the \\(3\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-combine-fractions",
      name: "Combining fractions",
      intuition:
        "Adding fractions needs a common denominator, and the smallest one comes from the factorised denominators. Work in pairs: two of the fractions often combine into something that cancels the third.",
      definition:
        "- Factor denominators, then use their least common multiple.\n" +
        "- 'What must be added to \\(P\\) to get \\(Q\\)?' is \\(Q - P\\).\n" +
        "- Given \\(A + B\\) and \\(A - B\\): \\(B = \\dfrac{(A + B) - (A - B)}{2}\\).\n" +
        "- \\(\\dfrac{x + y}{x - y} = \\dfrac{2x}{x - y} - 1\\): rewriting a term this way can expose a copy of another expression.\n" +
        "- \\(b - a = -(a - b)\\): flip a factor and flip the sign.",
      formula: {
        label: "Two fractions",
        latex: "\\dfrac{1}{x - 1} - \\dfrac{1}{x + 1} = \\dfrac{2}{x^2 - 1}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{1}{x - 1} - \\dfrac{1}{x + 1} - \\dfrac{2}{x^2 + 1}\\).",
        steps: [
          "The first two give \\(\\dfrac{2}{x^2 - 1}\\).",
          "\\(\\dfrac{2}{x^2 - 1} - \\dfrac{2}{x^2 + 1} = \\dfrac{2(x^2 + 1) - 2(x^2 - 1)}{x^4 - 1}\\).",
        ],
        answer: "\\(\\dfrac{4}{x^4 - 1}\\).",
      },
      selfCheckExample: {
        prompt: "What should be added to \\(\\dfrac{1}{x + 2}\\) to get \\(\\dfrac{3}{(x + 2)(x - 1)}\\)?",
        steps: ["\\(\\dfrac{3}{(x + 2)(x - 1)} - \\dfrac{x - 1}{(x + 2)(x - 1)}\\)."],
        answer: "\\(\\dfrac{4 - x}{(x + 2)(x - 1)}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac1x - \\dfrac{1}{x + 1}\\)?", answer: "\\(\\dfrac{1}{x(x + 1)}\\)" },
        { prompt: "\\(A + B = 2x\\), \\(A - B = 4\\). Find \\(B\\).", answer: "\\(x - 2\\)" },
        { prompt: "\\(\\dfrac{a}{a - b} + \\dfrac{b}{b - a}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\dfrac{1}{x - 2} + \\dfrac{1}{x + 2}\\)?", answer: "\\(\\dfrac{2x}{x^2 - 4}\\)" },
      ],
      pyqExampleId: "f77043d7-1319-46ba-83a8-6bb44b5c7fc3", // 2021 (I) — what should be added to 1/((x − 2)(x − 4))
      traps: [
        {
          title: "Order of subtraction",
          body:
            "'What should be added to \\(P\\) to get \\(Q\\)' is \\(Q - P\\), not \\(P - Q\\). The reversed answer differs only in sign and is usually printed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-rational-equations",
      name: "Equations with fractions",
      intuition:
        "Clear the denominators, and the equation becomes a polynomial. Before multiplying out everything, move terms so that matching pieces sit on the same side; big terms often cancel.",
      definition:
        "- Multiply through by the common denominator, then simplify.\n" +
        "- Group first: put the fractions with \\(x\\) in the denominator together.\n" +
        "- A parameter that appears everywhere can be scaled out: put \\(x = tk\\).\n" +
        "- Find an easy root by trial and factor it out.\n" +
        "- Reject any root that makes an original denominator zero.",
      formula: {
        label: "Excluded values",
        latex: "\\dfrac{P(x)}{Q(x)} = 0 \\;\\Rightarrow\\; P(x) = 0,\\ Q(x) \\ne 0",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{1}{x - 1} + \\dfrac{1}{x - 2} = \\dfrac{2}{x - 3}\\).",
        steps: [
          "Left side: \\(\\dfrac{2x - 3}{(x - 1)(x - 2)}\\).",
          "Cross-multiply: \\((2x - 3)(x - 3) = 2(x^2 - 3x + 2)\\), so \\(2x^2 - 9x + 9 = 2x^2 - 6x + 4\\).",
          "\\(-3x = -5\\), and \\(x = \\dfrac53\\) makes no denominator zero.",
        ],
        answer: "\\(x = \\dfrac53\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{x}{x - 1} - \\dfrac{1}{x - 1} = 3\\).",
        steps: ["The left side is \\(\\dfrac{x - 1}{x - 1} = 1\\) for every \\(x \\ne 1\\), never \\(3\\)."],
        answer: "No solution.",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac3x = \\dfrac12\\)?", answer: "\\(x = 6\\)" },
        { prompt: "\\(\\dfrac1x + \\dfrac{1}{2x} = \\dfrac14\\)?", answer: "\\(x = 6\\)" },
        { prompt: "\\(\\dfrac{x + 2}{x - 2} = 3\\)?", answer: "\\(x = 4\\)" },
        { prompt: "\\(\\dfrac{1}{x + k} = \\dfrac{1}{3k}\\)?", answer: "\\(x = 2k\\)" },
      ],
      pyqExampleId: "e77f3fb2-5604-42a2-ad7e-d63cf3aee248", // 2026 (II) — 1/(x + k) + 1/(x + 2k) + 1/(x + 5k) = 1/k
      traps: [
        {
          title: "Check the denominators",
          body:
            "A root that makes an original denominator zero is not a solution, even though it solves the cleared polynomial. And \\(x = 0\\) often satisfies a symmetric equation trivially; the question usually wants the other roots.",
        },
      ],
    },
  ],
};
