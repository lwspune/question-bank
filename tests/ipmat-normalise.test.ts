// Spec for the IPMAT Phase-1 normaliser (scripts/ipmat/normalise.ts).
//
// The source writes question content as raw HTML with TeX dollar delimiters. We
// store GFM pipe-tables with `\(...\)` math. Every rule below was written
// against a shape that is actually present in scripts/ipmat/data/raw, counted
// by scripts/ipmat/survey.ts, not against an imagined one.
//
// THE TRAP THAT SHAPES THE WHOLE MODULE. A `<` in this corpus is far more often
// a less-than sign than a tag. The survey's naive tag scan reported tags named
// <x>, <c>, <a>, <b>, <d>, <q>, <l>, <v> and <s> — every one of them a false
// positive from maths like `$$D<C<A<B$` and `$A < P = C >= D$`. A regex that
// strips "anything in angle brackets" therefore DELETES MATHEMATICS. Two
// independent defences are used together: math zones are masked first (using
// the renderer's own matcher, so masking cannot disagree with rendering), and
// tag removal is restricted to an allowlist of real HTML tag names.
import { describe, it, expect } from "vitest";
import {
  decodeEntities,
  stripStyleBlocks,
  extractDisclaimers,
  extractImages,
  htmlTablesToPipe,
  convertHtmlInline,
  repairDollarImbalance,
  dollarsToTexDelims,
  fixMathUnicode,
  normaliseText,
  hasStrayDollar,
  hasUnseparatedPipeTable,
  stripMathSpacers,
  figuresInsideTable,
} from "../scripts/ipmat/normalise";
import { parseLatex } from "../src/components/math/parseLatex";
import { normalizeNewlines } from "../src/lib/text/normalizeNewlines";
import { parseTableBlocks } from "../src/components/math/parseTableBlocks";

const BS = String.fromCharCode(92);
const inline = (s: string) => BS + "(" + s + BS + ")";
const block = (s: string) => BS + "[" + s + BS + "]";

describe("decodeEntities", () => {
  it("decodes the named entities this corpus actually uses", () => {
    // Measured: &ldquo; x18, &rdquo; x18, &beta; x1. Nothing else.
    expect(decodeEntities("he said &ldquo;no&rdquo; twice")).toBe('he said "no" twice');
    expect(decodeEntities("&amp; &lt; &gt; &quot;")).toBe('& < > "');
    expect(decodeEntities("a&nbsp;b")).toBe("a b");
  });

  it("decodes a numeric entity", () => {
    expect(decodeEntities("&#8377;500")).toBe("₹500");
  });

  it("leaves a bare ampersand alone, because LaTeX matrices need it", () => {
    const m = inline(BS + "begin{bmatrix} 1 & 2 " + BS + BS + " 3 & 4 " + BS + "end{bmatrix}");
    expect(decodeEntities(m)).toBe(m);
  });

  it("leaves an unknown entity-looking string alone rather than guessing", () => {
    expect(decodeEntities("a &notanentity; b")).toBe("a &notanentity; b");
  });
});

describe("stripStyleBlocks", () => {
  it("removes a <style> block AND its CSS body", () => {
    // 32 occurrences over 16 JIPMAT LR rows, all styling their own tables.
    const input =
      "Expenditure by head:\n\n <style> table { border-collapse: collapse; } th, td { border: 1px solid #ccc; } </style>\n\n<table><tr><td>A</td></tr></table>";
    const out = stripStyleBlocks(input);
    expect(out).not.toContain("border-collapse");
    expect(out).not.toContain("<style");
    expect(out).toContain("Expenditure by head:");
    expect(out).toContain("<table>");
  });

  it("removes several style blocks", () => {
    expect(stripStyleBlocks("a<style>x{}</style>b<style>y{}</style>c")).toBe("abc");
  });

  it("leaves text with no style block byte-identical", () => {
    const s = "nothing to do here";
    expect(stripStyleBlocks(s)).toBe(s);
  });
});

