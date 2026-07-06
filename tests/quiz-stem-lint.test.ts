import { describe, it, expect } from "vitest";
import { flagStem, flagOptionTell, stripMathZones } from "@/lib/quiz/stemLint";

describe("stripMathZones", () => {
  it("removes inline math so prose checks work on words only", () => {
    expect(stripMathZones("Valid \\(b_{yx}\\cdot b_{xy}\\)?").trim()).toBe("Valid ?");
  });
});

describe("flagStem — flags NON-self-contained stems", () => {
  // The real Statistics atoms that prompted this (sequence-dependent prompts
  // lifted out of the notes and shuffled).
  it("flags a criterion-less choice question", () => {
    expect(flagStem("Pairing A product \\(0.8\\), pairing B product \\(1.25\\). Which is correct?")).not.toEqual([]);
  });

  it("flags a definite back-reference to an undefined entity", () => {
    expect(flagStem("Why can the wrong pairing exceed \\(1\\)?")).not.toEqual([]);
  });

  it("flags a deictic opener", () => {
    expect(flagStem("These give the same answer — true or false?")).not.toEqual([]);
  });

  it("flags an ultra-short telegraphic stem", () => {
    expect(flagStem("Valid?")).not.toEqual([]);
  });

  // The auto-harvest placeholder formula stem — reversed 2026-06-11 from a
  // tolerated case to a flagged one (a Probability formula quiz built entirely
  // from these read "off"). The assembler also hard-excludes the pattern.
  it("flags the generic auto-harvest formula template", () => {
    expect(flagStem("Which of the following is the formula for Standard Deviation?")).not.toEqual([]);
    expect(flagStem("Which of the following is the formula for The addition rule (inclusion-exclusion)?")).not.toEqual(
      []
    );
  });

  it("does NOT flag a concrete formula stem that names what it computes", () => {
    expect(flagStem("The variance \\(\\sigma^2\\) of \\(n\\) observations is:")).toEqual([]);
    expect(flagStem("Which is the multiplication rule for \\(P(A \\cap B)\\)?")).toEqual([]);
  });
});

describe("flagStem — passes self-contained stems", () => {
  it("passes a prompt that names its quantity", () => {
    expect(flagStem("A pairing gives slope product \\(1.5\\). Valid \\(b_{yx}\\cdot b_{xy}\\)?")).toEqual([]);
  });

  it("passes 'The product of the two regression slopes equals?'", () => {
    expect(flagStem("The product of the two regression slopes equals?")).toEqual([]);
  });

  it("passes a full self-contained sentence", () => {
    expect(
      flagStem(
        "Two lines of regression are \\(x + 4y - 7 = 0\\) and \\(2x + 5y - 9 = 0\\). Identify which is \\(y\\) on \\(x\\) and report both slopes."
      )
    ).toEqual([]);
  });

  it("passes a normal recall question", () => {
    expect(flagStem("What is the variance of the first \\(n\\) natural numbers?")).toEqual([]);
  });

  it("does not flag 'the two' / non-deictic 'the'", () => {
    expect(flagStem("Find the median of \\(5, 9, 2, 7, 1\\).")).toEqual([]);
  });


  it("does not flag 'the same unit as the data'", () => {
    expect(
      flagStem("A data set is measured in kilograms. Which measure has the SAME unit as the data?")
    ).toEqual([]);
  });

  it("does not flag a short but math-complete stem", () => {
    expect(flagStem("Mode of \\(5, 5, 6, 6, 9\\)?")).toEqual([]);
    expect(flagStem("GM of \\(2\\) and \\(8\\)?")).toEqual([]);
    expect(flagStem("\\(\\sum_{i=1}^{3} i = ?\\)")).toEqual([]);
  });
});

// Defect A (2026-07-06): stems that reference a concrete object never given in the
// stem, or lead with an orphan clause — the flagStem back-ref checks miss these.
describe("flagStem — Defect A: references an object not shown in the stem", () => {
  it("flags a named determinant with no matrix shown inline", () => {
    expect(flagStem("If \\(a=b=c=2\\), the cyclic determinant is?")).not.toEqual([]);
  });

  it("flags a described determinant with no matrix shown inline", () => {
    expect(
      flagStem("In triangle \\(ABC\\), evaluate the determinant whose rows force a triangle identity. What is the typical value?")
    ).not.toEqual([]);
  });

  it("flags an orphan participial opener (prior step missing)", () => {
    expect(flagStem("After differentiating, two rows are equal. The determinant is?")).not.toEqual([]);
  });

  it("flags a dangling 'inside it' reference", () => {
    expect(
      flagStem("If a complex determinant evaluates to \\(6+11i\\) and you must find real unknowns \\(x, y\\) inside it, what's the method?")
    ).not.toEqual([]);
  });

  it("does NOT flag the SAME named determinant once the matrix is shown inline", () => {
    expect(
      flagStem("The cyclic determinant \\(\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix}\\) vanishes when?")
    ).toEqual([]);
  });

  it("does NOT flag a generic universal-fact 'a determinant' question", () => {
    expect(flagStem("What happens to a determinant when two rows are swapped?")).toEqual([]);
    expect(flagStem("Two equal rows give determinant?")).toEqual([]);
  });
});

// Defect B (2026-07-06): the correct option carries an editorial aside the
// distractors lack — a guessable "tell". Needs the full option set + answer.
describe("flagOptionTell — Defect B: correct-option 'tells'", () => {
  const q = (opts: Record<string, string>, ans: string) => flagOptionTell(opts, ans);

  it("flags a parenthetical gloss only the correct option carries", () => {
    expect(q({ A: "\\(8\\)", B: "\\(16\\)", C: "\\(64\\)", D: "\\(32\\) (not 8)" }, "D")).not.toEqual([]);
    expect(q({ A: "\\(1\\)", B: "\\(f(i)g(j)\\)", C: "Non-zero", D: "\\(0\\) (rank 1)" }, "D")).not.toEqual([]);
  });

  it("flags an em-dash / arrow gloss only the correct option carries", () => {
    expect(q({ A: "\\(1\\)", B: "\\(9\\)", C: "\\(3\\) — one per differentiated row", D: "\\(6\\)" }, "C")).not.toEqual([]);
    expect(q({ A: "A row of ones", B: "Unchanged", C: "The identity row", D: "A zero row → that determinant is \\(0\\)" }, "D")).not.toEqual([]);
  });

  it("does NOT flag when the correct answer is inherently the nuanced/definitional one (no aside)", () => {
    expect(q({ A: "The sum of its entries", B: "The trace", C: "Its largest entry", D: "Signed area of the parallelogram of its columns" }, "D")).toEqual([]);
    expect(q({ A: "Exactly one solution", B: "Always no solution", C: "No solution OR infinitely many", D: "Always infinitely many" }, "C")).toEqual([]);
  });

  it("does NOT flag when every option carries a parenthetical (aside is not a tell)", () => {
    expect(q({ A: "Yes (always)", B: "No (never)", C: "Maybe (sometimes)", D: "Only if square (special)" }, "B")).toEqual([]);
  });

  it("returns [] when the answer letter is missing or options are empty", () => {
    expect(q({ A: "x", B: "y" }, "C")).toEqual([]);
    expect(q({}, "A")).toEqual([]);
  });

  it("does NOT trip on math-only options (parens are inside \\(...\\))", () => {
    expect(q({ A: "\\(k\\det A\\)", B: "\\(k^2\\det A\\)", C: "\\(k^n \\det A\\)", D: "\\(nk\\det A\\)" }, "C")).toEqual([]);
  });
});
