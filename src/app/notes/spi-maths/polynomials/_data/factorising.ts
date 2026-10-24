import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PO_FACTORISING_NOTE: SubtopicNote = {
  subtopicName: "Factorising Polynomials",
  title: "Factorising Polynomials",
  oneLineDefinition:
    "Factorising writes a polynomial as a product of simpler ones: by splitting the middle term, by grouping, or by treating a repeated bracket as one letter.",
  whyItMatters:
    "Five questions in the bank, three EASY and two MODERATE. The options are four sets of brackets that differ only in signs, so the skill is to check both the product and the sum before choosing.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spipofa-split",
      name: "Factorising a quadratic polynomial by splitting the middle term",
      intuition:
        "Multiply out \\((x + p)(x + q)\\) and you get \\(x^2 + (p + q)x + pq\\). So to factorise, you look for two numbers that multiply to the constant and add to the middle coefficient. When the \\(x^2\\) coefficient is not 1, the same idea works with the product ac.",
      definition:
        "- For \\(x^2 + bx + c\\): find p and q with \\(pq = c\\) and \\(p + q = b\\). Then \\(x^2 + bx + c = (x + p)(x + q)\\).\n" +
        "- For \\(ax^2 + bx + c\\): find two numbers with **product ac** and **sum b**, split bx into them, and group.\n" +
        "- The zeroes come from setting each bracket to 0: \\((x + 4)\\) gives the zero \\(-4\\).",
      formula: {
        label: "Product of two brackets",
        latex: "(x + p)(x + q) = x^2 + (p + q)x + pq",
      },
      authoredExample: {
        prompt: "Factorise \\(6x^2 + 7x - 3\\).",
        steps: [
          "\\(ac = 6 \\times (-3) = -18\\). Two numbers with product \\(-18\\) and sum 7: 9 and \\(-2\\).",
          "\\(6x^2 + 9x - 2x - 3 = 3x(2x + 3) - 1(2x + 3)\\).",
          "\\(= (3x - 1)(2x + 3)\\).",
        ],
        answer: "\\((3x - 1)(2x + 3)\\)",
      },
      selfCheckExample: {
        prompt: "Factorise \\(x^2 - 2x - 24\\).",
        steps: ["Product \\(-24\\), sum \\(-2\\): \\(-6\\) and 4.", "\\(x^2 - 2x - 24 = (x - 6)(x + 4)\\)."],
        answer: "\\((x - 6)(x + 4)\\)",
      },
      practiceSet: [
        { prompt: "Factorise \\(x^2 + 11x + 30\\).", answer: "\\((x + 5)(x + 6)\\)" },
        { prompt: "Factorise \\(x^2 - 3x - 28\\).", answer: "\\((x - 7)(x + 4)\\)" },
        { prompt: "Factorise \\(2x^2 - 7x + 3\\).", answer: "\\((2x - 1)(x - 3)\\)" },
        { prompt: "Find the zeroes of \\(x^2 + x - 12\\).", answer: "\\((x + 4)(x - 3)\\), so \\(-4\\) and 3" },
      ],
      pyqExampleId: "a4e032ba-2f9f-4ffb-9fd3-42c3e8794810",
      traps: [
        {
          title: "Checking only the product",
          body: "\\((x + 6)(x - 4)\\) and \\((x - 6)(x + 4)\\) both give the constant \\(-24\\). The middle term decides: the first gives \\(+2x\\), the second \\(-2x\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spipofa-compare",
      name: "Finding a coefficient by expanding and comparing",
      intuition:
        "If two polynomials are equal for every x, their matching coefficients are equal. So expand the side with brackets and set the coefficient of x equal to the coefficient of x, and the constant equal to the constant.",
      definition:
        "- Expand fully, then line up the terms by power of x.\n" +
        "- Equal polynomials have equal coefficients for every power of x.\n" +
        "- Use the term that contains the unknown, and check with another term.",
      authoredExample: {
        prompt: "If \\(x^2 + px + 10 = (x + 2)(x + 5)\\), find p.",
        steps: ["\\((x + 2)(x + 5) = x^2 + 7x + 10\\).", "Comparing the coefficients of x: \\(p = 7\\)."],
        answer: "\\(p = 7\\)",
      },
      selfCheckExample: {
        prompt: "If \\((x + a)(x - 4) = x^2 - x - 12\\), find a.",
        steps: [
          "\\((x + a)(x - 4) = x^2 + (a - 4)x - 4a\\).",
          "Constants: \\(-4a = -12\\), so \\(a = 3\\). Check the x term: \\(a - 4 = -1\\).",
        ],
        answer: "\\(a = 3\\)",
      },
      practiceSet: [
        { prompt: "If \\((x - 2)(x + 6) = x^2 + bx - 12\\), find b.", answer: "\\(b = 4\\)" },
        { prompt: "If \\(2x^2 + mx - 5 = (2x - 1)(x + 5)\\), find m.", answer: "\\((2x - 1)(x + 5) = 2x^2 + 9x - 5\\), so \\(m = 9\\)" },
        { prompt: "If \\((x + 3)(x + 3) = x^2 + kx + 9\\), find k.", answer: "\\(k = 6\\)" },
      ],
      pyqExampleId: "ed63dd12-7fa4-4138-8571-9b750b81126c",
      traps: [
        {
          title: "Comparing terms of different powers",
          body: "Match the coefficient of x with the coefficient of x, and the constant with the constant. In \\(x^2 + kx + 8 = (x + 2)(x + 4)\\), k is 6, the x coefficient, not 8.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spipofa-grouping",
      name: "Factorising by grouping and by substitution",
      intuition:
        "A four-term polynomial often splits into two pairs that share the same bracket. And an expression built from a repeated bracket, such as \\((a + b)\\), is just a quadratic in disguise: call the bracket t and factorise as usual.",
      definition:
        "- **Grouping:** pair the terms, take a common factor out of each pair, and the same bracket appears twice: \\(x^2(x - 2) + 5(x - 2) = (x - 2)(x^2 + 5)\\).\n" +
        "- If the second pair starts with a minus, take out a negative factor so the brackets match.\n" +
        "- **Substitution:** let t stand for the repeated bracket, factorise the quadratic in t, then put the bracket back in place of t.",
      formula: {
        label: "Grouping pattern",
        latex: "ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)",
      },
      authoredExample: {
        prompt: "Factorise \\(3(x - 1)^2 - 5(x - 1) - 2\\).",
        steps: [
          "Let \\(t = x - 1\\): \\(3t^2 - 5t - 2\\).",
          "Product \\(-6\\), sum \\(-5\\): \\(-6\\) and 1. \\(3t^2 - 6t + t - 2 = 3t(t - 2) + 1(t - 2) = (3t + 1)(t - 2)\\).",
          "Put \\(t = x - 1\\) back: \\((3x - 3 + 1)(x - 1 - 2) = (3x - 2)(x - 3)\\).",
        ],
        answer: "\\((3x - 2)(x - 3)\\)",
      },
      selfCheckExample: {
        prompt: "Factorise \\(x^2 + xy + 4x + 4y\\).",
        steps: ["Group: \\(x(x + y) + 4(x + y)\\).", "\\(= (x + y)(x + 4)\\)."],
        answer: "\\((x + y)(x + 4)\\)",
      },
      practiceSet: [
        { prompt: "Factorise \\(x^3 + x^2 + 7x + 7\\).", answer: "\\(x^2(x + 1) + 7(x + 1) = (x + 1)(x^2 + 7)\\)" },
        { prompt: "Factorise \\((a + b)^2 - 7(a + b) + 12\\).", answer: "\\((a + b - 3)(a + b - 4)\\)" },
        { prompt: "Factorise \\(pq + 3p + 2q + 6\\).", answer: "\\(p(q + 3) + 2(q + 3) = (q + 3)(p + 2)\\)" },
      ],
      pyqExampleId: "432a4970-af4d-4131-ae5a-925409c24178",
      traps: [
        {
          title: "Taking out a positive factor from a negative pair",
          body: "In \\(x^3 - 2x^2 - 5x + 10\\), take \\(-5\\) out of the second pair: \\(x^2(x - 2) - 5(x - 2) = (x - 2)(x^2 - 5)\\). Taking out \\(+5\\) leaves \\((-x + 2)\\), which does not match.",
        },
        {
          title: "Leaving the answer in t",
          body: "After factorising in t, replace t by the bracket it stood for. \\((t - 3)(3t + 2)\\) with \\(t = a + b\\) becomes \\((a + b - 3)(3a + 3b + 2)\\).",
        },
      ],
    },
  ],
};
