import { describe, it, expect } from "vitest";
import {
  normalizeCrLf,
  stripAnswerPrefix,
  stripStrayLineBreaks,
  alignmentMatrixToAligned,
  wrapBareCommands,
  repairSolution,
  solutionArtifacts,
} from "../scripts/lib/solutionArtifacts";

/**
 * Every fixture below is a VERBATIM excerpt from a live PUBLIC solution in the
 * three NDA Maths Final Mock papers — not an invented shape. The pandoc-based
 * `.docx` ingests left five distinct artifact classes behind, all of which
 * render as literal junk because our renderer only typesets inside `\(...\)`.
 */

describe("normalizeCrLf", () => {
  it("collapses CRLF to LF and drops a bare CR", () => {
    expect(normalizeCrLf("a\r\nb\rc")).toBe("a\nb\nc");
  });

  it("is idempotent", () => {
    const once = normalizeCrLf("a\r\nb");
    expect(normalizeCrLf(once)).toBe(once);
  });
});

describe("stripAnswerPrefix", () => {
  // The source PDFs open each worked solution with the answer key. Leaving it
  // in leaks the letter, and its trailing `**` is an unbalanced bold marker.
  it("strips `Ans. (b)** : `", () => {
    expect(stripAnswerPrefix("Ans. (b)** : There are total 10 letters")).toBe(
      "There are total 10 letters"
    );
  });

  it("strips the colon-before-asterisks variant `Ans. (d) :** `", () => {
    expect(stripAnswerPrefix("Ans. (d) :** Given,")).toBe("Given,");
  });

  it("strips the hyphen variants `Ans-(a)**` and `Ans- (c)**`", () => {
    expect(stripAnswerPrefix("Ans-(a)**\n\nSince the events")).toBe(
      "Since the events"
    );
    expect(stripAnswerPrefix("Ans- (c)**\nWe have")).toBe("We have");
  });

  it("eats a trailing line-continuation `\\\\` that belongs to the prefix", () => {
    expect(stripAnswerPrefix("Ans- (d)**\\\\\nWe have")).toBe("We have");
  });

  // THE regression that matters: the very next token is often `\(`, a SINGLE
  // backslash. A greedy backslash-eating class would swallow it and destroy
  // the opening math delimiter, silently turning the whole solution to prose.
  it("does NOT eat the backslash of a following `\\(` math zone", () => {
    expect(stripAnswerPrefix("Ans. (d)** : \\(f(x) = 1\\)")).toBe("\\(f(x) = 1\\)");
  });

  // The same leak arrives under three keywords, found only by re-scanning the
  // corpus AFTER the first repair pass: `Ans`, `Sol.` and `Solution`.
  it("strips the `Solution (a)**` and `Sol. (a)**` forms", () => {
    expect(stripAnswerPrefix("Solution (a)** \\(\\because\\) By sine rule")).toBe(
      "\\(\\because\\) By sine rule"
    );
    expect(stripAnswerPrefix("Sol. (a)** The required mean")).toBe(
      "The required mean"
    );
  });

  it("leaves a solution that does not open with an answer letter alone", () => {
    const s = "Answering this needs the sine rule.";
    expect(stripAnswerPrefix(s)).toBe(s);
  });

  // The parenthesised letter is REQUIRED, so ordinary prose that happens to
  // begin with the keyword is never eaten.
  it("leaves prose opening with the keyword alone", () => {
    for (const s of [
      "Solution: substitute x = 1.",
      "Sol. Let the roots be alpha and beta.",
      "Solving a cubic needs the factor theorem.",
    ])
      expect(stripAnswerPrefix(s)).toBe(s);
  });

  // Live on Mock-1 Q41: the letter was already gone upstream, leaving a naked
  // `** ` that prints literally. Only stripped when the `**` count is ODD —
  // an even count is real bold and must survive.
  it("strips a leading UNBALANCED `**`", () => {
    expect(stripAnswerPrefix("** Required number of ways")).toBe(
      "Required number of ways"
    );
  });

  it("keeps a leading `**` that is genuine bold", () => {
    const s = "**Given** the triangle";
    expect(stripAnswerPrefix(s)).toBe(s);
  });

  it("is idempotent", () => {
    const once = stripAnswerPrefix("Ans. (b)** : text");
    expect(stripAnswerPrefix(once)).toBe(once);
  });
});

