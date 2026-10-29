import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import type { Shape } from "@/lib/visuals/types";

// Algebra steps: the written working animates line by line, a changed term
// coloured in its old and new line (owner, 2026-10-29).
const scene = getScene("algebraSteps")!;
const parse = (raw: unknown) => scene.parse(raw) as { error?: string };
const ok = (raw: unknown) => {
  const p = scene.parse(raw);
  if ("error" in (p as object)) throw new Error((p as { error: string }).error);
  return p;
};
const maths = (shapes: Shape[]) => shapes.filter((s) => s.kind === "math") as Extract<Shape, { kind: "math" }>[];

// x^2 - 5x + 6 = 0, by splitting the middle term.
const quad = {
  roots: ["2", "3"],
  lines: [
    { step: "s1", kind: "eq", tex: "x^2 {{1:-5x}} + 6 = 0", lhs: "x^2-5*x+6", rhs: "0" },
    { step: "s2", kind: "eq", tex: "x^2 {{1:-2x-3x}} + 6 = 0", lhs: "x^2-2*x-3*x+6", rhs: "0", note: "split −5x" },
    { step: "s3", kind: "eq", tex: "(x-2)(x-3) = 0", lhs: "(x-2)*(x-3)", rhs: "0" },
    { step: "s4", kind: "note", tex: "x = 2 \\text{ or } x = 3" },
  ],
  answer: "2",
};

