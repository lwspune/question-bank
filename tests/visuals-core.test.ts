import { describe, expect, it } from "vitest";
import {
  checkVisual,
  parseSolutionVisual,
  sentenceStarts,
  solutionFingerprint,
  stepTexts,
} from "@/lib/visuals/visual";
import { ARC_SOLUTION, ARC_VISUAL, FIXTURES, QUAD_SOLUTION, QUAD_VISUAL, SLAB_SOLUTION, SLAB_VISUAL } from "./fixtures/visuals";

const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

describe("solutionFingerprint", () => {
  it("is FNV-1a 32-bit, as 8 hex digits", () => {
    expect(solutionFingerprint("a")).toBe("e40c292c");
    expect(solutionFingerprint("")).toBe("811c9dc5");
  });
  it("changes when the solution changes by one character", () => {
    expect(solutionFingerprint(ARC_SOLUTION)).not.toBe(solutionFingerprint(ARC_SOLUTION + " "));
  });
});

describe("sentenceStarts", () => {
  it("splits at a full stop followed by a capital, keeping math whole", () => {
    expect(sentenceStarts("First \\(x = 1.5\\). Then y.")).toEqual([0, 19]);
  });
  it("does not split an abbreviation followed by lower case", () => {
    expect(sentenceStarts("Differentiate w. r. t. x and stop.")).toEqual([0]);
  });
  it("treats a line break as a boundary", () => {
    expect(sentenceStarts("One.\nTwo")).toEqual([0, 5]);
  });
  it("finds the sentences of a real solution", () => {
    expect(sentenceStarts(ARC_SOLUTION)).toHaveLength(2);
    expect(sentenceStarts(SLAB_SOLUTION)).toHaveLength(3);
  });
  it("keeps a table whole: one sentence from its header row to its last row", () => {
    const sol = "Build the table.\n\n| p | q |\n|---|---|\n| T | F |\n\nSo it is false.";
    const starts = sentenceStarts(sol);
    expect(starts.map((s) => sol.slice(s, s + 5))).toEqual(["Build", "| p |", "So it"]);
  });
  it("leaves lines with pipes that are not a table (no separator row) as before", () => {
    expect(sentenceStarts("One |x| here.\n| y | is two.")).toEqual([0, 14]);
  });
});

describe("parseSolutionVisual", () => {
  it("accepts every fixture", () => {
    for (const f of FIXTURES) expect(parseSolutionVisual(f.visual), f.name).toMatchObject({ ok: true });
  });
  it("rejects a non-object, an unknown version and an unknown scene", () => {
    expect(parseSolutionVisual(null)).toMatchObject({ ok: false });
    expect(parseSolutionVisual({ ...clone(ARC_VISUAL), v: 2 })).toMatchObject({ ok: false });
    expect(parseSolutionVisual({ ...clone(ARC_VISUAL), scene: "nope" })).toMatchObject({ ok: false });
  });
  it("rejects steps that do not start at sentence 0 or do not move forward", () => {
    const a = clone(ARC_VISUAL);
    a.steps[0].from = 1;
    expect(parseSolutionVisual(a)).toMatchObject({ ok: false });
    const b = clone(ARC_VISUAL);
    b.steps[1].from = 0;
    expect(parseSolutionVisual(b)).toMatchObject({ ok: false });
  });
  it("rejects an unknown beat, an empty beat list and a beat used twice", () => {
    const a = clone(ARC_VISUAL);
    a.steps[0].beats = ["fly"];
    expect(parseSolutionVisual(a)).toMatchObject({ ok: false });
    const b = clone(ARC_VISUAL);
    b.steps[0].beats = [];
    expect(parseSolutionVisual(b)).toMatchObject({ ok: false });
    const c = clone(ARC_VISUAL);
    c.steps[1].beats = ["oneRadian", "angle"];
    expect(parseSolutionVisual(c)).toMatchObject({ ok: false });
  });
  it("rejects params the scene refuses", () => {
    const a = clone(ARC_VISUAL);
    (a.params as { radius: number }).radius = -4;
    expect(parseSolutionVisual(a)).toMatchObject({ ok: false });
  });
  it("rejects a label carrying LaTeX or markup, since labels are drawn as plain text", () => {
    const a = clone(ARC_VISUAL);
    (a.params as { arcLabel: string }).arcLabel = "\\pi";
    expect(parseSolutionVisual(a)).toMatchObject({ ok: false });
    const b = clone(ARC_VISUAL);
    b.answer.label = "<b>π/4</b>";
    expect(parseSolutionVisual(b)).toMatchObject({ ok: false });
  });
  it("rejects a bad fingerprint and a tolerance above 5% of the answer", () => {
    expect(parseSolutionVisual({ ...clone(ARC_VISUAL), fingerprint: "xyz" })).toMatchObject({ ok: false });
    const a = clone(SLAB_VISUAL);
    a.answer.tolerance = 0.2;
    expect(parseSolutionVisual(a)).toMatchObject({ ok: false });
  });
});

