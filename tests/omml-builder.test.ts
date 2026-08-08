import { describe, it, expect } from "vitest";
import {
  latexToOmml,
  ommlNestingError,
  sanitizeOmmlForXml,
  textWithMathToOmmlSegments,
} from "@/lib/export/ommlBuilder";

describe("latexToOmml", () => {
  it("converts a simple fraction to OMML", () => {
    const omml = latexToOmml("\\frac{1}{2}");
    expect(omml).not.toBeNull();
    expect(omml!).toMatch(/m:oMath/);
    // OMML fraction element
    expect(omml!).toMatch(/m:f/);
  });

  it("converts a sum to OMML", () => {
    const omml = latexToOmml("\\sum_{i=1}^n x_i");
    expect(omml).not.toBeNull();
    expect(omml!).toMatch(/m:oMath/);
  });

  it("returns null for unparseable LaTeX (graceful fallback)", () => {
    const omml = latexToOmml("\\frac{1");
    expect(omml).toBeNull();
  });

  // Regression: real NDA Trig 2025 content "0 < α < 90°" was producing
  // OMML with literal '<' inside <m:t>...</m:t>, breaking the docx.
  it("escapes < > & inside <m:t> text content (XML safety)", () => {
    const omml = latexToOmml("0 < \\alpha < 90");
    expect(omml).not.toBeNull();
    // No raw '<' should appear inside m:t text content. We assert by
    // extracting every <m:t>...</m:t> block and checking its inner text.
    const matches = [
      ...omml!.matchAll(/<m:t(?:\s[^>]*)?>([\s\S]*?)<\/m:t>/g),
    ];
    expect(matches.length).toBeGreaterThan(0);
    for (const m of matches) {
      const inner = m[1];
      // Inner text must not contain any literal < > or unescaped &.
      expect(inner).not.toMatch(/</);
      expect(inner).not.toMatch(/>/);
      expect(inner).not.toMatch(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/);
    }
  });

  it("escapes ampersand inside <m:t> text content", () => {
    const omml = latexToOmml("a \\& b");
    if (omml) {
      const matches = [
        ...omml.matchAll(/<m:t(?:\s[^>]*)?>([\s\S]*?)<\/m:t>/g),
      ];
      for (const m of matches) {
        expect(m[1]).not.toMatch(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/);
      }
    }
  });

  it("preserves already-escaped entities (&amp;, &lt;, &gt;) instead of double-escaping", () => {
    // Direct sanitizer behaviour: feed an OMML-shaped fragment and verify
    // pre-escaped entities pass through untouched.
    const fragment =
      '<m:oMath><m:t>foo &amp; bar &lt; baz &gt; qux</m:t></m:oMath>';
    const sanitized = sanitizeOmmlForXml(fragment);
    expect(sanitized).toContain("&amp;");
    expect(sanitized).not.toContain("&amp;amp;");
    expect(sanitized).toContain("&lt;");
    expect(sanitized).not.toContain("&amp;lt;");
  });

  it("escapes raw < > & inside m:t when fed directly to the sanitizer", () => {
    const fragment = '<m:oMath><m:t>0<a<90</m:t></m:oMath>';
    const sanitized = sanitizeOmmlForXml(fragment);
    expect(sanitized).toBe(
      '<m:oMath><m:t>0&lt;a&lt;90</m:t></m:oMath>'
    );
  });

  it("does not touch text outside <m:t> elements", () => {
    // The opening m:oMath tag has attributes (sometimes with > in URLs); the
    // sanitizer must only operate inside m:t bodies.
    const fragment =
      '<m:oMath xmlns:m="http://example/foo"><m:t>x<y</m:t></m:oMath>';
    const sanitized = sanitizeOmmlForXml(fragment);
    expect(sanitized).toContain('xmlns:m="http://example/foo"');
    expect(sanitized).toContain("<m:t>x&lt;y</m:t>");
  });
});

