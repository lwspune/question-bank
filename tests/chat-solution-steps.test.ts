/**
 * "Teach me step by step" (V_SPEC.md section 0, step 1): the stored solution
 * cut into the steps V's chat shows one at a time. An animated solution keeps
 * its own steps, so the picture moves with the words; any other solution is
 * cut at its sentences, short ones joined to the next, at most 6 steps, and a
 * table is never cut. Fewer than 2 steps is no step-by-step at all.
 */
import { describe, it, expect } from "vitest";
import { solutionSteps, MAX_SENTENCE_STEPS } from "@/lib/chat/solutionSteps";
import { ARC_SOLUTION, ARC_VISUAL, QUAD_SOLUTION, QUAD_VISUAL, ROTATION_SOLUTION, ROTATION_VISUAL } from "./fixtures/visuals";

const long = (n: number) => `Sentence ${n} works through one more part of the problem with the actual numbers in it.`;

describe("solutionSteps", () => {
  it("uses an animated solution's own steps, and returns the visual so it plays step by step", () => {
    const out = solutionSteps({ solution: QUAD_SOLUTION, visual: QUAD_VISUAL });
    expect(out).not.toBeNull();
    expect(out!.steps).toHaveLength(3);
    expect(out!.steps[0]).toMatch(/^Discriminant/);
    expect(out!.steps.join(" ")).toBe(QUAD_SOLUTION);
    expect(out!.visual).toBe(QUAD_VISUAL);
  });

  it("falls back to sentences, without the visual, when the solution changed since the visual was mapped", () => {
    const solution = `${QUAD_SOLUTION} ${long(9)}`;
    const out = solutionSteps({ solution, visual: QUAD_VISUAL });
    expect(out).not.toBeNull();
    expect(out!.visual).toBeNull();
    expect(out!.steps.join(" ")).toBe(solution);
  });

  it("falls back to sentences when the animation has a single step", () => {
    // ROTATION_VISUAL maps its one-sentence solution as one step: nothing to step through.
    expect(solutionSteps({ solution: ROTATION_SOLUTION, visual: ROTATION_VISUAL })).toBeNull();
  });

  it("ignores a visual that no longer parses", () => {
    const out = solutionSteps({ solution: ARC_SOLUTION, visual: { ...ARC_VISUAL, scene: "no-such-scene" } });
    expect(out?.visual ?? null).toBeNull();
  });

  it("cuts a plain solution at its sentences, keeping the text exactly", () => {
    const solution = [long(1), long(2), long(3)].join(" ");
    const out = solutionSteps({ solution, visual: null });
    expect(out!.steps).toEqual([long(1), long(2), long(3)]);
    expect(out!.visual).toBeNull();
  });

  it("joins a short sentence to the one after it", () => {
    const solution = `Let x be the number. ${long(2)} ${long(3)}`;
    const out = solutionSteps({ solution, visual: null });
    expect(out!.steps).toEqual([`Let x be the number. ${long(2)}`, long(3)]);
  });

  it("keeps a short last sentence as its own step: it is the answer", () => {
    const solution = `${long(1)} ${long(2)} Answer: (B).`;
    const out = solutionSteps({ solution, visual: null });
    expect(out!.steps).toEqual([long(1), long(2), "Answer: (B)."]);
  });

  it("never gives more than MAX_SENTENCE_STEPS steps, and loses no text", () => {
    const solution = Array.from({ length: 14 }, (_, k) => long(k + 1)).join(" ");
    const out = solutionSteps({ solution, visual: null });
    expect(out!.steps.length).toBe(MAX_SENTENCE_STEPS);
    expect(out!.steps.join(" ")).toBe(solution);
  });

  it("keeps line breaks inside a step as the solution has them", () => {
    const solution = `${long(1)}\n${long(2)}`;
    const out = solutionSteps({ solution, visual: null });
    expect(out!.steps).toEqual([long(1), long(2)]);
  });

  it("never cuts a table", () => {
    const solution = `${long(1)}\n\n| p | q |\n|---|---|\n| T | F |\n| F | T |\n\n${long(2)}`;
    const out = solutionSteps({ solution, visual: null });
    expect(out!.steps).toHaveLength(3);
    expect(out!.steps[1]).toBe("| p | q |\n|---|---|\n| T | F |\n| F | T |");
  });

  it("does not split inside maths", () => {
    const solution = String.raw`So \(x = 2. Then\) the value holds for every single case that we checked in the two parts above. ${long(2)}`;
    const out = solutionSteps({ solution, visual: null });
    expect(out!.steps[0]).toContain(String.raw`\(x = 2. Then\)`);
  });

  it("offers nothing for a solution of one step, or none", () => {
    expect(solutionSteps({ solution: long(1), visual: null })).toBeNull();
    expect(solutionSteps({ solution: "Short. Also short.", visual: null })).toBeNull();
    expect(solutionSteps({ solution: "", visual: null })).toBeNull();
    expect(solutionSteps({ solution: null, visual: null })).toBeNull();
    expect(solutionSteps({ solution: "   ", visual: null })).toBeNull();
  });
});
