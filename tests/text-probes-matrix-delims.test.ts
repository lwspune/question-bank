import { describe, it, expect } from "vitest";
import {
  mixedMatrixDelimiters,
  mentionsCombinations,
  toBracketMatrices,
} from "../scripts/lib/textProbes";

/**
 * MIXED_MATRIX_DELIM — one question that draws its matrices in two different
 * brackets, so the reader meets `A = [m n]` and a round `C` in the same line of
 * the stem (NDA1 2022 Q24, reported 2026-09-17), or reads a round stem whose
 * solution repeats THE SAME matrix in square brackets.
 *
 * The probe is about INTERNAL disagreement, not about hunting `pmatrix`: a
 * question that is uniformly round has nothing to mismatch against and must
 * never fire. That restraint is the whole point — rewriting a uniform stem
 * changes its `content_hash` preimage for a change no reader can see.
 *
 * Every fixture below is a real bank row, so the false-positive boundary is
 * pinned by the same content that drew it.
 */
describe("mixedMatrixDelimiters", () => {
  it("fires when the stem is round and the solution repeats the same matrix square", () => {
    expect(
      mixedMatrixDelimiters([
        "Let \\(A =\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\). Then \\(A^{2}\\) is:",
        "Squaring \\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\) gives the identity.",
      ])
    ).toBe(true);
  });

  it("fires on the reported row — a literal `[m  n]` beside a round column matrix", () => {
    expect(
      mixedMatrixDelimiters([
        "Consider the following in respect of the matrices: \\(A=[m\\ \\ n]\\), \\(B=[-n\\ \\ -m]\\) and \\(C=\\begin{pmatrix}m\\\\-m\\end{pmatrix}\\).",
      ])
    ).toBe(true);
  });

  it("fires on a `\\;`-separated literal row vector beside a round matrix", () => {
    expect(
      mixedMatrixDelimiters([
        "What is the order of \\([x\\; y\\; z]\\begin{pmatrix}a&h&g\\\\h&b&f\\\\g&f&c\\end{pmatrix}\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix}\\)?",
      ])
    ).toBe(true);
  });

  it("does NOT fire on a question that is uniformly round", () => {
    expect(
      mixedMatrixDelimiters([
        "If \\(A=\\begin{pmatrix} 0 & 2 \\\\ K & -1 \\end{pmatrix}\\) satisfies \\(A(A^{3}+3I)=2I\\), then K is:",
        "Substituting \\(\\begin{pmatrix} 0 & 2 \\\\ K & -1 \\end{pmatrix}\\) gives \\(K=1\\).",
      ])
    ).toBe(false);
  });

  it("does NOT fire on a question that is uniformly square", () => {
    expect(
      mixedMatrixDelimiters([
        "Let \\(A+2B=\\begin{bmatrix} 1 & 2 \\\\ 6 & -3 \\end{bmatrix}\\).",
        "So \\(A=\\begin{bmatrix} 2 & -1 \\\\ 2 & -1 \\end{bmatrix}\\).",
      ])
    ).toBe(false);
  });

  it("does NOT fire on the binomial-coefficient contrast — (n k) and [n k] are different symbols", () => {
    expect(
      mixedMatrixDelimiters([
        "Let \\(\\begin{pmatrix} n \\\\ k \\end{pmatrix}\\) denote \\(\\ ^{n}C_{k}\\) and \\(\\begin{bmatrix} n \\\\ k \\end{bmatrix}=\\left\\{ \\begin{matrix} \\begin{pmatrix} n \\\\ k \\end{pmatrix}, & \\text{if } 0 \\leq k \\leq n \\\\ 0, & \\text{otherwise} \\end{matrix} \\right.\\) If \\(A_{4}-A_{3}= 190p\\), then \\(p\\) is equal to:",
      ])
    ).toBe(false);
  });

  it("does NOT fire when a determinant sits beside a square matrix — different axis", () => {
    expect(
      mixedMatrixDelimiters([
        "If \\(A=\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\), find \\(\\left| \\begin{matrix} 1 & 2 \\\\ 3 & 4 \\end{matrix} \\right|\\).",
      ])
    ).toBe(false);
  });

  it("does NOT fire on greatest-integer cells inside a round matrix", () => {
    expect(
      mixedMatrixDelimiters([
        "Let \\(A =\\begin{pmatrix} \\lbrack x + 1\\rbrack & \\lbrack x + 2\\rbrack \\\\ \\lbrack x\\rbrack & \\lbrack x + 3\\rbrack \\end{pmatrix}\\), where \\(\\lbrack t\\rbrack\\) denotes the greatest integer less than or equal to \\(t\\).",
      ])
    ).toBe(false);
  });

  it("does NOT fire on an interval option or a dimension bracket beside a round matrix", () => {
    expect(
      mixedMatrixDelimiters([
        "Let \\(A=\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\). The set of values of x is the interval:",
        "First product: \\([1\\times3]\\cdot[3\\times3] = [1\\times3]\\).",
        "\\(\\lbrack 68,69)\\)",
      ])
    ).toBe(false);
  });

  it("does NOT fire on a display-math block that merely contains a round matrix", () => {
    expect(
      mixedMatrixDelimiters([
        "The number of elements in the set \\[\\left\\{ A =\\begin{pmatrix} a & b \\\\ 0 & \\text{ }d \\end{pmatrix}\\mathbf{:a,b,d \\in \\{ - 1,0,1\\}}\\text{~and~}(I - A)^{3}= I -A^{3} \\right\\},\\] where I is the \\(2 \\times 2\\) identity matrix, is:",
      ])
    ).toBe(false);
  });

  it("does NOT fire on the scalar triple product [a b c] — vector notation, not a row matrix", () => {
    // Found only by running the probe against the live bank: three rows (two
    // State Board Vectors, one MHT-CET) write a·(b×c) as `[a  b  c]`, which is
    // shaped exactly like a bracketed row vector. The entries being VECTORS is
    // what tells them apart — a row matrix's entries are scalars.
    expect(
      mixedMatrixDelimiters([
        "Using the properties of scalar triple product, prove that \\([\\vec{a}+\\vec{b}\\ \\ \\vec{b}+\\vec{c}\\ \\ \\vec{c}+\\vec{a}] = 2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).",
        "Expanding gives \\(\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 0 & 1 \\end{pmatrix}\\), whose determinant is 2.",
      ])
    ).toBe(false);
  });

  it("does NOT fire on an \\overrightarrow scalar triple product either", () => {
    expect(
      mixedMatrixDelimiters([
        "If \\([\\overrightarrow{a}\\; \\overrightarrow{b}\\; \\overrightarrow{c}] = \\lambda\\), find \\(\\lambda\\) for \\(\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\).",
      ])
    ).toBe(false);
  });

  it("ignores null / undefined / empty fields", () => {
    expect(mixedMatrixDelimiters([null, undefined, ""])).toBe(false);
  });
});

