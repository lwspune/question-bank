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
    expect(out).toMatch(/^<svg[^>]*viewBox="0 0 340 240"/);
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
