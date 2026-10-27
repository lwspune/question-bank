// Copied from Concept Ladder (src/figures/FigureView.test.tsx, afca8bf).
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Figure } from "@/lib/learn/types";
import { FigureView } from "@/components/learn/FigureView";

const fig: Figure = {
  alt: "The point 3 + 4i and its distance 5 from the origin",
  view: { x: [-3, 5], y: [-1, 5] }, // 8 units wide: 50px per unit
  elements: [
    { kind: "point", at: [3, 4], label: "3 + 4i" },
    { kind: "segment", from: [0, 0], to: [3, 4], label: "5", step: 2 },
    { kind: "circle", centre: [0, 0], r: 5, dashed: true, step: 3 },
  ],
};

const html = (props: Parameters<typeof FigureView>[0]) => renderToStaticMarkup(createElement(FigureView, props));

describe("FigureView", () => {
  it("is an image named by its alt text, for screen readers", () => {
    const out = html({ figure: fig });
    expect(out).toMatch(/<svg[^>]*role="img"/);
    expect(out).toContain(`<title`);
    expect(out).toContain(fig.alt);
  });

  it("escapes label text instead of injecting markup", () => {
    const out = html({ figure: { ...fig, elements: [{ kind: "label", at: [1, 1], label: "<script>x</script>" }] } });
    expect(out).not.toContain("<script>");
    expect(out).toContain("&lt;script&gt;");
  });

  it("shows everything by default", () => {
    const out = html({ figure: fig });
    expect(out).toContain("3 + 4i");
    expect(out).toContain(">5<");
    expect(out).toMatch(/<circle[^>]*r="250"/);
  });

  it("in a worked example, shows elements up to the current step only", () => {
    const out = html({ figure: fig, upTo: 2 });
    expect(out).toContain(">5<");
    expect(out).not.toMatch(/<circle[^>]*r="250"/);
  });

  it("animates only the elements the current step introduces", () => {
    const out = html({ figure: fig, upTo: 2 });
    expect(out.match(/fig-(in|draw)/g)).toHaveLength(2); // the segment draws in, its label fades in
  });

  it("draws dashed strokes with real dashes (pathLength would stretch one dash over the whole stroke)", () => {
    const out = html({
      figure: {
        ...fig,
        elements: [
          { kind: "circle", centre: [0, 0], r: 2, dashed: true },
          { kind: "segment", from: [0, 0], to: [3, 4], dashed: true },
          { kind: "line", through: [[0, 0], [1, 1]], dashed: true },
        ],
      },
    });
    const dashed = out.match(/<(circle|line)[^>]*stroke-dasharray="7 6"[^>]*>/g) ?? [];
    expect(dashed).toHaveLength(3);
    for (const el of dashed) expect(el).not.toContain("pathLength");
  });

  it("draws an ellipse to scale and a hyperbola branch as a path", () => {
    const out = html({
      figure: {
        ...fig,
        elements: [
          { kind: "ellipse", centre: [0, 0], rx: 4, ry: 3, label: "sum = 8" },
          { kind: "hyperbola", centre: [0, 0], a: 1, b: 1, axis: "x", branch: 1, dashed: true },
        ],
      },
    });
    // 50px per unit; the centre is at (150, 250).
    expect(out).toMatch(/<ellipse[^>]*cx="150" cy="250" rx="200" ry="150"/);
    expect(out).toContain("sum = 8");
    const path = out.match(/<path[^>]*stroke-dasharray="7 6"[^>]*d="M ([\d. LM-]+)"/);
    expect(path).not.toBeNull();
    expect(path![0]).not.toContain("pathLength");
  });

  it("draws a curve as one path through its points, labelled at its last visible point", () => {
    const out = html({
      figure: {
        ...fig,
        elements: [{ kind: "curve", points: [[0, 0], [1, 1], [2, 4], [3, 9]], label: "y = x²" }],
      },
    });
    // 50px per unit from (-3, 5): (0,0) → (150, 250), (1,1) → (200, 200), (2,4) → (250, 50).
    expect(out).toMatch(/<path[^>]*d="M 150 250 L 200 200 L 250 50 L 300 -200"/);
    // (3, 9) is above the view, so the label sits at (2, 4), its last visible point.
    const label = out.match(/<text x="([\d.]+)" y="([\d.]+)"[^>]*>y = x²<\/text>/);
    expect(label).not.toBeNull();
    expect(+label![1]).toBeGreaterThan(250);
    expect(+label![1]).toBeLessThan(270);
  });

  it("draws no axes or grid when axes is none (Venn diagrams)", () => {
    const out = html({ figure: { ...fig, axes: "none" } });
    expect(out).not.toContain(">Re<");
    expect(out).not.toContain(">x<");
    expect(out).not.toContain('stroke="var(--lf-border)"');
    expect(out).toContain("3 + 4i");
  });

  it("keeps labels inside the frame, even when anchored at its edge", () => {
    // 400 x 300 frame; labels anchored on the top and right edges.
    const out = html({
      figure: {
        ...fig,
        elements: [
          { kind: "label", at: [5, 5], label: "a long label at the corner" },
          { kind: "point", at: [5, 0], label: "edge", labelAt: "e" },
        ],
      },
    });
    const texts = [...out.matchAll(/<text x="([\d.-]+)" y="([\d.-]+)" text-anchor="(\w+)"[^>]*font-size="15"[^>]*>([^<]+)</g)];
    expect(texts).toHaveLength(2);
    for (const [, x, y, anchor, label] of texts) {
      const w = label.length * 8.5;
      const left = anchor === "start" ? +x : anchor === "end" ? +x - w : +x - w / 2;
      expect(left).toBeGreaterThanOrEqual(0);
      expect(left + w).toBeLessThanOrEqual(400);
      expect(+y).toBeGreaterThanOrEqual(14);
      expect(+y).toBeLessThanOrEqual(300);
    }
  });

  it("labels Argand axes Re and Im, with imaginary ticks, by default", () => {
    const out = html({ figure: fig });
    expect(out).toContain(">Re<");
    expect(out).toContain(">Im<");
    expect(out).toContain(">2i<");
  });

  it("labels xy axes x and y, with plain numbers on both", () => {
    const out = html({ figure: { ...fig, axes: "xy" } });
    expect(out).toContain(">x<");
    expect(out).toContain(">y<");
    expect(out).toContain(">2<");
    expect(out).not.toContain(">Re<");
    expect(out).not.toContain(">2i<");
  });

  it("in sequence mode, delays each step's elements in turn", () => {
    const out = html({ figure: fig, stagger: 1 });
    expect(out).toContain("animation-delay:1s");
    expect(out).toContain("animation-delay:2s");
  });
});