describe("extractDisclaimers", () => {
  // THE MOST IMPORTANT RULE IN THIS FILE. afterboards discloses, honestly, that
  // some JIPMAT 2026 shared data was rebuilt from student recall rather than
  // taken from the paper. 15 rows carry it: LR Q25-33 and VA Q23-25, Q29-31.
  // Such a row is NOT a verifiable past-year question, so the note must be
  // lifted out as structured provenance and never silently dropped into prose.
  const real =
    '<span style="color: gray;">Disclaimer: NTA forgot to print the common data for Questions 25–27 in the candidate response sheet. We reverse-engineered the data based on student memory, so the table below is not the original NTA data.</span>\n\nFollowing is the table:';

  it("lifts the disclaimer out of the text and reports it", () => {
    const { text, disclaimers } = extractDisclaimers(real);
    expect(disclaimers).toHaveLength(1);
    expect(disclaimers[0]).toContain("reverse-engineered");
    expect(text).not.toContain("Disclaimer");
    expect(text).not.toContain("reverse-engineered");
    expect(text).toContain("Following is the table:");
  });

  it("flags the row as reconstructed, which is the fact downstream needs", () => {
    expect(extractDisclaimers(real).reconstructed).toBe(true);
    expect(extractDisclaimers("an ordinary passage").reconstructed).toBe(false);
  });

  it("catches the note even if it is not wrapped in a span", () => {
    const { disclaimers, reconstructed } = extractDisclaimers(
      "Disclaimer: we reverse-engineered the data based on student memory."
    );
    expect(reconstructed).toBe(true);
    expect(disclaimers).toHaveLength(1);
  });

  it("does NOT fire on question content that merely says 'we'", () => {
    // 87 rows say "we" inside an RC passage or a sentence-completion stem.
    // Treating those as provenance notes would strip real question text.
    const passage = "Our team has won every match since January. We have inherited it from our past.";
    const { text, reconstructed } = extractDisclaimers(passage);
    expect(reconstructed).toBe(false);
    expect(text).toBe(passage);
  });
});

describe("extractImages", () => {
  it("pulls the src out and removes the tag", () => {
    const { text, images } = extractImages(
      'Study the graph <img src="https://balti.afterboards.in/abc123" width=150px> and answer.'
    );
    expect(images).toEqual([{ src: "https://balti.afterboards.in/abc123", width: "150px" }]);
    expect(text).not.toContain("<img");
    expect(text).toContain("Study the graph");
    expect(text).toContain("and answer.");
  });

  it("handles the self-closing form and a quoted width", () => {
    const { images } = extractImages('<img src="https://x/y" width="400px"/>');
    expect(images).toEqual([{ src: "https://x/y", width: "400px" }]);
  });

  it("keeps every image of a multi-figure stem, in order", () => {
    // Rohtak 2019 QA Q1-5 carry three figures each (dice/boat views).
    const { images } = extractImages(
      '<img src="https://x/1" width="400px"/> then <img src="https://x/2" width="400px"/> then <img src="https://x/3" width="400px"/>'
    );
    expect(images.map((i) => i.src)).toEqual(["https://x/1", "https://x/2", "https://x/3"]);
  });

  it("reports an image with no src rather than dropping it silently", () => {
    const { images } = extractImages("<img width=100px>");
    expect(images).toEqual([{ src: null, width: "100px" }]);
  });
});

