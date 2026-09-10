import { describe, it, expect } from "vitest";
import {
  parseProvenanceTag,
  normaliseMath,
  stripArtifacts,
  splitImage,
  stripBlockquote,
  stripLeakedOptionRun,
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

  // pandoc escapes < and > outside math. Left alone they ship as literal
  // backslashes — "0\<x\<8" — on every p.d.f. support interval in the corpus.
  it("unescapes pandoc's escaped angle brackets", () => {
    expect(stripArtifacts("for 0\\<x\\<8 = 0 otherwise")).toBe("for 0<x<8 = 0 otherwise");
  });

  // A trailing "\:" is the compilation's flattening of the printed fill-in
  // blank. Confirmed against the 2019 page, where the item ends "______." and we
  // hold "\:". It renders as a literal backslash-colon.
  it("turns a trailing flattened blank into a real blank", () => {
    expect(stripArtifacts("the differential equation is \\:")).toBe(
      "the differential equation is ______.",
    );
  });

  // ...but when the blank is ALREADY there the artifact is just noise.
  it("drops the flattened blank when a real one is already present", () => {
    expect(stripArtifacts("at \\(\\theta = \\frac{\\pi}{3}\\) is ___. \\:")).toBe(
      "at \\(\\theta = \\frac{\\pi}{3}\\) is ___.",
    );
  });

  it("leaves a mid-string colon alone", () => {
    const s = "Evaluate: \\(\\int x\\,dx\\)";
    expect(stripArtifacts(s)).toBe(s);
  });

  // pandoc's continuation backslash can land MID-string, not just at a line end
  // — before the board's internal-choice "OR" marker. It ships as a literal
  // backslash between two sentences.
  it("removes a lone backslash standing between words", () => {
    expect(stripArtifacts("find \\(p\\). \\ OR Find the value of q.")).toBe(
      "find \\(p\\). OR Find the value of q.",
    );
  });

  // ...but NOT the LaTeX spacing command inside a math zone, which is how this
  // corpus lays out its piecewise p.d.f. definitions.
  it("keeps a spacing command inside a math zone", () => {
    const s = "\\(f(x) = x\\), for \\(0 < x < 8\\) \\(\\ \\ \\ \\ = 0\\), otherwise";
    expect(stripArtifacts(s)).toBe(s);
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

  // THE GAP THE TWO-RULE VERSION LEFT. The compilation emits a BARE "####" line
  // just before a titled banner, so an end-anchored cleanup ran while the banner
  // was still present and the banner rule then stranded the bare marker at the
  // end. Nine stems shipped with a trailing "####" before this became one rule.
  it("removes a bare heading marker AND the titled banner after it", () => {
    expect(
      stripArtifacts("then \\(n\\) is equal to _______. \\\n\n#### \n\n#### **C. Expectation and Variance**"),
    ).toBe("then \\(n\\) is equal to _______.");
  });

  it("removes a bare trailing heading marker on its own", () => {
    expect(stripArtifacts("none is spade. \\ ####")).toBe("none is spade.");
  });

  // The PHYSICS compilation NUMBERS its section headings where Maths letters
  // them ("### 1. Kinematics" vs "#### **A. Negation**"). The lettered-only rule
  // consumed just the "### " marker and left the title glued to the stem — 59 of
  // 379 Physics rows, 15.6%, one per section boundary.
  it("removes a NUMBERED section banner, the Physics form", () => {
    expect(
      stripArtifacts("State the formula for angle of banking. ### 3. Vertical Circular Motion"),
    ).toBe("State the formula for angle of banking.");
  });

  // The tag-removal step leaves the tag's OPENING backslash behind on purpose —
  // it is what forms the "\:" token the fill-in-blank rule keys on. Where the
  // compilation puts a full stop after the tag instead of a colon, the leftover
  // lands as " \." : 272 Physics stems, zero in Maths.
  it("cleans the leftover tag backslash before a full stop", () => {
    expect(stripArtifacts("along a horizontal circular track \\.")).toBe(
      "along a horizontal circular track.",
    );
  });

  // Where the item WRAPS, two backslashes meet: pandoc's line-continuation ends
  // the first line and the tag's escape opens the second, so once the newline
  // collapses the text reads "diameter\ \." A single-backslash rule leaves
  // "diameter\." behind, because replace() does not rescan its own output.
  it("cleans a RUN of backslashes before a full stop, the wrapped-item case", () => {
    expect(stripArtifacts("is a projection of U.C.M. on any diameter\\ \\.")).toBe(
      "is a projection of U.C.M. on any diameter.",
    );
  });

  // The stem often ends in its own full stop and the tag carries another, so a
  // naive substitution ships "________..".
  it("does not double the full stop when the stem already ends in one", () => {
    expect(stripArtifacts("kept in a uniform magnetic field, then ________. \\.")).toBe(
      "kept in a uniform magnetic field, then ________.",
    );
  });

  it("absorbs a spaced-off full stop too", () => {
    expect(stripArtifacts("the core of transformer because of its _______ . \\.")).toBe(
      "the core of transformer because of its _______.",
    );
  });

  // Where the item wraps, pandoc's hard-wrap backslash ending line 1 meets the
  // tag's escape opening line 2, so the collapsed text ends "________.\ \".
  // Stripping only the last one leaves "________.\" on the card.
  it("strips a RUN of trailing continuation backslashes", () => {
    expect(stripArtifacts("kept stationary in a uniform magnetic field, then ________.\\ \\")).toBe(
      "kept stationary in a uniform magnetic field, then ________.",
    );
  });

  it("still strips a single trailing continuation backslash", () => {
    expect(stripArtifacts("the distance between a node and its antinode is ____.\\")).toBe(
      "the distance between a node and its antinode is ____.",
    );
  });

  // "\[...\]" is this project's DISPLAY-MATH delimiter, so an escaped prose
  // bracket does not merely look untidy — it typesets the board's "Given:"
  // clause as maths, or ships a literal "\[" when the pair is unbalanced.
  it("unescapes a prose bracket pair", () => {
    expect(stripArtifacts("What is the diameter of the drop? \\[Assume all terms in SI unit\\].")).toBe(
      "What is the diameter of the drop? [Assume all terms in SI unit].",
    );
  });

  it("pulls a closing bracket back out of the math zone it was absorbed into", () => {
    expect(stripArtifacts("Calculate the length of the circular track. \\[\\(\\pi = 3.142 \\rbrack\\).")).toBe(
      "Calculate the length of the circular track. [\\(\\pi = 3.142\\)].",
    );
  });

  it("leaves a genuine \\lbrack...\\rbrack pair inside a zone alone", () => {
    const s = "the dimensions are \\(\\left\\lbrack L^{-1}M^{1}T^{-2} \\right\\rbrack\\)";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("never strips a closing math delimiter, which also ends in a backslash-paren", () => {
    expect(stripArtifacts("the value of \\(x\\)")).toBe("the value of \\(x\\)");
  });

  // pandoc's hard-wrap backslash also lands MID-sentence, where the item wraps
  // and no provenance tag is involved. The shipped rule required a SPACE before
  // it, so "conductor.\ [given data]" was left with a literal backslash on the
  // card — 11 Physics stems, none in Maths.
  it("strips a mid-sentence continuation backslash with no space before it", () => {
    expect(stripArtifacts("mechanical force per unit area of the charged conductor.\\ [given]")).toBe(
      "mechanical force per unit area of the charged conductor. [given]",
    );
  });

  it("KEEPS a LaTeX thin space inside a math zone — the same two characters", () => {
    const s = "the p.d.f. is \\(\\ \\ \\ = 0\\) elsewhere";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("keeps a question mark rather than replacing it with a full stop", () => {
    expect(stripArtifacts("what is the magnetic field at the centre of the coil? \\.")).toBe(
      "what is the magnetic field at the centre of the coil?",
    );
  });

  it("still restores the fill-in blank from a trailing \\: — the Maths path", () => {
    expect(stripArtifacts("the equation of the tangent at P(1,3) is \\:")).toBe(
      "the equation of the tangent at P(1,3) is ______.",
    );
  });

  it("removes a numbered banner that is bold and absorbed into an option", () => {
    expect(
      stripArtifacts("both current and e.m.f. are induced #### **2. Self Induction and Mutual Induction**"),
    ).toBe("both current and e.m.f. are induced");
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

describe("pipe tables survive whitespace collapsing", () => {
  // Everything else in this corpus is one paragraph, so the normaliser joins
  // lines — but a GFM table IS its line structure. Flattened onto one line the
  // separator row stops being a separator and the whole table ships as raw
  // pipes. Five probability-distribution tables were doing exactly that.
  it("keeps the line breaks of a pipe table", () => {
    const out = normaliseMath(
      "A random variable has the distribution:\n\n| X = x | -2 | -1 |\n|-------|----|----|\n| P(x) | 0.1 | 0.2 |\n\nThen $E(x)$ = ___.",
    );
    const lines = out.split("\n");
    expect(lines.some((l) => /^\|[\s\-:|]+\|$/.test(l.trim()))).toBe(true);
    expect(lines.filter((l) => l.trim().startsWith("|")).length).toBe(3);
    expect(out).toContain("\\(E(x)\\)");
  });

  it("still collapses ordinary prose to one line", () => {
    expect(normaliseMath("first line\nsecond line\n\nthird")).toBe("first line second line third");
  });
});

describe("stripBlockquote", () => {
  // pandoc renders the compilation's indented option lists as BLOCKQUOTES. Left
  // alone the "> " markers land INSIDE \begin{bmatrix} and break the matrix —
  // four options of one Matrices row carried them.
  it("removes the marker from every line of a blockquote", () => {
    expect(stripBlockquote("> \\(a\\) $\\begin{vmatrix}\n> 1 & 3 \\\\\n>  - 4 & 2\n> \\end{vmatrix}$")).toBe(
      "\\(a\\) $\\begin{vmatrix}\n1 & 3 \\\\\n - 4 & 2\n\\end{vmatrix}$",
    );
  });

  // THE REASON THIS RUNS ON THE RAW BLOCK. Once lines are joined, a blockquote
  // marker is indistinguishable from a real inequality, and the first attempt at
  // this rule — written to match mid-string — ate exactly this.
  it("leaves a genuine greater-than alone", () => {
    expect(stripBlockquote("\\(x > 3\\) and \\(y \\geq 0\\)")).toBe("\\(x > 3\\) and \\(y \\geq 0\\)");
  });

  it("leaves an inequality that merely starts a line alone when not a marker", () => {
    expect(stripBlockquote("find x\n\\(x > 3\\)")).toBe("find x\n\\(x > 3\\)");
  });
});

describe("stripLeakedOptionRun", () => {
  // vectors#18's printed labels are (a)(b)(b)(c) — a duplicated "b" and no "d" —
  // so the run fails the strict A-D split and stays glued to the stem, where it
  // renders in full on the card. Its real options come from the defects ledger.
  it("cuts a leaked run off the end", () => {
    expect(
      stripLeakedOptionRun("The value of \\(x\\) is \\ > \\(a\\) \\(0\\) (b) \\(- 1\\) (b) \\(1\\) (c) \\(3\\)"),
    ).toBe("The value of \\(x\\) is");
  });

  // A lone "(a)" is ordinary prose, not a leak.
  it("keeps a single parenthesised letter", () => {
    const s = "In part (a) find the value.";
    expect(stripLeakedOptionRun(s)).toBe(s);
  });

  it("keeps a stem with no label run at all", () => {
    const s = "Find the direction cosines of the line.";
    expect(stripLeakedOptionRun(s)).toBe(s);
  });

  // Needs at least two DISTINCT labels after the "(a)", so a stem that happens to
  // mention (a) twice is not mistaken for an option block.
  it("keeps a stem whose repeated label is the same letter", () => {
    const s = "Compare part (a) with part (a) again and (a) once more.";
    expect(stripLeakedOptionRun(s)).toBe(s);
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

describe("stripArtifacts — a trailing thin space before a math-zone close", () => {
  // These render fine on the web (KaTeX ignores the dangling spacing macro) and
  // are UNCONVERTIBLE to OMML, so they would ship as raw LaTeX in a teacher's
  // downloaded Word answer key and nowhere else. Seven zones across four Physics
  // rows were shaped this way; `audit:omml` is the only gate that sees them.
  //
  // The discriminator is position: a thin space at the END of a zone is dead
  // (nothing follows it to be spaced from), while one at the START or INSIDE is
  // real layout this corpus depends on.
  it("drops a single trailing thin space", () => {
    // Kinetic Theory Q.1(vi) option B, verbatim.
    expect(stripArtifacts("\\(\\left( \\frac{3}{2} \\right)k_{B}T\\ \\)"))
      .toBe("\\(\\left( \\frac{3}{2} \\right)k_{B}T\\)");
  });

  it("drops a RUN of trailing thin spaces", () => {
    // Kinetic Theory Q.1(vi) option A carries two; Dual Nature Q.5(v) B likewise.
    expect(stripArtifacts("\\(\\frac{h\\nu}{c}\\ \\ \\)")).toBe("\\(\\frac{h\\nu}{c}\\)");
  });

  it("KEEPS a LEADING thin space — it is real layout, and it converts fine", () => {
    // Kinetic Theory Q.1(i) option C and Fluids Q.1(ii) option D both open with one.
    expect(stripArtifacts("\\(\\ hE\\)")).toBe("\\(\\ hE\\)");
  });

  it("KEEPS a thin space INSIDE a group", () => {
    const s = "\\(\\ \\frac{1}{\\sqrt{2}\\pi nd^{2}\\ }\\)";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("leaves a zone with no trailing space untouched", () => {
    const s = "\\(\\left( \\frac{2}{3} \\right)RT\\)";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("handles the leading-and-trailing case, dropping only the trailing one", () => {
    // Fluids Q.1(ii) option A, verbatim.
    expect(stripArtifacts("\\(\\ \\left\\lbrack L^{- 1}M^{1}T^{- 2} \\right\\rbrack\\ \\)"))
      .toBe("\\(\\ \\left\\lbrack L^{- 1}M^{1}T^{- 2} \\right\\rbrack\\)");
  });
});