/**
 * The repair that `mixedMatrixDelimiters` reports on. It carries the SAME
 * combinations exemption as the probe, so a row the probe flags for some other
 * reason can never have its nCk silently turned into a matrix.
 */
describe("toBracketMatrices", () => {
  it("converts a round matrix to square, preserving the cells byte-for-byte", () => {
    expect(
      toBracketMatrices("\\(C=\\begin{pmatrix}m\\\\-m\\end{pmatrix}\\)", false)
    ).toBe("\\(C=\\begin{bmatrix}m\\\\-m\\end{bmatrix}\\)");
  });

  it("converts every occurrence in one field", () => {
    expect(
      toBracketMatrices(
        "\\([x\\; y\\; z]\\begin{pmatrix}a&h&g\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}\\)",
        false
      )
    ).toBe(
      "\\([x\\; y\\; z]\\begin{bmatrix}a&h&g\\end{bmatrix}\\begin{bmatrix}x\\\\y\\end{bmatrix}\\)"
    );
  });

  it("leaves an already-square matrix untouched", () => {
    const square = "\\(A=\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\)";
    expect(toBracketMatrices(square, false)).toBe(square);
  });

  it("leaves a single-column round matrix alone in a combinations row — that is nCk", () => {
    const nck = "Let \\(\\begin{pmatrix} n \\\\ k \\end{pmatrix}\\) denote \\(\\ ^{n}C_{k}\\)";
    expect(toBracketMatrices(nck, true)).toBe(nck);
  });

  it("still converts a MULTI-column round matrix in a combinations row", () => {
    expect(
      toBracketMatrices(
        "\\(\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\) and \\(\\ ^{n}C_{k}\\)",
        true
      )
    ).toBe("\\(\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\) and \\(\\ ^{n}C_{k}\\)");
  });

  it("leaves a determinant's \\begin{matrix} alone — different axis", () => {
    const det = "\\(\\left| \\begin{matrix} 1 & 2 \\\\ 3 & 4 \\end{matrix} \\right|\\)";
    expect(toBracketMatrices(det, false)).toBe(det);
  });

  it("leaves a literal row vector alone — it already renders square", () => {
    const lit = "\\(A=[m\\ \\ n]\\)";
    expect(toBracketMatrices(lit, false)).toBe(lit);
  });
});

describe("mentionsCombinations", () => {
  it("detects nCk and \\binom", () => {
    expect(mentionsCombinations("\\(\\ ^{n}C_{k}\\)")).toBe(true);
    expect(mentionsCombinations("\\(\\binom{n}{k}\\)")).toBe(true);
  });

  it("is false for an ordinary matrix question", () => {
    expect(mentionsCombinations("\\(A=\\begin{pmatrix} 1 & 2 \\end{pmatrix}\\)")).toBe(false);
  });
});