describe("stripStrayLineBreaks", () => {
  it("removes a `\\\\` that sits at end-of-line outside any math zone", () => {
    expect(stripStrayLineBreaks("we get \\(f(x)\\)\\\\\n  \\(= 2\\)")).toBe(
      "we get \\(f(x)\\)\n  \\(= 2\\)"
    );
  });

  // pandoc emits a SINGLE trailing backslash for a Word line break too — live
  // on Mock-1 Q91, where `…\epsilon\ N\)\` printed a stray `\` at line end.
  it("removes a single trailing backslash at end-of-line", () => {
    expect(stripStrayLineBreaks("Reflexive \\(aRa\\)\\\n  next")).toBe(
      "Reflexive \\(aRa\\)\n  next"
    );
  });

  it("does not touch a backslash that is not at end-of-line", () => {
    const s = "a \\ b";
    expect(stripStrayLineBreaks(s)).toBe(s);
  });

  // THE invariant: inside math, `\\` is a ROW SEPARATOR. Removing it collapses
  // a matrix or an aligned block into one unreadable line.
  it("preserves `\\\\` inside a math zone", () => {
    const s = "\\[\\begin{matrix} a & b \\\\ c & d \\end{matrix}\\]";
    expect(stripStrayLineBreaks(s)).toBe(s);
  });

  it("is idempotent", () => {
    const once = stripStrayLineBreaks("x\\\\\ny");
    expect(stripStrayLineBreaks(once)).toBe(once);
  });
});

describe("alignmentMatrixToAligned", () => {
  // pandoc renders a Word equation ARRAY as `\begin{matrix}`, which centres
  // each column — so a two-line derivation stacks into what reads as one
  // nested fraction. `aligned` is the environment that shape actually wants.
  it("converts a bare alignment matrix", () => {
    expect(
      alignmentMatrixToAligned("\\[\\begin{matrix}\n & A = B \\\\\n = & C\n\\end{matrix}\\]")
    ).toBe("\\[\\begin{aligned}\n & A = B \\\\\n = & C\n\\end{aligned}\\]");
  });

  // THE invariant: a `\left|…\right|` wrapper means this is a genuine
  // determinant or matrix in the mathematics. Converting it would be wrong.
  it("leaves a delimiter-wrapped matrix alone", () => {
    const s = "\\(\\left| \\begin{matrix} 1 & 2 \\\\ 3 & 4 \\end{matrix} \\right|\\)";
    expect(alignmentMatrixToAligned(s)).toBe(s);
  });

  // A matrix with NO `&` is not an alignment hack — it is a genuine stack, and
  // `matrix` already renders it correctly. Live on Mock-1 Q120, where a matrix
  // inside a `\frac` lays out a binary subtraction.
  it("leaves a matrix with no alignment marker alone", () => {
    const s = "\\(\\frac{\\begin{matrix}\n 10001100 \\\\\n - 1101101\n\\end{matrix}}{x}\\)";
    expect(alignmentMatrixToAligned(s)).toBe(s);
  });

  it("leaves bmatrix/vmatrix/pmatrix alone", () => {
    const s = "\\(\\begin{bmatrix} 1 \\end{bmatrix}\\begin{vmatrix} 2 \\end{vmatrix}\\)";
    expect(alignmentMatrixToAligned(s)).toBe(s);
  });

  it("converts one bare matrix while leaving a delimited one in the same string", () => {
    const s =
      "\\[\\begin{matrix} & x \\end{matrix}\\] and \\(\\left| \\begin{matrix} 1 \\end{matrix} \\right|\\)";
    const out = alignmentMatrixToAligned(s);
    expect(out).toContain("\\begin{aligned} & x \\end{aligned}");
    expect(out).toContain("\\left| \\begin{matrix} 1 \\end{matrix} \\right|");
  });

  // pandoc NESTS these — a row of an alignment block can itself be one. Naive
  // `indexOf("\\end{matrix}")` pairs the outer begin with the INNER end, which
  // leaves a dangling `\end{matrix}` and breaks the whole zone. Live case:
  // question 3d09f0ca (Mock 1), a roots-of-a-quadratic derivation.
  it("pairs nested matrices correctly and converts both", () => {
    const s = "\\(\\begin{matrix}\n & a \\\\\n & \\begin{matrix} x & y \\end{matrix}\n\\end{matrix}\\)";
    const out = alignmentMatrixToAligned(s);
    expect(out).toBe(
      "\\(\\begin{aligned}\n & a \\\\\n & \\begin{aligned} x & y \\end{aligned}\n\\end{aligned}\\)"
    );
    expect(out).not.toContain("matrix");
  });

  it("converts a nested bare matrix while keeping a nested DELIMITED one", () => {
    const s =
      "\\(\\begin{matrix} & \\left| \\begin{matrix} 1 \\end{matrix} \\right| \\end{matrix}\\)";
    expect(alignmentMatrixToAligned(s)).toBe(
      "\\(\\begin{aligned} & \\left| \\begin{matrix} 1 \\end{matrix} \\right| \\end{aligned}\\)"
    );
  });

  it("leaves every environment balanced", () => {
    const s = "\\(\\begin{matrix}\n & \\begin{matrix} x \\end{matrix}\n\\end{matrix}\\)";
    const out = alignmentMatrixToAligned(s);
    const count = (re: RegExp) => (out.match(re) ?? []).length;
    expect(count(/\\begin\{aligned\}/g)).toBe(count(/\\end\{aligned\}/g));
    expect(count(/\\begin\{matrix\}/g)).toBe(count(/\\end\{matrix\}/g));
  });

  it("is idempotent", () => {
    const once = alignmentMatrixToAligned("\\[\\begin{matrix} & a \\end{matrix}\\]");
    expect(alignmentMatrixToAligned(once)).toBe(once);
  });

  it("is idempotent on the nested shape", () => {
    const once = alignmentMatrixToAligned(
      "\\(\\begin{matrix} & \\begin{matrix} x \\end{matrix} \\end{matrix}\\)"
    );
    expect(alignmentMatrixToAligned(once)).toBe(once);
  });
});

