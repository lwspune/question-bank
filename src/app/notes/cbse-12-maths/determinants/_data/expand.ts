import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DT_EXPAND_NOTE: SubtopicNote = {
  subtopicName: "Determinant and its Properties",
  title: "Determinant of a Square Matrix",
  oneLineDefinition:
    "A number tied to every square matrix: for order 2 it is the product of the leading diagonal minus the product of the other diagonal, and for order 3 it is found by expanding along any one row or column.",
  whyItMatters:
    "57 questions, thirty-four of them from board papers from 2023 to 2026: twelve in 2023, seven in 2024, ten in 2025 and five in 2026. The board asks for the value of a determinant, an unknown that makes a determinant equal to a number or a matrix singular, the sum or product of all such values, and the rule |kA| = kⁿ|A| with products and inverses (every year from 2023 to 2025). It also set a determinant independent of θ (2023), an assertion-reason item on the range of a determinant (2024), a singular matrix with sin 3x and cos 2x in it (2026) and a determinant in x, y and z with a proof to follow (2026). The textbook adds Exercise 4.1 and Miscellaneous Questions 1, 2, 5, 6 and 9.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmdt-order-two",
      name: "Determinant of a matrix of order two",
      intuition:
        "Every square matrix has a number called its determinant. For a 2 by 2 matrix it takes one line: multiply down the leading diagonal, multiply down the other diagonal, and subtract. When the entries contain an unknown, setting the determinant equal to a number gives an ordinary equation in that unknown.",
      definition:
        "- Only a **square** matrix has a determinant. It is written \\(|A|\\), \\(\\det A\\) or \\(\\Delta\\).\n" +
        "- \\(|A|\\) is read as the determinant of \\(A\\), **not** the modulus of \\(A\\): it can be negative.\n" +
        "- For order 1, \\(|[a]| = a\\).\n" +
        "- For order 2, \\(\\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}\\).\n" +
        "- A matrix is **singular** when \\(|A| = 0\\) and **non-singular** when \\(|A| \\ne 0\\).\n" +
        "- An equation such as \\(|A| = |B|\\) or \\(|A| = 0\\) is solved like any equation. A square in the unknown gives two values; keep both unless the question rules one out.",
      formula: {
        label: "Determinant of order two",
        latex: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc",
      },
      authoredExample: {
        prompt: "Find the values of \\(x\\) if \\(\\begin{vmatrix} x & 9 \\\\ 11 & x \\end{vmatrix} = \\begin{vmatrix} 9 & 8 \\\\ 10 & 9 \\end{vmatrix}\\).",
        steps: [
          "Left side: \\(\\begin{vmatrix} x & 9 \\\\ 11 & x \\end{vmatrix} = x \\times x - 9 \\times 11 = x^2 - 99\\).",
          "Right side: \\(\\begin{vmatrix} 9 & 8 \\\\ 10 & 9 \\end{vmatrix} = 9 \\times 9 - 8 \\times 10 = 81 - 80 = 1\\).",
          "Equate: \\(x^2 - 99 = 1\\), so \\(x^2 = 100\\).",
          "\\(\\therefore x = 10\\) or \\(x = -10\\), that is \\(x = \\pm 10\\).",
        ],
        answer: "\\(x = \\pm 10\\)",
      },
      selfCheckExample: {
        prompt: "Find the values of \\(x\\) for which \\(\\begin{bmatrix} x & 10 \\\\ 1 & x - 9 \\end{bmatrix}\\) is a singular matrix.",
        steps: [
          "Singular means the determinant is zero.",
          "\\(\\begin{vmatrix} x & 10 \\\\ 1 & x - 9 \\end{vmatrix} = x(x - 9) - 10 \\times 1 = x^2 - 9x - 10\\).",
          "\\(x^2 - 9x - 10 = 0\\) gives \\((x - 10)(x + 1) = 0\\).",
          "\\(\\therefore x = 10\\) or \\(x = -1\\).",
        ],
        answer: "\\(x = 10\\) or \\(x = -1\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\begin{vmatrix} a + b & a - b \\\\ a - b & a + b \\end{vmatrix}\\).", answer: "\\(4ab\\)", method: "\\((a + b)^2 - (a - b)^2\\)" },
        { prompt: "Evaluate \\(\\begin{vmatrix} \\sin x & \\cos x \\\\ -\\cos x & \\sin x \\end{vmatrix}\\).", answer: "\\(1\\)", method: "\\(\\sin^2 x + \\cos^2 x\\)" },
        { prompt: "Find the sum of all values of \\(x\\) for which \\(\\begin{vmatrix} x & 8 \\\\ 1 & x + 2 \\end{vmatrix} = 0\\).", answer: "\\(-2\\)", method: "\\(x^2 + 2x - 8 = 0\\) gives \\(x = 2\\) or \\(x = -4\\)." },
      ],
      pyqExampleId: "42d331a3-4807-4db3-ba66-67255138fbbb",
      traps: [
        {
          title: "Adding the two diagonal products",
          body: "The determinant is \\(ad - bc\\), a difference. With a negative entry, write the product in brackets first: \\(\\begin{vmatrix} 2 & -6 \\\\ 7 & 1 \\end{vmatrix} = 2 - (-6)(7) = 44\\), not \\(-40\\).",
        },
        {
          title: "Keeping one root only",
          body: "\\(x^2 = 100\\) gives \\(x = 10\\) and \\(x = -10\\). An answer of \\(10\\) alone loses the mark when both values satisfy the equation.",
        },
        {
          title: "Reading |A| as a modulus",
          body: "\\(|A|\\) is a determinant and may be negative. Do not drop a minus sign from it as if it were an absolute value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-expand-three",
      name: "Expanding a determinant of order three along a row or column",
      intuition:
        "A 3 by 3 determinant breaks into three 2 by 2 determinants. Take each entry of one row, multiply it by the 2 by 2 determinant left when you cover its row and column, and attach the sign from the pattern + − +. Any row or column gives the same value, so choose the one with the most zeros: each zero wipes out a whole term.",
      definition:
        "- **Along \\(R_1\\):** \\(|A| = a_{11}\\begin{vmatrix} a_{22} & a_{23} \\\\ a_{32} & a_{33} \\end{vmatrix} - a_{12}\\begin{vmatrix} a_{21} & a_{23} \\\\ a_{31} & a_{33} \\end{vmatrix} + a_{13}\\begin{vmatrix} a_{21} & a_{22} \\\\ a_{31} & a_{32} \\end{vmatrix}\\).\n" +
        "- The sign of the term for \\(a_{ij}\\) is \\((-1)^{i+j}\\): \\(+\\) when \\(i + j\\) is even, \\(-\\) when it is odd. The pattern is \\(\\begin{matrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{matrix}\\).\n" +
        "- Expanding along any of the six rows and columns gives the same value.\n" +
        "- For easier work, expand along the row or column with the most zeros.\n" +
        "- A diagonal or triangular determinant has zeros on one side of the leading diagonal; expanding again and again leaves the product of the diagonal entries.\n" +
        "- If the board asks for the sum or product of all values of an unknown, form the quadratic and use sum \\(= -\\dfrac{b}{a}\\), product \\(= \\dfrac{c}{a}\\), or solve it.",
      formula: {
        label: "Expansion along the first row",
        latex: "\\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix} = a_1(b_2c_3 - b_3c_2) - b_1(a_2c_3 - a_3c_2) + c_1(a_2b_3 - a_3b_2)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\Delta = \\begin{vmatrix} 3 & 0 & -2 \\\\ 7 & 9 & 8 \\\\ 1 & 0 & 6 \\end{vmatrix}\\).",
        steps: [
          "The second column has two zeros, so expand along \\(C_2\\).",
          "Only \\(a_{22} = 9\\) survives, with sign \\((-1)^{2+2} = +\\).",
          "\\(\\Delta = 9\\begin{vmatrix} 3 & -2 \\\\ 1 & 6 \\end{vmatrix}\\).",
          "\\(= 9\\left[3 \\times 6 - (-2) \\times 1\\right] = 9(18 + 2)\\).",
          "\\(= 9 \\times 20 = 180\\).",
        ],
        answer: "\\(\\Delta = 180\\)",
      },
      selfCheckExample: {
        prompt: "Find the values of \\(x\\) if \\(\\begin{vmatrix} x & 2 & 1 \\\\ 3 & x & 0 \\\\ 1 & 1 & 1 \\end{vmatrix} = 9\\).",
        steps: [
          "Expand along \\(R_1\\): \\(x(x \\times 1 - 0 \\times 1) - 2(3 \\times 1 - 0 \\times 1) + 1(3 \\times 1 - x \\times 1)\\).",
          "\\(= x^2 - 6 + 3 - x = x^2 - x - 3\\).",
          "\\(x^2 - x - 3 = 9\\) gives \\(x^2 - x - 12 = 0\\), that is \\((x - 4)(x + 3) = 0\\).",
          "\\(\\therefore x = 4\\) or \\(x = -3\\).",
        ],
        answer: "\\(x = 4\\) or \\(x = -3\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\begin{vmatrix} 2 & -3 & 1 \\\\ 0 & 4 & 0 \\\\ 5 & 1 & -2 \\end{vmatrix}\\).", answer: "\\(-36\\)", method: "Expand along \\(R_2\\): \\(4(-4 - 5)\\)." },
        { prompt: "Find \\(k\\) if \\(\\begin{bmatrix} 1 & 2 & k \\\\ 0 & 3 & 1 \\\\ 2 & 1 & 4 \\end{bmatrix}\\) is singular.", answer: "\\(k = \\dfrac{5}{2}\\)", method: "\\(|A| = 11 + 4 - 6k = 15 - 6k\\)" },
        { prompt: "Evaluate \\(\\begin{vmatrix} 4 & 0 & 0 \\\\ 0 & -3 & 0 \\\\ 0 & 0 & 2 \\end{vmatrix}\\).", answer: "\\(-24\\)", method: "Product of the diagonal entries." },
      ],
      pyqExampleId: "e31dc2d2-f429-4e0e-b2f0-c57536b3043b",
      traps: [
        {
          title: "The middle term of the first row",
          body: "Expanding along \\(R_1\\), the term for \\(a_{12}\\) carries a minus sign. Writing \\(+a_{12}(\\dots)\\) is the most common slip in a 3 by 3 determinant.",
        },
        {
          title: "Using + − + on the second row",
          body: "Along \\(R_2\\) or \\(C_2\\) the signs are \\(- \\; + \\; -\\). Take each sign from \\((-1)^{i+j}\\), not from the first row.",
        },
        {
          title: "Equation set to zero by habit",
          body: "If the question says the determinant equals \\(-57\\) or \\(9\\), set the expansion equal to that number, not to zero, before you form the quadratic.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-letters",
      name: "Determinants with letters and trigonometric entries",
      intuition:
        "The expansion works the same way when the entries are letters, \\(\\sin\\theta\\) or \\(1 + x\\). Expand, multiply out, and simplify with algebra or with \\(\\sin^2\\theta + \\cos^2\\theta = 1\\). A question that says \"show that the value does not depend on \\(\\theta\\)\" is answered by an expansion in which every \\(\\theta\\) cancels.",
      definition:
        "- Expand along the row or column with zeros, or along \\(R_1\\), and write every product in full before you simplify.\n" +
        "- Group like terms. Look for \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), \\((a + b)(a^2 - ab + b^2) = a^3 + b^3\\) and similar identities.\n" +
        "- **Independent of \\(\\theta\\):** show that the final value has no \\(\\theta\\) in it, and say so in the last line.\n" +
        "- **Range of a determinant:** once the value is written in \\(\\cos^2\\theta\\) or \\(\\sin^2\\theta\\), use \\(0 \\le \\cos^2\\theta \\le 1\\).\n" +
        "- **The present NCERT book does not teach the properties of determinants** (row and column operations, two equal rows giving zero). Board papers in 2023 and 2024 set determinants that those properties make quick; expanding gives the same answer and is what the book teaches.\n" +
        "- **Assertion-reason (Maths codes):** (A) both true and R explains A; (B) both true and R does not explain A; (C) A true, R false; (D) A false, R true.",
      formula: {
        label: "A useful identity in these expansions",
        latex: "\\sin^2\\theta + \\cos^2\\theta = 1",
      },
      authoredExample: {
        prompt: "Show that \\(\\Delta = \\begin{vmatrix} \\cos\\theta & \\sin\\theta & 1 \\\\ -\\sin\\theta & \\cos\\theta & 1 \\\\ 0 & 0 & 2 \\end{vmatrix}\\) does not depend on \\(\\theta\\).",
        steps: [
          "The third row has two zeros, so expand along \\(R_3\\).",
          "Only \\(a_{33} = 2\\) survives, with sign \\((-1)^{3+3} = +\\).",
          "\\(\\Delta = 2\\begin{vmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{vmatrix}\\).",
          "\\(= 2\\left[\\cos\\theta\\cos\\theta - \\sin\\theta(-\\sin\\theta)\\right] = 2(\\cos^2\\theta + \\sin^2\\theta)\\).",
          "\\(= 2 \\times 1 = 2\\).",
          "The value 2 has no \\(\\theta\\) in it, so \\(\\Delta\\) does not depend on \\(\\theta\\).",
        ],
        answer: "\\(\\Delta = 2\\) for every \\(\\theta\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\begin{vmatrix} 1 & a & b \\\\ -a & 1 & c \\\\ -b & -c & 1 \\end{vmatrix}\\).",
        steps: [
          "Expand along \\(R_1\\): \\(1(1 \\times 1 - c(-c)) - a(-a \\times 1 - c(-b)) + b(-a(-c) - 1 \\times (-b))\\).",
          "\\(= 1(1 + c^2) - a(-a + bc) + b(ac + b)\\).",
          "\\(= 1 + c^2 + a^2 - abc + abc + b^2\\).",
          "\\(= 1 + a^2 + b^2 + c^2\\).",
        ],
        answer: "\\(1 + a^2 + b^2 + c^2\\)",
      },
      practiceSet: [
        { prompt: "Show that \\(\\begin{vmatrix} \\sin x & \\cos x & 0 \\\\ -\\cos x & \\sin x & 0 \\\\ 1 & 2 & 3 \\end{vmatrix}\\) does not depend on \\(x\\).", answer: "Its value is \\(3\\).", method: "Expand along \\(C_3\\): \\(3(\\sin^2 x + \\cos^2 x)\\)." },
        { prompt: "Evaluate \\(\\begin{vmatrix} 0 & a & -b \\\\ -a & 0 & c \\\\ b & -c & 0 \\end{vmatrix}\\).", answer: "\\(0\\)", method: "\\(-a(0 - bc) - b(ac - 0) = abc - abc\\)" },
        { prompt: "Assertion (A): \\(\\begin{vmatrix} x & 1 \\\\ -1 & x \\end{vmatrix} \\ge 1\\) for every real \\(x\\). Reason (R): \\(x^2 \\ge 0\\) for every real \\(x\\). Choose the code.", answer: "(A)", method: "The determinant is \\(x^2 + 1\\), and R is exactly why it is at least 1." },
      ],
      pyqExampleId: "7009c778-19d4-4efc-b9f5-d42b55fd4cc3",
      traps: [
        {
          title: "The Maths code (D)",
          body: "In the Maths paper, code (D) is \"A is false, R is true\". It is not \"both false\", which is the Physics paper's (D).",
        },
        {
          title: "Dividing by a product that might be zero",
          body: "To pass from an equation in products of letters to a sum of reciprocals, you divide by the product of the letters. Say that each letter is non-zero before you divide; that line carries the step mark.",
        },
        {
          title: "Stopping before the last line",
          body: "In \"show that it does not depend on \\(\\theta\\)\", reaching \\(-x^3\\) is not the end. Write the sentence: the value contains no \\(\\theta\\), so it is independent of \\(\\theta\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-scalar",
      name: "Determinant of kA, of a product and of an inverse",
      intuition:
        "Multiplying a matrix by \\(k\\) multiplies every row by \\(k\\), and each row hands one factor \\(k\\) to the determinant. So a 3 by 3 matrix gives \\(k^3\\), not \\(k\\). The determinant of a product is the product of the determinants, and an inverse has the reciprocal determinant because \\(AA^{-1} = I\\) and \\(|I| = 1\\).",
      definition:
        "- If \\(A\\) is of order \\(n\\), then \\(|kA| = k^n|A|\\).\n" +
        "- \\(|AB| = |A||B|\\) for square matrices of the same order.\n" +
        "- \\(|A^{-1}| = \\dfrac{1}{|A|}\\), because \\(|A||A^{-1}| = |AA^{-1}| = |I| = 1\\).\n" +
        "- \\(|A'| = |A|\\): a matrix and its transpose have the same determinant. The present book does not state this (it was one of the properties it dropped), but the board used it in 2024 for \\(|5A'|\\) and \\(|A^{T}|\\).\n" +
        "- A skew-symmetric matrix of order 3 has \\(A' = -A\\), so \\(|A| = |A'| = |-A| = (-1)^3|A| = -|A|\\), giving \\(|A| = 0\\). The board asked this in 2023 and 2025.",
      formula: {
        label: "Scalar multiple, product and inverse",
        latex: "|kA| = k^n|A|, \\quad |AB| = |A||B|, \\quad |A^{-1}| = \\dfrac{1}{|A|}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "order of the square matrix" },
          { symbol: "\\(k\\)", meaning: "any scalar" },
        ],
      },
      authoredExample: {
        prompt: "\\(A\\) and \\(B\\) are square matrices of order 3 with \\(|A| = 2\\) and \\(|B| = 5\\). Find \\(|3A|\\), \\(|AB|\\), \\(|-2AB|\\) and \\(|A^{-1}|\\).",
        steps: [
          "\\(|3A| = 3^3|A| = 27 \\times 2 = 54\\).",
          "\\(|AB| = |A||B| = 2 \\times 5 = 10\\).",
          "\\(|-2AB| = (-2)^3|AB| = -8 \\times 10 = -80\\).",
          "\\(|A^{-1}| = \\dfrac{1}{|A|} = \\dfrac{1}{2}\\).",
        ],
        answer: "\\(54,\\ 10,\\ -80,\\ \\dfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "\\(A\\) is a square matrix of order 2 with \\(|A| = 7\\). Find \\(|3A|\\) and \\(|(3A)^{-1}|\\).",
        steps: [
          "Order 2, so \\(|3A| = 3^2|A| = 9 \\times 7 = 63\\).",
          "\\(|(3A)^{-1}| = \\dfrac{1}{|3A|} = \\dfrac{1}{63}\\).",
        ],
        answer: "\\(63\\) and \\(\\dfrac{1}{63}\\)",
      },
      practiceSet: [
        { prompt: "\\(A\\) is a skew-symmetric matrix of order 3. Find \\(|A|\\).", answer: "\\(0\\)" },
        { prompt: "\\(A\\) is of order 3 and \\(|A| = 4\\). Find \\(\\left|\\dfrac{1}{2}A^{-1}\\right|\\).", answer: "\\(\\dfrac{1}{32}\\)", method: "\\(\\left(\\dfrac{1}{2}\\right)^3 \\times \\dfrac{1}{4}\\)" },
        { prompt: "\\(A\\) is of order 3 with \\(|A| \\ne 0\\) and \\(|kA| = |A|\\), \\(k\\) real. Find \\(k\\).", answer: "\\(k = 1\\)", method: "\\(k^3 = 1\\)" },
      ],
      pyqExampleId: "eae1b328-4d0d-4a22-841f-ac6a1fa4e90a",
      traps: [
        {
          title: "Taking k out once",
          body: "\\(|2A| = 2|A|\\) is wrong for any order above 1. For order 3, \\(|2A| = 8|A|\\); for order 2, \\(|2A| = 4|A|\\).",
        },
        {
          title: "Losing the sign of a negative scalar",
          body: "\\((-3)^3 = -27\\) but \\((-3)^2 = 9\\). For an odd order the sign of the scalar stays in the answer.",
        },
        {
          title: "Inverting the scalar along with the matrix",
          body: "\\(|kA^{-1}| = \\dfrac{k^n}{|A|}\\), not \\(\\dfrac{1}{k^n|A|}\\): only \\(A\\) is inverted.",
        },
      ],
    },
  ],
};
