import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_AI_FACTORISING_NOTE: SubtopicNote = {
  subtopicName: "Factorising with Common Factors and Identities",
  title: "Factorising with Common Factors and Identities",
  oneLineDefinition:
    "An expression is factorised by taking out what its terms share, by grouping, or by matching it to an identity such as (a + b)², (a − b)² or a² − b².",
  whyItMatters:
    "Eleven questions in the bank, eight EASY and three MODERATE. Each gives an expression and four candidate factorisations, so the quickest check is to multiply an option back out. The marks go on a dropped common factor and on a sum of squares treated as if it factorised.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiaifa-common",
      name: "Taking out a common factor and factorising by grouping",
      intuition:
        "If every term carries the same factor, take it out once and write what is left in a bracket. With four terms that share nothing overall, pair them so that each pair shares a factor; the same bracket then appears in both pairs and comes out as well.",
      definition:
        "- **Common factor:** \\(ab + ac = a(b + c)\\). Take out the largest number and the highest power of each letter that every term has.\n" +
        "- A whole bracket can be the common factor: \\(x(p + q) + y(p + q) = (x + y)(p + q)\\).\n" +
        "- **Grouping:** reorder the four terms so that each pair shares a factor, factorise each pair, then take out the common bracket.\n" +
        "- If a pair starts with a minus, take the minus out with its factor so the brackets match.",
      formula: {
        label: "Common factor",
        latex: "ab + ac = a(b + c)",
      },
      authoredExample: {
        prompt: "Factorise \\(2ax - 3by - 3bx + 2ay\\).",
        steps: [
          "Reorder so each pair shares a factor: \\((2ax + 2ay) - (3bx + 3by)\\).",
          "\\(= 2a(x + y) - 3b(x + y)\\).",
          "\\(= (x + y)(2a - 3b)\\).",
        ],
        answer: "\\((x + y)(2a - 3b)\\)",
      },
      selfCheckExample: {
        prompt: "Factorise \\(6x^2y - 9xy^2\\).",
        steps: ["Both terms carry 3, x and y.", "\\(6x^2y - 9xy^2 = 3xy(2x - 3y)\\)."],
        answer: "\\(3xy(2x - 3y)\\)",
      },
      practiceSet: [
        { prompt: "Factorise \\(5m(n + 4) - 2(n + 4)\\).", answer: "\\((n + 4)(5m - 2)\\)" },
        { prompt: "Factorise \\(ax + bx + ay + by\\).", answer: "\\(x(a + b) + y(a + b) = (a + b)(x + y)\\)" },
        { prompt: "Factorise \\(12p^2 - 8p\\).", answer: "\\(4p(3p - 2)\\)" },
        { prompt: "Factorise \\(mn - 3m + 2n - 6\\).", answer: "\\(m(n - 3) + 2(n - 3) = (n - 3)(m + 2)\\)" },
      ],
      pyqExampleId: "2a372fbe-616b-4ab7-afeb-bb957763b148",
      traps: [
        {
          title: "Giving the common bracket alone",
          body: "\\(x(p + q) + y(p + q)\\) is \\((x + y)(p + q)\\). The shared bracket is one factor and what is left is the other; neither one alone is the factorisation.",
        },
        {
          title: "Pairing terms that share nothing",
          body: "In \\(ab + cd + ad + bc\\), pair ab with ad and cd with bc: \\(a(b + d) + c(d + b) = (a + c)(b + d)\\). Taking the terms in the printed order gives pairs with no common factor.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiaifa-product",
      name: "The identity for (x + a)(x + b)",
      intuition:
        "Multiplying \\((x + a)(x + b)\\) always gives the same pattern: \\(x^2\\), then the sum of a and b times x, then their product. Read the pattern forwards to expand and backwards to factorise.",
      definition:
        "- \\((x + a)(x + b) = x^2 + (a + b)x + ab\\).\n" +
        "- To factorise \\(x^2 + px + q\\), find a and b with \\(a + b = p\\) and \\(ab = q\\).\n" +
        "- It works with a second letter too: \\(x^2 + 8xy + 15y^2 = (x + 3y)(x + 5y)\\).\n" +
        "- Two expressions equal for every x have equal coefficients, so you can find an unknown coefficient by expanding the other side.",
      formula: {
        label: "Product of two binomials",
        latex: "(x + a)(x + b) = x^2 + (a + b)x + ab",
      },
      authoredExample: {
        prompt: "Factorise \\(p^2 + 10pq + 21q^2\\).",
        steps: [
          "Look for two terms in q with sum \\(10q\\) and product \\(21q^2\\): \\(3q\\) and \\(7q\\).",
          "\\(p^2 + 10pq + 21q^2 = (p + 3q)(p + 7q)\\).",
        ],
        answer: "\\((p + 3q)(p + 7q)\\)",
      },
      selfCheckExample: {
        prompt: "Expand \\((y - 5)(y - 2)\\).",
        steps: ["Sum \\(= -7\\), product \\(= 10\\).", "\\(y^2 - 7y + 10\\)."],
        answer: "\\(y^2 - 7y + 10\\)",
      },
      practiceSet: [
        { prompt: "Expand \\((x + 6)(x - 2)\\).", answer: "\\(x^2 + 4x - 12\\)" },
        { prompt: "Find m if \\(x^2 + mx - 8 = (x - 2)(x + 4)\\).", answer: "\\((x - 2)(x + 4) = x^2 + 2x - 8\\), so \\(m = 2\\)" },
        { prompt: "The area of a rectangle is \\(x^2 + 9x + 20\\) and its length is \\(x + 5\\). Find its breadth.", answer: "\\(x + 4\\)" },
        { prompt: "Factorise \\(a^2 - 8ab + 15b^2\\).", answer: "\\((a - 3b)(a - 5b)\\)" },
      ],
      pyqExampleId: "9b7f77a1-6ad1-44a8-833c-7ab99be9ae52",
      traps: [
        {
          title: "Getting the middle sign wrong",
          body: "\\((x + 4)(x - 7)\\) has middle term \\((4 - 7)x = -3x\\) and constant \\(-28\\). Add a and b with their signs, then multiply them with their signs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiaifa-square",
      name: "Perfect square identities",
      intuition:
        "A square of a two-term bracket has three terms: the two squares and twice their product in the middle. When an expression shows two perfect squares and a middle term equal to twice the product of their roots, it is a perfect square.",
      definition:
        "- \\((a + b)^2 = a^2 + 2ab + b^2\\) and \\((a - b)^2 = a^2 - 2ab + b^2\\).\n" +
        "- To spot one: are the first and last terms squares, and is the middle term twice the product of their roots?\n" +
        "- Take out any common number first: \\(2x^2 + 4x + 2 = 2(x + 1)^2\\).\n" +
        "- Dividing a perfect square by its root bracket leaves the bracket: \\((x + 3)^2 \\div (x + 3) = x + 3\\).",
      formula: {
        label: "Perfect squares",
        latex: "(a + b)^2 = a^2 + 2ab + b^2 \\qquad (a - b)^2 = a^2 - 2ab + b^2",
      },
      authoredExample: {
        prompt: "Factorise \\(25x^2 + 30x + 9\\).",
        steps: [
          "\\(25x^2 = (5x)^2\\) and \\(9 = 3^2\\).",
          "Twice their product: \\(2 \\times 5x \\times 3 = 30x\\), the middle term.",
          "So \\(25x^2 + 30x + 9 = (5x + 3)^2\\).",
        ],
        answer: "\\((5x + 3)^2\\)",
      },
      selfCheckExample: {
        prompt: "Factorise \\(49p^2 - 28p + 4\\).",
        steps: ["\\((7p)^2\\) and \\(2^2\\), with \\(2 \\times 7p \\times 2 = 28p\\).", "The middle term is negative, so it is \\((7p - 2)^2\\)."],
        answer: "\\((7p - 2)^2\\)",
      },
      practiceSet: [
        { prompt: "Expand \\((3m - 2n)^2\\).", answer: "\\(9m^2 - 12mn + 4n^2\\)" },
        { prompt: "Factorise \\(x^2 + 14x + 49\\).", answer: "\\((x + 7)^2\\)" },
        { prompt: "Factorise \\(3x^2 + 12x + 12\\).", answer: "\\(3(x + 2)^2\\)" },
        { prompt: "Simplify \\((9x^2 + 6x + 1) \\div (3x + 1)\\).", answer: "\\((3x + 1)^2 \\div (3x + 1) = 3x + 1\\)" },
      ],
      pyqExampleId: "18a95d41-8019-46fc-aa80-00c5cecdb53e",
      traps: [
        {
          title: "Dropping the common factor",
          body: "\\(50x^2 - 20x + 2 = 2(5x - 1)^2\\). Leaving out the 2 gives \\((5x - 1)^2\\), which is only \\(25x^2 - 10x + 1\\).",
        },
        {
          title: "Forgetting the middle term",
          body: "\\((a + b)^2\\) is not \\(a^2 + b^2\\). \\((x + 5)^2 = x^2 + 10x + 25\\): the \\(10x\\) is twice the product.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiaifa-difference",
      name: "Difference of two squares",
      intuition:
        "One square minus another always splits into a sum times a difference. Many expressions hide a difference of squares: take out a common number first, or add and subtract a term to make a perfect square appear.",
      definition:
        "- \\(a^2 - b^2 = (a + b)(a - b)\\). Only a **difference** factorises this way; \\(a^2 + b^2\\) does not.\n" +
        "- Take out a common number first: \\(2x^2 - 18 = 2(x + 3)(x - 3)\\).\n" +
        "- **Completing the square:** for an expression like \\(x^4 + kx^2 + c\\), add and subtract a term to build a perfect square, then use the difference of squares.\n" +
        "- \\(x^2 + \\frac{1}{x^2} = \\left(x - \\frac{1}{x}\\right)^2 + 2\\), so \\(x^2 + \\frac{1}{x^2}\\) minus a number can become a difference of squares.",
      formula: {
        label: "Difference of squares",
        latex: "a^2 - b^2 = (a + b)(a - b) \\qquad x^2 + \\frac{1}{x^2} = \\left(x - \\frac{1}{x}\\right)^2 + 2",
      },
      authoredExample: {
        prompt: "Factorise \\(x^4 + x^2 + 1\\).",
        steps: [
          "A perfect square needs \\(2x^2\\) in the middle: \\(x^4 + x^2 + 1 = (x^4 + 2x^2 + 1) - x^2\\).",
          "\\(= (x^2 + 1)^2 - x^2\\), a difference of squares.",
          "\\(= (x^2 + 1 + x)(x^2 + 1 - x) = (x^2 + x + 1)(x^2 - x + 1)\\).",
        ],
        answer: "\\((x^2 + x + 1)(x^2 - x + 1)\\)",
      },
      selfCheckExample: {
        prompt: "Factorise \\(75p^2 - 12q^2\\).",
        steps: ["Take out 3: \\(3(25p^2 - 4q^2)\\).", "\\(= 3\\left[(5p)^2 - (2q)^2\\right] = 3(5p + 2q)(5p - 2q)\\)."],
        answer: "\\(3(5p + 2q)(5p - 2q)\\)",
      },
      practiceSet: [
        { prompt: "Factorise \\(x^2 - 49\\).", answer: "\\((x + 7)(x - 7)\\)" },
        { prompt: "Evaluate \\(53^2 - 47^2\\) using an identity.", answer: "\\((53 + 47)(53 - 47) = 100 \\times 6 = 600\\)" },
        { prompt: "Factorise \\((a + b)^2 - c^2\\).", answer: "\\((a + b + c)(a + b - c)\\)" },
        { prompt: "Factorise \\(x^2 + \\frac{1}{x^2} - 6\\).", answer: "\\(\\left(x - \\frac{1}{x}\\right)^2 - 4 = \\left(x - \\frac{1}{x} + 2\\right)\\left(x - \\frac{1}{x} - 2\\right)\\)" },
      ],
      pyqExampleId: "829712e4-95f1-4418-b4a2-956185ff3846",
      traps: [
        {
          title: "Factorising a sum of squares",
          body: "\\(a^2 - b^2 = (a + b)(a - b)\\), but \\(a^2 + b^2\\) has no such factors. \\(x^2 + 9\\) cannot be written as \\((x + 3)(x - 3)\\), which is \\(x^2 - 9\\).",
        },
        {
          title: "Calling a hidden difference 'not possible'",
          body: "\\(x^4 + 4\\) looks like a sum, but \\(x^4 + 4 = (x^2 + 2)^2 - 4x^2 = (x^2 + 2x + 2)(x^2 - 2x + 2)\\). Try completing the square before ruling out factors.",
        },
      ],
    },
  ],
};