describe("wrapBareCommands", () => {
  it("wraps a LaTeX command stranded outside a math zone", () => {
    expect(wrapBareCommands("Vectors coplanar \\Rightarrow \\(x = 1\\)")).toBe(
      "Vectors coplanar \\(\\Rightarrow\\) \\(x = 1\\)"
    );
  });

  it("wraps a run of adjacent commands as ONE zone", () => {
    expect(wrapBareCommands("step \\quad \\ldots done")).toBe(
      "step \\(\\quad \\ldots\\) done"
    );
  });

  it("leaves commands inside a math zone alone", () => {
    const s = "\\(a \\Rightarrow b\\)";
    expect(wrapBareCommands(s)).toBe(s);
  });

  // A Windows path is NOT LaTeX. `\Users` must never be wrapped into math.
  it("does not touch a backslash path", () => {
    const s = "see C:\\Users\\vilas\\out";
    expect(wrapBareCommands(s)).toBe(s);
  });

  // THE regression this caught in production: a command that takes a BRACE
  // ARGUMENT must never be wrapped, because the wrap closes before the brace
  // and strands the argument — `\begin{aligned}` became `\(\begin\){aligned}`,
  // which is worse than leaving it alone. Live row b59313e2 (Mock 1 Q38).
  it("never wraps a command that takes a brace argument", () => {
    for (const s of [
      "\\begin{matrix} a \\end{matrix}",
      "\\text{~Explanation~} then",
      "x = \\frac{1}{2} here",
    ])
      expect(wrapBareCommands(s)).toBe(s);
  });

  it("never wraps \\left / \\right, which take a delimiter", () => {
    const s = "A = \\left| M \\right| done";
    expect(wrapBareCommands(s)).toBe(s);
  });

  // SUPERSEDED BEHAVIOUR, kept as an explicit assertion. An earlier version
  // wrapped the operator here and left `\frac{1}{2}` literal — a half repair
  // that reads as finished. A row mixing the two is now classified as a raw
  // block and left whole for an editor, so `wrapBareCommands` is a no-op.
  it("declines the whole row when an argument-taking command sits beside it", () => {
    const s = "\\therefore x = \\frac{1}{2}";
    expect(wrapBareCommands(s)).toBe(s);
  });

  it("wraps an operator when the rest of the math IS delimited", () => {
    expect(wrapBareCommands("\\therefore x = \\(\\frac{1}{2}\\)")).toBe(
      "\\(\\therefore\\) x = \\(\\frac{1}{2}\\)"
    );
  });

  it("is idempotent", () => {
    const once = wrapBareCommands("a \\Rightarrow b");
    expect(wrapBareCommands(once)).toBe(once);
  });
});

