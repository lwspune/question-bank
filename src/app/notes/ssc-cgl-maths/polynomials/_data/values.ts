import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PO_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Values, Remainders and Roots",
  title: "Values, Remainders and Roots",
  oneLineDefinition:
    "The value of a polynomial at a number answers most questions: the remainder on division by x − a is the value at a, the sum of the roots can be read from two coefficients, and a long product of brackets can collapse to two terms.",
  whyItMatters:
    "Six questions in the bank, four EASY and two MODERATE: three from the 2023 shifts, two from 2024 and one from 2025. Three of the six are the remainder theorem, which turns a long division into one substitution. The others are a careful substitution with negative numbers, a sum of roots read off the coefficients, and a product that folds up by the difference of squares.",
  related: [
    { label: "Algebraic Identities: squares of a binomial", href: "/notes/ssc-cgl-maths/algebraic-identities/ssc-ai-squares" },
  ],
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscpova-evaluate",
      name: "Value of a polynomial at given numbers",
      intuition:
        "To find the value, put the numbers in, one term at a time. The only danger is the signs: a negative number to an odd power stays negative, to an even power it turns positive. When every term has the same degree, there is a shortcut that turns a sign question into no work at all.",
      definition:
        "- The **degree of a term** is the sum of its powers: \\(x^2y^3\\) has degree 5. The **degree of a polynomial** is the highest degree among its terms.\n" +
        "- Put the values in term by term and write each term's sign before adding: \\((-a)^{\\text{odd}} = -a^{\\text{odd}}\\), \\((-a)^{\\text{even}} = a^{\\text{even}}\\).\n" +
        "- **Same-degree shortcut:** if every term has degree d, then changing the sign of every variable multiplies the value by \\((-1)^d\\). So the value at \\((-x, -y)\\) is minus the value at \\((x, y)\\) when d is odd, and the same when d is even.\n" +
        "- The shortcut is safe only when every term has the same degree. One constant term, or one term of a different degree, breaks it.",
      formula: {
        label: "Same-degree sign rule",
        latex: "P(-x, -y) = (-1)^d \\, P(x, y)",
        symbols: [{ symbol: "d", meaning: "the degree shared by every term of P" }],
      },
      authoredExample: {
        prompt: "Find the value of \\(2x^3 - 3x^2y + 4y^3\\) when \\(x = 2\\) and \\(y = -1\\).",
        steps: [
          "\\(2x^3 = 2 \\times 8 = 16\\).",
          "\\(-3x^2y = -3 \\times 4 \\times (-1) = 12\\).",
          "\\(4y^3 = 4 \\times (-1)^3 = -4\\).",
          "Value \\(= 16 + 12 - 4 = 24\\).",
        ],
        answer: "24",
      },
      selfCheckExample: {
        prompt:
          "The polynomial \\(x^3 + 2x^2y - xy^2 + 4y^3\\) equals 18 when \\(x = 2\\) and \\(y = 1\\). What is its value when \\(x = -2\\) and \\(y = -1\\)?",
        steps: [
          "Every term has degree 3: \\(x^3\\), \\(x^2y\\), \\(xy^2\\) and \\(y^3\\).",
          "Changing both signs multiplies the value by \\((-1)^3 = -1\\).",
          "The value is \\(-18\\). (Direct check: \\(-8 - 8 + 2 - 4 = -18\\).)",
        ],
        answer: "\\(-18\\)",
      },
      practiceSet: [
        { prompt: "What is the degree of the polynomial \\(4x^5 - 3x^2y^4 + 7\\)?", answer: "6", method: "The term \\(x^2y^4\\) has degree \\(2 + 4 = 6\\)." },
        { prompt: "Find the value of \\(x^2 - 5x + 6\\) at \\(x = -2\\).", answer: "20" },
        { prompt: "Find the value of \\(x^2 + 3xy - 2y^2\\) at \\(x = 1\\) and \\(y = -2\\).", answer: "\\(-13\\)" },
        {
          prompt: "Every term of a polynomial in x and y has degree 4, and its value at \\(x = 2\\), \\(y = 3\\) is 10. What is its value at \\(x = -2\\), \\(y = -3\\)?",
          answer: "10",
        },
      ],
      pyqExampleId: "ab383916-f0cc-4ba0-b28c-4b60a36e9fba",
      traps: [
        {
          title: "Losing the sign of an odd power",
          body:
            "\\((-7)^3 = -343\\) and \\((-5)^3 = -125\\), but \\((-7)^2 = 49\\). Write each term's sign before you add; the wrong options are usually the right number with the wrong sign.",
        },
        {
          title: "Using the sign rule when the degrees differ",
          body:
            "\\(P(-x, -y) = -P(x, y)\\) needs every term to have the same odd degree. For \\(x^3 + 1\\) the value at \\(x = 2\\) is 9, but at \\(x = -2\\) it is \\(-7\\), not \\(-9\\): the constant term does not change sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscpova-remainder",
      name: "Remainder theorem and factor theorem",
      intuition:
        "Dividing p(x) by x − a leaves a quotient and a number left over: p(x) = (x − a) × q(x) + r. Put x = a and the first part becomes zero, so what is left is r. The remainder is simply the value of the polynomial at a.",
      definition:
        "- **Remainder theorem:** the remainder when p(x) is divided by \\(x - a\\) is \\(p(a)\\). For \\(x + a\\) use \\(p(-a)\\); for \\(ax - b\\) use \\(p\\left(\\frac{b}{a}\\right)\\).\n" +
        "- **Factor theorem:** \\(x - a\\) is a factor of p(x) exactly when \\(p(a) = 0\\).\n" +
        "- To make p(x) divisible by \\(x - a\\), **subtract** the remainder \\(p(a)\\) (or add \\(-p(a)\\)).\n" +
        "- Powers of x: \\(x^n - 1\\) always has the factor \\(x - 1\\). \\(x^n + 1\\) has the factor \\(x + 1\\) when n is odd, and \\(x^n - 1\\) has it when n is even.\n" +
        "- Fast route: put the root of the divisor into p(x). No long division is ever needed for the remainder alone.",
      formula: {
        label: "Remainder and factor theorems",
        latex: "p(x) \\div (x - a) \\Rightarrow \\text{remainder} = p(a) \\qquad (x - a) \\text{ is a factor} \\Leftrightarrow p(a) = 0",
      },
      authoredExample: {
        prompt: "Find the remainder when \\(x^3 + 2x^2 - 5x + 1\\) is divided by \\(x - 3\\).",
        steps: [
          "The divisor \\(x - 3\\) is zero at \\(x = 3\\), so the remainder is \\(p(3)\\).",
          "\\(p(3) = 27 + 18 - 15 + 1 = 31\\).",
        ],
        answer: "31",
      },
      selfCheckExample: {
        prompt: "What number must be added to \\(x^3 - 7x^2 + 10x - 13\\) so that it is divisible by \\(x - 3\\)?",
        steps: [
          "Remainder \\(= p(3) = 27 - 63 + 30 - 13 = -19\\).",
          "To clear a remainder of \\(-19\\), add 19.",
          "Check: \\(x^3 - 7x^2 + 10x + 6\\) at \\(x = 3\\) is \\(27 - 63 + 30 + 6 = 0\\).",
        ],
        answer: "19",
      },
      practiceSet: [
        { prompt: "What is the remainder when \\(x^4 - 3x + 2\\) is divided by \\(x + 1\\)?", answer: "6", method: "\\(p(-1) = 1 + 3 + 2\\)." },
        { prompt: "Is \\(x - 1\\) a factor of \\(x^3 - 6x^2 + 11x - 6\\)?", answer: "Yes", method: "\\(p(1) = 1 - 6 + 11 - 6 = 0\\)." },
        { prompt: "For what value of k is \\(x - 2\\) a factor of \\(x^2 + kx - 6\\)?", answer: "\\(k = 1\\)", method: "\\(4 + 2k - 6 = 0\\)." },
        {
          prompt: "What is the remainder when \\(2x^2 + 3x - 1\\) is divided by \\(2x - 1\\)?",
          answer: "1",
          method: "\\(p\\left(\\frac{1}{2}\\right) = \\frac{1}{2} + \\frac{3}{2} - 1\\).",
        },
        { prompt: "What is the remainder when \\(x^{20} - 1\\) is divided by \\(x + 1\\)?", answer: "0", method: "\\((-1)^{20} - 1 = 0\\)." },
      ],
      pyqExampleId: "e419341d-c0d7-48e3-b62d-6d115256567e",
      traps: [
        {
          title: "Putting x = a for the divisor x + a",
          body:
            "The remainder on division by \\(x + a\\) is \\(p(-a)\\), the value where the divisor is zero. For \\(x + 2\\), put \\(x = -2\\), not 2.",
        },
        {
          title: "Subtracting the wrong number to make a polynomial divisible",
          body:
            "Subtract the remainder, \\(p(a)\\), not the number in the divisor. If dividing by \\(x + 4\\) leaves remainder 5, subtracting 5 makes it divisible; subtracting 4 does not.",
        },
        {
          title: "Assuming x + 1 divides every xⁿ + 1",
          body:
            "At \\(x = -1\\), \\(x^n + 1\\) is \\(0\\) only when n is odd. For even n it is 2, so \\(x^{10} + 1\\) leaves remainder 2 on division by \\(x + 1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscpova-roots",
      name: "Sum and product of the roots from the coefficients",
      intuition:
        "If a polynomial has roots r and s, it is a multiple of (x − r)(x − s). Multiply that out and the roots appear in the coefficients: their sum sits in the x term and their product in the constant. So you can read the sum and product without solving.",
      definition:
        "- **Quadratic** \\(ax^2 + bx + c = 0\\): sum of roots \\(= -\\frac{b}{a}\\), product \\(= \\frac{c}{a}\\).\n" +
        "- **Cubic** \\(ax^3 + bx^2 + cx + d = 0\\) with roots \\(p, q, r\\): \\(p + q + r = -\\frac{b}{a}\\), \\(pq + qr + rp = \\frac{c}{a}\\), \\(pqr = -\\frac{d}{a}\\).\n" +
        "- The signs alternate: minus, plus, minus. Always divide by the leading coefficient a.\n" +
        "- A repeated root is counted each time it repeats.",
      formula: {
        label: "Roots and coefficients",
        latex:
          "ax^2 + bx + c: \\ \\alpha + \\beta = -\\frac{b}{a},\\ \\alpha\\beta = \\frac{c}{a} \\qquad ax^3 + bx^2 + cx + d: \\ p + q + r = -\\frac{b}{a},\\ pq + qr + rp = \\frac{c}{a},\\ pqr = -\\frac{d}{a}",
      },
      authoredExample: {
        prompt: "The roots of \\(2x^3 - 6x^2 + 4x - 18 = 0\\) are p, q and r. Find \\(p + q + r\\) and \\(pqr\\).",
        steps: [
          "Here \\(a = 2\\), \\(b = -6\\), \\(c = 4\\), \\(d = -18\\).",
          "\\(p + q + r = -\\frac{-6}{2} = 3\\).",
          "\\(pqr = -\\frac{-18}{2} = 9\\).",
        ],
        answer: "Sum 3, product 9",
      },
      selfCheckExample: {
        prompt: "If \\(\\alpha\\) and \\(\\beta\\) are the roots of \\(2x^2 - 18x + 11 = 0\\), find \\(\\alpha + \\beta\\) and \\(\\alpha\\beta\\).",
        steps: ["\\(\\alpha + \\beta = -\\frac{-18}{2} = 9\\).", "\\(\\alpha\\beta = \\frac{11}{2}\\)."],
        answer: "\\(9\\) and \\(\\frac{11}{2}\\)",
      },
      practiceSet: [
        { prompt: "What is the sum of the roots of \\(x^2 - 13x + 40 = 0\\)?", answer: "13" },
        { prompt: "What is the product of the roots of \\(2x^2 + 5x - 12 = 0\\)?", answer: "\\(-6\\)" },
        { prompt: "What is the sum of the roots of \\(x^3 + 2x^2 - 5x - 6 = 0\\)?", answer: "\\(-2\\)" },
        { prompt: "What is the product of the roots of \\(x^3 - 7x^2 + 14x - 8 = 0\\)?", answer: "8" },
      ],
      pyqExampleId: "8e2e46c2-e81d-4c17-ab5f-a78fdd9ba3d3",
      traps: [
        {
          title: "Reading the sum of roots with the coefficient's own sign",
          body:
            "The sum of the roots is \\(-\\frac{b}{a}\\). For \\(x^2 - 13x + 40 = 0\\) it is 13, not \\(-13\\).",
        },
        {
          title: "Forgetting to divide by the leading coefficient",
          body:
            "For \\(2x^2 - 8x + 3 = 0\\) the sum of the roots is \\(\\frac{8}{2} = 4\\), not 8. The rules hold for \\(ax^2 + bx + c\\) only after dividing by a.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscpova-chain",
      name: "A product of brackets that collapses by the difference of squares",
      intuition:
        "Multiply (1 − p) by (1 + p) and you get 1 − p². Multiply that by (1 + p²) and you get 1 − p⁴. Each new bracket meets exactly the difference it needs, so a long chain folds into just two terms.",
      definition:
        "- **Difference of squares:** \\((a - b)(a + b) = a^2 - b^2\\).\n" +
        "- Applied again and again: \\((a - b)(a + b)(a^2 + b^2)(a^4 + b^4) \\cdots (a^{2^{k-1}} + b^{2^{k-1}}) = a^{2^k} - b^{2^k}\\). The power doubles at each step: 2, 4, 8, 16, 32.\n" +
        "- The chain needs a **minus** bracket to start it. If it is missing, multiply and divide by it.\n" +
        "- Check an option by putting in a number that makes the options differ. \\(p = 0\\) often gives the same value for several options; \\(p = 1\\) or \\(p = 2\\) usually separates them.",
      formula: {
        label: "Difference-of-squares chain",
        latex: "(a - b)(a + b) = a^2 - b^2 \\qquad (1 - p)(1 + p)(1 + p^2)(1 + p^4) = 1 - p^8",
      },
      authoredExample: {
        prompt: "Simplify \\((1 + x)(1 + x^2)(1 + x^4)(1 - x)\\).",
        steps: [
          "Pair the minus bracket first: \\((1 - x)(1 + x) = 1 - x^2\\).",
          "\\((1 - x^2)(1 + x^2) = 1 - x^4\\).",
          "\\((1 - x^4)(1 + x^4) = 1 - x^8\\).",
          "Check at \\(x = 2\\): \\(3 \\times 5 \\times 17 \\times (-1) = -255 = 1 - 256\\).",
        ],
        answer: "\\(1 - x^8\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\((a - b)(a + b)(a^2 + b^2)(a^4 + b^4) + b^8\\).",
        steps: [
          "\\((a - b)(a + b) = a^2 - b^2\\), then \\(a^4 - b^4\\), then \\(a^8 - b^8\\).",
          "\\(a^8 - b^8 + b^8 = a^8\\).",
        ],
        answer: "\\(a^8\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\((x - 1)(x + 1)(x^2 + 1)\\).", answer: "\\(x^4 - 1\\)" },
        {
          prompt: "Find \\(3 \\times 5 \\times 17 \\times 257\\) by writing it as \\((2 - 1)(2 + 1)(2^2 + 1)(2^4 + 1)(2^8 + 1)\\).",
          answer: "65535",
          method: "The chain gives \\(2^{16} - 1\\).",
        },
        { prompt: "Simplify \\((1 - y)(1 + y)(1 + y^2) + y^4\\).", answer: "1" },
        { prompt: "Find \\(99 \\times 101 \\times 10001\\) using the difference of squares.", answer: "99999999", method: "\\((100 - 1)(100 + 1)(100^2 + 1) = 100^4 - 1\\)." },
      ],
      pyqExampleId: "09fa39ee-53db-4408-8731-4f1afe4d5135",
      traps: [
        {
          title: "Trying to collapse a chain with no minus bracket",
          body:
            "\\((1 + p)(1 + p^2)(1 + p^4)\\) does not fold on its own. It equals \\(\\frac{1 - p^8}{1 - p}\\): put in the missing \\((1 - p)\\) and divide by it.",
        },
        {
          title: "Adding the exponents instead of doubling them",
          body:
            "Each step squares the last power: \\(1 - p^2\\), \\(1 - p^4\\), \\(1 - p^8\\). A chain ending in \\((1 + p^{16})\\) gives \\(1 - p^{32}\\), not \\(1 - p^{31}\\), which comes from adding the powers 1, 2, 4, 8 and 16.",
        },
      ],
    },
  ],
};
