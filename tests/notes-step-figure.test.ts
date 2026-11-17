import { describe, expect, it } from "vitest";
import { initialStepState, stepReducer, type StepState } from "@/lib/notes/stepFigure";

// The notes stepper (an animated figure that walks a process one step at a
// time). Its whole behaviour is this reducer, so the edges are pinned here:
// the figure starts on its OVERVIEW (the last step, the complete picture),
// Play from there replays from the start, and nothing ever steps past either end.

const N = 4;
const at = (step: number, playing = false): StepState => ({ step, playing });

describe("notes stepper", () => {
  it("starts on the overview: the last step, not playing", () => {
    expect(initialStepState(N)).toEqual(at(3));
  });

  it("an empty or one-step figure still has a valid state", () => {
    expect(initialStepState(1)).toEqual(at(0));
    expect(initialStepState(0)).toEqual(at(0));
  });

  it("Play from the overview replays from the first step", () => {
    expect(stepReducer(at(3), { type: "play" }, N)).toEqual(at(0, true));
  });

  it("Play part way through carries on from there", () => {
    expect(stepReducer(at(1), { type: "play" }, N)).toEqual(at(1, true));
  });

  it("a tick moves one step on, and stops on the last step", () => {
    expect(stepReducer(at(0, true), { type: "tick" }, N)).toEqual(at(1, true));
    expect(stepReducer(at(2, true), { type: "tick" }, N)).toEqual(at(3, false));
    expect(stepReducer(at(3, true), { type: "tick" }, N)).toEqual(at(3, false));
  });

  it("a tick while paused does nothing (a late timer cannot move a paused figure)", () => {
    expect(stepReducer(at(1), { type: "tick" }, N)).toEqual(at(1));
  });

  it("Next and Back pause playback and never pass the ends", () => {
    expect(stepReducer(at(1, true), { type: "next" }, N)).toEqual(at(2));
    expect(stepReducer(at(3), { type: "next" }, N)).toEqual(at(3));
    expect(stepReducer(at(1, true), { type: "prev" }, N)).toEqual(at(0));
    expect(stepReducer(at(0), { type: "prev" }, N)).toEqual(at(0));
  });

  it("Pause keeps the step", () => {
    expect(stepReducer(at(2, true), { type: "pause" }, N)).toEqual(at(2));
  });

  it("goto clamps into range and pauses", () => {
    expect(stepReducer(at(0, true), { type: "goto", step: 2 }, N)).toEqual(at(2));
    expect(stepReducer(at(0), { type: "goto", step: 9 }, N)).toEqual(at(3));
    expect(stepReducer(at(2), { type: "goto", step: -1 }, N)).toEqual(at(0));
  });
});