describe("htmlTablesToPipe", () => {
  it("emits a GFM table WITH the mandatory separator row", () => {
    // parseTableBlocks treats a pipe run with no separator as prose, so the
    // separator is what makes this a table at all rather than decoration.
    const html =
      "<table><thead><tr><th>Head</th><th>Amount</th></tr></thead><tbody><tr><td>Rent</td><td>120</td></tr><tr><td>Fuel</td><td>80</td></tr></tbody></table>";
    const out = htmlTablesToPipe(html);
    const lines = out.trim().split("\n");
    expect(lines[0]).toBe("| Head | Amount |");
    expect(lines[1]).toMatch(/^\|\s*-{3,}\s*\|\s*-{3,}\s*\|$/);
    expect(lines[2]).toBe("| Rent | 120 |");
    expect(lines[3]).toBe("| Fuel | 80 |");
  });

  it("produces a table our OWN parser recognises", () => {
    const html = "<table><tr><th>a</th><th>b</th></tr><tr><td>1</td><td>2</td></tr></table>";
    const blocks = parseTableBlocks(htmlTablesToPipe(html));
    expect(blocks.some((b) => b.kind === "table")).toBe(true);
  });

  it("synthesises a header when the table has only <td> rows", () => {
    // A table whose first row is <td> has no header; GFM requires one, so an
    // empty header row is emitted rather than promoting a data row.
    const out = htmlTablesToPipe("<table><tr><td>A</td><td>1</td></tr><tr><td>B</td><td>2</td></tr></table>");
    const lines = out.trim().split("\n");
    expect(lines[1]).toMatch(/^\|[\s-]*\|[\s-]*\|$/);
    expect(out).toContain("| A | 1 |");
    expect(out).toContain("| B | 2 |");
  });

  it("flattens a <br> inside a cell to a space, not a newline", () => {
    // A newline inside a cell would break the row and shatter the table.
    const out = htmlTablesToPipe("<table><tr><th>LIST-I<br>(Group)</th><th>X</th></tr><tr><td>a</td><td>b</td></tr></table>");
    expect(out).toContain("| LIST-I (Group) | X |");
    expect(out.trim().split("\n")[0]).not.toContain("\n");
  });

  it("escapes a pipe that appears inside cell content", () => {
    const out = htmlTablesToPipe("<table><tr><th>a|b</th><th>c</th></tr><tr><td>1</td><td>2</td></tr></table>");
    expect(out.trim().split("\n")[0]).toBe("| a" + BS + "|b | c |");
  });

  it("keeps an empty cell as an empty column rather than collapsing it", () => {
    // Indore 2023 MCQ Q26-30 use a deliberately INCOMPLETE table; a dropped
    // blank would change the puzzle.
    const out = htmlTablesToPipe("<table><tr><th>D</th><th>P</th><th>Q</th></tr><tr><td>A</td><td></td><td>x</td></tr></table>");
    expect(out).toContain("| A |  | x |");
  });

  it("leaves text with no table untouched", () => {
    expect(htmlTablesToPipe("plain prose")).toBe("plain prose");
  });
});

