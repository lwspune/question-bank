import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import KatexRenderer from "@/components/math/KatexRenderer";
import RichText from "@/components/math/RichText";
import BlockText from "@/components/math/BlockText";
import { StaticBlockText, StaticKatexRenderer, StaticRichText } from "@/components/math/StaticMath";

/**
 * The server-drawn math the notes handout uses (2026-10-16).
 *
 * Each equation in KatexRenderer / RichText is a client component, so a phone
 * draws every one again in JavaScript after the server already has. On a
 * budget Android phone the MHT-CET Indefinite Integration handout (1,493
 * equations) froze for 52 s; a student tapped "Download as PDF" seven times
 * and left. The static versions run KaTeX on the server and ship finished
 * markup.
 *
 * With `mathml` on they must produce EXACTLY what the client components do,
 * which proves the handout looks the same; by default they drop KaTeX's
 * hidden MathML copy, which halves the page and is invisible in a PDF.
 */
const html = (el: Parameters<typeof renderToStaticMarkup>[0]) => renderToStaticMarkup(el);

const INLINE_CASES: Record<string, string> = {
  plain: "Just words, no math.",
  inline: "The slope is \\(m = \\tan\\theta\\) here.",
  block: "Integrate: \\[\\int x^2\\,dx = \\frac{x^3}{3} + C\\]",
  boldWithMath: "**Key result: \\(a^2 + b^2\\)** then prose",
  italic: "*note* and *\\(x\\)*",
  underline: "Pick \\(\\underline{\\text{quickly}}\\). Then more.",
  italicUnderline: "\\(\\underline{\\textit{Homo sapiens}}\\)",
  parseError: "Broken \\(\\frac{1}{\\) math",
  newlines: "line one\nline two \\(x\\)",
};

describe("StaticKatexRenderer matches KatexRenderer", () => {
  for (const [name, text] of Object.entries(INLINE_CASES)) {
    it(name, () => {
      expect(html(createElement(StaticKatexRenderer, { text, className: "c", mathml: true }))).toBe(
        html(createElement(KatexRenderer, { text, className: "c" }))
      );
    });
  }

  it("renders nothing for empty text", () => {
    expect(html(createElement(StaticKatexRenderer, { text: "" }))).toBe("");
  });
});

describe("StaticRichText matches RichText", () => {
  const cases: Record<string, string> = {
    paragraphs: "First paragraph with \\(x\\).\n\nSecond **bold** one.",
    bullets: "Types:\n- **Linear**: \\(ax + b\\)\n- *Quadratic*: \\[ax^2 + bx + c\\]",
  };
  for (const [name, text] of Object.entries(cases)) {
    it(name, () => {
      expect(html(createElement(StaticRichText, { text, className: "pbody", mathml: true }))).toBe(
        html(createElement(RichText, { text, className: "pbody" }))
      );
    });
  }
});

describe("StaticBlockText matches BlockText", () => {
  const cases: Record<string, { text: string; solution?: boolean }> = {
    noTable: { text: "Plain \\(x+1\\) stem" },
    table: { text: "Data:\n\n| x | \\(f(x)\\) |\n|---|---|\n| 1 | \\(2\\) |\n\nAfter." },
    solution: { text: "Hence \\[y = 2x\\]", solution: true },
  };
  for (const [name, c] of Object.entries(cases)) {
    it(name, () => {
      expect(html(createElement(StaticBlockText, { ...c, mathml: true }))).toBe(
        html(createElement(BlockText, c))
      );
    });
  }
});

describe("the default drops the hidden MathML copy", () => {
  const text = "\\(\\int x\\,dx\\) and \\[\\frac{a}{b}\\]";

  it("draws KaTeX's visible markup without MathML", () => {
    const out = html(createElement(StaticKatexRenderer, { text }));
    expect(out).toContain('class="katex-html"');
    expect(out).not.toContain("<math");
  });

  it("is smaller than the client output", () => {
    const lean = html(createElement(StaticKatexRenderer, { text })).length;
    const full = html(createElement(KatexRenderer, { text })).length;
    expect(lean).toBeLessThan(full * 0.8);
  });

  it("applies to rich text and tables too", () => {
    expect(html(createElement(StaticRichText, { text: "- \\(x\\)" }))).not.toContain("<math");
    const table = "| a |\n|---|\n| \\(y\\) |";
    expect(html(createElement(StaticBlockText, { text: table }))).not.toContain("<math");
  });
});
