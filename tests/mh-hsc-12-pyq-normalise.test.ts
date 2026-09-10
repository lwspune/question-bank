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

describe("parseProvenanceTag — the CHEMISTRY compilation's tag shapes", () => {
  // Chemistry is the third subject on this pipeline and its compilation tags
  // questions DIFFERENTLY from Maths and Physics, in two ways that both break the
  // original rule:
  //
  //   separator   Maths/Physics always use a COMMA ("[Q. 4, March 2018]").
  //               Chemistry uses a comma OR a PERIOD ("[Q.7.i. March 2017]").
  //   date order  Maths/Physics are always month-then-year. Chemistry is BOTH
  //               ways round, almost exactly 50/50 across 399 tags —
  //               180 "March 2017" against 179 "2016 March".
  //
  // An item whose tag fails to parse is DROPPED by the extractor, so the old rule
  // would have silently lost most of the corpus. Measured, not guessed: two of my
  // own probes disagreed with the source before I enumerated the shapes.

  it("reads YEAR-FIRST with a comma — the commonest Chemistry shape", () => {
    expect(parseProvenanceTag("[Q.4.ii, 2016 March]")).toEqual({
      questionNumber: "Q.4.ii",
      month: "March",
      year: 2016,
    });
  });

  it("reads MONTH-FIRST with a PERIOD separator", () => {
    expect(parseProvenanceTag("[Q.7.i. March 2017]")).toEqual({
      questionNumber: "Q.7.i",
      month: "March",
      year: 2017,
    });
  });

  it("reads a bare question number, year first", () => {
    expect(parseProvenanceTag("[Q.14, 2020 February]")).toEqual({
      questionNumber: "Q.14",
      month: "February",
      year: 2020,
    });
  });

  it("reads a bare question number, month first with a period", () => {
    expect(parseProvenanceTag("[Q.20. March 2019]")).toEqual({
      questionNumber: "Q.20",
      month: "March",
      year: 2019,
    });
  });

  it("reads a YEAR-ONLY tag, leaving month null rather than guessing", () => {
    // 14 tags in the source carry no month. The board sits in Feb or March and
    // the tag does not say which, so inventing one would be a fabricated fact.
    expect(parseProvenanceTag("[Q.13, 2019]")).toEqual({
      questionNumber: "Q.13",
      month: null,
      year: 2019,
    });
  });

  it("keeps an OR marker in the question number", () => {
    // The board's internal choice. It is part of the question's identity on the
    // paper, so it belongs in the number rather than being stripped.
    expect(parseProvenanceTag("[Q.24 OR, 2019]")).toEqual({
      questionNumber: "Q.24 OR",
      month: null,
      year: 2019,
    });
  });

  it("reads a sub-part letter suffix", () => {
    expect(parseProvenanceTag("[Q.21.a. March 2025]")).toEqual({
      questionNumber: "Q.21.a",
      month: "March",
      year: 2025,
    });
  });

  it("reads a nested sub-part (uppercase section + roman)", () => {
    expect(parseProvenanceTag("[Q.27.B.ii. March 2019]")).toEqual({
      questionNumber: "Q.27.B.ii",
      month: "March",
      year: 2019,
    });
  });

  it("reads a parenthesised roman with a trailing letter", () => {
    expect(parseProvenanceTag("[Q.31.(ii) a. March 2024]")).toEqual({
      questionNumber: "Q.31.(ii) a",
      month: "March",
      year: 2024,
    });
  });

  it("reads an inline (OR) marker", () => {
    expect(parseProvenanceTag("[Q.27.A.(OR) March 2019]")).toEqual({
      questionNumber: "Q.27.A.(OR)",
      month: "March",
      year: 2019,
    });
  });

  // The Maths/Physics shapes must keep working EXACTLY as before — 31 shipped
  // chapters depend on them, and this parser is shared.
  it("still reads the Maths/Physics comma + month-first shape", () => {
    expect(parseProvenanceTag("[Q. 1. (A) i., March 2015]")).toEqual({
      questionNumber: "Q. 1. (A) i.",
      month: "March",
      year: 2015,
    });
  });

  it("still reads a Maths/Physics tag with no month", () => {
    expect(parseProvenanceTag("[Q. 23, 2024]")).toEqual({
      questionNumber: "Q. 23",
      month: null,
      year: 2024,
    });
  });

  it("returns null when there is no tag at all", () => {
    // 38 of the 430 Chemistry items carry no tag. The extractor DROPS such an
    // item, which is the safe default — they are held for adjudication against
    // the printed papers rather than shipped with an invented year.
    expect(parseProvenanceTag("Distinguish between crystalline and amorphous solids.")).toBeNull();
  });
});