describe("repairSolution", () => {
  it("applies every class to a real Mock-2 Q2 solution", () => {
    const before =
      "Ans. (b)** : There are total 10 letters in the word POSSESSIVE. Out of which 4 are S.\\\\\r\n\\(\\therefore\\) Required probability \\(= \\frac{4}{10}\\)";
    const after = repairSolution(before);
    expect(after).toBe(
      "There are total 10 letters in the word POSSESSIVE. Out of which 4 are S.\n\\(\\therefore\\) Required probability \\(= \\frac{4}{10}\\)"
    );
  });

  it("is idempotent on real content", () => {
    const before = "Ans-(a)**\r\n\r\nहल : \\(x = 1\\)\\\\\r\nDone";
    const once = repairSolution(before);
    expect(repairSolution(once)).toBe(once);
  });

  it("returns the input unchanged when there is nothing to repair", () => {
    const clean = "Substitute \\(x = \\sin t\\). Hence (C).";
    expect(repairSolution(clean)).toBe(clean);
  });
});

describe("solutionArtifacts", () => {
  it("reports each class it finds, and reports nothing on clean text", () => {
    expect(solutionArtifacts("Substitute \\(x = 1\\). Hence (C).")).toEqual([]);
    expect(solutionArtifacts("Ans. (b)** : x")).toContain("answer-prefix");
    expect(solutionArtifacts("a\\\\\nb")).toContain("stray-linebreak");
    expect(solutionArtifacts("\\[\\begin{matrix} & a \\end{matrix}\\]")).toContain(
      "alignment-matrix"
    );
    expect(solutionArtifacts("a \\Rightarrow b")).toContain("bare-command");
    expect(solutionArtifacts("a\r\nb")).toContain("crlf");
  });

  // Devanagari is deliberately DETECTED and never auto-repaired: translating
  // is an editorial act, and deleting the line would delete the reasoning.
  it("flags Devanagari without repairSolution touching it", () => {
    const s = "हल : \\(x = 1\\)";
    expect(solutionArtifacts(s)).toContain("devanagari");
    expect(repairSolution(s)).toBe(s);
  });

  // A solution that is WHOLESALE raw LaTeX needs one wrap around the whole
  // block — an editorial judgement about where the math starts and ends. Doing
  // it token-by-token produces nonsense, so this is reported, never repaired.
  it("flags a raw-LaTeX block and leaves it completely alone", () => {
    const s = "\\begin{matrix}\n & A = \\left| M \\right| \\\\\n & B\n\\end{matrix}";
    expect(solutionArtifacts(s)).toContain("raw-latex-block");
    expect(repairSolution(s)).toBe(s);
  });

  it("does not flag a raw block when the LaTeX is properly delimited", () => {
    const s = "\\(\\begin{matrix} & a \\end{matrix}\\)";
    expect(solutionArtifacts(s)).not.toContain("raw-latex-block");
  });

  // A row carrying an UNDELIMITED command that takes an argument is also a raw
  // block, even with no `\begin{}`: those commands cannot be auto-wrapped, so
  // wrapping only the argument-less ones around them leaves the row HALF
  // repaired — `\bigtriangleup` typeset, `\frac{OB}{OA}` still literal — which
  // reads as finished when it is not. Live row c77dd2d3 (Mock 1 Q114).
  it("flags an undelimited argument-taking command as a raw block", () => {
    const s = "ln \\bigtriangleup OAB, tan45^{\\circ} = \\frac{OB}{OA}";
    expect(solutionArtifacts(s)).toContain("raw-latex-block");
    expect(repairSolution(s)).toBe(s);
  });

  // …but a stranded OPERATOR beside properly delimited math is still repaired.
  it("does not flag Q16's shape, which is safely repairable", () => {
    const s = "Vectors coplanar \\Rightarrow \\(\\frac{a}{b} = 0\\).";
    expect(solutionArtifacts(s)).not.toContain("raw-latex-block");
    expect(repairSolution(s)).toBe(
      "Vectors coplanar \\(\\Rightarrow\\) \\(\\frac{a}{b} = 0\\)."
    );
  });
});
