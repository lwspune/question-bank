import type { SubtopicNote } from "@/app/notes/_types";

export const OPERATIONS_DET_NOTE: SubtopicNote = {
  subtopicName: "Simplifying Determinants by Row and Column Operations",
  title: "Simplifying Determinants by Row and Column Operations",
  oneLineDefinition:
    "Evaluating a determinant without brute expansion: taking out common factors, subtracting rows to create zeros, and spotting rows that make it vanish.",
  whyItMatters:
    "Ten PYQs, eight of them multiple choice. Five have rows or columns built from a pattern — an A.P., factorials, powers — that operations reduce quickly; five expand a simplified determinant and compare it with a given expression. Two ideas cover the page.",
  concepts: [
    // C1 — factor and reduce
    {
      kind: "formula" as const,
      slug: "jdet-factor",
      name: "Factor out and create zeros",
      intuition:
        "A factor common to a row or column comes outside. Subtracting one row from another does not change the determinant, so use it to create zeros before expanding. If one row equals a combination of others — for rows in A.P., \\(R_1+R_3=2R_2\\) — the determinant is 0.",
      definition:
        "- A common factor of a row or column comes outside.\n" +
        "- \\(R_i\\to R_i-kR_j\\) leaves the determinant unchanged.\n" +
        "- Two equal or proportional rows: the determinant is 0.\n" +
        "- Rows in A.P.: \\(R_1-2R_2+R_3=0\\), so the determinant is 0.",
      formula: {
        label: "Row operation",
        latex: "R_i\\to R_i-kR_j:\\ \\Delta\\ \\text{unchanged}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{vmatrix}\\).",
        steps: [
          "\\(R_1+R_3=(8,10,12)=2R_2\\).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}a&a+d&a+2d\\\\b&b+d&b+2d\\\\c&c+d&c+2d\\end{vmatrix}\\).",
        steps: [
          "\\(C_1+C_3=2C_2\\).",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\(\\begin{vmatrix}2&4\\\\3&6\\end{vmatrix}\\)?", answer: "\\(0\\)" },
        { prompt: "Take 3 out of one row: the determinant is?", answer: "\\(3\\times\\) the new one" },
        { prompt: "\\(\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a&b&c\\end{vmatrix}\\)?", answer: "\\(0\\)" },
        { prompt: "Does \\(R_2\\to R_2-R_1\\) change the value?", answer: "No" },
      ],
      pyqExampleId: "9c4535a9-3088-4ec7-9540-d258ed18abc9", // 2021 — a determinant reduced by factoring rows
      traps: [
        {
          title: "Scaling a row scales the determinant",
          body: "Replacing \\(R_i\\) by \\(2R_i-R_j\\) doubles the determinant. Only adding a multiple of another row is free.",
        },
      ],
    },

    // C2 — expand and compare
    {
      kind: "formula" as const,
      slug: "jdet-expand",
      name: "Expand and compare",
      intuition:
        "After simplifying, expand along the row or column with the most zeros, and factor the result. Identities for symmetric determinants save the expansion: adding all columns of \\(\\begin{vmatrix}x&1&1\\\\1&x&1\\\\1&1&x\\end{vmatrix}\\) gives a common factor \\(x+2\\). Compare the result with the expression in the question to read off the unknowns.",
      definition:
        "- Expand along a row or column with zeros.\n" +
        "- Symmetric: add all columns to one, then factor.\n" +
        "- \\(\\begin{vmatrix}1&a&a^2\\\\1&b&b^2\\\\1&c&c^2\\end{vmatrix}=(a-b)(b-c)(c-a)\\).",
      formula: {
        label: "Vandermonde",
        latex: "\\begin{vmatrix}1&a&a^2\\\\1&b&b^2\\\\1&c&c^2\\end{vmatrix}=(a-b)(b-c)(c-a)",
      },
      authoredExample: {
        prompt: "Factor \\(\\begin{vmatrix}x&1&1\\\\1&x&1\\\\1&1&x\\end{vmatrix}\\).",
        steps: [
          "Add all columns to the first: it becomes \\(x+2\\) in every row.",
          "Take it out and subtract rows: \\((x+2)(x-1)^2\\).",
        ],
        answer: "\\((x+2)(x-1)^2\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}1&1&1\\\\1&2&4\\\\1&3&9\\end{vmatrix}\\).",
        steps: [
          "Vandermonde with \\(1,2,3\\): \\((1-2)(2-3)(3-1)\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(\\begin{vmatrix}x&1\\\\1&x\\end{vmatrix}=0\\)?", answer: "\\(\\pm1\\)" },
        { prompt: "\\(\\begin{vmatrix}1&0&0\\\\0&2&0\\\\0&0&3\\end{vmatrix}\\)?", answer: "\\(6\\)" },
        { prompt: "\\(\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}\\)?", answer: "\\(ad-bc\\)" },
        { prompt: "Vandermonde with two equal entries?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "a419f967-1efc-4319-a0f4-eed08b65c076", // 2026 — expand a determinant and compare
      traps: [
        {
          title: "Sign of the cofactor",
          body: "Expanding along a row, the signs alternate \\(+,-,+\\) starting from the top-left. A middle-column term carries a minus sign.",
        },
      ],
    },
  ],
};