describe("normaliseMath — prose typeset as per-word math zones", () => {
  // The Chemistry compilation's ORGANIC chapters (09-16) wrap every word of
  // ordinary prose in its own math zone: `$\text{Write}$ $\text{the}$
  // $\text{structure}$`. Measured across the corpus, 138 of 430 items (32%) carry
  // such a run, and chapters 01-08 carry NONE — the organic half was evidently
  // typed by a different hand.
  //
  // Two consequences, and the second is the serious one:
  //   - the stem renders as spaced-out math instead of a sentence;
  //   - option labels and ITEM NUMBERS get swallowed into the run, so the option
  //     split fails (14 items) and 6 questions are not recognised as items at all.
  //
  // Unwrapping restores prose. A token that is NOT plain English keeps its zone,
  // because a chemical formula is not prose.

  it("unwraps a run of per-word zones into a sentence", () => {
    const s = "\\(\\text{Write}\\) \\(\\text{the}\\) \\(\\text{structure}\\) \\(\\text{of}\\) \\(\\text{the}\\) \\(\\text{product}\\)";
    expect(normaliseMath(s)).toBe("Write the structure of the product");
  });

  it("converts the source's $...$ form first, then unwraps", () => {
    const s = "$\\text{Acid}$ $\\text{anhydride}$ $\\text{on}$ $\\text{reaction}$";
    expect(normaliseMath(s)).toBe("Acid anhydride on reaction");
  });

  it("KEEPS a chemical formula in its own zone", () => {
    // KOH is not prose. Unwrapping it would drop the upright-text styling that
    // distinguishes a formula from an italic variable.
    const s = "\\(\\text{reaction}\\) \\(\\text{with}\\) \\(\\text{KOH}\\) \\(\\text{gives}\\)";
    expect(normaliseMath(s)).toBe("reaction with \\(\\text{KOH}\\) gives");
  });

  it("KEEPS a token carrying a digit", () => {
    const s = "\\(\\text{the}\\) \\(\\text{polymer}\\) \\(\\text{Nylon-6}\\) \\(\\text{is}\\)";
    expect(normaliseMath(s)).toBe("the polymer \\(\\text{Nylon-6}\\) is");
  });

  it("leaves a LONE text zone alone — a run is two or more", () => {
    // A single \text{} is usually a real label inside a formula, not prose.
    const s = "The value of \\(\\text{K}\\) is large.";
    expect(normaliseMath(s)).toBe("The value of \\(\\text{K}\\) is large.");
  });

  it("does not touch a zone that is more than a bare \\text{}", () => {
    const s = "\\(2,3\\text{ dimethyl but-2-ene}\\)";
    expect(normaliseMath(s)).toBe(s);
  });

  it("preserves a comma between wrapped words", () => {
    const s = "\\(\\text{alkyl}\\) \\(\\text{chloride,}\\) \\(\\text{alkyl}\\) \\(\\text{fluoride}\\)";
    expect(normaliseMath(s)).toBe("alkyl chloride, alkyl fluoride");
  });

  it("releases a swallowed OPTION LABEL so the option split can see it", () => {
    // Real: '(A) Benzaldehyde' and '(C) Formaldehyde' were inside \text{} zones,
    // which is why 14 MCQs failed to split and shipped as free-response.
    const s = "\\(\\text{(A) Benzaldehyde}\\) \\(\\text{(C) Formaldehyde}\\)";
    expect(normaliseMath(s)).toBe("(A) Benzaldehyde (C) Formaldehyde");
  });

  it("releases a swallowed ITEM NUMBER", () => {
    // Real: '22. Why', '13.   How'. With the number inside math the extractor
    // never sees an item start and the question is absorbed into its neighbour —
    // 6 Chemistry questions were missing for this reason.
    const s = "\\(\\text{22. Why}\\) \\(\\text{does}\\) \\(\\text{this}\\) \\(\\text{happen}\\)";
    expect(normaliseMath(s)).toBe("22. Why does this happen");
  });

  it("is idempotent", () => {
    const s = "\\(\\text{Write}\\) \\(\\text{the}\\) \\(\\text{structure}\\)";
    const once = normaliseMath(s);
    expect(normaliseMath(once)).toBe(once);
  });
});