describe("convertHtmlInline", () => {
  it("turns <br> into a real newline", () => {
    expect(convertHtmlInline("one<br>two<br/>three")).toBe("one\ntwo\nthree");
  });

  it("turns <p> blocks into paragraphs", () => {
    expect(convertHtmlInline("<p>first</p><p>second</p>").trim()).toBe("first\n\nsecond");
  });

  it("underlines with OUR convention, so the Word export bypass matches", () => {
    // UNDERLINE_BYPASS_RE in ommlBuilder.ts anchors on exactly this shape;
    // anything else silently loses its underline in the .docx.
    expect(convertHtmlInline("the <u>insidious</u> claim")).toBe(
      "the " + inline(BS + "underline{" + BS + "text{insidious}}") + " claim"
    );
  });

  it("turns <strong> and <b> into markdown bold", () => {
    expect(convertHtmlInline("<strong>NOT</strong> and <b>ALL</b>")).toBe("**NOT** and **ALL**");
  });

  it("numbers an <ol> list one item per line", () => {
    // Parajumble items must be one per line so the order is readable.
    const out = convertHtmlInline("<ol><li>alpha</li><li>beta</li><li>gamma</li></ol>");
    expect(out.trim().split("\n").filter(Boolean)).toEqual(["1. alpha", "2. beta", "3. gamma"]);
  });

  it("does NOT double-number a <ul> whose items already carry their number", () => {
    // Indore 2022 VA Q41 writes "<li>1. A sub-par monsoon...</li>".
    const out = convertHtmlInline("<ul><li>1. first claim</li><li>2. second claim</li></ul>");
    expect(out.trim().split("\n").filter(Boolean)).toEqual(["1. first claim", "2. second claim"]);
  });

  it("bullets a <ul> whose items carry no marker", () => {
    const out = convertHtmlInline("<ul><li>red</li><li>blue</li></ul>");
    expect(out.trim().split("\n").filter(Boolean)).toEqual(["- red", "- blue"]);
  });

  it("converts <sup> to a math superscript with an empty base", () => {
    // `{}^{2}` is valid LaTeX standalone and never mis-italicises the base --
    // which matters because 4 of the 15 sites are UNITS (`cm<sup>2</sup>`),
    // where `\(cm^{2}\)` would render "cm" as two italic variables.
    expect(convertHtmlInline("area 300 cm<sup>2</sup>")).toBe("area 300 cm" + inline("{}^{2}"));
    expect(convertHtmlInline("2<sup>91</sup>")).toBe("2" + inline("{}^{91}"));
  });

  it("unwraps a <span> and an <a>, keeping their text", () => {
    expect(convertHtmlInline('<span style="color:red">kept</span>')).toBe("kept");
    expect(convertHtmlInline('see <a href="http://x">this page</a>')).toBe("see this page");
  });

  it("turns <hr> into a paragraph break", () => {
    expect(convertHtmlInline("above<hr>below").replace(/\n+/g, "|")).toBe("above|below");
  });

  it("LEAVES A LESS-THAN SIGN ALONE — the trap this module exists for", () => {
    // Every one of these looked like a tag to a naive scan.
    expect(convertHtmlInline("a<x<b")).toBe("a<x<b");
    expect(convertHtmlInline("D<C<A<B")).toBe("D<C<A<B");
    expect(convertHtmlInline("0 < c < 2")).toBe("0 < c < 2");
    expect(convertHtmlInline("A < P = C >= D")).toBe("A < P = C >= D");
  });

  it("does not treat an unknown word in angle brackets as a tag", () => {
    expect(convertHtmlInline("value <notatag> here")).toBe("value <notatag> here");
  });
});

describe("repairDollarImbalance", () => {
  it("repairs the systematic $$...$ shape", () => {
    // 621 fields. Symptom on BOTH surfaces is a stray literal "$" in the prose
    // with the maths rendering correctly beside it.
    expect(repairDollarImbalance("$$20 " + BS + "leq x " + BS + "leq 50$")).toBe(
      "$20 " + BS + "leq x " + BS + "leq 50$"
    );
  });

  it("leaves a correct $$...$$ display zone alone", () => {
    expect(repairDollarImbalance("$$x^2 + 1$$")).toBe("$$x^2 + 1$$");
  });

  it("leaves a correct $...$ inline zone alone", () => {
    expect(repairDollarImbalance("$x^2$")).toBe("$x^2$");
  });

  it("repairs several zones in one field", () => {
    expect(repairDollarImbalance("$$a$ and $$b$")).toBe("$a$ and $b$");
  });

  it("clears the stray dollar the renderer would otherwise print", () => {
    const before = parseLatex("$$" + BS + "frac{1}{3}$");
    expect(before.some((s) => s.type === "text" && s.content.includes("$"))).toBe(true);
    const after = parseLatex(repairDollarImbalance("$$" + BS + "frac{1}{3}$"));
    expect(after.some((s) => s.type === "text" && s.content.includes("$"))).toBe(false);
  });

  it("leaves a lone dollar that is not a delimiter alone", () => {
    expect(repairDollarImbalance("costs $500 total")).toBe("costs $500 total");
  });
});

