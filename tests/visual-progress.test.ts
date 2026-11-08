/**
 * How far a student got through an animated solution (2026-11-08).
 *
 * Before this, "finished" was sent only when the automatic first run reached
 * the end untouched: a student who tapped through to the last step, or whose
 * phone has animations turned off, was never counted. Two students with
 * animations probably off showed 0 finished of 38 between them, and that alone
 * made the 3D and algebra scenes look weak. The player now tells this tracker
 * each time a step finishes drawing, by the automatic run or by a tap, and the
 * tracker says what to record.
 */
import { describe, it, expect } from "vitest";
import { createProgress } from "@/lib/visuals/progress";

describe("createProgress", () => {
  it("records each new step reached and the finish when the automatic run plays through", () => {
    const p = createProgress(3, { reduced: false });
    expect(p.stepDone(0, "auto")).toEqual([]);
    expect(p.stepDone(1, "auto")).toEqual([{ action: "reached", step: 2 }]);
    expect(p.stepDone(2, "auto")).toEqual([
      { action: "reached", step: 3 },
      { action: "finished", how: "auto" },
    ]);
  });

  it("counts a finish reached by tapping, even straight to the last step", () => {
    const p = createProgress(3, { reduced: false });
    expect(p.stepDone(2, "tapped")).toEqual([
      { action: "reached", step: 3 },
      { action: "finished", how: "tapped" },
    ]);
  });

  it("names the route of the step that finished it when the run and taps mix", () => {
    const p = createProgress(3, { reduced: false });
    p.stepDone(0, "auto");
    p.stepDone(1, "auto");
    expect(p.stepDone(2, "tapped")).toEqual([
      { action: "reached", step: 3 },
      { action: "finished", how: "tapped" },
    ]);
  });

  it("reports a step once, and a finish once, however often the student goes back or replays", () => {
    const p = createProgress(3, { reduced: false });
    p.stepDone(0, "auto");
    p.stepDone(1, "auto");
    expect(p.stepDone(0, "tapped")).toEqual([]);
    expect(p.stepDone(1, "tapped")).toEqual([]);
    p.stepDone(2, "tapped");
    for (const k of [0, 1, 2]) expect(p.stepDone(k, "auto")).toEqual([]);
  });

  it("finishes a one-step solution on its only step, with no reached step", () => {
    const p = createProgress(1, { reduced: false });
    expect(p.stepDone(0, "auto")).toEqual([{ action: "finished", how: "auto" }]);
  });

  it("records nothing when animations are off: that student only ever sees the final picture", () => {
    const p = createProgress(3, { reduced: true });
    expect(p.stepDone(0, "auto")).toEqual([]);
    expect(p.stepDone(1, "tapped")).toEqual([]);
    expect(p.stepDone(2, "tapped")).toEqual([]);
  });

  it("ignores a step outside the solution", () => {
    const p = createProgress(3, { reduced: false });
    expect(p.stepDone(-1, "auto")).toEqual([]);
    expect(p.stepDone(3, "auto")).toEqual([]);
    expect(p.stepDone(1.5, "auto")).toEqual([]);
  });
});
