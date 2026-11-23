import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_MX_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Solution of Linear Equations using Matrices",
  title: "Solving Linear Equations by Matrices",
  oneLineDefinition:
    "Writing a system of linear equations as AX = B, then solving it by the method of inversion (X = A⁻¹B) or by the method of reduction (row transformations on A and B together), including word problems.",
  whyItMatters:
    "38 questions, four of them from board papers, each a full written answer: three equations by the method of reduction (2020, 2024), by the method of inversion (2022), and a word problem on three numbers to be found by the matrix method (2025). The textbook rows are Exercise 2.3, its solved examples and Part II of Miscellaneous Exercise 2(B), with many problems on costs, numbers and investments.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmmx-inversion",
      name: "The method of inversion: X = A⁻¹B",
      intuition:
        "A system of linear equations is one matrix equation in disguise: the coefficients make a square matrix A, the unknowns a column X, and the right-hand numbers a column B. If A has an inverse, multiply both sides by A⁻¹ on the left and the column of unknowns appears on its own.",
      definition:
        "- Write the equations with the unknowns in the same order, then \\(AX = B\\): \\(A\\) the matrix of coefficients, \\(X\\) the column of variables, \\(B\\) the column of constants.\n" +
        "- For three equations in three variables, \\(A\\) is 3 by 3, \\(X\\) and \\(B\\) are 3 by 1.\n" +
        "- Find \\(|A|\\); if \\(|A| \\neq 0\\), \\(A^{-1}\\) exists (by the adjoint method or by transformations).\n" +
        "- Pre-multiply by \\(A^{-1}\\): \\(A^{-1}AX = A^{-1}B\\), so \\(X = A^{-1}B\\).\n" +
        "- Multiply out, then 'by equality of matrices' write \\(x\\), \\(y\\), \\(z\\).",
      formula: {
        label: "Method of inversion",
        latex: "AX = B \\;\\Rightarrow\\; X = A^{-1}B \\quad (|A| \\neq 0)",
        symbols: [
          { symbol: "\\(A\\)", meaning: "matrix of coefficients of the variables" },
          { symbol: "\\(X\\)", meaning: "column matrix of the variables" },
          { symbol: "\\(B\\)", meaning: "column matrix of the constants" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(3x + 2y = 7\\) and \\(x + y = 3\\) by the method of inversion.",
        steps: [
          "Matrix form: \\(\\begin{bmatrix} 3 & 2 \\\\ 1 & 1 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ 3 \\end{bmatrix}\\), that is \\(AX = B\\).",
          "\\(|A| = 3 - 2 = 1 \\neq 0\\), so \\(A^{-1}\\) exists.",
          "\\(\\text{adj}\\,A = \\begin{bmatrix} 1 & -2 \\\\ -1 & 3 \\end{bmatrix}\\), so \\(A^{-1} = \\dfrac{1}{1}\\begin{bmatrix} 1 & -2 \\\\ -1 & 3 \\end{bmatrix}\\).",
          "\\(X = A^{-1}B = \\begin{bmatrix} 1 & -2 \\\\ -1 & 3 \\end{bmatrix}\\begin{bmatrix} 7 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 7 - 6 \\\\ -7 + 9 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}\\).",
          "By equality of matrices, \\(x = 1\\) and \\(y = 2\\).",
          "Check: \\(3(1) + 2(2) = 7\\) and \\(1 + 2 = 3\\).",
        ],
        answer: "\\(x = 1\\), \\(y = 2\\)",
      },
      selfCheckExample: {
        prompt: "Write \\(x + 2y - z = 3\\), \\(2x - y = 1\\), \\(y + 3z = 4\\) in the form \\(AX = B\\).",
        steps: ["Fill a 0 where a variable is missing: \\(2x - y + 0z = 1\\) and \\(0x + y + 3z = 4\\)."],
        answer:
          "\\(\\begin{bmatrix} 1 & 2 & -1 \\\\ 2 & -1 & 0 \\\\ 0 & 1 & 3 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 1 \\\\ 4 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "For three equations in three variables written as \\(AX = B\\), what are the orders of \\(A\\), \\(X\\) and \\(B\\)?", answer: "3 by 3, 3 by 1 and 3 by 1" },
        { prompt: "Can the method of inversion be used when \\(|A| = 0\\)?", answer: "No, \\(A^{-1}\\) does not exist" },
        {
          prompt: "In \\(AX = B\\), \\(A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}\\). Find \\(x\\) and \\(y\\).",
          answer: "\\(X = \\begin{bmatrix} 6 - 4 \\\\ -3 + 4 \\end{bmatrix}\\), so \\(x = 2\\), \\(y = 1\\)",
        },
      ],
      pyqExampleId: "598480df-cc90-4ccb-b5ae-418d31cf9269",
      traps: [
        {
          title: "Writing X = BA⁻¹",
          body: "\\(B\\) is a column matrix, so \\(BA^{-1}\\) cannot even be multiplied. Pre-multiply: \\(X = A^{-1}B\\).",
        },
        {
          title: "Stopping at the column matrix",
          body: "End with 'by equality of matrices, \\(x = \\ldots\\), \\(y = \\ldots\\), \\(z = \\ldots\\)'. A column of numbers is not yet the answer to 'solve'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-reduction",
      name: "The method of reduction",
      intuition:
        "Here you never find an inverse. Instead you use row transformations to clear the coefficients below the diagonal, doing exactly the same to the column of constants. The last equation then has one unknown, the one above it two, and you climb back up, finding one unknown at a time.",
      definition:
        "- Write the system as \\(AX = B\\).\n" +
        "- Apply row transformations to \\(A\\) to make it upper triangular (or lower triangular, or diagonal).\n" +
        "- Apply each transformation to \\(B\\) at the same time; \\(X\\) is untouched.\n" +
        "- Rewrite the result as equations and solve from the last one upwards.\n" +
        "- Check the answer in all the original equations.",
      formula: {
        label: "Method of reduction",
        latex: "AX = B \\ \\xrightarrow{\\text{same row transformations on } A \\text{ and } B}\\ \\begin{bmatrix} a & b & c \\\\ 0 & e & f \\\\ 0 & 0 & i \\end{bmatrix}X = B'",
      },
      authoredExample: {
        prompt: "Solve by the method of reduction: \\(x + y + z = 3\\), \\(2x - y + z = 2\\), \\(x + 2y - z = 2\\).",
        steps: [
          "\\(\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & -1 & 1 \\\\ 1 & 2 & -1 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 2 \\\\ 2 \\end{bmatrix}\\).",
          "\\(R_2 \\to R_2 - 2R_1\\) and \\(R_3 \\to R_3 - R_1\\): \\(\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & -3 & -1 \\\\ 0 & 1 & -2 \\end{bmatrix}X = \\begin{bmatrix} 3 \\\\ -4 \\\\ -1 \\end{bmatrix}\\).",
          "\\(R_2 \\leftrightarrow R_3\\): \\(\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & -2 \\\\ 0 & -3 & -1 \\end{bmatrix}X = \\begin{bmatrix} 3 \\\\ -1 \\\\ -4 \\end{bmatrix}\\).",
          "\\(R_3 \\to R_3 + 3R_2\\): \\(\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & -2 \\\\ 0 & 0 & -7 \\end{bmatrix}X = \\begin{bmatrix} 3 \\\\ -1 \\\\ -7 \\end{bmatrix}\\).",
          "So \\(-7z = -7\\), giving \\(z = 1\\); \\(y - 2z = -1\\), giving \\(y = 1\\); \\(x + y + z = 3\\), giving \\(x = 1\\).",
          "Check: \\(2 - 1 + 1 = 2\\) and \\(1 + 2 - 1 = 2\\).",
        ],
        answer: "\\(x = 1\\), \\(y = 1\\), \\(z = 1\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(x + 2y = 5\\) and \\(3x + y = 5\\) by the method of reduction.",
        steps: [
          "\\(\\begin{bmatrix} 1 & 2 \\\\ 3 & 1 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 5 \\end{bmatrix}\\).",
          "\\(R_2 \\to R_2 - 3R_1\\): \\(\\begin{bmatrix} 1 & 2 \\\\ 0 & -5 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ -10 \\end{bmatrix}\\).",
          "\\(-5y = -10\\), so \\(y = 2\\); then \\(x + 4 = 5\\), so \\(x = 1\\).",
        ],
        answer: "\\(x = 1\\), \\(y = 2\\)",
      },
      practiceSet: [
        { prompt: "In the method of reduction, which transformations are used, and on which matrices?", answer: "Row transformations, applied to \\(A\\) and to \\(B\\) together" },
        {
          prompt: "After reduction a system reads \\(\\begin{bmatrix} 1 & 1 \\\\ 0 & 2 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 6 \\end{bmatrix}\\). Find \\(x\\) and \\(y\\).",
          answer: "\\(2y = 6\\), so \\(y = 3\\); \\(x + 3 = 4\\), so \\(x = 1\\)",
        },
      ],
      pyqExampleId: "342e91d8-0574-4ce6-8ad0-1e72ff9d33f4",
      traps: [
        {
          title: "Transforming A but not B",
          body: "Every row transformation must be done to the column of constants too. If \\(B\\) is left behind, the equations you read off are false.",
        },
        {
          title: "Using a column transformation",
          body: "A column move on \\(A\\) mixes up the variables, so the method of reduction uses row transformations only, as the textbook does.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-word-problems",
      name: "Word problems: forming the equations",
      intuition:
        "In a word problem most of the marks are for turning sentences into equations. Name the unknowns, turn each sentence into one equation, put the equations in standard form, and only then use the matrix method the question asks for. Finish by answering the question in words, with units.",
      definition:
        "- Start with 'Let the numbers (or costs) be \\(x\\), \\(y\\), \\(z\\)'.\n" +
        "- One sentence gives one equation. 'The sum of the first and third is double the second' gives \\(x + z = 2y\\).\n" +
        "- Standard form: all variables on the left in the order \\(x, y, z\\), the constant on the right, 0 for a missing variable.\n" +
        "- Solve by inversion or by reduction, whichever the question names; if it says only 'using matrices', either is fine.\n" +
        "- State the answer in words, with units such as Rs, and check it against every sentence.",
      formula: {
        label: "Plan for a word problem",
        latex: "\\text{sentences} \\to \\text{equations} \\to AX = B \\to X",
      },
      authoredExample: {
        prompt:
          "The sum of three numbers is 9. The second number is 1 more than the first, and the third number is twice the first. Find the numbers using matrices.",
        steps: [
          "Let the numbers be \\(x\\), \\(y\\), \\(z\\). Then \\(x + y + z = 9\\), \\(y = x + 1\\), \\(z = 2x\\).",
          "Standard form: \\(x + y + z = 9\\), \\(x - y = -1\\), \\(2x - z = 0\\).",
          "\\(\\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & -1 & 0 \\\\ 2 & 0 & -1 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = \\begin{bmatrix} 9 \\\\ -1 \\\\ 0 \\end{bmatrix}\\).",
          "\\(R_2 \\to R_2 - R_1\\) and \\(R_3 \\to R_3 - 2R_1\\): \\(\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & -2 & -1 \\\\ 0 & -2 & -3 \\end{bmatrix}X = \\begin{bmatrix} 9 \\\\ -10 \\\\ -18 \\end{bmatrix}\\).",
          "\\(R_3 \\to R_3 - R_2\\): \\(\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & -2 & -1 \\\\ 0 & 0 & -2 \\end{bmatrix}X = \\begin{bmatrix} 9 \\\\ -10 \\\\ -8 \\end{bmatrix}\\).",
          "\\(-2z = -8\\), so \\(z = 4\\); \\(-2y - 4 = -10\\), so \\(y = 3\\); \\(x + 3 + 4 = 9\\), so \\(x = 2\\).",
          "Check: \\(3 = 2 + 1\\) and \\(4 = 2 \\times 2\\).",
        ],
        answer: "The numbers are 2, 3 and 4",
      },
      selfCheckExample: {
        prompt: "2 pens and 3 pencils cost Rs 26; 3 pens and 2 pencils cost Rs 29. Write the matrix equation and find the cost of each.",
        steps: [
          "Let a pen cost Rs \\(x\\) and a pencil Rs \\(y\\): \\(\\begin{bmatrix} 2 & 3 \\\\ 3 & 2 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 26 \\\\ 29 \\end{bmatrix}\\).",
          "\\(|A| = 4 - 9 = -5\\), \\(X = -\\dfrac{1}{5}\\begin{bmatrix} 2 & -3 \\\\ -3 & 2 \\end{bmatrix}\\begin{bmatrix} 26 \\\\ 29 \\end{bmatrix} = -\\dfrac{1}{5}\\begin{bmatrix} -35 \\\\ -20 \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ 4 \\end{bmatrix}\\).",
        ],
        answer: "A pen costs Rs 7 and a pencil Rs 4",
      },
      practiceSet: [
        { prompt: "Write as an equation: three times the first number exceeds the third number by 4.", answer: "\\(3x - z = 4\\)" },
        {
          prompt: "Rs 1000 is split into two parts at 5% and 10% simple interest a year, and the yearly interest is Rs 70. Write the two equations and find the parts.",
          answer: "\\(x + y = 1000\\), \\(0.05x + 0.10y = 70\\); Rs 600 at 5% and Rs 400 at 10%",
        },
      ],
      pyqExampleId: "e42a6431-15da-438f-8344-9e2445a24e03",
      traps: [
        {
          title: "Leaving an equation out of standard form",
          body: "An equation like \\(x = 3y - z\\) must become \\(x - 3y + z = 0\\) before it goes into \\(A\\) and \\(B\\). Putting it in as it stands puts wrong numbers in the matrix.",
        },
        {
          title: "No 'Let' line and no final sentence",
          body: "Say what \\(x\\), \\(y\\) and \\(z\\) stand for at the start, and end with a sentence that answers the question with units, such as 'a pen costs Rs 7'.",
        },
      ],
    },
  ],
};
