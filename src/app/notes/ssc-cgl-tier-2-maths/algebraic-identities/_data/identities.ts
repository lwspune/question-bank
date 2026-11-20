import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_AI_IDENTITIES_NOTE: SubtopicNote = {
  subtopicName: "Squares, Cubes and Three Variables",
  title: "Squares, Cubes and Three Variables",
  oneLineDefinition:
    "Squares and cubes of a sum come from the sum and the product alone, a cube sum factors so that fractions cancel, and with three letters a sum of zero turns the cubes into three times the product.",
  whyItMatters:
    "22 questions in the Tier II bank, 17 EASY and 5 MODERATE. None needs the letters found: each is answered from a sum, a difference or a product through one identity.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2aiid-squares",
      name: "Squares of a sum and a difference",
      visualizationSlug: "ssc-t2-square-of-sum",
      intuition:
        "The square of a sum and the square of a difference differ only in the sign of the middle term 2ab. Know any two of a + b, a − b, ab and the sum of squares, and the other two follow.",
      definition:
        "- \\((a \\pm b)^2 = a^2 \\pm 2ab + b^2\\).\n" +
        "- \\(a^2 + b^2 = (a + b)^2 - 2ab = (a - b)^2 + 2ab\\).\n" +
        "- \\((a + b)^2 + (a - b)^2 = 2(a^2 + b^2)\\) and \\((a + b)^2 - (a - b)^2 = 4ab\\).\n" +
        "- \\((1 - x)(1 + x) = 1 - x^2\\); multiplying by \\((1 + x^2)\\), \\((1 + x^4)\\), ... keeps doubling the power.\n" +
        "- \\(\\frac{1}{a} + \\frac{1}{b} = \\frac{a + b}{ab}\\).",
      formula: {
        label: "Squares of a sum and a difference",
        latex: "(a \\pm b)^2 = a^2 \\pm 2ab + b^2, \\quad a^2 + b^2 = (a + b)^2 - 2ab",
      },
      authoredExample: {
        prompt: "If \\(a + b = 11\\) and \\(ab = 24\\), with \\(a > b\\), find \\(a^2 + b^2\\) and \\(a - b\\).",
        steps: ["\\(a^2 + b^2 = 121 - 48 = 73\\).", "\\((a - b)^2 = 121 - 96 = 25\\), so \\(a - b = 5\\)."],
        answer: "73 and 5",
      },
      selfCheckExample: {
        prompt: "If \\(x = 6 + \\sqrt{3}\\) and \\(y = 6 - \\sqrt{3}\\), find \\(x^2 + y^2\\).",
        steps: ["\\((a + b)^2 + (a - b)^2 = 2(a^2 + b^2)\\) with \\(a = 6\\), \\(b = \\sqrt{3}\\).", "\\(2(36 + 3) = 78\\)."],
        answer: "78",
      },
      practiceSet: [
        { prompt: "If \\(p - q = 3\\) and \\(pq = 10\\), find \\(p^2 + q^2\\).", answer: "29" },
        { prompt: "Simplify \\((2a + 3b)^2 - (2a - 3b)^2\\).", answer: "\\(24ab\\)" },
        { prompt: "If \\(9x^2 + y^2 = 45\\) and \\(xy = 6\\), with x and y positive, find \\(3x + y\\).", answer: "9" },
      ],
      pyqExampleId: "e1d85c75-e67a-48b1-a1ba-8d922b2508e8",
      traps: [
        {
          title: "Squaring term by term",
          body: "\\((a + b)^2\\) is \\(a^2 + 2ab + b^2\\), never \\(a^2 + b^2\\). With \\(a = 3\\) and \\(b = 4\\), the square of the sum is 49, not 25.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2aiid-cubes",
      name: "Cubes from a sum and a product",
      intuition:
        "The cube of a sum contains the two cubes plus a middle part, \\(3ab(a + b)\\). So once you know a + b and ab, the sum of cubes takes one line, and a and b themselves never have to be found.",
      definition:
        "- \\(a^3 + b^3 = (a + b)^3 - 3ab(a + b)\\).\n" +
        "- \\(a^3 - b^3 = (a - b)^3 + 3ab(a - b)\\).\n" +
        "- If \\(a + b = 1\\), then \\(a^3 + b^3 + 3ab = 1\\).\n" +
        "- With a coefficient, rename first: \\(27x^3 + y^3 = (3x)^3 + y^3\\), so work with \\(3x + y\\) and \\(3x \\cdot y\\).",
      formula: {
        label: "Sums and differences of cubes",
        latex: "a^3 + b^3 = (a + b)^3 - 3ab(a + b), \\quad a^3 - b^3 = (a - b)^3 + 3ab(a - b)",
      },
      authoredExample: {
        prompt: "If \\(a + b = 7\\) and \\(ab = 12\\), find \\(a^3 + b^3\\).",
        steps: ["\\(a^3 + b^3 = 343 - 3 \\times 12 \\times 7 = 343 - 252 = 91\\).", "Check: a and b are 3 and 4, and \\(27 + 64 = 91\\)."],
        answer: "91",
      },
      selfCheckExample: {
        prompt: "If \\(x - y = 2\\) and \\(xy = 15\\), find \\(x^3 - y^3\\).",
        steps: ["\\(x^3 - y^3 = 8 + 3 \\times 15 \\times 2 = 98\\).", "Check: x = 5, y = 3 gives \\(125 - 27 = 98\\)."],
        answer: "98",
      },
      practiceSet: [
        { prompt: "If \\(a + b = 5\\) and \\(ab = 6\\), find \\(a^3 + b^3\\).", answer: "35" },
        { prompt: "If \\(2x + y = 5\\) and \\(xy = 2\\), find \\(8x^3 + y^3\\).", answer: "65", method: "\\(125 - 3 \\times 4 \\times 5\\)" },
        { prompt: "If \\(m + n = 1\\), find \\(m^3 + n^3 + 3mn\\).", answer: "1" },
      ],
      pyqExampleId: "a2f7fb37-b00a-47d8-b269-2b7cf1f54254",
      traps: [
        {
          title: "Leaving out the 3ab part",
          body: "\\(a^3 + b^3\\) is not \\((a + b)^3\\). With \\(a + b = 7\\) and \\(ab = 12\\) they differ by \\(3 \\times 12 \\times 7 = 252\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2aiid-factor",
      name: "Factoring a cube sum or difference",
      intuition:
        "A sum of two cubes splits into the plain sum times a three-term bracket. When a fraction has the cubes on top and that bracket underneath, everything cancels to a + b.",
      definition:
        "- \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\) and \\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\\).\n" +
        "- So \\(\\frac{a^3 + b^3}{a^2 - ab + b^2} = a + b\\) and \\(\\frac{a^3 - b^3}{a^2 + ab + b^2} = a - b\\).\n" +
        "- To match coefficients, write each cube as something cubed first: \\(8x^3 = (2x)^3\\).\n" +
        "- In decimals, a bottom line like \\(2.53^2 - 2.53 \\times 2.47 + 2.47^2\\) is the bracket in disguise.",
      formula: {
        label: "Factoring cubes",
        latex: "a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{3.5^3 + 1.5^3}{3.5^2 - 3.5 \\times 1.5 + 1.5^2}\\).",
        steps: ["The top is \\(a^3 + b^3\\) and the bottom is \\(a^2 - ab + b^2\\), with \\(a = 3.5\\) and \\(b = 1.5\\).", "The value is \\(a + b = 5\\)."],
        answer: "5",
      },
      selfCheckExample: {
        prompt: "If \\(8x^3 - 27y^3 = (2x - 3y)(Ax^2 + Bxy + Cy^2)\\), find \\(A + B + C\\).",
        steps: ["\\((2x)^3 - (3y)^3 = (2x - 3y)(4x^2 + 6xy + 9y^2)\\).", "\\(A + B + C = 4 + 6 + 9 = 19\\)."],
        answer: "19",
      },
      practiceSet: [
        { prompt: "Factorise \\(x^3 + 64\\).", answer: "\\((x + 4)(x^2 - 4x + 16)\\)" },
        { prompt: "Find \\(\\dfrac{9^3 - 4^3}{9^2 + 36 + 4^2}\\).", answer: "5" },
        { prompt: "Simplify \\(\\dfrac{a^3 + 1}{a^2 - a + 1}\\).", answer: "\\(a + 1\\)" },
      ],
      pyqExampleId: "13462fb6-d954-4bf9-ba6c-c7400a8f144e",
      traps: [
        {
          title: "Giving both brackets the same sign",
          body: "In \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\) the middle term of the bracket is MINUS ab. For a difference of cubes it is plus ab.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2aiid-three",
      name: "Three variables and the cube identity",
      intuition:
        "With three letters the key fact is that \\(a^3 + b^3 + c^3 - 3abc\\) factors through \\(a + b + c\\). It makes questions where the three letters add to zero collapse: then the sum of cubes is three times the product.",
      definition:
        "- \\((a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)\\).\n" +
        "- \\(a^3 + b^3 + c^3 - 3abc = (a + b + c)\\left[(a + b + c)^2 - 3(ab + bc + ca)\\right]\\).\n" +
        "- Another form, quick when the numbers are close: \\(\\frac{1}{2}(a + b + c)\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]\\).\n" +
        "- If \\(a + b + c = 0\\), then \\(a^3 + b^3 + c^3 = 3abc\\).\n" +
        "- \\((x + y + z)(xy + yz + zx) - xyz = (x + y)(y + z)(z + x)\\).",
      formula: {
        label: "The cube identity",
        latex: "a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)",
      },
      authoredExample: {
        prompt: "If \\(a + b + c = 9\\) and \\(ab + bc + ca = 26\\), find \\(a^2 + b^2 + c^2\\) and \\(a^3 + b^3 + c^3 - 3abc\\).",
        steps: ["\\(a^2 + b^2 + c^2 = 81 - 52 = 29\\).", "\\(a^3 + b^3 + c^3 - 3abc = 9(29 - 26) = 27\\)."],
        answer: "29 and 27",
      },
      selfCheckExample: {
        prompt: "Find \\(7^3 - 4^3 - 3^3\\) by spotting three numbers that add to zero.",
        steps: ["Take \\(a = 7\\), \\(b = -4\\), \\(c = -3\\): they add to 0.", "So the value is \\(3abc = 3 \\times 7 \\times (-4) \\times (-3) = 252\\)."],
        answer: "252",
      },
      practiceSet: [
        { prompt: "If \\(x + y + z = 0\\), find \\(\\frac{x^3 + y^3 + z^3}{xyz}\\).", answer: "3" },
        { prompt: "If \\(a + b + c = 6\\) and \\(a^2 + b^2 + c^2 = 14\\), find \\(ab + bc + ca\\).", answer: "11" },
        { prompt: "Find \\(a^3 + b^3 + c^3 - 3abc\\) when \\(a = 21\\), \\(b = 22\\), \\(c = 23\\).", answer: "198" },
      ],
      pyqExampleId: "dede6eff-5a6a-421f-9c97-ecf2f8d644b4",
      traps: [
        {
          title: "Using the zero-sum shortcut when the sum is not zero",
          body: "\\(a^3 + b^3 + c^3 = 3abc\\) holds only when \\(a + b + c = 0\\). Otherwise use the full identity with the bracket.",
        },
      ],
    },
  ],
};
