import { describe, expect, it } from "vitest";
import { assembleDraft } from "@/lib/visuals/assemble";
import { FG_SLOPE_SOLUTION, FG_SLOPE_VISUAL } from "./fixtures/visuals";

const draft = (over: Record<string, unknown> = {}) => ({
  n: 1,
  id: "b03b5c01-9ace-4b59-8a73-d80537a6992d",
  skip: false,
  params: FG_SLOPE_VISUAL.params,
  steps: FG_SLOPE_VISUAL.steps,
  answer: { value: 0.1353, label: "x = e⁻²" },
  ...over,
});

describe("assembleDraft", () => {
  it("adds the scene, version and the stored solution's fingerprint itself", () => {
    const r = assembleDraft(draft(), "functionGraph", FG_SLOPE_SOLUTION);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.visual).toMatchObject({ v: 1, scene: "functionGraph", fingerprint: FG_SLOPE_VISUAL.fingerprint });
  });

  it("takes the scene's exact value when the draft's answer agrees to 3 significant places", () => {
    const r = assembleDraft(draft(), "functionGraph", FG_SLOPE_SOLUTION);
    if (!r.ok) throw new Error(r.reason);
    expect((r.visual as { answer: { value: number } }).answer.value).toBeCloseTo(Math.exp(-2), 9);
  });

  it("refuses a draft whose answer the scene does not reproduce", () => {
    const r = assembleDraft(draft({ answer: { value: 0.5, label: "x = 1/2" } }), "functionGraph", FG_SLOPE_SOLUTION);
    expect(r).toMatchObject({ ok: false });
  });

  it("passes a skip through with its reason, and refuses a draft with no solution to map", () => {
    expect(assembleDraft({ n: 2, id: "x", skip: true, reason: "asks for a maximum" }, "functionGraph", "Some text.")).toMatchObject({ ok: false, skipped: true, reason: "asks for a maximum" });
    expect(assembleDraft(draft(), "functionGraph", null)).toMatchObject({ ok: false });
  });

  it("refuses params the scene rejects, and steps that do not fit the solution", () => {
    expect(assembleDraft(draft({ params: { ...FG_SLOPE_VISUAL.params, f: "2x" } }), "functionGraph", FG_SLOPE_SOLUTION)).toMatchObject({ ok: false });
    expect(assembleDraft(draft({ steps: [{ from: 0, beats: ["curve"] }, { from: 9, beats: ["mark"] }] }), "functionGraph", FG_SLOPE_SOLUTION)).toMatchObject({ ok: false });
  });
});