describe("FigureView: a turning arm", () => {
  // 8 x 8 view, 50px per unit: the origin is at (200, 200).
  const turnFig = (turn: Partial<Extract<Figure["elements"][number], { kind: "turn" }>>, more: Figure["elements"] = []): Figure => ({
    alt: "An arm turning about the origin",
    axes: "none",
    view: { x: [-4, 4], y: [-4, 4] },
    elements: [{ kind: "turn", r: 2, to: 90, step: 1, ...turn }, ...more],
  });
  const arm = (out: string) => out.match(/<g class="fig-turn" style="([^"]*)">\s*<line[^>]*x2="([\d.-]+)" y2="([\d.-]+)"/);
  const trace = (out: string) => [...out.matchAll(/<path class="fig-draw" style="([^"]*)"[^>]*d="M ([\d.-]+) ([\d.-]+)[^"]*?([\d.-]+) ([\d.-]+)"/g)];
  const seconds = (style: string, prop: string) => Number(style.match(new RegExp(`${prop}:([\\d.]+)s`))?.[1] ?? 0);

  it("without motion, shows the arm still at its terminal position", () => {
    const out = html({ figure: turnFig({ to: 90 }) });
    expect(out).not.toContain("fig-turn");
    expect(out).toMatch(/<line[^>]*x1="200" y1="200" x2="200" y2="100"/);
  });

  it("rotates the arm from the initial arm to the terminal arm at 90° a second", () => {
    const anti = arm(html({ figure: turnFig({ to: 90 }), stagger: 1 }));
    expect(anti).not.toBeNull();
    // Drawn at its end (90°) and rotated back to its start: +90° on screen is clockwise.
    expect([anti![2], anti![3]]).toEqual(["200", "100"]);
    expect(anti![1]).toContain("--turn-from:90deg");
    expect(seconds(anti![1], "animation-duration")).toBe(1);

    const clockwise = arm(html({ figure: turnFig({ to: -820 }), upTo: 1 }));
    expect(clockwise![1]).toContain("--turn-from:-820deg");
    expect(seconds(clockwise![1], "animation-duration")).toBeCloseTo(9.11, 2);
  });

  it("pivots the arm about the turn's centre", () => {
    const out = arm(html({ figure: turnFig({ centre: [1, 0], to: 45 }), stagger: 1 }));
    expect(out![1]).toContain("transform-origin:250px 200px");
  });

  // view 8 units wide: 50px per unit; [0, 0] is at (150, 250).
  const bare = (elements: Figure["elements"], view = fig.view): Figure => ({ ...fig, axes: "none", view, elements });

  it("marks a right angle with a small square of fixed size, whatever the zoom", () => {
    expect(html({ figure: bare([{ kind: "rightAngle", at: [0, 0], from: 0 }]) })).toContain('d="M 162 250 L 162 238 L 150 238"');
    // 16 units wide: 25px per unit, so [0, 0] is at (75, 125); the square is still 12px.
    const zoomedOut = bare([{ kind: "rightAngle", at: [0, 0], from: 90 }], { x: [-3, 13], y: [-7, 5] });
    expect(html({ figure: zoomedOut })).toContain('d="M 75 113 L 63 113 L 63 125"');
  });

  it("marks equal sides with ticks across the segment's middle", () => {
    const out = html({ figure: bare([{ kind: "segment", from: [0, 0], to: [4, 0], ticks: 2 }]) });
    const lines = [...out.matchAll(/<line[^>]*x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"/g)].map((m) => m.slice(1).map(Number));
    expect(lines).toEqual([
      [150, 250, 350, 250],
      [247, 244, 247, 256],
      [253, 244, 253, 256],
    ]);
  });

  describe("a data chart (histograms, frequency polygons)", () => {
    // 400 px wide for 0 to 100 (4 px per unit); 240 px tall for 0 to 40 (6 px per unit).
    const chart = (elements: Figure["elements"], view: Figure["view"] = { x: [0, 100], y: [0, 40] }): Figure => ({
      alt: "A chart",
      axes: "xy",
      chart: { x: 10, y: 10, xTitle: "Marks", yTitle: "Students" },
      view,
      elements,
    });
    const nums = (out: string) => [...out.matchAll(/<text[^>]*>([^<]+)<\/text>/g)].map((m) => m[1]);

    it("scales x and y separately, so small frequencies are not squashed flat", () => {
      expect(html({ figure: chart([{ kind: "point", at: [50, 20] }]) })).toMatch(/<circle[^>]*cx="200" cy="120"/);
    });

    it("draws both axes along the bottom and left edges, numbered every step, with titles", () => {
      const out = html({ figure: chart([]) });
      expect(nums(out)).toEqual(expect.arrayContaining(["0", "10", "50", "100", "20", "40", "Marks", "Students"]));
      expect(out).toMatch(/viewBox="-\d+ -\d+ /); // room outside the plot for the numbers
    });

    it("numbers a chart that starts away from 0 from its first class", () => {
      const out = nums(html({ figure: chart([], { x: [30, 100], y: [0, 10] }) }));
      expect(out).toEqual(expect.arrayContaining(["30", "40", "100", "0", "10"]));
      expect(out).not.toContain("20");
    });
  });

  it("traces the angle swept in pieces that keep pace with the arm", () => {
    const pieces = trace(html({ figure: turnFig({ to: 90 }), stagger: 1 }));
    expect(pieces.length).toBeGreaterThan(2);
    const starts = pieces.map(([, style]) => seconds(style, "animation-delay"));
    const ends = pieces.map(([, style]) => seconds(style, "animation-delay") + seconds(style, "animation-duration"));
    expect(starts[0]).toBe(0);
    for (let i = 1; i < pieces.length; i++) expect(starts[i]).toBeCloseTo(ends[i - 1], 2);
    expect(ends.at(-1)).toBeCloseTo(1, 2);
    for (const [, style] of pieces) expect(style).toContain("animation-timing-function:linear");
  });

  it("winds the trace outward past a full turn, so the turns don't overlap", () => {
    const radius = (x: string, y: string) => Math.hypot(+x - 200, +y - 200);
    const one = trace(html({ figure: turnFig({ to: 270 }), stagger: 1 }));
    const two = trace(html({ figure: turnFig({ to: 720 }), stagger: 1 }));
    expect(radius(one[0][2], one[0][3])).toBeCloseTo(radius(one.at(-1)![4], one.at(-1)![5]), 0);
    expect(radius(two.at(-1)![4], two.at(-1)![5]) - radius(two[0][2], two[0][3])).toBeGreaterThan(20);
  });

  it("starts the next step only when the arm has stopped", () => {
    const out = html({ figure: turnFig({ to: 360 }, [{ kind: "label", at: [1, 1], label: "next", step: 2 }]), stagger: 1 });
    const next = out.match(/<text[^>]*style="animation-delay:([\d.]+)s"[^>]*>next</);
    expect(Number(next![1])).toBe(4);
  });

  it("keeps a later step's arm hidden until it starts to turn", () => {
    const out = html({ figure: turnFig({ to: 90 }, [{ kind: "turn", r: 1, to: 45, step: 2 }]), stagger: 1 });
    const later = out.match(/<g class="fig-in" style="animation-delay:([\d.]+)s"><g class="fig-turn" style="[^"]*--turn-from:45deg/);
    expect(Number(later![1])).toBe(1);
  });

  it("shows the arm's label when the arm arrives, not before", () => {
    const out = html({ figure: turnFig({ to: 180, label: "terminal arm" }), upTo: 1 });
    const label = out.match(/<text[^>]*style="animation-delay:([\d.]+)s"[^>]*>terminal arm</);
    expect(Number(label![1])).toBe(2);
  });
});
