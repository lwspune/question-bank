import { describe, expect, it } from "vitest";
import { retieVisual } from "@/lib/visuals/retie";
import { solutionFingerprint, stepTexts } from "@/lib/visuals/visual";
import type { SolutionVisual } from "@/lib/visuals/types";

// An animated solution carries a fingerprint of the solution text and ties each
// step to a sentence of it. Editing the text (the 2026-11-23 HSC clean-up took
// out dashes and method notes from 307 + 296 answers) left 425 animations with
// their step text cut off. retieVisual moves each step to its sentence in the
// edited text, or refuses, so an edit tool can re-tie in the same write.

function visual(text: string, steps: Array<{ from: number; beats: string[] }>): SolutionVisual {
  return {
    v: 1,
    scene: "algebraSteps",
    params: { lines: [] },
    steps,
    fingerprint: solutionFingerprint(text),
    answer: { value: 1, label: "1" },
  } as unknown as SolutionVisual;
}

const OLD = [
  "Step 1 — critical points: \\(f'(x) = 0\\).",
  "So \\(x = 1\\) or \\(x = 6\\).",
  "Check: the values agree with the graph.",
  "Step 2 — the second derivative test.",
  "Hence the minimum is \\(-128\\).",
].join("\n");

describe("retieVisual", () => {
  it("moves each step to its reworded sentence and re-fingerprints", () => {
    const NEW = OLD.replace("Step 1 — critical", "Step 1: critical").replace("Step 2 — the", "Step 2: the");
    const r = retieVisual(visual(OLD, [{ from: 0, beats: ["s1"] }, { from: 3, beats: ["s2"] }, { from: 4, beats: ["s3"] }]), OLD, NEW);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.visual.fingerprint).toBe(solutionFingerprint(NEW));
    expect(r.visual.steps.map((s) => s.from)).toEqual([0, 3, 4]);
    expect(stepTexts(r.visual, NEW)?.[1]).toBe("Step 2: the second derivative test.");
  });

  it("shifts later steps when an earlier sentence is deleted", () => {
    const NEW = OLD.replace("Check: the values agree with the graph.\n", "");
    const r = retieVisual(visual(OLD, [{ from: 0, beats: ["s1"] }, { from: 3, beats: ["s2"] }, { from: 4, beats: ["s3"] }]), OLD, NEW);
    expect(r.ok && r.visual.steps.map((s) => s.from)).toEqual([0, 2, 3]);
  });

  it("folds a step whose sentences were all deleted into the step before", () => {
    const NEW = OLD.replace("Check: the values agree with the graph.\n", "");
    const r = retieVisual(
      visual(OLD, [{ from: 0, beats: ["s1"] }, { from: 2, beats: ["s2"] }, { from: 3, beats: ["s3"] }]),
      OLD,
      NEW,
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.visual.steps).toEqual([{ from: 0, beats: ["s1", "s2"] }, { from: 2, beats: ["s3"] }]);
    expect(r.folded).toBe(1);
  });

  it("starts a step at its next surviving sentence when its first one was deleted", () => {
    const NEW = OLD.replace("So \\(x = 1\\) or \\(x = 6\\).\n", "");
    const r = retieVisual(visual(OLD, [{ from: 0, beats: ["s1"] }, { from: 1, beats: ["s2"] }, { from: 4, beats: ["s3"] }]), OLD, NEW);
    expect(r.ok && r.visual.steps.map((s) => s.from)).toEqual([0, 1, 3]);
  });

  it("refuses when the visual was not drawn against the old text", () => {
    const r = retieVisual(visual("something else", [{ from: 0, beats: ["s1"] }]), OLD, OLD.replace("—", ":"));
    expect(r.ok).toBe(false);
  });

  it("keeps the steps when the text did not move", () => {
    const v = visual(OLD, [{ from: 0, beats: ["s1"] }, { from: 4, beats: ["s2"] }]);
    const r = retieVisual(v, OLD, OLD);
    expect(r.ok && r.visual.steps).toEqual(v.steps);
  });
});
