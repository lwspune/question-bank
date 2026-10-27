// Copied from Concept Ladder (src/lib/richText.test.ts, afca8bf).
import { describe, expect, it } from "vitest";
import { parseInline, parseRichText, renderMath, renderRichText } from "@/lib/learn/richText";

describe("parseInline", () => {
  it("returns plain text as one segment", () => {
    expect(parseInline("hello")).toEqual([{ type: "text", text: "hello", bold: false, italic: false }]);
  });

  it("splits inline math", () => {
    expect(parseInline("a $x^2$ b")).toEqual([
      { type: "text", text: "a ", bold: false, italic: false },
      { type: "math", tex: "x^2", bold: false },
      { type: "text", text: " b", bold: false, italic: false },
    ]);
  });

  it("handles bold that wraps math", () => {
    expect(parseInline("**Which $1 - i$?**")).toEqual([
      { type: "text", text: "Which ", bold: true, italic: false },
      { type: "math", tex: "1 - i", bold: true },
      { type: "text", text: "?", bold: true, italic: false },
    ]);
  });

  it("handles single-star italics without confusing them with bold", () => {
    expect(parseInline("set the *other* part")).toEqual([
      { type: "text", text: "set the ", bold: false, italic: false },
      { type: "text", text: "other", bold: false, italic: true },
      { type: "text", text: " part", bold: false, italic: false },
    ]);
  });

  it("leaves an unclosed $ as literal text", () => {
    expect(parseInline("costs $5")).toEqual([{ type: "text", text: "costs $5", bold: false, italic: false }]);
  });

  it("does not treat * inside math as emphasis", () => {
    expect(parseInline("$a*b$")).toEqual([{ type: "math", tex: "a*b", bold: false }]);
  });
});

describe("parseRichText", () => {
  it("splits paragraphs on blank lines", () => {
    const blocks = parseRichText("one\n\ntwo");
    expect(blocks.map((b) => b.type)).toEqual(["paragraph", "paragraph"]);
  });

  it("extracts display math, even inside a paragraph", () => {
    const blocks = parseRichText("For $c$:\n$$\\frac{a}{b}$$\nSpecial case.");
    expect(blocks).toEqual([
      { type: "paragraph", inline: parseInline("For $c$:") },
      { type: "math", tex: "\\frac{a}{b}" },
      { type: "paragraph", inline: parseInline("Special case.") },
    ]);
  });

  it("groups '- ' lines into a list, separate from a lead-in line", () => {
    const blocks = parseRichText("With:\n- one\n- two $x$");
    expect(blocks).toEqual([
      { type: "paragraph", inline: parseInline("With:") },
      { type: "list", items: [parseInline("one"), parseInline("two $x$")] },
    ]);
  });
});

describe("renderMath", () => {
  it("renders TeX to KaTeX HTML", () => {
    expect(renderMath("x^2", false)).toContain("katex");
  });

  it("does not render untrusted commands like \\href into links", () => {
    // The source TeX survives only as escaped text in KaTeX's <annotation>; no link is built.
    const html = renderMath("\\href{javascript:alert(1)}{x}", false);
    expect(html).not.toMatch(/href\s*=/);
    expect(html).not.toContain("<a ");
  });

  it("does not throw on invalid TeX", () => {
    expect(() => renderMath("\\frac{", false)).not.toThrow();
  });
});

describe("renderRichText", () => {
  it("pre-renders math to KaTeX HTML and keeps text as text", () => {
    const [p] = renderRichText("Let **$x$** be <b>");
    expect(p.type).toBe("paragraph");
    if (p.type !== "paragraph") return;
    expect(p.inline[0]).toEqual({ type: "text", text: "Let ", bold: false, italic: false });
    expect(p.inline[1]).toMatchObject({ type: "math", bold: true });
    expect(p.inline[1].type === "math" && p.inline[1].html).toContain("katex");
    // Author text is never turned into HTML; React escapes it when rendered.
    expect(p.inline[2]).toEqual({ type: "text", text: " be <b>", bold: false, italic: false });
  });

  it("renders display math and list items", () => {
    const blocks = renderRichText("$$a$$\n- $b$");
    expect(blocks[0]).toMatchObject({ type: "math" });
    expect(blocks[0].type === "math" && blocks[0].html).toContain("katex-display");
    expect(blocks[1]).toMatchObject({ type: "list" });
  });

  describe("keeps punctuation with the math it touches, so a line can't start with it", () => {
    const inline = (src: string) => {
      const [p] = renderRichText(src);
      return p.type === "paragraph" ? p.inline.map((n) => (n.type === "math" ? { m: n.before + "|" + n.after } : n.text)) : [];
    };

    it("moves closing punctuation after math onto the math", () => {
      expect(inline("so $d = 6$. Next")).toEqual(["so ", { m: "|." }, " Next"]);
      expect(inline("$a$, $b$; and $c$?!")).toEqual([{ m: "|," }, " ", { m: "|;" }, " and ", { m: "|?!" }]);
    });

    it("moves an opening bracket before math onto the math", () => {
      expect(inline("roots ($x$) here")).toEqual(["roots ", { m: "(|)" }, " here"]);
    });

    it("drops a text segment that was only punctuation", () => {
      expect(inline("$x$.")).toEqual([{ m: "|." }]);
    });

    it("leaves punctuation alone when a space separates it from the math", () => {
      expect(inline("$x$ . ( $y$")).toEqual([{ m: "|" }, " . ( ", { m: "|" }]);
    });

    it("works in list items too", () => {
      const [l] = renderRichText("- $x$.");
      expect(l.type === "list" && l.items[0][0]).toMatchObject({ type: "math", after: "." });
    });
  });

  it("produces plain data that survives JSON (safe to pass to client components)", () => {
    const blocks = renderRichText("$x$ and **y**");
    expect(JSON.parse(JSON.stringify(blocks))).toEqual(blocks);
  });
});
