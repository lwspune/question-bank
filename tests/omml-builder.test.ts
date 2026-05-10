import { describe, it, expect } from "vitest";
import {
  latexToOmml,
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
