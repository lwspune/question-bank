import { describe, it, expect } from "vitest";
import {
  parseProvenanceTag,
  normaliseMath,
  stripArtifacts,
  splitImage,
} from "../scripts/mh-hsc-12-pyq/lib";

// Every case below is a REAL string observed in the compilation during the
// Phase 0 analysis, not an invented one — the whole point of this normaliser is
// that the source's quirks are specific and were measured.

describe("parseProvenanceTag", () => {
  it("reads a tag carrying an explicit month", () => {
    expect(parseProvenanceTag("[Q. 1. (A) i., March 2015]")).toEqual({
      questionNumber: "Q. 1. (A) i.",
      month: "March",
      year: 2015,
    });
  });

  it("reads February, the one non-March sitting", () => {
    expect(parseProvenanceTag("[Q. 29, February 2020]")).toEqual({
      questionNumber: "Q. 29",
      month: "February",
      year: 2020,
    });
  });

  // 2024 and 2025 tags carry NO month. The board sits in Feb/March, but which
  // one is not recorded, so month stays null rather than being invented.
  it("returns a null month when the tag has none, rather than guessing", () => {
    expect(parseProvenanceTag("[Q. 27, 2025]")).toEqual({
      questionNumber: "Q. 27",
      month: null,
      year: 2025,
    });
  });

  it("survives pandoc's backslash-escaped closing bracket", () => {
    expect(parseProvenanceTag("[Q. 4, 2024\\]")?.year).toBe(2024);
  });

  it("handles the (OR) alternative-question marker", () => {
    expect(parseProvenanceTag("[Q. 30 (OR), March 2019]")).toEqual({
      questionNumber: "Q. 30 (OR)",
      month: "March",
      year: 2019,
    });
  });

  it("returns null for a string with no tag", () => {
    expect(parseProvenanceTag("Find the inverse of the matrix.")).toBeNull();
  });
});

describe("normaliseMath", () => {
  it("converts $...$ delimiters to the project's \\(...\\)", () => {
    expect(normaliseMath("If $A = B$ then")).toBe("If \\(A = B\\) then");
  });

  it("leaves text with no math untouched", () => {
    expect(normaliseMath("Write the converse.")).toBe("Write the converse.");
  });

  // All 20 matrix environments in the source are vmatrix (determinant bars) and
  // every one denotes a MATRIX — verified against the stems ("the inverse of the
  // matrix", "adjoint of matrix A") and against the 2023 paper, which prints its
  // counterpart with brackets.
  it("converts vmatrix to bmatrix", () => {
    expect(normaliseMath("$\\begin{vmatrix} 1 & 2 \\end{vmatrix}$")).toBe(
      "\\(\\begin{bmatrix} 1 & 2 \\end{bmatrix}\\)",
    );
  });

  it("maps the emoji-plane arrow used as 'for' in p.d.f. definitions", () => {
    // U+1F86A is used as a separator meaning "for", NOT as an implication —
    // rendering it \rightarrow would read as a limit.
    expect(normaliseMath("f(x)= $x^2/3$ \u{1F86A} -1<x<2")).toContain(" for ");
    expect(normaliseMath("f(x)= $x^2/3$ \u{1F86A} -1<x<2")).not.toContain("\\rightarrow");
  });

  it("maps loose unicode math to LaTeX inside a math zone", () => {
    expect(normaliseMath("$\\angle B$ is 90")).toBe("\\(\\angle B\\) is 90");
    expect(normaliseMath("x ≠ y")).toBe("x \\(\\neq\\) y");
    expect(normaliseMath("± 3")).toBe("\\(\\pm\\) 3");
  });

  it("strips the non-breaking space", () => {
    expect(normaliseMath("a b")).toBe("a b");
  });

  // Found by probing the extracted drafts, not by imagining it: pandoc's
  // line-continuation backslash sometimes lands INSIDE a math zone, and a zone
  // ending in a lone backslash is a KaTeX parse error that takes the whole stem
  // down. Two rows carried it ("\tan^{3}\theta\\)").
  it("strips a lone trailing backslash inside a math zone", () => {
    expect(normaliseMath("$\\tan^{3}\\theta\\$ with")).toBe("\\(\\tan^{3}\\theta\\) with");
  });

  it("does not touch a legitimate command ending the zone", () => {
    expect(normaliseMath("$a \\theta$ b")).toBe("\\(a \\theta\\) b");
  });

  // A math zone butted straight against the next word renders glued —
  // "]³respectively". Five rows carried this.
  it("separates a math zone from a word glued to it", () => {
    expect(normaliseMath("$x^{3}$respectively are")).toBe("\\(x^{3}\\) respectively are");
  });

  // ...but NOT for a bare symbol command, where the glue is correct: "∠B" is an
  // angle named B, and inserting a space to give "∠ B" would be a regression.
  // The letter is pulled INTO the zone instead.
  it("absorbs the letter into the zone after a bare angle symbol", () => {
    expect(normaliseMath("then $\\angle$B = ?")).toBe("then \\(\\angle B\\) = ?");
  });

  it("is idempotent — running it twice equals running it once", () => {
    const s = "If $A = \\begin{vmatrix} 1 \\end{vmatrix}$ then x ≠ y";
    expect(normaliseMath(normaliseMath(s))).toBe(normaliseMath(s));
  });
});

