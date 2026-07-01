import { describe, it, expect } from "vitest";
import {
  bboxHeight,
  isMalformedBbox,
  figureFlags,
  validateAnchors,
  blockedFigureQuestions,
  mergeVerify,
  type FigureEntry,
  type VerifyRecord,
} from "../scripts/lib/figures/verify";

describe("bboxHeight", () => {
  it("returns the vertical span in page fractions", () => {
    expect(bboxHeight([0.1, 0.2, 0.5, 0.6])).toBe(0.4);
  });
});

describe("isMalformedBbox", () => {
  it("accepts a well-formed in-range bbox", () => {
    expect(isMalformedBbox([0.1, 0.2, 0.5, 0.6])).toBe(false);
  });
  it("rejects out-of-range or inverted coordinates", () => {
    expect(isMalformedBbox([0.5, 0.2, 0.1, 0.6])).toBe(true); // x0 >= x1
    expect(isMalformedBbox([0.1, 0.6, 0.5, 0.2])).toBe(true); // y0 >= y1
    expect(isMalformedBbox([-0.1, 0.2, 0.5, 0.6])).toBe(true); // < 0
    expect(isMalformedBbox([0.1, 0.2, 1.5, 0.6])).toBe(true); // > 1
  });
});

describe("figureFlags", () => {
  it("flags a tall bbox as a leak suspect (soft, tunable threshold)", () => {
    const tall: FigureEntry = { page: 19, bbox: [0.12, 0.21, 0.62, 0.86] }; // the old Q39 leak
    expect(figureFlags(tall).some((f) => f.includes("tall bbox"))).toBe(true);
  });
  it("does not flag a normal-height figure", () => {
    const ok: FigureEntry = { page: 3, bbox: [0.49, 0.155, 0.7, 0.315] };
    expect(figureFlags(ok)).toEqual([]);
  });
  it("flags a malformed bbox", () => {
    const bad: FigureEntry = { page: 1, bbox: [0.5, 0.2, 0.1, 0.6] };
    expect(figureFlags(bad)).toContain("malformed bbox");
  });
});

describe("validateAnchors", () => {
  it("accepts anchors with bottom <= answerY and ordered col/top", () => {
    expect(validateAnchors({ col: [0.14, 0.44], top: 0.69, bottom: 0.816, answerY: 0.822 })).toEqual([]);
  });
  it("rejects bottom below the answer ceiling", () => {
    expect(validateAnchors({ col: [0.14, 0.44], top: 0.69, bottom: 0.86, answerY: 0.82 }))
      .toContain("bottom must be <= answerY (the answer ceiling)");
  });
  it("rejects an inverted column band", () => {
    expect(validateAnchors({ col: [0.44, 0.14], top: 0.69, bottom: 0.8, answerY: 0.82 }))
      .toContain("col must be [x0 < x1] within [0,1]");
  });
});

describe("blockedFigureQuestions (the flip-public gate)", () => {
  const v: Record<string, VerifyRecord> = {
    "3": { status: "ok", bboxHeight: 0.16, flags: [] },
    "39": { status: "needs-review", bboxHeight: 0.65, flags: ["tall bbox (0.65)"] },
    "27": { status: "blocked", bboxHeight: 0.19, flags: [] },
    "5": { status: "ok", bboxHeight: 0.35, flags: [] },
  };
  it("returns every non-ok figure, numerically sorted", () => {
    expect(blockedFigureQuestions(v)).toEqual(["27", "39"]);
  });
  it("returns [] when all figures are ok (gate passes)", () => {
    expect(blockedFigureQuestions({ "1": { status: "ok", bboxHeight: 0.2, flags: [] } })).toEqual([]);
  });
});

describe("mergeVerify", () => {
  const computed = {
    "3": { bboxHeight: 0.16, flags: [] },
    "39": { bboxHeight: 0.5, flags: ["tall bbox (0.5)"] },
  };
  it("preserves a prior human ok/blocked decision, refreshing flags", () => {
    const prior: Record<string, VerifyRecord> = { "3": { status: "ok", bboxHeight: 0.9, flags: ["stale"] } };
    const merged = mergeVerify(computed, prior);
    expect(merged["3"].status).toBe("ok");
    expect(merged["3"].bboxHeight).toBe(0.16); // refreshed
    expect(merged["3"].flags).toEqual([]);
  });
  it("defaults a new/unseen figure to needs-review (can't ride the gate silently)", () => {
    expect(mergeVerify(computed)["39"].status).toBe("needs-review");
  });
});
