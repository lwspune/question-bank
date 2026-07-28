import { describe, it, expect } from "vitest";
import {
  bboxHeight,
  isMalformedBbox,
  figureFlags,
  validateAnchors,
  blockedFigureQuestions,
  mergeVerify,
  extractStemLabels,
  type FigureEntry,
  type VerifyRecord,
  type Bbox,
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
    "3": { bboxHeight: 0.16, flags: [], bbox: [0.1, 0.2, 0.5, 0.36] as Bbox },
    "39": { bboxHeight: 0.5, flags: ["tall bbox (0.5)"], bbox: [0.1, 0.2, 0.5, 0.7] as Bbox },
  };
  it("preserves a prior human ok/blocked decision, refreshing flags", () => {
    const prior: Record<string, VerifyRecord> = {
      "3": { status: "ok", bboxHeight: 0.16, flags: ["stale"], bbox: [0.1, 0.2, 0.5, 0.36] },
    };
    const merged = mergeVerify(computed, prior);
    expect(merged["3"].status).toBe("ok");
    expect(merged["3"].flags).toEqual([]);
  });
  it("defaults a new/unseen figure to needs-review (can't ride the gate silently)", () => {
    expect(mergeVerify(computed)["39"].status).toBe("needs-review");
  });

  // A re-crop must NOT inherit the old verdict. This is how a leaking crop stayed
  // published: Re-NEET 2026 Q36 was re-cropped and kept its stale "ok".
  it("invalidates a prior ok when the bbox changed", () => {
    const prior: Record<string, VerifyRecord> = {
      "3": { status: "ok", bboxHeight: 0.9, flags: [], bbox: [0.1, 0.2, 0.5, 1.1] },
    };
    expect(mergeVerify(computed, prior)["3"].status).toBe("needs-review");
  });
  it("invalidates a prior blocked when the bbox changed (a re-crop deserves a fresh look)", () => {
    const prior: Record<string, VerifyRecord> = {
      "3": { status: "blocked", bboxHeight: 0.9, flags: [], bbox: [0.1, 0.2, 0.5, 1.1] },
    };
    expect(mergeVerify(computed, prior)["3"].status).toBe("needs-review");
  });
  it("preserves a prior verdict recorded before bboxes were tracked (back-compat)", () => {
    const prior: Record<string, VerifyRecord> = { "3": { status: "ok", bboxHeight: 0.9, flags: [] } };
    expect(mergeVerify(computed, prior)["3"].status).toBe("ok");
  });
  it("records the bbox so the next run can detect a change", () => {
    expect(mergeVerify(computed)["3"].bbox).toEqual([0.1, 0.2, 0.5, 0.36]);
  });
});

describe("extractStemLabels (stem-vs-image checklist)", () => {
  it("catches a prose point label", () => {
    expect(extractStemLabels("The potential at point P is zero.")).toContain("P");
  });
  it("splits a geometry letter-run into its vertices", () => {
    const l = extractStemLabels("A square loop ABCD carries a current.");
    expect(l).toEqual(expect.arrayContaining(["A", "B", "C", "D"]));
  });
  it("catches subscripted component labels (require the underscore)", () => {
    const l = extractStemLabels("Two diodes \\(D_1\\) and \\(D_2\\) with input \\(V_{in}\\).");
    expect(l).toEqual(expect.arrayContaining(["D1", "D2"]));
  });
  it("catches labels from a comma-list in a 'labels:' context", () => {
    const l = extractStemLabels("The figure labels: B, C, A pointing to the top and D at the bottom.");
    expect(l).toEqual(expect.arrayContaining(["A", "B", "C", "D"]));
  });
  it("catches Match-List column names", () => {
    const l = extractStemLabels("Match List I with List II and select the correct option.");
    expect(l).toEqual(expect.arrayContaining(["List I", "List II"]));
  });
  it("flags a 4-option-graph reminder", () => {
    expect(extractStemLabels("Which of the four graphs best represents the motion?")).toContain("four graphs");
  });
  it("does not treat common words / abbreviations as labels", () => {
    const l = extractStemLabels("The DNA molecule and the AC source.");
    expect(l).not.toContain("DNA");
    expect(l).not.toContain("THE");
  });
  it("does not crash and stays quiet on a label-free chemistry stem", () => {
    expect(extractStemLabels("Identify the product of the reaction of ethanol with acetic acid.")).toEqual([]);
  });
});