// mml2omml emits a delimited matrix as a bare <m:m> grid flanked by plain,
// single-line-height <m:r><m:t>(</m:t></m:r> fence runs — Word then renders
// the brackets/determinant-bars detached and non-stretching beside the
// matrix. wrapMatrixDelimiters rewrites the fence-run + <m:m> + fence-run
// pattern into a proper stretchy <m:d> delimiter object.
describe("latexToOmml — matrix/determinant delimiters", () => {
  const innerText = (omml: string) =>
    [...omml.matchAll(/<m:t(?:\s[^>]*)?>([\s\S]*?)<\/m:t>/g)]
      .map((m) => m[1])
      .join("");

  it("wraps a pmatrix in a stretchy delimiter with ( ) characters", () => {
    const omml = latexToOmml("\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}");
    expect(omml).not.toBeNull();
    expect(omml!).toContain("<m:m>");
    expect(omml!).toContain("<m:d>");
    expect(omml!).toMatch(/<m:begChr m:val="\("\/>/);
    expect(omml!).toMatch(/<m:endChr m:val="\)"\/>/);
    // the matrix grid lives inside the delimiter's <m:e>
    expect(omml!).toMatch(/<m:d>[\s\S]*<m:e>[\s\S]*<m:m>[\s\S]*<\/m:m>[\s\S]*<\/m:e>[\s\S]*<\/m:d>/);
    // no leftover bare fence run beside the matrix
    expect(omml!).not.toMatch(/<m:t[^>]*>\(<\/m:t><\/m:r><m:m>/);
  });

  it("wraps a bmatrix in a stretchy delimiter with [ ] characters", () => {
    const omml = latexToOmml("\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}");
    expect(omml).not.toBeNull();
    expect(omml!).toContain("<m:d>");
    expect(omml!).toMatch(/<m:begChr m:val="\["\/>/);
    expect(omml!).toMatch(/<m:endChr m:val="\]"\/>/);
  });

  it("wraps a vmatrix (determinant) in a stretchy delimiter with | | bars", () => {
    const omml = latexToOmml("\\begin{vmatrix}1&2\\\\3&4\\end{vmatrix}");
    expect(omml).not.toBeNull();
    expect(omml!).toContain("<m:d>");
    expect(omml!).toMatch(/<m:begChr m:val="\|"\/>/);
    expect(omml!).toMatch(/<m:endChr m:val="\|"\/>/);
  });

  it("preserves the matrix grid contents after wrapping", () => {
    const omml = latexToOmml("\\begin{pmatrix}3&-3&4\\\\2&-3&4\\\\0&-1&1\\end{pmatrix}");
    expect(omml).not.toBeNull();
    expect(innerText(omml!)).toContain("3");
    expect(innerText(omml!)).toContain("−3");
    expect(innerText(omml!)).toContain("1");
    // three matrix rows survive
    expect([...omml!.matchAll(/<m:mr>/g)]).toHaveLength(3);
  });

  it("keeps surrounding text outside the delimiter (A = (matrix))", () => {
    const omml = latexToOmml("A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}");
    expect(omml).not.toBeNull();
    // the "A=" run must stay before the delimiter, not be swallowed into it
    expect(omml!).toMatch(/<m:t[^>]*>A=<\/m:t><\/m:r><m:d>/);
  });

  it("does NOT wrap ordinary parenthesised math like f(x)", () => {
    const omml = latexToOmml("f(x) = x^2");
    expect(omml).not.toBeNull();
    expect(omml!).not.toContain("<m:d>");
  });

  it("leaves a fence-less \\begin{matrix} as a bare <m:m> (no delimiter)", () => {
    const omml = latexToOmml("\\begin{matrix}1&2\\\\3&4\\end{matrix}");
    expect(omml).not.toBeNull();
    expect(omml!).toContain("<m:m>");
    expect(omml!).not.toContain("<m:d>");
  });
});

// mml2omml maps single-base accents (\bar \hat \vec \dot \tilde) to an over-LIMIT
// <m:limUpp>, which Word renders as a tiny detached mark above the base. wrapAccents
// rewrites these to a proper <m:acc>, and \overline's top-only <m:borderBox> to
// <m:bar pos=top>.
describe("latexToOmml — accents (bar/hat/vec/dot/overline)", () => {
  it("converts \\bar{x} to an accent (not a limit)", () => {
    const omml = latexToOmml("\\bar{x}");
    expect(omml).not.toBeNull();
    expect(omml!).toContain("<m:acc>");
    expect(omml!).toContain('<m:chr m:val="̅"/>'); // combining overline
    expect(omml!).not.toContain("<m:limUpp>");
  });

  it("converts \\hat{i} to a circumflex accent", () => {
    const omml = latexToOmml("\\hat{i}");
    expect(omml!).toContain("<m:acc>");
    expect(omml!).toContain('<m:chr m:val="̂"/>'); // combining circumflex
    expect(omml!).not.toContain("<m:limUpp>");
  });

  it("converts \\vec{a} to an arrow accent", () => {
    const omml = latexToOmml("\\vec{a}");
    expect(omml!).toContain("<m:acc>");
    expect(omml!).toContain('<m:chr m:val="⃗"/>'); // combining arrow above
  });

  it("converts \\dot{x} to a dot accent", () => {
    const omml = latexToOmml("\\dot{x}");
    expect(omml!).toContain("<m:acc>");
    expect(omml!).toContain('<m:chr m:val="̇"/>'); // combining dot above
  });

  it("preserves the base under the accent", () => {
    const omml = latexToOmml("\\bar{x}-x_n+k");
    expect(omml!).toContain("<m:acc>");
    expect(omml!).toMatch(/<m:acc>.*<m:t[^>]*>x<\/m:t>.*<\/m:acc>/s);
    // the rest of the expression survives
    expect(omml!).toContain("<m:sSub>"); // x_n
  });

  it("converts \\overline{x} to a top bar (not an invisible borderBox)", () => {
    const omml = latexToOmml("\\overline{x}");
    expect(omml!).toContain("<m:bar>");
    expect(omml!).toContain('<m:pos m:val="top"/>');
    expect(omml!).not.toContain("<m:borderBox>");
  });

  it("leaves \\overrightarrow{AB} as a stretchy groupChr (already correct)", () => {
    const omml = latexToOmml("\\overrightarrow{AB}");
    expect(omml!).toContain("<m:groupChr>");
    expect(omml!).not.toContain("<m:acc>");
  });

  it("does NOT turn a real \\lim into an accent", () => {
    // \lim_{x\to 0} uses limit constructs but its limit is not an accent char
    const omml = latexToOmml("\\lim_{x \\to 0} f(x)");
    expect(omml).not.toBeNull();
    expect(omml!).not.toContain("<m:acc>");
  });
});

// ── Well-formedness of the OMML we EMIT ──────────────────────────────────────
//
// Regression suite for the 2026-08-08 "Word says the file is corrupt" defect.
// wrapAccents' two rewrites used an unanchored non-greedy `[\s\S]*?`, so when
// the expected local shape was absent the match ran ACROSS element boundaries
// and paired one element's opening tag with a DIFFERENT element's closing tag
// (`<m:acc>…</m:limUpp>`). That is malformed XML: Word refuses to open the
// document outright, so a single such question silently corrupts a whole paper.
//
// Two independent triggers, both real bank content:
//   1. \dfrac / \displaystyle — temml emits <m:argPr><m:scrLvl> inside <m:lim>,
//      so the old regex's required `<m:lim><m:r>` never matched locally.
//   2. nested \overline{…\overline{…}} — same flaw in the borderBox → <m:bar>
//      rewrite (Boolean-algebra / De Morgan solutions).
describe("ommlNestingError", () => {
  it("returns null for well-formed XML", () => {
    expect(ommlNestingError("<a><b/><c>x</c></a>")).toBeNull();
  });

  it("accepts self-closing and attribute-bearing tags", () => {
    expect(
      ommlNestingError('<m:acc><m:chr m:val="̅"/><m:e>x</m:e></m:acc>')
    ).toBeNull();
  });

  it("detects a crossed tag pair", () => {
    expect(ommlNestingError("<m:acc><m:e>a</m:e></m:limUpp>")).toContain(
      "m:limUpp"
    );
  });

  it("detects an unclosed element", () => {
    expect(ommlNestingError("<m:acc><m:e>a</m:e>")).toContain("unclosed");
  });
});

describe("latexToOmml — emits well-formed OMML (never a corrupt .docx)", () => {
  // Real bank content. Q119 of APJ-LWS Full Mock 10 (Vectors) — its ANSWER KEY
  // would not open in Word at all before the fix.
  const REAL_BANK_FIXTURES: string[] = [
    // accent class — \dfrac
    String.raw`\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|}=2\cdot\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}\Rightarrow|\vec{b}|=2|\vec{a}|`.replace(
      /\\frac/g,
      "\\dfrac"
    ),
    String.raw`\hat{n}=\dfrac{\bar{n}}{|\bar{n}|}=\dfrac{1}{3}\left(2\hat{i}+\hat{j}+2\hat{k}\right)`,
    String.raw`\vec{E}=\dfrac{\vec{a}+\vec{d}}{2},\qquad \vec{F}=\dfrac{\vec{b}+\vec{c}}{2}`,
    String.raw`= \dfrac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\vec{b}`,
    // accent class — nested \bar
    String.raw`C = \bar{A} \cdot \bar{\bar{B}} = \bar{A} \cdot B`,
    // overline class — nested \overline (Boolean algebra)
    String.raw`Y=\overline{\overline{A}+\overline{B}}=A\cdot B`,
    String.raw`Y = \overline{\overline{A}\cdot\overline{B}} = A + B`,
    String.raw`Y=\overline{\left(A+\overline{B}\right)+\left(\overline{A}+B\right)}`,
    String.raw`Y=\overline{\overline{(A+B)\cdot(A\cdot B)}}=(A+B)\cdot(A\cdot B).`,
  ];

  for (const latex of REAL_BANK_FIXTURES) {
    it(`is well-formed: ${latex.slice(0, 52)}…`, () => {
      for (const display of [false, true]) {
        const omml = latexToOmml(latex, display);
        // null is an acceptable outcome (caller falls back to Unicode);
        // malformed XML is NOT — that is what breaks the whole document.
        if (omml !== null) expect(ommlNestingError(omml)).toBeNull();
      }
    });
  }

  it("converts accents inside \\dfrac (not left as a detached limit)", () => {
    const omml = latexToOmml(String.raw`\dfrac{\vec{a}\cdot\vec{b}}{|\vec{a}|}`);
    expect(omml).not.toBeNull();
    expect(omml!).toContain("<m:acc>");
    expect(omml!).not.toContain("<m:limUpp>");
  });

  it("converts accents under \\displaystyle", () => {
    const omml = latexToOmml(String.raw`\displaystyle \vec{a}+\vec{b}`);
    expect(omml).not.toBeNull();
    expect(omml!).toContain("<m:acc>");
    expect(omml!).not.toContain("<m:limUpp>");
  });

  it("converts a nested accent inner-first (\\bar{\\bar{B}})", () => {
    const omml = latexToOmml(String.raw`\bar{\bar{B}}`);
    expect(omml).not.toBeNull();
    expect(ommlNestingError(omml!)).toBeNull();
    expect((omml!.match(/<m:acc>/g) ?? []).length).toBe(2);
  });

  it("converts a nested \\overline inner-first", () => {
    const omml = latexToOmml(String.raw`\overline{\overline{A}\cdot B}`);
    expect(omml).not.toBeNull();
    expect(ommlNestingError(omml!)).toBeNull();
    expect((omml!.match(/<m:bar>/g) ?? []).length).toBe(2);
    expect(omml!).not.toContain("<m:borderBox>");
  });

  it("still does NOT convert a real \\lim sitting inside a \\dfrac", () => {
    const omml = latexToOmml(String.raw`\dfrac{\lim_{x \to 0} f(x)}{2}`);
    expect(omml).not.toBeNull();
    expect(ommlNestingError(omml!)).toBeNull();
    expect(omml!).not.toContain("<m:acc>");
  });

  it("returns null rather than malformed OMML", () => {
    // Guard the safety net itself: whatever temml/mml2omml (unmaintained) does,
    // latexToOmml must never hand the docx builder unbalanced XML.
    const samples = [
      ...REAL_BANK_FIXTURES,
      String.raw`\frac{\bar{x}}{\bar{y}}`,
      String.raw`\overrightarrow{AB}+\vec{c}`,
      String.raw`\overline{A}\cdot\overline{B}`,
      String.raw`\dfrac{\hat{i}+\hat{j}}{\sqrt{2}}`,
    ];
    for (const latex of samples) {
      const omml = latexToOmml(latex);
      if (omml !== null) expect(ommlNestingError(omml)).toBeNull();
    }
  });
});

describe("textWithMathToOmmlSegments", () => {
  it("returns a single text segment for plain prose", () => {
    expect(textWithMathToOmmlSegments("hello world")).toEqual([
      { type: "text", content: "hello world" },
    ]);
  });

  it("splits text + inline LaTeX correctly", () => {
    const segs = textWithMathToOmmlSegments(
      "Solve \\(\\frac{1}{2}\\) please"
    );
    expect(segs).toHaveLength(3);
    expect(segs[0]).toEqual({ type: "text", content: "Solve " });
    expect(segs[1].type).toBe("math");
    expect((segs[1] as { content: string }).content).toMatch(/m:oMath/);
    expect(segs[2]).toEqual({ type: "text", content: " please" });
  });

  it("treats block LaTeX as a math segment (display)", () => {
    const segs = textWithMathToOmmlSegments("Eq: \\[\\frac{a}{b}\\]");
    const math = segs.find((s) => s.type === "math");
    expect(math).toBeDefined();
    expect((math as { display: boolean }).display).toBe(true);
  });

  it("falls back to original text when LaTeX is unparseable", () => {
    const segs = textWithMathToOmmlSegments("Broken \\(\\frac{1\\) here");
    // No math segments — the broken expression became plain text
    expect(segs.every((s) => s.type === "text")).toBe(true);
    // The broken expression contents should still be present (so the doc is readable)
    expect(segs.map((s) => s.content).join("")).toContain("\\frac{1");
  });

  it("handles real-world Excel content with multiple math expressions", () => {
    const segs = textWithMathToOmmlSegments(
      "The resultant of \\(\\vec{A}\\) and \\(\\vec{B}\\) is \\(\\vec{R}\\)"
    );
    expect(segs.filter((s) => s.type === "math")).toHaveLength(3);
  });
});

// Word's rendering of <m:borderBox> with three sides hidden (the OMML
// shape mathml2omml emits for \underline{\text{x}}) is unreliable — the
// bottom border often doesn't draw for inline math, so the export shows
// no underline. Bypass the OMML pipeline for the documented underline
// patterns and emit a marker segment the docx builder can render as a
// native Word run with <w:u w:val="single"/>.
describe("textWithMathToOmmlSegments — underline bypass", () => {
  it("emits underlined-text segment for \\(\\underline{\\text{word}}\\)", () => {
    const segs = textWithMathToOmmlSegments(
      "He nodded \\(\\underline{\\text{absently}}\\) throughout the meeting."
    );
    expect(segs).toHaveLength(3);
    expect(segs[0]).toEqual({ type: "text", content: "He nodded " });
    expect(segs[1]).toEqual({
      type: "underlined-text",
      content: "absently",
      italic: false,
    });
    expect(segs[2]).toEqual({
      type: "text",
      content: " throughout the meeting.",
    });
  });

  it("emits italic underlined-text segment for \\(\\underline{\\textit{name}}\\)", () => {
    const segs = textWithMathToOmmlSegments("\\(\\underline{\\textit{Amoeba}}\\)");
    expect(segs).toHaveLength(1);
    expect(segs[0]).toEqual({
      type: "underlined-text",
      content: "Amoeba",
      italic: true,
    });
  });

  it("preserves whitespace inside \\text{} as authored", () => {
    const segs = textWithMathToOmmlSegments("\\(\\underline{\\text{ x }}\\)");
    expect(segs).toEqual([
      { type: "underlined-text", content: " x ", italic: false },
    ]);
  });

  it("handles multi-word payloads", () => {
    const segs = textWithMathToOmmlSegments(
      "Phrase: \\(\\underline{\\text{a Nobel laureate and the author of the national anthem,}}\\) followed."
    );
    expect(segs.filter((s) => s.type === "underlined-text")).toEqual([
      {
        type: "underlined-text",
        content: "a Nobel laureate and the author of the national anthem,",
        italic: false,
      },
    ]);
  });

  // Real-bank pattern: authors sometimes put sentence-ending punctuation
  // INSIDE the math delimiters — e.g. `\(\underline{\text{insidious}}.\)`.
  // The trailing period must end up as a plain-text run AFTER the
  // underlined run so the rendered sentence keeps its full stop.
  it("splits trailing punctuation inside the math delimiters into a separate text segment", () => {
    const segs = textWithMathToOmmlSegments(
      "He acted in an \\(\\underline{\\text{insidious}}.\\)"
    );
    expect(segs).toEqual([
      { type: "text", content: "He acted in an " },
      { type: "underlined-text", content: "insidious", italic: false },
      { type: "text", content: "." },
    ]);
  });

  it("handles each accepted trailing punctuation character (. , ; : ! ?)", () => {
    for (const punct of [".", ",", ";", ":", "!", "?"]) {
      const segs = textWithMathToOmmlSegments(`\\(\\underline{\\text{x}}${punct}\\)`);
      expect(segs).toEqual([
        { type: "underlined-text", content: "x", italic: false },
        { type: "text", content: punct },
      ]);
    }
  });

  it("falls through to OMML math for bare \\underline{x} (no text/textit wrapper)", () => {
    const segs = textWithMathToOmmlSegments("\\(\\underline{x}\\)");
    expect(segs).toHaveLength(1);
    expect(segs[0].type).toBe("math");
  });

  it("falls through to OMML math for chained \\text{a}\\text{b} inside underline", () => {
    const segs = textWithMathToOmmlSegments(
      "\\(\\underline{\\text{a}\\text{b}}\\)"
    );
    expect(segs).toHaveLength(1);
    expect(segs[0].type).toBe("math");
  });

  it("falls through to OMML math for \\textbf{...} (bold variant, out of scope)", () => {
    const segs = textWithMathToOmmlSegments(
      "\\(\\underline{\\textbf{word}}\\)"
    );
    expect(segs).toHaveLength(1);
    expect(segs[0].type).toBe("math");
  });

  it("falls through to OMML math when math precedes the underline in the same segment", () => {
    // Whole inline-math segment must be just the underline. Mixed content
    // like "x + \underline{\text{y}}" routes through the math pipeline.
    const segs = textWithMathToOmmlSegments("\\(x + \\underline{\\text{y}}\\)");
    expect(segs).toHaveLength(1);
    expect(segs[0].type).toBe("math");
  });
});