describe("stripArtifacts", () => {
  it("removes the trailing 'Options:' label", () => {
    expect(stripArtifacts("The negation of p is ____. Options:")).toBe(
      "The negation of p is ____.",
    );
  });

  // pandoc escapes the fill-in blanks; \_\_\_\_ renders as literal
  // backslash-underscores outside a math zone (the JEE lesson).
  it("unescapes pandoc's escaped blanks", () => {
    expect(stripArtifacts("A\\^6 = \\_\\_\\_\\_.")).toContain("____");
    expect(stripArtifacts("A\\^6 = \\_\\_\\_\\_.")).not.toContain("\\_");
  });

  it("removes an LWS editorial annotation", () => {
    expect(
      stripArtifacts(
        "If A = {1,2} then which is not true? (Note: This question involves quantifiers but is set in the context of sets)",
      ),
    ).toBe("If A = {1,2} then which is not true?");
  });

  it("removes a stray pandoc comment separator", () => {
    expect(stripArtifacts("a. exactly 5 times. <!-- --> b. at least once.")).toBe(
      "a. exactly 5 times. b. at least once.",
    );
  });

  it("collapses the whitespace left behind by a removal", () => {
    expect(stripArtifacts("Find   k,  if   the sum")).toBe("Find k, if the sum");
  });

  it("leaves a clean stem untouched", () => {
    const s = "Find the direction cosines of the line.";
    expect(stripArtifacts(s)).toBe(s);
  });

  // Found by running the extractor on the pilot chapter, not by imagining it:
  // pandoc emits a hard-wrap continuation backslash at end of line, which
  // otherwise ships as a literal "\" on the end of the stem.
  it("removes pandoc's trailing line-continuation backslash", () => {
    expect(stripArtifacts("The negation of p is __________. \\")).toBe(
      "The negation of p is __________.",
    );
  });

  // "Options:" is not always trailing — on a stem whose option list pandoc put
  // in a following block, the label sits mid-string.
  it("removes an 'Options:' label that is not at the end", () => {
    expect(stripArtifacts("which of the following is not true? Options:\n\nrest")).toBe(
      "which of the following is not true? rest",
    );
  });

  it("removes the continuation backslash even with trailing space before the newline", () => {
    expect(stripArtifacts("not true? \\ \n\ntail")).toBe("not true? tail");
  });

  it("removes a comment separator split across lines", () => {
    expect(stripArtifacts("stem Options:\n\n<!-- --\n>\n\ntail")).toBe("stem tail");
  });

  // The compilation's own A./B./C. section banners. A question block runs to the
  // next NUMBERED item, so a banner sitting between two questions is absorbed by
  // the one before it — three stems shipped with one glued on in the first run.
  it("removes an absorbed section banner", () => {
    expect(
      stripArtifacts("Write inverse and contrapositive. #### **C. Truth Tables, Tautology**"),
    ).toBe("Write inverse and contrapositive.");
  });

  it("removes an absorbed banner that follows a continuation backslash", () => {
    expect(stripArtifacts("If \\(x<y\\). \\ #### **D. Symbolic Logic**")).toBe("If \\(x<y\\).");
  });

  it("removes the stray bracket left when pandoc closes a math zone early", () => {
    // Source: "$...\lbrack( \sim q \land r) \vee \sim p$\]." — the closing
    // \rbrack fell OUTSIDE the math zone and would render as a literal "\]".
    expect(stripArtifacts("\\(\\lbrack( \\sim q) \\vee \\sim p\\)\\].")).toBe(
      "\\(\\lbrack( \\sim q) \\vee \\sim p \\rbrack\\).",
    );
  });
});

describe("splitImage", () => {
  it("lifts a pandoc image reference out of the stem", () => {
    const r = splitImage(
      '![](media/image1.png){width="2.575in" height="1.62in"}Find the symbolic form.',
    );
    expect(r.image).toBe("image1.png");
    expect(r.text).toBe("Find the symbolic form.");
  });

  it("returns no image for an ordinary stem", () => {
    expect(splitImage("Find the symbolic form.")).toEqual({
      text: "Find the symbolic form.",
    });
  });

  // MEASURED, not assumed: all four of the compilation's own circuit
  // descriptions were checked against the extracted PNGs on 2026-08-13 and ALL
  // FOUR are wrong (see data/defects.json → circuitDescriptionsWrong). They are
  // the compiler's reading of the diagram, not the board's text, so once the
  // real image is attached the description is both redundant and false.
  it("drops the compilation's circuit description when an image is present", () => {
    const r = splitImage(
      '![](media/image2.png){width="2.0in" height="1.4in"}Express the following circuit in symbolic form: (Circuit diagram depicting \\(S_{1}\\) and \\(S_{2}\\) in parallel, connected to \\(S_{3}\\) in series).',
    );
    expect(r.image).toBe("image2.png");
    expect(r.text).toBe("Express the following circuit in symbolic form:");
  });

  // The guard that matters: with no image to replace it, the description is the
  // only thing making the question answerable, so it must survive.
  it("KEEPS a circuit description when there is no image to replace it", () => {
    const s = "Express the circuit: (Circuit diagram showing \\(S_{1}\\) in series).";
    expect(splitImage(s)).toEqual({ text: s });
  });
});