describe("stepTexts", () => {
  const parsed = (raw: unknown) => {
    const r = parseSolutionVisual(raw);
    if (!r.ok) throw new Error(r.error);
    return r.visual;
  };
  it("cuts the solution into the steps' sentence groups, text unchanged", () => {
    const parts = stepTexts(parsed(QUAD_VISUAL), QUAD_SOLUTION);
    expect(parts).toHaveLength(3);
    expect(parts![0]).toMatch(/^Discriminant/);
    expect(parts![2]).toMatch(/^Intersection/);
    expect(parts![2]).toMatch(/Answer: \(B\)\.$/);
    expect(parts!.join(" ")).toBe(QUAD_SOLUTION);
  });
  it("returns null when the solution has changed since the steps were mapped", () => {
    expect(stepTexts(parsed(ARC_VISUAL), ARC_SOLUTION + " Extra.")).toBeNull();
  });
  it("returns null when a step points past the last sentence", () => {
    const a = clone(ARC_VISUAL);
    a.steps[1].from = 5;
    expect(stepTexts(parsed(a), ARC_SOLUTION)).toBeNull();
  });
  it("cuts a solution holding a table only around the table, never through it", () => {
    const sol = "Build the table.\n\n| p | q |\n|---|---|\n| T | F |\n\nSo it is false.";
    const v = { ...clone(ARC_VISUAL), fingerprint: solutionFingerprint(sol), steps: [{ from: 0, beats: ARC_VISUAL.steps[0].beats }, { from: 2, beats: ARC_VISUAL.steps[1].beats }] };
    const parts = stepTexts(parsed(v), sol);
    expect(parts).toHaveLength(2);
    expect(parts![0]).toBe("Build the table.\n\n| p | q |\n|---|---|\n| T | F |");
    expect(parts![1]).toBe("So it is false.");
  });
  it("still returns null when it cannot tell where a table runs (display math across lines)", () => {
    const sol = "Build \\[x\n= 1\\] the table.\n\n| p | q |\n|---|---|\n| T | F |\n\nSo it is false.";
    const v = { ...clone(ARC_VISUAL), fingerprint: solutionFingerprint(sol) };
    expect(stepTexts(parsed(v), sol)).toBeNull();
  });
  it("returns null with no solution", () => {
    expect(stepTexts(parsed(ARC_VISUAL), null)).toBeNull();
  });
});

describe("checkVisual", () => {
  it("passes every fixture: the scene's own answer matches the stored key", () => {
    for (const f of FIXTURES) {
      const r = parseSolutionVisual(f.visual);
      if (!r.ok) throw new Error(r.error);
      expect(checkVisual(r.visual).ok, f.name).toBe(true);
    }
  });
  it("fails when the stored answer disagrees with the scene", () => {
    const r = parseSolutionVisual({ ...clone(ARC_VISUAL), answer: { value: Math.PI / 3, label: "π/3" } });
    if (!r.ok) throw new Error(r.error);
    expect(checkVisual(r.visual).ok).toBe(false);
  });
  it("honours an explicit tolerance and nothing wider", () => {
    const ok = parseSolutionVisual(SLAB_VISUAL);
    if (!ok.ok) throw new Error(ok.error);
    expect(checkVisual(ok.visual)).toMatchObject({ ok: true });
    const tight = parseSolutionVisual({ ...clone(SLAB_VISUAL), answer: { value: 2, label: "2 cm" } });
    if (!tight.ok) throw new Error(tight.error);
    expect(checkVisual(tight.visual).ok).toBe(false);
  });
});

describe("plain labels", () => {
  it("accept inequalities written without spaces, and still refuse a real tag", async () => {
    const { plainLabel } = await import("@/lib/visuals/params");
    expect(plainLabel("1<x<8", "l")).toBe("1<x<8");
    expect(plainLabel("x>2 or x<-1", "l")).toBe("x>2 or x<-1");
    expect(() => plainLabel("<b>π/4</b>", "l")).toThrow();
    expect(() => plainLabel("<img src=x>", "l")).toThrow();
    expect(() => plainLabel("\\frac{1}{2}", "l")).toThrow();
  });
});
