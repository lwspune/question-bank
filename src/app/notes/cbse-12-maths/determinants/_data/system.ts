import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DT_SYSTEM_NOTE: SubtopicNote = {
  subtopicName: "Solving System of Linear Equations",
  title: "Solving a System of Linear Equations by the Matrix Method",
  oneLineDefinition:
    "A system of linear equations is written as AX = B; if |A| ≠ 0 it has the unique solution X = A⁻¹B, and if |A| = 0 the product (adj A)B decides whether it can have a solution.",
  whyItMatters:
    "54 questions, thirty-three of them from board papers: five in 2023, twelve in 2024, nine in 2025 and seven in 2026. The five-mark question is here: find A⁻¹ and use it to solve three equations (2023, 2024, 2026), several times with a coefficient matrix that is the transpose of the A given; or multiply two given matrices, get a multiple of I and use it to solve the system (every year from 2023 to 2026). Word problems on prices, clubs, investments and speeds came in 2025 and 2026, and case studies that ask for the equations, the matrix form and the solution in every year. The board also asked when a system is consistent (2024, 2025). The textbook adds Exercise 4.5, Examples 16 to 19 and Miscellaneous Question 7.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmdt-consistency",
      name: "Consistent and inconsistent systems",
      intuition:
        "Before solving, ask whether a solution can exist. If \\(|A| \\ne 0\\), the inverse exists and there is exactly one solution. If \\(|A| = 0\\), compute \\((\\operatorname{adj} A)B\\): a non-zero answer means no solution at all, while a zero answer leaves the question open.",
      definition:
        "- A system is **consistent** if it has a solution (one or more), and **inconsistent** if it has none.\n" +
        "- Write it as \\(AX = B\\): \\(A\\) the coefficient matrix, \\(X\\) the column of unknowns, \\(B\\) the column of constants.\n" +
        "- **Case 1:** \\(|A| \\ne 0\\). The system is consistent with a unique solution.\n" +
        "- **Case 2:** \\(|A| = 0\\) and \\((\\operatorname{adj} A)B \\ne O\\). No solution: inconsistent.\n" +
        "- **Case 3:** \\(|A| = 0\\) and \\((\\operatorname{adj} A)B = O\\). The system may be consistent (infinitely many solutions) or inconsistent (no solution).",
      formula: {
        label: "Test for a unique solution",
        latex: "|A| \\ne 0 \\;\\Rightarrow\\; X = A^{-1}B \\text{ is the unique solution of } AX = B",
      },
      authoredExample: {
        prompt: "Examine the consistency of the system \\(x + 2y = 3\\), \\(2x + 4y = 7\\).",
        steps: [
          "\\(A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}\\), \\(B = \\begin{bmatrix} 3 \\\\ 7 \\end{bmatrix}\\).",
          "\\(|A| = 4 - 4 = 0\\), so find \\((\\operatorname{adj} A)B\\).",
          "\\(\\operatorname{adj} A = \\begin{bmatrix} 4 & -2 \\\\ -2 & 1 \\end{bmatrix}\\).",
          "\\((\\operatorname{adj} A)B = \\begin{bmatrix} 12 - 14 \\\\ -6 + 7 \\end{bmatrix} = \\begin{bmatrix} -2 \\\\ 1 \\end{bmatrix} \\ne O\\).",
          "\\(|A| = 0\\) and \\((\\operatorname{adj} A)B \\ne O\\), so the system is inconsistent.",
        ],
        answer: "Inconsistent: no solution",
      },
      selfCheckExample: {
        prompt: "Examine the consistency of \\(x + y + z = 3\\), \\(2x - y + z = 2\\), \\(x + 2y - z = 2\\).",
        steps: [
          "\\(|A| = \\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & -1 & 1 \\\\ 1 & 2 & -1 \\end{vmatrix} = 1(1 - 2) - 1(-2 - 1) + 1(4 + 1)\\).",
          "\\(= -1 + 3 + 5 = 7 \\ne 0\\).",
          "So \\(A\\) is non-singular and the system has a unique solution: it is consistent.",
        ],
        answer: "Consistent, with a unique solution",
      },
      practiceSet: [
        { prompt: "Examine the consistency of \\(x + y = 1\\), \\(3x + 3y = 5\\).", answer: "Inconsistent", method: "\\(|A| = 0\\) and \\((\\operatorname{adj} A)B = \\begin{bmatrix} -2 \\\\ 2 \\end{bmatrix} \\ne O\\)" },
        { prompt: "For \\(x - y = 2\\), \\(2x - 2y = 4\\), find \\(|A|\\) and \\((\\operatorname{adj} A)B\\).", answer: "Both are zero; the system has infinitely many solutions, so it is consistent." },
        { prompt: "State the condition on \\(A\\) for \\(AX = B\\) to have a unique solution.", answer: "\\(|A| \\ne 0\\)" },
      ],
      pyqExampleId: "03536421-e3a5-40ea-8781-7f657429d95d",
      traps: [
        {
          title: "Calling every singular system inconsistent",
          body: "\\(|A| = 0\\) alone decides nothing. Only \\(|A| = 0\\) with \\((\\operatorname{adj} A)B \\ne O\\) proves there is no solution.",
        },
        {
          title: "Writing X = BA⁻¹",
          body: "\\(B\\) is a column, so \\(BA^{-1}\\) is not even a defined product. The solution is \\(X = A^{-1}B\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-matrix-method",
      name: "Solving AX = B by X = A⁻¹B",
      intuition:
        "Three equations become one matrix equation \\(AX = B\\). Multiply both sides on the left by \\(A^{-1}\\) and \\(X\\) stands alone: \\(X = A^{-1}B\\). All the work is finding \\(A^{-1}\\), which the previous page taught; the last step is one matrix times a column.",
      definition:
        "- Write \\(A\\) with the coefficients of \\(x\\), \\(y\\), \\(z\\) in that order, row by row; put a 0 for a missing unknown.\n" +
        "- Find \\(|A|\\), state \\(|A| \\ne 0\\), so \\(A^{-1}\\) exists and the solution is unique.\n" +
        "- Find the cofactors, \\(\\operatorname{adj} A\\) and \\(A^{-1}\\).\n" +
        "- \\(X = A^{-1}B\\): multiply, then read off \\(x\\), \\(y\\), \\(z\\).\n" +
        "- Check the answer in the equations.\n" +
        "- **Transposed systems:** if the question gives \\(A\\) but the equations' coefficient matrix is \\(A'\\), use \\((A')^{-1} = (A^{-1})'\\), so \\(X = (A^{-1})'B\\).\n" +
        "- **Unknowns in the denominator:** for \\(\\dfrac{2}{x} + \\dfrac{3}{y} + \\dfrac{10}{z} = 4\\) and the like, put \\(u = \\dfrac{1}{x}\\), \\(v = \\dfrac{1}{y}\\), \\(w = \\dfrac{1}{z}\\), solve for \\(u, v, w\\), then take reciprocals.",
      formula: {
        label: "Matrix method",
        latex: "AX = B,\\ |A| \\ne 0 \\;\\Rightarrow\\; X = A^{-1}B = \\dfrac{1}{|A|}(\\operatorname{adj} A)B",
      },
      authoredExample: {
        prompt: "Solve by the matrix method: \\(x + y + 2z = 4\\), \\(2x - y + 3z = 9\\), \\(3x - y - z = 2\\).",
        steps: [
          "\\(A = \\begin{bmatrix} 1 & 1 & 2 \\\\ 2 & -1 & 3 \\\\ 3 & -1 & -1 \\end{bmatrix}\\), \\(X = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}\\), \\(B = \\begin{bmatrix} 4 \\\\ 9 \\\\ 2 \\end{bmatrix}\\), so \\(AX = B\\).",
          "\\(|A| = 1(1 + 3) - 1(-2 - 9) + 2(-2 + 3) = 4 + 11 + 2 = 17 \\ne 0\\), so the system has a unique solution.",
          "\\(A_{11} = 4\\), \\(A_{12} = 11\\), \\(A_{13} = 1\\); \\(A_{21} = -1\\), \\(A_{22} = -7\\), \\(A_{23} = 4\\); \\(A_{31} = 5\\), \\(A_{32} = 1\\), \\(A_{33} = -3\\).",
          "\\(\\operatorname{adj} A = \\begin{bmatrix} 4 & -1 & 5 \\\\ 11 & -7 & 1 \\\\ 1 & 4 & -3 \\end{bmatrix}\\), so \\(A^{-1} = \\dfrac{1}{17}\\begin{bmatrix} 4 & -1 & 5 \\\\ 11 & -7 & 1 \\\\ 1 & 4 & -3 \\end{bmatrix}\\).",
          "\\(X = A^{-1}B = \\dfrac{1}{17}\\begin{bmatrix} 16 - 9 + 10 \\\\ 44 - 63 + 2 \\\\ 4 + 36 - 6 \\end{bmatrix} = \\dfrac{1}{17}\\begin{bmatrix} 17 \\\\ -17 \\\\ 34 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ -1 \\\\ 2 \\end{bmatrix}\\).",
          "\\(\\therefore x = 1\\), \\(y = -1\\), \\(z = 2\\).",
          "Check: \\(1 - 1 + 4 = 4\\), \\(2 + 1 + 6 = 9\\), \\(3 + 1 - 2 = 2\\).",
        ],
        answer: "\\(x = 1,\\ y = -1,\\ z = 2\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A = \\begin{bmatrix} 1 & 2 \\\\ 3 & -1 \\end{bmatrix}\\), find \\(A^{-1}\\) and use it to solve \\(x + 3y = 5\\), \\(2x - y = 3\\).",
        steps: [
          "\\(|A| = -1 - 6 = -7\\), so \\(A^{-1} = -\\dfrac{1}{7}\\begin{bmatrix} -1 & -2 \\\\ -3 & 1 \\end{bmatrix} = \\dfrac{1}{7}\\begin{bmatrix} 1 & 2 \\\\ 3 & -1 \\end{bmatrix}\\).",
          "The coefficient matrix of the equations is \\(\\begin{bmatrix} 1 & 3 \\\\ 2 & -1 \\end{bmatrix} = A'\\), so the system is \\(A'X = B\\).",
          "\\(X = (A')^{-1}B = (A^{-1})'B = \\dfrac{1}{7}\\begin{bmatrix} 1 & 3 \\\\ 2 & -1 \\end{bmatrix}\\begin{bmatrix} 5 \\\\ 3 \\end{bmatrix} = \\dfrac{1}{7}\\begin{bmatrix} 14 \\\\ 7 \\end{bmatrix}\\).",
          "\\(\\therefore x = 2\\), \\(y = 1\\).",
        ],
        answer: "\\(x = 2,\\ y = 1\\)",
      },
      practiceSet: [
        { prompt: "Solve by the matrix method: \\(x + y = 5\\), \\(2x - 3y = 0\\).", answer: "\\(x = 3,\\ y = 2\\)" },
        { prompt: "Solve: \\(\\dfrac{2}{x} + \\dfrac{3}{y} = 13\\), \\(\\dfrac{5}{x} - \\dfrac{4}{y} = -2\\).", answer: "\\(x = \\dfrac{1}{2},\\ y = \\dfrac{1}{3}\\)", method: "\\(u = 2\\), \\(v = 3\\)" },
        { prompt: "Solve by the matrix method: \\(x - y + z = 1\\), \\(2x + y - z = 2\\), \\(x - 2y - z = 4\\).", answer: "\\(x = 1,\\ y = -1,\\ z = -1\\)" },
      ],
      pyqExampleId: "7fb82fe1-d5ba-44fd-8540-ec834e1f0e79",
      traps: [
        {
          title: "Using A when the equations use A′",
          body: "Read the equations' coefficients row by row and compare with the \\(A\\) given. If its rows have become columns, the system is \\(A'X = B\\) and you need \\((A^{-1})'\\), not \\(A^{-1}\\).",
        },
        {
          title: "Multiplying in the wrong order",
          body: "\\(X = A^{-1}B\\): the matrix on the left, the column on the right. A product \\(BA^{-1}\\) cannot even be formed.",
        },
        {
          title: "Stopping at u, v, w",
          body: "With the substitution \\(u = \\dfrac{1}{x}\\), the answer \\(u = 2\\) means \\(x = \\dfrac{1}{2}\\). Take the reciprocal before you write the final line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-product-inverse",
      name: "Using a given product AB = kI to solve a system",
      intuition:
        "If two given matrices multiply to \\(kI\\), each is \\(k\\) times the inverse of the other. The board hands you the inverse this way, so no cofactors are needed: multiply, spot the multiple of \\(I\\), and solve.",
      definition:
        "- Multiply the two given matrices in the order asked and show that the product is \\(kI\\).\n" +
        "- \\(AB = kI\\) gives \\(A\\left(\\dfrac{1}{k}B\\right) = I\\), so \\(A^{-1} = \\dfrac{1}{k}B\\). In the same way \\(B^{-1} = \\dfrac{1}{k}A\\).\n" +
        "- Match the equations' coefficient matrix with \\(A\\), with \\(B\\), or with a transpose of one of them, before you choose the inverse.\n" +
        "- Then \\(X = (\\text{inverse})C\\), where \\(C\\) is the column of constants.",
      formula: {
        label: "Inverse from a product",
        latex: "AB = kI,\\ k \\ne 0 \\;\\Rightarrow\\; A^{-1} = \\dfrac{1}{k}B, \\quad B^{-1} = \\dfrac{1}{k}A",
      },
      authoredExample: {
        prompt: "Find \\(AB\\), where \\(A = \\begin{bmatrix} 2 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 1 & 2 & -1 \\\\ 2 & -4 & 2 \\\\ -1 & 2 & 1 \\end{bmatrix}\\). Hence solve \\(2x + y = 5\\), \\(x + z = 1\\), \\(y + 2z = -1\\).",
        steps: [
          "\\(AB = \\begin{bmatrix} 2 + 2 + 0 & 4 - 4 + 0 & -2 + 2 + 0 \\\\ 1 + 0 - 1 & 2 + 0 + 2 & -1 + 0 + 1 \\\\ 0 + 2 - 2 & 0 - 4 + 4 & 0 + 2 + 2 \\end{bmatrix} = \\begin{bmatrix} 4 & 0 & 0 \\\\ 0 & 4 & 0 \\\\ 0 & 0 & 4 \\end{bmatrix} = 4I\\).",
          "So \\(A\\left(\\dfrac{1}{4}B\\right) = I\\) and \\(A^{-1} = \\dfrac{1}{4}B\\).",
          "The equations have coefficient matrix \\(A\\): \\(AX = C\\) with \\(C = \\begin{bmatrix} 5 \\\\ 1 \\\\ -1 \\end{bmatrix}\\).",
          "\\(X = A^{-1}C = \\dfrac{1}{4}\\begin{bmatrix} 1 & 2 & -1 \\\\ 2 & -4 & 2 \\\\ -1 & 2 & 1 \\end{bmatrix}\\begin{bmatrix} 5 \\\\ 1 \\\\ -1 \\end{bmatrix} = \\dfrac{1}{4}\\begin{bmatrix} 5 + 2 + 1 \\\\ 10 - 4 - 2 \\\\ -5 + 2 - 1 \\end{bmatrix} = \\dfrac{1}{4}\\begin{bmatrix} 8 \\\\ 4 \\\\ -4 \\end{bmatrix}\\).",
          "\\(\\therefore x = 2\\), \\(y = 1\\), \\(z = -1\\).",
          "Check: \\(4 + 1 = 5\\), \\(2 - 1 = 1\\), \\(1 - 2 = -1\\).",
        ],
        answer: "\\(AB = 4I\\); \\(x = 2,\\ y = 1,\\ z = -1\\)",
      },
      selfCheckExample: {
        prompt: "Square matrices \\(P\\) and \\(Q\\) of order 3 satisfy \\(PQ = 5I\\). Write \\(P^{-1}\\) and \\(Q^{-1}\\).",
        steps: [
          "\\(P\\left(\\dfrac{1}{5}Q\\right) = I\\), so \\(P^{-1} = \\dfrac{1}{5}Q\\).",
          "Then \\(\\left(\\dfrac{1}{5}Q\\right)P = I\\) as well, so \\(Q^{-1} = \\dfrac{1}{5}P\\).",
        ],
        answer: "\\(P^{-1} = \\dfrac{1}{5}Q\\), \\(Q^{-1} = \\dfrac{1}{5}P\\)",
      },
      practiceSet: [
        { prompt: "\\(AB = 3I\\) for matrices of order 3. A system has coefficient matrix \\(B\\) and constant column \\(C\\). Write its solution \\(X\\).", answer: "\\(X = \\dfrac{1}{3}AC\\)" },
        { prompt: "Find the matrix \\(M\\) for which \\(\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}M = -2I\\).", answer: "\\(M = \\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}\\)", method: "\\(M = -2A^{-1} = \\operatorname{adj} A\\)" },
      ],
      pyqExampleId: "a76585bf-4389-4570-98cf-e30a855b4278",
      traps: [
        {
          title: "Forgetting the 1/k",
          body: "From \\(AB = 4I\\), \\(A^{-1} = \\dfrac{1}{4}B\\), not \\(B\\). Leaving out the \\(\\dfrac{1}{4}\\) makes every unknown four times too big.",
        },
        {
          title: "Not matching the coefficient matrix",
          body: "The system may use the first matrix, the second, or a transpose. Write the coefficient matrix from the equations and compare it entry by entry before you pick the inverse.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-word-problems",
      name: "Word problems and case studies: forming AX = B",
      intuition:
        "Most marks in a word problem go to the equations. Name the unknowns once, turn each sentence into one equation with the unknowns in the same order, then the matrix method does the rest. The answer goes back into the story, with units.",
      definition:
        "- Let \\(x\\), \\(y\\), \\(z\\) be the unknown quantities, named in words with units (price of one pen in rupees, and so on).\n" +
        "- Turn each condition into an equation. \"The second exceeds the first by 5\" means \\(y - x = 5\\); \"twice the second\" means \\(2y\\).\n" +
        "- Bring every unknown to the left in the order \\(x, y, z\\), with 0 for a missing one, and write \\(AX = B\\).\n" +
        "- Solve by \\(X = A^{-1}B\\) and check each condition of the story.\n" +
        "- A case study often splits this: (i) the equations or \\(AX = B\\); (ii) \\(|A|\\) and whether \\(A^{-1}\\) exists; (iii) \\(A^{-1}\\) or the solution.",
      formula: {
        label: "From the story to the solution",
        latex: "AX = B \\;\\Rightarrow\\; X = A^{-1}B",
      },
      authoredExample: {
        prompt: "Ravi pays 120 rupees for 1 notebook, 1 pen and 1 geometry box. Sita pays 250 rupees for 2 notebooks, 3 pens and 1 box. Ali pays 250 rupees for 1 notebook, 2 pens and 3 boxes. Using the matrix method, find the price of each item.",
        steps: [
          "Let one notebook, one pen and one box cost \\(x\\), \\(y\\) and \\(z\\) rupees.",
          "\\(x + y + z = 120\\), \\(2x + 3y + z = 250\\), \\(x + 2y + 3z = 250\\).",
          "\\(A = \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 1 \\\\ 1 & 2 & 3 \\end{bmatrix}\\), \\(B = \\begin{bmatrix} 120 \\\\ 250 \\\\ 250 \\end{bmatrix}\\).",
          "\\(|A| = 1(9 - 2) - 1(6 - 1) + 1(4 - 3) = 7 - 5 + 1 = 3 \\ne 0\\).",
          "Cofactors: \\(A_{11} = 7, A_{12} = -5, A_{13} = 1\\); \\(A_{21} = -1, A_{22} = 2, A_{23} = -1\\); \\(A_{31} = -2, A_{32} = 1, A_{33} = 1\\).",
          "\\(A^{-1} = \\dfrac{1}{3}\\begin{bmatrix} 7 & -1 & -2 \\\\ -5 & 2 & 1 \\\\ 1 & -1 & 1 \\end{bmatrix}\\).",
          "\\(X = A^{-1}B = \\dfrac{1}{3}\\begin{bmatrix} 840 - 250 - 500 \\\\ -600 + 500 + 250 \\\\ 120 - 250 + 250 \\end{bmatrix} = \\dfrac{1}{3}\\begin{bmatrix} 90 \\\\ 150 \\\\ 120 \\end{bmatrix} = \\begin{bmatrix} 30 \\\\ 50 \\\\ 40 \\end{bmatrix}\\).",
          "A notebook costs 30 rupees, a pen 50 rupees and a box 40 rupees. Check: \\(30 + 50 + 40 = 120\\).",
        ],
        answer: "Notebook 30 rupees, pen 50 rupees, box 40 rupees",
      },
      selfCheckExample: {
        prompt: "A show sold 50 tickets: adult tickets at 150 rupees and child tickets at 100 rupees, for 6,500 rupees in all. Using matrices, find the number of each.",
        steps: [
          "Let \\(x\\) adult and \\(y\\) child tickets be sold: \\(x + y = 50\\) and \\(150x + 100y = 6500\\), that is \\(3x + 2y = 130\\).",
          "\\(A = \\begin{bmatrix} 1 & 1 \\\\ 3 & 2 \\end{bmatrix}\\), \\(|A| = 2 - 3 = -1 \\ne 0\\), \\(A^{-1} = -\\begin{bmatrix} 2 & -1 \\\\ -3 & 1 \\end{bmatrix}\\).",
          "\\(X = -\\begin{bmatrix} 100 - 130 \\\\ -150 + 130 \\end{bmatrix} = \\begin{bmatrix} 30 \\\\ 20 \\end{bmatrix}\\).",
          "30 adult tickets and 20 child tickets.",
        ],
        answer: "30 adult and 20 child tickets",
      },
      practiceSet: [
        { prompt: "The sum of three numbers is 9. The first minus the second is 1. The first added to twice the third is 11. Using matrices, find the numbers.", answer: "3, 2 and 4" },
        { prompt: "7,000 rupees is split between two schemes paying 8% and 10% a year. The total interest for a year is 620 rupees. Using matrices, find each amount.", answer: "4,000 rupees at 8% and 3,000 rupees at 10%" },
      ],
      pyqExampleId: "53ca2cea-23a9-499b-91e0-5873463a41e0",
      traps: [
        {
          title: "Changing the order of the unknowns",
          body: "Write every equation with \\(x\\), \\(y\\), \\(z\\) in the same order. An equation like \\(y - x = 5\\) goes into \\(A\\) as the row \\(-1, 1, 0\\), not \\(1, -1, 0\\).",
        },
        {
          title: "Unknowns that are not defined",
          body: "Begin with \"Let the price of one pen be \\(x\\) rupees\". An answer of 30, 50, 40 with no statement of what \\(x\\), \\(y\\), \\(z\\) are loses the mark for forming the equations.",
        },
        {
          title: "No answer in words",
          body: "End with the story's quantities and units: 15 pens, 2,000 rupees, 3 km/h. A bare column matrix is not the final answer.",
        },
      ],
    },
  ],
};