describe("normaliseMath — an option label trapped in a lone \\text{} zone", () => {
  // The run-unwrap above needs TWO adjacent zones. Chemistry also produces a
  // SINGLE zone holding the first option label and its text:
  //
  //     \(\text{ (A)Finkelstein}\) reaction (B) Swarts reaction (C) ... (D) ...
  //
  // The other three labels are plain prose, so the option list is complete on the
  // page and unreadable to splitOptions — the A-D run never matches, and the row
  // ships as free-response with its options glued into the stem. Measured across
  // the Chemistry corpus: 10 of the 13 unsplit rows carrying a 3+ label run are
  // this exact shape, so it is a rule rather than ten hand-written recoveries.
  //
  // An option label is NEVER legitimately inside math, which is what makes this
  // safe: releasing it cannot damage a formula.

  it("releases a label that opens the zone, with no space", () => {
    const s = "known as \\(\\_\\_\\_\\). \\(\\text{ (A)Finkelstein}\\) reaction (B) Swarts reaction";
    expect(normaliseMath(s)).toContain("(A)Finkelstein");
    expect(normaliseMath(s)).not.toContain("\\text{ (A)Finkelstein}");
  });

  it("releases a label that opens the zone, with a space", () => {
    const s = "\\(\\text{(A) nomex}\\) (B) \\(\\text{thiolkol}\\)";
    expect(normaliseMath(s)).toContain("(A) nomex");
    expect(normaliseMath(s)).not.toContain("\\text{(A) nomex}");
  });

  it("leaves a \\text{} zone with NO label alone", () => {
    // The overwhelming majority — a chemical name or a unit inside a formula.
    const s = "The value of \\(\\text{Kc}\\) is large.";
    expect(normaliseMath(s)).toBe(s);
  });

  it("does not touch a label already in prose", () => {
    const s = "known as ____. (A) Finkelstein (B) Swarts (C) Williamson (D) Wurtz";
    expect(normaliseMath(s)).toBe(s);
  });

  it("is idempotent", () => {
    const s = "\\(\\text{(A) Isoprene}\\) (B) \\(\\text{Acrylonitrile}\\)";
    const once = normaliseMath(s);
    expect(normaliseMath(once)).toBe(once);
  });
});