describe("algebraSteps scene", () => {
  it("checks every equation line against the roots, and works out the answer", () => {
    expect(scene.check(ok(quad))).toBe(2);
    expect(scene.checkText(ok(quad), 2)).toMatch(/All 3 checked lines hold/);
  });

  it("refuses an equation line the roots do not satisfy (a dropped sign)", () => {
    const bad = { ...quad, lines: [...quad.lines.slice(0, 2), { step: "s3", kind: "eq", tex: "(x+2)(x-3) = 0", lhs: "(x+2)*(x-3)", rhs: "0" }] };
    expect(parse(bad).error).toMatch(/line 3/);
  });

  it("reads a mark inside a fraction's own braces, and leaves ordinary double braces alone", () => {
    const frac = {
      lines: [
        { step: "s1", kind: "calc", tex: "\\dfrac{{{1:2x}}}{2} = {{x}}", f: "2/2", value: "1" },
        { step: "s2", kind: "note", tex: "x = 1" },
      ],
      answer: "1",
    };
    const p = ok(frac) as { lines: { tex: string }[] };
    expect(p.lines[0].tex).toBe("\\dfrac{\\htmlClass{viz-mark-1}{2x}}{2} = {{x}}");
    // A mark with a colour that does not exist is still refused.
    expect(parse({ ...frac, lines: [{ ...frac.lines[0], tex: "{{4:x}}" }] })).toHaveProperty("error");
  });

  it("refuses a line that lost a backslash: a control character, or a bare TeX command word (review 2026-10-29)", () => {
    const base = { lines: [{ step: "s1", kind: "calc", tex: "h = \\frac52", f: "5/2", value: "2.5" }, { step: "s2", kind: "note", tex: "x" }], answer: "2.5" };
    expect(parse(base)).not.toHaveProperty("error");
    // "\t" in "\text" read as an escape became a TAB, and "\f" a form feed.
    expect(parse({ ...base, lines: [{ ...base.lines[0], tex: "h ≥ 0 ⇒ \text{pair}" }, base.lines[1]] }).error).toMatch(/line 1/);
    expect(parse({ ...base, lines: [{ ...base.lines[0], tex: "h = frac52" }, base.lines[1]] }).error).toMatch(/line 1/);
    expect(parse({ ...base, lines: [base.lines[0], { ...base.lines[1], tex: "x = sqrt{2}" }] }).error).toMatch(/line 2/);
  });

  it("lets an equation line carry its own roots, for working where each line solves for something else", () => {
    // Rolle's theorem for f(x) = x^3 + px^2 + qx: p from one equation, then c from another.
    const own = {
      lines: [
        { step: "s1", kind: "eq", tex: "2p = -12", lhs: "2*x", rhs: "-12", roots: ["-6"] },
        { step: "s2", kind: "eq", tex: "4 + c = \\dfrac{25}{4}", lhs: "4+x", rhs: "25/4", roots: ["9/4"] },
      ],
      answer: "9/4",
    };
    expect(scene.check(ok(own))).toBe(2.25);
    expect(parse({ ...own, lines: [own.lines[0], { ...own.lines[1], roots: ["2"] }] }).error).toMatch(/line 2/);
    // A line's own roots replace the shared ones for that line only.
    expect(parse({ ...quad, lines: [...quad.lines, { step: "s5", kind: "eq", tex: "2p = -12", lhs: "2*x", rhs: "-12", roots: ["-6"] }] })).not.toHaveProperty("error");
  });

  it("checks a rewrite chain: each expression line must equal the one before it", () => {
    const chain = {
      vars: { a: "3", b: "2" },
      lines: [
        { step: "s1", kind: "expr", tex: "\\alpha^2 + \\beta^2", f: "13" },
        { step: "s2", kind: "expr", tex: "(\\alpha+\\beta)^2 - 2\\alpha\\beta", f: "(a+b)^2-2*a*b" },
        { step: "s3", kind: "expr", tex: "13", f: "13" },
      ],
      answer: "13",
    };
    expect(scene.check(ok(chain))).toBe(13);
    const wrong = { ...chain, lines: [chain.lines[0], { ...chain.lines[1], f: "(a+b)^2-a*b" }] };
    expect(parse(wrong).error).toMatch(/line 2/);
    // Expressions in x are compared at several points, so an identity is really checked.
    const id = { lines: [{ step: "s1", kind: "expr", tex: "(x+1)^2", f: "(x+1)^2" }, { step: "s2", kind: "expr", tex: "x^2+2x+1", f: "x^2+2*x+1" }], answer: "1" };
    expect(parse(id)).not.toHaveProperty("error");
    expect(parse({ ...id, lines: [id.lines[0], { ...id.lines[1], f: "x^2+x+1" }] })).toHaveProperty("error");
  });

  it("checks a calc line on its own: the formula must equal the value it states, to the shown decimals", () => {
    const calc = {
      lines: [
        { step: "s1", kind: "calc", tex: "f'(a) = \\dfrac{1}{0.27}", f: "1/(3*0.027^(2/3))", value: "1/0.27" },
        { step: "s2", kind: "calc", tex: "0.3 - \\dfrac{0.001}{0.27} \\approx 0.2963", f: "0.3-0.001/0.27", value: "0.2963", dp: 4 },
      ],
      answer: "0.2963",
    };
    expect(parse(calc)).not.toHaveProperty("error");
    expect(parse({ ...calc, lines: [calc.lines[0], { ...calc.lines[1], value: "0.2964" }] }).error).toMatch(/line 2/);
    expect(parse({ ...calc, lines: [calc.lines[0], { ...calc.lines[1], dp: undefined }] }).error).toMatch(/line 2/);
    expect(parse({ ...calc, lines: [calc.lines[0], { ...calc.lines[1], dp: 9 }] })).toHaveProperty("error");
  });

  it("refuses what it cannot check: an equation with no roots, a bad mark, a bad step, too many lines", () => {
    expect(parse({ ...quad, roots: undefined })).toHaveProperty("error");
    expect(parse({ ...quad, lines: [{ ...quad.lines[0], tex: "x {{4:y}}" }] })).toHaveProperty("error");
    expect(parse({ ...quad, lines: [{ ...quad.lines[0], step: "s9" }] })).toHaveProperty("error");
    expect(parse({ ...quad, lines: Array.from({ length: 11 }, () => quad.lines[0]) })).toHaveProperty("error");
    expect(parse({ ...quad, lines: [{ ...quad.lines[0], tex: "\htmlClass{x}{y}" }] })).toHaveProperty("error");
  });

  it("shows each line once its step has started, its marks as theme classes, and grows the box with the lines", () => {
    const p = ok(quad);
    const one = maths(scene.frame(p, { played: ["s1"], t: 1, slider: undefined }));
    expect(one).toHaveLength(1);
    expect(one[0].tex).toContain("\htmlClass{viz-mark-1}{-5x}");
    const all = maths(scene.frame(p, { played: ["s1", "s2", "s3", "s4"], t: 1, slider: undefined }));
    expect(all.length).toBe(4);
    expect(all[1].y).toBeGreaterThan(all[0].y);
    expect(scene.viewBox(p).h).toBeGreaterThan(4 * 30);
    const notes = scene.frame(p, { played: ["s1", "s2"], t: 1, slider: undefined }).filter((s) => s.kind === "text").map((s) => (s as { text: string }).text);
    expect(notes).toContain("split −5x");
  });
});