describe("dollarsToTexDelims", () => {
  it("rewrites inline dollars to our convention", () => {
    expect(dollarsToTexDelims("value is $x^2 + 1$ exactly")).toBe("value is " + inline("x^2 + 1") + " exactly");
  });

  it("rewrites display dollars to bracket form", () => {
    expect(dollarsToTexDelims("see $$x^2$$ here")).toBe("see " + block("x^2") + " here");
  });

  it("leaves already-converted math alone, so the step is idempotent", () => {
    const already = "value is " + inline("x^2") + " exactly";
    expect(dollarsToTexDelims(already)).toBe(already);
    expect(dollarsToTexDelims(dollarsToTexDelims("$a$"))).toBe(inline("a"));
  });

  it("does not touch a lone dollar in prose", () => {
    expect(dollarsToTexDelims("costs $500 total")).toBe("costs $500 total");
  });

  it("preserves a less-than sign inside the converted zone", () => {
    expect(dollarsToTexDelims("$D<C<A<B$")).toBe(inline("D<C<A<B"));
  });

  it("converts several zones on one line", () => {
    expect(dollarsToTexDelims("$a$ and $b$")).toBe(inline("a") + " and " + inline("b"));
  });
});

describe("fixMathUnicode", () => {
  it("replaces unicode relations inside math with LaTeX commands", () => {
    const { text } = fixMathUnicode(inline("20 ≤ x ≥ 5"));
    expect(text).toBe(inline("20 " + BS + "leq x " + BS + "geq 5"));
  });

  it("replaces multiplication, division and set membership", () => {
    const { text } = fixMathUnicode(inline("a × b ÷ c, x ∈ S"));
    expect(text).toBe(inline("a " + BS + "times b " + BS + "div c, x " + BS + "in S"));
  });

  it("replaces a greek letter and a degree sign", () => {
    const { text } = fixMathUnicode(inline("θ = 30°"));
    expect(text).toBe(inline(BS + "theta = 30^" + BS + "circ"));
  });

  it("LEAVES PROSE UNICODE ALONE", () => {
    // 215 curly apostrophes, 94 rupee signs, 43 en dashes live in prose and are
    // correct there. Only math zones get rewritten.
    const prose = "the dairy maid’s hand — ₹500 – 20 ≤ 30";
    expect(fixMathUnicode(prose).text).toBe(prose);
  });

  it("WARNS rather than guesses on a bare radical sign", () => {
    // `\sqrt` needs an operand; inventing the extent of the radicand is how a
    // silent maths error gets shipped. One occurrence in the corpus.
    const { text, warnings } = fixMathUnicode(inline("√2 + 1"));
    expect(warnings.some((w) => w.kind === "unmapped-math-unicode")).toBe(true);
    expect(text).toContain("√");
  });

  it("rewrites \\newline to a row break inside math", () => {
    const { text } = fixMathUnicode(inline("a " + BS + "newline b"));
    expect(text).toBe(inline("a " + BS + BS + " b"));
  });

  it("does not rewrite the word 'newline' in prose", () => {
    expect(fixMathUnicode("start a newline here").text).toBe("start a newline here");
  });
});

