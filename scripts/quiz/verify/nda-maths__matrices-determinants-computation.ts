/**
 * NDA Maths · Matrices & Determinants · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors (plausible wrong variants), theme=computation. The
 * formula-recall theme is done separately (…-formulas.ts).
 *   npm run quiz:verify nda-maths__matrices-determinants-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // adjoint-properties
  e("adjoint-properties:practiceSet:0", [f("3"), f("27"), f("6")]),
  e("adjoint-properties:practiceSet:1", [f("|A|^2\\,A"), f("A"), f("|A|\\,A^{-1}")]),
  e("adjoint-properties:practiceSet:2", [f("k^n\\operatorname{adj}A"), f("k\\operatorname{adj}A"), f("k^{n-2}\\operatorname{adj}A")]),
  e("adjoint-properties:practiceSet:3", [f("\\operatorname{adj}A\\,\\operatorname{adj}B"), f("\\operatorname{adj}A + \\operatorname{adj}B"), f("|AB|\\,I")]),
  e("adjoint-properties:practiceSet:4", [f("2(\\operatorname{adj}A)^T"), f("I"), f("|A|\\,I")]),
  e("adjoint-properties:selfCheck:0", [f("15552"), f("46656"), f("23328")]),
  // adjoint
  e("adjoint:practiceSet:0", ["The cofactor matrix itself", "The inverse of the cofactor matrix", "The matrix of minors"]),
  e("adjoint:practiceSet:1", [f("I"), f("|A|"), f("A^2")]),
  e("adjoint:practiceSet:2", [f("\\begin{pmatrix}4&-3\\\\-2&1\\end{pmatrix}"), f("\\begin{pmatrix}-4&2\\\\3&-1\\end{pmatrix}"), f("\\begin{pmatrix}1&-2\\\\-3&4\\end{pmatrix}")]),
  e("adjoint:practiceSet:3", [f("O"), f("3I_3"), f("2I_3")]),
  e("adjoint:selfCheck:0", [f("5"), f("25I_3"), f("I_3")]),
  // binomial-coefficient-determinants
  e("binomial-coefficient-determinants:practiceSet:0", [f("\\binom{7}{2}"), f("\\binom{6}{5}"), f("\\binom{12}{5}")]),
  e("binomial-coefficient-determinants:practiceSet:1", [f("1"), f("|A|"), f("-1")]),
  e("binomial-coefficient-determinants:practiceSet:2", [f("\\binom{n+1}{2}"), f("2n"), f("\\binom{n}{2}")]),
  e("binomial-coefficient-determinants:practiceSet:3", ["Compute every coefficient first", "Expand along the first row directly", "Multiply the rows together"]),
  e("binomial-coefficient-determinants:selfCheck:0", [f("\\binom{9}{3}"), f("\\binom{16}{7}"), f("\\binom{8}{7}")]),
  // complex-entry-determinants
  e("complex-entry-determinants:practiceSet:0", [f("1"), f("i"), f("-i")]),
  e("complex-entry-determinants:practiceSet:1", [f("i"), f("1"), f("-1")]),
  e("complex-entry-determinants:practiceSet:2", [f("-1"), f("i"), f("-i")]),
  e("complex-entry-determinants:practiceSet:3", ["only the real parts", "the moduli", "the arguments"]),
  e("complex-entry-determinants:selfCheck:0", ["Take the modulus and set it to 6", "Set the whole expression equal to 11", "Differentiate with respect to i"]),
  // consistency-and-determinant
  e("consistency-and-determinant:practiceSet:0", ["No solution", "Infinitely many", "Exactly two"]),
  e("consistency-and-determinant:practiceSet:1", ["Exactly one solution", "Always no solution", "Always infinitely many"]),
  e("consistency-and-determinant:practiceSet:2", ["Infinitely many solutions", "Exactly one solution", "Exactly two solutions"]),
  e("consistency-and-determinant:practiceSet:3", [f("Singular (|A|=0)"), "A zero matrix", "An identity matrix"]),
  e("consistency-and-determinant:selfCheck:0", ["Exactly one solution", "Infinitely many solutions", "Exactly two solutions"]),
  // core-determinant-properties
  e("core-determinant-properties:practiceSet:0", [f("1"), f("-1"), "The product of the diagonal"]),
  e("core-determinant-properties:practiceSet:1", [f("1"), f("2"), f("0")]),
  e("core-determinant-properties:practiceSet:2", [f("5\\times"), f("-1\\times"), "It becomes 0"]),
  e("core-determinant-properties:practiceSet:3", ["Negatives of each other", f("\\det A^T = 0"), f("\\det A^T = 1/\\det A")]),
  e("core-determinant-properties:selfCheck:0", ["They are equal", "Their sum is 0", "One is twice the other"]),
  // counting-matrices
  e("counting-matrices:practiceSet:0", [f("8"), f("4"), f("32")]),
  e("counting-matrices:practiceSet:1", [f("2^6 = 64"), f("9"), f("2^3 = 8")]),
  e("counting-matrices:practiceSet:2", [f("2"), f("6"), f("3")]),
  e("counting-matrices:practiceSet:3", [f("2^4 = 16"), f("4^2 = 16"), f("4\\times4 = 16")]),
  e("counting-matrices:selfCheck:0", [f("2"), f("6"), f("8")]),
  // cramers-rule
  e("cramers-rule:practiceSet:0", [f("\\Delta/\\Delta_x"), f("\\Delta_x\\cdot\\Delta"), f("\\Delta_y/\\Delta")]),
  e("cramers-rule:practiceSet:1", ["Replace the constants column with the x-column", "Delete the x-column", "Transpose the x-column"]),
  e("cramers-rule:practiceSet:2", ["Zero", "Equal to 1", "Positive"]),
  e("cramers-rule:practiceSet:3", ["Gives a unique solution", "Gives x = 0 always", "Still works normally"]),
  // cyclic-determinants
  e("cyclic-determinants:practiceSet:0", [f("a^3+b^3+c^3-3abc"), f("a^3+b^3+c^3"), f("3abc-a^3-b^3-c^3")]),
  { atomKey: "cyclic-determinants:practiceSet:1", theme: "computation",
    stem: "The cyclic determinant \\(\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix}\\) vanishes (for real \\(a,b,c\\)) when?",
    distractors: [f("a=b=c=0 \\text{ only}"), f("abc=0"), f("a+b+c=1")] },
  e("cyclic-determinants:practiceSet:2", [f("(a-b-c)"), f("(a^2+b^2+c^2)"), f("(a+b-c)")]),
  e("cyclic-determinants:practiceSet:3", [f("8"), f("24"), f("-8")]),
  e("cyclic-determinants:selfCheck:0", [f("64"), f("0"), f("-16")]),
  // det-products-scalar-powers
  e("det-products-scalar-powers:practiceSet:0", [f("k\\det A"), f("k^2\\det A"), f("nk\\det A")]),
  e("det-products-scalar-powers:practiceSet:1", [f("\\det A"), f("-\\det A"), f("|A|^2")]),
  e("det-products-scalar-powers:practiceSet:2", [f("\\det B"), f("\\det A\\cdot\\det B"), f("1/\\det A")]),
  e("det-products-scalar-powers:practiceSet:3", [f("-\\det A"), f("1/\\det A"), f("0")]),
  e("det-products-scalar-powers:practiceSet:4", [f("5"), f("1"), f("4")]),
  e("det-products-scalar-powers:selfCheck:0", [f("8"), f("16"), f("64")]),
  // diagonal-scalar-identity
  e("diagonal-scalar-identity:practiceSet:0", [f("8"), f("7"), f("0")]),
  e("diagonal-scalar-identity:practiceSet:1", [f("3k"), f("k^2"), f("k")]),
  e("diagonal-scalar-identity:practiceSet:2", [f("\\text{diag}(2,4)"), f("\\text{diag}(4,2)"), f("\\text{diag}(\\tfrac14,\\tfrac12)")]),
  e("diagonal-scalar-identity:practiceSet:3", [f("\\text{diag}(6,9)"), f("\\text{diag}(2,3)"), f("\\text{diag}(6,27)")]),
  // differentiating-a-determinant
  e("differentiating-a-determinant:practiceSet:0", [f("1"), f("9"), f("6")]),
  e("differentiating-a-determinant:practiceSet:1", ["A row of ones", "Unchanged", "The identity row"]),
  e("differentiating-a-determinant:practiceSet:2", [f("1"), f("2"), "Undefined"]),
  e("differentiating-a-determinant:practiceSet:3", [f("x^2-1"), f("x"), f("2")]),
  e("differentiating-a-determinant:selfCheck:0", [f("\\cos x-\\sin x"), f("\\sin x-\\cos x"), f("-\\cos x-\\sin x")]),
  // evaluating-determinants
  e("evaluating-determinants:practiceSet:0", [f("14"), f("-10"), f("11")]),
  e("evaluating-determinants:practiceSet:1", [f("40"), f("20"), f("-20")]),
  e("evaluating-determinants:practiceSet:2", ["The sum of its entries", "The trace", "Its largest entry"]),
  e("evaluating-determinants:practiceSet:3", ["The one with the largest entries", "The first row always", "The main diagonal"]),
  e("evaluating-determinants:selfCheck:0", [f("14"), f("-7"), f("0")]),
  // factor-theorem-determinants
  e("factor-theorem-determinants:practiceSet:0", [f("(a+b)"), f("(ab)"), f("(a-b)^2")]),
  e("factor-theorem-determinants:practiceSet:1", [f("(a+b)(b+c)(c+a)"), f("(a-b)(b-c)(a-c)"), f("abc")]),
  e("factor-theorem-determinants:practiceSet:2", [f("1"), f("-1"), "The product of the rows"]),
  e("factor-theorem-determinants:practiceSet:3", ["Differentiate the determinant", "Set all variables to 1", "Take the transpose"]),
  e("factor-theorem-determinants:selfCheck:0", [f("\\text{only }(x-y)"), f("\\text{only }(x-3)"), f("\\text{none of them}")]),
  // homogeneous-and-solution-space
  e("homogeneous-and-solution-space:practiceSet:0", [f("X = I"), "A unique non-zero solution", "No solution"]),
  e("homogeneous-and-solution-space:practiceSet:1", [f("|A| \\neq 0"), f("|A| = 1"), "A is symmetric"]),
  e("homogeneous-and-solution-space:practiceSet:2", ["Exactly two solutions", "A unique solution", "No solution"]),
  e("homogeneous-and-solution-space:practiceSet:3", ["Yes, always", "Yes, if singular", "Only if homogeneous"]),
  // idempotent-involutory
  e("idempotent-involutory:practiceSet:0", [f("A^2 = I"), f("A^2 = O"), f("A^{-1} = A")]),
  e("idempotent-involutory:practiceSet:1", [f("A^2 = A"), f("A^2 = O"), f("A^T = A")]),
  e("idempotent-involutory:practiceSet:2", [f("A^7"), f("I"), f("O")]),
  e("idempotent-involutory:practiceSet:3", [f("A^2"), f("I"), f("-A")]),
  // inverse-of-special-matrices
  e("inverse-of-special-matrices:practiceSet:0", [f("A"), f("-A"), f("A^2")]),
  e("inverse-of-special-matrices:practiceSet:1", [f("\\operatorname{diag}(3,4)"), f("\\operatorname{diag}(4,3)"), f("\\operatorname{diag}(\\tfrac14,\\tfrac13)")]),
  e("inverse-of-special-matrices:practiceSet:2", [f("R(\\theta)"), f("R(2\\theta)"), f("-R(\\theta)")]),
  e("inverse-of-special-matrices:practiceSet:3", [f("A^2"), f("I"), f("-A")]),
  // inverse-properties
  e("inverse-properties:practiceSet:0", [f("A^{-1}B^{-1}"), f("(BA)^{-1}"), f("A^{-1}+B^{-1}")]),
  e("inverse-properties:practiceSet:1", [f("A^{-1}"), f("A^T"), f("I")]),
  e("inverse-properties:practiceSet:2", [f("\\det A"), f("-\\det A"), f("|A|^2")]),
  e("inverse-properties:practiceSet:3", [f("(A^{-1})^{-1}"), f("A^{-1}"), f("A^T")]),
  e("inverse-properties:selfCheck:0", [f("\\text{Both are correct}"), f("\\text{First true; }(A^{-1})^{-1}=A^{-1}"), f("\\text{First true; }(A^{-1})^{-1}=A^T")]),
  // inverse-via-adjoint
  e("inverse-via-adjoint:practiceSet:0", [f("|A|\\operatorname{adj}A"), f("\\frac{1}{|A|}A^T"), f("|A|\\,A^T")]),
  e("inverse-via-adjoint:practiceSet:1", [f("|A| = 0"), f("|A| = 1"), "A is symmetric"]),
  e("inverse-via-adjoint:practiceSet:2", [f("\\operatorname{diag}(2,5)"), f("\\operatorname{diag}(5,2)"), f("\\operatorname{diag}(\\tfrac15,\\tfrac12)")]),
  e("inverse-via-adjoint:practiceSet:3", [f("|A|"), f("-|A|"), f("|A|^2")]),
  e("inverse-via-adjoint:selfCheck:0", [f("\\begin{pmatrix}2&1\\\\3&2\\end{pmatrix}"), f("\\begin{pmatrix}-2&1\\\\3&-2\\end{pmatrix}"), f("\\begin{pmatrix}2&3\\\\1&2\\end{pmatrix}")]),
  // matrix-algebra-caveats
  e("matrix-algebra-caveats:practiceSet:0", ["Yes, always", f("\\text{Yes, if }|A|\\neq0"), "Only for 2×2"]),
  e("matrix-algebra-caveats:practiceSet:1", ["Nothing — it always holds", f("|A| = |B|"), "A and B singular"]),
  e("matrix-algebra-caveats:practiceSet:2", [f("A^2 + 2AB + B^2"), f("A^2 + B^2"), f("A^2 - B^2")]),
  e("matrix-algebra-caveats:practiceSet:3", ["Yes, always", "Yes, for square matrices", "Yes, if same order"]),
  // matrix-equality-addition-scalar
  e("matrix-equality-addition-scalar:practiceSet:0", ["Yes, always", "Yes, by transposing one", "Only if both are square"]),
  e("matrix-equality-addition-scalar:practiceSet:1", [f("1"), f("6"), f("0")]),
  e("matrix-equality-addition-scalar:practiceSet:2", [f("x=2,\\ y=5"), f("x=5,\\ y=5"), f("x=2,\\ y=2")]),
  e("matrix-equality-addition-scalar:practiceSet:3", ["Same number of entries", "Same determinant", "Same trace"]),
  e("matrix-equality-addition-scalar:selfCheck:0", [f("a = 3,\\ b = 2"), f("a = 2,\\ b = 4"), f("a = 5,\\ b = 7")]),
  // matrix-multiplication
  e("matrix-multiplication:practiceSet:0", [f("4\\times1"), f("2\\times4"), f("1\\times2")]),
  e("matrix-multiplication:practiceSet:1", [f("\\text{Yes, }3\\times3"), f("\\text{Yes, }2\\times2"), f("\\text{Yes, }6\\times6")]),
  e("matrix-multiplication:practiceSet:2", ["Yes, always", "Yes, for square matrices", "Yes, if both invertible"]),
  e("matrix-multiplication:practiceSet:3", [f("3\\times3"), f("1\\times3"), f("3\\times1")]),
  e("matrix-multiplication:selfCheck:0", [f("3\\times3"), f("5\\times3"), f("2\\times5")]),
  // matrix-polynomials-and-equations
  e("matrix-polynomials-and-equations:practiceSet:0", [f("\\det\\ ad-bc"), f("a-d"), f("ad+bc")]),
  e("matrix-polynomials-and-equations:practiceSet:1", [f("-4I"), f("-3"), f("I")]),
  e("matrix-polynomials-and-equations:practiceSet:2", [f("5I"), f("10I"), f("125I")]),
  e("matrix-polynomials-and-equations:practiceSet:3", [f("10"), f("3"), f("13")]),
  e("matrix-polynomials-and-equations:selfCheck:0", [f("-5I"), f("4I"), f("5A")]),
  // minors-and-cofactors
  e("minors-and-cofactors:practiceSet:0", [f("+"), f("0"), "Depends on the entry"]),
  e("minors-and-cofactors:practiceSet:1", [f("0"), f("|A|^2"), f("\\operatorname{adj}A")]),
  e("minors-and-cofactors:practiceSet:2", [f("\\det A"), f("1"), f("|A|")]),
  e("minors-and-cofactors:practiceSet:3", ["Deleting row i and column j only", "Multiplying row i by column j", "Transposing then deleting"]),
  e("minors-and-cofactors:selfCheck:0", [f("C_{23}=+,\\ \\text{sum}=0"), f("C_{23}=+,\\ \\text{sum}=\\det A"), f("C_{23}=-,\\ \\text{sum}=0")]),
  // orthogonal-matrices
  e("orthogonal-matrices:practiceSet:0", [f("A"), f("-A"), f("A^2")]),
  e("orthogonal-matrices:practiceSet:1", [f("1"), f("0"), f("\\pm n")]),
  e("orthogonal-matrices:practiceSet:2", ["No", "Only if 2×2", "Only if det = 0"]),
  e("orthogonal-matrices:practiceSet:3", [f("\\pm 1"), f("0"), f("2")]),
  e("orthogonal-matrices:selfCheck:0", [f("\\pm 1"), f("4"), f("0")]),
  // parameter-for-consistency
  e("parameter-for-consistency:practiceSet:0", [f("|A| = 1"), f("\\operatorname{tr}A = 0"), "A is symmetric"]),
  e("parameter-for-consistency:practiceSet:1", ["Always unique", "Always no solution", "Always infinitely many"]),
  e("parameter-for-consistency:practiceSet:2", ["No solution", "Infinitely many", "Two solutions"]),
  e("parameter-for-consistency:practiceSet:3", ["The determinant value", "The trace", "The transpose"]),
  // polynomial-progression-determinants
  e("polynomial-progression-determinants:practiceSet:0", [f("1"), f("\\text{the common difference}"), "Non-zero"]),
  e("polynomial-progression-determinants:practiceSet:1", ["Independent ⇒ det non-zero", "Equal ⇒ det 1", "Orthogonal"]),
  e("polynomial-progression-determinants:practiceSet:2", ["Compute the full determinant numerically", "Differentiate twice", "Take the trace"]),
  e("polynomial-progression-determinants:practiceSet:3", ["Independent (det non-zero)", "Orthogonal", "Symmetric"]),
  e("polynomial-progression-determinants:selfCheck:0", [f("1"), f("2"), f("x")]),
  // powers-of-a-matrix
  e("powers-of-a-matrix:practiceSet:0", [f("nI"), f("O"), f("I^{-1}")]),
  e("powers-of-a-matrix:practiceSet:1", [f("A"), f("A^5"), f("O")]),
  e("powers-of-a-matrix:practiceSet:2", [f("\\theta/n"), f("\\theta^n"), f("n+\\theta")]),
  e("powers-of-a-matrix:practiceSet:3", [f("A^5"), f("I"), f("O")]),
  e("powers-of-a-matrix:selfCheck:0", [f("4A"), f("-2A"), f("A")]),
  // roots-of-unity-determinants
  e("roots-of-unity-determinants:practiceSet:0", [f("1"), f("3"), f("\\omega")]),
  e("roots-of-unity-determinants:practiceSet:1", [f("0"), f("\\omega"), f("-1")]),
  e("roots-of-unity-determinants:practiceSet:2", [f("-\\omega"), f("\\omega^2"), f("1")]),
  e("roots-of-unity-determinants:practiceSet:3", [f("1"), f("\\omega^2"), f("-1")]),
  // rotation-matrices
  e("rotation-matrices:practiceSet:0", [f("R(\\theta\\phi)"), f("R(\\theta-\\phi)"), f("R(\\theta)+R(\\phi)")]),
  e("rotation-matrices:practiceSet:1", [f("0"), f("-1"), f("\\cos\\theta")]),
  e("rotation-matrices:practiceSet:2", [f("R(\\theta)"), f("-R(\\theta)"), f("R(2\\theta)")]),
  e("rotation-matrices:practiceSet:3", [f("R(10°)"), f("R(27000°)"), f("R(60°)")]),
  // singular-and-determinant-equations
  e("singular-and-determinant-equations:practiceSet:0", [f("1"), f("\\pm 1"), "Its trace"]),
  e("singular-and-determinant-equations:practiceSet:1", ["Yes, always", "Yes, its transpose", "Yes, if symmetric"]),
  e("singular-and-determinant-equations:practiceSet:2", [f("x = 2"), f("x = 4"), f("x = 0")]),
  e("singular-and-determinant-equations:practiceSet:3", ["Expand fully first, then simplify", "Take the inverse", "Multiply rows together"]),
  e("singular-and-determinant-equations:selfCheck:0", [f("x = 16"), f("x = -4"), f("x = 4")]),
  // special-matrix-types
  e("special-matrix-types:practiceSet:0", [f("A^2 = A"), f("A^T = -A"), f("A = I")]),
  e("special-matrix-types:practiceSet:1", ["Idempotent", "Orthogonal", "Skew-symmetric"]),
  e("special-matrix-types:practiceSet:2", ["All 1", "All equal", "The trace"]),
  e("special-matrix-types:practiceSet:3", [f("1"), f("0"), f("n")]),
  e("special-matrix-types:practiceSet:4", [f("A^T = A"), f("A^T = -A"), f("AA^T = I")]),
  e("special-matrix-types:practiceSet:5", ["Skew-symmetric", "Orthogonal", "Idempotent"]),
  e("special-matrix-types:selfCheck:0", [f("\\det A = 1,\\ \\text{diagonal} = 1"), f("\\det A = -1,\\ \\text{diagonal} = 0"), f("\\det A = 0,\\ \\text{diagonal} \\neq 0")]),
  // structured-determinant-cases
  e("structured-determinant-cases:practiceSet:0", [f("1"), f("f(i)g(j)"), "Non-zero"]),
  e("structured-determinant-cases:practiceSet:1", [f("1"), f("\\text{the common difference}"), "Non-zero"]),
  e("structured-determinant-cases:practiceSet:2", [f("8"), f("6"), f("9")]),
  e("structured-determinant-cases:practiceSet:3", [f("6"), f("1"), f("9")]),
  // sum-of-determinants
  e("sum-of-determinants:practiceSet:0", [f("2k+1"), f("k^2-(k-1)^2"), f("1")]),
  e("sum-of-determinants:practiceSet:1", [f("n(n+1)"), f("\\tfrac{n(n+1)}{2}"), f("2n-1")]),
  e("sum-of-determinants:practiceSet:2", ["Sum all the matrices first", "Take the trace of each", "Find the inverse of each"]),
  e("sum-of-determinants:practiceSet:3", [f("45"), f("100"), f("110")]),
  e("sum-of-determinants:selfCheck:0", [f("\\tfrac{n(n+1)}{2}"), f("2n-1"), f("n(n+1)")]),
  // symmetric-and-skew-symmetric
  e("symmetric-and-skew-symmetric:practiceSet:0", ["All 1", "All equal", "The trace value"]),
  e("symmetric-and-skew-symmetric:practiceSet:1", [f("1"), f("\\pm 1"), "Its trace"]),
  e("symmetric-and-skew-symmetric:practiceSet:2", ["Skew-symmetric", "Orthogonal", "Singular"]),
  e("symmetric-and-skew-symmetric:practiceSet:3", ["Symmetric", "Orthogonal", "Idempotent"]),
  e("symmetric-and-skew-symmetric:selfCheck:0", ["Always symmetric", "Never symmetric", "Always skew-symmetric"]),
  // transpose-rules
  e("transpose-rules:practiceSet:0", [f("A^T"), f("A^{-1}"), f("-A")]),
  e("transpose-rules:practiceSet:1", [f("A^T B^T"), f("AB"), f("(BA)^T")]),
  e("transpose-rules:practiceSet:2", [f("2\\times5"), f("5\\times5"), f("2\\times2")]),
  e("transpose-rules:practiceSet:3", [f("B^T A^T"), f("(A+B)"), f("A^T - B^T")]),
  // trigonometric-determinants
  e("trigonometric-determinants:practiceSet:0", [f("0"), f("2"), f("\\cos 2\\theta")]),
  e("trigonometric-determinants:practiceSet:1", [f("\\sin 2x"), f("1"), f("-\\cos 2x")]),
  e("trigonometric-determinants:practiceSet:2", ["Expand directly along row 1", "Square every entry", "Take the transpose"]),
  e("trigonometric-determinants:practiceSet:3", [f("\\tfrac{\\pi}{2}"), f("2\\pi"), f("\\pi/3")]),
  e("trigonometric-determinants:selfCheck:0", [f("1"), f("\\pi"), "Always non-zero"]),
  // what-is-a-matrix
  e("what-is-a-matrix:practiceSet:0", [f("5 \\times 3"), f("8"), f("15")]),
  e("what-is-a-matrix:practiceSet:1", [f("7"), f("12 \\times 1"), f("3+4")]),
  e("what-is-a-matrix:practiceSet:2", ["All matrices", "Rectangular matrices", "Row matrices only"]),
  e("what-is-a-matrix:practiceSet:3", [f("1\\times7,\\ 7\\times1,\\ \\text{and others}"), f("\\text{only }7\\times7"), f("\\text{four orders}")]),
];
