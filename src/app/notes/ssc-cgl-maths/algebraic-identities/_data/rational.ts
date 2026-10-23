import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AI_RATIONAL_NOTE: SubtopicNote = {
  subtopicName: "Rational Algebraic Expressions",
  title: "Rational Algebraic Expressions",
  oneLineDefinition:
    "Factorising the top and bottom of a fraction and cancelling, joining fractions over one denominator, and using a given condition to replace a whole piece.",
  whyItMatters:
    "19 questions in the bank, 13 of them EASY. The identities from the earlier pages do the factorising here: a difference of squares, a perfect square, a cube. Since the options are expressions, putting in one or two small values checks the answer in seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscaira-cancel",
      name: "Factorise, then cancel",
      intuition:
        "A fraction of polynomials simplifies the way \\(\\frac{12}{18}\\) does: write the top and the bottom as products, then strike out the factors they share.",
      definition:
        "- Look for a **common factor** first: \\(6x^2 - 9x = 3x(2x - 3)\\), and \\((5p)^3 = 125p^3\\).\n" +
        "- Then the patterns: \\(a^2 - b^2\\), \\(a^2 \\pm 2ab + b^2\\), \\(a^3 \\pm b^3\\), the expanded cube, and \\(x^2 + (p + q)x + pq = (x + p)(x + q)\\).\n" +
        "- **A leading coefficient:** split the middle term. \\(6a^2 - ab - 12b^2 = (3a + 4b)(2a - 3b)\\), since \\(3 \\times (-3) + 4 \\times 2 = -1\\).\n" +
        "- **A factorisation that is easy to miss:** \\(a^4 + a^2b^2 + b^4 = (a^2 + ab + b^2)(a^2 - ab + b^2)\\).\n" +
        "- Cancel only **factors**, never terms joined by + or −.\n" +
        "- A factor written backwards is its negative: \\(3y - 2x = -(2x - 3y)\\), while \\((3y - 2x)^2 = (2x - 3y)^2\\).\n" +
        "- **Fast route:** put \\(x = 2\\) (or \\(a = 2, b = 1\\)) into the question and the options. Avoid a value that makes a bottom zero.",
      formula: {
        label: "Factorisations for cancelling",
        latex:
          "x^2 + (p + q)x + pq = (x + p)(x + q) \\qquad a^4 + a^2b^2 + b^4 = (a^2 + ab + b^2)(a^2 - ab + b^2)",
      },
      authoredExample: {
        prompt: "Simplify \\(\\frac{x^2 - x - 20}{x^2 - 25}\\).",
        steps: [
          "Top: two numbers with product \\(-20\\) and sum \\(-1\\) are \\(-5\\) and 4, so \\(x^2 - x - 20 = (x - 5)(x + 4)\\).",
          "Bottom: \\(x^2 - 25 = (x - 5)(x + 5)\\).",
          "Cancel \\(x - 5\\): \\(\\frac{x + 4}{x + 5}\\). Check at \\(x = 0\\): \\(\\frac{-20}{-25} = \\frac{4}{5}\\).",
        ],
        answer: "\\(\\frac{x + 4}{x + 5}\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\frac{16^4 + 16^2 + 1}{16^2 + 16 + 1}\\).",
        steps: [
          "With \\(a = 16\\) and \\(b = 1\\), the top is \\(a^4 + a^2b^2 + b^4 = (a^2 + a + 1)(a^2 - a + 1)\\).",
          "The first factor cancels the bottom, leaving \\(16^2 - 16 + 1 = 241\\).",
        ],
        answer: "241",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\frac{a^2 - 16}{a - 4}\\).", answer: "\\(a + 4\\)" },
        { prompt: "Simplify \\(\\frac{9x^2 - 12x + 4}{3x - 2}\\).", answer: "\\(3x - 2\\)" },
        { prompt: "Simplify \\(\\frac{x^3 - 27}{x^2 + 3x + 9}\\).", answer: "\\(x - 3\\)" },
        { prompt: "Simplify \\(\\frac{2x^2 + 7x + 3}{2x + 1}\\).", answer: "\\(x + 3\\)" },
      ],
      pyqExampleId: "c38fee4b-35ba-4379-bb18-df8e1d952616",
      traps: [
        {
          title: "Cancelling terms, not factors",
          body:
            "\\(\\frac{x^2 + 5}{x + 5}\\) does not simplify to x. Only a factor of the whole top and the whole bottom can cancel, and \\(x^2 + 5\\) has no factor \\(x + 5\\).",
        },
        {
          title: "A backwards factor changes the sign",
          body:
            "\\(\\frac{2x - 7}{7 - 2x} = -1\\), not 1, because \\(7 - 2x = -(2x - 7)\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaira-combine",
      name: "Combining fractions and using a given condition",
      intuition:
        "Fractions with different bottoms join over one common denominator, just as with numbers. When the question gives a condition, use it to replace a whole piece of the expression instead of solving for the letters.",
      definition:
        "- **Common denominator:** \\(\\frac{a}{p} + \\frac{b}{q} = \\frac{aq + bp}{pq}\\). Multiply each top by what its bottom is missing.\n" +
        "- **Split a fraction:** \\(\\frac{3a - 4}{a} = 3 - \\frac{4}{a}\\). This turns an equation in such fractions into one in \\(\\frac{1}{a}\\), \\(\\frac{1}{b}\\), \\(\\frac{1}{c}\\).\n" +
        "- **Replace using the condition:** if \\(x^2 + 9 = 7x\\), then \\(x^2 - 3x + 9 = 4x\\). A quadratic in the question is often the given one plus a simple extra term.\n" +
        "- If \\(a + b = k\\), then \\(\\frac{1}{a} + \\frac{1}{b} = \\frac{k}{ab}\\).\n" +
        "- If \\(a + b = 2c\\), then \\(a - c = c - b\\): a, c, b are equally spaced.\n" +
        "- **Fast route for a constant answer:** put in simple values that satisfy the condition (equal values, or a triple such as 1, 2, −3 when the sum must be 0) and compute.\n" +
        "- **Limit:** the values must satisfy the condition. Values that break it prove nothing.",
      formula: {
        label: "Adding two fractions",
        latex: "\\frac{a}{p} + \\frac{b}{q} = \\frac{aq + bp}{pq}",
      },
      authoredExample: {
        prompt: "If \\(x^2 + 6 = 5x\\), find \\(\\frac{x^2 + x + 6}{x^2 + 6}\\).",
        steps: [
          "Replace \\(x^2 + 6\\) by \\(5x\\) on the top and the bottom.",
          "\\(\\frac{5x + x}{5x} = \\frac{6x}{5x} = \\frac{6}{5}\\).",
          "Check with \\(x = 2\\), which fits \\(4 + 6 = 10\\): \\(\\frac{4 + 2 + 6}{10} = \\frac{6}{5}\\).",
        ],
        answer: "\\(\\frac{6}{5}\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\frac{x + 2}{3} - \\frac{x - 1}{2}\\).",
        steps: [
          "Over 6: \\(\\frac{2(x + 2) - 3(x - 1)}{6}\\).",
          "\\(= \\frac{2x + 4 - 3x + 3}{6} = \\frac{7 - x}{6}\\). Check at \\(x = 1\\): \\(1 - 0 = 1 = \\frac{6}{6}\\).",
        ],
        answer: "\\(\\frac{7 - x}{6}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(\\frac{5b + 2}{b}\\) as a whole number plus a fraction.", answer: "\\(5 + \\frac{2}{b}\\)" },
        { prompt: "If \\(a + b = 3\\) and \\(ab = 2\\), find \\(\\frac{1}{a} + \\frac{1}{b}\\).", answer: "\\(\\frac{3}{2}\\)" },
        { prompt: "If \\(a + b = 2c\\) and \\(c \\ne b\\), find \\(\\frac{a - c}{c - b}\\).", answer: "1" },
        { prompt: "Simplify \\(\\frac{1}{x - 1} - \\frac{1}{x + 1}\\).", answer: "\\(\\frac{2}{x^2 - 1}\\)" },
      ],
      pyqExampleId: "dfe03132-8b01-496c-86ab-3d9fae32601a",
      traps: [
        {
          title: "The minus sign before a fraction",
          body:
            "In \\(\\frac{a}{2} - \\frac{b - 3}{4}\\), the minus applies to the whole top of the second fraction: the result is \\(\\frac{2a - b + 3}{4}\\), not \\(\\frac{2a - b - 3}{4}\\).",
        },
        {
          title: "Test values that break the condition",
          body:
            "If the question says \\(a + b + c = 0\\), testing with \\(a = b = c = 1\\) is not allowed, because those values add to 3. Use values that fit, such as 1, 2 and −3.",
        },
      ],
    },
  ],
};
