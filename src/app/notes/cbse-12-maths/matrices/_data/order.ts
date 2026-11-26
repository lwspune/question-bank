import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_MT_ORDER_NOTE: SubtopicNote = {
  subtopicName: "Order and Types of Matrices",
  title: "Order of a Matrix and Types of Matrices",
  oneLineDefinition:
    "A matrix as an ordered rectangular array, its order m by n, the element in row i and column j, building a matrix from a rule for its elements, and the seven types the book names.",
  whyItMatters:
    "30 questions, fifteen of them from board papers from 2023 to 2026. The board asks how many orders a matrix with a given number of elements can have (2024), how many 3 by 3 matrices can be filled from two given numbers (2025), and which statement about a matrix built from a rule for its elements is true or false (2024, 2025). Most of the rest are one-mark questions on types: scalar matrices (2024, 2025), the identity and diagonal matrices (2024, 2026), row and column matrices (2026), a matrix that is only square (2025), and assertion-reason items on scalar and diagonal matrices (2024, 2025). The textbook adds Exercise 3.1 and its examples.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmmt-order",
      name: "Order of a matrix and counting orders",
      intuition:
        "A matrix is a table of numbers with a fixed number of rows and columns. Its order says how big the table is: rows first, then columns. Since the table is a full rectangle, the number of elements is rows times columns. So to list every order a matrix with a given number of elements can have, list every way of writing that number as a product of two natural numbers, keeping the order of the two factors.",
      definition:
        "- A **matrix** is an ordered rectangular array of numbers or functions. The numbers or functions are its **elements** (entries).\n" +
        "- A matrix with \\(m\\) rows and \\(n\\) columns has **order** \\(m \\times n\\) (read m by n). It has \\(mn\\) elements.\n" +
        "- \\(a_{ij}\\) is the element in the \\(i\\)th row and \\(j\\)th column. The matrix is written \\(A = [a_{ij}]_{m \\times n}\\).\n" +
        "- **Possible orders with N elements:** every ordered pair of natural numbers \\((m, n)\\) with \\(mn = N\\). \\(1 \\times N\\) and \\(N \\times 1\\) are two different orders.\n" +
        "- If \\(N\\) is a prime number, the only orders are \\(1 \\times N\\) and \\(N \\times 1\\).\n" +
        "- **Counting matrices:** if each of the \\(mn\\) elements can be chosen in \\(k\\) ways, there are \\(k^{mn}\\) such matrices.",
      formula: {
        label: "Order and number of elements",
        latex: "A = [a_{ij}]_{m \\times n}, \\qquad \\text{number of elements} = mn",
        symbols: [
          { symbol: "\\(m\\)", meaning: "number of rows" },
          { symbol: "\\(n\\)", meaning: "number of columns" },
          { symbol: "\\(a_{ij}\\)", meaning: "the element in row i and column j" },
        ],
      },
      authoredExample: {
        prompt:
          "(i) A matrix has 12 elements. Write all its possible orders. (ii) How many matrices of order \\(2 \\times 2\\) can be formed if each element is 0, 1 or 2?",
        steps: [
          "(i) An \\(m \\times n\\) matrix has \\(mn\\) elements, so we need all ordered pairs of natural numbers with \\(mn = 12\\).",
          "The pairs are \\((1, 12), (2, 6), (3, 4), (4, 3), (6, 2), (12, 1)\\).",
          "So the possible orders are \\(1 \\times 12\\), \\(2 \\times 6\\), \\(3 \\times 4\\), \\(4 \\times 3\\), \\(6 \\times 2\\) and \\(12 \\times 1\\): six orders.",
          "(ii) A \\(2 \\times 2\\) matrix has 4 elements, and each can be filled in 3 ways.",
          "Number of matrices \\(= 3^4 = 81\\).",
        ],
        answer: "(i) Six orders: \\(1 \\times 12\\), \\(2 \\times 6\\), \\(3 \\times 4\\), \\(4 \\times 3\\), \\(6 \\times 2\\), \\(12 \\times 1\\). (ii) 81 matrices",
      },
      selfCheckExample: {
        prompt: "How many possible orders can a matrix with 7 elements have?",
        steps: ["7 is prime, so the only ordered pairs are \\((1, 7)\\) and \\((7, 1)\\)."],
        answer: "Two: \\(1 \\times 7\\) and \\(7 \\times 1\\)",
      },
      practiceSet: [
        {
          prompt: "A matrix has 4 rows and 2 columns. Write its order and the number of its elements.",
          answer: "Order \\(4 \\times 2\\); \\(4 \\times 2 = 8\\) elements",
        },
        {
          prompt: "How many matrices of order \\(2 \\times 3\\) can be formed if each element is 1 or -1?",
          answer: "There are 6 elements with 2 choices each, so \\(2^6 = 64\\) matrices",
        },
        {
          prompt: "A matrix has 16 elements. How many possible orders can it have?",
          answer: "Five: \\(1 \\times 16\\), \\(2 \\times 8\\), \\(4 \\times 4\\), \\(8 \\times 2\\), \\(16 \\times 1\\)",
        },
      ],
      pyqExampleId: "05a8305d-127e-4a8e-a493-d9d1fa389c65",
      traps: [
        {
          title: "Counting \\(2 \\times 6\\) and \\(6 \\times 2\\) as one order",
          body: "A matrix with 2 rows and 6 columns is a different matrix from one with 6 rows and 2 columns. Count ORDERED pairs \\((m, n)\\), so each factor pair gives two orders, except a pair like \\(4 \\times 4\\) where both numbers are the same.",
        },
        {
          title: "Writing the order as columns by rows",
          body: "The order is always rows first: a matrix with 3 rows and 4 columns is \\(3 \\times 4\\). In \\(a_{ij}\\) too, \\(i\\) is the row and \\(j\\) the column.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-construct",
      name: "Building a matrix from a rule for its elements",
      intuition:
        "Sometimes a matrix is given by a rule instead of a table: a formula that tells you the element in row i and column j. To build it, put the row number for i and the column number for j, one element at a time. Write the general matrix with its places a11, a12 and so on first, so that you never mix up a row with a column.",
      definition:
        "- For an \\(m \\times n\\) matrix, \\(i\\) runs over \\(1, 2, \\dots, m\\) (rows) and \\(j\\) over \\(1, 2, \\dots, n\\) (columns).\n" +
        "- Write the general matrix, then put \\(i\\) and \\(j\\) into the rule for each element.\n" +
        "- If the rule has an absolute value \\(|\\ |\\), every element comes out zero or positive.\n" +
        "- \\(a_{12}\\) and \\(a_{21}\\) usually differ: swapping \\(i\\) and \\(j\\) changes the value unless the rule treats them alike.",
      formula: {
        label: "Element from a rule",
        latex: "a_{ij} = f(i, j), \\qquad i = 1, 2, \\dots, m; \\quad j = 1, 2, \\dots, n",
      },
      authoredExample: {
        prompt: "Construct a \\(2 \\times 3\\) matrix \\(A = [a_{ij}]\\) whose elements are given by \\(a_{ij} = 3i - 2j\\).",
        steps: [
          "A \\(2 \\times 3\\) matrix is \\(A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\end{bmatrix}\\).",
          "Row 1 (\\(i = 1\\)): \\(a_{11} = 3 - 2 = 1\\), \\(a_{12} = 3 - 4 = -1\\), \\(a_{13} = 3 - 6 = -3\\).",
          "Row 2 (\\(i = 2\\)): \\(a_{21} = 6 - 2 = 4\\), \\(a_{22} = 6 - 4 = 2\\), \\(a_{23} = 6 - 6 = 0\\).",
          "Hence \\(A = \\begin{bmatrix} 1 & -1 & -3 \\\\ 4 & 2 & 0 \\end{bmatrix}\\).",
        ],
        answer: "\\(A = \\begin{bmatrix} 1 & -1 & -3 \\\\ 4 & 2 & 0 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "In the \\(3 \\times 3\\) matrix with \\(a_{ij} = i + 2j\\), find \\(a_{23}\\) and \\(a_{32}\\).",
        steps: ["\\(a_{23} = 2 + 6 = 8\\) and \\(a_{32} = 3 + 4 = 7\\)."],
        answer: "\\(a_{23} = 8\\), \\(a_{32} = 7\\)",
      },
      practiceSet: [
        {
          prompt: "Construct a \\(2 \\times 2\\) matrix with \\(a_{ij} = \\dfrac{(i - j)^2}{2}\\).",
          answer: "\\(\\begin{bmatrix} 0 & \\frac{1}{2} \\\\ \\frac{1}{2} & 0 \\end{bmatrix}\\)",
        },
        {
          prompt: "In the \\(2 \\times 3\\) matrix with \\(a_{ij} = i^2 - j\\), find the sum of the elements of the first row.",
          answer: "\\(a_{11} + a_{12} + a_{13} = 0 + (-1) + (-2) = -3\\)",
        },
        {
          prompt: "Construct a \\(1 \\times 3\\) matrix with \\(a_{ij} = |2i - 3j|\\).",
          answer: "\\(\\begin{bmatrix} 1 & 4 & 7 \\end{bmatrix}\\)",
        },
      ],
      pyqExampleId: "553d7f25-3a50-49cc-b770-5f0efb01c252",
      traps: [
        {
          title: "Putting the column number in place of i",
          body: "In \\(a_{ij}\\) the first index is the ROW. For \\(a_{31}\\) put \\(i = 3\\) and \\(j = 1\\). Swapping them gives \\(a_{13}\\), which is usually a different number.",
        },
        {
          title: "Dropping the absolute value or the fraction",
          body: "Work out the whole rule for every element: the bars make a negative value positive, and a factor such as \\(\\frac{1}{2}\\) multiplies every element. Leaving either out changes every answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbmmt-types",
      name: "Types of matrices",
      intuition:
        "The book names seven types of matrix. Some are named by their shape (row, column, square) and some by their elements (diagonal, scalar, identity, zero). A one-mark board question hands you a matrix and asks which type it is, or asks for the unknowns that make it a given type. Test each name against its definition, one at a time.",
      definition:
        "- In a square matrix of order \\(n\\), the elements \\(a_{11}, a_{22}, \\dots, a_{nn}\\) form its **diagonal**.\n" +
        "- A **diagonal** matrix needs only the elements off the diagonal to be zero. The diagonal elements may be anything, even zero.\n" +
        "- A **scalar** matrix is a diagonal matrix with all its diagonal elements equal: \\(kI\\).\n" +
        "- Every identity matrix is a scalar matrix, and every scalar matrix is a diagonal matrix. The reverse is not true.\n" +
        "- A \\(1 \\times 1\\) matrix is both a row matrix and a column matrix.",
      table: {
        columns: ["Type", "Test", "Example"],
        rows: [
          {
            cells: ["Column matrix", "Only one column: order \\(m \\times 1\\)", "\\(\\begin{bmatrix} 2 \\\\ 0 \\\\ 5 \\end{bmatrix}\\)"],
            pyqExampleId: "75baa3f3-ec59-4005-9926-a77247181dbc",
            noteAmber: "Board 2026 asked which order cannot belong to a column matrix (one with two columns).",
          },
          {
            cells: ["Row matrix", "Only one row: order \\(1 \\times n\\)", "\\(\\begin{bmatrix} 4 & -1 & 3 \\end{bmatrix}\\)"],
            pyqExampleId: "593dbeda-cbfa-4008-8f9b-5589cfb57823",
            noteAmber: "Board 2026 asked which order cannot belong to a row matrix (one with two rows).",
          },
          {
            cells: ["Square matrix", "Rows equal columns: \\(m = n\\)", "\\(\\begin{bmatrix} 1 & 6 \\\\ -2 & 0 \\end{bmatrix}\\)"],
            pyqExampleId: "be4748f9-884f-465d-b6c5-ebce81b7f529",
            noteAmber: "Board 2025 gave a 3 by 3 matrix that is not diagonal, scalar or skew symmetric: the only right name was square matrix.",
          },
          {
            cells: ["Diagonal matrix", "Square, and \\(b_{ij} = 0\\) when \\(i \\neq j\\)", "\\(\\begin{bmatrix} -3 & 0 \\\\ 0 & 2 \\end{bmatrix}\\)"],
            pyqExampleId: "4649839b-f365-4c27-a6af-821109287ae0",
            noteAmber: "Board 2026 asked for this definition, and 2024 (assertion-reason) tested that a diagonal matrix need not have zeros on its diagonal.",
          },
          {
            cells: ["Scalar matrix", "Diagonal, and all diagonal elements equal", "\\(\\begin{bmatrix} 4 & 0 \\\\ 0 & 4 \\end{bmatrix}\\)"],
            pyqExampleId: "a6a4a5ac-e32f-49af-8869-2f141c4c64b6",
            noteAmber: "Board 2025 (assertion-reason) gave diag[3 5 2] as a scalar matrix: false, its diagonal elements are not equal.",
          },
          {
            cells: ["Identity matrix", "Square, \\(a_{ij} = 1\\) when \\(i = j\\) and \\(a_{ij} = 0\\) when \\(i \\neq j\\)", "\\(I_2 = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\)"],
            pyqExampleId: "bc5d4d29-c3b1-4425-98f9-47c72cd345d2",
            noteAmber: "Board 2024 asked which rule for the elements describes the identity matrix.",
          },
          {
            cells: ["Zero (null) matrix", "Every element is zero; written \\(O\\)", "\\(\\begin{bmatrix} 0 & 0 & 0 \\end{bmatrix}\\)"],
          },
        ],
      },
      practiceSet: [
        {
          prompt: "Is \\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 0 & 0 \\end{bmatrix}\\) an identity matrix?",
          answer: "No. An identity matrix must be square, and this one is \\(3 \\times 2\\)",
        },
        {
          prompt: "How many scalar matrices of order 2 have every element 0 or 2?",
          answer: "Two: \\(kI\\) with \\(k = 0\\) or \\(k = 2\\)",
        },
        {
          prompt: "Is \\(\\begin{bmatrix} 0 & 0 \\\\ 0 & 7 \\end{bmatrix}\\) a diagonal matrix?",
          answer: "Yes. Both elements off the diagonal are zero; a zero on the diagonal is allowed",
        },
      ],
      pyqExampleId: "725df86d-438c-4bac-8858-0c21d636abe5",
      traps: [
        {
          title: "Thinking a diagonal matrix has zeros on its diagonal",
          body: "It is the elements OFF the diagonal that are zero. The diagonal elements of a diagonal matrix can be any numbers. Board 2024 set this as an assertion-reason item: the Reason said the diagonal elements are 0, and it was false.",
        },
        {
          title: "Calling every diagonal matrix scalar",
          body: "A scalar matrix needs all its diagonal elements EQUAL. A diagonal matrix with 3, 5 and 2 on its diagonal is diagonal but not scalar.",
        },
        {
          title: "Forgetting the zeros when you count or multiply elements",
          body: "A \\(3 \\times 3\\) scalar matrix has nine elements: three equal diagonal elements and six zeros. The sum of its elements is \\(3k\\), and the product of all nine is 0 because of the zeros.",
        },
      ],
    },
  ],
};
