/**
 * NDA Maths · Matrices & Determinants · trap MCQs ("spot the common mistake").
 *   npm run quiz:verify nda-maths__matrices-determinants-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const t = (atomKey: string, stem: string, correct: string, distractors: string[]): VerifiedEntry => ({
  atomKey, stem, correct, distractors, theme: "trap",
});

export const VERIFIED: VerifiedEntry[] = [
  t("binomial-coefficient-determinants:trap:0",
    "What is the smartest first step on a determinant whose entries are binomial coefficients?",
    "Use Pascal's identity as a single column operation",
    ["Evaluate every binomial coefficient, then expand", "Take the transpose first", "Differentiate the determinant"]),
  t("det-products-scalar-powers:trap:0",
    "For a \\(3\\times3\\) matrix \\(A\\), \\(\\det(3A)\\) equals:",
    "\\(27\\det A\\)", ["\\(3\\det A\\)", "\\(9\\det A\\)", "\\(81\\det A\\)"]),
  t("det-products-scalar-powers:trap:1",
    "For the column vector \\(A = (1,2,3)^T\\), \\(\\det(I + AA^T)\\) equals:",
    "\\(15\\)", ["\\(14\\)", "\\(1\\)", "\\(36\\)"]),
  t("differentiating-a-determinant:trap:0",
    "Differentiating a \\(3\\times3\\) determinant whose entries are functions of \\(x\\) gives:",
    "A sum of 3 determinants, each with ONE row differentiated",
    ["One determinant with all three rows differentiated", "The determinant of the differentiated matrix", "Three times the original determinant"]),
  t("matrix-algebra-caveats:trap:0",
    "Which identity holds for ALL square matrices \\(A, B\\) of the same order?",
    "\\((A+B)^T = A^T + B^T\\)",
    ["\\((A+B)(A-B) = A^2 - B^2\\)", "\\((AB)^2 = A^2 B^2\\)", "\\((A+B)^2 = A^2 + 2AB + B^2\\)"]),
];
