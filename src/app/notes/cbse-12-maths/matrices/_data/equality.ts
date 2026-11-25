import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_MT_EQUALITY_NOTE: SubtopicNote = {
  subtopicName: "Equality of Matrices",
  title: "Equality of Matrices",
  oneLineDefinition:
    "Two matrices are equal when they have the same order and every pair of corresponding elements is equal, and how comparing elements turns a matrix equation into ordinary equations.",
  whyItMatters:
    "16 questions, four of them from board papers. The board gives two equal matrices with unknowns in them and asks for a value built from the unknowns: x + y and xy giving a sum of fractions (2024), an unknown fixed twice beside a squared unknown that gives two values (2025), two unknowns fixed by four equations (2025), and a sum of two column matrices with unknown multipliers (2023). The textbook adds the equations of Exercise 3.1 and the scalar-multiple equations of Exercise 3.2.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmmt-equal",
      name: "Equal matrices: compare every element",
      intuition:
        "Two matrices are equal only if they are the same table: the same size, and the same number in every place. So an equation between two matrices is really one equation for every place. Write each of them down, solve, and then put your values back into the equations you did not use: if one of them fails, no values make the matrices equal.",
      definition:
        "- \\(A = [a_{ij}]\\) and \\(B = [b_{ij}]\\) are **equal** if (i) they have the same order and (ii) \\(a_{ij} = b_{ij}\\) for all \\(i\\) and \\(j\\).\n" +
        "- Two \\(2 \\times 2\\) matrices give four equations; two \\(3 \\times 3\\) matrices give nine.\n" +
        "- When an unknown appears in more than one place, every one of those equations must hold. If two of them give different values, the matrices can never be equal.\n" +
        "- A squared unknown such as \\(y^2 = 16\\) gives two values; keep both unless another element rules one out.\n" +
        "- Matrices of different orders are never equal.",
      formula: {
        label: "Equality of two matrices",
        latex: "[a_{ij}]_{m \\times n} = [b_{ij}]_{m \\times n} \\text{ means } a_{ij} = b_{ij} \\text{ for all } i, j",
      },
      authoredExample: {
        prompt:
          "Find \\(a, b, c\\) and \\(d\\) if \\(\\begin{bmatrix} a + b & 2c - d \\\\ a - b & c + d \\end{bmatrix} = \\begin{bmatrix} 7 & 3 \\\\ 1 & 9 \\end{bmatrix}\\).",
        steps: [
          "The matrices are equal, so their corresponding elements are equal:",
          "\\(a + b = 7\\) ... (1), \\(a - b = 1\\) ... (2), \\(2c - d = 3\\) ... (3), \\(c + d = 9\\) ... (4).",
          "Adding (1) and (2): \\(2a = 8\\), so \\(a = 4\\); then \\(b = 7 - 4 = 3\\).",
          "Adding (3) and (4): \\(3c = 12\\), so \\(c = 4\\); then \\(d = 9 - 4 = 5\\).",
          "Check in (1) and (4): \\(4 + 3 = 7\\) and \\(4 + 5 = 9\\).",
        ],
        answer: "\\(a = 4,\\ b = 3,\\ c = 4,\\ d = 5\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\begin{bmatrix} x & 4 \\\\ 2 & z \\end{bmatrix} = \\begin{bmatrix} 6 & y \\\\ 2 & -1 \\end{bmatrix}\\), find \\(x, y, z\\).",
        steps: ["Compare elements in the same places."],
        answer: "\\(x = 6,\\ y = 4,\\ z = -1\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(x\\) if \\(\\begin{bmatrix} x^2 & 1 \\\\ 0 & x + 2 \\end{bmatrix} = \\begin{bmatrix} 4 & 1 \\\\ 0 & 0 \\end{bmatrix}\\).",
          answer: "\\(x^2 = 4\\) gives \\(x = \\pm 2\\), but \\(x + 2 = 0\\) needs \\(x = -2\\). So \\(x = -2\\)",
        },
        {
          prompt: "Can \\(\\begin{bmatrix} 2x & 1 \\\\ 3 & x + 1 \\end{bmatrix}\\) equal \\(\\begin{bmatrix} 4 & 1 \\\\ 3 & 5 \\end{bmatrix}\\)?",
          answer: "No. \\(2x = 4\\) gives \\(x = 2\\) but \\(x + 1 = 5\\) gives \\(x = 4\\); no value satisfies both",
        },
        {
          prompt: "Can a \\(2 \\times 3\\) matrix be equal to a \\(3 \\times 2\\) matrix?",
          answer: "No. Equal matrices must have the same order",
        },
      ],
      pyqExampleId: "a1eb6ff3-470d-48b9-bc34-63c4380fdc17",
      traps: [
        {
          title: "Solving from one element and stopping",
          body: "When an unknown appears in two places, test the value in both. If they disagree, the answer is that the matrices cannot be equal. The textbook's MCQ (Exercise 3.1 Q9) has exactly this answer: not possible to find.",
        },
        {
          title: "Keeping only the positive root",
          body: "From \\(y^2 = k\\) you get \\(y = \\pm\\sqrt{k}\\). Unless another element rules one out, both values stand, and an expression like \\(x - y\\) then has two values.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-equal-ops",
      name: "Matrix equations with sums and scalar multiples",
      intuition:
        "Often the two sides are not single matrices but sums and multiples of matrices. Work each side out into one matrix first: multiply every element by its scalar, add elements in the same places. Then compare elements, as for any two equal matrices.",
      definition:
        "- First simplify each side into a single matrix: \\(kA\\) multiplies every element of \\(A\\) by \\(k\\); \\(A + B\\) adds elements in the same places.\n" +
        "- Then equate corresponding elements and solve the equations, one per place.\n" +
        "- A sum like \\(x\\begin{bmatrix} a \\\\ c \\end{bmatrix} + y\\begin{bmatrix} b \\\\ d \\end{bmatrix}\\) is the column \\(\\begin{bmatrix} ax + by \\\\ cx + dy \\end{bmatrix}\\): equating it to a column gives two simultaneous equations.",
      formula: {
        label: "Simplify, then compare",
        latex: "k[a_{ij}] + [b_{ij}] = [k a_{ij} + b_{ij}]",
      },
      authoredExample: {
        prompt:
          "Find \\(x\\) and \\(y\\) if \\(3\\begin{bmatrix} x & 2 \\\\ 1 & y \\end{bmatrix} - \\begin{bmatrix} 4 & 1 \\\\ 0 & 5 \\end{bmatrix} = \\begin{bmatrix} 8 & 5 \\\\ 3 & 7 \\end{bmatrix}\\).",
        steps: [
          "Left side: \\(\\begin{bmatrix} 3x & 6 \\\\ 3 & 3y \\end{bmatrix} - \\begin{bmatrix} 4 & 1 \\\\ 0 & 5 \\end{bmatrix} = \\begin{bmatrix} 3x - 4 & 5 \\\\ 3 & 3y - 5 \\end{bmatrix}\\).",
          "Equate with \\(\\begin{bmatrix} 8 & 5 \\\\ 3 & 7 \\end{bmatrix}\\): \\(3x - 4 = 8\\) and \\(3y - 5 = 7\\).",
          "So \\(3x = 12\\), \\(x = 4\\), and \\(3y = 12\\), \\(y = 4\\).",
          "The other two places give \\(5 = 5\\) and \\(3 = 3\\), so the values are consistent.",
        ],
        answer: "\\(x = 4,\\ y = 4\\)",
      },
      selfCheckExample: {
        prompt: "If \\(2\\begin{bmatrix} x & 0 \\\\ 1 & y \\end{bmatrix} = \\begin{bmatrix} 6 & 0 \\\\ 2 & -8 \\end{bmatrix}\\), find \\(x\\) and \\(y\\).",
        steps: ["\\(2x = 6\\) and \\(2y = -8\\)."],
        answer: "\\(x = 3,\\ y = -4\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(a\\) and \\(b\\) if \\(\\begin{bmatrix} a & 1 \\end{bmatrix} + 2\\begin{bmatrix} 3 & b \\end{bmatrix} = \\begin{bmatrix} 10 & 7 \\end{bmatrix}\\).",
          answer: "\\(a + 6 = 10\\) and \\(1 + 2b = 7\\), so \\(a = 4,\\ b = 3\\)",
        },
        {
          prompt: "Find \\(p\\) if \\(\\begin{bmatrix} p & 2 \\end{bmatrix} + \\begin{bmatrix} 5 & p \\end{bmatrix} = \\begin{bmatrix} 9 & 6 \\end{bmatrix}\\).",
          answer: "\\(p + 5 = 9\\) and \\(2 + p = 6\\) both give \\(p = 4\\)",
        },
        {
          prompt: "Find the matrix \\(X\\) if \\(2X + \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 5 & 2 \\\\ 0 & 3 \\end{bmatrix}\\).",
          answer: "\\(2X = \\begin{bmatrix} 4 & 2 \\\\ 0 & 2 \\end{bmatrix}\\), so \\(X = \\begin{bmatrix} 2 & 1 \\\\ 0 & 1 \\end{bmatrix}\\)",
        },
      ],
      pyqExampleId: "1106f212-bb78-4ece-a20a-3890f8f8bf1b",
      traps: [
        {
          title: "Multiplying only the first element by the scalar",
          body: "\\(3\\begin{bmatrix} x & 2 \\\\ 1 & y \\end{bmatrix}\\) is \\(\\begin{bmatrix} 3x & 6 \\\\ 3 & 3y \\end{bmatrix}\\): every element is multiplied, the numbers as well as the unknowns.",
        },
        {
          title: "Adding the column multipliers instead of solving",
          body: "In \\(x\\begin{bmatrix} a \\\\ c \\end{bmatrix} + y\\begin{bmatrix} b \\\\ d \\end{bmatrix}\\) each ROW of the result gives one equation in both \\(x\\) and \\(y\\). Solve the two equations together; then check your answer in both.",
        },
      ],
    },
  ],
};
