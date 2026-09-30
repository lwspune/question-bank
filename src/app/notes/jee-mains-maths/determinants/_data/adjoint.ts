import type { SubtopicNote } from "@/app/notes/_types";

export const ADJOINT_DET_NOTE: SubtopicNote = {
  subtopicName: "Determinants of kA, adj A and Products",
  title: "Determinants of kA, adj A and Products",
  oneLineDefinition:
    "The rules for the determinant of a scalar multiple, an adjoint, an inverse and a product, and how they chain through nested expressions.",
  whyItMatters:
    "Twenty-nine PYQs, twenty of them multiple choice, nine numerical. Eighteen chain the rules for |kA|, |adj A| and nested adjoints; eleven use products, inverses and cofactor matrices. Each is a few exponents once the rules are right, and the order n of the matrix is the usual slip. Two ideas cover the page.",
  concepts: [
    // C1 — kA and adjoints
    {
      kind: "formula" as const,
      slug: "jdet-adj-chain",
      name: "Scalar multiples and adjoints",
      intuition:
        "For an \\(n\\times n\\) matrix, multiplying by \\(k\\) scales every row, so \\(|kA|=k^n|A|\\). From \\(A\\,\\mathrm{adj}A=|A|I\\) come \\(|\\mathrm{adj}A|=|A|^{n-1}\\) and \\(\\mathrm{adj}(\\mathrm{adj}A)=|A|^{n-2}A\\). Work nested expressions from the inside out, one rule at a time.",
      definition:
        "- \\(|kA|=k^n|A|\\).\n" +
        "- \\(A\\,\\mathrm{adj}A=\\mathrm{adj}A\\,A=|A|I\\); \\(|\\mathrm{adj}A|=|A|^{n-1}\\).\n" +
        "- \\(\\mathrm{adj}(\\mathrm{adj}A)=|A|^{n-2}A\\); \\(|\\mathrm{adj}(\\mathrm{adj}A)|=|A|^{(n-1)^2}\\).\n" +
        "- \\(\\mathrm{adj}(kA)=k^{n-1}\\mathrm{adj}A\\); \\(A^{-1}=\\frac{\\mathrm{adj}A}{|A|}\\).",
      formula: {
        label: "Adjoint rules",
        latex: "|kA|=k^n|A|,\\qquad|\\mathrm{adj}A|=|A|^{n-1}",
      },
      authoredExample: {
        prompt: "\\(A\\) is \\(3\\times3\\) with \\(|A|=2\\). Find \\(|\\mathrm{adj}(2A)|\\).",
        steps: [
          "\\(|2A|=2^3\\cdot2=16\\), so \\(|\\mathrm{adj}(2A)|=16^2\\).",
        ],
        answer: "\\(256\\).",
      },
      selfCheckExample: {
        prompt: "\\(A\\) is \\(3\\times3\\) with \\(|A|=3\\). Find \\(|\\mathrm{adj}(\\mathrm{adj}A)|\\).",
        steps: [
          "\\(|A|^{(n-1)^2}=3^4\\).",
        ],
        answer: "\\(81\\).",
      },
      practiceSet: [
        { prompt: "\\(|3A|\\), \\(A\\) of order 2, \\(|A|=5\\)?", answer: "\\(45\\)" },
        { prompt: "\\(\\mathrm{adj}(\\mathrm{adj}A)\\) for order 3?", answer: "\\(|A|A\\)" },
        { prompt: "\\(|A\\,\\mathrm{adj}A|\\), order 3, \\(|A|=2\\)?", answer: "\\(8\\)" },
        { prompt: "\\(|A^{-1}|\\) if \\(|A|=4\\)?", answer: "\\(\\frac14\\)" },
      ],
      pyqExampleId: "0074e6cc-25b8-4ab5-81a0-2f526ba1e0ea", // 2025 — nested adjoints and scalar multiples
      traps: [
        {
          title: "The power depends on the order",
          body: "\\(|kA|=k^n|A|\\), not \\(k|A|\\), and \\(|\\mathrm{adj}A|=|A|^{n-1}\\) changes with \\(n\\). Read the order of the matrix before applying either.",
        },
      ],
    },

    // C2 — products and inverses
    {
      kind: "formula" as const,
      slug: "jdet-product",
      name: "Products, inverses and cofactors",
      intuition:
        "The determinant of a product is the product of determinants, so \\(|P^{-1}AP|=|A|\\) and \\(|A^m|=|A|^m\\). The cofactor matrix is the transpose of the adjoint, so it has the same determinant. A row operation that adds a multiple of one row to another leaves the determinant unchanged; swapping two rows changes its sign.",
      definition:
        "- \\(|AB|=|A||B|\\), \\(|A^{-1}|=\\frac1{|A|}\\), \\(|A^T|=|A|\\).\n" +
        "- \\(|P^{-1}AP|=|A|\\).\n" +
        "- Cofactor matrix \\(C=(\\mathrm{adj}A)^T\\): \\(|C|=|A|^{n-1}\\).\n" +
        "- Row swap: sign changes; \\(R_i\\to R_i+kR_j\\): unchanged.",
      formula: {
        label: "Product rule",
        latex: "|AB|=|A|\\,|B|",
      },
      authoredExample: {
        prompt: "\\(A,B\\) are \\(3\\times3\\), \\(|A|=3\\), \\(|B|=-2\\). Find \\(|2AB^{-1}|\\).",
        steps: [
          "\\(2^3\\cdot3\\cdot\\frac1{-2}\\).",
        ],
        answer: "\\(-12\\).",
      },
      selfCheckExample: {
        prompt: "\\(|A|=7\\). Find \\(|P^{-1}AP|\\).",
        steps: [
          "\\(|P^{-1}|\\,|A|\\,|P|=|A|\\).",
        ],
        answer: "\\(7\\).",
      },
      practiceSet: [
        { prompt: "\\(|A^3|\\) if \\(|A|=-2\\)?", answer: "\\(-8\\)" },
        { prompt: "Cofactor matrix determinant, order 3, \\(|A|=5\\)?", answer: "\\(25\\)" },
        { prompt: "Swap two rows: the determinant?", answer: "Changes sign" },
        { prompt: "\\(|A^TA|\\) if \\(|A|=3\\)?", answer: "\\(9\\)" },
      ],
      pyqExampleId: "2d6ac41f-f6d8-41fc-9f09-39f5cde7b0d5", // 2024 — determinants of products and inverses
      traps: [
        {
          title: "Divide by a negative determinant",
          body: "When \\(|A|\\) is negative, formulas like \\(|X|=\\frac{|AX|}{|A|}\\) flip the sign. Stopping at \\(|A||X|\\) gives the wrong sign.",
        },
      ],
    },
  ],
};
