import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import SceneSvg from "@/components/visuals/SceneSvg";
import { usableVisual } from "@/lib/visuals/visual";
import type { Shape } from "@/lib/visuals/types";
import { ARC_SOLUTION, ARC_VISUAL } from "./fixtures/visuals";

const html = (shapes: Shape[]) => renderToStaticMarkup(createElement(SceneSvg, { shapes, w: 340, h: 240, label: "Arc scene, step 1" }));

describe("SceneSvg", () => {
  it("draws every shape kind as SVG in the scene's box, labelled for screen readers", () => {
    const out = html([
      { kind: "line", x1: 0, y1: 0, x2: 10, y2: 10, stroke: "brand", width: 2 },
      { kind: "circle", cx: 5, cy: 5, r: 3, fill: "amber" },
      { kind: "rect", x: 1, y: 1, w: 4, h: 4, fill: "glass" },
      { kind: "path", d: "M0 0 L5 5", stroke: "fg" },
      { kind: "polyline", points: [[0, 0], [1, 1]], stroke: "good" },
      { kind: "text", x: 2, y: 2, text: "r", tone: "muted" },
    ]);
    expect(out).toMatch(/<svg[^>]*viewBox="0 0 340 240"/);
    expect(out).toContain('role="img"');
    expect(out).toContain('aria-label="Arc scene, step 1"');
    for (const tag of ["<line", "<circle", "<rect", "<path", "<polyline", "<text"]) expect(out).toContain(tag);
  });

  it("colours through theme variables only, so both themes work", () => {
    const out = html([
      { kind: "line", x1: 0, y1: 0, x2: 1, y2: 1, stroke: "brand" },
      { kind: "text", x: 2, y: 2, text: "r", tone: "brand" },
    ]);
    expect(out).toContain("var(--viz-brand)");
    // Text in the brand tone uses the AA-safe text shade, not the fill shade.
    expect(out).toContain("var(--viz-brand-text)");
    expect(out).not.toMatch(/#[0-9a-f]{3,6}/i);
  });

  it("typesets a maths line with KaTeX, a marked term in its theme class", () => {
    const out = html([{ kind: "math", x: 8, y: 10, w: 320, h: 30, tex: "x^2 \htmlClass{viz-mark-1}{-5x} + 6 = 0", tone: "fg" }]);
    expect(out).toContain("katex");
    expect(out).toContain("viz-mark-1");
    expect(out).not.toMatch(/#[0-9a-f]{3,6}/i);
  });

  // iPhone Safari draws KaTeX's fractions and powers (relatively positioned HTML)
  // in the wrong place inside an SVG <foreignObject> once the picture is drawn
  // smaller than its box: in V's chat the last line fell onto the Play button
  // (owner screenshot, 2026-11-12). So a maths line is plain HTML laid over the
  // picture, placed and sized as a share of the box, never inside the SVG.
  it("lays a maths line over the picture as HTML, placed and sized as a share of the box", () => {
    const out = html([{ kind: "math", x: 8, y: 10, w: 320, h: 30, tex: "\\frac{1}{2}", tone: "fg", size: 16, opacity: 0.5 }]);
    expect(out).not.toContain("<foreignObject");
    const svg = out.slice(out.indexOf("<svg"), out.indexOf("</svg>"));
    expect(svg).not.toContain("katex");
    expect(svg).not.toContain("data-viz-math");
    // The wrapper is the size container the line's font scales against (box 340 wide).
    expect(out).toMatch(/^<div[^>]*container-type:inline-size/);
    expect(out).toContain("--viz-u:calc(100cqw / 340)");
    // 8/340, 10/240, 320/340, 30/240 of the box.
    expect(out).toMatch(/left:2\.35\d*%/);
    expect(out).toMatch(/top:4\.16\d*%/);
    expect(out).toMatch(/width:94\.11\d*%/);
    expect(out).toContain("height:12.5%");
    expect(out).toContain("opacity:0.5");
    // Font and line height in box units, so the line shrinks with the picture.
    expect(out).toContain('data-viz-math="16"');
    expect(out).toContain("font-size:calc(var(--viz-u, 1px) * 16)");
    expect(out).toContain("line-height:calc(var(--viz-u, 1px) * 30)");
  });

  it("refuses any htmlClass other than the three mark classes, and any other trusted command", () => {
    const out = html([{ kind: "math", x: 0, y: 0, w: 300, h: 30, tex: "\htmlClass{evil}{x} + \href{javascript:alert(1)}{y}", tone: "fg" }]);
    expect(out).not.toContain('class="evil');
    expect(out).not.toMatch(/href="javascript/);
  });

  it("escapes label text", () => {
    expect(html([{ kind: "text", x: 1, y: 1, text: "x < 0 & y > 1", tone: "fg" }])).toContain("x &lt; 0 &amp; y &gt; 1");
  });
});

describe("usableVisual", () => {
  it("passes a visual that parses and whose self-check agrees with its answer", () => {
    expect(usableVisual(ARC_VISUAL)).toBe(ARC_VISUAL);
  });
  it("drops a visual that fails to parse or whose check disagrees, and an absent one", () => {
    expect(usableVisual({ ...ARC_VISUAL, scene: "nope" })).toBeNull();
    expect(usableVisual({ ...ARC_VISUAL, answer: { value: 1, label: "1" } })).toBeNull();
    expect(usableVisual(null)).toBeNull();
    expect(usableVisual(undefined)).toBeNull();
    expect(ARC_SOLUTION).toBeTruthy();
  });
});