describe("stripArtifacts — a fill-in-the-blank typeset as a math zone", () => {
  // Chemistry writes the blank of a fill-in-the-blank question inside math:
  // `\(_____\)`. Inside math `_` is the SUBSCRIPT operator, so a run of them is
  // not meaningful LaTeX — KaTeX tolerates it, the OMML converter does not, and
  // it therefore ships as raw LaTeX in a downloaded Word answer key and nowhere
  // else. Same shape as the trailing thin space found on Physics: invisible on
  // the web, visible only to the teacher.
  //
  // 15 stems across 7 Chemistry chapters; ZERO in the shipped Maths and Physics
  // corpora, which write the blank as plain underscores in prose — the form this
  // restores.

  it("unwraps a blank wrapped in a math zone", () => {
    expect(stripArtifacts("The value is \\(_____\\).")).toBe("The value is _____.");
  });

  it("handles the escaped-underscore form, and UNESCAPES it", () => {
    // stripArtifacts already unescapes a prose backslash-underscore, and the
    // shipped corpora store plain underscores, so the two rules compose to the
    // house form. My first expectation asserted the escaped output and was
    // wrong about the EXISTING behaviour, not about the new rule.
    expect(stripArtifacts("is \\(\\_\\_\\_\\_\\).")).toBe("is ____.");
  });

  it("leaves a genuine subscript alone", () => {
    // The rule must key on a zone that is ONLY underscores, or it would strip the
    // math from every formula with a subscript.
    const s = "\\(\\Delta n_{g}\\) for the oxidation";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("leaves a blank already in prose alone", () => {
    const s = "The value is ______.";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("is idempotent", () => {
    const once = stripArtifacts("is \\(_____\\).");
    expect(stripArtifacts(once)).toBe(once);
  });
});

describe("normaliseMath — a lone \\text{} zone holding ordinary prose", () => {
  // The run-unwrap above needs TWO adjacent zones, so an ISOLATED one survives:
  //
  //     Write a note on Gabriel phthalimide \(\text{synthesis}\).
  //     Write chemical reactions involved in formation of \(\text{ethylamine using acetaldoxime}\).
  //
  // Measured across the Chemistry corpus: 236 such zones, and 3 more sit in the
  // already-shipped Physics chapters. KaTeX renders them as upright roman, so on
  // the web the damage is a font shift mid-sentence — but a math zone does not
  // break across lines, so a long one is an unbreakable unit, and in a downloaded
  // Word paper it converts to an OMML run in Cambria Math.
  //
  // isProseToken alone is TOO LOOSE to reuse here: it accepts `K` and `Kc`, both
  // of which the block above deliberately pins as zones that must stay wrapped.
  // The extra condition is that EVERY word runs to at least three letters, and
  // that line is not arbitrary — measured against the corpus, the tokens it keeps
  // are `Fe`, `Cu`, `Hg`, `Sc`, `At`, `Z`, `L atm`, `i`, `ii`, `a`, `b`. EVERY
  // chemical element symbol is one or two letters, so three is exactly the
  // boundary between a symbol and a word. The cost is ~20 short glue words
  // ("of", "is", "in") that stay wrapped; that is the safe side of the trade.

  it("releases a lone prose word", () => {
    const s = "Write a note on Gabriel phthalimide \\(\\text{synthesis}\\).";
    expect(normaliseMath(s)).toBe("Write a note on Gabriel phthalimide synthesis.");
  });

  it("releases a lone multi-word prose phrase", () => {
    const s = "in formation of \\(\\text{ethylamine using acetaldoxime}\\).";
    expect(normaliseMath(s)).toBe("in formation of ethylamine using acetaldoxime.");
  });

  it("releases a lone prose word with a leading capital", () => {
    // A leading capital opens a sentence or a defined term; it is not a formula
    // signature, unlike an INTERNAL capital.
    expect(normaliseMath("\\(\\text{Define}\\) the term.")).toBe("Define the term.");
  });

  it("KEEPS a one- or two-letter symbol — that is an element, not a word", () => {
    expect(normaliseMath("of \\(\\text{Fe}\\) in the complex")).toBe("of \\(\\text{Fe}\\) in the complex");
    expect(normaliseMath("The value of \\(\\text{K}\\) is large.")).toBe("The value of \\(\\text{K}\\) is large.");
    expect(normaliseMath("The value of \\(\\text{Kc}\\) is large.")).toBe("The value of \\(\\text{Kc}\\) is large.");
  });

  it("KEEPS a vowel-less token — it is juxtaposed variables, not a word", () => {
    // Found by the byte-identity regression, in the SHIPPED Physics corpus:
    // `\(\text{mgr}\)` is an option of a Rotational Dynamics question — mass
    // times gravity times radius — and it clears any length test. A formula is
    // juxtaposed single-letter variables and does not spell a pronounceable
    // token; a word does. Without this condition the rule silently unwrapped a
    // live PUBLIC option into prose.
    expect(normaliseMath("is \\(\\text{mgr}\\) at the top")).toBe("is \\(\\text{mgr}\\) at the top");
    expect(normaliseMath("equals \\(\\text{mgh}\\).")).toBe("equals \\(\\text{mgh}\\).");
  });

  it("KEEPS an ALL-CAPS token — it cannot be told from a formula", () => {
    // IUPAC is prose and HCl is not, and nothing mechanical separates them. It
    // renders upright either way, so keeping is the side that cannot be wrong.
    expect(normaliseMath("the \\(\\text{IUPAC}\\) name")).toBe("the \\(\\text{IUPAC}\\) name");
  });

  it("KEEPS a token carrying a digit or an internal capital", () => {
    expect(normaliseMath("the polymer \\(\\text{Nylon-6}\\) is")).toBe("the polymer \\(\\text{Nylon-6}\\) is");
    expect(normaliseMath("by \\(\\text{Wolf-Kishner}\\) reduction")).toBe("by \\(\\text{Wolf-Kishner}\\) reduction");
  });

  it("KEEPS a zone that is more than a bare \\text{}", () => {
    // A \text{} used INSIDE a formula is layout, not prose.
    const s = "\\(\\text{LiAlH}_{4}/\\text{ether}\\)";
    expect(normaliseMath(s)).toBe(s);
  });

  it("still releases a swallowed option label, whatever its length", () => {
    // The lone-label rule above is unaffected: `(A) Isoprene` must still come out
    // even though `(A)` is shorter than three letters.
    const s = "\\(\\text{(A) nomex}\\) (B) \\(\\text{thiolkol}\\)";
    expect(normaliseMath(s)).toContain("(A) nomex");
  });

  it("is idempotent", () => {
    const once = normaliseMath("on Gabriel phthalimide \\(\\text{synthesis}\\).");
    expect(normaliseMath(once)).toBe(once);
  });
});

describe("stripArtifacts — a compilation section heading swallowed by a stem", () => {
  // The Chemistry compilation groups its questions under its OWN bold headings
  // ("**II. Colligative Property Calculations**"). Where a heading follows the
  // last question of the previous section without a blank line, pandoc keeps it
  // in the same paragraph and it lands at the END of that question's stem.
  //
  // Reported INDEPENDENTLY by three authoring agents on three different chapters
  // before it was measured, which is what makes it a rule rather than fourteen
  // hand-written repairs. 14 rows across 6 chapters, all Chemistry; ZERO in the
  // shipped Maths and Physics corpora, whose compilations are not sectioned.
  //
  // No gate can see it: the fragment is perfectly well-formed markdown, so
  // probeRow passes it. It is wrong only because it is not part of the question.
  // No board paper prints an LWS section heading, so this is definitively ours.

  it("strips a clean trailing heading", () => {
    const s = "Calculate \\(\\Delta U\\) for the reaction. **III. Energy Concepts, Terms, and Laws**";
    expect(stripArtifacts(s)).toBe("Calculate \\(\\Delta U\\) for the reaction.");
  });

  it("strips a heading that pandoc split across math zones", () => {
    // Real, and the reason an end-anchored `[^*]` pattern MISSED it: the heading
    // contains math, so its bold markers are broken into several runs. An agent
    // that had read the row reported it while my regex said the chapter was
    // clean — which is why the rule runs to the end of the string rather than
    // trying to match the heading's own shape.
    const s =
      "State whether entropy change is positive. **II. Calculations of Work Done (**\\(W\\)**), Internal Energy (**\\(\\Delta U\\)**)**";
    expect(stripArtifacts(s)).toBe("State whether entropy change is positive.");
  });

  it("leaves a stem that merely ENDS in bold alone", () => {
    // Bold is not the signal — a roman numeral followed by a Title Case run is.
    const s = "Define the term **enthalpy**";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("leaves a lowercase roman sub-item alone", () => {
    // The compilation labels sub-items "(i)", "(ii)" in LOWERCASE. Only an
    // uppercase numeral with a following Title Case word is a section heading.
    const s = "What is the action of the following: **(ii) moist silver oxide**";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("refuses to eat the whole stem", () => {
    // A stem that is ONLY a heading is a different defect — a heading that was
    // parsed as an item — and silently emptying it would hide that. Left intact
    // so it surfaces as an empty-looking question rather than as nothing.
    const s = "**II. Colligative Property Calculations**";
    expect(stripArtifacts(s)).toBe(s);
  });

  it("is idempotent", () => {
    const once = stripArtifacts("Calculate the value. **IV. Derivations and Formulae**");
    expect(stripArtifacts(once)).toBe(once);
  });
});

describe("normaliseMath — an option label welded to a formula in a larger zone", () => {
  // The rule above releases a label only when the WHOLE zone is a single
  // \text{}. Coordination #12 is the variant it cannot see: the zone continues
  // past the \text{} into real LaTeX, so the label is welded to the formula that
  // follows it —
  //
  //     \(\text{ (A) Na}\left\lbrack \text{Fe}\left( \text{CN} \right)_{6} \right\rbrack\) (B) ...
  //
  // The A-D run then never matches, splitOptions fails, and the row reaches
  // commit.ts as free-response — where the known-MCQ guard REFUSES it outright.
  // That refusal is the only reason this surfaced: nothing upstream sees it, and
  // the four options are plainly present on the page the whole time.
  //
  // Measured: 1 row corpus-wide, 0 in the shipped Maths and Physics chapters. It
  // earns a rule rather than a defects.json entry because it is the SAME defect
  // as the block above under the same justification — an option label is never
  // legitimately inside math — and splitting one class across a rule and a
  // hand-written repair is how the next instance gets missed.

  it("lifts the label out and leaves the formula in math", () => {
    const s =
      "is _____. \\(\\text{ (A) Na}\\left\\lbrack \\text{Fe} \\right\\rbrack\\) (B) \\(\\text{Na}_{2}\\)";
    const out = normaliseMath(s);
    expect(out).toContain("(A) \\(\\text{Na}\\left\\lbrack");
    // the formula must survive as math, not be flattened into prose
    expect(out).toContain("\\right\\rbrack\\)");
    expect(out).not.toContain("\\text{ (A) Na}");
  });

  it("leaves a zone with no option label alone", () => {
    const s = "\\(\\text{Na}\\left\\lbrack \\text{Fe} \\right\\rbrack\\)";
    expect(normaliseMath(s)).toBe(s);
  });

  it("does not disturb a parenthesis that is not an option label", () => {
    // (aq) is a state symbol, not a label — only a single A-D letter qualifies.
    const s = "\\(\\text{ (aq) Na}\\left\\lbrack \\text{Fe} \\right\\rbrack\\)";
    expect(normaliseMath(s)).toBe(s);
  });

  it("still handles the whole-zone case the block above owns", () => {
    expect(normaliseMath("\\(\\text{(A) nomex}\\) (B) x")).toContain("(A) nomex");
  });

  it("is idempotent", () => {
    const once = normaliseMath(
      "is _____. \\(\\text{ (A) Na}\\left\\lbrack \\text{Fe} \\right\\rbrack\\)",
    );
    expect(normaliseMath(once)).toBe(once);
  });
});
