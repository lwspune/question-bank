import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_EQI_EXPRESSIONS_NOTE: SubtopicNote = {
  subtopicName: "Algebraic Expressions",
  title: "Expanding, Factorising and Algebraic Fractions",
  oneLineDefinition:
    "Expanding multiplies brackets out, factorising puts them back, and an algebraic fraction is simplified by cancelling common factors, never common terms.",
  whyItMatters:
    "Simplifying an algebraic fraction by factorising appeared in 2016, 2021 and 2022, and the 2025 paper asked you to recognise a perfect square trinomial. The factor theorem has not been asked yet, but it is the quickest way to factorise a cubic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-eqi-special-products",
      name: "Expanding brackets and the special products",
      intuition:
        "Expanding means every term in one bracket multiplies every term in the other. A few products come up so often that recognising them saves the work in both directions: spotting \\(a^2 - b^2\\) or a perfect square is the first step of most factorising.",
      definition:
        "- **Perfect squares**: \\((a + b)^2 = a^2 + 2ab + b^2\\) and \\((a - b)^2 = a^2 - 2ab + b^2\\).\n" +
        "- **Difference of two squares**: \\((a + b)(a - b) = a^2 - b^2\\). It also speeds up arithmetic: \\(61^2 - 39^2 = 22 \\times 100\\).\n" +
        "- **Cubes** (in outline): \\((a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3\\), \\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\\) and \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\).\n" +
        "- A trinomial is a perfect square when the middle term is twice the product of the square roots of the outer terms: \\(9x^2 - 12xy + 4y^2 = (3x - 2y)^2\\).",
      formula: {
        label: "Special products",
        latex: "(a \\pm b)^2 = a^2 \\pm 2ab + b^2 \\qquad (a+b)(a-b) = a^2 - b^2",
      },
      authoredExample: {
        prompt: "(a) Expand \\((3x - 2y)^2\\). (b) Evaluate \\(61^2 - 39^2\\) without a calculator. (c) Expand \\((x + 1)^3\\).",
        steps: [
          "(a) \\((3x)^2 - 2(3x)(2y) + (2y)^2 = 9x^2 - 12xy + 4y^2\\).",
          "(b) \\(61^2 - 39^2 = (61 - 39)(61 + 39) = 22 \\times 100 = 2200\\).",
          "(c) \\(x^3 + 3x^2 + 3x + 1\\).",
        ],
        answer: "(a) \\(9x^2 - 12xy + 4y^2\\); (b) 2200; (c) \\(x^3 + 3x^2 + 3x + 1\\)",
      },
      selfCheckExample: {
        prompt: "What is the value of \\(73^2 - 27^2\\)?",
        options: ["2116", "4600", "46", "6058", "100"],
        steps: [
          "Difference of two squares: \\((73 - 27)(73 + 27) = 46 \\times 100 = 4600\\).",
          "Option A computes \\((73 - 27)^2\\), squaring the difference instead of taking the difference of the squares; D adds the squares.",
          "C and E are the two brackets on their own, forgetting to multiply them.",
        ],
        answer: "(B) 4600",
      },
      practiceSet: [
        { prompt: "Expand \\((2a + 5)^2\\).", answer: "\\(4a^2 + 20a + 25\\)" },
        { prompt: "Expand \\((x - 4)(x + 4)\\).", answer: "\\(x^2 - 16\\)" },
        { prompt: "Evaluate \\(101^2\\) using \\((100 + 1)^2\\).", answer: "10201" },
        { prompt: "Simplify \\((a - b)^2 - (a + b)^2\\).", answer: "\\(-4ab\\)" },
      ],
      traps: [
        {
          title: "The square of a sum is not the sum of the squares",
          body: "\\((a + b)^2 = a^2 + 2ab + b^2\\), not \\(a^2 + b^2\\). Dropping the middle term \\(2ab\\) is the commonest expansion error, and IMAT offers the result as an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-factorising",
      name: "Factorising: common factors, grouping and trinomials",
      intuition:
        "Factorising writes an expression as a product, which is what lets you cancel fractions and read off the solutions of an equation. Work in a fixed order: common factor first, then a special product, then a trinomial, then grouping.",
      definition:
        "Work through these steps in order, and check by expanding back:\n" +
        "- Take out any **common factor**: \\(6x^3 - 24x = 6x(x^2 - 4)\\).\n" +
        "- Look for a **special product** (difference of squares, perfect square).\n" +
        "- **Trinomial** \\(x^2 + sx + p\\): find two numbers with sum \\(s\\) and product \\(p\\).\n" +
        "- **Trinomial** \\(ax^2 + bx + c\\): find two numbers with sum \\(b\\) and product \\(ac\\), split the middle term, and group.\n" +
        "- **Grouping** for four terms: \\(xy - 3x + 2y - 6 = x(y - 3) + 2(y - 3) = (x + 2)(y - 3)\\).\n" +
        "- A sum of two squares, \\(x^2 + k^2\\), does not factorise over the real numbers.",
      formula: {
        label: "Monic trinomial",
        latex: "x^2 + sx + p = (x + m)(x + n) \\quad\\text{where}\\quad m + n = s,\\; mn = p",
      },
      authoredExample: {
        prompt: "Factorise completely: (a) \\(6x^3 - 24x\\), (b) \\(x^2 - x - 12\\), (c) \\(2x^2 + 7x + 3\\).",
        steps: [
          "(a) Common factor \\(6x\\): \\(6x(x^2 - 4) = 6x(x - 2)(x + 2)\\).",
          "(b) Two numbers with sum \\(-1\\) and product \\(-12\\): \\(-4\\) and 3. So \\((x - 4)(x + 3)\\).",
          "(c) \\(ac = 6\\); two numbers with sum 7 and product 6: 6 and 1. \\(2x^2 + 6x + x + 3 = 2x(x + 3) + (x + 3) = (2x + 1)(x + 3)\\).",
        ],
        answer: "(a) \\(6x(x - 2)(x + 2)\\); (b) \\((x - 4)(x + 3)\\); (c) \\((2x + 1)(x + 3)\\)",
      },
      selfCheckExample: {
        prompt: "Which of the following is a factorisation of \\(2x^2 - 5x - 12\\)?",
        options: [
          "\\((2x + 3)(x - 4)\\)",
          "\\((2x - 3)(x + 4)\\)",
          "\\((2x - 4)(x + 3)\\)",
          "\\((2x + 4)(x - 3)\\)",
          "\\((x - 4)(2x - 3)\\)",
        ],
        steps: [
          "\\(ac = -24\\); two numbers with sum \\(-5\\) and product \\(-24\\): \\(-8\\) and 3.",
          "\\(2x^2 - 8x + 3x - 12 = 2x(x - 4) + 3(x - 4) = (2x + 3)(x - 4)\\).",
          "Expand each option to check: B gives \\(+5x\\), C gives \\(+2x\\), D gives \\(-2x\\), and E gives \\(+12\\) as the constant.",
        ],
        answer: "(A) \\((2x + 3)(x - 4)\\)",
      },
      practiceSet: [
        { prompt: "Factorise \\(x^2 + 2x - 15\\).", answer: "\\((x + 5)(x - 3)\\)" },
        { prompt: "Factorise \\(9a^2 - 16b^2\\).", answer: "\\((3a - 4b)(3a + 4b)\\)" },
        { prompt: "Factorise \\(5x^2 - 20x\\).", answer: "\\(5x(x - 4)\\)" },
        { prompt: "Factorise \\(y^2 - 10y + 25\\).", answer: "\\((y - 5)^2\\)" },
      ],
      traps: [
        {
          title: "A sum of two squares does not factorise",
          body: "\\(x^2 - 9 = (x - 3)(x + 3)\\), but \\(x^2 + 9\\) has no real factors: \\((x + 3)(x - 3)\\) expands to \\(x^2 - 9\\), and \\((x + 3)^2\\) has a middle term.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-algebraic-fractions",
      name: "Simplifying and combining algebraic fractions",
      intuition:
        "Algebraic fractions follow the rules of number fractions. You may cancel a factor that multiplies the whole top and the whole bottom, so factorise both first. To add or subtract, bring them to a common denominator, which is quickest when the denominators are already factorised.",
      definition:
        "- **Simplify**: factorise numerator and denominator, then cancel common **factors**.\n" +
        "- **Add or subtract**: use the lowest common denominator, built from the factorised denominators.\n" +
        "- **Divide**: multiply by the reciprocal.\n" +
        "- Any value that makes an original denominator zero stays **excluded**, even if its factor cancels.",
      formula: {
        label: "Adding fractions",
        latex: "\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}",
      },
      authoredExample: {
        prompt: "(a) Simplify \\(\\dfrac{x^2 - 9}{x^2 + x - 6}\\). (b) Write \\(\\dfrac{3}{x^2 - 4} - \\dfrac{1}{x - 2}\\) as a single fraction.",
        steps: [
          "(a) \\(\\dfrac{(x - 3)(x + 3)}{(x + 3)(x - 2)} = \\dfrac{x - 3}{x - 2}\\), for \\(x \\ne -3, 2\\).",
          "(b) \\(x^2 - 4 = (x - 2)(x + 2)\\) is the common denominator. Rewrite the second fraction as \\(\\dfrac{x + 2}{(x - 2)(x + 2)}\\).",
          "Subtract the numerators: \\(\\dfrac{3 - (x + 2)}{(x - 2)(x + 2)} = \\dfrac{1 - x}{(x - 2)(x + 2)}\\).",
        ],
        answer: "(a) \\(\\frac{x - 3}{x - 2}\\); (b) \\(\\frac{1 - x}{(x - 2)(x + 2)}\\)",
      },
      selfCheckExample: {
        prompt: "Which of the following is a simplification of \\(\\dfrac{x^2 - 4x}{x^2 - 16}\\), for \\(x \\ne \\pm 4\\)?",
        options: [
          "\\(\\frac{x}{x - 4}\\)",
          "\\(\\frac{x}{4}\\)",
          "\\(\\frac{x - 4}{x + 4}\\)",
          "\\(\\frac{x}{x + 4}\\)",
          "\\(\\frac{1}{x + 4}\\)",
        ],
        steps: [
          "Numerator: \\(x(x - 4)\\). Denominator: \\((x - 4)(x + 4)\\).",
          "Cancel the factor \\(x - 4\\): \\(\\dfrac{x}{x + 4}\\).",
          "Option B cancels the \\(x^2\\) terms, which are terms, not factors; A cancels the wrong bracket; E cancels the \\(x\\) as well.",
        ],
        answer: "(D) \\(\\frac{x}{x + 4}\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\dfrac{2x + 6}{x^2 - 9}\\).", answer: "\\(\\frac{2}{x - 3}\\)" },
        { prompt: "Write \\(\\frac{1}{x} + \\frac{1}{x + 1}\\) as a single fraction.", answer: "\\(\\frac{2x + 1}{x(x + 1)}\\)" },
        { prompt: "Simplify \\(\\dfrac{x^2 - 1}{x + 1}\\).", answer: "\\(x - 1\\), for \\(x \\ne -1\\)" },
      ],
      traps: [
        {
          title: "Cancel factors, never terms",
          body: "\\(\\frac{x + 5}{x + 7}\\) is not \\(\\frac{5}{7}\\): the \\(x\\) is a term added on, not a factor of the whole top and bottom. Factorise first, then cancel only whole brackets that multiply everything.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-factor-theorem",
      name: "Polynomial division and the factor theorem",
      intuition:
        "Dividing polynomials works like long division of numbers: dividend = divisor × quotient + remainder. When the divisor is \\(x - a\\), putting \\(x = a\\) kills the first part and leaves the remainder. So if \\(p(a) = 0\\), then \\(x - a\\) divides exactly: it is a factor.",
      definition:
        "- **Division** (in outline): \\(p(x) = d(x)\\,q(x) + r(x)\\), where the remainder has a lower degree than the divisor.\n" +
        "- **Remainder theorem**: the remainder when \\(p(x)\\) is divided by \\(x - a\\) is \\(p(a)\\).\n" +
        "- **Factor theorem**: \\(x - a\\) is a factor of \\(p(x)\\) exactly when \\(p(a) = 0\\).\n" +
        "- For a polynomial with integer coefficients and leading coefficient 1, any integer root divides the constant term. Try those first.\n" +
        "- For the factor \\(x + 3\\), test \\(x = -3\\).",
      formula: {
        label: "Remainder theorem",
        latex: "p(x) = (x - a)\\,q(x) + p(a)",
        symbols: [
          { symbol: "\\(q(x)\\)", meaning: "the quotient, one degree lower than \\(p(x)\\)" },
          { symbol: "\\(p(a)\\)", meaning: "the remainder, a number" },
        ],
      },
      authoredExample: {
        prompt: "Factorise \\(p(x) = x^3 - 2x^2 - 5x + 6\\) completely and find its roots.",
        steps: [
          "Integer roots must divide 6: try \\(\\pm 1, \\pm 2, \\pm 3, \\pm 6\\). \\(p(1) = 1 - 2 - 5 + 6 = 0\\), so \\(x - 1\\) is a factor.",
          "Divide: \\(x^3 - 2x^2 - 5x + 6 = (x - 1)(x^2 - x - 6)\\). (Expand to check.)",
          "\\(x^2 - x - 6 = (x - 3)(x + 2)\\), so \\(p(x) = (x - 1)(x - 3)(x + 2)\\).",
        ],
        answer: "\\((x - 1)(x - 3)(x + 2)\\); roots 1, 3 and \\(-2\\)",
      },
      selfCheckExample: {
        prompt: "For which value of \\(k\\) is \\(x - 2\\) a factor of \\(x^3 + kx^2 - 5x + 6\\)?",
        options: ["\\(-2\\)", "1", "\\(-1\\)", "2", "\\(-4\\)"],
        steps: [
          "By the factor theorem, \\(p(2) = 0\\): \\(8 + 4k - 10 + 6 = 0\\).",
          "\\(4k + 4 = 0\\), so \\(k = -1\\).",
          "Option A comes from substituting \\(x = -2\\), the sign slip for the factor \\(x - 2\\).",
        ],
        answer: "(C) \\(-1\\)",
      },
      practiceSet: [
        { prompt: "Find the remainder when \\(x^3 + 2x - 1\\) is divided by \\(x - 1\\).", answer: "2", method: "\\(p(1)\\)" },
        { prompt: "Is \\(x + 1\\) a factor of \\(x^3 + 1\\)?", answer: "Yes", method: "\\(p(-1) = 0\\)" },
        { prompt: "Find the remainder when \\(2x^2 - 3x + 5\\) is divided by \\(x + 2\\).", answer: "19", method: "\\(p(-2) = 8 + 6 + 5\\)" },
        { prompt: "Divide \\(x^2 + 5x + 6\\) by \\(x + 2\\).", answer: "\\(x + 3\\), remainder 0" },
      ],
      traps: [
        {
          title: "For the factor x + a, test x = minus a",
          body: "\\(x + a\\) is zero when \\(x = -a\\), so that is the value to substitute. Substituting \\(x = a\\) answers a different question, and its result is always among the options.",
        },
      ],
    },
  ],
};
