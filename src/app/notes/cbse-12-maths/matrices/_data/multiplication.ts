import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_MT_MULTIPLICATION_NOTE: SubtopicNote = {
  subtopicName: "Multiplication of Matrices",
  title: "Multiplication of Matrices",
  oneLineDefinition:
    "When the product AB is defined and what order it has, the row-by-column rule, the laws matrix multiplication obeys and the ones it breaks, powers and polynomials of a matrix, and matrices used in word problems.",
  whyItMatters:
    "89 questions, the largest page of the chapter, fifty-four of them from board papers in every year from 2023 to 2026. The board asks for the order of a matrix when a product with it is defined (every year), a product worked out (2023, 2025), a value of x that makes a product of matrices zero or equal to another (2024, 2025), an unknown matrix from a product (2025, 2026), which expansions such as the square of A + B hold for matrices (every year), a polynomial in A such as A squared minus 5A plus 4I worked out or shown to be the zero matrix (every year), powers of a matrix whose square is A, I or O (2023, 2024, 2026) and a sales problem done with matrices (2025). The textbook adds Exercise 3.2, its examples and most of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmmt-defined",
      name: "When a product is defined, and its order",
      intuition:
        "To multiply two matrices you run along a row of the first and down a column of the second, pairing the numbers. That only works if the row and the column have the same length: the number of columns of the first must equal the number of rows of the second. Write the two orders side by side: the inner numbers must match, and the outer numbers give the order of the product.",
      definition:
        "- \\(AB\\) is defined only when the **number of columns of \\(A\\) = the number of rows of \\(B\\)**.\n" +
        "- If \\(A\\) is \\(m \\times n\\) and \\(B\\) is \\(n \\times p\\), then \\(AB\\) is \\(m \\times p\\).\n" +
        "- \\(AB\\) can be defined while \\(BA\\) is not. When both are defined they can still have different orders: \\(A\\) of order \\(2 \\times 3\\) and \\(B\\) of order \\(3 \\times 2\\) give \\(AB\\) of order \\(2 \\times 2\\) but \\(BA\\) of order \\(3 \\times 3\\).\n" +
        "- The transpose of an \\(m \\times n\\) matrix is \\(n \\times m\\) (next page). Use this when a question puts a transpose in the product.\n" +
        "- **To find an unknown order:** let it be \\(p \\times q\\), write one condition for each product, and solve.",
      formula: {
        label: "Order of a product",
        latex: "A_{m \\times n} \\, B_{n \\times p} = (AB)_{m \\times p}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "the inner numbers, which must be equal" },
          { symbol: "\\(m \\times p\\)", meaning: "the outer numbers, the order of the product" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(A\\), \\(B\\) and \\(C\\) are matrices of orders \\(2 \\times 3\\), \\(3 \\times 4\\) and \\(4 \\times 2\\). Which of \\(AB\\), \\(BA\\), \\(ABC\\) and \\(CA\\) are defined? Give the order of each one that is.",
        steps: [
          "\\(AB\\): \\((2 \\times 3)(3 \\times 4)\\). The inner numbers are 3 and 3, so \\(AB\\) is defined, of order \\(2 \\times 4\\).",
          "\\(BA\\): \\((3 \\times 4)(2 \\times 3)\\). The inner numbers are 4 and 2, so \\(BA\\) is not defined.",
          "\\(ABC = (AB)C\\): \\((2 \\times 4)(4 \\times 2)\\), defined, of order \\(2 \\times 2\\).",
          "\\(CA\\): \\((4 \\times 2)(2 \\times 3)\\), defined, of order \\(4 \\times 3\\).",
        ],
        answer: "\\(AB\\) (\\(2 \\times 4\\)), \\(ABC\\) (\\(2 \\times 2\\)) and \\(CA\\) (\\(4 \\times 3\\)) are defined; \\(BA\\) is not",
      },
      selfCheckExample: {
        prompt: "If \\(\\begin{bmatrix} 1 & 2 & 3 \\end{bmatrix} X = \\begin{bmatrix} 4 & 5 \\end{bmatrix}\\), what is the order of \\(X\\)?",
        steps: ["\\((1 \\times 3)(p \\times q) = 1 \\times 2\\) needs \\(p = 3\\) and \\(q = 2\\)."],
        answer: "\\(3 \\times 2\\)",
      },
      practiceSet: [
        {
          prompt: "A is of order \\(4 \\times 1\\). Of what order must B be for both \\(AB\\) and \\(BA\\) to be defined?",
          answer: "\\(1 \\times 4\\). Then \\(AB\\) is \\(4 \\times 4\\) and \\(BA\\) is \\(1 \\times 1\\)",
        },
        {
          prompt: "A is of order \\(2 \\times 5\\). Write the order of \\(AA'\\) and of \\(A'A\\).",
          answer: "\\(A'\\) is \\(5 \\times 2\\), so \\(AA'\\) is \\(2 \\times 2\\) and \\(A'A\\) is \\(5 \\times 5\\)",
        },
        {
          prompt: "Is \\(\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 5 & 6 & 7 \\end{bmatrix}\\) defined?",
          answer: "No. The first has 2 columns but the second has only 1 row",
        },
      ],
      pyqExampleId: "6e1e7baa-0d38-4d19-b9af-5106c9a6bca2",
      traps: [
        {
          title: "Matching the wrong pair of numbers",
          body: "It is the COLUMNS of the first matrix that must equal the ROWS of the second: the two inner numbers when the orders are written side by side. The outer numbers give the order of the product.",
        },
        {
          title: "Assuming BA is defined because AB is",
          body: "A \\(2 \\times 3\\) matrix times a \\(3 \\times 4\\) matrix is defined, but the other way round is not. Test each product on its own.",
        },
        {
          title: "Forgetting that a transpose swaps the order",
          body: "If \\(A\\) is \\(m \\times n\\), then \\(A'\\) is \\(n \\times m\\). In a question with \\(A'B\\) or \\(AB'\\), write the order of the transpose first, then match the inner numbers.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-rowcol",
      name: "The row-by-column rule",
      intuition:
        "Each element of AB comes from one row of A and one column of B: multiply the first number of the row by the first number of the column, the second by the second, and so on, and add. The row you use is the row of the answer; the column you use is the column of the answer. Work element by element and write each sum out, because one slip in a sign spoils the whole matrix.",
      definition:
        "- If \\(A = [a_{ij}]_{m \\times n}\\) and \\(B = [b_{jk}]_{n \\times p}\\), the element in row \\(i\\), column \\(k\\) of \\(AB\\) is \\(c_{ik} = a_{i1}b_{1k} + a_{i2}b_{2k} + \\dots + a_{in}b_{nk}\\).\n" +
        "- A row matrix times a column matrix of the same length is a \\(1 \\times 1\\) matrix: one number in brackets.\n" +
        "- A column matrix times a row matrix is a full table: each element is a number of the column times a number of the row.\n" +
        "- **A product of three matrices:** \\((AB)C = A(BC)\\), so multiply in whichever order keeps the working short.\n" +
        "- **An unknown matrix in a product** (\\(AX = B\\)): find the order of \\(X\\) first, write \\(X\\) with letters, multiply, and equate elements. Check every equation: if one fails, no such matrix exists.",
      formula: {
        label: "Element of a product",
        latex: "c_{ik} = \\sum_{j=1}^{n} a_{ij}\\, b_{jk}",
        symbols: [
          { symbol: "\\(c_{ik}\\)", meaning: "the element in row i and column k of AB" },
          { symbol: "\\(a_{ij}\\)", meaning: "elements of row i of A" },
          { symbol: "\\(b_{jk}\\)", meaning: "elements of column k of B" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{bmatrix} 1 & -2 & 3 \\\\ 2 & 0 & -1 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 2 & 1 \\\\ -1 & 0 \\\\ 1 & 4 \\end{bmatrix}\\), find \\(AB\\).",
        steps: [
          "\\(A\\) is \\(2 \\times 3\\) and \\(B\\) is \\(3 \\times 2\\), so \\(AB\\) is defined and is \\(2 \\times 2\\).",
          "Row 1 with column 1: \\(1(2) + (-2)(-1) + 3(1) = 2 + 2 + 3 = 7\\).",
          "Row 1 with column 2: \\(1(1) + (-2)(0) + 3(4) = 1 + 0 + 12 = 13\\).",
          "Row 2 with column 1: \\(2(2) + 0(-1) + (-1)(1) = 4 + 0 - 1 = 3\\).",
          "Row 2 with column 2: \\(2(1) + 0(0) + (-1)(4) = 2 + 0 - 4 = -2\\).",
          "Hence \\(AB = \\begin{bmatrix} 7 & 13 \\\\ 3 & -2 \\end{bmatrix}\\).",
        ],
        answer: "\\(AB = \\begin{bmatrix} 7 & 13 \\\\ 3 & -2 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix}\\).",
        steps: ["Row 1: \\(8 - 5 = 3\\). Row 2: \\(0 + 15 = 15\\)."],
        answer: "\\(\\begin{bmatrix} 3 \\\\ 15 \\end{bmatrix}\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}\\begin{bmatrix} 3 & 4 \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} 3 & 4 \\\\ -6 & -8 \\end{bmatrix}\\)",
        },
        {
          prompt: "Find the matrix \\(A\\) if \\(\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} A = \\begin{bmatrix} 4 & -2 & 6 \\\\ 2 & -1 & 3 \\end{bmatrix}\\).",
          answer: "\\(A\\) is \\(1 \\times 3\\); comparing the first row gives \\(A = \\begin{bmatrix} 2 & -1 & 3 \\end{bmatrix}\\), and the second row agrees",
        },
        {
          prompt: "Find \\(\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}\\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\), using \\(\\cos^2\\theta + \\sin^2\\theta = 1\\)",
        },
      ],
      pyqExampleId: "8c121b5b-9790-4911-bfb6-f7d9c765c162",
      traps: [
        {
          title: "Multiplying element by element",
          body: "The element in row 1, column 1 of \\(AB\\) is NOT \\(a_{11}b_{11}\\). It is the whole of row 1 of \\(A\\) paired with the whole of column 1 of \\(B\\), and the products added.",
        },
        {
          title: "Stopping before every equation is used",
          body: "When you find an unknown matrix by comparing elements, put your values into every equation. A board 2025 question had a third equation that failed, so the right answer was that no such matrix exists.",
        },
        {
          title: "Writing a number for a 1 by 1 product",
          body: "A row times a column gives a \\(1 \\times 1\\) matrix. Equating it to \\(O\\) gives one equation in the unknown, which may be a quadratic with two roots: keep both unless the question rules one out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-laws",
      name: "Laws of multiplication: what holds and what fails",
      intuition:
        "Matrix multiplication keeps some of the rules of ordinary numbers and loses others. Brackets can be moved (associative) and opened (distributive), and the identity matrix acts like 1. But AB and BA are usually different, and two non-zero matrices can multiply to the zero matrix. So any school identity that swaps a product, like the square of a sum, must be checked again for matrices.",
      definition:
        "- **Associative:** \\((AB)C = A(BC)\\). **Distributive:** \\(A(B + C) = AB + AC\\) and \\((A + B)C = AC + BC\\). **Identity:** \\(IA = AI = A\\).\n" +
        "- **Not commutative:** in general \\(AB \\neq BA\\). Some pairs do commute: diagonal matrices of the same order always do.\n" +
        "- **Zero product:** \\(AB = O\\) does NOT mean \\(A = O\\) or \\(B = O\\).\n" +
        "- \\((A + B)^2 = A^2 + AB + BA + B^2\\) always. It becomes \\(A^2 + 2AB + B^2\\) only when \\(AB = BA\\).\n" +
        "- \\((A + B)(A - B) = A^2 - AB + BA - B^2\\). It becomes \\(A^2 - B^2\\) only when \\(AB = BA\\).\n" +
        "- So \\((A + B)^2 = A^2 + B^2\\) holds exactly when \\(AB + BA = O\\), that is \\(AB = -BA\\).",
      formula: {
        label: "Square of a sum of matrices",
        latex: "(A + B)^2 = A^2 + AB + BA + B^2",
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}\\), show that \\(AB \\neq BA\\) and that \\((A + B)^2 \\neq A^2 + 2AB + B^2\\).",
        steps: [
          "\\(AB = \\begin{bmatrix} 1 + 6 & 0 + 2 \\\\ 0 + 3 & 0 + 1 \\end{bmatrix} = \\begin{bmatrix} 7 & 2 \\\\ 3 & 1 \\end{bmatrix}\\).",
          "\\(BA = \\begin{bmatrix} 1 + 0 & 2 + 0 \\\\ 3 + 0 & 6 + 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}\\). So \\(AB \\neq BA\\).",
          "\\(A + B = \\begin{bmatrix} 2 & 2 \\\\ 3 & 2 \\end{bmatrix}\\), so \\((A + B)^2 = \\begin{bmatrix} 4 + 6 & 4 + 4 \\\\ 6 + 6 & 6 + 4 \\end{bmatrix} = \\begin{bmatrix} 10 & 8 \\\\ 12 & 10 \\end{bmatrix}\\).",
          "\\(A^2 = \\begin{bmatrix} 1 & 4 \\\\ 0 & 1 \\end{bmatrix}\\), \\(B^2 = \\begin{bmatrix} 1 & 0 \\\\ 6 & 1 \\end{bmatrix}\\), \\(2AB = \\begin{bmatrix} 14 & 4 \\\\ 6 & 2 \\end{bmatrix}\\).",
          "\\(A^2 + 2AB + B^2 = \\begin{bmatrix} 16 & 8 \\\\ 12 & 4 \\end{bmatrix} \\neq (A + B)^2\\).",
          "The difference is because \\(AB \\neq BA\\): the correct expansion \\(A^2 + AB + BA + B^2\\) does give \\(\\begin{bmatrix} 10 & 8 \\\\ 12 & 10 \\end{bmatrix}\\).",
        ],
        answer: "\\(AB \\neq BA\\), and \\((A + B)^2 \\neq A^2 + 2AB + B^2\\) for these matrices",
      },
      selfCheckExample: {
        prompt: "Find \\(\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}\\). What does the answer show?",
        steps: ["Every row-by-column sum is 0."],
        answer: "The zero matrix: two non-zero matrices can have a zero product",
      },
      practiceSet: [
        {
          prompt: "Expand \\((A - B)^2\\) for square matrices of the same order.",
          answer: "\\(A^2 - AB - BA + B^2\\)",
        },
        {
          prompt: "A and B are square matrices of the same order with \\(AB = BA\\). Simplify \\((A + B)(A - B)\\).",
          answer: "\\(A^2 - AB + BA - B^2 = A^2 - B^2\\)",
        },
        {
          prompt: "Simplify \\(2AB + 3(BA - AB)\\) for square matrices A and B of the same order.",
          answer: "\\(3BA - AB\\). The terms in AB and BA cannot be combined",
        },
      ],
      pyqExampleId: "987fb3ce-454e-43e3-9c72-279781aa9b02",
      traps: [
        {
          title: "Writing the square of a sum as \\(A^2 + 2AB + B^2\\)",
          body: "That needs \\(AB = BA\\), which is not given. Expand \\((A + B)(A + B)\\) term by term and keep \\(AB\\) and \\(BA\\) as two separate terms.",
        },
        {
          title: "Combining AB with BA",
          body: "\\(AB\\) and \\(BA\\) are different matrices in general, so \\(7AB - BA\\) cannot be shortened to \\(6AB\\). Board 2025 offered exactly that wrong simplification.",
        },
        {
          title: "Concluding A = O or B = O from AB = O",
          body: "For matrices this is false. Do not cancel a matrix from both sides of an equation either: \\(AB = AC\\) does not give \\(B = C\\).",
        },
        {
          title: "Assertion-reason: a true Reason that does not explain",
          body: "Board 2026 paired 'AB need not equal BA' with 'diagonal matrices of the same order commute'. Both are true, but the Reason is about a special case, so it does not explain the Assertion: code (B). In Mathematics, code (D) means the Assertion is false and the Reason is true.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-polynomial",
      name: "Powers of A and polynomials in A",
      intuition:
        "A² means A times A, and A³ means A² times A. A polynomial in A, like A squared minus 3A minus 4I, is worked out term by term: square the matrix, multiply A by its number, write the number term as that number times I, and combine element by element. The board asks you to work one out, to show one is the zero matrix, or to find the k that makes an equation true.",
      definition:
        "- \\(A^2 = AA\\) and \\(A^3 = A^2A\\), for a square matrix \\(A\\). Squaring is NOT squaring each element (except for a diagonal matrix).\n" +
        "- In a polynomial in \\(A\\), a number term \\(c\\) is written \\(cI\\), with \\(I\\) of the same order as \\(A\\).\n" +
        "- **Show that a polynomial is \\(O\\):** find \\(A^2\\) (and \\(A^3\\) if needed); write each term as a matrix; combine element by element, one line for each; state that every element is 0.\n" +
        "- **Find k:** write both sides as single matrices, equate elements, and check that every element gives the same \\(k\\).\n" +
        "- A diagonal matrix is raised to a power element by element: \\(\\text{diag}(a, b)^n = \\text{diag}(a^n, b^n)\\). So \\((kI)^3 = k^3 I\\).",
      formula: {
        label: "A quadratic in A",
        latex: "A^2 + pA + qI, \\qquad A^2 = AA, \\quad A^3 = A^2A",
      },
      authoredExample: {
        prompt: "If \\(A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 2 \\end{bmatrix}\\), show that \\(A^2 - 3A - 4I = O\\).",
        steps: [
          "\\(A^2 = \\begin{bmatrix} 1 & 2 \\\\ 3 & 2 \\end{bmatrix}\\begin{bmatrix} 1 & 2 \\\\ 3 & 2 \\end{bmatrix} = \\begin{bmatrix} 1 + 6 & 2 + 4 \\\\ 3 + 6 & 6 + 4 \\end{bmatrix} = \\begin{bmatrix} 7 & 6 \\\\ 9 & 10 \\end{bmatrix}\\).",
          "\\(3A = \\begin{bmatrix} 3 & 6 \\\\ 9 & 6 \\end{bmatrix}\\) and \\(4I = \\begin{bmatrix} 4 & 0 \\\\ 0 & 4 \\end{bmatrix}\\).",
          "\\(A^2 - 3A - 4I = \\begin{bmatrix} 7 - 3 - 4 & 6 - 6 - 0 \\\\ 9 - 9 - 0 & 10 - 6 - 4 \\end{bmatrix}\\).",
          "\\(= \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix} = O\\). Hence shown.",
        ],
        answer: "Every element is 0, so \\(A^2 - 3A - 4I = O\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}\\), find \\(k\\) so that \\(A^2 = kA\\).",
        steps: ["\\(A^2 = \\begin{bmatrix} 9 & 0 \\\\ 0 & 9 \\end{bmatrix} = 3A\\)."],
        answer: "\\(k = 3\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(A = \\begin{bmatrix} 0 & 2 \\\\ 2 & 0 \\end{bmatrix}\\), find \\(A^2\\) and \\(A^3\\).",
          answer: "\\(A^2 = \\begin{bmatrix} 4 & 0 \\\\ 0 & 4 \\end{bmatrix} = 4I\\) and \\(A^3 = 4A = \\begin{bmatrix} 0 & 8 \\\\ 8 & 0 \\end{bmatrix}\\)",
        },
        {
          prompt: "Find \\(k\\) if \\(A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}\\) and \\(A^2 = kA + 3I\\).",
          answer: "\\(A^2 = \\begin{bmatrix} 5 & 4 \\\\ 4 & 5 \\end{bmatrix}\\); comparing gives \\(2k = 4\\) and \\(k + 3 = 5\\), so \\(k = 2\\)",
        },
        {
          prompt: "Find \\(A^2\\) if \\(A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & -2 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 4 & 0 \\\\ 0 & 0 & 9 \\end{bmatrix}\\)",
        },
      ],
      pyqExampleId: "50ed348c-58d1-458f-b548-daf8351a4f75",
      traps: [
        {
          title: "Squaring each element",
          body: "\\(A^2\\) is the product \\(AA\\), found row by column. Squaring the elements works only for a diagonal matrix.",
        },
        {
          title: "Adding a number to a matrix",
          body: "In \\(A^2 - 3A - 4\\), the 4 means \\(4I\\): it changes only the diagonal elements. Subtracting 4 from every element is wrong.",
        },
        {
          title: "Cubing is not multiplying by 3",
          body: "\\(A^3\\) is \\(AAA\\), not \\(3A\\). For \\(A = kI\\), \\(A^3 = k^3I\\): every diagonal element is cubed.",
        },
        {
          title: "Finding k from one element only",
          body: "Check that every element gives the same value. When two elements give different conditions (like \\(x^2 = 1\\) and \\(x + 1 = 2\\)), only the value that satisfies both is the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-special",
      name: "Matrices whose square is A, I or O",
      intuition:
        "Some matrices repeat when you square them. If A² = A, every power of A is A again; if A² = I, the powers go A, I, A, I; if A² = O, every power from the square onwards is the zero matrix. With these facts a long power or a long expansion collapses to one or two terms. Because I commutes with every matrix, a bracket like (I + A) can be expanded like an ordinary binomial.",
      definition:
        "- If \\(A^2 = A\\): \\(A^3 = A^2A = AA = A\\), and \\(A^n = A\\) for every \\(n\\).\n" +
        "- If \\(A^2 = I\\): \\(A^3 = A\\), \\(A^4 = I\\), and so on.\n" +
        "- If \\(A^2 = O\\): every higher power is \\(O\\), so a series \\(I - A + A^2 - \\dots\\) stops at \\(I - A\\).\n" +
        "- \\(IA = AI = A\\), so \\((I + A)^2 = I + 2A + A^2\\) and \\((I + A)^3 = I + 3A + 3A^2 + A^3\\). Then replace the powers using the given relation.\n" +
        "- \\(A^2 = A\\) does not mean \\(A = I\\) or \\(A = O\\): \\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}\\) is neither.",
      formula: {
        label: "Powers when the square is A",
        latex: "A^2 = A \\;\\Rightarrow\\; A^n = A \\text{ for all } n \\geq 1",
      },
      authoredExample: {
        prompt: "A is a square matrix such that \\(A^2 = A\\). Show that \\((2I + A)^2 - 5A = 4I\\).",
        steps: [
          "\\(I\\) commutes with \\(A\\), so \\((2I + A)^2 = 4I^2 + 2(2I)A + A^2\\).",
          "\\(= 4I + 4A + A^2\\).",
          "Using \\(A^2 = A\\): \\((2I + A)^2 = 4I + 4A + A = 4I + 5A\\).",
          "So \\((2I + A)^2 - 5A = 4I + 5A - 5A = 4I\\). Hence shown.",
        ],
        answer: "\\((2I + A)^2 - 5A = 4I\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A = \\begin{bmatrix} 0 & 3 \\\\ 0 & 0 \\end{bmatrix}\\), find \\(A^{20}\\).",
        steps: ["\\(A^2 = O\\), so every higher power is \\(O\\)."],
        answer: "The zero matrix",
      },
      practiceSet: [
        {
          prompt: "A is a square matrix with \\(A^2 = I\\). Find \\(A^5\\).",
          answer: "\\(A^5 = (A^2)^2A = A\\)",
        },
        {
          prompt: "A is a square matrix with \\(A^2 = I\\). Simplify \\((A + I)^2 - 2A\\).",
          answer: "\\(A^2 + 2A + I - 2A = I + I = 2I\\)",
        },
        {
          prompt: "Show that \\(A = \\begin{bmatrix} 1 & 0 \\\\ 2 & -1 \\end{bmatrix}\\) satisfies \\(A^2 = I\\).",
          answer: "\\(A^2 = \\begin{bmatrix} 1 & 0 \\\\ 2 - 2 & 1 \\end{bmatrix} = I\\)",
        },
      ],
      pyqExampleId: "aba56d30-4ac9-4628-9b0a-19b8a119922e",
      traps: [
        {
          title: "Expanding a bracket of two general matrices like a binomial",
          body: "\\((I + A)^3 = I + 3A + 3A^2 + A^3\\) works because \\(I\\) commutes with \\(A\\). For two general matrices \\((A + B)^3\\) cannot be expanded this way.",
        },
        {
          title: "Cancelling A from \\(A^2 = A\\)",
          body: "You cannot divide by a matrix. \\(A^2 = A\\) only tells you how to replace powers; it does not force \\(A = I\\).",
        },
        {
          title: "Adding up an endless series of matrices",
          body: "First square the matrix. If \\(A^2 = O\\), every term from \\(A^2\\) on is zero and the series is just \\(I - A\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-apply",
      name: "Matrices in word problems",
      intuition:
        "A sales or cost problem is a row-by-column product in disguise: each row-by-column sum adds up number times price over all the items. Put the quantities in a matrix with one row for each day (or shop, or market) and one column for each item, and the prices in a column with one row for each item. The product gives one total for each day.",
      definition:
        "- **Quantities** matrix: rows = days, shops or markets; columns = items.\n" +
        "- **Prices** (or costs, or rates) column: one row per item, in the same order as the columns of the quantities matrix.\n" +
        "- Quantities \\((m \\times n)\\) times prices \\((n \\times 1)\\) gives an \\(m \\times 1\\) column of totals.\n" +
        "- Profit = total sale minus total cost. Convert dozens to units and paise to rupees before you multiply.\n" +
        "- Label the rows of your answer (Day I, Day II) and give the money with its unit.",
      formula: {
        label: "Total from quantities and prices",
        latex: "\\begin{bmatrix} q_{11} & q_{12} & q_{13} \\\\ q_{21} & q_{22} & q_{23} \\end{bmatrix}\\begin{bmatrix} p_1 \\\\ p_2 \\\\ p_3 \\end{bmatrix} = \\begin{bmatrix} q_{11}p_1 + q_{12}p_2 + q_{13}p_3 \\\\ q_{21}p_1 + q_{22}p_2 + q_{23}p_3 \\end{bmatrix}",
      },
      authoredExample: {
        prompt:
          "A school canteen sells 30 samosas, 20 sandwiches and 40 juices on Monday, and 25 samosas, 35 sandwiches and 30 juices on Tuesday. A samosa costs ₹12, a sandwich ₹25 and a juice ₹15. Using matrix multiplication, find the takings on each day and in all.",
        steps: [
          "Quantities: \\(Q = \\begin{bmatrix} 30 & 20 & 40 \\\\ 25 & 35 & 30 \\end{bmatrix}\\) (rows Monday, Tuesday). Prices: \\(P = \\begin{bmatrix} 12 \\\\ 25 \\\\ 15 \\end{bmatrix}\\).",
          "\\(QP = \\begin{bmatrix} 30(12) + 20(25) + 40(15) \\\\ 25(12) + 35(25) + 30(15) \\end{bmatrix}\\).",
          "\\(= \\begin{bmatrix} 360 + 500 + 600 \\\\ 300 + 875 + 450 \\end{bmatrix} = \\begin{bmatrix} 1460 \\\\ 1625 \\end{bmatrix}\\).",
          "Total takings \\(= 1460 + 1625 = 3085\\).",
        ],
        answer: "₹1460 on Monday, ₹1625 on Tuesday, ₹3085 in all",
      },
      selfCheckExample: {
        prompt: "Find \\(\\begin{bmatrix} 2 & 3 \\end{bmatrix}\\begin{bmatrix} 10 \\\\ 20 \\end{bmatrix}\\) and say what it means if 2 and 3 are numbers of notebooks and pens and 10 and 20 their prices in rupees.",
        steps: ["\\(2(10) + 3(20) = 80\\)."],
        answer: "[80]: the total cost is ₹80",
      },
      practiceSet: [
        {
          prompt: "₹10,000 is invested in two bonds paying 6% and 8% a year. Using a matrix product for the interest, find how it must be split to earn ₹720 a year.",
          answer: "\\(\\begin{bmatrix} x & 10000 - x \\end{bmatrix}\\begin{bmatrix} 0.06 \\\\ 0.08 \\end{bmatrix} = [720]\\) gives \\(x = 4000\\): ₹4,000 at 6% and ₹6,000 at 8%",
        },
        {
          prompt: "A shop sells 5 dozen pens at ₹10 each and 3 dozen pencils at ₹5 each. Find the takings with a matrix product.",
          answer: "\\(\\begin{bmatrix} 60 & 36 \\end{bmatrix}\\begin{bmatrix} 10 \\\\ 5 \\end{bmatrix} = [780]\\): ₹780",
        },
        {
          prompt: "Two shops sell three items. Write the orders of the quantities matrix, the prices matrix and the product that gives each shop's takings.",
          answer: "\\(2 \\times 3\\) times \\(3 \\times 1\\) gives a \\(2 \\times 1\\) column, one total for each shop",
        },
      ],
      pyqExampleId: "fd88c29e-efbd-43fd-bcb3-2d9ce9f774a8",
      traps: [
        {
          title: "Setting up the product the wrong way round",
          body: "The items must line up: the columns of the quantities matrix and the rows of the prices column are the same items in the same order. Prices times quantities in the wrong order is either undefined or gives a meaningless table.",
        },
        {
          title: "Forgetting to convert units",
          body: "Change dozens to units and paise to rupees before multiplying. The answer to a money question needs its unit (₹) and a label for each row.",
        },
      ],
    },
  ],
};