describe("normaliseText (the whole pipeline)", () => {
  it("produces output the repo's own guards accept", () => {
    const input =
      '<p>If k<sup>2</sup> &minus; 1 is divisible by 8 and $$0 < k < 10$, then k is:</p><br><u>Choose</u> one.';
    const { text } = normaliseText(input);
    // no literal backslash-n
    expect(normalizeNewlines(text)).toBe(text);
    // no HTML left
    expect(text).not.toMatch(/<\/?(p|br|u|sup|span|table|td|tr|th|ol|ul|li|strong|b|hr|a|style)\b/i);
    // no stray dollar and no dollar delimiters
    expect(text).not.toContain("$");
    // the less-than survived
    expect(text).toContain("0 < k < 10");
    // underline uses our convention
    expect(text).toContain(BS + "underline{" + BS + "text{Choose}}");
  });

  it("round-trips a table through our own table parser", () => {
    const input =
      "Data:\n<style>td{border:1px}</style>\n<table><tr><th>Head</th><th>Amt</th></tr><tr><td>Rent</td><td>120</td></tr></table>";
    const { text } = normaliseText(input);
    expect(parseTableBlocks(text).some((b) => b.kind === "table")).toBe(true);
    expect(text).not.toContain("border");
  });

  it("carries figures and the reconstruction flag out as structured data", () => {
    const input =
      '<span style="color: gray;">Disclaimer: We reverse-engineered the data based on student memory.</span> Study <img src="https://x/y" width=200px> then answer.';
    const out = normaliseText(input);
    expect(out.figures.map((f) => f.src)).toEqual(["https://x/y"]);
    expect(out.reconstructed).toBe(true);
    expect(out.text).not.toContain("<img");
    expect(out.text).not.toContain("Disclaimer");
  });

  it("is idempotent — normalising twice equals normalising once", () => {
    // Phase 2+ may re-run this over already-normalised text; a non-idempotent
    // step would corrupt it silently on the second pass.
    const input = '<p>Let $a<b$ and <u>x</u> with 5 cm<sup>2</sup> &amp; $$y \\leq 3$</p>';
    const once = normaliseText(input).text;
    expect(normaliseText(once).text).toBe(once);
  });

  it("collapses runs of blank lines but keeps paragraph separation", () => {
    const { text } = normaliseText("<p>a</p>\n\n\n\n<p>b</p>");
    expect(text).toBe("a\n\nb");
  });

  it("trims leading and trailing whitespace", () => {
    expect(normaliseText("   <p>hello</p>   ").text).toBe("hello");
  });

  it("leaves an already-clean plain string untouched", () => {
    const s = "The possible number of days that Nikita requires is";
    expect(normaliseText(s).text).toBe(s);
  });

  it("does not invent a figure or a disclaimer for clean text", () => {
    const out = normaliseText("plain question text");
    expect(out.figures).toEqual([]);
    expect(out.reconstructed).toBe(false);
    expect(out.warnings).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Gate predicates. These live in the pure core, with a spec, because the first
// versions lived inline in build.ts and BOTH were wrong against real data:
//
//   * the pipe check counted pipes before masking maths, so every absolute
//     value flagged -- `\(2|x| + 3|y| = 6\)` is four pipes and no table. 23
//     rows, all of them fine.
//   * the stray-dollar check flagged a single `$`, so it fired on `\$250
//     billion` (correctly escaped, 6 rows) and on `Million USD ($)` (a literal
//     dollar, 1 row) while the 2 REAL defects looked the same as the 7 false
//     ones.
//
// A gate that cries wolf 30 times to catch 2 real faults gets switched off, so
// the predicates are pinned here against both polarities.

describe("hasStrayDollar", () => {
  it("is false for a correctly escaped literal dollar", () => {
    expect(hasStrayDollar("The average company was worth about " + BS + "$250 billion.")).toBe(false);
  });

  it("is false for a single literal dollar in prose", () => {
    expect(hasStrayDollar("markets in Million USD ($). Arrange them")).toBe(false);
    expect(hasStrayDollar("costs $500 total")).toBe(false);
  });

  it("is TRUE for a pair of dollars that failed to become maths", () => {
    // jipmat 2024 VA Q8/Q10 wrap whitespace + a newline in dollars as a
    // line-break hack; inline `$...$` forbids newlines, so both print raw.
    expect(hasStrayDollar("following sentence?$\n $“Should spending")).toBe(true);
  });

  it("is false once the maths is properly delimited", () => {
    expect(hasStrayDollar("value " + inline("x^2") + " here")).toBe(false);
  });

  it("is false for text with no dollar at all", () => {
    expect(hasStrayDollar("ordinary prose")).toBe(false);
  });
});

describe("hasUnseparatedPipeTable", () => {
  it("is false for absolute-value bars inside maths", () => {
    // The 23-row false positive. Four pipes, no table, nothing wrong.
    expect(hasUnseparatedPipeTable("The area enclosed by " + inline("2|x| + 3|y| = 6") + " is")).toBe(false);
    expect(
      hasUnseparatedPipeTable("if " + inline("|a - b| + |b - c| = |c - a|") + " then")
    ).toBe(false);
  });

  it("is false for a determinant written with bars", () => {
    expect(hasUnseparatedPipeTable("evaluate " + inline("|A| = 0"))).toBe(false);
  });

  it("is TRUE for a pipe row in prose with no separator", () => {
    // This is what renders as raw `| a | b |` on the site and in Word.
    expect(hasUnseparatedPipeTable("Head | Amount\nRent | 120\nFuel | 80")).toBe(true);
  });

  it("is false for a proper GFM table", () => {
    expect(hasUnseparatedPipeTable("| Head | Amt |\n| --- | --- |\n| Rent | 120 |")).toBe(false);
  });

  it("is false for prose with one pipe", () => {
    expect(hasUnseparatedPipeTable("choose a | b")).toBe(false);
  });
});

describe("stripMathSpacers", () => {
  it("turns a whitespace-only dollar zone into a real line break", () => {
    // jipmat 2024 VA Q8: `sentence?$  \n $"Should spending...`
    const out = stripMathSpacers('sentence?$  \n $"Should spending');
    expect(out).toBe('sentence?\n"Should spending');
    expect(hasStrayDollar(out)).toBe(false);
  });

  it("turns a \newline-only display zone into a line break", () => {
    // jipmat 2022 VA Q34: `sentence.  $$\newline$$ P. responsible`
    expect(stripMathSpacers("sentence. $$" + BS + "newline$$ P. responsible")).toBe(
      "sentence.\nP. responsible"
    );
  });

  it("leaves a zone with real content alone", () => {
    expect(stripMathSpacers("value $x^2$ here")).toBe("value $x^2$ here");
    expect(stripMathSpacers("value " + inline("x^2") + " here")).toBe("value " + inline("x^2") + " here");
  });

  it("leaves an escaped literal dollar alone", () => {
    expect(stripMathSpacers("worth " + BS + "$250 billion")).toBe("worth " + BS + "$250 billion");
  });
});

// ---------------------------------------------------------------------------
// Three faults the build gate found on real data after the unit tests were
// already green. Each is a case where a rule that is right in isolation is
// wrong in context, so each is pinned here.

describe("stripMathSpacers does not eat the gap between two real zones", () => {
  it("leaves `$a$ $b$` as two zones", () => {
    // ipmat-indore 2019 SA Q4: `the $det$ $2AB^{-1}C^3B^T$ is`. The space
    // between a CLOSING and an OPENING dollar looks exactly like the
    // whitespace-only spacer, so a purely local pattern joins two separate
    // formulas into one broken zone.
    expect(stripMathSpacers("the $det$ $2AB^{-1}$ is")).toBe("the $det$ $2AB^{-1}$ is");
  });

  it("still collapses a genuine whitespace-only zone", () => {
    expect(stripMathSpacers("sentence?$  \n $next")).toBe("sentence?\nnext");
  });

  it("survives the real row end to end", () => {
    const raw =
      "Let $A, B, C$ be three $4 " + BS + "times 4$ matrices. Then the $det$ $2AB^{-1}C^3B^T$ is";
    const { text } = normaliseText(raw);
    expect(hasStrayDollar(text)).toBe(false);
    expect(text).toContain(inline("det"));
    expect(text).toContain(inline("2AB^{-1}C^3B^T"));
  });
});

describe("a <br> inside a pipe-table row must not break the row", () => {
  const row = "| | LIST-I<br>(Series) | | LIST-II<br>(Missing term) |";

  it("flattens the <br> to a space so the table survives", () => {
    // jipmat 2026 LR Q18/Q22 arrive as GFM tables ALREADY, so they never pass
    // through htmlTablesToPipe where cell <br> is handled. Turning it into a
    // newline splits one row into two and destroys the table.
    expect(convertHtmlInline(row)).toBe("| | LIST-I (Series) | | LIST-II (Missing term) |");
  });

  it("still turns a <br> in ordinary prose into a newline", () => {
    expect(convertHtmlInline("one<br>two")).toBe("one\ntwo");
  });

  it("keeps the whole table parseable end to end", () => {
    const raw =
      "Match the lists\n\n" +
      row +
      "\n|---|---|---|---|\n| A. | 5, 6, 9 | I. | 31 |\n| B. | 1, 2, 3 | II. | 39 |";
    const { text } = normaliseText(raw);
    expect(hasUnseparatedPipeTable(text)).toBe(false);
    expect(parseTableBlocks(text).some((b) => b.kind === "table")).toBe(true);
  });
});

describe("figuresInsideTable", () => {
  it("is TRUE when a pipe-table cell held the figure", () => {
    // jipmat 2026 LR Q22: the Venn diagrams ARE the answer set, and pulling
    // them out leaves `| I. | |` — a table of empty cells that reads as a
    // complete question and is unanswerable. 3 rows. Must be flagged, not
    // silently repaired.
    const raw =
      '| A. | Bus, Car | I. | <img src="https://x/1" width="120px"/> |\n| B. | Males | II. | <img src="https://x/2" width="120px"/> |';
    expect(figuresInsideTable(raw)).toBe(true);
  });

  it("is false when the figure sits in ordinary prose", () => {
    expect(figuresInsideTable('Study the graph <img src="https://x/1"> and answer.')).toBe(false);
  });

  it("is false for a table with no figure", () => {
    expect(figuresInsideTable("| a | b |\n| --- | --- |\n| 1 | 2 |")).toBe(false);
  });
});

describe("figuresInsideTable also sees the HTML-table shape", () => {
  it("is TRUE for an <img> inside a <td>", () => {
    // jipmat 2025 LR Q6 and Q13 use an HTML <table> whose cells hold the Venn
    // diagrams. The pipe-row check cannot see them: an HTML table sits on one
    // line with no pipes at all, so both rows lost their answer set silently
    // while the gate reported them clean.
    expect(
      figuresInsideTable('<table><tr><td>A. <img src="https://x/1" width="250px"/></td><td>I. 6</td></tr></table>')
    ).toBe(true);
  });

  it("is TRUE for an <img> inside a <th>", () => {
    expect(figuresInsideTable('<table><tr><th><img src="https://x/1"/></th></tr></table>')).toBe(true);
  });

  it("is false for an HTML table with no figure", () => {
    expect(figuresInsideTable("<table><tr><td>a</td><td>b</td></tr></table>")).toBe(false);
  });

  it("is false for a figure in prose next to a table", () => {
    expect(
      figuresInsideTable('<img src="https://x/1"> then <table><tr><td>a</td></tr></table>')
    ).toBe(false);
  });
});

describe("tilde spacing inside maths", () => {
  // 30 zones, all JIPMAT, all the same `\mathrm{~unit}` shape — an OCR
  // artefact where a thin space became a tilde. temml keeps it, but
  // mathml2omml splits the braced text around it, so the Word export prints
  // `1 c m` where the paper says `1 cm`. The web renderer is unaffected, which
  // is why only running BOTH renderers found it.
  it("drops a tilde that opens a braced unit", () => {
    const { text } = fixMathUnicode(inline("5 " + BS + "mathrm{~cm}"));
    expect(text).toBe(inline("5 " + BS + "mathrm{cm}"));
  });

  it("turns a bare tilde elsewhere in maths into a thin space", () => {
    const { text } = fixMathUnicode(inline("a~b"));
    expect(text).toBe(inline("a" + BS + ",b"));
  });

  it("leaves a tilde in PROSE alone", () => {
    expect(fixMathUnicode("approximately ~50 students").text).toBe("approximately ~50 students");
  });

  it("fixes the real row so Word emits the unit as one run", () => {
    const { text } = fixMathUnicode(
      inline(BS + "mathrm{AC}-" + BS + "mathrm{AB}=1 " + BS + "mathrm{~cm}")
    );
    expect(text).toContain(BS + "mathrm{cm}");
    expect(text).not.toContain("{~");
  });
});
